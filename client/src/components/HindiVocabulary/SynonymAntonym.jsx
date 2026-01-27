var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, CheckCircle, XCircle, RotateCcw, Volume2 } from "lucide-react";
var wordPairs = [
    {
        id: 1,
        word: "Happy",
        hindi: "खुश",
        synonyms: [
            { word: "Joyful", hindi: "आनंदित" },
            { word: "Cheerful", hindi: "प्रसन्न" },
            { word: "Glad", hindi: "खुशी" },
            { word: "Delighted", hindi: "प्रसन्न" }
        ],
        antonyms: [
            { word: "Sad", hindi: "दुखी" },
            { word: "Unhappy", hindi: "नाखुश" },
            { word: "Miserable", hindi: "दुखी" },
            { word: "Depressed", hindi: "उदास" }
        ],
        difficulty: "easy",
        category: "Emotions"
    },
    {
        id: 2,
        word: "Big",
        hindi: "बड़ा",
        synonyms: [
            { word: "Large", hindi: "बड़ा" },
            { word: "Huge", hindi: "विशाल" },
            { word: "Giant", hindi: "दानव" },
            { word: "Enormous", hindi: "विशाल" }
        ],
        antonyms: [
            { word: "Small", hindi: "छोटा" },
            { word: "Tiny", hindi: "नन्हा" },
            { word: "Little", hindi: "छोटा" },
            { word: "Miniature", hindi: "लघु" }
        ],
        difficulty: "easy",
        category: "Size"
    },
    {
        id: 3,
        word: "Intelligent",
        hindi: "बुद्धिमान",
        synonyms: [
            { word: "Smart", hindi: "चतुर" },
            { word: "Clever", hindi: "होशियार" },
            { word: "Brilliant", hindi: "प्रतिभाशाली" },
            { word: "Wise", hindi: "बुद्धिमान" }
        ],
        antonyms: [
            { word: "Stupid", hindi: "मूर्ख" },
            { word: "Foolish", hindi: "बेवकूफ" },
            { word: "Ignorant", hindi: "अज्ञानी" },
            { word: "Dull", hindi: "मंद" }
        ],
        difficulty: "medium",
        category: "Intelligence"
    },
    {
        id: 4,
        word: "Beautiful",
        hindi: "सुंदर",
        synonyms: [
            { word: "Pretty", hindi: "सुंदर" },
            { word: "Gorgeous", hindi: "खूबसूरत" },
            { word: "Lovely", hindi: "प्यारा" },
            { word: "Attractive", hindi: "आकर्षक" }
        ],
        antonyms: [
            { word: "Ugly", hindi: "बदसूरत" },
            { word: "Hideous", hindi: "भयानक" },
            { word: "Unattractive", hindi: "अनाकर्षक" },
            { word: "Plain", hindi: "सादा" }
        ],
        difficulty: "easy",
        category: "Appearance"
    },
    {
        id: 5,
        word: "Courageous",
        hindi: "साहसी",
        synonyms: [
            { word: "Brave", hindi: "बहादुर" },
            { word: "Bold", hindi: "निडर" },
            { word: "Fearless", hindi: "निर्भय" },
            { word: "Heroic", hindi: "वीर" }
        ],
        antonyms: [
            { word: "Cowardly", hindi: "कायर" },
            { word: "Timid", hindi: "डरपोक" },
            { word: "Fearful", hindi: "भयभीत" },
            { word: "Scared", hindi: "डरा हुआ" }
        ],
        difficulty: "medium",
        category: "Character"
    },
    {
        id: 6,
        word: "Abundant",
        hindi: "प्रचुर",
        synonyms: [
            { word: "Plentiful", hindi: "भरपूर" },
            { word: "Ample", hindi: "पर्याप्त" },
            { word: "Copious", hindi: "बहुत" },
            { word: "Profuse", hindi: "अत्यधिक" }
        ],
        antonyms: [
            { word: "Scarce", hindi: "दुर्लभ" },
            { word: "Rare", hindi: "विरल" },
            { word: "Limited", hindi: "सीमित" },
            { word: "Insufficient", hindi: "अपर्याप्त" }
        ],
        difficulty: "hard",
        category: "Quantity"
    },
    {
        id: 7,
        word: "Diligent",
        hindi: "मेहनती",
        synonyms: [
            { word: "Hardworking", hindi: "परिश्रमी" },
            { word: "Industrious", hindi: "उद्यमी" },
            { word: "Dedicated", hindi: "समर्पित" },
            { word: "Persistent", hindi: "दृढ़" }
        ],
        antonyms: [
            { word: "Lazy", hindi: "आलसी" },
            { word: "Idle", hindi: "निष्क्रिय" },
            { word: "Negligent", hindi: "लापरवाह" },
            { word: "Careless", hindi: "असावधान" }
        ],
        difficulty: "medium",
        category: "Character"
    },
    {
        id: 8,
        word: "Tranquil",
        hindi: "शांत",
        synonyms: [
            { word: "Peaceful", hindi: "शांतिपूर्ण" },
            { word: "Calm", hindi: "शांत" },
            { word: "Serene", hindi: "निर्मल" },
            { word: "Quiet", hindi: "चुप" }
        ],
        antonyms: [
            { word: "Chaotic", hindi: "अराजक" },
            { word: "Turbulent", hindi: "अशांत" },
            { word: "Noisy", hindi: "शोर" },
            { word: "Agitated", hindi: "उत्तेजित" }
        ],
        difficulty: "hard",
        category: "State"
    }
];
export function SynonymAntonym() {
    var _a = useState(null), currentWord = _a[0], setCurrentWord = _a[1];
    var _b = useState("synonym"), gameMode = _b[0], setGameMode = _b[1];
    var _c = useState([]), selectedOptions = _c[0], setSelectedOptions = _c[1];
    var _d = useState(false), showResult = _d[0], setShowResult = _d[1];
    var _e = useState(0), score = _e[0], setScore = _e[1];
    var _f = useState(0), totalQuestions = _f[0], setTotalQuestions = _f[1];
    var _g = useState("all"), difficulty = _g[0], setDifficulty = _g[1];
    var _h = useState([]), allOptions = _h[0], setAllOptions = _h[1];
    var getRandomWord = function () {
        var filtered = difficulty === "all" ? wordPairs : wordPairs.filter(function (w) { return w.difficulty === difficulty; });
        if (filtered.length === 0)
            return;
        var randomIndex = Math.floor(Math.random() * filtered.length);
        var word = filtered[randomIndex];
        setCurrentWord(word);
        setSelectedOptions([]);
        setShowResult(false);
        setGameMode(Math.random() > 0.5 ? "synonym" : "antonym");
        // Generate options
        var correctOptions = Math.random() > 0.5 ? word.synonyms : word.antonyms;
        var incorrectOptions = Math.random() > 0.5 ? word.antonyms : word.synonyms;
        var selectedCorrect = correctOptions.slice(0, 3);
        var selectedIncorrect = incorrectOptions.slice(0, 3);
        var options = __spreadArray(__spreadArray([], selectedCorrect, true), selectedIncorrect, true).map(function (opt) { return opt.word; })
            .sort(function () { return Math.random() - 0.5; });
        setAllOptions(options);
    };
    useEffect(function () {
        getRandomWord();
    }, [difficulty]);
    var speakWord = function (text) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var handleOptionClick = function (option) {
        if (showResult)
            return;
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(function (opt) { return opt !== option; }));
        }
        else {
            setSelectedOptions(__spreadArray(__spreadArray([], selectedOptions, true), [option], false));
        }
    };
    var checkAnswers = function () {
        if (!currentWord)
            return;
        setShowResult(true);
        setTotalQuestions(totalQuestions + 1);
        var correctWords = gameMode === "synonym"
            ? currentWord.synonyms.map(function (s) { return s.word; })
            : currentWord.antonyms.map(function (a) { return a.word; });
        var correctCount = selectedOptions.filter(function (opt) { return correctWords.includes(opt); }).length;
        var incorrectCount = selectedOptions.filter(function (opt) { return !correctWords.includes(opt); }).length;
        var questionScore = Math.max(0, (correctCount * 2) - incorrectCount);
        setScore(score + questionScore);
    };
    var getOptionStatus = function (option) {
        if (!currentWord || !showResult)
            return "default";
        var correctWords = gameMode === "synonym"
            ? currentWord.synonyms.map(function (s) { return s.word; })
            : currentWord.antonyms.map(function (a) { return a.word; });
        var isCorrect = correctWords.includes(option);
        var isSelected = selectedOptions.includes(option);
        if (isSelected && isCorrect)
            return "correct";
        if (isSelected && !isCorrect)
            return "incorrect";
        if (!isSelected && isCorrect)
            return "missed";
        return "default";
    };
    var getOptionClass = function (status) {
        switch (status) {
            case "correct": return "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30";
            case "incorrect": return "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30";
            case "missed": return "bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30";
            default: return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400";
        }
    };
    if (!currentWord)
        return null;
    return (<Card className="border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <ArrowUpDown className="h-6 w-6"/>
          समानार्थी और विपरीतार्थी (Synonyms & Antonyms)
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-purple-600 dark:text-purple-400">
            {gameMode === "synonym" ? "समानार्थी शब्द चुनें" : "विपरीतार्थी शब्द चुनें"}
          </p>
          <div className="flex gap-2">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <select value={difficulty} onChange={function (e) { return setDifficulty(e.target.value); }} className="px-2 py-1 text-xs border rounded bg-background">
              <option value="all">सभी</option>
              <option value="easy">आसान</option>
              <option value="medium">मध्यम</option>
              <option value="hard">कठिन</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Target Word */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                {currentWord.word}
              </div>
              <Button onClick={function () { return speakWord(currentWord.word); }} size="sm" variant="ghost">
                <Volume2 className="h-4 w-4"/>
              </Button>
            </div>
            <div className="text-lg text-purple-600 dark:text-purple-400 font-hindi mb-2">
              {currentWord.hindi}
            </div>
            <div className="flex justify-center gap-2">
              <Badge>{currentWord.category}</Badge>
              <Badge variant="outline">
                {currentWord.difficulty === "easy" ? "आसान" :
            currentWord.difficulty === "medium" ? "मध्यम" : "कठिन"}
              </Badge>
            </div>
          </div>
          
          <div className={"p-3 rounded-lg ".concat(gameMode === "synonym"
            ? "bg-green-100 dark:bg-green-900/20"
            : "bg-red-100 dark:bg-red-900/20")}>
            <span className={"font-bold ".concat(gameMode === "synonym"
            ? "text-green-700 dark:text-green-300"
            : "text-red-700 dark:text-red-300")}>
              {gameMode === "synonym"
            ? "✓ समानार्थी शब्द चुनें (Select Synonyms)"
            : "✗ विपरीतार्थी शब्द चुनें (Select Antonyms)"}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {allOptions.map(function (option) {
            var status = getOptionStatus(option);
            var isSelected = selectedOptions.includes(option);
            return (<button key={option} onClick={function () { return handleOptionClick(option); }} disabled={showResult} className={"p-3 rounded-xl border-2 font-medium transition-all ".concat(isSelected && !showResult ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30" : "", " ").concat(getOptionClass(status))}>
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (<>
                      {status === "correct" && <CheckCircle className="h-4 w-4"/>}
                      {status === "incorrect" && <XCircle className="h-4 w-4"/>}
                      {status === "missed" && <span className="text-xs">छूटा</span>}
                    </>)}
                </div>
              </button>);
        })}
        </div>

        {/* Result */}
        {showResult && (<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">सही उत्तर:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-600">समानार्थी:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {currentWord.synonyms.map(function (syn, idx) { return (<Badge key={idx} className="bg-green-100 text-green-700">
                      {syn.word} ({syn.hindi})
                    </Badge>); })}
                </div>
              </div>
              <div>
                <span className="font-medium text-red-600">विपरीतार्थी:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {currentWord.antonyms.map(function (ant, idx) { return (<Badge key={idx} className="bg-red-100 text-red-700">
                      {ant.word} ({ant.hindi})
                    </Badge>); })}
                </div>
              </div>
            </div>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (<Button onClick={checkAnswers} disabled={selectedOptions.length === 0} className="w-full">
              जांचें
            </Button>) : (<Button onClick={getRandomWord} className="w-full">
              <RotateCcw className="h-4 w-4 mr-1"/> अगला शब्द
            </Button>)}
        </div>
      </CardContent>
    </Card>);
}
{ /* हिंदी सहायता / Hindi Support */ }
{ /* यह घटक हिंदी भाषी उपयोगकर्ताओं के लिए डिज़ाइन किया गया है */ }
{ /* This component is designed for Hindi-speaking users */ }
export default SynonymAntonym;
