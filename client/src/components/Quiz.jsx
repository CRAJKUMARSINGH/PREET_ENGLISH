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
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSpeech } from "@/hooks/use-speech";
import { FillBlank } from "./quiz-types/FillBlank";
import { Rearrange } from "./quiz-types/Rearrange";
import { Match } from "./quiz-types/Match";
export function Quiz(_a) {
    var _this = this;
    var quizId = _a.quizId, onComplete = _a.onComplete;
    var _b = useState(0), currentQuestionIndex = _b[0], setCurrentQuestionIndex = _b[1];
    var _c = useState(null), selectedOption = _c[0], setSelectedOption = _c[1];
    var _d = useState(false), showExplanation = _d[0], setShowExplanation = _d[1];
    var _e = useState(0), score = _e[0], setScore = _e[1];
    var _f = useState(false), isCompleted = _f[0], setIsCompleted = _f[1];
    var _g = useState([]), answers = _g[0], setAnswers = _g[1];
    var toast = useToast().toast;
    var queryClient = useQueryClient();
    var speak = useSpeech().speak;
    // Fetch Questions
    var _h = useQuery({
        queryKey: ['quiz', quizId, 'questions'],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res, errorText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/quizzes/".concat(quizId, "/questions"))];
                    case 1:
                        res = _a.sent();
                        if (!!res.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.text()];
                    case 2:
                        errorText = _a.sent();
                        throw new Error(errorText || "Failed to load quiz");
                    case 3: return [2 /*return*/, res.json()];
                }
            });
        }); },
    }), questions = _h.data, isLoading = _h.isLoading, error = _h.error;
    // Submit Attempt Mutation
    var submitAttemptMutation = useMutation({
        mutationFn: function (data) { return __awaiter(_this, void 0, void 0, function () {
            var res, errorText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/quizzes/".concat(quizId, "/attempts"), {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                        })];
                    case 1:
                        res = _a.sent();
                        if (!!res.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.text()];
                    case 2:
                        errorText = _a.sent();
                        throw new Error(errorText || "Failed to submit quiz");
                    case 3: return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId, 'attempts'] });
            queryClient.invalidateQueries({ queryKey: ['user', 'stats'] }); // Update XP
        },
    });
    if (isLoading) {
        return <div className="p-8 text-center">Loading quiz...</div>;
    }
    if (error) {
        return (<Card className="text-center p-6 bg-white dark:bg-slate-900 shadow-md">
                <CardHeader>
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4"/>
                    <CardTitle className="text-2xl">Error Loading Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{error.message}</p>
                    <Button onClick={function () { return queryClient.invalidateQueries({ queryKey: ['quiz', quizId, 'questions'] }); }}>
                        <RotateCcw className="w-4 h-4 mr-2"/>
                        Retry
                    </Button>
                </CardContent>
            </Card>);
    }
    if (!questions || questions.length === 0) {
        return (<Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    No questions available for this quiz.
                </CardContent>
            </Card>);
    }
    var currentQuestion = questions[currentQuestionIndex];
    var progress = ((currentQuestionIndex) / questions.length) * 100;
    // Parse options
    var options = typeof currentQuestion.options === 'string'
        ? JSON.parse(currentQuestion.options)
        : (currentQuestion.options || []);
    // Find correct index
    var correctOptionIndex = options.findIndex(function (opt) { return opt === currentQuestion.correctAnswer.toString(); });
    var handleCreateAttempt = function (finalScore, passed) {
        submitAttemptMutation.mutate({
            score: finalScore,
            passed: passed,
            answers: answers
        });
        if (onComplete) {
            onComplete(finalScore, passed);
        }
    };
    var handleCheckAnswer = function () {
        if (selectedOption === null)
            return;
        // Use derived correctOptionIndex
        var correct = selectedOption === correctOptionIndex;
        if (correct) {
            setScore(score + 1);
            speak({ text: "Correct!", lang: "en-US" });
        }
        else {
            speak({ text: "Incorrect", lang: "en-US" });
        }
        setAnswers(__spreadArray(__spreadArray([], answers, true), [{
                questionId: currentQuestion.id,
                answerIndex: selectedOption,
                correct: correct
            }], false));
        setShowExplanation(true);
    };
    var handleNext = function () {
        setSelectedOption(null);
        setShowExplanation(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            setIsCompleted(true);
            var passed = (score / questions.length) >= 0.7; // 70% passing
            handleCreateAttempt(score, passed);
        }
    };
    if (isCompleted) {
        var passed = (score / questions.length) >= 0.7;
        return (<Card className="text-center p-6 bg-white dark:bg-slate-900 shadow-md">
                <CardHeader>
                    <div className="mx-auto mb-4">
                        {passed ? (<CheckCircle2 className="w-16 h-16 text-green-500"/>) : (<XCircle className="w-16 h-16 text-red-500"/>)}
                    </div>
                    <CardTitle className="text-2xl">
                        {passed ? "Quiz Completed!" : "Keep Practicing"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold mb-2">
                        Score: {score} / {questions.length}
                    </p>
                    <p className="text-muted-foreground">
                        {passed ? "Great job! You've mastered this lesson." : "Review the material and try again."}
                    </p>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button onClick={function () {
                setCurrentQuestionIndex(0);
                setScore(0);
                setAnswers([]);
                setIsCompleted(false);
                setShowExplanation(false);
                setSelectedOption(null);
            }} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2"/>
                        Retry Quiz
                    </Button>
                </CardFooter>
            </Card>);
    }
    return (<Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <Progress value={progress} className="h-2"/>
            </CardHeader>
            <CardContent className="space-y-6">

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{currentQuestion.questionText}</h3>
                        {currentQuestion.explanation && (<p className="text-lg text-muted-foreground">{currentQuestion.explanation}</p>)}
                    </div>

                    {/* Dynamic Question Render */}
                    {(function () {
            switch (currentQuestion.questionType) {
                case 'fill_blank': {
                    var parsedOptions = typeof currentQuestion.options === 'string'
                        ? JSON.parse(currentQuestion.options)
                        : currentQuestion.options || [];
                    return (<FillBlank question={currentQuestion.questionText} options={parsedOptions} onAnswer={function (ans) { return !showExplanation && setSelectedOption(ans); }} selectedAnswer={selectedOption} disabled={showExplanation}/>);
                }
                case 'rearrange': {
                    var parsedOptions = typeof currentQuestion.options === 'string'
                        ? JSON.parse(currentQuestion.options)
                        : currentQuestion.options || [];
                    return (<Rearrange options={parsedOptions} onAnswer={function (ans) { return !showExplanation && setSelectedOption(ans); }} disabled={showExplanation}/>);
                }
                case 'match': {
                    var parsedOptions = typeof currentQuestion.options === 'string'
                        ? JSON.parse(currentQuestion.options)
                        : currentQuestion.options || [];
                    var pairs = JSON.parse(currentQuestion.correctAnswer);
                    return (<Match pairs={pairs} options={parsedOptions} onAnswer={function (ans) { return !showExplanation && setSelectedOption(ans); }} disabled={showExplanation}/>);
                }
                default: // 'mcq', 'true_false'
                    var optionsList = typeof currentQuestion.options === 'string'
                        ? JSON.parse(currentQuestion.options)
                        : (currentQuestion.options || []);
                    return (<RadioGroup value={selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.toString()} onValueChange={function (val) { return !showExplanation && setSelectedOption(Number(val)); }}>
                                        <div className="grid gap-3">
                                            {optionsList.map(function (option, index) {
                            var itemClass = "flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors";
                            if (showExplanation) {
                                // This logic needs to adapt for text-based answers vs index-based
                                // For MCQ, we kept index.
                                if (index === correctOptionIndex) {
                                    itemClass += " bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
                                }
                                else if (index === Number(selectedOption) && index !== correctOptionIndex) {
                                    itemClass += " bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
                                }
                                else {
                                    itemClass += " opacity-50";
                                }
                            }
                            else if (Number(selectedOption) === index) {
                                itemClass += " border-primary bg-primary/5";
                            }
                            return (<div key={index} className={itemClass} onClick={function () { return !showExplanation && setSelectedOption(index); }}>
                                                        <RadioGroupItem value={index.toString()} id={"option-".concat(index)} disabled={showExplanation}/>
                                                        <Label htmlFor={"option-".concat(index)} className="flex-1 cursor-pointer font-medium text-base">
                                                            {option}
                                                        </Label>
                                                        {showExplanation && index === correctOptionIndex && (<CheckCircle2 className="w-5 h-5 text-green-500"/>)}
                                                        {showExplanation && Number(selectedOption) === index && index !== correctOptionIndex && (<XCircle className="w-5 h-5 text-red-500"/>)}
                                                    </div>);
                        })}
                                        </div>
                                    </RadioGroup>);
            }
        })()}
                </div>
                {showExplanation && (<div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 font-semibold mb-1">
                            <AlertCircle className="w-4 h-4 text-blue-500"/>
                            Explanation
                        </div>
                        {/* Schema has 'explanation'. Treating as primary explanation */}
                        <p className="text-sm">{currentQuestion.explanation}</p>
                    </div>)}
            </CardContent>
            <CardFooter className="justify-end bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl border-t border-slate-100 dark:border-slate-800">
                {!showExplanation ? (<Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                        Check Answer
                    </Button>) : (<Button onClick={handleNext}>
                        {currentQuestionIndex < questions.length - 1 ? (<>Next Question <ArrowRight className="ml-2 w-4 h-4"/></>) : ("Finish Quiz")}
                    </Button>)}
            </CardFooter>
        </Card>);
}
