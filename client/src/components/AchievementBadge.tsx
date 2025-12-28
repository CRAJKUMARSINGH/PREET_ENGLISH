import { Lock } from "lucide-react";
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
      "relative rounded-2xl p-4 border transition-all duration-300",
      unlocked 
        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-sm" 
        : "bg-gray-50 border-gray-200 opacity-60"
    )}>
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <div className={cn(
          "text-3xl p-2 rounded-xl",
          unlocked ? "bg-yellow-100" : "bg-gray-100 grayscale"
        )}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-bold text-sm truncate",
            unlocked ? "text-slate-900" : "text-gray-500"
          )}>
            {name}
          </h4>
          {nameHindi && (
            <p className="text-xs text-muted-foreground truncate">{nameHindi}</p>
          )}
          <p className={cn(
            "text-xs mt-1",
            unlocked ? "text-slate-600" : "text-gray-400"
          )}>
            {description}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              unlocked 
                ? "bg-yellow-200 text-yellow-800" 
                : "bg-gray-200 text-gray-500"
            )}>
              +{xpReward} XP
            </span>
            
            {unlocked && unlockedAt && (
              <span className="text-xs text-green-600">
                ✓ अनलॉक
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
