import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface UserStats {
  id?: number;
  userId?: number;
  currentStreak: number;
  longestStreak: number;
  xpPoints: number;
  level: number;
  totalLessonsCompleted?: number;
  totalMinutesLearned?: number;
  totalQuizzesPassed?: number;
  speakingMinutes?: number;
  pronunciationAccuracyAvg?: number;
}

interface DailyGoal {
  lessonsTarget: number;
  lessonsCompleted: number;
  xpTarget: number;
  xpEarned: number;
  minutesTarget: number;
  minutesSpent: number;
}

interface LeaderboardEntry {
  rank: number;
  user: { id: number; username: string };
  xpEarned: number;
  lessonsCompleted: number;
}

export function useUserStats() {
  return useQuery<UserStats | null>({
    queryKey: ['/api/gamification/stats'],
    queryFn: async () => {
      const res = await fetch('/api/gamification/stats', { credentials: 'include' });
      if (res.status === 404) return null;
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 30000,
  });
}

export function useUpdateUserStats() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<UserStats>) => {
      const res = await fetch('/api/gamification/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update stats');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gamification/stats'] });
    },
  });
}

export function useDailyGoal() {
  return useQuery<DailyGoal | null>({
    queryKey: ['/api/gamification/daily-goal'],
    queryFn: async () => {
      const res = await fetch('/api/gamification/daily-goal', { credentials: 'include' });
      if (res.status === 404) return null;
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 30000,
  });
}

export function useUpdateDailyGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<DailyGoal>) => {
      const res = await fetch('/api/gamification/daily-goal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update daily goal');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gamification/daily-goal'] });
    },
  });
}

export function useLeaderboard() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/gamification/leaderboard'],
    queryFn: async () => {
      const res = await fetch('/api/gamification/leaderboard', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60000,
  });
}

export function useAchievements() {
  return {
    data: [] as any[],
    isLoading: false,
    error: null
  };
}

export function useUnlockAchievement() {
  return {
    mutate: (_id?: number) => {},
    isLoading: false,
    error: null
  };
}
