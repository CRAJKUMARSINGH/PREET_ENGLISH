var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
// Generic query hook with memoized keys to prevent infinite re-renders
export function useOptimizedQuery(queryKey, queryFn, options) {
    var memoizedQueryKey = useMemo(function () { return queryKey; }, __spreadArray([], queryKey, true));
    return useQuery(__assign({ queryKey: memoizedQueryKey, queryFn: queryFn, staleTime: 1000 * 60, gcTime: 1000 * 60 * 5 }, options));
}
// Prefetch helper to improve perceived performance
export function usePrefetchQuery(queryKey, queryFn, enabled) {
    if (enabled === void 0) { enabled = true; }
    var queryClient = useQueryClient();
    useMemo(function () {
        if (enabled) {
            queryClient.prefetchQuery({
                queryKey: queryKey,
                queryFn: queryFn,
                staleTime: 1000 * 60 * 5, // 5 minutes for prefetched data
            }).catch(console.error);
        }
    }, [queryKey, enabled]);
}
// Invalidate queries helper
export function useInvalidateQueries() {
    var queryClient = useQueryClient();
    var invalidateUserRelated = function () {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: ['lessons'] });
    };
    var invalidateLessonRelated = function () {
        queryClient.invalidateQueries({ queryKey: ['lessons'] });
        queryClient.invalidateQueries({ queryKey: ['vocabulary'] });
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    };
    return {
        invalidateUserRelated: invalidateUserRelated,
        invalidateLessonRelated: invalidateLessonRelated,
        invalidateAll: function () { return queryClient.invalidateQueries(); },
    };
}
// Smart query hook for paginated data
export function usePaginatedQuery(baseKey, fetcher, initialPage, options) {
    if (initialPage === void 0) { initialPage = 1; }
    var queryKey = [baseKey, 'page', initialPage];
    return useQuery(__assign({ queryKey: queryKey, queryFn: function () { return fetcher(initialPage); }, staleTime: 1000 * 60 * 2 }, options));
}
