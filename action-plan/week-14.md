# Week 14: Analytics & A/B Testing

## 🎯 Goal
Implement comprehensive analytics and A/B testing infrastructure to make data-driven decisions for launch optimization.

## 📋 Tasks

### Day 1-2: Analytics Foundation
- [ ] Set up Mixpanel/Amplitude integration
- [ ] Define core event taxonomy
- [ ] Implement user identification
- [ ] Create funnel tracking
- [ ] Set up error tracking (Sentry)

### Day 3-4: User Behavior Tracking
- [ ] Lesson engagement metrics
- [ ] Speaking practice analytics
- [ ] Quiz performance tracking
- [ ] Session duration & depth
- [ ] Feature adoption rates

### Day 5: A/B Testing Framework
- [ ] Implement feature flags system
- [ ] Create experiment assignment logic
- [ ] Build variant rendering system
- [ ] Set up statistical significance calculator
- [ ] Create experiment dashboard

### Day 6: Key Experiments Setup
- [ ] Onboarding flow variants
- [ ] Lesson card design test
- [ ] Gamification prominence test
- [ ] Hindi vs English UI test
- [ ] Notification timing test

### Day 7: Dashboards & Reporting
- [ ] Real-time user dashboard
- [ ] Retention cohort analysis
- [ ] Revenue/conversion tracking
- [ ] Weekly automated reports
- [ ] Alert system for anomalies

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Event Tracking | 50+ events | P0 |
| User Funnels | 5 key funnels | P0 |
| A/B Framework | Working | P0 |
| Active Experiments | 3+ | P1 |
| Dashboard | Live | P0 |

## 📈 Core Event Taxonomy
```typescript
// User Lifecycle Events
const LIFECYCLE_EVENTS = {
  user_signup: { properties: ['method', 'referrer', 'device'] },
  user_login: { properties: ['method', 'session_count'] },
  onboarding_started: { properties: ['variant'] },
  onboarding_completed: { properties: ['duration_seconds', 'steps_completed'] },
  profile_completed: { properties: ['fields_filled'] }
};

// Learning Events
const LEARNING_EVENTS = {
  lesson_started: { 
    properties: ['lesson_id', 'category', 'difficulty', 'is_recommended'] 
  },
  lesson_completed: { 
    properties: ['lesson_id', 'duration_seconds', 'score', 'attempts'] 
  },
  lesson_abandoned: { 
    properties: ['lesson_id', 'progress_percent', 'abandon_point'] 
  },
  quiz_attempted: { 
    properties: ['quiz_id', 'score', 'time_taken', 'hints_used'] 
  },
  vocabulary_learned: { 
    properties: ['word_id', 'category', 'difficulty'] 
  },
  speaking_practice_started: { 
    properties: ['topic_id', 'difficulty'] 
  },
  speaking_practice_completed: { 
    properties: ['topic_id', 'score', 'duration', 'feedback_rating'] 
  }
};

// Engagement Events
const ENGAGEMENT_EVENTS = {
  streak_maintained: { properties: ['streak_days', 'xp_earned'] },
  streak_broken: { properties: ['previous_streak', 'last_active'] },
  achievement_unlocked: { properties: ['achievement_id', 'category'] },
  leaderboard_viewed: { properties: ['user_rank', 'time_spent'] },
  friend_added: { properties: ['method'] },
  content_shared: { properties: ['content_type', 'platform'] },
  notification_clicked: { properties: ['notification_type', 'delay_hours'] }
};

// Feature Usage Events
const FEATURE_EVENTS = {
  ai_tutor_opened: { properties: ['context', 'session_number'] },
  story_started: { properties: ['story_id', 'difficulty'] },
  scenario_played: { properties: ['scenario_id', 'role_chosen'] },
  offline_mode_used: { properties: ['content_type', 'duration'] }
};

```

## 🔬 A/B Testing Framework
```typescript
// Feature Flag System
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  variants: Variant[];
  targetAudience: AudienceRule[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
}

interface Variant {
  id: string;
  name: string;
  weight: number; // 0-100
  config: Record<string, any>;
}

// Example Experiments
const EXPERIMENTS = {
  onboarding_flow: {
    id: 'exp_onboarding_v2',
    variants: [
      { id: 'control', name: 'Current Flow', weight: 50 },
      { id: 'variant_a', name: 'Simplified (3 steps)', weight: 25 },
      { id: 'variant_b', name: 'Gamified', weight: 25 }
    ],
    primaryMetric: 'onboarding_completion_rate',
    secondaryMetrics: ['day_1_retention', 'first_lesson_completion']
  },
  
  lesson_card_design: {
    id: 'exp_lesson_cards',
    variants: [
      { id: 'control', name: 'Current Design', weight: 50 },
      { id: 'variant_a', name: 'Progress Prominent', weight: 50 }
    ],
    primaryMetric: 'lesson_start_rate',
    secondaryMetrics: ['lesson_completion_rate']
  },
  
  hindi_ui_prominence: {
    id: 'exp_hindi_ui',
    variants: [
      { id: 'control', name: 'English Primary', weight: 50 },
      { id: 'variant_a', name: 'Hindi Primary', weight: 50 }
    ],
    primaryMetric: 'user_engagement_score',
    secondaryMetrics: ['session_duration', 'lessons_per_session']
  }
};
```

## 📊 Key Funnels to Track
```typescript
const FUNNELS = {
  signup_to_first_lesson: {
    steps: [
      'user_signup',
      'onboarding_completed',
      'lesson_started',
      'lesson_completed'
    ],
    targetConversion: 0.60 // 60%
  },
  
  free_to_engaged: {
    steps: [
      'user_signup',
      'lessons_completed_5',
      'streak_3_days',
      'speaking_practice_tried'
    ],
    targetConversion: 0.30 // 30%
  },
  
  lesson_completion: {
    steps: [
      'lesson_started',
      'lesson_50_percent',
      'lesson_completed',
      'next_lesson_started'
    ],
    targetConversion: 0.70 // 70%
  },
  
  speaking_adoption: {
    steps: [
      'speaking_feature_viewed',
      'speaking_practice_started',
      'speaking_practice_completed',
      'speaking_practice_repeated'
    ],
    targetConversion: 0.40 // 40%
  }
};
```

## 📉 Retention Cohorts
```typescript
// Cohort Analysis Configuration
const RETENTION_CONFIG = {
  cohortBy: 'signup_date',
  periods: ['day_1', 'day_3', 'day_7', 'day_14', 'day_30'],
  segments: [
    { name: 'all_users', filter: {} },
    { name: 'completed_onboarding', filter: { onboarding_completed: true } },
    { name: 'tried_speaking', filter: { speaking_practice_count: { $gte: 1 } } },
    { name: 'high_engagement', filter: { lessons_completed: { $gte: 5 } } }
  ],
  targets: {
    day_1: 0.50,  // 50%
    day_3: 0.35,  // 35%
    day_7: 0.25,  // 25%
    day_14: 0.18, // 18%
    day_30: 0.12  // 12%
  }
};
```

## 🚨 Alert Configuration
```typescript
const ALERTS = {
  error_rate_spike: {
    condition: 'error_rate > 5%',
    window: '5_minutes',
    severity: 'critical',
    notify: ['slack', 'email']
  },
  signup_drop: {
    condition: 'signups < 50% of hourly_average',
    window: '1_hour',
    severity: 'warning',
    notify: ['slack']
  },
  lesson_completion_drop: {
    condition: 'completion_rate < 60%',
    window: '1_day',
    severity: 'warning',
    notify: ['email']
  },
  api_latency: {
    condition: 'p95_latency > 2000ms',
    window: '10_minutes',
    severity: 'warning',
    notify: ['slack']
  }
};
```

## ✅ Success Criteria
- [ ] 50+ events tracked across user journey
- [ ] 5 key funnels with conversion tracking
- [ ] A/B testing framework operational
- [ ] 3+ experiments running
- [ ] Real-time dashboard live
- [ ] Automated weekly reports

## 🚧 Blockers & Risks
- Risk: Data privacy compliance - Mitigation: Anonymize PII, GDPR consent
- Risk: Analytics overhead - Mitigation: Batch events, sample high-volume
- Risk: Statistical significance - Mitigation: Proper sample size calculation

## 📝 Notes
- Start with Mixpanel free tier (1M events/month)
- Consider PostHog for self-hosted option
- Document all events in shared wiki
- Train team on dashboard usage
- Review experiments weekly
