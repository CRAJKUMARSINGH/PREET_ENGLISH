import { Target, BookOpen, Clock, CheckCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
export function DailyGoalCard(_a) {
    var lessonsTarget = _a.lessonsTarget, lessonsCompleted = _a.lessonsCompleted, xpTarget = _a.xpTarget, xpEarned = _a.xpEarned, minutesTarget = _a.minutesTarget, minutesSpent = _a.minutesSpent;
    var lessonsProgress = Math.min((lessonsCompleted / lessonsTarget) * 100, 100);
    var xpProgress = Math.min((xpEarned / xpTarget) * 100, 100);
    var minutesProgress = Math.min((minutesSpent / minutesTarget) * 100, 100);
    var allComplete = lessonsCompleted >= lessonsTarget &&
        xpEarned >= xpTarget &&
        minutesSpent >= minutesTarget;
    return (<div className="glass-card rounded-[2rem] p-8 h-full border-border/50 relative overflow-hidden group">
      {/* Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"/>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3.5 rounded-2xl border border-primary/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Target className="h-6 w-6 text-primary"/>
          </div>
          <div>
            <h3 className="font-bold text-xl font-display tracking-tight">Daily Goals</h3>
            <p className="text-sm text-muted-foreground font-medium">Keep moving forward!</p>
          </div>
        </div>
        {allComplete && (<div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 animate-bounce-in">
            <CheckCircle className="h-4 w-4"/>
            Complete!
          </div>)}
      </div>

      <div className="space-y-6 relative z-10">
        {/* Lessons Goal */}
        <div className="group/item">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <BookOpen className="h-4 w-4"/>
              </div>
              <span className="text-sm font-bold text-foreground/80">Lessons</span>
            </div>
            <span className="text-sm font-bold font-mono text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
              {lessonsCompleted}/{lessonsTarget}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div className={cn("h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.2)]", lessonsProgress >= 100 ? "bg-green-500" : "bg-blue-500")} style={{ width: "".concat(lessonsProgress, "%") }}/>
          </div>
        </div>

        {/* XP Goal */}
        <div className="group/item">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                <Zap className="h-4 w-4"/>
              </div>
              <span className="text-sm font-bold text-foreground/80">XP Earned</span>
            </div>
            <span className="text-sm font-bold font-mono text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
              {xpEarned}/{xpTarget}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div className={cn("h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(234,179,8,0.2)]", xpProgress >= 100 ? "bg-green-500" : "bg-yellow-500")} style={{ width: "".concat(xpProgress, "%") }}/>
          </div>
        </div>

        {/* Minutes Goal */}
        <div className="group/item">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Clock className="h-4 w-4"/>
              </div>
              <span className="text-sm font-bold text-foreground/80">Minutes</span>
            </div>
            <span className="text-sm font-bold font-mono text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
              {minutesSpent}/{minutesTarget}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div className={cn("h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(168,85,247,0.2)]", minutesProgress >= 100 ? "bg-green-500" : "bg-purple-500")} style={{ width: "".concat(minutesProgress, "%") }}/>
          </div>
        </div>
      </div>
    </div>);
}
