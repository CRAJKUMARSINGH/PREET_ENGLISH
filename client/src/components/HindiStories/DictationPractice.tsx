import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Volume2, CheckCircle, XCircle, RotateCcw, Pencil } from "lucide-react";

interface DictationSentence {
  id: number;
  english: string;
  hindi: string;
  level: "easy" | "medium" | "hard";
  hints: string[];
}

const sentences: DictationSentence[] = [
  {
    id: 1,
    english: "The sun rises in the east.",
    hindi: "सूरज पूर्व में उगता है।",
    level: "easy",
    hints: ["sun", "rises", "east"]
  },
  {
    id: 2,
    english: "I go to school every day.",
    hindi: "मैं हर दिन स्कूल जाता हूं।",
    level: "easy",
    hints: ["go", "school", "every"]
  },
  {
    id: 3,
    english: "My mother cooks delicious food.",
    hindi: "मेरी माँ स्वादिष्ट खाना बनाती हैं।",
    level: "easy",
    hints: ["mother", "cooks", "delicious"]
  },
  {
    id: 4,
    english: "The children are playing in the garden.",
    hindi: "बच्चे बगीचे में खेल रहे हैं।",
    level: "medium",
    hints: ["children", "playing", "garden"]
  },
  {
    id: 5,
    english: "She reads books in the library.",
    hindi: "वह पुस्तकालय में किताबें पढ़ती है।",
    level: "medium",
    hints: ["reads", "books", "library"]
  },
  {
    id: 6,
    english: "The farmer works hard in his field.",
    hindi: "किसान अपने खेत में कड़ी मेहनत करता है।",
    level: "medium",
    hints: ["farmer", "works", "field"]
  },
  {
    id: 7,
    english: "Knowledge is more valuable than wealth.",
    hindi: "ज्ञान धन से अधिक मूल्यवान है।",
    level: "hard",
    hints: ["knowledge", "valuable", "wealth"]
  },
  {
    id: 8,
    english: "Practice makes a man perfect.",
    hindi: "अभ्यास मनुष्य को पूर्ण बनाता है।",
    level: "hard",
    hints: ["practice", "makes", "perfect"]
  }
];

export function DictationPractice() {
  const [currentLevel, setCurrentLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const filteredSentences = sentences.filter(s => s.level === currentLevel);
  const currentSentence = filteredSentences[currentIndex];

  const speakSentence = (speed: number = 0.8) => {
    const utterance = new SpeechSynthesisUtterance(currentSentence.english);
    utterance.lang = "en-US";
    utterance.rate = speed;
    speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    setShowResult(true);
    setAttempts(attempts + 1);
    
    const normalizedInput = userInput.trim().toLowerCase().replace(/[.,!?]/g, "");
    const normalizedAnswer = currentSentence.english.toLowerCase().replace(/[.,!?]/g, "");
    
    if (normalizedInput === normalizedAnswer) {
      setScore(score + 1);
    }
  };

  const nextSentence = () => {
    if (currentIndex < filteredSentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setUserInput("");
    setShowResult(false);
    setShowHint(false);
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setUserInput("");
    setShowResult(false);
    setShowHint(false);
    setScore(0);
    setAttempts(0);
  };

  const isCorrect = userInput.trim().toLowerCase().replace(/[.,!?]/g, "") === 
                   currentSentence.english.toLowerCase().replace(/[.,!?]/g, "");

  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <Pencil className="h-6 w-6" />
          श्रुतलेख अभ्यास (Dictation Practice)
        </CardTitle>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          सुनें और लिखें - Listening & Writing Practice
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Level Selection */}
        <div className="flex gap-2 justify-center">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <Button
              key={level}
              variant={currentLevel === level ? "default" : "outline"}
              onClick={() => {
                setCurrentLevel(level);
                setCurrentIndex(0);
                resetPractice();
              }}
              className={currentLevel === level ? "bg-purple-600" : ""}
            >
              {level === "easy" ? "आसान" : level === "medium" ? "मध्यम" : "कठिन"}
            </Button>
          ))}
        </div>

        {/* Score Display */}
        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <span className="text-purple-700 dark:text-purple-300">
            स्कोर: {score}/{attempts}
          </span>
          <Badge variant="outline">
            {currentIndex + 1} / {filteredSentences.length}
          </Badge>
        </div>

        {/* Audio Controls */}
        <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl border">
          <Headphones className="h-12 w-12 text-purple-500" />
          <p className="text-center text-muted-foreground">
            वाक्य सुनने के लिए बटन दबाएं
          </p>
          <div className="flex gap-3">
            <Button onClick={() => speakSentence(0.6)} variant="outline">
              <Volume2 className="h-4 w-4 mr-2" /> धीमा (Slow)
            </Button>
            <Button onClick={() => speakSentence(0.8)} className="bg-purple-600">
              <Volume2 className="h-4 w-4 mr-2" /> सामान्य (Normal)
            </Button>
            <Button onClick={() => speakSentence(1)} variant="outline">
              <Volume2 className="h-4 w-4 mr-2" /> तेज़ (Fast)
            </Button>
          </div>
        </div>

        {/* Hindi Translation Hint */}
        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">हिंदी अर्थ:</p>
          <p className="font-hindi text-orange-700 dark:text-orange-300">{currentSentence.hindi}</p>
        </div>

        {/* Word Hints */}
        {showHint && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-600 dark:text-green-400 mb-2">मुख्य शब्द (Key Words):</p>
            <div className="flex gap-2 flex-wrap">
              {currentSentence.hints.map((hint, idx) => (
                <Badge key={idx} variant="secondary" className="bg-green-100 dark:bg-green-800">
                  {hint}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium">यहाँ लिखें (Write here):</label>
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type what you hear..."
            className="min-h-[100px] text-lg"
            disabled={showResult}
          />
        </div>

        {/* Result Display */}
        {showResult && (
          <div className={`p-4 rounded-xl border-2 ${
            isCorrect 
              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700" 
              : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-700 dark:text-green-300">सही! Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-red-700 dark:text-red-300">गलत! Try Again!</span>
                </>
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">सही उत्तर (Correct Answer):</p>
              <p className="font-medium text-lg">{currentSentence.english}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="flex-1"
              >
                संकेत दिखाएं (Show Hint)
              </Button>
              <Button 
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className="flex-1 bg-purple-600"
              >
                जांचें (Check)
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={resetPractice} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" /> फिर से शुरू
              </Button>
              <Button onClick={nextSentence} className="flex-1 bg-purple-600">
                अगला वाक्य →
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


export default DictationPractice;