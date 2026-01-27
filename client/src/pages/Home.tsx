import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { LessonCard } from "@/components/LessonCard";
import { StreakCard } from "@/components/StreakCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { ScenarioCard } from "@/components/ScenarioCard";
import { SaraswatiMascot } from "@/components/SaraswatiMascot";
import { CertificationCard } from "@/components/CertificationCard";
import { ResourcesSection } from "@/components/ResourcesSection";
import { TodaysPractice } from "@/components/TodaysPractice";
import { AITutor } from "@/components/AITutor";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HindiStoryCard } from "@/components/HindiStoryCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { useUserStats, useDailyGoal, useLeaderboard } from "@/hooks/use-gamification";
import { hindiStoriesData } from "@/data/hindiStoriesData";
import {
  Sparkles,
  BookOpen,
  Mic,
  CheckCircle,
  Loader2,
  Trophy,
  Crown,
  ArrowRight,
  Globe,
  Play,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "wouter";
import { WelcomeTutorial } from "@/components/WelcomeTutorial";

export default function Home() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: userStats } = useUserStats();
  const { data: dailyGoal } = useDailyGoal();
  const { data: leaderboard } = useLeaderboard();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'lessons' | 'scenarios' | 'stories'>('lessons');

  const isLoading = lessonsLoading || progressLoading;

  // Simple progress calculation
  const completedCount = progress?.filter((p: any) => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Fallback data logic
  const effectiveUserStats = userStats
    ? {
      currentStreak: Number(userStats.currentStreak ?? 0),
      longestStreak: Number(userStats.longestStreak ?? 0),
      xpPoints: Number(userStats.xpPoints ?? 0),
      level: Number(userStats.level ?? 1),
    }
    : { currentStreak: 0, longestStreak: 0, xpPoints: 0, level: 1 };

  const effectiveDailyGoal = dailyGoal
    ? {
      lessonsTarget: Number(dailyGoal.lessonsTarget ?? 3),
      lessonsCompleted: Number(dailyGoal.lessonsCompleted ?? Math.min(completedCount, 3)),
      xpTarget: Number(dailyGoal.xpTarget ?? 50),
      xpEarned: Number(dailyGoal.xpEarned ?? Math.min(completedCount * 5, 50)),
      minutesTarget: Number(dailyGoal.minutesTarget ?? 15),
      minutesSpent: Number(dailyGoal.minutesSpent ?? completedCount * 3),
    }
    : { lessonsTarget: 3, lessonsCompleted: Math.min(completedCount, 3), xpTarget: 50, xpEarned: Math.min(completedCount * 5, 50), minutesTarget: 15, minutesSpent: completedCount * 3 };

  const achievements = [
    { name: 'First Step', nameHindi: 'पहला कदम', description: 'Complete your first lesson', icon: '🎯', xpReward: 10, unlocked: completedCount >= 1 },
    { name: '3-Day Streak', nameHindi: '3 दिन की स्ट्रीक', description: 'Learn for 3 days in a row', icon: '🔥', xpReward: 30, unlocked: effectiveUserStats.currentStreak >= 3 },
    { name: 'Getting Started', nameHindi: 'शुरुआत', description: 'Complete 5 lessons', icon: '📚', xpReward: 25, unlocked: completedCount >= 5 },
    { name: 'Dedicated Learner', nameHindi: 'समर्पित शिक्षार्थी', description: 'Complete 25 lessons', icon: '🌟', xpReward: 100, unlocked: completedCount >= 25 },
  ];

  const leaderboardEntries = (leaderboard ?? []).map((row: any, index: number) => ({
    rank: index + 1,
    username: row.user?.username || 'Unknown',
    xpEarned: Number(row.xpEarned ?? 0),
    lessonsCompleted: Number(row.lessonsCompleted ?? 0),
    isCurrentUser: row.user?.id === 1, // Assumption: Mock user ID 1 for now, simpler
    trophyColor: index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-300" : index === 2 ? "text-amber-600" : "text-slate-400"
  }));

  const currentUserRank = leaderboardEntries.find((e: any) => e.isCurrentUser)?.rank;

  const scenarios = [
    { id: 1, title: 'Job Interview', titleHindi: 'नौकरी इंटरव्यू', category: 'job_interview', difficulty: 'Beginner', xpReward: 40, completed: false },
    { id: 2, title: 'Medical Visit', titleHindi: 'डॉक्टर से बात', category: 'doctor_visit', difficulty: 'Beginner', xpReward: 35, completed: false },
    { id: 3, title: 'Restaurant Order', titleHindi: 'ऑर्डर करना', category: 'restaurant', difficulty: 'Beginner', xpReward: 30, completed: true, score: 85 },
    { id: 4, title: 'Bank Account', titleHindi: 'खाता खोलना', category: 'bank', difficulty: 'Intermediate', xpReward: 40, completed: false },
  ];

  return (
    <Layout>
      <WelcomeTutorial />
      {/* Premium Hero Section */}
      <header className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-background to-secondary/30 p-8 md:p-12 border border-white/10 mb-12 group shadow-2xl shadow-primary/5">

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-60 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-40" />

        {/* Language Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageToggle />
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">

          <div className="text-center lg:text-left flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="h-3 w-3" />
              <span>{t('ai_powered_learning')}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] text-foreground tracking-tight">
              {t("welcome")}<span className="text-primary text-6xl md:text-8xl">.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed dark:text-gray-300">
              {t("subtitle")} {t('immersive_desc')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Link href="/lessons">
                <button className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-[0_0_20px_rgba(28,231,131,0.3)] hover:shadow-[0_0_30px_rgba(28,231,131,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {t('start_learning')}
                </button>
              </Link>
              <Link href="/conversations">
                <button className="px-8 py-4 rounded-xl bg-card border border-border hover:bg-secondary text-foreground font-bold text-base shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  {t('practice_speaking')}
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start text-xs font-bold text-muted-foreground uppercase tracking-wider pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Interactive AI</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 relative hidden md:block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative z-10 animate-bounce-subtle">
              <SaraswatiMascot size="lg" mood="happy" message={t("welcome_message") || "Start your journey!"} />
            </div>
          </div>
        </div>
      </header>

      {/* Celebrity Welcome Banner - Special for Launch */}
      <section className="mb-12 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-amber-600 to-amber-800 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30 overflow-hidden shadow-xl shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60"
              alt="Celebrity Authenticity"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-2 flex-1">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 mb-2">Special Message</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              "Namaste! Learning English changed my life."
            </h2>
            <p className="text-amber-100 text-lg italic">
              - A special welcome note from our Brand Ambassador
            </p>
          </div>
          <Button className="bg-white text-amber-900 hover:bg-amber-50 rounded-full font-bold shadow-lg">
            Watch Message <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Stats Dashboard Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StreakCard
          currentStreak={effectiveUserStats.currentStreak}
          longestStreak={effectiveUserStats.longestStreak}
          xpPoints={effectiveUserStats.xpPoints}
          level={effectiveUserStats.level}
        />
        <div className="lg:col-span-2 glass-card rounded-[2rem] p-6 relative overflow-hidden group border-border/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Course Progress</h3>
              <p className="text-sm text-muted-foreground">{completedCount} of {totalLessons} lessons</p>
            </div>
            <div className="text-4xl font-black text-primary/20">{percentage}%</div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_10px_rgba(28,231,131,0.5)] transition-all duration-1000" style={{ width: `${percentage}%` }} />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Next: Lesson {completedCount + 1}</div>
            <Link href={`/lesson/${completedCount + 1}`}>
              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                Continue <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </div>
        <DailyGoalCard
          lessonsTarget={effectiveDailyGoal.lessonsTarget}
          lessonsCompleted={effectiveDailyGoal.lessonsCompleted}
          xpTarget={effectiveDailyGoal.xpTarget}
          xpEarned={effectiveDailyGoal.xpEarned}
          minutesTarget={effectiveDailyGoal.minutesTarget}
          minutesSpent={effectiveDailyGoal.minutesSpent}
        />
      </section>

      {/* SPECIAL FEATURED: FOR DEMO */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-display flex items-center gap-2">
            <div className="p-2 rounded-lg bg-pink-500/10">
              <Crown className="h-5 w-5 text-pink-500" />
            </div>
            Featured Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business English */}
          <Link href="/lesson/101">
            <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 cursor-pointer border border-white/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex gap-6 items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-500">
                  💼
                </div>
                <div className="space-y-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">Essential for Career</Badge>
                  <h3 className="text-2xl font-bold text-white">Business English</h3>
                  <p className="text-slate-400 text-sm">Master interviews, meetings & bargaining.</p>
                </div>
                <div className="ml-auto bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Link>

          {/* Travel English */}
          <Link href="/lesson/102">
            <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 cursor-pointer border border-white/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex gap-6 items-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-500">
                  ✈️
                </div>
                <div className="space-y-2">
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30">Travel Ready</Badge>
                  <h3 className="text-2xl font-bold text-white">Travel & Tourism</h3>
                  <p className="text-slate-400 text-sm">Airports, hotels, and directions.</p>
                </div>
                <div className="ml-auto bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Learning Content */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

        {/* Left Column: Lessons (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              Your Learning Path
            </h2>

            <div className="flex bg-secondary/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('lessons')}
                className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", activeTab === 'lessons' ? "bg-white dark:bg-black text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {t('lessons')}
              </button>
              <button
                onClick={() => setActiveTab('scenarios')}
                className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", activeTab === 'scenarios' ? "bg-white dark:bg-black text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {t('roleplay')}
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", activeTab === 'stories' ? "bg-white dark:bg-black text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                Stories
              </button>
            </div>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : activeTab === 'lessons' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {lessons?.sort((a: any, b: any) => a.order - b.order).slice(0, 6).map((lesson: any) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    progress={progress?.find((p: any) => p.lessonId === lesson.id)}
                  />
                ))}
                <Link href="/lessons">
                  <div className="h-full min-h-[220px] rounded-3xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center p-6 text-muted-foreground hover:text-primary hover:bg-secondary/20 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-sm">View All Lessons</span>
                  </div>
                </Link>
              </div>
            ) : activeTab === 'scenarios' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {scenarios.map((scenario) => (
                  <ScenarioCard key={scenario.id} {...scenario} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {hindiStoriesData.map((story) => (
                  <HindiStoryCard
                    key={story.id}
                    story={story}
                    onRead={(storyId) => {
                      // Navigate to story reader or open modal
                      console.log('Reading story:', storyId);
                    }}
                    showAnimation={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Extras (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <TodaysPractice />
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Trophy className="h-4 w-4 text-yellow-500" /> Leaderboard
            </h3>
            {leaderboardEntries.length > 0 ? (
              <LeaderboardCard entries={leaderboardEntries} currentUserRank={currentUserRank} />
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">Compete to be #1!</p>
            )}
          </div>

          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Achievements</h3>
            <div className="grid grid-cols-2 gap-2">
              {achievements.slice(0, 4).map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Labs Showcase */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Sparkles className="h-5 w-5 text-orange-500" />
              </div>
              Innovation Labs
            </h2>
            <p className="text-sm text-muted-foreground">Experimental "Triple Deep" features for faster learning.</p>
          </div>
          <Link href="/labs">
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10 group">
              Explore All Labs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/labs/video-call">
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 aspect-[4/3] cursor-pointer shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                alt="Video Call"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Badge className="bg-orange-500 font-black text-[10px] tracking-widest">BETA</Badge>
                <h3 className="text-2xl font-bold text-white tracking-tight">Saraswati Video Call</h3>
                <p className="text-white/60 text-sm line-clamp-2">Practice face-to-face English with our advanced AI avatar.</p>
              </div>
            </div>
          </Link>

          <Link href="/labs/reader">
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 aspect-[4/3] cursor-pointer shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                alt="Story Reader"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Badge className="bg-blue-500 font-black text-[10px] tracking-widest">NEW</Badge>
                <h3 className="text-2xl font-bold text-white tracking-tight">Bilingual Reader</h3>
                <p className="text-white/60 text-sm line-clamp-2">Read stories with side-by-side Hindi translations.</p>
              </div>
            </div>
          </Link>

          <Link href="/labs/videos">
            <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 aspect-[4/3] cursor-pointer shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                alt="Native Videos"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <Badge className="bg-red-500 font-black text-[10px] tracking-widest">HOT</Badge>
                <h3 className="text-2xl font-bold text-white tracking-tight">Native Speaker Videos</h3>
                <p className="text-white/60 text-sm line-clamp-2">Learn authentic pronunciation from real locals.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* AI Tutor Section */}
      <section className="mb-16 rounded-[2rem] bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/10 overflow-hidden relative">
        <div className="p-8 md:p-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold font-display">Personal AI Tutor</h2>
              <p className="text-muted-foreground">Practice real conversations, get instant grammar corrections, and improve your pronunciation with our advanced AI tutor.</p>
              <Link href="/chat">
                <button className="mt-4 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
                  Chat with Preet AI
                </button>
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md bg-background/50 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-xl">
              <AITutor />
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Certs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen className="text-primary h-5 w-5" /> Study Resources</h2>
          <ResourcesSection />
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Crown className="text-yellow-500 h-5 w-5" /> Certifications</h2>
            <Link href="/hindi-mastery" className="text-primary text-xs font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <CertificationCard level="beginner" lessonsCompleted={completedCount} totalLessons={totalLessons} quizzesPassed={Math.floor(completedCount / 10)} totalQuizzes={10} />
          </div>
        </div>
      </section>

    </Layout>
  );
}

