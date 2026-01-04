import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Volume2, User, Users, ChevronRight, RotateCcw, CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { dialogues, Dialogue } from "@/data/hindiDialoguesData";

export function DialoguePractice() {
  const [selectedDialogue, setSelectedDialogue] = useState<Dialogue | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [completedDialogues, setCompletedDialogues] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["all", "Daily Life", "Restaurant", "Shopping", "Healthcare", "Travel", "Banking", "Professional", "Education", "Social", "Emergency", "Government", "Technology", "Weather", "Hobbies", "Services", "Family", "Entertainment", "Sports", "Health", "Culture", "Housing", "Religion", "Finance", "Food"];

  const filteredDialogues = dialogues.filter(d => {
    const matchesDifficulty = difficulty === "all" || d.difficulty === difficulty;
    const matchesCategory = category === "all" || d.category === category;
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         d.titleHindi.includes(searchTerm) ||
                         d.scenario.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const nextLine = () => {
    if (selectedDialogue && currentLineIndex < selectedDialogue.lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    } else if (selectedDialogue) {
      if (!completedDialogues.includes(selectedDialogue.id)) {
        setCompletedDialogues([...completedDialogues, selectedDialogue.id]);
      }
    }
  };

  const resetDialogue = () => {
    setCurrentLineIndex(0);
  };

  const selectDialogue = (dialogue: Dialogue) => {
    setSelectedDialogue(dialogue);
    setCurrentLineIndex(0);
  };

  if (!selectedDialogue) {
    return (
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MessageCircle className="h-6 w-6" />
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="संवाद खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
              className="px-3 py-2 border rounded-lg bg-background text-sm"
            >
              <option value="all">सभी स्तर</option>
              <option value="beginner">शुरुआती</option>
              <option value="intermediate">मध्यम</option>
              <option value="advanced">उन्नत</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "सभी श्रेणी" : cat}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredDialogues.length} संवाद मिले
          </p>

          {/* Dialogues Grid */}
          <div className="grid gap-3 max-h-[500px] overflow-y-auto">
            {filteredDialogues.map((dialogue) => (
              <div
                key={dialogue.id}
                onClick={() => selectDialogue(dialogue)}
                className="p-4 border-2 rounded-xl cursor-pointer hover:border-blue-400 transition-all bg-white dark:bg-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold">{dialogue.title}</span>
                    {completedDialogues.includes(dialogue.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <Badge className={`${
                    dialogue.difficulty === "beginner" ? "bg-green-500" :
                    dialogue.difficulty === "intermediate" ? "bg-yellow-500" : "bg-red-500"
                  }`}>
                    {dialogue.difficulty === "beginner" ? "शुरुआती" :
                     dialogue.difficulty === "intermediate" ? "मध्यम" : "उन्नत"}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-hindi mb-1">
                  {dialogue.titleHindi}
                </p>
                <p className="text-sm text-muted-foreground">{dialogue.scenario}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{dialogue.category}</Badge>
                  <Badge variant="outline">{dialogue.lines.length} वाक्य</Badge>
                </div>
              </div>
            ))}
          </div>

          {filteredDialogues.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              कोई संवाद नहीं मिला। अलग फ़िल्टर आज़माएं।
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const currentLine = selectedDialogue.lines[currentLineIndex];
  const isLastLine = currentLineIndex === selectedDialogue.lines.length - 1;

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <MessageCircle className="h-6 w-6" />
            {selectedDialogue.title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setSelectedDialogue(null)}>
            वापस जाएं
          </Button>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-hindi">
          {selectedDialogue.titleHindi} - {selectedDialogue.scenarioHindi}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge>{selectedDialogue.category}</Badge>
          <Badge variant="outline">
            {currentLineIndex + 1} / {selectedDialogue.lines.length}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? "अनुवाद छुपाएं" : "अनुवाद दिखाएं"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentLineIndex + 1) / selectedDialogue.lines.length) * 100}%` }}
          />
        </div>

        {/* Current Dialogue Line */}
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${
            currentLine.speaker === selectedDialogue.lines[0].speaker
              ? "bg-blue-100 dark:bg-blue-900/30 ml-0 mr-12"
              : "bg-green-100 dark:bg-green-900/30 ml-12 mr-0"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              <span className="font-bold">{currentLine.speaker}</span>
              <span className="text-sm text-muted-foreground font-hindi">
                ({currentLine.speakerHindi})
              </span>
            </div>
            
            <p className="text-lg font-medium mb-2">{currentLine.english}</p>
            
            {showTranslation && (
              <p className="text-blue-700 dark:text-blue-300 font-hindi mb-2">
                {currentLine.hindi}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" onClick={() => speakText(currentLine.english)}>
                <Volume2 className="h-4 w-4 mr-1" /> सुनें
              </Button>
              <span className="text-xs text-muted-foreground italic">
                {currentLine.pronunciation}
              </span>
            </div>
          </div>
        </div>

        {/* Previous Lines (collapsed) */}
        {currentLineIndex > 0 && (
          <div className="space-y-2 opacity-60">
            <p className="text-sm font-medium text-muted-foreground">पिछली बातचीत:</p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedDialogue.lines.slice(0, currentLineIndex).map((line, idx) => (
                <div key={idx} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium">{line.speaker}:</span> {line.english}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetDialogue} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-1" /> शुरू से
          </Button>
          <Button onClick={nextLine} className="flex-1">
            {isLastLine ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" /> पूर्ण
              </>
            ) : (
              <>
                अगला <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {isLastLine && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="font-bold text-green-700 dark:text-green-300">
              🎉 बधाई हो! आपने यह संवाद पूरा कर लिया!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DialoguePractice;