/**
 * Grammar Logic Engine for PREET_ENGLISH
 * Handles grammar analysis, correction, and feedback
 */
var GrammarEngine = /** @class */ (function () {
    function GrammarEngine() {
        this.commonErrors = new Map();
        this.grammarRules = new Map();
        this.initializeCommonErrors();
        this.initializeGrammarRules();
    }
    GrammarEngine.prototype.initializeCommonErrors = function () {
        // Common errors for Hindi speakers learning English
        this.commonErrors.set('i am going to school', 'I am going to school');
        this.commonErrors.set('he is more taller', 'he is taller');
        this.commonErrors.set('i have a good news', 'I have good news');
        this.commonErrors.set('she is having a car', 'she has a car');
        this.commonErrors.set('i am understanding', 'I understand');
        this.commonErrors.set('please do the needful', 'please take the necessary action');
        this.commonErrors.set('out of station', 'out of town');
        this.commonErrors.set('good name', 'name');
        this.commonErrors.set('what is your good name', 'what is your name');
        this.commonErrors.set('i am having', 'I have');
    };
    GrammarEngine.prototype.initializeGrammarRules = function () {
        // Basic grammar rules
        this.grammarRules.set('double_comparative', /\b(more|most)\s+(better|worse|taller|shorter|bigger|smaller|faster|slower)\b/gi);
        this.grammarRules.set('incorrect_article', /\ba\s+(hour|honest|honor|heir)\b/gi);
        this.grammarRules.set('subject_verb_disagreement', /\b(he|she|it)\s+(are|have)\b/gi);
        this.grammarRules.set('missing_article', /\b(go to|at)\s+(school|college|university|hospital|market)\b/gi);
    };
    /**
     * Analyze text for grammar errors
     */
    GrammarEngine.prototype.analyzeText = function (text) {
        var errors = [];
        var correctedText = text;
        var score = 100;
        // Check for common errors
        for (var _i = 0, _a = this.commonErrors; _i < _a.length; _i++) {
            var _b = _a[_i], incorrect = _b[0], correct = _b[1];
            var regex = new RegExp(incorrect, 'gi');
            var matches = text.matchAll(regex);
            for (var _c = 0, matches_1 = matches; _c < matches_1.length; _c++) {
                var match = matches_1[_c];
                if (match.index !== undefined) {
                    errors.push({
                        type: 'grammar',
                        message: "Consider using \"".concat(correct, "\" instead of \"").concat(match[0], "\""),
                        suggestion: correct,
                        position: {
                            start: match.index,
                            end: match.index + match[0].length
                        },
                        severity: 'medium'
                    });
                    correctedText = correctedText.replace(match[0], correct);
                    score -= 10;
                }
            }
        }
        // Check grammar rules
        for (var _d = 0, _e = this.grammarRules; _d < _e.length; _d++) {
            var _f = _e[_d], ruleName = _f[0], regex = _f[1];
            var matches = text.matchAll(regex);
            for (var _g = 0, matches_2 = matches; _g < matches_2.length; _g++) {
                var match = matches_2[_g];
                if (match.index !== undefined) {
                    var message = '';
                    var suggestion = '';
                    switch (ruleName) {
                        case 'double_comparative':
                            message = 'Avoid using double comparatives';
                            suggestion = match[0].replace(/more\s+|most\s+/gi, '');
                            break;
                        case 'incorrect_article':
                            message = 'Use "an" before words starting with vowel sounds';
                            suggestion = match[0].replace(/\ba\s+/gi, 'an ');
                            break;
                        case 'subject_verb_disagreement':
                            message = 'Subject-verb disagreement';
                            suggestion = match[0].replace(/are/gi, 'is').replace(/have/gi, 'has');
                            break;
                        case 'missing_article':
                            message = 'Consider adding an article';
                            suggestion = match[0].replace(/\b(go to|at)\s+/gi, '$1 the ');
                            break;
                    }
                    errors.push({
                        type: 'grammar',
                        message: message,
                        suggestion: suggestion,
                        position: {
                            start: match.index,
                            end: match.index + match[0].length
                        },
                        severity: 'high'
                    });
                    correctedText = correctedText.replace(match[0], suggestion);
                    score -= 15;
                }
            }
        }
        // Check capitalization
        var sentences = text.split(/[.!?]+/);
        sentences.forEach(function (sentence, index) {
            var trimmed = sentence.trim();
            if (trimmed && !trimmed.match(/^[A-Z]/)) {
                var sentenceStart = text.indexOf(trimmed);
                if (sentenceStart !== -1) {
                    errors.push({
                        type: 'grammar',
                        message: 'Sentences should start with a capital letter',
                        suggestion: trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
                        position: {
                            start: sentenceStart,
                            end: sentenceStart + 1
                        },
                        severity: 'medium'
                    });
                    score -= 5;
                }
            }
        });
        // Generate suggestions
        var suggestions = this.generateSuggestions(text, errors);
        return {
            errors: errors,
            score: Math.max(0, score),
            suggestions: suggestions,
            correctedText: correctedText
        };
    };
    GrammarEngine.prototype.generateSuggestions = function (text, errors) {
        var suggestions = [];
        if (errors.length === 0) {
            suggestions.push('Great job! Your grammar is perfect.');
            return suggestions;
        }
        // Group errors by type
        var errorsByType = errors.reduce(function (acc, error) {
            if (!acc[error.type])
                acc[error.type] = [];
            acc[error.type].push(error);
            return acc;
        }, {});
        // Generate type-specific suggestions
        if (errorsByType.grammar) {
            suggestions.push('Focus on subject-verb agreement and proper article usage.');
        }
        if (errorsByType.spelling) {
            suggestions.push('Double-check your spelling, especially for commonly confused words.');
        }
        if (errorsByType.punctuation) {
            suggestions.push('Pay attention to punctuation marks and capitalization.');
        }
        // Add specific suggestions based on error patterns
        var hasCapitalizationErrors = errors.some(function (e) { return e.message.includes('capital letter'); });
        if (hasCapitalizationErrors) {
            suggestions.push('Remember to capitalize the first letter of each sentence.');
        }
        var hasArticleErrors = errors.some(function (e) { return e.message.includes('article'); });
        if (hasArticleErrors) {
            suggestions.push('Practice using "a", "an", and "the" correctly.');
        }
        return suggestions;
    };
    /**
     * Get grammar tips for Hindi speakers
     */
    GrammarEngine.prototype.getHindiSpeakerTips = function () {
        return [
            'In English, use "I have" instead of "I am having" for possession.',
            'Avoid double comparatives like "more better" - use just "better".',
            'Use articles (a, an, the) before nouns - Hindi doesn\'t have articles.',
            'English word order is usually Subject-Verb-Object.',
            'Use "going to" for future plans, not just "will".',
            'Prepositions in English are different from Hindi - practice them.',
            'Use present simple for habits, not present continuous.',
            'Count vs. non-count nouns work differently in English.'
        ];
    };
    /**
     * Check if text is appropriate for difficulty level
     */
    GrammarEngine.prototype.checkDifficultyLevel = function (text, targetLevel) {
        var _a;
        var wordCount = text.split(/\s+/).length;
        var avgWordLength = text.replace(/\s+/g, '').length / wordCount;
        var complexWords = ((_a = text.match(/\b\w{7,}\b/g)) === null || _a === void 0 ? void 0 : _a.length) || 0;
        var complexWordRatio = complexWords / wordCount;
        var actualLevel = 'beginner';
        var isAppropriate = true;
        var suggestions = [];
        // Determine actual level
        if (avgWordLength > 5 && complexWordRatio > 0.3) {
            actualLevel = 'advanced';
        }
        else if (avgWordLength > 4 && complexWordRatio > 0.2) {
            actualLevel = 'intermediate';
        }
        // Check appropriateness
        if (targetLevel === 'beginner' && actualLevel !== 'beginner') {
            isAppropriate = false;
            suggestions.push('Try using simpler words and shorter sentences.');
        }
        else if (targetLevel === 'intermediate' && actualLevel === 'advanced') {
            isAppropriate = false;
            suggestions.push('Consider using slightly simpler vocabulary.');
        }
        else if (targetLevel === 'advanced' && actualLevel === 'beginner') {
            suggestions.push('You could challenge yourself with more complex vocabulary and sentence structures.');
        }
        return {
            isAppropriate: isAppropriate,
            actualLevel: actualLevel,
            suggestions: suggestions
        };
    };
    return GrammarEngine;
}());
export { GrammarEngine };
// Singleton instance
export var grammarEngine = new GrammarEngine();
// Utility functions
export var analyzeGrammar = function (text) { return grammarEngine.analyzeText(text); };
export var getHindiSpeakerTips = function () { return grammarEngine.getHindiSpeakerTips(); };
export var checkTextDifficulty = function (text, level) {
    return grammarEngine.checkDifficultyLevel(text, level);
};
