import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Mic, 
  MessageSquare, 
  Brain, 
  Star,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Import all data types
import { dialogues } from "@/data/hindiDialoguesData";
import { stories } from "@/data/hindiStoriesData";
import { commonPhrases } from "@/data/hindiCommonPhrasesData";
import { speakingTopics } from "@/data/speakingTopics";
import { listeningLessons } from "@/data/hindiListeningData";
import { rolePlayScenarios } from "@/data/hindiRolePlayData";

interface SearchableContent {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'easy' | 'medium' | 'hard';
  type: 'dialogue' | 'story' | 'phrase' | 'speaking' | 'listening' | 'roleplay';
  tags: string[];
  content: string;
  estimatedTime?: number; // in minutes
  rating?: number;
  popularity?: number;
}

interface ContentSearchSystemProps {
  onContentSelect?: (content: SearchableContent) => void;
  showFilters?: boolean;
  maxResults?: number;
  defaultTab?: string;
}

export function ContentSearchSystem({
  onContentSelect,
  showFilters = true,
  maxResults = 50,
  defaultTab = 'all'
}: ContentSearchSystemProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'relevance' | 'difficulty' | 'popularity' | 'recent'>('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Transform all data into searchable format
  const allContent = useMemo(() => {
    const content: SearchableContent[] = [];

    // Add dialogues
    dialogues.forEach(dialogue => {
      content.push({
        id: `dialogue-${dialogue.id}`,
        title: dialogue.title,
        titleHindi: dialogue.titleHindi,
        description: dialogue.scenario,
        category: dialogue.category,
        difficulty: dialogue.difficulty,
        type: 'dialogue',
        tags: [dialogue.category.toLowerCase(), 'conversation', 'practice'],
        content: dialogue.lines.map(line => `${line.english} ${line.hindi}`).join(' '),
        estimatedTime: Math.ceil(dialogue.lines.length * 0.5),
        rating: 4.5,
        popularity: Math.random() * 100,
      });
    });

    // Add stories
    stories.forEach(story => {
      content.push({
        id: `story-${story.id}`,
        title: story.title,
        titleHindi: story.titleHindi,
        description: story.moral,
        category: story.category,
        difficulty: story.level,
        type: 'story',
        tags: [story.category.toLowerCase(), 'reading', 'moral', 'vocabulary'],
        content: story.paragraphs.map(p => `${p.english} ${p.hindi}`).join(' '),
        estimatedTime: Math.ceil(story.paragraphs.length * 2),
        rating: 4.7,
        popularity: Math.random() * 100,
      });
    });

    // Add common phrases
    commonPhrases.forEach(phrase => {
      content.push({
        id: `phrase-${phrase.id}`,
        title: phrase.english,
        titleHindi: phrase.hindi,
        description: phrase.usage,
        category: phrase.category,
        difficulty: phrase.difficulty,
        type: 'phrase',
        tags: [phrase.category.toLowerCase(), 'phrases', 'daily', 'practical'],
        content: `${phrase.english} ${phrase.hindi} ${phrase.usage} ${phrase.example}`,
        estimatedTime: 1,
        rating: 4.3,
        popularity: Math.random() * 100,
      });
    });

    // Add speaking topics
    speakingTopics.forEach(topic => {
      content.push({
        id: `speaking-${topic.id}`,
        title: topic.title,
        titleHindi: topic.hindiTitle,
        description: topic.freePrompt,
        category: topic.category,
        difficulty: topic.difficulty.toLowerCase() as any,
        type: 'speaking',
        tags: [topic.category.toLowerCase(), 'speaking', 'practice', 'confidence'],
        content: `${topic.title} ${topic.hindiTitle} ${topic.hindiThoughts.join(' ')} ${topic.sentenceFrames.join(' ')}`,
        estimatedTime: 5,
        rating: 4.6,
        popularity: Math.random() * 100,
      });
    });

    // Add listening lessons
    listeningLessons.forEach(lesson => {
      content.push({
        id: `listening-${lesson.id}`,
        title: lesson.title,
        titleHindi: lesson.titleHindi,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        type: 'listening',
        tags: [lesson.category.toLowerCase(), 'listening', 'audio', 'comprehension'],
        content: `${lesson.title} ${lesson.audioText} ${lesson.audioTextHindi}`,
        estimatedTime: parseInt(lesson.duration.split(':')[0]) || 3,
        rating: 4.4,
        popularity: Math.random() * 100,
      });
    });

    // Add role play scenarios
    rolePlayScenarios.forEach(scenario => {
      content.push({
        id: `roleplay-${scenario.id}`,
        title: scenario.title,
        titleHindi: scenario.titleHindi,
        description: scenario.situation,
        category: scenario.category,
        difficulty: scenario.difficulty,
        type: 'roleplay',
        tags: [scenario.category.toLowerCase(), 'roleplay', 'interactive', 'conversation'],
        content: `${scenario.title} ${scenario.situation} ${scenario.exchanges.map(e => e.prompt).join(' ')}`,
        estimatedTime: Math.ceil(scenario.exchanges.length * 0.8),
        rating: 4.8,
        popularity: Math.random() * 100,
      });
    });

    return content;
  }, []);

  // Filter and search content
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.titleHindi.includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'easy': 1, 'intermediate': 2, 'medium': 2, 'advanced': 3, 'hard': 3 };
          return (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2);
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'recent':
          return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
        default: // relevance
          if (searchQuery.trim()) {
            const aScore = getRelevanceScore(a, searchQuery);
            const bScore = getRelevanceScore(b, searchQuery);
            return bScore - aScore;
          }
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return filtered.slice(0, maxResults);
  }, [allContent, searchQuery, selectedCategory, selectedDifficulty, selectedType, sortBy, maxResults]);

  const getRelevanceScore = (item: SearchableContent, query: string): number => {
    const q = query.toLowerCase();
    let score = 0;
    
    if (item.title.toLowerCase().includes(q)) score += 10;
    if (item.titleHindi.includes(q)) score += 8;
    if (item.description.toLowerCase().includes(q)) score += 5;
    if (item.tags.some(tag => tag.includes(q))) score += 3;
    if (item.content.toLowerCase().includes(q)) score += 1;
    
    return score;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dialogue': return <MessageSquare className="h-4 w-4" />;
      case 'story': return <BookOpen className="h-4 w-4" />;
      case 'phrase': return <Zap className="h-4 w-4" />;
      case 'speaking': return <Mic className="h-4 w-4" />;
      case 'listening': return <Users className="h-4 w-4" />;
      case 'roleplay': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced':
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const categories = Array.from(new Set(allContent.map(item => item.category)));
  const difficulties = Array.from(new Set(allContent.map(item => item.difficulty)));
  const types = Array.from(new Set(allContent.map(item => item.type)));

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-emerald-500" />
            Content Search & Discovery
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Search through 1,406+ learning materials across all categories
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Main Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons, stories, phrases, topics... (English or Hindi)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showAdvancedFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            {/* Quick filter buttons */}
            {['beginner', 'intermediate', 'advanced'].map(diff => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? 'all' : diff)}
              >
                {diff}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
              >
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Content Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background"
                  >
                    <option value="all">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 rounded-md border bg-background"
                  >
                    <option value="all">All Levels</option>
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-2 rounded-md border bg-background"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="popularity">Popularity</option>
                    <option value="recent">Most Recent</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredContent.length} results found
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <div className="flex items-center gap-4">
              <span>Total: {allContent.length} items</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                className="glass-card hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onContentSelect?.(item)}
              >
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                        {getTypeIcon(item.type)}
                      </div>
                      <Badge className={cn("text-xs", getDifficultyColor(item.difficulty))}>
                        {item.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.estimatedTime}m
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.titleHindi}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs">{item.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredContent.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
                setSelectedType("all");
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}