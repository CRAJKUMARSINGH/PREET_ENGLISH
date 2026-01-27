# Week 06: Speaking Feedback System

## 🎯 Goal
Build real-time speaking feedback with pronunciation scoring, fluency analysis, and personalized improvement suggestions.

## 📋 Tasks

### Day 1-2: Speech Recognition Enhancement
- [ ] Integrate Web Speech API with fallback options
- [ ] Implement continuous speech recognition
- [ ] Add speech-to-text accuracy improvements
- [ ] Create transcript comparison algorithm
- [ ] Handle Indian accent variations

### Day 3-4: Pronunciation Scoring
- [ ] Word-level accuracy scoring (0-100)
- [ ] Phoneme-level analysis for problem sounds
- [ ] Common Indian pronunciation issues detection:
  - V/W confusion (very → wery)
  - Th sounds (think → tink)
  - Silent letters
  - Stress patterns
- [ ] Create pronunciation score visualization

### Day 5: Fluency Analysis
- [ ] Speaking pace measurement (words per minute)
- [ ] Pause detection and analysis
- [ ] Filler word detection (um, uh, like)
- [ ] Sentence completion tracking
- [ ] Confidence score calculation

### Day 6: AI Feedback Generation
- [ ] Connect OpenAI for detailed feedback
- [ ] Generate Hindi explanations for errors
- [ ] Create improvement suggestions
- [ ] Build practice recommendations
- [ ] Add encouraging messages

### Day 7: UI & Integration
- [ ] Speaking practice UI with real-time feedback
- [ ] Progress visualization
- [ ] Session history and trends
- [ ] Mobile microphone optimization
- [ ] Offline capability for basic features

## 📊 Deliverables
| Item | Target | Priority |
|------|--------|----------|
| Speech Recognition | Working | P0 |
| Pronunciation Scoring | 0-100 scale | P0 |
| Fluency Metrics | 3 metrics | P0 |
| AI Feedback | Per session | P1 |
| Progress Tracking | Dashboard | P1 |

## 🔧 Technical Implementation
```typescript
interface SpeakingFeedback {
  transcript: string;
  expectedText: string;
  
  // Scores (0-100)
  overallScore: number;
  pronunciationScore: number;
  fluencyScore: number;
  confidenceScore: number;
  
  // Detailed analysis
  wordAnalysis: WordScore[];
  problematicPhonemes: PhonemeIssue[];
  fluencyMetrics: {
    wordsPerMinute: number;
    pauseCount: number;
    fillerWords: string[];
    completionRate: number;
  };
  
  // AI-generated feedback
  feedback: {
    summary: string;
    summaryHindi: string;
    improvements: Improvement[];
    encouragement: string;
  };
}

interface PhonemeIssue {
  phoneme: string;
  expected: string;
  detected: string;
  word: string;
  hindiExplanation: string;
  practiceWords: string[];
}
```

## 🎤 Indian English Considerations
```typescript
const INDIAN_PRONUNCIATION_PATTERNS = {
  // Common substitutions to detect
  'v_w': { pattern: /w(?=[aeiou])/g, correct: 'v', example: 'very not wery' },
  'th_t': { pattern: /t(?=h)/g, correct: 'th', example: 'think not tink' },
  'th_d': { pattern: /d(?=h)/g, correct: 'th', example: 'the not de' },
  
  // Acceptable Indian English variations (don't penalize)
  acceptable: [
    'schedule with sk sound',
    'process with short o',
    'data with soft a'
  ]
};
```

## ✅ Success Criteria
- [ ] Speech recognition works on mobile
- [ ] Pronunciation scoring is consistent
- [ ] Feedback is helpful and encouraging
- [ ] Hindi explanations are clear
- [ ] System handles Indian accents fairly

## 🚧 Blockers & Risks
- Risk: Speech API browser compatibility - Mitigation: Feature detection, fallbacks
- Risk: Accent bias in scoring - Mitigation: Calibrate for Indian English
- Risk: Microphone permissions - Mitigation: Clear permission flow

## 📝 Notes
- Don't penalize Indian English variations that are acceptable
- Focus on clarity over "native" accent
- Provide specific, actionable feedback
- Celebrate improvements, not just perfection
