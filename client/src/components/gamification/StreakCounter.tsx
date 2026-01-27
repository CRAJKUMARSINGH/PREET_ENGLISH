import { useTranslation } from 'react-i18next';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
  showAnimation?: boolean;
}

export function StreakCounter({ 
  currentStreak, 
  longestStreak, 
  lastActiveDate,
  showAnimation = false 
}: StreakCounterProps) {
  const { t } = useTranslation();
  
  const isActiveToday = lastActiveDate === new Date().toISOString().split('T')[0];
  
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-purple-500 to-pink-500';
    if (streak >= 14) return 'from-orange-500 to-red-500';
    if (streak >= 7) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return 'Legendary Streak! 🏆';
    if (streak >= 14) return 'Amazing Streak! 🔥';
    if (streak >= 7) return 'Great Streak! ⭐';
    if (streak >= 3) return 'Good Streak! 👍';
    return 'Keep Going! 💪';
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Streak
          </h3>
          {isActiveToday && (
            <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
              Active Today
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="text-center"
            initial={showAnimation ? { scale: 0.8, opacity: 0 } : false}
            animate={showAnimation ? { scale: 1, opacity: 1 } : false}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={`bg-gradient-to-r ${getStreakColor(currentStreak)} text-white rounded-lg p-3 mb-2`}>
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-xs opacity-90">Current</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {getStreakMessage(currentStreak)}
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={showAnimation ? { scale: 0.8, opacity: 0 } : false}
            animate={showAnimation ? { scale: 1, opacity: 1 } : false}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg p-3 mb-2">
              <div className="text-2xl font-bold">{longestStreak}</div>
              <div className="text-xs opacity-90">Best</div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Trophy className="h-3 w-3" />
              Personal Record
            </div>
          </motion.div>
        </div>

        {currentStreak > 0 && (
          <motion.div 
            className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800"
            initial={showAnimation ? { y: 20, opacity: 0 } : false}
            animate={showAnimation ? { y: 0, opacity: 1 } : false}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">
                Don't break the streak! Come back tomorrow to continue.
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}