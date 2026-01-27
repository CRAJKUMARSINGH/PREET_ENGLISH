import { useCallback } from "react";
export function useAnalytics() {
    var trackEvent = useCallback(function (event, metadata) {
        // In a real app, this would send to Google Analytics, PostHog, or Segment
        // For now, we simulate with console logging in development
        console.log("[Analytics] Track: ".concat(event), metadata || {});
        // Potential extension: Add to a local activity log or database
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", event, metadata);
        }
    }, []);
    var trackMilestone = useCallback(function (milestoneName, value) {
        trackEvent("milestone_reached", { milestone: milestoneName, value: value });
    }, [trackEvent]);
    return { trackEvent: trackEvent, trackMilestone: trackMilestone };
}
