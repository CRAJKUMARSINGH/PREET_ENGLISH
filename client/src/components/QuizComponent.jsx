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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { SupportCard, inferGrammarCategoryFromText, getGrammarEntryForKey } from '@/components/SupportCard';
export function QuizComponent(_a) {
    var lessonId = _a.lessonId, lessonTitle = _a.lessonTitle, questions = _a.questions, onComplete = _a.onComplete;
    var _b = useState(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = useState(null), selectedAnswer = _c[0], setSelectedAnswer = _c[1];
    var _d = useState(false), showResult = _d[0], setShowResult = _d[1];
    var _e = useState(0), score = _e[0], setScore = _e[1];
    var _f = useState([]), answers = _f[0], setAnswers = _f[1];
    var _g = useState(false), quizComplete = _g[0], setQuizComplete = _g[1];
    var _h = useState(null), lastErrorCategory = _h[0], setLastErrorCategory = _h[1];
    var _j = useState({
        articles: 0,
        prepositions: 0,
        present_continuous: 0,
    }), errorCounts = _j[0], setErrorCounts = _j[1];
    var question = questions[currentQuestion];
    var isLastQuestion = currentQuestion === questions.length - 1;
    var percentage = Math.round((score / questions.length) * 100);
    var handleAnswer = function (answer) {
        if (showResult)
            return;
        setSelectedAnswer(answer);
    };
    var handleSubmit = function () {
        if (!selectedAnswer)
            return;
        var isCorrect = selectedAnswer === question.correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
            setLastErrorCategory(null);
        }
        else {
            var inferred_1 = inferGrammarCategoryFromText("".concat(question.question, " ").concat(question.explanation, " ").concat(question.questionHindi));
            setLastErrorCategory(inferred_1);
            if (inferred_1) {
                setErrorCounts(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[inferred_1] = prev[inferred_1] + 1, _a)));
                });
            }
        }
        setAnswers(__spreadArray(__spreadArray([], answers, true), [{
                question: currentQuestion,
                answer: selectedAnswer,
                correct: isCorrect
            }], false));
        setShowResult(true);
    };
    var handleNext = function () {
        if (isLastQuestion) {
            setQuizComplete(true);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), percentage);
        }
        else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };
    var handleRestart = function () {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
        setQuizComplete(false);
        setLastErrorCategory(null);
    };
    if (quizComplete) {
        var passed = percentage >= 70;
        var hasErrorSummary = Object.values(errorCounts).some(function (count) { return count > 0; });
        return (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {passed ? (<div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-green-600 dark:text-green-400"/>
                </div>) : (<div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-4xl">
                  📚
                </div>)}
            </div>
            <CardTitle className="text-3xl">
              {passed ? '🎉 बधाई हो!' : '💪 अच्छी कोशिश!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {percentage}%
              </div>
              <p className="text-muted-foreground">
                {score} out of {questions.length} correct
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {score}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Correct</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {questions.length - score}
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">Incorrect</div>
              </div>
            </div>

            {passed ? (<div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-300 text-center">
                  ✅ आपने यह क्विज पास कर लिया! बहुत बढ़िया!
                </p>
              </div>) : (<div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-orange-800 dark:text-orange-300 text-center">
                  📖 पाठ को फिर से पढ़ें और दोबारा कोशिश करें। आप कर सकते हैं!
                </p>
              </div>)}

            {hasErrorSummary && (<div className="mt-2 text-left bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  आपकी आज की आम गलतियाँ (Your common mistakes today)
                </h4>
                <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-50">
                  {Object.entries(errorCounts)
                    .filter(function (_a) {
                    var count = _a[1];
                    return count > 0;
                })
                    .map(function (_a) {
                    var key = _a[0], count = _a[1];
                    var entry = getGrammarEntryForKey(key);
                    if (!entry)
                        return null;
                    return (<li key={key} className="flex flex-col gap-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{entry.category}</span>
                            <span className="text-[11px] text-amber-800/80 dark:text-amber-200/80">
                              गलतियाँ: {count}
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-800/80 dark:text-amber-200/80">
                            {entry.hindiExplanation}
                          </p>
                        </li>);
                })}
                </ul>
              </div>)}

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2"/>
                फिर से कोशिश करें
              </Button>
              <Button onClick={function () { return window.history.back(); }} className="flex-1">
                पाठ पर वापस जाएं
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>);
    }
    return (<div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}/{questions.length}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: "".concat(((currentQuestion + 1) / questions.length) * 100, "%") }} transition={{ duration: 0.3 }}/>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="mb-2 text-primary">{question.questionHindi}</div>
                <div className="text-lg text-muted-foreground">{question.question}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map(function (option, index) {
            var isSelected = selectedAnswer === option;
            var isCorrect = option === question.correctAnswer;
            var showCorrect = showResult && isCorrect;
            var showIncorrect = showResult && isSelected && !isCorrect;
            return (<button key={index} onClick={function () { return handleAnswer(option); }} disabled={showResult} className={cn('w-full p-4 rounded-lg border-2 text-left transition-all', 'hover:border-primary hover:bg-primary/5', isSelected && !showResult && 'border-primary bg-primary/10', showCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/20', showIncorrect && 'border-red-500 bg-red-50 dark:bg-red-900/20', !isSelected && !showCorrect && !showIncorrect && 'border-border')}>
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{option}</span>
                      {showCorrect && <CheckCircle className="w-5 h-5 text-green-600"/>}
                      {showIncorrect && <XCircle className="w-5 h-5 text-red-600"/>}
                    </div>
                  </button>);
        })}

              {showResult && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('p-4 rounded-lg mb-3 border-2', selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800')}>
                  <p className="font-medium mb-2">
                    {selectedAnswer === question.correctAnswer ? '✅ सही!' : '❌ गलत'}
                  </p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </motion.div>)}

              {showResult && selectedAnswer !== question.correctAnswer && (<SupportCard categoryKey={lastErrorCategory}/>)}

              <div className="flex gap-3 pt-4">
                {!showResult ? (<Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
                    Submit Answer
                  </Button>) : (<Button onClick={handleNext} className="w-full">
                    {isLastQuestion ? 'देखें परिणाम' : 'अगला प्रश्न'}
                    <ArrowRight className="w-4 h-4 ml-2"/>
                  </Button>)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>);
}
