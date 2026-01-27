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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
// Sample lessons for when API is unavailable
var FALLBACK_LESSONS = [
    {
        id: 1,
        title: "Introduction to Greetings",
        hindiTitle: "अभिवादन का परिचय",
        slug: "intro-greetings",
        description: "Learn how to say hello and introduce yourself in English.",
        hindiDescription: "अंग्रेजी में नमस्ते कहना और अपना परिचय देना सीखें।",
        content: "# Greetings\n\nIn this lesson, we will learn basic greetings.",
        difficulty: "Beginner",
        category: "Greetings",
        order: 1,
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
        emojiTheme: "👋"
    },
    {
        id: 2,
        title: "Common Verbs",
        hindiTitle: "सामान्य क्रियाएं",
        slug: "common-verbs",
        description: "Essential verbs for daily communication.",
        hindiDescription: "दैनिक संवाद के लिए आवश्यक क्रियाएं।",
        content: "# Verbs\n\nVerbs are action words.",
        difficulty: "Beginner",
        category: "Grammar",
        order: 2,
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
        emojiTheme: "🏃"
    },
    {
        id: 3,
        title: "Numbers and Counting",
        hindiTitle: "संख्याएं और गिनती",
        slug: "numbers-counting",
        description: "Learn to count and use numbers in English.",
        hindiDescription: "अंग्रेजी में गिनती और संख्याओं का उपयोग सीखें।",
        content: "# Numbers\n\nLearn numbers from 1 to 100.",
        difficulty: "Beginner",
        category: "Basics",
        order: 3,
        imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80",
        emojiTheme: "🔢"
    }
];
export function useLessons() {
    var _this = this;
    return useQuery({
        queryKey: [api.lessons.list.path],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(api.lessons.list.path, { credentials: "include" })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            console.warn('API returned error, using fallback lessons');
                            return [2 /*return*/, FALLBACK_LESSONS];
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.length > 0 ? data : FALLBACK_LESSONS];
                    case 3:
                        error_1 = _a.sent();
                        console.warn('Failed to fetch lessons, using fallback:', error_1);
                        return [2 /*return*/, FALLBACK_LESSONS];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });
}
export function useLesson(id) {
    var _this = this;
    return useQuery({
        queryKey: [api.lessons.get.path, id],
        enabled: !!id,
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var url, res, fallback, error_2, fallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, null];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        url = buildUrl(api.lessons.get.path, { id: id });
                        return [4 /*yield*/, fetch(url, { credentials: "include" })];
                    case 2:
                        res = _a.sent();
                        if (res.status === 404)
                            return [2 /*return*/, null];
                        if (!res.ok) {
                            fallback = FALLBACK_LESSONS.find(function (l) { return l.id === id; });
                            return [2 /*return*/, fallback ? __assign(__assign({}, fallback), { vocabulary: [], conversationLines: [] }) : null];
                        }
                        return [4 /*yield*/, res.json()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        console.warn('Failed to fetch lesson, using fallback:', error_2);
                        fallback = FALLBACK_LESSONS.find(function (l) { return l.id === id; });
                        return [2 /*return*/, fallback ? __assign(__assign({}, fallback), { vocabulary: [], conversationLines: [] }) : null];
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        retry: 1,
    });
}
export function useCreateLesson() {
    var _this = this;
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res, error, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, fetch(api.lessons.create.path, {
                            method: api.lessons.create.method,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                            credentials: "include",
                        })];
                    case 1:
                        res = _e.sent();
                        if (!!res.ok) return [3 /*break*/, 4];
                        if (!(res.status === 400)) return [3 /*break*/, 3];
                        _b = (_a = api.lessons.create.responses[400]).parse;
                        return [4 /*yield*/, res.json()];
                    case 2:
                        error = _b.apply(_a, [_e.sent()]);
                        throw new Error(error.message);
                    case 3: throw new Error("Failed to create lesson");
                    case 4:
                        _d = (_c = api.lessons.create.responses[201]).parse;
                        return [4 /*yield*/, res.json()];
                    case 5: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] });
        },
    });
}
