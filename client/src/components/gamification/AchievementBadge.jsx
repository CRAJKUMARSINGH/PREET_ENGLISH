import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Flame, Target, BookOpen, MessageCircle, Zap, Crown, Award, Medal } from 'lucide-react';
var iconMap = {
    trophy: Trophy,
    star: Star,
    flame: Flame,
    target: Target,
    book: BookOpen,
    message: MessageCircle,
    zap: Zap,
    crown: Crown,
    award: Award,
    medal: Medal,
};
var rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
};
var rarityBorders = {
    common: 'border-gray-300',
    rare: 'border-blue-300',
    epic: 'border-purple-300',
    legendary: 'border-yellow-300',
};
export function AchievementBadge(_a) {
    var achievement = _a.achievement, _b = _a.isUnlocked, isUnlocked = _b === void 0 ? false : _b, _c = _a.showAnimation, showAnimation = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? 'md' : _d;
    var _e = useTranslation(), t = _e.t, i18n = _e.i18n;
    var IconComponent = iconMap[achievement.icon] || Trophy;
    var sizeClasses = {
        sm: 'w-16 h-16 p-2',
        md: 'w-20 h-20 p-3',
        lg: 'w-24 h-24 p-4',
    };
    var iconSizes = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
    };
    var title = i18n.language === 'hi' ? achievement.titleHindi : achievement.title;
    var description = i18n.language === 'hi' ? achievement.descriptionHindi : achievement.description;
    return (<motion.div className="relative group cursor-pointer" initial={showAnimation ? { scale: 0, rotate: -180 } : false} animate={showAnimation ? { scale: 1, rotate: 0 } : false} transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 15
        }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <div className={"\n          ".concat(sizeClasses[size], "\n          rounded-full border-2 ").concat(rarityBorders[achievement.rarity], "\n          ").concat(isUnlocked
            ? "bg-gradient-to-br ".concat(rarityColors[achievement.rarity], " text-white shadow-lg")
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500', "\n          flex items-center justify-center transition-all duration-300\n          ").concat(isUnlocked ? 'shadow-lg hover:shadow-xl' : 'opacity-60', "\n        ")}>
        <IconComponent className={iconSizes[size]}/>
        
        {isUnlocked && achievement.rarity === 'legendary' && (<motion.div className="absolute inset-0 rounded-full" animate={{
                boxShadow: [
                    '0 0 0 0 rgba(255, 215, 0, 0.4)',
                    '0 0 0 10px rgba(255, 215, 0, 0)',
                    '0 0 0 0 rgba(255, 215, 0, 0)',
                ],
            }} transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
            }}/>)}
      </div>

      {/* Progress indicator for partially completed achievements */}
      {!isUnlocked && achievement.progress !== undefined && achievement.maxProgress && (<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium border shadow-sm">
            {achievement.progress}/{achievement.maxProgress}
          </div>
        </div>)}

      {/* Rarity indicator */}
      <div className="absolute -top-1 -right-1">
        <Badge variant="secondary" className={"text-xs px-1 py-0 ".concat(achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
            achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800')}>
          {achievement.rarity.charAt(0).toUpperCase()}
        </Badge>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg p-3 shadow-lg max-w-xs">
          <div className="font-semibold mb-1">{title}</div>
          <div className="text-xs opacity-90 mb-2">{description}</div>
          <div className="flex items-center justify-between text-xs">
            <span className="capitalize">{achievement.rarity}</span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3"/>
              {achievement.xpReward} XP
            </span>
          </div>
          {isUnlocked && achievement.unlockedAt && (<div className="text-xs opacity-75 mt-1">
              Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>)}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black dark:border-t-white"></div>
      </div>
    </motion.div>);
}
