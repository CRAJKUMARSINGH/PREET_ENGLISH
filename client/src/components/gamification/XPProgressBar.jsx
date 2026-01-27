import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
export function XPProgressBar(_a) {
    var currentXP = _a.currentXP, nextLevelXP = _a.nextLevelXP, level = _a.level, _b = _a.showAnimation, showAnimation = _b === void 0 ? false : _b;
    var t = useTranslation().t;
    var progress = (currentXP / nextLevelXP) * 100;
    var remainingXP = nextLevelXP - currentXP;
    return (<motion.div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800" initial={showAnimation ? { scale: 0.95, opacity: 0 } : false} animate={showAnimation ? { scale: 1, opacity: 1 } : false} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            <Star className="h-3 w-3"/>
            Level {level}
          </div>
          <span className="text-sm text-muted-foreground">
            {currentXP} / {nextLevelXP} XP
          </span>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <Zap className="h-4 w-4"/>
          <span className="text-sm font-medium">
            {remainingXP} XP to next level
          </span>
        </div>
      </div>
      
      <Progress value={progress} className="h-3 bg-green-100 dark:bg-green-900"/>
      
      <div className="mt-2 text-xs text-center text-muted-foreground">
        {progress.toFixed(1)}% complete
      </div>
    </motion.div>);
}
