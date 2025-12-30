import { Layout } from "@/components/Layout";
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
import { ConfidenceDashboard } from "@/components/ConfidenceDashboard";
import { ComingSoon } from "@/components/ComingSoon";
import { VocabularyBuilder } from "@/components/VocabularyBuilder";
import { ConversationPractice } from "@/components/ConversationPractice";
import { AITutor } from "@/components/AITutor";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { Loader2, Sparkles, MessageCircle, Award, Heart, GraduationCap, BookOpen, Mic, MessagesSquare, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'lessons' | 'scenarios'>('lessons');

  const isLoading = lessonsLoading || progressLoading;

  // Simple progress calculation
  const completedCount = progress?.filter(p => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Mock data for gamification (will be replaced with real API data)
  const userStats = {
    currentStreak: 5,
    longestStreak: 12,
    xpPoints: 1250,
    level: 8
  };

  const dailyGoal = {
    lessonsTarget: 3,
    lessonsCompleted: Math.min(completedCount, 3),
    xpTarget: 50,
    xpEarned: 35,
    minutesTarget: 15,
    minutesSpent: 10
  };

  const achievements = [
    { name: 'First Step', nameHindi: 'पहला कदम', description: 'Complete your first lesson', icon: '🎯', xpReward: 10, unlocked: completedCount >= 1 },
    { name: '3-Day Streak', nameHindi: '3 दिन की स्ट्रीक', description: 'Learn for 3 days in a row', icon: '🔥', xpReward: 30, unlocked: userStats.currentStreak >= 3 },
    { name: 'Getting Started', nameHindi: 'शुरुआत', description: 'Complete 5 lessons', icon: '📚', xpReward: 25, unlocked: completedCount >= 5 },
    { name: 'Dedicated Learner', nameHindi: 'समर्पित शिक्षार्थी', description: 'Complete 25 lessons', icon: '🌟', xpReward: 100, unlocked: completedCount >= 25 },
  ];

  const leaderboardEntries = [
    { rank: 1, username: 'राहुल शर्मा', xpEarned: 2450, lessonsCompleted: 45 },
    { rank: 2, username: 'प्रिया सिंह', xpEarned: 2100, lessonsCompleted: 38 },
    { rank: 3, username: 'अमित कुमार', xpEarned: 1890, lessonsCompleted: 35 },
    { rank: 4, username: 'You', xpEarned: userStats.xpPoints, lessonsCompleted: completedCount, isCurrentUser: true },
    { rank: 5, username: 'नेहा गुप्ता', xpEarned: 1100, lessonsCompleted: 22 },
  ];

  const scenarios = [
    { id: 1, title: 'Job Interview - Introduction', titleHindi: 'नौकरी इंटरव्यू - परिचय', category: 'job_interview', difficulty: 'Beginner', xpReward: 40, completed: false },
    { id: 2, title: 'Doctor Visit - Symptoms', titleHindi: 'डॉक्टर - लक्षण बताना', category: 'doctor_visit', difficulty: 'Beginner', xpReward: 35, completed: false },
    { id: 3, title: 'Restaurant - Ordering', titleHindi: 'रेस्टोरेंट - ऑर्डर करना', category: 'restaurant', difficulty: 'Beginner', xpReward: 30, completed: true, score: 85 },
    { id: 4, title: 'Bank - Opening Account', titleHindi: 'बैंक - खाता खोलना', category: 'bank', difficulty: 'Intermediate', xpReward: 40, completed: false },
  ];

  return (
    <Layout>
      {/* Credits Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-800">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          <p className="text-sm md:text-base font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        </div>
      </div>

      <header className="mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Saraswati Mascot */}
          <SaraswatiMascot 
            size="lg" 
            mood={completedCount > 0 ? 'encouraging' : 'happy'}
            message={completedCount === 0 
              ? "नमस्ते! आज से अंग्रेजी सीखना शुरू करें! 🙏" 
              : completedCount >= 10 
                ? "शाबाश! आप बहुत अच्छा कर रहे हैं! 🌟"
                : "बहुत अच्छे! सीखते रहें! 📚"
            }
          />
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              {t("welcome")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("subtitle")}
            </p>
            <p className="text-sm text-amber-700 mt-2 font-medium">
              🙏 माँ सरस्वती की कृपा से ज्ञान प्राप्त करें
            </p>
          </div>
        </div>
      </header>

      {/* Today's Practice Topic */}
      <section className="mb-8">
        <TodaysPractice />
      </section>

      {/* Quick Access - Speaking & Vocabulary */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          🚀 Quick Access - जल्दी शुरू करें
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/speak">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Mic className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Speaking Practice</h3>
                  <p className="text-purple-100">🗣️ बोलने का अभ्यास - 25 Topics</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/vocabulary">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Vocabulary Builder</h3>
                  <p className="text-blue-100">📚 शब्दावली - 72+ Words</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/conversations">
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <MessagesSquare className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Conversations</h3>
                  <p className="text-green-100">💬 बातचीत अभ्यास - 6 Dialogues</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Gamification Section - Streak & Daily Goal */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StreakCard 
          currentStreak={userStats.currentStreak}
          longestStreak={userStats.longestStreak}
          xpPoints={userStats.xpPoints}
          level={userStats.level}
        />
        <DailyGoalCard 
          lessonsTarget={dailyGoal.lessonsTarget}
          lessonsCompleted={dailyGoal.lessonsCompleted}
          xpTarget={dailyGoal.xpTarget}
          xpEarned={dailyGoal.xpEarned}
          minutesTarget={dailyGoal.minutesTarget}
          minutesSpent={dailyGoal.minutesSpent}
        />
      </section>

      {/* Progress Overview */}
      <section className="mb-8 bg-white rounded-3xl p-6 md:p-8 border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <Sparkles className="h-5 w-5" />
              <span>{t("your_progress")}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{completedCount} of {totalLessons} {t("lessons_completed")}</h2>
            <p className="text-muted-foreground">{t("keep_momentum")}</p>
          </div>
          
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="w-full bg-secondary h-4 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="font-bold text-xl text-primary">{percentage}%</span>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-100 p-2 rounded-xl">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">उपलब्धियां</h2>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementBadge key={index} {...achievement} />
          ))}
        </div>
      </section>

      {/* Certification Levels Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl">
            <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">प्रमाणपत्र स्तर</h2>
            <p className="text-sm text-muted-foreground">Certification Levels</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CertificationCard 
            level="beginner"
            lessonsCompleted={completedCount}
            totalLessons={totalLessons}
            quizzesPassed={Math.floor(completedCount / 10)}
            totalQuizzes={10}
          />
          <CertificationCard 
            level="intermediate"
            lessonsCompleted={completedCount}
            totalLessons={totalLessons}
            quizzesPassed={Math.floor(completedCount / 10)}
            totalQuizzes={20}
          />
          <CertificationCard 
            level="advanced"
            lessonsCompleted={completedCount}
            totalLessons={totalLessons}
            quizzesPassed={Math.floor(completedCount / 10)}
            totalQuizzes={30}
          />
        </div>
      </section>

      {/* Tabs for Lessons and Scenarios */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'lessons' 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-white text-slate-600 border hover:bg-slate-50'
          }`}
        >
          <Sparkles className="h-5 w-5" />
          पाठ ({totalLessons})
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'scenarios' 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-white text-slate-600 border hover:bg-slate-50'
          }`}
        >
          <MessageCircle className="h-5 w-5" />
          रोलप्ले अभ्यास
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'lessons' ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lessons Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t("available_lessons")}</h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessons?.sort((a, b) => a.order - b.order).slice(0, 10).map((lesson) => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    progress={progress?.find(p => p.lessonId === lesson.id)}
                  />
                ))}
                
                {(!lessons || lessons.length === 0) && (
                  <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-2xl border border-dashed">
                    {t("no_lessons")}
                  </div>
                )}
              </div>
            )}
            
            {lessons && lessons.length > 10 && (
              <div className="text-center mt-6">
                <button className="px-6 py-3 bg-white border rounded-xl font-medium text-primary hover:bg-primary/5 transition-all">
                  सभी {totalLessons} पाठ देखें →
                </button>
              </div>
            )}
          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1">
            <LeaderboardCard entries={leaderboardEntries} currentUserRank={4} />
          </div>
        </section>
      ) : (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-xl">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">रोलप्ले अभ्यास</h2>
              <p className="text-sm text-muted-foreground">Real-life conversation practice</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} {...scenario} />
            ))}
          </div>
        </section>
      )}

      {/* Learning Resources Section */}
      <ResourcesSection />

      {/* Confidence Dashboard & Coming Soon */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ConfidenceDashboard 
          confidenceScore={Math.min(40 + completedCount * 2, 100)}
          topicsCompleted={completedCount}
          totalTopics={totalLessons}
          interviewAnswers={Math.floor(completedCount / 5)}
          speakingMinutes={completedCount * 3}
          strengths={[
            "Clear thinking",
            "Good sentence structure",
            "Improving vocabulary"
          ]}
          focusAreas={[
            "Speak for longer duration",
            "Add more examples"
          ]}
        />
        <ComingSoon />
      </section>

      {/* AI Tutor Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
            <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI ट्यूटर से बात करें</h2>
            <p className="text-sm text-muted-foreground">Practice English with Arya - आर्या से अंग्रेजी का अभ्यास करें</p>
          </div>
        </div>
        <AITutor />
      </section>

      {/* Footer Credits */}
      <footer className="mt-16 pt-8 border-t">
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-6 inline-block">
            <p className="text-slate-600 mb-2">
              <span className="font-bold text-slate-800">PREET ENGLISH</span> - हिंदी भाषियों के लिए अंग्रेजी सीखने का ऐप
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-700">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <p className="text-sm font-medium">
                Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
              </p>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </div>
            <p className="text-xs text-slate-500 mt-2">© 2024 PREET ENGLISH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
