// Addy Osmani's Performance Monitoring - PREET_ENGLISH App
// Track Core Web Vitals
export function trackWebVitals() {
    // Dynamic import to avoid build issues with different web-vitals versions
    if (typeof window !== 'undefined') {
        import('web-vitals').then(function (webVitals) {
            // Try different API versions
            var getCLS = webVitals.getCLS, getFID = webVitals.getFID, getFCP = webVitals.getFCP, getLCP = webVitals.getLCP, getTTFB = webVitals.getTTFB, onCLS = webVitals.onCLS, onFID = webVitals.onFID, onFCP = webVitals.onFCP, onLCP = webVitals.onLCP, onTTFB = webVitals.onTTFB;
            // Use the available API (v3 vs v4)
            if (getCLS) {
                getCLS(sendToAnalytics);
                getFID && getFID(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
            }
            else if (onCLS) {
                onCLS(sendToAnalytics);
                onFID && onFID(sendToAnalytics);
                onFCP(sendToAnalytics);
                onLCP(sendToAnalytics);
                onTTFB(sendToAnalytics);
            }
        }).catch(console.error);
    }
}
function sendToAnalytics(metric) {
    // Send metric to analytics service
    console.log("".concat(metric.name, ": ").concat(metric.value));
    // In production, send to your analytics service
    // Example:
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
}
// Performance observer for layout shifts
export function setupLayoutShiftTracking() {
    var clsValue = 0;
    var clsEntries = [];
    new PerformanceObserver(function (entryList) {
        for (var _i = 0, _a = entryList.getEntries(); _i < _a.length; _i++) {
            var entry = _a[_i];
            // Only count layout shifts without recent user input
            if (!entry.hadRecentInput) {
                var firstSessionTime = entry.startTime - entry.duration;
                var lastSessionTime = entry.startTime;
                clsValue += entry.value;
                clsEntries.push(entry);
            }
        }
    }).observe({ type: 'layout-shift', buffered: true });
    // Log cumulative layout shift
    window.addEventListener('beforeunload', function () {
        console.log('Cumulative Layout Shift:', clsValue);
    });
}
// Memory usage tracking
export function getMemoryUsage() {
    if ('memory' in performance) {
        return performance.memory;
    }
    return null;
}
// Long task observer for performance bottlenecks
export function setupLongTaskTracking() {
    if ('PerformanceObserver' in window) {
        new PerformanceObserver(function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.duration > 50) { // Tasks longer than 50ms
                    console.warn('Long task detected:', {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        name: entry.name,
                        entryType: entry.entryType
                    });
                }
            }
        }).observe({ entryTypes: ['longtask'] });
    }
}
// Component hydration tracking
export function measureHydrationTime(componentName) {
    if (typeof window !== 'undefined') {
        var startMark_1 = "hydrate_".concat(componentName, "_start");
        var endMark_1 = "hydrate_".concat(componentName, "_end");
        performance.mark(startMark_1);
        // Call when component is fully hydrated
        return function () {
            performance.mark(endMark_1);
            performance.measure("hydrate_".concat(componentName), startMark_1, endMark_1);
            var measure = performance.getEntriesByName("hydrate_".concat(componentName))[0];
            console.log("".concat(componentName, " hydration time:"), measure.duration);
        };
    }
}
// Resource loading performance
export function getResourceLoadTimes() {
    if ('getEntriesByType' in performance) {
        var resources = performance.getEntriesByType('resource');
        return resources.map(function (resource) { return ({
            name: resource.name.split('/').pop(),
            duration: resource.duration,
            size: resource.transferSize,
            start: resource.startTime
        }); });
    }
    return [];
}
// Initialize performance monitoring
export function initPerformanceMonitoring() {
    if (typeof window !== 'undefined') {
        // Track Core Web Vitals
        trackWebVitals();
        // Set up layout shift tracking
        setupLayoutShiftTracking();
        // Set up long task tracking
        setupLongTaskTracking();
        // Log initial paint times
        setTimeout(function () {
            var fcp = performance.getEntriesByName('first-contentful-paint')[0];
            var lcp = performance.getEntriesByType('largest-contentful-paint')[0];
            if (fcp) {
                console.log('First Contentful Paint:', fcp.startTime);
            }
            if (lcp) {
                console.log('Largest Contentful Paint:', lcp.startTime);
            }
        }, 0);
    }
}
// Performance metrics summary
export function getPerformanceMetrics() {
    return {
        navigation: performance.getEntriesByType('navigation')[0],
        paint: performance.getEntriesByType('paint'),
        resources: getResourceLoadTimes(),
        memory: getMemoryUsage(),
        marks: performance.getEntriesByType('mark'),
        measures: performance.getEntriesByType('measure')
    };
}
