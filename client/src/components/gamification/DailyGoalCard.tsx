import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyGoal {
  id: string;
  type: 'lessons' | 'minutes' | 'xp' | 'vocabulary';
  target: number;
  current: number;
  title: string;
  titleHindi: string;
  icon: string;
  xpReward: number;
}

interface DailyGoalCardProps {
  goals: DailyGoal[];
  onClaimReward?: (goalId: string) => void;
}

const iconMap = {
  lessons: Target,
  minutes: Clock,
  xp: Zap,
  vocabulary: CheckCircle,
};

export function DailyGoalCard({ goals, onClaimReward }: DailyGoalCardProps) {
  const { t, i18n } = useTranslation();

  const completedGoals = goals.filter(goal => goal.current >= goal.target);
  const totalXPAvailable = goals.reduce((sum, goal) => sum + goal.xpReward, 0);
  const earnedXP = completedGoals.reduce((sum, goal) => sum + goal.xpReward, 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <Target className="h-5 w-5" />
          {t('daily_goals', 'Daily Goals')}
        </CardTitle>
        <div className="text-sm text-green-600 dark:text-green-400">
          {completedGoals.length}/{goals.length} completed • {earnedXP}/{totalXPAvailable} XP earned
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {goals.map((goal, index) => {
          const IconComponent = iconMap[goal.type as keyof typeof iconMap] || Target;
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.current >= goal.target;
          const title = i18n.language === 'hi' ? goal.titleHindi : goal.title;

          return (
            <motion.div
              key={goal.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{title}</div>
                    <div className="text-xs text-muted-foreground">
                      {goal.current}/{goal.target} • +{goal.xpReward} XP
                    </div>
                  </div>
                </div>
                
                {isCompleted && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => onClaimReward?.(goal.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Claim
                  </Button>
                )}
              </div>
              
              <Progress 
                value={progress} 
                className={`h-2 ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            </motion.div>
          );
        })}

        {completedGoals.length === goals.length && (
          <motion.div
            className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg border border-yellow-200 dark:border-yellow-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">
              All Goals Completed!
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">
              Amazing work! Come back tomorrow for new challenges.
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}