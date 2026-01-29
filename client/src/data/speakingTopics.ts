export interface SpeakingTopic {
  id: number;
  title: string;
  hindiTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  emoji: string;
  category: string;
  hindiThoughts: string[];
  sentenceFrames: string[];
  modelAnswer: string;
  freePrompt: string;
  confidenceTip: string;
}

export const speakingTopics: SpeakingTopic[] = [
  {
    id: 1,
    title: "Introducing Yourself",
    hindiTitle: "अपना परिचय देना",
    difficulty: "Easy",
    emoji: "👋",
    category: "Personal",
    hindiThoughts: [
      "मैं अपना नाम स्पष्ट रूप से बताऊंगा",
      "मैं अपने काम के बारे में बताऊंगा",
      "मैं अपनी रुचियों को साझा करूंगा"
    ],
    sentenceFrames: [
      "My name is ___",
      "I work as a ___",
      "I am from ___",
      "My hobbies include ___"
    ],
    modelAnswer: "Hello! My name is Priya Sharma. I work as a software engineer in Mumbai. I am originally from Delhi but moved here for my job. In my free time, I enjoy reading books, watching movies, and learning new languages like English. I'm excited to improve my English speaking skills.",
    freePrompt: "अपने बारे में 2-3 मिनट बताएं",
    confidenceTip: "Remember to speak slowly and clearly. It's okay to pause and think before speaking."
  },
  {
    id: 2,
    title: "Ordering Food",
    hindiTitle: "खाना ऑर्डर करना",
    difficulty: "Easy",
    emoji: "🍽️",
    category: "Daily Life",
    hindiThoughts: [
      "मैं मेन्यू देखूंगा और समझूंगा",
      "मैं विनम्रता से ऑर्डर करूंगा",
      "मैं अपनी पसंद बताऊंगा"
    ],
    sentenceFrames: [
      "I would like to order ___",
      "Can I have ___?",
      "Is this dish ___?",
      "The bill, please"
    ],
    modelAnswer: "Good evening! I would like to order dal makhani with butter naan, please. Can I also have a mango lassi? Is the dal very spicy? I prefer mild food. Thank you for your help. The bill, please.",
    freePrompt: "रेस्तरां में खाना ऑर्डर करने का अभ्यास करें",
    confidenceTip: "Don't worry about perfect pronunciation. Restaurant staff are used to helping customers."
  },
  {
    id: 3,
    title: "Asking for Directions",
    hindiTitle: "दिशा पूछना",
    difficulty: "Medium",
    emoji: "🗺️",
    category: "Travel",
    hindiThoughts: [
      "मैं विनम्रता से दिशा पूछूंगा",
      "मैं दिशाओं को ध्यान से सुनूंगा",
      "मैं धन्यवाद कहूंगा"
    ],
    sentenceFrames: [
      "Excuse me, how do I get to ___?",
      "Is it far from here?",
      "Should I take ___?",
      "Thank you for your help"
    ],
    modelAnswer: "Excuse me, how do I get to the railway station from here? Is it walking distance or should I take an auto-rickshaw? Which direction should I go? Thank you so much for your help. Have a good day!",
    freePrompt: "किसी से रास्ता पूछने का अभ्यास करें",
    confidenceTip: "Most people are happy to help with directions. Speak clearly and don't hesitate to ask again if you don't understand."
  },
  {
    id: 4,
    title: "Job Interview",
    hindiTitle: "नौकरी का साक्षात्कार",
    difficulty: "Hard",
    emoji: "💼",
    category: "Professional",
    hindiThoughts: [
      "मैं अपनी योग्यताओं के बारे में बताऊंगा",
      "मैं आत्मविश्वास से जवाब दूंगा",
      "मैं अपने अनुभव साझा करूंगा"
    ],
    sentenceFrames: [
      "I have experience in ___",
      "My strength is ___",
      "I am passionate about ___",
      "I would like to contribute ___"
    ],
    modelAnswer: "Thank you for this opportunity. I have three years of experience in software development, particularly in web technologies. My strength is problem-solving and working well in teams. I am passionate about creating user-friendly applications. I would like to contribute my technical skills and fresh perspective to your company's growth.",
    freePrompt: "नौकरी के साक्षात्कार के लिए तैयारी करें",
    confidenceTip: "Prepare your answers beforehand. Practice speaking about your achievements and experiences confidently."
  },
  {
    id: 5,
    title: "Shopping Experience",
    hindiTitle: "खरीदारी का अनुभव",
    difficulty: "Medium",
    emoji: "🛍️",
    category: "Daily Life",
    hindiThoughts: [
      "मैं दुकानदार से विनम्रता से बात करूंगा",
      "मैं कीमत के बारे में पूछूंगा",
      "मैं अपनी पसंद बताऊंगा"
    ],
    sentenceFrames: [
      "How much does this cost?",
      "Do you have this in ___?",
      "Can I try this on?",
      "I'll take this one"
    ],
    modelAnswer: "Hello! I'm looking for a formal shirt for office wear. How much does this blue shirt cost? Do you have this in medium size? The quality looks good. Can I try this on? Yes, I'll take this one. Do you accept card payment?",
    freePrompt: "दुकान में खरीदारी करने का अभ्यास करें",
    confidenceTip: "Shopping is great practice for everyday English. Don't be afraid to ask questions about products."
  }
];

// For backward compatibility
export const speakingTopicsData = speakingTopics;