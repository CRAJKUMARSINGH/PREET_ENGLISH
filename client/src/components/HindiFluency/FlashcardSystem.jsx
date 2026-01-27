var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, ChevronLeft, ChevronRight, Volume2, ThumbsUp, ThumbsDown, Shuffle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
var flashcards = [
    {
        id: '1',
        english: 'Appreciate',
        hindi: 'सराहना करना',
        pronunciation: 'अप्रीशिएट',
        example: 'I appreciate your help.',
        exampleHindi: 'मैं आपकी मदद की सराहना करता हूं।',
        category: 'Professional',
        difficulty: 'medium'
    },
    {
        id: '2',
        english: 'Collaborate',
        hindi: 'सहयोग करना',
        pronunciation: 'कोलैबोरेट',
        example: 'Let\'s collaborate on this project.',
        exampleHindi: 'आइए इस प्रोजेक्ट पर सहयोग करें।',
        category: 'Business',
        difficulty: 'medium'
    },
    {
        id: '3',
        english: 'Implement',
        hindi: 'लागू करना',
        pronunciation: 'इम्प्लीमेंट',
        example: 'We need to implement this solution.',
        exampleHindi: 'हमें इस समाधान को लागू करना होगा।',
        category: 'Technical',
        difficulty: 'medium'
    },
    {
        id: '4',
        english: 'Opportunity',
        hindi: 'अवसर',
        pronunciation: 'ऑपर्चुनिटी',
        example: 'This is a great opportunity.',
        exampleHindi: 'यह एक बढ़िया अवसर है।',
        category: 'General',
        difficulty: 'easy'
    },
    {
        id: '5',
        english: 'Comprehensive',
        hindi: 'व्यापक',
        pronunciation: 'कॉम्प्रिहेंसिव',
        example: 'We need a comprehensive report.',
        exampleHindi: 'हमें एक व्यापक रिपोर्ट चाहिए।',
        category: 'Professional',
        difficulty: 'hard'
    },
    {
        id: '6',
        english: 'Acknowledge',
        hindi: 'स्वीकार करना',
        pronunciation: 'एक्नॉलेज',
        example: 'Please acknowledge receipt of this email.',
        exampleHindi: 'कृपया इस ईमेल की प्राप्ति स्वीकार करें।',
        category: 'Business',
        difficulty: 'medium'
    },
    {
        id: '7',
        english: 'Facilitate',
        hindi: 'सुविधा प्रदान करना',
        pronunciation: 'फैसिलिटेट',
        example: 'I will facilitate the meeting.',
        exampleHindi: 'मैं मीटिंग की सुविधा प्रदान करूंगा।',
        category: 'Professional',
        difficulty: 'hard'
    },
    {
        id: '8',
        english: 'Prioritize',
        hindi: 'प्राथमिकता देना',
        pronunciation: 'प्रायोरिटाइज़',
        example: 'We need to prioritize our tasks.',
        exampleHindi: 'हमें अपने कार्यों को प्राथमिकता देनी होगी।',
        category: 'Business',
        difficulty: 'medium'
    }
];
export function FlashcardSystem() {
    var _a = useState(0), currentIndex = _a[0], setCurrentIndex = _a[1];
    var _b = useState(false), isFlipped = _b[0], setIsFlipped = _b[1];
    var _c = useState(new Set()), knownCards = _c[0], setKnownCards = _c[1];
    var _d = useState(new Set()), reviewCards = _d[0], setReviewCards = _d[1];
    var _e = useState(flashcards), shuffledCards = _e[0], setShuffledCards = _e[1];
    var currentCard = shuffledCards[currentIndex];
    var progress = ((currentIndex + 1) / shuffledCards.length) * 100;
    var playAudio = function () {
        if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(currentCard.english);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    var nextCard = function () {
        setIsFlipped(false);
        if (currentIndex < shuffledCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    var prevCard = function () {
        setIsFlipped(false);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    var markAsKnown = function () {
        setKnownCards(function (prev) { return new Set(__spreadArray(__spreadArray([], Array.from(prev), true), [currentCard.id], false)); });
        var newReviewCards = new Set(Array.from(reviewCards));
        newReviewCards.delete(currentCard.id);
        setReviewCards(newReviewCards);
        nextCard();
    };
    var markForReview = function () {
        setReviewCards(function (prev) { return new Set(__spreadArray(__spreadArray([], Array.from(prev), true), [currentCard.id], false)); });
        var newKnownCards = new Set(Array.from(knownCards));
        newKnownCards.delete(currentCard.id);
        setKnownCards(newKnownCards);
        nextCard();
    };
    var shuffleCards = function () {
        var shuffled = __spreadArray([], flashcards, true).sort(function () { return Math.random() - 0.5; });
        setShuffledCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
    };
    var resetProgress = function () {
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnownCards(new Set());
        setReviewCards(new Set());
        setShuffledCards(flashcards);
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (<div className="flashcard-system space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500"/>
            Vocabulary Flashcards
            <span className="text-sm font-normal text-muted-foreground">
              (शब्दावली फ्लैशकार्ड)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ Known: {knownCards.size}</span>
              <span className="text-orange-600">↻ Review: {reviewCards.size}</span>
              <span className="text-gray-600">Remaining: {shuffledCards.length - knownCards.size - reviewCards.size}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={shuffleCards}>
                <Shuffle className="w-4 h-4 mr-1"/>
                Shuffle
              </Button>
              <Button variant="outline" size="sm" onClick={resetProgress}>
                <RotateCcw className="w-4 h-4 mr-1"/>
                Reset
              </Button>
            </div>
          </div>
          <Progress value={progress}/>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Card {currentIndex + 1} of {shuffledCards.length}
          </div>
        </CardContent>
      </Card>

      {/* Flashcard */}
      <div className="flashcard-container cursor-pointer" onClick={function () { return setIsFlipped(!isFlipped); }}>
        <Card className={cn("min-h-[300px] transition-all duration-300", isFlipped ? "bg-blue-50 dark:bg-blue-950/20" : "bg-white dark:bg-gray-900")}>
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px]">
            {!isFlipped ? (
        // Front of card - English
        <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentCard.category}</Badge>
                </div>
                
                <h2 className="text-4xl font-bold mb-4">{currentCard.english}</h2>
                
                <Button variant="outline" size="sm" onClick={function (e) { e.stopPropagation(); playAudio(); }}>
                  <Volume2 className="w-4 h-4 mr-2"/>
                  Listen
                </Button>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Click to see Hindi meaning
                </p>
              </div>) : (
        // Back of card - Hindi
        <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {currentCard.hindi}
                </h2>
                <p className="text-lg text-purple-600 dark:text-purple-400 mb-4">
                  ({currentCard.pronunciation})
                </p>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-4">
                  <p className="font-medium mb-1">Example:</p>
                  <p className="text-sm">{currentCard.example}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {currentCard.exampleHindi}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Click to flip back
                </p>
              </div>)}
          </CardContent>
        </Card>
      </div>

      {/* Navigation and Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
          <ChevronLeft className="w-4 h-4 mr-1"/>
          Previous
        </Button>

        <div className="flex gap-3">
          <Button variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50" onClick={markForReview}>
            <ThumbsDown className="w-4 h-4 mr-2"/>
            Review Again
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={markAsKnown}>
            <ThumbsUp className="w-4 h-4 mr-2"/>
            I Know This
          </Button>
        </div>

        <Button variant="outline" onClick={nextCard} disabled={currentIndex === shuffledCards.length - 1}>
          Next
          <ChevronRight className="w-4 h-4 ml-1"/>
        </Button>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{knownCards.size}</div>
              <div className="text-sm text-muted-foreground">Mastered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{reviewCards.size}</div>
              <div className="text-sm text-muted-foreground">Need Review</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((knownCards.size / shuffledCards.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Mastery Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}
