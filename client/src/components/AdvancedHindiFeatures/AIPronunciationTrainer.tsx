import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  Volume2,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";

interface AIPronunciationTrainerProps {
  className?: string;
}

// Pronunciation challenges data
const pronunciationChallenges = {
  th_mastery: {
    title: 'TH Sound Mastery',
    titleHindi: 'TH ध्वनि में महारत',
    description: 'Master the challenging TH sounds',
    descriptionHindi: 'चुनौतीपूर्ण TH ध्वनियों में महारत हासिल करें',
    words: [
      { word: 'think', ipa: '/θɪŋk/', hindi: 'सोचना', difficulty: 'beginner' },
      { word: 'this', ipa: '/ðɪs/', hindi: 'यह', difficulty: 'beginner' },
      { word: 'through', ipa: '/θruː/', hindi: 'के माध्यम से', difficulty: 'intermediate' },
      { word: 'although', ipa: '/ɔːlˈðoʊ/', hindi: 'हालांकि', difficulty: 'advanced' }
    ]
  },
  r_sounds: {
    title: 'R Sound Practice',
    titleHindi: 'R ध्वनि अभ्यास',
    description: 'Perfect your R pronunciation',
    descriptionHindi: 'अपने R उच्चारण को सही करें',
    words: [
      { word: 'red', ipa: '/red/', hindi: 'लाल', difficulty: 'beginner' },
      { word: 'very', ipa: '/ˈveri/', hindi: 'बहुत', difficulty: 'intermediate' },
      { word: 'library', ipa: '/ˈlaɪbreri/', hindi: 'पुस्तकालय', difficulty: 'advanced' }
    ]
  }
};

export function AIPronunciationTrainer({ className }: AIPronunciationTrainerProps) {
  const [selectedChallenge, setSelectedChallenge] = useState('th_mastery');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const currentChallenge = pronunciationChallenges[selectedChallenge as keyof typeof pronunciationChallenges];
  const currentWord = currentChallenge.words[currentWordIndex];

  const handleStartRecording = () => {
    setIsRecording(true);
    setPronunciationScore(null);
    setFeedback('');
    
    // Mock recording - in real app, this would use Web Speech API
    setTimeout(() => {
      setIsRecording(false);
      setIsAnalyzing(true);
      
      // Mock analysis
      setTimeout(() => {
        const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100
        setPronunciationScore(mockScore);
        setFeedback(mockScore >= 85 ? 'Excellent pronunciation!' : 'Good effort! Try focusing on the tongue position.');
        setIsAnalyzing(false);
      }, 2000);
    }, 3000);
  };

  const handleNextWord = () => {
    if (currentWordIndex < currentChallenge.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setPronunciationScore(null);
    setFeedback('');
  };

  const handlePlayAudio = () => {
    // Mock audio playback - in real app, this would use Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.7;
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${className}`}>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-emerald-500" />
            AI Pronunciation Trainer
            <Badge variant="secondary" className="ml-2">AI-Powered</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Get real-time feedback on your English pronunciation
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={selectedChallenge} onValueChange={setSelectedChallenge}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="th_mastery">TH Sounds</TabsTrigger>
              <TabsTrigger value="r_sounds">R Sounds</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedChallenge} className="space-y-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{currentChallenge.title}</h3>
                  <p className="text-muted-foreground">{currentChallenge.titleHindi}</p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-emerald-600">
                      {currentWord.word}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {currentWord.ipa}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Hindi: {currentWord.hindi}
                    </div>
                    <Badge variant={
                      currentWord.difficulty === 'beginner' ? 'default' :
                      currentWord.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                    }>
                      {currentWord.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handlePlayAudio}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-5 w-5" />
                      Listen
                    </Button>
                    
                    <Button
                      size="lg"
                      onClick={handleStartRecording}
                      disabled={isRecording || isAnalyzing}
                      className={`flex items-center gap-2 ${
                        isRecording ? 'bg-red-500 hover:bg-red-600' : ''
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="h-5 w-5" />
                          Recording...
                        </>
                      ) : isAnalyzing ? (
                        <>
                          <Brain className="h-5 w-5 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {pronunciationScore !== null && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                          {pronunciationScore >= 85 ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : (
                            <XCircle className="h-8 w-8 text-yellow-500" />
                          )}
                          <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600">
                              {pronunciationScore}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Pronunciation Score
                            </div>
                          </div>
                        </div>
                        
                        <Progress value={pronunciationScore} className="h-3" />
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{feedback}</p>
                        </div>
                        
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            onClick={handleStartRecording}
                            disabled={isRecording || isAnalyzing}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Try Again
                          </Button>
                          <Button onClick={handleNextWord}>
                            Next Word
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Word {currentWordIndex + 1} of {currentChallenge.words.length}
                  </span>
                  <span>
                    Challenge: {currentChallenge.title}
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}