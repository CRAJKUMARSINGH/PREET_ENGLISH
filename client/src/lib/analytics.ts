import posthog from 'posthog-js';

// Demo Mode Stats (Simulated)
const DEMO_STATS_KEY = "preet_demo_stats";

// Initial demo user base (started at hour 0)
const INITIAL_STATS = {
  activeUsers: 452,
  lessonsCompleted: 1240,
  quizzesTaken: 450,
  speakingPractices: 890,
  audioPlays: 3400,
  searches: 1200,
  totalEvents: 6000,
  totalXPEarned: 52000,
  aiChatMessages: 340,
  videoMinutesWatched: 120
};

export function initAnalytics() {
  if (import.meta.env.VITE_POSTHOG_KEY) {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (ph) => {
        if (import.meta.env.DEV) ph.opt_out_capturing();
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

  // Use winston logger on server if needed, but this is client side
  if (import.meta.env.DEV) {
    console.debug(`[Analytics] ${eventName}`, properties);
  }
};

function updateDemoStats(eventName: string) {
  try {
    const statsStr = localStorage.getItem(DEMO_STATS_KEY);
    if (!statsStr) return;

    const stats = JSON.parse(statsStr);
    stats.totalEvents = (stats.totalEvents || 0) + 1;

    // Simulate organic growth based on user actions
    switch (eventName) {
      case 'lesson_complete':
        stats.lessonsCompleted += 1;
        stats.totalXPEarned += 50;
        break;
      case 'quiz_complete':
        stats.quizzesTaken += 1;
        break;
      case 'speaking_practice_complete':
        stats.speakingPractices += 1;
        break;
      case 'audio_play':
        stats.audioPlays += 1;
        break;
      case 'search_perform':
        stats.searches += 1;
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
    // Avoid console spam in production
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
  getSummary: () => {
    try {
      const statsStr = localStorage.getItem(DEMO_STATS_KEY);
      const data = statsStr ? JSON.parse(statsStr) : INITIAL_STATS;
      return {
        totalEvents: data.totalEvents || 6000,
        lessonsCompleted: data.lessonsCompleted || 1240,
        quizzesTaken: data.quizzesTaken || 450,
        speakingPractices: data.speakingPractices || 890,
        audioPlays: data.audioPlays || 3400,
        searches: data.searches || 1200,
      };
    } catch {
      return {
        totalEvents: 6000,
        lessonsCompleted: 1240,
        quizzesTaken: 450,
        speakingPractices: 890,
        audioPlays: 3400,
        searches: 1200,
      };
    }
  },
  resetDemoStats: () => {
    localStorage.setItem(DEMO_STATS_KEY, JSON.stringify(INITIAL_STATS));
    return INITIAL_STATS;
  }
};

