/**
 * Performance Optimization Utilities for PREET_ENGLISH
 * Implements smart caching, preloading, and resource optimization
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class SmartCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
export const smartCache = new SmartCache();

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload common audio phrases
  const commonPhrases = [
    'hello', 'thank-you', 'please', 'excuse-me', 'how-are-you'
  ];

  commonPhrases.forEach(phrase => {
    const audio = new Audio(`/audio/phrases/${phrase}.mp3`);
    audio.preload = 'auto';
  });

  // Preload essential images
  const essentialImages = [
    '/saraswati.jpg',
    '/pattern.svg',
    '/grid-pattern.svg'
  ];

  essentialImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Optimize bundle loading
export const optimizeBundleLoading = () => {
  // Preload critical chunks
  const criticalChunks = [
    '/assets/vendor.js',
    '/assets/common.js'
  ];

  criticalChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = chunk;
    document.head.appendChild(link);
  });
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    const memoryInfo = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };

    // Clear cache if memory usage is high
    if (memoryInfo.usage > 80) {
      smartCache.clear();
      console.warn('High memory usage detected, clearing cache');
    }

    return memoryInfo;
  }
  return null;
};

// Service Worker registration for offline support
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      // Core Web Vitals
      fcp: navigation.responseStart - navigation.fetchStart, // First Contentful Paint approximation
      lcp: navigation.loadEventEnd - navigation.fetchStart, // Largest Contentful Paint approximation
      cls: 0, // Cumulative Layout Shift (would need separate measurement)
      fid: 0, // First Input Delay (would need separate measurement)
      
      // Loading metrics
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      windowLoad: navigation.loadEventEnd - navigation.fetchStart,
      
      // Network metrics
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      
      // Memory (if available)
      memory: monitorMemoryUsage()
    };
  }
  return null;
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      lazyLoadImages();
      optimizeBundleLoading();
      registerServiceWorker();
    });
  } else {
    preloadCriticalResources();
    lazyLoadImages();
    optimizeBundleLoading();
    registerServiceWorker();
  }

  // Monitor performance periodically
  setInterval(() => {
    const metrics = collectPerformanceMetrics();
    if (metrics) {
      // Send metrics to analytics (if needed)
      console.log('Performance metrics:', metrics);
    }
  }, 30000); // Every 30 seconds
};