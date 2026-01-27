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
import { storage } from "./storage";
import logger from "./logger";
import { chatService } from "./chat-service";
export function registerRoutes(_httpServer, app) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // AI Chat API
            app.post("/api/chat", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var message, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            message = req.body.message;
                            if (!message)
                                return [2 /*return*/, res.status(400).json({ message: "Message is required" })];
                            return [4 /*yield*/, chatService.generateResponse(message)];
                        case 1:
                            response = _a.sent();
                            res.json({ response: response });
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            logger.error("Error in chat endpoint:", error_1);
                            res.status(500).json({ message: "Failed to process message" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // AI Video Call API (Innovation Lab)
            app.post("/api/ai/video-chat", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, message, scenario, textResponse, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = req.body, message = _a.message, scenario = _a.scenario;
                            if (!message)
                                return [2 /*return*/, res.status(400).json({ message: "Message is required" })];
                            return [4 /*yield*/, chatService.generateResponse("[Scenario: ".concat(scenario || 'General Chat', "] User says: ").concat(message))];
                        case 1:
                            textResponse = _b.sent();
                            // In a full implementation, we would ask the AI to return JSON.
                            // For now, we wrap the text response to satisfy the frontend contract.
                            res.json({
                                text: textResponse,
                                hindiMeaning: "अनुवाद जल्द ही आ रहा है...", // Placeholder for stable demo
                                emotion: "happy" // Default emotion
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            logger.error("Error in video chat endpoint:", error_2);
                            res.status(500).json({ message: "Failed to process video chat" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Lessons API
            app.get("/api/lessons", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var lessons, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getLessons()];
                        case 1:
                            lessons = _a.sent();
                            res.json(lessons);
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            logger.error("Error fetching lessons:", error_3);
                            res.status(500).json({ message: "Failed to fetch lessons" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/lessons/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var lesson, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getLesson(Number(req.params.id))];
                        case 1:
                            lesson = _a.sent();
                            if (!lesson)
                                return [2 /*return*/, res.status(404).json({ message: "Lesson not found" })];
                            res.json(lesson);
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            logger.error("Error fetching lesson ".concat(req.params.id, ":"), error_4);
                            res.status(500).json({ message: "Failed to fetch lesson" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Stories
            app.get("/api/stories", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var stories, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getStories()];
                        case 1:
                            stories = _a.sent();
                            res.json(stories);
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            logger.error("Error fetching stories:", error_5);
                            res.status(500).json({ message: "Failed to fetch stories" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Scenarios
            app.get("/api/scenarios", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var scenarios, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getScenarios()];
                        case 1:
                            scenarios = _a.sent();
                            res.json(scenarios);
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            logger.error("Error fetching scenarios:", error_6);
                            res.status(500).json({ message: "Failed to fetch scenarios" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // User Progress (Protected)
            app.get("/api/progress", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, progress, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.getProgress(user.id)];
                        case 2:
                            progress = _a.sent();
                            res.json(progress);
                            return [3 /*break*/, 4];
                        case 3:
                            error_7 = _a.sent();
                            logger.error("Error fetching progress for user ".concat(user === null || user === void 0 ? void 0 : user.id, ":"), error_7);
                            res.status(500).json({ message: "Failed to fetch progress" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/progress/:lessonId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, progress, error_8;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.markLessonComplete(user.id, Number(req.params.lessonId), (_a = req.body.completed) !== null && _a !== void 0 ? _a : true)];
                        case 2:
                            progress = _b.sent();
                            res.json(progress);
                            return [3 /*break*/, 4];
                        case 3:
                            error_8 = _b.sent();
                            logger.error("Error updating progress for user ".concat(user === null || user === void 0 ? void 0 : user.id, ", lesson ").concat(req.params.lessonId, ":"), error_8);
                            res.status(500).json({ message: "Failed to update progress" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // Create Lesson (Admin)
            app.post("/api/lessons", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var lesson, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.createLesson(req.body)];
                        case 1:
                            lesson = _a.sent();
                            res.status(201).json(lesson);
                            return [3 /*break*/, 3];
                        case 2:
                            error_9 = _a.sent();
                            logger.error("Error creating lesson:", error_9);
                            res.status(500).json({ message: "Failed to create lesson" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/lessons/:id/complete", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, progress, error_10;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (req.isAuthenticated && !req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user || { id: 1 };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.markLessonComplete(user.id, Number(req.params.id), (_a = req.body.completed) !== null && _a !== void 0 ? _a : true)];
                        case 2:
                            progress = _b.sent();
                            res.json(progress);
                            return [3 /*break*/, 4];
                        case 3:
                            error_10 = _b.sent();
                            logger.error("Error completing lesson ".concat(req.params.id, ":"), error_10);
                            res.status(500).json({ message: "Failed to complete lesson" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // Quizzes
            app.get("/api/quizzes", function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                var quizzes, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getQuizzes()];
                        case 1:
                            quizzes = _a.sent();
                            res.json(quizzes);
                            return [3 /*break*/, 3];
                        case 2:
                            error_11 = _a.sent();
                            logger.error("Error fetching quizzes:", error_11);
                            res.status(500).json({ message: "Failed to fetch quizzes" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/quizzes/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var quiz, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.getQuiz(Number(req.params.id))];
                        case 1:
                            quiz = _a.sent();
                            if (!quiz)
                                return [2 /*return*/, res.status(404).json({ message: "Quiz not found" })];
                            res.json(quiz);
                            return [3 /*break*/, 3];
                        case 2:
                            error_12 = _a.sent();
                            logger.error("Error fetching quiz ".concat(req.params.id, ":"), error_12);
                            res.status(500).json({ message: "Failed to fetch quiz" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/quizzes", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var quiz, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.createQuiz(req.body)];
                        case 1:
                            quiz = _a.sent();
                            res.status(201).json(quiz);
                            return [3 /*break*/, 3];
                        case 2:
                            error_13 = _a.sent();
                            logger.error("Error creating quiz:", error_13);
                            res.status(500).json({ message: "Failed to create quiz" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/quizzes/:id/questions", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var question, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage.createQuizQuestion(__assign(__assign({}, req.body), { quizId: Number(req.params.id) }))];
                        case 1:
                            question = _a.sent();
                            res.status(201).json(question);
                            return [3 /*break*/, 3];
                        case 2:
                            error_14 = _a.sent();
                            logger.error("Error creating quiz question:", error_14);
                            res.status(500).json({ message: "Failed to create quiz question" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            app.post("/api/quizzes/:id/submit", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, _a, answers_1, timeSpent, quiz, score_1, totalQuestions, percentage, passed, attempt, error_15;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (req.isAuthenticated && !req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user || { id: 1 };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            _a = req.body, answers_1 = _a.answers, timeSpent = _a.timeSpent;
                            return [4 /*yield*/, storage.getQuiz(Number(req.params.id))];
                        case 2:
                            quiz = _b.sent();
                            if (!quiz)
                                return [2 /*return*/, res.status(404).json({ message: "Quiz not found" })];
                            score_1 = 0;
                            totalQuestions = quiz.questions.length;
                            quiz.questions.forEach(function (question, index) {
                                var userAnswer = answers_1[index];
                                var correctAnswer = question.correctAnswer;
                                // Handle different question types
                                if (question.questionType === 'mcq' || question.questionType === 'true_false') {
                                    if (userAnswer === correctAnswer)
                                        score_1 += question.points || 10;
                                }
                                else if (question.questionType === 'fill_blank') {
                                    if ((userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.toLowerCase().trim()) === correctAnswer.toLowerCase().trim()) {
                                        score_1 += question.points || 10;
                                    }
                                }
                                else if (question.questionType === 'match') {
                                    // For match questions, compare arrays
                                    if (JSON.stringify(userAnswer) === JSON.stringify(JSON.parse(correctAnswer))) {
                                        score_1 += question.points || 10;
                                    }
                                }
                            });
                            percentage = Math.round((score_1 / (totalQuestions * 10)) * 100);
                            passed = percentage >= (quiz.passingScore || 70);
                            return [4 /*yield*/, storage.submitQuizAttempt({
                                    userId: user.id,
                                    quizId: Number(req.params.id),
                                    score: score_1,
                                    totalQuestions: totalQuestions,
                                    answers: JSON.stringify(answers_1),
                                    timeSpent: timeSpent,
                                    passed: passed,
                                })];
                        case 3:
                            attempt = _b.sent();
                            res.json({
                                attempt: attempt,
                                score: score_1,
                                percentage: percentage,
                                passed: passed,
                                totalQuestions: totalQuestions,
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            error_15 = _b.sent();
                            logger.error("Error submitting quiz ".concat(req.params.id, ":"), error_15);
                            res.status(500).json({ message: "Failed to submit quiz" });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            app.get("/api/quizzes/attempts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, attempts, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.isAuthenticated && !req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user || { id: 1 };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.getQuizAttempts(user.id)];
                        case 2:
                            attempts = _a.sent();
                            res.json(attempts);
                            return [3 /*break*/, 4];
                        case 3:
                            error_16 = _a.sent();
                            logger.error("Error fetching quiz attempts for user ".concat(user === null || user === void 0 ? void 0 : user.id, ":"), error_16);
                            res.status(500).json({ message: "Failed to fetch quiz attempts" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // User Stats
            app.get("/api/users/stats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, stats, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.isAuthenticated && !req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user || { id: 1 };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.getUserStats(user.id)];
                        case 2:
                            stats = _a.sent();
                            if (!stats)
                                return [2 /*return*/, res.status(404).json({ message: "Stats not found" })];
                            res.json(stats);
                            return [3 /*break*/, 4];
                        case 3:
                            error_17 = _a.sent();
                            logger.error("Error fetching stats for user ".concat(user === null || user === void 0 ? void 0 : user.id, ":"), error_17);
                            res.status(500).json({ message: "Failed to fetch stats" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.put("/api/users/stats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var user, stats, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (req.isAuthenticated && !req.isAuthenticated())
                                return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                            user = req.user || { id: 1 };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, storage.updateUserStats(user.id, req.body)];
                        case 2:
                            stats = _a.sent();
                            res.json(stats);
                            return [3 /*break*/, 4];
                        case 3:
                            error_18 = _a.sent();
                            logger.error("Error updating stats for user ".concat(user === null || user === void 0 ? void 0 : user.id, ":"), error_18);
                            res.status(500).json({ message: "Failed to update stats" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
