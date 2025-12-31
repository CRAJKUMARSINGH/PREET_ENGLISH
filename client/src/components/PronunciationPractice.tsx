import { useState } from 'react';
import { Mic, MicOff, Volume2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { speechRecognition } from '@/lib/speechRecognition';
import { audioService } from '@/lib/audioService';
import { cn } from '@/lib/utils';

interface PronunciationPracticeProps {
  text: string;
  hindiText?: string;
}

export function PronunciationPractice({ text, hindiText }: PronunciationPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<any>(null);

  const handleStartListening = () => {
    if (!speechRecognition.isSupported()) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    setIsListening(true);
    setTranscript('');
    setAccuracy(null);
    setFeedback(null);

    speechRecognition.startListening(
      (result) => {
        setTranscript(result.transcript);
        
        if (result.isFinal) {
          const score = speechRecognition.calculateAccuracy(result.transcript, text);
          setAccuracy(score);
          setFeedback(speechRecognition.getFeedback(score));
          setIsListening(false);
        }
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        alert('Error: ' + error);
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

  const handleReset = () => {
    setTranscript('');
    setAccuracy(null);
    setFeedback(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Pronunciation Practice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text to practice */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Practice saying:</p>
          <p className="text-lg font-medium">{text}</p>
          {hindiText && (
            <p className="text-sm text-muted-foreground mt-2">{hindiText}</p>
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
              className="flex-1"
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
              <p className="text-red-700 dark:text-red-300 font-medium">
                Listening... Speak now!
              </p>
            </div>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">You said:</p>
            <p className="text-lg font-medium">{transcript}</p>
          </div>
        )}

        {/* Results */}
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
            <p className={cn('font-medium', feedback.color)}>
              {feedback.message}
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            💡 <strong>Tip:</strong> Speak clearly and at a normal pace. Make sure your microphone is working!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
