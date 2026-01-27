var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';
var AdvancedPronunciationCoach = function (_a) {
    var className = _a.className, onProgressUpdate = _a.onProgressUpdate;
    var challenges = useState([
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
    ])[0];
    var _b = useState(0), currentChallenge = _b[0], setCurrentChallenge = _b[1];
    var _c = useState(0), currentWord = _c[0], setCurrentWord = _c[1];
    var _d = useState(false), isRecording = _d[0], setIsRecording = _d[1];
    var _e = useState(false), isPlaying = _e[0], setIsPlaying = _e[1];
    var _f = useState(null), results = _f[0], setResults = _f[1];
    var _g = useState({}), overallProgress = _g[0], setOverallProgress = _g[1];
    var _h = useState(true), showInstructions = _h[0], setShowInstructions = _h[1];
    var _j = useState([]), waveformData = _j[0], setWaveformData = _j[1];
    var mediaRecorderRef = useRef(null);
    var audioChunksRef = useRef([]);
    var animationRef = useRef();
    var challenge = challenges[currentChallenge];
    var word = challenge.words[currentWord];
    useEffect(function () {
        // Simulate waveform animation during recording
        if (isRecording) {
            var animate_1 = function () {
                setWaveformData(function (prev) { return __spreadArray(__spreadArray([], prev.slice(-30), true), [
                    Math.random() * 100
                ], false); });
                animationRef.current = requestAnimationFrame(animate_1);
            };
            animationRef.current = requestAnimationFrame(animate_1);
        }
        else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
        return function () {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRecording]);
    var playTargetAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(word.word);
            utterance.rate = 0.7;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.onend = function () { return setIsPlaying(false); };
            utterance.onerror = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
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
                    audioChunksRef.current = [];
                    mediaRecorder.ondataavailable = function (event) {
                        audioChunksRef.current.push(event.data);
                    };
                    mediaRecorder.onstop = function () {
                        var audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                        analyzePronunciation(audioBlob);
                        stream_1.getTracks().forEach(function (track) { return track.stop(); });
                    };
                    mediaRecorder.start();
                    setIsRecording(true);
                    setWaveformData([]);
                    setResults(null);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error accessing microphone:', error_1);
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
    var analyzePronunciation = function (audioBlob) { return __awaiter(void 0, void 0, void 0, function () {
        var accuracy, soundId, mockResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Simulate advanced pronunciation analysis
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 1:
                    // Simulate advanced pronunciation analysis
                    _a.sent();
                    accuracy = 60 + Math.random() * 35;
                    soundId = challenge.id;
                    // Update progress
                    setOverallProgress(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[soundId] = Math.max(prev[soundId] || 0, accuracy), _a)));
                    });
                    onProgressUpdate === null || onProgressUpdate === void 0 ? void 0 : onProgressUpdate({ sound: challenge.sound, accuracy: accuracy });
                    mockResult = {
                        accuracy: accuracy,
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
                    return [2 /*return*/];
            }
        });
    }); };
    var nextWord = function () {
        if (currentWord < challenge.words.length - 1) {
            setCurrentWord(function (prev) { return prev + 1; });
        }
        else if (currentChallenge < challenges.length - 1) {
            setCurrentChallenge(function (prev) { return prev + 1; });
            setCurrentWord(0);
        }
        setResults(null);
        setWaveformData([]);
    };
    var previousWord = function () {
        if (currentWord > 0) {
            setCurrentWord(function (prev) { return prev - 1; });
        }
        else if (currentChallenge > 0) {
            setCurrentChallenge(function (prev) { return prev - 1; });
            setCurrentWord(challenges[currentChallenge - 1].words.length - 1);
        }
        setResults(null);
        setWaveformData([]);
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'easy': return 'success';
            case 'medium': return 'warning';
            case 'hard': return 'error';
            default: return 'primary';
        }
    };
    if (showInstructions) {
        return (<ModernCard variant="glass" className={cn('p-6', className)}>
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
            {challenges.map(function (challenge, index) { return (<ModernCard key={challenge.id} variant="default" className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {challenge.sound}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {challenge.hindiEquivalent}
                  </div>
                  <ModernBadge variant={getDifficultyColor(challenge.difficulty)} size="sm">
                    {challenge.difficulty}
                  </ModernBadge>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {challenge.words.length} words
                  </div>
                </div>
              </ModernCard>); })}
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
            
            <ModernButton variant="primary" size="lg" onClick={function () { return setShowInstructions(false); }} className="w-full">
              Start Pronunciation Practice
            </ModernButton>
          </div>
        </div>
      </ModernCard>);
    }
    return (<ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
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
          <ModernBadge variant={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </ModernBadge>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {currentWord + 1} / {challenge.words.length}
          </span>
        </div>
      </div>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4">
        {challenges.map(function (ch, index) { return (<div key={ch.id} className="text-center">
            <ProgressRing progress={overallProgress[ch.id] || 0} size="sm" color={index === currentChallenge ? 'primary' : 'secondary'} showPercentage/>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              {ch.sound}
            </p>
          </div>); })}
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
              {challenge.commonMistakes.slice(0, 2).map(function (mistake, index) { return (<li key={index}>• {mistake}</li>); })}
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
          <ModernBadge variant={getDifficultyColor(word.difficulty)}>
            {word.difficulty}
          </ModernBadge>
        </div>
        
        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-4">
          <ModernButton variant="outline" onClick={playTargetAudio} disabled={isPlaying} icon={isPlaying ? '⏸️' : '🔊'}>
            {isPlaying ? 'Playing...' : 'Listen'}
          </ModernButton>
          
          <ModernButton variant={isRecording ? 'error' : 'primary'} size="lg" onClick={isRecording ? stopRecording : startRecording} className={cn('w-20 h-20 rounded-full text-2xl', isRecording && 'animate-pulse')} icon={isRecording ? '⏹️' : '🎤'}>
            {isRecording ? 'Stop' : 'Record'}
          </ModernButton>
        </div>
        
        {/* Waveform */}
        {(isRecording || waveformData.length > 0) && (<div className="h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex items-end justify-center gap-1">
            {Array.from({ length: 30 }, function (_, i) { return (<div key={i} className={cn('w-2 bg-primary-500 rounded-full transition-all duration-100', isRecording ? 'animate-pulse' : '')} style={{
                    height: "".concat(Math.max(4, (waveformData[i] || 0) * 0.5), "px")
                }}/>); })}
          </div>)}
      </div>
      
      {/* Results */}
      {results && (<ModernCard variant="default" className="p-4 space-y-4">
          <div className="text-center">
            <ProgressRing progress={results.accuracy} size="lg" color={results.accuracy > 80 ? 'success' : results.accuracy > 60 ? 'warning' : 'error'} showPercentage glow/>
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
                {results.improvements.map(function (tip, index) { return (<li key={index}>• {tip}</li>); })}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                🇮🇳 Hindi Tips:
              </h5>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                {results.hindiTips.map(function (tip, index) { return (<li key={index}>• {tip}</li>); })}
              </ul>
            </div>
          </div>
        </ModernCard>)}
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <ModernButton variant="outline" onClick={previousWord} disabled={currentChallenge === 0 && currentWord === 0} icon="⬅️">
          Previous
        </ModernButton>
        
        <div className="flex items-center gap-2">
          <ModernButton variant="ghost" size="sm" onClick={function () { return setResults(null); }}>
            Try Again
          </ModernButton>
          
          <ModernButton variant="ghost" size="sm" onClick={function () { return setShowInstructions(true); }}>
            Instructions
          </ModernButton>
        </div>
        
        <ModernButton variant="primary" onClick={nextWord} disabled={currentChallenge === challenges.length - 1 && currentWord === challenge.words.length - 1} icon="➡️" iconPosition="right">
          Next
        </ModernButton>
      </div>
    </ModernCard>);
};
export default AdvancedPronunciationCoach;
