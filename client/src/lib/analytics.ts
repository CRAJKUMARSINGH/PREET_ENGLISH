import posthog from 'posthog-js';

// Demo Mode Stats (Simulated)
const DEMO_STATS_KEY = "preet_demo_stats";

// Initial demo user base (started at hour 0)
const INITIAL_STATS = {
  activeUsers: 452,
  lessonsCompleted: 1240,
  totalXPEarned: 52000,
  aiChatMessages: 340,
  videoMinutesWatched: 120
};

export function initAnalytics() {
  if (import.meta.env.VITE_POSTHOG_KEY) {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.opt_out_capturing();
      },
    });
  }

  // Initialize Demo Stats if not present
  if (!localStorage.getItem(DEMO_STATS_KEY)) {
    localStorage.setItem(DEMO_STATS_KEY, JSON.stringify(INITIAL_STATS));
  }
}

export const logEvent = (eventName: string, properties?: Record<string, any>) => {
  // 1. PostHog (if enabled)
  if (import.meta.env.VITE_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }

  // 2. Update Demo Stats (Simulated Growth)
  updateDemoStats(eventName);

  console.log(`[Analytics] ${eventName}`, properties);
};

function updateDemoStats(eventName: string) {
  try {
    const statsStr = localStorage.getItem(DEMO_STATS_KEY);
    if (!statsStr) return;

    const stats = JSON.parse(statsStr);

    // Simulate organic growth based on user actions
    switch (eventName) {
      case 'lesson_connected': // Start lesson
      case 'page_view':
        // Randomly add active users to simulate traffic
        if (Math.random() > 0.7) stats.activeUsers += Math.floor(Math.random() * 3) + 1;
        break;
      case 'lesson_complete':
        stats.lessonsCompleted += 1;
        stats.totalXPEarned += 50;
        break;
      case 'ai_chat_sent':
        stats.aiChatMessages += 1;
        break;
      case 'video_watched':
        stats.videoMinutesWatched += 5;
        break;
    }

    localStorage.setItem(DEMO_STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn("Failed to update demo stats", e);
  }
}

export const analytics = {
  init: initAnalytics,
  track: logEvent,
  getLiveStats: () => {
    try {
      const statsStr = localStorage.getItem(DEMO_STATS_KEY);
      return statsStr ? JSON.parse(statsStr) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  },
  resetDemoStats: () => {
    localStorage.setItem(DEMO_STATS_KEY, JSON.stringify(INITIAL_STATS));
    return INITIAL_STATS;
  }
};
