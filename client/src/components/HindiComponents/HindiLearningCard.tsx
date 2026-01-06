import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, BookOpen, Lightbulb, Star } from 'lucide-react';

interface HindiLearningCardProps {
  englishSentence: string;
  hindiMeaning: string;
  pronunciation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tips?: string[];
  examples?: { english: string; hindi: string }[];
}

export function HindiLearningCard({
  englishSentence,
  hindiMeaning,
  pronunciation,
  difficulty,
  category,
  tips = [],
  examples = []
}: HindiLearningCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(englishSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <Card className="hindi-learning-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <Badge variant="outline">{category}</Badge>
          </div>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Content */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="text-lg font-semibold text-primary mb-1">
                {englishSentence}
              </p>
              <p className="text-muted-foreground">
                <strong>हिंदी:</strong> {hindiMeaning}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <strong>उच्चारण:</strong> {pronunciation}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={playAudio}
              disabled={isPlaying}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse text-primary' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        {tips.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              Tips:
            </h4>
            <ul className="space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples Section */}
        {examples.length > 0 && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm p-0 h-auto"
            >
              {showDetails ? 'Hide' : 'Show'} Examples
            </Button>
            
            {showDetails && (
              <div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                {examples.map((example, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium">{example.english}</p>
                    <p className="text-sm text-muted-foreground">{example.hindi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface GrammarExplanationCardProps {
  rule: string;
  hindiExplanation: string;
  englishExamples: string[];
  hindiComparison: string;
  commonMistakes?: string[];
}

export function GrammarExplanationCard({
  rule,
  hindiExplanation,
  englishExamples,
  hindiComparison,
  commonMistakes = []
}: GrammarExplanationCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <Card className="grammar-explanation-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {rule}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Hindi Explanation */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>हिंदी में समझें:</strong> {hindiExplanation}
          </p>
        </div>

        {/* Hindi Comparison */}
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-purple-700 dark:text-purple-300">
            <strong>हिंदी से तुलना:</strong> {hindiComparison}
          </p>
        </div>

        {/* Examples Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowExamples(!showExamples)}
          className="w-full"
        >
          {showExamples ? 'Hide' : 'Show'} Examples
        </Button>

        {/* Examples */}
        {showExamples && (
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 dark:text-green-400">
                सही उदाहरण:
              </h4>
              {englishExamples.map((example, index) => (
                <div key={index} className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-green-700 dark:text-green-300">{example}</p>
                </div>
              ))}
            </div>

            {commonMistakes.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 dark:text-red-400">
                  आम गलतियां:
                </h4>
                {commonMistakes.map((mistake, index) => (
                  <div key={index} className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="text-red-700 dark:text-red-300">{mistake}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}