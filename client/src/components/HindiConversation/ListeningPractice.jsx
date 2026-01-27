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
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones, Volume2, Play, CheckCircle, XCircle, RotateCcw, BookOpen, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
export function ListeningPractice() {
    var _a = useState(null), selectedLessonId = _a[0], setSelectedLessonId = _a[1];
    var _b = useState(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = useState(null), selectedAnswer = _c[0], setSelectedAnswer = _c[1];
    var _d = useState(false), showResult = _d[0], setShowResult = _d[1];
    var _e = useState(0), score = _e[0], setScore = _e[1];
    var _f = useState(false), completed = _f[0], setCompleted = _f[1];
    var _g = useState("all"), difficulty = _g[0], setDifficulty = _g[1];
    var _h = useState("all"), category = _h[0], setCategory = _h[1];
    var _j = useState(false), showTranscript = _j[0], setShowTranscript = _j[1];
    var _k = useQuery({
        queryKey: ["/api/listenings"],
    }), _l = _k.data, listeningLessons = _l === void 0 ? [] : _l, isLoading = _k.isLoading;
    var selectedLesson = listeningLessons.find(function (l) { return l.id === selectedLessonId; });
    // Parse JSON fields
    var parsedQuestions = selectedLesson ? JSON.parse(selectedLesson.questions) : [];
    var parsedVocabulary = selectedLesson && selectedLesson.vocabulary ? JSON.parse(selectedLesson.vocabulary) : [];
    var question = parsedQuestions[currentQuestion];
    var getCategories = function () { return Array.from(new Set(listeningLessons.map(function (l) { return l.category; }))); };
    var categories = __spreadArray(["all"], getCategories(), true);
    var filteredLessons = listeningLessons.filter(function (l) {
        var matchesDifficulty = difficulty === "all" || l.difficulty.toLowerCase() === difficulty.toLowerCase();
        var matchesCategory = category === "all" || l.category === category;
        return matchesDifficulty && matchesCategory;
    });
    var playAudio = function (text, speed) {
        if (speed === void 0) { speed = 1; }
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = speed;
        speechSynthesis.speak(utterance);
    };
    var checkAnswer = function () {
        if (selectedAnswer === null || !selectedLesson)
            return;
        setShowResult(true);
        if (selectedAnswer === question.correctAnswer) {
            setScore(score + 10);
        }
    };
    var nextQuestion = function () {
        if (!selectedLesson)
            return;
        if (currentQuestion < parsedQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
        else {
            setCompleted(true);
        }
    };
    var resetLesson = function () {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setCompleted(false);
        setShowTranscript(false);
    };
    var getDifficultyColor = function (diff) {
        switch (diff.toLowerCase()) {
            case "beginner": return "bg-green-500";
            case "intermediate": return "bg-yellow-500";
            case "advanced": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };
    // Lesson Selection View
    if (!selectedLesson) {
        return (<Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <Headphones className="h-6 w-6"/>
            सुनने का अभ्यास (Listening Practice) - {listeningLessons.length}+ पाठ
          </CardTitle>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            सुनें, समझें और सीखें - हिंदी भाषियों के लिए
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {isLoading ? (<div className="text-center py-12 animate-pulse">पाठ खोजे जा रहे हैं...</div>) : (<>
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select value={difficulty} onChange={function (e) { return setDifficulty(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background">
                  <option value="all">सभी स्तर</option>
                  <option value="beginner">शुरुआती</option>
                  <option value="intermediate">मध्यम</option>
                  <option value="advanced">उन्नत</option>
                </select>
                <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background">
                  <option value="all">सभी श्रेणी</option>
                  {categories.filter(function (c) { return c !== "all"; }).map(function (cat) { return (<option key={cat} value={cat}>{cat}</option>); })}
                </select>
                <Badge variant="outline">{filteredLessons.length} पाठ</Badge>
              </div>

              {/* Lessons Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredLessons.map(function (lesson) { return (<div key={lesson.id} onClick={function () { setSelectedLessonId(lesson.id); resetLesson(); }} className="p-4 border-2 rounded-xl cursor-pointer hover:border-orange-400 transition-all bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{lesson.title}</span>
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty.toLowerCase() === "beginner" ? "शुरुआती" :
                        lesson.difficulty.toLowerCase() === "intermediate" ? "मध्यम" : "उन्नत"}
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-hindi mb-2">
                      {lesson.titleHindi}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{lesson.descriptionHindi}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{lesson.category}</Badge>
                      <span className="text-xs text-muted-foreground">⏱️ {lesson.duration}</span>
                    </div>
                  </div>); })}
              </div>
            </>)}
        </CardContent>
      </Card>);
    }
    // Completed View
    if (completed && selectedLesson) {
        var percentage = Math.round((score / (parsedQuestions.length * 10)) * 100);
        return (<Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-bold mb-2">🎉 पाठ पूरा हुआ!</h2>
          <p className="text-lg mb-4">{selectedLesson.title}</p>
          <div className="text-3xl font-bold text-orange-600 mb-2">{score} / {parsedQuestions.length * 10}</div>
          <p className="text-lg mb-6">सटीकता: {percentage}%</p>

          {/* Vocabulary Review */}
          <div className="text-left mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-bold mb-3">📚 शब्दावली समीक्षा:</h3>
            <div className="space-y-2">
              {parsedVocabulary.map(function (vocab, idx) { return (<div key={idx} className="flex justify-between items-center">
                  <span className="font-medium">{vocab.word}</span>
                  <span className="text-sm text-muted-foreground">{vocab.meaningHindi}</span>
                </div>); })}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={function () { return setSelectedLessonId(null); }}>
              अन्य पाठ
            </Button>
            <Button onClick={resetLesson}>
              <RotateCcw className="h-4 w-4 mr-1"/> फिर से करें
            </Button>
          </div>
        </CardContent>
      </Card>);
    }
    // Lesson View
    return (<Card className="border-2 border-orange-200 dark:border-orange-800">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <Headphones className="h-6 w-6"/>
            {selectedLesson.title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={function () { return setSelectedLessonId(null); }}>
            वापस
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge>{selectedLesson.category}</Badge>
          <Badge className={getDifficultyColor(selectedLesson.difficulty)}>
            {selectedLesson.difficulty === "beginner" ? "शुरुआती" :
            selectedLesson.difficulty === "intermediate" ? "मध्यम" : "उन्नत"}
          </Badge>
          <Badge variant="outline">स्कोर: {score}</Badge>
          <Badge variant="outline">
            प्रश्न {currentQuestion + 1} / {parsedQuestions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Audio Section */}
        <div className="p-6 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl">
          <Headphones className="h-12 w-12 mx-auto mb-4 text-orange-600"/>
          <p className="text-center text-lg font-medium mb-4">ऑडियो सुनें और प्रश्नों के उत्तर दें</p>

          <div className="flex justify-center gap-3 mb-4">
            <Button onClick={function () { return playAudio(selectedLesson.audioText, 0.7); }} variant="outline">
              <Play className="h-4 w-4 mr-1"/> धीमा
            </Button>
            <Button onClick={function () { return playAudio(selectedLesson.audioText, 1); }}>
              <Volume2 className="h-4 w-4 mr-1"/> सामान्य
            </Button>
            <Button onClick={function () { return playAudio(selectedLesson.audioText, 1.2); }} variant="outline">
              <Play className="h-4 w-4 mr-1"/> तेज़
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={function () { return setShowTranscript(!showTranscript); }} className="w-full">
            <BookOpen className="h-4 w-4 mr-1"/>
            {showTranscript ? "ट्रांसक्रिप्ट छुपाएं" : "ट्रांसक्रिप्ट देखें"}
          </Button>
        </div>

        {/* Transcript */}
        {showTranscript && (<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
            <p className="text-sm">{selectedLesson.audioText}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-hindi">
              {selectedLesson.audioTextHindi}
            </p>
          </div>)}

        {/* Question */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2">
          <p className="font-bold text-lg mb-2">{question.question}</p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi mb-4">
            {question.questionHindi}
          </p>

          <div className="space-y-2">
            {question.options.map(function (option, idx) { return (<button key={idx} onClick={function () { return !showResult && setSelectedAnswer(idx); }} disabled={showResult} className={"w-full p-3 text-left rounded-lg border-2 transition-all ".concat(showResult
                ? idx === question.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                    : idx === selectedAnswer
                        ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                        : "border-gray-200"
                : selectedAnswer === idx
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                    : "border-gray-200 hover:border-orange-300")}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>); })}
          </div>
        </div>

        {/* Result */}
        {showResult && (<div className={"p-4 rounded-xl ".concat(selectedAnswer === question.correctAnswer
                ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-300"
                : "bg-red-100 dark:bg-red-900/30 border-2 border-red-300")}>
            {selectedAnswer === question.correctAnswer ? (<div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600"/>
                <span className="font-bold text-green-700">सही जवाब! +10 अंक</span>
              </div>) : (<div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-red-600"/>
                  <span className="font-bold text-red-700">गलत जवाब</span>
                </div>
              </div>)}
            <p className="text-sm mt-2">
              <strong>व्याख्या:</strong> {question.explanationHindi}
            </p>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (<Button onClick={checkAnswer} disabled={selectedAnswer === null} className="w-full">
              जांचें
            </Button>) : (<Button onClick={nextQuestion} className="w-full">
              {currentQuestion < parsedQuestions.length - 1 ? (<>अगला प्रश्न <ChevronRight className="h-4 w-4 ml-1"/></>) : ("परिणाम देखें")}
            </Button>)}
        </div>

        {/* Vocabulary */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <h3 className="font-bold mb-2">📚 इस पाठ की शब्दावली:</h3>
          <div className="flex flex-wrap gap-2">
            {parsedVocabulary.map(function (vocab, idx) { return (<Badge key={idx} variant="outline" className="cursor-pointer" onClick={function () { return playAudio(vocab.word); }}>
                {vocab.word} - {vocab.meaningHindi}
              </Badge>); })}
          </div>
        </div>
      </CardContent>
    </Card>);
}
export default ListeningPractice;
