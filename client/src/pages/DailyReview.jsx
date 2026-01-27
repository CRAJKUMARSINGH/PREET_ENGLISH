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
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SaraswatiMascot } from "@/components/SaraswatiMascot";
import confetti from "canvas-confetti";
export default function DailyReview() {
    var _this = this;
    var _a = useState(0), currentIndex = _a[0], setCurrentIndex = _a[1];
    var _b = useState(false), isFinished = _b[0], setIsFinished = _b[1];
    var queryClient = useQueryClient();
    var toast = useToast().toast;
    var _c = useQuery({
        queryKey: ["/api/vocabulary/due"],
    }), dueWords = _c.data, isLoading = _c.isLoading;
    var reviewMutation = useMutation({
        mutationFn: function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var id = _b.id, quality = _b.quality;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, apiRequest("POST", "/api/vocabulary/review", { vocabularyId: id, quality: quality })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ["/api/vocabulary/due"] });
        },
    });
    var activityMutation = useMutation({
        mutationFn: function (content) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest("POST", "/api/activity-feed", {
                            type: 'GOAL_MET',
                            content: content
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    useEffect(function () {
        if (isFinished && dueWords) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#10b981', '#fbbf24']
            });
            activityMutation.mutate("completed a daily review session of ".concat(dueWords.length, " words! \uD83D\uDCDA"));
        }
    }, [isFinished, dueWords]);
    var handleRate = function (quality) { return __awaiter(_this, void 0, void 0, function () {
        var currentWord;
        return __generator(this, function (_a) {
            if (!dueWords)
                return [2 /*return*/];
            currentWord = dueWords[currentIndex];
            reviewMutation.mutate({ id: currentWord.id, quality: quality });
            if (currentIndex < dueWords.length - 1) {
                setCurrentIndex(function (prev) { return prev + 1; });
            }
            else {
                setIsFinished(true);
            }
            return [2 /*return*/];
        });
    }); };
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>);
    }
    if (!dueWords || dueWords.length === 0) {
        return (<div className="max-w-md mx-auto text-center py-12 space-y-8">
                <SaraswatiMascot mood="happy" size="lg"/>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">All caught up!</h2>
                    <p className="text-lg text-muted-foreground font-hindi">
                        सब कुछ याद है! नए शब्द सीखने का समय है। ✨
                    </p>
                </div>
                <Link href="/">
                    <Button size="lg" className="w-full h-14 rounded-2xl text-lg font-bold">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>);
    }
    if (isFinished) {
        return (<div className="max-w-md mx-auto text-center py-12 space-y-8">
                <div className="relative">
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-bounce-in"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-green-500/10 rounded-full animate-ping"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Review Complete!</h2>
                    <p className="text-lg text-muted-foreground font-hindi">
                        शानदार! आपने आज का अभ्यास पूरा किया। 🎉
                    </p>
                    <div className="mt-4 p-4 bg-primary/5 rounded-2xl inline-block">
                        <p className="text-sm font-bold text-primary">+{dueWords.length * 10} XP points earned</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/">
                        <Button variant="outline" className="w-full h-12 rounded-xl flex items-center gap-2">
                            <Home className="h-4 w-4"/> Home
                        </Button>
                    </Link>
                    <Link href="/lessons">
                        <Button className="w-full h-12 rounded-xl flex items-center gap-2">
                            Learn More <ArrowRight className="h-4 w-4"/>
                        </Button>
                    </Link>
                </div>
            </div>);
    }
    var current = dueWords[currentIndex];
    var progress = ((currentIndex) / dueWords.length) * 100;
    return (<div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
            {/* Header & Progress */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                        <BookOpen className="h-6 w-6 text-primary"/>
                        Daily Review • दैनिक अभ्यास
                    </h1>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {currentIndex + 1} / {dueWords.length}
                    </span>
                </div>
                <Progress value={progress} className="h-3 rounded-full"/>
            </div>

            {/* Hero Animation Background */}
            <div className="relative pt-8">
                <Flashcard word={current} onRate={handleRate}/>
            </div>

            <p className="text-center text-sm text-muted-foreground font-medium">
                Reviewing words due for practice today.
            </p>
        </div>);
}
