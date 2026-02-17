import { useAuth } from "@/hooks/use-auth";
import { useUserStats, useDailyGoal } from "@/hooks/use-gamification";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { PageTransition } from "@/components/PageTransition";
import { StatsCard } from "@/components/StatsCard";
import { LessonCard } from "@/components/LessonCard";
import { Layout } from "@/components/Layout";
import {
    Trophy,
    Flame,
    Clock,
    Target,
    Zap,
    BookOpen,
    Loader2,
    ChevronRight,
    TrendingUp,
    Brain
} from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LiteDashboard() {
    const { user } = useAuth();
    const { data: stats, isLoading: statsLoading } = useUserStats();
    const { data: dailyGoal, isLoading: goalLoading } = useDailyGoal();
    const { data: lessons, isLoading: lessonsLoading } = useLessons();
    const { data: progressList, isLoading: progressLoading } = useProgress();

    const isLoading = statsLoading || goalLoading || lessonsLoading || progressLoading;

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    const completedCount = progressList?.filter((p: any) => p.completed).length || 0;
    const totalLessons = lessons?.length || 0;

    const nextLesson = lessons?.find(l => !progressList?.some(p => p.lessonId === l.id && p.completed)) || (lessons ? lessons[0] : null);

    return (
        <Layout>
            <PageTransition>
                <div className="max-w-6xl mx-auto space-y-10 py-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-bold tracking-tighter uppercase text-[10px]">
                                Active Learning Session
                            </Badge>
                            <h1 className="text-4xl font-black tracking-tight font-display">
                                Namaste, {user?.username || 'Learner'}!
                            </h1>
                            <p className="text-muted-foreground text-lg">Your high-performance dashboard is ready.</p>
                        </div>

                        <div className="flex items-center gap-3 bg-card/50 backdrop-blur-md px-6 py-4 rounded-3xl border border-border/50 shadow-sm border-b-4 border-b-orange-500/20">
                            <div className="p-3 bg-orange-500/10 rounded-2xl">
                                <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Current Streak</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black">{stats?.currentStreak || 0}</span>
                                    <span className="text-sm font-bold text-muted-foreground">Days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            title="Knowledge XP"
                            value={stats?.xpPoints || 0}
                            icon={Zap}
                            color="text-yellow-500"
                            description="Points earned"
                            trend={{ value: "+20%", isUp: true }}
                        />
                        <StatsCard
                            title="Lessons Mastery"
                            value={`${completedCount}/${totalLessons}`}
                            icon={BookOpen}
                            color="text-emerald-500"
                            description="Course progress"
                        />
                        <StatsCard
                            title="Learning Clock"
                            value={`${stats?.totalMinutesLearned || 0}m`}
                            icon={Clock}
                            color="text-blue-500"
                            description="Time spent learning"
                        />
                        <StatsCard
                            title="Daily Target"
                            value={`${dailyGoal?.lessonsCompleted || 0}/${dailyGoal?.lessonsTarget || 3}`}
                            icon={Target}
                            color="text-purple-500"
                            description="Today's goal"
                        />
                    </div>

                    {/* Next Lesson Highlight */}
                    {nextLesson && (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative glass-card p-1 overflow-hidden border-2 border-primary/10">
                                <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="space-y-6 flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                <TrendingUp className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-primary tracking-widest">Recommended for you</p>
                                                <h4 className="font-bold text-sm">Continue your path path to fluency</h4>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h2 className="text-3xl md:text-5xl font-black tracking-tight">{nextLesson.title}</h2>
                                            <p className="text-xl text-muted-foreground line-clamp-2 max-w-2xl">{nextLesson.description}</p>
                                        </div>

                                        <Link href={`/lesson/${nextLesson.id}`}>
                                            <Button size="lg" className="rounded-2xl px-8 h-14 text-lg font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                                Resume Learning <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="w-full md:w-80 shrink-0 transform group-hover:rotate-1 transition-transform duration-500">
                                        <LessonCard lesson={nextLesson} progress={progressList?.find(p => p.lessonId === nextLesson.id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                        <Brain className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    Recent Performance
                                </h3>
                                <Link href="/lessons">
                                    <Button variant="ghost" size="sm" className="font-bold text-primary">View All History</Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {lessons?.slice(0, 4).map(l => (
                                    <LessonCard key={l.id} lesson={l} progress={progressList?.find(p => p.lessonId === l.id)} />
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="glass-card p-8 rounded-[2rem] border-b-8 border-b-yellow-500/20">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-yellow-500" />
                                    Achievements
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Vocabulary Guru", progress: 85, color: "bg-blue-500" },
                                        { label: "Grammar Master", progress: 62, color: "bg-purple-500" },
                                        { label: "Speaking Elite", progress: 45, color: "bg-emerald-500" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span>{item.label}</span>
                                                <span>{item.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-8 rounded-xl font-bold" variant="outline">View All Badges</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </Layout>
    );
}
