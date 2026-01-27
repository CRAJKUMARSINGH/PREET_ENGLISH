/**
 * Cultural Context Module
 * Provides Indian context scenarios, cultural tips, and culturally-aware speaking practice
 * Designed specifically for Hindi speakers learning English
 */

interface CulturalScenario {
  id: number;
  title: string;
  hindiTitle: string;
  category: 'business' | 'social' | 'medical' | 'education' | 'shopping' | 'travel';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  hindiDescription: string;
  context: string;
  hindiContext: string;
  dialogues: ScenarioDialogue[];
  culturalTips: CulturalTip[];
  vocabulary: ScenarioVocabulary[];
  commonMistakes: CommonMistake[];
  estimatedTime: number; // in minutes
}

interface ScenarioDialogue {
  speaker: 'user' | 'other';
  text: string;
  hindiTranslation: string;
  pronunciation?: string;
  culturalNote?: string;
  alternatives?: string[];
}

interface CulturalTip {
  type: 'etiquette' | 'pronunciation' | 'vocabulary' | 'context';
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  importance: 'low' | 'medium' | 'high';
  examples: string[];
}

interface ScenarioVocabulary {
  word: string;
  hindiMeaning: string;
  pronunciation: string;
  usage: string;
  hindiUsage: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CommonMistake {
  incorrect: string;
  correct: string;
  hindiExplanation: string;
  why: string;
  examples: string[];
}

interface ScenarioProgress {
  scenarioId: number;
  completionRate: number;
  averageAccuracy: number;
  practiceCount: number;
  lastPracticed?: string;
  masteredVocabulary: string[];
  weakAreas: string[];
}

export class CulturalScenariosService {
  private readonly scenarios: CulturalScenario[] = [
    // Business Scenarios
    {
      id: 1,
      title: 'Job Interview - IT Company',
      hindiTitle: 'नौकरी का साक्षात्कार - आईटी कंपनी',
      category: 'business',
      difficulty: 'intermediate',
      description: 'Practice professional communication in a tech job interview',
      hindiDescription: 'तकनीकी नौकरी के साक्षात्कार में पेशेवर संवाद का अभ्यास',
      context: 'You are interviewing for a software developer position at a multinational company in Bangalore',
      hindiContext: 'आप बैंगलोर की एक बहुराष्ट्रीय कंपनी में सॉफ्टवेयर डेवलपर पद के लिए साक्षात्कार दे रहे हैं',
      dialogues: [
        {
          speaker: 'other',
          text: 'Tell me about yourself and your experience with React.',
          hindiTranslation: 'अपने बारे में और React के साथ अपने अनुभव के बारे में बताएं।',
          pronunciation: 'tel mi ə-baut yər-self ænd yər ɪk-spɪr-i-əns wɪθ ri-ækt',
          culturalNote: 'Keep it professional but show enthusiasm'
        },
        {
          speaker: 'user',
          text: 'I have been working with React for three years. I have developed several web applications.',
          hindiTranslation: 'मैं तीन साल से React के साथ काम कर रहा हूं। मैंने कई वेब एप्लिकेशन विकसित किए हैं।',
          alternatives: [
            'I\'ve been using React for three years and have built multiple web apps.',
            'I have three years of React experience, including several production applications.'
          ]
        }
      ],
      culturalTips: [
        {
          type: 'etiquette',
          title: 'Professional Greeting',
          hindiTitle: 'पेशेवर अभिवादन',
          description: 'Use firm handshake and maintain eye contact',
          hindiDescription: 'मजबूत हाथ मिलाना और आंखों का संपर्क बनाए रखना',
          importance: 'high',
          examples: ['Good morning, sir/madam', 'Thank you for this opportunity', 'I\'m pleased to meet you']
        }
      ],
      vocabulary: [
        {
          word: 'experience',
          hindiMeaning: 'अनुभव',
          pronunciation: 'ɪk-spɪr-i-əns',
          usage: 'I have five years of experience in software development',
          hindiUsage: 'मेरे पास सॉफ्टवेयर डेवलपमेंट में पांच साल का अनुभव है',
          difficulty: 'beginner'
        }
      ],
      commonMistakes: [
        {
          incorrect: 'I am having experience',
          correct: 'I have experience',
          hindiExplanation: 'अनुभव के लिए "have" का प्रयोग करें, "having" का नहीं',
          why: 'Experience is a state, not an action',
          examples: ['I have experience', 'She has knowledge', 'They have skills']
        }
      ],
      estimatedTime: 15
    },
    
    // Social Scenarios
    {
      id: 2,
      title: 'Meeting New Neighbors',
      hindiTitle: 'नए पड़ोसियों से मिलना',
      category: 'social',
      difficulty: 'beginner',
      description: 'Introduce yourself to new neighbors in your apartment complex',
      hindiDescription: 'अपने अपार्टमेंट कॉम्प्लेक्स में नए पड़ोसियों से अपना परिचय दें',
      context: 'You just moved to a new apartment in Mumbai and want to introduce yourself to your neighbors',
      hindiContext: 'आप अभी मुंबई में एक नए अपार्टमेंट में आए हैं और अपने पड़ोसियों से परिचय करना चाहते हैं',
      dialogues: [
        {
          speaker: 'user',
          text: 'Hello, I\'m your new neighbor. I just moved in yesterday.',
          hindiTranslation: 'नमस्ते, मैं आपका नया पड़ोसी हूं। मैं कल ही यहां आया हूं।',
          pronunciation: 'hə-loʊ aɪm yər nu neɪ-bər aɪ ʤʌst muvd ɪn yes-tər-deɪ'
        },
        {
          speaker: 'other',
          text: 'Welcome to the building! I\'m Mrs. Sharma from 3B. Where are you from?',
          hindiTranslation: 'बिल्डिंग में आपका स्वागत है! मैं 3B की श्रीमती शर्मा हूं। आप कहां से हैं?',
          culturalNote: 'Indians often ask about hometown and family background'
        }
      ],
      culturalTips: [
        {
          type: 'etiquette',
          title: 'Respectful Address',
          hindiTitle: 'सम्मानजनक संबोधन',
          description: 'Use "Uncle/Aunty" for older neighbors, "Sir/Madam" for formal situations',
          hindiDescription: 'बड़े पड़ोसियों के लिए "अंकल/आंटी", औपचारिक स्थितियों के लिए "सर/मैडम" का प्रयोग करें',
          importance: 'high',
          examples: ['Good morning, Uncle', 'Thank you, Aunty', 'Excuse me, Sir']
        }
      ],
      vocabulary: [
        {
          word: 'neighbor',
          hindiMeaning: 'पड़ोसी',
          pronunciation: 'neɪ-bər',
          usage: 'My neighbor is very friendly',
          hindiUsage: 'मेरा पड़ोसी बहुत मित्रवत है',
          difficulty: 'beginner'
        }
      ],
      commonMistakes: [
        {
          incorrect: 'I am coming from Delhi',
          correct: 'I come from Delhi / I am from Delhi',
          hindiExplanation: 'मूल स्थान के लिए "come from" या "am from" का प्रयोग करें',
          why: 'Present continuous suggests temporary movement',
          examples: ['I come from Mumbai', 'She is from Chennai', 'We are from Pune']
        }
      ],
      estimatedTime: 10
    },

    // Medical Scenarios
    {
      id: 3,
      title: 'Doctor\'s Appointment',
      hindiTitle: 'डॉक्टर की अपॉइंटमेंट',
      category: 'medical',
      difficulty: 'intermediate',
      description: 'Describe symptoms and understand medical advice',
      hindiDescription: 'लक्षणों का वर्णन करें और चिकित्सा सलाह समझें',
      context: 'You have a fever and need to visit a doctor in Delhi',
      hindiContext: 'आपको बुखार है और दिल्ली में डॉक्टर के पास जाना है',
      dialogues: [
        {
          speaker: 'other',
          text: 'What seems to be the problem today?',
          hindiTranslation: 'आज क्या समस्या लग रही है?',
          pronunciation: 'wʌt simz tu bi ðə prɑb-ləm tə-deɪ'
        },
        {
          speaker: 'user',
          text: 'I have been having a fever for two days. I also have a headache.',
          hindiTranslation: 'मुझे दो दिन से बुखार है। मुझे सिरदर्द भी है।',
          alternatives: [
            'I\'ve had a fever for two days and I have a headache.',
            'I\'m running a fever since two days with headache.'
          ]
        }
      ],
      culturalTips: [
        {
          type: 'vocabulary',
          title: 'Medical Terminology',
          hindiTitle: 'चिकित्सा शब्दावली',
          description: 'Learn common medical terms used in Indian hospitals',
          hindiDescription: 'भारतीय अस्पतालों में प्रयुक्त सामान्य चिकित्सा शब्द सीखें',
          importance: 'high',
          examples: ['fever - बुखार', 'headache - सिरदर्द', 'medicine - दवा']
        }
      ],
      vocabulary: [
        {
          word: 'symptoms',
          hindiMeaning: 'लक्षण',
          pronunciation: 'sɪmp-təmz',
          usage: 'Please describe your symptoms',
          hindiUsage: 'कृपया अपने लक्षणों का वर्णन करें',
          difficulty: 'intermediate'
        }
      ],
      commonMistakes: [
        {
          incorrect: 'I am having fever since two days',
          correct: 'I have had fever for two days',
          hindiExplanation: 'समय अवधि के लिए present perfect का प्रयोग करें',
          why: 'Duration requires present perfect tense',
          examples: ['I have had this problem for a week', 'She has been sick since Monday']
        }
      ],
      estimatedTime: 12
    }
  ];

  private readonly culturalTipsByCategory: Record<string, CulturalTip[]> = {
    business: [
      {
        type: 'etiquette',
        title: 'Business Card Exchange',
        hindiTitle: 'व्यापारिक कार्ड का आदान-प्रदान',
        description: 'Receive business cards with both hands and read them carefully',
        hindiDescription: 'व्यापारिक कार्ड दोनों हाथों से लें और ध्यान से पढ़ें',
        importance: 'medium',
        examples: ['Thank you for your card', 'May I have your business card?', 'Here is my card']
      }
    ],
    social: [
      {
        type: 'context',
        title: 'Family Inquiries',
        hindiTitle: 'पारिवारिक पूछताछ',
        description: 'Indians often ask about family as a way of showing interest',
        hindiDescription: 'भारतीय अक्सर रुचि दिखाने के तरीके के रूप में परिवार के बारे में पूछते हैं',
        importance: 'high',
        examples: ['How is your family?', 'Are your parents well?', 'Do you have siblings?']
      }
    ]
  };

  /**
   * Get scenarios by category and difficulty
   */
  getScenarios(
    category?: 'business' | 'social' | 'medical' | 'education' | 'shopping' | 'travel',
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
  ): CulturalScenario[] {
    let filtered = this.scenarios;

    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }

    if (difficulty) {
      filtered = filtered.filter(s => s.difficulty === difficulty);
    }

    return filtered;
  }

  /**
   * Get a specific scenario by ID
   */
  getScenario(id: number): CulturalScenario | null {
    return this.scenarios.find(s => s.id === id) || null;
  }

  /**
   * Get cultural tips for a specific category
   */
  getCulturalTips(category: string): CulturalTip[] {
    return this.culturalTipsByCategory[category] || [];
  }

  /**
   * Select appropriate scenario based on user level and preferences
   */
  selectScenario(
    userLevel: 'beginner' | 'intermediate' | 'advanced',
    preferences?: {
      category?: string;
      practiceType?: 'vocabulary' | 'pronunciation' | 'conversation';
      timeAvailable?: number; // in minutes
    }
  ): CulturalScenario | null {
    let candidates = this.scenarios.filter(s => s.difficulty === userLevel);

    // Filter by category preference
    if (preferences?.category) {
      candidates = candidates.filter(s => s.category === preferences.category);
    }

    // Filter by available time
    if (preferences?.timeAvailable !== undefined && preferences.timeAvailable > 0) {
      candidates = candidates.filter(s => s.estimatedTime <= preferences.timeAvailable!);
    }

    // Return random scenario from candidates
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Generate cultural tips based on user's weak areas
   */
  generateContextualTips(
    scenario: CulturalScenario,
    userWeakAreas: string[]
  ): CulturalTip[] {
    const tips: CulturalTip[] = [...scenario.culturalTips];

    // Add category-specific tips
    const categoryTips = this.getCulturalTips(scenario.category);
    tips.push(...categoryTips);

    // Add tips for weak areas
    if (userWeakAreas.includes('pronunciation')) {
      tips.push({
        type: 'pronunciation',
        title: 'Clear Pronunciation',
        hindiTitle: 'स्पष्ट उच्चारण',
        description: 'Speak slowly and clearly, especially in professional settings',
        hindiDescription: 'धीरे और स्पष्ट रूप से बोलें, विशेष रूप से पेशेवर परिस्थितियों में',
        importance: 'high',
        examples: ['Take your time', 'Pronounce each syllable', 'Don\'t rush']
      });
    }

    return tips;
  }

  /**
   * Get vocabulary words for practice based on scenario
   */
  getScenarioVocabulary(
    scenarioId: number,
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
  ): ScenarioVocabulary[] {
    const scenario = this.getScenario(scenarioId);
    if (!scenario) return [];

    let vocabulary = scenario.vocabulary;

    if (difficulty) {
      vocabulary = vocabulary.filter(v => v.difficulty === difficulty);
    }

    return vocabulary;
  }

  /**
   * Track and update scenario progress
   */
  updateScenarioProgress(
    scenarioId: number,
    sessionData: {
      accuracy: number;
      completedDialogues: number;
      totalDialogues: number;
      masteredWords: string[];
      struggledAreas: string[];
    }
  ): ScenarioProgress {
    const completionRate = (sessionData.completedDialogues / sessionData.totalDialogues) * 100;

    return {
      scenarioId,
      completionRate,
      averageAccuracy: sessionData.accuracy,
      practiceCount: 1, // This would be incremented in real implementation
      lastPracticed: new Date().toISOString(),
      masteredVocabulary: sessionData.masteredWords,
      weakAreas: sessionData.struggledAreas
    };
  }

  /**
   * Get recommended next scenarios based on progress
   */
  getRecommendedScenarios(
    currentLevel: 'beginner' | 'intermediate' | 'advanced',
    completedScenarios: number[],
    weakAreas: string[]
  ): CulturalScenario[] {
    // Filter out completed scenarios
    let available = this.scenarios.filter(s => !completedScenarios.includes(s.id));

    // Prioritize scenarios that address weak areas
    if (weakAreas.length > 0) {
      const targeted = available.filter(s => 
        s.vocabulary.some(v => weakAreas.includes(v.word)) ||
        s.commonMistakes.some(m => weakAreas.some(area => m.incorrect.includes(area)))
      );
      
      if (targeted.length > 0) {
        available = targeted;
      }
    }

    // Filter by appropriate difficulty
    available = available.filter(s => s.difficulty === currentLevel);

    // Return top 3 recommendations
    return available.slice(0, 3);
  }
}

export const culturalScenarios = new CulturalScenariosService();