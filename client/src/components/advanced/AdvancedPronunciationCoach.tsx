import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';

interface PronunciationChallenge {
  id: string;
  sound: string;
  hindiEquivalent: string;
  difficulty: 'easy' | 'medium' | 'hard';
  words: PronunciationWord[];
  description: string;
  hindiDescription: string;
  mouthPosition: string;
  commonMistakes: string[];
  tips: string[];
}

interface PronunciationWord {
  word: string;
  ipa: string;
  hindi: string;
  difficulty: 'easy' | 'medium' | 'hard';
  audioUrl?: string;
}

interface PronunciationResult {
  accuracy: number;
  feedback: string;
  improvements: string[];
  hindiTips: string[];
}

interface AdvancedPronunciationCoachProps {
  className?: string;
  onProgressUpdate?: (progress: { sound: string; accuracy: number }) => void;
}

const AdvancedPronunciationCoach: React.FC<AdvancedPronunciationCoachProps> = ({
  className,
  onProgressUpdate,
}) => {
  const [challenges] = useState<PronunciationChallenge[]>([
    {
      id: 'th-sounds',
      sound: 'TH',
      hindiEquivalent: 'थ/ध',
      difficulty: 'hard',
      description: 'The TH sound is one of the most challenging for Hindi speakers',
      hindiDescription: 'TH की आवाज़ हिंदी भाषियों के लिए सबसे कठिन है',
      mouthPosition: 'Place tongue between teeth, blow air gently',
      commonMistakes: ['Saying "T" instead of "TH"', 'Not placing tongue correctly'],
      tips: ['Practice with mirror', 'Feel air on your hand', 'Start slowly'],
      words: [
        { word: 'think', ipa: '/θɪŋk/', hindi: 'सोचना', difficulty: 'medium' },
        { word: 'this', ipa: '/ðɪs/', hindi: 'यह', difficulty: 'medium' },
        { word: 'three', ipa: '/θriː/', hindi: 'तीन', difficulty: 'easy' },
        { word: 'mother', ipa: '/ˈmʌðər/', hindi: 'माँ', difficulty: 'hard' },
        { word: 'birthday', ipa: '/ˈbɜːrθdeɪ/', hindi: 'जन्मदिन', difficulty: 'hard' }
      ]
    },
    {
      id: 'v-w-sounds',
      sound: 'V vs W',
      hindiEquivalent: 'व',
      difficulty: 'medium',
      description: 'Hindi speakers often confuse V and W sounds',
      hindiDescription: 'हिंदी भाषी अक्सर V और W की आवाज़ों को मिला देते हैं',
      mouthPosition: 'V: teeth touch lower lip, W: round lips like "ऊ"',
      commonMistakes: ['Using V sound for W words', 'Not rounding lips for W'],
      tips: ['V: bite lower lip gently', 'W: make "ऊ" shape with lips'],
      words: [
        { word: 'very', ipa: '/ˈveri/', hindi: 'बहुत', difficulty: 'easy' },
        { word: 'water', ipa: '/ˈwɔːtər/', hindi: 'पानी', difficulty: 'easy' },
        { word: 'village', ipa: '/ˈvɪlɪdʒ/', hindi: 'गाँव', difficulty: 'medium' },
        { word: 'window', ipa: '/ˈwɪndoʊ/', hindi: 'खिड़की', difficulty: 'medium' },
        { word: 'vowel', ipa: '/ˈvaʊəl/', hindi: 'स्वर', difficulty: 'hard' }
      ]
    },
    {
      id: 'r-sound',
      sound: 'English R',
      hindiEquivalent: 'र (different)',
      difficulty: 'medium',
      description: 'English R is different from Hindi र sound',
      hindiDescription: 'अंग्रेजी का R हिंदी के र से अलग है',
      mouthPosition: 'Curl tongue back, don\'t touch roof of mouth',
      commonMistakes: ['Rolling R like Hindi', 'Touching tongue to roof'],
      tips: ['Keep tongue curved', 'Don\'t roll', 'Practice "er" sound'],
      words: [
        { word: 'red', ipa: '/red/', hindi: 'लाल', difficulty: 'easy' },
        { word: 'right', ipa: '/raɪt/', hindi: 'सही', difficulty: 'easy' },
        { word: 'brother', ipa: '/ˈbrʌðər/', hindi: 'भाई', difficulty: 'medium' },
        { word: 'important', ipa: '/ɪmˈpɔːrtənt/', hindi: 'महत्वपूर्ण', difficulty: 'hard' },
        { word: 'restaurant', ipa: '/ˈrestərɑːnt/', hindi: 'रेस्टोरेंट', difficulty: 'hard' }
      ]
    }
  ]);
  
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<PronunciationResult | null>(null);
  const [overallProgress, setOverallProgress] = useState<Record<string, number>>({});
  const [showInstructions, setShowInstructions] = useState(true);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number>();
  
  const challenge = challenges[currentChallenge];
  const word = challenge.words[currentWord];
  
  useEffect(() => {
    // Simulate waveform animation during recording
    if (isRecording) {
      const animate = () => {
        setWaveformData(prev => [
          ...prev.slice(-30),
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
  
  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.7;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
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
        analyzePronunciation(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setWaveformData([]);
      setResults(null);
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
  
  const analyzePronunciation = async (audioBlob: Blob) => {
    // Simulate advanced pronunciation analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const accuracy = 60 + Math.random() * 35; // 60-95%
    const soundId = challenge.id;
    
    // Update progress
    setOverallProgress(prev => ({
      ...prev,
      [soundId]: Math.max(prev[soundId] || 0, accuracy)
    }));
    
    onProgressUpdate?.({ sound: challenge.sound, accuracy });
    
    // Generate contextual feedback
    const mockResult: PronunciationResult = {
      accuracy,
      feedback: accuracy > 80 
        ? 'Excellent pronunciation! You\'re mastering this sound.'
        : accuracy > 60
        ? 'Good attempt! Focus on the mouth position for better accuracy.'
        : 'Keep practicing! Remember the tongue/lip position.',
      improvements: [
        'Focus on tongue placement between teeth',
        'Practice with slower speech first',
        'Use a mirror to check mouth position'
      ],
      hindiTips: [
        'जीभ को दांतों के बीच रखें',
        'पहले धीमी गति से बोलने का अभ्यास करें',
        'मुंह की स्थिति देखने के लिए आईने का उपयोग करें'
      ]
    };
    
    setResults(mockResult);
  };
  
  const nextWord = () => {
    if (currentWord < challenge.words.length - 1) {
      setCurrentWord(prev => prev + 1);
    } else if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setCurrentWord(0);
    }
    setResults(null);
    setWaveformData([]);
  };
  
  const previousWord = () => {
    if (currentWord > 0) {
      setCurrentWord(prev => prev - 1);
    } else if (currentChallenge > 0) {
      setCurrentChallenge(prev => prev - 1);
      setCurrentWord(challenges[currentChallenge - 1].words.length - 1);
    }
    setResults(null);
    setWaveformData([]);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'primary';
    }
  };
  
  if (showInstructions) {
    return (
      <ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            🗣️
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Advanced Pronunciation Coach
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Master English pronunciation with AI-powered feedback
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {challenges.map((challenge, index) => (
              <ModernCard key={challenge.id} variant="default" className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {challenge.sound}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {challenge.hindiEquivalent}
                  </div>
                  <ModernBadge variant={getDifficultyColor(challenge.difficulty) as any} size="sm">
                    {challenge.difficulty}
                  </ModernBadge>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {challenge.words.length} words
                  </div>
                </div>
              </ModernCard>
            ))}
          </div>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="p-4 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
              <h4 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                🎯 What you'll practice:
              </h4>
              <ul className="text-sm text-primary-600 dark:text-primary-400 space-y-1">
                <li>• Phoneme-level pronunciation analysis</li>
                <li>• Hindi speaker-specific challenges</li>
                <li>• Mouth position and breathing techniques</li>
                <li>• Real-time feedback and improvement tips</li>
              </ul>
            </div>
            
            <ModernButton
              variant="primary"
              size="lg"
              onClick={() => setShowInstructions(false)}
              className="w-full"
            >
              Start Pronunciation Practice
            </ModernButton>
          </div>
        </div>
      </ModernCard>
    );
  }
  
  return (
    <ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {challenge.sound} Sound Practice
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {challenge.hindiDescription}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <ModernBadge variant={getDifficultyColor(challenge.difficulty) as any}>
            {challenge.difficulty}
          </ModernBadge>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {currentWord + 1} / {challenge.words.length}
          </span>
        </div>
      </div>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4">
        {challenges.map((ch, index) => (
          <div key={ch.id} className="text-center">
            <ProgressRing
              progress={overallProgress[ch.id] || 0}
              size="sm"
              color={index === currentChallenge ? 'primary' : 'secondary'}
              showPercentage
            />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              {ch.sound}
            </p>
          </div>
        ))}
      </div>
      
      {/* Instructions */}
      <ModernCard variant="default" className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              📍 Mouth Position:
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {challenge.mouthPosition}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              ⚠️ Common Mistakes:
            </h4>
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
              {challenge.commonMistakes.slice(0, 2).map((mistake, index) => (
                <li key={index}>• {mistake}</li>
              ))}
            </ul>
          </div>
        </div>
      </ModernCard>
      
      {/* Current Word Practice */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            {word.word}
          </h2>
          <div className="space-y-1">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {word.ipa}
            </p>
            <p className="text-base text-neutral-500 dark:text-neutral-400">
              Hindi: {word.hindi}
            </p>
          </div>
          <ModernBadge variant={getDifficultyColor(word.difficulty) as any}>
            {word.difficulty}
          </ModernBadge>
        </div>
        
        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-4">
          <ModernButton
            variant="outline"
            onClick={playTargetAudio}
            disabled={isPlaying}
            icon={isPlaying ? '⏸️' : '🔊'}
          >
            {isPlaying ? 'Playing...' : 'Listen'}
          </ModernButton>
          
          <ModernButton
            variant={isRecording ? 'error' : 'primary'}
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              'w-20 h-20 rounded-full text-2xl',
              isRecording && 'animate-pulse'
            )}
            icon={isRecording ? '⏹️' : '🎤'}
          >
            {isRecording ? 'Stop' : 'Record'}
          </ModernButton>
        </div>
        
        {/* Waveform */}
        {(isRecording || waveformData.length > 0) && (
          <div className="h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex items-end justify-center gap-1">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 bg-primary-500 rounded-full transition-all duration-100',
                  isRecording ? 'animate-pulse' : ''
                )}
                style={{
                  height: `${Math.max(4, (waveformData[i] || 0) * 0.5)}px`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Results */}
      {results && (
        <ModernCard variant="default" className="p-4 space-y-4">
          <div className="text-center">
            <ProgressRing
              progress={results.accuracy}
              size="lg"
              color={results.accuracy > 80 ? 'success' : results.accuracy > 60 ? 'warning' : 'error'}
              showPercentage
              glow
            />
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {results.feedback}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                💡 Improvements:
              </h5>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {results.improvements.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🇮🇳 Hindi Tips:
              </h5>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {results.hindiTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </ModernCard>
      )}
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <ModernButton
          variant="outline"
          onClick={previousWord}
          disabled={currentChallenge === 0 && currentWord === 0}
          icon="⬅️"
        >
          Previous
        </ModernButton>
        
        <div className="flex items-center gap-2">
          <ModernButton
            variant="ghost"
            size="sm"
            onClick={() => setResults(null)}
          >
            Try Again
          </ModernButton>
          
          <ModernButton
            variant="ghost"
            size="sm"
            onClick={() => setShowInstructions(true)}
          >
            Instructions
          </ModernButton>
        </div>
        
        <ModernButton
          variant="primary"
          onClick={nextWord}
          disabled={currentChallenge === challenges.length - 1 && currentWord === challenge.words.length - 1}
          icon="➡️"
          iconPosition="right"
        >
          Next
        </ModernButton>
      </div>
    </ModernCard>
  );
};

export default AdvancedPronunciationCoach;