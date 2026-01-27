import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, BookOpen, Lightbulb, Star } from 'lucide-react';
export function HindiLearningCard(_a) {
    var englishSentence = _a.englishSentence, hindiMeaning = _a.hindiMeaning, pronunciation = _a.pronunciation, difficulty = _a.difficulty, category = _a.category, _b = _a.tips, tips = _b === void 0 ? [] : _b, _c = _a.examples, examples = _c === void 0 ? [] : _c;
    var _d = useState(false), isPlaying = _d[0], setIsPlaying = _d[1];
    var _e = useState(false), showDetails = _e[0], setShowDetails = _e[1];
    var playAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(englishSentence);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.onend = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    var difficultyColors = {
        easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return (<Card className="hindi-learning-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary"/>
            <Badge variant="outline">{category}</Badge>
          </div>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Content */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="text-lg font-semibold text-primary mb-1">
                {englishSentence}
              </p>
              <p className="text-muted-foreground">
                <strong>हिंदी:</strong> {hindiMeaning}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <strong>उच्चारण:</strong> {pronunciation}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={playAudio} disabled={isPlaying} className="h-8 w-8 p-0 flex-shrink-0">
              <Volume2 className={"h-4 w-4 ".concat(isPlaying ? 'animate-pulse text-primary' : '')}/>
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        {tips.length > 0 && (<div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-yellow-500"/>
              Tips:
            </h4>
            <ul className="space-y-1">
              {tips.map(function (tip, index) { return (<li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0"/>
                  {tip}
                </li>); })}
            </ul>
          </div>)}

        {/* Examples Section */}
        {examples.length > 0 && (<div className="space-y-2">
            <Button variant="ghost" size="sm" onClick={function () { return setShowDetails(!showDetails); }} className="text-sm p-0 h-auto">
              {showDetails ? 'Hide' : 'Show'} Examples
            </Button>
            
            {showDetails && (<div className="space-y-2 p-3 bg-secondary/30 rounded-lg">
                {examples.map(function (example, index) { return (<div key={index} className="space-y-1">
                    <p className="text-sm font-medium">{example.english}</p>
                    <p className="text-sm text-muted-foreground">{example.hindi}</p>
                  </div>); })}
              </div>)}
          </div>)}
      </CardContent>
    </Card>);
}
export function GrammarExplanationCard(_a) {
    var rule = _a.rule, hindiExplanation = _a.hindiExplanation, englishExamples = _a.englishExamples, hindiComparison = _a.hindiComparison, _b = _a.commonMistakes, commonMistakes = _b === void 0 ? [] : _b;
    var _c = useState(false), showExamples = _c[0], setShowExamples = _c[1];
    return (<Card className="grammar-explanation-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary"/>
          {rule}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Hindi Explanation */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>हिंदी में समझें:</strong> {hindiExplanation}
          </p>
        </div>

        {/* Hindi Comparison */}
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-purple-700 dark:text-purple-300">
            <strong>हिंदी से तुलना:</strong> {hindiComparison}
          </p>
        </div>

        {/* Examples Toggle */}
        <Button variant="outline" onClick={function () { return setShowExamples(!showExamples); }} className="w-full">
          {showExamples ? 'Hide' : 'Show'} Examples
        </Button>

        {/* Examples */}
        {showExamples && (<div className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 dark:text-green-400">
                सही उदाहरण:
              </h4>
              {englishExamples.map(function (example, index) { return (<div key={index} className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-green-700 dark:text-green-300">{example}</p>
                </div>); })}
            </div>

            {commonMistakes.length > 0 && (<div className="space-y-2">
                <h4 className="font-semibold text-red-600 dark:text-red-400">
                  आम गलतियां:
                </h4>
                {commonMistakes.map(function (mistake, index) { return (<div key={index} className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="text-red-700 dark:text-red-300">{mistake}</p>
                  </div>); })}
              </div>)}
          </div>)}
      </CardContent>
    </Card>);
}
