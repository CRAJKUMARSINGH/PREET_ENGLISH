import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

interface VideoScriptProps {
  topicTitle: string;
  hindiInstruction: string;
  englishModel: string;
  hindiBridge: string;
  confidenceBoost: string;
  onComplete?: () => void;
}

export function VideoScriptComponent({ 
  topicTitle, 
  hindiInstruction, 
  englishModel, 
  hindiBridge, 
  confidenceBoost,
  onComplete
}: VideoScriptProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 45; // 45 seconds total

  // Segment timings
  const segments = [
    { name: "instruction", start: 0, end: 5, label: "📝 निर्देश", color: "bg-amber-500" },
    { name: "model", start: 5, end: 20, label: "🗣️ Model Answer", color: "bg-blue-500" },
    { name: "bridge", start: 20, end: 30, label: "🌉 Hindi Bridge", color: "bg-green-500" },
    { name: "confidence", start: 30, end: 45, label: "💪 Confidence Tip", color: "bg-purple-500" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            onComplete?.();
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, onComplete]);

  const getCurrentSegment = () => {
    return segments.find(s => currentTime >= s.start && currentTime < s.end) || segments[0];
  };

  const getSegmentText = () => {
    const segment = getCurrentSegment();
    switch(segment.name) {
      case "instruction": return hindiInstruction;
      case "model": return englishModel;
      case "bridge": return hindiBridge;
      case "confidence": return confidenceBoost;
      default: return "";
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = text.match(/[ा-ू]/) ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startVideo = () => {
    setIsPlaying(true);
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
    }
  };

  const pauseVideo = () => {
    setIsPlaying(false);
  };

  const resetVideo = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const currentSegment = getCurrentSegment();
  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
        <h3 className="font-bold flex items-center gap-2">
          🎥 Video-Assisted Speaking: {topicTitle}
        </h3>
        <p className="text-indigo-100 text-sm">वीडियो-सहायता से बोलने का अभ्यास</p>
      </div>

      {/* Video Preview Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
        {/* Animated Background */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          currentSegment.color,
          "opacity-10"
        )} />
        
        {/* Content Display */}
        <div className="relative z-10 text-center p-6 max-w-lg">
          <div className="text-4xl mb-4">
            {currentSegment.name === "instruction" && "📝"}
            {currentSegment.name === "model" && "🗣️"}
            {currentSegment.name === "bridge" && "🌉"}
            {currentSegment.name === "confidence" && "💪"}
          </div>
          <p className={cn(
            "text-lg font-medium transition-all",
            isPlaying ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
          )}>
            {isPlaying ? getSegmentText() : "▶️ Play बटन दबाएं शुरू करने के लिए"}
          </p>
        </div>

        {/* Time Display */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono">
          {currentTime}s / {totalDuration}s
        </div>

        {/* Segment Indicator */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-white text-sm font-medium",
            currentSegment.color
          )}>
            {currentSegment.label}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Segment Timeline */}
      <div className="flex">
        {segments.map((segment, index) => (
          <div 
            key={segment.name}
            className={cn(
              "flex-1 py-2 text-center text-xs font-medium transition-all",
              currentTime >= segment.start && currentTime < segment.end
                ? `${segment.color} text-white`
                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            )}
          >
            {segment.label}
          </div>
        ))}
      </div>

      {/* Current Segment Text */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Segment:</p>
            <p className="font-medium text-slate-900 dark:text-white">{getSegmentText()}</p>
          </div>
          <button
            onClick={() => speakText(getSegmentText())}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <Volume2 className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-center gap-4">
        {isPlaying ? (
          <button 
            onClick={pauseVideo}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
          >
            <Pause className="w-5 h-5" /> Pause
          </button>
        ) : (
          <button 
            onClick={startVideo}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <Play className="w-5 h-5" /> {currentTime > 0 ? "Resume" : "Play Video"}
          </button>
        )}
        <button 
          onClick={resetVideo}
          className="flex items-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>

      {/* Instructions */}
      <div className="px-4 pb-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
          <p className="text-sm text-amber-800 dark:text-amber-300 font-medium mb-2">📚 कैसे use करें:</p>
          <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
            <li>1. 45-सेकंड का video guide देखें</li>
            <li>2. English sentences repeat करें</li>
            <li>3. Frame-based speaking approach use करें</li>
            <li>4. अपना speaking prompt सोचें</li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          <p className="text-xs">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  );
}
