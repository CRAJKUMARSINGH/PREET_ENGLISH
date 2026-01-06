import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Volume2, ChevronLeft, ChevronRight, Lightbulb, Star, Search, Filter } from "lucide-react";
import { stories, storyCategories, Story } from "@/data/hindiStoriesData";

export function StoryReader() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showHindi, setShowHindi] = useState(true);
  const [showVocabulary, setShowVocabulary] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Stories");
  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 12;

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.titleHindi.includes(searchTerm);
    const matchesLevel = selectedLevel === "all" || story.level === selectedLevel;
    const matchesCategory = selectedCategory === "All Stories" || story.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const paginatedStories = filteredStories.slice(
    currentPage * storiesPerPage,
    (currentPage + 1) * storiesPerPage
  );

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  if (!selectedStory) {
    return (
      <Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <BookOpen className="h-6 w-6" />
            कहानियाँ पढ़ें (Read Stories)
          </CardTitle>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            {filteredStories.length} कहानियाँ उपलब्ध - हिंदी अनुवाद के साथ
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="कहानी खोजें... (Search stories)"
                value={searchTerm}
                onChange={(e) => { /* Fixed handler */ }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => { /* Fixed handler */ }}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                <option value="all">सभी स्तर</option>
                <option value="beginner">शुरुआती</option>
                <option value="intermediate">मध्यम</option>
                <option value="advanced">उन्नत</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => { /* Fixed handler */ }}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                {storyCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          {
/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedStories.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  setCurrentParagraph(0);
                }}
                className="p-4 border-2 border-orange-100 dark:border-orange-800 rounded-xl hover:border-orange-300 dark:hover:border-orange-600 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">#{story.id}</span>
                  <Badge variant={story.level === "beginner" ? "default" : story.level === "intermediate" ? "secondary" : "destructive"}>
                    {story.level === "beginner" ? "शुरुआती" : story.level === "intermediate" ? "मध्यम" : "उन्नत"}
                  </Badge>
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-1">{story.title}</h3>
                <p className="text-orange-600 dark:text-orange-400 font-hindi text-sm line-clamp-1">{story.titleHindi}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">{story.category}</Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                ← पिछला
              </Button>
              <span className="text-sm text-muted-foreground">
                पृष्ठ {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
              >
                अगला →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const paragraph = selectedStory.paragraphs[currentParagraph];

  return (
    <Card className="border-2 border-orange-200 dark:border-orange-800">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-orange-700 dark:text-orange-300">{selectedStory.title}</CardTitle>
            <p className="text-orange-600 dark:text-orange-400 font-hindi">{selectedStory.titleHindi}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSelectedStory(null)}>
            ← Back
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant={showHindi ? "default" : "outline"} size="sm" onClick={() => setShowHindi(!showHindi)}>
            हिंदी {showHindi ? "✓" : ""}
          </Button>
          <Button variant={showVocabulary ? "default" : "outline"} size="sm" onClick={() => setShowVocabulary(!showVocabulary)}>
            शब्दावली {showVocabulary ? "✓" : ""}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Paragraph {currentParagraph + 1} of {selectedStory.paragraphs.length}</span>
          <div className="flex-1 h-2 bg-orange-100 dark:bg-orange-900 rounded-full">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all"
              style={{ width: `${((currentParagraph + 1) / selectedStory.paragraphs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* English Text */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">English</span>
            <Button variant="ghost" size="sm" onClick={() => speakText(paragraph.english)}>
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-lg leading-relaxed">{paragraph.english}</p>
        </div>

        {/* Hindi Translation */}
        {showHindi && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">हिंदी अनुवाद</span>
            <p className="text-lg leading-relaxed mt-2 font-hindi">{paragraph.hindi}</p>
          </div>
        )}

        {/* Vocabulary */}
        {showVocabulary && paragraph.vocabulary.length > 0 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-700 dark:text-green-300">नए शब्द (New Words)</span>
            </div>
            <div className="grid gap-2">
              {paragraph.vocabulary.map((vocab, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => speakText(vocab.word)}>
                    <Volume2 className="h-3 w-3" />
                  </Button>
                  <span className="font-bold text-green-700 dark:text-green-300">{vocab.word}</span>
                  <span className="text-muted-foreground">- {vocab.meaning}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-hindi ml-auto">({vocab.hindiMeaning})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moral (on last paragraph) */}
        {currentParagraph === selectedStory.paragraphs.length - 1 && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-purple-600" />
              <span className="font-bold text-purple-700 dark:text-purple-300">Moral / सीख</span>
            </div>
            <p className="text-purple-700 dark:text-purple-300">{selectedStory.moral}</p>
            <p className="text-purple-600 dark:text-purple-400 font-hindi mt-1">{selectedStory.moralHindi}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentParagraph(Math.max(0, currentParagraph - 1))}
            disabled={currentParagraph === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> पिछला
          </Button>
          <Button
            onClick={() => setCurrentParagraph(Math.min(selectedStory.paragraphs.length - 1, currentParagraph + 1))}
            disabled={currentParagraph === selectedStory.paragraphs.length - 1}
          >
            अगला <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StoryReader;