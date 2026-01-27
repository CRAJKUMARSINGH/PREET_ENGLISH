/**
 * Cultural Error Correction System
 * Provides gentle, culturally-aware corrections for Hindi speakers learning English
 */
var CulturalErrorCorrectionService = /** @class */ (function () {
    function CulturalErrorCorrectionService() {
        this.commonHindiSpeakerErrors = {
            // Grammar patterns common to Hindi speakers
            'present_continuous_overuse': {
                type: 'grammar',
                detected: 'I am having',
                corrected: 'I have',
                severity: 'medium',
                explanation: 'Use simple present for states and possessions',
                hindiExplanation: 'स्थितियों और संपत्ति के लिए simple present का प्रयोग करें',
                culturalContext: 'Hindi speakers often overuse continuous tense due to Hindi grammar influence',
                examples: [
                    {
                        incorrect: 'I am having a car',
                        correct: 'I have a car',
                        context: 'Talking about possessions',
                        hindiContext: 'संपत्ति के बारे में बात करना'
                    },
                    {
                        incorrect: 'I am having experience',
                        correct: 'I have experience',
                        context: 'Job interviews',
                        hindiContext: 'नौकरी के साक्षात्कार'
                    }
                ]
            },
            'preposition_confusion': {
                type: 'grammar',
                detected: 'discuss about',
                corrected: 'discuss',
                severity: 'low',
                explanation: 'The verb "discuss" doesn\'t need "about"',
                hindiExplanation: '"discuss" क्रिया के साथ "about" की आवश्यकता नहीं',
                examples: [
                    {
                        incorrect: 'Let\'s discuss about the project',
                        correct: 'Let\'s discuss the project',
                        context: 'Business meetings',
                        hindiContext: 'व्यापारिक बैठकें'
                    }
                ]
            },
            'article_omission': {
                type: 'grammar',
                detected: 'going to market',
                corrected: 'going to the market',
                severity: 'medium',
                explanation: 'English requires articles (a, an, the) in many contexts',
                hindiExplanation: 'अंग्रेजी में कई संदर्भों में articles (a, an, the) की आवश्यकता होती है',
                culturalContext: 'Hindi doesn\'t have articles, so this is a common challenge',
                examples: [
                    {
                        incorrect: 'I work in office',
                        correct: 'I work in an office / the office',
                        context: 'Describing work',
                        hindiContext: 'काम का वर्णन'
                    }
                ]
            },
            // Pronunciation patterns
            'th_d_confusion': {
                type: 'pronunciation',
                detected: 'dis',
                corrected: 'this',
                severity: 'high',
                explanation: 'Place tongue between teeth for "th" sound',
                hindiExplanation: '"th" ध्वनि के लिए जीभ को दांतों के बीच रखें',
                examples: [
                    {
                        incorrect: 'dank you',
                        correct: 'thank you',
                        context: 'Expressing gratitude',
                        hindiContext: 'आभार व्यक्त करना'
                    }
                ]
            },
            'v_w_confusion': {
                type: 'pronunciation',
                detected: 'wery',
                corrected: 'very',
                severity: 'medium',
                explanation: 'Touch lower lip to upper teeth for "v" sound',
                hindiExplanation: '"v" ध्वनि के लिए निचले होंठ को ऊपरी दांतों से छुआएं',
                examples: [
                    {
                        incorrect: 'wery good',
                        correct: 'very good',
                        context: 'Expressing approval',
                        hindiContext: 'अनुमोदन व्यक्त करना'
                    }
                ]
            },
            // Cultural context errors
            'overly_formal': {
                type: 'cultural_context',
                detected: 'Most respected sir',
                corrected: 'Hello',
                severity: 'low',
                explanation: 'Casual situations don\'t require extreme formality',
                hindiExplanation: 'आकस्मिक स्थितियों में अत्यधिक औपचारिकता की आवश्यकता नहीं',
                culturalContext: 'Indian English can be more formal than needed in casual Western contexts',
                examples: [
                    {
                        incorrect: 'Most respected sir, how are you?',
                        correct: 'Hi, how are you?',
                        context: 'Greeting a colleague',
                        hindiContext: 'सहकर्मी का अभिवादन'
                    }
                ]
            },
            'direct_translation': {
                type: 'vocabulary',
                detected: 'What is your good name?',
                corrected: 'What is your name?',
                severity: 'low',
                explanation: 'Direct Hindi translations may sound unnatural in English',
                hindiExplanation: 'हिंदी के सीधे अनुवाद अंग्रेजी में अप्राकृतिक लग सकते हैं',
                culturalContext: 'This is a direct translation from Hindi "आपका शुभ नाम क्या है?"',
                examples: [
                    {
                        incorrect: 'What is your good name?',
                        correct: 'What is your name?',
                        context: 'Introductions',
                        hindiContext: 'परिचय'
                    }
                ]
            }
        };
        this.culturalNuances = [
            {
                situation: 'Asking for help',
                hindiSituation: 'मदद मांगना',
                formal: 'Could you please help me with this?',
                informal: 'Can you help me?',
                explanation: 'Use "could" for more politeness in formal situations',
                hindiExplanation: 'औपचारिक स्थितियों में अधिक विनम्रता के लिए "could" का प्रयोग करें',
                whenToUse: 'Formal: workplace, with strangers. Informal: with friends, family'
            },
            {
                situation: 'Disagreeing politely',
                hindiSituation: 'विनम्रता से असहमति',
                formal: 'I respectfully disagree with that point',
                informal: 'I don\'t think so',
                explanation: 'Soften disagreement with respectful language',
                hindiExplanation: 'सम्मानजनक भाषा के साथ असहमति को नरम करें',
                whenToUse: 'Always be polite when disagreeing, especially in professional settings'
            }
        ];
        this.encouragementMessages = {
            low_severity: {
                english: [
                    'Great job! Just a small adjustment needed.',
                    'You\'re doing well! Here\'s a tiny improvement.',
                    'Almost perfect! One small change will make it even better.'
                ],
                hindi: [
                    'बहुत अच्छा! बस एक छोटा सा सुधार चाहिए।',
                    'आप अच्छा कर रहे हैं! यहाँ एक छोटा सुधार है।',
                    'लगभग परफेक्ट! एक छोटा बदलाव इसे और भी बेहतर बना देगा।'
                ]
            },
            medium_severity: {
                english: [
                    'Good effort! Let\'s work on this together.',
                    'You\'re on the right track! Here\'s how to improve.',
                    'Nice try! This is a common area where we can grow.'
                ],
                hindi: [
                    'अच्छी कोशिश! आइए इस पर एक साथ काम करते हैं।',
                    'आप सही रास्ते पर हैं! यहाँ सुधार का तरीका है।',
                    'अच्छी कोशिश! यह एक सामान्य क्षेत्र है जहाँ हम बढ़ सकते हैं।'
                ]
            },
            high_severity: {
                english: [
                    'Don\'t worry, this is very common! Let\'s practice this sound.',
                    'This is a tricky area for many Hindi speakers. You\'re not alone!',
                    'Great attempt! This pronunciation takes practice for everyone.'
                ],
                hindi: [
                    'चिंता न करें, यह बहुत आम है! आइए इस ध्वनि का अभ्यास करते हैं।',
                    'यह कई हिंदी भाषियों के लिए एक कठिन क्षेत्र है। आप अकेले नहीं हैं!',
                    'बेहतरीन कोशिश! इस उच्चारण के लिए सभी को अभ्यास की जरूरत होती है।'
                ]
            }
        };
    }
    /**
     * Detect and correct cultural errors in spoken text
     */
    CulturalErrorCorrectionService.prototype.detectAndCorrect = function (spokenText, context) {
        var corrections = [];
        var correctedText = spokenText;
        // Check for common Hindi speaker errors
        Object.entries(this.commonHindiSpeakerErrors).forEach(function (_a) {
            var key = _a[0], errorPattern = _a[1];
            var regex = new RegExp(errorPattern.detected, 'gi');
            if (regex.test(spokenText)) {
                corrections.push(errorPattern);
                correctedText = correctedText.replace(regex, errorPattern.corrected);
            }
        });
        // Generate appropriate encouragement
        var maxSeverity = corrections.length > 0
            ? corrections.reduce(function (max, curr) {
                if (curr.severity === 'high')
                    return 'high';
                if (curr.severity === 'medium' && max !== 'high')
                    return 'medium';
                return max;
            }, 'low')
            : 'low';
        var encouragementPool = this.encouragementMessages["".concat(maxSeverity, "_severity")];
        var encouragement = encouragementPool.english[Math.floor(Math.random() * encouragementPool.english.length)];
        var hindiEncouragement = encouragementPool.hindi[Math.floor(Math.random() * encouragementPool.hindi.length)];
        // Generate cultural notes
        var culturalNotes = this.generateCulturalNotes(corrections, context);
        // Generate practice exercises
        var practiceExercises = this.generatePracticeExercises(corrections);
        return {
            originalText: spokenText,
            correctedText: correctedText,
            corrections: corrections,
            encouragement: encouragement,
            hindiEncouragement: hindiEncouragement,
            culturalNotes: culturalNotes,
            practiceExercises: practiceExercises
        };
    };
    /**
     * Provide cultural nuance explanations
     */
    CulturalErrorCorrectionService.prototype.explainCulturalNuance = function (situation, userLevel) {
        var nuance = this.culturalNuances.find(function (n) {
            return n.situation.toLowerCase().includes(situation.toLowerCase());
        });
        return nuance || null;
    };
    /**
     * Generate gentle correction feedback
     */
    CulturalErrorCorrectionService.prototype.generateGentleFeedback = function (errors, userConfidence) {
        if (errors.length === 0) {
            return {
                message: 'Excellent! Your English sounds very natural.',
                hindiMessage: 'बहुत बढ़िया! आपकी अंग्रेजी बहुत प्राकृतिक लगती है।',
                tone: 'celebratory',
                focusAreas: []
            };
        }
        var highSeverityErrors = errors.filter(function (e) { return e.severity === 'high'; });
        var focusAreas = errors.map(function (e) { return e.type; });
        var tone = 'encouraging';
        var message = '';
        var hindiMessage = '';
        if (userConfidence < 0.5 || highSeverityErrors.length > 2) {
            tone = 'supportive';
            message = 'You\'re doing great! Remember, every expert was once a beginner. Let\'s work on these areas together.';
            hindiMessage = 'आप बहुत अच्छा कर रहे हैं! याद रखें, हर विशेषज्ञ कभी शुरुआती था। आइए इन क्षेत्रों पर एक साथ काम करते हैं।';
        }
        else if (errors.length <= 2) {
            tone = 'encouraging';
            message = 'Very good! Just a couple of small adjustments and you\'ll sound even more natural.';
            hindiMessage = 'बहुत अच्छा! बस कुछ छोटे समायोजन और आप और भी प्राकृतिक लगेंगे।';
        }
        else {
            tone = 'encouraging';
            message = 'Good progress! Let\'s focus on these key areas to improve your fluency.';
            hindiMessage = 'अच्छी प्रगति! आइए अपनी प्रवाहता सुधारने के लिए इन मुख्य क्षेत्रों पर ध्यान दें।';
        }
        return {
            message: message,
            hindiMessage: hindiMessage,
            tone: tone,
            focusAreas: focusAreas
        };
    };
    /**
     * Create targeted practice exercises based on detected errors
     */
    CulturalErrorCorrectionService.prototype.createTargetedExercises = function (errors) {
        var exerciseGroups = {};
        errors.forEach(function (error) {
            if (!exerciseGroups[error.type]) {
                exerciseGroups[error.type] = {
                    type: error.type,
                    exercises: [],
                    errors: []
                };
            }
            exerciseGroups[error.type].errors.push(error);
        });
        return Object.values(exerciseGroups).map(function (group) {
            switch (group.type) {
                case 'pronunciation':
                    return {
                        type: 'pronunciation',
                        title: 'Pronunciation Practice',
                        hindiTitle: 'उच्चारण अभ्यास',
                        exercises: [
                            'Practice minimal pairs (th/d, v/w)',
                            'Record yourself saying problem words',
                            'Use a mirror to check mouth position'
                        ],
                        estimatedTime: 10
                    };
                case 'grammar':
                    return {
                        type: 'grammar',
                        title: 'Grammar Correction',
                        hindiTitle: 'व्याकरण सुधार',
                        exercises: [
                            'Complete sentences with correct verb forms',
                            'Practice article usage (a, an, the)',
                            'Rewrite sentences using proper tense'
                        ],
                        estimatedTime: 15
                    };
                case 'cultural_context':
                    return {
                        type: 'cultural',
                        title: 'Cultural Awareness',
                        hindiTitle: 'सांस्कृतिक जागरूकता',
                        exercises: [
                            'Practice formal vs informal greetings',
                            'Learn appropriate responses for different situations',
                            'Study cultural context examples'
                        ],
                        estimatedTime: 12
                    };
                default:
                    return {
                        type: 'vocabulary',
                        title: 'Vocabulary Building',
                        hindiTitle: 'शब्दावली निर्माण',
                        exercises: [
                            'Learn natural English expressions',
                            'Practice common phrases in context',
                            'Replace direct translations with natural alternatives'
                        ],
                        estimatedTime: 8
                    };
            }
        });
    };
    // Private helper methods
    CulturalErrorCorrectionService.prototype.generateCulturalNotes = function (corrections, context) {
        var notes = [];
        corrections.forEach(function (correction) {
            if (correction.culturalContext) {
                notes.push(correction.culturalContext);
            }
        });
        // Add general cultural notes based on context
        if ((context === null || context === void 0 ? void 0 : context.situation) === 'business') {
            notes.push('In business contexts, clarity and professionalism are valued over elaborate politeness.');
        }
        else if ((context === null || context === void 0 ? void 0 : context.situation) === 'social') {
            notes.push('Social conversations in English tend to be more direct than in Hindi culture.');
        }
        return notes;
    };
    CulturalErrorCorrectionService.prototype.generatePracticeExercises = function (corrections) {
        var exercises = [];
        corrections.forEach(function (correction) {
            correction.examples.forEach(function (example) {
                exercises.push("Practice: \"".concat(example.correct, "\" in context: ").concat(example.context));
            });
        });
        return exercises;
    };
    return CulturalErrorCorrectionService;
}());
export { CulturalErrorCorrectionService };
export var culturalErrorCorrection = new CulturalErrorCorrectionService();
