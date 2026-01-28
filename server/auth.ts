import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { Pool } from "pg";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User } from "../shared/schema";
import { CircuitBreaker } from "./middleware/monitoring.js";
import logger from "./logger.js";

// Production-grade login queue and circuit breaker
class LoginQueue {
    private queue: Array<{ resolve: Function; reject: Function; operation: Function }> = [];
    private processing = false;
    private concurrentLimit = 5; // Max 5 concurrent login attempts
    private activeOperations = 0;

    async enqueue<T>(operation: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push({ resolve, reject, operation });
            this.processQueue();
        });
    }

    private async processQueue() {
        if (this.processing || this.activeOperations >= this.concurrentLimit) {
            return;
        }

        this.processing = true;

        while (this.queue.length > 0 && this.activeOperations < this.concurrentLimit) {
            const { resolve, reject, operation } = this.queue.shift()!;
            this.activeOperations++;

            // Process operation asynchronously
            operation()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.activeOperations--;
                    this.processQueue(); // Continue processing
                });
        }

        this.processing = false;
    }

    getQueueStatus() {
        return {
            queueLength: this.queue.length,
            activeOperations: this.activeOperations,
            concurrentLimit: this.concurrentLimit
        };
    }
}

// Initialize login infrastructure
const loginQueue = new LoginQueue();
const loginCircuitBreaker = new CircuitBreaker({
    failureThreshold: 10, // Open after 10 failures
    resetTimeout: 30000,  // 30 seconds
    monitoringPeriod: 60000 // 1 minute
});

const scryptAsync = promisify(scrypt);
const PostgresStore = connectPg(session);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
    if (!stored.includes('.')) {
        return supplied === stored;
    }
    const parts = stored.split('.');
    if (parts.length !== 2) return supplied === stored;

    const [hashed, salt] = parts;
    try {
        const hashedBuf = Buffer.from(hashed, "hex");
        const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
        return timingSafeEqual(hashedBuf, suppliedBuf);
    } catch (error) {
        return supplied === stored;
    }
}

// Production-grade authentication with timeout and retry
async function authenticateUser(username: string, password: string): Promise<User | null> {
    return await loginQueue.enqueue(async () => {
        return await loginCircuitBreaker.execute(async () => {
            const startTime = Date.now();
            
            try {
                const user = await storage.getUserByUsername(username);
                if (!user) {
                    logger.info(`Login attempt failed: user not found - ${username}`);
                    return null;
                }

                const isValidPassword = await comparePasswords(password, user.password);
                const duration = Date.now() - startTime;
                
                if (isValidPassword) {
                    logger.info(`Login successful for ${username} (${duration}ms)`);
                    return user;
                } else {
                    logger.info(`Login attempt failed: invalid password - ${username} (${duration}ms)`);
                    return null;
                }
            } catch (error) {
                const duration = Date.now() - startTime;
                logger.error(`Login error for ${username} (${duration}ms):`, error);
                throw error;
            }
        });
    });
}

export function setupAuth(app: Express) {
    let sessionStore: session.Store;

    if (app.get("env") === "production" && process.env.DATABASE_URL?.startsWith("postgres")) {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        sessionStore = new PostgresStore({
            pool,
            createTableIfMissing: true,
        });
    } else {
        sessionStore = new session.MemoryStore();
    }

    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || (() => {
            if (process.env.NODE_ENV === 'production') {
                throw new Error('SESSION_SECRET must be set in production');
            }
            return "dev-fallback-secret-change-in-production";
        })(),
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: app.get("env") === "production",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        }
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await authenticateUser(username, password);
                if (!user) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                return done(null, user);
            } catch (error) {
                logger.error('Passport authentication error:', error);
                return done(null, false, { message: "Authentication service temporarily unavailable" });
            }
        }),
    );

    passport.serializeUser((user, done) => done(null, (user as User).id));
    passport.deserializeUser(async (id: number, done) => {
        const user = await storage.getUser(id);
        done(null, user);
    });

    app.post("/api/register", async (req, res, next) => {
        try {
            const existingUser = await storage.getUserByUsername(req.body.username);
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" });
            }

            const hashedPassword = await hashPassword(req.body.password);
            const user = await storage.createUser({
                username: req.body.username,
                password: hashedPassword,
                isAdmin: false,
            });

            req.login(user, (err) => {
                if (err) return next(err);
                res.status(201).json(user);
            });
        } catch (err) {
            next(err);
        }
    });

    app.post("/api/login", async (req, res, next) => {
        const startTime = Date.now();
        const { username, password } = req.body;
        
        // Input validation
        if (!username || !password) {
            return res.status(400).json({ 
                message: "Username and password are required",
                queueStatus: loginQueue.getQueueStatus()
            });
        }

        // Check circuit breaker status
        const circuitState = loginCircuitBreaker.getState();
        if (circuitState === 'OPEN') {
            return res.status(503).json({ 
                message: "Login service temporarily unavailable. Please try again in 30 seconds.",
                retryAfter: 30,
                queueStatus: loginQueue.getQueueStatus()
            });
        }

        passport.authenticate("local", (err: any, user: User, info: any) => {
            const duration = Date.now() - startTime;
            
            if (err) {
                logger.error(`Login error for ${username} (${duration}ms):`, err);
                return next(err);
            }
            
            if (!user) {
                logger.info(`Login failed for ${username} (${duration}ms): ${info?.message || 'Invalid credentials'}`);
                return res.status(401).json({ 
                    message: info?.message || "Invalid username or password",
                    queueStatus: loginQueue.getQueueStatus()
                });
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    logger.error(`Session creation error for ${username} (${duration}ms):`, err);
                    return next(err);
                }
                
                logger.info(`Login completed for ${username} (${duration}ms)`);
                return res.json({
                    ...user,
                    loginDuration: duration,
                    queueStatus: loginQueue.getQueueStatus()
                });
            });
        })(req, res, next);
    });

    app.post("/api/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.get("/api/user", (req, res) => {
        if (!req.isAuthenticated()) return res.sendStatus(401);
        res.json(req.user);
    });

    // Login system status endpoint for monitoring
    app.get("/api/auth/status", (req, res) => {
        res.json({
            circuitBreaker: {
                state: loginCircuitBreaker.getState(),
                metrics: loginCircuitBreaker.getMetrics()
            },
            queue: loginQueue.getQueueStatus(),
            timestamp: new Date().toISOString()
        });
    });
}

// Export for monitoring
export { loginQueue, loginCircuitBreaker };
