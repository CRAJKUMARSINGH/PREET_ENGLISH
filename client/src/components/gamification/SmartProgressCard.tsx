import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Target, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface SmartProgressCardProps {
  completedLessons: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyCompleted: number;
  estimatedTimeToComplete: string;
  nextRecommendedLesson?: {
    id: number;
    title: string;
    difficulty: string;
  };
}

export function SmartProgressCard({
  completedLessons,
  totalLessons,
  weeklyGoal,
  weeklyCompleted,
  estimatedTimeToComplete,
  nextRecommendedLesson
}: SmartProgressCardProps) {
  const overallProgress = (completedLessons / totalLessons) * 100;
  const weeklyProgress = (weeklyCompleted / weeklyGoal) * 100;
  
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-green-500 to-emerald-600";
    if (progress >= 60) return "from-blue-500 to-indigo-600";
    if (progress >= 40) return "from-yellow-500 to-orange-600";
    return "from-gray-400 to-gray-500";
  };

  const getMotivationalMessage = () => {
    if (overallProgress >= 90) return "Almost there! You're doing amazing! 🎉";
    if (overallProgress >= 75) return "Excellent progress! Keep it up! 🌟";
    if (overallProgress >= 50) return "Halfway there! You're on fire! 🔥";
    if (overallProgress >= 25) return "Great start! Building momentum! 💪";
    return "Your English journey begins now! 🚀";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20 border-primary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Learning Progress</h3>
              <p className="text-sm text-muted-foreground">{getMotivationalMessage()}</p>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {Math.round(overallProgress)}% Complete
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{completedLessons} / {totalLessons} lessons</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className={`h-full bg-gradient-to-r ${getProgressColor(overallProgress)} rounded-full shadow-sm`}
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">This Week's Goal</span>
            <span className="text-sm text-muted-foreground">{weeklyCompleted} / {weeklyGoal} lessons</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(weeklyProgress, 100)}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          {weeklyProgress >= 100 && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
              🎉 Weekly goal achieved! Great job!
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Est. Time</p>
            <p className="text-lg font-black text-foreground">{estimatedTimeToComplete}</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
            <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pace</p>
            <p className="text-lg font-black text-foreground">
              {weeklyCompleted > 0 ? `${Math.round((weeklyCompleted / 7) * 10) / 10}/day` : "0/day"}
            </p>
          </div>
        </div>

        {/* Next Recommended Lesson */}
        {nextRecommendedLesson && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Up Next</p>
                <h4 className="font-bold text-foreground mb-1">{nextRecommendedLesson.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {nextRecommendedLesson.difficulty}
                </Badge>
              </div>
              <Link href={`/lesson/${nextRecommendedLesson.id}`}>
                <Button size="sm" className="ml-4 group">
                  Start
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}