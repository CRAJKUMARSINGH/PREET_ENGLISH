import { useState, useEffect } from "react";
import { useLeaderboard } from "@/hooks/use-gamification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Zap, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  username: string;
  xpEarned: number;
  lessonsCompleted: number;
  isCurrentUser?: boolean;
  avatar?: string;
  level?: number;
  streak?: number;
  change?: 'up' | 'down' | 'same';
}

interface LiveLeaderboardProps {
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  maxEntries?: number;
  showCurrentUser?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function LiveLeaderboard({
  timeframe = 'weekly',
  maxEntries = 10,
  showCurrentUser = true,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}: LiveLeaderboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [previousRankings, setPreviousRankings] = useState<LeaderboardEntry[]>([]);
  
  // Calculate week start for API call
  const getWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek;
    const weekStart = new Date(now.setDate(diff));
    return weekStart.toISOString().split('T')[0];
  };

  const { data: leaderboardData, isLoading, refetch } = useLeaderboard();

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refetch();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refetch]);

  // Track ranking changes
  useEffect(() => {
    if (leaderboardData && previousRankings.length > 0) {
      const updatedEntries = leaderboardData.map((entry, index) => {
        const previousEntry = previousRankings.find(p => p.username === entry.user.username);
        let change: 'up' | 'down' | 'same' = 'same';
        
        if (previousEntry) {
          if (index < previousEntry.rank - 1) change = 'up';
          else if (index > previousEntry.rank - 1) change = 'down';
        }

        return {
          rank: index + 1,
          username: entry.user.username,
          xpEarned: Number(entry.xpEarned ?? 0),
          lessonsCompleted: Number(entry.lessonsCompleted ?? 0),
          isCurrentUser: entry.user.id === 1, // Mock current user
          level: Math.floor(Math.sqrt(Number(entry.xpEarned ?? 0) / 100)) + 1,
          streak: Math.floor(Math.random() * 30) + 1, // Mock streak data since it's not in schema
          change,
        };
      });
      
      setPreviousRankings(updatedEntries);
    } else if (leaderboardData) {
      const initialEntries = leaderboardData.map((entry, index) => ({
        rank: index + 1,
        username: entry.user.username,
        xpEarned: Number(entry.xpEarned ?? 0),
        lessonsCompleted: Number(entry.lessonsCompleted ?? 0),
        isCurrentUser: entry.user.id === 1,
        level: Math.floor(Math.sqrt(Number(entry.xpEarned ?? 0) / 100)) + 1,
        streak: Math.floor(Math.random() * 30) + 1, // Mock streak data since it's not in schema
        change: 'same' as const,
      }));
      setPreviousRankings(initialEntries);
    }
  }, [leaderboardData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-amber-400 to-amber-600";
      default:
        return "from-slate-200 to-slate-400";
    }
  };

  const getChangeIcon = (change?: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return null;
    }
  };

  const timeframeOptions = [
    { value: 'daily', label: 'Today', icon: '📅' },
    { value: 'weekly', label: 'This Week', icon: '📊' },
    { value: 'monthly', label: 'This Month', icon: '🗓️' },
    { value: 'all-time', label: 'All Time', icon: '🏆' },
  ];

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                </div>
                <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const entries = previousRankings.slice(0, maxEntries);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Live Leaderboard
            {autoRefresh && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="ml-2"
              >
                <Zap className="h-4 w-4 text-emerald-500" />
              </motion.div>
            )}
          </CardTitle>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {timeframeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedTimeframe(option.value as any)}
              className={cn(
                "flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all",
                selectedTimeframe === option.value
                  ? "bg-white dark:bg-slate-700 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="mr-1">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.username}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]",
                  entry.isCurrentUser
                    ? "bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-2 border-emerald-200 dark:border-emerald-800"
                    : "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800",
                  entry.rank <= 3 && "ring-2 ring-opacity-20",
                  entry.rank === 1 && "ring-yellow-400",
                  entry.rank === 2 && "ring-gray-400",
                  entry.rank === 3 && "ring-amber-400"
                )}
              >
                {/* Rank */}
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    entry.rank <= 3 && `bg-gradient-to-br ${getRankColor(entry.rank)}`
                  )}>
                    {getRankIcon(entry.rank)}
                  </div>
                  {getChangeIcon(entry.change)}
                </div>

                {/* Avatar */}
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn(
                      "font-semibold truncate",
                      entry.isCurrentUser && "text-emerald-700 dark:text-emerald-300"
                    )}>
                      {entry.username}
                      {entry.isCurrentUser && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          You
                        </Badge>
                      )}
                    </p>
                    {entry.level && (
                      <Badge variant="outline" className="text-xs">
                        L{entry.level}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{entry.lessonsCompleted} lessons</span>
                    {entry.streak && entry.streak > 0 && (
                      <span className="flex items-center gap-1">
                        🔥 {entry.streak}
                      </span>
                    )}
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-lg">
                      {entry.xpEarned.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Updates every {refreshInterval / 1000}s</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Live Rankings
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}