/**
 * Speech Recognition Service for The Mimic Engine
 * Implements Web Speech API with fallback to OpenAI Whisper
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
var SpeechRecognitionService = /** @class */ (function () {
    function SpeechRecognitionService() {
        this.recognition = null;
        this.isSupported = false;
        this.isListening = false;
        this.initializeRecognition();
    }
    SpeechRecognitionService.prototype.initializeRecognition = function () {
        // Check for Web Speech API support
        var SpeechRecognition = window.SpeechRecognition ||
            window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.isSupported = true;
            this.setupRecognition();
        }
        else {
            console.warn('Web Speech API not supported, will use fallback methods');
            this.isSupported = false;
        }
    };
    SpeechRecognitionService.prototype.setupRecognition = function () {
        var _this = this;
        if (!this.recognition)
            return;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.onresult = function (event) {
            var _a;
            var result = event.results[event.results.length - 1];
            var transcript = result[0].transcript;
            var confidence = result[0].confidence;
            var isFinal = result.isFinal;
            (_a = _this.onResultCallback) === null || _a === void 0 ? void 0 : _a.call(_this, {
                transcript: transcript,
                confidence: confidence,
                isFinal: isFinal
            });
        };
        this.recognition.onerror = function (event) {
            var _a;
            console.error('Speech recognition error:', event.error);
            (_a = _this.onErrorCallback) === null || _a === void 0 ? void 0 : _a.call(_this, event.error);
        };
        this.recognition.onend = function () {
            _this.isListening = false;
        };
    };
    /**
     * Start speech recognition
     */
    SpeechRecognitionService.prototype.start = function (options) {
        var _a, _b, _c, _d, _e;
        if (options === void 0) { options = {}; }
        if (!this.isSupported || !this.recognition) {
            (_a = this.onErrorCallback) === null || _a === void 0 ? void 0 : _a.call(this, 'Speech recognition not supported');
            return;
        }
        if (this.isListening) {
            this.stop();
        }
        // Configure recognition
        this.recognition.lang = options.language || 'en-US';
        this.recognition.continuous = (_b = options.continuous) !== null && _b !== void 0 ? _b : true;
        this.recognition.interimResults = (_c = options.interimResults) !== null && _c !== void 0 ? _c : true;
        this.recognition.maxAlternatives = (_d = options.maxAlternatives) !== null && _d !== void 0 ? _d : 1;
        try {
            this.recognition.start();
            this.isListening = true;
        }
        catch (error) {
            console.error('Failed to start speech recognition:', error);
            (_e = this.onErrorCallback) === null || _e === void 0 ? void 0 : _e.call(this, 'Failed to start speech recognition');
        }
    };
    /**
     * Stop speech recognition
     */
    SpeechRecognitionService.prototype.stop = function () {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    };
    /**
     * Set result callback
     */
    SpeechRecognitionService.prototype.onResult = function (callback) {
        this.onResultCallback = callback;
    };
    /**
     * Set error callback
     */
    SpeechRecognitionService.prototype.onError = function (callback) {
        this.onErrorCallback = callback;
    };
    /**
     * Check if speech recognition is supported
     */
    SpeechRecognitionService.prototype.isRecognitionSupported = function () {
        return this.isSupported;
    };
    /**
     * Check if currently listening
     */
    SpeechRecognitionService.prototype.isCurrentlyListening = function () {
        return this.isListening;
    };
    /**
     * Fallback: Use OpenAI Whisper API for speech recognition
     */
    SpeechRecognitionService.prototype.recognizeWithWhisper = function (audioBlob) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        formData = new FormData();
                        formData.append('file', audioBlob, 'audio.wav');
                        formData.append('model', 'whisper-1');
                        return [4 /*yield*/, fetch('/api/speech/transcribe', {
                                method: 'POST',
                                body: formData,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Transcription failed');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {
                                transcript: data.text || '',
                                confidence: 0.9, // Whisper doesn't provide confidence scores
                                isFinal: true
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Whisper transcription failed:', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get supported languages
     */
    SpeechRecognitionService.prototype.getSupportedLanguages = function () {
        return [
            'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN',
            'hi-IN', 'hi',
            'es-ES', 'es-MX', 'fr-FR', 'de-DE', 'it-IT',
            'pt-BR', 'ru-RU', 'ja-JP', 'ko-KR', 'zh-CN'
        ];
    };
    return SpeechRecognitionService;
}());
export { SpeechRecognitionService };
// Singleton instance
export var speechRecognitionService = new SpeechRecognitionService();
// Utility functions
export var startListening = function (options, onResult, onError) {
    if (options === void 0) { options = {}; }
    if (onResult)
        speechRecognitionService.onResult(onResult);
    if (onError)
        speechRecognitionService.onError(onError);
    speechRecognitionService.start(options);
};
export var stopListening = function () {
    speechRecognitionService.stop();
};
export var isListening = function () {
    return speechRecognitionService.isCurrentlyListening();
};
