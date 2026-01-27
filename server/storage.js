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
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { users, lessons, vocabulary, progress, conversations, messages, userStats, scenarios, stories, listenings, speakingTopics, speakingSessions, speakingAttempts, userSpeakingProfiles, activityFeed, quizzes, quizQuestions, quizAttempts } from "@shared/schema";
var Storage = /** @class */ (function () {
    function Storage() {
    }
    // User management
    Storage.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(users)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(users).where(eq(users.id, id))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    Storage.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(users).where(eq(users.username, username))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    Storage.prototype.createUser = function (insertUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(users).values(insertUser).returning()];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // Lesson management
    Storage.prototype.getLessons = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(lessons).orderBy(lessons.order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getLesson = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var lesson, lessonVocabulary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(lessons).where(eq(lessons.id, id))];
                    case 1:
                        lesson = (_a.sent())[0];
                        if (!lesson)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, db.select().from(vocabulary).where(eq(vocabulary.lessonId, id))];
                    case 2:
                        lessonVocabulary = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, lesson), { vocabulary: lessonVocabulary })];
                }
            });
        });
    };
    Storage.prototype.createLesson = function (insertLesson) {
        return __awaiter(this, void 0, void 0, function () {
            var lesson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(lessons).values(insertLesson).returning()];
                    case 1:
                        lesson = (_a.sent())[0];
                        return [2 /*return*/, lesson];
                }
            });
        });
    };
    // Vocabulary management
    Storage.prototype.getVocabulary = function (lessonId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.createVocabulary = function (insertVocabulary) {
        return __awaiter(this, void 0, void 0, function () {
            var vocab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(vocabulary).values(insertVocabulary).returning()];
                    case 1:
                        vocab = (_a.sent())[0];
                        return [2 /*return*/, vocab];
                }
            });
        });
    };
    // Progress tracking
    Storage.prototype.getProgress = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select({
                            progress: progress,
                            lesson: lessons,
                        })
                            .from(progress)
                            .innerJoin(lessons, eq(progress.lessonId, lessons.id))
                            .where(eq(progress.userId, userId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (r) { return (__assign(__assign({}, r.progress), { lesson: r.lesson })); })];
                }
            });
        });
    };
    Storage.prototype.markLessonComplete = function (userId, lessonId, completed) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, updated, newProgress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select()
                            .from(progress)
                            .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)))];
                    case 1:
                        existing = _a.sent();
                        if (!(existing.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, db
                                .update(progress)
                                .set({ completed: completed, completedAt: completed ? new Date().toISOString() : null })
                                .where(eq(progress.id, existing[0].id))
                                .returning()];
                    case 2:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated];
                    case 3: return [4 /*yield*/, db
                            .insert(progress)
                            .values({
                            userId: userId,
                            lessonId: lessonId,
                            completed: completed,
                            completedAt: completed ? new Date().toISOString() : null,
                        })
                            .returning()];
                    case 4:
                        newProgress = (_a.sent())[0];
                        return [2 /*return*/, newProgress];
                }
            });
        });
    };
    // Conversations
    Storage.prototype.getConversations = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(conversations).where(eq(conversations.userId, userId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getConversation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conversation, conversationMessages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(conversations).where(eq(conversations.id, id))];
                    case 1:
                        conversation = (_a.sent())[0];
                        if (!conversation)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, db
                                .select()
                                .from(messages)
                                .where(eq(messages.conversationId, id))
                                .orderBy(messages.createdAt)];
                    case 2:
                        conversationMessages = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, conversation), { messages: conversationMessages })];
                }
            });
        });
    };
    Storage.prototype.createConversation = function (insertConversation) {
        return __awaiter(this, void 0, void 0, function () {
            var conversation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(conversations).values(insertConversation).returning()];
                    case 1:
                        conversation = (_a.sent())[0];
                        return [2 /*return*/, conversation];
                }
            });
        });
    };
    Storage.prototype.addMessage = function (insertMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(messages).values(insertMessage).returning()];
                    case 1:
                        message = (_a.sent())[0];
                        return [2 /*return*/, message];
                }
            });
        });
    };
    Storage.prototype.deleteConversation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.delete(messages).where(eq(messages.conversationId, id))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.delete(conversations).where(eq(conversations.id, id))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Stories
    Storage.prototype.getStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(stories).orderBy(stories.order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getStory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var story;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(stories).where(eq(stories.id, id))];
                    case 1:
                        story = (_a.sent())[0];
                        return [2 /*return*/, story];
                }
            });
        });
    };
    // Scenarios
    Storage.prototype.getScenarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(scenarios)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getScenario = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var scenario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(scenarios).where(eq(scenarios.id, id))];
                    case 1:
                        scenario = (_a.sent())[0];
                        return [2 /*return*/, scenario];
                }
            });
        });
    };
    // Speaking Topics
    Storage.prototype.getSpeakingTopics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(speakingTopics).orderBy(speakingTopics.order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getSpeakingTopic = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(speakingTopics).where(eq(speakingTopics.id, id))];
                    case 1:
                        topic = (_a.sent())[0];
                        return [2 /*return*/, topic];
                }
            });
        });
    };
    // Activity Feed
    Storage.prototype.getActivityFeed = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select({
                            feed: activityFeed,
                            user: users,
                        })
                            .from(activityFeed)
                            .innerJoin(users, eq(activityFeed.userId, users.id))
                            .orderBy(desc(activityFeed.createdAt))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (r) { return (__assign(__assign({}, r.feed), { user: r.user })); })];
                }
            });
        });
    };
    Storage.prototype.addActivityFeedItem = function (insertActivity) {
        return __awaiter(this, void 0, void 0, function () {
            var activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .insert(activityFeed)
                            .values(insertActivity)
                            .returning()];
                    case 1:
                        activity = (_a.sent())[0];
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    // Minimal stubs for missing methods to prevent errors
    Storage.prototype.getPublicUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUsers()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.updateLesson = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLesson(id)];
                    case 1: 
                    // Stub implementation
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.deleteLesson = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Storage.prototype.updateUserAdminStatus = function (userId, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser(userId)];
                    case 1: 
                    // Stub implementation
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getUserStats = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(userStats).where(eq(userStats.userId, userId))];
                    case 1:
                        stats = (_a.sent())[0];
                        return [2 /*return*/, stats || null];
                }
            });
        });
    };
    Storage.prototype.createUserStats = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(userStats).values({
                            userId: userId,
                            xpPoints: 0,
                            level: 1,
                            currentStreak: 0,
                            longestStreak: 0,
                            totalLessonsCompleted: 0,
                            totalQuizzesPassed: 0,
                            totalMinutesLearned: 0,
                            speakingMinutes: 0,
                            pronunciationAccuracyAvg: 0,
                        }).returning()];
                    case 1:
                        stats = (_a.sent())[0];
                        return [2 /*return*/, stats];
                }
            });
        });
    };
    Storage.prototype.updateUserStats = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, stats, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserStats(userId)];
                    case 1:
                        existing = _a.sent();
                        if (!!existing) return [3 /*break*/, 3];
                        return [4 /*yield*/, db.insert(userStats).values(__assign({ userId: userId }, data)).returning()];
                    case 2:
                        stats = (_a.sent())[0];
                        return [2 /*return*/, stats];
                    case 3: return [4 /*yield*/, db.update(userStats)
                            .set(data)
                            .where(eq(userStats.userId, userId))
                            .returning()];
                    case 4:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    Storage.prototype.getDailyGoal = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userProgress, completedToday;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProgress(userId)];
                    case 1:
                        userProgress = _a.sent();
                        completedToday = userProgress.filter(function (p) {
                            if (!p.completedAt)
                                return false;
                            var today = new Date().toISOString().split('T')[0];
                            return p.completedAt.startsWith(today);
                        }).length;
                        return [2 /*return*/, {
                                lessonsTarget: 3,
                                lessonsCompleted: completedToday,
                                xpTarget: 50,
                                xpEarned: completedToday * 10,
                                minutesTarget: 15,
                                minutesSpent: completedToday * 5,
                            }];
                }
            });
        });
    };
    Storage.prototype.updateDailyGoal = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // For now, just return the data as-is (would need dailyGoals table for persistence)
                return [2 /*return*/, data];
            });
        });
    };
    Storage.prototype.getLeaderboard = function (weekStart) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select({
                            stats: userStats,
                            user: users,
                        })
                            .from(userStats)
                            .innerJoin(users, eq(userStats.userId, users.id))
                            .orderBy(desc(userStats.xpPoints))
                            .limit(10)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (r, index) { return ({
                                rank: index + 1,
                                user: { id: r.user.id, username: r.user.username },
                                xpEarned: r.stats.xpPoints,
                                lessonsCompleted: r.stats.totalLessonsCompleted,
                            }); })];
                }
            });
        });
    };
    Storage.prototype.getVocabularyForLesson = function (lessonId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVocabulary(lessonId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Quiz management
    Storage.prototype.getQuizzes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allQuizzes, quizzesWithQuestions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(quizzes).orderBy(quizzes.order)];
                    case 1:
                        allQuizzes = _a.sent();
                        return [4 /*yield*/, Promise.all(allQuizzes.map(function (quiz) { return __awaiter(_this, void 0, void 0, function () {
                                var questions;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db
                                                .select()
                                                .from(quizQuestions)
                                                .where(eq(quizQuestions.quizId, quiz.id))
                                                .orderBy(quizQuestions.order)];
                                        case 1:
                                            questions = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, quiz), { questions: questions })];
                                    }
                                });
                            }); }))];
                    case 2:
                        quizzesWithQuestions = _a.sent();
                        return [2 /*return*/, quizzesWithQuestions];
                }
            });
        });
    };
    Storage.prototype.getQuiz = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var quiz, questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(quizzes).where(eq(quizzes.id, id))];
                    case 1:
                        quiz = (_a.sent())[0];
                        if (!quiz)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, db
                                .select()
                                .from(quizQuestions)
                                .where(eq(quizQuestions.quizId, id))
                                .orderBy(quizQuestions.order)];
                    case 2:
                        questions = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, quiz), { questions: questions })];
                }
            });
        });
    };
    Storage.prototype.createQuiz = function (insertQuiz) {
        return __awaiter(this, void 0, void 0, function () {
            var quiz;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(quizzes).values(insertQuiz).returning()];
                    case 1:
                        quiz = (_a.sent())[0];
                        return [2 /*return*/, quiz];
                }
            });
        });
    };
    Storage.prototype.createQuizQuestion = function (insertQuestion) {
        return __awaiter(this, void 0, void 0, function () {
            var question;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(quizQuestions).values(insertQuestion).returning()];
                    case 1:
                        question = (_a.sent())[0];
                        return [2 /*return*/, question];
                }
            });
        });
    };
    Storage.prototype.submitQuizAttempt = function (insertAttempt) {
        return __awaiter(this, void 0, void 0, function () {
            var attempt, stats, quiz;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(quizAttempts).values(insertAttempt).returning()];
                    case 1:
                        attempt = (_a.sent())[0];
                        if (!attempt.passed) return [3 /*break*/, 5];
                        return [4 /*yield*/, db
                                .select()
                                .from(userStats)
                                .where(eq(userStats.userId, attempt.userId))];
                    case 2:
                        stats = (_a.sent())[0];
                        return [4 /*yield*/, db
                                .select()
                                .from(quizzes)
                                .where(eq(quizzes.id, attempt.quizId))];
                    case 3:
                        quiz = (_a.sent())[0];
                        if (!(stats && quiz)) return [3 /*break*/, 5];
                        return [4 /*yield*/, db
                                .update(userStats)
                                .set({
                                totalQuizzesPassed: stats.totalQuizzesPassed + 1,
                                xpPoints: stats.xpPoints + (quiz.xpReward || 50),
                            })
                                .where(eq(userStats.id, stats.id))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, attempt];
                }
            });
        });
    };
    Storage.prototype.getQuizAttempts = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select()
                            .from(quizAttempts)
                            .where(eq(quizAttempts.userId, userId))
                            .orderBy(desc(quizAttempts.completedAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getAchievements = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Stub implementation
                return [2 /*return*/, []];
            });
        });
    };
    Storage.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Stub implementation
                return [2 /*return*/, []];
            });
        });
    };
    // ============ SPEAKING PRACTICE METHODS ============
    Storage.prototype.getSpeakingSessions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(speakingSessions)
                            .where(eq(speakingSessions.userId, userId))
                            .orderBy(desc(speakingSessions.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.createSpeakingSession = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(speakingSessions).values({
                            userId: userId,
                            sessionType: data.sessionType || 'free_practice',
                            lessonId: data.lessonId || null,
                            scenarioId: data.scenarioId || null,
                            durationSeconds: data.durationSeconds || 0,
                        }).returning()];
                    case 1:
                        session = (_a.sent())[0];
                        return [2 /*return*/, session];
                }
            });
        });
    };
    Storage.prototype.completeSpeakingSession = function (sessionId, scores) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.update(speakingSessions)
                            .set({
                            completedAt: new Date().toISOString(),
                            overallScore: scores.overallScore,
                            pronunciationScore: scores.pronunciationScore,
                            fluencyScore: scores.fluencyScore,
                            confidenceScore: scores.confidenceScore,
                        })
                            .where(eq(speakingSessions.id, sessionId))
                            .returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    Storage.prototype.createSpeakingAttempt = function (sessionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var attempt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(speakingAttempts).values({
                            sessionId: sessionId,
                            expectedText: data.expectedText,
                            spokenText: data.spokenText,
                            accuracyScore: data.accuracyScore || 0,
                            pronunciationIssues: data.pronunciationIssues,
                            feedbackData: data.feedbackData,
                            audioDurationMs: data.audioDurationMs,
                            attemptNumber: data.attemptNumber || 1,
                        }).returning()];
                    case 1:
                        attempt = (_a.sent())[0];
                        return [2 /*return*/, attempt];
                }
            });
        });
    };
    Storage.prototype.getSpeakingProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(userSpeakingProfiles)
                            .where(eq(userSpeakingProfiles.userId, userId))];
                    case 1:
                        profile = (_a.sent())[0];
                        return [2 /*return*/, profile || null];
                }
            });
        });
    };
    Storage.prototype.createSpeakingProfile = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insert(userSpeakingProfiles).values({
                            userId: userId,
                            currentLevel: data.currentLevel || 'beginner',
                            weakPhonemes: data.weakPhonemes,
                            strongAreas: data.strongAreas,
                            preferredPracticeType: data.preferredPracticeType || 'mixed',
                            culturalContextPreference: data.culturalContextPreference || 'indian_english',
                            totalPracticeMinutes: data.totalPracticeMinutes || 0,
                        }).returning()];
                    case 1:
                        profile = (_a.sent())[0];
                        return [2 /*return*/, profile];
                }
            });
        });
    };
    Storage.prototype.updateSpeakingProfile = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.update(userSpeakingProfiles)
                            .set(__assign(__assign({}, data), { updatedAt: new Date().toISOString() }))
                            .where(eq(userSpeakingProfiles.userId, userId))
                            .returning()];
                    case 1:
                        updated = (_a.sent())[0];
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    // ============ LISTENING METHODS ============
    Storage.prototype.getListenings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(listenings).orderBy(listenings.order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getListening = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var listening;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(listenings).where(eq(listenings.id, id))];
                    case 1:
                        listening = (_a.sent())[0];
                        return [2 /*return*/, listening];
                }
            });
        });
    };
    Storage.prototype.getListeningsByDifficulty = function (level) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(listenings).where(eq(listenings.difficulty, level))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Storage.prototype.getListeningsByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select().from(listenings).where(eq(listenings.category, category))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Storage;
}());
export { Storage };
export var storage = new Storage();
