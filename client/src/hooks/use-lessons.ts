import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertLesson } from "@shared/schema";

// Sample lessons for when API is unavailable
const FALLBACK_LESSONS = [
  {
    id: 1,
    title: "Introduction to Greetings",
    hindiTitle: "अभिवादन का परिचय",
    slug: "intro-greetings",
    description: "Learn how to say hello and introduce yourself in English.",
    hindiDescription: "अंग्रेजी में नमस्ते कहना और अपना परिचय देना सीखें।",
    content: "# Greetings\n\nIn this lesson, we will learn basic greetings.",
    difficulty: "Beginner",
    category: "Greetings",
    order: 1,
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
    emojiTheme: "👋"
  },
  {
    id: 2,
    title: "Common Verbs",
    hindiTitle: "सामान्य क्रियाएं",
    slug: "common-verbs",
    description: "Essential verbs for daily communication.",
    hindiDescription: "दैनिक संवाद के लिए आवश्यक क्रियाएं।",
    content: "# Verbs\n\nVerbs are action words.",
    difficulty: "Beginner",
    category: "Grammar",
    order: 2,
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
    emojiTheme: "🏃"
  },
  {
    id: 3,
    title: "Numbers and Counting",
    hindiTitle: "संख्याएं और गिनती",
    slug: "numbers-counting",
    description: "Learn to count and use numbers in English.",
    hindiDescription: "अंग्रेजी में गिनती और संख्याओं का उपयोग सीखें।",
    content: "# Numbers\n\nLearn numbers from 1 to 100.",
    difficulty: "Beginner",
    category: "Basics",
    order: 3,
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80",
    emojiTheme: "🔢"
  }
];

export function useLessons() {
  return useQuery({
    queryKey: [api.lessons.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.lessons.list.path, { credentials: "include" });
        if (!res.ok) {
          console.warn('API returned error, using fallback lessons');
          return FALLBACK_LESSONS;
        }
        const data = await res.json();
        return data.length > 0 ? data : FALLBACK_LESSONS;
      } catch (error) {
        console.warn('Failed to fetch lessons, using fallback:', error);
        return FALLBACK_LESSONS;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLesson(id: number | null) {
  return useQuery({
    queryKey: [api.lessons.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return null;
      try {
        const url = buildUrl(api.lessons.get.path, { id });
        const res = await fetch(url, { credentials: "include" });
        if (res.status === 404) return null;
        if (!res.ok) {
          // Return fallback lesson if available
          const fallback = FALLBACK_LESSONS.find(l => l.id === id);
          return fallback ? { ...fallback, vocabulary: [], conversationLines: [] } : null;
        }
        return await res.json();
      } catch (error) {
        console.warn('Failed to fetch lesson, using fallback:', error);
        const fallback = FALLBACK_LESSONS.find(l => l.id === id);
        return fallback ? { ...fallback, vocabulary: [], conversationLines: [] } : null;
      }
    },
    retry: 1,
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
