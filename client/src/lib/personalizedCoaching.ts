/**
 * Personalized Coaching Service
 * Provides adaptive difficulty adjustment, weak area identification, and targeted practice recommendations
 * specifically designed for Hindi speakers learning English
 */

interface UserPerformanceData {
  userId: number;
  sessionHistory: SpeakingSessionData[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  weakPhonemes: string[];
  strongAreas: string[];
  totalPracticeMinutes: number;
  improvementRate: number;
  lastAssessmentDate?: string;
}

interface SpeakingSessionData {
  id: number;
  sessionType: string;
  accuracy: number;
  pronunciationScore: number;
  fluencyScore: number;
  phonemeErrors: string[];
  practiceTime: number;
  createdAt: string;
}

interface WeakArea {
  area: string;
  severity: 'low' | 'medium' | 'high';
  frequency: number;
  lastPracticed?: string;
  improvementTrend: 'improving' | 'stable' | 'declining';
  recommendedPracticeTime: number;
  resources: PracticeResource[];
}

interface PracticeResource {
  type: 'exercise' | 'audio' | 'video' | 'reading';
  title: string;
  hindiTitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  url?: string;
}

interface DifficultyAdjustment {
  currentDifficulty: 'beginner' | 'intermediate' | 'advanced';
  recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
  reason: string;
  hindiReason: string;
  confidence: number;
  adjustmentType: 'increase' | 'decrease' | 'maintain';
}

interface TargetedPracticeRecommendation {
  phoneme: string;
  priority: 'high' | 'medium' | 'low';
  practiceType: 'minimal_pairs' | 'tongue_twisters' | 'conversation' | 'reading_aloud';
  exercises: PracticeExercise[];
  estimatedImprovementTime: string;
  successMetrics: string[];
}

interface PracticeExercise {
  id: string;
  title: string;
  hindiTitle: string;
  instructions: string;
  hindiInstructions: string;
  content: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusPhoneme: string;
  estimatedTime: number;
}

interface ProgressBasedUnlock {
  contentType: 'lesson' | 'scenario' | 'exercise';
  contentId: number;
  title: string;
  hindiTitle: string;
  unlockedBy: string;
  requirements: UnlockRequirement[];
}

interface UnlockRequirement {
  type: 'accuracy_threshold' | 'practice_time' | 'phoneme_mastery' | 'session_count';
  value: number;
  description: string;
  hindiDescription: string;
}

export class PersonalizedCoachingService {
  private readonly phonemePracticeExercises: Record<string, PracticeExercise[]> = {
    'th_sounds': [
      {
        id: 'th_minimal_pairs_1',
        title: 'TH vs D Minimal Pairs',
        hindiTitle: 'TH बनाम D न्यूनतम जोड़े',
        instructions: 'Practice distinguishing between TH and D sounds',
        hindiInstructions: 'TH और D ध्वनियों के बीच अंतर का अभ्यास करें',
        content: ['think - dink', 'thank - dank', 'thick - dick', 'thaw - daw'],
        difficulty: 'beginner',
        focusPhoneme: 'th',
        estimatedTime: 5
      },
      {
        id: 'th_tongue_twisters_1',
        title: 'TH Tongue Twisters',
        hindiTitle: 'TH जीभ घुमाने वाले वाक्य',
        instructions: 'Practice TH sounds with challenging phrases',
        hindiInstructions: 'चुनौतीपूर्ण वाक्यों के साथ TH ध्वनियों का अभ्यास करें',
        content: [
          'Three thin thieves thought a thousand thoughts',
          'The thirty-three thieves thought they thrilled the throne',
          'Thick thistle sticks'
        ],
        difficulty: 'intermediate',
        focusPhoneme: 'th',
        estimatedTime: 8
      }
    ],
    'v_w_sounds': [
      {
        id: 'vw_lip_position_1',
        title: 'V vs W Lip Position Practice',
        hindiTitle: 'V बनाम W होंठ स्थिति अभ्यास',
        instructions: 'Focus on correct lip positioning for V and W sounds',
        hindiInstructions: 'V और W ध्वनियों के लिए सही होंठ स्थिति पर ध्यान दें',
        content: ['very - wary', 'vest - west', 'vine - wine', 'veil - wail'],
        difficulty: 'beginner',
        focusPhoneme: 'v_w',
        estimatedTime: 6
      }
    ],
    'r_sounds': [
      {
        id: 'r_tongue_position_1',
        title: 'English R Tongue Position',
        hindiTitle: 'अंग्रेजी R जीभ की स्थिति',
        instructions: 'Practice curling tongue for English R sound',
        hindiInstructions: 'अंग्रेजी R ध्वनि के लिए जीभ मोड़ने का अभ्यास करें',
        content: ['red', 'right', 'run', 'car', 'far', 'river'],
        difficulty: 'intermediate',
        focusPhoneme: 'r',
        estimatedTime: 7
      }
    ]
  };

  private readonly difficultyThresholds = {
    beginner_to_intermediate: {
      minAccuracy: 75,
      minSessions: 10,
      minPracticeTime: 300, // 5 hours
      maxWeakAreas: 2
    },
    intermediate_to_advanced: {
      minAccuracy: 85,
      minSessions: 25,
      minPracticeTime: 900, // 15 hours
      maxWeakAreas: 1
    }
  };

  private readonly practiceResources: Record<string, PracticeResource[]> = {
    'th_sounds': [
      {
        type: 'exercise',
        title: 'TH Sound Drills',
        hindiTitle: 'TH ध्वनि अभ्यास',
        description: 'Interactive exercises for mastering TH sounds',
        difficulty: 'beginner',
        estimatedTime: 10
      },
      {
        type: 'audio',
        title: 'Native Speaker TH Examples',
        hindiTitle: 'देशी वक्ता TH उदाहरण',
        description: 'Listen to native speakers pronouncing TH words',
        difficulty: 'beginner',
        estimatedTime: 5
      }
    ],
    'v_w_sounds': [
      {
        type: 'video',
        title: 'Lip Position for V and W',
        hindiTitle: 'V और W के लिए होंठ की स्थिति',
        description: 'Visual guide to correct lip positioning',
        difficulty: 'beginner',
        estimatedTime: 8
      }
    ]
  };

  /**
   * Identify weak areas that need focused practice
   */
  identifyWeakAreas(performanceData: UserPerformanceData): WeakArea[] {
    const weakAreas: WeakArea[] = [];
    
    // Analyze phoneme frequency in errors
    const phonemeErrorCount: Record<string, number> = {};
    const phonemeLastPracticed: Record<string, string> = {};
    
    performanceData.sessionHistory.forEach(session => {
      session.phonemeErrors.forEach(phoneme => {
        phonemeErrorCount[phoneme] = (phonemeErrorCount[phoneme] || 0) + 1;
        phonemeLastPracticed[phoneme] = session.createdAt;
      });
    });

    // Convert to weak areas with severity assessment
    Object.entries(phonemeErrorCount).forEach(([phoneme, count]) => {
      const frequency = count / performanceData.sessionHistory.length;
      let severity: 'low' | 'medium' | 'high' = 'low';
      
      if (frequency > 0.6) severity = 'high';
      else if (frequency > 0.3) severity = 'medium';

      // Determine improvement trend
      const recentSessions = performanceData.sessionHistory.slice(-5);
      const recentErrors = recentSessions.filter(s => s.phonemeErrors.includes(phoneme)).length;
      const olderSessions = performanceData.sessionHistory.slice(-10, -5);
      const olderErrors = olderSessions.filter(s => s.phonemeErrors.includes(phoneme)).length;
      
      let improvementTrend: 'improving' | 'stable' | 'declining' = 'stable';
      if (recentErrors < olderErrors) improvementTrend = 'improving';
      else if (recentErrors > olderErrors) improvementTrend = 'declining';

      weakAreas.push({
        area: phoneme,
        severity,
        frequency,
        lastPracticed: phonemeLastPracticed[phoneme],
        improvementTrend,
        recommendedPracticeTime: severity === 'high' ? 15 : severity === 'medium' ? 10 : 5,
        resources: this.practiceResources[phoneme] || []
      });
    });

    // Sort by severity and frequency
    return weakAreas.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return b.frequency - a.frequency;
    });
  }

  /**
   * Adjust difficulty based on user performance and confidence metrics
   */
  adjustDifficulty(performanceData: UserPerformanceData): DifficultyAdjustment {
    const recentSessions = performanceData.sessionHistory.slice(-10);
    const averageAccuracy = recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / recentSessions.length;
    const weakAreas = this.identifyWeakAreas(performanceData);
    
    const currentLevel = performanceData.currentLevel;
    let recommendedLevel = currentLevel;
    let adjustmentType: 'increase' | 'decrease' | 'maintain' = 'maintain';
    let reason = '';
    let hindiReason = '';
    let confidence = 0.5;

    // Check for level increase
    if (currentLevel === 'beginner') {
      const thresholds = this.difficultyThresholds.beginner_to_intermediate;
      if (averageAccuracy >= thresholds.minAccuracy &&
          performanceData.sessionHistory.length >= thresholds.minSessions &&
          performanceData.totalPracticeMinutes >= thresholds.minPracticeTime &&
          weakAreas.filter(w => w.severity === 'high').length <= thresholds.maxWeakAreas) {
        
        recommendedLevel = 'intermediate';
        adjustmentType = 'increase';
        reason = 'Consistent high performance indicates readiness for intermediate level';
        hindiReason = 'लगातार अच्छा प्रदर्शन मध्यम स्तर की तैयारी दर्शाता है';
        confidence = 0.8;
      }
    } else if (currentLevel === 'intermediate') {
      const thresholds = this.difficultyThresholds.intermediate_to_advanced;
      if (averageAccuracy >= thresholds.minAccuracy &&
          performanceData.sessionHistory.length >= thresholds.minSessions &&
          performanceData.totalPracticeMinutes >= thresholds.minPracticeTime &&
          weakAreas.filter(w => w.severity === 'high').length <= thresholds.maxWeakAreas) {
        
        recommendedLevel = 'advanced';
        adjustmentType = 'increase';
        reason = 'Excellent progress qualifies for advanced level challenges';
        hindiReason = 'उत्कृष्ट प्रगति उन्नत स्तर की चुनौतियों के लिए योग्य बनाती है';
        confidence = 0.9;
      }
    }

    // Check for level decrease
    if (averageAccuracy < 60 && weakAreas.filter(w => w.severity === 'high').length > 3) {
      if (currentLevel === 'advanced') {
        recommendedLevel = 'intermediate';
        adjustmentType = 'decrease';
        reason = 'Focus on fundamentals before advancing further';
        hindiReason = 'आगे बढ़ने से पहले बुनियादी बातों पर ध्यान दें';
        confidence = 0.7;
      } else if (currentLevel === 'intermediate') {
        recommendedLevel = 'beginner';
        adjustmentType = 'decrease';
        reason = 'Strengthen basic pronunciation skills first';
        hindiReason = 'पहले बुनियादी उच्चारण कौशल को मजबूत करें';
        confidence = 0.7;
      }
    }

    return {
      currentDifficulty: currentLevel,
      recommendedDifficulty: recommendedLevel,
      reason,
      hindiReason,
      confidence,
      adjustmentType
    };
  }

  /**
   * Create targeted practice recommendations for specific phonemes
   */
  createTargetedPracticeRecommendations(weakAreas: WeakArea[]): TargetedPracticeRecommendation[] {
    const recommendations: TargetedPracticeRecommendation[] = [];

    weakAreas.slice(0, 3).forEach(weakArea => { // Focus on top 3 weak areas
      const exercises = this.phonemePracticeExercises[weakArea.area] || [];
      
      let practiceType: 'minimal_pairs' | 'tongue_twisters' | 'conversation' | 'reading_aloud' = 'minimal_pairs';
      if (weakArea.severity === 'high') {
        practiceType = 'minimal_pairs'; // Start with basics
      } else if (weakArea.severity === 'medium') {
        practiceType = 'tongue_twisters'; // Add complexity
      } else {
        practiceType = 'conversation'; // Practice in context
      }

      const estimatedTime = weakArea.severity === 'high' ? '2-3 weeks' : 
                           weakArea.severity === 'medium' ? '1-2 weeks' : '3-5 days';

      recommendations.push({
        phoneme: weakArea.area,
        priority: weakArea.severity,
        practiceType,
        exercises,
        estimatedImprovementTime: estimatedTime,
        successMetrics: [
          `Achieve 80%+ accuracy in ${weakArea.area} exercises`,
          `Complete 5 practice sessions without errors`,
          `Use correctly in conversation practice`
        ]
      });
    });

    return recommendations;
  }

  /**
   * Determine what content to unlock based on progress
   */
  determineProgressBasedUnlocks(performanceData: UserPerformanceData): ProgressBasedUnlock[] {
    const unlocks: ProgressBasedUnlock[] = [];
    const averageAccuracy = performanceData.sessionHistory.reduce((sum, s) => sum + s.accuracy, 0) / 
                           performanceData.sessionHistory.length;

    // Unlock intermediate scenarios
    if (performanceData.currentLevel === 'beginner' && 
        averageAccuracy >= 75 && 
        performanceData.totalPracticeMinutes >= 300) {
      
      unlocks.push({
        contentType: 'scenario',
        contentId: 2,
        title: 'Business Meeting Scenarios',
        hindiTitle: 'व्यापारिक बैठक परिदृश्य',
        unlockedBy: 'Consistent beginner level performance',
        requirements: [
          {
            type: 'accuracy_threshold',
            value: 75,
            description: 'Maintain 75% accuracy',
            hindiDescription: '75% सटीकता बनाए रखें'
          },
          {
            type: 'practice_time',
            value: 300,
            description: 'Complete 5 hours of practice',
            hindiDescription: '5 घंटे का अभ्यास पूरा करें'
          }
        ]
      });
    }

    // Unlock advanced pronunciation exercises
    if (performanceData.currentLevel === 'intermediate' && 
        averageAccuracy >= 85) {
      
      unlocks.push({
        contentType: 'exercise',
        contentId: 3,
        title: 'Advanced Pronunciation Challenges',
        hindiTitle: 'उन्नत उच्चारण चुनौतियां',
        unlockedBy: 'Intermediate level mastery',
        requirements: [
          {
            type: 'accuracy_threshold',
            value: 85,
            description: 'Achieve 85% accuracy consistently',
            hindiDescription: 'लगातार 85% सटीकता प्राप्त करें'
          }
        ]
      });
    }

    return unlocks;
  }

  /**
   * Generate personalized daily practice plan
   */
  generateDailyPracticePlan(
    performanceData: UserPerformanceData,
    availableTime: number // in minutes
  ): {
    totalTime: number;
    activities: PracticeActivity[];
    focusAreas: string[];
    motivationalMessage: string;
    hindiMotivationalMessage: string;
  } {
    const weakAreas = this.identifyWeakAreas(performanceData);
    const recommendations = this.createTargetedPracticeRecommendations(weakAreas);
    
    const activities: PracticeActivity[] = [];
    let remainingTime = availableTime;

    // Warm-up (2-3 minutes)
    if (remainingTime >= 3) {
      activities.push({
        type: 'warmup',
        title: 'Pronunciation Warm-up',
        hindiTitle: 'उच्चारण वार्म-अप',
        duration: 3,
        description: 'Basic mouth and tongue exercises',
        content: ['Lip trills', 'Tongue twisters', 'Vowel sounds']
      });
      remainingTime -= 3;
    }

    // Focus on top weak areas
    recommendations.slice(0, 2).forEach(rec => {
      if (remainingTime >= 5 && rec.exercises.length > 0) {
        const exercise = rec.exercises[0];
        activities.push({
          type: 'focused_practice',
          title: exercise.title,
          hindiTitle: exercise.hindiTitle,
          duration: Math.min(exercise.estimatedTime, remainingTime),
          description: exercise.instructions,
          content: exercise.content
        });
        remainingTime -= exercise.estimatedTime;
      }
    });

    // Conversation practice if time allows
    if (remainingTime >= 5) {
      activities.push({
        type: 'conversation',
        title: 'Free Speaking Practice',
        hindiTitle: 'मुक्त बोलने का अभ्यास',
        duration: Math.min(10, remainingTime),
        description: 'Practice speaking naturally about daily topics',
        content: ['Describe your day', 'Talk about your hobbies', 'Express opinions']
      });
    }

    const focusAreas = weakAreas.slice(0, 2).map(w => w.area);
    
    return {
      totalTime: availableTime - remainingTime,
      activities,
      focusAreas,
      motivationalMessage: this.getMotivationalMessage(performanceData.currentLevel, 'english'),
      hindiMotivationalMessage: this.getMotivationalMessage(performanceData.currentLevel, 'hindi')
    };
  }

  private getMotivationalMessage(level: string, language: 'english' | 'hindi'): string {
    const messages = {
      beginner: {
        english: "Every expert was once a beginner. You're building something amazing!",
        hindi: "हर विशेषज्ञ कभी शुरुआती था। आप कुछ अद्भुत बना रहे हैं!"
      },
      intermediate: {
        english: "You're in the sweet spot of learning. Keep pushing forward!",
        hindi: "आप सीखने के सुनहरे दौर में हैं। आगे बढ़ते रहें!"
      },
      advanced: {
        english: "Excellence is a journey, not a destination. You're doing great!",
        hindi: "उत्कृष्टता एक यात्रा है, मंजिल नहीं। आप बहुत अच्छा कर रहे हैं!"
      }
    };

    return messages[level as keyof typeof messages]?.[language] || messages.beginner[language];
  }
}

interface PracticeActivity {
  type: 'warmup' | 'focused_practice' | 'conversation' | 'review';
  title: string;
  hindiTitle: string;
  duration: number;
  description: string;
  content: string[];
}

export const personalizedCoaching = new PersonalizedCoachingService();