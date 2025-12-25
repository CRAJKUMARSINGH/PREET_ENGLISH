import { useEffect, useState } from "react";
import { Trophy, Star, Sparkles, PartyPopper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  hindiTitle?: string;
}

export function CelebrationModal({ isOpen, onClose, lessonTitle, hindiTitle }: CelebrationModalProps) {
  const { t } = useTranslation();
  const [showBalloons, setShowBalloons] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowBalloons(true);
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Floating Balloons */}
      {showBalloons && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute animate-bounce text-4xl",
                i % 4 === 0 && "text-red-500 left-[10%] top-[20%] animation-delay-100",
                i % 4 === 1 && "text-blue-500 right-[15%] top-[30%] animation-delay-300",
                i % 4 === 2 && "text-yellow-500 left-[20%] bottom-[25%] animation-delay-500",
                i % 4 === 3 && "text-green-500 right-[25%] bottom-[35%] animation-delay-700"
              )}
              style={{
                animationDuration: `${2 + (i * 0.2)}s`,
                animationDelay: `${i * 0.1}s`
              }}
            >
              🎈
            </div>
          ))}
        </div>
      )}

      {/* Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>
        ))}
      </div>

      {/* Main Modal */}
      <div className="relative bg-white rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Trophy Icon */}
        <div className="mb-6 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 animate-spin">
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        {/* Celebration Text */}
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">
          🎉 {t("congratulations")}! 🎉
        </h2>
        
        <p className="text-lg text-slate-600 mb-4">
          {t("lesson_completed_message")}
        </p>

        {/* Lesson Title */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-primary text-lg">
            "{lessonTitle}"
          </h3>
          {hindiTitle && (
            <p className="text-slate-700 mt-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              "{hindiTitle}"
            </p>
          )}
        </div>

        {/* Motivational Message */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-6">
          <PartyPopper className="h-4 w-4" />
          <span>{t("keep_learning_message")}</span>
          <PartyPopper className="h-4 w-4" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {t("continue_learning")} ✨
        </button>
      </div>
    </div>
  );
}