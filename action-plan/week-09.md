# Week 09: Achievement System

## 🎯 Goal
Build a comprehensive achievement system that motivates users through meaningful milestones and rewards.

## 📋 Tasks

### Day 1-2: Achievement Infrastructure
- [ ] Create `achievements` table schema
- [ ] Create `userAchievements` table for tracking
- [ ] Build achievement unlock logic
- [ ] Implement achievement notification system
- [ ] Create achievement API endpoints

### Day 3-4: Achievement Categories
- [ ] **Learning Milestones**
  - First Lesson Complete (पहला कदम)
  - 10 Lessons Complete (दस का दम)
  - 50 Lessons Complete (अर्धशतक)
  - 100 Lessons Complete (शतक)
  - 500 Lessons Complete (पंच शतक)
  
- [ ] **Streak Achievements**
  - 3-Day Streak (तीन दिन की लगन)
  - 7-Day Streak (सप्ताह योद्धा)
  - 30-Day Streak (महीना मास्टर)
  - 100-Day Streak (शतक स्ट्रीक)
  - 365-Day Streak (साल भर साथी)

- [ ] **Speaking Achievements**
  - First Speaking Session (पहली बोली)
  - 10 Minutes Speaking (दस मिनट)
  - 1 Hour Speaking (एक घंटा)
  - Perfect Pronunciation (शुद्ध उच्चारण)
  - Conversation Master (बातचीत का बादशाह)

- [ ] **Quiz Achievements**
  - First Quiz Passed (पहली परीक्षा)
  - Perfect Score (पूर्ण अंक)
  - Quiz Streak (परीक्षा स्ट्रीक)
  - Category Master (विषय विशेषज्ञ)

- [ ] **Special Achievements**
  - Early Bird (सुबह का पक्षी) - Learn before 7 AM
  - Night Owl (रात का उल्लू) - Learn after 10 PM
  - Weekend Warrior (वीकेंड योद्धा)
  - Story Lover (कहानी प्रेमी)
  - Vocabulary King (शब्द सम्राट)

### Day 5: Achievement UI
- [ ] Achievement badge designs (Hulu-green theme)
- [ ] Achievement showcase on profile
- [ ] Unlock animation and celebration
- [ ] Progress towards next achievement
- [ ] Share achievement feature

### Day 6: Rewards System
- [ ] XP bonuses for achievements
- [ ] Unlock special content/features
- [ ] Profile badges and titles
- [ ] Achievement-based leaderboard
- [ ] Monthly achievement challenges

### Day 7: Testing & Polish
- [ ] Test all unlock conditions
- [ ] Verify XP rewards
- [ ] Mobile notification testing
- [ ] Achievement sharing
- [ ] Edge case handling

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Achievement Categories | 5 | P0 |
| Total Achievements | 30+ | P0 |
| Badge Designs | 30+ | P0 |
| Unlock Animations | 3 types | P1 |
| Sharing Feature | Working | P2 |

## 🔧 Achievement Schema
```typescript
interface Achievement {
  id: number;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
  category: 'learning' | 'streak' | 'speaking' | 'quiz' | 'special';
  icon: string;           // Emoji or icon name
  badgeColor: string;     // Hulu-green variants
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  
  // Unlock conditions
  condition: {
    type: 'count' | 'streak' | 'score' | 'time' | 'special';
    target: number;
    metric: string;       // e.g., 'lessons_completed', 'speaking_minutes'
  };
  
  // Progress tracking
  isSecret: boolean;      // Hidden until unlocked
  order: number;          // Display order
}

interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  unlockedAt: string;
  progress: number;       // 0-100 for partial progress
  notified: boolean;
}
```

## 🎨 Badge Design System
```typescript
const BADGE_STYLES = {
  common: {
    border: '#1CE783',
    background: 'linear-gradient(135deg, #1CE783 0%, #0FD084 100%)',
    glow: 'none'
  },
  rare: {
    border: '#3B82F6',
    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    glow: '0 0 10px rgba(59, 130, 246, 0.5)'
  },
  epic: {
    border: '#8B5CF6',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    glow: '0 0 15px rgba(139, 92, 246, 0.5)'
  },
  legendary: {
    border: '#F59E0B',
    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    glow: '0 0 20px rgba(245, 158, 11, 0.6)',
    animation: 'pulse'
  }
};
```

## ✅ Success Criteria
- [ ] 30+ achievements implemented
- [ ] All have Hindi translations
- [ ] Unlock notifications work
- [ ] Progress tracking is accurate
- [ ] Badges look premium

## 🚧 Blockers & Risks
- Risk: Achievement inflation - Mitigation: Balance difficulty carefully
- Risk: Users gaming the system - Mitigation: Server-side validation

## 📝 Notes
- Achievements should feel earned, not given
- Mix easy wins with challenging goals
- Hindi names should be catchy and memorable
- Consider cultural references Indians will appreciate
