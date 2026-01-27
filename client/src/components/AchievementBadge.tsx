import { Lock, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  name: string;
  nameHindi?: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export function AchievementBadge({
  name,
  nameHindi,
  description,
  icon,
  xpReward,
  unlocked,
  unlockedAt
}: AchievementBadgeProps) {
  return (
    <div className={cn(
      "relative rounded-2xl p-4 border transition-all duration-300 group overflow-hidden",
      unlocked
        ? "bg-gradient-to-br from-white to-secondary/50 border-primary/20 shadow-sm hover:shadow-md hover:border-primary/40 dark:from-white/5 dark:to-transparent dark:border-white/10"
        : "bg-secondary/30 border-transparent opacity-70 grayscale"
    )}>
      {/* Background Glow for Unlocked */}
      {unlocked && (
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 blur-xl rounded-full group-hover:bg-primary/20 transition-colors" />
      )}

      {!unlocked && (
        <div className="absolute top-3 right-3">
          <Lock className="h-4 w-4 text-muted-foreground" data-testid="lock-icon" />
        </div>
      )}

      <div className="flex items-start gap-3 relative z-10">
        <div className={cn(
          "text-3xl p-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
          unlocked ? "bg-primary/10 shadow-inner" : "bg-black/5 dark:bg-white/5"
        )}>
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-bold text-sm truncate",
            unlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {name}
          </h4>
          {nameHindi && (
            <p className="text-xs text-muted-foreground truncate font-medium">{nameHindi}</p>
          )}
          <p className={cn(
            "text-xs mt-1.5 leading-relaxed",
            unlocked ? "text-muted-foreground" : "text-muted-foreground/60"
          )}>
            {description}
          </p>

          <div className="flex items-center justify-between mt-3">
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1",
              unlocked
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                : "bg-secondary text-muted-foreground border-transparent"
            )}>
              <Medal className="h-3 w-3" />
              +{xpReward} XP
            </span>

            {unlocked && unlockedAt && (
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">
                Unlocked
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
