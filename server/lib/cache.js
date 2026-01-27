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
import memoizee from 'memoizee';
import { storage } from '../storage';
// Cache lessons for 5 minutes
export var getCachedLessons = memoizee(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching lessons from database');
                return [4 /*yield*/, storage.getLessons()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 5 * 60 * 1000, // 5 minutes
    promise: true,
    normalizer: function () { return 'lessons'; }, // Single cache key for all lessons
});
// Cache individual lesson for 10 minutes
export var getCachedLesson = memoizee(function (lessonId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Fetching lesson ".concat(lessonId, " from database"));
                return [4 /*yield*/, storage.getLesson(lessonId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 10 * 60 * 1000, // 10 minutes
    promise: true,
    normalizer: function (args) { return "lesson-".concat(args[0]); },
});
// Cache user stats for 1 minute
export var getCachedUserStats = memoizee(function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Fetching stats for user ".concat(userId));
                return [4 /*yield*/, storage.getUserStats(userId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 1 * 60 * 1000, // 1 minute
    promise: true,
    normalizer: function (args) { return "stats-".concat(args[0]); },
});
// Cache vocabulary for lesson for 10 minutes
export var getCachedVocabulary = memoizee(function (lessonId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Fetching vocabulary for lesson ".concat(lessonId));
                return [4 /*yield*/, storage.getVocabularyForLesson(lessonId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 10 * 60 * 1000, // 10 minutes
    promise: true,
    normalizer: function (args) { return "vocab-".concat(args[0]); },
});
// Cache leaderboard for 30 minutes
export var getCachedLeaderboard = memoizee(function (weekStart) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching leaderboard from database');
                return [4 /*yield*/, storage.getLeaderboard(weekStart)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 30 * 60 * 1000, // 30 minutes
    promise: true,
    normalizer: function (args) { return "leaderboard-".concat(args[0] || 'current'); },
});
// Cache quizzes for 15 minutes
export var getCachedQuizzes = memoizee(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching quizzes from database');
                return [4 /*yield*/, storage.getQuizzes()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: function () { return 'quizzes'; },
});
// Cache individual quiz for 15 minutes
export var getCachedQuiz = memoizee(function (quizId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Fetching quiz ".concat(quizId, " from database"));
                return [4 /*yield*/, storage.getQuiz(quizId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: function (args) { return "quiz-".concat(args[0]); },
});
// Cache stories for 20 minutes
export var getCachedStories = memoizee(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching stories from database');
                return [4 /*yield*/, storage.getStories()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 20 * 60 * 1000, // 20 minutes
    promise: true,
    normalizer: function () { return 'stories'; },
});
// Cache individual story for 20 minutes
export var getCachedStory = memoizee(function (storyId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Fetching story ".concat(storyId, " from database"));
                return [4 /*yield*/, storage.getStory(storyId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 20 * 60 * 1000, // 20 minutes
    promise: true,
    normalizer: function (args) { return "story-".concat(args[0]); },
});
// Cache scenarios for 15 minutes
export var getCachedScenarios = memoizee(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching scenarios from database');
                return [4 /*yield*/, storage.getScenarios()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    promise: true,
    normalizer: function () { return 'scenarios'; },
});
// Cache achievements for 1 hour
export var getCachedAchievements = memoizee(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('[CACHE] Fetching achievements from database');
                return [4 /*yield*/, storage.getAchievements()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 60 * 60 * 1000, // 1 hour
    promise: true,
    normalizer: function () { return 'achievements'; },
});
// Cache search results for 5 minutes
export var getCachedSearchResults = memoizee(function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[CACHE] Searching for: ".concat(query));
                return [4 /*yield*/, storage.search(query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }, {
    maxAge: 5 * 60 * 1000, // 5 minutes
    promise: true,
    normalizer: function (args) { return "search-".concat(args[0].toLowerCase()); },
});
// Utility to clear specific cache
export var clearCache = {
    lessons: function () { return getCachedLessons.clear(); },
    lesson: function (lessonId) { return getCachedLesson.delete(lessonId); },
    userStats: function (userId) { return getCachedUserStats.delete(userId); },
    vocabulary: function (lessonId) { return getCachedVocabulary.delete(lessonId); },
    leaderboard: function () { return getCachedLeaderboard.clear(); },
    quizzes: function () { return getCachedQuizzes.clear(); },
    quiz: function (quizId) { return getCachedQuiz.delete(quizId); },
    stories: function () { return getCachedStories.clear(); },
    story: function (storyId) { return getCachedStory.delete(storyId); },
    scenarios: function () { return getCachedScenarios.clear(); },
    achievements: function () { return getCachedAchievements.clear(); },
    search: function () { return getCachedSearchResults.clear(); },
    all: function () {
        getCachedLessons.clear();
        getCachedLesson.clear();
        getCachedUserStats.clear();
        getCachedVocabulary.clear();
        getCachedLeaderboard.clear();
        getCachedQuizzes.clear();
        getCachedQuiz.clear();
        getCachedStories.clear();
        getCachedStory.clear();
        getCachedScenarios.clear();
        getCachedAchievements.clear();
        getCachedSearchResults.clear();
    },
};
// Cache statistics
export var getCacheStats = function () {
    return {
        lessons: {
            size: getCachedLessons.size || 0,
            hits: getCachedLessons.hits || 0,
            misses: getCachedLessons.misses || 0,
        },
        userStats: {
            size: getCachedUserStats.size || 0,
            hits: getCachedUserStats.hits || 0,
            misses: getCachedUserStats.misses || 0,
        },
        vocabulary: {
            size: getCachedVocabulary.size || 0,
            hits: getCachedVocabulary.hits || 0,
            misses: getCachedVocabulary.misses || 0,
        },
        leaderboard: {
            size: getCachedLeaderboard.size || 0,
            hits: getCachedLeaderboard.hits || 0,
            misses: getCachedLeaderboard.misses || 0,
        },
    };
};
