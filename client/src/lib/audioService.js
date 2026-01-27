/**
 * Audio Service for Text-to-Speech with Adaptive Loading
 * Uses Web Speech API for pronunciation with performance optimizations
 * Implements Addy Osmani's adaptive loading patterns
 */
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
// Network quality detection
function getNetworkQuality() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection)
        return 'fast'; // Default to fast if no connection info
    // Consider 3G and below as slow
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
        return 'slow';
    }
    return 'fast';
}
// Audio cache for performance
var audioCache = new Map();
var AudioService = /** @class */ (function () {
    function AudioService() {
        this.currentUtterance = null;
        this.isInitialized = false;
        this.networkQuality = 'fast';
        this.preloadedAudio = new Set();
        this.synth = window.speechSynthesis;
        this.networkQuality = getNetworkQuality();
        this.initialize();
    }
    AudioService.prototype.initialize = function () {
        var _this = this;
        // Load voices; guard for environments (like tests) where addEventListener may not exist
        var voices = this.synth.getVoices();
        if (voices.length === 0) {
            var synthAny = this.synth;
            if (typeof synthAny.addEventListener === 'function') {
                synthAny.addEventListener('voiceschanged', function () {
                    _this.isInitialized = true;
                });
            }
            else {
                // Fallback: mark initialized even if we can't subscribe to voice events
                this.isInitialized = true;
            }
        }
        else {
            this.isInitialized = true;
        }
        // Listen for network changes
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', function () {
                _this.networkQuality = getNetworkQuality();
            });
        }
    };
    /**
     * Preload common audio for better performance
     */
    AudioService.prototype.preloadCommonAudio = function (phrases) {
        var _this = this;
        if (this.networkQuality === 'slow')
            return; // Skip preloading on slow connections
        phrases.forEach(function (phrase) {
            if (!_this.preloadedAudio.has(phrase)) {
                // Create utterance for preloading
                var utterance = new SpeechSynthesisUtterance(phrase);
                utterance.volume = 0; // Silent preload
                _this.synth.speak(utterance);
                _this.preloadedAudio.add(phrase);
            }
        });
    };
    /**
     * Speak English text with adaptive quality
     */
    AudioService.prototype.speakEnglish = function (text, rate) {
        if (rate === void 0) { rate = 0.9; }
        // Adjust rate based on network quality for better experience
        var adaptiveRate = this.networkQuality === 'slow' ? rate * 0.8 : rate;
        this.speak(text, 'en-US', adaptiveRate);
    };
    /**
     * Speak Hindi text with adaptive quality
     */
    AudioService.prototype.speakHindi = function (text, rate) {
        if (rate === void 0) { rate = 0.9; }
        // Adjust rate based on network quality for better experience
        var adaptiveRate = this.networkQuality === 'slow' ? rate * 0.8 : rate;
        this.speak(text, 'hi-IN', adaptiveRate);
    };
    /**
     * Generic speak method with performance optimizations
     */
    AudioService.prototype.speak = function (text, lang, rate) {
        if (lang === void 0) { lang = 'en-US'; }
        if (rate === void 0) { rate = 0.9; }
        // Stop any current speech
        this.stop();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;
        // Try to find a good voice for the language
        var voices = this.synth.getVoices();
        var voice = voices.find(function (v) { return v.lang.startsWith(lang.split('-')[0]); });
        if (voice) {
            utterance.voice = voice;
        }
        // Add performance monitoring
        var startTime = performance.now();
        utterance.onstart = function () {
            var loadTime = performance.now() - startTime;
            console.debug("Audio started in ".concat(loadTime.toFixed(2), "ms"));
        };
        utterance.onerror = function (event) {
            console.error('Speech synthesis error:', event.error);
        };
        this.currentUtterance = utterance;
        this.synth.speak(utterance);
    };
    /**
     * Play audio file with adaptive loading
     */
    AudioService.prototype.playAudioFile = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, options) {
            var audio, error_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        audio = audioCache.get(url);
                        if (!audio) {
                            audio = new Audio();
                            // Adaptive loading based on network quality
                            if (this.networkQuality === 'slow') {
                                audio.preload = 'none'; // Don't preload on slow connections
                            }
                            else {
                                audio.preload = options.preload ? 'auto' : 'metadata';
                            }
                            audio.src = url;
                            audioCache.set(url, audio);
                        }
                        // Play with error handling
                        return [4 /*yield*/, audio.play()];
                    case 1:
                        // Play with error handling
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Audio playback failed:', error_1);
                        // Fallback to speech synthesis
                        this.speakEnglish('Audio not available');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stop current speech
     */
    AudioService.prototype.stop = function () {
        // Always request cancel; in some environments `speaking` may not be reliable
        var synthAny = this.synth;
        if (typeof synthAny.cancel === 'function') {
            synthAny.cancel();
        }
        this.currentUtterance = null;
    };
    /**
     * Pause current speech
     */
    AudioService.prototype.pause = function () {
        if (this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
        }
    };
    /**
     * Resume paused speech
     */
    AudioService.prototype.resume = function () {
        if (this.synth.paused) {
            this.synth.resume();
        }
    };
    /**
     * Check if currently speaking
     */
    AudioService.prototype.isSpeaking = function () {
        return this.synth.speaking;
    };
    /**
     * Check if paused
     */
    AudioService.prototype.isPaused = function () {
        return this.synth.paused;
    };
    /**
     * Get available voices
     */
    AudioService.prototype.getVoices = function () {
        return this.synth.getVoices();
    };
    /**
     * Get English voices
     */
    AudioService.prototype.getEnglishVoices = function () {
        return this.getVoices().filter(function (v) { return v.lang.startsWith('en'); });
    };
    /**
     * Get Hindi voices
     */
    AudioService.prototype.getHindiVoices = function () {
        return this.getVoices().filter(function (v) { return v.lang.startsWith('hi'); });
    };
    /**
     * Get network quality for adaptive features
     */
    AudioService.prototype.getNetworkQuality = function () {
        return this.networkQuality;
    };
    /**
     * Clear audio cache to free memory
     */
    AudioService.prototype.clearCache = function () {
        audioCache.clear();
        this.preloadedAudio.clear();
    };
    return AudioService;
}());
export { AudioService };
// Singleton instance
export var audioService = new AudioService();
// Utility functions for quick access
export var speakEnglish = function (text) { return audioService.speakEnglish(text); };
export var speakHindi = function (text) { return audioService.speakHindi(text); };
export var stopSpeaking = function () { return audioService.stop(); };
export var preloadCommonPhrases = function (phrases) { return audioService.preloadCommonAudio(phrases); };
// Common English learning phrases to preload
export var COMMON_LEARNING_PHRASES = [
    "Correct!",
    "Try again",
    "Well done!",
    "Next question",
    "Great job!",
    "Perfect pronunciation!",
    "Listen carefully",
    "Repeat after me"
];
// Auto-preload common phrases on fast connections
if (audioService.getNetworkQuality() === 'fast') {
    setTimeout(function () {
        preloadCommonPhrases(COMMON_LEARNING_PHRASES);
    }, 2000); // Delay to not block initial load
}
