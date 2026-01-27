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
import { Input } from "@/components/ui/input";
import { BookOpen, Volume2, Star, Brain, CheckCircle, XCircle, RotateCcw, Search } from "lucide-react";
import { advancedVocabularyData as vocabularyWords } from "@/data/advancedVocabularyData";
export function VocabularyBuilder() {
    var _a, _b, _c;
    var _d = useState(null), currentWord = _d[0], setCurrentWord = _d[1];
    var _e = useState(false), showDetails = _e[0], setShowDetails = _e[1];
    var _f = useState([]), studiedWords = _f[0], setStudiedWords = _f[1];
    var _g = useState("all"), difficulty = _g[0], setDifficulty = _g[1];
    var _h = useState("all"), category = _h[0], setCategory = _h[1];
    var _j = useState(""), searchTerm = _j[0], setSearchTerm = _j[1];
    var _k = useState(false), quizMode = _k[0], setQuizMode = _k[1];
    var _l = useState(""), userAnswer = _l[0], setUserAnswer = _l[1];
    var _m = useState(false), showResult = _m[0], setShowResult = _m[1];
    var categories = ["all", "Appearance", "Quality", "Character", "Communication", "Emotion"];
    var filteredWords = vocabularyWords.filter(function (word) {
        var matchesDifficulty = difficulty === "all" || word.difficulty === difficulty;
        var matchesCategory = category === "all" || word.category === category;
        var matchesSearch = (word.word || word.english || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.hindi.includes(searchTerm);
        return matchesDifficulty && matchesCategory && matchesSearch;
    });
    var getRandomWord = function () {
        if (filteredWords.length === 0)
            return;
        var randomIndex = Math.floor(Math.random() * filteredWords.length);
        setCurrentWord(filteredWords[randomIndex]);
        setShowDetails(false);
        setUserAnswer("");
        setShowResult(false);
    };
    useEffect(function () {
        getRandomWord();
    }, [difficulty, category]);
    var speakWord = function (text) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var markAsStudied = function () {
        if (currentWord && !studiedWords.includes(currentWord.id)) {
            setStudiedWords(__spreadArray(__spreadArray([], studiedWords, true), [currentWord.id], false));
        }
    };
    var checkQuizAnswer = function () {
        setShowResult(true);
        if (currentWord)
            markAsStudied();
    };
    if (!currentWord) {
        return (<Card className="border-2 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-6 text-center">
          <p>No words found for the selected filters.</p>
        </CardContent>
      </Card>);
    }
    var isCorrect = userAnswer.toLowerCase().trim() === currentWord.hindi.toLowerCase().trim();
    return (<Card className="border-2 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          <BookOpen className="h-6 w-6"/>
          शब्द भंडार (Vocabulary Builder)
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{studiedWords.length} शब्द सीखे</Badge>
          <Badge className={"".concat(currentWord.frequency === "common" ? "bg-green-500" :
            currentWord.frequency === "moderate" ? "bg-yellow-500" : "bg-red-500")}>
            {currentWord.frequency === "common" ? "आम" :
            currentWord.frequency === "moderate" ? "मध्यम" : "दुर्लभ"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="शब्द खोजें..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="pl-10"/>
          </div>
          <select value={difficulty} onChange={function (e) { return setDifficulty(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background">
            <option value="all">सभी स्तर</option>
            <option value="beginner">शुरुआती</option>
            <option value="intermediate">मध्यम</option>
            <option value="advanced">उन्नत</option>
          </select>
          <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background">
            {categories.map(function (cat) { return (<option key={cat} value={cat}>
                {cat === "all" ? "सभी श्रेणी" : cat}
              </option>); })}
          </select>
        </div>

        {/* Word Display */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
              {currentWord.word || currentWord.english}
            </div>
            <div className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">
              {currentWord.pronunciation}
            </div>
            <Badge className="mb-2">{currentWord.partOfSpeech}</Badge>
            <div className="flex justify-center gap-2">
              <Button onClick={function () { return speakWord(currentWord.word || currentWord.english || ''); }} size="sm">
                <Volume2 className="h-4 w-4 mr-1"/> सुनें
              </Button>
              <Button onClick={function () { return setQuizMode(!quizMode); }} variant={quizMode ? "default" : "outline"} size="sm">
                <Brain className="h-4 w-4 mr-1"/> क्विज़
              </Button>
            </div>
          </div>

          {!quizMode && (<div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="text-2xl font-hindi text-orange-700 dark:text-orange-300">
                {currentWord.hindi}
              </div>
            </div>)}
        </div>

        {/* Quiz Mode */}
        {quizMode && (<div className="space-y-4">
            <div className="text-center">
              <p className="text-lg mb-2">इस शब्द का हिंदी अर्थ क्या है?</p>
              <Input value={userAnswer} onChange={function (e) { return setUserAnswer(e.target.value); }} placeholder="हिंदी में उत्तर लिखें..." className="text-center text-xl font-hindi" disabled={showResult}/>
            </div>

            {showResult && (<div className={"p-4 rounded-xl border-2 ".concat(isCorrect
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border-red-300")}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (<>
                      <CheckCircle className="h-5 w-5 text-green-600"/>
                      <span className="font-bold text-green-700">🎉 सही!</span>
                    </>) : (<>
                      <XCircle className="h-5 w-5 text-red-600"/>
                      <span className="font-bold text-red-700">सही उत्तर: {currentWord.hindi}</span>
                    </>)}
                </div>
              </div>)}

            <div className="flex gap-2">
              {!showResult ? (<Button onClick={checkQuizAnswer} disabled={!userAnswer.trim()} className="w-full">
                  जांचें
                </Button>) : (<Button onClick={getRandomWord} className="w-full">
                  अगला शब्द
                </Button>)}
            </div>
          </div>)}

        {/* Word Details */}
        {showDetails && !quizMode && (<div className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">समानार्थी (Synonyms):</h4>
              <div className="flex flex-wrap gap-1">
                {(_a = currentWord.synonyms) === null || _a === void 0 ? void 0 : _a.map(function (syn, idx) { return (<Badge key={idx} variant="secondary" className="bg-green-100 dark:bg-green-800">
                    {syn}
                  </Badge>); })}
              </div>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">विपरीतार्थी (Antonyms):</h4>
              <div className="flex flex-wrap gap-1">
                {(_b = currentWord.antonyms) === null || _b === void 0 ? void 0 : _b.map(function (ant, idx) { return (<Badge key={idx} variant="secondary" className="bg-red-100 dark:bg-red-800">
                    {ant}
                  </Badge>); })}
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">उदाहरण (Examples):</h4>
              {(_c = currentWord.examples) === null || _c === void 0 ? void 0 : _c.map(function (example, idx) { return (<div key={idx} className="mb-2 p-2 bg-white dark:bg-slate-800 rounded">
                  <p className="font-medium">{example.english}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-hindi">{example.hindi}</p>
                </div>); })}
            </div>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={function () { return setShowDetails(!showDetails); }} variant="outline" className="flex-1" disabled={quizMode}>
            {showDetails ? "छुपाएं" : "विस्तार"}
          </Button>
          <Button onClick={markAsStudied} variant="outline" className="flex-1">
            <Star className="h-4 w-4 mr-1"/> सीखा
          </Button>
          <Button onClick={getRandomWord} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-1"/> अगला
          </Button>
        </div>
      </CardContent>
    </Card>);
}
export default VocabularyBuilder;
