import React from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number;
  todayProgress: number;
  streakFreeze: number;
  className?: string;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak,
  dailyGoal,
  todayProgress,
  streakFreeze,
  className,
}) => {
  const progressPercentage = Math.min((todayProgress / dailyGoal) * 100, 100);
  const isGoalComplete = todayProgress >= dailyGoal;
  
  const getStreakColor = (streak: number) => {
    if (streak >= 100) return 'from-yellow-400 to-orange-500'; // Legendary
    if (streak >= 50) return 'from-purple-400 to-pink-500';    // Epic
    if (streak >= 20) return 'from-blue-400 to-indigo-500';   // Rare
    if (streak >= 7) return 'from-green-400 to-emerald-500';  // Good
    return 'from-neutral-400 to-neutral-500';                 // Starting
  };
  
  const getStreakEmoji = (streak: number) => {
    if (streak >= 100) return '🔥';
    if (streak >= 50) return '⚡';
    if (streak >= 20) return '💎';
    if (streak >= 7) return '🌟';
    return '✨';
  };
  
  const getStreakTitle = (streak: number) => {
    if (streak >= 100) return 'Legendary Streak!';
    if (streak >= 50) return 'Epic Streak!';
    if (streak >= 20) return 'Amazing Streak!';
    if (streak >= 7) return 'Great Streak!';
    return 'Building Streak';
  };
  
  return (
    <ModernCard variant="glass" className={cn('p-6', className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Daily Streak
          </h3>
          {streakFreeze > 0 && (
            <ModernBadge variant="secondary" size="sm">
              🛡️ {streakFreeze} Freeze{streakFreeze > 1 ? 's' : ''}
            </ModernBadge>
          )}
        </div>
        
        {/* Main Streak Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Streak Flame */}
            <div className={cn(
              'relative w-16 h-16 rounded-full flex items-center justify-center text-2xl',
              'bg-gradient-to-br',
              getStreakColor(currentStreak),
              'shadow-lg animate-float'
            )}>
              <span className="animate-pulse">{getStreakEmoji(currentStreak)}</span>
              
              {/* Streak glow effect */}
              {currentStreak >= 7 && (
                <div className={cn(
                  'absolute inset-0 rounded-full animate-ping opacity-75',
                  'bg-gradient-to-br',
                  getStreakColor(currentStreak)
                )} />
              )}
            </div>
            
            {/* Streak Info */}
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                  {currentStreak}
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  day{currentStreak !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {getStreakTitle(currentStreak)}
              </p>
            </div>
          </div>
          
          {/* Today's Progress */}
          <div className="text-center">
            <ProgressRing
              progress={progressPercentage}
              size="md"
              color={isGoalComplete ? 'success' : 'primary'}
              glow={isGoalComplete}
            >
              <div className="text-center">
                <div className="text-sm font-semibold">
                  {todayProgress}
                </div>
                <div className="text-xs text-neutral-500">
                  /{dailyGoal}
                </div>
              </div>
            </ProgressRing>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Today's Goal
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">
              Daily Progress
            </span>
            <span className={cn(
              'font-medium',
              isGoalComplete 
                ? 'text-success-600 dark:text-success-400' 
                : 'text-neutral-700 dark:text-neutral-300'
            )}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000 ease-out',
                isGoalComplete
                  ? 'bg-gradient-to-r from-success-400 to-success-600 animate-glow'
                  : 'bg-gradient-to-r from-primary-400 to-primary-600'
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {longestStreak}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Best Streak
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {Math.round((todayProgress / dailyGoal) * 100)}%
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Completion
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {streakFreeze}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Freezes Left
            </div>
          </div>
        </div>
        
        {/* Motivational Message */}
        {isGoalComplete ? (
          <div className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
            <p className="text-sm font-medium text-success-700 dark:text-success-300">
              🎉 Goal completed! Keep the streak alive tomorrow!
            </p>
          </div>
        ) : (
          <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
              💪 {dailyGoal - todayProgress} more to reach your daily goal!
            </p>
          </div>
        )}
      </div>
    </ModernCard>
  );
};

export default StreakTracker;