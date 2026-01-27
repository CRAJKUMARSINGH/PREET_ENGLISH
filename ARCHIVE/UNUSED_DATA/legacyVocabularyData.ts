export interface VocabularyItem {
  id: number;
  word: string;
  hindi: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export const legacyVocabularyData: VocabularyItem[] = [
  {
    id: 1,
    word: "Hello",
    hindi: "नमस्ते",
    pronunciation: "huh-LOH",
    partOfSpeech: "interjection",
    definition: "A greeting used when meeting someone",
    example: "Hello, how are you today?",
    exampleHindi: "नमस्ते, आज आप कैसे हैं?",
    difficulty: "beginner",
    category: "greetings"
  },
  {
    id: 2,
    word: "Thank you",
    hindi: "धन्यवाद",
    pronunciation: "THANK yoo",
    partOfSpeech: "phrase",
    definition: "An expression of gratitude",
    example: "Thank you for your help.",
    exampleHindi: "आपकी मदद के लिए धन्यवाद।",
    difficulty: "beginner",
    category: "courtesy"
  },
  {
    id: 3,
    word: "Beautiful",
    hindi: "सुंदर",
    pronunciation: "BYOO-tuh-fuhl",
    partOfSpeech: "adjective",
    definition: "Pleasing to look at; attractive",
    example: "The sunset is beautiful tonight.",
    exampleHindi: "आज रात सूर्यास्त सुंदर है।",
    difficulty: "intermediate",
    category: "descriptive"
  },
  {
    id: 4,
    word: "Important",
    hindi: "महत्वपूर्ण",
    pronunciation: "im-POR-tuhnt",
    partOfSpeech: "adjective",
    definition: "Of great significance or value",
    example: "Education is very important.",
    exampleHindi: "शिक्षा बहुत महत्वपूर्ण है।",
    difficulty: "intermediate",
    category: "general"
  },
  {
    id: 5,
    word: "Understand",
    hindi: "समझना",
    pronunciation: "uhn-der-STAND",
    partOfSpeech: "verb",
    definition: "To comprehend the meaning of something",
    example: "I understand what you're saying.",
    exampleHindi: "मैं समझता हूँ कि आप क्या कह रहे हैं।",
    difficulty: "intermediate",
    category: "communication"
  }
];

export default legacyVocabularyData;