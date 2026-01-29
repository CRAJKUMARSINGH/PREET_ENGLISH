/**
 * GRADE 9 LESSON CARD COMPONENT
 * 
 * Professional-grade lesson display with:
 * - Bilingual support with proper typography
 * - Quality indicators and progress tracking
 * - Cultural context integration
 * - Accessibility optimizations
 * - Mobile-responsive design
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Volume2, 
  Star, 
  Clock, 
  Users, 
  Award,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HindiScaffold, QualityBadge, BilingualText } from './HindiScaffold';
import { EnrichedLesson } from '@/utils/lessonEngine';

interface Grade9LessonCardProps {
  lesson: EnrichedLesson;
  userProgress?: number;
  isCompleted?: boolean;
  onStart?: () => void;
  onContinue?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  showQualityIndicator?: boolean;
  showHindiSupport?: boolean;
}

export function Grade9LessonCard({
  lesson,
  userProgress = 0,
  isCompleted = false,
  onStart,
  onContinue,
  className,
  variant = 'default',
  showQualityIndicator = true,
  showHindiSupport = true
}: Grade9LessonCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAudioPlay = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(lesson.title);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (progress: number, completed: boolean) => {
    if (completed) return 'text-green-600';
    if (progress > 0) return 'text-blue-600';
    return 'text-gray-500';
  };

  if (variant === 'compact') {
    return (
      <Card className={cn('hover:shadow-md transition-all duration-200', className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                <h3 className="font-semibold truncate">{lesson.title}</h3>
                {showQualityIndicator && (
                  <QualityBadge score={lesson.metadata.qualityScore} />
                )}
              </div>
              {showHindiSupport && lesson.hindiMeta.title && (
                <p className="hindi-text-sm text-muted-foreground truncate" lang="hi">
                  {lesson.hindiMeta.title}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getDifficultyColor(lesson.difficulty)} variant="outline">
                  <BilingualText textKey={lesson.difficulty.toLowerCase()} />
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {lesson.metadata.estimatedTime}
                </span>
              </div>
            </div>
            <Button
              onClick={userProgress > 0 ? onContinue : onStart}
              size="sm"
              className="ml-2 flex-shrink-0"
            >
              {userProgress > 0 ? (
                <BilingualText textKey="continue" />
              ) : (
                <BilingualText textKey="start" />
              )}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          {userProgress > 0 && (
            <Progress value={userProgress} className="mt-2 h-1" />
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={cn(
        'lesson-header-container hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary',
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    <BilingualText textKey={lesson.difficulty.toLowerCase()} showBoth />
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {lesson.category}
                  </Badge>
                </div>
              </div>
              
              <HindiScaffold
                english={lesson.title}
                hindi={lesson.hindiMeta.title}
                variant="header"
                showBoth={showHindiSupport}
              />
              
              <HindiScaffold
                english={lesson.description}
                hindi={lesson.hindiMeta.description}
                variant="instruction"
                showBoth={showHindiSupport}
                className="mt-3"
              />
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {showQualityIndicator && (
                <QualityBadge score={lesson.metadata.qualityScore} />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAudioPlay}
                disabled={isPlaying}
                className="h-8 w-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Lesson Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{lesson.metadata.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>{lesson.metadata.qualityScore}% Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{lesson.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>Lesson {lesson.order}</span>
            </div>
          </div>

          {/* Progress Bar */}
          {userProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  <BilingualText textKey="progress" />
                </span>
                <span className={getStatusColor(userProgress, isCompleted)}>
                  {isCompleted ? (
                    <BilingualText textKey="completed" />
                  ) : (
                    `${userProgress}%`
                  )}
                </span>
              </div>
              <Progress value={userProgress} className="h-2" />
            </div>
          )}

          {/* Cultural Context */}
          {lesson.hindiMeta.culturalContext && (
            <div className="hindi-scaffold">
              <div className="english-content">
                <span className="text-sm font-medium text-primary">
                  <BilingualText textKey="cultural" />
                </span>
              </div>
              <div className="hindi-explanation" lang="hi">
                {lesson.hindiMeta.culturalContext}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={userProgress > 0 ? onContinue : onStart}
              className="flex-1"
              size="lg"
            >
              {userProgress > 0 ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  <BilingualText textKey="continue" showBoth />
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  <BilingualText textKey="start" showBoth />
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              <BilingualText textKey="details" />
            </Button>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="border-t pt-4 space-y-3">
              <div>
                <h4 className="font-medium mb-2">
                  <BilingualText textKey="relatedLessons" />
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.navigation.relatedLessons.slice(0, 3).map((related) => (
                    <Badge key={related.id} variant="secondary" className="text-xs">
                      {related.title}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {lesson.metadata.hindiReadiness && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Award className="h-4 w-4" />
                  <span className="hindi-text" lang="hi">
                    पूर्ण हिंदी समर्थन उपलब्ध
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn(
      'hover:shadow-lg transition-all duration-200 group',
      isCompleted && 'ring-2 ring-green-200',
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'p-2 rounded-lg transition-colors',
              isCompleted ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
            )}>
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {lesson.title}
              </CardTitle>
              {showHindiSupport && lesson.hindiMeta.title && (
                <p className="hindi-text text-muted-foreground mt-1" lang="hi">
                  {lesson.hindiMeta.title}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showQualityIndicator && (
              <QualityBadge score={lesson.metadata.qualityScore} />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAudioPlay}
              disabled={isPlaying}
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">
          {lesson.description}
        </p>
        
        {showHindiSupport && lesson.hindiMeta.description && (
          <p className="hindi-text-sm text-blue-600 line-clamp-2" lang="hi">
            {lesson.hindiMeta.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(lesson.difficulty)}>
              <BilingualText textKey={lesson.difficulty.toLowerCase()} />
            </Badge>
            <Badge variant="outline">{lesson.category}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lesson.metadata.estimatedTime}
            </span>
          </div>
        </div>

        {userProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                <BilingualText textKey="progress" />
              </span>
              <span className={getStatusColor(userProgress, isCompleted)}>
                {isCompleted ? (
                  <BilingualText textKey="completed" />
                ) : (
                  `${userProgress}%`
                )}
              </span>
            </div>
            <Progress value={userProgress} className="h-1.5" />
          </div>
        )}

        <Button
          onClick={userProgress > 0 ? onContinue : onStart}
          className="w-full"
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? (
            <>
              <Award className="h-4 w-4 mr-2" />
              <BilingualText textKey="review" />
            </>
          ) : userProgress > 0 ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              <BilingualText textKey="continue" />
            </>
          ) : (
            <>
              <BookOpen className="h-4 w-4 mr-2" />
              <BilingualText textKey="start" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}