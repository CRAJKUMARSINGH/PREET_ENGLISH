# Week 13: Mobile & PWA

## 🎯 Goal
Transform PREET_ENGLISH into a fully-featured Progressive Web App with native-like mobile experience.

## 📋 Tasks

### Day 1-2: PWA Foundation
- [ ] Create comprehensive manifest.json
- [ ] Design app icons (all sizes)
- [ ] Implement service worker
- [ ] Add install prompt
- [ ] Configure splash screens

### Day 3-4: Mobile UX Enhancement
- [ ] Touch-optimized interactions
- [ ] Swipe gestures for navigation
- [ ] Pull-to-refresh
- [ ] Bottom navigation bar
- [ ] Haptic feedback (where supported)

### Day 5: Native Features
- [ ] Push notifications setup
- [ ] Share API integration
- [ ] Camera access for future features
- [ ] Microphone optimization
- [ ] Orientation handling

### Day 6: Offline Experience
- [ ] Offline lesson downloads
- [ ] Sync queue for offline actions
- [ ] Offline indicator UI
- [ ] Background sync
- [ ] Storage management

### Day 7: Testing & Polish
- [ ] Test on various Android devices
- [ ] Test on iOS Safari
- [ ] Install flow testing
- [ ] Offline scenario testing
- [ ] Performance on mobile networks

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| PWA Score | 100 | P0 |
| Install Prompt | Working | P0 |
| Push Notifications | Working | P0 |
| Offline Mode | Basic | P0 |
| Mobile UX | Polished | P0 |

## 🔧 PWA Manifest
```json
{
  "name": "PREET_ENGLISH - Learn English",
  "short_name": "PREET",
  "description": "AI-powered English learning for Hindi speakers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0A",
  "theme_color": "#1CE783",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["education", "lifestyle"],
  "lang": "en-IN",
  "dir": "ltr"
}
```

## 📱 Mobile Navigation
```typescript
// Bottom Navigation Structure
const BOTTOM_NAV = [
  { icon: 'Home', label: 'होम', path: '/' },
  { icon: 'BookOpen', label: 'सीखें', path: '/lessons' },
  { icon: 'Mic', label: 'बोलें', path: '/speaking' },
  { icon: 'Trophy', label: 'रैंक', path: '/leaderboard' },
  { icon: 'User', label: 'प्रोफाइल', path: '/profile' }
];

// Gesture Configuration
const GESTURES = {
  swipeLeft: 'next_lesson',
  swipeRight: 'previous_lesson',
  swipeDown: 'refresh',
  longPress: 'show_options',
  doubleTap: 'bookmark'
};
```

## 🔔 Push Notification Setup
```typescript
// Notification Types
const NOTIFICATION_TYPES = {
  streak_reminder: {
    title: 'Keep your streak alive! 🔥',
    titleHindi: 'अपनी स्ट्रीक बचाएं! 🔥',
    icon: '/icons/streak.png',
    badge: '/icons/badge.png',
    vibrate: [200, 100, 200]
  },
  daily_challenge: {
    title: 'New challenges await! 🎯',
    titleHindi: 'नई चुनौतियां इंतज़ार कर रही हैं! 🎯',
    icon: '/icons/challenge.png'
  },
  achievement: {
    title: 'Achievement Unlocked! 🏆',
    titleHindi: 'उपलब्धि अनलॉक! 🏆',
    icon: '/icons/achievement.png',
    requireInteraction: true
  },
  friend_activity: {
    title: '{name} just passed you!',
    titleHindi: '{name} ने आपको पीछे छोड़ दिया!',
    icon: '/icons/friend.png'
  }
};

// Permission Request Flow
const requestNotificationPermission = async () => {
  const result = await Notification.requestPermission();
  if (result === 'granted') {
    await subscribeToNotifications();
    trackEvent('notification_enabled');
  }
};
```

## 📴 Offline Strategy
```typescript
// Downloadable Content
interface DownloadableContent {
  lessons: {
    maxOffline: 50,
    autoDownload: 'next_5_lessons',
    storage: '~50MB'
  };
  vocabulary: {
    maxOffline: 500,
    autoDownload: 'learned_words',
    storage: '~5MB'
  };
  stories: {
    maxOffline: 20,
    autoDownload: 'bookmarked',
    storage: '~10MB'
  };
}

// Sync Queue
interface SyncQueue {
  pendingActions: [
    { type: 'lesson_complete', data: {...}, timestamp: '...' },
    { type: 'quiz_submit', data: {...}, timestamp: '...' }
  ];
  syncOnReconnect: true;
  conflictResolution: 'server_wins';
}
```

## ✅ Success Criteria
- [ ] PWA installable on Android/iOS
- [ ] Push notifications working
- [ ] Offline mode functional
- [ ] Mobile UX feels native
- [ ] No layout issues on any screen size

## 🚧 Blockers & Risks
- Risk: iOS PWA limitations - Mitigation: Document limitations, plan native app
- Risk: Push notification opt-in rates - Mitigation: Strategic timing, clear value
- Risk: Storage limits - Mitigation: Smart caching, user controls

## 📝 Notes
- Test on real devices, not just emulators
- iOS Safari has PWA quirks - test thoroughly
- Consider App Store/Play Store listing later
- Push notifications need backend infrastructure
