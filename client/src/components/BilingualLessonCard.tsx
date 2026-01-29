/**
 * BILINGUAL LESSON CARD - GRADE 9 LESSON DISPLAY WITH LANGUAGE AWARENESS
 * 
 * Enhanced lesson card that adapts to user's language preference
 * Combines Grade9LessonCard with useBilingual hook for seamless experience
 */

import React from 'react';
import { Grade9LessonCard } from './Grade9LessonCard';
import { useBilingual } from '@/hooks/useBilingual';
import { EnrichedLesson } from '@/utils/lessonEngine';

interface BilingualLessonCardProps {
  lesson: EnrichedLesson;
  userProgress?: number;
  isCompleted?: boolean;
  onStart?: () => void;
  onContinue?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  showQualityIndicator?: boolean;
}

export function BilingualLessonCard({
  lesson,
  userProgress = 0,
  isCompleted = false,
  onStart,
  onContinue,
  className,
  variant = 'default',
  showQualityIndicator = true
}: BilingualLessonCardProps) {
  const { isHindi } = useBilingual();

  // Create a language-aware lesson object
  const adaptedLesson: EnrichedLesson = {
    ...lesson,
    // Use Hindi content when available and user prefers Hindi
    title: isHindi && lesson.hindiMeta.title ? lesson.hindiMeta.title : lesson.title,
    description: isHindi && lesson.hindiMeta.description ? lesson.hindiMeta.description : lesson.description,
  };

  return (
    <Grade9LessonCard
      lesson={adaptedLesson}
      userProgress={userProgress}
      isCompleted={isCompleted}
      onStart={onStart}
      onContinue={onContinue}
      className={className}
      variant={variant}
      showQualityIndicator={showQualityIndicator}
      showHindiSupport={true} // Always show bilingual support
    />
  );
}

// Specialized variant for Hindi-first users
export function HindiFirstLessonCard({
  lesson,
  userProgress = 0,
  isCompleted = false,
  onStart,
  onContinue,
  className
}: Omit<BilingualLessonCardProps, 'variant' | 'showQualityIndicator'>) {
  const { t, isHindi } = useBilingual();

  return (
    <div className={className}>
      {/* Hindi-first header */}
      {lesson.hindiMeta.culturalContext && (
        <div className="mb-3 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <p className="text-sm text-blue-700 hindi-text" lang="hi">
            💡 {lesson.hindiMeta.culturalContext}
          </p>
        </div>
      )}
      
      <BilingualLessonCard
        lesson={lesson}
        userProgress={userProgress}
        isCompleted={isCompleted}
        onStart={onStart}
        onContinue={onContinue}
        variant="featured"
        showQualityIndicator={true}
      />
      
      {/* Progress encouragement in user's language */}
      {userProgress > 0 && userProgress < 100 && (
        <div className="mt-3 p-2 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-green-700 font-medium">
            {isHindi 
              ? `बहुत बढ़िया! आपने ${userProgress}% पूरा कर लिया है।`
              : `Great progress! You're ${userProgress}% complete.`
            }
          </p>
        </div>
      )}
    </div>
  );
}