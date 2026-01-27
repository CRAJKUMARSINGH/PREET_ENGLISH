var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from "react";
import { Sparkles, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SaraswatiMascot } from "./SaraswatiMascot";
import { Confetti } from "./Confetti";
import { useSound } from "@/hooks/use-sound";
export function CelebrationModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, lessonTitle = _a.lessonTitle, hindiTitle = _a.hindiTitle;
    var t = useTranslation().t;
    var _b = useState(false), showBalloons = _b[0], setShowBalloons = _b[1];
    var _c = useState(false), showXpPop = _c[0], setShowXpPop = _c[1];
    var playCelebration = useSound().playCelebration;
    useEffect(function () {
        if (isOpen) {
            setShowBalloons(true);
            setShowXpPop(true);
            // Play celebration sound
            playCelebration();
            // Auto close after 5 seconds
            var timer_1 = setTimeout(function () {
                onClose();
            }, 5000);
            return function () { return clearTimeout(timer_1); };
        }
    }, [isOpen, onClose, playCelebration]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti Effect */}
      <Confetti isActive={isOpen} duration={4000}/>
      {/* Floating Balloons */}
      {showBalloons && (<div className="absolute inset-0 pointer-events-none overflow-hidden">
          {__spreadArray([], Array(8), true).map(function (_, i) { return (<div key={i} className={cn("absolute animate-bounce text-4xl", i % 4 === 0 && "text-red-500 left-[10%] top-[20%] animation-delay-100", i % 4 === 1 && "text-blue-500 right-[15%] top-[30%] animation-delay-300", i % 4 === 2 && "text-yellow-500 left-[20%] bottom-[25%] animation-delay-500", i % 4 === 3 && "text-green-500 right-[25%] bottom-[35%] animation-delay-700")} style={{
                    animationDuration: "".concat(2 + (i * 0.2), "s"),
                    animationDelay: "".concat(i * 0.1, "s")
                }}>
              🎈
            </div>); })}
        </div>)}

      {/* Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {__spreadArray([], Array(20), true).map(function (_, i) { return (<div key={i} className="absolute animate-ping" style={{
                left: "".concat(Math.random() * 100, "%"),
                top: "".concat(Math.random() * 100, "%"),
                animationDelay: "".concat(Math.random() * 2, "s"),
                animationDuration: "".concat(1 + Math.random(), "s")
            }}>
            <Sparkles className="h-4 w-4 text-yellow-400"/>
          </div>); })}
      </div>

      {/* Main Modal */}
      <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Saraswati Mascot - Celebrating */}
        <div className="mb-4">
          <SaraswatiMascot size="md" mood="celebrating" message="बधाई हो! माँ सरस्वती आप पर प्रसन्न हैं! 🎉"/>
        </div>

        {/* Celebration Text */}
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">
          🎉 {t("congratulations")}! 🎉
        </h2>

        <p className="text-lg text-slate-600 mb-4">
          {t("lesson_completed_message")}
        </p>

        {/* Lesson Title */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-amber-800 text-lg">
            "{lessonTitle}"
          </h3>
          {hindiTitle && (<p className="text-slate-700 mt-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              "{hindiTitle}"
            </p>)}
        </div>

        {/* XP Earned with Animation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={cn("bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full", showXpPop && "animate-bounce-in")}>
            <span className="text-yellow-700 dark:text-yellow-400 font-bold">+20 XP</span>
          </div>
          <div className={cn("bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full", showXpPop && "animate-bounce-in animation-delay-300")}>
            <span className="text-orange-700 dark:text-orange-400 font-bold">🔥 स्ट्रीक!</span>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-6">
          <PartyPopper className="h-4 w-4"/>
          <span>{t("keep_learning_message")}</span>
          <PartyPopper className="h-4 w-4"/>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          {t("continue_learning")} ✨
        </button>
      </div>
    </div>);
}
