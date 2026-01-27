import { useEffect, useRef } from 'react';
export function usePerformanceMonitor(componentName) {
    var renderStartTime = useRef(Date.now());
    var mountStartTime = useRef(Date.now());
    useEffect(function () {
        var mountTime = Date.now() - mountStartTime.current;
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
            console.log("\uD83D\uDCCA Performance [".concat(componentName, "]: Mount time ").concat(mountTime, "ms"));
        }
        // Send metrics to analytics in production (if needed)
        if (process.env.NODE_ENV === 'production' && mountTime > 1000) {
            // Log slow components
            console.warn("\u26A0\uFE0F Slow component detected: ".concat(componentName, " took ").concat(mountTime, "ms to mount"));
        }
        return function () {
            var unmountTime = Date.now();
            if (process.env.NODE_ENV === 'development') {
                console.log("\uD83D\uDCCA Performance [".concat(componentName, "]: Component unmounted"));
            }
        };
    }, [componentName]);
    // Track render performance
    useEffect(function () {
        var renderTime = Date.now() - renderStartTime.current;
        if (process.env.NODE_ENV === 'development' && renderTime > 16) {
            console.log("\uD83D\uDCCA Performance [".concat(componentName, "]: Render time ").concat(renderTime, "ms"));
        }
        renderStartTime.current = Date.now();
    });
    return {
        startTimer: function () { return Date.now(); },
        endTimer: function (startTime, operation) {
            var duration = Date.now() - startTime;
            if (process.env.NODE_ENV === 'development') {
                console.log("\uD83D\uDCCA Performance [".concat(componentName, "]: ").concat(operation, " took ").concat(duration, "ms"));
            }
            return duration;
        }
    };
}
// Web Vitals monitoring
export function initWebVitals() {
    if (typeof window !== 'undefined' && 'performance' in window) {
        // Monitor Core Web Vitals
        var observer = new PerformanceObserver(function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry.entryType === 'navigation') {
                    var navEntry = entry;
                    console.log('📊 Navigation Timing:', {
                        domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                        loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                        totalTime: navEntry.loadEventEnd - navEntry.fetchStart
                    });
                }
            }
        });
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    }
}
