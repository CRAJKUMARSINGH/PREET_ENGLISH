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
import { storage } from '../storage';
import { z } from 'zod';
import { clearCache } from '../lib/cache';
import { performDatabaseOperation } from '../lib/concurrency';
// Admin middleware
var requireAdmin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    var user = req.user;
    if (!user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
// Validation schemas
var lessonValidationSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    content: z.string().min(100, 'Content must be at least 100 characters'),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    order: z.number().min(1),
    imageUrl: z.string().url().optional(),
});
var bulkImportSchema = z.object({
    lessons: z.array(lessonValidationSchema),
});
export function registerAdminRoutes(app) {
    var _this = this;
    // Admin dashboard stats
    app.get('/api/admin/dashboard', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var stats, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, performDatabaseOperation(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, totalLessons, totalUsers, totalQuizzes, totalStories, totalScenarios, recentActivity;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, Promise.all([
                                            storage.getLessons().then(function (lessons) { return lessons.length; }),
                                            storage.getPublicUsers().then(function (users) { return users.length; }),
                                            storage.getQuizzes().then(function (quizzes) { return quizzes.length; }),
                                            storage.getStories().then(function (stories) { return stories.length; }),
                                            storage.getScenarios().then(function (scenarios) { return scenarios.length; }),
                                            storage.getActivityFeed().then(function (feed) { return feed.slice(0, 10); })
                                        ])];
                                    case 1:
                                        _a = _b.sent(), totalLessons = _a[0], totalUsers = _a[1], totalQuizzes = _a[2], totalStories = _a[3], totalScenarios = _a[4], recentActivity = _a[5];
                                        return [2 /*return*/, {
                                                totalLessons: totalLessons,
                                                totalUsers: totalUsers,
                                                totalQuizzes: totalQuizzes,
                                                totalStories: totalStories,
                                                totalScenarios: totalScenarios,
                                                recentActivity: recentActivity
                                            }];
                                }
                            });
                        }); }, 'Admin Dashboard Stats')];
                case 1:
                    stats = _a.sent();
                    res.json(stats);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Admin dashboard error:', err_1);
                    res.status(500).json({ message: 'Error fetching dashboard stats' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Lesson Management
    app.get('/api/admin/lessons', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var lessons, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.getLessons(); }, 'Admin Get Lessons')];
                case 1:
                    lessons = _a.sent();
                    res.json(lessons);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error('Admin get lessons error:', err_2);
                    res.status(500).json({ message: 'Error fetching lessons' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/admin/lessons', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var validatedData_1, lesson, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    validatedData_1 = lessonValidationSchema.parse(req.body);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.createLesson(validatedData_1); }, 'Admin Create Lesson')];
                case 1:
                    lesson = _a.sent();
                    // Clear lessons cache
                    clearCache.lessons();
                    res.status(201).json(lesson);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    if (err_3 instanceof z.ZodError) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Validation error',
                                errors: err_3.errors.map(function (e) { return ({ field: e.path.join('.'), message: e.message }); })
                            })];
                    }
                    console.error('Admin create lesson error:', err_3);
                    res.status(500).json({ message: 'Error creating lesson' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.put('/api/admin/lessons/:id', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var lessonId_1, validatedData_2, lesson, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    lessonId_1 = Number(req.params.id);
                    validatedData_2 = lessonValidationSchema.partial().parse(req.body);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.updateLesson(lessonId_1, validatedData_2); }, 'Admin Update Lesson')];
                case 1:
                    lesson = _a.sent();
                    // Clear related caches
                    clearCache.lessons();
                    clearCache.lesson(lessonId_1);
                    res.json(lesson);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    if (err_4 instanceof z.ZodError) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Validation error',
                                errors: err_4.errors.map(function (e) { return ({ field: e.path.join('.'), message: e.message }); })
                            })];
                    }
                    console.error('Admin update lesson error:', err_4);
                    res.status(500).json({ message: 'Error updating lesson' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.delete('/api/admin/lessons/:id', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var lessonId_2, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    lessonId_2 = Number(req.params.id);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.deleteLesson(lessonId_2); }, 'Admin Delete Lesson')];
                case 1:
                    _a.sent();
                    // Clear related caches
                    clearCache.lessons();
                    clearCache.lesson(lessonId_2);
                    clearCache.vocabulary(lessonId_2);
                    res.sendStatus(204);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.error('Admin delete lesson error:', err_5);
                    res.status(500).json({ message: 'Error deleting lesson' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Content validation
    app.post('/api/admin/lessons/validate', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, title, content, description, difficulty, errors, warnings;
        return __generator(this, function (_b) {
            try {
                _a = req.body, title = _a.title, content = _a.content, description = _a.description, difficulty = _a.difficulty;
                errors = [];
                warnings = [];
                // Title validation
                if (!title || title.length < 5) {
                    errors.push('Title must be at least 5 characters');
                }
                else if (title.length > 100) {
                    warnings.push('Title is quite long, consider shortening');
                }
                // Content validation
                if (!content || content.length < 100) {
                    errors.push('Content must be at least 100 characters');
                }
                else if (content.length < 300) {
                    warnings.push('Content seems short, consider adding more detail');
                }
                // Description validation
                if (!description || description.length < 10) {
                    errors.push('Description must be at least 10 characters');
                }
                // Difficulty validation
                if (!['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
                    errors.push('Difficulty must be Beginner, Intermediate, or Advanced');
                }
                // Check for common issues
                if (content && !content.includes('#')) {
                    warnings.push('Consider adding markdown headers for better structure');
                }
                if (content && content.split('\n').length < 5) {
                    warnings.push('Content might benefit from more paragraphs');
                }
                res.json({
                    valid: errors.length === 0,
                    errors: errors,
                    warnings: warnings,
                    suggestions: [
                        'Use markdown formatting for better readability',
                        'Include examples and exercises',
                        'Add relevant images or media',
                        'Consider cultural context for Indian learners'
                    ]
                });
            }
            catch (err) {
                console.error('Content validation error:', err);
                res.status(500).json({ message: 'Validation failed' });
            }
            return [2 /*return*/];
        });
    }); });
    // Bulk operations
    app.post('/api/admin/lessons/bulk-import', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var lessons_1, created, err_6;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    lessons_1 = bulkImportSchema.parse(req.body).lessons;
                    return [4 /*yield*/, performDatabaseOperation(function () { return __awaiter(_this, void 0, void 0, function () {
                            var results, _i, lessons_2, lesson, created_lesson;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        results = [];
                                        _i = 0, lessons_2 = lessons_1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < lessons_2.length)) return [3 /*break*/, 4];
                                        lesson = lessons_2[_i];
                                        return [4 /*yield*/, storage.createLesson(lesson)];
                                    case 2:
                                        created_lesson = _a.sent();
                                        results.push(created_lesson);
                                        _a.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/, results];
                                }
                            });
                        }); }, 'Admin Bulk Import')];
                case 1:
                    created = _a.sent();
                    // Clear lessons cache
                    clearCache.lessons();
                    res.status(201).json({
                        message: "Successfully imported ".concat(created.length, " lessons"),
                        lessons: created,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    if (err_6 instanceof z.ZodError) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Validation error in bulk import',
                                errors: err_6.errors.map(function (e) { return ({ field: e.path.join('.'), message: e.message }); })
                            })];
                    }
                    console.error('Bulk import error:', err_6);
                    res.status(500).json({ message: 'Bulk import failed' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/admin/lessons/export', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var lessons, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.getLessons(); }, 'Admin Export Lessons')];
                case 1:
                    lessons = _a.sent();
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Disposition', 'attachment; filename=lessons-export.json');
                    res.json(lessons);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    console.error('Export error:', err_7);
                    res.status(500).json({ message: 'Export failed' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // User Management
    app.get('/api/admin/users', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var users, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.getPublicUsers(); }, 'Admin Get Users')];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    console.error('Admin get users error:', err_8);
                    res.status(500).json({ message: 'Error fetching users' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.put('/api/admin/users/:id/admin', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId_1, isAdmin_1, user, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId_1 = Number(req.params.id);
                    isAdmin_1 = req.body.isAdmin;
                    return [4 /*yield*/, performDatabaseOperation(function () { return storage.updateUserAdminStatus(userId_1, isAdmin_1); }, 'Admin Update User Status')];
                case 1:
                    user = _a.sent();
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    console.error('Admin update user error:', err_9);
                    res.status(500).json({ message: 'Error updating user' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Content Analytics
    app.get('/api/admin/analytics/content', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var analytics, err_10;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, performDatabaseOperation(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, lessons, quizzes, stories;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, Promise.all([
                                            storage.getLessons(),
                                            storage.getQuizzes(),
                                            storage.getStories()
                                        ])];
                                    case 1:
                                        _a = _b.sent(), lessons = _a[0], quizzes = _a[1], stories = _a[2];
                                        return [2 /*return*/, {
                                                lessonsByDifficulty: lessons.reduce(function (acc, lesson) {
                                                    acc[lesson.difficulty] = (acc[lesson.difficulty] || 0) + 1;
                                                    return acc;
                                                }, {}),
                                                quizzesByCategory: quizzes.reduce(function (acc, quiz) {
                                                    acc[quiz.category] = (acc[quiz.category] || 0) + 1;
                                                    return acc;
                                                }, {}),
                                                storiesByCategory: stories.reduce(function (acc, story) {
                                                    acc[story.category] = (acc[story.category] || 0) + 1;
                                                    return acc;
                                                }, {}),
                                                totalContent: lessons.length + quizzes.length + stories.length
                                            }];
                                }
                            });
                        }); }, 'Admin Content Analytics')];
                case 1:
                    analytics = _a.sent();
                    res.json(analytics);
                    return [3 /*break*/, 3];
                case 2:
                    err_10 = _a.sent();
                    console.error('Analytics error:', err_10);
                    res.status(500).json({ message: 'Error fetching analytics' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // System Management
    app.post('/api/admin/cache/clear', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var type;
        return __generator(this, function (_a) {
            try {
                type = req.body.type;
                if (type === 'all') {
                    clearCache.all();
                }
                else if (clearCache[type]) {
                    clearCache[type]();
                }
                else {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid cache type' })];
                }
                res.json({ message: "Cache ".concat(type, " cleared successfully") });
            }
            catch (err) {
                console.error('Cache clear error:', err);
                res.status(500).json({ message: 'Error clearing cache' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/admin/system/stats', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var getCacheStats, getConcurrencyStats, stats, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, import('../lib/cache')];
                case 1:
                    getCacheStats = (_a.sent()).getCacheStats;
                    return [4 /*yield*/, import('../lib/concurrency')];
                case 2:
                    getConcurrencyStats = (_a.sent()).getConcurrencyStats;
                    stats = {
                        cache: getCacheStats(),
                        concurrency: getConcurrencyStats(),
                        memory: process.memoryUsage(),
                        uptime: process.uptime(),
                    };
                    res.json(stats);
                    return [3 /*break*/, 4];
                case 3:
                    err_11 = _a.sent();
                    console.error('System stats error:', err_11);
                    res.status(500).json({ message: 'Error fetching system stats' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
