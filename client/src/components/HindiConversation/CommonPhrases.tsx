import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Volume2, Search, Star, CheckCircle, Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Vocabulary } from "@shared/schema";

export function CommonPhrases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { data: commonPhrases = [], isLoading } = useQuery<Vocabulary[]>({
    queryKey: ["/api/vocabulary/category/Common Phrases"],
  });

  const getCategories = () => {
    // We don't have sub-categories in the DB the same way as before, 
    // but the seed script prepended them to the title of the lesson.
    // However, the vocabulary doesn't know its sub-category. 
    // For now, let's just use all words as a single list or add sub-categories back if needed.
    // Actually, in seed script:
    // title: `Essential Phrases: ${category}`,
    // So the category is in the lesson title.
    return Array.from(new Set(commonPhrases.map(p => "General"))); // Placeholder
  };

  const categories = ["all"];

  const getFilteredPhrases = (): Vocabulary[] => {
    let filtered = commonPhrases;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.hindiTranslation?.includes(searchTerm) ||
        p.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filtering is disabled for now since it's not in the DB
    /*
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    */

    if (showFavoritesOnly) {
      filtered = filtered.filter(p => favorites.includes(p.id));
    }

    return filtered;
  };

  const filteredPhrases = getFilteredPhrases();

  const speakPhrase = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const copyPhrase = (phrase: Vocabulary) => {
    navigator.clipboard.writeText(`${phrase.word}\n${phrase.hindiTranslation}`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Greetings": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      "Polite Expressions": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      "Asking for Help": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      "Shopping": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      "Restaurant": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      "Travel": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
      "Health": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      "Work": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      "Emergency": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
      "Social": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      "Opinions": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
      "Time": "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500 text-white";
      case "intermediate": return "bg-yellow-500 text-white";
      case "advanced": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="border-2 border-green-200 dark:border-green-800">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <MessageSquare className="h-6 w-6" />
          आम वाक्यांश (Common Phrases) - {commonPhrases.length}+ वाक्यांश
        </CardTitle>
        <p className="text-sm text-green-600 dark:text-green-400">
          रोज़मर्रा की बातचीत के लिए उपयोगी वाक्यांश - हिंदी भाषियों के लिए
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="वाक्यांश खोजें (English या हिंदी)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="all">सभी श्रेणी</option>
            {categories.filter(c => c !== "all").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="all">सभी स्तर</option>
            <option value="beginner">शुरुआती</option>
            <option value="intermediate">मध्यम</option>
            <option value="advanced">उन्नत</option>
          </select>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Badge variant="outline">{filteredPhrases.length} वाक्यांश</Badge>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Star className={`h-3 w-3 mr-1 ${showFavoritesOnly ? "fill-white" : "fill-yellow-500 text-yellow-500"}`} />
            {favorites.length} पसंदीदा
          </Button>
        </div>

        {/* Phrases List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {filteredPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="p-4 border-2 rounded-xl bg-white dark:bg-slate-800 hover:border-green-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    Common Phrase
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(phrase.id)}
                  >
                    <Star className={`h-4 w-4 ${favorites.includes(phrase.id)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-400"
                      }`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyPhrase(phrase)}
                  >
                    {copiedId === phrase.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">{phrase.word}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakPhrase(phrase.word)}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-green-700 dark:text-green-300 font-hindi text-lg">
                  {phrase.hindiTranslation}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  🔊 {phrase.pronunciation}
                </p>
                <div className="pt-2 border-t mt-2 space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <strong>उपयोग:</strong> {phrase.usageHindi || phrase.definition}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>उदाहरण:</strong> {phrase.example}
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-300 font-hindi">
                    {phrase.exampleHindi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            कोई वाक्यांश नहीं मिला। अलग खोज शब्द आज़माएं।
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export default CommonPhrases;