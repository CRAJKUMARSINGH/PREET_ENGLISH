/**
 * Spaced Repetition System (SRS) using modified SM-2 algorithm
 */

export interface SRSStats {
    interval: number;
    repetition: number;
    easeFactor: number;
}

/**
 * SM-2 Algorithm Implementation
 * @param quality 0-5 (0: total blackout, 5: perfect response)
 * @param previousStats current interval, repetition, and ease factor
 * @returns updated stats and next review date
 */
export function calculateSRS(quality: number, previousStats: SRSStats): { stats: SRSStats; nextReviewDate: Date } {
    let { interval, repetition, easeFactor } = previousStats;

    // Quality < 3 means the word was forgotten - reset repetition
    if (quality < 3) {
        repetition = 0;
        interval = 1;
    } else {
        // Correct response
        if (repetition === 0) {
            interval = 1;
        } else if (repetition === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * (easeFactor / 100));
        }
        repetition++;
    }

    // Update ease factor (EF' = EF + (0.1 - (5-q)*(0.08 + (5-q)*0.02)))
    // We use integers for easeFactor (e.g., 250 instead of 2.5) to avoid floating point issues in DB
    const efChange = (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)) * 100;
    easeFactor = Math.max(130, Math.floor(easeFactor + efChange));

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
        stats: {
            interval,
            repetition,
            easeFactor,
        },
        nextReviewDate,
    };
}
