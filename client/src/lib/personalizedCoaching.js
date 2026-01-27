/**
 * Personalized Coaching Service
 * Provides adaptive difficulty adjustment, weak area identification, and targeted practice recommendations
 * specifically designed for Hindi speakers learning English
 */
var PersonalizedCoachingService = /** @class */ (function () {
    function PersonalizedCoachingService() {
        this.phonemePracticeExercises = {
            'th_sounds': [
                {
                    id: 'th_minimal_pairs_1',
                    title: 'TH vs D Minimal Pairs',
                    hindiTitle: 'TH बनाम D न्यूनतम जोड़े',
                    instructions: 'Practice distinguishing between TH and D sounds',
                    hindiInstructions: 'TH और D ध्वनियों के बीच अंतर का अभ्यास करें',
                    content: ['think - dink', 'thank - dank', 'thick - dick', 'thaw - daw'],
                    difficulty: 'beginner',
                    focusPhoneme: 'th',
                    estimatedTime: 5
                },
                {
                    id: 'th_tongue_twisters_1',
                    title: 'TH Tongue Twisters',
                    hindiTitle: 'TH जीभ घुमाने वाले वाक्य',
                    instructions: 'Practice TH sounds with challenging phrases',
                    hindiInstructions: 'चुनौतीपूर्ण वाक्यों के साथ TH ध्वनियों का अभ्यास करें',
                    content: [
                        'Three thin thieves thought a thousand thoughts',
                        'The thirty-three thieves thought they thrilled the throne',
                        'Thick thistle sticks'
                    ],
                    difficulty: 'intermediate',
                    focusPhoneme: 'th',
                    estimatedTime: 8
                }
            ],
            'v_w_sounds': [
                {
                    id: 'vw_lip_position_1',
                    title: 'V vs W Lip Position Practice',
                    hindiTitle: 'V बनाम W होंठ स्थिति अभ्यास',
                    instructions: 'Focus on correct lip positioning for V and W sounds',
                    hindiInstructions: 'V और W ध्वनियों के लिए सही होंठ स्थिति पर ध्यान दें',
                    content: ['very - wary', 'vest - west', 'vine - wine', 'veil - wail'],
                    difficulty: 'beginner',
                    focusPhoneme: 'v_w',
                    estimatedTime: 6
                }
            ],
            'r_sounds': [
                {
                    id: 'r_tongue_position_1',
                    title: 'English R Tongue Position',
                    hindiTitle: 'अंग्रेजी R जीभ की स्थिति',
                    instructions: 'Practice curling tongue for English R sound',
                    hindiInstructions: 'अंग्रेजी R ध्वनि के लिए जीभ मोड़ने का अभ्यास करें',
                    content: ['red', 'right', 'run', 'car', 'far', 'river'],
                    difficulty: 'intermediate',
                    focusPhoneme: 'r',
                    estimatedTime: 7
                }
            ]
        };
        this.difficultyThresholds = {
            beginner_to_intermediate: {
                minAccuracy: 75,
                minSessions: 10,
                minPracticeTime: 300, // 5 hours
                maxWeakAreas: 2
            },
            intermediate_to_advanced: {
                minAccuracy: 85,
                minSessions: 25,
                minPracticeTime: 900, // 15 hours
                maxWeakAreas: 1
            }
        };
        this.practiceResources = {
            'th_sounds': [
                {
                    type: 'exercise',
                    title: 'TH Sound Drills',
                    hindiTitle: 'TH ध्वनि अभ्यास',
                    description: 'Interactive exercises for mastering TH sounds',
                    difficulty: 'beginner',
                    estimatedTime: 10
                },
                {
                    type: 'audio',
                    title: 'Native Speaker TH Examples',
                    hindiTitle: 'देशी वक्ता TH उदाहरण',
                    description: 'Listen to native speakers pronouncing TH words',
                    difficulty: 'beginner',
                    estimatedTime: 5
                }
            ],
            'v_w_sounds': [
                {
                    type: 'video',
                    title: 'Lip Position for V and W',
                    hindiTitle: 'V और W के लिए होंठ की स्थिति',
                    description: 'Visual guide to correct lip positioning',
                    difficulty: 'beginner',
                    estimatedTime: 8
                }
            ]
        };
    }
    /**
     * Identify weak areas that need focused practice
     */
    PersonalizedCoachingService.prototype.identifyWeakAreas = function (performanceData) {
        var _this = this;
        var weakAreas = [];
        // Analyze phoneme frequency in errors
        var phonemeErrorCount = {};
        var phonemeLastPracticed = {};
        performanceData.sessionHistory.forEach(function (session) {
            session.phonemeErrors.forEach(function (phoneme) {
                phonemeErrorCount[phoneme] = (phonemeErrorCount[phoneme] || 0) + 1;
                phonemeLastPracticed[phoneme] = session.createdAt;
            });
        });
        // Convert to weak areas with severity assessment
        Object.entries(phonemeErrorCount).forEach(function (_a) {
            var phoneme = _a[0], count = _a[1];
            var frequency = count / performanceData.sessionHistory.length;
            var severity = 'low';
            if (frequency > 0.6)
                severity = 'high';
            else if (frequency > 0.3)
                severity = 'medium';
            // Determine improvement trend
            var recentSessions = performanceData.sessionHistory.slice(-5);
            var recentErrors = recentSessions.filter(function (s) { return s.phonemeErrors.includes(phoneme); }).length;
            var olderSessions = performanceData.sessionHistory.slice(-10, -5);
            var olderErrors = olderSessions.filter(function (s) { return s.phonemeErrors.includes(phoneme); }).length;
            var improvementTrend = 'stable';
            if (recentErrors < olderErrors)
                improvementTrend = 'improving';
            else if (recentErrors > olderErrors)
                improvementTrend = 'declining';
            weakAreas.push({
                area: phoneme,
                severity: severity,
                frequency: frequency,
                lastPracticed: phonemeLastPracticed[phoneme],
                improvementTrend: improvementTrend,
                recommendedPracticeTime: severity === 'high' ? 15 : severity === 'medium' ? 10 : 5,
                resources: _this.practiceResources[phoneme] || []
            });
        });
        // Sort by severity and frequency
        return weakAreas.sort(function (a, b) {
            var severityOrder = { high: 3, medium: 2, low: 1 };
            if (severityOrder[a.severity] !== severityOrder[b.severity]) {
                return severityOrder[b.severity] - severityOrder[a.severity];
            }
            return b.frequency - a.frequency;
        });
    };
    /**
     * Adjust difficulty based on user performance and confidence metrics
     */
    PersonalizedCoachingService.prototype.adjustDifficulty = function (performanceData) {
        var recentSessions = performanceData.sessionHistory.slice(-10);
        var averageAccuracy = recentSessions.reduce(function (sum, s) { return sum + s.accuracy; }, 0) / recentSessions.length;
        var weakAreas = this.identifyWeakAreas(performanceData);
        var currentLevel = performanceData.currentLevel;
        var recommendedLevel = currentLevel;
        var adjustmentType = 'maintain';
        var reason = '';
        var hindiReason = '';
        var confidence = 0.5;
        // Check for level increase
        if (currentLevel === 'beginner') {
            var thresholds = this.difficultyThresholds.beginner_to_intermediate;
            if (averageAccuracy >= thresholds.minAccuracy &&
                performanceData.sessionHistory.length >= thresholds.minSessions &&
                performanceData.totalPracticeMinutes >= thresholds.minPracticeTime &&
                weakAreas.filter(function (w) { return w.severity === 'high'; }).length <= thresholds.maxWeakAreas) {
                recommendedLevel = 'intermediate';
                adjustmentType = 'increase';
                reason = 'Consistent high performance indicates readiness for intermediate level';
                hindiReason = 'लगातार अच्छा प्रदर्शन मध्यम स्तर की तैयारी दर्शाता है';
                confidence = 0.8;
            }
        }
        else if (currentLevel === 'intermediate') {
            var thresholds = this.difficultyThresholds.intermediate_to_advanced;
            if (averageAccuracy >= thresholds.minAccuracy &&
                performanceData.sessionHistory.length >= thresholds.minSessions &&
                performanceData.totalPracticeMinutes >= thresholds.minPracticeTime &&
                weakAreas.filter(function (w) { return w.severity === 'high'; }).length <= thresholds.maxWeakAreas) {
                recommendedLevel = 'advanced';
                adjustmentType = 'increase';
                reason = 'Excellent progress qualifies for advanced level challenges';
                hindiReason = 'उत्कृष्ट प्रगति उन्नत स्तर की चुनौतियों के लिए योग्य बनाती है';
                confidence = 0.9;
            }
        }
        // Check for level decrease
        if (averageAccuracy < 60 && weakAreas.filter(function (w) { return w.severity === 'high'; }).length > 3) {
            if (currentLevel === 'advanced') {
                recommendedLevel = 'intermediate';
                adjustmentType = 'decrease';
                reason = 'Focus on fundamentals before advancing further';
                hindiReason = 'आगे बढ़ने से पहले बुनियादी बातों पर ध्यान दें';
                confidence = 0.7;
            }
            else if (currentLevel === 'intermediate') {
                recommendedLevel = 'beginner';
                adjustmentType = 'decrease';
                reason = 'Strengthen basic pronunciation skills first';
                hindiReason = 'पहले बुनियादी उच्चारण कौशल को मजबूत करें';
                confidence = 0.7;
            }
        }
        return {
            currentDifficulty: currentLevel,
            recommendedDifficulty: recommendedLevel,
            reason: reason,
            hindiReason: hindiReason,
            confidence: confidence,
            adjustmentType: adjustmentType
        };
    };
    /**
     * Create targeted practice recommendations for specific phonemes
     */
    PersonalizedCoachingService.prototype.createTargetedPracticeRecommendations = function (weakAreas) {
        var _this = this;
        var recommendations = [];
        weakAreas.slice(0, 3).forEach(function (weakArea) {
            var exercises = _this.phonemePracticeExercises[weakArea.area] || [];
            var practiceType = 'minimal_pairs';
            if (weakArea.severity === 'high') {
                practiceType = 'minimal_pairs'; // Start with basics
            }
            else if (weakArea.severity === 'medium') {
                practiceType = 'tongue_twisters'; // Add complexity
            }
            else {
                practiceType = 'conversation'; // Practice in context
            }
            var estimatedTime = weakArea.severity === 'high' ? '2-3 weeks' :
                weakArea.severity === 'medium' ? '1-2 weeks' : '3-5 days';
            recommendations.push({
                phoneme: weakArea.area,
                priority: weakArea.severity,
                practiceType: practiceType,
                exercises: exercises,
                estimatedImprovementTime: estimatedTime,
                successMetrics: [
                    "Achieve 80%+ accuracy in ".concat(weakArea.area, " exercises"),
                    "Complete 5 practice sessions without errors",
                    "Use correctly in conversation practice"
                ]
            });
        });
        return recommendations;
    };
    /**
     * Determine what content to unlock based on progress
     */
    PersonalizedCoachingService.prototype.determineProgressBasedUnlocks = function (performanceData) {
        var unlocks = [];
        var averageAccuracy = performanceData.sessionHistory.reduce(function (sum, s) { return sum + s.accuracy; }, 0) /
            performanceData.sessionHistory.length;
        // Unlock intermediate scenarios
        if (performanceData.currentLevel === 'beginner' &&
            averageAccuracy >= 75 &&
            performanceData.totalPracticeMinutes >= 300) {
            unlocks.push({
                contentType: 'scenario',
                contentId: 2,
                title: 'Business Meeting Scenarios',
                hindiTitle: 'व्यापारिक बैठक परिदृश्य',
                unlockedBy: 'Consistent beginner level performance',
                requirements: [
                    {
                        type: 'accuracy_threshold',
                        value: 75,
                        description: 'Maintain 75% accuracy',
                        hindiDescription: '75% सटीकता बनाए रखें'
                    },
                    {
                        type: 'practice_time',
                        value: 300,
                        description: 'Complete 5 hours of practice',
                        hindiDescription: '5 घंटे का अभ्यास पूरा करें'
                    }
                ]
            });
        }
        // Unlock advanced pronunciation exercises
        if (performanceData.currentLevel === 'intermediate' &&
            averageAccuracy >= 85) {
            unlocks.push({
                contentType: 'exercise',
                contentId: 3,
                title: 'Advanced Pronunciation Challenges',
                hindiTitle: 'उन्नत उच्चारण चुनौतियां',
                unlockedBy: 'Intermediate level mastery',
                requirements: [
                    {
                        type: 'accuracy_threshold',
                        value: 85,
                        description: 'Achieve 85% accuracy consistently',
                        hindiDescription: 'लगातार 85% सटीकता प्राप्त करें'
                    }
                ]
            });
        }
        return unlocks;
    };
    /**
     * Generate personalized daily practice plan
     */
    PersonalizedCoachingService.prototype.generateDailyPracticePlan = function (performanceData, availableTime // in minutes
    ) {
        var weakAreas = this.identifyWeakAreas(performanceData);
        var recommendations = this.createTargetedPracticeRecommendations(weakAreas);
        var activities = [];
        var remainingTime = availableTime;
        // Warm-up (2-3 minutes)
        if (remainingTime >= 3) {
            activities.push({
                type: 'warmup',
                title: 'Pronunciation Warm-up',
                hindiTitle: 'उच्चारण वार्म-अप',
                duration: 3,
                description: 'Basic mouth and tongue exercises',
                content: ['Lip trills', 'Tongue twisters', 'Vowel sounds']
            });
            remainingTime -= 3;
        }
        // Focus on top weak areas
        recommendations.slice(0, 2).forEach(function (rec) {
            if (remainingTime >= 5 && rec.exercises.length > 0) {
                var exercise = rec.exercises[0];
                activities.push({
                    type: 'focused_practice',
                    title: exercise.title,
                    hindiTitle: exercise.hindiTitle,
                    duration: Math.min(exercise.estimatedTime, remainingTime),
                    description: exercise.instructions,
                    content: exercise.content
                });
                remainingTime -= exercise.estimatedTime;
            }
        });
        // Conversation practice if time allows
        if (remainingTime >= 5) {
            activities.push({
                type: 'conversation',
                title: 'Free Speaking Practice',
                hindiTitle: 'मुक्त बोलने का अभ्यास',
                duration: Math.min(10, remainingTime),
                description: 'Practice speaking naturally about daily topics',
                content: ['Describe your day', 'Talk about your hobbies', 'Express opinions']
            });
        }
        var focusAreas = weakAreas.slice(0, 2).map(function (w) { return w.area; });
        return {
            totalTime: availableTime - remainingTime,
            activities: activities,
            focusAreas: focusAreas,
            motivationalMessage: this.getMotivationalMessage(performanceData.currentLevel, 'english'),
            hindiMotivationalMessage: this.getMotivationalMessage(performanceData.currentLevel, 'hindi')
        };
    };
    PersonalizedCoachingService.prototype.getMotivationalMessage = function (level, language) {
        var _a;
        var messages = {
            beginner: {
                english: "Every expert was once a beginner. You're building something amazing!",
                hindi: "हर विशेषज्ञ कभी शुरुआती था। आप कुछ अद्भुत बना रहे हैं!"
            },
            intermediate: {
                english: "You're in the sweet spot of learning. Keep pushing forward!",
                hindi: "आप सीखने के सुनहरे दौर में हैं। आगे बढ़ते रहें!"
            },
            advanced: {
                english: "Excellence is a journey, not a destination. You're doing great!",
                hindi: "उत्कृष्टता एक यात्रा है, मंजिल नहीं। आप बहुत अच्छा कर रहे हैं!"
            }
        };
        return ((_a = messages[level]) === null || _a === void 0 ? void 0 : _a[language]) || messages.beginner[language];
    };
    return PersonalizedCoachingService;
}());
export { PersonalizedCoachingService };
export var personalizedCoaching = new PersonalizedCoachingService();
