import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProgress() {
  return useQuery({
    queryKey: [api.progress.list.path],
    queryFn: async () => {
      const res = await fetch(api.progress.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch progress");
      return api.progress.list.responses[200].parse(await res.json());
    },
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

      if (!res.ok) throw new Error("Failed to update progress");
      return api.progress.markComplete.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.progress.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] }); // In case list view shows completed status
    },
  });
}
