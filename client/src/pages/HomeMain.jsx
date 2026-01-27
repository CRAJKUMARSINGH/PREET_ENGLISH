import { Layout } from "@/components/Layout";
import { LessonCard } from "@/components/LessonCard";
import { StreakCard } from "@/components/StreakCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { ScenarioCard } from "@/components/ScenarioCard";
import { SaraswatiMascot } from "@/components/SaraswatiMascot";
import { TodaysPractice } from "@/components/TodaysPractice";
import { AITutor } from "@/components/AITutor";
import { HolographicDashboard } from "@/components/advanced/HolographicDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { useUserStats, useDailyGoal, useLeaderboard } from "@/hooks/use-gamification";
import { Loader2, Sparkles, Award, Heart, GraduationCap, BookOpen, Mic, MessagesSquare, Brain, ArrowRight, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { useAnalytics } from "@/hooks/use-analytics";
export default function Home() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var _m = useLessons(), lessons = _m.data, lessonsLoading = _m.isLoading;
    var _o = useProgress(), progress = _o.data, progressLoading = _o.isLoading;
    var userStats = useUserStats().data;
    var dailyGoal = useDailyGoal().data;
    var leaderboard = useLeaderboard().data;
    var t = useTranslation().t;
    var trackEvent = useAnalytics().trackEvent;
    var _p = useState('lessons'), activeTab = _p[0], setActiveTab = _p[1];
    var _q = useState(false), showHolographicDashboard = _q[0], setShowHolographicDashboard = _q[1];
    useEffect(function () {
        trackEvent("auth_success", { page: "home" });
    }, [trackEvent]);
    var isLoading = lessonsLoading || progressLoading;
    // Simple progress calculation
    var completedCount = (progress === null || progress === void 0 ? void 0 : progress.filter(function (p) { return p.completed; }).length) || 0;
    var totalLessons = (lessons === null || lessons === void 0 ? void 0 : lessons.length) || 0;
    var percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    // Fallbacks while gamification data is loading
    var effectiveUserStats = userStats
        ? {
            currentStreak: Number((_a = userStats.currentStreak) !== null && _a !== void 0 ? _a : 0),
            longestStreak: Number((_b = userStats.longestStreak) !== null && _b !== void 0 ? _b : 0),
            xpPoints: Number((_c = userStats.xpPoints) !== null && _c !== void 0 ? _c : 0),
            level: Number((_d = userStats.level) !== null && _d !== void 0 ? _d : 1),
        }
        : {
            currentStreak: 0,
            longestStreak: 0,
            xpPoints: 0,
            level: 1,
        };
    var effectiveDailyGoal = dailyGoal
        ? {
            lessonsTarget: Number((_e = dailyGoal.lessonsTarget) !== null && _e !== void 0 ? _e : 3),
            lessonsCompleted: Number((_f = dailyGoal.lessonsCompleted) !== null && _f !== void 0 ? _f : Math.min(completedCount, 3)),
            xpTarget: Number((_g = dailyGoal.xpTarget) !== null && _g !== void 0 ? _g : 50),
            xpEarned: Number((_h = dailyGoal.xpEarned) !== null && _h !== void 0 ? _h : Math.min(completedCount * 5, 50)),
            minutesTarget: Number((_j = dailyGoal.minutesTarget) !== null && _j !== void 0 ? _j : 15),
            minutesSpent: Number((_k = dailyGoal.minutesSpent) !== null && _k !== void 0 ? _k : completedCount * 3),
        }
        : {
            lessonsTarget: 3,
            lessonsCompleted: Math.min(completedCount, 3),
            xpTarget: 50,
            xpEarned: Math.min(completedCount * 5, 50),
            minutesTarget: 15,
            minutesSpent: completedCount * 3,
        };
    var achievements = [
        { name: 'First Step', nameHindi: 'पहला कदम', description: 'Complete your first lesson', icon: '🎯', xpReward: 10, unlocked: completedCount >= 1 },
        { name: '3-Day Streak', nameHindi: '3 दिन की स्ट्रीक', description: 'Learn for 3 days in a row', icon: '🔥', xpReward: 30, unlocked: effectiveUserStats.currentStreak >= 3 },
        { name: 'Getting Started', nameHindi: 'शुरुआत', description: 'Complete 5 lessons', icon: '📚', xpReward: 25, unlocked: completedCount >= 5 },
        { name: 'Dedicated Learner', nameHindi: 'समर्पित शिक्षार्थी', description: 'Complete 25 lessons', icon: '🌟', xpReward: 100, unlocked: completedCount >= 25 },
    ];
    var leaderboardEntries = (leaderboard !== null && leaderboard !== void 0 ? leaderboard : []).map(function (row, index) {
        var _a, _b;
        return ({
            rank: index + 1,
            username: row.user.username,
            xpEarned: Number((_a = row.xpEarned) !== null && _a !== void 0 ? _a : 0),
            lessonsCompleted: Number((_b = row.lessonsCompleted) !== null && _b !== void 0 ? _b : 0),
            isCurrentUser: row.user.id === 1,
        });
    });
    var currentUserRank = (_l = leaderboardEntries.find(function (e) { return e.isCurrentUser; })) === null || _l === void 0 ? void 0 : _l.rank;
    var scenarios = [
        { id: 1, title: 'Job Interview - Introduction', titleHindi: 'नौकरी इंटरव्यू - परिचय', category: 'job_interview', difficulty: 'Beginner', xpReward: 40, completed: false },
        { id: 2, title: 'Doctor Visit - Symptoms', titleHindi: 'डॉक्टर - लक्षण बताना', category: 'doctor_visit', difficulty: 'Beginner', xpReward: 35, completed: false },
        { id: 3, title: 'Restaurant - Ordering', titleHindi: 'रेस्टोरेंट - ऑर्डर करना', category: 'restaurant', difficulty: 'Beginner', xpReward: 30, completed: true, score: 85 },
        { id: 4, title: 'Bank - Opening Account', titleHindi: 'बैंक - खाता खोलना', category: 'bank', difficulty: 'Intermediate', xpReward: 40, completed: false },
    ];
    return (<Layout>
      <SEO title="Dashboard" description="Your personalized learning dashboard."/>

      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary tracking-wide">
              <Sparkles className="h-3 w-3"/>
              <span>PREMIUM LEARNING EXPERIENCE</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              {t("welcome_back")}, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                Ready to Learn?
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Pick up where you left off. You're on a <span className="font-bold text-foreground">{effectiveUserStats.currentStreak}-day streak</span>!
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              <Link href="/lesson/1">
                <button className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25 transition-all flex items-center gap-2 group">
                  Continue Learning <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                </button>
              </Link>
              <div className="hidden md:flex items-center -space-x-3">
                {[1, 2, 3].map(function (i) { return (<div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-background"/>); })}
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-background flex items-center justify-center text-[10px] font-bold">
                  +1k
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10 rounded-full"/>
            <SaraswatiMascot size="lg" mood="encouraging" className="transform hover:scale-105 transition-transform duration-500" showCredit={true}/>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StreakCard currentStreak={effectiveUserStats.currentStreak} longestStreak={effectiveUserStats.longestStreak} xpPoints={effectiveUserStats.xpPoints} level={effectiveUserStats.level}/>
        <DailyGoalCard lessonsTarget={effectiveDailyGoal.lessonsTarget} lessonsCompleted={effectiveDailyGoal.lessonsCompleted} xpTarget={effectiveDailyGoal.xpTarget} xpEarned={effectiveDailyGoal.xpEarned} minutesTarget={effectiveDailyGoal.minutesTarget} minutesSpent={effectiveDailyGoal.minutesSpent}/>
        {/* Placeholder for future stats */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between min-h-[160px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Lessons</p>
              <h3 className="text-3xl font-bold font-display mt-1">{completedCount}</h3>
            </div>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <BookOpen className="h-5 w-5"/>
            </div>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-blue-500 w-[45%]"/>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Target: {totalLessons}</p>
        </div>

        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between min-h-[160px]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fluency Score</p>
              <h3 className="text-3xl font-bold font-display mt-1">42%</h3>
            </div>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Award className="h-5 w-5"/>
            </div>
          </div>
          <p className="text-xs text-emerald-500 font-medium mt-auto bg-emerald-500/10 px-2 py-1 rounded-lg inline-block w-fit">
            +2.4% this week
          </p>
        </div>
      </section>

      {/* Main Learning Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Lessons & Scenarios */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tab Switcher */}
          <div className="flex bg-secondary/30 p-1 rounded-2xl w-fit">
            <button onClick={function () { return setActiveTab('lessons'); }} className={"px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ".concat(activeTab === 'lessons' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
              Lessons
            </button>
            <button onClick={function () { return setActiveTab('scenarios'); }} className={"px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ".concat(activeTab === 'scenarios' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
              Roleplay
            </button>
          </div>

          {activeTab === 'lessons' ? (<div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Today's Practice Highlight */}
                <div className="md:col-span-2">
                  <TodaysPractice />
                </div>

                {isLoading ? (<div className="md:col-span-2 py-20 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                  </div>) : (lessons === null || lessons === void 0 ? void 0 : lessons.slice(0, 6).map(function (lesson) { return (<LessonCard key={lesson.id} lesson={lesson} progress={progress === null || progress === void 0 ? void 0 : progress.find(function (p) { return p.lessonId === lesson.id; })}/>); }))}
              </div>

              <Link href="/lessons">
                <div className="p-4 rounded-xl border border-dashed border-border hover:border-primary/50 text-center cursor-pointer transition-colors group">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                    View All {totalLessons} Lessons
                  </span>
                </div>
              </Link>
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map(function (s) { return (<ScenarioCard key={s.id} {...s}/>); })}
            </div>)}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/speak">
              <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-accent/5">
                <div className="p-3 bg-purple-500/10 text-purple-500 rounded-full">
                  <Mic className="h-5 w-5"/>
                </div>
                <span className="text-sm font-bold">Speaking</span>
              </div>
            </Link>
            <Link href="/vocabulary">
              <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-accent/5">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                  <BookOpen className="h-5 w-5"/>
                </div>
                <span className="text-sm font-bold">Vocab</span>
              </div>
            </Link>
            <Link href="/conversations">
              <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-accent/5">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                  <MessagesSquare className="h-5 w-5"/>
                </div>
                <span className="text-sm font-bold">Chat</span>
              </div>
            </Link>
            <Link href="/review">
              <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-accent/5">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full">
                  <Brain className="h-5 w-5"/>
                </div>
                <span className="text-sm font-bold">Review</span>
              </div>
            </Link>
          </div>

          {/* AI Tutor Banner */}
          <div className="mt-8">
            <AITutor />
          </div>

          {/* Quantum Holographic System Access */}
          <div className="mt-8">
            <Card className="glass-panel border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Layers className="h-8 w-8 text-primary"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Quantum Holographic Learning System</h3>
                      <p className="text-sm text-muted-foreground">
                        Access revolutionary quantum-enhanced learning features: Biometric optimization, 3D memory palaces, cultural immersion, and more
                      </p>
                    </div>
                  </div>
                  <Button size="lg" onClick={function () { return setShowHolographicDashboard(!showHolographicDashboard); }} className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5"/>
                    {showHolographicDashboard ? 'Hide' : 'Launch'} Quantum System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Community & Achievements */}
        <div className="space-y-8">
          {/* Leaderboard Snippet */}
          {leaderboardEntries.length > 0 && (<LeaderboardCard entries={leaderboardEntries.slice(0, 5)} currentUserRank={currentUserRank}/>)}

          {/* Achievements */}
          <div className="glass-panel p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Achievements</h3>
              <Link href="/profile"><span className="text-xs text-primary font-medium cursor-pointer">View All</span></Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map(function (a, i) { return (<AchievementBadge key={i} {...a}/>); })}
            </div>
          </div>

          {/* Certifications Mini */}
          <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-5 w-5 text-indigo-500"/>
              <h3 className="font-bold text-lg">Certifications</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-background/50 rounded-xl flex items-center justify-between">
                <span className="text-sm font-medium">Beginner</span>
                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold">Active</span>
              </div>
              <div className="p-3 bg-background/50 rounded-xl flex items-center justify-between opacity-50">
                <span className="text-sm font-medium">Intermediate</span>
                <span className="text-xs bg-slate-500/10 text-slate-500 px-2 py-0.5 rounded-full font-bold">Locked</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quantum Holographic Dashboard */}
      {showHolographicDashboard && (<section className="mt-12">
          <HolographicDashboard defaultTab="overview" onFeatureActivated={function (feature) {
                trackEvent("holographic_feature_activated", { feature: feature });
            }}/>
        </section>)}

      <footer className="mt-20 py-10 border-t border-border/50 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          Built with <Heart className="h-4 w-4 text-red-500 fill-red-500"/> for confident English speakers.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-2">
          © 2024 Preet English • Privacy • Terms
        </p>
      </footer>
    </Layout>);
}
