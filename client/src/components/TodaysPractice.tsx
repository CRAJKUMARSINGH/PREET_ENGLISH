import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Sparkles, ArrowRight, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyTopic {
  id: number;
  title: string;
  hindiTitle: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  category: string;
}

const dailyTopics: DailyTopic[] = [
  { id: 1, title: "Talk about your Daily Routine", hindiTitle: "अपनी दिनचर्या के बारे में बोलें", emoji: "⏰", difficulty: "Easy", duration: "3-5 min", category: "Daily Life" },
  { id: 2, title: "Describe your Favorite Food", hindiTitle: "अपने पसंदीदा खाने के बारे में बताएं", emoji: "🍲", difficulty: "Easy", duration: "3-5 min", category: "Daily Life" },
  { id: 3, title: "Talk about your Family", hindiTitle: "अपने परिवार के बारे में बोलें", emoji: "👨‍👩‍👧‍👦", difficulty: "Easy", duration: "3-5 min", category: "Personal" },
  { id: 4, title: "Discuss Time Management", hindiTitle: "समय प्रबंधन पर चर्चा करें", emoji: "⏳", difficulty: "Medium", duration: "5-7 min", category: "Professional" },
  { id: 5, title: "Talk about Future Technology", hindiTitle: "भविष्य की तकनीक के बारे में बोलें", emoji: "🤖", difficulty: "Medium", duration: "5-7 min", category: "Technology" },
  { id: 6, title: "Discuss Environmental Issues", hindiTitle: "पर्यावरण की समस्याओं पर चर्चा करें", emoji: "🌍", difficulty: "Hard", duration: "7-10 min", category: "Global Issues" },
  { id: 7, title: "Practice: Tell me about yourself", hindiTitle: "अभ्यास: अपना परिचय दें", emoji: "👋", difficulty: "Hard", duration: "5-7 min", category: "Interview" },
];

export function TodaysPractice() {
  const [todayTopic, setTodayTopic] = useState<DailyTopic | null>(null);

  useEffect(() => {
    // Get topic based on day of year for consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const topicIndex = dayOfYear % dailyTopics.length;
    setTodayTopic(dailyTopics[topicIndex]);
  }, []);

  if (!todayTopic) return null;

  const difficultyConfig = {
    Easy: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', emoji: '😊' },
    Medium: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', emoji: '🙂' },
    Hard: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', emoji: '🧠' }
  };

  const config = difficultyConfig[todayTopic.difficulty];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 dark:from-primary/20 dark:via-accent/10 dark:to-primary/20 rounded-3xl border border-primary/20 dark:border-primary/30 p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl -ml-8 -mb-8" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-1.5 rounded-lg">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-primary">🔥 Today's Practice Topic</span>
          <span className="text-xs text-muted-foreground">आज का अभ्यास</span>
        </div>

        {/* Topic Card */}
        <div className="flex items-start gap-4">
          <span className="text-5xl">{todayTopic.emoji}</span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {todayTopic.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{todayTopic.hindiTitle}</p>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", config.color)}>
                {config.emoji} {todayTopic.difficulty === 'Easy' ? 'आसान' : todayTopic.difficulty === 'Medium' ? 'मध्यम' : 'कठिन'}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {todayTopic.duration}
              </span>
              <span className="text-xs text-muted-foreground">
                {todayTopic.category}
              </span>
            </div>

            <Link href="/speak">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4" />
                Start Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
