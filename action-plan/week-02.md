# Week 02: Listening Content Creation

## 🎯 Goal
Build listening exercise system and create 30 audio-based learning modules with Hindi support.

## 📋 Tasks

### Day 1-2: Audio Infrastructure
- [ ] Set up text-to-speech integration (Web Speech API / Google TTS)
- [ ] Create audio player component with:
  - Play/pause, speed control (0.5x, 1x, 1.5x)
  - Repeat section feature
  - Transcript toggle
- [ ] Add `listenings` table if not exists, verify schema
- [ ] Create listening API routes

### Day 3-4: Listening Exercise Types
- [ ] **Dictation**: Listen and type what you hear
- [ ] **Comprehension**: Listen and answer questions
- [ ] **Fill the Gap**: Audio with missing words
- [ ] **Spot the Error**: Find mistakes in spoken text
- [ ] **Conversation Follow**: Multi-speaker dialogues

### Day 5-6: Content Creation
- [ ] 10 Beginner listenings (slow, clear speech)
  - Daily greetings, numbers, basic phrases
- [ ] 12 Intermediate listenings (normal speed)
  - Short stories, news snippets, instructions
- [ ] 8 Advanced listenings (native speed)
  - Interviews, debates, complex narratives

### Day 7: Integration & Testing
- [ ] Connect to lesson flow
- [ ] Add to daily practice recommendations
- [ ] Test across browsers (Chrome, Firefox, Safari)
- [ ] Mobile audio playback testing

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Audio Player Component | 1 | P0 |
| TTS Integration | Working | P0 |
| Beginner Listenings | 10 | P0 |
| Intermediate Listenings | 12 | P0 |
| Advanced Listenings | 8 | P1 |
| Comprehension Questions | 5 per listening | P0 |

## 🔧 Technical Notes
```typescript
// Listening exercise structure
interface ListeningExercise {
  id: number;
  title: string;
  titleHindi: string;
  audioText: string;        // Text to be spoken
  audioTextHindi: string;   // Hindi translation
  duration: string;         // "2:30"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  questions: ListeningQuestion[];
  vocabulary: VocabItem[];  // Key words from audio
  speakerAccent: 'indian' | 'american' | 'british';
}
```

## 🎧 Audio Content Categories
1. **Daily Conversations** - Greetings, shopping, directions
2. **Professional** - Office talk, interviews, presentations
3. **Travel** - Airport, hotel, tourist spots
4. **News & Current Affairs** - Short news clips
5. **Stories & Narratives** - Short tales with moral lessons

## ✅ Success Criteria
- [ ] 30 listening exercises created
- [ ] All have Hindi transcripts
- [ ] Audio plays smoothly on mobile
- [ ] Speed control works correctly
- [ ] Comprehension questions validate answers

## 🚧 Blockers & Risks
- Risk: TTS quality varies - Mitigation: Test multiple TTS providers
- Risk: Audio loading on slow connections - Mitigation: Preload, show loading state
- Risk: Browser compatibility - Mitigation: Fallback to basic audio element

## 📝 Notes
- Use Indian English accent for relatability
- Include common Indian names and scenarios
- Gradually increase complexity within each level
- Add "repeat" hints for difficult sections
