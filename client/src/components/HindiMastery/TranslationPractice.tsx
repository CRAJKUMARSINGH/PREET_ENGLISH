import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Languages, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Lightbulb,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslationExercise {
  id: string;
  hindiSentence: string;
  correctEnglish: string;
  alternativeAnswers: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hints: string[];
  commonMistakes: string[];
}

const translationExercises: TranslationExercise[] = [
  {
    id: '1',
    hindiSentence: 'मुझे यह काम आज पूरा करना है।',
    correctEnglish: 'I have to complete this work today.',
    alternativeAnswers: ['I need to finish this work today.', 'I must complete this task today.'],
    difficulty: 'easy',
    category: 'Daily Life',
    hints: ['Use "have to" for obligation', 'Work = काम'],
    commonMistakes: ['I have to complete this work today only (avoid "only" at end)']
  },
  {
    id: '2',
    hindiSentence: 'क्या आप मुझे बता सकते हैं कि मीटिंग कब है?',
    correctEnglish: 'Could you tell me when the meeting is?',
    alternativeAnswers: ['Can you tell me when the meeting is?', 'Would you mind telling me when the meeting is?'],
    difficulty: 'medium',
    category: 'Business',
    hints: ['Use "Could you" for polite requests', 'Indirect question structure'],
    commonMistakes: ['Can you tell me when is the meeting? (wrong word order)']
  },
  {
    id: '3',
    hindiSentence: 'अगर मैं आपकी जगह होता, तो मैं यह नौकरी स्वीकार कर लेता।',
    correctEnglish: 'If I were you, I would accept this job.',
    alternativeAnswers: ['If I were in your place, I would take this job.'],
    difficulty: 'hard',
    category: 'Conditional',
    hints: ['Second conditional: If + past, would + verb', 'Use "were" not "was" with I'],
    commonMistakes: ['If I was you (incorrect - use "were")']
  },
  {
    id: '4',
    hindiSentence: 'मैं पिछले पांच साल से इस कंपनी में काम कर रहा हूं।',
    correctEnglish: 'I have been working in this company for five years.',
    alternativeAnswers: ['I have been working at this company for five years.'],
    difficulty: 'medium',
    category: 'Tenses',
    hints: ['Present Perfect Continuous for ongoing actions', 'Use "for" with duration'],
    commonMistakes: ['I am working since five years (wrong tense and preposition)']
  },
  {
    id: '5',
    hindiSentence: 'कृपया मुझे अपना रिज्यूमे भेज दीजिए।',
    correctEnglish: 'Please send me your resume.',
    alternativeAnswers: ['Kindly send me your resume.', 'Please share your resume with me.'],
    difficulty: 'easy',
    category: 'Business',
    hints: ['Simple imperative with "please"', 'Resume = रिज्यूमे'],
    commonMistakes: ['Please send your resume to me (awkward phrasing)']
  }
];

export function TranslationPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const currentExercise = translationExercises[currentIndex];

  const checkAnswer = () => {
    const normalizedUser = userAnswer.toLowerCase().trim().replace(/[.,!?]/g, '');
    const normalizedCorrect = currentExercise.correctEnglish.toLowerCase().trim().replace(/[.,!?]/g, '');
    const normalizedAlternatives = currentExercise.alternativeAnswers.map(a => 
      a.toLowerCase().trim().replace(/[.,!?]/g, '')
    );

    const correct = normalizedUser === normalizedCorrect || 
                   normalizedAlternatives.includes(normalizedUser);
    
    setIsCorrect(correct);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    setStreak(correct ? streak + 1 : 0);
  };

  const nextExercise = () => {
    if (currentIndex < translationExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setUserAnswer('');
    setShowResult(false);
    setShowHints(false);
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setShowHints(false);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="translation-practice space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-blue-500" />
            Hindi to English Translation Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score.correct}/{score.total}</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{streak}</div>
              <div className="text-sm text-muted-foreground">Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{currentIndex + 1}/{translationExercises.length}</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
          <Progress value={(currentIndex / translationExercises.length) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Translation Exercise */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Translate to English</CardTitle>
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                {currentExercise.difficulty === 'easy' ? 'आसान' : 
                 currentExercise.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
              </Badge>
              <Badge variant="outline">{currentExercise.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hindi Sentence */}
          <div className="hindi-sentence bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Hindi Sentence:</div>
            <div className="text-xl font-medium">{currentExercise.hindiSentence}</div>
          </div>

          {/* User Input */}
          <div className="user-input">
            <div className="text-sm text-muted-foreground mb-2">Your English Translation:</div>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your English translation here..."
              className="min-h-[100px]"
              disabled={showResult}
            />
          </div>

          {/* Hints */}
          {showHints && !showResult && (
            <div className="hints bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-700 dark:text-yellow-300">Hints:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-yellow-600 dark:text-yellow-400">
                {currentExercise.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className={cn(
              'result p-4 rounded-lg',
              isCorrect ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
            )}>
              <div className="flex items-center gap-2 mb-3">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700 dark:text-green-300">
                      🎉 Correct! बहुत बढ़िया!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-700 dark:text-red-300">
                      Not quite right. कोई बात नहीं, फिर से कोशिश करें!
                    </span>
                  </>
                )}
              </div>

              <div className="correct-answer mb-3">
                <div className="text-sm font-medium mb-1">Correct Answer:</div>
                <div className="text-green-700 dark:text-green-300">{currentExercise.correctEnglish}</div>
              </div>

              {currentExercise.alternativeAnswers.length > 0 && (
                <div className="alternatives mb-3">
                  <div className="text-sm font-medium mb-1">Alternative Answers:</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {currentExercise.alternativeAnswers.map((alt, index) => (
                      <li key={index}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="common-mistakes">
                <div className="text-sm font-medium mb-1 text-red-600">Common Mistakes to Avoid:</div>
                <ul className="list-disc list-inside text-sm text-red-500">
                  {currentExercise.commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <>
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                  Check Answer
                </Button>
                <Button variant="outline" onClick={() => setShowHints(!showHints)}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={nextExercise}>
                  Next Exercise
                </Button>
                <Button variant="outline" onClick={resetPractice}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}