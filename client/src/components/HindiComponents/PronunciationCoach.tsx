import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PronunciationCoachProps {
  targetWord: string;
  hindiComparison: string;
  soundTips: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

// Common pronunciation challenges for Hindi speakers
const hindiSpeakerChallenges = {
  'th': {
    sound: 'th (as in think/this)',
    hindiTip: 'जीभ को दांतों के बीच रखें, हिंदी के "थ" या "ध" जैसा नहीं',
    practice: ['think', 'this', 'thank', 'that', 'three']
  },
  'v_w': {
    sound: 'v vs w',
    hindiTip: 'V के लिए निचले होंठ को ऊपरी दांतों से छुएं, W के लिए होंठों को गोल करें',
    practice: ['very', 'water', 'voice', 'work', 'victory']
  },
  'r': {
    sound: 'English R',
    hindiTip: 'जीभ को तालू से न छुएं, हिंदी के "र" से अलग है',
    practice: ['red', 'right', 'run', 'river', 'really']
  },
  'silent': {
    sound: 'Silent Letters',
    hindiTip: 'कुछ अक्षर लिखे जाते हैं पर बोले नहीं जाते',
    practice: ['knife', 'lamb', 'listen', 'castle', 'island']
  }
};

export function PronunciationCoach({
  targetWord,
  hindiComparison,
  soundTips,
  difficulty,
  className
}: PronunciationCoachProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(targetWord);
      utterance.lang = 'en-US';
      utterance.rate = 0.7; // Slower for learning
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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        // Simulate pronunciation analysis (in real app, you'd use speech recognition API)
        analyzePronunciation();
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('माइक्रोफोन एक्सेस नहीं मिल सका। कृपया अनुमति दें।');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAttempts(prev => prev + 1);
    }
  };

  const analyzePronunciation = () => {
    // Simulate pronunciation analysis
    // In a real app, you'd use speech recognition and comparison algorithms
    const randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
    setScore(randomScore);
    
    if (randomScore >= 90) {
      setFeedback('🎉 बहुत बढ़िया! आपका उच्चारण बिल्कुल सही है।');
    } else if (randomScore >= 80) {
      setFeedback('👍 अच्छा! थोड़ा और अभ्यास करें।');
    } else if (randomScore >= 70) {
      setFeedback('📚 ठीक है, लेकिन सुधार की जरूरत है। टिप्स देखें।');
    } else {
      setFeedback('💪 कोई बात नहीं! अभ्यास करते रहें। पहले धीरे-धीरे बोलें।');
    }
  };

  const resetPractice = () => {
    setRecordedAudio(null);
    setFeedback(null);
    setScore(null);
    setAttempts(0);
  };

  return (
    <Card className={cn('pronunciation-coach', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            🎤 Pronunciation Coach
          </CardTitle>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty === 'easy' ? 'आसान' : difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Target Word */}
        <div className="target-word text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">{targetWord}</h3>
          <p className="text-blue-600 dark:text-blue-400 mb-3">
            Hindi में: {hindiComparison}
          </p>
          <Button onClick={playTargetAudio} variant="outline" size="sm">
            <Volume2 className="w-4 h-4 mr-2" />
            सुनें
          </Button>
        </div>

        {/* Sound Tips */}
        <div className="sound-tips">
          <h4 className="font-medium mb-2">🎵 उच्चारण टिप्स:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {soundTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Recording Section */}
        <div className="recording-section text-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="mb-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className="mb-2"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-5 h-5 mr-2" />
                  रिकॉर्डिंग रोकें
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  रिकॉर्डिंग शुरू करें
                </>
              )}
            </Button>
          </div>
          
          {isRecording && (
            <div className="recording-indicator">
              <div className="animate-pulse text-red-500 mb-2">🔴 रिकॉर्डिंग...</div>
              <p className="text-sm text-muted-foreground">
                "{targetWord}" बोलें
              </p>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="feedback-section">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">📊 परिणाम:</h4>
              {score && (
                <div className="flex items-center gap-2">
                  <Progress value={score} className="w-20" />
                  <span className="text-sm font-medium">{score}%</span>
                  {score >= 90 && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              )}
            </div>
            <p className="text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {feedback}
            </p>
          </div>
        )}

        {/* Recorded Audio Playback */}
        {recordedAudio && (
          <div className="recorded-audio">
            <h4 className="font-medium mb-2">🎧 आपकी रिकॉर्डिंग:</h4>
            <audio controls className="w-full">
              <source src={recordedAudio} type="audio/wav" />
              आपका ब्राउज़र ऑडियो प्लेबैक सपोर्ट नहीं करता।
            </audio>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <Button onClick={resetPractice} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            फिर से शुरू करें
          </Button>
          {attempts > 0 && (
            <Badge variant="secondary">
              कोशिशें: {attempts}
            </Badge>
          )}
        </div>

        {/* Progress Tracking */}
        {attempts > 0 && (
          <div className="progress-tracking text-center text-sm text-muted-foreground">
            💪 अभ्यास करते रहें! हर कोशिश आपको बेहतर बनाती है।
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Quick Pronunciation Tips Component
export function QuickPronunciationTips() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>('th');

  return (
    <Card className="quick-pronunciation-tips">
      <CardHeader>
        <CardTitle>⚡ Quick Pronunciation Tips for Hindi Speakers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(hindiSpeakerChallenges).map(([key, challenge]) => (
            <Button
              key={key}
              variant={selectedChallenge === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedChallenge(key)}
            >
              {challenge.sound}
            </Button>
          ))}
        </div>

        {selectedChallenge && (
          <div className="challenge-details space-y-3">
            <div className="tip bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">
                💡 टिप:
              </h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                {hindiSpeakerChallenges[selectedChallenge as keyof typeof hindiSpeakerChallenges].hindiTip}
              </p>
            </div>

            <div className="practice-words">
              <h4 className="font-medium mb-2">🎯 अभ्यास के शब्द:</h4>
              <div className="flex flex-wrap gap-2">
                {hindiSpeakerChallenges[selectedChallenge as keyof typeof hindiSpeakerChallenges].practice.map((word, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {word}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}