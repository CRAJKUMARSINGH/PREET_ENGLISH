/**
 * The Mimic Engine - AI-Powered Shadowing with Real-Time Waveform Feedback
 * The "Brilliant Idea" feature that makes PREET_ENGLISH viral
 * Enhanced with professional WaveSurfer.js visualization
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Play, RotateCcw, Share2, Trophy, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioService } from '@/lib/audioService';
import { toast } from '@/hooks/use-toast';
// Dynamic import for WaveSurfer to avoid SSR issues
var WaveSurfer = null;
if (typeof window !== 'undefined') {
    import('wavesurfer.js').then(function (module) {
        WaveSurfer = module.default;
    });
}
export function MimicEngine(_a) {
    var _this = this;
    var targetPhrase = _a.targetPhrase, _b = _a.targetLanguage, targetLanguage = _b === void 0 ? 'en-US' : _b, _c = _a.difficulty, difficulty = _c === void 0 ? 'beginner' : _c, onScoreUpdate = _a.onScoreUpdate;
    var _d = useState(false), isRecording = _d[0], setIsRecording = _d[1];
    var _e = useState(false), isPlaying = _e[0], setIsPlaying = _e[1];
    var _f = useState([]), userWaveform = _f[0], setUserWaveform = _f[1];
    var _g = useState([]), targetWaveform = _g[0], setTargetWaveform = _g[1];
    var _h = useState(null), similarityScore = _h[0], setSimilarityScore = _h[1];
    var _j = useState(''), feedback = _j[0], setFeedback = _j[1];
    var _k = useState(0), attempts = _k[0], setAttempts = _k[1];
    var _l = useState(0), bestScore = _l[0], setBestScore = _l[1];
    var mediaRecorderRef = useRef(null);
    var audioContextRef = useRef(null);
    var analyserRef = useRef(null);
    var targetWaveformRef = useRef(null);
    var userWaveformRef = useRef(null);
    var animationFrameRef = useRef();
    var targetWaveSurferRef = useRef(null);
    var userWaveSurferRef = useRef(null);
    // Initialize WaveSurfer instances
    useEffect(function () {
        if (!WaveSurfer || !targetWaveformRef.current || !userWaveformRef.current)
            return;
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
        return function () {
            if (targetWaveSurferRef.current) {
                targetWaveSurferRef.current.destroy();
            }
            if (userWaveSurferRef.current) {
                userWaveSurferRef.current.destroy();
            }
        };
    }, []);
    // Initialize audio context and analyzer
    useEffect(function () {
        var initAudio = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                    analyserRef.current = audioContextRef.current.createAnalyser();
                    analyserRef.current.fftSize = 256;
                }
                catch (error) {
                    console.error('Failed to initialize audio context:', error);
                    toast({
                        title: "Audio Error",
                        description: "Could not initialize audio. Please check your microphone permissions.",
                        variant: "destructive"
                    });
                }
                return [2 /*return*/];
            });
        }); };
        initAudio();
        return function () {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    // Generate target waveform using speech synthesis
    var generateTargetWaveform = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var utterance, simulatedWaveform;
        return __generator(this, function (_a) {
            if (!targetWaveSurferRef.current)
                return [2 /*return*/];
            try {
                utterance = new SpeechSynthesisUtterance(targetPhrase);
                utterance.lang = targetLanguage;
                utterance.rate = 0.9;
                simulatedWaveform = generateSimulatedWaveform(targetPhrase);
                targetWaveSurferRef.current.loadBlob(simulatedWaveform);
            }
            catch (error) {
                console.error('Failed to generate target waveform:', error);
            }
            return [2 /*return*/];
        });
    }); }, [targetPhrase, targetLanguage]);
    // Generate simulated waveform blob for demo
    var generateSimulatedWaveform = function (text) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        var sampleRate = audioContext.sampleRate;
        var duration = Math.max(2, text.length * 0.1); // Minimum 2 seconds
        var frameCount = sampleRate * duration;
        var arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
        var channelData = arrayBuffer.getChannelData(0);
        // Generate speech-like waveform
        for (var i = 0; i < frameCount; i++) {
            var t = i / sampleRate;
            var envelope = Math.exp(-t * 0.5) * (1 - Math.exp(-t * 10));
            var frequency = 150 + Math.sin(t * 2) * 50; // Varying pitch
            var noise = (Math.random() - 0.5) * 0.1;
            channelData[i] = envelope * Math.sin(2 * Math.PI * frequency * t) + noise;
        }
        // Convert to WAV blob
        var wavBuffer = audioBufferToWav(arrayBuffer);
        return new Blob([wavBuffer], { type: 'audio/wav' });
    };
    // Convert AudioBuffer to WAV format
    var audioBufferToWav = function (buffer) {
        var length = buffer.length;
        var arrayBuffer = new ArrayBuffer(44 + length * 2);
        var view = new DataView(arrayBuffer);
        var channelData = buffer.getChannelData(0);
        // WAV header
        var writeString = function (offset, string) {
            for (var i = 0; i < string.length; i++) {
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
        var offset = 44;
        for (var i = 0; i < length; i++) {
            var sample = Math.max(-1, Math.min(1, channelData[i]));
            view.setInt16(offset, sample * 0x7FFF, true);
            offset += 2;
        }
        return arrayBuffer;
    };
    // Analyze audio and create waveform
    var analyzeAudio = useCallback(function () {
        if (!analyserRef.current)
            return;
        var bufferLength = analyserRef.current.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        var frequencies = Array.from(dataArray).map(function (value) { return value / 255 * 100; });
        setUserWaveform(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                frequencies: frequencies,
                timestamp: Date.now()
            }], false); });
        // Continue analyzing while recording
        if (isRecording) {
            animationFrameRef.current = requestAnimationFrame(analyzeAudio);
        }
    }, [isRecording]);
    // Calculate similarity score using advanced algorithm
    var calculateSimilarity = useCallback(function (userWave, targetWave) {
        if (userWave.length === 0 || targetWave.length === 0)
            return 0;
        // Advanced similarity calculation
        var minLength = Math.min(userWave.length, targetWave.length);
        var totalSimilarity = 0;
        var rhythmScore = 0;
        var pitchScore = 0;
        for (var i = 0; i < minLength; i++) {
            var userFreqs = userWave[i].frequencies;
            var targetFreqs = targetWave[i].frequencies;
            // Frequency similarity (pitch)
            var freqSimilarity = 0;
            var minFreqLength = Math.min(userFreqs.length, targetFreqs.length);
            for (var j = 0; j < minFreqLength; j++) {
                var diff = Math.abs(userFreqs[j] - targetFreqs[j]);
                freqSimilarity += Math.max(0, 100 - diff);
            }
            pitchScore += freqSimilarity / minFreqLength;
        }
        // Rhythm similarity (timing patterns)
        var userPeaks = findPeaks(userWave);
        var targetPeaks = findPeaks(targetWave);
        rhythmScore = calculateRhythmSimilarity(userPeaks, targetPeaks);
        // Weighted final score
        var finalScore = (pitchScore / minLength) * 0.7 + rhythmScore * 0.3;
        return Math.round(Math.min(100, finalScore));
    }, []);
    // Find peaks in waveform for rhythm analysis
    var findPeaks = function (waveform) {
        var peaks = [];
        for (var i = 1; i < waveform.length - 1; i++) {
            var current = waveform[i].frequencies.reduce(function (a, b) { return a + b; }, 0);
            var prev = waveform[i - 1].frequencies.reduce(function (a, b) { return a + b; }, 0);
            var next = waveform[i + 1].frequencies.reduce(function (a, b) { return a + b; }, 0);
            if (current > prev && current > next && current > 50) {
                peaks.push(i);
            }
        }
        return peaks;
    };
    // Calculate rhythm similarity
    var calculateRhythmSimilarity = function (userPeaks, targetPeaks) {
        if (userPeaks.length === 0 || targetPeaks.length === 0)
            return 0;
        var userIntervals = userPeaks.slice(1).map(function (peak, i) { return peak - userPeaks[i]; });
        var targetIntervals = targetPeaks.slice(1).map(function (peak, i) { return peak - targetPeaks[i]; });
        if (userIntervals.length === 0 || targetIntervals.length === 0)
            return 50;
        var minLength = Math.min(userIntervals.length, targetIntervals.length);
        var similarity = 0;
        for (var i = 0; i < minLength; i++) {
            var diff = Math.abs(userIntervals[i] - targetIntervals[i]);
            similarity += Math.max(0, 100 - diff * 10);
        }
        return similarity / minLength;
    };
    // Start recording
    var startRecording = function () { return __awaiter(_this, void 0, void 0, function () {
        var stream, source, chunks_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            audio: {
                                echoCancellation: true,
                                noiseSuppression: true,
                                autoGainControl: true
                            }
                        })];
                case 1:
                    stream = _a.sent();
                    if (audioContextRef.current && analyserRef.current) {
                        source = audioContextRef.current.createMediaStreamSource(stream);
                        source.connect(analyserRef.current);
                    }
                    mediaRecorderRef.current = new MediaRecorder(stream, {
                        mimeType: 'audio/webm;codecs=opus'
                    });
                    chunks_1 = [];
                    mediaRecorderRef.current.ondataavailable = function (event) {
                        if (event.data.size > 0) {
                            chunks_1.push(event.data);
                        }
                    };
                    mediaRecorderRef.current.onstop = function () {
                        var blob = new Blob(chunks_1, { type: 'audio/webm;codecs=opus' });
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
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to start recording:', error_1);
                    toast({
                        title: "Recording Error",
                        description: "Could not access microphone. Please check permissions.",
                        variant: "destructive"
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Stop recording and analyze
    var stopRecording = function () {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(function (track) { return track.stop(); });
        }
        setIsRecording(false);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        // Calculate similarity score
        var score = calculateSimilarity(userWaveform, targetWaveform);
        setSimilarityScore(score);
        setAttempts(function (prev) { return prev + 1; });
        if (score > bestScore) {
            setBestScore(score);
        }
        // Generate enhanced feedback
        var feedbackText = '';
        var emoji = '';
        if (score >= 95) {
            feedbackText = 'Perfect! Native-level pronunciation!';
            emoji = '🏆';
        }
        else if (score >= 85) {
            feedbackText = 'Excellent! Very close to native pronunciation.';
            emoji = '🌟';
        }
        else if (score >= 75) {
            feedbackText = 'Great job! Good pronunciation with minor improvements needed.';
            emoji = '👍';
        }
        else if (score >= 60) {
            feedbackText = 'Good effort! Focus on matching the rhythm and stress patterns.';
            emoji = '👌';
        }
        else if (score >= 40) {
            feedbackText = 'Keep practicing! Pay attention to vowel sounds and word stress.';
            emoji = '💪';
        }
        else {
            feedbackText = 'Try again! Listen carefully and speak slowly at first.';
            emoji = '🎯';
        }
        setFeedback("".concat(emoji, " ").concat(feedbackText));
        onScoreUpdate === null || onScoreUpdate === void 0 ? void 0 : onScoreUpdate(score);
        // Show achievement for high scores
        if (score >= 90) {
            toast({
                title: "🎉 Amazing Pronunciation!",
                description: "".concat(score, "% similarity - Share your achievement!")
            });
        }
    };
    // Play target audio with waveform
    var playTarget = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsPlaying(true);
                    // Generate and display target waveform
                    return [4 /*yield*/, generateTargetWaveform()];
                case 1:
                    // Generate and display target waveform
                    _a.sent();
                    // Play audio
                    audioService.speak(targetPhrase, targetLanguage);
                    // Play waveform animation
                    if (targetWaveSurferRef.current) {
                        targetWaveSurferRef.current.play();
                    }
                    setTimeout(function () {
                        setIsPlaying(false);
                    }, Math.max(2000, targetPhrase.length * 100));
                    return [2 /*return*/];
            }
        });
    }); };
    // Reset attempt
    var resetAttempt = function () {
        setUserWaveform([]);
        setSimilarityScore(null);
        setFeedback('');
        if (userWaveSurferRef.current) {
            userWaveSurferRef.current.empty();
        }
    };
    // Share score (viral feature)
    var shareScore = function () {
        if (similarityScore === null)
            return;
        var shareText = "\uD83C\uDFAF I scored ".concat(similarityScore, "% on English pronunciation in PREET_ENGLISH! \n    \nPhrase: \"").concat(targetPhrase, "\"\nLevel: ").concat(difficulty, "\n\nCan you beat my accent score? Try it now! \n#PreetEnglish #PronunciationChallenge #EnglishLearning");
        if (navigator.share) {
            navigator.share({
                title: 'My PREET_ENGLISH Pronunciation Score',
                text: shareText,
                url: window.location.href
            });
        }
        else {
            navigator.clipboard.writeText(shareText);
            toast({
                title: "📋 Copied to Clipboard!",
                description: "Share your score on social media to challenge friends!"
            });
        }
    };
    return (<Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Trophy className="h-7 w-7 text-yellow-500"/>
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
            <Button onClick={playTarget} disabled={isPlaying || isRecording} variant="outline" size="lg" className="gap-2" aria-label={"Listen to target pronunciation of: ".concat(targetPhrase)}>
              {isPlaying ? <Volume2 className="h-5 w-5 animate-pulse"/> : <Play className="h-5 w-5"/>}
              {isPlaying ? 'Playing...' : 'Listen to Target'}
            </Button>
            <Badge variant="outline" className="px-4 py-2" role="status" aria-label={"Difficulty level: ".concat(difficulty)}>
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
            <div ref={targetWaveformRef} className="border rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[80px] flex items-center justify-center">
              {!targetWaveform.length && (<p className="text-muted-foreground">Click "Listen to Target" to see waveform</p>)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="font-medium">Your Pronunciation</span>
            </div>
            <div ref={userWaveformRef} className="border rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[80px] flex items-center justify-center">
              {!isRecording && userWaveform.length === 0 && (<p className="text-muted-foreground">Start recording to see your waveform</p>)}
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center gap-4">
          <Button onClick={isRecording ? stopRecording : startRecording} variant={isRecording ? "destructive" : "default"} size="lg" disabled={isPlaying} className="gap-2 px-8" aria-label={isRecording ? "Stop recording pronunciation" : "Start recording pronunciation"} aria-describedby="recording-instructions">
            {isRecording ? <MicOff className="h-5 w-5"/> : <Mic className="h-5 w-5"/>}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          
          <Button onClick={resetAttempt} variant="outline" size="lg" disabled={isRecording} className="gap-2" aria-label="Reset pronunciation attempt">
            <RotateCcw className="h-4 w-4"/>
            Reset
          </Button>
        </div>

        {/* Score Display */}
        <AnimatePresence>
          {similarityScore !== null && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-semibold">Pronunciation Score:</span>
                  <Badge variant={similarityScore >= 75 ? "default" : "secondary"} className="text-2xl px-4 py-2 font-bold">
                    {similarityScore}%
                  </Badge>
                </div>
                
                <Progress value={similarityScore} className="w-full max-w-md mx-auto h-3"/>
                
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
              {similarityScore >= 60 && (<Button onClick={shareScore} variant="outline" size="lg" className="gap-2 bg-white dark:bg-gray-800">
                  <Share2 className="h-5 w-5"/>
                  Share My Achievement
                </Button>)}
            </motion.div>)}
        </AnimatePresence>

        {/* Instructions */}
        <div id="recording-instructions" className="text-sm text-muted-foreground text-center space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg" role="region" aria-label="Instructions for pronunciation practice">
          <h4 className="font-semibold text-foreground">How to get the best score:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            <p>• Listen to the target pronunciation first</p>
            <p>• Speak clearly and at a natural pace</p>
            <p>• Match the rhythm and stress patterns</p>
            <p>• Practice the difficult sounds multiple times</p>
          </div>
        </div>
      </CardContent>
    </Card>);
}
