var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Star, Brain, Target, Zap, RotateCcw, TrendingUp, Award, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useXPCalculator } from "@/lib/xp-calculator";
import confetti from "canvas-confetti";
export function AdvancedQuizSystem(_a) {
    var questions = _a.questions, title = _a.title, titleHindi = _a.titleHindi, description = _a.description, timeLimit = _a.timeLimit, _b = _a.allowRetry, allowRetry = _b === void 0 ? true : _b, _c = _a.showExplanations, showExplanations = _c === void 0 ? true : _c, onComplete = _a.onComplete;
    var _d = useState(0), currentQuestionIndex = _d[0], setCurrentQuestionIndex = _d[1];
    var _e = useState([]), attempts = _e[0], setAttempts = _e[1];
    var _f = useState(null), selectedAnswer = _f[0], setSelectedAnswer = _f[1];
    var _g = useState(false), showExplanation = _g[0], setShowExplanation = _g[1];
    var _h = useState(false), isAnswered = _h[0], setIsAnswered = _h[1];
    var _j = useState(Date.now()), quizStartTime = _j[0], setQuizStartTime = _j[1];
    var _k = useState(Date.now()), questionStartTime = _k[0], setQuestionStartTime = _k[1];
    var _l = useState(timeLimit || null), timeRemaining = _l[0], setTimeRemaining = _l[1];
    var _m = useState(false), isCompleted = _m[0], setIsCompleted = _m[1];
    var _o = useState(null), results = _o[0], setResults = _o[1];
    var _p = useState(0), streak = _p[0], setStreak = _p[1];
    var _q = useState(0), perfectStreak = _q[0], setPerfectStreak = _q[1];
    var calculateAndAwardXP = useXPCalculator().calculateAndAwardXP;
    var currentQuestion = questions[currentQuestionIndex];
    var progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    // Timer effect
    useEffect(function () {
        if (!timeRemaining || isCompleted)
            return;
        var timer = setInterval(function () {
            setTimeRemaining(function (prev) {
                if (prev && prev <= 1) {
                    handleQuizComplete();
                    return 0;
                }
                return prev ? prev - 1 : null;
            });
        }, 1000);
        return function () { return clearInterval(timer); };
    }, [timeRemaining, isCompleted]);
    // Reset question timer when moving to next question
    useEffect(function () {
        setQuestionStartTime(Date.now());
    }, [currentQuestionIndex]);
    var handleAnswerSelect = function (answerIndex) {
        if (isAnswered)
            return;
        setSelectedAnswer(answerIndex);
    };
    var handleAnswerSubmit = function () {
        if (selectedAnswer === null || isAnswered)
            return;
        var timeSpent = (Date.now() - questionStartTime) / 1000;
        var isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        var currentAttempts = attempts.filter(function (a) { return a.questionId === currentQuestion.id; }).length + 1;
        var newAttempt = {
            questionId: currentQuestion.id,
            selectedAnswer: selectedAnswer,
            isCorrect: isCorrect,
            timeSpent: timeSpent,
            attempts: currentAttempts,
        };
        setAttempts(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newAttempt], false); });
        setIsAnswered(true);
        // Update streaks
        if (isCorrect) {
            setStreak(function (prev) { return prev + 1; });
            if (currentAttempts === 1) {
                setPerfectStreak(function (prev) { return prev + 1; });
            }
        }
        else {
            setStreak(0);
            setPerfectStreak(0);
        }
        if (showExplanations) {
            setShowExplanation(true);
        }
        else {
            setTimeout(function () { return handleNextQuestion(); }, 1000);
        }
    };
    var handleNextQuestion = function () {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(function (prev) { return prev + 1; });
            setSelectedAnswer(null);
            setIsAnswered(false);
            setShowExplanation(false);
        }
        else {
            handleQuizComplete();
        }
    };
    var handleRetry = function () {
        if (!allowRetry)
            return;
        // Reset current question
        setSelectedAnswer(null);
        setIsAnswered(false);
        setShowExplanation(false);
        setQuestionStartTime(Date.now());
    };
    var handleQuizComplete = useCallback(function () {
        var totalTimeSpent = (Date.now() - quizStartTime) / 1000;
        var correctAnswers = attempts.filter(function (a) { return a.isCorrect; }).length;
        var score = Math.round((correctAnswers / questions.length) * 100);
        // Calculate XP
        var xpEvent = {
            type: 'quiz_complete',
            baseXP: 15,
            metadata: {
                score: score,
                timeSpent: totalTimeSpent,
                difficulty: currentQuestion.difficulty,
                streakCount: streak,
            },
        };
        var xpEarned = calculateAndAwardXP(xpEvent).xpEarned;
        // Determine achievements
        var achievements = [];
        if (score === 100)
            achievements.push('Perfect Score!');
        if (perfectStreak >= 5)
            achievements.push('Perfect Streak!');
        if (totalTimeSpent < questions.length * 30)
            achievements.push('Speed Demon!');
        if (streak >= questions.length)
            achievements.push('Flawless Victory!');
        var quizResults = {
            score: score,
            totalQuestions: questions.length,
            correctAnswers: correctAnswers,
            totalTimeSpent: totalTimeSpent,
            attempts: attempts,
            xpEarned: xpEarned,
            achievements: achievements,
        };
        setResults(quizResults);
        setIsCompleted(true);
        // Trigger confetti for good scores
        if (score >= 80) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        onComplete === null || onComplete === void 0 ? void 0 : onComplete(quizResults);
    }, [attempts, questions.length, quizStartTime, streak, perfectStreak, currentQuestion.difficulty, calculateAndAwardXP, onComplete]);
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
            case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
            case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
        }
    };
    if (isCompleted && results) {
        return (<Card className="glass-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <Award className="h-10 w-10 text-white"/>
            </div>
          </motion.div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <p className="text-muted-foreground">Great job on completing the quiz!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-2">
              {results.score}%
            </div>
            <p className="text-lg text-muted-foreground">
              {results.correctAnswers} out of {results.totalQuestions} correct
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
              <Timer className="h-6 w-6 mx-auto mb-2 text-blue-500"/>
              <div className="font-bold">{formatTime(Math.round(results.totalTimeSpent))}</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500"/>
              <div className="font-bold">+{results.xpEarned}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>

          {/* Achievements */}
          {results.achievements.length > 0 && (<div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500"/>
                Achievements Unlocked
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.achievements.map(function (achievement, index) { return (<motion.div key={achievement} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      {achievement}
                    </Badge>
                  </motion.div>); })}
              </div>
            </div>)}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button onClick={function () { return window.location.reload(); }} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2"/>
              Retry Quiz
            </Button>
            <Button onClick={function () { return setIsCompleted(false); }}>
              <TrendingUp className="h-4 w-4 mr-2"/>
              Review Answers
            </Button>
          </div>
        </CardContent>
      </Card>);
    }
    return (<Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-emerald-500"/>
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{titleHindi}</p>
          </div>
          {timeRemaining && (<div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4"/>
              {formatTime(timeRemaining)}
            </div>)}
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2"/>
        </div>

        {/* Streak Display */}
        {streak > 0 && (<div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-500"/>
            <span className="text-sm font-medium">
              {streak} question streak! 🔥
            </span>
          </div>)}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Badge className={cn("text-xs", getDifficultyColor(currentQuestion.difficulty))}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {currentQuestion.category}
            </Badge>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">{currentQuestion.question}</h3>
            <p className="text-sm text-muted-foreground">{currentQuestion.questionHindi}</p>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map(function (option, index) { return (<motion.button key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} onClick={function () { return handleAnswerSelect(index); }} disabled={isAnswered} className={cn("w-full p-4 text-left rounded-lg border-2 transition-all", "hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20", selectedAnswer === index && !isAnswered && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20", isAnswered && index === currentQuestion.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20", isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-900/20", isAnswered && "cursor-not-allowed")}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold", selectedAnswer === index && !isAnswered && "border-emerald-500 bg-emerald-500 text-white", isAnswered && index === currentQuestion.correctAnswer && "border-green-500 bg-green-500 text-white", isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-500 text-white")}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (<CheckCircle className="h-5 w-5 text-green-500"/>)}
                  {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (<XCircle className="h-5 w-5 text-red-500"/>)}
                </div>
              </motion.button>); })}
          </AnimatePresence>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Explanation:
              </h4>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                {currentQuestion.explanation}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                {currentQuestion.explanationHindi}
              </p>
            </motion.div>)}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-between">
          {allowRetry && isAnswered && selectedAnswer !== currentQuestion.correctAnswer && (<Button onClick={handleRetry} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2"/>
              Retry
            </Button>)}
          
          <div className="flex gap-3 ml-auto">
            {!isAnswered ? (<Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null} className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Target className="h-4 w-4 mr-2"/>
                Submit Answer
              </Button>) : (<Button onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>)}
          </div>
        </div>
      </CardContent>
    </Card>);
}
