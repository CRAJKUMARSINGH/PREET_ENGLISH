// Import the speaking topics data
import { speakingTopics } from '@/data/speakingTopics';

// Define the interface for speaking topics

// Define the interface for speaking topics
interface SpeakingTopic {
  id: number | string;
  title: string;
  hindiTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  emoji: string;
  category: string;
  hindiThoughts: string[];
  sentenceFrames: string[];
  modelAnswer: string;
  freePrompt: string;
  confidenceTip: string;
}

// Enhanced interface for reference app topics
interface ReferenceTopic {
  id: string;
  title: string;
  hindi_title?: string;
  emoji: string;
  hindi_context?: string;
  hint?: string;
  difficulty: string;
  category?: string;
  thinking_in_hindi?: string[];
  sentence_frames?: string[];
  model_answer?: string;
  free_prompt?: string;
  confidence_tip?: string;
}

// Load reference topics from JSON
const referenceTopics: any = {
  easy_topics: [
    {
      id: "daily_routine",
      title: "Daily Routine",
      hindi_title: "दिनचर्या के बारे में बात करें",
      emoji: "⏰",
      hindi_context: "दैनिक दिनचर्या के बारे में बात करना सीखें - सुबह से रात तक",
      hint: "इस विषय में हम सुबह उठने से लेकर रात को सोने तक की गतिविधियों के बारे में बात करेंगे।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "family_relationships",
      title: "Family and Relationships",
      hindi_title: "परिवार और रिश्ते",
      emoji: "👨‍👩‍👧‍👦",
      hindi_context: "परिवार के सदस्यों और रिश्तों के बारे में चर्चा",
      hint: "अपने परिवार के बारे में बताना सीखें - माता-पिता, भाई-बहन, और अन्य रिश्ते।",
      difficulty: "easy",
      category: "social"
    },
    {
      id: "weekend_plans",
      title: "Talk about Weekend",
      hindi_title: "वीकेंड की योजनाएं",
      emoji: "🏖️",
      hindi_context: "सप्ताहांत की गतिविधियों और योजनाओं पर चर्चा",
      hint: "वीकेंड पर क्या करते हैं? मूवी, शॉपिंग, या आराम? इस पर बातचीत करें।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "food_cooking",
      title: "Food and Cooking",
      hindi_title: "खाना और कुकिंग",
      emoji: "🍳",
      hindi_context: "भोजन और पकाने की बातचीत",
      hint: "अपना पसंदीदा खाना, कुकिंग टिप्स, और रेसिपीज के बारे में बात करें।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "pets_conversation",
      title: "Talking about Pets",
      hindi_title: "पालतू जानवरों की बातें",
      emoji: "🐾",
      hindi_context: "पालतू जानवरों के बारे में बातचीत",
      hint: "क्या आपके पास पालतू जानवर है? उनके बारे में दिलचस्प बातें बताएं।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "describing_friend",
      title: "Describing a Friend",
      hindi_title: "दोस्त का वर्णन",
      emoji: "🤝",
      hindi_context: "दोस्त के गुणों और विशेषताओं का वर्णन",
      hint: "अपने सबसे अच्छे दोस्त की विशेषताएं बताना सीखें।",
      difficulty: "easy",
      category: "social"
    },
    {
      id: "talking_to_date",
      title: "Talking to a Date",
      hindi_title: "डेट पर बातचीत",
      emoji: "💖",
      hindi_context: "डेट पर शिष्ट और रोचक बातचीत",
      hint: "पहली डेट पर कैसे बात करें? रुचिकार्जक विषय और सवाल।",
      difficulty: "easy",
      category: "social"
    },
    {
      id: "shopping_price_size",
      title: "Shopping: Price & Size",
      hindi_title: "दुकान में मोल-भाव और साइज",
      emoji: "🛍️",
      hindi_context: "खरीदारी के दौरान कीमत और साइज के बारे में पूछताछ",
      hint: "कीमत पूछना, साइज चेक करना, और छूट मांगना सीखें।",
      difficulty: "easy",
      category: "shopping"
    },
    {
      id: "order_tea_coffee",
      title: "Order Tea or Coffee",
      hindi_title: "कैफे में ऑर्डर देना",
      emoji: "☕",
      hindi_context: "कैफे या चाय की दुकान में ऑर्डर देना",
      hint: "कैफे में चाय-कॉफी ऑर्डर करने के वाक्य और शब्द।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "order_food_restaurant",
      title: "Order Food at Restaurant",
      hindi_title: "रेस्टोरेंट में खाना मांगना",
      emoji: "🍕",
      hindi_context: "रेस्टोरेंट में मेनू देखना और ऑर्डर देना",
      hint: "रेस्टोरेंट में मेनू समझना और खाना ऑर्डर करना सीखें।",
      difficulty: "easy",
      category: "daily_life"
    },
    {
      id: "book_taxi_ride",
      title: "Book a Taxi or Ride",
      hindi_title: "टैक्सी बुक करना",
      emoji: "🚕",
      hindi_context: "टैक्सी या कैब बुक करना",
      hint: "ऑनलाइन कैब बुक करना या सड़क पर टैक्सी रोकना सीखें।",
      difficulty: "easy",
      category: "travel"
    },
    {
      id: "emergency_health",
      title: "Emergency & Health",
      hindi_title: "आपातकालीन और स्वास्थ्य शब्दावली",
      emoji: "🚑",
      hindi_context: "आपातकालीन स्थिति और स्वास्थ्य से संबंधित शब्द",
      hint: "डॉक्टर के पास जाना, दवाई लेना, और आपातकाल में मदद मांगना।",
      difficulty: "easy",
      category: "health"
    },
    {
      id: "express_emotions",
      title: "Express Inner Emotions",
      hindi_title: "अपनी भावनाओं को व्यक्त करें",
      emoji: "😊",
      hindi_context: "अपनी भावनाओं को अंग्रेजी में कैसे बताएं",
      hint: "खुशी, दुख, गुस्सा, और चिंता जैसी भावनाओं को व्यक्त करना सीखें।",
      difficulty: "easy",
      category: "emotions"
    }
  ],
  medium_topics: [
    {
      id: "future_of_work",
      title: "Future of Work",
      hindi_title: "काम का भविष्य और AI",
      emoji: "💻",
      hindi_context: "काम के भविष्य पर चर्चा - रिमोट वर्क, AI, और ऑटोमेशन",
      hint: "घर से काम, ऑटोमेशन, और AI के बारे में बात करें।",
      difficulty: "medium",
      category: "professional"
    },
    {
      id: "personal_finance",
      title: "Personal Finance",
      hindi_title: "पैसा और बचत",
      emoji: "💰",
      hindi_context: "व्यक्तिगत वित्त और पैसे के प्रबंधन पर चर्चा",
      hint: "बजट बनाना, बचत करना, और निवेश के बारे में सीखें।",
      difficulty: "medium",
      category: "finance"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      hindi_title: "ऑनलाइन सुरक्षा",
      emoji: "🔒",
      hindi_context: "ऑनलाइन सुरक्षा और डेटा प्राइवेसी पर चर्चा",
      hint: "पासवर्ड, फिशिंग, और ऑनलाइन सुरक्षा के टिप्स।",
      difficulty: "medium",
      category: "technology"
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      hindi_title: "खुद का बिजनेस शुरू करना",
      emoji: "🚀",
      hindi_context: "स्टार्टअप और उद्यमिता पर चर्चा",
      hint: "बिजनेस आइडिया, निवेश, और मार्केट रिसर्च के बारे में बात करें।",
      difficulty: "medium",
      category: "business"
    },
    {
      id: "cultural_differences",
      title: "Cultural Differences",
      hindi_title: "संस्कृतियों में अंतर",
      emoji: "🌍",
      hindi_context: "विभिन्न संस्कृतियों और परंपराओं पर चर्चा",
      hint: "भारतीय और विदेशी संस्कृतियों के अंतर पर बात करें।",
      difficulty: "medium",
      category: "culture"
    },
    {
      id: "airport_travel",
      title: "Airport & Travel",
      hindi_title: "एयरपोर्ट और यात्रा की शब्दावली",
      emoji: "✈️",
      hindi_context: "हवाई यात्रा और एयरपोर्ट प्रक्रिया पर चर्चा",
      hint: "टिकट बुक करना, चेक-इन, और सुरक्षा जांच के बारे में सीखें।",
      difficulty: "medium",
      category: "travel"
    },
    {
      id: "time_management",
      title: "Time Management",
      hindi_title: "समय का सदुपयोग",
      emoji: "⏳",
      hindi_context: "समय प्रबंधन और उत्पादकता पर चर्चा",
      hint: "समय की योजना बनाना, प्राथमिकता तय करना, और टालमटोल से बचना।",
      difficulty: "medium",
      category: "productivity"
    },
    {
      id: "role_models",
      title: "Role Models",
      hindi_title: "प्रेरणादायक व्यक्ति",
      emoji: "🌟",
      hindi_context: "प्रेरणादायक व्यक्तियों और उनके गुणों पर चर्चा",
      hint: "अपने रोल मॉडल और उनसे प्रेरणा के बारे में बात करें।",
      difficulty: "medium",
      category: "inspiration"
    },
    {
      id: "online_learning",
      title: "Online Learning",
      hindi_title: "ऑनलाइन पढ़ाई के फायदे",
      emoji: "🎓",
      hindi_context: "ऑनलाइन शिक्षा और डिजिटल लर्निंग पर चर्चा",
      hint: "ऑनलाइन कोर्सेस, वेबिनार, और ई-लर्निंग के बारे में बात करें।",
      difficulty: "medium",
      category: "education"
    }
  ],
  hard_topics: [
    {
      id: "environmental_issues",
      title: "Environmental Issues",
      hindi_title: "पर्यावरण की समस्याएं",
      emoji: "🌿",
      hindi_context: "पर्यावरणीय चुनौतियों और समाधानों पर गहरी चर्चा",
      hint: "प्रदूषण, वनों की कटाई, और जलवायु परिवर्तन पर विस्तृत बहस।",
      difficulty: "hard",
      category: "environment"
    },
    {
      id: "gender_equality",
      title: "Gender Equality",
      hindi_title: "लैंगिक समानता",
      emoji: "⚖️",
      hindi_context: "लैंगिक समानता और सामाजिक न्याय पर गहन चर्चा",
      hint: "महिला सशक्तिकरण, वेतन अंतर, और सामाजिक रूढ़ियों पर बहस।",
      difficulty: "hard",
      category: "society"
    },
    {
      id: "philosophical_debates",
      title: "Philosophical Debates",
      hindi_title: "दार्शनिक बहस",
      emoji: "🧐",
      hindi_context: "अस्तित्व, नैतिकता, और जीवन के अर्थ पर दार्शनिक चर्चा",
      hint: "स्वतंत्र इच्छा बनाम निर्धारितिवाद, और जीवन के अर्थ पर बहस।",
      difficulty: "hard",
      category: "philosophy"
    },
    {
      id: "renewable_energy",
      title: "Renewable Energy",
      hindi_title: "अक्षय ऊर्जा के स्रोत",
      emoji: "☀️",
      hindi_context: "नवीकरणीय ऊर्जा और टिकाऊ विकास पर तकनीकी चर्चा",
      hint: "सोलर पावर, विंड एनर्जी, और ग्रीन टेकनोलॉजी पर विस्तृत चर्चा।",
      difficulty: "hard",
      category: "technology"
    },
    {
      id: "climate_change_mitigation",
      title: "Climate Change Mitigation",
      hindi_title: "जलवायु परिवर्तन को रोकना",
      emoji: "🌡️",
      hindi_context: "जलवायु परिवर्तन के समाधान और वैश्विक प्रयासों पर चर्चा",
      hint: "कार्बन उत्सर्जन में कमी, हरित तकनीक, और अंतरराष्ट्रीय समझौते।",
      difficulty: "hard",
      category: "environment"
    },
    {
      id: "modern_art_movements",
      title: "Modern Art Movements",
      hindi_title: "आधुनिक कला आंदोलन",
      emoji: "🎨",
      hindi_context: "आधुनिक कला आंदोलनों और उनके प्रभाव पर चर्चा",
      hint: "क्यूबिज्म, सरियलिज्म, और अमूर्त अभिव्यक्तिवाद पर बहस।",
      difficulty: "hard",
      category: "art"
    },
    {
      id: "space_exploration",
      title: "Space Exploration",
      hindi_title: "अंतरिक्ष की खोज",
      emoji: "🚀",
      hindi_context: "अंतरिक्ष अन्वेषण और भविष्य की संभावनाओं पर चर्चा",
      hint: "मंगल ग्रह पर जीवन, स्पेस टूरिज्म, और इंटरस्टेलर ट्रैवल पर बहस।",
      difficulty: "hard",
      category: "science"
    }
  ],
  interview_practice: [
    {
      id: "interview_introduction",
      title: "Interview Introduction",
      hindi_title: "अपना परिचय देना सीखें",
      emoji: "👋",
      hindi_context: "इंटरव्यू में प्रभावी परिचन देना",
      hint: "एलीवेटर पिच बनाना और पहली छाप बेहतर बनाना सीखें।",
      difficulty: "medium",
      category: "interview"
    },
    {
      id: "job_interview_practice",
      title: "Job Interview Practice",
      hindi_title: "नौकरी के लिए मॉक इंटरव्यू",
      emoji: "💼",
      hindi_context: "नौकरी इंटरव्यू के सामान्य सवाल और जवाब",
      hint: "स्ट्रेंथ्स, वीकनेसेस, और करियर गोल्स पर सवालों की तैयारी।",
      difficulty: "medium",
      category: "interview"
    },
    {
      id: "salary_negotiation",
      title: "Salary Negotiation",
      hindi_title: "सैलरी पर बात कैसे करें",
      emoji: "💸",
      hindi_context: "सैलरी वार्तालाप और वार्ता कौशल",
      hint: "अपेक्षित सैलरी कैसे बताएं और बेनिफिट्स पर चर्चा करें।",
      difficulty: "medium",
      category: "interview"
    },
    {
      id: "mba_interview",
      title: "MBA Interview",
      hindi_title: "एमबीए एडमिशन की तैयारी",
      emoji: "🏫",
      hindi_context: "एमबीए प्रवेश इंटरव्यू की तैयारी",
      hint: "बिजनेस अवेयरनेस, लीडरशिप स्किल्स, और करियर प्लानिंग पर सवाल।",
      difficulty: "hard",
      category: "interview"
    },
    {
      id: "upsc_interview",
      title: "UPSC Interview",
      hindi_title: "यूपीएससी व्यक्तित्व परीक्षण",
      emoji: "🇮🇳",
      hindi_context: "यूपीएससी सिविल सेवा इंटरव्यू की तैयारी",
      hint: "करंट अफेयर्स, नैतिकता, और सामाजिक मुद्दों पर गहन चर्चा।",
      difficulty: "hard",
      category: "interview"
    },
    {
      id: "hr_interview",
      title: "HR Interview",
      hindi_title: "एचआर राउंड की तैयारी",
      emoji: "📋",
      hindi_context: "मानव संसाधन इंटरव्यू की तैयारी",
      hint: "टीमवर्क, कॉन्फ्लिक्ट रेजोल्यूशन, और कंपनी कल्चर पर सवाल।",
      difficulty: "medium",
      category: "interview"
    },
    {
      id: "career_plans",
      title: "Career Plans",
      hindi_title: "करियर की योजनाओं पर चर्चा",
      emoji: "📈",
      hindi_context: "अपने करियर की दिशा और योजनाओं पर चर्चा",
      hint: "शॉर्ट-टर्म और लॉन्ग-टर्म करियर गोल्स को स्पष्ट रूप से बताएं।",
      difficulty: "medium",
      category: "interview"
    }
  ],
  specialized_categories: [
    {
      id: "history_conversations",
      title: "History",
      hindi_title: "इतिहास",
      emoji: "📜",
      hindi_context: "भारतीय और विश्व इतिहास पर चर्चा",
      hint: "प्राचीन भारत, स्वतंत्रता संग्राम, और ऐतिहासिक घटनाओं पर बातचीत।",
      difficulty: "medium",
      category: "history"
    },
    {
      id: "banking_conversations",
      title: "Banking",
      hindi_title: "बैंकिंग",
      emoji: "🏦",
      hindi_context: "बैंकिंग सेवाओं और वित्तीय उत्पादों पर चर्चा",
      hint: "लोन, ब्याज दर, डिजिटल बैंकिंग, और निवेश विकल्पों पर बातचीत।",
      difficulty: "medium",
      category: "finance"
    },
    {
      id: "business_case_study",
      title: "Business Case Study",
      hindi_title: "बिजनेस केस स्टडी",
      emoji: "📊",
      hindi_context: "वास्तविक व्यावसायिक समस्याओं का विश्लेषण",
      hint: "बिजनेस समस्याओं का समाधान और रणनीतिक सोच का विकास।",
      difficulty: "hard",
      category: "business"
    },
    {
      id: "ielts_counsellor",
      title: "IELTS Counsellor",
      hindi_title: "आईईएलटीएस सलाहकार",
      emoji: "📝",
      hindi_context: "आईईएलटीएस परीक्षा की तैयारी और टिप्स",
      hint: "स्पीकिंग, राइटिंग, रीडिंग, और लिसनिंग स्किल्स में सुधार।",
      difficulty: "hard",
      category: "education"
    }
  ]
};

// Transform reference topics to match our app's format
const transformReferenceTopic = (refTopic: any): SpeakingTopic => {
  // Determine difficulty with proper capitalization
  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium'; // default
  if (refTopic.difficulty.toLowerCase() === 'easy') difficulty = 'Easy';
  else if (refTopic.difficulty.toLowerCase() === 'medium') difficulty = 'Medium';
  else if (refTopic.difficulty.toLowerCase() === 'hard') difficulty = 'Hard';

  // Use available hindi title or context, or default to english title
  const hindiTitle = refTopic.hindi_title || refTopic.hindi_context || refTopic.title;

  return {
    id: refTopic.id,
    title: refTopic.title,
    hindiTitle: hindiTitle,
    difficulty: difficulty,
    emoji: refTopic.emoji || '📚',
    category: refTopic.category || 'General',
    hindiThoughts: refTopic.thinking_in_hindi || [
      "इस विषय पर आप क्या सोचते हैं?",
      "इसका आपके जीवन से क्या संबंध है?",
      "इस पर अपनी राय दें।"
    ],
    sentenceFrames: refTopic.sentence_frames || [
      "One sentence about this topic is ___.",
      "I think that ___.",
      "For example, ___."
    ],
    modelAnswer: refTopic.model_answer || `This is a model answer for ${refTopic.title}. ${refTopic.hint || "Practice speaking about this topic."}`,
    freePrompt: refTopic.free_prompt || `Speak for 30 seconds about ${refTopic.title}.`,
    confidenceTip: refTopic.confidence_tip || "Don't worry about making mistakes. Focus on expressing your thoughts clearly."
  };
};

// Flatten all reference topics into a single array
const allReferenceTopics: SpeakingTopic[] = [
  ...referenceTopics.easy_topics.map(transformReferenceTopic),
  ...referenceTopics.medium_topics.map(transformReferenceTopic),
  ...referenceTopics.hard_topics.map(transformReferenceTopic),
  ...referenceTopics.interview_practice.map(transformReferenceTopic),
  ...referenceTopics.specialized_categories.map(transformReferenceTopic)
];

// Combine with existing app topics
const allTopics: SpeakingTopic[] = [...speakingTopics, ...allReferenceTopics] as SpeakingTopic[];

export const topicService = {
  // Get all topics (combined from both sources)
  getAllTopics: (): Promise<SpeakingTopic[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve(allTopics);
      }, 300);
    });
  },

  // Get a specific topic by ID
  getTopicById: (id: number | string): Promise<SpeakingTopic | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const topic = allTopics.find(topic => topic.id === id);
        resolve(topic);
      }, 100);
    });
  },

  // Get topics by category
  getTopicsByCategory: (category: string): Promise<SpeakingTopic[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTopics = allTopics.filter(topic => 
          topic.category.toLowerCase() === category.toLowerCase()
        );
        resolve(filteredTopics);
      }, 300);
    });
  },

  // Get topics by difficulty
  getTopicsByDifficulty: (difficulty: string): Promise<SpeakingTopic[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTopics = allTopics.filter(topic => 
          topic.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
        resolve(filteredTopics);
      }, 300);
    });
  },

  // Get unique categories
  getCategories: (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = Array.from(new Set(allTopics.map(topic => topic.category)));
        resolve(categories);
      }, 100);
    });
  },

  // Get unique difficulties
  getDifficulties: (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const difficulties = Array.from(new Set(allTopics.map(topic => topic.difficulty)));
        resolve(difficulties);
      }, 100);
    });
  }
};