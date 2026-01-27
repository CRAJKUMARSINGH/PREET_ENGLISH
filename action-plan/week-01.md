# Week 01: Quiz System Foundation

## 🎯 Goal
Build complete quiz infrastructure and create 50 high-quality quizzes across all difficulty levels.

## 📋 Tasks

### Day 1-2: Database & API
- [ ] Create `quizzes` table schema with fields:
  - id, title, titleHindi, description, descriptionHindi
  - difficulty, category, lessonId (optional)
  - questions (JSON), passingScore, xpReward
  - timeLimit, hintsAllowed
- [ ] Create `quizAttempts` table for tracking user progress
- [ ] Add quiz API routes: list, get, submit, results
- [ ] Create quiz storage methods

### Day 3-4: Quiz Types Implementation
- [ ] Multiple Choice Questions (MCQ)
- [ ] Fill in the Blanks
- [ ] Sentence Rearrangement
- [ ] True/False
- [ ] Match the Pairs
- [ ] Listen and Choose (audio-based)

### Day 5-6: Content Creation
- [ ] 15 Beginner quizzes (grammar basics, common phrases)
- [ ] 20 Intermediate quizzes (tenses, vocabulary)
- [ ] 15 Advanced quizzes (idioms, complex grammar)

### Day 7: Testing & Polish
- [ ] Unit tests for quiz submission logic
- [ ] UI components for quiz display
- [ ] Progress tracking integration
- [ ] XP reward system connection

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Quiz Schema | Complete | P0 |
| Quiz API | 5 endpoints | P0 |
| Beginner Quizzes | 15 | P0 |
| Intermediate Quizzes | 20 | P0 |
| Advanced Quizzes | 15 | P1 |
| Quiz UI Components | 3 types | P0 |

## 🔧 Technical Notes
```typescript
// Quiz question structure
interface QuizQuestion {
  id: number;
  type: 'mcq' | 'fill_blank' | 'rearrange' | 'true_false' | 'match';
  question: string;
  questionHindi: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation?: string;
  explanationHindi?: string;
  points: number;
}
```

## ✅ Success Criteria
- [ ] 50 quizzes created and tested
- [ ] All quizzes have Hindi translations
- [ ] Quiz completion awards XP correctly
- [ ] Results show detailed feedback
- [ ] Mobile-responsive quiz UI

## 🚧 Blockers & Risks
- Risk: Quiz content quality - Mitigation: Review each quiz manually
- Risk: Complex UI for rearrange type - Mitigation: Start with simpler types

## 📝 Notes
- Focus on grammar topics Indians commonly struggle with
- Include cultural context in examples
- Each quiz should take 5-10 minutes to complete
