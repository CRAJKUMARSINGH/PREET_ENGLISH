import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProgress() {
  return useQuery({
    queryKey: [api.progress.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.progress.list.path, { credentials: "include" });
        if (!res.ok) {
          console.warn('Failed to fetch progress, returning empty array');
          return [];
        }
        return await res.json();
      } catch (error) {
        console.warn('Progress fetch error, returning empty array:', error);
        return [];
      }
    },
    retry: 1,
  });
}

export function useMarkComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonId, completed }: { lessonId: number, completed: boolean }) => {
      const url = buildUrl(api.progress.markComplete.path, { id: lessonId });
      const res = await fetch(url, {
        method: api.progress.markComplete.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
        credentials: "include",
      });

      if (!res.ok) {
        // Don't return mock data - throw error to let UI handle it
        console.error('Failed to update progress:', res.status, res.statusText);
        throw new Error('Failed to update progress. Please ensure you are logged in.');
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.progress.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] });
    },
  });
}
