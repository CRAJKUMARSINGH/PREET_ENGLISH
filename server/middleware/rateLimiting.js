import rateLimit from 'express-rate-limit';
import '../types/session'; // Extend session types
// General API rate limiting
export var apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    // Store in Redis for production (optional)
    // store: new RedisStore({ client: redisClient }),
});
// Strict rate limiting for authentication endpoints
export var authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Max 5 failed attempts
    skipSuccessfulRequests: true, // Don't count successful logins
    message: 'Too many login attempts, please try again after 15 minutes.',
});
// Rate limiting for AI features (to control OpenAI API costs)
export var aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // Max 50 AI requests per hour per user
    message: 'AI usage limit reached. Please try again later.',
    keyGenerator: function (req) {
        var _a, _b;
        // Rate limit per user instead of IP
        return ((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString()) || req.ip || 'anonymous';
    },
});
// Rate limiting for file uploads (audio recordings)
export var uploadLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Max 10 uploads per minute
    message: 'Too many uploads, please slow down.',
});
// Rate limiting for lesson completion (prevent spam)
export var lessonLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // Max 20 lesson completions per minute
    message: 'Too many lesson completions, please slow down.',
    keyGenerator: function (req) {
        var _a, _b;
        return ((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString()) || req.ip || 'anonymous';
    },
});
