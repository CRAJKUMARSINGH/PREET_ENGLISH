import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy, Clock, Zap } from "lucide-react";

interface QuizQuestion {
  id: number;
  word: string;
  hindi: string;
  options: { text: string; textHindi: string }[];
  correctIndex: number;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  { id: 1, word: "Abundant", hindi: "प्रचुर", options: [
    { text: "Scarce", textHindi: "दुर्लभ" },
    { text: "Plentiful", textHindi: "प्रचुर" },
    { text: "Empty", textHindi: "खाली" },
    { text: "Small", textHindi: "छोटा" }
  ], correctIndex: 1, category: "Adjectives" },
  { id: 2, word: "Brave", hindi: "बहादुर", options: [
    { text: "Cowardly", textHindi: "कायर" },
    { text: "Weak", textHindi: "कमज़ोर" },
    { text: "Courageous", textHindi: "साहसी" },
    { text: "Scared", textHindi: "डरा हुआ" }
  ], correctIndex: 2, category: "Adjectives" },
  { id: 3, word: "Commence", hindi: "शुरू करना", options: [
    { text: "End", textHindi: "समाप्त" },
    { text: "Stop", textHindi: "रुकना" },
    { text: "Begin", textHindi: "शुरू" },
    { text: "Pause", textHindi: "रुकावट" }
  ], correctIndex: 2, category: "Verbs" },
  { id: 4, word: "Diminish", hindi: "कम होना", options: [
    { text: "Increase", textHindi: "बढ़ना" },
    { text: "Grow", textHindi: "बढ़ना" },
    { text: "Expand", textHindi: "फैलना" },
    { text: "Decrease", textHindi: "घटना" }
  ], correctIndex: 3, category: "Verbs" },
  { id: 5, word: "Enormous", hindi: "विशाल", options: [
    { text: "Tiny", textHindi: "छोटा" },
    { text: "Huge", textHindi: "विशाल" },
    { text: "Small", textHindi: "छोटा" },
    { text: "Little", textHindi: "थोड़ा" }
  ], correctIndex: 1, category: "Adjectives" },
  { id: 6, word: "Frequently", hindi: "अक्सर", options: [
    { text: "Rarely", textHindi: "कभी-कभी" },
    { text: "Never", textHindi: "कभी नहीं" },
    { text: "Often", textHindi: "अक्सर" },
    { text: "Sometimes", textHindi: "कभी-कभी" }
  ], correctIndex: 2, category: "Adverbs" },
  { id: 7, word: "Genuine", hindi: "असली", options: [
    { text: "Fake", textHindi: "नकली" },
    { text: "False", textHindi: "झूठा" },
    { text: "Authentic", textHindi: "प्रामाणिक" },
    { text: "Artificial", textHindi: "कृत्रिम" }
  ], correctIndex: 2, category: "Adjectives" },
  { id: 8, word: "Hazardous", hindi: "खतरनाक", options: [
    { text: "Safe", textHindi: "सुरक्षित" },
    { text: "Dangerous", textHindi: "खतरनाक" },
    { text: "Secure", textHindi: "सुरक्षित" },
    { text: "Protected", textHindi: "संरक्षित" }
  ], correctIndex: 1, category: "Adjectives" },
  { id: 9, word: "Imitate", hindi: "नकल करना", options: [
    { text: "Create", textHindi: "बनाना" },
    { text: "Invent", textHindi: "आविष्कार" },
    { text: "Copy", textHindi: "नकल" },
    { text: "Originate", textHindi: "उत्पन्न" }
  ], correctIndex: 2, category: "Verbs" },
  { id: 10, word: "Jubilant", hindi: "उल्लासित", options: [
    { text: "Sad", textHindi: "दुखी" },
    { text: "Joyful", textHindi: "खुश" },
    { text: "Angry", textHindi: "गुस्सा" },
    { text: "Depressed", textHindi: "उदास" }
  ], correctIndex: 1, category: "Adjectives" },
  { id: 11, word: "Keen", hindi: "उत्सुक", options: [
    { text: "Uninterested", textHindi: "उदासीन" },
    { text: "Bored", textHindi: "ऊबा हुआ" },
    { text: "Eager", textHindi: "उत्सुक" },
    { text: "Lazy", textHindi: "आलसी" }
  ], correctIndex: 2, category: "Adjectives" },
  { id: 12, word: "Luminous", hindi: "चमकदार", options: [
    { text: "Dark", textHindi: "अंधेरा" },
    { text: "Dim", textHindi: "धुंधला" },
    { text: "Bright", textHindi: "चमकदार" },
    { text: "Dull", textHindi: "फीका" }
  ], correctIndex: 2, category: "Adjectives" },
  { id: 13, word: "Magnificent", hindi: "शानदार", options: [
    { text: "Ordinary", textHindi: "साधारण" },
    { text: "Splendid", textHindi: "शानदार" },
    { text: "Plain", textHindi: "सादा" },
    { text: "Simple", textHindi: "सरल" }
  ], correctIndex: 1, category: "Adjectives" },
  { id: 14, word: "Neglect", hindi: "उपेक्षा करना", options: [
    { text: "Care for", textHindi: "देखभाल" },
    { text: "Ignore", textHindi: "अनदेखा" },
    { text: "Attend", textHindi: "ध्यान देना" },
    { text: "Nurture", textHindi: "पोषण" }
  ], correctIndex: 1, category: "Verbs" },
  { id: 15, word: "Optimistic", hindi: "आशावादी", options: [
    { text: "Pessimistic", textHindi: "निराशावादी" },
    { text: "Hopeful", textHindi: "आशावान" },
    { text: "Negative", textHindi: "नकारात्मक" },
    { text: "Doubtful", textHindi: "संदेहपूर्ण" }
  ], correctIndex: 1, category: "Adjectives" },
];

export function VocabularyQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const currentQuestion = quizQuestions[currentIndex];

  useEffect(() => {
    if (gameStarted && !showResult && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
  }, [gameStarted, timeLeft, showResult, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setCurrentIndex(0);
    setQuestionsAnswered(0);
    setGameOver(false);
    setTimeLeft(15);
  };

  const handleTimeout = () => {
    setShowResult(true);
    setStreak(0);
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    setQuestionsAnswered(questionsAnswered + 1);
    
    if (index === currentQuestion.correctIndex) {
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(score + 10 + timeBonus);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (questionsAnswered >= 10) {
      setGameOver(true);
      return;
    }
    setCurrentIndex((currentIndex + 1) % quizQuestions.length);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  if (!gameStarted) {
    return (
      <Card className="border-2 border-rose-200 dark:border-rose-800">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
          <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
            <Brain className="h-6 w-6" />
            शब्दावली प्रश्नोत्तरी (Vocabulary Quiz)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <Brain className="h-16 w-16 mx-auto text-rose-500" />
          <h3 className="text-xl font-bold">शब्दों का अर्थ पहचानें!</h3>
          <p className="text-muted-foreground">
            10 प्रश्न | 15 सेकंड प्रति प्रश्न | समय बोनस
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Zap className="h-5 w-5 mx-auto text-green-600 mb-1" />
              <span>तेज़ उत्तर = बोनस अंक</span>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Trophy className="h-5 w-5 mx-auto text-yellow-600 mb-1" />
              <span>स्ट्रीक बनाएं</span>
            </div>
          </div>
          <Button onClick={startGame} className="w-full bg-rose-600 hover:bg-rose-700">
            खेल शुरू करें
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / 150) * 100);
    return (
      <Card className="border-2 border-rose-200 dark:border-rose-800">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
          <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
            <Trophy className="h-6 w-6" />
            परिणाम (Results)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <div className="text-6xl font-bold text-rose-600">{score}</div>
          <div className="text-xl">अंक (Points)</div>
          
          <Badge className={`text-lg py-2 px-4 ${percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-orange-500'}`}>
            {percentage >= 70 ? '🎉 उत्कृष्ट!' : percentage >= 40 ? '👍 अच्छा!' : '📚 और अभ्यास करें!'}
          </Badge>

          <Button onClick={startGame} className="w-full bg-rose-600">
            <RotateCcw className="h-4 w-4 mr-2" /> फिर से खेलें
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-rose-200 dark:border-rose-800">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-rose-700 dark:text-rose-300">शब्दावली प्रश्नोत्तरी</CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <Badge variant="outline">🔥 {streak}</Badge>
            <Badge variant={timeLeft <= 5 ? "destructive" : "outline"}>
              <Clock className="h-3 w-3 mr-1" /> {timeLeft}s
            </Badge>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          प्रश्न {questionsAnswered + 1}/10
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Question */}
        <div className="text-center p-6 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">इस शब्द का अर्थ क्या है?</p>
          <h2 className="text-3xl font-bold text-rose-700 dark:text-rose-300">{currentQuestion.word}</h2>
          <p className="text-lg text-orange-600 dark:text-orange-400 font-hindi mt-2">({currentQuestion.hindi})</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                showResult
                  ? index === currentQuestion.correctIndex
                    ? "bg-green-100 border-green-500 text-green-700"
                    : index === selectedAnswer
                    ? "bg-red-100 border-red-500 text-red-700"
                    : "bg-slate-50 border-slate-200"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-400"
              }`}
            >
              <span className="font-medium">{option.text}</span>
              <span className="text-orange-600 dark:text-orange-400 font-hindi text-sm block">
                ({option.textHindi})
              </span>
            </button>
          ))}
        </div>

        {/* Result */}
        {showResult && (
          <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${
            selectedAnswer === currentQuestion.correctIndex
              ? "bg-green-50 border-green-300"
              : "bg-red-50 border-red-300"
          }`}>
            {selectedAnswer === currentQuestion.correctIndex ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="font-bold text-green-700">सही! +{10 + Math.floor(timeLeft / 3)} अंक</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600" />
                <span className="font-bold text-red-700">
                  गलत! सही उत्तर: {currentQuestion.options[currentQuestion.correctIndex].text}
                </span>
              </>
            )}
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <Button onClick={nextQuestion} className="w-full bg-rose-600">
            {questionsAnswered >= 10 ? "परिणाम देखें" : "अगला प्रश्न →"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}