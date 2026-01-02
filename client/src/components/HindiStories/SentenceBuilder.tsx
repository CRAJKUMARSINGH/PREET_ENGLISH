import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Puzzle, CheckCircle, XCircle, RotateCcw, Lightbulb, Volume2 } from "lucide-react";

interface SentenceExercise {
  id: number;
  hindi: string;
  words: string[];
  correctOrder: number[];
  hint: string;
}

const exercises: SentenceExercise[] = [
  {
    id: 1,
    hindi: "मैं स्कूल जाता हूं।",
    words: ["go", "I", "school", "to"],
    correctOrder: [1, 0, 3, 2],
    hint: "Subject + Verb + Preposition + Place"
  },
  {
    id: 2,
    hindi: "वह किताब पढ़ रही है।",
    words: ["reading", "is", "She", "book", "a"],
    correctOrder: [2, 1, 0, 4, 3],
    hint: "Subject + is + Verb-ing + Article + Object"
  },
  {
    id: 3,
    hindi: "बच्चे बगीचे में खेल रहे हैं।",
    words: ["playing", "garden", "are", "The", "in", "children", "the"],
    correctOrder: [3, 5, 2, 0, 4, 6, 1],
    hint: "Article + Subject + are + Verb-ing + Preposition + Article + Place"
  },
  {
    id: 4,
    hindi: "मेरी माँ खाना बना रही हैं।",
    words: ["cooking", "mother", "is", "My", "food"],
    correctOrder: [3, 1, 2, 0, 4],
    hint: "Possessive + Subject + is + Verb-ing + Object"
  },
  {
    id: 5,
    hindi: "सूरज पूर्व में उगता है।",
    words: ["rises", "east", "sun", "in", "The", "the"],
    correctOrder: [4, 2, 0, 3, 5, 1],
    hint: "Article + Subject + Verb + Preposition + Article + Direction"
  },
  {
    id: 6,
    hindi: "क्या तुम अंग्रेजी बोल सकते हो?",
    words: ["speak", "you", "Can", "English", "?"],
    correctOrder: [2, 1, 0, 3, 4],
    hint: "Modal + Subject + Verb + Language + ?"
  },
  {
    id: 7,
    hindi: "मुझे आम बहुत पसंद है।",
    words: ["mangoes", "like", "very", "I", "much"],
    correctOrder: [3, 1, 0, 2, 4],
    hint: "Subject + Verb + Object + Adverb"
  },
  {
    id: 8,
    hindi: "वह कल दिल्ली जाएगा।",
    words: ["will", "tomorrow", "Delhi", "He", "go", "to"],
    correctOrder: [3, 0, 4, 5, 2, 1],
    hint: "Subject + will + Verb + Preposition + Place + Time"
  }
];

export function SentenceBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const currentExercise = exercises[currentIndex];
  const availableWords = currentExercise.words.filter((_, idx) => !selectedWords.includes(idx));

  const addWord = (wordIndex: number) => {
    if (showResult) return;
    const originalIndex = currentExercise.words.indexOf(currentExercise.words.filter((_, idx) => !selectedWords.includes(idx))[wordIndex]);
    setSelectedWords([...selectedWords, originalIndex]);
  };

  const removeWord = (position: number) => {
    if (showResult) return;
    const newSelected = [...selectedWords];
    newSelected.splice(position, 1);
    setSelectedWords(newSelected);
  };

  const checkAnswer = () => {
    setShowResult(true);
    setTotalAttempts(totalAttempts + 1);
    
    const isCorrect = selectedWords.length === currentExercise.correctOrder.length &&
      selectedWords.every((val, idx) => val === currentExercise.correctOrder[idx]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextExercise = () => {
    setCurrentIndex((currentIndex + 1) % exercises.length);
    setSelectedWords([]);
    setShowResult(false);
    setShowHint(false);
  };

  const resetExercise = () => {
    setSelectedWords([]);
    setShowResult(false);
    setShowHint(false);
  };

  const isCorrect = selectedWords.length === currentExercise.correctOrder.length &&
    selectedWords.every((val, idx) => val === currentExercise.correctOrder[idx]);

  const correctSentence = currentExercise.correctOrder.map(idx => currentExercise.words[idx]).join(" ");

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(correctSentence);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="border-2 border-teal-200 dark:border-teal-800">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
        <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
          <Puzzle className="h-6 w-6" />
          वाक्य बनाओ (Sentence Builder)
        </CardTitle>
        <p className="text-sm text-teal-600 dark:text-teal-400">
          शब्दों को सही क्रम में लगाकर वाक्य बनाएं
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Score Display */}
        <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <span className="text-teal-700 dark:text-teal-300">
            स्कोर: {score}/{totalAttempts}
          </span>
          <Badge variant="outline">
            {currentIndex + 1} / {exercises.length}
          </Badge>
        </div>

        {/* Hindi Sentence */}
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">हिंदी वाक्य:</p>
          <p className="text-xl font-hindi text-orange-700 dark:text-orange-300">{currentExercise.hindi}</p>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-700 dark:text-yellow-300">{currentExercise.hint}</span>
          </div>
        )}

        {/* Selected Words (Sentence Building Area) */}
        <div className="min-h-[80px] p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-teal-300 dark:border-teal-700">
          <p className="text-sm text-muted-foreground mb-2">आपका वाक्य (Your Sentence):</p>
          <div className="flex flex-wrap gap-2">
            {selectedWords.length === 0 ? (
              <span className="text-muted-foreground italic">शब्दों पर क्लिक करें...</span>
            ) : (
              selectedWords.map((wordIdx, position) => (
                <button
                  key={position}
                  onClick={() => removeWord(position)}
                  className="px-3 py-2 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-lg font-medium hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors"
                >
                  {currentExercise.words[wordIdx]}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Words */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-sm text-muted-foreground mb-3">उपलब्ध शब्द (Available Words):</p>
          <div className="flex flex-wrap gap-2">
            {currentExercise.words.map((word, idx) => (
              !selectedWords.includes(idx) && (
                <button
                  key={idx}
                  onClick={() => addWord(currentExercise.words.filter((_, i) => !selectedWords.includes(i)).indexOf(word))}
                  disabled={showResult}
                  className="px-4 py-2 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg font-medium hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all disabled:opacity-50"
                >
                  {word}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Result Display */}
        {showResult && (
          <div className={`p-4 rounded-xl border-2 ${
            isCorrect 
              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700" 
              : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-700 dark:text-green-300">🎉 बिल्कुल सही! Perfect!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-red-700 dark:text-red-300">फिर से कोशिश करें!</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">सही वाक्य:</p>
              <Button variant="ghost" size="sm" onClick={speakSentence}>
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-medium text-lg mt-1">{correctSentence}</p>
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
                संकेत (Hint)
              </Button>
              <Button 
                variant="outline" 
                onClick={resetExercise}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" /> साफ़ करें
              </Button>
              <Button 
                onClick={checkAnswer}
                disabled={selectedWords.length === 0}
                className="flex-1 bg-teal-600"
              >
                जांचें (Check)
              </Button>
            </>
          ) : (
            <Button onClick={nextExercise} className="w-full bg-teal-600">
              अगला वाक्य →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
