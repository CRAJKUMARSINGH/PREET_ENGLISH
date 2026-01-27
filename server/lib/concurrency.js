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
import pLimit from 'p-limit';
import pRetry from 'p-retry';
// Limit concurrent operations to prevent overwhelming the system
var dbLimit = pLimit(10); // Database operations
var apiLimit = pLimit(5); // External API calls (like OpenAI)
var generalLimit = pLimit(20); // General operations
export function withDatabaseConcurrency(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, options) {
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            return [2 /*return*/, dbLimit(function () {
                    var _a, _b, _c;
                    return pRetry(fn, {
                        retries: (_a = options.retries) !== null && _a !== void 0 ? _a : 3,
                        minTimeout: (_b = options.minTimeout) !== null && _b !== void 0 ? _b : 500,
                        maxTimeout: (_c = options.maxTimeout) !== null && _c !== void 0 ? _c : 3000,
                        onFailedAttempt: options.onFailedAttempt || (function (error) {
                            console.warn("[DB RETRY] Attempt ".concat(error.attemptNumber, " failed. ") +
                                "".concat(error.retriesLeft, " retries left. Error: ").concat(error.message || 'Unknown error'));
                        }),
                    });
                })];
        });
    });
}
export function withAPIConcurrency(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, options) {
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            return [2 /*return*/, apiLimit(function () {
                    var _a, _b, _c;
                    return pRetry(fn, {
                        retries: (_a = options.retries) !== null && _a !== void 0 ? _a : 5,
                        minTimeout: (_b = options.minTimeout) !== null && _b !== void 0 ? _b : 1000,
                        maxTimeout: (_c = options.maxTimeout) !== null && _c !== void 0 ? _c : 10000,
                        onFailedAttempt: options.onFailedAttempt || (function (error) {
                            console.warn("[API RETRY] Attempt ".concat(error.attemptNumber, " failed. ") +
                                "".concat(error.retriesLeft, " retries left. Error: ").concat(error.message || 'Unknown error'));
                        }),
                    });
                })];
        });
    });
}
export function withGeneralConcurrency(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, options) {
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            return [2 /*return*/, generalLimit(function () {
                    var _a, _b, _c;
                    return pRetry(fn, {
                        retries: (_a = options.retries) !== null && _a !== void 0 ? _a : 2,
                        minTimeout: (_b = options.minTimeout) !== null && _b !== void 0 ? _b : 200,
                        maxTimeout: (_c = options.maxTimeout) !== null && _c !== void 0 ? _c : 2000,
                        onFailedAttempt: options.onFailedAttempt || (function (error) {
                            console.warn("[GENERAL RETRY] Attempt ".concat(error.attemptNumber, " failed. ") +
                                "".concat(error.retriesLeft, " retries left. Error: ").concat(error.message || 'Unknown error'));
                        }),
                    });
                })];
        });
    });
}
// Specialized wrappers for common operations
export function callExternalAPI(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, serviceName) {
        if (serviceName === void 0) { serviceName = 'External API'; }
        return __generator(this, function (_a) {
            return [2 /*return*/, withAPIConcurrency(fn, {
                    retries: 3,
                    timeout: 15000,
                    onFailedAttempt: function (error) {
                        console.warn("[".concat(serviceName, "] Attempt ").concat(error.attemptNumber, " failed. ") +
                            "".concat(error.retriesLeft, " retries left. Error: ").concat(error.message));
                    },
                })];
        });
    });
}
export function performDatabaseOperation(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, operationName) {
        if (operationName === void 0) { operationName = 'Database Operation'; }
        return __generator(this, function (_a) {
            return [2 /*return*/, withDatabaseConcurrency(fn, {
                    retries: 3,
                    onFailedAttempt: function (error) {
                        console.warn("[".concat(operationName, "] Attempt ").concat(error.attemptNumber, " failed. ") +
                            "".concat(error.retriesLeft, " retries left. Error: ").concat(error.message));
                    },
                })];
        });
    });
}
// Batch processing with concurrency control
export function processBatch(items_1, processor_1) {
    return __awaiter(this, arguments, void 0, function (items, processor, batchSize) {
        var limit;
        if (batchSize === void 0) { batchSize = 5; }
        return __generator(this, function (_a) {
            limit = pLimit(batchSize);
            return [2 /*return*/, Promise.all(items.map(function (item) {
                    return limit(function () { return processor(item); });
                }))];
        });
    });
}
// Rate limiting for user requests
var userRequestLimits = new Map();
export function checkRateLimit(userId, maxRequests, windowMs // 1 minute
) {
    if (maxRequests === void 0) { maxRequests = 100; }
    if (windowMs === void 0) { windowMs = 60000; }
    var now = Date.now();
    var userLimit = userRequestLimits.get(userId);
    if (!userLimit || now > userLimit.resetTime) {
        userRequestLimits.set(userId, {
            count: 1,
            resetTime: now + windowMs,
        });
        return true;
    }
    if (userLimit.count >= maxRequests) {
        return false;
    }
    userLimit.count++;
    return true;
}
// Get concurrency statistics
export var getConcurrencyStats = function () {
    return {
        database: {
            activeCount: dbLimit.activeCount,
            pendingCount: dbLimit.pendingCount,
        },
        api: {
            activeCount: apiLimit.activeCount,
            pendingCount: apiLimit.pendingCount,
        },
        general: {
            activeCount: generalLimit.activeCount,
            pendingCount: generalLimit.pendingCount,
        },
        rateLimits: {
            activeUsers: userRequestLimits.size,
        },
    };
};
// Cleanup old rate limit entries
setInterval(function () {
    var now = Date.now();
    var entries = Array.from(userRequestLimits.entries());
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], userId = _a[0], limit = _a[1];
        if (now > limit.resetTime) {
            userRequestLimits.delete(userId);
        }
    }
}, 60000); // Clean up every minute
