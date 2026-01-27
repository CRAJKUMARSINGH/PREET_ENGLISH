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
import { Input } from "@/components/ui/input";
import { Theater, Volume2, Send, CheckCircle, XCircle, Lightbulb, RotateCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
export function RolePlaySimulator() {
    var _a = useState(null), selectedScenario = _a[0], setSelectedScenario = _a[1];
    var _b = useState(0), currentExchange = _b[0], setCurrentExchange = _b[1];
    var _c = useState(""), userInput = _c[0], setUserInput = _c[1];
    var _d = useState(false), showHint = _d[0], setShowHint = _d[1];
    var _e = useState(null), feedback = _e[0], setFeedback = _e[1];
    var _f = useState(0), score = _f[0], setScore = _f[1];
    var _g = useState(false), completed = _g[0], setCompleted = _g[1];
    var _h = useState("all"), difficulty = _h[0], setDifficulty = _h[1];
    var _j = useState("all"), category = _j[0], setCategory = _j[1];
    var _k = useQuery({
        queryKey: ["/api/scenarios"],
    }), _l = _k.data, scenarios = _l === void 0 ? [] : _l, isLoading = _k.isLoading;
    var getFilteredScenarios = function () {
        var filtered = scenarios;
        if (difficulty !== "all") {
            filtered = filtered.filter(function (s) { return s.difficulty.toLowerCase() === difficulty.toLowerCase(); });
        }
        if (category !== "all") {
            filtered = filtered.filter(function (s) { return s.category === category; });
        }
        return filtered;
    };
    var filteredScenarios = getFilteredScenarios();
    var categories = __spreadArray(["all"], Array.from(new Set(scenarios.map(function (s) { return s.category; }))), true);
    var parsedExchanges = selectedScenario ? JSON.parse(selectedScenario.dialogues) : [];
    var speakText = function (text) {
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var checkResponse = function () {
        if (!selectedScenario || !userInput.trim() || !parsedExchanges.length)
            return;
        var exchange = parsedExchanges[currentExchange];
        var userWords = userInput.toLowerCase().split(/\s+/);
        var isCorrect = exchange.expectedResponses.some(function (expected) {
            return userWords.some(function (word) { return word.includes(expected.toLowerCase()); });
        });
        setFeedback(isCorrect ? "correct" : "incorrect");
        if (isCorrect) {
            setScore(score + (showHint ? 5 : 10));
            setTimeout(function () {
                if (currentExchange < parsedExchanges.length - 1) {
                    setCurrentExchange(currentExchange + 1);
                    setUserInput("");
                    setFeedback(null);
                    setShowHint(false);
                }
                else {
                    setCompleted(true);
                }
            }, 1500);
        }
    };
    var resetScenario = function () {
        setCurrentExchange(0);
        setUserInput("");
        setFeedback(null);
        setShowHint(false);
        setScore(0);
        setCompleted(false);
    };
    var getDifficultyColor = function (diff) {
        switch (diff) {
            case "beginner": return "bg-green-500";
            case "intermediate": return "bg-yellow-500";
            case "advanced": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };
    // Scenario Selection View
    if (!selectedScenario) {
        return (<Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <Theater className="h-6 w-6"/>
            भूमिका अभिनय (Role Play)
          </CardTitle>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            वास्तविक परिस्थितियों में अंग्रेजी बोलने का अभ्यास करें - हिंदी भाषियों के लिए
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
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
            <Badge variant="outline">{filteredScenarios.length} परिदृश्य</Badge>
          </div>

          {/* Scenarios Grid */}
          <div className="grid gap-4 md:grid-cols-2 max-h-[500px] overflow-y-auto">
            {filteredScenarios.map(function (scenario) { return (<div key={scenario.id} onClick={function () { setSelectedScenario(scenario); resetScenario(); }} className="p-4 border-2 rounded-xl cursor-pointer hover:border-purple-400 transition-all bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{scenario.title}</span>
                  <Badge className={getDifficultyColor(scenario.difficulty.toLowerCase())}>
                    {scenario.difficulty.toLowerCase() === "beginner" ? "शुरुआती" :
                    scenario.difficulty.toLowerCase() === "intermediate" ? "मध्यम" : "उन्नत"}
                  </Badge>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-hindi mb-2">
                  {scenario.titleHindi}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{scenario.descriptionHindi}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">आप: {scenario.yourRoleHindi}</Badge>
                  <Badge variant="outline">साथी: {scenario.partnerRoleHindi}</Badge>
                  <Badge variant="outline">{scenario.category}</Badge>
                </div>
              </div>); })}
          </div>
        </CardContent>
      </Card>);
    }
    // Completed View
    if (completed) {
        var maxScore = parsedExchanges.length * 10;
        var percentage = Math.round((score / maxScore) * 100);
        return (<Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
          <h2 className="text-2xl font-bold mb-2">🎉 बधाई हो!</h2>
          <p className="text-lg mb-2">आपने यह भूमिका अभिनय पूरा कर लिया!</p>
          <p className="text-purple-600 dark:text-purple-400 font-hindi mb-4">
            {selectedScenario.titleHindi}
          </p>
          <div className="text-3xl font-bold text-purple-600 mb-2">{score} / {maxScore}</div>
          <p className="text-lg mb-6">सटीकता: {percentage}%</p>

          {percentage >= 80 && (<div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-700 dark:text-green-300">
                🌟 उत्कृष्ट! आपने बहुत अच्छा प्रदर्शन किया!
              </p>
            </div>)}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={function () { return setSelectedScenario(null); }}>
              अन्य परिदृश्य
            </Button>
            <Button onClick={resetScenario}>
              <RotateCcw className="h-4 w-4 mr-1"/> फिर से खेलें
            </Button>
          </div>
        </CardContent>
      </Card>);
    }
    var exchange = parsedExchanges[currentExchange];
    // Role Play View
    return (<Card className="border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <Theater className="h-6 w-6"/>
            {selectedScenario.title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={function () { return setSelectedScenario(null); }}>
            वापस
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge>आप: {selectedScenario.yourRoleHindi}</Badge>
          <Badge variant="outline">{selectedScenario.category}</Badge>
          <Badge variant="outline">स्कोर: {score}</Badge>
          <Badge variant="outline">
            {currentExchange + 1} / {parsedExchanges.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Situation */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm"><strong>परिस्थिति:</strong> {selectedScenario.descriptionHindi}</p>
          <p className="text-xs text-muted-foreground mt-1">{selectedScenario.description}</p>
        </div>

        {/* Partner's Dialogue */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600">{selectedScenario.partnerRoleHindi}</Badge>
            <Button size="sm" variant="ghost" onClick={function () { return speakText(exchange.prompt); }}>
              <Volume2 className="h-4 w-4"/>
            </Button>
          </div>
          <p className="text-lg font-medium">{exchange.prompt}</p>
          <p className="text-blue-700 dark:text-blue-300 font-hindi mt-2">
            {exchange.promptHindi}
          </p>
        </div>

        {/* Your Response */}
        <div className="space-y-3">
          <p className="font-medium">आपका जवाब ({selectedScenario.yourRoleHindi}):</p>
          <div className="flex gap-2">
            <Input value={userInput} onChange={function (e) { return setUserInput(e.target.value); }} placeholder="अंग्रेजी में जवाब लिखें..." className="flex-1" disabled={feedback === "correct"} onKeyDown={function (e) { return e.key === "Enter" && checkResponse(); }}/>
            <Button onClick={checkResponse} disabled={!userInput.trim() || feedback === "correct"}>
              <Send className="h-4 w-4"/>
            </Button>
          </div>
        </div>

        {/* Hint Button */}
        {!feedback && (<Button variant="outline" size="sm" onClick={function () { return setShowHint(!showHint); }} className="w-full">
            <Lightbulb className="h-4 w-4 mr-1"/>
            {showHint ? "संकेत छुपाएं" : "संकेत दिखाएं"} (5 अंक कम)
          </Button>)}

        {/* Hints */}
        {showHint && !feedback && (<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg space-y-2">
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              💡 संकेत:
            </p>
            {exchange.hints.map(function (hint, idx) { return (<p key={idx} className="text-sm text-yellow-600 dark:text-yellow-400">
                • {hint}
              </p>); })}
            <div className="pt-2 border-t border-yellow-200">
              {exchange.hintsHindi.map(function (hint, idx) { return (<p key={idx} className="text-sm text-yellow-700 dark:text-yellow-300 font-hindi">
                  • {hint}
                </p>); })}
            </div>
          </div>)}

        {/* Feedback */}
        {feedback && (<div className={"p-4 rounded-xl ".concat(feedback === "correct"
                ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-300"
                : "bg-red-100 dark:bg-red-900/30 border-2 border-red-300")}>
            {feedback === "correct" ? (<div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600"/>
                <span className="font-bold text-green-700">
                  बहुत अच्छा! सही जवाब! +{showHint ? 5 : 10} अंक
                </span>
              </div>) : (<div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-red-600"/>
                  <span className="font-bold text-red-700">फिर से कोशिश करें</span>
                </div>
                <p className="text-sm text-red-600">
                  संकेत: {exchange.hints[0]}
                </p>
                <p className="text-sm text-red-500 font-hindi">
                  {exchange.hintsHindi[0]}
                </p>
              </div>)}
          </div>)}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: "".concat(((currentExchange + 1) / parsedExchanges.length) * 100, "%") }}/>
        </div>
      </CardContent>
    </Card>);
}
export default RolePlaySimulator;
