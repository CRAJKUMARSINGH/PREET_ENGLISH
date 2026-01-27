// Addy Osmani's Performance Monitoring - PREET_ENGLISH App

// Track Core Web Vitals
export function trackWebVitals() {
  // Dynamic import to avoid build issues with different web-vitals versions
  if (typeof window !== 'undefined') {
    import('web-vitals').then((webVitals) => {
      // Try different API versions
      const { getCLS, getFID, getFCP, getLCP, getTTFB, onCLS, onFID, onFCP, onLCP, onTTFB } = webVitals;
      
      // Use the available API (v3 vs v4)
      if (getCLS) {
        getCLS(sendToAnalytics);
        getFID && getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      } else if (onCLS) {
        onCLS(sendToAnalytics);
        onFID && onFID(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      }
    }).catch(console.error);
  }
}

function sendToAnalytics(metric: any) {
  // Send metric to analytics service
  console.log(`${metric.name}: ${metric.value}`);
  
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
  let clsValue = 0;
  let clsEntries: any[] = [];

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        const firstSessionTime = entry.startTime - entry.duration;
        const lastSessionTime = entry.startTime;
        
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  }).observe({type: 'layout-shift', buffered: true});
  
  // Log cumulative layout shift
  window.addEventListener('beforeunload', () => {
    console.log('Cumulative Layout Shift:', clsValue);
  });
}

// Memory usage tracking
export function getMemoryUsage() {
  if ('memory' in performance) {
    return (performance as any).memory;
  }
  return null;
}

// Long task observer for performance bottlenecks
export function setupLongTaskTracking() {
  if ('PerformanceObserver' in window) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
            entryType: entry.entryType
          });
        }
      }
    }).observe({entryTypes: ['longtask']});
  }
}

// Component hydration tracking
export function measureHydrationTime(componentName: string) {
  if (typeof window !== 'undefined') {
    const startMark = `hydrate_${componentName}_start`;
    const endMark = `hydrate_${componentName}_end`;
    
    performance.mark(startMark);
    
    // Call when component is fully hydrated
    return () => {
      performance.mark(endMark);
      performance.measure(`hydrate_${componentName}`, startMark, endMark);
      
      const measure = performance.getEntriesByName(`hydrate_${componentName}`)[0];
      console.log(`${componentName} hydration time:`, measure.duration);
    };
  }
}

// Resource loading performance
export function getResourceLoadTimes() {
  if ('getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    return resources.map(resource => ({
      name: resource.name.split('/').pop(),
      duration: resource.duration,
      size: (resource as PerformanceResourceTiming).transferSize,
      start: resource.startTime
    }));
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
    setTimeout(() => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
      
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