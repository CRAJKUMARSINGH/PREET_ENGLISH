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
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { useUserStats, useDailyGoal, useLeaderboard } from "@/hooks/use-gamification";
import { 
  Loader2, 
  Sparkles, 
  Award, 
  Heart, 
  GraduationCap, 
  BookOpen, 
  Mic, 
  MessagesSquare, 
  Brain, 
  ArrowRight, 
  Star,
  Zap,
  Target,
  TrendingUp,
  Users,
  Globe,
  Play,
  CheckCircle,
  Flame
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { useAnalytics } from "@/hooks/use-analytics";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernHome() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: userStats } = useUserStats();
  const { data: dailyGoal } = useDailyGoal();
  const { data: leaderboard } = useLeaderboard();
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    trackEvent("auth_success", { page: "modern_home" });
  }, [trackEvent]);

  const isLoading = lessonsLoading || progressLoading;

  // Progress calculations
  const completedCount = progress?.filter((p: any) => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // User stats with fallbacks
  const effectiveUserStats = userStats
    ? {
      currentStreak: Number(userStats.currentStreak ?? 0),
      longestStreak: Number(userStats.longestStreak ?? 0),
      xpPoints: Number(userStats.xpPoints ?? 0),
      level: Number(userStats.level ?? 1),
    }
    : {
      currentStreak: 0,
      longestStreak: 0,
      xpPoints: 0,
      level: 1,
    };

  // Feature highlights for rotating display
  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "AI-Powered Speaking",
      description: "Practice with our advanced speech recognition",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Personalized Learning",
      description: "Adaptive curriculum that learns with you",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Learning",
      description: "Connect with 10,000+ learners worldwide",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certified Progress",
      description: "Earn industry-recognized certificates",
      color: "from-amber-500 to-orange-500"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <Layout>
      <SEO
        title="Learn English with Confidence"
        description="Master English with AI-powered lessons, speaking practice, and personalized learning paths designed for Hindi speakers."
      />

      {/* Hero Section - Sivi.ai Inspired */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
              >
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  #1 English Learning Platform for Hindi Speakers
                </span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master English with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                    AI-Powered Learning
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Join 10,000+ Hindi speakers who've transformed their English skills with our personalized, 
                  culturally-aware learning platform.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">1625+</div>
                  <div className="text-sm text-muted-foreground">Interactive Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/lesson/1">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center gap-3 group"
                  >
                    <Play className="h-5 w-5" />
                    Start Learning Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all flex items-center gap-3"
                >
                  <Globe className="h-5 w-5" />
                  Watch Demo
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 border-2 border-white dark:border-background flex items-center justify-center text-white text-sm font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">2,000+</span> learners this week
                </div>
              </div>
            </motion.div>

            {/* Right Column - Interactive Demo */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Demo Card */}
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-emerald-500/10 border border-emerald-100 dark:border-emerald-900/30 p-8 backdrop-blur-sm">
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-3 rounded-2xl shadow-lg"
                >
                  <Zap className="h-6 w-6" />
                </motion.div>

                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-2xl shadow-lg"
                >
                  <Star className="h-6 w-6" />
                </motion.div>

                {/* Demo Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SaraswatiMascot size="sm" showMessage={false} />
                      <div>
                        <h3 className="font-bold text-lg">Today's Lesson</h3>
                        <p className="text-sm text-muted-foreground">Business English - Level 2</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="font-bold text-orange-500">{effectiveUserStats.currentStreak}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Feature Showcase */}
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={`p-4 rounded-2xl bg-gradient-to-r ${features[activeFeature].color} bg-opacity-10 border border-opacity-20`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${features[activeFeature].color} text-white`}>
                            {features[activeFeature].icon}
                          </div>
                          <h4 className="font-semibold">{features[activeFeature].title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{features[activeFeature].description}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Feature Dots */}
                    <div className="flex justify-center gap-2">
                      {features.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveFeature(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeFeature 
                              ? 'bg-emerald-500 w-6' 
                              : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/speak">
                      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
                        <Mic className="h-5 w-5 text-purple-600 mb-2" />
                        <div className="text-sm font-medium">Speaking</div>
                      </div>
                    </Link>
                    <Link href="/vocabulary">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                        <BookOpen className="h-5 w-5 text-blue-600 mb-2" />
                        <div className="text-sm font-medium">Vocabulary</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StreakCard
              currentStreak={effectiveUserStats.currentStreak}
              longestStreak={effectiveUserStats.longestStreak}
              xpPoints={effectiveUserStats.xpPoints}
              level={effectiveUserStats.level}
            />
            <DailyGoalCard
              lessonsTarget={3}
              lessonsCompleted={Math.min(completedCount, 3)}
              xpTarget={50}
              xpEarned={Math.min(completedCount * 5, 50)}
              minutesTarget={15}
              minutesSpent={completedCount * 3}
            />
            
            {/* Additional Stats Cards */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fluency Score</p>
                  <h3 className="text-3xl font-bold font-display mt-1">
                    {Math.min(42 + (completedCount * 2), 95)}%
                  </h3>
                </div>
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded-lg inline-block">
                +2.4% this week
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
                  <h3 className="text-3xl font-bold font-display mt-1">{completedCount}</h3>
                </div>
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000" 
                  style={{ width: `${Math.min((completedCount / totalLessons) * 100, 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Hub */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Practice */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <TodaysPractice />
              </motion.div>

              {/* Lessons Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Continue Learning</h2>
                  <Link href="/lessons">
                    <span className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
                      View All →
                    </span>
                  </Link>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lessons?.slice(0, 6).map((lesson: any) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        progress={progress?.find((p: any) => p.lessonId === lesson.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* AI Tutor */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <AITutor />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Achievements</h3>
                  <Link href="/profile">
                    <span className="text-xs text-emerald-600 font-medium cursor-pointer">View All</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'First Step', nameHindi: 'पहला कदम', description: 'Complete your first lesson', icon: '🎯', xpReward: 10, unlocked: completedCount >= 1 },
                    { name: '3-Day Streak', nameHindi: '3 दिन की स्ट्रीक', description: 'Learn for 3 days in a row', icon: '🔥', xpReward: 30, unlocked: effectiveUserStats.currentStreak >= 3 },
                    { name: 'Getting Started', nameHindi: 'शुरुआत', description: 'Complete 5 lessons', icon: '📚', xpReward: 25, unlocked: completedCount >= 5 },
                    { name: 'Dedicated Learner', nameHindi: 'समर्पित शिक्षार्थी', description: 'Complete 25 lessons', icon: '🌟', xpReward: 100, unlocked: completedCount >= 25 },
                  ].slice(0, 4).map((achievement, i) => (
                    <AchievementBadge key={i} {...achievement} />
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard */}
              {leaderboard && leaderboard.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <LeaderboardCard 
                    entries={leaderboard.slice(0, 5).map((row, index) => ({
                      rank: index + 1,
                      username: row.user.username,
                      xpEarned: Number(row.xpEarned ?? 0),
                      lessonsCompleted: Number(row.lessonsCompleted ?? 0),
                      isCurrentUser: row.user.id === 1,
                    }))} 
                    currentUserRank={1}
                  />
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3"
              >
                <Link href="/speak">
                  <div className="glass-card p-4 rounded-2xl text-center hover:bg-accent/5 transition-colors cursor-pointer group">
                    <div className="p-3 bg-purple-500/10 text-purple-500 rounded-full mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Mic className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold">Speaking</span>
                  </div>
                </Link>
                <Link href="/conversations">
                  <div className="glass-card p-4 rounded-2xl text-center hover:bg-accent/5 transition-colors cursor-pointer group">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <MessagesSquare className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold">Chat</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-border/50 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for confident English speakers.
          </p>
          <p className="text-xs text-muted-foreground/60">
            © 2024 Preet English • Privacy • Terms • Made in India 🇮🇳
          </p>
        </div>
      </footer>
    </Layout>
  );
}