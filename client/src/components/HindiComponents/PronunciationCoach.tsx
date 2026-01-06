import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  Volume2, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Target
} from 'lucide-react';

interface PronunciationCoachProps {
  targetWord: string;
  hindiComparison: string;
  soundTips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export function PronunciationCoach({
  targetWord,
  hindiComparison,
  soundTips,
  difficulty
}: PronunciationCoachProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(targetWord);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        // Simulate pronunciation analysis
        analyzePronunciation();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('माइक्रोफोन एक्सेस नहीं मिला। कृपया अनुमति दें।');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzePronunciation = () => {
    // Simulate pronunciation analysis with random score
    const randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
    setScore(randomScore);
    setAttempts(prev => prev + 1);

    if (randomScore >= 90) {
      setFeedback('बहुत बढ़िया! आपका उच्चारण एकदम सही है! 🎉');
    } else if (randomScore >= 80) {
      setFeedback('अच्छा! थोड़ा और अभ्यास करें। 👍');
    } else if (randomScore >= 70) {
      setFeedback('ठीक है। टिप्स को फिर से पढ़ें और कोशिश करें। 💪');
    } else {
      setFeedback('अभ्यास जारी रखें। धीरे-धीरे बोलें और टिप्स फॉलो करें। 🎯');
    }
  };

  const resetPractice = () => {
    setScore(null);
    setAttempts(0);
    setFeedback('');
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <Card className="pronunciation-coach-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Pronunciation Coach
          </CardTitle>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Target Word */}
        <div className="text-center space-y-3">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">{targetWord}</h3>
            <p className="text-muted-foreground">
              <strong>हिंदी तुलना:</strong> {hindiComparison}
            </p>
          </div>
          
          <Button
            onClick={playTargetAudio}
            disabled={isPlaying}
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <Volume2 className="h-4 w-4 animate-pulse" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Listen to Target
          </Button>
        </div>

        {/* Sound Tips */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            उच्चारण टिप्स:
          </h4>
          <div className="space-y-2">
            {soundTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-3">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Practice
                </>
              )}
            </Button>
            
            {attempts > 0 && (
              <Button
                onClick={resetPractice}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>

          {isRecording && (
            <div className="flex items-center justify-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording... Speak now!</span>
            </div>
          )}
        </div>

        {/* Results */}
        {score !== null && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {score >= 80 ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                )}
                <span className="text-lg font-bold">Score: {score}%</span>
              </div>
              <Progress value={score} className="w-full max-w-xs mx-auto" />
            </div>
            
            {feedback && (
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-sm font-medium">{feedback}</p>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground">
              Attempts: {attempts}
            </div>
          </div>
        )}

        {/* Practice Stats */}
        {attempts > 0 && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{attempts}</div>
              <div className="text-xs text-muted-foreground">Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{score || 0}%</div>
              <div className="text-xs text-muted-foreground">Best Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {score && score >= 80 ? '🎯' : '📈'}
              </div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function QuickPronunciationTips() {
  const tips = [
    {
      title: 'TH Sounds',
      hindi: 'थ/ध',
      tip: 'जीभ को दांतों के बीच रखें',
      example: 'think, this'
    },
    {
      title: 'V vs W',
      hindi: 'व',
      tip: 'V के लिए दांत होंठ छुएं, W के लिए होंठ गोल करें',
      example: 'very, water'
    },
    {
      title: 'English R',
      hindi: 'र',
      tip: 'जीभ को मोड़ें, तालू न छुएं',
      example: 'red, right'
    },
    {
      title: 'Silent Letters',
      hindi: 'मूक अक्षर',
      tip: 'कुछ अक्षर नहीं बोले जाते',
      example: 'knife, lamb'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Quick Pronunciation Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-3 bg-secondary/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary">{tip.title}</h4>
                <Badge variant="outline">{tip.hindi}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                <strong>Examples:</strong> {tip.example}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}