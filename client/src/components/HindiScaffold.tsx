/**
 * HINDI SCAFFOLD COMPONENT
 * 
 * Grade 9 Quality: Provides contextual Hindi support without breaking English learning
 * Ensures Hindi speakers can understand instructions while learning English content
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { getBothLanguages, BilingualText } from '@/data/bilingualTranslations';

interface HindiScaffoldProps {
  english: string;
  hindi: string;
  className?: string;
  variant?: 'default' | 'header' | 'instruction' | 'navigation';
  showBoth?: boolean;
  priority?: 'english' | 'hindi' | 'equal';
}

export function HindiScaffold({ 
  english, 
  hindi, 
  className,
  variant = 'default',
  showBoth = true,
  priority = 'english'
}: HindiScaffoldProps) {
  const baseClasses = {
    default: 'bilingual-container',
    header: 'lesson-header-container',
    instruction: 'hindi-scaffold',
    navigation: 'grade9-nav-item'
  };

  if (variant === 'header') {
    return (
      <div className={cn(baseClasses.header, className)}>
        <h2 className="title">{english}</h2>
        {showBoth && <p className="hindi-title" lang="hi">{hindi}</p>}
      </div>
    );
  }

  if (variant === 'navigation') {
    return (
      <div className={cn(baseClasses.navigation, className)}>
        <span className="english">{english}</span>
        {showBoth && <span className="hindi" lang="hi">({hindi})</span>}
      </div>
    );
  }

  if (variant === 'instruction') {
    return (
      <div className={cn(baseClasses.instruction, className)}>
        <div className="english-content" lang="en">{english}</div>
        {showBoth && (
          <div className="hindi-explanation" lang="hi">{hindi}</div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(baseClasses.default, className)}>
      {priority === 'hindi' ? (
        <>
          <p className="hindi hindi-text" lang="hi">{hindi}</p>
          {showBoth && <p className="english">{english}</p>}
        </>
      ) : (
        <>
          <p className="english">{english}</p>
          {showBoth && <p className="hindi hindi-text" lang="hi">{hindi}</p>}
        </>
      )}
    </div>
  );
}

// Utility component for common UI elements
interface BilingualTextProps {
  textKey: string;
  useHindi?: boolean;
  showBoth?: boolean;
  className?: string;
}

export function BilingualText({ 
  textKey, 
  useHindi = false, 
  showBoth = false,
  className 
}: BilingualTextProps) {
  const text = getBothLanguages(textKey);
  
  if (!text) {
    return <span className={className}>{textKey}</span>;
  }

  if (!showBoth) {
    return (
      <span 
        className={cn(useHindi ? 'hindi-text' : '', className)}
        lang={useHindi ? 'hi' : 'en'}
      >
        {useHindi ? text.hi : text.en}
      </span>
    );
  }

  return (
    <HindiScaffold
      english={text.en}
      hindi={text.hi}
      className={className}
      priority={useHindi ? 'hindi' : 'english'}
    />
  );
}

// Quality indicator component
interface QualityBadgeProps {
  score: number;
  className?: string;
}

export function QualityBadge({ score, className }: QualityBadgeProps) {
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', label: 'Grade 9', variant: 'grade-9' };
    if (score >= 80) return { grade: 'B+', label: 'Grade 8', variant: 'grade-8' };
    return { grade: 'C', label: 'Needs Work', variant: 'needs-improvement' };
  };

  const { grade, label, variant } = getGrade(score);

  return (
    <span className={cn('quality-badge', variant, className)}>
      <span>{grade}</span>
      <span className="hindi-text-sm" lang="hi">
        {variant === 'grade-9' ? 'उत्कृष्ट' : 
         variant === 'grade-8' ? 'अच्छा' : 'सुधार चाहिए'}
      </span>
    </span>
  );
}

// Lesson navigation with bilingual support
interface LessonNavigationProps {
  currentTitle: string;
  currentHindiTitle?: string;
  nextTitle?: string;
  nextHindiTitle?: string;
  prevTitle?: string;
  prevHindiTitle?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

export function LessonNavigation({
  currentTitle,
  currentHindiTitle,
  nextTitle,
  nextHindiTitle,
  prevTitle,
  prevHindiTitle,
  onNext,
  onPrevious,
  className
}: LessonNavigationProps) {
  return (
    <div className={cn('flex items-center justify-between p-4 bg-card border rounded-lg', className)}>
      {/* Previous Lesson */}
      <div className="flex-1">
        {prevTitle && onPrevious && (
          <button
            onClick={onPrevious}
            className="grade9-nav-item text-left w-full"
          >
            <div>
              <div className="text-sm text-muted-foreground">
                <BilingualText textKey="previous" showBoth />
              </div>
              <div className="english font-medium">{prevTitle}</div>
              {prevHindiTitle && (
                <div className="hindi hindi-text-sm" lang="hi">{prevHindiTitle}</div>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Current Lesson */}
      <div className="flex-2 text-center px-4">
        <div className="english font-semibold">{currentTitle}</div>
        {currentHindiTitle && (
          <div className="hindi hindi-text" lang="hi">{currentHindiTitle}</div>
        )}
      </div>

      {/* Next Lesson */}
      <div className="flex-1">
        {nextTitle && onNext && (
          <button
            onClick={onNext}
            className="grade9-nav-item text-right w-full"
          >
            <div>
              <div className="text-sm text-muted-foreground">
                <BilingualText textKey="next" showBoth />
              </div>
              <div className="english font-medium">{nextTitle}</div>
              {nextHindiTitle && (
                <div className="hindi hindi-text-sm" lang="hi">{nextHindiTitle}</div>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// Cultural context component
interface CulturalContextProps {
  context: string;
  examples?: { formal?: string; informal?: string; business?: string };
  className?: string;
}

export function CulturalContext({ context, examples, className }: CulturalContextProps) {
  return (
    <div className={cn('hindi-scaffold', className)}>
      <div className="english-content">
        <span className="text-sm font-medium text-primary">Cultural Context</span>
      </div>
      <div className="hindi-explanation" lang="hi">
        <p>{context}</p>
        {examples && (
          <div className="mt-2 space-y-1">
            {examples.formal && (
              <div><strong>औपचारिक:</strong> {examples.formal}</div>
            )}
            {examples.informal && (
              <div><strong>अनौपचारिक:</strong> {examples.informal}</div>
            )}
            {examples.business && (
              <div><strong>व्यापारिक:</strong> {examples.business}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}