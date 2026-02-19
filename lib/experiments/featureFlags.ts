// Week 13: Feature Flags & A/B Testing
export class FeatureFlags {
  private flags: Map<string, boolean> = new Map();

  constructor() {
    this.flags.set('new_ui_design', false);
    this.flags.set('ai_tutor_v2', true);
    this.flags.set('gamification_v2', false);
  }

  isEnabled(flagName: string, userId?: string): boolean {
    // A/B testing logic
    if (userId) {
      const hash = this.hashUserId(userId);
      return hash % 2 === 0; // 50/50 split
    }
    return this.flags.get(flagName) || false;
  }

  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}
