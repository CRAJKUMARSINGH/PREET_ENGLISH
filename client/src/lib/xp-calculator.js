/**
 * XP CALCULATION SYSTEM
 * Advanced gamification logic for Preet English
 */
var XPCalculator = /** @class */ (function () {
    function XPCalculator() {
    }
    /**
     * Calculate XP for a given event
     */
    XPCalculator.calculateXP = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var totalXP = event.baseXP || this.BASE_XP_VALUES[event.type];
        // Apply difficulty multiplier
        if ((_a = event.metadata) === null || _a === void 0 ? void 0 : _a.difficulty) {
            var multiplier = (_c = (_b = event.multipliers) === null || _b === void 0 ? void 0 : _b.difficulty) !== null && _c !== void 0 ? _c : this.DIFFICULTY_MULTIPLIERS[event.metadata.difficulty];
            totalXP *= multiplier;
        }
        // Apply streak multiplier
        if ((_d = event.metadata) === null || _d === void 0 ? void 0 : _d.streakCount) {
            var baseMultiplier = this.getStreakMultiplier(event.metadata.streakCount);
            var multiplier = (_f = (_e = event.multipliers) === null || _e === void 0 ? void 0 : _e.streak) !== null && _f !== void 0 ? _f : baseMultiplier;
            totalXP *= multiplier;
        }
        // Apply perfect score bonus
        if (((_g = event.metadata) === null || _g === void 0 ? void 0 : _g.score) === 100) {
            var multiplier = (_j = (_h = event.multipliers) === null || _h === void 0 ? void 0 : _h.perfect) !== null && _j !== void 0 ? _j : 1.5; // 50% bonus for perfect scores
            totalXP *= multiplier;
        }
        // Apply speed bonus (completed faster than average)
        if ((_k = event.metadata) === null || _k === void 0 ? void 0 : _k.timeSpent) {
            var baseMultiplier = this.calculateSpeedBonus(event.metadata.timeSpent, event.type);
            var multiplier = (_m = (_l = event.multipliers) === null || _l === void 0 ? void 0 : _l.speed) !== null && _m !== void 0 ? _m : baseMultiplier;
            totalXP *= multiplier;
        }
        return Math.round(totalXP);
    };
    /**
     * Get streak multiplier based on current streak count
     */
    XPCalculator.getStreakMultiplier = function (streakCount) {
        var milestones = Object.keys(this.STREAK_MULTIPLIERS)
            .map(Number)
            .sort(function (a, b) { return b - a; });
        for (var _i = 0, milestones_1 = milestones; _i < milestones_1.length; _i++) {
            var milestone = milestones_1[_i];
            if (streakCount >= milestone) {
                return this.STREAK_MULTIPLIERS[milestone];
            }
        }
        return 1.0;
    };
    /**
     * Calculate speed bonus based on completion time
     */
    XPCalculator.calculateSpeedBonus = function (timeSpent, eventType) {
        var averageTimes = {
            lesson_complete: 300, // 5 minutes
            quiz_complete: 180, // 3 minutes
            speaking_practice: 240, // 4 minutes
            vocabulary_mastery: 120, // 2 minutes
        };
        var averageTime = averageTimes[eventType];
        if (!averageTime)
            return 1.0;
        // If completed in less than 75% of average time, give bonus
        if (timeSpent < averageTime * 0.75) {
            return 1.25; // 25% speed bonus
        }
        // If completed in less than 90% of average time, give small bonus
        if (timeSpent < averageTime * 0.9) {
            return 1.1; // 10% speed bonus
        }
        return 1.0;
    };
    /**
     * Calculate level from total XP
     */
    XPCalculator.calculateLevel = function (totalXP) {
        // Level formula: Level = floor(sqrt(XP / 100)) + 1
        // This creates a curve where each level requires more XP
        return Math.floor(Math.sqrt(totalXP / 100)) + 1;
    };
    /**
     * Calculate XP needed for next level
     */
    XPCalculator.getXPForNextLevel = function (currentLevel) {
        // XP needed for level N = (N-1)^2 * 100
        return Math.pow(currentLevel, 2) * 100;
    };
    /**
     * Calculate XP progress to next level
     */
    XPCalculator.getLevelProgress = function (totalXP) {
        var currentLevel = this.calculateLevel(totalXP);
        var xpForCurrentLevel = this.getXPForNextLevel(currentLevel - 1);
        var xpForNextLevel = this.getXPForNextLevel(currentLevel);
        var xpInCurrentLevel = totalXP - xpForCurrentLevel;
        var xpNeededForNext = xpForNextLevel - totalXP;
        var progressPercentage = (xpInCurrentLevel / (xpForNextLevel - xpForCurrentLevel)) * 100;
        return {
            currentLevel: currentLevel,
            xpInCurrentLevel: xpInCurrentLevel,
            xpNeededForNext: xpNeededForNext,
            progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
        };
    };
    /**
     * Generate achievement suggestions based on user activity
     */
    XPCalculator.suggestAchievements = function (userStats) {
        var suggestions = [];
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
        var level = this.calculateLevel(userStats.totalXP);
        if (level >= 5 && level < 10) {
            suggestions.push('Rising Star - Reach Level 10');
        }
        if (level >= 10 && level < 20) {
            suggestions.push('Expert Learner - Reach Level 20');
        }
        return suggestions;
    };
    /**
     * Calculate daily XP goal based on user level and activity
     */
    XPCalculator.calculateDailyXPGoal = function (userLevel, averageDailyXP) {
        var baseGoal = 50; // Base daily XP goal
        var levelMultiplier = 1 + (userLevel * 0.1); // Increase by 10% per level
        var activityMultiplier = Math.max(0.8, Math.min(1.5, averageDailyXP / baseGoal));
        return Math.round(baseGoal * levelMultiplier * activityMultiplier);
    };
    /**
     * Generate motivational messages based on XP events
     */
    XPCalculator.getMotivationalMessage = function (event, xpEarned) {
        var messages = {
            lesson_complete: [
                "\u0936\u093E\u092C\u093E\u0936! ".concat(xpEarned, " XP earned! \uD83C\uDF1F"),
                "Great job! You've earned ".concat(xpEarned, " XP! \uD83D\uDCDA"),
                "Excellent work! +".concat(xpEarned, " XP! Keep learning! \uD83D\uDE80"),
            ],
            quiz_complete: [
                "Quiz completed! ".concat(xpEarned, " XP earned! \uD83E\uDDE0"),
                "Well done! +".concat(xpEarned, " XP for your quiz! \uD83C\uDFAF"),
                "Smart thinking! You've earned ".concat(xpEarned, " XP! \uD83D\uDCA1"),
            ],
            streak_milestone: [
                "Amazing streak! ".concat(xpEarned, " XP bonus! \uD83D\uDD25"),
                "Consistency pays off! +".concat(xpEarned, " XP! \uD83D\uDCC8"),
                "Streak master! You've earned ".concat(xpEarned, " XP! \u26A1"),
            ],
            achievement_unlock: [
                "Achievement unlocked! ".concat(xpEarned, " XP bonus! \uD83C\uDFC6"),
                "Milestone reached! +".concat(xpEarned, " XP! \uD83C\uDFAF"),
                "Outstanding achievement! ".concat(xpEarned, " XP earned! \u2728"),
            ],
            daily_goal_complete: [
                "Daily goal achieved! ".concat(xpEarned, " XP bonus! \uD83C\uDFAF"),
                "Consistency is key! +".concat(xpEarned, " XP! \uD83D\uDCC8"),
                "Daily target hit! ".concat(xpEarned, " XP earned! \uD83C\uDF1F"),
            ],
            perfect_score: [
                "Perfect! ".concat(xpEarned, " XP for flawless performance! \uD83D\uDC8E"),
                "Outstanding! +".concat(xpEarned, " XP for 100% score! \uD83C\uDFC6"),
                "Perfection achieved! ".concat(xpEarned, " XP earned! \u2728"),
            ],
            speaking_practice: [
                "Great speaking practice! ".concat(xpEarned, " XP earned! \uD83D\uDDE3\uFE0F"),
                "Voice confidence building! +".concat(xpEarned, " XP! \uD83C\uDFA4"),
                "Speaking skills improved! ".concat(xpEarned, " XP earned! \uD83D\uDCAC"),
            ],
            vocabulary_mastery: [
                "Vocabulary mastered! ".concat(xpEarned, " XP earned! \uD83D\uDCD6"),
                "Word power increased! +".concat(xpEarned, " XP! \uD83D\uDCAA"),
                "Language skills growing! ".concat(xpEarned, " XP earned! \uD83C\uDF31"),
            ],
        };
        var eventMessages = messages[event.type] || ["Great job! +".concat(xpEarned, " XP! \uD83C\uDF89")];
        return eventMessages[Math.floor(Math.random() * eventMessages.length)];
    };
    XPCalculator.BASE_XP_VALUES = {
        lesson_complete: 10,
        quiz_complete: 15,
        streak_milestone: 25,
        achievement_unlock: 50,
        daily_goal_complete: 30,
        perfect_score: 20,
        speaking_practice: 12,
        vocabulary_mastery: 8,
    };
    XPCalculator.DIFFICULTY_MULTIPLIERS = {
        beginner: 1.0,
        intermediate: 1.5,
        advanced: 2.0,
    };
    XPCalculator.STREAK_MULTIPLIERS = {
        1: 1.0,
        3: 1.1,
        7: 1.2,
        14: 1.3,
        30: 1.5,
        60: 1.7,
        100: 2.0,
    };
    return XPCalculator;
}());
export { XPCalculator };
/**
 * Hook for easy XP calculation in components
 */
export function useXPCalculator() {
    var calculateAndAwardXP = function (event) {
        var xpEarned = XPCalculator.calculateXP(event);
        var message = XPCalculator.getMotivationalMessage(event, xpEarned);
        return {
            xpEarned: xpEarned,
            message: message,
            levelProgress: XPCalculator.getLevelProgress(xpEarned), // This would need current total XP
        };
    };
    return {
        calculateXP: XPCalculator.calculateXP,
        calculateLevel: XPCalculator.calculateLevel,
        getLevelProgress: XPCalculator.getLevelProgress,
        suggestAchievements: XPCalculator.suggestAchievements,
        calculateDailyXPGoal: XPCalculator.calculateDailyXPGoal,
        calculateAndAwardXP: calculateAndAwardXP,
    };
}
