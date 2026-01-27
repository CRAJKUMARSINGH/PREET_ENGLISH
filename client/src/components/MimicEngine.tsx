/**
 * The Mimic Engine - AI-Powered Shadowing with Real-Time Waveform Feedback
 * The "Brilliant Idea" feature that makes PREET_ENGLISH viral
 * Enhanced with professional WaveSurfer.js visualization
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Play, Pause, RotateCcw, Share2, Trophy, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioService } from '@/lib/audioService';
import { toast } from '@/hooks/use-toast';

// Dynamic import for WaveSurfer to avoid SSR issues
let WaveSurfer: any = null;
if (typeof window !== 'undefined') {
  import('wavesurfer.js').then((module) => {
    WaveSurfer = module.default;
  });
}

interface MimicEngineProps {
  targetPhrase: string;
  targetLanguage?: 'en-US' | 'hi-IN';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onScoreUpdate?: (score: number) => void;
}

interface WaveformData {
  frequencies: number[];
  timestamp: number;
}

export function MimicEngine({ 
  targetPhrase, 
  targetLanguage = 'en-US',
  difficulty = 'beginner',
  onScoreUpdate 
}: MimicEngineProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userWaveform, setUserWaveform] = useState<WaveformData[]>([]);
  const [targetWaveform, setTargetWaveform] = useState<WaveformData[]>([]);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const targetWaveformRef = useRef<HTMLDivElement>(null);
  const userWaveformRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const targetWaveSurferRef = useRef<any>(null);
  const userWaveSurferRef = useRef<any>(null);

  // Initialize WaveSurfer instances
  useEffect(() => {
    if (!WaveSurfer || !targetWaveformRef.current || !userWaveformRef.current) return;

    // Target waveform (reference)
    targetWaveSurferRef.current = WaveSurfer.create({
      container: targetWaveformRef.current,
      waveColor: '#10b981',
      progressColor: '#059669',
      height: 80,
      responsive: true,
      normalize: true,
      backend: 'WebAudio'
    });

    // User waveform (recording)
    userWaveSurferRef.current = WaveSurfer.create({
      container: userWaveformRef.current,
      waveColor: '#3b82f6',
      progressColor: '#2563eb',
      height: 80,
      responsive: true,
      normalize: true,
      backend: 'WebAudio'
    });

    return () => {
      if (targetWaveSurferRef.current) {
        targetWaveSurferRef.current.destroy();
      }
      if (userWaveSurferRef.current) {
        userWaveSurferRef.current.destroy();
      }
    };
  }, []);

  // Initialize audio context and analyzer
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        toast({
          title: "Audio Error",
          description: "Could not initialize audio. Please check your microphone permissions.",
          variant: "destructive"
        });
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Generate target waveform using speech synthesis
  const generateTargetWaveform = useCallback(async () => {
    if (!targetWaveSurferRef.current) return;

    try {
      // Create a temporary audio element for the target phrase
      const utterance = new SpeechSynthesisUtterance(targetPhrase);
      utterance.lang = targetLanguage;
      utterance.rate = 0.9;

      // For demo purposes, create a simulated waveform
      // In production, you'd capture the actual speech synthesis audio
      const simulatedWaveform = generateSimulatedWaveform(targetPhrase);
      targetWaveSurferRef.current.loadBlob(simulatedWaveform);
      
    } catch (error) {
      console.error('Failed to generate target waveform:', error);
    }
  }, [targetPhrase, targetLanguage]);

  // Generate simulated waveform blob for demo
  const generateSimulatedWaveform = (text: string): Blob => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const duration = Math.max(2, text.length * 0.1); // Minimum 2 seconds
    const frameCount = sampleRate * duration;
    const arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = arrayBuffer.getChannelData(0);

    // Generate speech-like waveform
    for (let i = 0; i < frameCount; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 0.5) * (1 - Math.exp(-t * 10));
      const frequency = 150 + Math.sin(t * 2) * 50; // Varying pitch
      const noise = (Math.random() - 0.5) * 0.1;
      channelData[i] = envelope * Math.sin(2 * Math.PI * frequency * t) + noise;
    }

    // Convert to WAV blob
    const wavBuffer = audioBufferToWav(arrayBuffer);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  };

  // Convert AudioBuffer to WAV format
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channelData = buffer.getChannelData(0);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return arrayBuffer;
  };

  // Analyze audio and create waveform
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const frequencies = Array.from(dataArray).map(value => value / 255 * 100);
    
    setUserWaveform(prev => [...prev, {
      frequencies,
      timestamp: Date.now()
    }]);

    // Continue analyzing while recording
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, [isRecording]);

  // Calculate similarity score using advanced algorithm
  const calculateSimilarity = useCallback((userWave: WaveformData[], targetWave: WaveformData[]) => {
    if (userWave.length === 0 || targetWave.length === 0) return 0;

    // Advanced similarity calculation
    const minLength = Math.min(userWave.length, targetWave.length);
    let totalSimilarity = 0;
    let rhythmScore = 0;
    let pitchScore = 0;

    for (let i = 0; i < minLength; i++) {
      const userFreqs = userWave[i].frequencies;
      const targetFreqs = targetWave[i].frequencies;
      
      // Frequency similarity (pitch)
      let freqSimilarity = 0;
      const minFreqLength = Math.min(userFreqs.length, targetFreqs.length);
      
      for (let j = 0; j < minFreqLength; j++) {
        const diff = Math.abs(userFreqs[j] - targetFreqs[j]);
        freqSimilarity += Math.max(0, 100 - diff);
      }
      
      pitchScore += freqSimilarity / minFreqLength;
    }

    // Rhythm similarity (timing patterns)
    const userPeaks = findPeaks(userWave);
    const targetPeaks = findPeaks(targetWave);
    rhythmScore = calculateRhythmSimilarity(userPeaks, targetPeaks);

    // Weighted final score
    const finalScore = (pitchScore / minLength) * 0.7 + rhythmScore * 0.3;
    return Math.round(Math.min(100, finalScore));
  }, []);

  // Find peaks in waveform for rhythm analysis
  const findPeaks = (waveform: WaveformData[]): number[] => {
    const peaks: number[] = [];
    for (let i = 1; i < waveform.length - 1; i++) {
      const current = waveform[i].frequencies.reduce((a, b) => a + b, 0);
      const prev = waveform[i - 1].frequencies.reduce((a, b) => a + b, 0);
      const next = waveform[i + 1].frequencies.reduce((a, b) => a + b, 0);
      
      if (current > prev && current > next && current > 50) {
        peaks.push(i);
      }
    }
    return peaks;
  };

  // Calculate rhythm similarity
  const calculateRhythmSimilarity = (userPeaks: number[], targetPeaks: number[]): number => {
    if (userPeaks.length === 0 || targetPeaks.length === 0) return 0;
    
    const userIntervals = userPeaks.slice(1).map((peak, i) => peak - userPeaks[i]);
    const targetIntervals = targetPeaks.slice(1).map((peak, i) => peak - targetPeaks[i]);
    
    if (userIntervals.length === 0 || targetIntervals.length === 0) return 50;
    
    const minLength = Math.min(userIntervals.length, targetIntervals.length);
    let similarity = 0;
    
    for (let i = 0; i < minLength; i++) {
      const diff = Math.abs(userIntervals[i] - targetIntervals[i]);
      similarity += Math.max(0, 100 - diff * 10);
    }
    
    return similarity / minLength;
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      if (audioContextRef.current && analyserRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        if (userWaveSurferRef.current) {
          userWaveSurferRef.current.loadBlob(blob);
        }
      };

      mediaRecorderRef.current.start(100); // Collect data every 100ms
      
      setIsRecording(true);
      setUserWaveform([]);
      analyzeAudio();
      
      toast({
        title: "🎤 Recording Started",
        description: "Speak the phrase clearly and naturally"
      });

    } catch (error) {
      console.error('Failed to start recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  // Stop recording and analyze
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Calculate similarity score
    const score = calculateSimilarity(userWaveform, targetWaveform);
    setSimilarityScore(score);
    setAttempts(prev => prev + 1);
    
    if (score > bestScore) {
      setBestScore(score);
    }

    // Generate enhanced feedback
    let feedbackText = '';
    let emoji = '';
    
    if (score >= 95) {
      feedbackText = 'Perfect! Native-level pronunciation!';
      emoji = '🏆';
    } else if (score >= 85) {
      feedbackText = 'Excellent! Very close to native pronunciation.';
      emoji = '🌟';
    } else if (score >= 75) {
      feedbackText = 'Great job! Good pronunciation with minor improvements needed.';
      emoji = '👍';
    } else if (score >= 60) {
      feedbackText = 'Good effort! Focus on matching the rhythm and stress patterns.';
      emoji = '👌';
    } else if (score >= 40) {
      feedbackText = 'Keep practicing! Pay attention to vowel sounds and word stress.';
      emoji = '💪';
    } else {
      feedbackText = 'Try again! Listen carefully and speak slowly at first.';
      emoji = '🎯';
    }
    
    setFeedback(`${emoji} ${feedbackText}`);
    onScoreUpdate?.(score);

    // Show achievement for high scores
    if (score >= 90) {
      toast({
        title: "🎉 Amazing Pronunciation!",
        description: `${score}% similarity - Share your achievement!`
      });
    }
  };

  // Play target audio with waveform
  const playTarget = async () => {
    setIsPlaying(true);
    
    // Generate and display target waveform
    await generateTargetWaveform();
    
    // Play audio
    audioService.speak(targetPhrase, targetLanguage);
    
    // Play waveform animation
    if (targetWaveSurferRef.current) {
      targetWaveSurferRef.current.play();
    }
    
    setTimeout(() => {
      setIsPlaying(false);
    }, Math.max(2000, targetPhrase.length * 100));
  };

  // Reset attempt
  const resetAttempt = () => {
    setUserWaveform([]);
    setSimilarityScore(null);
    setFeedback('');
    
    if (userWaveSurferRef.current) {
      userWaveSurferRef.current.empty();
    }
  };

  // Share score (viral feature)
  const shareScore = () => {
    if (similarityScore === null) return;
    
    const shareText = `🎯 I scored ${similarityScore}% on English pronunciation in PREET_ENGLISH! 
    
Phrase: "${targetPhrase}"
Level: ${difficulty}

Can you beat my accent score? Try it now! 
#PreetEnglish #PronunciationChallenge #EnglishLearning`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My PREET_ENGLISH Pronunciation Score',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "📋 Copied to Clipboard!",
        description: "Share your score on social media to challenge friends!"
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Trophy className="h-7 w-7 text-yellow-500" />
          The Mimic Engine
          <Badge variant="secondary" className="ml-auto">
            AI-Powered
          </Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Match the native speaker's pronunciation with real-time waveform feedback
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8 p-8">
        {/* Target Phrase */}
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-primary">{targetPhrase}</h3>
          <div className="flex justify-center gap-4">
            <Button
              onClick={playTarget}
              disabled={isPlaying || isRecording}
              variant="outline"
              size="lg"
              className="gap-2"
              aria-label={`Listen to target pronunciation of: ${targetPhrase}`}
            >
              {isPlaying ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Play className="h-5 w-5" />}
              {isPlaying ? 'Playing...' : 'Listen to Target'}
            </Button>
            <Badge variant="outline" className="px-4 py-2" role="status" aria-label={`Difficulty level: ${difficulty}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Professional Waveform Visualization */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="font-medium">Target Pronunciation</span>
            </div>
            <div 
              ref={targetWaveformRef}
              className="border rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[80px] flex items-center justify-center"
            >
              {!targetWaveform.length && (
                <p className="text-muted-foreground">Click "Listen to Target" to see waveform</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="font-medium">Your Pronunciation</span>
            </div>
            <div 
              ref={userWaveformRef}
              className="border rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[80px] flex items-center justify-center"
            >
              {!isRecording && userWaveform.length === 0 && (
                <p className="text-muted-foreground">Start recording to see your waveform</p>
              )}
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            disabled={isPlaying}
            className="gap-2 px-8"
            aria-label={isRecording ? "Stop recording pronunciation" : "Start recording pronunciation"}
            aria-describedby="recording-instructions"
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          
          <Button
            onClick={resetAttempt}
            variant="outline"
            size="lg"
            disabled={isRecording}
            className="gap-2"
            aria-label="Reset pronunciation attempt"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Score Display */}
        <AnimatePresence>
          {similarityScore !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-semibold">Pronunciation Score:</span>
                  <Badge 
                    variant={similarityScore >= 75 ? "default" : "secondary"}
                    className="text-2xl px-4 py-2 font-bold"
                  >
                    {similarityScore}%
                  </Badge>
                </div>
                
                <Progress 
                  value={similarityScore} 
                  className="w-full max-w-md mx-auto h-3"
                />
                
                <p className="text-lg font-medium">{feedback}</p>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{attempts}</div>
                  <div className="text-muted-foreground">Attempts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{bestScore}%</div>
                  <div className="text-muted-foreground">Best Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {attempts > 0 ? Math.round((similarityScore + bestScore) / 2) : 0}%
                  </div>
                  <div className="text-muted-foreground">Average</div>
                </div>
              </div>

              {/* Share Button */}
              {similarityScore >= 60 && (
                <Button
                  onClick={shareScore}
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-white dark:bg-gray-800"
                >
                  <Share2 className="h-5 w-5" />
                  Share My Achievement
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div 
          id="recording-instructions"
          className="text-sm text-muted-foreground text-center space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
          role="region"
          aria-label="Instructions for pronunciation practice"
        >
          <h4 className="font-semibold text-foreground">How to get the best score:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            <p>• Listen to the target pronunciation first</p>
            <p>• Speak clearly and at a natural pace</p>
            <p>• Match the rhythm and stress patterns</p>
            <p>• Practice the difficult sounds multiple times</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}