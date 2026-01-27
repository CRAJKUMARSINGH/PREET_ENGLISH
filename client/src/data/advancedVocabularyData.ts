export interface AdvancedVocabularyItem {
  id: number;
  word: string;
  english?: string; // Make optional for compatibility
  hindi: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleHindi: string;
  difficulty: 'intermediate' | 'advanced';
  category: string;
  frequency?: 'common' | 'moderate' | 'rare'; // Optional
  synonyms?: string[]; // Optional
  antonyms?: string[]; // Optional
  examples?: { english: string; hindi: string }[]; // Optional
}

export const advancedVocabularyData: AdvancedVocabularyItem[] = [
  {
    id: 1,
    word: "Sophisticated",
    english: "Sophisticated", // Add this
    hindi: "परिष्कृत",
    pronunciation: "suh-FIS-ti-kay-tid",
    partOfSpeech: "adjective",
    definition: "Having great knowledge or experience",
    example: "She has sophisticated taste in art.",
    exampleHindi: "उसकी कला में परिष्कृत रुचि है।",
    difficulty: "advanced",
    category: "personality"
  },
  {
    id: 2,
    word: "Eloquent",
    hindi: "वाक्पटु",
    pronunciation: "EL-uh-kwuhnt",
    partOfSpeech: "adjective",
    definition: "Fluent or persuasive in speaking or writing",
    example: "The speaker gave an eloquent presentation.",
    exampleHindi: "वक्ता ने एक वाक्पटु प्रस्तुति दी।",
    difficulty: "advanced",
    category: "communication"
  },
  {
    id: 3,
    word: "Meticulous",
    hindi: "सूक्ष्म",
    pronunciation: "muh-TIK-yuh-luhs",
    partOfSpeech: "adjective",
    definition: "Showing great attention to detail; very careful",
    example: "She is meticulous in her work.",
    exampleHindi: "वह अपने काम में बहुत सूक्ष्म है।",
    difficulty: "advanced",
    category: "work"
  }
];

export default advancedVocabularyData;