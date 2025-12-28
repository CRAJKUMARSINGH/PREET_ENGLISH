import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  username: string;
  xpEarned: number;
  lessonsCompleted: number;
  isCurrentUser?: boolean;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}

export function LeaderboardCard({ entries, currentUserRank }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return "bg-blue-50 border-blue-200";
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
      default:
        return "bg-white border-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Trophy className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">लीडरबोर्ड</h3>
            <p className="text-sm text-muted-foreground">इस सप्ताह</p>
          </div>
        </div>
        {currentUserRank && (
          <div className="text-right">
            <p className="text-sm text-muted-foreground">आपकी रैंक</p>
            <p className="text-2xl font-bold text-purple-600">#{currentUserRank}</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl border transition-all",
              getRankBg(entry.rank, entry.isCurrentUser || false)
            )}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium truncate",
                entry.isCurrentUser && "text-blue-700"
              )}>
                {entry.username}
                {entry.isCurrentUser && " (आप)"}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.lessonsCompleted} पाठ पूरे
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-lg">{entry.xpEarned.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
