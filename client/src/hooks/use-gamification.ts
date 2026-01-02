import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useUserStats() {
  return useQuery({
    queryKey: [api.gamification.userStats.get.path],
    queryFn: async () => {
      const res = await fetch(api.gamification.userStats.get.path, {
        credentials: "include",
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch user stats");
      return api.gamification.userStats.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateUserStats() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (update: Parameters<typeof api.gamification.userStats.update.input.parse>[0]) => {
      const res = await fetch(api.gamification.userStats.update.path, {
        method: api.gamification.userStats.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update user stats");
      return api.gamification.userStats.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.gamification.userStats.get.path] });
    },
  });
}

function getTodayISODate() {
  return new Date().toISOString().split("T")[0];
}

export function useDailyGoal(date: string = getTodayISODate()) {
  const path = api.gamification.dailyGoals.get.path.replace(":date", date);
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      const res = await fetch(path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch daily goal");
      return api.gamification.dailyGoals.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateDailyGoal(date: string = getTodayISODate()) {
  const queryClient = useQueryClient();
  const path = api.gamification.dailyGoals.update.path.replace(":date", date);
  return useMutation({
    mutationFn: async (update: Parameters<typeof api.gamification.dailyGoals.update.input.parse>[0]) => {
      const res = await fetch(path, {
        method: api.gamification.dailyGoals.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update daily goal");
      return api.gamification.dailyGoals.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path] });
    },
  });
}

export function useLeaderboard(weekStart?: string) {
  const url = weekStart
    ? `${api.gamification.leaderboard.get.path}?weekStart=${encodeURIComponent(weekStart)}`
    : api.gamification.leaderboard.get.path;

  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      return api.gamification.leaderboard.get.responses[200].parse(await res.json());
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: [api.gamification.achievements.list.path],
    queryFn: async () => {
      const res = await fetch(api.gamification.achievements.list.path, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch achievements");
      return api.gamification.achievements.list.responses[200].parse(await res.json());
    },
  });
}

export function useUnlockAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (achievementId: number) => {
      const path = api.gamification.achievements.unlock.path.replace(
        ":id",
        String(achievementId),
      );
      const res = await fetch(path, {
        method: api.gamification.achievements.unlock.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to unlock achievement");
      return api.gamification.achievements.unlock.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.gamification.achievements.userAchievements.path],
      });
    },
  });
}
