import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Volume2, Star, Brain, CheckCircle, XCircle, RotateCcw, Search } from "lucide-react";

interface VocabularyWord {
  id: number;
  english: string;
  hindi: string;
  pronunciation: string;
  partOfSpeech: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  synonyms: readonly string[];
  antonyms: readonly string[];
  examples: readonly { english: string; hindi: string }[];
  category: string;
  frequency: "common" | "moderate" | "rare";
}

import { advancedVocabularyData as vocabularyWords, AdvancedVocabularyItem } from "@/data/advancedVocabularyData";

export function VocabularyBuilder() {
  const [currentWord, setCurrentWord] = useState<AdvancedVocabularyItem | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [studiedWords, setStudiedWords] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const categories = ["all", "Appearance", "Quality", "Character", "Communication", "Emotion"];

  const filteredWords = vocabularyWords.filter(word => {
    const matchesDifficulty = difficulty === "all" || word.difficulty === difficulty;
    const matchesCategory = category === "all" || word.category === category;
    const matchesSearch = (word.word || word.english || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.hindi.includes(searchTerm);
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  const getRandomWord = () => {
    if (filteredWords.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    setCurrentWord(filteredWords[randomIndex]);
    setShowDetails(false);
    setUserAnswer("");
    setShowResult(false);
  };

  useEffect(() => {
    getRandomWord();
  }, [difficulty, category]);

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const markAsStudied = () => {
    if (currentWord && !studiedWords.includes(currentWord.id)) {
      setStudiedWords([...studiedWords, currentWord.id]);
    }
  };

  const checkQuizAnswer = () => {
    setShowResult(true);
    if (currentWord) markAsStudied();
  };

  if (!currentWord) {
    return (
      <Card className="border-2 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-6 text-center">
          <p>No words found for the selected filters.</p>
        </CardContent>
      </Card>
    );
  }

  const isCorrect = userAnswer.toLowerCase().trim() === currentWord.hindi.toLowerCase().trim();

  return (
    <Card className="border-2 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          <BookOpen className="h-6 w-6" />
          शब्द भंडार (Vocabulary Builder)
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{studiedWords.length} शब्द सीखे</Badge>
          <Badge className={`${currentWord.frequency === "common" ? "bg-green-500" :
            currentWord.frequency === "moderate" ? "bg-yellow-500" : "bg-red-500"
            }`}>
            {currentWord.frequency === "common" ? "आम" :
              currentWord.frequency === "moderate" ? "मध्यम" : "दुर्लभ"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="शब्द खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="all">सभी स्तर</option>
            <option value="beginner">शुरुआती</option>
            <option value="intermediate">मध्यम</option>
            <option value="advanced">उन्नत</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === "all" ? "सभी श्रेणी" : cat}
              </option>
            ))}
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
              <Button onClick={() => speakWord(currentWord.word || currentWord.english || '')} size="sm">
                <Volume2 className="h-4 w-4 mr-1" /> सुनें
              </Button>
              <Button
                onClick={() => setQuizMode(!quizMode)}
                variant={quizMode ? "default" : "outline"}
                size="sm"
              >
                <Brain className="h-4 w-4 mr-1" /> क्विज़
              </Button>
            </div>
          </div>

          {!quizMode && (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="text-2xl font-hindi text-orange-700 dark:text-orange-300">
                {currentWord.hindi}
              </div>
            </div>
          )}
        </div>

        {/* Quiz Mode */}
        {quizMode && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg mb-2">इस शब्द का हिंदी अर्थ क्या है?</p>
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="हिंदी में उत्तर लिखें..."
                className="text-center text-xl font-hindi"
                disabled={showResult}
              />
            </div>

            {showResult && (
              <div className={`p-4 rounded-xl border-2 ${isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                : "bg-red-50 dark:bg-red-900/20 border-red-300"
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-700">🎉 सही!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-bold text-red-700">सही उत्तर: {currentWord.hindi}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {!showResult ? (
                <Button onClick={checkQuizAnswer} disabled={!userAnswer.trim()} className="w-full">
                  जांचें
                </Button>
              ) : (
                <Button onClick={getRandomWord} className="w-full">
                  अगला शब्द
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Word Details */}
        {showDetails && !quizMode && (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">समानार्थी (Synonyms):</h4>
              <div className="flex flex-wrap gap-1">
                {currentWord.synonyms?.map((syn: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="bg-green-100 dark:bg-green-800">
                    {syn}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">विपरीतार्थी (Antonyms):</h4>
              <div className="flex flex-wrap gap-1">
                {currentWord.antonyms?.map((ant: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="bg-red-100 dark:bg-red-800">
                    {ant}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">उदाहरण (Examples):</h4>
              {currentWord.examples?.map((example: any, idx: number) => (
                <div key={idx} className="mb-2 p-2 bg-white dark:bg-slate-800 rounded">
                  <p className="font-medium">{example.english}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-hindi">{example.hindi}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            className="flex-1"
            disabled={quizMode}
          >
            {showDetails ? "छुपाएं" : "विस्तार"}
          </Button>
          <Button onClick={markAsStudied} variant="outline" className="flex-1">
            <Star className="h-4 w-4 mr-1" /> सीखा
          </Button>
          <Button onClick={getRandomWord} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-1" /> अगला
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default VocabularyBuilder;