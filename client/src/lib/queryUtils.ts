import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';

// Tanner Linsley's Query Utilities - PREET_ENGLISH App
export type QueryKeys = {
  lessons: string[];
  user: string[];
  vocabulary: string[];
  conversations: string[];
  quizzes: string[];
  profile: string[];
  analytics: string[];
};

// Generic query hook with memoized keys to prevent infinite re-renders
export function useOptimizedQuery<TData, TError = Error>(
  queryKey: readonly (string | number)[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  const memoizedQueryKey = useMemo(() => queryKey, [...queryKey]);
  
  return useQuery<TData, TError>({
    queryKey: memoizedQueryKey,
    queryFn,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

// Prefetch helper to improve perceived performance
export function usePrefetchQuery<TData>(
  queryKey: readonly (string | number)[],
  queryFn: () => Promise<TData>,
  enabled: boolean = true
) {
  const queryClient = useQueryClient();
  
  useMemo(() => {
    if (enabled) {
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: 1000 * 60 * 5, // 5 minutes for prefetched data
      }).catch(console.error);
    }
  }, [queryKey, enabled]);
}

// Invalidate queries helper
export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  
  const invalidateUserRelated = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    queryClient.invalidateQueries({ queryKey: ['lessons'] });
  };
  
  const invalidateLessonRelated = () => {
    queryClient.invalidateQueries({ queryKey: ['lessons'] });
    queryClient.invalidateQueries({ queryKey: ['vocabulary'] });
    queryClient.invalidateQueries({ queryKey: ['quizzes'] });
  };
  
  return {
    invalidateUserRelated,
    invalidateLessonRelated,
    invalidateAll: () => queryClient.invalidateQueries(),
  };
}

// Smart query hook for paginated data
export function usePaginatedQuery<TData>(
  baseKey: string,
  fetcher: (page: number) => Promise<TData>,
  initialPage: number = 1,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  const queryKey = [baseKey, 'page', initialPage] as const;
  
  return useQuery<TData>({
    queryKey,
    queryFn: () => fetcher(initialPage),
    staleTime: 1000 * 60 * 2, // 2 minutes for paginated data
    ...options,
  });
}