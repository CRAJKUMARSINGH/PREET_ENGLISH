import { Trophy, Crown, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  username: string;
  xpEarned: number;
  lessonsCompleted: number;
  isCurrentUser?: boolean;
  trophyColor?: string;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}

export function LeaderboardCard({ entries, currentUserRank }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 fill-gray-100" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600 fill-amber-100" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return "bg-primary/10 border-primary/20 shadow-sm";
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50/50 to-amber-50/50 border-yellow-200/50 dark:from-yellow-900/20 dark:to-transparent dark:border-yellow-800/30";
      case 2:
        return "bg-gradient-to-r from-gray-50/50 to-white/50 border-gray-200/50 dark:from-white/5 dark:to-transparent dark:border-white/10";
      case 3:
        return "bg-gradient-to-r from-amber-50/30 to-orange-50/30 border-amber-200/30 dark:from-amber-900/10 dark:to-transparent dark:border-amber-800/20";
      default:
        return "bg-transparent border-transparent hover:bg-secondary/50";
    }
  };

  return (
    <div className="glass-card rounded-[2rem] p-6 border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2.5 rounded-xl text-purple-600 dark:text-purple-400">
            <Lucide.Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg font-display">Leaderboard</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">This Week</p>
          </div>
        </div>
        {currentUserRank && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Your Rank</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-sm font-black text-primary">#{currentUserRank}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {entries.slice(0, 5).map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.02] ${entry.isCurrentUser
              ? "bg-primary/20 border border-primary/50 shadow-lg shadow-primary/10"
              : "bg-white/5 hover:bg-white/10 border border-white/5"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${entry.rank === 1 ? "bg-yellow-400 text-yellow-900 shadow-md shadow-yellow-400/20" :
                entry.rank === 2 ? "bg-gray-300 text-gray-800" :
                  entry.rank === 3 ? "bg-amber-600 text-amber-100" :
                    "bg-white/10 text-muted-foreground"
                }`}>
                {entry.rank === 1 ? <Crown className="w-4 h-4" /> :
                  entry.rank <= 3 ? <Medal className="w-4 h-4" /> :
                    entry.rank}
              </div>
              <div>
                <p className={`text-sm font-bold ${entry.isCurrentUser ? "text-primary bg-primary/10 px-2 py-0.5 rounded-md" : "text-foreground"}`}>
                  {entry.username} {entry.isCurrentUser && "(You)"}
                </p>
                {entry.rank === 1 && <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Current Leader</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-primary font-bold text-sm">
                <span className={entry.trophyColor || "text-primary"}>{entry.xpEarned}</span>
                <span className="text-[10px] text-muted-foreground uppercase">XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
