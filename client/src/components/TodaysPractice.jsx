import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Sparkles, ArrowRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
var dailyTopics = [
    { id: 1, title: "Talk about your Daily Routine", hindiTitle: "अपनी दिनचर्या के बारे में बोलें", emoji: "⏰", difficulty: "Easy", duration: "3-5 min", category: "Daily Life" },
    { id: 2, title: "Describe your Favorite Food", hindiTitle: "अपने पसंदीदा खाने के बारे में बताएं", emoji: "🍲", difficulty: "Easy", duration: "3-5 min", category: "Daily Life" },
    { id: 3, title: "Talk about your Family", hindiTitle: "अपने परिवार के बारे में बोलें", emoji: "👨‍👩‍👧‍👦", difficulty: "Easy", duration: "3-5 min", category: "Personal" },
    { id: 4, title: "Discuss Time Management", hindiTitle: "समय प्रबंधन पर चर्चा करें", emoji: "⏳", difficulty: "Medium", duration: "5-7 min", category: "Professional" },
    { id: 5, title: "Talk about Future Technology", hindiTitle: "भविष्य की तकनीक के बारे में बोलें", emoji: "🤖", difficulty: "Medium", duration: "5-7 min", category: "Technology" },
    { id: 6, title: "Discuss Environmental Issues", hindiTitle: "पर्यावरण की समस्याओं पर चर्चा करें", emoji: "🌍", difficulty: "Hard", duration: "7-10 min", category: "Global Issues" },
    { id: 7, title: "Practice: Tell me about yourself", hindiTitle: "अभ्यास: अपना परिचय दें", emoji: "👋", difficulty: "Hard", duration: "5-7 min", category: "Interview" },
];
export function TodaysPractice() {
    var _a = useState(null), todayTopic = _a[0], setTodayTopic = _a[1];
    useEffect(function () {
        // Get topic based on day of year for consistency
        var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        var topicIndex = dayOfYear % dailyTopics.length;
        setTodayTopic(dailyTopics[topicIndex]);
    }, []);
    if (!todayTopic)
        return null;
    var difficultyConfig = {
        Easy: { color: 'bg-green-100 text-green-700 border-green-200', emoji: '😊' },
        Medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', emoji: '🙂' },
        Hard: { color: 'bg-red-100 text-red-700 border-red-200', emoji: '🧠' }
    };
    var config = difficultyConfig[todayTopic.difficulty];
    return (<div className="relative overflow-hidden w-full h-full bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-primary/20 dark:via-secondary dark:to-primary/10 rounded-[2rem] border border-primary/20 p-8 group">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700"/>

      <div className="relative z-10 flex flex-col h-full justify-center items-center">
        <div className="inline-flex items-center gap-2 mb-6 bg-white dark:bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/10 shadow-sm">
          <Calendar className="w-4 h-4 text-primary"/>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Daily Practice</span>
        </div>

        <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 drop-shadow-2xl filter">
          {todayTopic.emoji}
        </div>

        <h3 className="text-2xl font-black text-center text-foreground mb-2 leading-tight">
          {todayTopic.title}
        </h3>
        <p className="text-base text-muted-foreground text-center mb-6 font-medium">{todayTopic.hindiTitle}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5", config.color)}>
            {config.emoji} {todayTopic.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border">
            <Clock className="w-3 h-3"/>
            {todayTopic.duration}
          </span>
        </div>

        <Link href="/speak">
          <button className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl overflow-hidden shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50">
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"/>
            <Sparkles className="w-4 h-4"/>
            Start Practice
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"/>
          </button>
        </Link>
      </div>
    </div>);
}
