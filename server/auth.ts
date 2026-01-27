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

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err: any, user: User) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: "Invalid username or password" });
            req.logIn(user, (err) => {
                if (err) return next(err);
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
