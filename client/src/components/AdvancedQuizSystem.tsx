import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star, 
  Brain, 
  Target, 
  Zap,
  RotateCcw,
  TrendingUp,
  Award,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useXPCalculator } from "@/lib/xp-calculator";
import confetti from "canvas-confetti";

interface QuizQuestion {
  id: number;
  question: string;
  questionHindi: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  timeLimit?: number; // seconds
}

interface QuizAttempt {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  attempts: number;
}

interface AdvancedQuizSystemProps {
  questions: QuizQuestion[];
  title: string;
  titleHindi: string;
  description?: string;
  timeLimit?: number; // total quiz time limit in seconds
  allowRetry?: boolean;
  showExplanations?: boolean;
  onComplete?: (results: QuizResults) => void;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  attempts: QuizAttempt[];
  xpEarned: number;
  achievements: string[];
}

export function AdvancedQuizSystem({
  questions,
  title,
  titleHindi,
  description,
  timeLimit,
  allowRetry = true,
  showExplanations = true,
  onComplete,
}: AdvancedQuizSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeLimit || null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [streak, setStreak] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);

  const { calculateAndAwardXP } = useXPCalculator();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (!timeRemaining || isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev <= 1) {
          handleQuizComplete();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isCompleted]);

  // Reset question timer when moving to next question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || isAnswered) return;

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const currentAttempts = attempts.filter(a => a.questionId === currentQuestion.id).length + 1;

    const newAttempt: QuizAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      attempts: currentAttempts,
    };

    setAttempts(prev => [...prev, newAttempt]);
    setIsAnswered(true);

    // Update streaks
    if (isCorrect) {
      setStreak(prev => prev + 1);
      if (currentAttempts === 1) {
        setPerfectStreak(prev => prev + 1);
      }
    } else {
      setStreak(0);
      setPerfectStreak(0);
    }

    if (showExplanations) {
      setShowExplanation(true);
    } else {
      setTimeout(() => handleNextQuestion(), 1000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleRetry = () => {
    if (!allowRetry) return;
    
    // Reset current question
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setQuestionStartTime(Date.now());
  };

  const handleQuizComplete = useCallback(() => {
    const totalTimeSpent = (Date.now() - quizStartTime) / 1000;
    const correctAnswers = attempts.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);

    // Calculate XP
    const xpEvent = {
      type: 'quiz_complete' as const,
      baseXP: 15,
      metadata: {
        score,
        timeSpent: totalTimeSpent,
        difficulty: currentQuestion.difficulty,
        streakCount: streak,
      },
    };

    const { xpEarned } = calculateAndAwardXP(xpEvent);

    // Determine achievements
    const achievements: string[] = [];
    if (score === 100) achievements.push('Perfect Score!');
    if (perfectStreak >= 5) achievements.push('Perfect Streak!');
    if (totalTimeSpent < questions.length * 30) achievements.push('Speed Demon!');
    if (streak >= questions.length) achievements.push('Flawless Victory!');

    const quizResults: QuizResults = {
      score,
      totalQuestions: questions.length,
      correctAnswers,
      totalTimeSpent,
      attempts,
      xpEarned,
      achievements,
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

    onComplete?.(quizResults);
  }, [attempts, questions.length, quizStartTime, streak, perfectStreak, currentQuestion.difficulty, calculateAndAwardXP, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  if (isCompleted && results) {
    return (
      <Card className="glass-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <Award className="h-10 w-10 text-white" />
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
              <Timer className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="font-bold">{formatTime(Math.round(results.totalTimeSpent))}</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-bold">+{results.xpEarned}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>

          {/* Achievements */}
          {results.achievements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Achievements Unlocked
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      {achievement}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry Quiz
            </Button>
            <Button onClick={() => setIsCompleted(false)}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Review Answers
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-emerald-500" />
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{titleHindi}</p>
          </div>
          {timeRemaining && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Streak Display */}
        {streak > 0 && (
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">
              {streak} question streak! 🔥
            </span>
          </div>
        )}
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
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 text-left rounded-lg border-2 transition-all",
                  "hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
                  selectedAnswer === index && !isAnswered && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
                  isAnswered && index === currentQuestion.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20",
                  isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-900/20",
                  isAnswered && "cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                    selectedAnswer === index && !isAnswered && "border-emerald-500 bg-emerald-500 text-white",
                    isAnswered && index === currentQuestion.correctAnswer && "border-green-500 bg-green-500 text-white",
                    isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-500 text-white"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Explanation:
              </h4>
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                {currentQuestion.explanation}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                {currentQuestion.explanationHindi}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-between">
          {allowRetry && isAnswered && selectedAnswer !== currentQuestion.correctAnswer && (
            <Button onClick={handleRetry} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
          
          <div className="flex gap-3 ml-auto">
            {!isAnswered ? (
              <Button 
                onClick={handleAnswerSubmit} 
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              >
                <Target className="h-4 w-4 mr-2" />
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}