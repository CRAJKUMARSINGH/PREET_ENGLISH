// Mock analytics for testing
export const initAnalytics = jest.fn();
export const logEvent = jest.fn();
export const trackPageView = jest.fn();
export const trackUserAction = jest.fn();

export default {
  initAnalytics,
  logEvent,
  trackPageView,
  trackUserAction,
};