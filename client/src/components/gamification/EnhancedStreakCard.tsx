import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

interface EnhancedStreakCardProps {
  currentStreak: number;
  longestStreak: number;
  xpPoints: number;
  level: number;
  todayCompleted?: boolean;
}

export function EnhancedStreakCard({ 
  currentStreak, 
  longestStreak, 
  xpPoints, 
  level,
  todayCompleted = false 
}: EnhancedStreakCardProps) {
  const streakMilestones = [3, 7, 14, 30, 60, 100];
  const nextMilestone = streakMilestones.find(m => m > currentStreak) || 365;
  const progress = currentStreak / nextMilestone;

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-500";
    if (streak >= 14) return "text-blue-500";
    if (streak >= 7) return "text-green-500";
    if (streak >= 3) return "text-orange-500";
    return "text-gray-400";
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⚡";
    if (streak >= 7) return "🌟";
    if (streak >= 3) return "✨";
    return "💫";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200/50 dark:border-orange-800/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <Flame className={`h-5 w-5 ${getStreakColor(currentStreak)}`} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Daily Streak</h3>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Level {level}
          </Badge>
        </div>

        {/* Main streak display */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-4xl font-black text-foreground mb-1"
          >
            {currentStreak}
            <span className="text-2xl ml-1">{getStreakEmoji(currentStreak)}</span>
          </motion.div>
          <p className="text-sm text-muted-foreground">
            {currentStreak === 0 ? "Start your streak today!" : 
             currentStreak === 1 ? "Great start!" :
             `${nextMilestone - currentStreak} days to ${nextMilestone}-day milestone`}
          </p>
        </div>

        {/* Progress bar to next milestone */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress to {nextMilestone} days</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-xl bg-white/50 dark:bg-black/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-bold text-muted-foreground">BEST</span>
            </div>
            <p className="text-lg font-black text-foreground">{longestStreak}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/50 dark:bg-black/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground">XP</span>
            </div>
            <p className="text-lg font-black text-foreground">{xpPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Today's status */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${todayCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-xs font-medium text-muted-foreground">
            {todayCompleted ? "Today completed!" : "Complete today's lesson"}
          </span>
        </div>
      </div>
    </Card>
  );
}