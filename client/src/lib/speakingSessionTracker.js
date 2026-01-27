/**
 * Speaking Session Tracker
 * Comprehensive tracking system for speaking practice sessions
 * Integrates with conversation simulator and pronunciation analysis
 *
 * This module provides:
 * - Session lifecycle management (start, update, complete)
 * - Real-time progress tracking during sessions
 * - Analytics and reporting for user progress
 * - Personalized recommendations based on performance
 * - Integration with the backend API for data persistence
 *
 * **Validates: Requirements 4.1, 4.2**
 */
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
var SpeakingSessionTracker = /** @class */ (function () {
    function SpeakingSessionTracker() {
        this.currentSession = null;
        this.sessionStartTime = null;
        this.sessionMetrics = {};
    }
    /**
     * Start a new speaking session
     */
    SpeakingSessionTracker.prototype.startSession = function (sessionType, lessonId, scenarioId) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.sessionStartTime = new Date();
                        return [4 /*yield*/, this.createSessionInDatabase({
                                sessionType: sessionType,
                                lessonId: lessonId,
                                scenarioId: scenarioId,
                                startTime: this.sessionStartTime
                            })];
                    case 1:
                        sessionId = _a.sent();
                        // Initialize session progress
                        this.currentSession = {
                            sessionId: sessionId,
                            currentStage: 'introduction',
                            completedStages: 0,
                            totalStages: this.calculateTotalStages(sessionType, scenarioId),
                            elapsedTime: 0,
                            vocabularyIntroduced: [],
                            vocabularyUsed: [],
                            pronunciationIssues: []
                        };
                        return [2 /*return*/, this.currentSession];
                }
            });
        });
    };
    /**
     * Update session progress during conversation
     */
    SpeakingSessionTracker.prototype.updateSessionProgress = function (stageId, userInput, accuracy, vocabularyUsed, pronunciationIssues) {
        var _this = this;
        if (vocabularyUsed === void 0) { vocabularyUsed = []; }
        if (pronunciationIssues === void 0) { pronunciationIssues = []; }
        if (!this.currentSession || !this.sessionStartTime) {
            throw new Error('No active session');
        }
        // Update current stage
        this.currentSession.currentStage = stageId;
        // Update elapsed time
        this.currentSession.elapsedTime = Date.now() - this.sessionStartTime.getTime();
        // Track vocabulary usage
        vocabularyUsed.forEach(function (word) {
            if (!_this.currentSession.vocabularyUsed.includes(word)) {
                _this.currentSession.vocabularyUsed.push(word);
            }
        });
        // Track pronunciation issues
        pronunciationIssues.forEach(function (issue) {
            var existingIssue = _this.currentSession.pronunciationIssues.find(function (p) { return p.phoneme === issue.phoneme; });
            if (existingIssue) {
                existingIssue.frequency += 1;
                existingIssue.lastPracticed = new Date();
            }
            else {
                _this.currentSession.pronunciationIssues.push(__assign(__assign({}, issue), { frequency: 1, lastPracticed: new Date() }));
            }
        });
        // Update metrics based on accuracy
        this.updateSessionMetrics(accuracy, vocabularyUsed.length, pronunciationIssues);
    };
    /**
     * Mark a stage as completed
     */
    SpeakingSessionTracker.prototype.completeStage = function (stageId, stageScore) {
        if (!this.currentSession) {
            throw new Error('No active session');
        }
        this.currentSession.completedStages += 1;
        // Update overall session score
        this.sessionMetrics.overallScore = this.calculateOverallScore();
    };
    /**
     * Introduce vocabulary for upcoming stage
     */
    SpeakingSessionTracker.prototype.introduceVocabulary = function (words) {
        var _this = this;
        if (!this.currentSession) {
            throw new Error('No active session');
        }
        words.forEach(function (word) {
            if (!_this.currentSession.vocabularyIntroduced.includes(word)) {
                _this.currentSession.vocabularyIntroduced.push(word);
            }
        });
    };
    /**
     * Complete the current session
     */
    SpeakingSessionTracker.prototype.completeSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var finalMetrics, durationSeconds, completedMetrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentSession || !this.sessionStartTime) {
                            throw new Error('No active session');
                        }
                        finalMetrics = this.calculateFinalMetrics();
                        durationSeconds = Math.floor((Date.now() - this.sessionStartTime.getTime()) / 1000);
                        // Save session to database
                        return [4 /*yield*/, this.saveSessionToDatabase({
                                sessionId: this.currentSession.sessionId,
                                durationSeconds: durationSeconds,
                                metrics: finalMetrics,
                                vocabularyUsed: this.currentSession.vocabularyUsed,
                                pronunciationIssues: this.currentSession.pronunciationIssues,
                                completedStages: this.currentSession.completedStages,
                                totalStages: this.currentSession.totalStages
                            })];
                    case 1:
                        // Save session to database
                        _a.sent();
                        // Update user pronunciation progress
                        return [4 /*yield*/, this.updatePronunciationProgress(this.currentSession.pronunciationIssues)];
                    case 2:
                        // Update user pronunciation progress
                        _a.sent();
                        completedMetrics = finalMetrics;
                        this.currentSession = null;
                        this.sessionStartTime = null;
                        this.sessionMetrics = {};
                        return [2 /*return*/, completedMetrics];
                }
            });
        });
    };
    /**
     * Get current session progress
     */
    SpeakingSessionTracker.prototype.getCurrentProgress = function () {
        return this.currentSession;
    };
    /**
     * Get session analytics for a user
     */
    SpeakingSessionTracker.prototype.getSessionAnalytics = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, timeframe) {
            var sessions, totalSessions, totalMinutes, averageScore, improvementRate, _a, strongAreas, weakAreas, recentTrends;
            if (timeframe === void 0) { timeframe = 'month'; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetchUserSessions(userId, timeframe)];
                    case 1:
                        sessions = _b.sent();
                        totalSessions = sessions.length;
                        totalMinutes = sessions.reduce(function (sum, session) { return sum + session.duration; }, 0);
                        averageScore = sessions.length > 0
                            ? sessions.reduce(function (sum, session) { return sum + session.score; }, 0) / sessions.length
                            : 0;
                        improvementRate = this.calculateImprovementRate(sessions);
                        _a = this.analyzePerformanceAreas(sessions), strongAreas = _a.strongAreas, weakAreas = _a.weakAreas;
                        recentTrends = this.generateTrendData(sessions);
                        return [2 /*return*/, {
                                totalSessions: totalSessions,
                                totalMinutes: totalMinutes,
                                averageScore: averageScore,
                                improvementRate: improvementRate,
                                strongAreas: strongAreas,
                                weakAreas: weakAreas,
                                recentTrends: recentTrends
                            }];
                }
            });
        });
    };
    /**
     * Get personalized recommendations based on session history
     * Provides bilingual recommendations (Hindi and English)
     */
    SpeakingSessionTracker.prototype.getRecommendations = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var analytics, recommendations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSessionAnalytics(userId)];
                    case 1:
                        analytics = _a.sent();
                        recommendations = [];
                        // Vocabulary recommendations
                        if (analytics.weakAreas.includes('vocabulary')) {
                            recommendations.push({
                                type: 'vocabulary',
                                priority: 'high',
                                title: 'Vocabulary Building Practice',
                                hindiTitle: 'शब्दावली निर्माण अभ्यास',
                                description: 'Focus on expanding your vocabulary with business and social contexts',
                                hindiDescription: 'व्यापार और सामाजिक संदर्भों के साथ अपनी शब्दावली का विस्तार करने पर ध्यान दें',
                                estimatedTime: 15,
                                targetArea: 'vocabulary'
                            });
                        }
                        // Pronunciation recommendations
                        if (analytics.weakAreas.includes('pronunciation')) {
                            recommendations.push({
                                type: 'pronunciation',
                                priority: 'high',
                                title: 'Pronunciation Improvement',
                                hindiTitle: 'उच्चारण सुधार',
                                description: 'Practice difficult phonemes and common Hindi speaker challenges',
                                hindiDescription: 'कठिन ध्वनियों और हिंदी बोलने वालों की आम चुनौतियों का अभ्यास करें',
                                estimatedTime: 20,
                                targetArea: 'pronunciation'
                            });
                        }
                        // Cultural context recommendations
                        if (analytics.averageScore < 70) {
                            recommendations.push({
                                type: 'cultural',
                                priority: 'medium',
                                title: 'Cultural Context Practice',
                                hindiTitle: 'सांस्कृतिक संदर्भ अभ्यास',
                                description: 'Learn appropriate communication styles for different situations',
                                hindiDescription: 'विभिन्न स्थितियों के लिए उचित संचार शैली सीखें',
                                estimatedTime: 10,
                                targetArea: 'cultural_awareness'
                            });
                        }
                        // Fluency recommendations
                        if (analytics.weakAreas.includes('fluency')) {
                            recommendations.push({
                                type: 'fluency',
                                priority: 'medium',
                                title: 'Fluency Development',
                                hindiTitle: 'प्रवाह विकास',
                                description: 'Practice speaking more naturally and confidently',
                                hindiDescription: 'अधिक स्वाभाविक और आत्मविश्वास से बोलने का अभ्यास करें',
                                estimatedTime: 25,
                                targetArea: 'fluency'
                            });
                        }
                        return [2 /*return*/, recommendations.slice(0, 3)]; // Return top 3 recommendations
                }
            });
        });
    };
    /**
     * Generate weekly progress report with bilingual content
     * **Validates: Requirements 4.2**
     */
    SpeakingSessionTracker.prototype.generateWeeklyReport = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var analytics, recommendations, summary, hindiSummary, achievements, improvements, nextWeekGoals, visualData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSessionAnalytics(userId, 'week')];
                    case 1:
                        analytics = _a.sent();
                        return [4 /*yield*/, this.getRecommendations(userId)];
                    case 2:
                        recommendations = _a.sent();
                        summary = this.generateProgressSummary(analytics);
                        hindiSummary = this.generateHindiProgressSummary(analytics);
                        achievements = this.identifyAchievements(analytics);
                        improvements = this.identifyImprovements(analytics);
                        nextWeekGoals = this.generateNextWeekGoals(recommendations, analytics);
                        visualData = this.generateVisualizationData(analytics);
                        return [2 /*return*/, {
                                summary: summary,
                                hindiSummary: hindiSummary,
                                achievements: achievements,
                                improvements: improvements,
                                nextWeekGoals: nextWeekGoals,
                                metrics: analytics,
                                visualData: visualData
                            }];
                }
            });
        });
    };
    // ============ PRIVATE HELPER METHODS ============
    /**
     * Create session in database (mock implementation)
     */
    SpeakingSessionTracker.prototype.createSessionInDatabase = function (sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // In real implementation, this would insert into speakingSessions table
                // For now, return a mock session ID
                return [2 /*return*/, Math.floor(Math.random() * 10000) + 1];
            });
        });
    };
    /**
     * Calculate total stages for a session type
     */
    SpeakingSessionTracker.prototype.calculateTotalStages = function (sessionType, scenarioId) {
        switch (sessionType) {
            case 'pronunciation':
                return 5; // Introduction, Practice, Assessment, Feedback, Summary
            case 'conversation':
                return scenarioId ? 8 : 6; // Varies based on scenario complexity
            case 'free_practice':
                return 3; // Warm-up, Practice, Review
            default:
                return 5;
        }
    };
    /**
     * Update session metrics based on performance
     */
    SpeakingSessionTracker.prototype.updateSessionMetrics = function (accuracy, vocabularyCount, pronunciationIssues) {
        // Update pronunciation score based on issues
        var pronunciationScore = Math.max(0, 100 - (pronunciationIssues.length * 10));
        this.sessionMetrics.pronunciationScore = pronunciationScore;
        // Update vocabulary usage score
        var vocabularyScore = Math.min(100, vocabularyCount * 5);
        this.sessionMetrics.vocabularyUsage = vocabularyScore;
        // Update fluency score based on accuracy
        this.sessionMetrics.fluencyScore = accuracy;
        // Update confidence score (simplified calculation)
        this.sessionMetrics.confidenceScore = Math.min(100, (accuracy + pronunciationScore) / 2);
    };
    /**
     * Calculate overall session score
     */
    SpeakingSessionTracker.prototype.calculateOverallScore = function () {
        var metrics = this.sessionMetrics;
        var weights = {
            pronunciation: 0.3,
            fluency: 0.3,
            vocabulary: 0.2,
            confidence: 0.2
        };
        return Math.round((metrics.pronunciationScore || 0) * weights.pronunciation +
            (metrics.fluencyScore || 0) * weights.fluency +
            (metrics.vocabularyUsage || 0) * weights.vocabulary +
            (metrics.confidenceScore || 0) * weights.confidence);
    };
    /**
     * Calculate final session metrics
     */
    SpeakingSessionTracker.prototype.calculateFinalMetrics = function () {
        var overallScore = this.calculateOverallScore();
        return {
            overallScore: overallScore,
            pronunciationScore: this.sessionMetrics.pronunciationScore || 0,
            fluencyScore: this.sessionMetrics.fluencyScore || 0,
            confidenceScore: this.sessionMetrics.confidenceScore || 0,
            vocabularyUsage: this.sessionMetrics.vocabularyUsage || 0,
            culturalAppropriatenessScore: 85 // Default cultural score
        };
    };
    /**
     * Save session to database (mock implementation)
     */
    SpeakingSessionTracker.prototype.saveSessionToDatabase = function (sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // In real implementation, this would update the speakingSessions table
                // and create records in speakingAttempts table
                console.log('Session saved:', sessionData);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Update pronunciation progress tracking
     */
    SpeakingSessionTracker.prototype.updatePronunciationProgress = function (issues) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, issues_1, issue;
            return __generator(this, function (_a) {
                // In real implementation, this would update pronunciationProgress table
                for (_i = 0, issues_1 = issues; _i < issues_1.length; _i++) {
                    issue = issues_1[_i];
                    console.log("Updating pronunciation progress for phoneme: ".concat(issue.phoneme));
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Fetch user sessions from database (mock implementation)
     */
    SpeakingSessionTracker.prototype.fetchUserSessions = function (userId, timeframe) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock session data
                return [2 /*return*/, [
                        { id: 1, score: 75, duration: 15, type: 'conversation', date: '2024-01-10' },
                        { id: 2, score: 82, duration: 20, type: 'pronunciation', date: '2024-01-09' },
                        { id: 3, score: 68, duration: 12, type: 'free_practice', date: '2024-01-08' }
                    ]];
            });
        });
    };
    /**
     * Calculate improvement rate over time
     */
    SpeakingSessionTracker.prototype.calculateImprovementRate = function (sessions) {
        if (sessions.length < 2)
            return 0;
        var firstHalf = sessions.slice(0, Math.floor(sessions.length / 2));
        var secondHalf = sessions.slice(Math.floor(sessions.length / 2));
        var firstAvg = firstHalf.reduce(function (sum, s) { return sum + s.score; }, 0) / firstHalf.length;
        var secondAvg = secondHalf.reduce(function (sum, s) { return sum + s.score; }, 0) / secondHalf.length;
        return Math.round(((secondAvg - firstAvg) / firstAvg) * 100);
    };
    /**
     * Analyze performance areas
     */
    SpeakingSessionTracker.prototype.analyzePerformanceAreas = function (sessions) {
        // Simplified analysis based on session types and scores
        var strongAreas = [];
        var weakAreas = [];
        var avgScore = sessions.reduce(function (sum, s) { return sum + s.score; }, 0) / sessions.length;
        if (avgScore >= 80) {
            strongAreas.push('overall_performance');
        }
        else if (avgScore < 60) {
            weakAreas.push('overall_performance');
        }
        // Analyze by session type
        var conversationSessions = sessions.filter(function (s) { return s.type === 'conversation'; });
        var pronunciationSessions = sessions.filter(function (s) { return s.type === 'pronunciation'; });
        if (conversationSessions.length > 0) {
            var conversationAvg = conversationSessions.reduce(function (sum, s) { return sum + s.score; }, 0) / conversationSessions.length;
            if (conversationAvg >= 75) {
                strongAreas.push('conversation');
            }
            else if (conversationAvg < 65) {
                weakAreas.push('conversation');
            }
        }
        if (pronunciationSessions.length > 0) {
            var pronunciationAvg = pronunciationSessions.reduce(function (sum, s) { return sum + s.score; }, 0) / pronunciationSessions.length;
            if (pronunciationAvg >= 75) {
                strongAreas.push('pronunciation');
            }
            else if (pronunciationAvg < 65) {
                weakAreas.push('pronunciation');
            }
        }
        return { strongAreas: strongAreas, weakAreas: weakAreas };
    };
    /**
     * Generate trend data for visualization
     */
    SpeakingSessionTracker.prototype.generateTrendData = function (sessions) {
        return sessions.map(function (session) { return ({
            date: session.date,
            score: session.score,
            sessionType: session.type,
            duration: session.duration
        }); });
    };
    /**
     * Generate progress summary
     */
    SpeakingSessionTracker.prototype.generateProgressSummary = function (analytics) {
        var totalSessions = analytics.totalSessions, averageScore = analytics.averageScore, improvementRate = analytics.improvementRate;
        if (totalSessions === 0) {
            return "No speaking practice sessions completed this week. Start your first session to begin tracking your progress!";
        }
        var summary = "You completed ".concat(totalSessions, " speaking practice session").concat(totalSessions > 1 ? 's' : '', " this week with an average score of ").concat(Math.round(averageScore), "%.");
        if (improvementRate > 0) {
            summary += " Great job! Your performance improved by ".concat(improvementRate, "% compared to previous sessions.");
        }
        else if (improvementRate < 0) {
            summary += " Keep practicing! Focus on your weak areas to improve your scores.";
        }
        else {
            summary += " You're maintaining consistent performance. Try challenging yourself with more difficult scenarios.";
        }
        return summary;
    };
    /**
     * Generate Hindi progress summary
     */
    SpeakingSessionTracker.prototype.generateHindiProgressSummary = function (analytics) {
        var totalSessions = analytics.totalSessions, averageScore = analytics.averageScore, improvementRate = analytics.improvementRate;
        if (totalSessions === 0) {
            return "इस सप्ताह कोई बोलने का अभ्यास सत्र पूरा नहीं हुआ। अपनी प्रगति को ट्रैक करने के लिए अपना पहला सत्र शुरू करें!";
        }
        var summary = "\u0906\u092A\u0928\u0947 \u0907\u0938 \u0938\u092A\u094D\u0924\u093E\u0939 ".concat(totalSessions, " \u092C\u094B\u0932\u0928\u0947 \u0915\u093E \u0905\u092D\u094D\u092F\u093E\u0938 \u0938\u0924\u094D\u0930 \u092A\u0942\u0930\u093E \u0915\u093F\u092F\u093E \u0939\u0948 \u091C\u093F\u0938\u092E\u0947\u0902 \u0914\u0938\u0924 \u0938\u094D\u0915\u094B\u0930 ").concat(Math.round(averageScore), "% \u0939\u0948\u0964");
        if (improvementRate > 0) {
            summary += " \u092C\u0939\u0941\u0924 \u092C\u0922\u093C\u093F\u092F\u093E! \u0906\u092A\u0915\u0947 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u0928 \u092E\u0947\u0902 \u092A\u093F\u091B\u0932\u0947 \u0938\u0924\u094D\u0930\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u092E\u0947\u0902 ".concat(improvementRate, "% \u0938\u0941\u0927\u093E\u0930 \u0939\u0941\u0906 \u0939\u0948\u0964");
        }
        else if (improvementRate < 0) {
            summary += " \u0905\u092D\u094D\u092F\u093E\u0938 \u091C\u093E\u0930\u0940 \u0930\u0916\u0947\u0902! \u0905\u092A\u0928\u0947 \u0938\u094D\u0915\u094B\u0930 \u092E\u0947\u0902 \u0938\u0941\u0927\u093E\u0930 \u0915\u0947 \u0932\u093F\u090F \u0905\u092A\u0928\u0947 \u0915\u092E\u091C\u094B\u0930 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u092A\u0930 \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0902\u0964";
        }
        else {
            summary += " \u0906\u092A \u0932\u0917\u093E\u0924\u093E\u0930 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u0928 \u092C\u0928\u093E\u090F \u0930\u0916 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964 \u0905\u0927\u093F\u0915 \u0915\u0920\u093F\u0928 \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0916\u0941\u0926 \u0915\u094B \u091A\u0941\u0928\u094C\u0924\u0940 \u0926\u0947\u0928\u0947 \u0915\u0940 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964";
        }
        return summary;
    };
    /**
     * Identify achievements based on performance
     */
    SpeakingSessionTracker.prototype.identifyAchievements = function (analytics) {
        var achievements = [];
        var now = new Date().toISOString();
        if (analytics.totalSessions >= 5) {
            achievements.push({
                id: 'consistent_learner',
                title: 'Consistent Learner',
                hindiTitle: 'निरंतर शिक्षार्थी',
                description: 'Completed 5+ sessions this week',
                hindiDescription: 'इस सप्ताह 5+ सत्र पूरे किए',
                icon: '🎯',
                earnedAt: now
            });
        }
        if (analytics.averageScore >= 85) {
            achievements.push({
                id: 'excellence_award',
                title: 'Excellence Award',
                hindiTitle: 'उत्कृष्टता पुरस्कार',
                description: 'Maintained 85%+ average score',
                hindiDescription: '85%+ औसत स्कोर बनाए रखा',
                icon: '⭐',
                earnedAt: now
            });
        }
        if (analytics.improvementRate >= 10) {
            achievements.push({
                id: 'rapid_improvement',
                title: 'Rapid Improvement',
                hindiTitle: 'तेज़ सुधार',
                description: '10%+ score improvement',
                hindiDescription: '10%+ स्कोर सुधार',
                icon: '📈',
                earnedAt: now
            });
        }
        if (analytics.strongAreas.includes('pronunciation')) {
            achievements.push({
                id: 'pronunciation_master',
                title: 'Pronunciation Master',
                hindiTitle: 'उच्चारण विशेषज्ञ',
                description: 'Excellent pronunciation skills',
                hindiDescription: 'उत्कृष्ट उच्चारण कौशल',
                icon: '🗣️',
                earnedAt: now
            });
        }
        if (analytics.totalMinutes >= 60) {
            achievements.push({
                id: 'dedicated_practitioner',
                title: 'Dedicated Practitioner',
                hindiTitle: 'समर्पित अभ्यासी',
                description: 'Practiced for 60+ minutes this week',
                hindiDescription: 'इस सप्ताह 60+ मिनट अभ्यास किया',
                icon: '⏱️',
                earnedAt: now
            });
        }
        return achievements;
    };
    /**
     * Identify areas for improvement with bilingual content
     */
    SpeakingSessionTracker.prototype.identifyImprovements = function (analytics) {
        var improvements = [];
        if (analytics.weakAreas.includes('vocabulary')) {
            improvements.push({
                area: 'Vocabulary',
                hindiArea: 'शब्दावली',
                suggestion: 'Expand your vocabulary by practicing with more diverse scenarios',
                hindiSuggestion: 'अधिक विविध परिदृश्यों के साथ अभ्यास करके अपनी शब्दावली का विस्तार करें',
                priority: 'high'
            });
        }
        if (analytics.weakAreas.includes('pronunciation')) {
            improvements.push({
                area: 'Pronunciation',
                hindiArea: 'उच्चारण',
                suggestion: 'Focus on difficult phonemes and practice with pronunciation exercises',
                hindiSuggestion: 'कठिन ध्वनियों पर ध्यान दें और उच्चारण अभ्यास के साथ अभ्यास करें',
                priority: 'high'
            });
        }
        if (analytics.averageScore < 70) {
            improvements.push({
                area: 'Overall Performance',
                hindiArea: 'समग्र प्रदर्शन',
                suggestion: 'Increase practice frequency and focus on fundamental speaking skills',
                hindiSuggestion: 'अभ्यास की आवृत्ति बढ़ाएं और मौलिक बोलने के कौशल पर ध्यान दें',
                priority: 'medium'
            });
        }
        if (analytics.weakAreas.includes('fluency')) {
            improvements.push({
                area: 'Fluency',
                hindiArea: 'प्रवाह',
                suggestion: 'Practice speaking without pauses and hesitations',
                hindiSuggestion: 'बिना रुके और हिचकिचाहट के बोलने का अभ्यास करें',
                priority: 'medium'
            });
        }
        if (analytics.totalSessions < 3) {
            improvements.push({
                area: 'Practice Frequency',
                hindiArea: 'अभ्यास आवृत्ति',
                suggestion: 'Try to practice at least 3 times per week for better results',
                hindiSuggestion: 'बेहतर परिणामों के लिए सप्ताह में कम से कम 3 बार अभ्यास करने का प्रयास करें',
                priority: 'low'
            });
        }
        return improvements;
    };
    /**
     * Generate goals for next week with bilingual content
     */
    SpeakingSessionTracker.prototype.generateNextWeekGoals = function (recommendations, analytics) {
        var goals = [];
        // Session count goal
        goals.push({
            id: 'session_count',
            title: 'Complete speaking practice sessions',
            hindiTitle: 'बोलने के अभ्यास सत्र पूरे करें',
            targetValue: Math.max(3, analytics.totalSessions + 1),
            currentValue: 0,
            unit: 'sessions'
        });
        // Practice time goal
        goals.push({
            id: 'practice_time',
            title: 'Total practice time',
            hindiTitle: 'कुल अभ्यास समय',
            targetValue: Math.max(30, analytics.totalMinutes + 10),
            currentValue: 0,
            unit: 'minutes'
        });
        // Score improvement goal
        if (analytics.averageScore < 80) {
            goals.push({
                id: 'score_improvement',
                title: 'Achieve average accuracy',
                hindiTitle: 'औसत सटीकता प्राप्त करें',
                targetValue: Math.min(100, Math.round(analytics.averageScore + 5)),
                currentValue: Math.round(analytics.averageScore),
                unit: '%'
            });
        }
        // Add recommendation-based goals
        if (recommendations.length > 0) {
            var highPriorityRec = recommendations.find(function (r) { return r.priority === 'high'; });
            if (highPriorityRec) {
                goals.push({
                    id: "focus_".concat(highPriorityRec.targetArea),
                    title: "Focus on ".concat(highPriorityRec.targetArea, " improvement"),
                    hindiTitle: "".concat(highPriorityRec.hindiTitle, " \u092A\u0930 \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0902"),
                    targetValue: 3,
                    currentValue: 0,
                    unit: 'exercises'
                });
            }
        }
        // Try new scenario goal
        goals.push({
            id: 'new_scenario',
            title: 'Try a new conversation scenario',
            hindiTitle: 'एक नया वार्तालाप परिदृश्य आज़माएं',
            targetValue: 1,
            currentValue: 0,
            unit: 'scenarios'
        });
        return goals.slice(0, 5); // Return top 5 goals
    };
    /**
     * Generate visualization data for progress charts
     */
    SpeakingSessionTracker.prototype.generateVisualizationData = function (analytics) {
        // Score history from trends
        var scoreHistory = analytics.recentTrends.map(function (trend) { return ({
            date: trend.date,
            score: trend.score
        }); });
        // Session type distribution
        var typeCount = {};
        analytics.recentTrends.forEach(function (trend) {
            typeCount[trend.sessionType] = (typeCount[trend.sessionType] || 0) + 1;
        });
        var sessionTypeDistribution = Object.entries(typeCount).map(function (_a) {
            var type = _a[0], count = _a[1];
            return ({
                type: type,
                count: count
            });
        });
        // Phoneme progress (mock data - would come from pronunciation tracking)
        var phonemeProgress = [
            { phoneme: 'th', accuracy: 75, trend: 'up' },
            { phoneme: 'v/w', accuracy: 68, trend: 'stable' },
            { phoneme: 'r', accuracy: 82, trend: 'up' }
        ];
        // Weekly practice time distribution
        var weeklyPracticeTime = this.calculateWeeklyPracticeTime(analytics.recentTrends);
        return {
            scoreHistory: scoreHistory,
            sessionTypeDistribution: sessionTypeDistribution,
            phonemeProgress: phonemeProgress,
            weeklyPracticeTime: weeklyPracticeTime
        };
    };
    /**
     * Calculate practice time distribution by day of week
     */
    SpeakingSessionTracker.prototype.calculateWeeklyPracticeTime = function (trends) {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayMinutes = {};
        dayNames.forEach(function (day) {
            dayMinutes[day] = 0;
        });
        trends.forEach(function (trend) {
            var date = new Date(trend.date);
            var dayName = dayNames[date.getDay()];
            dayMinutes[dayName] += trend.duration;
        });
        return dayNames.map(function (day) { return ({
            day: day,
            minutes: dayMinutes[day]
        }); });
    };
    return SpeakingSessionTracker;
}());
export { SpeakingSessionTracker };
// Export singleton instance
export var speakingSessionTracker = new SpeakingSessionTracker();
