var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, CheckCircle, XCircle, RotateCcw, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
var quickQuizQuestions = [
    {
        id: '1',
        question: 'Choose the correct article: ___ apple a day keeps the doctor away.',
        questionHindi: 'सही article चुनें: ___ apple a day keeps the doctor away.',
        options: ['A', 'An', 'The', 'No article'],
        correctAnswer: 1,
        explanation: 'Use "An" before vowel sounds. Apple starts with "a" sound.',
        explanationHindi: 'स्वर ध्वनि से पहले "An" का उपयोग करें। Apple "a" ध्वनि से शुरू होता है।',
        category: 'Articles'
    },
    {
        id: '2',
        question: 'Which is correct?',
        questionHindi: 'कौन सा सही है?',
        options: ['I am having a car', 'I have a car', 'I am have a car', 'I having a car'],
        correctAnswer: 1,
        explanation: 'Use simple present "have" for possession, not continuous tense.',
        explanationHindi: 'स्वामित्व के लिए simple present "have" का उपयोग करें, continuous tense नहीं।',
        category: 'Tenses'
    },
    {
        id: '3',
        question: 'Fill in the blank: The meeting is ___ Monday.',
        questionHindi: 'खाली जगह भरें: The meeting is ___ Monday.',
        options: ['in', 'on', 'at', 'by'],
        correctAnswer: 1,
        explanation: 'Use "on" with days of the week.',
        explanationHindi: 'सप्ताह के दिनों के साथ "on" का उपयोग करें।',
        category: 'Prepositions'
    },
    {
        id: '4',
        question: 'Which sentence is grammatically correct?',
        questionHindi: 'कौन सा वाक्य व्याकरणिक रूप से सही है?',
        options: [
            'He don\'t know the answer',
            'He doesn\'t knows the answer',
            'He doesn\'t know the answer',
            'He not know the answer'
        ],
        correctAnswer: 2,
        explanation: 'With he/she/it, use "doesn\'t" + base verb.',
        explanationHindi: 'He/she/it के साथ "doesn\'t" + मूल क्रिया का उपयोग करें।',
        category: 'Subject-Verb Agreement'
    },
    {
        id: '5',
        question: 'Choose the correct word: I need to ___ my English skills.',
        questionHindi: 'सही शब्द चुनें: I need to ___ my English skills.',
        options: ['improve', 'improved', 'improving', 'improves'],
        correctAnswer: 0,
        explanation: 'After "to" (infinitive), use the base form of the verb.',
        explanationHindi: '"to" (infinitive) के बाद क्रिया का मूल रूप उपयोग करें।',
        category: 'Infinitives'
    }
];
export function QuickRevision() {
    var _a = useState(0), currentQuestion = _a[0], setCurrentQuestion = _a[1];
    var _b = useState(null), selectedAnswer = _b[0], setSelectedAnswer = _b[1];
    var _c = useState(false), showResult = _c[0], setShowResult = _c[1];
    var _d = useState(0), score = _d[0], setScore = _d[1];
    var _e = useState([]), answers = _e[0], setAnswers = _e[1];
    var _f = useState(false), quizComplete = _f[0], setQuizComplete = _f[1];
    var _g = useState(30), timeLeft = _g[0], setTimeLeft = _g[1];
    var question = quickQuizQuestions[currentQuestion];
    var progress = ((currentQuestion + 1) / quickQuizQuestions.length) * 100;
    var handleAnswer = function (answerIndex) {
        if (showResult)
            return;
        setSelectedAnswer(answerIndex);
        setShowResult(true);
        var isCorrect = answerIndex === question.correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setAnswers(__spreadArray(__spreadArray([], answers, true), [isCorrect], false));
    };
    var nextQuestion = function () {
        if (currentQuestion < quickQuizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setTimeLeft(30);
        }
        else {
            setQuizComplete(true);
        }
    };
    var restartQuiz = function () {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
        setQuizComplete(false);
        setTimeLeft(30);
    };
    var getScoreMessage = function () {
        var percentage = (score / quickQuizQuestions.length) * 100;
        if (percentage >= 80)
            return { message: 'Excellent! बहुत बढ़िया!', emoji: '🎉' };
        if (percentage >= 60)
            return { message: 'Good job! अच्छा काम!', emoji: '👍' };
        if (percentage >= 40)
            return { message: 'Keep practicing! अभ्यास जारी रखें!', emoji: '💪' };
        return { message: 'Need more practice! और अभ्यास करें!', emoji: '📚' };
    };
    if (quizComplete) {
        var _h = getScoreMessage(), message = _h.message, emoji = _h.emoji;
        return (<Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-lg text-muted-foreground mb-4">{message}</p>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score}/{quickQuizQuestions.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round((score / quickQuizQuestions.length) * 100)}% Correct
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {answers.map(function (correct, index) { return (<div key={index} className={cn("w-8 h-8 rounded-full flex items-center justify-center", correct ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                {correct ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
              </div>); })}
          </div>

          <Button onClick={restartQuiz} size="lg">
            <RotateCcw className="w-4 h-4 mr-2"/>
            Try Again
          </Button>
        </CardContent>
      </Card>);
    }
    return (<div className="quick-revision space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500"/>
            Quick Revision Quiz
            <span className="text-sm font-normal text-muted-foreground">
              (त्वरित पुनरावृत्ति)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Question {currentQuestion + 1} of {quickQuizQuestions.length}</span>
            <Badge variant="outline">{question.category}</Badge>
          </div>
          <Progress value={progress}/>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{question.question}</h3>
            <p className="text-blue-600 dark:text-blue-400">{question.questionHindi}</p>
          </div>

          <div className="space-y-3">
            {question.options.map(function (option, index) { return (<Button key={index} variant="outline" className={cn("w-full justify-start h-auto p-4 text-left", showResult && index === question.correctAnswer && "bg-green-100 border-green-500 dark:bg-green-950/20", showResult && selectedAnswer === index && index !== question.correctAnswer && "bg-red-100 border-red-500 dark:bg-red-950/20", !showResult && selectedAnswer === index && "border-blue-500")} onClick={function () { return handleAnswer(index); }} disabled={showResult}>
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showResult && index === question.correctAnswer && (<CheckCircle className="w-5 h-5 ml-auto text-green-500"/>)}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (<XCircle className="w-5 h-5 ml-auto text-red-500"/>)}
              </Button>); })}
          </div>

          {showResult && (<div className={cn("mt-6 p-4 rounded-lg", selectedAnswer === question.correctAnswer
                ? "bg-green-50 dark:bg-green-950/20"
                : "bg-red-50 dark:bg-red-950/20")}>
              <div className="font-medium mb-2">
                {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <p className="text-sm mb-1">{question.explanation}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">{question.explanationHindi}</p>
            </div>)}

          {showResult && (<div className="mt-6 flex justify-end">
              <Button onClick={nextQuestion}>
                {currentQuestion < quickQuizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </div>)}
        </CardContent>
      </Card>

      {/* Score Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500"/>
                <span>Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={restartQuiz}>
              <RotateCcw className="w-4 h-4 mr-1"/>
              Restart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>);
}
