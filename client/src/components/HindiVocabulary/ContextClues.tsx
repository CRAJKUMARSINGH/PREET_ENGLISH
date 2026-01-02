import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle, XCircle, RotateCcw, HelpCircle, Trophy } from "lucide-react";

interface ContextQuestion {
  id: number;
  sentence: string;
  sentenceHindi: string;
  targetWord: string;
  targetWordHindi: string;
  options: { word: string; hindi: string; isCorrect: boolean }[];
  hint: string;
  hintHindi: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

const contextQuestions: ContextQuestion[] = [
  {
    id: 1,
    sentence: "The _____ student always completed homework on time and studied hard for exams.",
    sentenceHindi: "_____ छात्र हमेशा समय पर होमवर्क पूरा करता था और परीक्षाओं के लिए कड़ी मेहनत करता था।",
    targetWord: "diligent",
    targetWordHindi: "मेहनती",
    options: [
      { word: "diligent", hindi: "मेहनती", isCorrect: true },
      { word: "lazy", hindi: "आलसी", isCorrect: false },
      { word: "careless", hindi: "लापरवाह", isCorrect: false },
      { word: "forgetful", hindi: "भुलक्कड़", isCorrect: false }
    ],
    hint: "The context shows positive behavior - completing work and studying hard.",
    hintHindi: "संदर्भ सकारात्मक व्यवहार दिखाता है - काम पूरा करना और कड़ी मेहनत करना।",
    difficulty: "easy",
    category: "Character"
  },
  {
    id: 2,
    sentence: "After the long drought, the farmers were _____ when the rain finally came.",
    sentenceHindi: "लंबे सूखे के बाद, जब आखिरकार बारिश हुई तो किसान _____ थे।",
    targetWord: "relieved",
    targetWordHindi: "राहत महसूस",
    options: [
      { word: "relieved", hindi: "राहत महसूस", isCorrect: true },
      { word: "angry", hindi: "गुस्सा", isCorrect: false },
      { word: "confused", hindi: "भ्रमित", isCorrect: false },
      { word: "bored", hindi: "ऊबा हुआ", isCorrect: false }
    ],
    hint: "Rain after drought is a positive event for farmers.",
    hintHindi: "सूखे के बाद बारिश किसानों के लिए सकारात्मक घटना है।",
    difficulty: "easy",
    category: "Emotions"
  },
  {
    id: 3,
    sentence: "The scientist made a _____ discovery that changed our understanding of the universe.",
    sentenceHindi: "वैज्ञानिक ने एक _____ खोज की जिसने ब्रह्मांड की हमारी समझ को बदल दिया।",
    targetWord: "groundbreaking",
    targetWordHindi: "क्रांतिकारी",
    options: [
      { word: "groundbreaking", hindi: "क्रांतिकारी", isCorrect: true },
      { word: "ordinary", hindi: "साधारण", isCorrect: false },
      { word: "minor", hindi: "छोटी", isCorrect: false },
      { word: "boring", hindi: "उबाऊ", isCorrect: false }
    ],
    hint: "Something that 'changed our understanding' must be very significant.",
    hintHindi: "जो चीज़ 'हमारी समझ बदल दे' वह बहुत महत्वपूर्ण होनी चाहिए।",
    difficulty: "medium",
    category: "Quality"
  },
  {
    id: 4,
    sentence: "The _____ child shared all his toys with his friends without being asked.",
    sentenceHindi: "_____ बच्चे ने बिना पूछे अपने सभी खिलौने अपने दोस्तों के साथ साझा किए।",
    targetWord: "generous",
    targetWordHindi: "उदार",
    options: [
      { word: "generous", hindi: "उदार", isCorrect: true },
      { word: "selfish", hindi: "स्वार्थी", isCorrect: false },
      { word: "shy", hindi: "शर्मीला", isCorrect: false },
      { word: "angry", hindi: "गुस्सा", isCorrect: false }
    ],
    hint: "Sharing without being asked shows a giving nature.",
    hintHindi: "बिना पूछे साझा करना देने वाला स्वभाव दिखाता है।",
    difficulty: "easy",
    category: "Character"
  },
  {
    id: 5,
    sentence: "The old castle stood _____ on the hilltop, its towers reaching toward the sky.",
    sentenceHindi: "पुराना महल पहाड़ी की चोटी पर _____ खड़ा था, इसके टावर आसमान की ओर पहुंच रहे थे।",
    targetWord: "majestically",
    targetWordHindi: "शानदार ढंग से",
    options: [
      { word: "majestically", hindi: "शानदार ढंग से", isCorrect: true },
      { word: "quietly", hindi: "चुपचाप", isCorrect: false },
      { word: "sadly", hindi: "दुखी होकर", isCorrect: false },
      { word: "quickly", hindi: "जल्दी से", isCorrect: false }
    ],
    hint: "A castle with towers reaching toward the sky suggests grandeur.",
    hintHindi: "आसमान की ओर पहुंचने वाले टावरों वाला महल भव्यता का सुझाव देता है।",
    difficulty: "medium",
    category: "Description"
  },
  {
    id: 6,
    sentence: "Despite facing many obstacles, she remained _____ and never gave up on her dreams.",
    sentenceHindi: "कई बाधाओं का सामना करने के बावजूद, वह _____ रही और अपने सपनों को कभी नहीं छोड़ा।",
    targetWord: "persistent",
    targetWordHindi: "दृढ़",
    options: [
      { word: "persistent", hindi: "दृढ़", isCorrect: true },
      { word: "weak", hindi: "कमज़ोर", isCorrect: false },
      { word: "uncertain", hindi: "अनिश्चित", isCorrect: false },
      { word: "fearful", hindi: "भयभीत", isCorrect: false }
    ],
    hint: "Never giving up despite obstacles shows determination.",
    hintHindi: "बाधाओं के बावजूद कभी न हारना दृढ़ संकल्प दिखाता है।",
    difficulty: "medium",
    category: "Character"
  },
  {
    id: 7,
    sentence: "The _____ weather forced everyone to stay indoors with heavy rain and strong winds.",
    sentenceHindi: "_____ मौसम ने भारी बारिश और तेज़ हवाओं के साथ सभी को घर के अंदर रहने पर मजबूर कर दिया।",
    targetWord: "inclement",
    targetWordHindi: "खराब",
    options: [
      { word: "inclement", hindi: "खराब", isCorrect: true },
      { word: "pleasant", hindi: "सुहावना", isCorrect: false },
      { word: "mild", hindi: "हल्का", isCorrect: false },
      { word: "sunny", hindi: "धूप वाला", isCorrect: false }
    ],
    hint: "Heavy rain and strong winds describe bad weather conditions.",
    hintHindi: "भारी बारिश और तेज़ हवाएं खराब मौसम की स्थिति का वर्णन करती हैं।",
    difficulty: "hard",
    category: "Weather"
  },
  {
    id: 8,
    sentence: "The speaker's _____ words moved the audience to tears.",
    sentenceHindi: "वक्ता के _____ शब्दों ने दर्शकों को आंसुओं में बहा दिया।",
    targetWord: "eloquent",
    targetWordHindi: "वाक्पटु",
    options: [
      { word: "eloquent", hindi: "वाक्पटु", isCorrect: true },
      { word: "boring", hindi: "उबाऊ", isCorrect: false },
      { word: "confusing", hindi: "भ्रमित करने वाले", isCorrect: false },
      { word: "simple", hindi: "सरल", isCorrect: false }
    ],
    hint: "Words that move people to tears must be very powerful and expressive.",
    hintHindi: "जो शब्द लोगों को आंसुओं में बहा दें वे बहुत शक्तिशाली और अभिव्यंजक होने चाहिए।",
    difficulty: "hard",
    category: "Communication"
  }
];

export function ContextClues() {
  const [currentQuestion, setCurrentQuestion] = useState<ContextQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [streak, setStreak] = useState(0);

  const getRandomQuestion = () => {
    const filtered = difficulty === "all" 
      ? contextQuestions 
      : contextQuestions.filter(q => q.difficulty === difficulty);
    if (filtered.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentQuestion(filtered[randomIndex]);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
  };

  useEffect(() => {
    getRandomQuestion();
  }, [difficulty]);

  const handleAnswerSelect = (word: string) => {
    if (showResult) return;
    setSelectedAnswer(word);
  };

  const checkAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);
    
    const isCorrect = currentQuestion.options.find(o => o.word === selectedAnswer)?.isCorrect;
    if (isCorrect) {
      setScore(score + (showHint ? 5 : 10));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  if (!currentQuestion) return null;

  const isCorrect = currentQuestion.options.find(o => o.word === selectedAnswer)?.isCorrect;

  return (
    <Card className="border-2 border-amber-200 dark:border-amber-800">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <Lightbulb className="h-6 w-6" />
          संदर्भ सुराग (Context Clues)
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            वाक्य के संदर्भ से सही शब्द चुनें
          </p>
          <div className="flex gap-2">
            <Badge variant="outline">स्कोर: {score}</Badge>
            {streak >= 3 && (
              <Badge className="bg-orange-500">
                <Trophy className="h-3 w-3 mr-1" /> {streak} स्ट्रीक!
              </Badge>
            )}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
              className="px-2 py-1 text-xs border rounded bg-background"
            >
              <option value="all">सभी</option>
              <option value="easy">आसान</option>
              <option value="medium">मध्यम</option>
              <option value="hard">कठिन</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Question */}
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge>{currentQuestion.category}</Badge>
              <Badge variant="outline">
                {currentQuestion.difficulty === "easy" ? "आसान" : 
                 currentQuestion.difficulty === "medium" ? "मध्यम" : "कठिन"}
              </Badge>
            </div>
            <p className="text-lg font-medium mb-2">{currentQuestion.sentence}</p>
            <p className="text-amber-700 dark:text-amber-300 font-hindi">
              {currentQuestion.sentenceHindi}
            </p>
          </div>

          {/* Hint */}
          {!showResult && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHint(!showHint)}
              className="w-full"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {showHint ? "संकेत छुपाएं" : "संकेत दिखाएं"} (5 अंक कम)
            </Button>
          )}

          {showHint && !showResult && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 {currentQuestion.hint}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-hindi mt-1">
                {currentQuestion.hintHindi}
              </p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.word;
            const showCorrect = showResult && option.isCorrect;
            const showIncorrect = showResult && isSelected && !option.isCorrect;
            
            return (
              <button
                key={option.word}
                onClick={() => handleAnswerSelect(option.word)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  showCorrect 
                    ? "bg-green-100 border-green-500 dark:bg-green-900/30" 
                    : showIncorrect 
                    ? "bg-red-100 border-red-500 dark:bg-red-900/30"
                    : isSelected 
                    ? "bg-amber-100 border-amber-500 dark:bg-amber-900/30"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{option.word}</div>
                    <div className="text-sm text-muted-foreground font-hindi">{option.hindi}</div>
                  </div>
                  {showResult && (
                    <>
                      {showCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                    </>
                  )}
                </div>
              </button>
            );
          })}
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
                  <span className="font-bold text-green-700">🎉 सही उत्तर!</span>
                  <Badge className="bg-green-500">+{showHint ? 5 : 10} अंक</Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-bold text-red-700">
                    सही उत्तर: {currentQuestion.targetWord} ({currentQuestion.targetWordHindi})
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.hint}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (
            <Button onClick={checkAnswer} disabled={!selectedAnswer} className="w-full">
              जांचें
            </Button>
          ) : (
            <Button onClick={getRandomQuestion} className="w-full">
              <RotateCcw className="h-4 w-4 mr-1" /> अगला प्रश्न
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>कुल प्रश्न: {totalQuestions}</span>
          <span>सही: {Math.round((score / Math.max(totalQuestions * 10, 1)) * 100)}%</span>
        </div>
      </CardContent>
    </Card>
  );
}