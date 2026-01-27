import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SpeakingTopicCard } from "@/components/SpeakingTopicCard";
import { Mic, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export default function SpeakingPractice() {
    var _a = useState('all'), selectedDifficulty = _a[0], setSelectedDifficulty = _a[1];
    var _b = useState('all'), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = useState(''), searchQuery = _c[0], setSearchQuery = _c[1];
    var _d = useQuery({
        queryKey: ["/api/speaking-topics"],
    }), _e = _d.data, speakingTopics = _e === void 0 ? [] : _e, isLoading = _d.isLoading;
    var categories = Array.from(new Set(speakingTopics.map(function (t) { return t.category; })));
    var filteredTopics = speakingTopics.filter(function (topic) {
        var _a;
        var matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
        var matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
        var matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ((_a = topic.hindiTitle) === null || _a === void 0 ? void 0 : _a.includes(searchQuery));
        return matchesDifficulty && matchesCategory && matchesSearch;
    });
    if (isLoading) {
        return (<Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>);
    }
    return (<Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl">
            <Mic className="h-8 w-8 text-white"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Speaking Practice</h1>
            <p className="text-muted-foreground">🧠 हिंदी में सोचो → 🗣️ English में बोलो</p>
          </div>
        </div>

        {/* Method Explanation */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">🎯 3-Step Speaking Method:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-200 dark:bg-amber-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-amber-800 dark:text-amber-200">1</span>
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-200">🧠 Think</p>
                <p className="text-sm text-amber-700 dark:text-amber-400">हिंदी में सोचें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-200 dark:bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-blue-800 dark:text-blue-200">2</span>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-200">🧩 Frame</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">English frames use करें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-purple-800 dark:text-purple-200">3</span>
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">🎤 Speak</p>
                <p className="text-sm text-purple-700 dark:text-purple-400">बिना डर के बोलें</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
          <input type="text" placeholder="Topic खोजें..." value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent"/>
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          {['all', 'Easy', 'Medium', 'Hard'].map(function (diff) { return (<button key={diff} onClick={function () { return setSelectedDifficulty(diff); }} className={cn("px-4 py-2 rounded-xl font-medium transition-all", selectedDifficulty === diff
                ? "bg-primary text-white"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700")}>
              {diff === 'all' ? 'सभी' : diff === 'Easy' ? '😊 आसान' : diff === 'Medium' ? '🙂 मध्यम' : '🧠 कठिन'}
            </button>); })}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={function () { return setSelectedCategory('all'); }} className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-all", selectedCategory === 'all'
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700")}>
          सभी Categories
        </button>
        {categories.map(function (cat) { return (<button key={cat} onClick={function () { return setSelectedCategory(cat); }} className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-all", selectedCategory === cat
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700")}>
            {cat}
          </button>); })}
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        {filteredTopics.map(function (topic) { return (<SpeakingTopicCard key={topic.id} {...topic} hindiThoughts={topic.hindiThoughts || []} sentenceFrames={topic.sentenceFrames || []}/>); })}

        {filteredTopics.length === 0 && (<div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p className="text-muted-foreground">कोई topic नहीं मिला</p>
          </div>)}
      </div>

      {/* Credits Footer */}
      <footer className="mt-12 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
        </div>
      </footer>
    </Layout>);
}
