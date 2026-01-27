import { Layout } from "@/components/Layout";
import { useLeaderboard } from "@/hooks/use-gamification";
import { Loader2, Trophy, Clock, Shield, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Leaderboard() {
    const { data: leaderboard, isLoading } = useLeaderboard();

    // Mock checking "Weekly Reset" - in real app, calculate time to next Sunday midnight
    const daysLeft = 3;

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    const top3 = leaderboard?.slice(0, 3) || [];
    const rest = leaderboard?.slice(3) || [];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">साप्ताहिक लीडरबोर्ड (Weekly Leaderboard)</h1>
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4" />
                        अगला रिसेट {daysLeft} दिनों में (Next reset in {daysLeft} days)
                    </p>
                </div>

                {/* Top 3 Podium */}
                <div className="flex justify-center items-end gap-4 min-h-[220px]">
                    {/* 2nd Place */}
                    {top3[1] && (
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-full border-4 border-slate-300 bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700 shadow-lg mb-2 relative">
                                    {top3[1].user.username.charAt(0).toUpperCase()}
                                    <div className="absolute -bottom-2 bg-slate-400 text-white text-xs px-2 py-0.5 rounded-full font-bold">#2</div>
                                </div>
                                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{top3[1].user.username}</p>
                                <p className="text-sm font-semibold text-primary">{top3[1].xpEarned} XP</p>
                            </motion.div>
                            <motion.div
                                className="w-24 bg-slate-300/30 rounded-t-lg h-24 mt-2"
                                initial={{ height: 0 }}
                                animate={{ height: 96 }}
                            />
                        </div>
                    )}

                    {/* 1st Place */}
                    {top3[0] && (
                        <div className="flex flex-col items-center z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Crown className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-2 animate-bounce" />
                                <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-yellow-100 flex items-center justify-center text-3xl font-bold text-yellow-700 shadow-xl mb-2 relative ring-4 ring-yellow-400/20">
                                    {top3[0].user.username.charAt(0).toUpperCase()}
                                    <div className="absolute -bottom-3 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-sm">#1</div>
                                </div>
                                <p className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-1">{top3[0].user.username}</p>
                                <p className="font-bold text-primary">{top3[0].xpEarned} XP</p>
                            </motion.div>
                            <motion.div
                                className="w-32 bg-yellow-400/20 rounded-t-lg h-32 mt-2"
                                initial={{ height: 0 }}
                                animate={{ height: 128 }}
                            />
                        </div>
                    )}

                    {/* 3rd Place */}
                    {top3[2] && (
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-full border-4 border-amber-600 bg-amber-100 flex items-center justify-center text-2xl font-bold text-amber-800 shadow-lg mb-2 relative">
                                    {top3[2].user.username.charAt(0).toUpperCase()}
                                    <div className="absolute -bottom-2 bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full font-bold">#3</div>
                                </div>
                                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">{top3[2].user.username}</p>
                                <p className="text-sm font-semibold text-primary">{top3[2].xpEarned} XP</p>
                            </motion.div>
                            <motion.div
                                className="w-24 bg-amber-700/20 rounded-t-lg h-16 mt-2"
                                initial={{ height: 0 }}
                                animate={{ height: 64 }}
                            />
                        </div>
                    )}
                </div>

                {/* The Rest of the List */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    {rest.map((entry, index) => (
                        <div
                            key={entry.user.id}
                            className={cn(
                                "flex items-center p-4 gap-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                                entry.user.id === 1 && "bg-primary/5 hover:bg-primary/10" // Highlight current user (mock ID 1)
                            )}
                        >
                            <span className="w-8 text-center font-bold text-muted-foreground">#{index + 4}</span>
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-600">
                                {entry.user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className={cn("font-medium", entry.user.id === 1 && "text-primary font-bold")}>
                                    {entry.user.username} {entry.user.id === 1 && "(You)"}
                                </p>
                                <p className="text-xs text-muted-foreground">{entry.lessonsCompleted} lessons completed</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-700 dark:text-slate-300">{entry.xpEarned} XP</p>
                            </div>
                        </div>
                    ))}
                    {rest.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No other players yet. Be the first to climb the ranks!
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
