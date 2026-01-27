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
export function useSpeakingSessions() {
    var _this = this;
    return useQuery({
        queryKey: ['/api/speaking/sessions'],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/speaking/sessions', { credentials: 'include' })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            return [2 /*return*/, []];
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        staleTime: 30000,
    });
}
export function useCreateSpeakingSession() {
    var _this = this;
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/speaking/sessions', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                            credentials: 'include',
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error('Failed to create session');
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['/api/speaking/sessions'] });
        },
    });
}
export function useCompleteSession() {
    var _this = this;
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var res;
            var sessionId = _b.sessionId, scores = _b.scores;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch("/api/speaking/sessions/".concat(sessionId, "/complete"), {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(scores),
                            credentials: 'include',
                        })];
                    case 1:
                        res = _c.sent();
                        if (!res.ok)
                            throw new Error('Failed to complete session');
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['/api/speaking/sessions'] });
        },
    });
}
export function useSpeakingProfile() {
    var _this = this;
    return useQuery({
        queryKey: ['/api/speaking/profile'],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/speaking/profile', { credentials: 'include' })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 404)
                            return [2 /*return*/, null];
                        if (!res.ok)
                            return [2 /*return*/, null];
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        staleTime: 60000,
    });
}
export function useUpdateSpeakingProfile() {
    var _this = this;
    var queryClient = useQueryClient();
    return useMutation({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/speaking/profile', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                            credentials: 'include',
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error('Failed to update profile');
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['/api/speaking/profile'] });
        },
    });
}
export function useSpeakingTopics() {
    var _this = this;
    return useQuery({
        queryKey: ['/api/speaking/topics'],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/speaking/topics', { credentials: 'include' })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            return [2 /*return*/, []];
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        staleTime: 300000, // 5 minutes
    });
}
export function usePronunciationProgress() {
    return {
        data: [],
        isLoading: false,
        error: null
    };
}
export function useCulturalProgress() {
    return {
        data: [],
        isLoading: false,
        error: null
    };
}
export function useAnalyzeSpeech() {
    return {
        mutate: function (_data) { },
        isLoading: false,
        error: null
    };
}
