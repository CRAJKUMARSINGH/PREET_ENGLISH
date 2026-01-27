import { useState, useCallback } from "react";

/**
 * Spaced Repetition System (SRS) Hook
 * Implements the SM-2 algorithm for optimal memory retention
 * Inspired by Memrise's proven SRS approach
 */

interface SRSCard {
    id: string;
    word: string;
    meaning: string;
    hindiMeaning: string;
    easeFactor: number; // Default 2.5
    interval: number; // Days until next review
    repetitions: number;
    nextReviewDate: Date;
    lastReviewDate: Date | null;
}

interface SRSState {
    cards: SRSCard[];
    dueCards: SRSCard[];
    completedToday: number;
    streak: number;
}

// Quality ratings for SM-2 algorithm
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * SM-2 Algorithm Implementation
 * @param card - The card being reviewed
 * @param quality - 0-5 rating (0=complete blackout, 5=perfect response)
 * @returns Updated card with new interval and ease factor
 */
function calculateNextReview(card: SRSCard, quality: ReviewQuality): SRSCard {
    let { easeFactor, interval, repetitions } = card;

    // If quality < 3, reset the card (failed recall)
    if (quality < 3) {
        repetitions = 0;
        interval = 1;
    } else {
        // Successful recall - increase interval
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    }

    // Update ease factor based on quality
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
        ...card,
        easeFactor,
        interval,
        repetitions,
        nextReviewDate,
        lastReviewDate: new Date(),
    };
}

// Sample vocabulary for SRS
const defaultVocabulary: Omit<SRSCard, 'easeFactor' | 'interval' | 'repetitions' | 'nextReviewDate' | 'lastReviewDate'>[] = [
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
function initializeCard(vocab: typeof defaultVocabulary[0]): SRSCard {
    return {
        ...vocab,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date(),
        lastReviewDate: null,
    };
}

/**
 * Custom hook for Spaced Repetition System
 */
export function useSRS() {
    const [state, setState] = useState<SRSState>(() => {
        // Load from localStorage or initialize
        const saved = localStorage.getItem("srs-state");
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                ...parsed,
                cards: parsed.cards.map((c: SRSCard) => ({
                    ...c,
                    nextReviewDate: new Date(c.nextReviewDate),
                    lastReviewDate: c.lastReviewDate ? new Date(c.lastReviewDate) : null,
                })),
                dueCards: [],
            };
        }
        return {
            cards: defaultVocabulary.map(initializeCard),
            dueCards: [],
            completedToday: 0,
            streak: 0,
        };
    });

    // Get cards due for review
    const getDueCards = useCallback(() => {
        const now = new Date();
        return state.cards.filter(
            (card) => new Date(card.nextReviewDate) <= now
        );
    }, [state.cards]);

    // Review a card
    const reviewCard = useCallback((cardId: string, quality: ReviewQuality) => {
        setState((prev) => {
            const cardIndex = prev.cards.findIndex((c) => c.id === cardId);
            if (cardIndex === -1) return prev;

            const updatedCard = calculateNextReview(prev.cards[cardIndex], quality);
            const newCards = [...prev.cards];
            newCards[cardIndex] = updatedCard;

            const newState = {
                ...prev,
                cards: newCards,
                completedToday: prev.completedToday + 1,
            };

            // Save to localStorage
            localStorage.setItem("srs-state", JSON.stringify(newState));

            return newState;
        });
    }, []);

    // Add a new word to the SRS system
    const addWord = useCallback((word: string, meaning: string, hindiMeaning: string) => {
        setState((prev) => {
            const newCard = initializeCard({
                id: Date.now().toString(),
                word,
                meaning,
                hindiMeaning,
            });

            const newState = {
                ...prev,
                cards: [...prev.cards, newCard],
            };

            localStorage.setItem("srs-state", JSON.stringify(newState));
            return newState;
        });
    }, []);

    // Get statistics
    const getStats = useCallback(() => {
        const dueCards = getDueCards();
        const masteredCards = state.cards.filter((c) => c.repetitions >= 5);
        const learningCards = state.cards.filter(
            (c) => c.repetitions > 0 && c.repetitions < 5
        );
        const newCards = state.cards.filter((c) => c.repetitions === 0);

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
    const resetDaily = useCallback(() => {
        setState((prev) => {
            const newState = {
                ...prev,
                completedToday: 0,
                streak: prev.completedToday > 0 ? prev.streak + 1 : 0,
            };
            localStorage.setItem("srs-state", JSON.stringify(newState));
            return newState;
        });
    }, []);

    return {
        cards: state.cards,
        dueCards: getDueCards(),
        reviewCard,
        addWord,
        getStats,
        resetDaily,
    };
}

export type { SRSCard, SRSState };
