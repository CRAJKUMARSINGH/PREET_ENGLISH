import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User, insertUserSchema } from "../shared/schema";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
    // Handle legacy passwords that might not have salt
    if (!stored.includes('.')) {
        // Legacy password without salt - just compare directly (not secure, but for existing data)
        return supplied === stored;
    }
    
    const parts = stored.split('.');
    if (parts.length !== 2) {
        // Invalid format, try direct comparison as fallback
        return supplied === stored;
    }
    
    const [hashed, salt] = parts;
    if (!hashed || !salt) {
        // Missing parts, try direct comparison as fallback
        return supplied === stored;
    }
    
    try {
        const hashedBuf = Buffer.from(hashed, "hex");
        const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
        return timingSafeEqual(hashedBuf, suppliedBuf);
    } catch (error) {
        console.error('Password comparison error:', error);
        // Fallback to direct comparison for legacy passwords
        return supplied === stored;
    }
}

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "preet-english-secret-key",
        resave: false,
        saveUninitialized: false,
        store: storage.sessionStore,
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const user = await storage.getUserByUsername(username);
            if (!user || !(await comparePasswords(password, user.password))) {
                return done(null, false);
            } else {
                return done(null, user);
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
                isAdmin: false, // Default to false for new registrations
            });

            req.login(user, (err) => {
                if (err) return next(err);
                res.status(201).json(user);
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            } else {
                next(err);
            }
        }
    });

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err: any, user: User, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.json(user);
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
}
