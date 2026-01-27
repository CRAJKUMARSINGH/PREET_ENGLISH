import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Volume2, ChevronLeft, ChevronRight, Lightbulb, Star, Search } from "lucide-react";
import { stories, storyCategories } from "@/data/hindiStoriesData";
export function StoryReader() {
    var _a = useState(null), selectedStory = _a[0], setSelectedStory = _a[1];
    var _b = useState(0), currentParagraph = _b[0], setCurrentParagraph = _b[1];
    var _c = useState(true), showHindi = _c[0], setShowHindi = _c[1];
    var _d = useState(true), showVocabulary = _d[0], setShowVocabulary = _d[1];
    var _e = useState(""), searchTerm = _e[0], setSearchTerm = _e[1];
    var _f = useState("all"), selectedLevel = _f[0], setSelectedLevel = _f[1];
    var _g = useState("All Stories"), selectedCategory = _g[0], setSelectedCategory = _g[1];
    var _h = useState(0), currentPage = _h[0], setCurrentPage = _h[1];
    var storiesPerPage = 12;
    var filteredStories = stories.filter(function (story) {
        var matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.titleHindi.includes(searchTerm);
        var matchesLevel = selectedLevel === "all" || story.level === selectedLevel;
        var matchesCategory = selectedCategory === "All Stories" || story.category === selectedCategory;
        return matchesSearch && matchesLevel && matchesCategory;
    });
    var totalPages = Math.ceil(filteredStories.length / storiesPerPage);
    var paginatedStories = filteredStories.slice(currentPage * storiesPerPage, (currentPage + 1) * storiesPerPage);
    var speakText = function (text) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    if (!selectedStory) {
        return (<Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <BookOpen className="h-6 w-6"/>
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <Input placeholder="कहानी खोजें... (Search stories)" value={searchTerm} onChange={function (e) { }} className="pl-10"/>
            </div>
            <div className="flex gap-2">
              <select value={selectedLevel} onChange={function (e) { }} className="px-3 py-2 border rounded-lg bg-background">
                <option value="all">सभी स्तर</option>
                <option value="beginner">शुरुआती</option>
                <option value="intermediate">मध्यम</option>
                <option value="advanced">उन्नत</option>
              </select>
              <select value={selectedCategory} onChange={function (e) { }} className="px-3 py-2 border rounded-lg bg-background">
                {storyCategories.map(function (cat) { return (<option key={cat} value={cat}>{cat}</option>); })}
              </select>
            </div>
          </div>
          {
            /* Stories Grid */ }
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedStories.map(function (story) { return (<div key={story.id} onClick={function () {
                    setSelectedStory(story);
                    setCurrentParagraph(0);
                }} className="p-4 border-2 border-orange-100 dark:border-orange-800 rounded-xl hover:border-orange-300 dark:hover:border-orange-600 cursor-pointer transition-all hover:shadow-lg">
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
              </div>); })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (<div className="flex items-center justify-center gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={function () { return setCurrentPage(Math.max(0, currentPage - 1)); }} disabled={currentPage === 0}>
                ← पिछला
              </Button>
              <span className="text-sm text-muted-foreground">
                पृष्ठ {currentPage + 1} / {totalPages}
              </span>
              <Button variant="outline" size="sm" onClick={function () { return setCurrentPage(Math.min(totalPages - 1, currentPage + 1)); }} disabled={currentPage === totalPages - 1}>
                अगला →
              </Button>
            </div>)}
        </CardContent>
      </Card>);
    }
    var paragraph = selectedStory.paragraphs[currentParagraph];
    return (<Card className="border-2 border-orange-200 dark:border-orange-800">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-orange-700 dark:text-orange-300">{selectedStory.title}</CardTitle>
            <p className="text-orange-600 dark:text-orange-400 font-hindi">{selectedStory.titleHindi}</p>
          </div>
          <Button variant="outline" size="sm" onClick={function () { return setSelectedStory(null); }}>
            ← Back
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant={showHindi ? "default" : "outline"} size="sm" onClick={function () { return setShowHindi(!showHindi); }}>
            हिंदी {showHindi ? "✓" : ""}
          </Button>
          <Button variant={showVocabulary ? "default" : "outline"} size="sm" onClick={function () { return setShowVocabulary(!showVocabulary); }}>
            शब्दावली {showVocabulary ? "✓" : ""}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Paragraph {currentParagraph + 1} of {selectedStory.paragraphs.length}</span>
          <div className="flex-1 h-2 bg-orange-100 dark:bg-orange-900 rounded-full">
            <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: "".concat(((currentParagraph + 1) / selectedStory.paragraphs.length) * 100, "%") }}/>
          </div>
        </div>

        {/* English Text */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">English</span>
            <Button variant="ghost" size="sm" onClick={function () { return speakText(paragraph.english); }}>
              <Volume2 className="h-4 w-4"/>
            </Button>
          </div>
          <p className="text-lg leading-relaxed">{paragraph.english}</p>
        </div>

        {/* Hindi Translation */}
        {showHindi && (<div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">हिंदी अनुवाद</span>
            <p className="text-lg leading-relaxed mt-2 font-hindi">{paragraph.hindi}</p>
          </div>)}

        {/* Vocabulary */}
        {showVocabulary && paragraph.vocabulary.length > 0 && (<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-green-600"/>
              <span className="font-medium text-green-700 dark:text-green-300">नए शब्द (New Words)</span>
            </div>
            <div className="grid gap-2">
              {paragraph.vocabulary.map(function (vocab, idx) { return (<div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-lg">
                  <Button variant="ghost" size="sm" onClick={function () { return speakText(vocab.word); }}>
                    <Volume2 className="h-3 w-3"/>
                  </Button>
                  <span className="font-bold text-green-700 dark:text-green-300">{vocab.word}</span>
                  <span className="text-muted-foreground">- {vocab.meaning}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-hindi ml-auto">({vocab.hindiMeaning})</span>
                </div>); })}
            </div>
          </div>)}

        {/* Moral (on last paragraph) */}
        {currentParagraph === selectedStory.paragraphs.length - 1 && (<div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-purple-600"/>
              <span className="font-bold text-purple-700 dark:text-purple-300">Moral / सीख</span>
            </div>
            <p className="text-purple-700 dark:text-purple-300">{selectedStory.moral}</p>
            <p className="text-purple-600 dark:text-purple-400 font-hindi mt-1">{selectedStory.moralHindi}</p>
          </div>)}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={function () { return setCurrentParagraph(Math.max(0, currentParagraph - 1)); }} disabled={currentParagraph === 0}>
            <ChevronLeft className="h-4 w-4 mr-1"/> पिछला
          </Button>
          <Button onClick={function () { return setCurrentParagraph(Math.min(selectedStory.paragraphs.length - 1, currentParagraph + 1)); }} disabled={currentParagraph === selectedStory.paragraphs.length - 1}>
            अगला <ChevronRight className="h-4 w-4 ml-1"/>
          </Button>
        </div>
      </CardContent>
    </Card>);
}
export default StoryReader;
