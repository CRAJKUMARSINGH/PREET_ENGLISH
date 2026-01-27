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
import ProgressRing from '../ui/ProgressRing';
import ModernBadge from '../ui/ModernBadge';
var SpeakingPracticeEnhanced = function (_a) {
    var exercises = _a.exercises, onComplete = _a.onComplete;
    var _b = useState(0), currentExercise = _b[0], setCurrentExercise = _b[1];
    var _c = useState(false), isRecording = _c[0], setIsRecording = _c[1];
    var _d = useState(''), recordedText = _d[0], setRecordedText = _d[1];
    var _e = useState(0), accuracy = _e[0], setAccuracy = _e[1];
    var _f = useState(0), fluency = _f[0], setFluency = _f[1];
    var startTime = useState(Date.now())[0];
    var _g = useState([]), waveformData = _g[0], setWaveformData = _g[1];
    var _h = useState(false), isPlaying = _h[0], setIsPlaying = _h[1];
    var mediaRecorderRef = useRef(null);
    var audioChunksRef = useRef([]);
    var animationRef = useRef();
    var exercise = exercises[currentExercise];
    useEffect(function () {
        // Simulate waveform animation during recording
        if (isRecording) {
            var animate_1 = function () {
                setWaveformData(function (prev) { return __spreadArray(__spreadArray([], prev.slice(-50), true), [
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
                        // Simulate speech recognition analysis
                        analyzeRecording(audioBlob);
                        stream_1.getTracks().forEach(function (track) { return track.stop(); });
                    };
                    mediaRecorder.start();
                    setIsRecording(true);
                    setWaveformData([]);
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
    var analyzeRecording = function (audioBlob) {
        // Simulate speech analysis
        setTimeout(function () {
            var mockAccuracy = 75 + Math.random() * 20; // 75-95%
            var mockFluency = 70 + Math.random() * 25; // 70-95%
            setAccuracy(mockAccuracy);
            setFluency(mockFluency);
            setRecordedText("Simulated transcription: " + exercise.text.substring(0, 50) + "...");
        }, 1500);
    };
    var playTargetAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(exercise.text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.onend = function () { return setIsPlaying(false); };
            utterance.onerror = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    var nextExercise = function () {
        if (currentExercise < exercises.length - 1) {
            setCurrentExercise(function (prev) { return prev + 1; });
            resetExercise();
        }
        else {
            var timeSpent = (Date.now() - startTime) / 1000;
            onComplete({ accuracy: accuracy, fluency: fluency, timeSpent: timeSpent });
        }
    };
    var resetExercise = function () {
        setRecordedText('');
        setAccuracy(0);
        setFluency(0);
        setWaveformData([]);
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'primary';
        }
    };
    var getCategoryIcon = function (category) {
        switch (category) {
            case 'pronunciation': return '🗣️';
            case 'fluency': return '💬';
            case 'conversation': return '🎭';
            default: return '🎤';
        }
    };
    return (<ModernCard variant="glass" className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Speaking Practice Enhanced
          </h3>
          <div className="flex items-center gap-2">
            <ModernBadge variant={getDifficultyColor(exercise.difficulty)}>
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
          <ModernButton variant="outline" size="sm" onClick={playTargetAudio} disabled={isPlaying} icon={isPlaying ? '⏸️' : '🔊'}>
            {isPlaying ? 'Playing...' : 'Listen'}
          </ModernButton>
        </div>
        
        <div className="p-4 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
          <p className="text-lg leading-relaxed text-neutral-900 dark:text-neutral-100">
            {exercise.text}
          </p>
        </div>
        
        {exercise.targetWords && (<div className="space-y-2">
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Focus on these words:
            </h5>
            <div className="flex flex-wrap gap-2">
              {exercise.targetWords.map(function (word, index) { return (<ModernBadge key={index} variant="primary" size="sm">
                  {word}
                </ModernBadge>); })}
            </div>
          </div>)}
      </div>
      
      {/* Recording Interface */}
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <ModernButton variant={isRecording ? 'error' : 'primary'} size="lg" onClick={isRecording ? stopRecording : startRecording} className={cn('w-32 h-32 rounded-full text-2xl', isRecording && 'animate-pulse')} icon={isRecording ? '⏹️' : '🎤'}>
            {isRecording ? 'Stop' : 'Record'}
          </ModernButton>
        </div>
        
        {/* Waveform Visualization */}
        {(isRecording || waveformData.length > 0) && (<div className="h-20 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 flex items-end justify-center gap-1">
            {Array.from({ length: 50 }, function (_, i) { return (<div key={i} className={cn('w-1 bg-primary-500 rounded-full transition-all duration-100', isRecording ? 'animate-pulse' : '')} style={{
                    height: "".concat(Math.max(4, (waveformData[i] || 0) * 0.6), "px")
                }}/>); })}
          </div>)}
      </div>
      
      {/* Analysis Results */}
      {recordedText && (<div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <ProgressRing progress={accuracy} size="lg" color="success" showPercentage glow/>
              <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Pronunciation Accuracy
              </p>
            </div>
            
            <div className="text-center">
              <ProgressRing progress={fluency} size="lg" color="primary" showPercentage glow/>
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
          
          {exercise.tips && (<div className="p-4 bg-warning-50 dark:bg-warning-950 rounded-lg border border-warning-200 dark:border-warning-800">
              <h5 className="text-sm font-medium text-warning-700 dark:text-warning-300 mb-2">
                💡 Tips for improvement:
              </h5>
              <ul className="space-y-1 text-sm text-warning-700 dark:text-warning-300">
                {exercise.tips.map(function (tip, index) { return (<li key={index} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{tip}</span>
                  </li>); })}
              </ul>
            </div>)}
        </div>)}
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <ModernButton variant="outline" onClick={resetExercise} disabled={isRecording}>
          Try Again
        </ModernButton>
        
        <ModernButton variant="primary" onClick={nextExercise} disabled={!recordedText || isRecording}>
          {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Complete'}
        </ModernButton>
      </div>
    </ModernCard>);
};
export default SpeakingPracticeEnhanced;
