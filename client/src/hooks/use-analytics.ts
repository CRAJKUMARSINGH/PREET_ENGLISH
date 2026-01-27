import { useCallback } from "react";

export type AnalyticsEvent =
    | "lesson_start"
    | "lesson_complete"
    | "quiz_complete"
    | "story_start"
    | "story_complete"
    | "pro_upgrade_click"
    | "auth_success"
    | "milestone_reached"
    | "holographic_feature_activated";

export function useAnalytics() {
    const trackEvent = useCallback((event: AnalyticsEvent, metadata?: Record<string, any>) => {
        // In a real app, this would send to Google Analytics, PostHog, or Segment
        // For now, we simulate with console logging in development
        console.log(`[Analytics] Track: ${event}`, metadata || {});

        // Potential extension: Add to a local activity log or database
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", event, metadata);
        }
    }, []);

    const trackMilestone = useCallback((milestoneName: string, value: number) => {
        trackEvent("milestone_reached", { milestone: milestoneName, value });
    }, [trackEvent]);

    return { trackEvent, trackMilestone };
}
