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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import OpenAI from 'openai';
// Initialize OpenAI client
var openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
var AIService = /** @class */ (function () {
    function AIService() {
    }
    AIService.prototype.generateConversationResponse = function (userMessage_1) {
        return __awaiter(this, arguments, void 0, function (userMessage, conversationHistory, scenario) {
            var response, error_1;
            var _a, _b;
            if (conversationHistory === void 0) { conversationHistory = []; }
            if (scenario === void 0) { scenario = 'general'; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, openai.chat.completions.create({
                                model: 'gpt-4',
                                messages: __spreadArray(__spreadArray([
                                    {
                                        role: 'system',
                                        content: "You are Saraswati, a friendly English conversation partner for Hindi speakers learning English. Keep responses natural, encouraging, and at an appropriate level. Scenario: ".concat(scenario, ". Always be supportive and provide gentle corrections when needed."),
                                    }
                                ], conversationHistory.map(function (msg, index) { return ({
                                    role: index % 2 === 0 ? 'user' : 'assistant',
                                    content: msg,
                                }); }), true), [
                                    {
                                        role: 'user',
                                        content: userMessage,
                                    },
                                ], false),
                                max_tokens: 150,
                                temperature: 0.7,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || 'I apologize, but I could not generate a response at this time.'];
                    case 2:
                        error_1 = _c.sent();
                        console.error('OpenAI API error:', error_1);
                        return [2 /*return*/, 'I apologize, but I am having trouble responding right now. Please try again later.'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AIService.prototype.generatePronunciationFeedback = function (targetText, userAttempt) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, openai.chat.completions.create({
                                model: 'gpt-4',
                                messages: [
                                    {
                                        role: 'system',
                                        content: 'You are a pronunciation coach for Hindi speakers learning English. Provide encouraging, specific feedback on pronunciation attempts.',
                                    },
                                    {
                                        role: 'user',
                                        content: "Target text: \"".concat(targetText, "\"\nUser's attempt: \"").concat(userAttempt, "\"\nPlease provide brief, encouraging pronunciation feedback."),
                                    },
                                ],
                                max_tokens: 100,
                                temperature: 0.5,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || 'Good effort! Keep practicing.'];
                    case 2:
                        error_2 = _c.sent();
                        console.error('OpenAI API error:', error_2);
                        return [2 /*return*/, 'Good effort! Keep practicing your pronunciation.'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AIService.prototype.generateStory = function (difficulty_1) {
        return __awaiter(this, arguments, void 0, function (difficulty, topic, length) {
            var lengthMap, response, error_3;
            var _a, _b;
            if (topic === void 0) { topic = 'daily life'; }
            if (length === void 0) { length = 'medium'; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        lengthMap = {
                            short: '50-100 words',
                            medium: '100-200 words',
                            long: '200-300 words'
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, openai.chat.completions.create({
                                model: 'gpt-4',
                                messages: [
                                    {
                                        role: 'system',
                                        content: "You are a creative writing assistant for English learners. Create engaging, culturally appropriate stories for Hindi speakers learning English.",
                                    },
                                    {
                                        role: 'user',
                                        content: "Create a ".concat(difficulty, " level English story about ").concat(topic, ". Length: ").concat(lengthMap[length], ". Make it engaging and include vocabulary appropriate for Hindi speakers learning English."),
                                    },
                                ],
                                max_tokens: 400,
                                temperature: 0.8,
                            })];
                    case 2:
                        response = _c.sent();
                        return [2 /*return*/, ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || 'Once upon a time, there was a student learning English who worked very hard every day.'];
                    case 3:
                        error_3 = _c.sent();
                        console.error('OpenAI API error:', error_3);
                        return [2 /*return*/, 'Once upon a time, there was a student learning English who worked very hard every day.'];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AIService;
}());
export { AIService };
export var aiService = new AIService();
