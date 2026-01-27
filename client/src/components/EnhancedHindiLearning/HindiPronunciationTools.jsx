/**
 * Enhanced Hindi Pronunciation Tools
 * Advanced pronunciation practice with Hindi support and gamification
 * Enhanced version with superior features and better UX
 */
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
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Volume2, Square, CheckCircle, XCircle, AlertCircle, Star, Award, Target, Activity, BarChart, Zap, Heart, Headphones } from 'lucide-react';
import { SaraswatiMascot } from '@/components/SaraswatiMascot';
import { CelebrationModal } from '@/components/CelebrationModal';
var pronunciationWords = [
    {
        id: 'pronunciation',
        word: 'Pronunciation',
        hindiMeaning: 'उच्चारण',
        phonetic: '/prəˌnʌnsiˈeɪʃən/',
        hindiPhonetic: 'प्रनन्सिएशन',
        difficulty: 'medium',
        category: 'Academic',
        tips: [
            'Break it into syllables: pro-nun-ci-a-tion',
            'Stress on the fourth syllable: -A-tion',
            'The "nun" sounds like "none"'
        ],
        hindiTips: [
            'इसे टुकड़ों में बांटें: प्रो-नन्-सि-ए-शन',
            'चौथे भाग पर जोर दें: -ए-शन',
            '"नन्" का उच्चारण "नन" की तरह करें'
        ],
        commonMistakes: [
            'Saying "pro-NOUN-ciation" instead of "pro-nun-ci-A-tion"',
            'Missing the "ci" sound in the middle'
        ],
        xpReward: 30
    },
    {
        id: 'comfortable',
        word: 'Comfortable',
        hindiMeaning: 'आरामदायक',
        phonetic: '/ˈkʌmftəbəl/',
        hindiPhonetic: 'कम्फ्टबल',
        difficulty: 'medium',
        category: 'Daily Life',
        tips: [
            'Silent "or" - say "KUMF-ter-bul"',
            'Three syllables, not four',
            'Stress on the first syllable'
        ],
        hindiTips: [
            '"or" मत बोलें - "कम्फ्-टर-बल" कहें',
            'तीन भाग हैं, चार नहीं',
            'पहले भाग पर जोर दें'
        ],
        commonMistakes: [
            'Saying "com-FOR-ta-ble" with four syllables',
            'Pronouncing the "or" sound'
        ],
        xpReward: 25
    },
    {
        id: 'schedule',
        word: 'Schedule',
        hindiMeaning: 'समय सारणी',
        phonetic: '/ˈʃedjuːl/ (UK) /ˈskedʒuːl/ (US)',
        hindiPhonetic: 'शेड्यूल / स्केज्यूल',
        difficulty: 'easy',
        category: 'Business',
        tips: [
            'UK: "SHED-yool" with "sh" sound',
            'US: "SKED-jool" with "sk" sound',
            'Both are correct, choose one style'
        ],
        hindiTips: [
            'ब्रिटिश: "शेड-यूल" "श" की आवाज के साथ',
            'अमेरिकी: "स्केड-जूल" "स्क" की आवाज के साथ',
            'दोनों सही हैं, एक स्टाइल चुनें'
        ],
        commonMistakes: [
            'Mixing UK and US pronunciations in the same conversation',
            'Saying "sche-DULE" with stress on second syllable'
        ],
        xpReward: 20
    },
    {
        id: 'entrepreneur',
        word: 'Entrepreneur',
        hindiMeaning: 'उद्यमी',
        phonetic: '/ˌɒntrəprəˈnɜː/',
        hindiPhonetic: 'आन्ट्रप्रनर',
        difficulty: 'hard',
        category: 'Business',
        tips: [
            'French origin - "on-truh-pruh-NUR"',
            'Silent "e" at the beginning',
            'Stress on the last syllable'
        ],
        hindiTips: [
            'फ्रेंच मूल - "आन-ट्र-प्र-नर"',
            'शुरू में "ए" मत बोलें',
            'अंतिम भाग पर जोर दें'
        ],
        commonMistakes: [
            'Saying "EN-tre-pre-neur" with English "en" sound',
            'Stressing the wrong syllable'
        ],
        xpReward: 50
    }
];
export var HindiPronunciationTools = function () {
    var _a = useState(pronunciationWords[0]), selectedWord = _a[0], setSelectedWord = _a[1];
    var _b = useState(false), isRecording = _b[0], setIsRecording = _b[1];
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var _d = useState(0), recordingTime = _d[0], setRecordingTime = _d[1];
    var _e = useState(null), pronunciationScore = _e[0], setPronunciationScore = _e[1];
    var _f = useState(0), totalXP = _f[0], setTotalXP = _f[1];
    var _g = useState(0), practiceCount = _g[0], setPracticeCount = _g[1];
    var _h = useState(false), showCelebration = _h[0], setShowCelebration = _h[1];
    var _j = useState('practice'), activeTab = _j[0], setActiveTab = _j[1];
    var recordingRef = useRef(null);
    var mediaRecorderRef = useRef(null);
    useEffect(function () {
        var interval = null;
        if (isRecording) {
            interval = window.setInterval(function () {
                setRecordingTime(function (time) { return time + 1; });
            }, 1000);
        }
        else {
            setRecordingTime(0);
        }
        return function () {
            if (interval)
                clearInterval(interval);
        };
    }, [isRecording]);
    var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
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
                    mediaRecorder.start();
                    setIsRecording(true);
                    mediaRecorder.ondataavailable = function (event) {
                        // Handle recorded audio data
                        console.log('Audio recorded:', event.data);
                    };
                    mediaRecorder.onstop = function () {
                        stream_1.getTracks().forEach(function (track) { return track.stop(); });
                        setIsRecording(false);
                        // Simulate pronunciation scoring
                        var score = Math.floor(Math.random() * 30) + 70; // 70-100
                        setPronunciationScore(score);
                        setPracticeCount(practiceCount + 1);
                        if (score >= 80) {
                            setTotalXP(totalXP + selectedWord.xpReward);
                            setShowCelebration(true);
                        }
                    };
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error accessing microphone:', error_1);
                    alert('माइक्रोफोन एक्सेस नहीं मिला। कृपया अनुमति दें।');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
    };
    var playAudio = function () {
        setIsPlaying(true);
        // Simulate audio playback
        setTimeout(function () {
            setIsPlaying(false);
        }, 2000);
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };
    var getScoreColor = function (score) {
        if (score >= 90)
            return 'text-green-600';
        if (score >= 80)
            return 'text-blue-600';
        if (score >= 70)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SaraswatiMascot size="md"/>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Pronunciation Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              सही उच्चारण सीखें 🎤
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-500"/>
            <span className="text-2xl font-bold text-yellow-600">{totalXP}</span>
            <span className="text-sm text-muted-foreground">XP</span>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Practiced: {practiceCount}
          </Badge>
        </div>
      </div>

      {/* Word Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5"/>
            Choose a Word to Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pronunciationWords.map(function (word) { return (<Button key={word.id} variant={selectedWord.id === word.id ? "default" : "outline"} className="h-auto p-4 text-left justify-start" onClick={function () {
                setSelectedWord(word);
                setPronunciationScore(null);
            }}>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{word.word}</span>
                    <Badge className={getDifficultyColor(word.difficulty)}>
                      {word.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{word.hindiMeaning}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{word.category}</span>
                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                      <Zap className="h-3 w-3"/>
                      {word.xpReward} XP
                    </div>
                  </div>
                </div>
              </Button>); })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={function (value) { return setActiveTab(value); }}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Mic className="h-4 w-4"/>
            Practice
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4"/>
            Learn
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart className="h-4 w-4"/>
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Practice: {selectedWord.word}</span>
                <Badge className={getDifficultyColor(selectedWord.difficulty)}>
                  {selectedWord.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Word Display */}
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                    {selectedWord.word}
                  </h2>
                  <p className="text-xl text-blue-600 dark:text-blue-400 mb-2">
                    {selectedWord.hindiMeaning}
                  </p>
                  <div className="space-y-1">
                    <p className="text-lg font-mono text-purple-600 dark:text-purple-400">
                      {selectedWord.phonetic}
                    </p>
                    <p className="text-lg text-purple-500 dark:text-purple-400">
                      {selectedWord.hindiPhonetic}
                    </p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex justify-center gap-4">
                  <Button onClick={playAudio} disabled={isPlaying} className="flex items-center gap-2" size="lg">
                    {isPlaying ? (<>
                        <Activity className="h-5 w-5 animate-pulse"/>
                        Playing...
                      </>) : (<>
                        <Volume2 className="h-5 w-5"/>
                        Listen
                      </>)}
                  </Button>

                  <Button onClick={isRecording ? stopRecording : startRecording} variant={isRecording ? "destructive" : "default"} className="flex items-center gap-2" size="lg">
                    {isRecording ? (<>
                        <Square className="h-5 w-5"/>
                        Stop ({recordingTime}s)
                      </>) : (<>
                        <Mic className="h-5 w-5"/>
                        Record
                      </>)}
                  </Button>
                </div>

                {/* Recording Indicator */}
                {isRecording && (<div className="flex items-center justify-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"/>
                    <span>Recording... {recordingTime}s</span>
                  </div>)}

                {/* Pronunciation Score */}
                {pronunciationScore !== null && (<Card className="max-w-md mx-auto">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {pronunciationScore >= 80 ? (<CheckCircle className="h-6 w-6 text-green-500"/>) : pronunciationScore >= 70 ? (<AlertCircle className="h-6 w-6 text-yellow-500"/>) : (<XCircle className="h-6 w-6 text-red-500"/>)}
                        <span className="text-lg font-medium">Pronunciation Score</span>
                      </div>
                      <p className={"text-3xl font-bold ".concat(getScoreColor(pronunciationScore))}>
                        {pronunciationScore}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {pronunciationScore >= 90 ? 'Excellent! Perfect pronunciation!' :
                pronunciationScore >= 80 ? 'Great job! Very good pronunciation!' :
                    pronunciationScore >= 70 ? 'Good effort! Keep practicing!' :
                        'Keep trying! Practice makes perfect!'}
                      </p>
                      {pronunciationScore >= 80 && (<div className="flex items-center justify-center gap-1 mt-2 text-yellow-600">
                          <Zap className="h-4 w-4"/>
                          <span className="font-medium">+{selectedWord.xpReward} XP</span>
                        </div>)}
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learn: {selectedWord.word}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pronunciation Tips */}
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4"/>
                    Pronunciation Tips
                  </h4>
                  <ul className="space-y-2">
                    {selectedWord.tips.map(function (tip, index) { return (<li key={index} className="flex items-start gap-2 text-blue-700 dark:text-blue-400">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>); })}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4"/>
                    हिंदी में टिप्स
                  </h4>
                  <ul className="space-y-2">
                    {selectedWord.hindiTips.map(function (tip, index) { return (<li key={index} className="flex items-start gap-2 text-green-700 dark:text-green-400">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>); })}
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4"/>
                    Common Mistakes to Avoid
                  </h4>
                  <ul className="space-y-2">
                    {selectedWord.commonMistakes.map(function (mistake, index) { return (<li key={index} className="flex items-start gap-2 text-amber-700 dark:text-amber-400">
                        <span className="text-amber-500 mt-1">⚠️</span>
                        <span>{mistake}</span>
                      </li>); })}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500"/>
                <p className="text-2xl font-bold">{totalXP}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Mic className="h-8 w-8 mx-auto mb-2 text-blue-500"/>
                <p className="text-2xl font-bold">{practiceCount}</p>
                <p className="text-sm text-muted-foreground">Words Practiced</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-500"/>
                <p className="text-2xl font-bold">{pronunciationScore || 0}%</p>
                <p className="text-sm text-muted-foreground">Latest Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-500"/>
                <p className="text-2xl font-bold">{pronunciationWords.length}</p>
                <p className="text-sm text-muted-foreground">Words Available</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pronunciation Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pronunciationWords.map(function (word) { return (<div key={word.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{word.word}</span>
                        <Badge className={getDifficultyColor(word.difficulty)}>
                          {word.difficulty}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {word.id === selectedWord.id && pronunciationScore ? "".concat(pronunciationScore, "%") : 'Not practiced'}
                      </span>
                    </div>
                    <Progress value={word.id === selectedWord.id && pronunciationScore ? pronunciationScore : 0}/>
                  </div>); })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Celebration Modal */}
      <CelebrationModal isOpen={showCelebration} onClose={function () { return setShowCelebration(false); }} lessonTitle={"+".concat(selectedWord.xpReward, " XP")}/>

      {/* Credits Footer */}
      <footer className="mt-8 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
        </div>
      </footer>
    </div>);
};
