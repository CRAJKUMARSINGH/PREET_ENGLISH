// Common Hindi phrases for English learning
export interface CommonPhrase {
  id: number;
  english: string;
  hindi: string;
  pronunciation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usage: string;
}

export const commonPhrases: CommonPhrase[] = [
  {
    id: 1,
    english: "Hello, how are you?",
    hindi: "नमस्ते, आप कैसे हैं?",
    pronunciation: "Namaste, aap kaise hain?",
    category: "greetings",
    difficulty: "beginner",
    usage: "Used as a polite greeting"
  },
  {
    id: 2,
    english: "Thank you very much",
    hindi: "बहुत धन्यवाद",
    pronunciation: "Bahut dhanyawad",
    category: "courtesy",
    difficulty: "beginner",
    usage: "Expressing gratitude"
  },
  {
    id: 3,
    english: "Excuse me, where is the market?",
    hindi: "माफ़ करिए, बाज़ार कहाँ है?",
    pronunciation: "Maaf kariye, bazaar kahan hai?",
    category: "directions",
    difficulty: "intermediate",
    usage: "Asking for directions politely"
  }
];