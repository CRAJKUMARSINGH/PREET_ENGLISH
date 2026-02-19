import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Send metrics to analytics
function sendToAnalytics(metric: Metric) {
  // Send to PostHog or other analytics service
  if (window.posthog) {
    window.posthog.capture('web_vital', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      metric_id: metric.id,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Send to custom endpoint if needed
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      }),
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to send web vitals:', error);
    });
  }
}

// Initialize web vitals tracking
export function initWebVitals() {
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onFID(sendToAnalytics);  // First Input Delay
  onFCP(sendToAnalytics);  // First Contentful Paint
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

// Performance observer for custom metrics
export function observePerformance() {
  if ('PerformanceObserver' in window) {
    // Observe long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('[Performance] Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }

    // Observe resource timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          if (resource.duration > 1000) {
            console.warn('[Performance] Slow resource:', {
              name: resource.name,
              duration: resource.duration,
              type: resource.initiatorType,
            });
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // Resource timing API not supported
    }
  }
}

// Track page load time
export function trackPageLoad() {
  if ('performance' in window && 'timing' in window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        const renderTime = timing.domComplete - timing.domLoading;

        console.log('[Performance] Page Load Metrics:', {
          loadTime: `${loadTime}ms`,
          domReadyTime: `${domReadyTime}ms`,
          renderTime: `${renderTime}ms`,
        });

        // Send to analytics
        if (window.posthog) {
          window.posthog.capture('page_load', {
            load_time: loadTime,
            dom_ready_time: domReadyTime,
            render_time: renderTime,
          });
        }
      }, 0);
    });
  }
}

// Initialize all performance tracking
export function initPerformanceTracking() {
  initWebVitals();
  observePerformance();
  trackPageLoad();
}

// Type augmentation for window
declare global {
  interface Window {
    posthog?: any;
  }
}
