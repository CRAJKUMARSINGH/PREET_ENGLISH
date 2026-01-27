export interface CommonPhrase {
  id: number;
  phrase: string;
  phraseHindi: string;
  meaning: string;
  meaningHindi: string;
  pronunciation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  example: string;
  exampleHindi: string;
  usage: string;
}

export const commonPhrasesData: CommonPhrase[] = [
  {
    id: 1,
    phrase: "How are you?",
    phraseHindi: "आप कैसे हैं?",
    meaning: "A greeting asking about someone's well-being",
    meaningHindi: "किसी के कल्याण के बारे में पूछने वाली एक बधाई",
    pronunciation: "haʊ ɑr ju?",
    category: "Greetings",
    difficulty: "beginner",
    example: "How are you doing today?",
    exampleHindi: "आप आज कैसे हो?",
    usage: "Used as a casual greeting"
  },
  {
    id: 2,
    phrase: "Nice to meet you",
    phraseHindi: "आपसे मिलकर खुशी हुई",
    meaning: "Expression of pleasure at meeting someone",
    meaningHindi: "किसी से मिलने पर खुशी व्यक्त करना",
    pronunciation: "naɪs tu mit ju",
    category: "Greetings",
    difficulty: "beginner",
    example: "Nice to meet you! I'm John.",
    exampleHindi: "आपसे मिलकर खुशी हुई! मैं जॉन हूँ।",
    usage: "Used when meeting someone for the first time"
  },
  {
    id: 3,
    phrase: "Thank you very much",
    phraseHindi: "बहुत-बहुत धन्यवाद",
    meaning: "Expression of gratitude",
    meaningHindi: "कृतज्ञता व्यक्त करना",
    pronunciation: "θæŋk ju ˈveri mʌtʃ",
    category: "Politeness",
    difficulty: "beginner",
    example: "Thank you very much for your help!",
    exampleHindi: "आपकी मदद के लिए बहुत-बहुत धन्यवाद!",
    usage: "Used to express strong gratitude"
  },
  {
    id: 4,
    phrase: "Could you help me?",
    phraseHindi: "क्या आप मेरी मदद कर सकते हैं?",
    meaning: "Polite request for assistance",
    meaningHindi: "सहायता के लिए विनम्र अनुरोध",
    pronunciation: "kʊd ju help mi?",
    category: "Requests",
    difficulty: "beginner",
    example: "Could you help me with this problem?",
    exampleHindi: "क्या आप इस समस्या में मेरी मदद कर सकते हैं?",
    usage: "Used when asking for help politely"
  },
  {
    id: 5,
    phrase: "I don't understand",
    phraseHindi: "मैं समझ नहीं पाया",
    meaning: "Expression of not comprehending something",
    meaningHindi: "कुछ समझ न आने को व्यक्त करना",
    pronunciation: "aɪ doʊnt ʌndərˈstænd",
    category: "Communication",
    difficulty: "beginner",
    example: "I don't understand. Could you explain again?",
    exampleHindi: "मैं समझ नहीं पाया। क्या आप फिर से समझा सकते हैं?",
    usage: "Used when you need clarification"
  },
  {
    id: 6,
    phrase: "What does this mean?",
    phraseHindi: "इसका मतलब क्या है?",
    meaning: "Question asking for the meaning of something",
    meaningHindi: "किसी चीज के अर्थ के बारे में सवाल",
    pronunciation: "wʌt dʌz ðɪs min?",
    category: "Questions",
    difficulty: "beginner",
    example: "What does this word mean?",
    exampleHindi: "इस शब्द का मतलब क्या है?",
    usage: "Used when asking for clarification of meaning"
  },
  {
    id: 7,
    phrase: "I'm sorry",
    phraseHindi: "मुझे खेद है",
    meaning: "Expression of apology or regret",
    meaningHindi: "माफी या खेद व्यक्त करना",
    pronunciation: "aɪm ˈsɑri",
    category: "Politeness",
    difficulty: "beginner",
    example: "I'm sorry for being late.",
    exampleHindi: "देर से आने के लिए मुझे खेद है।",
    usage: "Used to apologize for something"
  },
  {
    id: 8,
    phrase: "Excuse me",
    phraseHindi: "माफ करिए",
    meaning: "Polite way to get attention or apologize",
    meaningHindi: "ध्यान आकर्षित करने या माफी माँगने का विनम्र तरीका",
    pronunciation: "ɪkˈskjuz mi",
    category: "Politeness",
    difficulty: "beginner",
    example: "Excuse me, where is the bathroom?",
    exampleHindi: "माफ करिए, बाथरूम कहाँ है?",
    usage: "Used to politely interrupt or ask for attention"
  },
  {
    id: 9,
    phrase: "Can you speak slowly?",
    phraseHindi: "क्या आप धीरे बोल सकते हैं?",
    meaning: "Request to speak at a slower pace",
    meaningHindi: "धीमी गति से बोलने का अनुरोध",
    pronunciation: "kæn ju spik ˈsloʊli?",
    category: "Communication",
    difficulty: "intermediate",
    example: "Can you speak slowly? I'm still learning.",
    exampleHindi: "क्या आप धीरे बोल सकते हैं? मैं अभी सीख रहा हूँ।",
    usage: "Used when you need someone to speak slower"
  },
  {
    id: 10,
    phrase: "I appreciate your help",
    phraseHindi: "मैं आपकी मदद की सराहना करता हूँ",
    meaning: "Expression of gratitude and recognition",
    meaningHindi: "कृतज्ञता और स्वीकृति व्यक्त करना",
    pronunciation: "aɪ əˈpriʃieɪt jʊər help",
    category: "Politeness",
    difficulty: "intermediate",
    example: "I really appreciate your help with this project.",
    exampleHindi: "मैं इस प्रोजेक्ट में आपकी मदद की सराहना करता हूँ।",
    usage: "Used to express sincere gratitude"
  }
];

// Alias for backward compatibility
export const commonPhrases = commonPhrasesData;
