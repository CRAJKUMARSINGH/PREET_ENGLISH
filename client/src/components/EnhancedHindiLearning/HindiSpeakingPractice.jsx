var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Mic, MicOff, Play, Pause, RotateCcw, Heart, Star, CheckCircle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
export function HindiSpeakingPractice() {
    var _this = this;
    var _a, _b, _c;
    var _d = useState({
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
    }), currentExercise = _d[0], setCurrentExercise = _d[1];
    var _e = useState(false), isRecording = _e[0], setIsRecording = _e[1];
    var _f = useState(0), recordingTime = _f[0], setRecordingTime = _f[1];
    var _g = useState(false), isPlaying = _g[0], setIsPlaying = _g[1];
    var _h = useState('think'), currentStep = _h[0], setCurrentStep = _h[1];
    var _j = useState([]), completedSteps = _j[0], setCompletedSteps = _j[1];
    var _k = useState(0), confidence = _k[0], setConfidence = _k[1];
    var mediaRecorderRef = useRef(null);
    var audioChunksRef = useRef([]);
    var timerRef = useRef(null);
    var exercises = [
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
    var steps = [
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
    useEffect(function () {
        if (isRecording && timerRef.current === null) {
            timerRef.current = setInterval(function () {
                setRecordingTime(function (prev) { return prev + 1; });
            }, 1000);
        }
        else if (!isRecording && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        return function () {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRecording]);
    var startRecording = function () { return __awaiter(_this, void 0, void 0, function () {
        var stream, mediaRecorder, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: true })];
                case 1:
                    stream = _a.sent();
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;
                    audioChunksRef.current = [];
                    mediaRecorder.ondataavailable = function (event) {
                        audioChunksRef.current.push(event.data);
                    };
                    mediaRecorder.start();
                    setIsRecording(true);
                    setRecordingTime(0);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error starting recording:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.onstop = function () {
                var audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                // Here you would typically send the audio to a speech recognition service
                console.log('Recording completed:', audioBlob);
                // Simulate feedback
                setTimeout(function () {
                    setCurrentStep('feedback');
                    setCompletedSteps(function (prev) { return __spreadArray(__spreadArray([], prev, true), ['record'], false); });
                    setConfidence(Math.floor(Math.random() * 30) + 70); // 70-100%
                }, 1000);
            };
        }
    };
    var completeStep = function (stepId) {
        setCompletedSteps(function (prev) { return __spreadArray(__spreadArray([], prev, true), [stepId], false); });
        var currentIndex = steps.findIndex(function (s) { return s.id === stepId; });
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };
    var resetExercise = function () {
        setCurrentStep('think');
        setCompletedSteps([]);
        setRecordingTime(0);
        setConfidence(0);
        setIsRecording(false);
        setIsPlaying(false);
    };
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    return (<div className="space-y-6">
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
            <Target className="h-5 w-5 text-purple-500"/>
            Current Exercise • वर्तमान अभ्यास
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {exercises.map(function (exercise) { return (<Button key={exercise.id} variant={currentExercise.id === exercise.id ? "default" : "outline"} size="sm" onClick={function () {
                setCurrentExercise(exercise);
                resetExercise();
            }} className="flex flex-col items-center p-3 h-auto">
                <span className="font-medium">{exercise.title}</span>
                <span className="text-xs text-muted-foreground">{exercise.titleHindi}</span>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {exercise.difficulty}
                </Badge>
              </Button>); })}
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
            {steps.map(function (step, index) { return (<div key={step.id} className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border transition-all", currentStep === step.id
                ? "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700"
                : completedSteps.includes(step.id)
                    ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700")}>
                <span className="text-lg">{step.icon}</span>
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.titleHindi}</p>
                </div>
                {completedSteps.includes(step.id) && (<CheckCircle className="h-4 w-4 text-green-500"/>)}
              </div>); })}
          </div>

          <Progress value={(completedSteps.length / steps.length) * 100} className="mb-4"/>
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
              {(_a = steps.find(function (s) { return s.id === currentStep; })) === null || _a === void 0 ? void 0 : _a.icon}
            </span>
            {(_b = steps.find(function (s) { return s.id === currentStep; })) === null || _b === void 0 ? void 0 : _b.title}
            <span className="text-lg text-purple-600 dark:text-purple-400 ml-2">
              {(_c = steps.find(function (s) { return s.id === currentStep; })) === null || _c === void 0 ? void 0 : _c.titleHindi}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'think' && (<div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Think about this in Hindi: • इसके बारे में हिंदी में सोचें:
                </h4>
                <p className="text-blue-600 dark:text-blue-400 text-lg">
                  {currentExercise.hindiPrompt}
                </p>
              </div>
              <Button onClick={function () { return completeStep('think'); }} className="w-full">
                I've thought about it • मैंने इसके बारे में सोचा है
              </Button>
            </div>)}

          {currentStep === 'listen' && (<div className="space-y-4">
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
                <Button onClick={function () { return setIsPlaying(!isPlaying); }} variant="outline" className="flex items-center gap-2">
                  {isPlaying ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                  {isPlaying ? 'Pause' : 'Listen'} • {isPlaying ? 'रोकें' : 'सुनें'}
                </Button>
                <Button onClick={function () { return completeStep('listen'); }} className="flex-1">
                  I understand • मैं समझ गया
                </Button>
              </div>
            </div>)}

          {currentStep === 'practice' && (<div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  Practice Tips: • अभ्यास सुझाव:
                </h4>
                <ul className="space-y-2">
                  {currentExercise.tips.map(function (tip, tipIndex) { return (<li key={tipIndex} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0"/>
                      <div>
                        <p className="text-orange-600 dark:text-orange-400">{tip}</p>
                        <p className="text-sm text-orange-500 dark:text-orange-500">
                          {currentExercise.tipsHindi[tipIndex]}
                        </p>
                      </div>
                    </li>); })}
                </ul>
              </div>
              <Button onClick={function () { return completeStep('practice'); }} className="w-full">
                I've practiced • मैंने अभ्यास किया है
              </Button>
            </div>)}

          {currentStep === 'record' && (<div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Record Your Speaking • अपनी बोली रिकॉर्ड करें
                </h4>
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Speak the English sentence clearly • अंग्रेजी वाक्य स्पष्ट रूप से बोलें
                </p>
                
                {isRecording && (<div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 dark:text-red-400 font-mono">
                      {formatTime(recordingTime)}
                    </span>
                  </div>)}

                <div className="flex justify-center gap-2">
                  <Button onClick={isRecording ? stopRecording : startRecording} variant={isRecording ? "destructive" : "default"} size="lg" className="flex items-center gap-2">
                    {isRecording ? (<>
                        <MicOff className="h-5 w-5"/>
                        Stop Recording • रिकॉर्डिंग बंद करें
                      </>) : (<>
                        <Mic className="h-5 w-5"/>
                        Start Recording • रिकॉर्डिंग शुरू करें
                      </>)}
                  </Button>
                </div>
              </div>
            </div>)}

          {currentStep === 'feedback' && (<div className="space-y-4">
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
                    <Progress value={confidence} className="flex-1"/>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {confidence}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={resetExercise} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2"/>
                    Practice Again • फिर अभ्यास करें
                  </Button>
                  <Button onClick={function () {
                var nextExercise = exercises.find(function (e) { return e.id === currentExercise.id + 1; });
                if (nextExercise) {
                    setCurrentExercise(nextExercise);
                    resetExercise();
                }
            }}>
                    Next Exercise • अगला अभ्यास
                  </Button>
                </div>
              </div>
            </div>)}
        </CardContent>
      </Card>

      {/* Credits Footer */}
      <footer className="text-center pt-6 border-t">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
        </div>
      </footer>
    </div>);
}
