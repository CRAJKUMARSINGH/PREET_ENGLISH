import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  Target,
  Brain,
  Award,
  Volume2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PronunciationAnalysis {
  accuracy: number;
  phonemeScores: { [key: string]: number };
  improvements: string[];
  strengths: string[];
  nextSteps: string[];
}

interface AIPronunciationTrainerProps {
  className?: string;
}

// Advanced pronunciation challenges for Hindi speakers
const advancedChallenges = {
  'th_mastery': {
    title: 'TH Sound Mastery',
    description: 'Master the most challenging sound for Hindi speakers',
    words: [
      { word: 'think', ipa: '/θɪŋk/', hindi: 'सोचना', difficulty: 'medium' },
      { word: 'this', ipa: '/ðɪs/', hindi: 'यह', difficulty: 'medium' },
      { word: 'through', ipa: '/θruː/', hindi: 'के माध्यम से', difficulty: 'hard' },
      { word: 'although', ipa: '/ɔːlˈðoʊ/', hindi: 'हालांकि', difficulty: 'hard' },
      { word: 'breathe', ipa: '/briːð/', hindi: 'सांस लेना', difficulty: 'expert' }
    ]
  },
  'v_w_distinction': {
    title: 'V vs W Distinction',
    description: 'Perfect the V and W sounds that Hindi speakers often confuse',
    words: [
      { word: 'very', ipa: '/ˈveri/', hindi: 'बहुत', difficulty: 'easy' },
      { word: 'water', ipa: '/ˈwɔːtər/', hindi: 'पानी', difficulty: 'easy' },
      { word: 'vowel', ipa: '/ˈvaʊəl/', hindi: 'स्वर', difficulty: 'medium' },
      { word: 'world', ipa: '/wɜːrld/', hindi: 'दुनिया', difficulty: 'medium' },
      { word: 'erview', ipa: '/ˈoʊvərˌvjuː/', hindi: 'अवलोकन', difficulty: 'hard' }
    ]
  },
  'r_sound_perfection': {
    title: 'English R Sound Perfection',
    description: 'Master the English R that\'s completely different from Hindi र',
    words: [
      { word: 'red', ipa: '/red/', hindi: 'लाल', difficulty: 'easy' },
      { word: 'right', ipa: '/raɪt/', hindi: 'सही', difficulty: 'medium' },
      { word: 'around', ipa: '/əˈraʊnd/', hindi: 'चारों ओर', difficulty: 'medium' },
      { word: 'library', ipa: '/ˈlaɪbreri/', hindi: 'पुस्तकालय', difficulty: 'hard' },
      { word: 'particularly', ipa: '/pərˈtɪkjələrli/', hindi: 'विशेष रूप से', difficulty: 'expert' }
    ]
  }
};

export function AIPronunciationTrainer({ className }: AIPronunciationTrainerProps) {
  const [selectedChallenge, setSelectedChallenge] = useState('th_mastery');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PronunciationAnalysis | null>(null);
  const [overallProgress, setOverallProgress] = useState(65);
  const [sessionStats, setSessionStats] = useState({
    wordsAttempted: 0,
    averageAccuracy: 0,
    improvementRate: 12,
    streakCount: 3
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentChallenge = advancedChallenges[selectedChallenge as keyof typeof advancedChallenges];
  const currentWord = currentChallenge.words[currentWordIndex];

  // Simulate AI analysis (in production, this would call actual AI service)
  const analyzePronounciation = async (audioBlob: Blob): Promise<PronunciationAnalysis> => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic analysis based on word difficulty
    const baseAccuracy = currentWord.difficulty === 'easy' ? 85 : 
                        currentWord.difficulty === 'medium' ? 75 : 
                        currentWord.difficulty === 'hard' ? 65 : 55;
    
    const accuracy = baseAccuracy + Math.random() * 20 - 10; // Add some variation
    
    const analysis: PronunciationAnalysis = {
      accuracy: Math.max(0, Math.min(100, accuracy)),
      phonemeScores: {
        'th': currentWord.word.includes('th') ? accuracy - 5 : 90,
        'v': currentWord.word.includes('v') ? accuracy : 85,
        'w': currentWord.word.includes('w') ? accuracy + 5 : 88,
        'r': currentWord.word.includes('r') ? accuracy - 10 : 92
      },
      improvements: [
        'जीभ की स्थिति को और सटीक बनाएं',
        'हवा का प्रवाह नियंत्रित करें',
        'होंठों की आकृति पर ध्यान दें'
      ],
      strengths: [
        'स्वर की स्पष्टता अच्छी है',
        'शब्द की लय सही है'
      ],
      nextSteps: [
        'धीमी गति से 5 बार अभ्यास करें',
        'मुंह की आकृति को आईने में देखें',
        'नेटिव स्पीकर के साथ तुलना करें'
      ]
    };
    
    setIsAnalyzing(false);
    return analysis;
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

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const analysisResult = await analyzePronounciation(audioBlob);
        setAnalysis(analysisResult);
        
        // Update session stats
        setSessionStats(prev => ({
          ...prev,
          wordsAttempted: prev.wordsAttempted + 1,
          averageAccuracy: (prev.averageAccuracy + analysisResult.accuracy) / 2
        }));
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
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

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < currentChallenge.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setAnalysis(null);
    }
  };

  const resetChallenge = () => {
    setCurrentWordIndex(0);
    setAnalysis(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className={cn('ai-pronunciation-trainer space-y-6', className)}>
      {/* Header with Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            AI Pronunciation Trainer
            <Badge variant="secondary" className="ml-auto">
              Advanced Level
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="stat-item text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-2xl font-bold text-green-600">{sessionStats.wordsAttempted}</div>
              <div className="text-sm text-muted-foreground">Words Practiced</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-2xl font-bold text-purple-600">{sessionStats.averageAccuracy.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-2xl font-bold text-orange-600">{sessionStats.streakCount}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Pronunciation Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(advancedChallenges).map(([key, challenge]) => (
              <Button
                key={key}
                variant={selectedChallenge === key ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => {
                  setSelectedChallenge(key);
                  setCurrentWordIndex(0);
                  setAnalysis(null);
                }}
              >
                <div className="font-semibold mb-1">{challenge.title}</div>
                <div className="text-xs text-left opacity-80">{challenge.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Word Practice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Practice Word: {currentWord.word}</span>
            <Badge className={getDifficultyColor(currentWord.difficulty)}>
              {currentWord.difficulty}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Word Information */}
          <div className="word-info bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{currentWord.word}</div>
                <div className="text-sm text-muted-foreground">Target Word</div>
              </div>
              <div>
                <div className="text-lg font-mono mb-2">{currentWord.ipa}</div>
                <div className="text-sm text-muted-foreground">IPA Pronunciation</div>
              </div>
              <div>
                <div className="text-lg mb-2">{currentWord.hindi}</div>
                <div className="text-sm text-muted-foreground">Hindi Meaning</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button onClick={playTargetAudio} variant="outline">
                <Volume2 className="w-4 h-4 mr-2" />
                Listen to Target
              </Button>
            </div>
          </div>

          {/* Recording Section */}
          <div className="recording-section">
            <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              {isAnalyzing ? (
                <div className="analyzing-state">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-purple-500 animate-pulse" />
                  <div className="text-lg font-medium mb-2">AI विश्लेषण कर रहा है...</div>
                  <div className="text-sm text-muted-foreground">
                    आपके उच्चारण का विस्तृत विश्लेषण हो रहा है
                  </div>
                </div>
              ) : (
                <div className="recording-controls">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    className="mb-4"
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
                  
                  {isRecording && (
                    <div className="recording-indicator">
                      <div className="animate-pulse text-red-500 mb-2">🔴 Recording...</div>
                      <div className="text-sm text-muted-foreground">
                        "{currentWord.word}" को स्पष्ट रूप से बोलें
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* AI Analysis Results */}
          {analysis && (
            <div className="analysis-results">
              <Tabs defaultValue="score" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="score">Score</TabsTrigger>
                  <TabsTrigger value="phonemes">Phonemes</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="next">Next Steps</TabsTrigger>
                </TabsList>

                <TabsContent value="score" className="space-y-4">
                  <div className="score-display text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
                    <div className="text-4xl font-bold mb-2" style={{ color: analysis.accuracy > 80 ? '#22c55e' : analysis.accuracy > 60 ? '#f59e0b' : '#ef4444' }}>
                      {analysis.accuracy.toFixed(0)}%
                    </div>
                    <div className="text-lg mb-4">Pronunciation Accuracy</div>
                    <Progress value={analysis.accuracy} className="w-full max-w-xs mx-auto" />
                    
                    <div className="mt-4 text-sm">
                      {analysis.accuracy > 90 ? '🎉 Excellent! Perfect pronunciation!' :
                       analysis.accuracy > 80 ? '👍 Very Good! Minor improvements needed.' :
                       analysis.accuracy > 70 ? '📚 Good! Keep practicing for better results.' :
                       '💪 Keep trying! Practice makes perfect.'}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="phonemes" className="space-y-4">
                  <div className="phoneme-scores">
                    <h4 className="font-medium mb-3">Individual Sound Analysis:</h4>
                    <div className="grid gap-3">
                      {Object.entries(analysis.phonemeScores).map(([phoneme, score]) => (
                        <div key={phoneme} className="phoneme-item flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="phoneme-info">
                            <div className="font-medium">{phoneme.toUpperCase()} Sound</div>
                            <div className="text-sm text-muted-foreground">
                              {phoneme === 'th' && 'जीभ दांतों के बीच'}
                              {phoneme === 'v' && 'निचला होंठ ऊपरी दांतों से'}
                              {phoneme === 'w' && 'होंठों को गोल करें'}
                              {phoneme === 'r' && 'जीभ को तालू से न छुएं'}
                            </div>
                          </div>
                          <div className="score-info text-right">
                            <div className="text-lg font-bold" style={{ color: score > 80 ? '#22c55e' : score > 60 ? '#f59e0b' : '#ef4444' }}>
                              {score.toFixed(0)}%
                            </div>
                            <Progress value={score} className="w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                  <div className="feedback-sections grid md:grid-cols-2 gap-4">
                    <div className="improvements">
                      <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-3">
                        🎯 सुधार के क्षेत्र:
                      </h4>
                      <ul className="space-y-2">
                        {analysis.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="strengths">
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">
                        ✅ आपकी खूबियां:
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="next" className="space-y-4">
                  <div className="next-steps">
                    <h4 className="font-medium mb-3">🚀 अगले कदम:</h4>
                    <div className="steps-list space-y-3">
                      {analysis.nextSteps.map((step, index) => (
                        <div key={index} className="step-item flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div className="step-number bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="step-content text-sm">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="navigation-controls flex justify-between items-center pt-4 border-t">
            <div className="progress-info text-sm text-muted-foreground">
              Word {currentWordIndex + 1} of {currentChallenge.words.length}
            </div>
            
            <div className="controls flex gap-2">
              <Button onClick={resetChallenge} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              
              {currentWordIndex < currentChallenge.words.length - 1 && (
                <Button onClick={nextWord} size="sm">
                  Next Word
                  <Target className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              {currentWordIndex === currentChallenge.words.length - 1 && analysis && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Award className="w-4 h-4 mr-2" />
                  Complete Challenge
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}