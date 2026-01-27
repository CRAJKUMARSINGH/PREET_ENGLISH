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
import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();
// Saraswati Persona System Prompt
var SYSTEM_PROMPT = "\nYou are 'Saraswati', a kind, patient, and wise English tutor for Hindi speakers.\nYour goal is to help users learn English using a mix of Hindi and English (Hinglish).\n\nGuidelines:\n1. Always be encouraging and polite. Use emojis like \uD83D\uDE4F, \uD83D\uDCDA, \u2728.\n2. If the user speaks Hindi, reply in Hinglish (English words with Hindi grammar explanation or vice versa).\n3. Correct their grammar gently if they make mistakes.\n4. Keep responses concise (under 3 sentences) unless asked for an explanation.\n5. Your persona: You are digital avatar of Goddess Saraswati's wisdom, but modern and friendly.\n\nExample Interaction:\nUser: \"I want learn English.\"\nSaraswati: \"Namaste! \uD83D\uDE4F I would love to help. You should say 'I want *to* learn English'. Let's practice! What is your hobby?\"\n";
// Fallback Rule-Based Responses (when AI is down/quota exceeded)
var FALLBACK_PATTERNS = [
    {
        regex: /hello|hi|namaste|hey/i,
        response: "Namaste! 🙏 I am Saraswati. I am here to help you learn English. How can I help you today?"
    },
    {
        regex: /how are you/i,
        response: "I am excellent, thank you! 🌟 And how are you feeling today? (Try saying: 'I am doing well!')"
    },
    {
        regex: /learn|teach|english/i,
        response: "Learning English is a wonderful journey! 📚 We can start with daily vocabulary or conversation practice. Which one do you prefer?"
    },
    {
        regex: /thank/i,
        response: "You are most welcome! ✨ Keep practicing, and you will become fluent very soon."
    },
    {
        regex: /bye|goodbye/i,
        response: "Goodbye! 👋 Phir milenge! Keep practicing your English!"
    }
];
var DEFAULT_FALLBACK = "That is interesting! 🌸 I am currently operating in 'Offline Mode' so my responses are limited, but please try practicing a lesson from the Dashboard to improve your skills!";
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.openai = null;
        if (process.env.OPENAI_API_KEY) {
            this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        }
        else {
            console.warn("⚠️ ChatService: No OPENAI_API_KEY found. Using fallback mode.");
        }
    }
    ChatService.prototype.generateResponse = function (userMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, error_1, _i, FALLBACK_PATTERNS_1, pattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.openai) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.openai.chat.completions.create({
                                model: "gpt-4o-mini", // Fast & cheap
                                messages: [
                                    { role: "system", content: SYSTEM_PROMPT },
                                    { role: "user", content: userMessage }
                                ],
                                max_tokens: 150,
                                temperature: 0.7,
                            })];
                    case 2:
                        completion = _a.sent();
                        return [2 /*return*/, completion.choices[0].message.content || DEFAULT_FALLBACK];
                    case 3:
                        error_1 = _a.sent();
                        console.error("❌ OpenAI Error:", error_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        // 2. Fallback Logic (Regex)
                        for (_i = 0, FALLBACK_PATTERNS_1 = FALLBACK_PATTERNS; _i < FALLBACK_PATTERNS_1.length; _i++) {
                            pattern = FALLBACK_PATTERNS_1[_i];
                            if (pattern.regex.test(userMessage)) {
                                return [2 /*return*/, pattern.response];
                            }
                        }
                        return [2 /*return*/, DEFAULT_FALLBACK];
                }
            });
        });
    };
    return ChatService;
}());
export { ChatService };
export var chatService = new ChatService();
