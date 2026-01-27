# Week 11: Daily Challenges & Streaks

## 🎯 Goal
Create compelling daily engagement loops with challenges, streaks, and rewards that keep users coming back.

## 📋 Tasks

### Day 1-2: Daily Challenge System
- [ ] Create `dailyChallenges` table
- [ ] Challenge generation algorithm
- [ ] Challenge types:
  - Complete X lessons
  - Practice speaking for X minutes
  - Learn X new words
  - Score 80%+ on a quiz
  - Read a story
  - Complete a scenario
- [ ] Challenge difficulty scaling based on user level
- [ ] Challenge refresh at midnight IST

### Day 3-4: Streak System Enhancement
- [ ] Streak freeze feature (1 free per week)
- [ ] Streak repair (watch ad or pay)
- [ ] Streak milestones with rewards
- [ ] Streak calendar visualization
- [ ] Weekend streak bonus

### Day 5: Daily Rewards
- [ ] Daily login bonus (increasing each day)
- [ ] Challenge completion XP
- [ ] Streak bonus multiplier
- [ ] Weekly completion bonus
- [ ] Monthly super bonus

### Day 6: Notifications & Reminders
- [ ] Smart reminder timing (based on user patterns)
- [ ] Streak at risk notifications
- [ ] Challenge expiring soon alerts
- [ ] Motivational push notifications
- [ ] Email digest (weekly progress)

### Day 7: Gamification Polish
- [ ] Daily challenge UI
- [ ] Streak celebration animations
- [ ] Reward claim animations
- [ ] Progress bars and countdowns
- [ ] Sound effects (optional)

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Challenge Types | 6 types | P0 |
| Streak Features | 4 features | P0 |
| Daily Rewards | Working | P0 |
| Smart Notifications | 5 types | P1 |
| Animations | 3 types | P1 |

## 🔧 Challenge System
```typescript
interface DailyChallenge {
  id: number;
  userId: number;
  date: string;           // YYYY-MM-DD
  challenges: Challenge[];
  completedCount: number;
  totalXpEarned: number;
  bonusClaimed: boolean;
}

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  titleHindi: string;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

type ChallengeType = 
  | 'complete_lessons'
  | 'speaking_minutes'
  | 'learn_words'
  | 'quiz_score'
  | 'read_story'
  | 'complete_scenario'
  | 'practice_pronunciation';

// Challenge generation based on user level
const CHALLENGE_TEMPLATES = {
  beginner: [
    { type: 'complete_lessons', target: 2, xp: 20 },
    { type: 'learn_words', target: 5, xp: 15 },
    { type: 'speaking_minutes', target: 5, xp: 25 },
  ],
  intermediate: [
    { type: 'complete_lessons', target: 3, xp: 30 },
    { type: 'quiz_score', target: 80, xp: 40 },
    { type: 'speaking_minutes', target: 10, xp: 35 },
  ],
  advanced: [
    { type: 'complete_lessons', target: 5, xp: 50 },
    { type: 'complete_scenario', target: 2, xp: 60 },
    { type: 'speaking_minutes', target: 15, xp: 45 },
  ]
};
```

## 🔥 Streak System
```typescript
interface UserStreak {
  userId: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakFreezes: number;      // Available freezes
  freezeUsedThisWeek: boolean;
  
  // Milestones
  milestones: {
    days: number;
    reward: string;
    claimed: boolean;
  }[];
}

const STREAK_MILESTONES = [
  { days: 3, xp: 50, badge: '3-day-streak' },
  { days: 7, xp: 100, badge: '7-day-streak' },
  { days: 14, xp: 200, badge: '2-week-streak' },
  { days: 30, xp: 500, badge: 'month-streak' },
  { days: 50, xp: 750, badge: '50-day-streak' },
  { days: 100, xp: 1500, badge: '100-day-streak' },
  { days: 365, xp: 5000, badge: 'year-streak', title: 'Dedicated Learner' },
];
```

## 📱 Notification Strategy
```typescript
const NOTIFICATION_SCHEDULE = {
  // Based on user's typical learning time
  reminder: {
    timing: 'user_preferred_time - 30min',
    message: "Time to learn! Your daily challenges are waiting 📚",
    messageHindi: "सीखने का समय! आपकी दैनिक चुनौतियां इंतज़ार कर रही हैं 📚"
  },
  
  streakAtRisk: {
    timing: '21:00 IST if no activity',
    message: "Don't lose your {streak}-day streak! 🔥",
    messageHindi: "अपनी {streak} दिन की स्ट्रीक मत खोइए! 🔥"
  },
  
  challengeExpiring: {
    timing: '22:00 IST if challenges incomplete',
    message: "2 hours left to complete today's challenges!",
    messageHindi: "आज की चुनौतियां पूरी करने के लिए 2 घंटे बाकी!"
  },
  
  celebration: {
    timing: 'on_milestone',
    message: "🎉 Amazing! You've hit a {days}-day streak!",
    messageHindi: "🎉 शानदार! आपने {days} दिन की स्ट्रीक बनाई!"
  }
};
```

## ✅ Success Criteria
- [ ] Daily challenges generate correctly
- [ ] Streak tracking is accurate
- [ ] Notifications drive return visits
- [ ] Rewards feel meaningful
- [ ] Users maintain 7+ day streaks

## 🚧 Blockers & Risks
- Risk: Notification fatigue - Mitigation: Smart frequency, easy opt-out
- Risk: Streak anxiety - Mitigation: Freeze feature, encouraging tone
- Risk: Challenge too easy/hard - Mitigation: Adaptive difficulty

## 📝 Notes
- Streaks are the #1 retention driver in language apps
- Make breaking a streak feel recoverable, not devastating
- Celebrate every milestone, big or small
- Consider timezone handling for global users
