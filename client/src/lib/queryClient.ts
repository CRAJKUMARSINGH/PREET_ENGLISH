import { QueryClient } from "@tanstack/react-query";

// Note: Persistence packages will be installed separately
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Tanner Linsley's TanStack Query Optimization with Persistence - PREET_ENGLISH App
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - longer for learning progress
      gcTime: 1000 * 60 * 30, // 30 minutes - keep lesson data longer
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 1; // Reduce retries to improve perceived performance
      },
      refetchOnWindowFocus: false, // Disable to prevent jank during lessons
      refetchOnReconnect: true,
      refetchOnMount: false, // Prevent unnecessary refetches
      structuralSharing: true, // Enable structural sharing for better performance
      _defaulted: true,
    },
    mutations: {
      retry: 0, // Mutations shouldn't auto-retry in most cases
      gcTime: 1000 * 60 * 5, // Clean up mutation cache after 5 minutes
    },
  },
});

// Create a client-side persister
const localStoragePersister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: "PREET_ENGLISH_CACHE",
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

// Enable persistence only in the browser
if (typeof window !== 'undefined') {
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    buster: "v2.1.0", // Update when breaking changes occur
  });
}

// API request helper with better error handling and caching
export async function apiRequest(
  method: string,
  endpoint: string,
  body?: any,
  options: RequestInit = {}
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${window.location.origin}${endpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Handle different response types
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`API request failed: ${method} ${endpoint}`, error);
    throw error;
  }
}

// Prefetch helper for better performance
export function prefetchQuery(queryKey: string[], queryFn: () => Promise<any>) {
  queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
  });
}

export default queryClient;