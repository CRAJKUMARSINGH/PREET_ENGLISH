import { Target, BookOpen, Clock, CheckCircle } from "lucide-react";

interface DailyGoalCardProps {
  lessonsTarget: number;
  lessonsCompleted: number;
  xpTarget: number;
  xpEarned: number;
  minutesTarget: number;
  minutesSpent: number;
}

export function DailyGoalCard({
  lessonsTarget,
  lessonsCompleted,
  xpTarget,
  xpEarned,
  minutesTarget,
  minutesSpent
}: DailyGoalCardProps) {
  const lessonsProgress = Math.min((lessonsCompleted / lessonsTarget) * 100, 100);
  const xpProgress = Math.min((xpEarned / xpTarget) * 100, 100);
  const minutesProgress = Math.min((minutesSpent / minutesTarget) * 100, 100);
  
  const allComplete = lessonsCompleted >= lessonsTarget && 
                      xpEarned >= xpTarget && 
                      minutesSpent >= minutesTarget;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-xl">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">आज का लक्ष्य</h3>
            <p className="text-sm text-muted-foreground">Daily Goal</p>
          </div>
        </div>
        {allComplete && (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            पूर्ण!
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Lessons Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">पाठ</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {lessonsCompleted}/{lessonsTarget}
            </span>
          </div>
          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${lessonsProgress}%` }}
            />
          </div>
        </div>

        {/* XP Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold text-sm">XP</span>
              <span className="text-sm font-medium">पॉइंट्स</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {xpEarned}/{xpTarget}
            </span>
          </div>
          <div className="h-2 bg-yellow-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Minutes Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">मिनट</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {minutesSpent}/{minutesTarget}
            </span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${minutesProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
