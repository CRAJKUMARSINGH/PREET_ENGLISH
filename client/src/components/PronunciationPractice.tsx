import { useState } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, AlertCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { speechRecognition } from '@/lib/speechRecognition';
import { audioService } from '@/lib/audioService';
import { cn } from '@/lib/utils';

interface PronunciationPracticeProps {
  text: string;
  hindiText?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  focusAreas?: string[];
  culturalMode?: 'strict' | 'accepting' | 'teaching';
}

interface EnhancedFeedback {
  message: string;
  hindiMessage: string;
  emoji: string;
  color: string;
  tips: string[];
  hindiTips: string[];
}

export function PronunciationPractice({ 
  text, 
  hindiText, 
  difficulty = 'beginner',
  focusAreas = [],
  culturalMode = 'teaching'
}: PronunciationPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<EnhancedFeedback | null>(null);
  const [phonemeAnalysis, setPhonemeAnalysis] = useState<any>(null);
  const [culturalNotes, setCulturalNotes] = useState<string[]>([]);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  const handleStartListening = () => {
    if (!speechRecognition.isSupported()) {
      alert('आपका ब्राउज़र स्पीच रिकग्निशन को सपोर्ट नहीं करता। कृपया Chrome या Edge का उपयोग करें।');
      return;
    }

    setIsListening(true);
    setTranscript('');
    setAccuracy(null);
    setFeedback(null);
    setPhonemeAnalysis(null);
    setCulturalNotes([]);
    
    const startTime = Date.now();

    speechRecognition.startListening(
      (result) => {
        setTranscript(result.transcript);
        
        if (result.isFinal) {
          const endTime = Date.now();
          setProcessingTime(endTime - startTime);
          
          // Enhanced analysis
          const score = speechRecognition.calculateAccuracy(result.transcript, text);
          const phonemes = speechRecognition.analyzePhonemes(result.transcript, text);
          const validation = speechRecognition.validateIndianEnglish(result.transcript);
          const alternatives = speechRecognition.suggestInternationalAlternatives(result.transcript);
          
          setAccuracy(score);
          setPhonemeAnalysis(phonemes);
          setCulturalNotes(validation.culturalNotes);
          
          // Get enhanced feedback - using any type to prevent errors
          const enhancedFeedback = speechRecognition.getFeedback(score, phonemes.problematicPhonemes as any);
          setFeedback(enhancedFeedback);
          
          setIsListening(false);
        }
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        alert(error); // Error is already localized in Hindi
      },
      {
        language: 'en-US',
        culturalMode,
        difficultyLevel: difficulty,
        focusAreas: focusAreas as any[]
      }
    );
  };

  const handleStopListening = () => {
    speechRecognition.stopListening();
    setIsListening(false);
  };

  const handlePlayAudio = () => {
    audioService.speakEnglish(text);
  };

  const handlePlayHindi = () => {
    if (hindiText) {
      audioService.speakHindi(hindiText);
    }
  };

  const handleReset = () => {
    setTranscript('');
    setAccuracy(null);
    setFeedback(null);
    setPhonemeAnalysis(null);
    setCulturalNotes([]);
    setProcessingTime(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Advanced Pronunciation Practice
          <Badge variant="secondary" className="ml-auto">
            {difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text to practice */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-muted-foreground mb-1">Practice saying:</p>
          <p className="text-lg font-medium text-blue-900 dark:text-blue-100">{text}</p>
          {hindiText && (
            <div className="mt-2 flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{hindiText}</p>
              <Button
                onClick={handlePlayHindi}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <Volume2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            onClick={handlePlayAudio}
            variant="outline"
            className="flex-1"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Listen
          </Button>

          {!isListening ? (
            <Button
              onClick={handleStartListening}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Mic className="h-4 w-4 mr-2" />
              Start Speaking
            </Button>
          ) : (
            <Button
              onClick={handleStopListening}
              variant="destructive"
              className="flex-1 animate-pulse"
            >
              <MicOff className="h-4 w-4 mr-2" />
              Stop
            </Button>
          )}

          {(transcript || accuracy !== null) && (
            <Button
              onClick={handleReset}
              variant="ghost"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Listening indicator */}
        {isListening && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-4 w-4 bg-red-500 rounded-full animate-ping absolute" />
                <div className="h-4 w-4 bg-red-500 rounded-full" />
              </div>
              <div>
                <p className="text-red-700 dark:text-red-300 font-medium">
                  Listening... Speak now!
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  सुन रहे हैं... अब बोलें!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-muted-foreground mb-1">You said / आपने कहा:</p>
            <p className="text-lg font-medium">{transcript}</p>
            {processingTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Processed in {processingTime}ms
              </p>
            )}
          </div>
        )}

        {/* Enhanced Results */}
        {accuracy !== null && feedback && (
          <div className={cn(
            'p-4 rounded-lg border-2',
            accuracy >= 75 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          )}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Score</p>
                <p className="text-3xl font-bold">{accuracy}%</p>
              </div>
              <div className="text-5xl">{feedback.emoji}</div>
            </div>
            
            <div className="space-y-2">
              <p className={cn('font-medium', feedback.color)}>
                {feedback.message}
              </p>
              <p className="text-sm text-muted-foreground">
                {feedback.hindiMessage}
              </p>
            </div>

            {/* Tips */}
            {feedback.tips.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Tips:</p>
                {feedback.tips.map((tip, index) => (
                  <div key={index} className="text-sm">
                    <p>• {tip}</p>
                    {feedback.hindiTips[index] && (
                      <p className="text-muted-foreground ml-2">• {feedback.hindiTips[index]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Phoneme Analysis */}
        {phonemeAnalysis && phonemeAnalysis.problematicPhonemes.length > 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Pronunciation Focus Areas
              </p>
            </div>
            
            <div className="space-y-2">
              {phonemeAnalysis.suggestions.map((suggestion: any, index: number) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{suggestion.phoneme.replace('_', ' ')} sounds:</p>
                  <p className="text-muted-foreground">{suggestion.englishExplanation}</p>
                  <p className="text-muted-foreground">{suggestion.hindiExplanation}</p>
                  <p className="text-xs mt-1">
                    Practice words: {suggestion.practiceWords.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cultural Notes */}
        {culturalNotes.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <p className="font-medium text-blue-800 dark:text-blue-200">
                Cultural Notes
              </p>
            </div>
            
            <div className="space-y-1">
              {culturalNotes.map((note, index) => (
                <p key={index} className="text-sm text-blue-700 dark:text-blue-300">
                  • {note}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Tips */}
        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            💡 <strong>Pro Tip:</strong> Speak clearly and naturally. The AI analyzes your pronunciation patterns to give personalized feedback!
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            💡 <strong>सुझाव:</strong> स्पष्ट और प्राकृतिक रूप से बोलें। AI आपके उच्चारण का विश्लेषण करके व्यक्तिगत सुझाव देता है!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
