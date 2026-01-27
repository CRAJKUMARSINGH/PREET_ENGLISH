import { useState, useCallback } from 'react';
import { Mic, MicOff, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(a, b) {
    var matrix = [];
    for (var i = 0; i <= b.length; i++)
        matrix[i] = [i];
    for (var j = 0; j <= a.length; j++)
        matrix[0][j] = j;
    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
function calculateScore(target, actual) {
    var t = target.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    var a = actual.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!a)
        return 0;
    var distance = levenshteinDistance(t, a);
    var maxLength = Math.max(t.length, a.length);
    var similarity = 1 - distance / maxLength;
    return Math.max(0, Math.min(100, Math.round(similarity * 100)));
}
export function SpeechEvaluator(_a) {
    var targetText = _a.targetText, _b = _a.language, language = _b === void 0 ? 'en-US' : _b, onComplete = _a.onComplete, className = _a.className;
    var _c = useState(false), isListening = _c[0], setIsListening = _c[1];
    var _d = useState(''), transcript = _d[0], setTranscript = _d[1];
    var _e = useState(null), score = _e[0], setScore = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    // Check browser support
    var SpeechRecognition = typeof window !== 'undefined'
        ? (window.SpeechRecognition || window.webkitSpeechRecognition)
        : null;
    var startListening = useCallback(function () {
        if (!SpeechRecognition) {
            setError("Speech recognition not supported in this browser.");
            return;
        }
        var recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = function () {
            setIsListening(true);
            setError(null);
            setTranscript('');
            setScore(null);
        };
        recognition.onresult = function (event) {
            var result = event.results[0][0].transcript;
            setTranscript(result);
            var calculatedScore = calculateScore(targetText, result);
            setScore(calculatedScore);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete(calculatedScore);
        };
        recognition.onerror = function (event) {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setError("Microphone permission denied.");
            }
            else {
                setError("Error listening. Please try again.");
            }
        };
        recognition.onend = function () {
            setIsListening(false);
        };
        recognition.start();
    }, [SpeechRecognition, language, targetText, onComplete]);
    return (<div className={cn("flex flex-col gap-2", className)}>
            <div className="flex items-center gap-2">
                <button onClick={startListening} disabled={isListening} className={cn("relative p-3 rounded-full transition-all duration-300 flex items-center justify-center", isListening
            ? "bg-red-100 text-red-600 animate-pulse ring-4 ring-red-50"
            : score !== null && score >= 80
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105")} title="Speak now">
                    {isListening ? (<MicOff className="h-5 w-5"/>) : (<Mic className="h-5 w-5"/>)}
                </button>

                {/* Feedback Area */}
                <AnimatePresence mode="wait">
                    {score !== null && (<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={cn("px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 border", score >= 80
                ? "bg-green-50 text-green-700 border-green-200"
                : score >= 50
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-red-50 text-red-700 border-red-200")}>
                            {score >= 80 ? <Check className="h-4 w-4"/> : <RefreshCw className="h-4 w-4"/>}
                            {score}% Match
                        </motion.div>)}
                </AnimatePresence>
            </div>

            {/* Transcript Display */}
            {transcript && (<motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs text-muted-foreground italic pl-2 border-l-2 border-slate-200">
                    "{transcript}"
                </motion.p>)}

            {error && (<p className="text-xs text-red-500">{error}</p>)}
        </div>);
}
