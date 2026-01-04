import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Network, CheckCircle, RotateCcw, Lightbulb, Timer } from "lucide-react";

interface AssociationSet {
  id: number;
  centerWord: { english: string; hindi: string };
  associations: {
    word: string;
    hindi: string;
    relation: string;
    relationHindi: string;
  }[];
  category: string;
}

const associationSets: AssociationSet[] = [
  {
    id: 1,
    centerWord: { english: "School", hindi: "स्कूल" },
    associations: [
      { word: "Teacher", hindi: "शिक्षक", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Student", hindi: "छात्र", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Book", hindi: "किताब", relation: "Object", relationHindi: "वस्तु" },
      { word: "Classroom", hindi: "कक्षा", relation: "Place", relationHindi: "स्थान" },
      { word: "Learn", hindi: "सीखना", relation: "Action", relationHindi: "क्रिया" },
      { word: "Education", hindi: "शिक्षा", relation: "Concept", relationHindi: "अवधारणा" }
    ],
    category: "Education"
  },
  {
    id: 2,
    centerWord: { english: "Kitchen", hindi: "रसोई" },
    associations: [
      { word: "Cook", hindi: "रसोइया", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Stove", hindi: "चूल्हा", relation: "Object", relationHindi: "वस्तु" },
      { word: "Food", hindi: "खाना", relation: "Object", relationHindi: "वस्तु" },
      { word: "Cooking", hindi: "खाना बनाना", relation: "Action", relationHindi: "क्रिया" },
      { word: "Recipe", hindi: "नुस्खा", relation: "Concept", relationHindi: "अवधारणा" },
      { word: "Delicious", hindi: "स्वादिष्ट", relation: "Quality", relationHindi: "गुण" }
    ],
    category: "Home"
  },
  {
    id: 3,
    centerWord: { english: "Hospital", hindi: "अस्पताल" },
    associations: [
      { word: "Doctor", hindi: "डॉक्टर", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Nurse", hindi: "नर्स", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Medicine", hindi: "दवा", relation: "Object", relationHindi: "वस्तु" },
      { word: "Patient", hindi: "मरीज़", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Treatment", hindi: "इलाज", relation: "Action", relationHindi: "क्रिया" },
      { word: "Health", hindi: "स्वास्थ्य", relation: "Concept", relationHindi: "अवधारणा" }
    ],
    category: "Health"
  },
  {
    id: 4,
    centerWord: { english: "Garden", hindi: "बगीचा" },
    associations: [
      { word: "Gardener", hindi: "माली", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Flowers", hindi: "फूल", relation: "Object", relationHindi: "वस्तु" },
      { word: "Trees", hindi: "पेड़", relation: "Object", relationHindi: "वस्तु" },
      { word: "Watering", hindi: "पानी देना", relation: "Action", relationHindi: "क्रिया" },
      { word: "Beautiful", hindi: "सुंदर", relation: "Quality", relationHindi: "गुण" },
      { word: "Nature", hindi: "प्रकृति", relation: "Concept", relationHindi: "अवधारणा" }
    ],
    category: "Nature"
  },
  {
    id: 5,
    centerWord: { english: "Market", hindi: "बाज़ार" },
    associations: [
      { word: "Shopkeeper", hindi: "दुकानदार", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Customer", hindi: "ग्राहक", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Goods", hindi: "सामान", relation: "Object", relationHindi: "वस्तु" },
      { word: "Buying", hindi: "खरीदना", relation: "Action", relationHindi: "क्रिया" },
      { word: "Money", hindi: "पैसा", relation: "Object", relationHindi: "वस्तु" },
      { word: "Busy", hindi: "व्यस्त", relation: "Quality", relationHindi: "गुण" }
    ],
    category: "Commerce"
  },
  {
    id: 6,
    centerWord: { english: "Office", hindi: "कार्यालय" },
    associations: [
      { word: "Manager", hindi: "प्रबंधक", relation: "Person", relationHindi: "व्यक्ति" },
      { word: "Computer", hindi: "कंप्यूटर", relation: "Object", relationHindi: "वस्तु" },
      { word: "Meeting", hindi: "बैठक", relation: "Action", relationHindi: "क्रिया" },
      { word: "Desk", hindi: "मेज़", relation: "Object", relationHindi: "वस्तु" },
      { word: "Work", hindi: "काम", relation: "Concept", relationHindi: "अवधारणा" },
      { word: "Professional", hindi: "पेशेवर", relation: "Quality", relationHindi: "गुण" }
    ],
    category: "Work"
  }
];

export function WordAssociation() {
  const [currentSet, setCurrentSet] = useState<AssociationSet | null>(null);
  const [revealedWords, setRevealedWords] = useState<number[]>([]);
  const [gameMode, setGameMode] = useState<"learn" | "quiz">("learn");
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);

  const getRandomSet = () => {
    const randomIndex = Math.floor(Math.random() * associationSets.length);
    setCurrentSet(associationSets[randomIndex]);
    setRevealedWords([]);
    setUserGuesses([]);
    setCurrentGuess("");
    if (gameMode === "quiz") {
      setTimeLeft(60);
      setGameActive(true);
    }
  };

  useEffect(() => {
    getRandomSet();
  }, [gameMode]);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  const revealWord = (index: number) => {
    if (!revealedWords.includes(index)) {
      setRevealedWords([...revealedWords, index]);
    }
  };

  const submitGuess = () => {
    if (!currentSet || !currentGuess.trim()) return;
    
    const guess = currentGuess.trim().toLowerCase();
    const isCorrect = currentSet.associations.some(assoc => 
      assoc.word.toLowerCase() === guess || assoc.hindi.toLowerCase() === guess
    );
    
    if (isCorrect && !userGuesses.includes(guess)) {
      setUserGuesses([...userGuesses, guess]);
      setScore(score + 10);
    }
    
    setCurrentGuess("");
  };

  const getRelationColor = (relation: string) => {
    switch (relation) {
      case "Person": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "Object": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Action": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "Quality": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "Concept": return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";
      case "Place": return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  if (!currentSet) return null;

  return (
    <Card className="border-2 border-cyan-200 dark:border-cyan-800">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
        <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
          <Network className="h-6 w-6" />
          शब्द संबंध (Word Association)
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-cyan-600 dark:text-cyan-400">
            केंद्रीय शब्द से जुड़े शब्द खोजें
          </p>
          <div className="flex gap-2">
            <Button
              variant={gameMode === "learn" ? "default" : "outline"}
              size="sm"
              onClick={() => setGameMode("learn")}
            >
              सीखें
            </Button>
            <Button
              variant={gameMode === "quiz" ? "default" : "outline"}
              size="sm"
              onClick={() => setGameMode("quiz")}
            >
              क्विज़
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Game Stats */}
        {gameMode === "quiz" && (
          <div className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <Badge variant={timeLeft <= 10 ? "destructive" : "outline"}>
              <Timer className="h-4 w-4 mr-1" /> {timeLeft}s
            </Badge>
            <Badge variant="outline">{userGuesses.length}/6 मिले</Badge>
          </div>
        )}

        {/* Center Word */}
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full border-4 border-cyan-300 dark:border-cyan-700">
            <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
              {currentSet.centerWord.english}
            </div>
            <div className="text-lg text-cyan-600 dark:text-cyan-400 font-hindi">
              {currentSet.centerWord.hindi}
            </div>
          </div>
          <Badge className="mt-2">{currentSet.category}</Badge>
        </div>

        {/* Quiz Input */}
        {gameMode === "quiz" && gameActive && (
          <div className="flex gap-2">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              placeholder="संबंधित शब्द लिखें..."
              className="flex-1 px-3 py-2 border rounded-lg bg-background"
              onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
            />
            <Button onClick={submitGuess} disabled={!currentGuess.trim()}>
              जमा करें
            </Button>
          </div>
        )}

        {/* Association Web */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentSet.associations.map((assoc, index) => {
            const isRevealed = gameMode === "learn" || revealedWords.includes(index);
            const isGuessed = userGuesses.some(guess => 
              guess.toLowerCase() === assoc.word.toLowerCase() || 
              guess.toLowerCase() === assoc.hindi.toLowerCase()
            );
            
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isRevealed || isGuessed
                    ? "border-cyan-300 bg-white dark:bg-slate-800"
                    : "border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800"
                }`}
                onClick={() => gameMode === "learn" && revealWord(index)}
              >
                {isRevealed || isGuessed ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getRelationColor(assoc.relation)}>
                        {assoc.relationHindi}
                      </Badge>
                      {isGuessed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="font-bold text-lg">{assoc.word}</div>
                    <div className="text-cyan-600 dark:text-cyan-400 font-hindi">{assoc.hindi}</div>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-2xl mb-2">?</div>
                    <div className="text-sm">क्लिक करें</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Game Over */}
        {gameMode === "quiz" && !gameActive && timeLeft === 0 && (
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="text-xl font-bold mb-2">समय समाप्त!</h3>
            <p className="text-lg mb-2">आपका स्कोर: {score}</p>
            <p className="text-sm text-muted-foreground mb-4">
              आपने {userGuesses.length}/6 शब्द सही अनुमान लगाए
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {gameMode === "learn" && (
            <>
              <Button 
                onClick={() => setRevealedWords(currentSet.associations.map((_, i) => i))} 
                variant="outline" 
                className="flex-1"
              >
                <Lightbulb className="h-4 w-4 mr-1" /> सभी दिखाएं
              </Button>
              <Button onClick={getRandomSet} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-1" /> नया सेट
              </Button>
            </>
          )}
          {gameMode === "quiz" && (
            <Button onClick={getRandomSet} className="w-full">
              <RotateCcw className="h-4 w-4 mr-1" /> {gameActive ? "नया खेल" : "फिर से खेलें"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default WordAssociation;