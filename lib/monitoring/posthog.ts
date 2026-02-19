import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

export function initPostHog(): PostHog | null {
  if (!process.env.POSTHOG_API_KEY) {
    console.warn('⚠️  PostHog API key not configured - analytics disabled');
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(process.env.POSTHOG_API_KEY, {
      host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
      flushAt: 20, // Batch size
      flushInterval: 10000, // 10 seconds
    });
    console.log('✅ PostHog initialized successfully');
  }

  return posthogClient;
}

// Analytics tracking helpers
export class Analytics {
  private client: PostHog | null;

  constructor() {
    this.client = initPostHog();
  }

  // Track user events
  track(userId: string, event: string, properties?: Record<string, any>) {
    if (!this.client) return;
    
    this.client.capture({
      distinctId: userId,
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
    });
  }

  // Identify user
  identify(userId: string, traits: Record<string, any>) {
    if (!this.client) return;
    
    this.client.identify({
      distinctId: userId,
      properties: traits,
    });
  }

  // Track page views
  pageView(userId: string, path: string, properties?: Record<string, any>) {
    this.track(userId, '$pageview', {
      $current_url: path,
      ...properties,
    });
  }

  // Track lesson events
  lessonStarted(userId: string, lessonId: string, lessonTitle: string) {
    this.track(userId, 'lesson_started', {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    });
  }

  lessonCompleted(
    userId: string, 
    lessonId: string, 
    score: number, 
    timeSpent: number
  ) {
    this.track(userId, 'lesson_completed', {
      lesson_id: lessonId,
      score,
      time_spent_seconds: timeSpent,
    });
  }

  // Track AI interactions
  aiInteraction(
    userId: string, 
    interactionType: string, 
    tokensUsed: number,
    provider: string
  ) {
    this.track(userId, 'ai_interaction', {
      interaction_type: interactionType,
      tokens_used: tokensUsed,
      provider,
    });
  }

  // Track speaking practice
  speakingPracticeStarted(userId: string, sessionType: string) {
    this.track(userId, 'speaking_practice_started', {
      session_type: sessionType,
    });
  }

  speakingPracticeCompleted(
    userId: string,
    sessionType: string,
    score: number,
    duration: number
  ) {
    this.track(userId, 'speaking_practice_completed', {
      session_type: sessionType,
      score,
      duration_seconds: duration,
    });
  }

  // Track subscription events
  subscriptionUpgraded(userId: string, tier: string, price: number) {
    this.track(userId, 'subscription_upgraded', {
      tier,
      price,
      currency: 'USD',
    });
  }

  subscriptionCancelled(userId: string, tier: string, reason?: string) {
    this.track(userId, 'subscription_cancelled', {
      tier,
      reason,
    });
  }

  // Track quiz events
  quizStarted(userId: string, quizId: string, quizTitle: string) {
    this.track(userId, 'quiz_started', {
      quiz_id: quizId,
      quiz_title: quizTitle,
    });
  }

  quizCompleted(
    userId: string,
    quizId: string,
    score: number,
    passed: boolean,
    timeSpent: number
  ) {
    this.track(userId, 'quiz_completed', {
      quiz_id: quizId,
      score,
      passed,
      time_spent_seconds: timeSpent,
    });
  }

  // Track user engagement
  userSignup(userId: string, method: string) {
    this.track(userId, 'user_signup', {
      signup_method: method,
    });
  }

  userLogin(userId: string) {
    this.track(userId, 'user_login', {});
  }

  userLogout(userId: string) {
    this.track(userId, 'user_logout', {});
  }

  // Feature usage tracking
  featureUsed(userId: string, featureName: string, properties?: Record<string, any>) {
    this.track(userId, 'feature_used', {
      feature_name: featureName,
      ...properties,
    });
  }

  // Error tracking
  errorOccurred(userId: string, errorType: string, errorMessage: string) {
    this.track(userId, 'error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
    });
  }

  // Flush events before shutdown
  async shutdown() {
    if (this.client) {
      await this.client.shutdown();
    }
  }
}

export const analytics = new Analytics();

// Graceful shutdown
process.on('beforeExit', async () => {
  await analytics.shutdown();
});
