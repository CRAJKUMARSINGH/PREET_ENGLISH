export interface SpeakingTopic {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // in minutes
  keyPoints: string[];
  keyPointsHindi: string[];
  sampleQuestions: string[];
  sampleQuestionsHindi: string[];
  xpReward: number;
  estimatedTime: string;
}

export const speakingTopicsData: SpeakingTopic[] = [
  {
    id: 1,
    title: "Introducing Yourself",
    titleHindi: "अपना परिचय देना",
    description: "Learn how to introduce yourself in English with confidence",
    descriptionHindi: "अंग्रेजी में आत्मविश्वास के साथ अपना परिचय देना सीखें",
    difficulty: "beginner",
    category: "Personal",
    duration: 5,
    keyPoints: [
      "State your name clearly",
      "Mention your profession or studies",
      "Share a brief background",
      "Express your interests"
    ],
    keyPointsHindi: [
      "अपना नाम स्पष्ट रूप से बताएं",
      "अपने पेशे या अध्ययन का उल्लेख करें",
      "संक्षिप्त पृष्ठभूमि साझा करें",
      "अपनी रुचियों को व्यक्त करें"
    ],
    sampleQuestions: [
      "What is your name?",
      "Where are you from?",
      "What do you do?",
      "What are your hobbies?"
    ],
    sampleQuestionsHindi: [
      "आपका नाम क्या है?",
      "आप कहाँ से हैं?",
      "आप क्या करते हैं?",
      "आपके शौक क्या हैं?"
    ],
    xpReward: 50,
    estimatedTime: "5 mins"
  },
  {
    id: 2,
    title: "Ordering Food",
    titleHindi: "खाना ऑर्डर करना",
    description: "Master the vocabulary and phrases for ordering food at restaurants",
    descriptionHindi: "रेस्तरां में खाना ऑर्डर करने के लिए शब्दावली और वाक्यांश सीखें",
    difficulty: "beginner",
    category: "Daily Life",
    duration: 5,
    keyPoints: [
      "Ask for a table",
      "Request the menu",
      "Ask about dishes",
      "Place your order",
      "Request the bill"
    ],
    keyPointsHindi: [
      "टेबल के लिए पूछें",
      "मेन्यू के लिए अनुरोध करें",
      "व्यंजनों के बारे में पूछें",
      "अपना ऑर्डर दें",
      "बिल के लिए अनुरोध करें"
    ],
    sampleQuestions: [
      "Do you have a table for two?",
      "What do you recommend?",
      "Is this dish spicy?",
      "Can I have the bill, please?"
    ],
    sampleQuestionsHindi: [
      "क्या आपके पास दो लोगों के लिए टेबल है?",
      "आप क्या सुझाते हैं?",
      "क्या यह व्यंजन मसालेदार है?",
      "क्या मुझे बिल दे सकते हैं, कृपया?"
    ],
    xpReward: 60,
    estimatedTime: "5 mins"
  },
  {
    id: 3,
    title: "Asking for Directions",
    titleHindi: "दिशा पूछना",
    description: "Learn how to ask for and give directions confidently",
    descriptionHindi: "आत्मविश्वास के साथ दिशा पूछना और देना सीखें",
    difficulty: "beginner",
    category: "Travel",
    duration: 5,
    keyPoints: [
      "Ask for directions politely",
      "Understand directional terms",
      "Ask about distance",
      "Confirm directions",
      "Thank the person"
    ],
    keyPointsHindi: [
      "विनम्रता से दिशा पूछें",
      "दिशात्मक शब्दों को समझें",
      "दूरी के बारे में पूछें",
      "दिशा की पुष्टि करें",
      "व्यक्ति को धन्यवाद दें"
    ],
    sampleQuestions: [
      "Excuse me, where is the station?",
      "How far is it from here?",
      "Should I go straight or turn?",
      "Is it walking distance?"
    ],
    sampleQuestionsHindi: [
      "माफ करिए, स्टेशन कहाँ है?",
      "यहाँ से कितनी दूर है?",
      "क्या मुझे सीधे जाना चाहिए या मुड़ना चाहिए?",
      "क्या यह पैदल दूरी है?"
    ],
    xpReward: 55,
    estimatedTime: "5 mins"
  },
  {
    id: 4,
    title: "Job Interview",
    titleHindi: "नौकरी का साक्षात्कार",
    description: "Prepare for job interviews with professional English",
    descriptionHindi: "व्यावसायिक अंग्रेजी के साथ नौकरी के साक्षात्कार की तैयारी करें",
    difficulty: "advanced",
    category: "Professional",
    duration: 10,
    keyPoints: [
      "Introduce yourself professionally",
      "Discuss your experience",
      "Highlight your skills",
      "Ask relevant questions",
      "Close the interview positively"
    ],
    keyPointsHindi: [
      "पेशेवर रूप से अपना परिचय दें",
      "अपने अनुभव पर चर्चा करें",
      "अपने कौशल को उजागर करें",
      "प्रासंगिक प्रश्न पूछें",
      "साक्षात्कार को सकारात्मक रूप से समाप्त करें"
    ],
    sampleQuestions: [
      "Tell me about yourself",
      "What are your strengths?",
      "Why do you want this job?",
      "What are your salary expectations?"
    ],
    sampleQuestionsHindi: [
      "अपने बारे में बताइए",
      "आपकी ताकत क्या हैं?",
      "आप यह नौकरी क्यों चाहते हैं?",
      "आपकी वेतन की अपेक्षाएं क्या हैं?"
    ],
    xpReward: 100,
    estimatedTime: "10 mins"
  },
  {
    id: 5,
    title: "Making Phone Calls",
    titleHindi: "फोन कॉल करना",
    description: "Master telephone etiquette and common phrases",
    descriptionHindi: "टेलीफोन शिष्टाचार और सामान्य वाक्यांश सीखें",
    difficulty: "intermediate",
    category: "Communication",
    duration: 5,
    keyPoints: [
      "Greet the person",
      "Introduce yourself",
      "State your purpose",
      "Listen actively",
      "End the call politely"
    ],
    keyPointsHindi: [
      "व्यक्ति को बधाई दें",
      "अपना परिचय दें",
      "अपने उद्देश्य को बताएं",
      "सक्रिय रूप से सुनें",
      "विनम्रता से कॉल समाप्त करें"
    ],
    sampleQuestions: [
      "Hello, may I speak to John?",
      "Could you take a message?",
      "When will he be available?",
      "Thank you for your time"
    ],
    sampleQuestionsHindi: [
      "नमस्ते, क्या मैं जॉन से बात कर सकता हूँ?",
      "क्या आप एक संदेश ले सकते हैं?",
      "वह कब उपलब्ध होंगे?",
      "आपके समय के लिए धन्यवाद"
    ],
    xpReward: 70,
    estimatedTime: "5 mins"
  },
  {
    id: 6,
    title: "Describing Your Day",
    titleHindi: "अपने दिन का वर्णन करना",
    description: "Learn to describe daily activities and experiences",
    descriptionHindi: "दैनिक गतिविधियों और अनुभवों का वर्णन करना सीखें",
    difficulty: "intermediate",
    category: "Daily Life",
    duration: 5,
    keyPoints: [
      "Use past tense correctly",
      "Describe activities in sequence",
      "Express feelings and emotions",
      "Use time expressions",
      "Add interesting details"
    ],
    keyPointsHindi: [
      "भूतकाल का सही उपयोग करें",
      "गतिविधियों का क्रम में वर्णन करें",
      "भावनाओं को व्यक्त करें",
      "समय के भाव का उपयोग करें",
      "दिलचस्प विवरण जोड़ें"
    ],
    sampleQuestions: [
      "How was your day?",
      "What did you do this morning?",
      "Did you enjoy it?",
      "What will you do tomorrow?"
    ],
    sampleQuestionsHindi: [
      "आपका दिन कैसा था?",
      "आपने आज सुबह क्या किया?",
      "क्या आपने इसका आनंद लिया?",
      "आप कल क्या करेंगे?"
    ],
    xpReward: 65,
    estimatedTime: "5 mins"
  }
];

// Alias for backward compatibility
export const speakingTopics = speakingTopicsData;
