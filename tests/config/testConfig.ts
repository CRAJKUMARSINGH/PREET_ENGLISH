/**
 * Test Configuration for Hindi Learning App Comprehensive Testing
 * Defines data file schemas, component mappings, and page configurations
 */

// ============================================================================
// DATA FILE SCHEMAS - Required fields for each data file type
// ============================================================================

export interface DataFileSchema {
  path: string;
  name: string;
  requiredFields: string[];
  expectedMinCount: number;
  arrayFields?: string[];
  enumFields?: { field: string; validValues: string[] }[];
}

export const dataFileSchemas: DataFileSchema[] = [
  {
    path: 'client/src/data/hindiCommonPhrasesData.ts',
    name: 'hindiCommonPhrasesData',
    requiredFields: ['id', 'english', 'hindi', 'pronunciation', 'usage', 'usageHindi', 'example', 'exampleHindi', 'category', 'difficulty'],
    expectedMinCount: 125,
    enumFields: [
      { field: 'difficulty', validValues: ['beginner', 'intermediate', 'advanced'] }
    ]
  },
  {
    path: 'client/src/data/hindiListeningData.ts',
    name: 'hindiListeningData',
    requiredFields: ['id', 'title', 'titleHindi', 'audioText', 'audioTextHindi', 'difficulty', 'category', 'duration', 'questions'],
    expectedMinCount: 30,
    arrayFields: ['questions'],
    enumFields: [
      { field: 'difficulty', validValues: ['beginner', 'intermediate', 'advanced'] }
    ]
  },
  {
    path: 'client/src/data/hindiRolePlayData.ts',
    name: 'hindiRolePlayData',
    requiredFields: ['id', 'title', 'titleHindi', 'scenario', 'scenarioHindi', 'category', 'difficulty', 'dialogues'],
    expectedMinCount: 40,
    arrayFields: ['dialogues'],
    enumFields: [
      { field: 'difficulty', validValues: ['beginner', 'intermediate', 'advanced'] }
    ]
  },
  {
    path: 'client/src/data/hindiStoriesData.ts',
    name: 'hindiStoriesData',
    requiredFields: ['id', 'title', 'content', 'vocabulary', 'comprehensionQuestions'],
    expectedMinCount: 1,
    arrayFields: ['vocabulary', 'comprehensionQuestions']
  },
  {
    path: 'client/src/data/hindiDialoguesData.ts',
    name: 'hindiDialoguesData',
    requiredFields: ['id', 'title', 'context', 'dialogues'],
    expectedMinCount: 1,
    arrayFields: ['dialogues']
  },
  {
    path: 'client/src/data/hindiLearningData.ts',
    name: 'hindiLearningData',
    requiredFields: [],
    expectedMinCount: 0,
    // This file has multiple exports with different structures
  },
  {
    path: 'client/src/data/speakingTopics.ts',
    name: 'speakingTopics',
    requiredFields: ['id', 'title', 'description', 'category'],
    expectedMinCount: 1
  }
];

// ============================================================================
// DATA FILE TO COMPONENT MAPPING
// ============================================================================

export interface DataFileComponentMapping {
  dataFile: string;
  expectedComponents: string[];
}

export const dataFileComponentMappings: DataFileComponentMapping[] = [
  {
    dataFile: 'hindiCommonPhrasesData.ts',
    expectedComponents: ['CommonPhrases.tsx']
  },
  {
    dataFile: 'hindiListeningData.ts',
    expectedComponents: ['ListeningPractice.tsx']
  },
  {
    dataFile: 'hindiRolePlayData.ts',
    expectedComponents: ['RolePlaySimulator.tsx']
  },
  {
    dataFile: 'hindiStoriesData.ts',
    expectedComponents: ['StoryReader.tsx', 'ComprehensionQuiz.tsx']
  },
  {
    dataFile: 'hindiDialoguesData.ts',
    expectedComponents: ['DialoguePractice.tsx']
  },
  {
    dataFile: 'hindiLearningData.ts',
    expectedComponents: ['PronunciationCoach.tsx', 'CulturalContextCard.tsx', 'HindiLearningCard.tsx']
  },
  {
    dataFile: 'speakingTopics.ts',
    expectedComponents: ['SpeakingTopicCard.tsx', 'SpeakingPractice.tsx']
  }
];

// ============================================================================
// PAGE TO CHILD COMPONENT MAPPING
// ============================================================================

export interface PageComponentMapping {
  route: string;
  pageName: string;
  pageFile: string;
  expectedChildren: string[];
}

export const pageComponentMappings: PageComponentMapping[] = [
  {
    route: '/',
    pageName: 'Home',
    pageFile: 'Home.tsx',
    expectedChildren: []
  },
  {
    route: '/hindi-learning',
    pageName: 'HindiLearning',
    pageFile: 'HindiLearning.tsx',
    expectedChildren: ['HindiLearningCard', 'PronunciationCoach']
  },
  {
    route: '/hindi-conversation',
    pageName: 'HindiConversation',
    pageFile: 'HindiConversation.tsx',
    expectedChildren: ['CommonPhrases', 'ListeningPractice', 'RolePlaySimulator', 'DialoguePractice']
  },
  {
    route: '/hindi-games',
    pageName: 'HindiGames',
    pageFile: 'HindiGames.tsx',
    expectedChildren: ['WordScramble', 'SpellingBee', 'FillBlanks', 'GrammarMatchGame']
  },
  {
    route: '/hindi-stories',
    pageName: 'HindiStories',
    pageFile: 'HindiStories.tsx',
    expectedChildren: ['StoryReader', 'ComprehensionQuiz', 'DictationPractice', 'SentenceBuilder']
  },
  {
    route: '/hindi-fluency',
    pageName: 'HindiFluency',
    pageFile: 'HindiFluency.tsx',
    expectedChildren: ['FlashcardSystem', 'DailyPracticeDashboard', 'SpeakingConfidenceTracker']
  },
  {
    route: '/hindi-vocabulary',
    pageName: 'HindiVocabulary',
    pageFile: 'HindiVocabulary.tsx',
    expectedChildren: ['VocabularyBuilder', 'WordAssociation', 'SynonymAntonym', 'ContextClues']
  },
  {
    route: '/hindi-daily',
    pageName: 'HindiDaily',
    pageFile: 'HindiDaily.tsx',
    expectedChildren: ['DailyWordCard', 'PhrasesOfDay', 'LearningStreak', 'VocabularyQuiz']
  },
  {
    route: '/hindi-mastery',
    pageName: 'HindiMastery',
    pageFile: 'HindiMastery.tsx',
    expectedChildren: ['CertificationSystem', 'InterviewPrep', 'ProfessionalWriting', 'TranslationPractice']
  },
  {
    route: '/hindi-complete',
    pageName: 'HindiComplete',
    pageFile: 'HindiComplete.tsx',
    expectedChildren: []
  },
  {
    route: '/advanced-hindi',
    pageName: 'AdvancedHindiLearning',
    pageFile: 'AdvancedHindiLearning.tsx',
    expectedChildren: ['AdvancedGrammarCoach', 'AIPronunciationTrainer', 'ConversationSimulator', 'PersonalizationEngine']
  },
  {
    route: '/speak',
    pageName: 'SpeakingPractice',
    pageFile: 'SpeakingPractice.tsx',
    expectedChildren: ['SpeakingTopicCard']
  },
  {
    route: '/vocabulary',
    pageName: 'VocabularyPage',
    pageFile: 'VocabularyPage.tsx',
    expectedChildren: []
  },
  {
    route: '/conversations',
    pageName: 'ConversationsPage',
    pageFile: 'ConversationsPage.tsx',
    expectedChildren: []
  },
  {
    route: '/community',
    pageName: 'Community',
    pageFile: 'Community.tsx',
    expectedChildren: []
  },
  {
    route: '/advanced',
    pageName: 'Advanced',
    pageFile: 'Advanced.tsx',
    expectedChildren: []
  },
  {
    route: '/profile',
    pageName: 'Profile',
    pageFile: 'Profile.tsx',
    expectedChildren: []
  },
  {
    route: '/lesson/:id',
    pageName: 'LessonView',
    pageFile: 'LessonView.tsx',
    expectedChildren: []
  }
];

// ============================================================================
// ALL ROUTES FOR TESTING
// ============================================================================

export const allRoutes = pageComponentMappings.map(p => p.route);

export const hindiLearningRoutes = [
  '/hindi-learning',
  '/hindi-conversation',
  '/hindi-games',
  '/hindi-stories',
  '/hindi-fluency',
  '/hindi-vocabulary',
  '/hindi-daily',
  '/hindi-mastery',
  '/hindi-complete',
  '/advanced-hindi'
];

// ============================================================================
// COMPONENT DIRECTORIES TO SCAN
// ============================================================================

export const componentDirectories = [
  'client/src/components/HindiConversation',
  'client/src/components/HindiGames',
  'client/src/components/HindiStories',
  'client/src/components/HindiFluency',
  'client/src/components/HindiVocabulary',
  'client/src/components/HindiDaily',
  'client/src/components/HindiMastery',
  'client/src/components/HindiComponents',
  'client/src/components/HindiComplete',
  'client/src/components/AdvancedHindiFeatures'
];

// ============================================================================
// VALID DIFFICULTY LEVELS
// ============================================================================

export const validDifficultyLevels = ['beginner', 'intermediate', 'advanced'] as const;
export type DifficultyLevel = typeof validDifficultyLevels[number];

// ============================================================================
// VALID CATEGORIES (will be populated from data files)
// ============================================================================

export const expectedCategories = {
  commonPhrases: [
    'Greetings',
    'Polite Expressions',
    'Asking for Help',
    'Shopping',
    'Restaurant',
    'Travel',
    'Health',
    'Work',
    'Social',
    'Emergency'
  ],
  listeningLessons: [
    'Daily Conversation',
    'Business',
    'Travel',
    'Shopping',
    'Health',
    'Education'
  ],
  rolePlayScenarios: [
    'Shopping',
    'Restaurant',
    'Travel',
    'Office',
    'Hospital',
    'Bank',
    'Hotel',
    'Interview'
  ]
};
