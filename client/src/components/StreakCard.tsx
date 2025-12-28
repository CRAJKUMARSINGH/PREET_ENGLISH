import { Flame, Trophy, Target, Zap } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  xpPoints: number;
  level: number;
}

export function StreakCard({ currentStreak, longestStreak, xpPoints, level }: StreakCardProps) {
  // Calculate XP needed for next level (100 XP per level)
  const xpForNextLevel = level * 100;
  const xpProgress = (xpPoints % 100) / 100 * 100;

  return (
    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Flame className="h-8 w-8" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium">दैनिक स्ट्रीक</p>
            <p className="text-4xl font-bold">{currentStreak}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/80 text-sm">सबसे लंबी</p>
          <p className="text-2xl font-bold">{longestStreak} दिन</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-300" />
            <span className="text-white/80 text-sm">XP पॉइंट्स</span>
          </div>
          <p className="text-2xl font-bold">{xpPoints.toLocaleString()}</p>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-yellow-300" />
            <span className="text-white/80 text-sm">लेवल</span>
          </div>
          <p className="text-2xl font-bold">{level}</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-white/80 mb-1">
          <span>अगला लेवल</span>
          <span>{xpPoints % 100}/{100} XP</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
