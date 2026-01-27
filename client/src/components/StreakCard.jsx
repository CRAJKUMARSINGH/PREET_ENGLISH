import * as Lucide from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
export function StreakCard(_a) {
    var currentStreak = _a.currentStreak, longestStreak = _a.longestStreak, xpPoints = _a.xpPoints, level = _a.level;
    useEffect(function () {
        if (currentStreak >= 3) {
            var timer_1 = setTimeout(function () {
                confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: { y: 0.7, x: 0.2 }, // Bottom left near streak card
                    colors: ['#FDE047', '#EA580C'] // Yellow and Orange
                });
            }, 1000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [currentStreak]);
    // Calculate XP needed for next level (100 XP per level)
    var xpProgress = (xpPoints % 100) / 100 * 100;
    return (<div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-8 text-white shadow-xl group hover:shadow-2xl transition-all duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"/>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700"/>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-inner animate-pulse-glow">
              <Lucide.Flame className="h-8 w-8 text-yellow-300 fill-yellow-300"/>
            </div>
            <div>
              <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">Daily Streak</p>
              <h3 className="text-5xl font-black tracking-tight">{currentStreak}<span className="text-2xl font-bold ml-2 opacity-60">Days</span></h3>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-xs font-bold mb-1">
              <Lucide.Trophy className="h-3 w-3 text-yellow-300"/>
              <span>Best: {longestStreak}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="glass-panel bg-white/10 border-white/20 rounded-2xl p-4 backdrop-blur-md hover:bg-white/15 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-yellow-400/20 rounded-lg">
                <Lucide.Zap className="h-4 w-4 text-yellow-300"/>
              </div>
              <span className="text-white/90 text-xs font-bold uppercase tracking-wide">Total XP</span>
            </div>
            <p className="text-2xl font-black tracking-tight">{xpPoints.toLocaleString()}</p>
          </div>

          <div className="glass-panel bg-white/10 border-white/20 rounded-2xl p-4 backdrop-blur-md hover:bg-white/15 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-400/20 rounded-lg">
                <Lucide.Sparkles className="h-4 w-4 text-purple-300"/>
              </div>
              <span className="text-white/90 text-xs font-bold uppercase tracking-wide">Level</span>
            </div>
            <p className="text-2xl font-black tracking-tight">{level}</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold text-white/90 mb-2 uppercase tracking-wide">
            <span>Next Level</span>
            <span>{xpPoints % 100} / 100 XP</span>
          </div>
          <div className="h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(253,224,71,0.5)] relative overflow-hidden" style={{ width: "".concat(xpProgress, "%") }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"/>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
