# Week 12: Performance Optimization

## 🎯 Goal
Optimize app performance for fast loading, smooth interactions, and excellent experience on low-end devices and slow networks.

## 📋 Tasks

### Day 1-2: Bundle Optimization
- [ ] Analyze bundle size (target: <500KB initial)
- [ ] Implement code splitting by route
- [ ] Lazy load heavy components
- [ ] Tree shake unused code
- [ ] Optimize dependencies (replace heavy libs)

### Day 3-4: API & Data Optimization
- [ ] Implement API response caching
- [ ] Add Redis/memory cache layer
- [ ] Optimize database queries
- [ ] Add pagination for large lists
- [ ] Implement infinite scroll

### Day 5: Image & Asset Optimization
- [ ] Compress all images (WebP format)
- [ ] Implement lazy loading for images
- [ ] Add image placeholders/skeletons
- [ ] Optimize SVG icons
- [ ] Set up CDN for static assets

### Day 6: Runtime Performance
- [ ] Profile React renders
- [ ] Memoize expensive computations
- [ ] Virtualize long lists
- [ ] Optimize animations (60fps)
- [ ] Reduce re-renders

### Day 7: Network & Offline
- [ ] Implement service worker
- [ ] Add offline lesson access
- [ ] Optimize API request batching
- [ ] Add request retry logic
- [ ] Implement optimistic updates

## 📊 Performance Targets
| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| First Contentful Paint | ? | <1.5s | P0 |
| Largest Contentful Paint | ? | <2.5s | P0 |
| Time to Interactive | ? | <3s | P0 |
| Bundle Size (initial) | ~1.8MB | <500KB | P0 |
| API Response Time | ? | <200ms | P0 |
| Lighthouse Score | ? | 90+ | P0 |

## 🔧 Code Splitting Strategy
```typescript
// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const Lessons = lazy(() => import('./pages/Lessons'));
const LessonView = lazy(() => import('./pages/LessonView'));
const Speaking = lazy(() => import('./pages/Speaking'));
const Profile = lazy(() => import('./pages/Profile'));

// Feature-based splitting
const QuizComponent = lazy(() => import('./components/Quiz'));
const StoryReader = lazy(() => import('./components/StoryReader'));
const SpeakingPractice = lazy(() => import('./components/SpeakingPractice'));

// Heavy library splitting
const FramerMotion = lazy(() => import('framer-motion'));
const Recharts = lazy(() => import('recharts'));
```

## 🗄️ Caching Strategy
```typescript
// API Response Caching
const CACHE_CONFIG = {
  lessons: {
    ttl: 3600,        // 1 hour
    staleWhileRevalidate: true
  },
  userProgress: {
    ttl: 300,         // 5 minutes
    invalidateOn: ['lesson_complete', 'quiz_submit']
  },
  leaderboard: {
    ttl: 60,          // 1 minute
    staleWhileRevalidate: true
  },
  stories: {
    ttl: 86400,       // 24 hours
    immutable: true
  }
};

// Client-side caching with TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      cacheTime: 30 * 60 * 1000,   // 30 minutes
      refetchOnWindowFocus: false,
      retry: 2
    }
  }
});
```

## 📱 Low-End Device Optimization
```typescript
// Detect device capability
const isLowEndDevice = () => {
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return (memory && memory < 4) || (cores && cores < 4);
};

// Reduce animations on low-end devices
const animationConfig = isLowEndDevice() 
  ? { duration: 0, ease: 'linear' }
  : { duration: 0.3, ease: 'easeOut' };

// Reduce image quality on slow connections
const getImageQuality = () => {
  const connection = (navigator as any).connection;
  if (connection?.effectiveType === '2g') return 'low';
  if (connection?.effectiveType === '3g') return 'medium';
  return 'high';
};
```

## 🌐 Offline Support
```typescript
// Service Worker Strategy
const SW_CACHE_STRATEGY = {
  // Cache first for static assets
  static: 'CacheFirst',
  
  // Network first for API calls
  api: 'NetworkFirst',
  
  // Stale while revalidate for lessons
  lessons: 'StaleWhileRevalidate',
  
  // Offline fallback
  offline: {
    page: '/offline.html',
    image: '/offline-image.svg'
  }
};

// Offline-capable features
const OFFLINE_FEATURES = [
  'View downloaded lessons',
  'Practice vocabulary flashcards',
  'Review completed quizzes',
  'Read downloaded stories'
];
```

## ✅ Success Criteria
- [ ] Lighthouse score 90+
- [ ] Initial load <3s on 3G
- [ ] Smooth 60fps animations
- [ ] Works offline (basic features)
- [ ] No jank on low-end devices

## 🚧 Blockers & Risks
- Risk: Breaking changes during optimization - Mitigation: Thorough testing
- Risk: Cache invalidation bugs - Mitigation: Clear cache strategy
- Risk: Service worker complexity - Mitigation: Use Workbox

## 📝 Notes
- Test on actual low-end Android devices
- Use Chrome DevTools throttling
- Monitor Core Web Vitals in production
- Consider users on 2G/3G networks
