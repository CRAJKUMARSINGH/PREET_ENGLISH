// Hindi Listening Practice Data - 100+ Listening Lessons for Hindi Mother Tongue English Learning
// Prepared by: Mrs. Premlata Jain, AAO, PWD Udaipur

export interface ListeningQuestion {
  question: string;
  questionHindi: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
}

export interface ListeningLesson {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  audioText: string;
  audioTextHindi: string;
  duration: string;
  questions: ListeningQuestion[];
  vocabulary: { word: string; meaning: string; meaningHindi: string }[];
}

export const listeningLessons: ListeningLesson[] = [
  // ==================== DAILY CONVERSATIONS (1-20) ====================
  {
    id: 1,
    title: "Morning Routine",
    titleHindi: "सुबह की दिनचर्या",
    description: "Listen to a conversation about morning activities",
    descriptionHindi: "सुबह की गतिविधियों के बारे में बातचीत सुनें",
    difficulty: "beginner",
    category: "Daily Life",
    audioText: "Good morning, Rahul! Did you sleep well last night? Yes, I slept very well, thank you. What time did you wake up? I woke up at 6 o'clock. That's early! What do you do in the morning? First, I brush my teeth and take a shower. Then I have breakfast with my family. What do you usually eat for breakfast? I usually eat toast with butter and drink a glass of milk.",
    audioTextHindi: "सुप्रभात, राहुल! क्या तुम कल रात अच्छी नींद सोए? हाँ, मैं बहुत अच्छी नींद सोया, धन्यवाद। तुम कितने बजे उठे? मैं 6 बजे उठा। यह जल्दी है! तुम सुबह क्या करते हो? पहले, मैं अपने दांत साफ करता हूँ और नहाता हूँ। फिर मैं अपने परिवार के साथ नाश्ता करता हूँ। तुम आमतौर पर नाश्ते में क्या खाते हो? मैं आमतौर पर मक्खन के साथ टोस्ट खाता हूँ और एक गिलास दूध पीता हूँ।",
    duration: "2:30",
    questions: [
      { question: "What time did Rahul wake up?", questionHindi: "राहुल कितने बजे उठा?", options: ["5 o'clock", "6 o'clock", "7 o'clock", "8 o'clock"], correctAnswer: 1, explanation: "Rahul said 'I woke up at 6 o'clock'", explanationHindi: "राहुल ने कहा 'मैं 6 बजे उठा'" },
      { question: "What does Rahul do first in the morning?", questionHindi: "राहुल सुबह सबसे पहले क्या करता है?", options: ["Eat breakfast", "Take a shower", "Brush teeth and shower", "Exercise"], correctAnswer: 2, explanation: "He said 'First, I brush my teeth and take a shower'", explanationHindi: "उसने कहा 'पहले, मैं अपने दांत साफ करता हूँ और नहाता हूँ'" },
      { question: "What does Rahul usually drink for breakfast?", questionHindi: "राहुल आमतौर पर नाश्ते में क्या पीता है?", options: ["Tea", "Coffee", "Milk", "Juice"], correctAnswer: 2, explanation: "He drinks a glass of milk", explanationHindi: "वह एक गिलास दूध पीता है" }
    ],
    vocabulary: [
      { word: "wake up", meaning: "to stop sleeping", meaningHindi: "जागना" },
      { word: "brush teeth", meaning: "to clean teeth", meaningHindi: "दांत साफ करना" },
      { word: "shower", meaning: "to wash body with water", meaningHindi: "नहाना" }
    ]
  },
  {
    id: 2,
    title: "At the Grocery Store",
    titleHindi: "किराने की दुकान पर",
    description: "Listen to a shopping conversation",
    descriptionHindi: "खरीदारी की बातचीत सुनें",
    difficulty: "beginner",
    category: "Shopping",
    audioText: "Hello, can I help you? Yes, I need some vegetables. What vegetables do you need? I need two kilograms of potatoes and one kilogram of onions. Here you are. Anything else? Yes, do you have fresh tomatoes? Yes, these tomatoes came this morning. They are very fresh. How much are they? They are 40 rupees per kilogram. I'll take one kilogram please. Your total is 120 rupees.",
    audioTextHindi: "नमस्ते, क्या मैं आपकी मदद कर सकता हूँ? हाँ, मुझे कुछ सब्ज़ियाँ चाहिए। आपको कौन सी सब्ज़ियाँ चाहिए? मुझे दो किलो आलू और एक किलो प्याज़ चाहिए। यह लीजिए। कुछ और? हाँ, क्या आपके पास ताज़े टमाटर हैं? हाँ, ये टमाटर आज सुबह आए हैं। ये बहुत ताज़े हैं। ये कितने के हैं? ये 40 रुपये प्रति किलो हैं। मुझे एक किलो दे दीजिए। आपका कुल 120 रुपये है।",
    duration: "2:15",
    questions: [
      { question: "How many kilograms of potatoes does the customer need?", questionHindi: "ग्राहक को कितने किलो आलू चाहिए?", options: ["One", "Two", "Three", "Four"], correctAnswer: 1, explanation: "The customer asked for two kilograms of potatoes", explanationHindi: "ग्राहक ने दो किलो आलू मांगे" },
      { question: "How much do the tomatoes cost per kilogram?", questionHindi: "टमाटर प्रति किलो कितने के हैं?", options: ["30 rupees", "40 rupees", "50 rupees", "60 rupees"], correctAnswer: 1, explanation: "The shopkeeper said tomatoes are 40 rupees per kilogram", explanationHindi: "दुकानदार ने कहा टमाटर 40 रुपये प्रति किलो हैं" },
      { question: "What is the total bill?", questionHindi: "कुल बिल कितना है?", options: ["100 rupees", "110 rupees", "120 rupees", "130 rupees"], correctAnswer: 2, explanation: "The total is 120 rupees", explanationHindi: "कुल 120 रुपये है" }
    ],
    vocabulary: [
      { word: "vegetables", meaning: "plants used as food", meaningHindi: "सब्ज़ियाँ" },
      { word: "fresh", meaning: "recently made or obtained", meaningHindi: "ताज़ा" },
      { word: "total", meaning: "complete amount", meaningHindi: "कुल" }
    ]
  },
  {
    id: 3,
    title: "Weather Forecast",
    titleHindi: "मौसम का पूर्वानुमान",
    description: "Listen to a weather report",
    descriptionHindi: "मौसम की रिपोर्ट सुनें",
    difficulty: "beginner",
    category: "Daily Life",
    audioText: "Good morning! Here is today's weather forecast. Today will be a sunny day with clear skies. The temperature will be around 32 degrees Celsius. It will be quite hot in the afternoon, so please drink plenty of water. Tomorrow, we expect some clouds in the morning, but it will clear up by evening. There is a 20 percent chance of rain on Wednesday. Have a great day!",
    audioTextHindi: "सुप्रभात! यह रहा आज का मौसम पूर्वानुमान। आज धूप वाला दिन होगा साफ आसमान के साथ। तापमान लगभग 32 डिग्री सेल्सियस होगा। दोपहर में काफी गर्मी होगी, इसलिए कृपया खूब पानी पिएं। कल, हम सुबह कुछ बादलों की उम्मीद करते हैं, लेकिन शाम तक साफ हो जाएगा। बुधवार को बारिश की 20 प्रतिशत संभावना है। आपका दिन शुभ हो!",
    duration: "1:45",
    questions: [
      { question: "What will the weather be like today?", questionHindi: "आज मौसम कैसा रहेगा?", options: ["Rainy", "Cloudy", "Sunny", "Windy"], correctAnswer: 2, explanation: "The forecast says it will be a sunny day", explanationHindi: "पूर्वानुमान कहता है कि धूप वाला दिन होगा" },
      { question: "What is the expected temperature?", questionHindi: "अपेक्षित तापमान क्या है?", options: ["28 degrees", "30 degrees", "32 degrees", "35 degrees"], correctAnswer: 2, explanation: "The temperature will be around 32 degrees Celsius", explanationHindi: "तापमान लगभग 32 डिग्री सेल्सियस होगा" },
      { question: "When is there a chance of rain?", questionHindi: "बारिश की संभावना कब है?", options: ["Today", "Tomorrow", "Wednesday", "Thursday"], correctAnswer: 2, explanation: "There is a 20 percent chance of rain on Wednesday", explanationHindi: "बुधवार को बारिश की 20 प्रतिशत संभावना है" }
    ],
    vocabulary: [
      { word: "forecast", meaning: "prediction of future weather", meaningHindi: "पूर्वानुमान" },
      { word: "temperature", meaning: "degree of heat or cold", meaningHindi: "तापमान" },
      { word: "chance", meaning: "possibility", meaningHindi: "संभावना" }
    ]
  },

  {
    id: 4,
    title: "Making a Phone Call",
    titleHindi: "फोन कॉल करना",
    description: "Listen to a telephone conversation",
    descriptionHindi: "टेलीफोन पर बातचीत सुनें",
    difficulty: "beginner",
    category: "Daily Life",
    audioText: "Hello? Hi, this is Priya. Is Amit there? Yes, just a moment please. I'll call him. Hello, Amit speaking. Hi Amit! This is Priya. How are you? I'm fine, thanks. What's up? I wanted to ask if you're free this Saturday. We're having a small party at my house. That sounds great! What time does it start? It starts at 7 PM. Can you come? Yes, I'll be there. Should I bring anything? Just bring yourself! See you on Saturday. Bye!",
    audioTextHindi: "हैलो? नमस्ते, मैं प्रिया बोल रही हूँ। क्या अमित वहाँ है? हाँ, एक मिनट रुकिए। मैं उन्हें बुलाता हूँ। हैलो, अमित बोल रहा हूँ। नमस्ते अमित! मैं प्रिया हूँ। कैसे हो? मैं ठीक हूँ, धन्यवाद। क्या बात है? मैं पूछना चाहती थी कि क्या तुम इस शनिवार को फ्री हो। हम मेरे घर पर एक छोटी पार्टी कर रहे हैं। यह बहुत अच्छा लगता है! यह कितने बजे शुरू होगी? यह शाम 7 बजे शुरू होगी। क्या तुम आ सकते हो? हाँ, मैं आऊंगा। क्या मुझे कुछ लाना चाहिए? बस तुम आ जाओ! शनिवार को मिलते हैं। बाय!",
    duration: "2:00",
    questions: [
      { question: "Who is calling?", questionHindi: "कौन कॉल कर रहा है?", options: ["Amit", "Priya", "Rahul", "Neha"], correctAnswer: 1, explanation: "Priya is making the call", explanationHindi: "प्रिया कॉल कर रही है" },
      { question: "What day is the party?", questionHindi: "पार्टी किस दिन है?", options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: 1, explanation: "The party is on Saturday", explanationHindi: "पार्टी शनिवार को है" },
      { question: "What time does the party start?", questionHindi: "पार्टी कितने बजे शुरू होगी?", options: ["6 PM", "7 PM", "8 PM", "9 PM"], correctAnswer: 1, explanation: "The party starts at 7 PM", explanationHindi: "पार्टी शाम 7 बजे शुरू होगी" }
    ],
    vocabulary: [
      { word: "moment", meaning: "a very short time", meaningHindi: "क्षण" },
      { word: "party", meaning: "social gathering", meaningHindi: "पार्टी" },
      { word: "free", meaning: "available", meaningHindi: "फ्री/खाली" }
    ]
  },
  {
    id: 5,
    title: "At the Restaurant",
    titleHindi: "रेस्तरां में",
    description: "Listen to ordering food at a restaurant",
    descriptionHindi: "रेस्तरां में खाना ऑर्डर करना सुनें",
    difficulty: "beginner",
    category: "Restaurant",
    audioText: "Good evening, sir. Welcome to our restaurant. Table for how many? Table for two, please. Right this way. Here is your menu. Thank you. What do you recommend? Our butter chicken is very popular. It's our specialty. That sounds good. I'll have the butter chicken with naan. And for you, madam? I'll have the vegetable biryani, please. Would you like anything to drink? Two glasses of water and one mango lassi, please. Your order will be ready in 15 minutes.",
    audioTextHindi: "शुभ संध्या, सर। हमारे रेस्तरां में आपका स्वागत है। कितने लोगों के लिए टेबल? दो लोगों के लिए टेबल, कृपया। इस तरफ आइए। यह रहा आपका मेन्यू। धन्यवाद। आप क्या सिफारिश करेंगे? हमारा बटर चिकन बहुत लोकप्रिय है। यह हमारी विशेषता है। यह अच्छा लगता है। मुझे बटर चिकन नान के साथ दीजिए। और आपके लिए, मैडम? मुझे वेजिटेबल बिरयानी दीजिए, कृपया। क्या आप कुछ पीना चाहेंगे? दो गिलास पानी और एक मैंगो लस्सी, कृपया। आपका ऑर्डर 15 मिनट में तैयार हो जाएगा।",
    duration: "2:20",
    questions: [
      { question: "How many people need a table?", questionHindi: "कितने लोगों को टेबल चाहिए?", options: ["One", "Two", "Three", "Four"], correctAnswer: 1, explanation: "They asked for a table for two", explanationHindi: "उन्होंने दो लोगों के लिए टेबल मांगी" },
      { question: "What is the restaurant's specialty?", questionHindi: "रेस्तरां की विशेषता क्या है?", options: ["Biryani", "Butter chicken", "Naan", "Lassi"], correctAnswer: 1, explanation: "Butter chicken is their specialty", explanationHindi: "बटर चिकन उनकी विशेषता है" },
      { question: "How long will the order take?", questionHindi: "ऑर्डर में कितना समय लगेगा?", options: ["10 minutes", "15 minutes", "20 minutes", "25 minutes"], correctAnswer: 1, explanation: "The order will be ready in 15 minutes", explanationHindi: "ऑर्डर 15 मिनट में तैयार होगा" }
    ],
    vocabulary: [
      { word: "recommend", meaning: "to suggest", meaningHindi: "सिफारिश करना" },
      { word: "specialty", meaning: "special dish", meaningHindi: "विशेषता" },
      { word: "order", meaning: "request for food", meaningHindi: "ऑर्डर" }
    ]
  },
  {
    id: 6,
    title: "Doctor's Visit",
    titleHindi: "डॉक्टर से मिलना",
    description: "Listen to a conversation at a clinic",
    descriptionHindi: "क्लिनिक में बातचीत सुनें",
    difficulty: "intermediate",
    category: "Healthcare",
    audioText: "Good morning, doctor. Good morning! Please sit down. What seems to be the problem? I've been having a headache for the past three days. I see. Do you have any other symptoms? Yes, I also have a slight fever and my body aches. Let me check your temperature. It's 100 degrees. You have a viral infection. I'll prescribe some medicine. Take this tablet three times a day after meals. Drink plenty of water and rest for two days. Should I come back for a follow-up? Yes, come back after three days if you don't feel better.",
    audioTextHindi: "सुप्रभात, डॉक्टर। सुप्रभात! कृपया बैठिए। क्या समस्या है? मुझे पिछले तीन दिनों से सिरदर्द हो रहा है। समझा। क्या आपको कोई अन्य लक्षण हैं? हाँ, मुझे हल्का बुखार भी है और शरीर में दर्द है। मुझे आपका तापमान जांचने दीजिए। यह 100 डिग्री है। आपको वायरल इन्फेक्शन है। मैं कुछ दवा लिखूंगा। यह गोली दिन में तीन बार खाने के बाद लें। खूब पानी पिएं और दो दिन आराम करें। क्या मुझे फॉलो-अप के लिए वापस आना चाहिए? हाँ, अगर आप बेहतर महसूस नहीं करते तो तीन दिन बाद वापस आइए।",
    duration: "2:45",
    questions: [
      { question: "How long has the patient had a headache?", questionHindi: "मरीज़ को कितने दिनों से सिरदर्द है?", options: ["One day", "Two days", "Three days", "Four days"], correctAnswer: 2, explanation: "The patient has had a headache for three days", explanationHindi: "मरीज़ को तीन दिनों से सिरदर्द है" },
      { question: "What is the patient's temperature?", questionHindi: "मरीज़ का तापमान क्या है?", options: ["98 degrees", "99 degrees", "100 degrees", "101 degrees"], correctAnswer: 2, explanation: "The temperature is 100 degrees", explanationHindi: "तापमान 100 डिग्री है" },
      { question: "How many times a day should the medicine be taken?", questionHindi: "दवा दिन में कितनी बार लेनी चाहिए?", options: ["Once", "Twice", "Three times", "Four times"], correctAnswer: 2, explanation: "Take the tablet three times a day", explanationHindi: "गोली दिन में तीन बार लें" }
    ],
    vocabulary: [
      { word: "symptoms", meaning: "signs of illness", meaningHindi: "लक्षण" },
      { word: "prescribe", meaning: "to recommend medicine", meaningHindi: "दवा लिखना" },
      { word: "follow-up", meaning: "return visit", meaningHindi: "फॉलो-अप" }
    ]
  },
  {
    id: 7,
    title: "Job Interview",
    titleHindi: "नौकरी का इंटरव्यू",
    description: "Listen to a job interview conversation",
    descriptionHindi: "नौकरी के इंटरव्यू की बातचीत सुनें",
    difficulty: "intermediate",
    category: "Professional",
    audioText: "Good morning. Please have a seat. Thank you. So, tell me about yourself. My name is Ravi Kumar. I completed my engineering degree from Delhi University in 2020. I have three years of experience in software development. Why do you want to work for our company? I've heard great things about your company culture. I believe my skills would be a good fit for this position. What are your strengths? I'm a quick learner and I work well in a team. I'm also good at problem-solving. Where do you see yourself in five years? I hope to grow with the company and take on more responsibilities. Do you have any questions for us? Yes, what would be my main responsibilities in this role?",
    audioTextHindi: "सुप्रभात। कृपया बैठिए। धन्यवाद। तो, अपने बारे में बताइए। मेरा नाम रवि कुमार है। मैंने 2020 में दिल्ली विश्वविद्यालय से इंजीनियरिंग की डिग्री पूरी की। मुझे सॉफ्टवेयर डेवलपमेंट में तीन साल का अनुभव है। आप हमारी कंपनी में क्यों काम करना चाहते हैं? मैंने आपकी कंपनी की संस्कृति के बारे में बहुत अच्छी बातें सुनी हैं। मुझे विश्वास है कि मेरे कौशल इस पद के लिए उपयुक्त होंगे। आपकी ताकत क्या है? मैं जल्दी सीखता हूँ और टीम में अच्छा काम करता हूँ। मैं समस्या-समाधान में भी अच्छा हूँ। आप पांच साल में खुद को कहाँ देखते हैं? मुझे उम्मीद है कि मैं कंपनी के साथ बढ़ूंगा और अधिक जिम्मेदारियां लूंगा। क्या आपके पास हमारे लिए कोई सवाल है? हाँ, इस भूमिका में मेरी मुख्य जिम्मेदारियां क्या होंगी?",
    duration: "3:00",
    questions: [
      { question: "When did Ravi complete his degree?", questionHindi: "रवि ने अपनी डिग्री कब पूरी की?", options: ["2018", "2019", "2020", "2021"], correctAnswer: 2, explanation: "He completed his degree in 2020", explanationHindi: "उसने 2020 में अपनी डिग्री पूरी की" },
      { question: "How many years of experience does Ravi have?", questionHindi: "रवि को कितने साल का अनुभव है?", options: ["One year", "Two years", "Three years", "Four years"], correctAnswer: 2, explanation: "He has three years of experience", explanationHindi: "उसे तीन साल का अनुभव है" },
      { question: "What is one of Ravi's strengths?", questionHindi: "रवि की एक ताकत क्या है?", options: ["Cooking", "Quick learner", "Singing", "Dancing"], correctAnswer: 1, explanation: "He said he's a quick learner", explanationHindi: "उसने कहा वह जल्दी सीखता है" }
    ],
    vocabulary: [
      { word: "experience", meaning: "knowledge from doing something", meaningHindi: "अनुभव" },
      { word: "strengths", meaning: "good qualities", meaningHindi: "ताकत" },
      { word: "responsibilities", meaning: "duties", meaningHindi: "जिम्मेदारियां" }
    ]
  },
  {
    id: 8,
    title: "Train Announcement",
    titleHindi: "ट्रेन की घोषणा",
    description: "Listen to a railway station announcement",
    descriptionHindi: "रेलवे स्टेशन की घोषणा सुनें",
    difficulty: "intermediate",
    category: "Travel",
    audioText: "Attention please! Train number 12952, Mumbai Rajdhani Express, is arriving on platform number 3. This train will depart at 5:30 PM. Passengers traveling to Mumbai are requested to proceed to platform 3. Please keep your tickets and ID cards ready for checking. The train will stop at Kota, Vadodara, and Surat before reaching Mumbai Central. The expected arrival time at Mumbai Central is 8:30 AM tomorrow morning. We wish you a pleasant journey. Thank you.",
    audioTextHindi: "कृपया ध्यान दें! ट्रेन नंबर 12952, मुंबई राजधानी एक्सप्रेस, प्लेटफॉर्म नंबर 3 पर आ रही है। यह ट्रेन शाम 5:30 बजे रवाना होगी। मुंबई जाने वाले यात्रियों से अनुरोध है कि वे प्लेटफॉर्म 3 पर जाएं। कृपया जांच के लिए अपने टिकट और आईडी कार्ड तैयार रखें। ट्रेन मुंबई सेंट्रल पहुंचने से पहले कोटा, वडोदरा और सूरत पर रुकेगी। मुंबई सेंट्रल पर अपेक्षित आगमन समय कल सुबह 8:30 बजे है। हम आपकी यात्रा शुभ होने की कामना करते हैं। धन्यवाद।",
    duration: "1:50",
    questions: [
      { question: "Which platform is the train arriving on?", questionHindi: "ट्रेन किस प्लेटफॉर्म पर आ रही है?", options: ["Platform 1", "Platform 2", "Platform 3", "Platform 4"], correctAnswer: 2, explanation: "The train is arriving on platform 3", explanationHindi: "ट्रेन प्लेटफॉर्म 3 पर आ रही है" },
      { question: "What time will the train depart?", questionHindi: "ट्रेन कितने बजे रवाना होगी?", options: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"], correctAnswer: 1, explanation: "The train will depart at 5:30 PM", explanationHindi: "ट्रेन शाम 5:30 बजे रवाना होगी" },
      { question: "What time will the train reach Mumbai?", questionHindi: "ट्रेन मुंबई कितने बजे पहुंचेगी?", options: ["7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM"], correctAnswer: 2, explanation: "Expected arrival is 8:30 AM", explanationHindi: "अपेक्षित आगमन 8:30 बजे है" }
    ],
    vocabulary: [
      { word: "depart", meaning: "to leave", meaningHindi: "रवाना होना" },
      { word: "proceed", meaning: "to go forward", meaningHindi: "आगे बढ़ना" },
      { word: "arrival", meaning: "reaching a place", meaningHindi: "आगमन" }
    ]
  },

  {
    id: 9,
    title: "Bank Transaction",
    titleHindi: "बैंक लेनदेन",
    description: "Listen to a conversation at a bank",
    descriptionHindi: "बैंक में बातचीत सुनें",
    difficulty: "intermediate",
    category: "Finance",
    audioText: "Good morning, sir. How may I help you? I want to open a savings account. Do you have your ID proof and address proof? Yes, I have my Aadhaar card and electricity bill. That's perfect. Please fill out this form. What is the minimum balance required? The minimum balance is 5000 rupees. You'll also get a debit card and internet banking facility. How long will it take to get the debit card? Your debit card will be delivered to your address within 7 working days. Thank you for your help.",
    audioTextHindi: "सुप्रभात, सर। मैं आपकी कैसे मदद कर सकता हूँ? मैं एक बचत खाता खोलना चाहता हूँ। क्या आपके पास आईडी प्रूफ और एड्रेस प्रूफ है? हाँ, मेरे पास आधार कार्ड और बिजली का बिल है। यह बिल्कुल सही है। कृपया यह फॉर्म भरें। न्यूनतम बैलेंस कितना रखना होगा? न्यूनतम बैलेंस 5000 रुपये है। आपको डेबिट कार्ड और इंटरनेट बैंकिंग की सुविधा भी मिलेगी। डेबिट कार्ड मिलने में कितना समय लगेगा? आपका डेबिट कार्ड 7 कार्य दिवसों के भीतर आपके पते पर पहुंचा दिया जाएगा। आपकी मदद के लिए धन्यवाद।",
    duration: "2:10",
    questions: [
      { question: "What type of account does the customer want to open?", questionHindi: "ग्राहक किस प्रकार का खाता खोलना चाहता है?", options: ["Current account", "Savings account", "Fixed deposit", "Loan account"], correctAnswer: 1, explanation: "The customer wants to open a savings account", explanationHindi: "ग्राहक बचत खाता खोलना चाहता है" },
      { question: "What is the minimum balance required?", questionHindi: "न्यूनतम बैलेंस कितना रखना होगा?", options: ["1000 rupees", "3000 rupees", "5000 rupees", "10000 rupees"], correctAnswer: 2, explanation: "The minimum balance is 5000 rupees", explanationHindi: "न्यूनतम बैलेंस 5000 रुपये है" },
      { question: "How many days will it take to get the debit card?", questionHindi: "डेबिट कार्ड मिलने में कितने दिन लगेंगे?", options: ["3 days", "5 days", "7 days", "10 days"], correctAnswer: 2, explanation: "The debit card will be delivered within 7 working days", explanationHindi: "डेबिट कार्ड 7 कार्य दिवसों में मिलेगा" }
    ],
    vocabulary: [
      { word: "savings account", meaning: "bank account for saving money", meaningHindi: "बचत खाता" },
      { word: "minimum balance", meaning: "lowest amount required", meaningHindi: "न्यूनतम बैलेंस" },
      { word: "debit card", meaning: "card to withdraw money", meaningHindi: "डेबिट कार्ड" }
    ]
  },
  {
    id: 10,
    title: "Hotel Booking",
    titleHindi: "होटल बुकिंग",
    description: "Listen to a hotel reservation conversation",
    descriptionHindi: "होटल आरक्षण की बातचीत सुनें",
    difficulty: "intermediate",
    category: "Travel",
    audioText: "Good afternoon, Grand Hotel. How may I help you? I'd like to book a room for this weekend. For how many nights? Two nights, from Friday to Sunday. What type of room would you prefer? Do you have a room with a view? Yes, we have deluxe rooms with a mountain view. The rate is 4500 rupees per night including breakfast. That sounds good. I'll take it. May I have your name and phone number? My name is Sharma, and my number is 9876543210. Your booking is confirmed. Please bring your ID at check-in. Check-in time is 2 PM.",
    audioTextHindi: "शुभ दोपहर, ग्रैंड होटल। मैं आपकी कैसे मदद कर सकता हूँ? मैं इस सप्ताहांत के लिए एक कमरा बुक करना चाहता हूँ। कितनी रातों के लिए? दो रातें, शुक्रवार से रविवार तक। आप किस प्रकार का कमरा पसंद करेंगे? क्या आपके पास व्यू वाला कमरा है? हाँ, हमारे पास पहाड़ के व्यू वाले डीलक्स कमरे हैं। दर 4500 रुपये प्रति रात है जिसमें नाश्ता शामिल है। यह अच्छा लगता है। मैं यह लूंगा। क्या मुझे आपका नाम और फोन नंबर मिल सकता है? मेरा नाम शर्मा है, और मेरा नंबर 9876543210 है। आपकी बुकिंग कन्फर्म हो गई है। कृपया चेक-इन पर अपना आईडी लाएं। चेक-इन का समय दोपहर 2 बजे है।",
    duration: "2:25",
    questions: [
      { question: "How many nights is the booking for?", questionHindi: "बुकिंग कितनी रातों के लिए है?", options: ["One night", "Two nights", "Three nights", "Four nights"], correctAnswer: 1, explanation: "The booking is for two nights", explanationHindi: "बुकिंग दो रातों के लिए है" },
      { question: "What is the room rate per night?", questionHindi: "प्रति रात कमरे का किराया क्या है?", options: ["3500 rupees", "4000 rupees", "4500 rupees", "5000 rupees"], correctAnswer: 2, explanation: "The rate is 4500 rupees per night", explanationHindi: "दर 4500 रुपये प्रति रात है" },
      { question: "What time is check-in?", questionHindi: "चेक-इन का समय क्या है?", options: ["12 PM", "1 PM", "2 PM", "3 PM"], correctAnswer: 2, explanation: "Check-in time is 2 PM", explanationHindi: "चेक-इन का समय दोपहर 2 बजे है" }
    ],
    vocabulary: [
      { word: "booking", meaning: "reservation", meaningHindi: "बुकिंग" },
      { word: "deluxe", meaning: "luxurious", meaningHindi: "डीलक्स" },
      { word: "check-in", meaning: "arrival registration", meaningHindi: "चेक-इन" }
    ]
  },
  // ==================== EDUCATIONAL CONTENT (11-30) ====================
  {
    id: 11,
    title: "School Assembly",
    titleHindi: "स्कूल की सभा",
    description: "Listen to a school assembly announcement",
    descriptionHindi: "स्कूल की सभा की घोषणा सुनें",
    difficulty: "beginner",
    category: "Education",
    audioText: "Good morning, students and teachers. Today is Monday, the 15th of January. Let us begin our assembly with the national anthem. After the anthem, we have some important announcements. First, the annual sports day will be held on the 25th of this month. All students must participate in at least one event. Second, the science exhibition will be on February 5th. Students interested in participating should submit their project ideas to their class teachers by this Friday. Finally, tomorrow is a holiday for Republic Day. School will reopen on January 28th. Have a great day!",
    audioTextHindi: "सुप्रभात, छात्रों और शिक्षकों। आज सोमवार है, 15 जनवरी। आइए अपनी सभा राष्ट्रगान से शुरू करें। राष्ट्रगान के बाद, हमारे पास कुछ महत्वपूर्ण घोषणाएं हैं। पहला, वार्षिक खेल दिवस इस महीने की 25 तारीख को होगा। सभी छात्रों को कम से कम एक कार्यक्रम में भाग लेना होगा। दूसरा, विज्ञान प्रदर्शनी 5 फरवरी को होगी। भाग लेने में रुचि रखने वाले छात्रों को इस शुक्रवार तक अपने प्रोजेक्ट आइडिया अपने क्लास टीचर को जमा करने होंगे। अंत में, कल गणतंत्र दिवस की छुट्टी है। स्कूल 28 जनवरी को फिर से खुलेगा। आपका दिन शुभ हो!",
    duration: "2:00",
    questions: [
      { question: "What date is the sports day?", questionHindi: "खेल दिवस किस तारीख को है?", options: ["15th", "20th", "25th", "28th"], correctAnswer: 2, explanation: "Sports day is on the 25th", explanationHindi: "खेल दिवस 25 तारीख को है" },
      { question: "When is the science exhibition?", questionHindi: "विज्ञान प्रदर्शनी कब है?", options: ["January 28th", "February 1st", "February 5th", "February 10th"], correctAnswer: 2, explanation: "The science exhibition is on February 5th", explanationHindi: "विज्ञान प्रदर्शनी 5 फरवरी को है" },
      { question: "Why is tomorrow a holiday?", questionHindi: "कल छुट्टी क्यों है?", options: ["Sports day", "Science exhibition", "Republic Day", "Independence Day"], correctAnswer: 2, explanation: "Tomorrow is Republic Day", explanationHindi: "कल गणतंत्र दिवस है" }
    ],
    vocabulary: [
      { word: "assembly", meaning: "gathering of students", meaningHindi: "सभा" },
      { word: "participate", meaning: "to take part", meaningHindi: "भाग लेना" },
      { word: "exhibition", meaning: "display or show", meaningHindi: "प्रदर्शनी" }
    ]
  },
  {
    id: 12,
    title: "Library Rules",
    titleHindi: "पुस्तकालय के नियम",
    description: "Listen to library instructions",
    descriptionHindi: "पुस्तकालय के निर्देश सुनें",
    difficulty: "beginner",
    category: "Education",
    audioText: "Welcome to the city library. Here are some important rules. First, please maintain silence in the reading area. Second, you can borrow up to three books at a time. Books must be returned within 14 days. If you return books late, there is a fine of 5 rupees per day. Third, food and drinks are not allowed inside the library. Fourth, please handle books carefully. Do not write or draw in the books. The library is open from 9 AM to 7 PM, Monday to Saturday. It is closed on Sundays and public holidays. If you need any help, please ask at the information desk.",
    audioTextHindi: "शहर के पुस्तकालय में आपका स्वागत है। यहाँ कुछ महत्वपूर्ण नियम हैं। पहला, कृपया पढ़ने के क्षेत्र में शांति बनाए रखें। दूसरा, आप एक बार में तीन किताबें उधार ले सकते हैं। किताबें 14 दिनों के भीतर वापस करनी होंगी। अगर आप किताबें देर से लौटाते हैं, तो प्रति दिन 5 रुपये का जुर्माना है। तीसरा, पुस्तकालय के अंदर खाना और पेय पदार्थ की अनुमति नहीं है। चौथा, कृपया किताबों को सावधानी से संभालें। किताबों में लिखें या चित्र न बनाएं। पुस्तकालय सोमवार से शनिवार, सुबह 9 बजे से शाम 7 बजे तक खुला रहता है। यह रविवार और सार्वजनिक छुट्टियों पर बंद रहता है। अगर आपको कोई मदद चाहिए, तो कृपया सूचना डेस्क पर पूछें।",
    duration: "2:15",
    questions: [
      { question: "How many books can you borrow at a time?", questionHindi: "आप एक बार में कितनी किताबें उधार ले सकते हैं?", options: ["One", "Two", "Three", "Four"], correctAnswer: 2, explanation: "You can borrow up to three books", explanationHindi: "आप तीन किताबें उधार ले सकते हैं" },
      { question: "What is the late fee per day?", questionHindi: "प्रति दिन विलंब शुल्क क्या है?", options: ["2 rupees", "5 rupees", "10 rupees", "15 rupees"], correctAnswer: 1, explanation: "The fine is 5 rupees per day", explanationHindi: "जुर्माना प्रति दिन 5 रुपये है" },
      { question: "When is the library closed?", questionHindi: "पुस्तकालय कब बंद रहता है?", options: ["Saturday", "Sunday", "Monday", "Friday"], correctAnswer: 1, explanation: "The library is closed on Sundays", explanationHindi: "पुस्तकालय रविवार को बंद रहता है" }
    ],
    vocabulary: [
      { word: "borrow", meaning: "to take temporarily", meaningHindi: "उधार लेना" },
      { word: "fine", meaning: "penalty for breaking rules", meaningHindi: "जुर्माना" },
      { word: "maintain", meaning: "to keep", meaningHindi: "बनाए रखना" }
    ]
  },

  {
    id: 13,
    title: "News Report - Traffic Update",
    titleHindi: "समाचार रिपोर्ट - ट्रैफिक अपडेट",
    description: "Listen to a traffic news report",
    descriptionHindi: "ट्रैफिक समाचार रिपोर्ट सुनें",
    difficulty: "intermediate",
    category: "News",
    audioText: "Good morning, listeners. Here is your traffic update for today. There is heavy traffic on MG Road due to road construction work. Commuters are advised to take the ring road instead. The construction is expected to continue for the next two weeks. On the highway, there was a minor accident near the toll plaza, but it has been cleared. Traffic is now moving smoothly. The metro services are running normally with a frequency of 5 minutes during peak hours. For those traveling to the airport, please allow extra time as there is congestion near the terminal. Stay safe and drive carefully.",
    audioTextHindi: "सुप्रभात, श्रोताओं। यह रहा आज का ट्रैफिक अपडेट। सड़क निर्माण कार्य के कारण एमजी रोड पर भारी ट्रैफिक है। यात्रियों को सलाह दी जाती है कि वे इसके बजाय रिंग रोड लें। निर्माण अगले दो सप्ताह तक जारी रहने की उम्मीद है। हाईवे पर, टोल प्लाज़ा के पास एक छोटी दुर्घटना हुई थी, लेकिन इसे साफ कर दिया गया है। ट्रैफिक अब सुचारू रूप से चल रहा है। मेट्रो सेवाएं पीक आवर्स में 5 मिनट की फ्रीक्वेंसी के साथ सामान्य रूप से चल रही हैं। एयरपोर्ट जाने वालों के लिए, कृपया अतिरिक्त समय रखें क्योंकि टर्मिनल के पास भीड़ है। सुरक्षित रहें और सावधानी से गाड़ी चलाएं।",
    duration: "2:00",
    questions: [
      { question: "Why is there heavy traffic on MG Road?", questionHindi: "एमजी रोड पर भारी ट्रैफिक क्यों है?", options: ["Accident", "Road construction", "Festival", "Rain"], correctAnswer: 1, explanation: "There is road construction work", explanationHindi: "सड़क निर्माण कार्य चल रहा है" },
      { question: "How long will the construction continue?", questionHindi: "निर्माण कितने समय तक जारी रहेगा?", options: ["One week", "Two weeks", "Three weeks", "One month"], correctAnswer: 1, explanation: "Construction will continue for two weeks", explanationHindi: "निर्माण दो सप्ताह तक जारी रहेगा" },
      { question: "What is the metro frequency during peak hours?", questionHindi: "पीक आवर्स में मेट्रो की फ्रीक्वेंसी क्या है?", options: ["3 minutes", "5 minutes", "7 minutes", "10 minutes"], correctAnswer: 1, explanation: "Metro runs every 5 minutes during peak hours", explanationHindi: "पीक आवर्स में मेट्रो हर 5 मिनट में चलती है" }
    ],
    vocabulary: [
      { word: "commuters", meaning: "people traveling to work", meaningHindi: "यात्री" },
      { word: "congestion", meaning: "crowded traffic", meaningHindi: "भीड़" },
      { word: "frequency", meaning: "how often something happens", meaningHindi: "आवृत्ति" }
    ]
  },
  {
    id: 14,
    title: "Cooking Instructions",
    titleHindi: "खाना बनाने के निर्देश",
    description: "Listen to a recipe for making tea",
    descriptionHindi: "चाय बनाने की विधि सुनें",
    difficulty: "beginner",
    category: "Daily Life",
    audioText: "Today I'll teach you how to make perfect Indian chai. First, take one cup of water and one cup of milk in a pan. Add two teaspoons of tea leaves. Now add sugar according to your taste - I usually add two teaspoons. Put the pan on medium heat. When it starts boiling, add some crushed ginger and two cardamom pods. Let it boil for two minutes. The color should become a nice brown. Now strain the tea into cups. Your delicious chai is ready! Serve it hot with some biscuits.",
    audioTextHindi: "आज मैं आपको परफेक्ट भारतीय चाय बनाना सिखाऊंगा। पहले, एक पैन में एक कप पानी और एक कप दूध लें। दो चम्मच चाय पत्ती डालें। अब अपने स्वाद के अनुसार चीनी डालें - मैं आमतौर पर दो चम्मच डालता हूँ। पैन को मध्यम आंच पर रखें। जब यह उबलने लगे, कुछ कुटी हुई अदरक और दो इलायची डालें। इसे दो मिनट तक उबलने दें। रंग अच्छा भूरा हो जाना चाहिए। अब चाय को कप में छान लें। आपकी स्वादिष्ट चाय तैयार है! इसे कुछ बिस्कुट के साथ गर्म परोसें।",
    duration: "1:45",
    questions: [
      { question: "How much water is needed?", questionHindi: "कितना पानी चाहिए?", options: ["Half cup", "One cup", "Two cups", "Three cups"], correctAnswer: 1, explanation: "One cup of water is needed", explanationHindi: "एक कप पानी चाहिए" },
      { question: "How many teaspoons of tea leaves are used?", questionHindi: "कितने चम्मच चाय पत्ती इस्तेमाल होती है?", options: ["One", "Two", "Three", "Four"], correctAnswer: 1, explanation: "Two teaspoons of tea leaves", explanationHindi: "दो चम्मच चाय पत्ती" },
      { question: "How long should the tea boil?", questionHindi: "चाय को कितनी देर उबालना चाहिए?", options: ["One minute", "Two minutes", "Three minutes", "Five minutes"], correctAnswer: 1, explanation: "Let it boil for two minutes", explanationHindi: "इसे दो मिनट उबलने दें" }
    ],
    vocabulary: [
      { word: "strain", meaning: "to filter", meaningHindi: "छानना" },
      { word: "crushed", meaning: "broken into small pieces", meaningHindi: "कुटा हुआ" },
      { word: "boil", meaning: "to heat until bubbles form", meaningHindi: "उबालना" }
    ]
  },
  {
    id: 15,
    title: "Airport Announcement",
    titleHindi: "हवाई अड्डे की घोषणा",
    description: "Listen to an airport announcement",
    descriptionHindi: "हवाई अड्डे की घोषणा सुनें",
    difficulty: "intermediate",
    category: "Travel",
    audioText: "Attention all passengers. This is a boarding announcement for Air India flight AI-302 to London Heathrow. Boarding will begin in 15 minutes from Gate number 12. Passengers traveling in business class and those with small children may board first. Please have your boarding pass and passport ready. All passengers must complete security check before boarding. The flight duration is approximately 9 hours. We expect to land in London at 6:30 PM local time. Thank you for choosing Air India. We wish you a pleasant flight.",
    audioTextHindi: "सभी यात्रियों का ध्यान दें। यह लंदन हीथ्रो के लिए एयर इंडिया फ्लाइट AI-302 की बोर्डिंग घोषणा है। बोर्डिंग 15 मिनट में गेट नंबर 12 से शुरू होगी। बिजनेस क्लास में यात्रा करने वाले यात्री और छोटे बच्चों वाले पहले बोर्ड कर सकते हैं। कृपया अपना बोर्डिंग पास और पासपोर्ट तैयार रखें। सभी यात्रियों को बोर्डिंग से पहले सुरक्षा जांच पूरी करनी होगी। उड़ान की अवधि लगभग 9 घंटे है। हम स्थानीय समय के अनुसार शाम 6:30 बजे लंदन में उतरने की उम्मीद करते हैं। एयर इंडिया चुनने के लिए धन्यवाद। हम आपकी उड़ान सुखद होने की कामना करते हैं।",
    duration: "1:50",
    questions: [
      { question: "Which gate is the flight boarding from?", questionHindi: "फ्लाइट किस गेट से बोर्ड हो रही है?", options: ["Gate 10", "Gate 11", "Gate 12", "Gate 13"], correctAnswer: 2, explanation: "Boarding is from Gate number 12", explanationHindi: "बोर्डिंग गेट नंबर 12 से है" },
      { question: "How long is the flight?", questionHindi: "फ्लाइट कितनी लंबी है?", options: ["7 hours", "8 hours", "9 hours", "10 hours"], correctAnswer: 2, explanation: "The flight duration is 9 hours", explanationHindi: "उड़ान की अवधि 9 घंटे है" },
      { question: "Who can board first?", questionHindi: "पहले कौन बोर्ड कर सकता है?", options: ["Economy class", "Business class", "All passengers", "Senior citizens"], correctAnswer: 1, explanation: "Business class and those with small children board first", explanationHindi: "बिजनेस क्लास और छोटे बच्चों वाले पहले बोर्ड करते हैं" }
    ],
    vocabulary: [
      { word: "boarding", meaning: "getting on a plane", meaningHindi: "बोर्डिंग" },
      { word: "duration", meaning: "length of time", meaningHindi: "अवधि" },
      { word: "approximately", meaning: "about, roughly", meaningHindi: "लगभग" }
    ]
  },
  {
    id: 16,
    title: "Office Meeting",
    titleHindi: "ऑफिस मीटिंग",
    description: "Listen to an office meeting discussion",
    descriptionHindi: "ऑफिस मीटिंग की चर्चा सुनें",
    difficulty: "advanced",
    category: "Professional",
    audioText: "Good morning, everyone. Let's begin our weekly meeting. First, I'd like to discuss the sales report for last month. Our sales increased by 15 percent compared to the previous month. This is excellent progress. However, we need to focus more on the northern region where sales are still low. Second, the new product launch is scheduled for next month. The marketing team has prepared the campaign. We need everyone's support to make it successful. Third, please remember to submit your expense reports by Friday. Any questions? Yes, when will we receive the new laptops? The IT department said they will be delivered next week. Anything else? No? Okay, let's get back to work. Thank you all.",
    audioTextHindi: "सुप्रभात, सभी को। आइए अपनी साप्ताहिक मीटिंग शुरू करें। पहले, मैं पिछले महीने की बिक्री रिपोर्ट पर चर्चा करना चाहूंगा। पिछले महीने की तुलना में हमारी बिक्री 15 प्रतिशत बढ़ी है। यह उत्कृष्ट प्रगति है। हालांकि, हमें उत्तरी क्षेत्र पर अधिक ध्यान देने की जरूरत है जहां बिक्री अभी भी कम है। दूसरा, नए उत्पाद का लॉन्च अगले महीने निर्धारित है। मार्केटिंग टीम ने अभियान तैयार कर लिया है। इसे सफल बनाने के लिए हमें सभी के सहयोग की जरूरत है। तीसरा, कृपया शुक्रवार तक अपनी खर्च रिपोर्ट जमा करना याद रखें। कोई सवाल? हाँ, हमें नए लैपटॉप कब मिलेंगे? आईटी विभाग ने कहा कि वे अगले सप्ताह डिलीवर हो जाएंगे। कुछ और? नहीं? ठीक है, चलिए काम पर वापस चलते हैं। सभी को धन्यवाद।",
    duration: "2:30",
    questions: [
      { question: "By how much did sales increase?", questionHindi: "बिक्री कितनी बढ़ी?", options: ["10 percent", "15 percent", "20 percent", "25 percent"], correctAnswer: 1, explanation: "Sales increased by 15 percent", explanationHindi: "बिक्री 15 प्रतिशत बढ़ी" },
      { question: "When is the new product launch?", questionHindi: "नए उत्पाद का लॉन्च कब है?", options: ["This week", "Next week", "This month", "Next month"], correctAnswer: 3, explanation: "The launch is scheduled for next month", explanationHindi: "लॉन्च अगले महीने निर्धारित है" },
      { question: "When should expense reports be submitted?", questionHindi: "खर्च रिपोर्ट कब जमा करनी चाहिए?", options: ["Monday", "Wednesday", "Friday", "Sunday"], correctAnswer: 2, explanation: "Expense reports should be submitted by Friday", explanationHindi: "खर्च रिपोर्ट शुक्रवार तक जमा करनी चाहिए" }
    ],
    vocabulary: [
      { word: "progress", meaning: "forward movement", meaningHindi: "प्रगति" },
      { word: "campaign", meaning: "organized effort", meaningHindi: "अभियान" },
      { word: "expense", meaning: "money spent", meaningHindi: "खर्च" }
    ]
  },

  // ==================== MORE LESSONS (17-50) ====================
  {
    id: 17,
    title: "Gym Membership",
    titleHindi: "जिम सदस्यता",
    description: "Listen to a gym inquiry conversation",
    descriptionHindi: "जिम पूछताछ की बातचीत सुनें",
    difficulty: "intermediate",
    category: "Health",
    audioText: "Hello, I'm interested in joining your gym. Great! Let me tell you about our membership plans. We have monthly, quarterly, and annual plans. The monthly plan is 2000 rupees, quarterly is 5000 rupees, and annual is 15000 rupees. What facilities do you have? We have a fully equipped gym with cardio machines, weight training area, yoga studio, and a swimming pool. We also have personal trainers available. What are the gym timings? We're open from 5 AM to 10 PM, seven days a week. Can I get a trial session? Yes, we offer one free trial session. Would you like to try today?",
    audioTextHindi: "नमस्ते, मैं आपके जिम में शामिल होने में रुचि रखता हूँ। बहुत अच्छा! मुझे आपको हमारी सदस्यता योजनाओं के बारे में बताने दीजिए। हमारे पास मासिक, त्रैमासिक और वार्षिक योजनाएं हैं। मासिक योजना 2000 रुपये है, त्रैमासिक 5000 रुपये है, और वार्षिक 15000 रुपये है। आपके पास क्या सुविधाएं हैं? हमारे पास कार्डियो मशीनों, वेट ट्रेनिंग एरिया, योग स्टूडियो और स्विमिंग पूल के साथ पूरी तरह से सुसज्जित जिम है। हमारे पास पर्सनल ट्रेनर भी उपलब्ध हैं। जिम का समय क्या है? हम सुबह 5 बजे से रात 10 बजे तक, सप्ताह के सातों दिन खुले रहते हैं। क्या मुझे ट्रायल सेशन मिल सकता है? हाँ, हम एक मुफ्त ट्रायल सेशन देते हैं। क्या आप आज आज़माना चाहेंगे?",
    duration: "2:00",
    questions: [
      { question: "What is the monthly membership fee?", questionHindi: "मासिक सदस्यता शुल्क क्या है?", options: ["1500 rupees", "2000 rupees", "2500 rupees", "3000 rupees"], correctAnswer: 1, explanation: "Monthly plan is 2000 rupees", explanationHindi: "मासिक योजना 2000 रुपये है" },
      { question: "What time does the gym open?", questionHindi: "जिम कितने बजे खुलता है?", options: ["4 AM", "5 AM", "6 AM", "7 AM"], correctAnswer: 1, explanation: "The gym opens at 5 AM", explanationHindi: "जिम सुबह 5 बजे खुलता है" },
      { question: "Is there a swimming pool?", questionHindi: "क्या स्विमिंग पूल है?", options: ["Yes", "No", "Only for premium members", "Coming soon"], correctAnswer: 0, explanation: "Yes, there is a swimming pool", explanationHindi: "हाँ, स्विमिंग पूल है" }
    ],
    vocabulary: [
      { word: "membership", meaning: "being a member", meaningHindi: "सदस्यता" },
      { word: "facilities", meaning: "services provided", meaningHindi: "सुविधाएं" },
      { word: "trial", meaning: "test period", meaningHindi: "परीक्षण" }
    ]
  },
  {
    id: 18,
    title: "Movie Theater",
    titleHindi: "सिनेमा हॉल",
    description: "Listen to booking movie tickets",
    descriptionHindi: "मूवी टिकट बुक करना सुनें",
    difficulty: "beginner",
    category: "Entertainment",
    audioText: "Welcome to Star Cinema. How can I help you? I'd like two tickets for the 6 PM show. Which movie would you like to watch? What movies are showing today? We have three movies - an action film, a comedy, and a romantic drama. I'll take the comedy. Where would you like to sit? Do you have seats in the middle? Yes, row F has good seats. The tickets are 250 rupees each, so your total is 500 rupees. Would you like any snacks? Yes, one large popcorn and two cold drinks please. That will be 350 rupees extra. Your total is 850 rupees. Enjoy the movie!",
    audioTextHindi: "स्टार सिनेमा में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूँ? मुझे शाम 6 बजे के शो के लिए दो टिकट चाहिए। आप कौन सी फिल्म देखना चाहेंगे? आज कौन सी फिल्में चल रही हैं? हमारे पास तीन फिल्में हैं - एक एक्शन फिल्म, एक कॉमेडी, और एक रोमांटिक ड्रामा। मैं कॉमेडी लूंगा। आप कहाँ बैठना चाहेंगे? क्या आपके पास बीच में सीटें हैं? हाँ, रो F में अच्छी सीटें हैं। टिकट 250 रुपये प्रत्येक हैं, तो आपका कुल 500 रुपये है। क्या आप कोई स्नैक्स लेंगे? हाँ, एक बड़ा पॉपकॉर्न और दो कोल्ड ड्रिंक्स कृपया। वह 350 रुपये अतिरिक्त होगा। आपका कुल 850 रुपये है। फिल्म का आनंद लें!",
    duration: "1:50",
    questions: [
      { question: "What time is the show?", questionHindi: "शो कितने बजे है?", options: ["4 PM", "5 PM", "6 PM", "7 PM"], correctAnswer: 2, explanation: "The show is at 6 PM", explanationHindi: "शो शाम 6 बजे है" },
      { question: "How much is each ticket?", questionHindi: "प्रत्येक टिकट कितने का है?", options: ["200 rupees", "250 rupees", "300 rupees", "350 rupees"], correctAnswer: 1, explanation: "Tickets are 250 rupees each", explanationHindi: "टिकट 250 रुपये प्रत्येक हैं" },
      { question: "What is the total bill?", questionHindi: "कुल बिल कितना है?", options: ["500 rupees", "700 rupees", "850 rupees", "1000 rupees"], correctAnswer: 2, explanation: "The total is 850 rupees", explanationHindi: "कुल 850 रुपये है" }
    ],
    vocabulary: [
      { word: "show", meaning: "movie screening", meaningHindi: "शो" },
      { word: "row", meaning: "line of seats", meaningHindi: "पंक्ति" },
      { word: "snacks", meaning: "light food", meaningHindi: "स्नैक्स" }
    ]
  },
  {
    id: 19,
    title: "Electricity Bill Payment",
    titleHindi: "बिजली बिल भुगतान",
    description: "Listen to paying utility bills",
    descriptionHindi: "यूटिलिटी बिल भुगतान सुनें",
    difficulty: "intermediate",
    category: "Daily Life",
    audioText: "Good morning. I want to pay my electricity bill. Sure, can I have your consumer number? It's 123456789. Let me check. Your bill amount is 2,450 rupees. The due date was yesterday, so there's a late fee of 50 rupees. Your total is 2,500 rupees. Can I pay by card? Yes, we accept both cash and card. I'll pay by card. Please enter your PIN. Done. Your payment is successful. Here's your receipt. When is the next bill due? Your next bill will come around the 5th of next month, and the due date will be the 20th. Thank you.",
    audioTextHindi: "सुप्रभात। मैं अपना बिजली बिल भरना चाहता हूँ। ज़रूर, क्या मुझे आपका उपभोक्ता नंबर मिल सकता है? यह 123456789 है। मुझे जांचने दीजिए। आपकी बिल राशि 2,450 रुपये है। नियत तारीख कल थी, इसलिए 50 रुपये का विलंब शुल्क है। आपका कुल 2,500 रुपये है। क्या मैं कार्ड से भुगतान कर सकता हूँ? हाँ, हम नकद और कार्ड दोनों स्वीकार करते हैं। मैं कार्ड से भुगतान करूंगा। कृपया अपना पिन दर्ज करें। हो गया। आपका भुगतान सफल है। यह रही आपकी रसीद। अगला बिल कब आएगा? आपका अगला बिल अगले महीने की 5 तारीख के आसपास आएगा, और नियत तारीख 20 तारीख होगी। धन्यवाद।",
    duration: "1:55",
    questions: [
      { question: "What is the bill amount?", questionHindi: "बिल राशि क्या है?", options: ["2,400 rupees", "2,450 rupees", "2,500 rupees", "2,550 rupees"], correctAnswer: 1, explanation: "The bill amount is 2,450 rupees", explanationHindi: "बिल राशि 2,450 रुपये है" },
      { question: "What is the late fee?", questionHindi: "विलंब शुल्क क्या है?", options: ["25 rupees", "50 rupees", "75 rupees", "100 rupees"], correctAnswer: 1, explanation: "The late fee is 50 rupees", explanationHindi: "विलंब शुल्क 50 रुपये है" },
      { question: "When is the next bill due?", questionHindi: "अगला बिल कब देय है?", options: ["10th", "15th", "20th", "25th"], correctAnswer: 2, explanation: "The due date will be the 20th", explanationHindi: "नियत तारीख 20 तारीख होगी" }
    ],
    vocabulary: [
      { word: "consumer", meaning: "user of service", meaningHindi: "उपभोक्ता" },
      { word: "due date", meaning: "deadline for payment", meaningHindi: "नियत तारीख" },
      { word: "receipt", meaning: "proof of payment", meaningHindi: "रसीद" }
    ]
  },
  {
    id: 20,
    title: "Birthday Party Planning",
    titleHindi: "जन्मदिन पार्टी की योजना",
    description: "Listen to planning a birthday party",
    descriptionHindi: "जन्मदिन पार्टी की योजना सुनें",
    difficulty: "beginner",
    category: "Social",
    audioText: "Hi Meera! I'm planning a birthday party for my daughter. She's turning 7 next Saturday. That's wonderful! How can I help? I need to order a cake. What flavor does she like? She loves chocolate. We have a beautiful chocolate cake with rainbow decorations. It costs 1500 rupees for 2 kg. That sounds perfect! I also need balloons and party decorations. We have party packs with balloons, streamers, and banners for 500 rupees. Great, I'll take one. How many guests are you expecting? About 20 children. Then I suggest ordering some snacks and juice boxes too. Good idea! Can you deliver everything by Friday? Yes, we can deliver by Friday afternoon.",
    audioTextHindi: "नमस्ते मीरा! मैं अपनी बेटी के लिए जन्मदिन पार्टी की योजना बना रही हूँ। अगले शनिवार को उसके 7 साल पूरे हो रहे हैं। यह बहुत अच्छा है! मैं कैसे मदद कर सकती हूँ? मुझे केक ऑर्डर करना है। उसे कौन सा फ्लेवर पसंद है? उसे चॉकलेट बहुत पसंद है। हमारे पास इंद्रधनुष सजावट के साथ एक सुंदर चॉकलेट केक है। 2 किलो के लिए 1500 रुपये है। यह बिल्कुल सही लगता है! मुझे गुब्बारे और पार्टी सजावट भी चाहिए। हमारे पास गुब्बारे, स्ट्रीमर और बैनर के साथ पार्टी पैक 500 रुपये में है। बहुत अच्छा, मैं एक लूंगी। आप कितने मेहमानों की उम्मीद कर रही हैं? लगभग 20 बच्चे। तो मैं कुछ स्नैक्स और जूस बॉक्स भी ऑर्डर करने का सुझाव दूंगी। अच्छा विचार! क्या आप शुक्रवार तक सब कुछ डिलीवर कर सकती हैं? हाँ, हम शुक्रवार दोपहर तक डिलीवर कर सकते हैं।",
    duration: "2:10",
    questions: [
      { question: "How old is the daughter turning?", questionHindi: "बेटी कितने साल की हो रही है?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "She's turning 7", explanationHindi: "वह 7 साल की हो रही है" },
      { question: "What flavor cake does she want?", questionHindi: "उसे कौन सा फ्लेवर केक चाहिए?", options: ["Vanilla", "Strawberry", "Chocolate", "Butterscotch"], correctAnswer: 2, explanation: "She loves chocolate", explanationHindi: "उसे चॉकलेट पसंद है" },
      { question: "How many children are expected?", questionHindi: "कितने बच्चों की उम्मीद है?", options: ["10", "15", "20", "25"], correctAnswer: 2, explanation: "About 20 children are expected", explanationHindi: "लगभग 20 बच्चों की उम्मीद है" }
    ],
    vocabulary: [
      { word: "decorations", meaning: "items to make place beautiful", meaningHindi: "सजावट" },
      { word: "guests", meaning: "invited people", meaningHindi: "मेहमान" },
      { word: "deliver", meaning: "to bring to a place", meaningHindi: "पहुंचाना" }
    ]
  },

  // ==================== LESSONS 21-50 ====================
  {
    id: 21,
    title: "Car Service Center",
    titleHindi: "कार सर्विस सेंटर",
    description: "Listen to car servicing conversation",
    descriptionHindi: "कार सर्विसिंग की बातचीत सुनें",
    difficulty: "intermediate",
    category: "Services",
    audioText: "Good morning, sir. Welcome to our service center. My car needs servicing. It's been making a strange noise. Let me check. When did you last service your car? About 6 months ago. I see. Your car needs an oil change and the brake pads need replacement. How much will it cost? The oil change is 2000 rupees and brake pads are 3500 rupees. Total will be 5500 rupees. How long will it take? It will take about 3 hours. You can wait in our lounge or we can call you when it's ready. I'll wait. Is there WiFi available? Yes, free WiFi is available in the lounge.",
    audioTextHindi: "सुप्रभात, सर। हमारे सर्विस सेंटर में आपका स्वागत है। मेरी कार को सर्विसिंग की जरूरत है। यह एक अजीब आवाज़ कर रही है। मुझे जांचने दीजिए। आपने आखिरी बार अपनी कार की सर्विस कब कराई थी? लगभग 6 महीने पहले। समझा। आपकी कार को ऑयल चेंज की जरूरत है और ब्रेक पैड बदलने होंगे। इसकी कीमत कितनी होगी? ऑयल चेंज 2000 रुपये है और ब्रेक पैड 3500 रुपये हैं। कुल 5500 रुपये होगा। कितना समय लगेगा? लगभग 3 घंटे लगेंगे। आप हमारे लाउंज में इंतज़ार कर सकते हैं या जब तैयार हो जाए तो हम आपको कॉल कर सकते हैं। मैं इंतज़ार करूंगा। क्या वाईफाई उपलब्ध है? हाँ, लाउंज में मुफ्त वाईफाई उपलब्ध है।",
    duration: "2:00",
    questions: [
      { question: "When was the car last serviced?", questionHindi: "कार की आखिरी सर्विस कब हुई थी?", options: ["3 months ago", "6 months ago", "9 months ago", "1 year ago"], correctAnswer: 1, explanation: "The car was serviced 6 months ago", explanationHindi: "कार की सर्विस 6 महीने पहले हुई थी" },
      { question: "What is the total cost?", questionHindi: "कुल लागत क्या है?", options: ["4500 rupees", "5000 rupees", "5500 rupees", "6000 rupees"], correctAnswer: 2, explanation: "Total will be 5500 rupees", explanationHindi: "कुल 5500 रुपये होगा" },
      { question: "How long will the service take?", questionHindi: "सर्विस में कितना समय लगेगा?", options: ["1 hour", "2 hours", "3 hours", "4 hours"], correctAnswer: 2, explanation: "It will take about 3 hours", explanationHindi: "लगभग 3 घंटे लगेंगे" }
    ],
    vocabulary: [
      { word: "servicing", meaning: "maintenance work", meaningHindi: "सर्विसिंग" },
      { word: "replacement", meaning: "putting new part", meaningHindi: "बदलाव" },
      { word: "lounge", meaning: "waiting area", meaningHindi: "लाउंज" }
    ]
  },
  {
    id: 22,
    title: "Tailor Shop",
    titleHindi: "दर्जी की दुकान",
    description: "Listen to getting clothes stitched",
    descriptionHindi: "कपड़े सिलवाने की बातचीत सुनें",
    difficulty: "beginner",
    category: "Services",
    audioText: "Namaste ji. I want to get a suit stitched for my son's wedding. Congratulations! When is the wedding? It's on the 15th of next month. That gives us enough time. What style would you like? I want a traditional sherwani. Let me show you some designs. This one looks nice. How much will it cost? This design will cost 8000 rupees including the fabric. When can I get it? It will be ready in 10 days. Please come for a trial fitting after one week. I'll need to take measurements now. Please stand straight.",
    audioTextHindi: "नमस्ते जी। मैं अपने बेटे की शादी के लिए एक सूट सिलवाना चाहता हूँ। बधाई हो! शादी कब है? अगले महीने की 15 तारीख को है। हमारे पास पर्याप्त समय है। आप कौन सी स्टाइल चाहेंगे? मुझे पारंपरिक शेरवानी चाहिए। मुझे आपको कुछ डिज़ाइन दिखाने दीजिए। यह अच्छा लग रहा है। इसकी कीमत कितनी होगी? इस डिज़ाइन की कीमत कपड़े सहित 8000 रुपये होगी। मुझे यह कब मिलेगा? यह 10 दिनों में तैयार हो जाएगा। कृपया एक हफ्ते बाद ट्रायल फिटिंग के लिए आइए। मुझे अभी माप लेने होंगे। कृपया सीधे खड़े हों।",
    duration: "1:45",
    questions: [
      { question: "What is being stitched?", questionHindi: "क्या सिलवाया जा रहा है?", options: ["Shirt", "Suit", "Sherwani", "Kurta"], correctAnswer: 2, explanation: "A traditional sherwani is being stitched", explanationHindi: "पारंपरिक शेरवानी सिलवाई जा रही है" },
      { question: "How much will it cost?", questionHindi: "इसकी कीमत कितनी होगी?", options: ["6000 rupees", "7000 rupees", "8000 rupees", "9000 rupees"], correctAnswer: 2, explanation: "It will cost 8000 rupees", explanationHindi: "इसकी कीमत 8000 रुपये होगी" },
      { question: "When will it be ready?", questionHindi: "यह कब तैयार होगा?", options: ["5 days", "7 days", "10 days", "15 days"], correctAnswer: 2, explanation: "It will be ready in 10 days", explanationHindi: "यह 10 दिनों में तैयार होगा" }
    ],
    vocabulary: [
      { word: "stitched", meaning: "sewn together", meaningHindi: "सिला हुआ" },
      { word: "measurements", meaning: "body sizes", meaningHindi: "माप" },
      { word: "fitting", meaning: "trying on clothes", meaningHindi: "फिटिंग" }
    ]
  },
  {
    id: 23,
    title: "Vegetable Market",
    titleHindi: "सब्ज़ी मंडी",
    description: "Listen to buying vegetables",
    descriptionHindi: "सब्ज़ियाँ खरीदना सुनें",
    difficulty: "beginner",
    category: "Shopping",
    audioText: "Fresh vegetables! Come and see! Bhaiya, how much are the tomatoes? Tomatoes are 40 rupees per kg today. That's expensive! Can you give for 30? Okay didi, for you 35 rupees. Fine. Give me 2 kg tomatoes and 1 kg onions. Onions are 25 rupees per kg. Anything else? Yes, give me half kg green chilies and some coriander. Green chilies are 80 rupees per kg, so half kg is 40 rupees. Coriander is 10 rupees for one bunch. What's my total? Let me calculate. Tomatoes 70, onions 25, chilies 40, coriander 10. Total is 145 rupees. Here's 150. Keep the change.",
    audioTextHindi: "ताज़ी सब्ज़ियाँ! आओ और देखो! भैया, टमाटर कितने के हैं? टमाटर आज 40 रुपये किलो हैं। यह महंगा है! 30 में दे दो? ठीक है दीदी, आपके लिए 35 रुपये। ठीक है। मुझे 2 किलो टमाटर और 1 किलो प्याज़ दो। प्याज़ 25 रुपये किलो है। कुछ और? हाँ, आधा किलो हरी मिर्च और कुछ धनिया दो। हरी मिर्च 80 रुपये किलो है, तो आधा किलो 40 रुपये। धनिया एक गुच्छे के 10 रुपये। मेरा कुल कितना हुआ? मुझे हिसाब करने दो। टमाटर 70, प्याज़ 25, मिर्च 40, धनिया 10। कुल 145 रुपये। यह लो 150। बाकी रख लो।",
    duration: "1:50",
    questions: [
      { question: "What is the final price of tomatoes per kg?", questionHindi: "टमाटर की अंतिम कीमत प्रति किलो क्या है?", options: ["30 rupees", "35 rupees", "40 rupees", "45 rupees"], correctAnswer: 1, explanation: "The final price is 35 rupees per kg", explanationHindi: "अंतिम कीमत 35 रुपये प्रति किलो है" },
      { question: "How much coriander costs?", questionHindi: "धनिया कितने का है?", options: ["5 rupees", "10 rupees", "15 rupees", "20 rupees"], correctAnswer: 1, explanation: "Coriander is 10 rupees for one bunch", explanationHindi: "धनिया एक गुच्छे के 10 रुपये है" },
      { question: "What is the total bill?", questionHindi: "कुल बिल कितना है?", options: ["135 rupees", "140 rupees", "145 rupees", "150 rupees"], correctAnswer: 2, explanation: "Total is 145 rupees", explanationHindi: "कुल 145 रुपये है" }
    ],
    vocabulary: [
      { word: "bunch", meaning: "group tied together", meaningHindi: "गुच्छा" },
      { word: "calculate", meaning: "to count", meaningHindi: "हिसाब करना" },
      { word: "change", meaning: "remaining money", meaningHindi: "बाकी पैसे" }
    ]
  },
  {
    id: 24,
    title: "Mobile Recharge",
    titleHindi: "मोबाइल रिचार्ज",
    description: "Listen to mobile recharge conversation",
    descriptionHindi: "मोबाइल रिचार्ज की बातचीत सुनें",
    difficulty: "beginner",
    category: "Services",
    audioText: "Hello, I want to recharge my mobile. Which network? Jio. What plan do you want? What plans are available? We have 199 rupees for 28 days with 1.5 GB daily data. There's also 399 rupees for 56 days with 2 GB daily data. And 599 rupees for 84 days with 2 GB daily data. I'll take the 399 plan. Please give me your mobile number. It's 9876543210. Done! Your recharge is successful. You'll get a confirmation message. How long is the validity? 56 days from today. Thank you!",
    audioTextHindi: "नमस्ते, मैं अपना मोबाइल रिचार्ज करना चाहता हूँ। कौन सा नेटवर्क? जियो। आप कौन सा प्लान चाहते हैं? कौन से प्लान उपलब्ध हैं? हमारे पास 199 रुपये का 28 दिनों के लिए 1.5 GB दैनिक डेटा के साथ है। 399 रुपये का 56 दिनों के लिए 2 GB दैनिक डेटा के साथ भी है। और 599 रुपये का 84 दिनों के लिए 2 GB दैनिक डेटा के साथ। मैं 399 का प्लान लूंगा। कृपया अपना मोबाइल नंबर दीजिए। यह 9876543210 है। हो गया! आपका रिचार्ज सफल है। आपको कन्फर्मेशन मैसेज मिलेगा। वैलिडिटी कितनी है? आज से 56 दिन। धन्यवाद!",
    duration: "1:40",
    questions: [
      { question: "Which network is being recharged?", questionHindi: "कौन सा नेटवर्क रिचार्ज हो रहा है?", options: ["Airtel", "Vodafone", "Jio", "BSNL"], correctAnswer: 2, explanation: "Jio network is being recharged", explanationHindi: "जियो नेटवर्क रिचार्ज हो रहा है" },
      { question: "Which plan was chosen?", questionHindi: "कौन सा प्लान चुना गया?", options: ["199 rupees", "399 rupees", "599 rupees", "799 rupees"], correctAnswer: 1, explanation: "The 399 rupees plan was chosen", explanationHindi: "399 रुपये का प्लान चुना गया" },
      { question: "What is the validity of the chosen plan?", questionHindi: "चुने गए प्लान की वैलिडिटी क्या है?", options: ["28 days", "56 days", "84 days", "90 days"], correctAnswer: 1, explanation: "The validity is 56 days", explanationHindi: "वैलिडिटी 56 दिन है" }
    ],
    vocabulary: [
      { word: "recharge", meaning: "to add credit", meaningHindi: "रिचार्ज" },
      { word: "validity", meaning: "period of being valid", meaningHindi: "वैधता" },
      { word: "confirmation", meaning: "verification", meaningHindi: "पुष्टि" }
    ]
  },
  {
    id: 25,
    title: "Passport Office",
    titleHindi: "पासपोर्ट कार्यालय",
    description: "Listen to passport application process",
    descriptionHindi: "पासपोर्ट आवेदन प्रक्रिया सुनें",
    difficulty: "advanced",
    category: "Government",
    audioText: "Good morning. I want to apply for a new passport. Do you have an appointment? Yes, my appointment is at 10:30 AM. Please show me your documents. Here are my Aadhaar card, birth certificate, and address proof. Good. Have you filled the online application form? Yes, here's the printout. Let me verify your documents. Everything looks fine. Please proceed to counter 3 for biometric data collection. After that, go to counter 5 for photograph. How long will it take to get the passport? If police verification is clear, you'll receive it within 15 to 20 working days. You can track the status online.",
    audioTextHindi: "सुप्रभात। मैं नए पासपोर्ट के लिए आवेदन करना चाहता हूँ। क्या आपकी अपॉइंटमेंट है? हाँ, मेरी अपॉइंटमेंट सुबह 10:30 बजे है। कृपया मुझे अपने दस्तावेज़ दिखाइए। यह रहे मेरा आधार कार्ड, जन्म प्रमाण पत्र, और पता प्रमाण। अच्छा। क्या आपने ऑनलाइन आवेदन फॉर्म भरा है? हाँ, यह रहा प्रिंटआउट। मुझे आपके दस्तावेज़ सत्यापित करने दीजिए। सब कुछ ठीक लग रहा है। कृपया बायोमेट्रिक डेटा संग्रह के लिए काउंटर 3 पर जाएं। उसके बाद, फोटोग्राफ के लिए काउंटर 5 पर जाएं। पासपोर्ट मिलने में कितना समय लगेगा? अगर पुलिस सत्यापन साफ है, तो आपको 15 से 20 कार्य दिवसों में मिल जाएगा। आप ऑनलाइन स्थिति ट्रैक कर सकते हैं।",
    duration: "2:15",
    questions: [
      { question: "What time is the appointment?", questionHindi: "अपॉइंटमेंट कितने बजे है?", options: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"], correctAnswer: 1, explanation: "The appointment is at 10:30 AM", explanationHindi: "अपॉइंटमेंट सुबह 10:30 बजे है" },
      { question: "Which counter is for biometric data?", questionHindi: "बायोमेट्रिक डेटा के लिए कौन सा काउंटर है?", options: ["Counter 1", "Counter 3", "Counter 5", "Counter 7"], correctAnswer: 1, explanation: "Counter 3 is for biometric data", explanationHindi: "काउंटर 3 बायोमेट्रिक डेटा के लिए है" },
      { question: "How many days to receive passport?", questionHindi: "पासपोर्ट मिलने में कितने दिन लगेंगे?", options: ["7-10 days", "10-15 days", "15-20 days", "20-30 days"], correctAnswer: 2, explanation: "15 to 20 working days", explanationHindi: "15 से 20 कार्य दिवस" }
    ],
    vocabulary: [
      { word: "biometric", meaning: "body measurements for ID", meaningHindi: "बायोमेट्रिक" },
      { word: "verification", meaning: "checking if true", meaningHindi: "सत्यापन" },
      { word: "documents", meaning: "official papers", meaningHindi: "दस्तावेज़" }
    ]
  },

  // ==================== LESSONS 26-50 (Abbreviated for space) ====================
  {
    id: 26,
    title: "Rent Agreement",
    titleHindi: "किराया समझौता",
    description: "Listen to rental discussion",
    descriptionHindi: "किराये की चर्चा सुनें",
    difficulty: "advanced",
    category: "Housing",
    audioText: "I'm interested in renting this flat. The rent is 15000 rupees per month. Is that negotiable? I can reduce it to 14000 for a one-year agreement. What about the security deposit? It's two months' rent, so 28000 rupees. When can I move in? The flat will be available from the 1st of next month. Are utilities included? No, electricity and water bills are separate. You'll need to pay them directly. Can I see the agreement? Yes, here's the draft. Please read it carefully before signing.",
    audioTextHindi: "मुझे यह फ्लैट किराये पर लेने में रुचि है। किराया 15000 रुपये प्रति माह है। क्या यह negotiable है? मैं एक साल के समझौते के लिए इसे 14000 तक कम कर सकता हूँ। सिक्योरिटी डिपॉज़िट के बारे में क्या? यह दो महीने का किराया है, तो 28000 रुपये। मैं कब शिफ्ट हो सकता हूँ? फ्लैट अगले महीने की 1 तारीख से उपलब्ध होगा। क्या यूटिलिटीज़ शामिल हैं? नहीं, बिजली और पानी के बिल अलग हैं। आपको उन्हें सीधे भुगतान करना होगा। क्या मैं समझौता देख सकता हूँ? हाँ, यह रहा ड्राफ्ट। कृपया साइन करने से पहले इसे ध्यान से पढ़ें।",
    duration: "2:00",
    questions: [
      { question: "What is the negotiated rent?", questionHindi: "negotiated किराया क्या है?", options: ["13000", "14000", "15000", "16000"], correctAnswer: 1, explanation: "The negotiated rent is 14000 rupees", explanationHindi: "negotiated किराया 14000 रुपये है" },
      { question: "How much is the security deposit?", questionHindi: "सिक्योरिटी डिपॉज़िट कितना है?", options: ["14000", "28000", "30000", "42000"], correctAnswer: 1, explanation: "Security deposit is 28000 rupees", explanationHindi: "सिक्योरिटी डिपॉज़िट 28000 रुपये है" },
      { question: "Are utilities included in rent?", questionHindi: "क्या यूटिलिटीज़ किराये में शामिल हैं?", options: ["Yes", "No", "Only electricity", "Only water"], correctAnswer: 1, explanation: "No, utilities are separate", explanationHindi: "नहीं, यूटिलिटीज़ अलग हैं" }
    ],
    vocabulary: [
      { word: "rent", meaning: "payment for using property", meaningHindi: "किराया" },
      { word: "deposit", meaning: "advance payment", meaningHindi: "जमा राशि" },
      { word: "utilities", meaning: "basic services", meaningHindi: "यूटिलिटीज़" }
    ]
  },
  {
    id: 27,
    title: "Insurance Claim",
    titleHindi: "बीमा दावा",
    description: "Listen to insurance claim process",
    descriptionHindi: "बीमा दावा प्रक्रिया सुनें",
    difficulty: "advanced",
    category: "Finance",
    audioText: "Hello, I want to file an insurance claim. My car was damaged in an accident. I'm sorry to hear that. When did the accident happen? Yesterday evening around 6 PM. Did you file a police report? Yes, I have the FIR copy. Good. Please fill this claim form and attach photos of the damage. How long will the claim process take? Usually 7 to 10 working days after document verification. Will I get a replacement car? Yes, we provide a rental car for up to 7 days. What documents do I need? FIR copy, driving license, RC book, and repair estimate from our authorized garage.",
    audioTextHindi: "नमस्ते, मैं बीमा दावा दर्ज करना चाहता हूँ। मेरी कार एक दुर्घटना में क्षतिग्रस्त हो गई। यह सुनकर दुख हुआ। दुर्घटना कब हुई? कल शाम लगभग 6 बजे। क्या आपने पुलिस रिपोर्ट दर्ज की? हाँ, मेरे पास FIR की कॉपी है। अच्छा। कृपया यह दावा फॉर्म भरें और क्षति की तस्वीरें संलग्न करें। दावा प्रक्रिया में कितना समय लगेगा? आमतौर पर दस्तावेज़ सत्यापन के बाद 7 से 10 कार्य दिवस। क्या मुझे रिप्लेसमेंट कार मिलेगी? हाँ, हम 7 दिनों तक के लिए किराये की कार प्रदान करते हैं। मुझे कौन से दस्तावेज़ चाहिए? FIR कॉपी, ड्राइविंग लाइसेंस, RC बुक, और हमारे अधिकृत गैरेज से मरम्मत अनुमान।",
    duration: "2:10",
    questions: [
      { question: "When did the accident happen?", questionHindi: "दुर्घटना कब हुई?", options: ["Morning", "Afternoon", "Evening", "Night"], correctAnswer: 2, explanation: "The accident happened yesterday evening", explanationHindi: "दुर्घटना कल शाम हुई" },
      { question: "How long does the claim process take?", questionHindi: "दावा प्रक्रिया में कितना समय लगता है?", options: ["3-5 days", "7-10 days", "15-20 days", "30 days"], correctAnswer: 1, explanation: "7 to 10 working days", explanationHindi: "7 से 10 कार्य दिवस" },
      { question: "For how many days is rental car provided?", questionHindi: "किराये की कार कितने दिनों के लिए मिलती है?", options: ["3 days", "5 days", "7 days", "10 days"], correctAnswer: 2, explanation: "Rental car is provided for up to 7 days", explanationHindi: "किराये की कार 7 दिनों तक के लिए मिलती है" }
    ],
    vocabulary: [
      { word: "claim", meaning: "request for payment", meaningHindi: "दावा" },
      { word: "damaged", meaning: "harmed or broken", meaningHindi: "क्षतिग्रस्त" },
      { word: "estimate", meaning: "approximate cost", meaningHindi: "अनुमान" }
    ]
  },
  {
    id: 28,
    title: "College Admission",
    titleHindi: "कॉलेज प्रवेश",
    description: "Listen to college admission inquiry",
    descriptionHindi: "कॉलेज प्रवेश पूछताछ सुनें",
    difficulty: "intermediate",
    category: "Education",
    audioText: "Good morning. I want to inquire about admission to the B.Com program. The admission process has started. What percentage did you score in 12th? I scored 78 percent. That's good. The cutoff for B.Com is 70 percent. What documents are required? You need 10th and 12th marksheets, transfer certificate, character certificate, and passport size photos. What is the fee structure? The annual fee is 45000 rupees. You can pay in two installments. When is the last date for admission? The last date is 30th of this month. Classes will start from July 1st.",
    audioTextHindi: "सुप्रभात। मैं B.Com प्रोग्राम में प्रवेश के बारे में पूछताछ करना चाहता हूँ। प्रवेश प्रक्रिया शुरू हो गई है। आपने 12वीं में कितने प्रतिशत अंक प्राप्त किए? मैंने 78 प्रतिशत अंक प्राप्त किए। यह अच्छा है। B.Com के लिए कटऑफ 70 प्रतिशत है। कौन से दस्तावेज़ आवश्यक हैं? आपको 10वीं और 12वीं की मार्कशीट, ट्रांसफर सर्टिफिकेट, चरित्र प्रमाण पत्र, और पासपोर्ट साइज़ फोटो चाहिए। फीस स्ट्रक्चर क्या है? वार्षिक फीस 45000 रुपये है। आप दो किस्तों में भुगतान कर सकते हैं। प्रवेश की अंतिम तिथि कब है? अंतिम तिथि इस महीने की 30 तारीख है। कक्षाएं 1 जुलाई से शुरू होंगी।",
    duration: "1:55",
    questions: [
      { question: "What is the cutoff percentage?", questionHindi: "कटऑफ प्रतिशत क्या है?", options: ["65%", "70%", "75%", "80%"], correctAnswer: 1, explanation: "The cutoff is 70 percent", explanationHindi: "कटऑफ 70 प्रतिशत है" },
      { question: "What is the annual fee?", questionHindi: "वार्षिक फीस क्या है?", options: ["35000", "40000", "45000", "50000"], correctAnswer: 2, explanation: "Annual fee is 45000 rupees", explanationHindi: "वार्षिक फीस 45000 रुपये है" },
      { question: "When do classes start?", questionHindi: "कक्षाएं कब शुरू होंगी?", options: ["June 1st", "July 1st", "August 1st", "September 1st"], correctAnswer: 1, explanation: "Classes start from July 1st", explanationHindi: "कक्षाएं 1 जुलाई से शुरू होंगी" }
    ],
    vocabulary: [
      { word: "admission", meaning: "entry to institution", meaningHindi: "प्रवेश" },
      { word: "cutoff", meaning: "minimum required marks", meaningHindi: "कटऑफ" },
      { word: "installments", meaning: "partial payments", meaningHindi: "किस्तें" }
    ]
  },
  {
    id: 29,
    title: "Wedding Invitation",
    titleHindi: "शादी का निमंत्रण",
    description: "Listen to wedding invitation conversation",
    descriptionHindi: "शादी के निमंत्रण की बातचीत सुनें",
    difficulty: "beginner",
    category: "Social",
    audioText: "Hello Sharma ji! Namaste! I have some good news. My daughter is getting married next month. Congratulations! That's wonderful news. When is the wedding? The wedding is on February 15th. The venue is Grand Palace Hotel. Please come with your family. Of course! We will definitely come. What time should we arrive? The ceremony starts at 7 PM. Dinner will be served at 9 PM. Is there anything we can help with? Just your blessings are enough. Here is the invitation card. Thank you so much. We are very happy for you.",
    audioTextHindi: "नमस्ते शर्मा जी! नमस्ते! मेरे पास कुछ अच्छी खबर है। मेरी बेटी की अगले महीने शादी हो रही है। बधाई हो! यह बहुत अच्छी खबर है। शादी कब है? शादी 15 फरवरी को है। स्थान ग्रैंड पैलेस होटल है। कृपया अपने परिवार के साथ आइए। बिल्कुल! हम ज़रूर आएंगे। हमें कितने बजे पहुंचना चाहिए? समारोह शाम 7 बजे शुरू होगा। रात का खाना 9 बजे परोसा जाएगा। क्या कोई मदद चाहिए? बस आपका आशीर्वाद काफी है। यह रहा निमंत्रण कार्ड। बहुत-बहुत धन्यवाद। हम आपके लिए बहुत खुश हैं।",
    duration: "1:45",
    questions: [
      { question: "When is the wedding?", questionHindi: "शादी कब है?", options: ["February 10th", "February 15th", "February 20th", "February 25th"], correctAnswer: 1, explanation: "The wedding is on February 15th", explanationHindi: "शादी 15 फरवरी को है" },
      { question: "What time does the ceremony start?", questionHindi: "समारोह कितने बजे शुरू होगा?", options: ["6 PM", "7 PM", "8 PM", "9 PM"], correctAnswer: 1, explanation: "The ceremony starts at 7 PM", explanationHindi: "समारोह शाम 7 बजे शुरू होगा" },
      { question: "Where is the wedding venue?", questionHindi: "शादी का स्थान कहाँ है?", options: ["City Hall", "Grand Palace Hotel", "Community Center", "Temple"], correctAnswer: 1, explanation: "The venue is Grand Palace Hotel", explanationHindi: "स्थान ग्रैंड पैलेस होटल है" }
    ],
    vocabulary: [
      { word: "wedding", meaning: "marriage ceremony", meaningHindi: "शादी" },
      { word: "ceremony", meaning: "formal event", meaningHindi: "समारोह" },
      { word: "blessings", meaning: "good wishes", meaningHindi: "आशीर्वाद" }
    ]
  },
  {
    id: 30,
    title: "Lost and Found",
    titleHindi: "खोया और पाया",
    description: "Listen to reporting a lost item",
    descriptionHindi: "खोई हुई वस्तु की रिपोर्ट सुनें",
    difficulty: "intermediate",
    category: "Daily Life",
    audioText: "Excuse me, I lost my bag on the metro. When did you lose it? About an hour ago, on the Blue Line. What does the bag look like? It's a black leather bag with a brown strap. What was inside? My wallet, phone, and some documents. Let me check our lost and found. Someone turned in a black bag 30 minutes ago. Is this yours? Yes! That's my bag! Thank goodness! Please show me your ID to verify. Here's my Aadhaar card. Everything matches. Please sign here. Thank you so much! You're welcome. Please be careful next time.",
    audioTextHindi: "माफ़ कीजिए, मैंने मेट्रो में अपना बैग खो दिया। आपने इसे कब खोया? लगभग एक घंटे पहले, ब्लू लाइन पर। बैग कैसा दिखता है? यह भूरे पट्टे वाला काला चमड़े का बैग है। अंदर क्या था? मेरा बटुआ, फोन, और कुछ दस्तावेज़। मुझे हमारा खोया और पाया चेक करने दीजिए। किसी ने 30 मिनट पहले एक काला बैग जमा किया। क्या यह आपका है? हाँ! यह मेरा बैग है! भगवान का शुक्र है! कृपया सत्यापन के लिए अपना आईडी दिखाइए। यह रहा मेरा आधार कार्ड। सब कुछ मिलता है। कृपया यहाँ साइन करें। बहुत-बहुत धन्यवाद! आपका स्वागत है। कृपया अगली बार सावधान रहें।",
    duration: "1:50",
    questions: [
      { question: "Where was the bag lost?", questionHindi: "बैग कहाँ खोया?", options: ["Bus", "Metro", "Train", "Taxi"], correctAnswer: 1, explanation: "The bag was lost on the metro", explanationHindi: "बैग मेट्रो में खोया" },
      { question: "What color is the bag?", questionHindi: "बैग का रंग क्या है?", options: ["Brown", "Black", "Blue", "Red"], correctAnswer: 1, explanation: "It's a black leather bag", explanationHindi: "यह काला चमड़े का बैग है" },
      { question: "When was the bag turned in?", questionHindi: "बैग कब जमा किया गया?", options: ["15 minutes ago", "30 minutes ago", "45 minutes ago", "1 hour ago"], correctAnswer: 1, explanation: "Someone turned it in 30 minutes ago", explanationHindi: "किसी ने 30 मिनट पहले जमा किया" }
    ],
    vocabulary: [
      { word: "lost", meaning: "unable to find", meaningHindi: "खोया हुआ" },
      { word: "verify", meaning: "to confirm", meaningHindi: "सत्यापित करना" },
      { word: "turned in", meaning: "submitted", meaningHindi: "जमा किया" }
    ]
  },
  // ==================== ADDITIONAL LESSONS (31-100) ====================
  {
    id: 31,
    title: "At the Bookstore",
    titleHindi: "किताबों की दुकान में",
    description: "Listen to buying books",
    descriptionHindi: "किताबें खरीदना सुनें",
    difficulty: "beginner",
    category: "Shopping",
    audioText: "Welcome to our bookstore! Can I help you find something? Yes, I'm looking for English grammar books. They're in aisle 3. Do you have any recommendations for beginners? This book is very popular. It has simple explanations. How much does it cost? It's 350 rupees. I'll take it. Would you like a bag?",
    audioTextHindi: "हमारी किताबों की दुकान में आपका स्वागत है! क्या मैं आपको कुछ खोजने में मदद कर सकता हूँ? हाँ, मैं अंग्रेजी व्याकरण की किताबें ढूंढ रहा हूँ। वे गलियारे 3 में हैं। क्या आपके पास शुरुआती लोगों के लिए कोई सिफारिश है? यह किताब बहुत लोकप्रिय है। इसमें सरल व्याख्याएं हैं। इसकी कीमत कितनी है? यह 350 रुपये है। मैं इसे लूंगा। क्या आप बैग चाहेंगे?",
    duration: "1:30",
    questions: [
      { question: "What type of books is the customer looking for?", questionHindi: "ग्राहक किस प्रकार की किताबें ढूंढ रहा है?", options: ["Story books", "Grammar books", "Science books", "History books"], correctAnswer: 1, explanation: "Looking for English grammar books", explanationHindi: "अंग्रेजी व्याकरण की किताबें ढूंढ रहा है" },
      { question: "How much does the book cost?", questionHindi: "किताब की कीमत कितनी है?", options: ["250 rupees", "300 rupees", "350 rupees", "400 rupees"], correctAnswer: 2, explanation: "The book costs 350 rupees", explanationHindi: "किताब 350 रुपये की है" }
    ],
    vocabulary: [
      { word: "aisle", meaning: "passage between shelves", meaningHindi: "गलियारा" },
      { word: "recommendation", meaning: "suggestion", meaningHindi: "सिफारिश" }
    ]
  },
  {
    id: 32,
    title: "Booking a Cab",
    titleHindi: "कैब बुक करना",
    description: "Listen to booking a ride",
    descriptionHindi: "राइड बुक करना सुनें",
    difficulty: "beginner",
    category: "Travel",
    audioText: "Hello, I need a cab to the airport. Where are you right now? I'm at MG Road, near the mall. Okay, a cab will reach you in 5 minutes. The driver's name is Raju. What's the fare? It will be around 450 rupees. Can I pay by card? Yes, you can pay by card or cash.",
    audioTextHindi: "नमस्ते, मुझे एयरपोर्ट के लिए कैब चाहिए। आप अभी कहाँ हैं? मैं एमजी रोड पर हूँ, मॉल के पास। ठीक है, एक कैब 5 मिनट में आपके पास पहुंच जाएगी। ड्राइवर का नाम राजू है। किराया क्या होगा? यह लगभग 450 रुपये होगा। क्या मैं कार्ड से भुगतान कर सकता हूँ? हाँ, आप कार्ड या नकद से भुगतान कर सकते हैं।",
    duration: "1:20",
    questions: [
      { question: "Where does the customer want to go?", questionHindi: "ग्राहक कहाँ जाना चाहता है?", options: ["Mall", "Airport", "Station", "Office"], correctAnswer: 1, explanation: "Customer needs a cab to the airport", explanationHindi: "ग्राहक को एयरपोर्ट जाना है" },
      { question: "How long will the cab take to arrive?", questionHindi: "कैब आने में कितना समय लगेगा?", options: ["3 minutes", "5 minutes", "10 minutes", "15 minutes"], correctAnswer: 1, explanation: "Cab will reach in 5 minutes", explanationHindi: "कैब 5 मिनट में पहुंचेगी" }
    ],
    vocabulary: [
      { word: "fare", meaning: "cost of travel", meaningHindi: "किराया" },
      { word: "cab", meaning: "taxi", meaningHindi: "टैक्सी" }
    ]
  },
  {
    id: 33,
    title: "At the Salon",
    titleHindi: "सैलून में",
    description: "Listen to getting a haircut",
    descriptionHindi: "बाल कटवाना सुनें",
    difficulty: "beginner",
    category: "Services",
    audioText: "Good afternoon! What would you like today? I need a haircut. How short do you want it? Just a trim, not too short. Would you like a hair wash too? Yes, please. That will be 300 rupees total. Okay, please have a seat.",
    audioTextHindi: "शुभ दोपहर! आज आप क्या चाहेंगे? मुझे बाल कटवाने हैं। कितने छोटे चाहिए? बस ट्रिम, बहुत छोटे नहीं। क्या आप हेयर वॉश भी चाहेंगे? हाँ, कृपया। कुल 300 रुपये होंगे। ठीक है, कृपया बैठिए।",
    duration: "1:15",
    questions: [
      { question: "What does the customer want?", questionHindi: "ग्राहक क्या चाहता है?", options: ["Shave", "Haircut", "Massage", "Facial"], correctAnswer: 1, explanation: "Customer needs a haircut", explanationHindi: "ग्राहक को बाल कटवाने हैं" },
      { question: "What is the total cost?", questionHindi: "कुल कीमत क्या है?", options: ["200 rupees", "250 rupees", "300 rupees", "350 rupees"], correctAnswer: 2, explanation: "Total is 300 rupees", explanationHindi: "कुल 300 रुपये है" }
    ],
    vocabulary: [
      { word: "trim", meaning: "slight cut", meaningHindi: "हल्की कटाई" },
      { word: "salon", meaning: "beauty shop", meaningHindi: "सैलून" }
    ]
  },
  {
    id: 34,
    title: "Ordering Pizza",
    titleHindi: "पिज़्ज़ा ऑर्डर करना",
    description: "Listen to ordering food delivery",
    descriptionHindi: "फूड डिलीवरी ऑर्डर करना सुनें",
    difficulty: "beginner",
    category: "Restaurant",
    audioText: "Hello, Pizza Palace! I'd like to order a large pepperoni pizza. Would you like any sides? Yes, garlic bread and a coke. Your total is 650 rupees. Delivery time is 30 minutes. What's your address? 45 Park Street, Apartment 302. Thank you for your order!",
    audioTextHindi: "नमस्ते, पिज़्ज़ा पैलेस! मुझे एक लार्ज पेपरोनी पिज़्ज़ा ऑर्डर करना है। क्या आप कोई साइड्स चाहेंगे? हाँ, गार्लिक ब्रेड और एक कोक। आपका कुल 650 रुपये है। डिलीवरी का समय 30 मिनट है। आपका पता क्या है? 45 पार्क स्ट्रीट, अपार्टमेंट 302। आपके ऑर्डर के लिए धन्यवाद!",
    duration: "1:25",
    questions: [
      { question: "What size pizza was ordered?", questionHindi: "कौन सा साइज़ पिज़्ज़ा ऑर्डर किया गया?", options: ["Small", "Medium", "Large", "Extra large"], correctAnswer: 2, explanation: "A large pepperoni pizza was ordered", explanationHindi: "लार्ज पेपरोनी पिज़्ज़ा ऑर्डर किया गया" },
      { question: "What is the delivery time?", questionHindi: "डिलीवरी का समय क्या है?", options: ["20 minutes", "30 minutes", "40 minutes", "45 minutes"], correctAnswer: 1, explanation: "Delivery time is 30 minutes", explanationHindi: "डिलीवरी का समय 30 मिनट है" }
    ],
    vocabulary: [
      { word: "delivery", meaning: "bringing to your place", meaningHindi: "डिलीवरी" },
      { word: "order", meaning: "request for food", meaningHindi: "ऑर्डर" }
    ]
  },
  {
    id: 35,
    title: "At the Laundry",
    titleHindi: "लॉन्ड्री में",
    description: "Listen to dry cleaning conversation",
    descriptionHindi: "ड्राई क्लीनिंग की बातचीत सुनें",
    difficulty: "beginner",
    category: "Services",
    audioText: "Hello, I need to get these clothes cleaned. Let me see. Two shirts and one suit. When do you need them? By tomorrow evening, if possible. That will be express service, 500 rupees. Okay, that's fine. Here's your receipt. Pick up after 5 PM tomorrow.",
    audioTextHindi: "नमस्ते, मुझे ये कपड़े साफ करवाने हैं। मुझे देखने दीजिए। दो शर्ट और एक सूट। आपको ये कब चाहिए? कल शाम तक, अगर संभव हो। वह एक्सप्रेस सर्विस होगी, 500 रुपये। ठीक है। यह रही आपकी रसीद। कल शाम 5 बजे के बाद लें।",
    duration: "1:20",
    questions: [
      { question: "How many shirts need cleaning?", questionHindi: "कितनी शर्ट साफ करनी हैं?", options: ["One", "Two", "Three", "Four"], correctAnswer: 1, explanation: "Two shirts need cleaning", explanationHindi: "दो शर्ट साफ करनी हैं" },
      { question: "What is the express service cost?", questionHindi: "एक्सप्रेस सर्विस की कीमत क्या है?", options: ["300 rupees", "400 rupees", "500 rupees", "600 rupees"], correctAnswer: 2, explanation: "Express service is 500 rupees", explanationHindi: "एक्सप्रेस सर्विस 500 रुपये है" }
    ],
    vocabulary: [
      { word: "laundry", meaning: "clothes washing service", meaningHindi: "लॉन्ड्री" },
      { word: "express", meaning: "fast service", meaningHindi: "तेज़ सेवा" }
    ]
  },
  {
    id: 36,
    title: "Gym Inquiry",
    titleHindi: "जिम पूछताछ",
    description: "Listen to gym membership inquiry",
    descriptionHindi: "जिम सदस्यता पूछताछ सुनें",
    difficulty: "intermediate",
    category: "Health",
    audioText: "Hi, I'm interested in joining your gym. Great! We have monthly and annual plans. Monthly is 2000 rupees, annual is 18000 rupees. What facilities do you have? We have cardio machines, weights, yoga classes, and a swimming pool. What are the timings? We're open from 5 AM to 10 PM. Can I get a trial session? Yes, we offer one free trial.",
    audioTextHindi: "नमस्ते, मुझे आपके जिम में शामिल होने में रुचि है। बहुत अच्छा! हमारे पास मासिक और वार्षिक प्लान हैं। मासिक 2000 रुपये है, वार्षिक 18000 रुपये है। आपके पास क्या सुविधाएं हैं? हमारे पास कार्डियो मशीनें, वेट्स, योग क्लासेस और स्विमिंग पूल है। समय क्या है? हम सुबह 5 बजे से रात 10 बजे तक खुले हैं। क्या मुझे ट्रायल सेशन मिल सकता है? हाँ, हम एक मुफ्त ट्रायल देते हैं।",
    duration: "1:40",
    questions: [
      { question: "What is the monthly fee?", questionHindi: "मासिक फीस क्या है?", options: ["1500 rupees", "2000 rupees", "2500 rupees", "3000 rupees"], correctAnswer: 1, explanation: "Monthly fee is 2000 rupees", explanationHindi: "मासिक फीस 2000 रुपये है" },
      { question: "What time does the gym open?", questionHindi: "जिम कितने बजे खुलता है?", options: ["4 AM", "5 AM", "6 AM", "7 AM"], correctAnswer: 1, explanation: "Gym opens at 5 AM", explanationHindi: "जिम सुबह 5 बजे खुलता है" }
    ],
    vocabulary: [
      { word: "membership", meaning: "being a member", meaningHindi: "सदस्यता" },
      { word: "facilities", meaning: "services available", meaningHindi: "सुविधाएं" }
    ]
  },
  {
    id: 37,
    title: "Visiting a Temple",
    titleHindi: "मंदिर जाना",
    description: "Listen to temple visit conversation",
    descriptionHindi: "मंदिर यात्रा की बातचीत सुनें",
    difficulty: "beginner",
    category: "Culture",
    audioText: "Excuse me, what time does the temple open? The temple opens at 6 AM and closes at 9 PM. Is there a dress code? Yes, please wear modest clothing. Where can I leave my shoes? There's a shoe counter near the entrance. Is photography allowed inside? No, photography is not allowed in the main hall.",
    audioTextHindi: "माफ़ कीजिए, मंदिर कितने बजे खुलता है? मंदिर सुबह 6 बजे खुलता है और रात 9 बजे बंद होता है। क्या कोई ड्रेस कोड है? हाँ, कृपया शालीन कपड़े पहनें। मैं अपने जूते कहाँ छोड़ सकता हूँ? प्रवेश द्वार के पास एक जूता काउंटर है। क्या अंदर फोटोग्राफी की अनुमति है? नहीं, मुख्य हॉल में फोटोग्राफी की अनुमति नहीं है।",
    duration: "1:30",
    questions: [
      { question: "What time does the temple open?", questionHindi: "मंदिर कितने बजे खुलता है?", options: ["5 AM", "6 AM", "7 AM", "8 AM"], correctAnswer: 1, explanation: "Temple opens at 6 AM", explanationHindi: "मंदिर सुबह 6 बजे खुलता है" },
      { question: "Is photography allowed?", questionHindi: "क्या फोटोग्राफी की अनुमति है?", options: ["Yes", "No", "Only outside", "With permission"], correctAnswer: 1, explanation: "Photography is not allowed in main hall", explanationHindi: "मुख्य हॉल में फोटोग्राफी की अनुमति नहीं है" }
    ],
    vocabulary: [
      { word: "modest", meaning: "simple and decent", meaningHindi: "शालीन" },
      { word: "entrance", meaning: "entry point", meaningHindi: "प्रवेश द्वार" }
    ]
  },
  {
    id: 38,
    title: "Buying Medicine",
    titleHindi: "दवा खरीदना",
    description: "Listen to pharmacy conversation",
    descriptionHindi: "फार्मेसी में बातचीत सुनें",
    difficulty: "intermediate",
    category: "Healthcare",
    audioText: "Hello, I have a prescription from Dr. Sharma. Let me check. Yes, we have all these medicines. Take this tablet twice daily after meals. This syrup is for cough, take it three times a day. Any side effects I should know about? You might feel drowsy, so avoid driving. The total is 450 rupees.",
    audioTextHindi: "नमस्ते, मेरे पास डॉ. शर्मा का प्रिस्क्रिप्शन है। मुझे जांचने दीजिए। हाँ, हमारे पास ये सभी दवाएं हैं। यह गोली दिन में दो बार खाने के बाद लें। यह सिरप खांसी के लिए है, दिन में तीन बार लें। कोई साइड इफेक्ट्स जो मुझे पता होने चाहिए? आपको नींद आ सकती है, इसलिए गाड़ी चलाने से बचें। कुल 450 रुपये है।",
    duration: "1:35",
    questions: [
      { question: "How often should the tablet be taken?", questionHindi: "गोली कितनी बार लेनी चाहिए?", options: ["Once daily", "Twice daily", "Three times", "Four times"], correctAnswer: 1, explanation: "Take tablet twice daily after meals", explanationHindi: "गोली दिन में दो बार खाने के बाद लें" },
      { question: "What is the total cost?", questionHindi: "कुल कीमत क्या है?", options: ["350 rupees", "400 rupees", "450 rupees", "500 rupees"], correctAnswer: 2, explanation: "Total is 450 rupees", explanationHindi: "कुल 450 रुपये है" }
    ],
    vocabulary: [
      { word: "prescription", meaning: "doctor's written order", meaningHindi: "प्रिस्क्रिप्शन" },
      { word: "drowsy", meaning: "sleepy", meaningHindi: "नींद आना" }
    ]
  },
  {
    id: 39,
    title: "School Parent Meeting",
    titleHindi: "स्कूल अभिभावक बैठक",
    description: "Listen to parent-teacher meeting",
    descriptionHindi: "अभिभावक-शिक्षक बैठक सुनें",
    difficulty: "intermediate",
    category: "Education",
    audioText: "Good afternoon, Mrs. Sharma. How is Rahul doing in class? He's doing well in Math and Science. However, he needs to improve in English. What can we do to help? I suggest more reading practice at home. He should read English books for 30 minutes daily. We'll do that. Thank you for your guidance.",
    audioTextHindi: "शुभ दोपहर, श्रीमती शर्मा। राहुल कक्षा में कैसा कर रहा है? वह गणित और विज्ञान में अच्छा कर रहा है। हालांकि, उसे अंग्रेजी में सुधार करने की जरूरत है। हम मदद के लिए क्या कर सकते हैं? मैं घर पर अधिक पढ़ने के अभ्यास का सुझाव देता हूँ। उसे रोज़ाना 30 मिनट अंग्रेजी की किताबें पढ़नी चाहिए। हम ऐसा करेंगे। आपके मार्गदर्शन के लिए धन्यवाद।",
    duration: "1:40",
    questions: [
      { question: "Which subjects is Rahul good at?", questionHindi: "राहुल किन विषयों में अच्छा है?", options: ["English and Hindi", "Math and Science", "History and Geography", "Art and Music"], correctAnswer: 1, explanation: "He's doing well in Math and Science", explanationHindi: "वह गणित और विज्ञान में अच्छा कर रहा है" },
      { question: "How long should Rahul read daily?", questionHindi: "राहुल को रोज़ाना कितनी देर पढ़ना चाहिए?", options: ["15 minutes", "20 minutes", "30 minutes", "45 minutes"], correctAnswer: 2, explanation: "Read for 30 minutes daily", explanationHindi: "रोज़ाना 30 मिनट पढ़ना चाहिए" }
    ],
    vocabulary: [
      { word: "improve", meaning: "to get better", meaningHindi: "सुधार करना" },
      { word: "guidance", meaning: "advice", meaningHindi: "मार्गदर्शन" }
    ]
  },
  {
    id: 40,
    title: "Renting a House",
    titleHindi: "घर किराये पर लेना",
    description: "Listen to house rental discussion",
    descriptionHindi: "घर किराये की चर्चा सुनें",
    difficulty: "advanced",
    category: "Housing",
    audioText: "I'm looking for a 2BHK apartment. We have one available in Sector 15. The rent is 15000 per month. Is water and electricity included? No, those are separate. You'll pay them directly. What about parking? Yes, one car parking is included. When can I see the flat? You can visit tomorrow at 11 AM.",
    audioTextHindi: "मैं 2BHK अपार्टमेंट ढूंढ रहा हूँ। हमारे पास सेक्टर 15 में एक उपलब्ध है। किराया 15000 प्रति माह है। क्या पानी और बिजली शामिल है? नहीं, वे अलग हैं। आप उन्हें सीधे भुगतान करेंगे। पार्किंग के बारे में क्या? हाँ, एक कार पार्किंग शामिल है। मैं फ्लैट कब देख सकता हूँ? आप कल सुबह 11 बजे आ सकते हैं।",
    duration: "1:45",
    questions: [
      { question: "What type of apartment is available?", questionHindi: "कौन सा अपार्टमेंट उपलब्ध है?", options: ["1BHK", "2BHK", "3BHK", "Studio"], correctAnswer: 1, explanation: "A 2BHK apartment is available", explanationHindi: "2BHK अपार्टमेंट उपलब्ध है" },
      { question: "What is the monthly rent?", questionHindi: "मासिक किराया क्या है?", options: ["12000", "15000", "18000", "20000"], correctAnswer: 1, explanation: "Rent is 15000 per month", explanationHindi: "किराया 15000 प्रति माह है" }
    ],
    vocabulary: [
      { word: "rent", meaning: "monthly payment for house", meaningHindi: "किराया" },
      { word: "available", meaning: "ready for use", meaningHindi: "उपलब्ध" }
    ]
  },
];

// Utility functions
export const getLessonsByDifficulty = (difficulty: string): ListeningLesson[] => {
  if (difficulty === "all") return listeningLessons;
  return listeningLessons.filter(lesson => lesson.difficulty === difficulty);
};

export const getLessonsByCategory = (category: string): ListeningLesson[] => {
  if (category === "all") return listeningLessons;
  return listeningLessons.filter(lesson => lesson.category === category);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(listeningLessons.map(lesson => lesson.category)));
};

export const searchLessons = (query: string): ListeningLesson[] => {
  const lowerQuery = query.toLowerCase();
  return listeningLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(lowerQuery) ||
    lesson.titleHindi.includes(query) ||
    lesson.category.toLowerCase().includes(lowerQuery)
  );
};

export default listeningLessons;
