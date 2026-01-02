import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HindiLearningCardProps {
  englishSentence: string;
  hindiMeaning: string;
  pronunciation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  commonMistakes?: string[];
  tips?: string[];
  examples?: string[];
  className?: string;
}

export function HindiLearningCard({
  englishSentence,
  hindiMeaning,
  pronunciation,
  difficulty,
  category,
  commonMistakes = [],
  tips = [],
  examples = [],
  className
}: HindiLearningCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(englishSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slower for learning
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <Card className={cn('hindi-learning-card', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              {englishSentence}
            </CardTitle>
            <div className="text-blue-600 dark:text-blue-400 font-medium">
              Hindi में: {hindiMeaning}
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge className={difficultyColors[difficulty]}>
              {difficulty === 'easy' ? 'आसान' : difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
            </Badge>
            <Badge variant="outline">{category}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Pronunciation Section */}
        <div className="pronunciation-section mb-4 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              उच्चारण: {pronunciation}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={isPlaying ? stopAudio : playAudio}
              className="flex items-center gap-1"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isPlaying ? 'रोकें' : 'सुनें'}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'कम दिखाएं' : 'और जानें'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Practice again functionality
              playAudio();
            }}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            दोबारा अभ्यास
          </Button>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="details-section space-y-3">
            {/* Common Mistakes */}
            {commonMistakes.length > 0 && (
              <div className="mistakes-section">
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
                  ❌ आम गलतियां:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400">
                  {commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {tips.length > 0 && (
              <div className="tips-section">
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
                  💡 सुझाव:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-600 dark:text-green-400">
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {examples.length > 0 && (
              <div className="examples-section">
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                  📝 और उदाहरण:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  {examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Hindi Grammar Explanation Card
interface GrammarExplanationProps {
  rule: string;
  hindiExplanation: string;
  englishExamples: string[];
  hindiComparison: string;
  className?: string;
}

export function GrammarExplanationCard({
  rule,
  hindiExplanation,
  englishExamples,
  hindiComparison,
  className
}: GrammarExplanationProps) {
  return (
    <Card className={cn('grammar-explanation-card', className)}>
      <CardHeader>
        <CardTitle className="text-lg text-orange-600 dark:text-orange-400">
          📚 Grammar Rule: {rule}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="hindi-explanation">
          <h4 className="font-medium mb-2">Hindi में समझाइए:</h4>
          <p className="text-muted-foreground">{hindiExplanation}</p>
        </div>

        <div className="examples">
          <h4 className="font-medium mb-2">उदाहरण:</h4>
          <ul className="list-disc list-inside space-y-1">
            {englishExamples.map((example, index) => (
              <li key={index} className="text-sm">{example}</li>
            ))}
          </ul>
        </div>

        <div className="hindi-comparison bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
          <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
            Hindi से तुलना:
          </h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">{hindiComparison}</p>
        </div>
      </CardContent>
    </Card>
  );
}