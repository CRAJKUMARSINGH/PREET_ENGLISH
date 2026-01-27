import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernBadge from '../ui/ModernBadge';
import CelebrationEffect from '../ui/CelebrationEffect';
var AchievementUnlock = function (_a) {
    var achievement = _a.achievement, onClose = _a.onClose, _b = _a.autoClose, autoClose = _b === void 0 ? true : _b, _c = _a.autoCloseDelay, autoCloseDelay = _c === void 0 ? 5000 : _c;
    var _d = useState(false), isVisible = _d[0], setIsVisible = _d[1];
    var _e = useState(false), showCelebration = _e[0], setShowCelebration = _e[1];
    useEffect(function () {
        // Trigger entrance animation
        var timer = setTimeout(function () {
            setIsVisible(true);
            setShowCelebration(true);
        }, 100);
        // Auto close
        if (autoClose) {
            var closeTimer_1 = setTimeout(function () {
                handleClose();
            }, autoCloseDelay);
            return function () {
                clearTimeout(timer);
                clearTimeout(closeTimer_1);
            };
        }
        return function () { return clearTimeout(timer); };
    }, [autoClose, autoCloseDelay]);
    var handleClose = function () {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };
    var rarityConfig = {
        common: {
            gradient: 'from-neutral-400 to-neutral-600',
            glow: 'shadow-neutral-500/50',
            border: 'border-neutral-400',
            celebration: 'sparkles',
        },
        rare: {
            gradient: 'from-blue-400 to-blue-600',
            glow: 'shadow-blue-500/50',
            border: 'border-blue-400',
            celebration: 'confetti',
        },
        epic: {
            gradient: 'from-purple-400 to-purple-600',
            glow: 'shadow-purple-500/50',
            border: 'border-purple-400',
            celebration: 'fireworks',
        },
        legendary: {
            gradient: 'from-yellow-400 via-orange-500 to-red-500',
            glow: 'shadow-orange-500/50',
            border: 'border-orange-400',
            celebration: 'fireworks',
        },
    };
    var config = rarityConfig[achievement.rarity];
    return (<>
      {/* Backdrop */}
      <div className={cn('fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300', isVisible ? 'opacity-100' : 'opacity-0')} onClick={handleClose}/>
      
      {/* Achievement Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <ModernCard variant="glass" className={cn('max-w-md w-full transform transition-all duration-500', isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-75 opacity-0 translate-y-8', config.glow, 'animate-glow')}>
          <div className="p-6 text-center space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                🎉 Achievement Unlocked!
              </h3>
              <ModernBadge variant="primary" className={cn('text-xs uppercase tracking-wide', config.border)}>
                {achievement.rarity}
              </ModernBadge>
            </div>
            
            {/* Achievement Icon */}
            <div className={cn('mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl', 'bg-gradient-to-br', config.gradient, 'shadow-2xl', config.glow, 'animate-bounce-in')}>
              {achievement.icon}
            </div>
            
            {/* Achievement Details */}
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {achievement.title}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {achievement.description}
              </p>
            </div>
            
            {/* XP Reward */}
            <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full', 'bg-gradient-to-r from-primary-500 to-primary-600', 'text-white font-semibold shadow-lg')}>
              <span className="text-lg">⭐</span>
              <span>+{achievement.xpReward} XP</span>
            </div>
            
            {/* Close Button */}
            <button onClick={handleClose} className={cn('mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-200', 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300', 'hover:bg-neutral-200 dark:hover:bg-neutral-700', 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2')}>
              Continue Learning
            </button>
          </div>
        </ModernCard>
      </div>
      
      {/* Celebration Effect */}
      <CelebrationEffect trigger={showCelebration} type={config.celebration} intensity="high" duration={3000} onComplete={function () { return setShowCelebration(false); }}/>
    </>);
};
export default AchievementUnlock;
