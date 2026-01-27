export interface HindiStory {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  content: string;
  contentHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  imageUrl?: string;
  vocabulary: Array<{
    word: string;
    hindi: string;
    pronunciation: string;
  }>;
  xpReward: number;
  estimatedTime: string;
}

// Legacy Story interface for StoryReader compatibility
export interface Story {
  id: number;
  title: string;
  titleHindi: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  paragraphs: Array<{
    english: string;
    hindi: string;
    vocabulary: Array<{
      word: string;
      meaning: string;
      hindiMeaning: string;
    }>;
  }>;
  moral: string;
  moralHindi: string;
}

export const hindiStoriesData: HindiStory[] = [
  {
    id: 1,
    title: "The Morning Routine",
    titleHindi: "सुबह की दिनचर्या",
    description: "Learn about daily morning activities in English",
    descriptionHindi: "अंग्रेजी में दैनिक सुबह की गतिविधियों के बारे में जानें",
    content: "Every morning, Raj wakes up at 6 AM. He brushes his teeth, takes a shower, and gets dressed. Then he has breakfast with his family. His mother makes delicious parathas and chai. After breakfast, he reads the newspaper and prepares for work.",
    contentHindi: "हर सुबह, राज 6 बजे उठता है। वह अपने दांत ब्रश करता है, नहाता है, और कपड़े पहनता है। फिर वह अपने परिवार के साथ नाश्ता करता है। उसकी माँ स्वादिष्ट पराठे और चाय बनाती है। नाश्ते के बाद, वह अखबार पढ़ता है और काम की तैयारी करता है।",
    difficulty: 'beginner',
    category: 'Daily Life',
    imageUrl: '/images/morning-routine.jpg',
    vocabulary: [
      { word: "wake up", hindi: "जागना", pronunciation: "weyk ʌp" },
      { word: "brush", hindi: "ब्रश करना", pronunciation: "brʌʃ" },
      { word: "shower", hindi: "नहाना", pronunciation: "ʃaʊər" },
      { word: "breakfast", hindi: "नाश्ता", pronunciation: "brekfəst" },
      { word: "newspaper", hindi: "अखबार", pronunciation: "nuzpeɪpər" }
    ],
    xpReward: 50,
    estimatedTime: "5 mins"
  },
  {
    id: 2,
    title: "Shopping at the Market",
    titleHindi: "बाजार में खरीदारी",
    description: "Learn shopping vocabulary and phrases",
    descriptionHindi: "खरीदारी की शब्दावली और वाक्यांश सीखें",
    content: "Priya goes to the local market every Saturday. She buys fresh vegetables, fruits, and groceries. The vendor is very friendly and always gives her a good discount. She bargains for the best price and fills her shopping bag with healthy food for the week.",
    contentHindi: "प्रिया हर शनिवार स्थानीय बाजार जाती है। वह ताजी सब्जियां, फल और किराने का सामान खरीदती है। विक्रेता बहुत मिलनसार है और हमेशा उसे अच्छी छूट देता है। वह सबसे अच्छी कीमत के लिए मोलभाव करती है और सप्ताह के लिए स्वस्थ भोजन से अपना शॉपिंग बैग भरती है।",
    difficulty: 'intermediate',
    category: 'Shopping',
    imageUrl: '/images/market-shopping.jpg',
    vocabulary: [
      { word: "market", hindi: "बाजार", pronunciation: "mɑrkɪt" },
      { word: "vendor", hindi: "विक्रेता", pronunciation: "vendər" },
      { word: "discount", hindi: "छूट", pronunciation: "dɪskaʊnt" },
      { word: "bargain", hindi: "मोलभाव", pronunciation: "bɑrgɪn" },
      { word: "groceries", hindi: "किराने का सामान", pronunciation: "groʊsəriz" }
    ],
    xpReward: 75,
    estimatedTime: "7 mins"
  },
  {
    id: 3,
    title: "The Job Interview",
    titleHindi: "नौकरी का साक्षात्कार",
    description: "Professional English for job interviews",
    descriptionHindi: "नौकरी के साक्षात्कार के लिए व्यावसायिक अंग्रेजी",
    content: "Amit has prepared thoroughly for his job interview at a multinational company. He arrives early, dressed professionally in a suit and tie. The interviewer asks about his experience, skills, and career goals. Amit answers confidently, highlighting his achievements and expressing enthusiasm for the role.",
    contentHindi: "अमित ने एक बहुराष्ट्रीय कंपनी में अपने नौकरी के साक्षात्कार के लिए अच्छी तरह से तैयारी की है। वह जल्दी पहुंचता है, सूट और टाई में पेशेवर रूप से तैयार होकर। साक्षात्कारकर्ता उसके अनुभव, कौशल और करियर के लक्ष्यों के बारे में पूछता है। अमित आत्मविश्वास से जवाब देता है, अपनी उपलब्धियों को उजागर करता है और भूमिका के लिए उत्साह व्यक्त करता है।",
    difficulty: 'advanced',
    category: 'Business',
    imageUrl: '/images/job-interview.jpg',
    vocabulary: [
      { word: "thoroughly", hindi: "अच्छी तरह से", pronunciation: "θɜrəli" },
      { word: "multinational", hindi: "बहुराष्ट्रीय", pronunciation: "mʌltiˈnæʃənəl" },
      { word: "professionally", hindi: "पेशेवर रूप से", pronunciation: "prəˈfeʃənəli" },
      { word: "achievements", hindi: "उपलब्धियां", pronunciation: "əˈtʃivmənts" },
      { word: "enthusiasm", hindi: "उत्साह", pronunciation: "ɪnˈθuziæzəm" }
    ],
    xpReward: 100,
    estimatedTime: "10 mins"
  },
  {
    id: 4,
    title: "Festival Celebrations",
    titleHindi: "त्योहार मनाना",
    description: "Learn about Indian festivals in English",
    descriptionHindi: "अंग्रेजी में भारतीय त्योहारों के बारे में जानें",
    content: "Diwali is the most celebrated festival in India. Families clean and decorate their homes with colorful rangoli and bright lights. They prepare sweets, exchange gifts, and burst firecrackers. The festival symbolizes the victory of light over darkness and good over evil.",
    contentHindi: "दिवाली भारत में सबसे मनाया जाने वाला त्योहार है। परिवार अपने घरों को रंगबिरंगी रंगोली और चमकदार रोशनी से साफ करते और सजाते हैं। वे मिठाइयां तैयार करते हैं, उपहारों का आदान-प्रदान करते हैं, और पटाखे फोड़ते हैं। यह त्योहार अंधकार पर प्रकाश की और बुराई पर अच्छाई की जीत का प्रतीक है।",
    difficulty: 'intermediate',
    category: 'Culture',
    imageUrl: '/images/diwali-celebration.jpg',
    vocabulary: [
      { word: "celebrated", hindi: "मनाया जाना", pronunciation: "seləˌbreɪtɪd" },
      { word: "decorate", hindi: "सजाना", pronunciation: "dekəˌreɪt" },
      { word: "rangoli", hindi: "रंगोली", pronunciation: "rʌŋgoʊli" },
      { word: "firecrackers", hindi: "पटाखे", pronunciation: "faɪərˌkrækərz" },
      { word: "symbolizes", hindi: "प्रतीक है", pronunciation: "sɪmbəˌlaɪzɪz" }
    ],
    xpReward: 80,
    estimatedTime: "8 mins"
  },
  {
    id: 5,
    title: "Technology in Daily Life",
    titleHindi: "दैनिक जीवन में प्रौद्योगिकी",
    description: "Modern technology vocabulary and usage",
    descriptionHindi: "आधुनिक प्रौद्योगिकी शब्दावली और उपयोग",
    content: "Smartphones have revolutionized our daily lives. We use apps for everything - ordering food, booking rides, making payments, and staying connected with friends. Social media platforms help us share moments and stay updated with news. However, it's important to maintain a healthy balance between digital and real-world interactions.",
    contentHindi: "स्मार्टफोन ने हमारे दैनिक जीवन में क्रांति ला दी है। हम सब कुछ के लिए ऐप्स का उपयोग करते हैं - खाना ऑर्डर करना, राइड बुक करना, भुगतान करना, और दोस्तों के साथ जुड़े रहना। सोशल मीडिया प्लेटफॉर्म हमें पलों को साझा करने और समाचारों के साथ अपडेट रहने में मदद करते हैं। हालांकि, डिजिटल और वास्तविक दुनिया की बातचीत के बीच एक स्वस्थ संतुलन बनाए रखना महत्वपूर्ण है।",
    difficulty: 'advanced',
    category: 'Technology',
    imageUrl: '/images/technology-daily.jpg',
    vocabulary: [
      { word: "revolutionized", hindi: "क्रांति ला दी", pronunciation: "revəˈluʃəˌnaɪzd" },
      { word: "platforms", hindi: "प्लेटफॉर्म", pronunciation: "plætˌfɔrmz" },
      { word: "interactions", hindi: "बातचीत", pronunciation: "ɪntərˈækʃənz" },
      { word: "maintain", hindi: "बनाए रखना", pronunciation: "meɪnˈteɪn" },
      { word: "balance", hindi: "संतुलन", pronunciation: "bæləns" }
    ],
    xpReward: 90,
    estimatedTime: "9 mins"
  }
];

// Story categories for filtering
export const storyCategories = [
  'All Stories',
  'Daily Life',
  'Shopping',
  'Business',
  'Culture',
  'Technology'
];

// Legacy stories data for StoryReader component compatibility
export const stories: Story[] = [
  {
    id: 1,
    title: "The Morning Routine",
    titleHindi: "सुबह की दिनचर्या",
    level: 'beginner',
    category: 'Daily Life',
    paragraphs: [
      {
        english: "Every morning, Raj wakes up at 6 AM. He brushes his teeth, takes a shower, and gets dressed. Then he has breakfast with his family.",
        hindi: "हर सुबह, राज 6 बजे उठता है। वह अपने दांत ब्रश करता है, नहाता है, और कपड़े पहनता है। फिर वह अपने परिवार के साथ नाश्ता करता है।",
        vocabulary: [
          { word: "wake up", meaning: "to stop sleeping", hindiMeaning: "जागना" },
          { word: "brush", meaning: "to clean with a brush", hindiMeaning: "ब्रश करना" },
          { word: "shower", meaning: "to wash with water", hindiMeaning: "नहाना" }
        ]
      },
      {
        english: "His mother makes delicious parathas and chai. After breakfast, he reads the newspaper and prepares for work.",
        hindi: "उसकी माँ स्वादिष्ट पराठे और चाय बनाती है। नाश्ते के बाद, वह अखबार पढ़ता है और काम की तैयारी करता है।",
        vocabulary: [
          { word: "delicious", meaning: "very tasty", hindiMeaning: "स्वादिष्ट" },
          { word: "paratha", meaning: "Indian flatbread", hindiMeaning: "पराठा" },
          { word: "newspaper", meaning: "daily publication", hindiMeaning: "अखबार" }
        ]
      }
    ],
    moral: "Starting your day with a healthy routine sets you up for success.",
    moralHindi: "अपने दिन को एक स्वस्थ दिनचर्या के साथ शुरू करना आपको सफलता के लिए तैयार करता है।"
  },
  {
    id: 2,
    title: "Shopping at the Market",
    titleHindi: "बाजार में खरीदारी",
    level: 'intermediate',
    category: 'Shopping',
    paragraphs: [
      {
        english: "Priya goes to the local market every Saturday. She buys fresh vegetables, fruits, and groceries. The vendor is very friendly and always gives her a good discount.",
        hindi: "प्रिया हर शनिवार स्थानीय बाजार जाती है। वह ताजी सब्जियां, फल और किराने का सामान खरीदती है। विक्रेता बहुत मिलनसार है और हमेशा उसे अच्छी छूट देता है।",
        vocabulary: [
          { word: "market", meaning: "place to buy things", hindiMeaning: "बाजार" },
          { word: "vendor", meaning: "seller", hindiMeaning: "विक्रेता" },
          { word: "discount", meaning: "reduction in price", hindiMeaning: "छूट" }
        ]
      },
      {
        english: "She bargains for the best price and fills her shopping bag with healthy food for the week.",
        hindi: "वह सबसे अच्छी कीमत के लिए मोलभाव करती है और सप्ताह के लिए स्वस्थ भोजन से अपना शॉपिंग बैग भरती है।",
        vocabulary: [
          { word: "bargain", meaning: "negotiate price", hindiMeaning: "मोलभाव" },
          { word: "healthy", meaning: "good for health", hindiMeaning: "स्वस्थ" },
          { word: "groceries", meaning: "food items", hindiMeaning: "किराने का सामान" }
        ]
      }
    ],
    moral: "Smart shopping and good relationships with vendors help you save money.",
    moralHindi: "स्मार्ट खरीदारी और विक्रेताओं के साथ अच्छे संबंध आपको पैसे बचाने में मदद करते हैं।"
  },
  {
    id: 3,
    title: "The Job Interview",
    titleHindi: "नौकरी का साक्षात्कार",
    level: 'advanced',
    category: 'Business',
    paragraphs: [
      {
        english: "Amit has prepared thoroughly for his job interview at a multinational company. He arrives early, dressed professionally in a suit and tie.",
        hindi: "अमित ने एक बहुराष्ट्रीय कंपनी में अपने नौकरी के साक्षात्कार के लिए अच्छी तरह से तैयारी की है। वह जल्दी पहुंचता है, सूट और टाई में पेशेवर रूप से तैयार होकर।",
        vocabulary: [
          { word: "thoroughly", meaning: "completely", hindiMeaning: "अच्छी तरह से" },
          { word: "multinational", meaning: "operating in many countries", hindiMeaning: "बहुराष्ट्रीय" },
          { word: "professionally", meaning: "in a business-like manner", hindiMeaning: "पेशेवर रूप से" }
        ]
      },
      {
        english: "The interviewer asks about his experience, skills, and career goals. Amit answers confidently, highlighting his achievements and expressing enthusiasm for the role.",
        hindi: "साक्षात्कारकर्ता उसके अनुभव, कौशल और करियर के लक्ष्यों के बारे में पूछता है। अमित आत्मविश्वास से जवाब देता है, अपनी उपलब्धियों को उजागर करता है और भूमिका के लिए उत्साह व्यक्त करता है।",
        vocabulary: [
          { word: "achievements", meaning: "accomplishments", hindiMeaning: "उपलब्धियां" },
          { word: "enthusiasm", meaning: "excitement", hindiMeaning: "उत्साह" },
          { word: "confidently", meaning: "with confidence", hindiMeaning: "आत्मविश्वास से" }
        ]
      }
    ],
    moral: "Preparation and confidence are key to success in job interviews.",
    moralHindi: "तैयारी और आत्मविश्वास नौकरी के साक्षात्कार में सफलता की कुंजी हैं।"
  },
  {
    id: 4,
    title: "Festival Celebrations",
    titleHindi: "त्योहार मनाना",
    level: 'intermediate',
    category: 'Culture',
    paragraphs: [
      {
        english: "Diwali is the most celebrated festival in India. Families clean and decorate their homes with colorful rangoli and bright lights.",
        hindi: "दिवाली भारत में सबसे मनाया जाने वाला त्योहार है। परिवार अपने घरों को रंगबिरंगी रंगोली और चमकदार रोशनी से साफ करते और सजाते हैं।",
        vocabulary: [
          { word: "celebrated", meaning: "observed with festivities", hindiMeaning: "मनाया जाना" },
          { word: "decorate", meaning: "to make beautiful", hindiMeaning: "सजाना" },
          { word: "rangoli", meaning: "colorful floor art", hindiMeaning: "रंगोली" }
        ]
      },
      {
        english: "They prepare sweets, exchange gifts, and burst firecrackers. The festival symbolizes the victory of light over darkness and good over evil.",
        hindi: "वे मिठाइयां तैयार करते हैं, उपहारों का आदान-प्रदान करते हैं, और पटाखे फोड़ते हैं। यह त्योहार अंधकार पर प्रकाश की और बुराई पर अच्छाई की जीत का प्रतीक है।",
        vocabulary: [
          { word: "firecrackers", meaning: "explosive devices", hindiMeaning: "पटाखे" },
          { word: "symbolizes", meaning: "represents", hindiMeaning: "प्रतीक है" },
          { word: "victory", meaning: "winning", hindiMeaning: "जीत" }
        ]
      }
    ],
    moral: "Festivals bring families together and celebrate the triumph of good.",
    moralHindi: "त्योहार परिवारों को एक साथ लाते हैं और अच्छाई की जीत का जश्न मनाते हैं।"
  },
  {
    id: 5,
    title: "Technology in Daily Life",
    titleHindi: "दैनिक जीवन में प्रौद्योगिकी",
    level: 'advanced',
    category: 'Technology',
    paragraphs: [
      {
        english: "Smartphones have revolutionized our daily lives. We use apps for everything - ordering food, booking rides, making payments, and staying connected with friends.",
        hindi: "स्मार्टफोन ने हमारे दैनिक जीवन में क्रांति ला दी है। हम सब कुछ के लिए ऐप्स का उपयोग करते हैं - खाना ऑर्डर करना, राइड बुक करना, भुगतान करना, और दोस्तों के साथ जुड़े रहना।",
        vocabulary: [
          { word: "revolutionized", meaning: "completely changed", hindiMeaning: "क्रांति ला दी" },
          { word: "apps", meaning: "applications", hindiMeaning: "ऐप्स" },
          { word: "payments", meaning: "money transfers", hindiMeaning: "भुगतान" }
        ]
      },
      {
        english: "Social media platforms help us share moments and stay updated with news. However, it's important to maintain a healthy balance between digital and real-world interactions.",
        hindi: "सोशल मीडिया प्लेटफॉर्म हमें पलों को साझा करने और समाचारों के साथ अपडेट रहने में मदद करते हैं। हालांकि, डिजिटल और वास्तविक दुनिया की बातचीत के बीच एक स्वस्थ संतुलन बनाए रखना महत्वपूर्ण है।",
        vocabulary: [
          { word: "platforms", meaning: "systems or services", hindiMeaning: "प्लेटफॉर्म" },
          { word: "interactions", meaning: "communications", hindiMeaning: "बातचीत" },
          { word: "balance", meaning: "equilibrium", hindiMeaning: "संतुलन" }
        ]
      }
    ],
    moral: "Technology is a tool - use it wisely to enhance your life, not replace it.",
    moralHindi: "प्रौद्योगिकी एक उपकरण है - इसे अपने जीवन को बेहतर बनाने के लिए बुद्धिमानी से उपयोग करें, इसे बदलने के लिए नहीं।"
  }
];
