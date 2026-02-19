// Week 10: FSRS Spaced Repetition Algorithm
export class FSRS {
  private w = [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61];

  calculateNextReview(
    stability: number,
    difficulty: number,
    rating: 1 | 2 | 3 | 4 // 1=again, 2=hard, 3=good, 4=easy
  ): { nextReview: Date; newStability: number; newDifficulty: number } {
    const newDifficulty = this.updateDifficulty(difficulty, rating);
    const newStability = this.updateStability(stability, difficulty, rating);
    const interval = this.calculateInterval(newStability);
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return { nextReview, newStability, newDifficulty };
  }

  private updateDifficulty(d: number, rating: number): number {
    const newD = d - this.w[6] * (rating - 3);
    return Math.max(1, Math.min(10, newD));
  }

  private updateStability(s: number, d: number, rating: number): number {
    if (rating === 1) {
      return s * Math.exp(this.w[11] * (d - 1) * Math.pow(s, -this.w[12]));
    }
    return s * (1 + Math.exp(this.w[8]) * (11 - d) * Math.pow(s, -this.w[9]) * (Math.exp((1 - rating) * this.w[10]) - 1));
  }

  private calculateInterval(stability: number): number {
    return Math.round(stability * 9 * (1 / 0.9 - 1));
  }
}
