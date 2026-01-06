import { Layout } from "@/components/Layout";
import { useProgress } from "@/hooks/use-progress";
import { User, Award, Calendar, BarChart3, Target, Flame, BookOpen, Heart } from "lucide-react";
import { useMemo } from "react";
import { ProgressCharts } from "@/components/ProgressCharts";

export default function Profile() {
  const { data: progress } = useProgress();

  const completedLessons = progress?.filter(p => p.completed) || [];
  const completedCount = completedLessons.length;

  // Mock join date
  const joinDate = new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' });

  // Calculate streak (mock data)
  const currentStreak = Math.min(completedCount, 7);
  const weeklyGoal = Math.min(completedCount, 5);

  const { activityData, categoryData } = useMemo(() => {
    if (!progress) return { activityData: [], categoryData: [] };

    // 1. Activity Data (Last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const activity = last7Days.map(date => {
      const dayLessons = progress.filter(p => p.completedAt && p.completedAt.startsWith(date));
      // Assume 100 XP per lesson for now
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        xp: dayLessons.length * 100,
        lessons: dayLessons.length
      };
    });

    // 2. Category Data
    const catMap = new Map<string, number>();
    progress.filter(p => p.completed).forEach(p => {
      const cat = p.lesson?.category || 'General';
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });

    const categories = Array.from(catMap.entries()).map(([name, value], idx) => ({
      name,
      value,
      color: [`#8b5cf6`, `#ea580c`, `#10b981`, `#3b82f6`][idx % 4]
    }));

    return { activityData: activity, categoryData: categories };
  }, [progress]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">मेरी प्रोफाइल</h1>
      <p className="text-muted-foreground mb-8">My Profile</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* User Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary border-4 border-white shadow-lg">
            <User className="h-10 w-10" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground mb-1">विद्यार्थी</h2>
            <p className="text-muted-foreground mb-4">English Learner | अंग्रेजी सीखने वाला</p>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
                <Calendar className="h-4 w-4" />
                सदस्य: {joinDate}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-sm font-medium text-orange-700 dark:text-orange-400">
                <Flame className="h-4 w-4" />
                {currentStreak} दिन स्ट्रीक
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 shadow-lg shadow-primary/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 opacity-80 mb-2">
              <Award className="h-5 w-5" />
              <span className="font-medium">कुल XP</span>
            </div>
            <div className="text-4xl font-bold font-display">{completedCount * 100}</div>
          </div>
          <div className="mt-6 text-sm opacity-80">
            हर पूर्ण पाठ के लिए 100 XP मिलते हैं!
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          उपलब्धियां (Achievements)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border text-center ${completedCount >= 1 ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 opacity-50'}`}>
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-sm">पहला कदम</h3>
            <p className="text-xs text-muted-foreground">First Step</p>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${completedCount >= 5 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 opacity-50'}`}>
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-sm">5 पाठ पूर्ण</h3>
            <p className="text-xs text-muted-foreground">5 Lessons Done</p>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${completedCount >= 10 ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 opacity-50'}`}>
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold text-sm">10 पाठ पूर्ण</h3>
            <p className="text-xs text-muted-foreground">Rising Star</p>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${currentStreak >= 7 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 opacity-50'}`}>
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-sm">7 दिन स्ट्रीक</h3>
            <p className="text-xs text-muted-foreground">Week Warrior</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-foreground font-bold text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2>सीखने की गतिविधि</h2>
          </div>

          <div className="space-y-4">
            {completedLessons.length > 0 ? (
              completedLessons.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium">{item.lesson?.title || 'Lesson'}</span>
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    ✓ पूर्ण
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>अभी तक कोई गतिविधि नहीं।</p>
                <p className="text-sm">अपना पहला पाठ शुरू करें!</p>
              </div>
            )}
          </div>
        </section>

        {/* Weekly Goal */}
        <section className="bg-gradient-to-br from-accent/20 to-primary/5 dark:from-accent/10 dark:to-primary/10 rounded-3xl p-8 border border-accent/20">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="font-bold text-xl text-foreground">साप्ताहिक लक्ष्य</h2>
          </div>
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>{weeklyGoal} / 5 पाठ</span>
            <span className="text-primary">{Math.round((weeklyGoal / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-white dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-6 shadow-sm">
            <div
              className="bg-gradient-to-r from-accent to-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((weeklyGoal / 5) * 100, 100)}%` }}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            हर हफ्ते 5 पाठ पूरा करने से याददाश्त में सुधार होता है। आप बहुत अच्छा कर रहे हैं!
          </p>
        </section>
      </div>

      <div className="mb-8">
        <ProgressCharts
          activityData={activityData}
          categoryData={categoryData}
        />
      </div>

      {/* Credits Footer */}
      <footer className="mt-12 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </Layout >
  );
}
