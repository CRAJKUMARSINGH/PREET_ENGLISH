# 🇮🇳 HINDI IMPLEMENTATION GUIDE
## Complete Integration Guide for Hindi-Enriched English Learning App

---

## 📋 OVERVIEW

This guide provides complete instructions for integrating Hindi-enriched content into your Preet English app, making it truly accessible and comfortable for Hindi-speaking users.

---

## 🎯 KEY PRINCIPLES

### 1. Hindi-First Design Philosophy
- Every English topic should have clear Hindi context
- Use simple, conversational Hindi (not overly formal)
- Include cultural references familiar to Hindi speakers
- Provide pronunciation guides for difficult English words

### 2. Progressive Language Exposure
- Start with 70% Hindi, 30% English for beginners
- Move to 50-50 for intermediate topics
- Advanced topics can be 30% Hindi, 70% English

### 3. Cultural Context Integration
- Use Indian examples (Bollywood instead of Hollywood)
- Reference Indian festivals, food, and customs
- Include India-specific scenarios and situations

---

## 🗄️ DATABASE STRUCTURE FOR HINDI SUPPORT

### Enhanced Schema

```sql
-- Main lessons table with Hindi support
CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    hindi_title TEXT NOT NULL,
    description TEXT,
    hindi_description TEXT,
    emoji_theme TEXT,
    difficulty_level TEXT CHECK(difficulty_level IN ('easy', 'medium', 'hard')),
    category TEXT,
    hindi_context TEXT, -- Brief Hindi explanation of topic
    hindi_hint TEXT, -- Learning hint in Hindi
    estimated_duration INTEGER, -- in minutes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vocabulary with full Hindi support
CREATE TABLE vocabulary (
    id TEXT PRIMARY KEY,
    lesson_id TEXT,
    english_word TEXT NOT NULL,
    hindi_word TEXT NOT NULL,
    hindi_transliteration TEXT, -- Phonetic Hindi
    pronunciation TEXT, -- IPA or simple phonetics
    emoji TEXT,
    example_sentence TEXT,
    hindi_example TEXT,
    difficulty_level INTEGER,
    category TEXT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Conversation lines with bilingual support
CREATE TABLE conversation_lines (
    id TEXT PRIMARY KEY,
    lesson_id TEXT,
    line_number INTEGER,
    speaker TEXT CHECK(speaker IN ('A', 'B')),
    english_text TEXT NOT NULL,
    hindi_text TEXT NOT NULL,
    romanized_hindi TEXT, -- Hindi in English script
    emoji TEXT,
    audio_url TEXT,
    cultural_note TEXT, -- Cultural context in Hindi
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Cultural context and notes
CREATE TABLE cultural_notes (
    id TEXT PRIMARY KEY,
    lesson_id TEXT,
    title TEXT,
    hindi_title TEXT,
    content TEXT,
    hindi_content TEXT,
    category TEXT, -- 'custom', 'festival', 'etiquette'
    region TEXT, -- 'north_india', 'south_india', 'general'
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- User progress with Hindi preferences
CREATE TABLE user_preferences (
    user_id TEXT PRIMARY KEY,
    hindi_support_level TEXT DEFAULT 'full', -- 'full', 'partial', 'minimal'
    show_romanized_hindi BOOLEAN DEFAULT true,
    show_cultural_notes BOOLEAN DEFAULT true,
    pronunciation_speed TEXT DEFAULT 'normal', -- 'slow', 'normal', 'fast'
    preferred_examples_region TEXT DEFAULT 'general', -- 'north', 'south', 'general'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚛️ REACT COMPONENTS WITH HINDI SUPPORT

### 1. Bilingual Lesson Card

```tsx
// components/LessonCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    hindiTitle: string;
    emojiTheme: string;
    difficultyLevel: 'easy' | 'medium' | 'hard';
    category: string;
    hindiContext: string;
    hindiHint: string;
    progress?: number;
  };
  onClick: () => void;
  showHindi: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  onClick, 
  showHindi 
}) => {
  const difficultyConfig = {
    easy: {
      emoji: '🟢',
      color: 'bg-green-100 text-green-800 border-green-200',
      bgColor: 'hover:bg-green-50'
    },
    medium: {
      emoji: '🟡', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      bgColor: 'hover:bg-yellow-50'
    },
    hard: {
      emoji: '🔴',
      color: 'bg-red-100 text-red-800 border-red-200', 
      bgColor: 'hover:bg-red-50'
    }
  };

  const config = difficultyConfig[lesson.difficultyLevel];

  return (
    <TooltipProvider>
      <Card 
        className={`cursor-pointer transition-all duration-200 ${config.bgColor} border-2 group`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg flex items-start gap-3">
              <span className="text-3xl mt-1">{lesson.emojiTheme}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {lesson.title}
                </div>
                {showHindi && (
                  <div className="text-sm text-gray-600 font-normal mt-1">
                    {lesson.hindiTitle}
                  </div>
                )}
              </div>
            </CardTitle>
            <Badge className={`${config.color} font-medium`}>
              {config.emoji} {lesson.difficultyLevel}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {/* Hindi Context */}
            {showHindi && (
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                <div className="text-sm text-blue-800">
                  <strong>संदर्भ:</strong> {lesson.hindiContext}
                </div>
              </div>
            )}

            {/* Learning Hint */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 cursor-help">
                  <div className="text-sm text-yellow-800">
                    💡 <strong>सुझाव:</strong> {lesson.hindiHint.substring(0, 60)}...
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{lesson.hindiHint}</p>
              </TooltipContent>
            </Tooltip>

            {/* Progress Bar */}
            {lesson.progress !== undefined && (
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {lesson.progress}%
                </span>
              </div>
            )}

            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                श्रेणी: {lesson.category}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                शुरू करें →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
```

### 2. Bilingual Vocabulary Component

```tsx
// components/VocabularyItem.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabularyItemProps {
  vocabulary: {
    id: string;
    englishWord: string;
    hindiWord: string;
    hindiTransliteration: string;
    pronunciation: string;
    emoji: string;
    exampleSentence?: string;
    hindiExample?: string;
  };
  onPlayAudio?: (text: string, language: 'en' | 'hi') => void;
  showRomanized: boolean;
  showExamples: boolean;
}

export const VocabularyItem: React.FC<VocabularyItemProps> = ({ 
  vocabulary, 
  onPlayAudio,
  showRomanized,
  showExamples
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(vocabulary.englishWord);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="vocabulary-card">
      <Card 
        className={cn(
          "p-4 cursor-pointer transition-all duration-300 hover:shadow-lg",
          isFlipped ? "bg-gradient-to-br from-blue-50 to-indigo-50" : "bg-white"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flex items-start justify-between">
          {/* Main Content */}
          <div className="flex items-start gap-4 flex-1">
            <span className="text-4xl">{vocabulary.emoji}</span>
            <div className="flex-1 space-y-2">
              {/* English Word */}
              <div className="flex items-center gap-3">
                <div className="font-bold text-xl text-gray-900">
                  {vocabulary.englishWord}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayAudio?.(vocabulary.englishWord, 'en');
                  }}
                  className="h-8 w-8 hover:bg-blue-100"
                >
                  <Volume2 className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-600" />
                  )}
                </Button>
              </div>

              {/* Hindi Translation */}
              <div className="text-lg text-gray-700 font-medium">
                {vocabulary.hindiWord}
              </div>

              {/* Romanized Hindi (if enabled) */}
              {showRomanized && (
                <div className="text-sm text-gray-500 italic">
                  {vocabulary.hindiTransliteration}
                </div>
              )}

              {/* Pronunciation */}
              <div className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                /{vocabulary.pronunciation}/
              </div>

              {/* Examples (if enabled and card is flipped) */}
              {isFlipped && showExamples && (
                <div className="mt-3 space-y-2">
                  {vocabulary.exampleSentence && (
                    <div className="text-sm text-gray-600">
                      <strong>Example:</strong> {vocabulary.exampleSentence}
                    </div>
                  )}
                  {vocabulary.hindiExample && (
                    <div className="text-sm text-gray-600">
                      <strong>उदाहरण:</strong> {vocabulary.hindiExample}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Flip Indicator */}
          <div className="text-xs text-gray-400 transform rotate-90">
            {isFlipped ? '←' : '→'}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Tap to {isFlipped ? 'see basic info' : 'see examples'}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPlayAudio?.(vocabulary.hindiWord, 'hi');
            }}
            className="h-6 w-6 hover:bg-orange-100"
          >
            <Volume2 className="h-3 w-3 text-orange-600" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
```

### 3. Bilingual Conversation Practice

```tsx
// components/ConversationPractice.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, RotateCcw, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationLine {
  id: string;
  speaker: 'A' | 'B';
  englishText: string;
  hindiText: string;
  romanizedHindi: string;
  emoji: string;
  culturalNote?: string;
}

interface ConversationPracticeProps {
  conversation: ConversationLine[];
  onPlayAudio?: (text: string, language: 'en' | 'hi') => void;
  onStartRecording?: () => void;
  showHindi: boolean;
  showRomanized: boolean;
  showCulturalNotes: boolean;
}

export const ConversationPractice: React.FC<ConversationPracticeProps> = ({
  conversation,
  onPlayAudio,
  onStartRecording,
  showHindi,
  showRomanized,
  showCulturalNotes
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showTranslation, setShowTranslation] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTranslation = (lineId: string) => {
    const newSet = new Set(showTranslation);
    if (newSet.has(lineId)) {
      newSet.delete(lineId);
    } else {
      newSet.add(lineId);
    }
    setShowTranslation(newSet);
  };

  const playLineAudio = (line: ConversationLine) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    onPlayAudio?.(line.englishText, 'en');
    
    // Simulate audio duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const resetConversation = () => {
    setCurrentLine(0);
    setShowTranslation(new Set());
  };

  return (
    <div className="conversation-practice space-y-4 max-w-3xl mx-auto">
      {/* Conversation Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            💬 बातचीत अभ्यास
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Line {currentLine + 1} of {conversation.length}</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={resetConversation}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          फिर से शुरू करें
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((currentLine + 1) / conversation.length) * 100}%` }}
        />
      </div>

      {/* Conversation Lines */}
      <div className="space-y-4">
        {conversation.map((line, index) => (
          <div
            key={line.id}
            className={cn(
              "flex transition-all duration-500",
              line.speaker === 'A' ? 'justify-start' : 'justify-end',
              index > currentLine && 'opacity-50'
            )}
          >
            <div
              className={cn(
                "relative max-w-xs lg:max-w-md px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200",
                line.speaker === 'A'
                  ? 'bg-gray-200 text-gray-900 rounded-bl-sm hover:bg-gray-300'
                  : 'bg-blue-600 text-white rounded-br-sm hover:bg-blue-700',
                index === currentLine && 'ring-2 ring-blue-400'
              )}
              onClick={() => toggleTranslation(line.id)}
            >
              {/* Speaker Label */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{line.emoji}</span>
                  <span className="text-xs font-semibold opacity-75">
                    Speaker {line.speaker}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6",
                      line.speaker === 'A' ? 'hover:bg-gray-400' : 'hover:bg-blue-800'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      playLineAudio(line);
                    }}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                  
                  {showTranslation.has(line.id) && (
                    <ChevronDown className="h-3 w-3 animate-bounce" />
                  )}
                </div>
              </div>

              {/* English Text */}
              <div className="text-base leading-relaxed font-medium">
                {line.englishText}
              </div>

              {/* Hindi Translation */}
              {showHindi && showTranslation.has(line.id) && (
                <div className={cn(
                  "text-sm mt-2 pt-2 border-t",
                  line.speaker === 'A' ? 'border-gray-400' : 'border-blue-500'
                )}>
                  <div className="font-medium text-base mb-1">
                    {line.hindiText}
                  </div>
                  
                  {showRomanized && (
                    <div className="text-xs opacity-75 italic">
                      {line.romanizedHindi}
                    </div>
                  )}
                </div>
              )}

              {/* Cultural Note */}
              {showCulturalNotes && line.culturalNote && showTranslation.has(line.id) && (
                <div className={cn(
                  "mt-2 pt-2 border-t text-xs",
                  line.speaker === 'A' ? 'border-gray-400' : 'border-blue-500'
                )}>
                  <div className="flex items-start gap-1">
                    <span className="text-orange-500">🏛️</span>
                    <span className="opacity-75">{line.culturalNote}</span>
                  </div>
                </div>
              )}

              {/* Action Hint */}
              <div className="text-xs mt-2 opacity-50">
                {showTranslation.has(line.id) ? 'फिर से टैप करें हिंदी छिपाने के लिए' : 'टैप करें हिंदी देखने के लिए'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setCurrentLine(Math.max(0, currentLine - 1))}
            disabled={currentLine === 0}
            variant="outline"
          >
            ← पिछला
          </Button>
          
          <Button
            onClick={() => setCurrentLine(Math.min(conversation.length - 1, currentLine + 1))}
            disabled={currentLine === conversation.length - 1}
            variant="outline"
          >
            अगला →
          </Button>
        </div>

        <Button
          size="lg"
          onClick={onStartRecording}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <Mic className="h-5 w-5" />
          अभ्यास शुरू करें
        </Button>
      </div>
    </div>
  );
};
```

---

## 🎨 HINDI-SPECIFIC UI COMPONENTS

### 1. Hindi Hint Button

```tsx
// components/HindiHintButton.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb } from 'lucide-react';

interface HindiHintButtonProps {
  hint: string;
  topic: string;
}

export const HindiHintButton: React.FC<HindiHintButtonProps> = ({ hint, topic }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Lightbulb className="h-4 w-4" />
            💡 हिंदी संकेत
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm bg-orange-50 border-orange-200">
          <div className="space-y-2">
            <div className="font-semibold text-orange-800">
              {topic} पर संकेत:
            </div>
            <p className="text-orange-700">{hint}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
```

### 2. Cultural Context Display

```tsx
// components/CulturalContext.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { India, Users, Calendar } from 'lucide-react';

interface CulturalContextProps {
  title: string;
  hindiTitle: string;
  content: string;
  hindiContent: string;
  category: 'festival' | 'custom' | 'etiquette';
  region: 'north_india' | 'south_india' | 'general';
  showHindi: boolean;
}

export const CulturalContext: React.FC<CulturalContextProps> = ({
  title,
  hindiTitle,
  content,
  hindiContent,
  category,
  region,
  showHindi
}) => {
  const categoryIcons = {
    festival: <Calendar className="h-5 w-5" />,
    custom: <Users className="h-5 w-5" />,
    etiquette: <India className="h-5 w-5" />
  };

  const categoryColors = {
    festival: 'bg-pink-50 border-pink-200 text-pink-700',
    custom: 'bg-blue-50 border-blue-200 text-blue-700',
    etiquette: 'bg-green-50 border-green-200 text-green-700'
  };

  return (
    <Card className={`p-4 border-2 ${categoryColors[category]}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {categoryIcons[category]}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {showHindi ? hindiTitle : title}
            </h3>
            <span className="text-xs font-medium uppercase">
              {region.replace('_', ' ')}
            </span>
          </div>
          
          <div className="text-sm leading-relaxed">
            {showHindi ? (
              <div>
                <p className="font-medium">{hindiContent}</p>
                <p className="mt-2 opacity-75 italic">{content}</p>
              </div>
            ) : (
              <div>
                <p>{content}</p>
                <p className="mt-2 opacity-75">{hindiContent}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
```

---

## 🔊 ADVANCED AUDIO FEATURES

### 1. Hindi Text-to-Speech

```typescript
// utils/hindiSpeech.ts
export class HindiSpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
    
    if (this.voices.length === 0) {
      this.synth.addEventListener('voiceschanged', () => {
        this.voices = this.synth.getVoices();
      });
    }
  }

  speakHindi(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}) {
    if (!this.synth) return;

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find Hindi voice
    const hindiVoice = this.voices.find(voice => 
      voice.lang.startsWith('hi') || voice.lang.startsWith('hi-IN')
    );

    if (hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
    } else {
      // Fallback to default with Hindi language code
      utterance.lang = 'hi-IN';
    }

    utterance.rate = options.rate || 0.7; // Slower for learners
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    this.synth.speak(utterance);
  }

  speakEnglish(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
  } = {}) {
    if (!this.synth) return;

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find Indian English voice
    const indianVoice = this.voices.find(voice => 
      voice.lang.startsWith('en-IN')
    );

    if (indianVoice) {
      utterance.voice = indianVoice;
      utterance.lang = 'en-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
  }
}

// Usage
const hindiSpeech = new HindiSpeechService();

// In components
const handlePlayHindi = (text: string) => {
  hindiSpeech.speakHindi(text, { rate: 0.6 });
};

const handlePlayEnglish = (text: string) => {
  hindiSpeech.speakEnglish(text, { rate: 0.7 });
};
```

### 2. Pronunciation Practice

```tsx
// components/PronunciationPractice.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Volume2, Check, X } from 'lucide-react';

interface PronunciationPracticeProps {
  word: string;
  pronunciation: string;
  onPracticeComplete?: (accuracy: number) => void;
}

export const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({
  word,
  pronunciation,
  onPracticeComplete
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        
        // Simulate feedback (in real app, use speech recognition)
        const isCorrect = Math.random() > 0.3; // 70% success rate
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        onPracticeComplete?.(isCorrect ? 85 : 45);
        
        setTimeout(() => setFeedback(null), 3000);
      }, 3000);
    } catch (error) {
      console.error('Microphone access denied:', error);
    }
  };

  return (
    <div className="pronunciation-practice p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-purple-800">
          उच्चारण अभ्यास
        </h3>
        
        <div className="text-3xl font-bold text-gray-900">
          {word}
        </div>
        
        <div className="text-lg text-gray-600 font-mono">
          /{pronunciation}/
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={cn(
            "flex items-center justify-center gap-2 p-3 rounded-lg",
            feedback === 'correct' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          )}>
            {feedback === 'correct' ? (
              <><Check className="h-5 w-5" /> बहुत अच्छे!</>
            ) : (
              <><X className="h-5 w-5" /> फिर से कोशिश करें</>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={() => {/* Play correct pronunciation */}}
            className="flex items-center gap-2"
          >
            <Volume2 className="h-5 w-5" />
            सुनें
          </Button>
          
          <Button
            size="lg"
            onClick={startRecording}
            disabled={isRecording}
            className={cn(
              "flex items-center gap-2",
              isRecording && "animate-pulse bg-red-500"
            )}
          >
            <Mic className="h-5 w-5" />
            {isRecording ? 'रिकॉर्डिंग...' : 'बोलें'}
          </Button>
        </div>

        {isRecording && (
          <div className="text-sm text-gray-600">
            कृपया "{word}" स्पष्ट रूप से बोलें...
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 🎨 HINDI-SPECIFIC STYLING

### Tailwind CSS Configuration

```css
/* index.css */
@layer utilities {
  .hindi-text {
    @apply font-sans leading-relaxed;
    /* Ensure proper Devanagari script rendering */
    font-feature-settings: 'kern' 1, 'liga' 1;
  }
  
  .romanized-text {
    @apply italic text-gray-600;
    font-style: italic;
  }
  
  .cultural-note {
    @apply border-l-4 pl-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50;
  }
  
  .hindi-hint {
    @apply bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200;
  }
}

/* Ensure proper font rendering for Hindi */
body {
  font-family: 'Inter', 'Noto Sans Devanagari', 'Hind', sans-serif;
}

/* Custom scrollbar for Hindi content */
.hindi-content::-webkit-scrollbar {
  width: 8px;
}

.hindi-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.hindi-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.hindi-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

## 📱 MOBILE OPTIMIZATION FOR HINDI USERS

### 1. Responsive Hindi Text

```tsx
// hooks/useHindiText.ts
import { useEffect, useState } from 'react';

export const useHindiText = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust font size for Hindi text on mobile
  const getHindiFontSize = (baseSize: number) => {
    return isMobile ? baseSize * 1.1 : baseSize; // Slightly larger for mobile
  };

  return { isMobile, getHindiFontSize };
};
```

### 2. Mobile-Optimized Hindi Components

```tsx
// components/MobileHindiLesson.tsx
import React from 'react';
import { useHindiText } from '@/hooks/useHindiText';

export const MobileHindiLesson: React.FC = () => {
  const { isMobile, getHindiFontSize } = useHindiText();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Hindi title */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-3">
          <h1 
            className="font-bold text-gray-900"
            style={{ fontSize: `${getHindiFontSize(18)}px` }}
          >
            दैनिक दिनचर्या के बारे में बात करें
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Learn to talk about daily routine
          </p>
        </div>
      </header>

      {/* Content optimized for mobile */}
      <main className="px-4 py-6">
        {/* Larger touch targets for Hindi content */}
        <div className="space-y-6">
          {/* Vocabulary items with larger touch areas */}
          <div className="space-y-4">
            {/* Vocabulary content */}
          </div>
        </div>
      </main>
    </div>
  );
};
```

---

## 🧪 TESTING HINDI CONTENT

### 1. Hindi Content Validation

```typescript
// __tests__/hindiContent.test.ts
describe('Hindi Content Validation', () => {
  const hindiTopics = [
    {
      id: 'daily_routine',
      expectedHindi: 'दिनचर्या के बारे में बात करें',
      expectedContext: 'दैनिक दिनचर्या'
    },
    // Add more test cases
  ];

  test.each(hindiTopics)('Hindi content for $id is valid', ({ 
    id, 
    expectedHindi, 
    expectedContext 
  }) => {
    const topic = getTopicById(id);
    
    expect(topic.hindiTitle).toBe(expectedHindi);
    expect(topic.hindiContext).toContain(expectedContext);
    expect(topic.hindiHint).toBeTruthy();
    expect(topic.hindiHint.length).toBeGreaterThan(20);
  });

  test('Vocabulary has proper Hindi translations', () => {
    const vocabulary = getVocabularyForLesson('daily_routine');
    
    vocabulary.forEach(item => {
      expect(item.hindiWord).toBeTruthy();
      expect(item.hindiTransliteration).toBeTruthy();
      expect(item.hindiExample).toBeTruthy();
    });
  });
});
```

### 2. Cultural Context Testing

```typescript
// __tests__/culturalContext.test.ts
describe('Cultural Context', () => {
  test('Festival references are appropriate', () => {
    const festivals = ['diwali', 'holi', 'eid', 'christmas'];
    const content = getCulturalContent();
    
    festivals.forEach(festival => {
      const hasReference = content.some(item => 
        item.content.toLowerCase().includes(festival) ||
        item.hindiContent.toLowerCase().includes(festival)
      );
      expect(hasReference).toBe(true);
    });
  });

  test('Food references include Indian cuisine', () => {
    const indianFoods = ['biryani', 'dosa', 'paratha', 'samosa'];
    const content = getFoodRelatedContent();
    
    indianFoods.forEach(food => {
      const hasReference = content.some(item => 
        item.exampleSentence?.toLowerCase().includes(food) ||
        item.hindiExample?.toLowerCase().includes(food)
      );
      expect(hasReference).toBe(true);
    });
  });
});
```

---

## 📊 ANALYTICS FOR HINDI USERS

### 1. Track Hindi Feature Usage

```typescript
// utils/hindiAnalytics.ts
export const trackHindiFeature = (event: string, properties: Record<string, any>) => {
  gtag('event', event, {
    ...properties,
    category: 'hindi_features',
    language_preference: 'hindi'
  });
};

// Usage examples
trackHindiFeature('hindi_hint_clicked', {
  topic: 'daily_routine',
  hint_length: 45
});

trackHindiFeature('hindi_audio_played', {
  word: 'wake_up',
  pronunciation_type: 'hindi'
});

trackHindiFeature('cultural_note_viewed', {
  note_category: 'festival',
  region: 'north_india'
});
```

### 2. User Engagement Metrics

```typescript
// Track key metrics for Hindi users
export const trackHindiEngagement = {
  lessonCompletion: (lessonId: string, difficulty: string) => {
    trackHindiFeature('lesson_completed', {
      lesson_id: lessonId,
      difficulty,
      completion_language: 'hindi_supported'
    });
  },

  vocabularyLearning: (wordCount: number, mode: 'hindi_first' | 'bilingual') => {
    trackHindiFeature('vocabulary_learned', {
      word_count: wordCount,
      learning_mode: mode
    });
  },

  conversationPractice: (topic: string, linesPracticed: number) => {
    trackHindiFeature('conversation_practiced', {
      topic,
      lines_practiced: linesPracticed,
      practice_mode: 'hindi_supported'
    });
  }
};
```

---

## 🚀 DEPLOYMENT CHECKLIST FOR HINDI APP

### Pre-Launch
- [ ] All Hindi translations reviewed by native speaker
- [ ] Cultural context validated for accuracy
- [ ] Audio functionality tested with Hindi text
- [ ] Mobile responsiveness verified
- [ ] Font rendering tested on various devices
- [ ] User preferences for Hindi support implemented
- [ ] Analytics tracking for Hindi features added

### Post-Launch
- [ ] Monitor Hindi feature usage
- [ ] Collect feedback from Hindi-speaking users
- [ ] Track engagement metrics
- [ ] Identify popular topics and content gaps
- [ ] Plan content expansion based on user feedback

---

## 🎯 SUCCESS METRICS FOR HINDI APP

### Engagement Metrics
- **Hindi Hint Usage**: >60% of users should use Hindi hints
- **Audio Playback**: >80% should play Hindi audio at least once
- **Cultural Note Views**: >40% should view cultural context
- **Lesson Completion**: >70% completion rate for Hindi-supported lessons

### Learning Outcomes
- **Vocabulary Retention**: 25% improvement with Hindi context
- **Pronunciation Accuracy**: 30% better with Hindi audio
- **Cultural Understanding**: 40% increase in cultural awareness
- **User Confidence**: Self-reported confidence boost in conversations

### Business Metrics
- **User Retention**: 35% higher for Hindi-supported users
- **Session Duration**: 40% longer sessions with Hindi content
- **Word-of-Mouth**: 50% more referrals from Hindi users
- **Premium Conversion**: 30% higher for professional Hindi content

---

## 🔮 FUTURE ENHANCEMENTS

### 1. Regional Hindi Variations
- Haryanvi Hindi context
- Bhojpuri Hindi examples
- Rajasthani cultural references
- Marathi-influenced Hindi

### 2. Advanced Hindi Features
- Hindi grammar tips
- Idiomatic expressions
- Proverbs and sayings
- Formal vs informal Hindi

### 3. Cultural Immersion
- Virtual Indian festivals
- Regional cuisine deep-dives
- Traditional customs explanation
- Modern vs traditional comparisons

---

**🎉 Your Preet English app is now ready to serve Hindi speakers with the most comprehensive, culturally relevant, and engaging English learning experience!**

**जय हिंद! 🇮🇳** 
