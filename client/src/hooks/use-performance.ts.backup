import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  mountTime: number;
}

export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>(Date.now());
  const mountStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const mountTime = Date.now() - mountStartTime.current;
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance [${componentName}]: Mount time ${mountTime}ms`);
    }

    // Send metrics to analytics in production (if needed)
    if (process.env.NODE_ENV === 'production' && mountTime > 1000) {
      // Log slow components
      console.warn(`⚠️ Slow component detected: ${componentName} took ${mountTime}ms to mount`);
    }

    return () => {
      const unmountTime = Date.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Performance [${componentName}]: Component unmounted`);
      }
    };
  }, [componentName]);

  // Track render performance
  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    if (process.env.NODE_ENV === 'development' && renderTime > 16) {
      console.log(`📊 Performance [${componentName}]: Render time ${renderTime}ms`);
    }
    renderStartTime.current = Date.now();
  });

  return {
    startTimer: () => Date.now(),
    endTimer: (startTime: number, operation: string) => {
      const duration = Date.now() - startTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Performance [${componentName}]: ${operation} took ${duration}ms`);
      }
      return duration;
    }
  };
}

// Web Vitals monitoring
export function initWebVitals() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
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