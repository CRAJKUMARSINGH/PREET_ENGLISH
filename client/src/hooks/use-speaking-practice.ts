import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface SpeakingSession {
  id: number;
  userId: number;
  lessonId?: number;
  scenarioId?: number;
  sessionType: string;
  durationSeconds: number;
  overallScore?: number;
  pronunciationScore?: number;
  fluencyScore?: number;
  confidenceScore?: number;
  createdAt?: string;
  completedAt?: string;
}

interface SpeakingAttempt {
  id: number;
  sessionId: number;
  expectedText?: string;
  spokenText: string;
  accuracyScore: number;
  pronunciationIssues?: string;
  feedbackData?: string;
  audioDurationMs?: number;
  attemptNumber: number;
}

interface SpeakingProfile {
  id: number;
  userId: number;
  currentLevel: string;
  weakPhonemes?: string;
  strongAreas?: string;
  preferredPracticeType?: string;
  culturalContextPreference?: string;
  totalPracticeMinutes: number;
  improvementRate?: number;
}

interface SpeakingTopic {
  id: number;
  title: string;
  hindiTitle?: string;
  difficulty: string;
  emoji?: string;
  category: string;
  order: number;
}

export function useSpeakingSessions() {
  return useQuery<SpeakingSession[]>({
    queryKey: ['/api/speaking/sessions'],
    queryFn: async () => {
      const res = await fetch('/api/speaking/sessions', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 30000,
  });
}

export function useCreateSpeakingSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { sessionType: string; lessonId?: number; scenarioId?: number }) => {
      const res = await fetch('/api/speaking/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to create session');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/speaking/sessions'] });
    },
  });
}

export function useCompleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sessionId, scores }: { 
      sessionId: number; 
      scores: { overallScore?: number; pronunciationScore?: number; fluencyScore?: number; confidenceScore?: number } 
    }) => {
      const res = await fetch(`/api/speaking/sessions/${sessionId}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scores),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to complete session');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/speaking/sessions'] });
    },
  });
}

export function useSpeakingProfile() {
  return useQuery<SpeakingProfile | null>({
    queryKey: ['/api/speaking/profile'],
    queryFn: async () => {
      const res = await fetch('/api/speaking/profile', { credentials: 'include' });
      if (res.status === 404) return null;
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 60000,
  });
}

export function useUpdateSpeakingProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<SpeakingProfile>) => {
      const res = await fetch('/api/speaking/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/speaking/profile'] });
    },
  });
}

export function useSpeakingTopics() {
  return useQuery<SpeakingTopic[]>({
    queryKey: ['/api/speaking/topics'],
    queryFn: async () => {
      const res = await fetch('/api/speaking/topics', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 300000, // 5 minutes
  });
}

export function usePronunciationProgress() {
  return {
    data: [] as any[],
    isLoading: false,
    error: null
  };
}

export function useCulturalProgress() {
  return {
    data: [] as any[],
    isLoading: false,
    error: null
  };
}

export function useAnalyzeSpeech() {
  return {
    mutate: (_data?: any) => {},
    isLoading: false,
    error: null
  };
}
