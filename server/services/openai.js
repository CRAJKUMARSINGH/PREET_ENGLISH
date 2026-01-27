var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import OpenAI from 'openai';
// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY not set in environment variables');
    process.exit(1);
}
var openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 3,
    timeout: 30000, // 30 seconds
});
var usageStats = new Map();
// Pricing (approximate, update regularly - as of Jan 2026)
var PRICING = {
    'gpt-4-turbo': { input: 0.01, output: 0.03 }, // per 1K tokens
    'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 }, // per 1K tokens
    'whisper': 0.006, // per minute
};
// Daily limits for cost control
var DAILY_LIMITS = {
    TOKEN_LIMIT: 50000, // ~$1.50/day per user
    REQUEST_LIMIT: 100, // Max requests per day
    COST_LIMIT: 2.00, // Max $2/day per user
};
export function generateFeedback(userId_1, prompt_1) {
    return __awaiter(this, arguments, void 0, function (userId, prompt, maxTokens, model) {
        var stats, response, usage, cost, error_1;
        var _a, _b;
        if (maxTokens === void 0) { maxTokens = 500; }
        if (model === void 0) { model = 'gpt-3.5-turbo'; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stats = getUserStats(userId);
                    // Enforce daily limits
                    if (stats.totalTokens > DAILY_LIMITS.TOKEN_LIMIT) {
                        throw new Error('Daily AI usage limit reached. Please try again tomorrow.');
                    }
                    if (stats.requestCount > DAILY_LIMITS.REQUEST_LIMIT) {
                        throw new Error('Too many AI requests today. Please try again tomorrow.');
                    }
                    if (stats.estimatedCost > DAILY_LIMITS.COST_LIMIT) {
                        throw new Error('Daily AI cost limit reached. Please try again tomorrow.');
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: model,
                            messages: [
                                {
                                    role: 'system',
                                    content: 'You are Saraswati, a helpful Hindi-English bilingual tutor for PREET_ENGLISH. Provide encouraging, culturally sensitive feedback in both English and Hindi. Keep responses concise and actionable.'
                                },
                                { role: 'user', content: prompt }
                            ],
                            max_tokens: maxTokens,
                            temperature: 0.7,
                        })];
                case 2:
                    response = _c.sent();
                    usage = response.usage;
                    if (usage) {
                        cost = (usage.prompt_tokens / 1000) * PRICING[model].input +
                            (usage.completion_tokens / 1000) * PRICING[model].output;
                        stats.totalTokens += usage.total_tokens;
                        stats.estimatedCost += cost;
                        stats.requestCount += 1;
                        usageStats.set(userId, stats);
                        // Log high-cost requests
                        if (cost > 0.10) {
                            console.warn("High-cost OpenAI request: $".concat(cost.toFixed(4), " for user ").concat(userId));
                        }
                    }
                    return [2 /*return*/, ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || ''];
                case 3:
                    error_1 = _c.sent();
                    if (error_1.status === 429) {
                        throw new Error('OpenAI rate limit reached. Please try again shortly.');
                    }
                    if (error_1.status === 401) {
                        console.error('Invalid OpenAI API key');
                        throw new Error('AI service configuration error');
                    }
                    if (error_1.status === 400) {
                        throw new Error('Invalid request to AI service');
                    }
                    console.error('OpenAI API error:', error_1);
                    throw new Error('AI service temporarily unavailable');
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Generate pronunciation feedback
export function generatePronunciationFeedback(userId, text, userAttempt) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt;
        return __generator(this, function (_a) {
            prompt = "\n    Original text: \"".concat(text, "\"\n    User's pronunciation attempt: \"").concat(userAttempt, "\"\n    \n    Provide brief, encouraging pronunciation feedback in both English and Hindi. \n    Focus on specific sounds that need improvement and give practical tips.\n    Keep it under 100 words total.\n  ");
            return [2 /*return*/, generateFeedback(userId, prompt, 200, 'gpt-3.5-turbo')];
        });
    });
}
// Generate story for lessons
export function generateStory(userId_1, difficulty_1, topic_1) {
    return __awaiter(this, arguments, void 0, function (userId, difficulty, topic, length) {
        var lengthMap, prompt;
        if (length === void 0) { length = 'medium'; }
        return __generator(this, function (_a) {
            lengthMap = {
                short: '50-100 words',
                medium: '100-200 words',
                long: '200-300 words'
            };
            prompt = "\n    Create a ".concat(difficulty, " level English story (").concat(lengthMap[length], ") ").concat(topic ? "about ".concat(topic) : '', ".\n    Include:\n    1. Simple, clear English suitable for Hindi speakers\n    2. Cultural context relevant to India\n    3. 5-8 vocabulary words that would be useful for Hindi speakers learning English\n    4. A brief Hindi summary at the end\n    \n    Make it engaging and educational for PREET_ENGLISH learners.\n  ");
            return [2 /*return*/, generateFeedback(userId, prompt, 400, 'gpt-3.5-turbo')];
        });
    });
}
// Helper function to get user stats
function getUserStats(userId) {
    var existing = usageStats.get(userId);
    var now = new Date();
    // Reset if it's a new day
    if (existing && existing.lastReset.toDateString() !== now.toDateString()) {
        var reset = { totalTokens: 0, estimatedCost: 0, requestCount: 0, lastReset: now };
        usageStats.set(userId, reset);
        return reset;
    }
    return existing || { totalTokens: 0, estimatedCost: 0, requestCount: 0, lastReset: now };
}
// Export usage stats for monitoring
export function getUserAIUsage(userId) {
    return getUserStats(userId);
}
// Get all usage stats (admin only)
export function getAllAIUsage() {
    return Array.from(usageStats.entries()).map(function (_a) {
        var userId = _a[0], stats = _a[1];
        return (__assign({ userId: userId }, stats));
    });
}
// Reset daily quotas (called by cron job)
export function resetDailyQuotas() {
    usageStats.clear();
    console.log('Daily AI usage quotas reset');
}
// Set up daily reset at midnight
setInterval(function () {
    resetDailyQuotas();
}, 24 * 60 * 60 * 1000);
