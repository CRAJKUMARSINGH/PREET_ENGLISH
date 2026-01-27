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
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, Volume2, Play, Square, RotateCcw, CheckCircle, AlertCircle, Lightbulb, Target } from 'lucide-react';
export function PronunciationCoach(_a) {
    var _this = this;
    var targetWord = _a.targetWord, hindiComparison = _a.hindiComparison, soundTips = _a.soundTips, difficulty = _a.difficulty;
    var _b = useState(false), isRecording = _b[0], setIsRecording = _b[1];
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var _d = useState(null), score = _d[0], setScore = _d[1];
    var _e = useState(0), attempts = _e[0], setAttempts = _e[1];
    var _f = useState(''), feedback = _f[0], setFeedback = _f[1];
    var mediaRecorderRef = useRef(null);
    var audioChunksRef = useRef([]);
    var playTargetAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(targetWord);
            utterance.lang = 'en-US';
            utterance.rate = 0.7;
            utterance.onend = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    var startRecording = function () { return __awaiter(_this, void 0, void 0, function () {
        var stream_1, mediaRecorder, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: true })];
                case 1:
                    stream_1 = _a.sent();
                    mediaRecorder = new MediaRecorder(stream_1);
                    mediaRecorderRef.current = mediaRecorder;
                    audioChunksRef.current = [];
                    mediaRecorder.ondataavailable = function (event) {
                        audioChunksRef.current.push(event.data);
                    };
                    mediaRecorder.onstop = function () {
                        // Simulate pronunciation analysis
                        analyzePronunciation();
                        stream_1.getTracks().forEach(function (track) { return track.stop(); });
                    };
                    mediaRecorder.start();
                    setIsRecording(true);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error accessing microphone:', error_1);
                    setFeedback('माइक्रोफोन एक्सेस नहीं मिला। कृपया अनुमति दें।');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    var analyzePronunciation = function () {
        // Simulate pronunciation analysis with random score
        var randomScore = Math.floor(Math.random() * 40) + 60; // 60-100
        setScore(randomScore);
        setAttempts(function (prev) { return prev + 1; });
        if (randomScore >= 90) {
            setFeedback('बहुत बढ़िया! आपका उच्चारण एकदम सही है! 🎉');
        }
        else if (randomScore >= 80) {
            setFeedback('अच्छा! थोड़ा और अभ्यास करें। 👍');
        }
        else if (randomScore >= 70) {
            setFeedback('ठीक है। टिप्स को फिर से पढ़ें और कोशिश करें। 💪');
        }
        else {
            setFeedback('अभ्यास जारी रखें। धीरे-धीरे बोलें और टिप्स फॉलो करें। 🎯');
        }
    };
    var resetPractice = function () {
        setScore(null);
        setAttempts(0);
        setFeedback('');
    };
    var difficultyColors = {
        easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return (<Card className="pronunciation-coach-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary"/>
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
          
          <Button onClick={playTargetAudio} disabled={isPlaying} className="flex items-center gap-2">
            {isPlaying ? (<Volume2 className="h-4 w-4 animate-pulse"/>) : (<Play className="h-4 w-4"/>)}
            Listen to Target
          </Button>
        </div>

        {/* Sound Tips */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500"/>
            उच्चारण टिप्स:
          </h4>
          <div className="space-y-2">
            {soundTips.map(function (tip, index) { return (<div key={index} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">{tip}</p>
              </div>); })}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-3">
            <Button onClick={isRecording ? stopRecording : startRecording} variant={isRecording ? "destructive" : "default"} className="flex items-center gap-2">
              {isRecording ? (<>
                  <Square className="h-4 w-4"/>
                  Stop Recording
                </>) : (<>
                  <Mic className="h-4 w-4"/>
                  Start Practice
                </>)}
            </Button>
            
            {attempts > 0 && (<Button onClick={resetPractice} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4"/>
                Reset
              </Button>)}
          </div>

          {isRecording && (<div className="flex items-center justify-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"/>
              <span className="text-sm font-medium">Recording... Speak now!</span>
            </div>)}
        </div>

        {/* Results */}
        {score !== null && (<div className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {score >= 80 ? (<CheckCircle className="h-6 w-6 text-green-500"/>) : (<AlertCircle className="h-6 w-6 text-yellow-500"/>)}
                <span className="text-lg font-bold">Score: {score}%</span>
              </div>
              <Progress value={score} className="w-full max-w-xs mx-auto"/>
            </div>
            
            {feedback && (<div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-sm font-medium">{feedback}</p>
              </div>)}
            
            <div className="text-center text-sm text-muted-foreground">
              Attempts: {attempts}
            </div>
          </div>)}

        {/* Practice Stats */}
        {attempts > 0 && (<div className="grid grid-cols-3 gap-4 pt-4 border-t">
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
          </div>)}
      </CardContent>
    </Card>);
}
export function QuickPronunciationTips() {
    var tips = [
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
    return (<Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500"/>
          Quick Pronunciation Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map(function (tip, index) { return (<div key={index} className="p-3 bg-secondary/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary">{tip.title}</h4>
                <Badge variant="outline">{tip.hindi}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                <strong>Examples:</strong> {tip.example}
              </p>
            </div>); })}
        </div>
      </CardContent>
    </Card>);
}
