import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Award, RotateCcw, Clock, Star } from "lucide-react";

interface MatchPair {
  id: number;
  english: string;
  hindi: string;
  category: string;
}

const matchPairs: MatchPair[] = [
  // Pronouns
  { id: 1, english: "I", hindi: "मैं", category: "Pronouns" },
  { id: 2, english: "You", hindi: "तुम/आप", category: "Pronouns" },
  { id: 3, english: "He", hindi: "वह (पुरुष)", category: "Pronouns" },
  { id: 4, english: "She", hindi: "वह (स्त्री)", category: "Pronouns" },
  { id: 5, english: "We", hindi: "हम", category: "Pronouns" },
  { id: 6, english: "They", hindi: "वे", category: "Pronouns" },
  // Verbs
  { id: 7, english: "Go", hindi: "जाना", category: "Verbs" },
  { id: 8, english: "Come", hindi: "आना", category: "Verbs" },
  { id: 9, english: "Eat", hindi: "खाना", category: "Verbs" },
  { id: 10, english: "Drink", hindi: "पीना", category: "Verbs" },
  { id: 11, english: "Read", hindi: "पढ़ना", category: "Verbs" },
  { id: 12, english: "Write", hindi: "लिखना", category: "Verbs" },
  { id: 13, english: "Sleep", hindi: "सोना", category: "Verbs" },
  { id: 14, english: "Wake up", hindi: "जागना", category: "Verbs" },
  // Adjectives
  { id: 15, english: "Big", hindi: "बड़ा", category: "Adjectives" },
  { id: 16, english: "Small", hindi: "छोटा", category: "Adjectives" },
  { id: 17, english: "Good", hindi: "अच्छा", category: "Adjectives" },
  { id: 18, english: "Bad", hindi: "बुरा", category: "Adjectives" },
  { id: 19, english: "Beautiful", hindi: "सुंदर", category: "Adjectives" },
  { id: 20, english: "Hot", hindi: "गर्म", category: "Adjectives" },
  { id: 21, english: "Cold", hindi: "ठंडा", category: "Adjectives" },
  { id: 22, english: "New", hindi: "नया", category: "Adjectives" },
  // Nouns
  { id: 23, english: "House", hindi: "घर", category: "Nouns" },
  { id: 24, english: "Water", hindi: "पानी", category: "Nouns" },
  { id: 25, english: "Food", hindi: "खाना", category: "Nouns" },
  { id: 26, english: "Book", hindi: "किताब", category: "Nouns" },
  { id: 27, english: "School", hindi: "स्कूल", category: "Nouns" },
  { id: 28, english: "Friend", hindi: "दोस्त", category: "Nouns" },
  { id: 29, english: "Family", hindi: "परिवार", category: "Nouns" },
  { id: 30, english: "Money", hindi: "पैसा", category: "Nouns" },
];

export function GrammarMatchGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPairs, setCurrentPairs] = useState<MatchPair[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [selectedHindi, setSelectedHindi] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", "Pronouns", "Verbs", "Adjectives", "Nouns"];

  const startGame = () => {
    const filtered = category === "All"
      ? matchPairs
      : matchPairs.filter(p => p.category === category);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 8);
    setCurrentPairs(shuffled);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    setSelectedEnglish(null);
    setSelectedHindi(null);
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft, gameOver]);

  useEffect(() => {
    if (matchedPairs.length === currentPairs.length && currentPairs.length > 0) {
      setGameOver(true);
    }
  }, [matchedPairs, currentPairs]);

  const handleEnglishClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedEnglish(id);
    checkMatch(id, selectedHindi);
  };

  const handleHindiClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedHindi(id);
    checkMatch(selectedEnglish, id);
  };

  const checkMatch = (engId: number | null, hinId: number | null) => {
    if (engId !== null && hinId !== null) {
      if (engId === hinId) {
        setMatchedPairs([...matchedPairs, engId]);
        setScore(score + 10);
      }
      setTimeout(() => {
        setSelectedEnglish(null);
        setSelectedHindi(null);
      }, 300);
    }
  };

  const shuffledHindi = [...currentPairs].sort(() => Math.random() - 0.5);

  if (!gameStarted) {
    return (
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Gamepad2 className="h-6 w-6" />
            मिलान खेल (Match Game)
          </CardTitle>
          <p className="text-sm text-green-600 dark:text-green-400">
            अंग्रेजी शब्दों को हिंदी अर्थ से मिलाएं
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <Gamepad2 className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="text-xl font-bold">शब्द मिलान खेल</h3>
            <p className="text-muted-foreground">
              60 सेकंड में जितने हो सके उतने शब्द मिलाएं!
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">श्रेणी चुनें (Select Category):</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                >
                  {cat === "All" ? "सभी" : cat}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700">
            खेल शुरू करें (Start Game)
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameOver) {
    const percentage = Math.round((matchedPairs.length / currentPairs.length) * 100);
    return (
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Award className="h-6 w-6" />
            खेल समाप्त! (Game Over!)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <div className="text-6xl font-bold text-green-600">{score}</div>
          <div className="text-xl">अंक (Points)</div>

          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{matchedPairs.length}/{currentPairs.length}</div>
              <div className="text-sm text-muted-foreground">मिलान (Matches)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{60 - timeLeft}s</div>
              <div className="text-sm text-muted-foreground">समय (Time)</div>
            </div>
          </div>

          {percentage === 100 && (
            <div className="flex justify-center gap-1">
              {[1, 2, 3].map(i => <Star key={i} className="h-8 w-8 text-yellow-500 fill-yellow-500" />)}
            </div>
          )}

          <Badge className={`text-lg py-2 px-4 ${percentage === 100 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-orange-500'}`}>
            {percentage === 100 ? '🎉 परफेक्ट!' : percentage >= 50 ? '👍 अच्छा!' : '📚 और अभ्यास करें!'}
          </Badge>

          <Button onClick={startGame} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" /> फिर से खेलें
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-green-200 dark:border-green-800">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-700 dark:text-green-300">मिलान खेल</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg">
              <Star className="h-4 w-4 mr-1" /> {score}
            </Badge>
            <Badge variant={timeLeft <= 10 ? "destructive" : "outline"} className="text-lg">
              <Clock className="h-4 w-4 mr-1" /> {timeLeft}s
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* English Column */}
          <div className="space-y-2">
            <h3 className="font-bold text-center mb-3 text-blue-600">English</h3>
            {currentPairs.map(pair => (
              <button
                key={`eng-${pair.id}`}
                onClick={() => handleEnglishClick(pair.id)}
                disabled={matchedPairs.includes(pair.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${matchedPairs.includes(pair.id)
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : selectedEnglish === pair.id
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
              >
                {pair.english}
              </button>
            ))}
          </div>

          {/* Hindi Column */}
          <div className="space-y-2">
            <h3 className="font-bold text-center mb-3 text-orange-600">हिंदी</h3>
            {shuffledHindi.map(pair => (
              <button
                key={`hin-${pair.id}`}
                onClick={() => handleHindiClick(pair.id)}
                disabled={matchedPairs.includes(pair.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all font-hindi ${matchedPairs.includes(pair.id)
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : selectedHindi === pair.id
                      ? 'bg-orange-100 border-orange-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-400'
                  }`}
              >
                {pair.hindi}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {matchedPairs.length}/{currentPairs.length} मिलान पूर्ण
        </div>
      </CardContent>
    </Card>
  );
}