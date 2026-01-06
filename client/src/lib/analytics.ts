/**
 * Privacy-friendly analytics
 * Tracks anonymous usage without personal data
 */

interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    // Only enable in production
    this.enabled = import.meta.env.PROD;
  }

  /**
   * Track page view
   */
  pageView(path: string) {
    if (!this.enabled) return;
    
    this.track({
      event: 'page_view',
      category: 'navigation',
      label: path,
    });
  }

  /**
   * Track lesson completion
   */
  lessonComplete(lessonId: number, lessonTitle: string) {
    if (!this.enabled) return;
    
    this.track({
      event: 'lesson_complete',
      category: 'learning',
      label: lessonTitle,
      value: lessonId,
    });
  }

  /**
   * Track quiz completion
   */
  quizComplete(score: number, percentage: number) {
    if (!this.enabled) return;
    
    this.track({
      event: 'quiz_complete',
      category: 'assessment',
      label: `${percentage}%`,
      value: score,
    });
  }

  /**
   * Track speaking practice
   */
  speakingPractice(topicId: string, duration: number) {
    if (!this.enabled) return;
    
    this.track({
      event: 'speaking_practice',
      category: 'practice',
      label: topicId,
      value: duration,
    });
  }

  /**
   * Track audio usage
   */
  audioPlay(contentType: 'lesson' | 'vocabulary' | 'example', language: 'en' | 'hi') {
    if (!this.enabled) return;
    
    this.track({
      event: 'audio_play',
      category: 'audio',
      label: `${contentType}_${language}`,
    });
  }

  /**
   * Track search usage
   */
  search(query: string, resultsCount: number) {
    if (!this.enabled) return;
    
    this.track({
      event: 'search',
      category: 'discovery',
      label: query.substring(0, 50), // Limit query length
      value: resultsCount,
    });
  }

  /**
   * Track feature usage
   */
  featureUse(feature: string) {
    if (!this.enabled) return;
    
    this.track({
      event: 'feature_use',
      category: 'engagement',
      label: feature,
    });
  }

  /**
   * Track errors (for debugging)
   */
  error(errorMessage: string, errorType: string) {
    if (!this.enabled) return;
    
    this.track({
      event: 'error',
      category: 'technical',
      label: `${errorType}: ${errorMessage.substring(0, 100)}`,
    });
  }

  /**
   * Private method to send analytics
   */
  private track(event: AnalyticsEvent) {
    // Store locally for now (can integrate with analytics service later)
    const analytics = this.getStoredAnalytics();
    analytics.push({
      ...event,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 100 events
    if (analytics.length > 100) {
      analytics.shift();
    }
    
    localStorage.setItem('preet_analytics', JSON.stringify(analytics));
    
    // Log in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics:', event);
    }
  }

  /**
   * Get stored analytics
   */
  private getStoredAnalytics(): any[] {
    try {
      const stored = localStorage.getItem('preet_analytics');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get analytics summary
   */
  getSummary() {
    const analytics = this.getStoredAnalytics();
    
    return {
      totalEvents: analytics.length,
      lessonsCompleted: analytics.filter(e => e.event === 'lesson_complete').length,
      quizzesTaken: analytics.filter(e => e.event === 'quiz_complete').length,
      speakingPractices: analytics.filter(e => e.event === 'speaking_practice').length,
      audioPlays: analytics.filter(e => e.event === 'audio_play').length,
      searches: analytics.filter(e => e.event === 'search').length,
    };
  }

  /**
   * Clear analytics data
   */
  clear() {
    localStorage.removeItem('preet_analytics');
  }
}

export const analytics = new Analytics();
