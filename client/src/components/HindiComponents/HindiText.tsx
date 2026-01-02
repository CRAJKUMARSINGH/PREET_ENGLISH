import React from 'react';
import { cn } from '@/lib/utils';

interface HindiExplanationProps {
  englishText: string;
  hindiExplanation: string;
  pronunciation?: string;
  commonMistake?: string;
  tip?: string;
  className?: string;
}

export function HindiExplanation({ 
  englishText, 
  hindiExplanation, 
  pronunciation,
  commonMistake,
  tip,
  className 
}: HindiExplanationProps) {
  return (
    <div className={cn('hindi-explanation bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800', className)}>
      <div className="english-text font-semibold text-lg mb-2">
        {englishText}
      </div>
      
      <div className="hindi-explanation text-blue-700 dark:text-blue-300 mb-2">
        <span className="font-medium">Hindi में:</span> {hindiExplanation}
      </div>
      
      {pronunciation && (
        <div className="pronunciation text-sm text-purple-600 dark:text-purple-400 mb-2">
          <span className="font-medium">उच्चारण:</span> {pronunciation}
        </div>
      )}
      
      {commonMistake && (
        <div className="common-mistake text-sm text-red-600 dark:text-red-400 mb-2">
          <span className="font-medium">आम गलती:</span> {commonMistake}
        </div>
      )}
      
      {tip && (
        <div className="tip text-sm text-green-600 dark:text-green-400">
          <span className="font-medium">💡 टिप:</span> {tip}
        </div>
      )}
    </div>
  );
}

// Common English mistakes for Hindi speakers
interface CommonMistakeProps {
  wrongSentence: string;
  correctSentence: string;
  hindiExplanation: string;
  className?: string;
}

export function CommonMistakeCard({ 
  wrongSentence, 
  correctSentence, 
  hindiExplanation,
  className 
}: CommonMistakeProps) {
  return (
    <div className={cn('mistake-card bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800', className)}>
      <div className="wrong-sentence text-red-600 dark:text-red-400 mb-2">
        <span className="font-medium">❌ गलत:</span> {wrongSentence}
      </div>
      
      <div className="correct-sentence text-green-600 dark:text-green-400 mb-2">
        <span className="font-medium">✅ सही:</span> {correctSentence}
      </div>
      
      <div className="explanation text-sm text-muted-foreground">
        <span className="font-medium">समझाइए:</span> {hindiExplanation}
      </div>
    </div>
  );
}

// Pronunciation guide for Hindi speakers
interface PronunciationGuideProps {
  englishWord: string;
  hindiComparison: string;
  soundTip: string;
  className?: string;
}

export function PronunciationGuide({ 
  englishWord, 
  hindiComparison, 
  soundTip,
  className 
}: PronunciationGuideProps) {
  return (
    <div className={cn('pronunciation-guide bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800', className)}>
      <div className="english-word font-semibold text-lg mb-2">
        {englishWord}
      </div>
      
      <div className="hindi-comparison text-purple-600 dark:text-purple-400 mb-2">
        <span className="font-medium">Hindi में समान:</span> {hindiComparison}
      </div>
      
      <div className="sound-tip text-sm text-muted-foreground">
        <span className="font-medium">🎵 आवाज़ की टिप:</span> {soundTip}
      </div>
    </div>
  );
}