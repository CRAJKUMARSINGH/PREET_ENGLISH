/**
 * AI Feedback Engine
 * Provides intelligent, culturally-aware feedback for Hindi speakers learning English
 */
var AIFeedbackEngine = /** @class */ (function () {
    function AIFeedbackEngine() {
        this.pronunciationTips = {
            'th_sounds': {
                phoneme: 'th',
                technique: 'Place tongue between teeth, blow air gently',
                hindiTechnique: 'जीभ को दांतों के बीच रखें और धीरे से हवा निकालें',
                visualCue: 'Think of blowing out a candle with your tongue visible',
                practicePhrase: 'Think three things through'
            },
            'v_sounds': {
                phoneme: 'v',
                technique: 'Touch lower lip to upper teeth, vibrate',
                hindiTechnique: 'निचले होंठ को ऊपरी दांतों से छुआएं और कंपन करें',
                visualCue: 'Like a gentle bite on your lower lip',
                practicePhrase: 'Very vivid voice'
            },
            'w_sounds': {
                phoneme: 'w',
                technique: 'Round lips like saying "oo", then open quickly',
                hindiTechnique: 'होंठों को "ऊ" की तरह गोल करें, फिर जल्दी खोलें',
                visualCue: 'Like blowing a kiss but with sound',
                practicePhrase: 'We want wonderful weather'
            },
            'r_sounds': {
                phoneme: 'r',
                technique: 'Curl tongue back, don\'t touch roof of mouth',
                hindiTechnique: 'जीभ को पीछे मोड़ें, तालू को न छुएं',
                visualCue: 'Like a cat purring with tongue curled',
                practicePhrase: 'Red roses really rock'
            }
        };
        this.culturalScenarios = {
            'business_meeting': [
                {
                    type: 'business_context',
                    message: 'In business meetings, clear pronunciation builds credibility',
                    hindiExplanation: 'व्यापारिक बैठकों में स्पष्ट उच्चारण विश्वसनीयता बढ़ाता है',
                    examples: ['Thank you for your time', 'I appreciate your feedback', 'Let\'s schedule a follow-up'],
                    importance: 'high'
                }
            ],
            'casual_conversation': [
                {
                    type: 'social_context',
                    message: 'Casual conversations allow for more relaxed pronunciation',
                    hindiExplanation: 'आकस्मिक बातचीत में उच्चारण अधिक आरामदायक हो सकता है',
                    examples: ['How\'s it going?', 'What\'s up?', 'See you later'],
                    importance: 'medium'
                }
            ]
        };
        this.encouragementMessages = {
            beginner: {
                high: {
                    message: 'Outstanding progress! You\'re building a strong foundation!',
                    hindiMessage: 'शानदार प्रगति! आप एक मजबूत आधार बना रहे हैं!',
                    emoji: '🌟',
                    motivationalTip: 'Every expert was once a beginner. Keep going!'
                },
                medium: {
                    message: 'Good work! You\'re on the right track!',
                    hindiMessage: 'अच्छा काम! आप सही रास्ते पर हैं!',
                    emoji: '👍',
                    motivationalTip: 'Small steps lead to big achievements!'
                },
                low: {
                    message: 'Keep practicing! Every attempt makes you better!',
                    hindiMessage: 'अभ्यास जारी रखें! हर कोशिश आपको बेहतर बनाती है!',
                    emoji: '💪',
                    motivationalTip: 'Rome wasn\'t built in a day. Be patient with yourself!'
                }
            },
            intermediate: {
                high: {
                    message: 'Excellent! You\'re mastering the nuances!',
                    hindiMessage: 'बहुत बढ़िया! आप बारीकियों में महारत हासिल कर रहे हैं!',
                    emoji: '🎯',
                    motivationalTip: 'Your dedication is paying off beautifully!'
                },
                medium: {
                    message: 'Great progress! Fine-tuning your skills!',
                    hindiMessage: 'बेहतरीन प्रगति! अपने कौशल को निखार रहे हैं!',
                    emoji: '🚀',
                    motivationalTip: 'You\'re in the sweet spot of learning!'
                },
                low: {
                    message: 'Good effort! Focus on consistency!',
                    hindiMessage: 'अच्छी कोशिश! निरंतरता पर ध्यान दें!',
                    emoji: '🎪',
                    motivationalTip: 'Consistency beats perfection every time!'
                }
            },
            advanced: {
                high: {
                    message: 'Phenomenal! You sound like a native speaker!',
                    hindiMessage: 'अद्भुत! आप देशी वक्ता की तरह लगते हैं!',
                    emoji: '👑',
                    motivationalTip: 'You\'ve achieved something truly remarkable!'
                },
                medium: {
                    message: 'Impressive! Polishing the final details!',
                    hindiMessage: 'प्रभावशाली! अंतिम विवरणों को निखार रहे हैं!',
                    emoji: '💎',
                    motivationalTip: 'Excellence is in the details!'
                },
                low: {
                    message: 'Solid foundation! Work on the subtleties!',
                    hindiMessage: 'मजबूत आधार! बारीकियों पर काम करें!',
                    emoji: '🔧',
                    motivationalTip: 'Master the basics, then perfect the art!'
                }
            }
        };
    }
    /**
     * Generate comprehensive feedback based on speech analysis
     */
    AIFeedbackEngine.prototype.generateFeedback = function (analysis) {
        var pronunciationFeedback = this.analyzePronunciation(analysis);
        var fluencyFeedback = this.analyzeFluency(analysis);
        var culturalNotes = this.generateCulturalNotes(analysis);
        var nextSteps = this.generateActionableSteps(analysis);
        var encouragement = this.generateEncouragement(analysis);
        var overallScore = this.calculateOverallScore(pronunciationFeedback, fluencyFeedback);
        return {
            overallScore: overallScore,
            pronunciation: pronunciationFeedback,
            fluency: fluencyFeedback,
            culturalNotes: culturalNotes,
            nextSteps: nextSteps,
            encouragement: encouragement
        };
    };
    /**
     * Create personalized tips based on user profile and errors
     */
    AIFeedbackEngine.prototype.createPersonalizedTips = function (userProfile) {
        var tips = [];
        // Focus on weak phonemes
        for (var _i = 0, _a = userProfile.weakPhonemes; _i < _a.length; _i++) {
            var phoneme = _a[_i];
            var tip = this.pronunciationTips[phoneme];
            if (tip) {
                tips.push(tip);
            }
        }
        // Add level-appropriate tips
        if (userProfile.currentLevel === 'beginner') {
            tips.push(this.pronunciationTips['th_sounds']);
        }
        else if (userProfile.currentLevel === 'intermediate') {
            tips.push(this.pronunciationTips['r_sounds']);
        }
        return tips;
    };
    /**
     * Track improvement over time and adjust feedback
     */
    AIFeedbackEngine.prototype.trackImprovement = function (userId, sessionData) {
        // This would integrate with the backend to track progress
        // For now, return a basic improvement structure
        return {
            improvementRate: sessionData.accuracy > 75 ? 'good' : 'needs_work',
            areasImproved: [],
            newWeakAreas: [],
            recommendations: this.generateProgressRecommendations(sessionData)
        };
    };
    /**
     * Identify weak areas that need focused practice
     */
    AIFeedbackEngine.prototype.identifyWeakAreas = function (userId) {
        // This would analyze user's historical data
        // For now, return common weak areas for Hindi speakers
        return [
            {
                area: 'th_sounds',
                severity: 'high',
                practiceTime: '10 minutes daily',
                resources: ['Tongue twisters', 'Minimal pairs', 'Audio drills']
            },
            {
                area: 'v_w_confusion',
                severity: 'medium',
                practiceTime: '5 minutes daily',
                resources: ['Lip position exercises', 'Mirror practice']
            }
        ];
    };
    /**
     * Provide cultural guidance based on context
     */
    AIFeedbackEngine.prototype.provideCulturalGuidance = function (context) {
        var scenarios = this.culturalScenarios[context.scenario] || [];
        if (scenarios.length > 0) {
            return scenarios[0]; // Return the first relevant note
        }
        // Default cultural note
        return {
            type: 'social_context',
            message: 'Focus on clear communication for better understanding',
            hindiExplanation: 'बेहतर समझ के लिए स्पष्ट संवाद पर ध्यान दें',
            examples: ['Speak slowly and clearly', 'Use simple words', 'Ask for clarification'],
            importance: 'medium'
        };
    };
    // Private helper methods
    AIFeedbackEngine.prototype.analyzePronunciation = function (analysis) {
        var issues = [];
        var improvements = [];
        var audioExamples = [];
        // Analyze phoneme errors
        for (var _i = 0, _a = analysis.phonemeErrors; _i < _a.length; _i++) {
            var error = _a[_i];
            var tip = this.pronunciationTips[error.type];
            issues.push({
                phoneme: error.type,
                description: "Difficulty with ".concat(error.type.replace('_', ' ')),
                hindiExplanation: error.hindiExplanation,
                severity: error.severity,
                practiceWords: (tip === null || tip === void 0 ? void 0 : tip.practicePhrase.split(' ')) || [],
                tip: (tip === null || tip === void 0 ? void 0 : tip.technique) || 'Practice this sound carefully'
            });
            improvements.push("Work on ".concat(error.type.replace('_', ' '), " pronunciation"));
            if (tip) {
                audioExamples.push({
                    text: tip.practicePhrase,
                    phonemeHighlight: error.type
                });
            }
        }
        return {
            accuracy: analysis.accuracy,
            specificIssues: issues,
            improvements: improvements,
            audioExamples: audioExamples
        };
    };
    AIFeedbackEngine.prototype.analyzeFluency = function (analysis) {
        // Basic fluency analysis - would be enhanced with actual audio processing
        var wordCount = analysis.transcript.split(' ').length;
        var expectedWordCount = analysis.expectedText.split(' ').length;
        var pace = 'good';
        if (wordCount < expectedWordCount * 0.8)
            pace = 'too_slow';
        if (wordCount > expectedWordCount * 1.2)
            pace = 'too_fast';
        var naturalness = Math.max(0, 100 - (analysis.phonemeErrors.length * 10));
        var score = Math.round((analysis.accuracy + naturalness) / 2);
        return {
            score: score,
            pace: pace,
            naturalness: naturalness,
            issues: pace !== 'good' ? ["Speaking pace is ".concat(pace.replace('_', ' '))] : [],
            suggestions: [
                'Practice with a metronome for consistent pace',
                'Record yourself and listen back',
                'Focus on natural rhythm and stress patterns'
            ]
        };
    };
    AIFeedbackEngine.prototype.generateCulturalNotes = function (analysis) {
        var notes = [];
        if (analysis.culturalContext) {
            var guidance = this.provideCulturalGuidance(analysis.culturalContext);
            notes.push(guidance);
        }
        // Add general cultural notes for Hindi speakers
        notes.push({
            type: 'regional_variation',
            message: 'Indian English is perfectly valid in many contexts',
            hindiExplanation: 'भारतीय अंग्रेजी कई संदर्भों में बिल्कुल वैध है',
            examples: ['Prepone a meeting', 'Out of station', 'Good name?'],
            importance: 'medium'
        });
        return notes;
    };
    AIFeedbackEngine.prototype.generateActionableSteps = function (analysis) {
        var steps = [];
        // Add steps based on errors
        if (analysis.phonemeErrors.length > 0) {
            steps.push({
                action: 'Practice problematic sounds for 10 minutes daily',
                hindiAction: 'समस्याग्रस्त ध्वनियों का दैनिक 10 मिनट अभ्यास करें',
                priority: 'high',
                estimatedTime: '10 minutes'
            });
        }
        if (analysis.accuracy < 70) {
            steps.push({
                action: 'Listen to native speakers and repeat',
                hindiAction: 'देशी वक्ताओं को सुनें और दोहराएं',
                priority: 'high',
                estimatedTime: '15 minutes'
            });
        }
        // Always include a general practice step
        steps.push({
            action: 'Record yourself speaking and analyze',
            hindiAction: 'अपने बोलने की रिकॉर्डिंग करें और विश्लेषण करें',
            priority: 'medium',
            estimatedTime: '5 minutes'
        });
        return steps;
    };
    AIFeedbackEngine.prototype.generateEncouragement = function (analysis) {
        var _a;
        var level = ((_a = analysis.userProfile) === null || _a === void 0 ? void 0 : _a.currentLevel) || 'beginner';
        var performance = 'medium';
        if (analysis.accuracy >= 80)
            performance = 'high';
        else if (analysis.accuracy < 60)
            performance = 'low';
        var encouragement = this.encouragementMessages[level][performance];
        return {
            message: encouragement.message,
            hindiMessage: encouragement.hindiMessage,
            emoji: encouragement.emoji,
            motivationalTip: encouragement.motivationalTip
        };
    };
    AIFeedbackEngine.prototype.calculateOverallScore = function (pronunciation, fluency) {
        // Weighted average: 70% pronunciation, 30% fluency
        return Math.round(pronunciation.accuracy * 0.7 + fluency.score * 0.3);
    };
    AIFeedbackEngine.prototype.generateProgressRecommendations = function (sessionData) {
        var recommendations = [];
        if (sessionData.accuracy < 70) {
            recommendations.push('Focus on basic pronunciation patterns');
            recommendations.push('Practice with slower speech initially');
        }
        else if (sessionData.accuracy < 85) {
            recommendations.push('Work on specific problem sounds');
            recommendations.push('Increase speaking practice frequency');
        }
        else {
            recommendations.push('Focus on fluency and naturalness');
            recommendations.push('Practice in different contexts');
        }
        return recommendations;
    };
    return AIFeedbackEngine;
}());
export { AIFeedbackEngine };
export var aiFeedbackEngine = new AIFeedbackEngine();
