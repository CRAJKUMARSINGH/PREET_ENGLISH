import { Layout } from "@/components/Layout";
import { useProgress } from "@/hooks/use-progress";
import { useUserStats } from "@/hooks/use-gamification";
import * as Lucide from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { data: progress } = useProgress();
  const { data: userStats } = useUserStats();

  const completedLessons = progress?.filter((p: any) => p.completed) || [];
  const completedCount = completedLessons.length;

  const joinDate = new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' });

  const stats = {
    currentStreak: Number(userStats?.currentStreak ?? Math.min(completedCount, 7)),
    longestStreak: Number(userStats?.longestStreak ?? Math.min(completedCount, 7)),
    xpPoints: Number(userStats?.xpPoints ?? completedCount * 100),
    level: Number(userStats?.level ?? Math.floor(completedCount / 5) + 1),
  };

  const weeklyGoal = Math.min(completedCount, 5);

  const achievements = [
    { emoji: "🎯", name: "पहला कदम", english: "First Step", unlocked: completedCount >= 1, color: "green" },
    { emoji: "📚", name: "5 पाठ पूर्ण", english: "5 Lessons", unlocked: completedCount >= 5, color: "blue" },
    { emoji: "⭐", name: "10 पाठ पूर्ण", english: "Rising Star", unlocked: completedCount >= 10, color: "purple" },
    { emoji: "🔥", name: "7 दिन स्ट्रीक", english: "Week Warrior", unlocked: stats.currentStreak >= 7, color: "orange" },
    { emoji: "💎", name: "25 पाठ पूर्ण", english: "Diamond", unlocked: completedCount >= 25, color: "cyan" },
    { emoji: "🏆", name: "50 पाठ पूर्ण", english: "Champion", unlocked: completedCount >= 50, color: "yellow" },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="mb-10 relative overflow-hidden rounded-3xl glass-panel p-8 md:p-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-background shadow-2xl shadow-primary/20">
                <Lucide.User className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                <Lucide.Zap className="h-4 w-4 fill-current" />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-extrabold font-display text-foreground">विद्यार्थी</h1>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  Level {stats.level}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">English Learner | अंग्रेजी सीखने वाला</p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full text-xs font-bold">
                  <Lucide.Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">सदस्य:</span> {joinDate}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 rounded-full text-xs font-bold text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  <Lucide.Flame className="h-3.5 w-3.5" />
                  {stats.currentStreak} दिन स्ट्रीक
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-transparent hover:border-border">
                <Lucide.Settings className="h-5 w-5" />
              </button>
              <button className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-transparent hover:border-border">
                <Lucide.Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass-card p-5 rounded-2xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Lucide.Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-black text-foreground">{stats.xpPoints.toLocaleString()}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total XP</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Lucide.BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">{completedCount}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lessons</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <Lucide.Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div className="text-2xl font-black text-foreground">{stats.currentStreak}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Streak</div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center group hover:scale-105 transition-transform">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
              <Lucide.Crown className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-black text-foreground">{stats.longestStreak}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Best Streak</div>
          </div>
        </section>

        {/* Achievement Badges */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lucide.Trophy className="h-5 w-5 text-yellow-500" />
              उपलब्धियां (Achievements)
            </h2>
            <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className={cn(
                  "relative p-4 rounded-2xl text-center transition-all duration-300 border overflow-hidden group",
                  achievement.unlocked
                    ? "glass-card border-primary/20 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                    : "bg-secondary/30 border-border/50 opacity-60 grayscale"
                )}
              >
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                )}
                <div className="text-4xl mb-2 transition-transform group-hover:scale-110">{achievement.emoji}</div>
                <h3 className="font-bold text-sm text-foreground">{achievement.name}</h3>
                <p className="text-[10px] text-muted-foreground">{achievement.english}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <section className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lucide.BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-bold text-lg">सीखने की गतिविधि</h2>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {completedLessons.length > 0 ? (
                completedLessons.slice(0, 5).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Lucide.BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-sm truncate">{item.lesson?.title || 'Lesson'}</span>
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 px-2 py-1 bg-green-500/10 rounded-lg border border-green-500/20 flex-shrink-0">
                      ✓ पूर्ण
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <Lucide.BookOpen className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                  <p className="font-medium text-muted-foreground mb-1">अभी तक कोई गतिविधि नहीं</p>
                  <p className="text-sm text-muted-foreground/70 mb-4">अपना पहला पाठ शुरू करें!</p>
                  <Link href="/lessons">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
                      Start Learning
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Weekly Goal */}
          <section className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Lucide.Target className="h-5 w-5 text-green-500" />
                </div>
                <h2 className="font-bold text-lg">साप्ताहिक लक्ष्य</h2>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">{weeklyGoal} / 5 पाठ</span>
                  <span className="text-sm font-bold text-primary">{Math.round((weeklyGoal / 5) * 100)}%</span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(28,231,131,0.5)]"
                    style={{ width: `${Math.min((weeklyGoal / 5) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                हर हफ्ते 5 पाठ पूरा करने से याददाश्त में सुधार होता है। आप बहुत अच्छा कर रहे हैं! 🎉
              </p>

              {weeklyGoal >= 5 && (
                <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">🎯 साप्ताहिक लक्ष्य पूरा!</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Credits Footer */}
        <footer className="mt-12 pt-8 border-t border-border/50 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 border border-amber-500/10">
            <Lucide.Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
            </p>
            <Lucide.Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </footer>
      </div>
    </Layout>
  );
}
