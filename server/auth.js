var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { Pool } from "pg";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
var scryptAsync = promisify(scrypt);
var PostgresStore = connectPg(session);
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    salt = randomBytes(16).toString("hex");
                    return [4 /*yield*/, scryptAsync(password, salt, 64)];
                case 1:
                    buf = (_a.sent());
                    return [2 /*return*/, "".concat(buf.toString("hex"), ".").concat(salt)];
            }
        });
    });
}
function comparePasswords(supplied, stored) {
    return __awaiter(this, void 0, void 0, function () {
        var parts, hashed, salt, hashedBuf, suppliedBuf, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stored.includes('.')) {
                        return [2 /*return*/, supplied === stored];
                    }
                    parts = stored.split('.');
                    if (parts.length !== 2)
                        return [2 /*return*/, supplied === stored];
                    hashed = parts[0], salt = parts[1];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    hashedBuf = Buffer.from(hashed, "hex");
                    return [4 /*yield*/, scryptAsync(supplied, salt, 64)];
                case 2:
                    suppliedBuf = (_a.sent());
                    return [2 /*return*/, timingSafeEqual(hashedBuf, suppliedBuf)];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, supplied === stored];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function setupAuth(app) {
    var _this = this;
    var _a;
    var sessionStore;
    if (app.get("env") === "production" && ((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.startsWith("postgres"))) {
        var pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        sessionStore = new PostgresStore({
            pool: pool,
            createTableIfMissing: true,
        });
    }
    else {
        sessionStore = new session.MemoryStore();
    }
    var sessionSettings = {
        secret: process.env.SESSION_SECRET || (function () {
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
    passport.use(new LocalStrategy(function (username, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, storage.getUserByUsername(username)];
                case 1:
                    user = _b.sent();
                    _a = !user;
                    if (_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, comparePasswords(password, user.password)];
                case 2:
                    _a = !(_b.sent());
                    _b.label = 3;
                case 3:
                    if (_a) {
                        return [2 /*return*/, done(null, false)];
                    }
                    else {
                        return [2 /*return*/, done(null, user)];
                    }
                    return [2 /*return*/];
            }
        });
    }); }));
    passport.serializeUser(function (user, done) { return done(null, user.id); });
    passport.deserializeUser(function (id, done) { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.getUser(id)];
                case 1:
                    user = _a.sent();
                    done(null, user);
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/register", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var existingUser, hashedPassword, user_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, storage.getUserByUsername(req.body.username)];
                case 1:
                    existingUser = _a.sent();
                    if (existingUser) {
                        return [2 /*return*/, res.status(400).json({ message: "Username already exists" })];
                    }
                    return [4 /*yield*/, hashPassword(req.body.password)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, storage.createUser({
                            username: req.body.username,
                            password: hashedPassword,
                            isAdmin: false,
                        })];
                case 3:
                    user_1 = _a.sent();
                    req.login(user_1, function (err) {
                        if (err)
                            return next(err);
                        res.status(201).json(user_1);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    next(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/login", function (req, res, next) {
        passport.authenticate("local", function (err, user) {
            if (err)
                return next(err);
            if (!user)
                return res.status(401).json({ message: "Invalid username or password" });
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                return res.json(user);
            });
        })(req, res, next);
    });
    app.post("/api/logout", function (req, res, next) {
        req.logout(function (err) {
            if (err)
                return next(err);
            res.sendStatus(200);
        });
    });
    app.get("/api/user", function (req, res) {
        if (!req.isAuthenticated())
            return res.sendStatus(401);
        res.json(req.user);
    });
}
