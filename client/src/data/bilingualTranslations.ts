/**
 * BILINGUAL NAVIGATION MANIFEST
 * 
 * Grade 9 Quality: Complete bilingual support for every UI element
 * Ensures Hindi speakers can navigate confidently through the entire app
 */

export interface BilingualText {
  en: string;
  hi: string;
}

export const BILINGUAL_NAV: Record<string, BilingualText> = {
  // Main Navigation
  home: { en: "Home", hi: "मुख्य पृष्ठ" },
  lessons: { en: "All Lessons", hi: "सभी पाठ" },
  practice: { en: "Practice Board", hi: "अभ्यास बोर्ड" },
  progress: { en: "My Progress", hi: "मेरी प्रगति" },
  profile: { en: "Profile Settings", hi: "प्रोफ़ाइल सेटिंग्स" },
  
  // Lesson Navigation
  next: { en: "Next Lesson", hi: "अगला पाठ" },
  previous: { en: "Previous Lesson", hi: "पिछला पाठ" },
  completed: { en: "Mark as Completed", hi: "पूरा हो गया" },
  start: { en: "Start Lesson", hi: "पाठ शुरू करें" },
  continue: { en: "Continue", hi: "जारी रखें" },
  
  // Content Categories
  vocabulary: { en: "Vocabulary", hi: "शब्दावली" },
  conversation: { en: "Conversation", hi: "बातचीत" },
  grammar: { en: "Grammar", hi: "व्याकरण" },
  pronunciation: { en: "Pronunciation", hi: "उच्चारण" },
  listening: { en: "Listening", hi: "सुनना" },
  speaking: { en: "Speaking", hi: "बोलना" },
  reading: { en: "Reading", hi: "पढ़ना" },
  writing: { en: "लेखन", hi: "लिखना" },
  
  // Difficulty Levels
  beginner: { en: "Beginner", hi: "शुरुआती" },
  intermediate: { en: "Intermediate", hi: "मध्यम" },
  advanced: { en: "Advanced", hi: "उन्नत" },
  
  // Actions
  play: { en: "Play Audio", hi: "ऑडियो चलाएं" },
  pause: { en: "Pause", hi: "रोकें" },
  repeat: { en: "Repeat", hi: "दोहराएं" },
  record: { en: "Record", hi: "रिकॉर्ड करें" },
  submit: { en: "Submit", hi: "जमा करें" },
  save: { en: "Save", hi: "सेव करें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  
  // Status Messages
  loading: { en: "Loading...", hi: "लोड हो रहा है..." },
  success: { en: "Success!", hi: "सफल!" },
  error: { en: "Error occurred", hi: "त्रुटि हुई" },
  tryAgain: { en: "Try Again", hi: "फिर कोशिश करें" },
  
  // Learning Features
  flashcards: { en: "Flashcards", hi: "फ्लैशकार्ड" },
  quiz: { en: "Quiz", hi: "प्रश्नोत्तरी" },
  games: { en: "Games", hi: "खेल" },
  stories: { en: "Stories", hi: "कहानियां" },
  scenarios: { en: "Scenarios", hi: "परिस्थितियां" },
  
  // Progress & Gamification
  xp: { en: "XP Points", hi: "अनुभव अंक" },
  level: { en: "Level", hi: "स्तर" },
  streak: { en: "Streak", hi: "लगातार दिन" },
  achievements: { en: "Achievements", hi: "उपलब्धियां" },
  leaderboard: { en: "Leaderboard", hi: "लीडरबोर्ड" },
  
  // Time & Schedule
  daily: { en: "Daily Practice", hi: "दैनिक अभ्यास" },
  weekly: { en: "Weekly Goal", hi: "साप्ताहिक लक्ष्य" },
  minutes: { en: "minutes", hi: "मिनट" },
  hours: { en: "hours", hi: "घंटे" },
  days: { en: "days", hi: "दिन" },
  
  // Settings & Preferences
  settings: { en: "Settings", hi: "सेटिंग्स" },
  language: { en: "Language", hi: "भाषा" },
  theme: { en: "Theme", hi: "थीम" },
  notifications: { en: "Notifications", hi: "सूचनाएं" },
  privacy: { en: "Privacy", hi: "गोपनीयता" },
  
  // Help & Support
  help: { en: "Help", hi: "सहायता" },
  support: { en: "Support", hi: "समर्थन" },
  feedback: { en: "Feedback", hi: "प्रतिक्रिया" },
  contact: { en: "Contact Us", hi: "संपर्क करें" },
  
  // Cultural Context
  formal: { en: "Formal", hi: "औपचारिक" },
  informal: { en: "Informal", hi: "अनौपचारिक" },
  business: { en: "Business", hi: "व्यापारिक" },
  social: { en: "Social", hi: "सामाजिक" },
  cultural: { en: "Cultural Context", hi: "सांस्कृतिक संदर्भ" },
  
  // Quality Indicators
  excellent: { en: "Excellent", hi: "उत्कृष्ट" },
  good: { en: "Good", hi: "अच्छा" },
  needsWork: { en: "Needs Work", hi: "सुधार की जरूरत" },
  perfect: { en: "Perfect!", hi: "बिल्कुल सही!" },
  
  // Common Phrases for Learning
  wellDone: { en: "Well Done!", hi: "बहुत बढ़िया!" },
  keepGoing: { en: "Keep Going!", hi: "जारी रखें!" },
  almostThere: { en: "Almost There!", hi: "लगभग पहुंच गए!" },
  greatJob: { en: "Great Job!", hi: "शानदार काम!" },
  
  // Instructions
  clickToStart: { en: "Click to Start", hi: "शुरू करने के लिए क्लिक करें" },
  listenAndRepeat: { en: "Listen and Repeat", hi: "सुनें और दोहराएं" },
  chooseCorrect: { en: "Choose the Correct Answer", hi: "सही उत्तर चुनें" },
  typeAnswer: { en: "Type Your Answer", hi: "अपना उत्तर टाइप करें" },
  speakClearly: { en: "Speak Clearly", hi: "स्पष्ट रूप से बोलें" }
};

// Lesson-specific translations for common educational terms
export const EDUCATIONAL_TERMS: Record<string, BilingualText> = {
  lesson: { en: "Lesson", hi: "पाठ" },
  chapter: { en: "Chapter", hi: "अध्याय" },
  unit: { en: "Unit", hi: "इकाई" },
  module: { en: "Module", hi: "मॉड्यूल" },
  exercise: { en: "Exercise", hi: "अभ्यास" },
  example: { en: "Example", hi: "उदाहरण" },
  explanation: { en: "Explanation", hi: "व्याख्या" },
  definition: { en: "Definition", hi: "परिभाषा" },
  meaning: { en: "Meaning", hi: "अर्थ" },
  translation: { en: "Translation", hi: "अनुवाद" },
  pronunciation: { en: "Pronunciation", hi: "उच्चारण" },
  usage: { en: "Usage", hi: "प्रयोग" },
  context: { en: "Context", hi: "संदर्भ" },
  tip: { en: "Tip", hi: "सुझाव" },
  note: { en: "Note", hi: "नोट" },
  remember: { en: "Remember", hi: "याद रखें" },
  important: { en: "Important", hi: "महत्वपूर्ण" },
  practice: { en: "Practice", hi: "अभ्यास" },
  review: { en: "Review", hi: "समीक्षा" },
  summary: { en: "Summary", hi: "सारांश" }
};

// Grammar-specific terms
export const GRAMMAR_TERMS: Record<string, BilingualText> = {
  noun: { en: "Noun", hi: "संज्ञा" },
  verb: { en: "Verb", hi: "क्रिया" },
  adjective: { en: "Adjective", hi: "विशेषण" },
  adverb: { en: "Adverb", hi: "क्रिया विशेषण" },
  pronoun: { en: "Pronoun", hi: "सर्वनाम" },
  preposition: { en: "Preposition", hi: "संबंधबोधक" },
  conjunction: { en: "Conjunction", hi: "संयोजक" },
  article: { en: "Article", hi: "उपपद" },
  sentence: { en: "Sentence", hi: "वाक्य" },
  phrase: { en: "Phrase", hi: "वाक्यांश" },
  clause: { en: "Clause", hi: "उपवाक्य" },
  subject: { en: "Subject", hi: "कर्ता" },
  object: { en: "Object", hi: "कर्म" },
  predicate: { en: "Predicate", hi: "विधेय" },
  tense: { en: "Tense", hi: "काल" },
  present: { en: "Present", hi: "वर्तमान" },
  past: { en: "Past", hi: "भूत" },
  future: { en: "Future", hi: "भविष्य" },
  singular: { en: "Singular", hi: "एकवचन" },
  plural: { en: "Plural", hi: "बहुवचन" }
};

// Utility function to get bilingual text
export function getBilingualText(key: string, useHindi: boolean = false): string {
  const text = BILINGUAL_NAV[key] || EDUCATIONAL_TERMS[key] || GRAMMAR_TERMS[key];
  if (!text) return key; // Fallback to key if not found
  return useHindi ? text.hi : text.en;
}

// Utility function to get both languages for display
export function getBothLanguages(key: string): BilingualText | null {
  return BILINGUAL_NAV[key] || EDUCATIONAL_TERMS[key] || GRAMMAR_TERMS[key] || null;
}