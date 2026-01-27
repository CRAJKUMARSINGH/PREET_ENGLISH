import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ProgressRing from '../ui/ProgressRing';
import ModernBadge from '../ui/ModernBadge';

interface SpeakingExercise {
  id: string;
  text: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'pronunciation' | 'fluency' | 'conversation';
  targetWords?: string[];
  tips?: string[];
}

interface SpeakingPracticeEnhancedProps {
  exercises: SpeakingExercise[];
  onComplete: (result: { accuracy: number; fluency: number; timeSpent: number }) => void;
}

const SpeakingPracticeEnhanced: React.FC<SpeakingPracticeEnhancedProps> = ({
  exercises,
  onComplete,
}) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [fluency, setFluency] = useState(0);
  const [startTime] = useState(Date.now());
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number>();
  
  const exercise = exercises[currentExercise];
  
  useEffect(() => {
    // Simulate waveform animation during recording
    if (isRecording) {
      const animate = () => {
        setWaveformData(prev => [
          ...prev.slice(-50),
          Math.random() * 100
        ]);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);
  
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
        // Simulate speech recognition analysis
        analyzeRecording(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setWaveformData([]);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const analyzeRecording = (audioBlob: Blob) => {
    // Simulate speech analysis
    setTimeout(() => {
      const mockAccuracy = 75 + Math.random() * 20; // 75-95%
      const mockFluency = 70 + Math.random() * 25; // 70-95%
      
      setAccuracy(mockAccuracy);
      setFluency(mockFluency);
      setRecordedText("Simulated transcription: " + exercise.text.substring(0, 50) + "...");
    }, 1500);
  };
  
  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(exercise.text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };
  
  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      resetExercise();
    } else {
      const timeSpent = (Date.now() - startTime) / 1000;
      onComplete({ accuracy, fluency, timeSpent });
    }
  };
  
  const resetExercise = () => {
    setRecordedText('');
    setAccuracy(0);
    setFluency(0);
    setWaveformData([]);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'primary';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pronunciation': return '🗣️';
      case 'fluency': return '💬';
      case 'conversation': return '🎭';
      default: return '🎤';
    }
  };
  
  return (
    <ModernCard variant="glass" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Speaking Practice Enhanced
          </h3>
          <div className="flex items-center gap-2">
            <ModernBadge variant={getDifficultyColor(exercise.difficulty) as 'primary' | 'secondary' | 'success' | 'warning' | 'error'}>
              {exercise.difficulty}
            </ModernBadge>
            <ModernBadge variant="secondary">
              {getCategoryIcon(exercise.category)} {exercise.category}
            </ModernBadge>
          </div>
        </div>
        
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {currentExercise + 1} / {exercises.length}
        </div>
      </div>
      
      {/* Target Text */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
            Practice Text:
          </h4>
          <ModernButton
            variant="outline"
            size="sm"
            onClick={playTargetAudio}
            disabled={isPlaying}
            icon={isPlaying ? '⏸️' : '🔊'}
          >
            {isPlaying ? 'Playing...' : 'Listen'}
          </ModernButton>
        </div>
        
        <div className="p-4 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
          <p className="text-lg leading-relaxed text-neutral-900 dark:text-neutral-100">
            {exercise.text}
          </p>
        </div>
        
        {exercise.targetWords && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Focus on these words:
            </h5>
            <div className="flex flex-wrap gap-2">
              {exercise.targetWords.map((word, index) => (
                <ModernBadge key={index} variant="primary" size="sm">
                  {word}
                </ModernBadge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Recording Interface */}
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <ModernButton
            variant={isRecording ? 'error' : 'primary'}
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              'w-32 h-32 rounded-full text-2xl',
              isRecording && 'animate-pulse'
            )}
            icon={isRecording ? '⏹️' : '🎤'}
          >
            {isRecording ? 'Stop' : 'Record'}
          </ModernButton>
        </div>
        
        {/* Waveform Visualization */}
        {(isRecording || waveformData.length > 0) && (
          <div className="h-20 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex items-end justify-center gap-1">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 bg-primary-500 rounded-full transition-all duration-100',
                  isRecording ? 'animate-pulse' : ''
                )}
                style={{
                  height: `${Math.max(4, (waveformData[i] || 0) * 0.6)}px`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Analysis Results */}
      {recordedText && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <ProgressRing
                progress={accuracy}
                size="lg"
                color="success"
                showPercentage
                glow
              />
              <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Pronunciation Accuracy
              </p>
            </div>
            
            <div className="text-center">
              <ProgressRing
                progress={fluency}
                size="lg"
                color="primary"
                showPercentage
                glow
              />
              <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Fluency Score
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Transcription:
            </h5>
            <p className="text-neutral-900 dark:text-neutral-100">
              {recordedText}
            </p>
          </div>
          
          {exercise.tips && (
            <div className="p-4 bg-warning-50 dark:bg-warning-950 rounded-lg border border-warning-200 dark:border-warning-800">
              <h5 className="text-sm font-medium text-warning-700 dark:text-warning-300 mb-2">
                💡 Tips for improvement:
              </h5>
              <ul className="space-y-1 text-sm text-warning-700 dark:text-warning-300">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <ModernButton
          variant="outline"
          onClick={resetExercise}
          disabled={isRecording}
        >
          Try Again
        </ModernButton>
        
        <ModernButton
          variant="primary"
          onClick={nextExercise}
          disabled={!recordedText || isRecording}
        >
          {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Complete'}
        </ModernButton>
      </div>
    </ModernCard>
  );
};

export default SpeakingPracticeEnhanced;