# Week 10: Social Features

## 🎯 Goal
Add social learning features to increase engagement, retention, and create a community of learners.

## 📋 Tasks

### Day 1-2: Friend System
- [ ] Create `friendships` table
- [ ] Friend request/accept/decline flow
- [ ] Friend list UI
- [ ] Friend activity feed
- [ ] Friend search by username

### Day 3-4: Leaderboards Enhancement
- [ ] Global leaderboard (all time)
- [ ] Weekly leaderboard (resets Sunday)
- [ ] Friends-only leaderboard
- [ ] Category leaderboards (speaking, quizzes, etc.)
- [ ] Regional leaderboards (by state/city)

### Day 5: Learning Groups
- [ ] Create study groups (max 10 members)
- [ ] Group challenges
- [ ] Group chat (basic)
- [ ] Group progress tracking
- [ ] Group achievements

### Day 6: Social Sharing
- [ ] Share achievements to WhatsApp
- [ ] Share progress cards
- [ ] Invite friends (referral system)
- [ ] Social proof on landing page
- [ ] Testimonial collection

### Day 7: Notifications & Engagement
- [ ] Friend activity notifications
- [ ] "X passed you on leaderboard" alerts
- [ ] Group challenge reminders
- [ ] Weekly progress comparison
- [ ] Re-engagement notifications

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Friend System | Complete | P0 |
| Leaderboards | 4 types | P0 |
| Study Groups | Basic | P1 |
| Social Sharing | WhatsApp | P0 |
| Notifications | 5 types | P1 |

## 🔧 Social Schema
```typescript
// Friendships
interface Friendship {
  id: number;
  userId: number;
  friendId: number;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
  acceptedAt?: string;
}

// Study Groups
interface StudyGroup {
  id: number;
  name: string;
  description: string;
  creatorId: number;
  memberCount: number;
  isPublic: boolean;
  weeklyGoal: number;      // XP target
  createdAt: string;
}

interface GroupMember {
  id: number;
  groupId: number;
  userId: number;
  role: 'admin' | 'member';
  weeklyXp: number;
  joinedAt: string;
}

// Activity Feed
interface ActivityFeedItem {
  id: number;
  userId: number;
  type: 'achievement' | 'streak' | 'level_up' | 'lesson' | 'quiz';
  content: string;
  contentHindi: string;
  metadata: Record<string, any>;
  createdAt: string;
}
```

## 📱 WhatsApp Sharing
```typescript
const SHARE_TEMPLATES = {
  achievement: {
    text: (name: string, achievement: string) => 
      `🏆 ${name} just earned "${achievement}" on PREET_ENGLISH!\n\n` +
      `Join me in learning English: https://preetenglish.com/invite`,
    hindi: (name: string, achievement: string) =>
      `🏆 ${name} ने PREET_ENGLISH पर "${achievement}" हासिल किया!\n\n` +
      `मेरे साथ अंग्रेजी सीखें: https://preetenglish.com/invite`
  },
  streak: {
    text: (days: number) =>
      `🔥 I'm on a ${days}-day learning streak on PREET_ENGLISH!\n\n` +
      `Can you beat my streak? https://preetenglish.com/invite`
  },
  progress: {
    text: (lessons: number, level: number) =>
      `📚 I've completed ${lessons} lessons and reached Level ${level}!\n\n` +
      `Start your English journey: https://preetenglish.com/invite`
  }
};
```

## 🏆 Leaderboard Types
```typescript
const LEADERBOARD_CONFIG = {
  global: {
    name: 'Global Champions',
    nameHindi: 'विश्व चैंपियन',
    metric: 'total_xp',
    resetPeriod: 'never'
  },
  weekly: {
    name: 'Weekly Warriors',
    nameHindi: 'साप्ताहिक योद्धा',
    metric: 'weekly_xp',
    resetPeriod: 'sunday'
  },
  friends: {
    name: 'Friend Circle',
    nameHindi: 'दोस्तों का दायरा',
    metric: 'weekly_xp',
    filter: 'friends_only'
  },
  speaking: {
    name: 'Speaking Stars',
    nameHindi: 'बोलने के सितारे',
    metric: 'speaking_minutes',
    resetPeriod: 'weekly'
  }
};
```

## ✅ Success Criteria
- [ ] Users can add friends
- [ ] Leaderboards update in real-time
- [ ] WhatsApp sharing works
- [ ] Study groups are functional
- [ ] Notifications drive engagement

## 🚧 Blockers & Risks
- Risk: Spam/abuse - Mitigation: Rate limiting, reporting
- Risk: Privacy concerns - Mitigation: Privacy settings, opt-out
- Risk: Toxic competition - Mitigation: Focus on personal progress

## 📝 Notes
- Indians love WhatsApp - make sharing seamless
- Leaderboards should motivate, not discourage
- Study groups can drive retention significantly
- Consider family/school group features later
