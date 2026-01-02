// Hindi Common Phrases Data - 100+ Essential Phrases for Hindi Mother Tongue English Learning
// Prepared by: Mrs. Premlata Jain, AAO, PWD Udaipur

export interface CommonPhrase {
  id: number;
  english: string;
  hindi: string;
  pronunciation: string;
  usage: string;
  usageHindi: string;
  example: string;
  exampleHindi: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isFavorite?: boolean;
}

export const commonPhrases: CommonPhrase[] = [
  // ==================== GREETINGS & INTRODUCTIONS (1-20) ====================
  {
    id: 1,
    english: "Good morning!",
    hindi: "सुप्रभात!",
    pronunciation: "Good MOR-ning!",
    usage: "Used to greet someone in the morning",
    usageHindi: "सुबह किसी का अभिवादन करने के लिए",
    example: "Good morning! How did you sleep?",
    exampleHindi: "सुप्रभात! आपकी नींद कैसी रही?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 2,
    english: "Good afternoon!",
    hindi: "नमस्कार!",
    pronunciation: "Good af-ter-NOON!",
    usage: "Used to greet someone in the afternoon",
    usageHindi: "दोपहर में किसी का अभिवादन करने के लिए",
    example: "Good afternoon! Are you free for lunch?",
    exampleHindi: "नमस्कार! क्या आप दोपहर के भोजन के लिए फ्री हैं?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 3,
    english: "Good evening!",
    hindi: "शुभ संध्या!",
    pronunciation: "Good EE-vning!",
    usage: "Used to greet someone in the evening",
    usageHindi: "शाम को किसी का अभिवादन करने के लिए",
    example: "Good evening! Nice weather today.",
    exampleHindi: "शुभ संध्या! आज मौसम अच्छा है।",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 4,
    english: "Good night!",
    hindi: "शुभ रात्रि!",
    pronunciation: "Good NITE!",
    usage: "Used when saying goodbye at night or before sleeping",
    usageHindi: "रात को अलविदा कहते समय या सोने से पहले",
    example: "Good night! Sleep well.",
    exampleHindi: "शुभ रात्रि! अच्छी नींद लें।",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 5,
    english: "How are you?",
    hindi: "आप कैसे हैं?",
    pronunciation: "How ar YOO?",
    usage: "Used to ask about someone's well-being",
    usageHindi: "किसी की कुशलता पूछने के लिए",
    example: "Hello! How are you today?",
    exampleHindi: "नमस्ते! आज आप कैसे हैं?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 6,
    english: "I am fine, thank you.",
    hindi: "मैं ठीक हूँ, धन्यवाद।",
    pronunciation: "I am FINE, thank YOO.",
    usage: "Response to 'How are you?'",
    usageHindi: "'आप कैसे हैं?' का जवाब",
    example: "I am fine, thank you. And you?",
    exampleHindi: "मैं ठीक हूँ, धन्यवाद। और आप?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 7,
    english: "Nice to meet you.",
    hindi: "आपसे मिलकर खुशी हुई।",
    pronunciation: "Nice too MEET yoo.",
    usage: "Used when meeting someone for the first time",
    usageHindi: "किसी से पहली बार मिलने पर",
    example: "Hello, I'm Raj. Nice to meet you.",
    exampleHindi: "नमस्ते, मैं राज हूँ। आपसे मिलकर खुशी हुई।",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 8,
    english: "What is your name?",
    hindi: "आपका नाम क्या है?",
    pronunciation: "Wot iz yor NAYM?",
    usage: "Used to ask someone's name",
    usageHindi: "किसी का नाम पूछने के लिए",
    example: "Hello! What is your name?",
    exampleHindi: "नमस्ते! आपका नाम क्या है?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 9,
    english: "My name is...",
    hindi: "मेरा नाम... है।",
    pronunciation: "My naym iz...",
    usage: "Used to introduce yourself",
    usageHindi: "अपना परिचय देने के लिए",
    example: "My name is Priya. I am from Delhi.",
    exampleHindi: "मेरा नाम प्रिया है। मैं दिल्ली से हूँ।",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 10,
    english: "Where are you from?",
    hindi: "आप कहाँ से हैं?",
    pronunciation: "Wair ar yoo FROM?",
    usage: "Used to ask about someone's hometown or country",
    usageHindi: "किसी के शहर या देश के बारे में पूछने के लिए",
    example: "Nice to meet you. Where are you from?",
    exampleHindi: "आपसे मिलकर खुशी हुई। आप कहाँ से हैं?",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 11,
    english: "See you later!",
    hindi: "फिर मिलेंगे!",
    pronunciation: "See yoo LAY-ter!",
    usage: "Used when saying goodbye temporarily",
    usageHindi: "अस्थायी रूप से अलविदा कहते समय",
    example: "I have to go now. See you later!",
    exampleHindi: "मुझे अब जाना होगा। फिर मिलेंगे!",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 12,
    english: "Take care!",
    hindi: "अपना ख्याल रखना!",
    pronunciation: "Tayk KAIR!",
    usage: "Used when saying goodbye with concern",
    usageHindi: "चिंता के साथ अलविदा कहते समय",
    example: "Goodbye! Take care of yourself.",
    exampleHindi: "अलविदा! अपना ख्याल रखना।",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 13,
    english: "Have a nice day!",
    hindi: "आपका दिन शुभ हो!",
    pronunciation: "Hav uh nice DAY!",
    usage: "Used to wish someone well for the day",
    usageHindi: "किसी को दिन के लिए शुभकामनाएं देने के लिए",
    example: "Thank you for your help. Have a nice day!",
    exampleHindi: "आपकी मदद के लिए धन्यवाद। आपका दिन शुभ हो!",
    category: "Greetings",
    difficulty: "beginner"
  },
  {
    id: 14,
    english: "Long time no see!",
    hindi: "बहुत दिनों बाद मिले!",
    pronunciation: "Long time noh SEE!",
    usage: "Used when meeting someone after a long time",
    usageHindi: "लंबे समय बाद किसी से मिलने पर",
    example: "Hey Rahul! Long time no see! How have you been?",
    exampleHindi: "अरे राहुल! बहुत दिनों बाद मिले! कैसे हो?",
    category: "Greetings",
    difficulty: "intermediate"
  },
  {
    id: 15,
    english: "It's a pleasure to meet you.",
    hindi: "आपसे मिलकर प्रसन्नता हुई।",
    pronunciation: "Its uh PLEZH-er too meet yoo.",
    usage: "Formal way of saying nice to meet you",
    usageHindi: "'आपसे मिलकर खुशी हुई' का औपचारिक तरीका",
    example: "Mr. Sharma, it's a pleasure to meet you.",
    exampleHindi: "श्री शर्मा, आपसे मिलकर प्रसन्नता हुई।",
    category: "Greetings",
    difficulty: "intermediate"
  },

  // ==================== POLITE EXPRESSIONS (16-35) ====================
  {
    id: 16,
    english: "Please",
    hindi: "कृपया",
    pronunciation: "PLEEZ",
    usage: "Used to make a polite request",
    usageHindi: "विनम्र अनुरोध करने के लिए",
    example: "Please help me with this.",
    exampleHindi: "कृपया इसमें मेरी मदद करें।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 17,
    english: "Thank you",
    hindi: "धन्यवाद",
    pronunciation: "Thank YOO",
    usage: "Used to express gratitude",
    usageHindi: "आभार व्यक्त करने के लिए",
    example: "Thank you for your help.",
    exampleHindi: "आपकी मदद के लिए धन्यवाद।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 18,
    english: "Thank you very much",
    hindi: "बहुत-बहुत धन्यवाद",
    pronunciation: "Thank yoo VER-ee much",
    usage: "Used to express strong gratitude",
    usageHindi: "गहरा आभार व्यक्त करने के लिए",
    example: "Thank you very much for everything.",
    exampleHindi: "सब कुछ के लिए बहुत-बहुत धन्यवाद।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 19,
    english: "You're welcome",
    hindi: "आपका स्वागत है",
    pronunciation: "Yor WEL-kum",
    usage: "Response to 'Thank you'",
    usageHindi: "'धन्यवाद' का जवाब",
    example: "You're welcome! Happy to help.",
    exampleHindi: "आपका स्वागत है! मदद करके खुशी हुई।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 20,
    english: "Excuse me",
    hindi: "माफ़ कीजिए",
    pronunciation: "Eks-KYOOZ mee",
    usage: "Used to get attention or apologize for interrupting",
    usageHindi: "ध्यान आकर्षित करने या बाधा के लिए माफी मांगने के लिए",
    example: "Excuse me, can you help me?",
    exampleHindi: "माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं?",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 21,
    english: "I'm sorry",
    hindi: "मुझे खेद है",
    pronunciation: "Im SOR-ee",
    usage: "Used to apologize",
    usageHindi: "माफी मांगने के लिए",
    example: "I'm sorry for being late.",
    exampleHindi: "देर से आने के लिए मुझे खेद है।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 22,
    english: "No problem",
    hindi: "कोई बात नहीं",
    pronunciation: "Noh PROB-lem",
    usage: "Used to accept an apology or say it's okay",
    usageHindi: "माफी स्वीकार करने या ठीक है कहने के लिए",
    example: "No problem! It happens.",
    exampleHindi: "कोई बात नहीं! ऐसा होता है।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 23,
    english: "May I...?",
    hindi: "क्या मैं...?",
    pronunciation: "May I...?",
    usage: "Used to ask for permission politely",
    usageHindi: "विनम्रता से अनुमति मांगने के लिए",
    example: "May I come in?",
    exampleHindi: "क्या मैं अंदर आ सकता हूँ?",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 24,
    english: "Could you please...?",
    hindi: "क्या आप कृपया...?",
    pronunciation: "Kood yoo PLEEZ...?",
    usage: "Used to make a polite request",
    usageHindi: "विनम्र अनुरोध करने के लिए",
    example: "Could you please repeat that?",
    exampleHindi: "क्या आप कृपया वह दोहरा सकते हैं?",
    category: "Polite Expressions",
    difficulty: "intermediate"
  },
  {
    id: 25,
    english: "Would you mind...?",
    hindi: "क्या आपको कोई आपत्ति है...?",
    pronunciation: "Wood yoo MIND...?",
    usage: "Very polite way to ask for something",
    usageHindi: "कुछ मांगने का बहुत विनम्र तरीका",
    example: "Would you mind closing the window?",
    exampleHindi: "क्या आपको खिड़की बंद करने में कोई आपत्ति है?",
    category: "Polite Expressions",
    difficulty: "intermediate"
  },
  {
    id: 26,
    english: "I appreciate it",
    hindi: "मैं इसकी सराहना करता हूँ",
    pronunciation: "I uh-PREE-shee-ayt it",
    usage: "Used to show gratitude",
    usageHindi: "आभार दिखाने के लिए",
    example: "Thank you for your help. I really appreciate it.",
    exampleHindi: "आपकी मदद के लिए धन्यवाद। मैं वाकई इसकी सराहना करता हूँ।",
    category: "Polite Expressions",
    difficulty: "intermediate"
  },
  {
    id: 27,
    english: "Pardon me",
    hindi: "क्षमा करें",
    pronunciation: "PAR-dun mee",
    usage: "Formal way to say excuse me or sorry",
    usageHindi: "'माफ़ कीजिए' का औपचारिक तरीका",
    example: "Pardon me, I didn't catch your name.",
    exampleHindi: "क्षमा करें, मैंने आपका नाम नहीं सुना।",
    category: "Polite Expressions",
    difficulty: "intermediate"
  },
  {
    id: 28,
    english: "I beg your pardon",
    hindi: "मैं आपसे क्षमा चाहता हूँ",
    pronunciation: "I beg yor PAR-dun",
    usage: "Very formal apology or asking to repeat",
    usageHindi: "बहुत औपचारिक माफी या दोहराने का अनुरोध",
    example: "I beg your pardon, could you say that again?",
    exampleHindi: "मैं आपसे क्षमा चाहता हूँ, क्या आप वह फिर से कह सकते हैं?",
    category: "Polite Expressions",
    difficulty: "advanced"
  },
  {
    id: 29,
    english: "After you",
    hindi: "पहले आप",
    pronunciation: "AF-ter yoo",
    usage: "Used to let someone go first",
    usageHindi: "किसी को पहले जाने देने के लिए",
    example: "Please, after you.",
    exampleHindi: "कृपया, पहले आप।",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  {
    id: 30,
    english: "My pleasure",
    hindi: "मेरी खुशी",
    pronunciation: "My PLEZH-er",
    usage: "Response to thank you, meaning you enjoyed helping",
    usageHindi: "'धन्यवाद' का जवाब, मतलब मदद करके खुशी हुई",
    example: "Thank you! - My pleasure!",
    exampleHindi: "धन्यवाद! - मेरी खुशी!",
    category: "Polite Expressions",
    difficulty: "beginner"
  },
  // ==================== ASKING FOR HELP (31-45) ====================
  {
    id: 31,
    english: "Can you help me?",
    hindi: "क्या आप मेरी मदद कर सकते हैं?",
    pronunciation: "Kan yoo HELP mee?",
    usage: "Used to ask for assistance",
    usageHindi: "सहायता मांगने के लिए",
    example: "Excuse me, can you help me find the station?",
    exampleHindi: "माफ़ कीजिए, क्या आप मुझे स्टेशन खोजने में मदद कर सकते हैं?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 32,
    english: "I need help",
    hindi: "मुझे मदद चाहिए",
    pronunciation: "I need HELP",
    usage: "Used to express need for assistance",
    usageHindi: "सहायता की आवश्यकता व्यक्त करने के लिए",
    example: "I need help with my luggage.",
    exampleHindi: "मुझे अपने सामान के साथ मदद चाहिए।",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 33,
    english: "I don't understand",
    hindi: "मुझे समझ नहीं आया",
    pronunciation: "I dohnt un-der-STAND",
    usage: "Used when you don't comprehend something",
    usageHindi: "जब कुछ समझ न आए",
    example: "I'm sorry, I don't understand. Can you explain?",
    exampleHindi: "माफ़ कीजिए, मुझे समझ नहीं आया। क्या आप समझा सकते हैं?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 34,
    english: "Can you repeat that?",
    hindi: "क्या आप वह दोहरा सकते हैं?",
    pronunciation: "Kan yoo ree-PEET that?",
    usage: "Used to ask someone to say something again",
    usageHindi: "किसी से कुछ फिर से कहने के लिए",
    example: "Sorry, can you repeat that slowly?",
    exampleHindi: "माफ़ कीजिए, क्या आप वह धीरे से दोहरा सकते हैं?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 35,
    english: "Can you speak slowly?",
    hindi: "क्या आप धीरे बोल सकते हैं?",
    pronunciation: "Kan yoo speek SLOH-lee?",
    usage: "Used to ask someone to speak slower",
    usageHindi: "किसी से धीरे बोलने के लिए कहना",
    example: "Please, can you speak slowly? I'm learning English.",
    exampleHindi: "कृपया, क्या आप धीरे बोल सकते हैं? मैं अंग्रेजी सीख रहा हूँ।",
    category: "Asking for Help",
    difficulty: "beginner"
  },

  {
    id: 36,
    english: "What does this mean?",
    hindi: "इसका क्या मतलब है?",
    pronunciation: "Wot duz this MEEN?",
    usage: "Used to ask for meaning",
    usageHindi: "अर्थ पूछने के लिए",
    example: "What does this word mean?",
    exampleHindi: "इस शब्द का क्या मतलब है?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 37,
    english: "How do you say...?",
    hindi: "...को कैसे कहते हैं?",
    pronunciation: "How doo yoo SAY...?",
    usage: "Used to ask how to say something",
    usageHindi: "कुछ कैसे कहें यह पूछने के लिए",
    example: "How do you say 'namaste' in English?",
    exampleHindi: "'नमस्ते' को अंग्रेजी में कैसे कहते हैं?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 38,
    english: "Where is the...?",
    hindi: "...कहाँ है?",
    pronunciation: "Wair iz thuh...?",
    usage: "Used to ask for location",
    usageHindi: "स्थान पूछने के लिए",
    example: "Where is the nearest hospital?",
    exampleHindi: "सबसे नज़दीकी अस्पताल कहाँ है?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 39,
    english: "How do I get to...?",
    hindi: "मैं...कैसे पहुँचूं?",
    pronunciation: "How doo I get too...?",
    usage: "Used to ask for directions",
    usageHindi: "रास्ता पूछने के लिए",
    example: "How do I get to the railway station?",
    exampleHindi: "मैं रेलवे स्टेशन कैसे पहुँचूं?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  {
    id: 40,
    english: "Is there a... nearby?",
    hindi: "क्या पास में कोई... है?",
    pronunciation: "Iz thair uh... NEER-by?",
    usage: "Used to ask about nearby places",
    usageHindi: "पास की जगहों के बारे में पूछने के लिए",
    example: "Is there a pharmacy nearby?",
    exampleHindi: "क्या पास में कोई फार्मेसी है?",
    category: "Asking for Help",
    difficulty: "beginner"
  },
  // ==================== SHOPPING PHRASES (41-55) ====================
  {
    id: 41,
    english: "How much does this cost?",
    hindi: "इसकी कीमत क्या है?",
    pronunciation: "How much duz this KOST?",
    usage: "Used to ask the price",
    usageHindi: "कीमत पूछने के लिए",
    example: "How much does this shirt cost?",
    exampleHindi: "इस शर्ट की कीमत क्या है?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 42,
    english: "That's too expensive",
    hindi: "यह बहुत महंगा है",
    pronunciation: "Thats too eks-PEN-siv",
    usage: "Used when something costs too much",
    usageHindi: "जब कुछ बहुत महंगा हो",
    example: "That's too expensive. Do you have something cheaper?",
    exampleHindi: "यह बहुत महंगा है। क्या आपके पास कुछ सस्ता है?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 43,
    english: "Can you give me a discount?",
    hindi: "क्या आप मुझे छूट दे सकते हैं?",
    pronunciation: "Kan yoo giv mee uh DIS-kownt?",
    usage: "Used to ask for a lower price",
    usageHindi: "कम कीमत मांगने के लिए",
    example: "I'm buying three items. Can you give me a discount?",
    exampleHindi: "मैं तीन चीज़ें खरीद रहा हूँ। क्या आप मुझे छूट दे सकते हैं?",
    category: "Shopping",
    difficulty: "intermediate"
  },
  {
    id: 44,
    english: "I'm just looking",
    hindi: "मैं बस देख रहा हूँ",
    pronunciation: "Im just LOOK-ing",
    usage: "Used when browsing without intent to buy",
    usageHindi: "जब बिना खरीदने के इरादे से देख रहे हों",
    example: "Can I help you? - No thanks, I'm just looking.",
    exampleHindi: "क्या मैं आपकी मदद कर सकता हूँ? - नहीं धन्यवाद, मैं बस देख रहा हूँ।",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 45,
    english: "I'll take this one",
    hindi: "मैं यह लूंगा",
    pronunciation: "Il tayk this wun",
    usage: "Used when deciding to buy something",
    usageHindi: "कुछ खरीदने का फैसला करने पर",
    example: "This looks good. I'll take this one.",
    exampleHindi: "यह अच्छा लग रहा है। मैं यह लूंगा।",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 46,
    english: "Do you have this in a different size?",
    hindi: "क्या यह दूसरे साइज़ में है?",
    pronunciation: "Doo yoo hav this in uh DIF-rent size?",
    usage: "Used to ask for different size",
    usageHindi: "अलग साइज़ मांगने के लिए",
    example: "This is too small. Do you have this in a larger size?",
    exampleHindi: "यह बहुत छोटा है। क्या यह बड़े साइज़ में है?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 47,
    english: "Can I try this on?",
    hindi: "क्या मैं इसे पहनकर देख सकता हूँ?",
    pronunciation: "Kan I try this ON?",
    usage: "Used to ask to try clothes",
    usageHindi: "कपड़े पहनकर देखने के लिए",
    example: "I like this dress. Can I try this on?",
    exampleHindi: "मुझे यह ड्रेस पसंद है। क्या मैं इसे पहनकर देख सकती हूँ?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 48,
    english: "Where is the trial room?",
    hindi: "ट्रायल रूम कहाँ है?",
    pronunciation: "Wair iz thuh TRY-ul room?",
    usage: "Used to ask for changing room location",
    usageHindi: "चेंजिंग रूम का स्थान पूछने के लिए",
    example: "I want to try this. Where is the trial room?",
    exampleHindi: "मैं इसे पहनकर देखना चाहता हूँ। ट्रायल रूम कहाँ है?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 49,
    english: "Do you accept credit cards?",
    hindi: "क्या आप क्रेडिट कार्ड लेते हैं?",
    pronunciation: "Doo yoo ak-SEPT KRED-it kardz?",
    usage: "Used to ask about payment method",
    usageHindi: "भुगतान विधि के बारे में पूछने के लिए",
    example: "Do you accept credit cards or only cash?",
    exampleHindi: "क्या आप क्रेडिट कार्ड लेते हैं या सिर्फ नकद?",
    category: "Shopping",
    difficulty: "beginner"
  },
  {
    id: 50,
    english: "Can I get a receipt?",
    hindi: "क्या मुझे रसीद मिल सकती है?",
    pronunciation: "Kan I get uh ree-SEET?",
    usage: "Used to ask for a bill/receipt",
    usageHindi: "बिल/रसीद मांगने के लिए",
    example: "Here's the payment. Can I get a receipt?",
    exampleHindi: "यह रहा भुगतान। क्या मुझे रसीद मिल सकती है?",
    category: "Shopping",
    difficulty: "beginner"
  },
  // ==================== RESTAURANT PHRASES (51-65) ====================
  {
    id: 51,
    english: "A table for two, please",
    hindi: "दो लोगों के लिए एक टेबल, कृपया",
    pronunciation: "Uh TAY-bul for too, pleez",
    usage: "Used to request seating at a restaurant",
    usageHindi: "रेस्तरां में बैठने के लिए अनुरोध करने के लिए",
    example: "Good evening! A table for two, please.",
    exampleHindi: "शुभ संध्या! दो लोगों के लिए एक टेबल, कृपया।",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 52,
    english: "Can I see the menu?",
    hindi: "क्या मैं मेन्यू देख सकता हूँ?",
    pronunciation: "Kan I see thuh MEN-yoo?",
    usage: "Used to ask for the menu",
    usageHindi: "मेन्यू मांगने के लिए",
    example: "We're ready to order. Can I see the menu?",
    exampleHindi: "हम ऑर्डर देने के लिए तैयार हैं। क्या मैं मेन्यू देख सकता हूँ?",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 53,
    english: "What do you recommend?",
    hindi: "आप क्या सिफारिश करेंगे?",
    pronunciation: "Wot doo yoo rek-uh-MEND?",
    usage: "Used to ask for suggestions",
    usageHindi: "सुझाव मांगने के लिए",
    example: "I'm new here. What do you recommend?",
    exampleHindi: "मैं यहाँ नया हूँ। आप क्या सिफारिश करेंगे?",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 54,
    english: "I would like to order...",
    hindi: "मैं...ऑर्डर करना चाहूंगा",
    pronunciation: "I wood like too OR-der...",
    usage: "Used to place an order",
    usageHindi: "ऑर्डर देने के लिए",
    example: "I would like to order the chicken biryani.",
    exampleHindi: "मैं चिकन बिरयानी ऑर्डर करना चाहूंगा।",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 55,
    english: "Is this dish spicy?",
    hindi: "क्या यह व्यंजन तीखा है?",
    pronunciation: "Iz this dish SPY-see?",
    usage: "Used to ask about spice level",
    usageHindi: "मसाले के स्तर के बारे में पूछने के लिए",
    example: "Is this dish spicy? I prefer mild food.",
    exampleHindi: "क्या यह व्यंजन तीखा है? मुझे हल्का खाना पसंद है।",
    category: "Restaurant",
    difficulty: "beginner"
  },

  {
    id: 56,
    english: "Can you make it less spicy?",
    hindi: "क्या आप इसे कम तीखा बना सकते हैं?",
    pronunciation: "Kan yoo mayk it les SPY-see?",
    usage: "Used to request less spice",
    usageHindi: "कम मसाला मांगने के लिए",
    example: "I have a sensitive stomach. Can you make it less spicy?",
    exampleHindi: "मेरा पेट संवेदनशील है। क्या आप इसे कम तीखा बना सकते हैं?",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 57,
    english: "The food is delicious!",
    hindi: "खाना स्वादिष्ट है!",
    pronunciation: "Thuh food iz dee-LISH-us!",
    usage: "Used to compliment the food",
    usageHindi: "खाने की तारीफ करने के लिए",
    example: "Compliments to the chef! The food is delicious!",
    exampleHindi: "शेफ को बधाई! खाना स्वादिष्ट है!",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 58,
    english: "Can I have the bill, please?",
    hindi: "क्या मुझे बिल मिल सकता है?",
    pronunciation: "Kan I hav thuh bil, pleez?",
    usage: "Used to ask for the check",
    usageHindi: "बिल मांगने के लिए",
    example: "We're done. Can I have the bill, please?",
    exampleHindi: "हमारा हो गया। क्या मुझे बिल मिल सकता है?",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 59,
    english: "Keep the change",
    hindi: "बाकी रख लीजिए",
    pronunciation: "Keep thuh CHAYNJ",
    usage: "Used when giving a tip",
    usageHindi: "टिप देते समय",
    example: "Here's 500 rupees. Keep the change.",
    exampleHindi: "यह रहे 500 रुपये। बाकी रख लीजिए।",
    category: "Restaurant",
    difficulty: "beginner"
  },
  {
    id: 60,
    english: "Can I have some water?",
    hindi: "क्या मुझे पानी मिल सकता है?",
    pronunciation: "Kan I hav sum WAW-ter?",
    usage: "Used to ask for water",
    usageHindi: "पानी मांगने के लिए",
    example: "It's very hot. Can I have some water?",
    exampleHindi: "बहुत गर्मी है। क्या मुझे पानी मिल सकता है?",
    category: "Restaurant",
    difficulty: "beginner"
  },
  // ==================== TRAVEL PHRASES (61-75) ====================
  {
    id: 61,
    english: "Where is the bus stop?",
    hindi: "बस स्टॉप कहाँ है?",
    pronunciation: "Wair iz thuh bus stop?",
    usage: "Used to ask for bus stop location",
    usageHindi: "बस स्टॉप का स्थान पूछने के लिए",
    example: "Excuse me, where is the nearest bus stop?",
    exampleHindi: "माफ़ कीजिए, सबसे नज़दीकी बस स्टॉप कहाँ है?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 62,
    english: "I need a taxi",
    hindi: "मुझे टैक्सी चाहिए",
    pronunciation: "I need uh TAK-see",
    usage: "Used to request a taxi",
    usageHindi: "टैक्सी मांगने के लिए",
    example: "I need a taxi to the airport.",
    exampleHindi: "मुझे एयरपोर्ट के लिए टैक्सी चाहिए।",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 63,
    english: "How far is it?",
    hindi: "यह कितनी दूर है?",
    pronunciation: "How far iz it?",
    usage: "Used to ask about distance",
    usageHindi: "दूरी पूछने के लिए",
    example: "How far is the railway station from here?",
    exampleHindi: "यहाँ से रेलवे स्टेशन कितनी दूर है?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 64,
    english: "How long does it take?",
    hindi: "कितना समय लगता है?",
    pronunciation: "How long duz it tayk?",
    usage: "Used to ask about duration",
    usageHindi: "समय पूछने के लिए",
    example: "How long does it take to reach Delhi?",
    exampleHindi: "दिल्ली पहुँचने में कितना समय लगता है?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 65,
    english: "I want to book a ticket",
    hindi: "मैं टिकट बुक करना चाहता हूँ",
    pronunciation: "I wont too book uh TIK-et",
    usage: "Used to request ticket booking",
    usageHindi: "टिकट बुकिंग के लिए",
    example: "I want to book a ticket to Mumbai.",
    exampleHindi: "मैं मुंबई के लिए टिकट बुक करना चाहता हूँ।",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 66,
    english: "What time does the train leave?",
    hindi: "ट्रेन कितने बजे छूटती है?",
    pronunciation: "Wot time duz thuh trayn leev?",
    usage: "Used to ask about departure time",
    usageHindi: "प्रस्थान समय पूछने के लिए",
    example: "What time does the train to Jaipur leave?",
    exampleHindi: "जयपुर की ट्रेन कितने बजे छूटती है?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 67,
    english: "Is this seat taken?",
    hindi: "क्या यह सीट खाली है?",
    pronunciation: "Iz this seet TAY-ken?",
    usage: "Used to ask if a seat is available",
    usageHindi: "सीट खाली है या नहीं पूछने के लिए",
    example: "Excuse me, is this seat taken?",
    exampleHindi: "माफ़ कीजिए, क्या यह सीट खाली है?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 68,
    english: "I'm lost",
    hindi: "मैं रास्ता भूल गया हूँ",
    pronunciation: "Im LOST",
    usage: "Used when you don't know where you are",
    usageHindi: "जब आप नहीं जानते कि आप कहाँ हैं",
    example: "Excuse me, I'm lost. Can you help me?",
    exampleHindi: "माफ़ कीजिए, मैं रास्ता भूल गया हूँ। क्या आप मेरी मदद कर सकते हैं?",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 69,
    english: "Turn left/right",
    hindi: "बाएं/दाएं मुड़ें",
    pronunciation: "Tern LEFT/RITE",
    usage: "Used to give directions",
    usageHindi: "दिशा-निर्देश देने के लिए",
    example: "Go straight and then turn left at the signal.",
    exampleHindi: "सीधे जाएं और फिर सिग्नल पर बाएं मुड़ें।",
    category: "Travel",
    difficulty: "beginner"
  },
  {
    id: 70,
    english: "Go straight",
    hindi: "सीधे जाएं",
    pronunciation: "Goh STRAYT",
    usage: "Used to give directions",
    usageHindi: "दिशा-निर्देश देने के लिए",
    example: "Go straight for 500 meters.",
    exampleHindi: "500 मीटर सीधे जाएं।",
    category: "Travel",
    difficulty: "beginner"
  },
  // ==================== HEALTH PHRASES (71-85) ====================
  {
    id: 71,
    english: "I don't feel well",
    hindi: "मेरी तबीयत ठीक नहीं है",
    pronunciation: "I dohnt feel WEL",
    usage: "Used to express feeling unwell",
    usageHindi: "अस्वस्थ महसूस करने पर",
    example: "I don't feel well. I have a headache.",
    exampleHindi: "मेरी तबीयत ठीक नहीं है। मुझे सिरदर्द है।",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 72,
    english: "I have a fever",
    hindi: "मुझे बुखार है",
    pronunciation: "I hav uh FEE-ver",
    usage: "Used to describe having fever",
    usageHindi: "बुखार होने पर",
    example: "I have a fever since yesterday.",
    exampleHindi: "मुझे कल से बुखार है।",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 73,
    english: "I need a doctor",
    hindi: "मुझे डॉक्टर चाहिए",
    pronunciation: "I need uh DOK-ter",
    usage: "Used to request medical help",
    usageHindi: "चिकित्सा सहायता मांगने के लिए",
    example: "Please help! I need a doctor urgently.",
    exampleHindi: "कृपया मदद करें! मुझे तुरंत डॉक्टर चाहिए।",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 74,
    english: "Where is the hospital?",
    hindi: "अस्पताल कहाँ है?",
    pronunciation: "Wair iz thuh HOS-pi-tul?",
    usage: "Used to ask for hospital location",
    usageHindi: "अस्पताल का स्थान पूछने के लिए",
    example: "It's an emergency. Where is the nearest hospital?",
    exampleHindi: "यह आपातकाल है। सबसे नज़दीकी अस्पताल कहाँ है?",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 75,
    english: "I'm allergic to...",
    hindi: "मुझे...से एलर्जी है",
    pronunciation: "Im uh-LER-jik too...",
    usage: "Used to describe allergies",
    usageHindi: "एलर्जी बताने के लिए",
    example: "I'm allergic to peanuts.",
    exampleHindi: "मुझे मूंगफली से एलर्जी है।",
    category: "Health",
    difficulty: "intermediate"
  },

  {
    id: 76,
    english: "Take this medicine twice a day",
    hindi: "यह दवा दिन में दो बार लें",
    pronunciation: "Tayk this MED-i-sin twice uh day",
    usage: "Used to give medicine instructions",
    usageHindi: "दवा के निर्देश देने के लिए",
    example: "Take this medicine twice a day after meals.",
    exampleHindi: "यह दवा दिन में दो बार खाने के बाद लें।",
    category: "Health",
    difficulty: "intermediate"
  },
  {
    id: 77,
    english: "I have a headache",
    hindi: "मुझे सिरदर्द है",
    pronunciation: "I hav uh HED-ayk",
    usage: "Used to describe headache",
    usageHindi: "सिरदर्द बताने के लिए",
    example: "I have a headache. Do you have any painkiller?",
    exampleHindi: "मुझे सिरदर्द है। क्या आपके पास कोई दर्द निवारक है?",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 78,
    english: "I have a cold",
    hindi: "मुझे सर्दी है",
    pronunciation: "I hav uh KOHLD",
    usage: "Used to describe having a cold",
    usageHindi: "सर्दी होने पर",
    example: "I have a cold and runny nose.",
    exampleHindi: "मुझे सर्दी है और नाक बह रही है।",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 79,
    english: "My stomach hurts",
    hindi: "मेरे पेट में दर्द है",
    pronunciation: "My STUM-uk herts",
    usage: "Used to describe stomach pain",
    usageHindi: "पेट दर्द बताने के लिए",
    example: "My stomach hurts. I think I ate something bad.",
    exampleHindi: "मेरे पेट में दर्द है। मुझे लगता है मैंने कुछ खराब खा लिया।",
    category: "Health",
    difficulty: "beginner"
  },
  {
    id: 80,
    english: "I need to see a dentist",
    hindi: "मुझे दंत चिकित्सक से मिलना है",
    pronunciation: "I need too see uh DEN-tist",
    usage: "Used to request dental care",
    usageHindi: "दंत चिकित्सा के लिए",
    example: "I have a toothache. I need to see a dentist.",
    exampleHindi: "मुझे दांत में दर्द है। मुझे दंत चिकित्सक से मिलना है।",
    category: "Health",
    difficulty: "beginner"
  },
  // ==================== WORK & OFFICE (81-95) ====================
  {
    id: 81,
    english: "I have a meeting at...",
    hindi: "मेरी...बजे मीटिंग है",
    pronunciation: "I hav uh MEE-ting at...",
    usage: "Used to mention meeting time",
    usageHindi: "मीटिंग का समय बताने के लिए",
    example: "I have a meeting at 3 PM.",
    exampleHindi: "मेरी दोपहर 3 बजे मीटिंग है।",
    category: "Work",
    difficulty: "beginner"
  },
  {
    id: 82,
    english: "Can I take a day off?",
    hindi: "क्या मैं एक दिन की छुट्टी ले सकता हूँ?",
    pronunciation: "Kan I tayk uh day OFF?",
    usage: "Used to request leave",
    usageHindi: "छुट्टी मांगने के लिए",
    example: "I'm not feeling well. Can I take a day off?",
    exampleHindi: "मेरी तबीयत ठीक नहीं है। क्या मैं एक दिन की छुट्टी ले सकता हूँ?",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 83,
    english: "I'll finish this by tomorrow",
    hindi: "मैं इसे कल तक पूरा कर दूंगा",
    pronunciation: "Il FIN-ish this by too-MOR-oh",
    usage: "Used to give deadline commitment",
    usageHindi: "समय सीमा की प्रतिबद्धता देने के लिए",
    example: "Don't worry, I'll finish this report by tomorrow.",
    exampleHindi: "चिंता मत करो, मैं इस रिपोर्ट को कल तक पूरा कर दूंगा।",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 84,
    english: "Can you send me the email?",
    hindi: "क्या आप मुझे ईमेल भेज सकते हैं?",
    pronunciation: "Kan yoo send mee thuh EE-mayl?",
    usage: "Used to request email",
    usageHindi: "ईमेल मांगने के लिए",
    example: "Can you send me the email with the details?",
    exampleHindi: "क्या आप मुझे विवरण के साथ ईमेल भेज सकते हैं?",
    category: "Work",
    difficulty: "beginner"
  },
  {
    id: 85,
    english: "Let's schedule a meeting",
    hindi: "चलिए एक मीटिंग शेड्यूल करते हैं",
    pronunciation: "Lets SKED-yool uh MEE-ting",
    usage: "Used to propose a meeting",
    usageHindi: "मीटिंग प्रस्तावित करने के लिए",
    example: "Let's schedule a meeting for next Monday.",
    exampleHindi: "चलिए अगले सोमवार के लिए एक मीटिंग शेड्यूल करते हैं।",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 86,
    english: "I'm running late",
    hindi: "मुझे देर हो रही है",
    pronunciation: "Im RUN-ning layt",
    usage: "Used when you're going to be late",
    usageHindi: "जब आपको देर होने वाली हो",
    example: "Sorry, I'm running late. I'll be there in 10 minutes.",
    exampleHindi: "माफ़ कीजिए, मुझे देर हो रही है। मैं 10 मिनट में पहुँचूंगा।",
    category: "Work",
    difficulty: "beginner"
  },
  {
    id: 87,
    english: "What's the deadline?",
    hindi: "समय सीमा क्या है?",
    pronunciation: "Wots thuh DED-line?",
    usage: "Used to ask about deadline",
    usageHindi: "समय सीमा पूछने के लिए",
    example: "What's the deadline for this project?",
    exampleHindi: "इस प्रोजेक्ट की समय सीमा क्या है?",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 88,
    english: "I need more time",
    hindi: "मुझे और समय चाहिए",
    pronunciation: "I need mor TIME",
    usage: "Used to request extension",
    usageHindi: "विस्तार मांगने के लिए",
    example: "This is complex. I need more time to complete it.",
    exampleHindi: "यह जटिल है। मुझे इसे पूरा करने के लिए और समय चाहिए।",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 89,
    english: "Can we discuss this later?",
    hindi: "क्या हम इस पर बाद में चर्चा कर सकते हैं?",
    pronunciation: "Kan wee dis-KUS this LAY-ter?",
    usage: "Used to postpone discussion",
    usageHindi: "चर्चा स्थगित करने के लिए",
    example: "I'm busy right now. Can we discuss this later?",
    exampleHindi: "मैं अभी व्यस्त हूँ। क्या हम इस पर बाद में चर्चा कर सकते हैं?",
    category: "Work",
    difficulty: "intermediate"
  },
  {
    id: 90,
    english: "I agree with you",
    hindi: "मैं आपसे सहमत हूँ",
    pronunciation: "I uh-GREE with yoo",
    usage: "Used to express agreement",
    usageHindi: "सहमति व्यक्त करने के लिए",
    example: "That's a good point. I agree with you.",
    exampleHindi: "यह अच्छी बात है। मैं आपसे सहमत हूँ।",
    category: "Work",
    difficulty: "beginner"
  },
  // ==================== EMERGENCY PHRASES (91-100) ====================
  {
    id: 91,
    english: "Help!",
    hindi: "मदद करो!",
    pronunciation: "HELP!",
    usage: "Used in emergency situations",
    usageHindi: "आपातकालीन स्थितियों में",
    example: "Help! Someone call the police!",
    exampleHindi: "मदद करो! कोई पुलिस को बुलाओ!",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 92,
    english: "Call the police!",
    hindi: "पुलिस को बुलाओ!",
    pronunciation: "Kol thuh puh-LEES!",
    usage: "Used to request police help",
    usageHindi: "पुलिस सहायता मांगने के लिए",
    example: "There's been an accident! Call the police!",
    exampleHindi: "एक दुर्घटना हुई है! पुलिस को बुलाओ!",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 93,
    english: "Call an ambulance!",
    hindi: "एम्बुलेंस बुलाओ!",
    pronunciation: "Kol an AM-byoo-lans!",
    usage: "Used to request medical emergency help",
    usageHindi: "चिकित्सा आपातकालीन सहायता के लिए",
    example: "He's unconscious! Call an ambulance!",
    exampleHindi: "वह बेहोश है! एम्बुलेंस बुलाओ!",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 94,
    english: "There's a fire!",
    hindi: "आग लगी है!",
    pronunciation: "Thairz uh FI-er!",
    usage: "Used to alert about fire",
    usageHindi: "आग की चेतावनी देने के लिए",
    example: "There's a fire in the building! Everyone evacuate!",
    exampleHindi: "इमारत में आग लगी है! सब बाहर निकलो!",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 95,
    english: "I've lost my wallet",
    hindi: "मेरा बटुआ खो गया है",
    pronunciation: "Iv lost my WOL-et",
    usage: "Used to report lost wallet",
    usageHindi: "बटुआ खोने की रिपोर्ट करने के लिए",
    example: "Please help! I've lost my wallet with all my cards.",
    exampleHindi: "कृपया मदद करें! मेरा बटुआ सभी कार्ड्स के साथ खो गया है।",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 96,
    english: "I've been robbed",
    hindi: "मेरे साथ चोरी हुई है",
    pronunciation: "Iv been ROBD",
    usage: "Used to report robbery",
    usageHindi: "चोरी की रिपोर्ट करने के लिए",
    example: "Help! I've been robbed! Someone took my bag!",
    exampleHindi: "मदद करो! मेरे साथ चोरी हुई है! किसी ने मेरा बैग ले लिया!",
    category: "Emergency",
    difficulty: "intermediate"
  },
  {
    id: 97,
    english: "Is everyone okay?",
    hindi: "क्या सब ठीक हैं?",
    pronunciation: "Iz EV-ree-wun oh-KAY?",
    usage: "Used to check on people's safety",
    usageHindi: "लोगों की सुरक्षा जांचने के लिए",
    example: "After the earthquake - Is everyone okay?",
    exampleHindi: "भूकंप के बाद - क्या सब ठीक हैं?",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 98,
    english: "Stay calm",
    hindi: "शांत रहो",
    pronunciation: "Stay KAHM",
    usage: "Used to calm people in emergency",
    usageHindi: "आपातकाल में लोगों को शांत करने के लिए",
    example: "Don't panic. Stay calm and follow instructions.",
    exampleHindi: "घबराओ मत। शांत रहो और निर्देशों का पालन करो।",
    category: "Emergency",
    difficulty: "beginner"
  },
  {
    id: 99,
    english: "Where is the emergency exit?",
    hindi: "आपातकालीन निकास कहाँ है?",
    pronunciation: "Wair iz thuh ee-MER-jen-see EK-sit?",
    usage: "Used to find emergency exit",
    usageHindi: "आपातकालीन निकास खोजने के लिए",
    example: "There's smoke! Where is the emergency exit?",
    exampleHindi: "धुआं है! आपातकालीन निकास कहाँ है?",
    category: "Emergency",
    difficulty: "intermediate"
  },
  {
    id: 100,
    english: "I need to contact my embassy",
    hindi: "मुझे अपने दूतावास से संपर्क करना है",
    pronunciation: "I need too KON-takt my EM-buh-see",
    usage: "Used by foreigners in emergency",
    usageHindi: "विदेशियों द्वारा आपातकाल में",
    example: "I've lost my passport. I need to contact my embassy.",
    exampleHindi: "मेरा पासपोर्ट खो गया है। मुझे अपने दूतावास से संपर्क करना है।",
    category: "Emergency",
    difficulty: "advanced"
  },
  // ==================== SOCIAL PHRASES (101-115) ====================
  {
    id: 101,
    english: "Congratulations!",
    hindi: "बधाई हो!",
    pronunciation: "Kun-grach-oo-LAY-shunz!",
    usage: "Used to congratulate someone",
    usageHindi: "किसी को बधाई देने के लिए",
    example: "Congratulations on your promotion!",
    exampleHindi: "आपकी पदोन्नति पर बधाई हो!",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 102,
    english: "Happy Birthday!",
    hindi: "जन्मदिन मुबारक!",
    pronunciation: "HAP-ee BERTH-day!",
    usage: "Used to wish on birthday",
    usageHindi: "जन्मदिन पर शुभकामनाएं देने के लिए",
    example: "Happy Birthday! May all your wishes come true!",
    exampleHindi: "जन्मदिन मुबारक! आपकी सभी इच्छाएं पूरी हों!",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 103,
    english: "Best wishes!",
    hindi: "शुभकामनाएं!",
    pronunciation: "Best WISH-ez!",
    usage: "Used to wish someone well",
    usageHindi: "किसी को शुभकामनाएं देने के लिए",
    example: "Best wishes for your new job!",
    exampleHindi: "आपकी नई नौकरी के लिए शुभकामनाएं!",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 104,
    english: "Get well soon!",
    hindi: "जल्दी ठीक हो जाओ!",
    pronunciation: "Get wel SOON!",
    usage: "Used to wish recovery",
    usageHindi: "स्वस्थ होने की कामना करने के लिए",
    example: "I heard you're sick. Get well soon!",
    exampleHindi: "मैंने सुना आप बीमार हैं। जल्दी ठीक हो जाओ!",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 105,
    english: "I'm sorry for your loss",
    hindi: "आपके नुकसान के लिए मुझे दुख है",
    pronunciation: "Im SOR-ee for yor LOSS",
    usage: "Used to express condolences",
    usageHindi: "शोक व्यक्त करने के लिए",
    example: "I'm sorry for your loss. My thoughts are with you.",
    exampleHindi: "आपके नुकसान के लिए मुझे दुख है। मेरी संवेदनाएं आपके साथ हैं।",
    category: "Social",
    difficulty: "intermediate"
  },

  {
    id: 106,
    english: "Would you like to join us?",
    hindi: "क्या आप हमारे साथ शामिल होना चाहेंगे?",
    pronunciation: "Wood yoo like too JOIN us?",
    usage: "Used to invite someone",
    usageHindi: "किसी को आमंत्रित करने के लिए",
    example: "We're going for dinner. Would you like to join us?",
    exampleHindi: "हम रात के खाने के लिए जा रहे हैं। क्या आप हमारे साथ शामिल होना चाहेंगे?",
    category: "Social",
    difficulty: "intermediate"
  },
  {
    id: 107,
    english: "That sounds great!",
    hindi: "यह बहुत अच्छा लगता है!",
    pronunciation: "That sowndz GRAYT!",
    usage: "Used to express enthusiasm",
    usageHindi: "उत्साह व्यक्त करने के लिए",
    example: "A trip to Goa? That sounds great!",
    exampleHindi: "गोवा की यात्रा? यह बहुत अच्छा लगता है!",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 108,
    english: "I'm looking forward to it",
    hindi: "मुझे इसका इंतज़ार है",
    pronunciation: "Im LOOK-ing FOR-werd too it",
    usage: "Used to express anticipation",
    usageHindi: "प्रत्याशा व्यक्त करने के लिए",
    example: "See you at the party! I'm looking forward to it.",
    exampleHindi: "पार्टी में मिलते हैं! मुझे इसका इंतज़ार है।",
    category: "Social",
    difficulty: "intermediate"
  },
  {
    id: 109,
    english: "It was nice talking to you",
    hindi: "आपसे बात करके अच्छा लगा",
    pronunciation: "It woz nice TOK-ing too yoo",
    usage: "Used when ending a conversation",
    usageHindi: "बातचीत समाप्त करते समय",
    example: "I have to go now. It was nice talking to you.",
    exampleHindi: "मुझे अब जाना होगा। आपसे बात करके अच्छा लगा।",
    category: "Social",
    difficulty: "beginner"
  },
  {
    id: 110,
    english: "Let's keep in touch",
    hindi: "संपर्क में रहते हैं",
    pronunciation: "Lets keep in TUCH",
    usage: "Used to maintain contact",
    usageHindi: "संपर्क बनाए रखने के लिए",
    example: "It was great meeting you. Let's keep in touch!",
    exampleHindi: "आपसे मिलकर अच्छा लगा। संपर्क में रहते हैं!",
    category: "Social",
    difficulty: "beginner"
  },
  // ==================== OPINIONS & FEELINGS (111-125) ====================
  {
    id: 111,
    english: "I think that...",
    hindi: "मुझे लगता है कि...",
    pronunciation: "I think that...",
    usage: "Used to express opinion",
    usageHindi: "राय व्यक्त करने के लिए",
    example: "I think that this is a good idea.",
    exampleHindi: "मुझे लगता है कि यह एक अच्छा विचार है।",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 112,
    english: "In my opinion...",
    hindi: "मेरी राय में...",
    pronunciation: "In my oh-PIN-yun...",
    usage: "Used to give personal view",
    usageHindi: "व्यक्तिगत दृष्टिकोण देने के लिए",
    example: "In my opinion, we should wait.",
    exampleHindi: "मेरी राय में, हमें इंतज़ार करना चाहिए।",
    category: "Opinions",
    difficulty: "intermediate"
  },
  {
    id: 113,
    english: "I'm not sure about that",
    hindi: "मुझे इसके बारे में यकीन नहीं है",
    pronunciation: "Im not SHOOR uh-bowt that",
    usage: "Used to express uncertainty",
    usageHindi: "अनिश्चितता व्यक्त करने के लिए",
    example: "I'm not sure about that. Let me check.",
    exampleHindi: "मुझे इसके बारे में यकीन नहीं है। मुझे जांचने दो।",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 114,
    english: "I'm happy to hear that",
    hindi: "यह सुनकर खुशी हुई",
    pronunciation: "Im HAP-ee too heer that",
    usage: "Used to express happiness",
    usageHindi: "खुशी व्यक्त करने के लिए",
    example: "You got the job? I'm happy to hear that!",
    exampleHindi: "आपको नौकरी मिल गई? यह सुनकर खुशी हुई!",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 115,
    english: "I'm disappointed",
    hindi: "मैं निराश हूँ",
    pronunciation: "Im dis-uh-POINT-ed",
    usage: "Used to express disappointment",
    usageHindi: "निराशा व्यक्त करने के लिए",
    example: "The movie was bad. I'm disappointed.",
    exampleHindi: "फिल्म खराब थी। मैं निराश हूँ।",
    category: "Opinions",
    difficulty: "intermediate"
  },
  {
    id: 116,
    english: "I'm excited about...",
    hindi: "मैं...के बारे में उत्साहित हूँ",
    pronunciation: "Im ek-SY-ted uh-bowt...",
    usage: "Used to express excitement",
    usageHindi: "उत्साह व्यक्त करने के लिए",
    example: "I'm excited about the trip to Shimla!",
    exampleHindi: "मैं शिमला की यात्रा के बारे में उत्साहित हूँ!",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 117,
    english: "I'm worried about...",
    hindi: "मुझे...की चिंता है",
    pronunciation: "Im WUR-eed uh-bowt...",
    usage: "Used to express worry",
    usageHindi: "चिंता व्यक्त करने के लिए",
    example: "I'm worried about the exam results.",
    exampleHindi: "मुझे परीक्षा के परिणामों की चिंता है।",
    category: "Opinions",
    difficulty: "intermediate"
  },
  {
    id: 118,
    english: "I prefer...",
    hindi: "मैं...पसंद करता हूँ",
    pronunciation: "I pree-FER...",
    usage: "Used to express preference",
    usageHindi: "पसंद व्यक्त करने के लिए",
    example: "I prefer tea over coffee.",
    exampleHindi: "मैं कॉफी की जगह चाय पसंद करता हूँ।",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 119,
    english: "I don't like...",
    hindi: "मुझे...पसंद नहीं है",
    pronunciation: "I dohnt like...",
    usage: "Used to express dislike",
    usageHindi: "नापसंदगी व्यक्त करने के लिए",
    example: "I don't like spicy food.",
    exampleHindi: "मुझे तीखा खाना पसंद नहीं है।",
    category: "Opinions",
    difficulty: "beginner"
  },
  {
    id: 120,
    english: "That's interesting!",
    hindi: "यह दिलचस्प है!",
    pronunciation: "Thats IN-ter-es-ting!",
    usage: "Used to show interest",
    usageHindi: "रुचि दिखाने के लिए",
    example: "You've been to 20 countries? That's interesting!",
    exampleHindi: "आप 20 देशों में गए हैं? यह दिलचस्प है!",
    category: "Opinions",
    difficulty: "beginner"
  },
  // ==================== TIME EXPRESSIONS (121-130) ====================
  {
    id: 121,
    english: "What time is it?",
    hindi: "क्या समय हुआ है?",
    pronunciation: "Wot time iz it?",
    usage: "Used to ask the time",
    usageHindi: "समय पूछने के लिए",
    example: "Excuse me, what time is it?",
    exampleHindi: "माफ़ कीजिए, क्या समय हुआ है?",
    category: "Time",
    difficulty: "beginner"
  },
  {
    id: 122,
    english: "It's half past...",
    hindi: "साढ़े...बजे हैं",
    pronunciation: "Its haf past...",
    usage: "Used to tell time (30 minutes)",
    usageHindi: "समय बताने के लिए (30 मिनट)",
    example: "It's half past three.",
    exampleHindi: "साढ़े तीन बजे हैं।",
    category: "Time",
    difficulty: "beginner"
  },
  {
    id: 123,
    english: "It's quarter to...",
    hindi: "पौने...बजे हैं",
    pronunciation: "Its KWOR-ter too...",
    usage: "Used to tell time (45 minutes)",
    usageHindi: "समय बताने के लिए (45 मिनट)",
    example: "It's quarter to five.",
    exampleHindi: "पौने पांच बजे हैं।",
    category: "Time",
    difficulty: "beginner"
  },
  {
    id: 124,
    english: "See you tomorrow",
    hindi: "कल मिलते हैं",
    pronunciation: "See yoo too-MOR-oh",
    usage: "Used when parting until tomorrow",
    usageHindi: "कल तक के लिए अलविदा कहते समय",
    example: "Goodbye! See you tomorrow at work.",
    exampleHindi: "अलविदा! कल काम पर मिलते हैं।",
    category: "Time",
    difficulty: "beginner"
  },
  {
    id: 125,
    english: "I'll be there in 5 minutes",
    hindi: "मैं 5 मिनट में पहुँचूंगा",
    pronunciation: "Il bee thair in five MIN-its",
    usage: "Used to give arrival time",
    usageHindi: "पहुँचने का समय बताने के लिए",
    example: "Wait for me. I'll be there in 5 minutes.",
    exampleHindi: "मेरा इंतज़ार करो। मैं 5 मिनट में पहुँचूंगा।",
    category: "Time",
    difficulty: "beginner"
  },
];

// Utility functions
export const getPhrasesByCategory = (category: string): CommonPhrase[] => {
  if (category === "all") return commonPhrases;
  return commonPhrases.filter(phrase => phrase.category === category);
};

export const getPhrasesByDifficulty = (difficulty: string): CommonPhrase[] => {
  if (difficulty === "all") return commonPhrases;
  return commonPhrases.filter(phrase => phrase.difficulty === difficulty);
};

export const searchPhrases = (query: string): CommonPhrase[] => {
  const lowerQuery = query.toLowerCase();
  return commonPhrases.filter(phrase => 
    phrase.english.toLowerCase().includes(lowerQuery) ||
    phrase.hindi.includes(query) ||
    phrase.category.toLowerCase().includes(lowerQuery)
  );
};

export const getCategories = (): string[] => {
  return Array.from(new Set(commonPhrases.map(phrase => phrase.category)));
};

export default commonPhrases;
