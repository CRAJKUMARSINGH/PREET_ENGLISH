import { motion } from "framer-motion";
import { Flame, Award, Target, Zap } from "lucide-react";

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
    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full -ml-12 -mb-12 blur-xl" />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="h-8 w-8 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <div>
            <p className="text-white/80 text-sm font-medium">दैनिक स्ट्रीक</p>
            <motion.p
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentStreak}
            </motion.p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/80 text-sm">सबसे लंबी</p>
          <p className="text-2xl font-bold">{longestStreak} दिन</p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">
        <motion.div
          className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300" />
            <span className="text-white/80 text-sm">XP पॉइंट्स</span>
          </div>
          <p className="text-2xl font-bold">{xpPoints.toLocaleString()}</p>
        </motion.div>

        <motion.div
          className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-yellow-300" />
            <span className="text-white/80 text-sm">लेवल</span>
          </div>
          <p className="text-2xl font-bold">{level}</p>
        </motion.div>
      </div>

      {/* XP Progress Bar */}
      <div className="relative z-10 mt-4">
        <div className="flex justify-between text-sm text-white/80 mb-1">
          <span>अगला लेवल</span>
          <span>{xpPoints % 100}/{100} XP</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-yellow-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
