import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertLesson } from "@shared/schema";

export function useLessons() {
  return useQuery({
    queryKey: [api.lessons.list.path],
    queryFn: async () => {
      const res = await fetch(api.lessons.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lessons");
      return api.lessons.list.responses[200].parse(await res.json());
    },
  });
}

export function useLesson(id: number | null) {
  return useQuery({
    queryKey: [api.lessons.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.lessons.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch lesson");
      return api.lessons.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertLesson) => {
      const res = await fetch(api.lessons.create.path, {
        method: api.lessons.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
           const error = api.lessons.create.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to create lesson");
      }
      return api.lessons.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] });
    },
  });
}
