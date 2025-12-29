import { useState } from "react";
import { CheckCircle, XCircle, Trophy, Star, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";

interface QuizQuestion {
  question: string;
  questionHindi: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
}

interface QuizSectionProps {
  lessonId: number;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export function QuizSection({ lessonId, questions, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  
  const { playSuccess, playError, playCelebration } = useSound();

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSuccess();
    } else {
      playError();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      if (finalScore >= questions.length * 0.7) {
        playCelebration();
      }
      onComplete(finalScore, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers(new Array(questions.length).fill(null));
  };

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  if (quizComplete) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 border shadow-lg">
        <div className="text-center">
          <div className={cn(
            "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6",
            passed ? "bg-green-100 dark:bg-green-900/30" : "bg-orange-100 dark:bg-orange-900/30"
          )}>
            {passed ? (
              <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
            ) : (
              <RefreshCw className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            {passed ? "बधाई हो! 🎉" : "फिर से कोशिश करें!"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {passed 
              ? "आपने क्विज़ पास कर लिया!" 
              : "70% से अधिक अंक प्राप्त करें पास करने के लिए"}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">सही उत्तर</div>
            </div>
            <div className="text-3xl text-muted-foreground">/</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-600 dark:text-slate-400">{questions.length}</div>
              <div className="text-sm text-muted-foreground">कुल प्रश्न</div>
            </div>
          </div>

          {/* Stars based on score */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-10 h-10 transition-all",
                  percentage >= star * 33
                    ? "text-yellow-400 fill-yellow-400 animate-bounce-slow"
                    : "text-slate-300 dark:text-slate-600"
                )}
                style={{ animationDelay: `${star * 0.1}s` }}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            {!passed && (
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                फिर से प्रयास करें
              </button>
            )}
            {passed && (
              <div className="px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                प्रमाणपत्र अर्जित!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border shadow-lg">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>प्रश्न {currentQuestion + 1} / {questions.length}</span>
          <span>स्कोर: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">{question.question}</h3>
        <p className="text-muted-foreground">{question.questionHindi}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(index)}
            disabled={showResult}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all",
              selectedAnswer === index && !showResult && "border-primary bg-primary/5",
              showResult && index === question.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20",
              showResult && selectedAnswer === index && index !== question.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-900/20",
              !showResult && selectedAnswer !== index && "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                selectedAnswer === index && !showResult && "bg-primary text-white",
                showResult && index === question.correctAnswer && "bg-green-500 text-white",
                showResult && selectedAnswer === index && index !== question.correctAnswer && "bg-red-500 text-white",
                !showResult && selectedAnswer !== index && "bg-slate-100 dark:bg-slate-800"
              )}>
                {showResult && index === question.correctAnswer ? (
                  <CheckCircle className="w-5 h-5" />
                ) : showResult && selectedAnswer === index ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          "p-4 rounded-xl mb-6",
          isCorrect ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
        )}>
          <p className="font-medium mb-1">
            {isCorrect ? "✅ सही उत्तर!" : "❌ गलत उत्तर"}
          </p>
          <p className="text-sm text-muted-foreground">{question.explanationHindi}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={showResult ? handleNext : handleSubmit}
        disabled={selectedAnswer === null && !showResult}
        className={cn(
          "w-full py-4 rounded-xl font-bold transition-all",
          selectedAnswer === null && !showResult
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/90"
        )}
      >
        {showResult 
          ? currentQuestion < questions.length - 1 
            ? "अगला प्रश्न →" 
            : "परिणाम देखें"
          : "उत्तर जमा करें"
        }
      </button>
    </div>
  );
}
