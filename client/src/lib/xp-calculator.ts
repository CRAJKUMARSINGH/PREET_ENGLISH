/**
 * XP CALCULATION SYSTEM
 * Advanced gamification logic for Preet English
 */

export interface XPEvent {
  type: 'lesson_complete' | 'quiz_complete' | 'streak_milestone' | 'achievement_unlock' | 'daily_goal_complete' | 'perfect_score' | 'speaking_practice' | 'vocabulary_mastery';
  baseXP: number;
  multipliers?: {
    difficulty?: number;
    streak?: number;
    perfect?: number;
    speed?: number;
  };
  metadata?: {
    lessonId?: number;
    score?: number;
    timeSpent?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    streakCount?: number;
  };
}

export class XPCalculator {
  private static readonly BASE_XP_VALUES = {
    lesson_complete: 10,
    quiz_complete: 15,
    streak_milestone: 25,
    achievement_unlock: 50,
    daily_goal_complete: 30,
    perfect_score: 20,
    speaking_practice: 12,
    vocabulary_mastery: 8,
  };

  private static readonly DIFFICULTY_MULTIPLIERS = {
    beginner: 1.0,
    intermediate: 1.5,
    advanced: 2.0,
  };

  private static readonly STREAK_MULTIPLIERS: Record<number, number> = {
    1: 1.0,
    3: 1.1,
    7: 1.2,
    14: 1.3,
    30: 1.5,
    60: 1.7,
    100: 2.0,
  };

  /**
   * Calculate XP for a given event
   */
  static calculateXP(event: XPEvent): number {
    let totalXP = event.baseXP || this.BASE_XP_VALUES[event.type];

    // Apply difficulty multiplier
    if (event.metadata?.difficulty) {
      const multiplier = event.multipliers?.difficulty ?? this.DIFFICULTY_MULTIPLIERS[event.metadata.difficulty];
      totalXP *= multiplier;
    }

    // Apply streak multiplier
    if (event.metadata?.streakCount) {
      const baseMultiplier = this.getStreakMultiplier(event.metadata.streakCount);
      const multiplier = event.multipliers?.streak ?? baseMultiplier;
      totalXP *= multiplier;
    }

    // Apply perfect score bonus
    if (event.metadata?.score === 100) {
      const multiplier = event.multipliers?.perfect ?? 1.5; // 50% bonus for perfect scores
      totalXP *= multiplier;
    }

    // Apply speed bonus (completed faster than average)
    if (event.metadata?.timeSpent) {
      const baseMultiplier = this.calculateSpeedBonus(event.metadata.timeSpent, event.type);
      const multiplier = event.multipliers?.speed ?? baseMultiplier;
      totalXP *= multiplier;
    }

    return Math.round(totalXP);
  }

  /**
   * Get streak multiplier based on current streak count
   */
  private static getStreakMultiplier(streakCount: number): number {
    const milestones = Object.keys(this.STREAK_MULTIPLIERS)
      .map(Number)
      .sort((a, b) => b - a);

    for (const milestone of milestones) {
      if (streakCount >= milestone) {
        return this.STREAK_MULTIPLIERS[milestone];
      }
    }

    return 1.0;
  }

  /**
   * Calculate speed bonus based on completion time
   */
  private static calculateSpeedBonus(timeSpent: number, eventType: XPEvent['type']): number {
    const averageTimes: Record<string, number> = {
      lesson_complete: 300, // 5 minutes
      quiz_complete: 180,   // 3 minutes
      speaking_practice: 240, // 4 minutes
      vocabulary_mastery: 120, // 2 minutes
    };

    const averageTime = averageTimes[eventType];
    if (!averageTime) return 1.0;

    // If completed in less than 75% of average time, give bonus
    if (timeSpent < averageTime * 0.75) {
      return 1.25; // 25% speed bonus
    }

    // If completed in less than 90% of average time, give small bonus
    if (timeSpent < averageTime * 0.9) {
      return 1.1; // 10% speed bonus
    }

    return 1.0;
  }

  /**
   * Calculate level from total XP
   */
  static calculateLevel(totalXP: number): number {
    // Level formula: Level = floor(sqrt(XP / 100)) + 1
    // This creates a curve where each level requires more XP
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  }

  /**
   * Calculate XP needed for next level
   */
  static getXPForNextLevel(currentLevel: number): number {
    // XP needed for level N = (N-1)^2 * 100
    return Math.pow(currentLevel, 2) * 100;
  }

  /**
   * Calculate XP progress to next level
   */
  static getLevelProgress(totalXP: number): {
    currentLevel: number;
    xpInCurrentLevel: number;
    xpNeededForNext: number;
    progressPercentage: number;
  } {
    const currentLevel = this.calculateLevel(totalXP);
    const xpForCurrentLevel = this.getXPForNextLevel(currentLevel - 1);
    const xpForNextLevel = this.getXPForNextLevel(currentLevel);
    
    const xpInCurrentLevel = totalXP - xpForCurrentLevel;
    const xpNeededForNext = xpForNextLevel - totalXP;
    const progressPercentage = (xpInCurrentLevel / (xpForNextLevel - xpForCurrentLevel)) * 100;

    return {
      currentLevel,
      xpInCurrentLevel,
      xpNeededForNext,
      progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
    };
  }

  /**
   * Generate achievement suggestions based on user activity
   */
  static suggestAchievements(userStats: {
    totalXP: number;
    currentStreak: number;
    lessonsCompleted: number;
    quizzesCompleted: number;
    perfectScores: number;
  }): string[] {
    const suggestions: string[] = [];

    // Streak-based achievements
    if (userStats.currentStreak >= 7 && userStats.currentStreak < 14) {
      suggestions.push('Week Warrior - Maintain a 14-day streak');
    }
    if (userStats.currentStreak >= 14 && userStats.currentStreak < 30) {
      suggestions.push('Month Master - Maintain a 30-day streak');
    }

    // Lesson-based achievements
    if (userStats.lessonsCompleted >= 10 && userStats.lessonsCompleted < 25) {
      suggestions.push('Dedicated Learner - Complete 25 lessons');
    }
    if (userStats.lessonsCompleted >= 25 && userStats.lessonsCompleted < 50) {
      suggestions.push('Knowledge Seeker - Complete 50 lessons');
    }

    // Perfect score achievements
    if (userStats.perfectScores >= 5 && userStats.perfectScores < 10) {
      suggestions.push('Perfectionist - Score 100% on 10 lessons');
    }

    // XP-based achievements
    const level = this.calculateLevel(userStats.totalXP);
    if (level >= 5 && level < 10) {
      suggestions.push('Rising Star - Reach Level 10');
    }
    if (level >= 10 && level < 20) {
      suggestions.push('Expert Learner - Reach Level 20');
    }

    return suggestions;
  }

  /**
   * Calculate daily XP goal based on user level and activity
   */
  static calculateDailyXPGoal(userLevel: number, averageDailyXP: number): number {
    const baseGoal = 50; // Base daily XP goal
    const levelMultiplier = 1 + (userLevel * 0.1); // Increase by 10% per level
    const activityMultiplier = Math.max(0.8, Math.min(1.5, averageDailyXP / baseGoal));

    return Math.round(baseGoal * levelMultiplier * activityMultiplier);
  }

  /**
   * Generate motivational messages based on XP events
   */
  static getMotivationalMessage(event: XPEvent, xpEarned: number): string {
    const messages: Record<XPEvent['type'], string[]> = {
      lesson_complete: [
        `शाबाश! ${xpEarned} XP earned! 🌟`,
        `Great job! You've earned ${xpEarned} XP! 📚`,
        `Excellent work! +${xpEarned} XP! Keep learning! 🚀`,
      ],
      quiz_complete: [
        `Quiz completed! ${xpEarned} XP earned! 🧠`,
        `Well done! +${xpEarned} XP for your quiz! 🎯`,
        `Smart thinking! You've earned ${xpEarned} XP! 💡`,
      ],
      streak_milestone: [
        `Amazing streak! ${xpEarned} XP bonus! 🔥`,
        `Consistency pays off! +${xpEarned} XP! 📈`,
        `Streak master! You've earned ${xpEarned} XP! ⚡`,
      ],
      achievement_unlock: [
        `Achievement unlocked! ${xpEarned} XP bonus! 🏆`,
        `Milestone reached! +${xpEarned} XP! 🎯`,
        `Outstanding achievement! ${xpEarned} XP earned! ✨`,
      ],
      daily_goal_complete: [
        `Daily goal achieved! ${xpEarned} XP bonus! 🎯`,
        `Consistency is key! +${xpEarned} XP! 📈`,
        `Daily target hit! ${xpEarned} XP earned! 🌟`,
      ],
      perfect_score: [
        `Perfect! ${xpEarned} XP for flawless performance! 💎`,
        `Outstanding! +${xpEarned} XP for 100% score! 🏆`,
        `Perfection achieved! ${xpEarned} XP earned! ✨`,
      ],
      speaking_practice: [
        `Great speaking practice! ${xpEarned} XP earned! 🗣️`,
        `Voice confidence building! +${xpEarned} XP! 🎤`,
        `Speaking skills improved! ${xpEarned} XP earned! 💬`,
      ],
      vocabulary_mastery: [
        `Vocabulary mastered! ${xpEarned} XP earned! 📖`,
        `Word power increased! +${xpEarned} XP! 💪`,
        `Language skills growing! ${xpEarned} XP earned! 🌱`,
      ],
    };

    const eventMessages = messages[event.type] || [`Great job! +${xpEarned} XP! 🎉`];
    return eventMessages[Math.floor(Math.random() * eventMessages.length)];
  }
}

/**
 * Hook for easy XP calculation in components
 */
export function useXPCalculator() {
  const calculateAndAwardXP = (event: XPEvent) => {
    const xpEarned = XPCalculator.calculateXP(event);
    const message = XPCalculator.getMotivationalMessage(event, xpEarned);
    
    return {
      xpEarned,
      message,
      levelProgress: XPCalculator.getLevelProgress(xpEarned), // This would need current total XP
    };
  };

  return {
    calculateXP: XPCalculator.calculateXP,
    calculateLevel: XPCalculator.calculateLevel,
    getLevelProgress: XPCalculator.getLevelProgress,
    suggestAchievements: XPCalculator.suggestAchievements,
    calculateDailyXPGoal: XPCalculator.calculateDailyXPGoal,
    calculateAndAwardXP,
  };
}