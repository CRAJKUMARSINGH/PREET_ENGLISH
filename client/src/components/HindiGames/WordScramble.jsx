import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shuffle, CheckCircle, XCircle, RotateCcw, Lightbulb, Volume2 } from "lucide-react";
var words = [
    // Animals
    { word: "ELEPHANT", hindi: "हाथी", hint: "Largest land animal", category: "Animals" },
    { word: "TIGER", hindi: "बाघ", hint: "National animal of India", category: "Animals" },
    { word: "MONKEY", hindi: "बंदर", hint: "Loves bananas", category: "Animals" },
    { word: "RABBIT", hindi: "खरगोश", hint: "Has long ears", category: "Animals" },
    { word: "PEACOCK", hindi: "मोर", hint: "National bird of India", category: "Animals" },
    // Fruits
    { word: "MANGO", hindi: "आम", hint: "King of fruits", category: "Fruits" },
    { word: "APPLE", hindi: "सेब", hint: "Keeps doctor away", category: "Fruits" },
    { word: "BANANA", hindi: "केला", hint: "Yellow curved fruit", category: "Fruits" },
    { word: "ORANGE", hindi: "संतरा", hint: "Citrus fruit", category: "Fruits" },
    { word: "GRAPES", hindi: "अंगूर", hint: "Grows in bunches", category: "Fruits" },
    // Colors
    { word: "YELLOW", hindi: "पीला", hint: "Color of sun", category: "Colors" },
    { word: "GREEN", hindi: "हरा", hint: "Color of grass", category: "Colors" },
    { word: "BLUE", hindi: "नीला", hint: "Color of sky", category: "Colors" },
    { word: "RED", hindi: "लाल", hint: "Color of blood", category: "Colors" },
    { word: "WHITE", hindi: "सफेद", hint: "Color of milk", category: "Colors" },
    // Body Parts
    { word: "HAND", hindi: "हाथ", hint: "Used to write", category: "Body" },
    { word: "HEAD", hindi: "सिर", hint: "Brain is here", category: "Body" },
    { word: "EYES", hindi: "आँखें", hint: "Used to see", category: "Body" },
    { word: "NOSE", hindi: "नाक", hint: "Used to smell", category: "Body" },
    { word: "MOUTH", hindi: "मुँह", hint: "Used to eat", category: "Body" },
    // Family
    { word: "MOTHER", hindi: "माँ", hint: "Female parent", category: "Family" },
    { word: "FATHER", hindi: "पिता", hint: "Male parent", category: "Family" },
    { word: "SISTER", hindi: "बहन", hint: "Female sibling", category: "Family" },
    { word: "BROTHER", hindi: "भाई", hint: "Male sibling", category: "Family" },
    { word: "GRANDMOTHER", hindi: "दादी/नानी", hint: "Mother's mother", category: "Family" },
];
var scrambleWord = function (word) {
    var _a;
    var arr = word.split('');
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    }
    return arr.join('');
};
export function WordScramble() {
    var _a = useState(null), currentWord = _a[0], setCurrentWord = _a[1];
    var _b = useState(""), scrambled = _b[0], setScrambled = _b[1];
    var _c = useState(""), userInput = _c[0], setUserInput = _c[1];
    var _d = useState(false), showHint = _d[0], setShowHint = _d[1];
    var _e = useState(null), result = _e[0], setResult = _e[1];
    var _f = useState(0), score = _f[0], setScore = _f[1];
    var _g = useState(0), streak = _g[0], setStreak = _g[1];
    var _h = useState(0), wordsPlayed = _h[0], setWordsPlayed = _h[1];
    var _j = useState("All"), category = _j[0], setCategory = _j[1];
    var categories = ["All", "Animals", "Fruits", "Colors", "Body", "Family"];
    var getNewWord = function () {
        var filtered = category === "All" ? words : words.filter(function (w) { return w.category === category; });
        var randomWord = filtered[Math.floor(Math.random() * filtered.length)];
        var scrambledVersion = scrambleWord(randomWord.word);
        while (scrambledVersion === randomWord.word) {
            scrambledVersion = scrambleWord(randomWord.word);
        }
        setCurrentWord(randomWord);
        setScrambled(scrambledVersion);
        setUserInput("");
        setShowHint(false);
        setResult(null);
    };
    useEffect(function () {
        getNewWord();
    }, [category]);
    var checkAnswer = function () {
        if (!currentWord)
            return;
        if (userInput.toUpperCase() === currentWord.word) {
            setResult("correct");
            setScore(score + (showHint ? 5 : 10));
            setStreak(streak + 1);
        }
        else {
            setResult("wrong");
            setStreak(0);
        }
        setWordsPlayed(wordsPlayed + 1);
    };
    var speakWord = function () {
        if (!currentWord)
            return;
        var utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    if (!currentWord)
        return null;
    return (<Card className="border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <Shuffle className="h-6 w-6"/>
          शब्द पहेली (Word Scramble)
        </CardTitle>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          अक्षरों को सही क्रम में लगाकर शब्द बनाएं
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Badge variant="outline">स्कोर: {score}</Badge>
            <Badge variant="outline">स्ट्रीक: {streak}🔥</Badge>
          </div>
          <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="px-3 py-1 border rounded-lg bg-background text-sm">
            {categories.map(function (cat) { return (<option key={cat} value={cat}>{cat === "All" ? "सभी" : cat}</option>); })}
          </select>
        </div>

        {/* Scrambled Word Display */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <div className="text-4xl font-bold tracking-widest text-purple-700 dark:text-purple-300">
              {scrambled}
            </div>
          </div>
          
          <div className="text-orange-600 dark:text-orange-400 font-hindi text-lg">
            हिंदी: {currentWord.hindi}
          </div>
        </div>

        {/* Hint */}
        {showHint && (<div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600"/>
            <span className="text-yellow-700 dark:text-yellow-300">{currentWord.hint}</span>
          </div>)}

        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">अपना उत्तर लिखें:</label>
          <Input value={userInput} onChange={function (e) { return setUserInput(e.target.value.toUpperCase()); }} placeholder="Type the word..." className="text-center text-xl uppercase tracking-widest" disabled={result !== null} onKeyDown={function (e) { return e.key === 'Enter' && !result && checkAnswer(); }}/>
        </div>

        {/* Result */}
        {result && (<div className={"p-4 rounded-xl border-2 ".concat(result === "correct"
                ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                : "bg-red-50 dark:bg-red-900/20 border-red-300")}>
            <div className="flex items-center gap-2 mb-2">
              {result === "correct" ? (<>
                  <CheckCircle className="h-5 w-5 text-green-600"/>
                  <span className="font-bold text-green-700">🎉 सही! Correct!</span>
                </>) : (<>
                  <XCircle className="h-5 w-5 text-red-600"/>
                  <span className="font-bold text-red-700">गलत! Try Again!</span>
                </>)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">सही उत्तर:</span>
              <span className="font-bold text-lg">{currentWord.word}</span>
              <Button variant="ghost" size="sm" onClick={speakWord}>
                <Volume2 className="h-4 w-4"/>
              </Button>
            </div>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          {!result ? (<>
              <Button variant="outline" onClick={function () { return setShowHint(true); }} disabled={showHint} className="flex-1">
                <Lightbulb className="h-4 w-4 mr-2"/> संकेत (-5 अंक)
              </Button>
              <Button onClick={checkAnswer} disabled={!userInput.trim()} className="flex-1 bg-purple-600">
                जांचें (Check)
              </Button>
            </>) : (<Button onClick={getNewWord} className="w-full bg-purple-600">
              <RotateCcw className="h-4 w-4 mr-2"/> अगला शब्द
            </Button>)}
        </div>

        {/* Progress */}
        <div className="text-center text-sm text-muted-foreground">
          {wordsPlayed} शब्द खेले गए
        </div>
      </CardContent>
    </Card>);
}
