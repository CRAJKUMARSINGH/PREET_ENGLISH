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
import { Network, CheckCircle, RotateCcw, Lightbulb, Timer } from "lucide-react";
var associationSets = [
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
    var _a = useState(null), currentSet = _a[0], setCurrentSet = _a[1];
    var _b = useState([]), revealedWords = _b[0], setRevealedWords = _b[1];
    var _c = useState("learn"), gameMode = _c[0], setGameMode = _c[1];
    var _d = useState([]), userGuesses = _d[0], setUserGuesses = _d[1];
    var _e = useState(""), currentGuess = _e[0], setCurrentGuess = _e[1];
    var _f = useState(0), score = _f[0], setScore = _f[1];
    var _g = useState(60), timeLeft = _g[0], setTimeLeft = _g[1];
    var _h = useState(false), gameActive = _h[0], setGameActive = _h[1];
    var getRandomSet = function () {
        var randomIndex = Math.floor(Math.random() * associationSets.length);
        setCurrentSet(associationSets[randomIndex]);
        setRevealedWords([]);
        setUserGuesses([]);
        setCurrentGuess("");
        if (gameMode === "quiz") {
            setTimeLeft(60);
            setGameActive(true);
        }
    };
    useEffect(function () {
        getRandomSet();
    }, [gameMode]);
    useEffect(function () {
        if (gameActive && timeLeft > 0) {
            var timer_1 = setTimeout(function () { return setTimeLeft(timeLeft - 1); }, 1000);
            return function () { return clearTimeout(timer_1); };
        }
        else if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [gameActive, timeLeft]);
    var revealWord = function (index) {
        if (!revealedWords.includes(index)) {
            setRevealedWords(__spreadArray(__spreadArray([], revealedWords, true), [index], false));
        }
    };
    var submitGuess = function () {
        if (!currentSet || !currentGuess.trim())
            return;
        var guess = currentGuess.trim().toLowerCase();
        var isCorrect = currentSet.associations.some(function (assoc) {
            return assoc.word.toLowerCase() === guess || assoc.hindi.toLowerCase() === guess;
        });
        if (isCorrect && !userGuesses.includes(guess)) {
            setUserGuesses(__spreadArray(__spreadArray([], userGuesses, true), [guess], false));
            setScore(score + 10);
        }
        setCurrentGuess("");
    };
    var getRelationColor = function (relation) {
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
    if (!currentSet)
        return null;
    return (<Card className="border-2 border-cyan-200 dark:border-cyan-800">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
        <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
          <Network className="h-6 w-6"/>
          शब्द संबंध (Word Association)
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-cyan-600 dark:text-cyan-400">
            केंद्रीय शब्द से जुड़े शब्द खोजें
          </p>
          <div className="flex gap-2">
            <Button variant={gameMode === "learn" ? "default" : "outline"} size="sm" onClick={function () { return setGameMode("learn"); }}>
              सीखें
            </Button>
            <Button variant={gameMode === "quiz" ? "default" : "outline"} size="sm" onClick={function () { return setGameMode("quiz"); }}>
              क्विज़
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Game Stats */}
        {gameMode === "quiz" && (<div className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <Badge variant={timeLeft <= 10 ? "destructive" : "outline"}>
              <Timer className="h-4 w-4 mr-1"/> {timeLeft}s
            </Badge>
            <Badge variant="outline">{userGuesses.length}/6 मिले</Badge>
          </div>)}

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
        {gameMode === "quiz" && gameActive && (<div className="flex gap-2">
            <input type="text" value={currentGuess} onChange={function (e) { return setCurrentGuess(e.target.value); }} placeholder="संबंधित शब्द लिखें..." className="flex-1 px-3 py-2 border rounded-lg bg-background" onKeyDown={function (e) { return e.key === 'Enter' && submitGuess(); }}/>
            <Button onClick={submitGuess} disabled={!currentGuess.trim()}>
              जमा करें
            </Button>
          </div>)}

        {/* Association Web */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentSet.associations.map(function (assoc, index) {
            var isRevealed = gameMode === "learn" || revealedWords.includes(index);
            var isGuessed = userGuesses.some(function (guess) {
                return guess.toLowerCase() === assoc.word.toLowerCase() ||
                    guess.toLowerCase() === assoc.hindi.toLowerCase();
            });
            return (<div key={index} className={"p-4 rounded-xl border-2 transition-all cursor-pointer ".concat(isRevealed || isGuessed
                    ? "border-cyan-300 bg-white dark:bg-slate-800"
                    : "border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800")} onClick={function () { return gameMode === "learn" && revealWord(index); }}>
                {isRevealed || isGuessed ? (<>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getRelationColor(assoc.relation)}>
                        {assoc.relationHindi}
                      </Badge>
                      {isGuessed && <CheckCircle className="h-4 w-4 text-green-500"/>}
                    </div>
                    <div className="font-bold text-lg">{assoc.word}</div>
                    <div className="text-cyan-600 dark:text-cyan-400 font-hindi">{assoc.hindi}</div>
                  </>) : (<div className="text-center text-gray-400">
                    <div className="text-2xl mb-2">?</div>
                    <div className="text-sm">क्लिक करें</div>
                  </div>)}
              </div>);
        })}
        </div>

        {/* Game Over */}
        {gameMode === "quiz" && !gameActive && timeLeft === 0 && (<div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="text-xl font-bold mb-2">समय समाप्त!</h3>
            <p className="text-lg mb-2">आपका स्कोर: {score}</p>
            <p className="text-sm text-muted-foreground mb-4">
              आपने {userGuesses.length}/6 शब्द सही अनुमान लगाए
            </p>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          {gameMode === "learn" && (<>
              <Button onClick={function () { return setRevealedWords(currentSet.associations.map(function (_, i) { return i; })); }} variant="outline" className="flex-1">
                <Lightbulb className="h-4 w-4 mr-1"/> सभी दिखाएं
              </Button>
              <Button onClick={getRandomSet} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-1"/> नया सेट
              </Button>
            </>)}
          {gameMode === "quiz" && (<Button onClick={getRandomSet} className="w-full">
              <RotateCcw className="h-4 w-4 mr-1"/> {gameActive ? "नया खेल" : "फिर से खेलें"}
            </Button>)}
        </div>
      </CardContent>
    </Card>);
}
export default WordAssociation;
