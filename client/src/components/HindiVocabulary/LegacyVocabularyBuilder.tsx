import React from "react";
import { useState } from "react";
import { Volume2, BookOpen, Star, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabularyWord {
  english: string;
  hindi: string;
  emoji: string;
  pronunciation: string;
  example?: string;
}

interface VocabularyCategory {
  id: string;
  title: string;
  hindiTitle: string;
  emoji: string;
  words: VocabularyWord[];
}

import { legacyVocabularyData as vocabularyData } from "@/data/legacyVocabularyData";

export function LegacyVocabularyBuilder() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("daily_routine");
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleLearned = (wordId: string) => {
    const newLearned = new Set(learnedWords);
    if (newLearned.has(wordId)) {
      newLearned.delete(wordId);
    } else {
      newLearned.add(wordId);
    }
    setLearnedWords(newLearned);
  };

  const totalWords = vocabularyData.reduce((acc, cat) => acc + cat.words.length, 0);
  const learnedCount = learnedWords.size;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Vocabulary Builder</h2>
            <p className="text-blue-100">शब्दावली निर्माता</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/20 rounded-xl p-3">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{learnedCount} / {totalWords} words</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(learnedCount / totalWords) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {vocabularyData.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.hindiTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{category.words.length} words</span>
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Words List */}
            {expandedCategory === category.id && (
              <div className="px-4 pb-4 space-y-2">
                {category.words.map((word, index) => {
                  const wordId = `${category.id}-${index}`;
                  const isLearned = learnedWords.has(wordId);

                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-xl border transition-all",
                        isLearned
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{word.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 dark:text-white">{word.english}</span>
                              <button
                                onClick={() => speakWord(word.english)}
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                              >
                                <Volume2 className="w-4 h-4 text-blue-500" />
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground">{word.hindi}</p>
                            <p className="text-xs text-slate-400 italic">({word.pronunciation})</p>
                            {word.example && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded">
                                "{word.example}"
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleLearned(wordId)}
                          className={cn(
                            "p-2 rounded-full transition-all",
                            isLearned
                              ? "bg-green-500 text-white"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-400 hover:bg-yellow-100 hover:text-yellow-500"
                          )}
                        >
                          <Star className={cn("w-4 h-4", isLearned && "fill-current")} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



{/* हिंदी सहायता / Hindi Support */}
{/* यह घटक हिंदी भाषी उपयोगकर्ताओं के लिए डिज़ाइन किया गया है */}
{/* This component is designed for Hindi-speaking users */}
export default LegacyVocabularyBuilder;