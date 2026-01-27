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
import { MessageCircle, Volume2, User, Users, ChevronRight, RotateCcw, CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
export function DialoguePractice() {
    var _a = useState(null), selectedDialogueId = _a[0], setSelectedDialogueId = _a[1];
    var _b = useState(0), currentLineIndex = _b[0], setCurrentLineIndex = _b[1];
    var _c = useState(true), showTranslation = _c[0], setShowTranslation = _c[1];
    var _d = useState([]), completedDialogues = _d[0], setCompletedDialogues = _d[1];
    var _e = useState("all"), difficulty = _e[0], setDifficulty = _e[1];
    var _f = useState("all"), category = _f[0], setCategory = _f[1];
    var _g = useState(""), searchTerm = _g[0], setSearchTerm = _g[1];
    var _h = useQuery({
        queryKey: ["/api/lessons"],
    }), _j = _h.data, allLessons = _j === void 0 ? [] : _j, isLoading = _h.isLoading;
    var _k = useQuery({
        queryKey: ["/api/lessons/".concat(selectedDialogueId)],
        enabled: !!selectedDialogueId,
    }), selectedDialogueData = _k.data, isLoadingDialogue = _k.isLoading;
    var dialogues = allLessons.filter(function (l) { return l.slug.startsWith('dialogue-'); });
    var filteredDialogues = dialogues.filter(function (d) {
        var _a, _b;
        var matchesDifficulty = difficulty === "all" || d.difficulty.toLowerCase() === difficulty.toLowerCase();
        var matchesCategory = category === "all" || d.category === category;
        var matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ((_a = d.hindiTitle) === null || _a === void 0 ? void 0 : _a.includes(searchTerm)) ||
            ((_b = d.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesDifficulty && matchesCategory && matchesSearch;
    });
    var categories = __spreadArray(["all"], Array.from(new Set(dialogues.map(function (d) { return d.category; }))), true);
    var speakText = function (text) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var nextLine = function () {
        if (selectedDialogueData && currentLineIndex < selectedDialogueData.conversationLines.length - 1) {
            setCurrentLineIndex(currentLineIndex + 1);
        }
        else if (selectedDialogueData) {
            if (!completedDialogues.includes(selectedDialogueData.id)) {
                setCompletedDialogues(__spreadArray(__spreadArray([], completedDialogues, true), [selectedDialogueData.id], false));
            }
        }
    };
    var resetDialogue = function () {
        setCurrentLineIndex(0);
    };
    var selectDialogue = function (id) {
        setSelectedDialogueId(id);
        setCurrentLineIndex(0);
    };
    if (!selectedDialogueId) {
        return (<Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MessageCircle className="h-6 w-6"/>
            संवाद अभ्यास (Dialogue Practice)
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-green-50">{dialogues.length} संवाद</Badge>
            <Badge variant="outline" className="bg-yellow-50">{completedDialogues.length} पूर्ण</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input placeholder="संवाद खोजें..." value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} className="pl-10"/>
            </div>
            <select value={difficulty} onChange={function (e) { return setDifficulty(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option value="all">सभी स्तर</option>
              <option value="beginner">शुरुआती</option>
              <option value="intermediate">मध्यम</option>
              <option value="advanced">उन्नत</option>
            </select>
            <select value={category} onChange={function (e) { return setCategory(e.target.value); }} className="px-3 py-2 border rounded-lg bg-background text-sm">
              {categories.map(function (cat) { return (<option key={cat} value={cat}>
                  {cat === "all" ? "सभी श्रेणी" : cat}
                </option>); })}
            </select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredDialogues.length} संवाद मिले
          </p>

          {/* Dialogues Grid */}
          <div className="grid gap-3 max-h-[500px] overflow-y-auto">
            {filteredDialogues.map(function (dialogue) { return (<div key={dialogue.id} onClick={function () { return selectDialogue(dialogue.id); }} className="p-4 border-2 rounded-xl cursor-pointer hover:border-blue-400 transition-all bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600"/>
                    <span className="font-bold">{dialogue.title}</span>
                    {completedDialogues.includes(dialogue.id) && (<CheckCircle className="h-4 w-4 text-green-500"/>)}
                  </div>
                  <Badge className={"".concat(dialogue.difficulty.toLowerCase() === "beginner" ? "bg-green-500" :
                    dialogue.difficulty.toLowerCase() === "intermediate" ? "bg-yellow-500" : "bg-red-500")}>
                    {dialogue.difficulty.toLowerCase() === "beginner" ? "शुरुआती" :
                    dialogue.difficulty.toLowerCase() === "intermediate" ? "मध्यम" : "उन्नत"}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-hindi mb-1">
                  {dialogue.hindiTitle}
                </p>
                <p className="text-sm text-muted-foreground">{dialogue.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{dialogue.category}</Badge>
                </div>
              </div>); })}
          </div>

          {filteredDialogues.length === 0 && (<div className="text-center py-8 text-muted-foreground">
              कोई संवाद नहीं मिला। अलग फ़िल्टर आज़माएं।
            </div>)}
        </CardContent>
      </Card>);
    }
    if (isLoadingDialogue || !selectedDialogueData) {
        return <div className="p-12 text-center animate-pulse">संवाद लोड हो रहा है...</div>;
    }
    var currentLine = selectedDialogueData.conversationLines[currentLineIndex];
    var isLastLine = currentLineIndex === selectedDialogueData.conversationLines.length - 1;
    return (<Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MessageCircle className="h-6 w-6"/>
            {selectedDialogueData.title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={function () { return setSelectedDialogueId(null); }}>
            वापस जाएं
          </Button>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-hindi">
          {selectedDialogueData.hindiTitle}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge>{selectedDialogueData.category}</Badge>
          <Badge variant="outline">
            {currentLineIndex + 1} / {selectedDialogueData.conversationLines.length}
          </Badge>
          <Button variant="ghost" size="sm" onClick={function () { return setShowTranslation(!showTranslation); }}>
            {showTranslation ? "अनुवाद छुपाएं" : "अनुवाद दिखाएं"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: "".concat(((currentLineIndex + 1) / selectedDialogueData.conversationLines.length) * 100, "%") }}/>
        </div>

        {/* Current Dialogue Line */}
        <div className="space-y-4">
          <div className={"p-4 rounded-xl ".concat(currentLine.speaker === selectedDialogueData.conversationLines[0].speaker
            ? "bg-blue-100 dark:bg-blue-900/30 ml-0 mr-12"
            : "bg-green-100 dark:bg-green-900/30 ml-12 mr-0")}>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4"/>
              <span className="font-bold">{currentLine.speaker}</span>
            </div>

            <p className="text-lg font-medium mb-2">{currentLine.englishText}</p>

            {showTranslation && (<p className="text-blue-700 dark:text-blue-300 font-hindi mb-2">
                {currentLine.hindiText}
              </p>)}

            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" onClick={function () { return speakText(currentLine.englishText || ""); }}>
                <Volume2 className="h-4 w-4 mr-1"/> सुनें
              </Button>
            </div>
          </div>
        </div>

        {/* Previous Lines (collapsed) */}
        {currentLineIndex > 0 && (<div className="space-y-2 opacity-60">
            <p className="text-sm font-medium text-muted-foreground">पिछली बातचीत:</p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedDialogueData.conversationLines.slice(0, currentLineIndex).map(function (line, idx) { return (<div key={idx} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium">{line.speaker}:</span> {line.englishText}
                </div>); })}
            </div>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetDialogue} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-1"/> शुरू से
          </Button>
          <Button onClick={nextLine} className="flex-1">
            {isLastLine ? (<>
                <CheckCircle className="h-4 w-4 mr-1"/> पूर्ण
              </>) : (<>
                अगला <ChevronRight className="h-4 w-4 ml-1"/>
              </>)}
          </Button>
        </div>

        {isLastLine && (<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2"/>
            <p className="font-bold text-green-700 dark:text-green-300">
              🎉 बधाई हो! आपने यह संवाद पूरा कर लिया!
            </p>
          </div>)}
      </CardContent>
    </Card>);
}
export default DialoguePractice;
