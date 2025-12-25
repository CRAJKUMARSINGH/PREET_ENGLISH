import { Layout } from "@/components/Layout";
import { useProgress } from "@/hooks/use-progress";
import { User, Award, Calendar, BarChart3 } from "lucide-react";

export default function Profile() {
  const { data: progress } = useProgress();

  const completedLessons = progress?.filter(p => p.completed) || [];
  const completedCount = completedLessons.length;
  
  // Mock join date
  const joinDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* User Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 border shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-lg">
             <User className="h-10 w-10" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground mb-1">Student</h2>
            <p className="text-muted-foreground mb-4">English Learner</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
              <Calendar className="h-4 w-4" />
              Member since {joinDate}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg shadow-primary/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 opacity-80 mb-2">
              <Award className="h-5 w-5" />
              <span className="font-medium">Total XP</span>
            </div>
            <div className="text-4xl font-bold font-display">{completedCount * 100}</div>
          </div>
          <div className="mt-6 text-sm opacity-80">
            You earn 100 XP for every completed lesson!
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="bg-white rounded-3xl p-8 border shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-foreground font-bold text-xl">
             <BarChart3 className="h-5 w-5 text-primary" />
             <h2>Learning Activity</h2>
          </div>
          
          <div className="space-y-4">
             {completedLessons.length > 0 ? (
               completedLessons.slice(0, 5).map((item) => (
                 <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <span className="font-medium">{item.lesson.title}</span>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-white rounded-lg border">
                      Completed
                    </span>
                 </div>
               ))
             ) : (
               <div className="text-center py-8 text-muted-foreground">
                 No activity yet. Start your first lesson!
               </div>
             )}
          </div>
        </section>

        {/* Motivation Card */}
        <section className="bg-gradient-to-br from-accent/20 to-primary/5 rounded-3xl p-8 border border-accent/20">
          <h2 className="font-bold text-xl mb-4 text-foreground">Weekly Goal</h2>
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>2 / 5 Lessons</span>
            <span className="text-primary">40%</span>
          </div>
          <div className="w-full bg-white h-3 rounded-full overflow-hidden mb-6 shadow-sm">
            <div className="bg-accent h-full w-[40%] rounded-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Completing 5 lessons a week significantly improves retention. You're doing great!
          </p>
        </section>
      </div>
    </Layout>
  );
}
