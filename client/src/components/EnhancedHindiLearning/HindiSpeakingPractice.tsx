import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw,
  Heart,
  Star,
  CheckCircle,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpeakingExercise {
  id: number;
  title: string;
  titleHindi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  hindiPrompt: string;
  englishTarget: string;
  pronunciation: string;
  tips: string[];
  tipsHindi: string[];
}

export function HindiSpeakingPractice() {
  const [currentExercise, setCurrentExercise] = useState<SpeakingExercise>({
    id: 1,
    title: "Self Introduction",
    titleHindi: "अपना परिचय",
    difficulty: "Beginner",
    category: "Personal",
    hindiPrompt: "अपना नाम, उम्र, और शहर बताएं। आप क्या काम करते हैं?",
    englishTarget: "My name is [Name]. I am [age] years old. I live in [city]. I work as a [profession].",
    pronunciation: "माई नेम इज़ [नेम]. आई एम [एज] इयर्स ओल्ड. आई लिव इन [सिटी]. आई वर्क एज़ अ [प्रोफेशन].",
    tips: [
      "Speak slowly and clearly",
      "Don't worry about perfect grammar",
      "Focus on being understood"
    ],
    tipsHindi: [
      "धीरे और स्पष्ट रूप से बोलें",
      "सही व्याकरण की चिंता न करें", 
      "समझे जाने पर ध्यान दें"
    ]
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<'think' | 'listen' | 'practice' | 'record' | 'feedback'>('think');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const exercises: SpeakingExercise[] = [
    currentExercise,
    {
      id: 2,
      title: "Daily Routine",
      titleHindi: "दैनिक दिनचर्या",
      difficulty: "Beginner",
      category: "Daily Life",
      hindiPrompt: "आप सुबह कितने बजे उठते हैं? दिन भर क्या करते हैं?",
      englishTarget: "I wake up at [time]. I have breakfast, go to work, and return home in the evening.",
      pronunciation: "आई वेक अप एट [टाइम]. आई हैव ब्रेकफास्ट, गो टू वर्क, एंड रिटर्न होम इन द इवनिंग.",
      tips: [
        "Use simple present tense",
        "Mention specific times",
        "Include daily activities"
      ],
      tipsHindi: [
        "सामान्य वर्तमान काल का उपयोग करें",
        "विशिष्ट समय का उल्लेख करें",
        "दैनिक गतिविधियों को शामिल करें"
      ]
    },
    {
      id: 3,
      title: "Favorite Food",
      titleHindi: "पसंदीदा खाना",
      difficulty: "Intermediate",
      category: "Food & Culture",
      hindiPrompt: "आपका पसंदीदा खाना क्या है? यह क्यों पसंद है? कैसे बनता है?",
      englishTarget: "My favorite food is [dish]. I like it because it's delicious and healthy. It's made with [ingredients].",
      pronunciation: "माई फेवरिट फूड इज़ [डिश]. आई लाइक इट बिकॉज़ इट्स डिलिशस एंड हेल्दी. इट्स मेड विद [इंग्रीडिएंट्स].",
      tips: [
        "Describe taste and texture",
        "Explain why you like it",
        "Mention ingredients if possible"
      ],
      tipsHindi: [
        "स्वाद और बनावट का वर्णन करें",
        "समझाएं कि आपको यह क्यों पसंद है",
        "यदि संभव हो तो सामग्री का उल्लेख करें"
      ]
    }
  ];

  const steps = [
    {
      id: 'think',
      title: 'Think in Hindi',
      titleHindi: 'हिंदी में सोचें',
      icon: '🧠',
      description: 'Organize your thoughts in Hindi first',
      descriptionHindi: 'पहले अपने विचारों को हिंदी में व्यवस्थित करें'
    },
    {
      id: 'listen',
      title: 'Listen & Learn',
      titleHindi: 'सुनें और सीखें',
      icon: '👂',
      description: 'Listen to the pronunciation guide',
      descriptionHindi: 'उच्चारण गाइड सुनें'
    },
    {
      id: 'practice',
      title: 'Practice Speaking',
      titleHindi: 'बोलने का अभ्यास',
      icon: '🗣️',
      description: 'Practice the sentences out loud',
      descriptionHindi: 'वाक्यों का जोर से अभ्यास करें'
    },
    {
      id: 'record',
      title: 'Record Yourself',
      titleHindi: 'खुद को रिकॉर्ड करें',
      icon: '🎤',
      description: 'Record your speaking attempt',
      descriptionHindi: 'अपने बोलने के प्रयास को रिकॉर्ड करें'
    },
    {
      id: 'feedback',
      title: 'Get Feedback',
      titleHindi: 'फीडबैक प्राप्त करें',
      icon: '⭐',
      description: 'Review and improve',
      descriptionHindi: 'समीक्षा करें और सुधार करें'
    }
  ];

  useEffect(() => {
    if (isRecording && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (!isRecording && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
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

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // Here you would typically send the audio to a speech recognition service
        console.log('Recording completed:', audioBlob);
        
        // Simulate feedback
        setTimeout(() => {
          setCurrentStep('feedback');
          setCompletedSteps(prev => [...prev, 'record']);
          setConfidence(Math.floor(Math.random() * 30) + 70); // 70-100%
        }, 1000);
      };
    }
  };

  const completeStep = (stepId: string) => {
    setCompletedSteps(prev => [...prev, stepId]);
    const currentIndex = steps.findIndex(s => s.id === stepId);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as any);
    }
  };

  const resetExercise = () => {
    setCurrentStep('think');
    setCompletedSteps([]);
    setRecordingTime(0);
    setConfidence(0);
    setIsRecording(false);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Hindi Speaking Practice
        </h1>
        <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-1">
          हिंदी बोलचाल अभ्यास
        </p>
        <p className="text-muted-foreground">
          Think in Hindi, Speak in English • हिंदी में सोचें, अंग्रेजी में बोलें
        </p>
      </div>

      {/* Exercise Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Current Exercise • वर्तमान अभ्यास
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {exercises.map((exercise) => (
              <Button
                key={exercise.id}
                variant={currentExercise.id === exercise.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentExercise(exercise);
                  resetExercise();
                }}
                className="flex flex-col items-center p-3 h-auto"
              >
                <span className="font-medium">{exercise.title}</span>
                <span className="text-xs text-muted-foreground">{exercise.titleHindi}</span>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {exercise.difficulty}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
              {currentExercise.title}
            </h3>
            <p className="text-purple-600 dark:text-purple-400 mb-2">
              {currentExercise.titleHindi}
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Category: {currentExercise.category} • श्रेणी: {currentExercise.category}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Steps • सीखने के चरण</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                  currentStep === step.id 
                    ? "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700"
                    : completedSteps.includes(step.id)
                    ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                )}
              >
                <span className="text-lg">{step.icon}</span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.titleHindi}</p>
                </div>
                {completedSteps.includes(step.id) && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>

          <Progress 
            value={(completedSteps.length / steps.length) * 100} 
            className="mb-4"
          />
          <p className="text-sm text-muted-foreground text-center">
            Step {completedSteps.length + 1} of {steps.length} • चरण {completedSteps.length + 1} का {steps.length}
          </p>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">
              {steps.find(s => s.id === currentStep)?.icon}
            </span>
            {steps.find(s => s.id === currentStep)?.title}
            <span className="text-lg text-purple-600 dark:text-purple-400 ml-2">
              {steps.find(s => s.id === currentStep)?.titleHindi}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'think' && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Think about this in Hindi: • इसके बारे में हिंदी में सोचें:
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-lg">
                  {currentExercise.hindiPrompt}
                </p>
              </div>
              <Button onClick={() => completeStep('think')} className="w-full">
                I've thought about it • मैंने इसके बारे में सोचा है
              </Button>
            </div>
          )}

          {currentStep === 'listen' && (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Target English: • लक्ष्य अंग्रेजी:
                </h4>
                <p className="text-green-600 dark:text-green-400 text-lg mb-3">
                  {currentExercise.englishTarget}
                </p>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Pronunciation Guide: • उच्चारण गाइड:
                </h4>
                <p className="text-green-600 dark:text-green-400">
                  {currentExercise.pronunciation}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Listen'} • {isPlaying ? 'रोकें' : 'सुनें'}
                </Button>
                <Button onClick={() => completeStep('listen')} className="flex-1">
                  I understand • मैं समझ गया
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'practice' && (
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  Practice Tips: • अभ्यास सुझाव:
                </h4>
                <ul className="space-y-2">
                  {currentExercise.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-orange-600 dark:text-orange-400">{tip}</p>
                        <p className="text-sm text-orange-500 dark:text-orange-500">
                          {currentExercise.tipsHindi[tipIndex]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => completeStep('practice')} className="w-full">
                I've practiced • मैंने अभ्यास किया है
              </Button>
            </div>
          )}

          {currentStep === 'record' && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Record Your Speaking • अपनी बोली रिकॉर्ड करें
                </h4>
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Speak the English sentence clearly • अंग्रेजी वाक्य स्पष्ट रूप से बोलें
                </p>
                
                {isRecording && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 dark:text-red-400 font-mono">
                      {formatTime(recordingTime)}
                    </span>
                  </div>
                )}

                <div className="flex justify-center gap-2">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-5 w-5" />
                        Stop Recording • रिकॉर्डिंग बंद करें
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5" />
                        Start Recording • रिकॉर्डिंग शुरू करें
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'feedback' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Great Job! • बहुत बढ़िया!
                </h4>
                <p className="text-green-600 dark:text-green-400 mb-4">
                  You completed the speaking exercise • आपने बोलने का अभ्यास पूरा किया
                </p>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Confidence Level • आत्मविश्वास स्तर
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={confidence} className="flex-1" />
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {confidence}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={resetExercise} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Practice Again • फिर अभ्यास करें
                  </Button>
                  <Button onClick={() => {
                    const nextExercise = exercises.find(e => e.id === currentExercise.id + 1);
                    if (nextExercise) {
                      setCurrentExercise(nextExercise);
                      resetExercise();
                    }
                  }}>
                    Next Exercise • अगला अभ्यास
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credits Footer */}
      <footer className="text-center pt-6 border-t">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </div>
  );
}