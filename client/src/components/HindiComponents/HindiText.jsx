import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
export function HindiExplanation(_a) {
    var englishText = _a.englishText, hindiExplanation = _a.hindiExplanation, tip = _a.tip, _b = _a.difficulty, difficulty = _b === void 0 ? 'medium' : _b;
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var playAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(englishText);
            utterance.lang = 'en-US';
            utterance.onend = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    var difficultyColors = {
        easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return (<Card className="hindi-explanation-card">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-lg font-semibold text-primary">{englishText}</p>
              <Button variant="ghost" size="sm" onClick={playAudio} disabled={isPlaying} className="h-8 w-8 p-0">
                <Volume2 className={"h-4 w-4 ".concat(isPlaying ? 'animate-pulse' : '')}/>
              </Button>
            </div>
            <p className="text-muted-foreground mb-2">{hindiExplanation}</p>
            {tip && (<div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0"/>
                <p className="text-sm text-blue-700 dark:text-blue-300">{tip}</p>
              </div>)}
          </div>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>);
}
export function CommonMistakeCard(_a) {
    var wrongSentence = _a.wrongSentence, correctSentence = _a.correctSentence, hindiExplanation = _a.hindiExplanation;
    return (<Card className="common-mistake-card">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="font-medium text-red-700 dark:text-red-300">गलत:</p>
              <p className="text-red-600 dark:text-red-400">{wrongSentence}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="font-medium text-green-700 dark:text-green-300">सही:</p>
              <p className="text-green-600 dark:text-green-400">{correctSentence}</p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>व्याख्या:</strong> {hindiExplanation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>);
}
export function PronunciationGuide(_a) {
    var englishWord = _a.englishWord, hindiComparison = _a.hindiComparison, soundTip = _a.soundTip;
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var playPronunciation = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(englishWord);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.onend = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    return (<Card className="pronunciation-guide-card">
      <CardContent className="pt-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl font-bold text-primary">{englishWord}</h3>
            <Button variant="ghost" size="sm" onClick={playPronunciation} disabled={isPlaying} className="h-8 w-8 p-0">
              <Volume2 className={"h-4 w-4 ".concat(isPlaying ? 'animate-pulse text-primary' : '')}/>
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>हिंदी तुलना:</strong> {hindiComparison}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <strong>टिप:</strong> {soundTip}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>);
}
export function QuickPronunciationTips(_a) {
    var className = _a.className;
    var tips = [
        {
            sound: 'TH',
            hindi: 'थ',
            tip: 'जीभ को दांतों के बीच रखें, हवा निकालें'
        },
        {
            sound: 'V',
            hindi: 'व',
            tip: 'ऊपरी दांत निचले होंठ को छूएं'
        },
        {
            sound: 'W',
            hindi: 'व',
            tip: 'होंठों को गोल करें, दांत न छुएं'
        },
        {
            sound: 'R',
            hindi: 'र',
            tip: 'जीभ को मोड़ें, तालू न छुएं'
        }
    ];
    return (<Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5"/>
          Quick Pronunciation Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tips.map(function (tip, index) { return (<div key={index} className="text-center p-3 bg-secondary/50 rounded-lg">
              <div className="text-lg font-bold text-primary mb-1">{tip.sound}</div>
              <div className="text-sm text-muted-foreground mb-1">≠ {tip.hindi}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">{tip.tip}</div>
            </div>); })}
        </div>
      </CardContent>
    </Card>);
}
