import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mic, Volume2, CheckCircle, XCircle, RotateCcw, Trophy, Star } from "lucide-react";

interface SpellingWord {
  word: string;
  hindi: string;
  sentence: string;
  difficulty: "easy" | "medium" | "hard";
}

const spellingWords: SpellingWord[] = [
  // Easy
  { word: "cat", hindi: "बिल्ली", sentence: "The cat is sleeping.", difficulty: "easy" },
  { word: "dog", hindi: "कुत्ता", sentence: "The dog is barking.", difficulty: "easy" },
  { word: "sun", hindi: "सूरज", sentence: "The sun is bright.", difficulty: "easy" },
  { word: "book", hindi: "किताब", sentence: "I read a book.", difficulty: "easy" },
  { word: "tree", hindi: "पेड़", sentence: "The tree is tall.", difficulty: "easy" },
  { word: "fish", hindi: "मछली", sentence: "The fish swims.", difficulty: "easy" },
  { word: "bird", hindi: "पक्षी", sentence: "The bird can fly.", difficulty: "easy" },
  { word: "milk", hindi: "दूध", sentence: "I drink milk.", difficulty: "easy" },
  { word: "ball", hindi: "गेंद", sentence: "The ball is round.", difficulty: "easy" },
  { word: "hand", hindi: "हाथ", sentence: "Wash your hands.", difficulty: "easy" },
  // Medium
  { word: "school", hindi: "स्कूल", sentence: "I go to school.", difficulty: "medium" },
  { word: "friend", hindi: "दोस्त", sentence: "She is my friend.", difficulty: "medium" },
  { word: "water", hindi: "पानी", sentence: "Drink more water.", difficulty: "medium" },
  { word: "mother", hindi: "माँ", sentence: "My mother cooks food.", difficulty: "medium" },
  { word: "father", hindi: "पिता", sentence: "My father works hard.", difficulty: "medium" },
  { word: "garden", hindi: "बगीचा", sentence: "The garden is beautiful.", difficulty: "medium" },
  { word: "flower", hindi: "फूल", sentence: "The flower smells nice.", difficulty: "medium" },
  { word: "teacher", hindi: "शिक्षक", sentence: "The teacher is kind.", difficulty: "medium" },
  { word: "window", hindi: "खिड़की", sentence: "Open the window.", difficulty: "medium" },
  { word: "kitchen", hindi: "रसोई", sentence: "Cook in the kitchen.", difficulty: "medium" },
  // Hard
  { word: "beautiful", hindi: "सुंदर", sentence: "The sunset is beautiful.", difficulty: "hard" },
  { word: "elephant", hindi: "हाथी", sentence: "The elephant is huge.", difficulty: "hard" },
  { word: "butterfly", hindi: "तितली", sentence: "The butterfly is colorful.", difficulty: "hard" },
  { word: "knowledge", hindi: "ज्ञान", sentence: "Knowledge is power.", difficulty: "hard" },
  { word: "important", hindi: "महत्वपूर्ण", sentence: "Education is important.", difficulty: "hard" },
  { word: "different", hindi: "अलग", sentence: "We are all different.", difficulty: "hard" },
  { word: "wonderful", hindi: "अद्भुत", sentence: "It was a wonderful day.", difficulty: "hard" },
  { word: "necessary", hindi: "आवश्यक", sentence: "Water is necessary for life.", difficulty: "hard" },
  { word: "restaurant", hindi: "रेस्तरां", sentence: "We ate at a restaurant.", difficulty: "hard" },
  { word: "environment", hindi: "पर्यावरण", sentence: "Protect the environment.", difficulty: "hard" },
];

export function SpellingBee() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [currentWord, setCurrentWord] = useState<SpellingWord | null>(null);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [wordsAttempted, setWordsAttempted] = useState(0);

  const getNewWord = () => {
    const filtered = spellingWords.filter(w => w.difficulty === difficulty);
    const randomWord = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentWord(randomWord);
    setUserInput("");
    setShowResult(false);
  };

  useEffect(() => {
    getNewWord();
  }, [difficulty]);

  const speakWord = () => {
    if (!currentWord) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = "en-US";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const speakSentence = () => {
    if (!currentWord) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.sentence);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const checkSpelling = () => {
    if (!currentWord) return;
    setShowResult(true);
    setWordsAttempted(wordsAttempted + 1);
    
    if (userInput.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      const points = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
      setScore(score + points);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }
  };

  if (!currentWord) return null;

  const isCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase();

  return (
    <Card className="border-2 border-amber-200 dark:border-amber-800">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <Mic className="h-6 w-6" />
          स्पेलिंग बी (Spelling Bee)
        </CardTitle>
        <p className="text-sm text-amber-600 dark:text-amber-400">
          शब्द सुनें और सही स्पेलिंग लिखें
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <Badge variant="outline">स्ट्रीक: {streak}🔥</Badge>
            <Badge variant="outline">बेस्ट: {bestStreak}⭐</Badge>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex gap-2 justify-center">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <Button
              key={level}
              variant={difficulty === level ? "default" : "outline"}
              size="sm"
              onClick={() => setDifficulty(level)}
              className={difficulty === level ? "bg-amber-600" : ""}
            >
              {level === "easy" ? "आसान (+5)" : level === "medium" ? "मध्यम (+10)" : "कठिन (+15)"}
            </Button>
          ))}
        </div>

        {/* Word Display */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <div className="flex justify-center gap-4 mb-4">
              <Button onClick={speakWord} className="bg-amber-600 hover:bg-amber-700">
                <Volume2 className="h-5 w-5 mr-2" /> शब्द सुनें
              </Button>
              <Button onClick={speakSentence} variant="outline">
                <Volume2 className="h-5 w-5 mr-2" /> वाक्य सुनें
              </Button>
            </div>
            
            <div className="text-orange-600 dark:text-orange-400 font-hindi text-xl">
              हिंदी: {currentWord.hindi}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">स्पेलिंग लिखें:</label>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type the spelling..."
            className="text-center text-xl"
            disabled={showResult}
            onKeyDown={(e) => e.key === 'Enter' && !showResult && checkSpelling()}
            autoFocus
          />
        </div>

        {/* Result */}
        {showResult && (
          <div className={`p-4 rounded-xl border-2 ${
            isCorrect
              ? "bg-green-50 dark:bg-green-900/20 border-green-300"
              : "bg-red-50 dark:bg-red-900/20 border-red-300"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-700">🎉 सही! Correct!</span>
                  {streak >= 3 && <Badge className="bg-yellow-500">{streak} स्ट्रीक!</Badge>}
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-red-700">गलत!</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">सही स्पेलिंग:</span>
              <span className="font-bold text-2xl tracking-widest">{currentWord.word.toUpperCase()}</span>
              <Button variant="ghost" size="sm" onClick={speakWord}>
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">"{currentWord.sentence}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (
            <>
              <Button onClick={speakWord} variant="outline" className="flex-1">
                <Volume2 className="h-4 w-4 mr-2" /> फिर से सुनें
              </Button>
              <Button
                onClick={checkSpelling}
                disabled={!userInput.trim()}
                className="flex-1 bg-amber-600"
              >
                जांचें (Check)
              </Button>
            </>
          ) : (
            <Button onClick={getNewWord} className="w-full bg-amber-600">
              <RotateCcw className="h-4 w-4 mr-2" /> अगला शब्द
            </Button>
          )}
        </div>

        {/* Progress */}
        <div className="text-center text-sm text-muted-foreground">
          {wordsAttempted} शब्दों का प्रयास किया
        </div>
      </CardContent>
    </Card>
  );
}