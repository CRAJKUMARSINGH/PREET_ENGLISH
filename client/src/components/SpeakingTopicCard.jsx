import { useState, useEffect } from "react";
import { Mic, MicOff, ChevronDown, ChevronUp, Lightbulb, MessageSquare, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoScriptComponent } from "./VideoScriptComponent";
export function SpeakingTopicCard(_a) {
    var title = _a.title, hindiTitle = _a.hindiTitle, difficulty = _a.difficulty, emoji = _a.emoji, category = _a.category, hindiThoughts = _a.hindiThoughts, sentenceFrames = _a.sentenceFrames, modelAnswer = _a.modelAnswer, freePrompt = _a.freePrompt, confidenceTip = _a.confidenceTip;
    var _b = useState(false), isExpanded = _b[0], setIsExpanded = _b[1];
    var _c = useState(false), isRecording = _c[0], setIsRecording = _c[1];
    var _d = useState(0), recordingTime = _d[0], setRecordingTime = _d[1];
    var _e = useState('think'), currentStep = _e[0], setCurrentStep = _e[1];
    // Parse JSON if needed
    var thoughts = typeof hindiThoughts === 'string' ? JSON.parse(hindiThoughts) : (hindiThoughts || []);
    var frames = typeof sentenceFrames === 'string' ? JSON.parse(sentenceFrames) : (sentenceFrames || []);
    var difficultyConfig = {
        Easy: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', emoji: '😊', duration: 30 },
        Medium: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', emoji: '🙂', duration: 60 },
        Hard: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', emoji: '🧠🔥', duration: 90 }
    };
    var normalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    var config = difficultyConfig[normalizedDifficulty] || difficultyConfig.Easy;
    // Recording timer effect
    useEffect(function () {
        var interval;
        if (isRecording) {
            interval = setInterval(function () {
                setRecordingTime(function (prev) {
                    if (prev >= config.duration) {
                        setIsRecording(false);
                        setCurrentStep('feedback');
                        return config.duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return function () { return clearInterval(interval); };
    }, [isRecording, config.duration]);
    var toggleRecording = function () {
        if (isRecording) {
            setIsRecording(false);
            setCurrentStep('feedback');
        }
        else {
            setIsRecording(true);
            setRecordingTime(0);
        }
    };
    var resetPractice = function () {
        setCurrentStep('think');
        setIsRecording(false);
        setRecordingTime(0);
    };
    return (<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-lg">
      {/* Header */}
      <div className="p-5 cursor-pointer" onClick={function () { return setIsExpanded(!isExpanded); }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
              <p className="text-sm text-muted-foreground">{hindiTitle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", config.color)}>
                  {config.emoji} {difficulty === 'Easy' ? 'आसान' : difficulty === 'Medium' ? 'मध्यम' : 'कठिन'}
                </span>
                <span className="text-xs text-muted-foreground">{category}</span>
              </div>
            </div>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground"/> : <ChevronDown className="w-5 h-5 text-muted-foreground"/>}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (<div className="border-t border-slate-100 dark:border-slate-800">
          {/* Step Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            {['think', 'frame', 'speak', 'feedback'].map(function (step, index) { return (<button key={step} onClick={function () { return setCurrentStep(step); }} className={cn("flex-1 py-3 text-sm font-medium transition-all", currentStep === step
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800")}>
                {index + 1}. {step === 'think' ? '🧠 सोचें' : step === 'frame' ? '🧩 फ्रेम' : step === 'speak' ? '🎤 बोलें' : '🌟 फीडबैक'}
              </button>); })}
          </div>

          <div className="p-5">
            {/* Step 1: Think in Hindi */}
            {currentStep === 'think' && (<div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-5 h-5"/>
                  <span className="font-medium">पहले हिंदी में सोचें:</span>
                </div>
                <ul className="space-y-2">
                  {thoughts.map(function (thought, i) { return (<li key={i} className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <span className="text-amber-500">•</span>
                      <span className="text-slate-700 dark:text-slate-300">{thought}</span>
                    </li>); })}
                </ul>
                <button onClick={function () { return setCurrentStep('frame'); }} className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all">
                  अगला: English Frames देखें →
                </button>
              </div>)}

            {/* Step 2: Sentence Frames */}
            {currentStep === 'frame' && (<div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <MessageSquare className="w-5 h-5"/>
                  <span className="font-medium">इन वाक्यों का उपयोग करें:</span>
                </div>
                <ul className="space-y-2">
                  {frames.map(function (frame, i) { return (<li key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-400">
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{frame}</span>
                    </li>); })}
                </ul>

                {modelAnswer && (<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-2">📝 उदाहरण उत्तर:</p>
                    <p className="text-slate-700 dark:text-slate-300 italic">"{modelAnswer}"</p>
                  </div>)}

                {/* Video Script Component */}
                <VideoScriptComponent topicTitle={title} hindiInstruction={"\u0906\u091C \u0939\u092E \"".concat(hindiTitle || title, "\" \u092A\u0930 English \u092C\u094B\u0932\u0947\u0902\u0917\u0947\u0964\n\u0921\u0930\u0928\u0947 \u0915\u0940 \u0915\u094B\u0908 \u091C\u093C\u0930\u0942\u0930\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964")} englishModel={modelAnswer || "Practice speaking about this topic using the sentence frames above."} hindiBridge={"\u0906\u092A \u092D\u0940 \u0907\u0938\u0940 structure \u092E\u0947\u0902 \u092C\u094B\u0932\u093F\u090F\u0964\nThink \u2192 Frame \u2192 Speak."} confidenceBoost={confidenceTip || "Don't worry about mistakes, just keep speaking!"}/>

                <button onClick={function () { return setCurrentStep('speak'); }} className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all">
                  अगला: बोलने का अभ्यास करें →
                </button>
              </div>)}

            {/* Step 3: Speak */}
            {currentStep === 'speak' && (<div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                  <p className="text-purple-700 dark:text-purple-300 font-medium mb-2">🎤 बोलने का समय!</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{freePrompt}</p>
                  <p className="text-xs text-muted-foreground mt-2">Target: {config.duration} seconds</p>
                </div>

                {/* Recording Indicator */}
                <div className="flex flex-col items-center gap-4">
                  <div className={cn("h-32 w-32 rounded-full flex items-center justify-center text-4xl transition-all", isRecording ? "bg-red-100 dark:bg-red-900/30 animate-pulse" : "bg-muted")}>
                    {isRecording ? recordingTime : emoji}
                  </div>

                  {isRecording && (<div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{recordingTime}s</div>
                      <div className="text-sm text-muted-foreground">of {config.duration}s</div>
                    </div>)}
                </div>

                <button onClick={toggleRecording} className={cn("w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all", isRecording
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90")}>
                  {isRecording ? (<>
                      <MicOff className="w-6 h-6"/>
                      रिकॉर्डिंग बंद करें
                    </>) : (<>
                      <Mic className="w-6 h-6"/>
                      बोलना शुरू करें
                    </>)}
                </button>

                {/* Confidence Tip */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">💡 आत्मविश्वास टिप:</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{confidenceTip}</p>
                </div>
              </div>)}

            {/* Step 4: Feedback */}
            {currentStep === 'feedback' && (<div className="space-y-4">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">बहुत बढ़िया!</h3>
                  <p className="text-muted-foreground mb-6">
                    आपने "{title}" पर बोलने का अभ्यास पूरा किया
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{recordingTime}s</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Speaking Time</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        <Award className="w-8 h-8 mx-auto"/>
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Completed</div>
                    </div>
                  </div>

                  {/* Positive Feedback */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 mb-6">
                    <p className="text-amber-700 dark:text-amber-300 font-medium">"{confidenceTip}"</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <button onClick={resetPractice} className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2">
                      <RotateCcw className="w-4 h-4"/>
                      फिर से अभ्यास करें
                    </button>
                    <button onClick={function () { return setIsExpanded(false); }} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                      Close
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>)}
    </div>);
}
