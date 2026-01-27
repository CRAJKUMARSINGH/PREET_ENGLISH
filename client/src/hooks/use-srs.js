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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useCallback } from "react";
/**
 * SM-2 Algorithm Implementation
 * @param card - The card being reviewed
 * @param quality - 0-5 rating (0=complete blackout, 5=perfect response)
 * @returns Updated card with new interval and ease factor
 */
function calculateNextReview(card, quality) {
    var easeFactor = card.easeFactor, interval = card.interval, repetitions = card.repetitions;
    // If quality < 3, reset the card (failed recall)
    if (quality < 3) {
        repetitions = 0;
        interval = 1;
    }
    else {
        // Successful recall - increase interval
        if (repetitions === 0) {
            interval = 1;
        }
        else if (repetitions === 1) {
            interval = 6;
        }
        else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    }
    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    var nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
    return __assign(__assign({}, card), { easeFactor: easeFactor, interval: interval, repetitions: repetitions, nextReviewDate: nextReviewDate, lastReviewDate: new Date() });
}
// Sample vocabulary for SRS
var defaultVocabulary = [
    { id: "1", word: "accomplish", meaning: "to achieve or complete successfully", hindiMeaning: "पूरा करना" },
    { id: "2", word: "ambiguous", meaning: "having more than one meaning", hindiMeaning: "अस्पष्ट" },
    { id: "3", word: "collaborate", meaning: "to work together", hindiMeaning: "सहयोग करना" },
    { id: "4", word: "diligent", meaning: "showing care in work", hindiMeaning: "मेहनती" },
    { id: "5", word: "eloquent", meaning: "fluent and persuasive in speaking", hindiMeaning: "वाक्पटु" },
    { id: "6", word: "feasible", meaning: "possible to do easily", hindiMeaning: "संभव" },
    { id: "7", word: "genuine", meaning: "truly what it is said to be", hindiMeaning: "असली" },
    { id: "8", word: "hesitate", meaning: "to pause before acting", hindiMeaning: "हिचकिचाना" },
    { id: "9", word: "inevitable", meaning: "certain to happen", hindiMeaning: "अपरिहार्य" },
    { id: "10", word: "justify", meaning: "to show to be right", hindiMeaning: "न्यायसंगत ठहराना" },
];
/**
 * Initialize a new SRS card
 */
function initializeCard(vocab) {
    return __assign(__assign({}, vocab), { easeFactor: 2.5, interval: 0, repetitions: 0, nextReviewDate: new Date(), lastReviewDate: null });
}
/**
 * Custom hook for Spaced Repetition System
 */
export function useSRS() {
    var _a = useState(function () {
        // Load from localStorage or initialize
        var saved = localStorage.getItem("srs-state");
        if (saved) {
            var parsed = JSON.parse(saved);
            return __assign(__assign({}, parsed), { cards: parsed.cards.map(function (c) { return (__assign(__assign({}, c), { nextReviewDate: new Date(c.nextReviewDate), lastReviewDate: c.lastReviewDate ? new Date(c.lastReviewDate) : null })); }), dueCards: [] });
        }
        return {
            cards: defaultVocabulary.map(initializeCard),
            dueCards: [],
            completedToday: 0,
            streak: 0,
        };
    }), state = _a[0], setState = _a[1];
    // Get cards due for review
    var getDueCards = useCallback(function () {
        var now = new Date();
        return state.cards.filter(function (card) { return new Date(card.nextReviewDate) <= now; });
    }, [state.cards]);
    // Review a card
    var reviewCard = useCallback(function (cardId, quality) {
        setState(function (prev) {
            var cardIndex = prev.cards.findIndex(function (c) { return c.id === cardId; });
            if (cardIndex === -1)
                return prev;
            var updatedCard = calculateNextReview(prev.cards[cardIndex], quality);
            var newCards = __spreadArray([], prev.cards, true);
            newCards[cardIndex] = updatedCard;
            var newState = __assign(__assign({}, prev), { cards: newCards, completedToday: prev.completedToday + 1 });
            // Save to localStorage
            localStorage.setItem("srs-state", JSON.stringify(newState));
            return newState;
        });
    }, []);
    // Add a new word to the SRS system
    var addWord = useCallback(function (word, meaning, hindiMeaning) {
        setState(function (prev) {
            var newCard = initializeCard({
                id: Date.now().toString(),
                word: word,
                meaning: meaning,
                hindiMeaning: hindiMeaning,
            });
            var newState = __assign(__assign({}, prev), { cards: __spreadArray(__spreadArray([], prev.cards, true), [newCard], false) });
            localStorage.setItem("srs-state", JSON.stringify(newState));
            return newState;
        });
    }, []);
    // Get statistics
    var getStats = useCallback(function () {
        var dueCards = getDueCards();
        var masteredCards = state.cards.filter(function (c) { return c.repetitions >= 5; });
        var learningCards = state.cards.filter(function (c) { return c.repetitions > 0 && c.repetitions < 5; });
        var newCards = state.cards.filter(function (c) { return c.repetitions === 0; });
        return {
            total: state.cards.length,
            due: dueCards.length,
            mastered: masteredCards.length,
            learning: learningCards.length,
            new: newCards.length,
            completedToday: state.completedToday,
            streak: state.streak,
        };
    }, [state, getDueCards]);
    // Reset daily stats (call at midnight)
    var resetDaily = useCallback(function () {
        setState(function (prev) {
            var newState = __assign(__assign({}, prev), { completedToday: 0, streak: prev.completedToday > 0 ? prev.streak + 1 : 0 });
            localStorage.setItem("srs-state", JSON.stringify(newState));
            return newState;
        });
    }, []);
    return {
        cards: state.cards,
        dueCards: getDueCards(),
        reviewCard: reviewCard,
        addWord: addWord,
        getStats: getStats,
        resetDaily: resetDaily,
    };
}
