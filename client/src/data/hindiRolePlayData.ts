// Hindi Role Play Data - 100+ Interactive Scenarios
// Prepared by: Mrs. Premlata Jain, AAO, PWD Udaipur

export interface RolePlayScenario {
  id: number;
  title: string;
  titleHindi: string;
  yourRole: string;
  yourRoleHindi: string;
  partnerRole: string;
  partnerRoleHindi: string;
  situation: string;
  situationHindi: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  exchanges: {
    prompt: string;
    promptHindi: string;
    expectedResponses: string[];
    hints: string[];
    hintsHindi: string[];
  }[];
}

export const rolePlayScenarios: RolePlayScenario[] = [
  // ==================== DAILY LIFE (1-15) ====================
  {
    id: 1,
    title: "Asking for Directions",
    titleHindi: "रास्ता पूछना",
    yourRole: "Tourist",
    yourRoleHindi: "पर्यटक",
    partnerRole: "Local Person",
    partnerRoleHindi: "स्थानीय व्यक्ति",
    situation: "You are lost and need to find the railway station.",
    situationHindi: "आप खो गए हैं और रेलवे स्टेशन खोजना है।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Excuse me, can you help me?", promptHindi: "माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं?", expectedResponses: ["yes", "sure", "of course", "how can i help"], hints: ["Say 'Yes' or 'Sure' to offer help"], hintsHindi: ["मदद देने के लिए 'Yes' या 'Sure' कहें"] },
      { prompt: "I am looking for the railway station. Which way should I go?", promptHindi: "मैं रेलवे स्टेशन ढूंढ रहा हूँ। मुझे किस तरफ जाना चाहिए?", expectedResponses: ["go straight", "turn left", "turn right", "walk", "minutes"], hints: ["Give directions like 'Go straight'"], hintsHindi: ["'Go straight' जैसे दिशा-निर्देश दें"] },
      { prompt: "Thank you so much for your help!", promptHindi: "आपकी मदद के लिए बहुत धन्यवाद!", expectedResponses: ["welcome", "no problem", "pleasure", "glad"], hints: ["Say 'You're welcome'"], hintsHindi: ["'You're welcome' कहें"] }
    ]
  },
  {
    id: 2,
    title: "Morning Greeting",
    titleHindi: "सुबह का अभिवादन",
    yourRole: "Neighbor",
    yourRoleHindi: "पड़ोसी",
    partnerRole: "Neighbor",
    partnerRoleHindi: "पड़ोसी",
    situation: "You meet your neighbor during morning walk.",
    situationHindi: "आप सुबह की सैर के दौरान अपने पड़ोसी से मिलते हैं।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Good morning! How are you today?", promptHindi: "सुप्रभात! आज आप कैसे हैं?", expectedResponses: ["good morning", "fine", "well", "great", "thank you"], hints: ["Greet back and say how you are"], hintsHindi: ["अभिवादन करें और बताएं कि आप कैसे हैं"] },
      { prompt: "The weather is nice today, isn't it?", promptHindi: "आज मौसम अच्छा है, है ना?", expectedResponses: ["yes", "nice", "beautiful", "lovely", "perfect"], hints: ["Agree about the weather"], hintsHindi: ["मौसम के बारे में सहमत हों"] },
      { prompt: "Have a great day! See you later.", promptHindi: "आपका दिन शुभ हो! फिर मिलेंगे।", expectedResponses: ["you too", "same to you", "bye", "see you", "take care"], hints: ["Wish them well too"], hintsHindi: ["उन्हें भी शुभकामनाएं दें"] }
    ]
  },
  {
    id: 3,
    title: "Borrowing Something",
    titleHindi: "कुछ उधार लेना",
    yourRole: "Person",
    yourRoleHindi: "व्यक्ति",
    partnerRole: "Friend",
    partnerRoleHindi: "दोस्त",
    situation: "You need to borrow a book from your friend.",
    situationHindi: "आपको अपने दोस्त से किताब उधार लेनी है।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Hi! Do you have a minute?", promptHindi: "नमस्ते! क्या आपके पास एक मिनट है?", expectedResponses: ["yes", "sure", "of course", "what is it"], hints: ["Say yes and ask what they need"], hintsHindi: ["हाँ कहें और पूछें क्या चाहिए"] },
      { prompt: "Can I borrow your English dictionary for a few days?", promptHindi: "क्या मैं कुछ दिनों के लिए आपकी अंग्रेजी शब्दकोश उधार ले सकता हूँ?", expectedResponses: ["yes", "sure", "take it", "no problem", "of course"], hints: ["Agree to lend the book"], hintsHindi: ["किताब देने के लिए सहमत हों"] },
      { prompt: "Thank you! I'll return it by next week.", promptHindi: "धन्यवाद! मैं इसे अगले हफ्ते तक लौटा दूंगा।", expectedResponses: ["okay", "no rush", "take your time", "fine"], hints: ["Acknowledge their promise"], hintsHindi: ["उनके वादे को स्वीकार करें"] }
    ]
  },
  {
  
  id: 4,
    title: "Asking the Time",
    titleHindi: "समय पूछना",
    yourRole: "Person",
    yourRoleHindi: "व्यक्ति",
    partnerRole: "Stranger",
    partnerRoleHindi: "अजनबी",
    situation: "You need to know the current time.",
    situationHindi: "आपको वर्तमान समय जानना है।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Excuse me, could you tell me the time?", promptHindi: "माफ़ कीजिए, क्या आप मुझे समय बता सकते हैं?", expectedResponses: ["yes", "sure", "it is", "clock", "time"], hints: ["Tell them the time"], hintsHindi: ["उन्हें समय बताएं"] },
      { prompt: "Thank you very much!", promptHindi: "बहुत-बहुत धन्यवाद!", expectedResponses: ["welcome", "no problem", "you're welcome"], hints: ["Say 'You're welcome'"], hintsHindi: ["'You're welcome' कहें"] }
    ]
  },
  {
    id: 5,
    title: "Introducing Yourself",
    titleHindi: "अपना परिचय देना",
    yourRole: "New Person",
    yourRoleHindi: "नया व्यक्ति",
    partnerRole: "Colleague",
    partnerRoleHindi: "सहकर्मी",
    situation: "You are meeting a new colleague at work.",
    situationHindi: "आप काम पर एक नए सहकर्मी से मिल रहे हैं।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Hello! I'm Sharma. I just joined the company.", promptHindi: "नमस्ते! मैं शर्मा हूँ। मैंने अभी कंपनी ज्वाइन की है।", expectedResponses: ["hello", "hi", "welcome", "nice to meet", "i am", "my name"], hints: ["Introduce yourself and welcome them"], hintsHindi: ["अपना परिचय दें और उनका स्वागत करें"] },
      { prompt: "Which department are you in?", promptHindi: "आप किस विभाग में हैं?", expectedResponses: ["i am in", "i work in", "department", "team", "section"], hints: ["Tell your department"], hintsHindi: ["अपना विभाग बताएं"] },
      { prompt: "Nice meeting you! Let me know if you need any help.", promptHindi: "आपसे मिलकर अच्छा लगा! अगर कोई मदद चाहिए तो बताइए।", expectedResponses: ["thank you", "nice meeting", "sure", "thanks", "will do"], hints: ["Thank them for the offer"], hintsHindi: ["प्रस्ताव के लिए धन्यवाद दें"] }
    ]
  },
  // ==================== SHOPPING (6-20) ====================
  {
    id: 6,
    title: "Buying Clothes",
    titleHindi: "कपड़े खरीदना",
    yourRole: "Shopkeeper",
    yourRoleHindi: "दुकानदार",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer wants to buy a shirt.",
    situationHindi: "एक ग्राहक शर्ट खरीदना चाहता है।",
    difficulty: "beginner",
    category: "Shopping",
    exchanges: [
      { prompt: "Hello! I'm looking for a formal shirt.", promptHindi: "नमस्ते! मैं एक फॉर्मल शर्ट ढूंढ रहा हूँ।", expectedResponses: ["welcome", "what size", "color", "show you", "this way"], hints: ["Welcome them and ask about size/color"], hintsHindi: ["स्वागत करें और साइज़/रंग पूछें"] },
      { prompt: "I need size medium in blue color.", promptHindi: "मुझे नीले रंग में मीडियम साइज़ चाहिए।", expectedResponses: ["yes", "have", "here", "this one", "try"], hints: ["Show them the shirt"], hintsHindi: ["उन्हें शर्ट दिखाएं"] },
      { prompt: "How much does this cost?", promptHindi: "इसकी कीमत क्या है?", expectedResponses: ["rupees", "price", "cost", "thousand", "hundred"], hints: ["Tell the price"], hintsHindi: ["कीमत बताएं"] }
    ]
  },
  {
    id: 7,
    title: "Bargaining at Market",
    titleHindi: "बाज़ार में मोलभाव",
    yourRole: "Vendor",
    yourRoleHindi: "विक्रेता",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer is bargaining for a bag.",
    situationHindi: "एक ग्राहक बैग के लिए मोलभाव कर रहा है।",
    difficulty: "intermediate",
    category: "Shopping",
    exchanges: [
      { prompt: "This bag is too expensive. Can you reduce the price?", promptHindi: "यह बैग बहुत महंगा है। क्या आप कीमत कम कर सकते हैं?", expectedResponses: ["best price", "quality", "discount", "final", "offer"], hints: ["Explain the quality or offer discount"], hintsHindi: ["गुणवत्ता बताएं या छूट दें"] },
      { prompt: "I can pay 500 rupees maximum.", promptHindi: "मैं अधिकतम 500 रुपये दे सकता हूँ।", expectedResponses: ["okay", "deal", "fine", "take it", "agreed", "no"], hints: ["Accept or counter offer"], hintsHindi: ["स्वीकार करें या काउंटर ऑफर दें"] },
      { prompt: "Okay, I'll take it. Here's the money.", promptHindi: "ठीक है, मैं ले लूंगा। यह रहे पैसे।", expectedResponses: ["thank you", "come again", "welcome", "visit"], hints: ["Thank them and invite again"], hintsHindi: ["धन्यवाद दें और फिर आने को कहें"] }
    ]
  },
  {
    id: 8,
    title: "Returning a Product",
    titleHindi: "उत्पाद वापस करना",
    yourRole: "Store Staff",
    yourRoleHindi: "स्टोर स्टाफ",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer wants to return a defective product.",
    situationHindi: "एक ग्राहक खराब उत्पाद वापस करना चाहता है।",
    difficulty: "intermediate",
    category: "Shopping",
    exchanges: [
      { prompt: "I bought this phone yesterday but it's not working properly.", promptHindi: "मैंने कल यह फोन खरीदा था लेकिन यह ठीक से काम नहीं कर रहा।", expectedResponses: ["sorry", "receipt", "check", "problem", "exchange"], hints: ["Apologize and ask for receipt"], hintsHindi: ["माफी मांगें और रसीद मांगें"] },
      { prompt: "Here's my receipt. Can I get a replacement?", promptHindi: "यह रही मेरी रसीद। क्या मुझे बदला मिल सकता है?", expectedResponses: ["yes", "replace", "new one", "exchange", "sure"], hints: ["Confirm replacement"], hintsHindi: ["बदलाव की पुष्टि करें"] },
      { prompt: "Thank you for your help.", promptHindi: "आपकी मदद के लिए धन्यवाद।", expectedResponses: ["welcome", "sorry", "inconvenience", "help"], hints: ["Apologize for inconvenience"], hintsHindi: ["असुविधा के लिए माफी मांगें"] }
    ]
  },
  {
    id: 9,
    title: "Grocery Shopping",
    titleHindi: "किराने की खरीदारी",
    yourRole: "Shopkeeper",
    yourRoleHindi: "दुकानदार",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer is buying groceries.",
    situationHindi: "एक ग्राहक किराना खरीद रहा है।",
    difficulty: "beginner",
    category: "Shopping",
    exchanges: [
      { prompt: "I need 2 kg rice and 1 kg sugar.", promptHindi: "मुझे 2 किलो चावल और 1 किलो चीनी चाहिए।", expectedResponses: ["yes", "here", "anything else", "total", "more"], hints: ["Confirm and ask if they need more"], hintsHindi: ["पुष्टि करें और पूछें क्या और चाहिए"] },
      { prompt: "Do you have fresh vegetables?", promptHindi: "क्या आपके पास ताज़ी सब्ज़ियाँ हैं?", expectedResponses: ["yes", "fresh", "today", "tomatoes", "onions"], hints: ["Tell about available vegetables"], hintsHindi: ["उपलब्ध सब्ज़ियों के बारे में बताएं"] },
      { prompt: "What's the total bill?", promptHindi: "कुल बिल कितना है?", expectedResponses: ["total", "rupees", "amount", "bill"], hints: ["Tell the total amount"], hintsHindi: ["कुल राशि बताएं"] }
    ]
  },
  {
    id: 10,
    title: "Electronics Store",
    titleHindi: "इलेक्ट्रॉनिक्स स्टोर",
    yourRole: "Salesperson",
    yourRoleHindi: "विक्रेता",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer wants to buy a smartphone.",
    situationHindi: "एक ग्राहक स्मार्टफोन खरीदना चाहता है।",
    difficulty: "intermediate",
    category: "Shopping",
    exchanges: [
      { prompt: "I want to buy a new smartphone. What do you recommend?", promptHindi: "मैं एक नया स्मार्टफोन खरीदना चाहता हूँ। आप क्या सिफारिश करेंगे?", expectedResponses: ["budget", "recommend", "this model", "features", "camera"], hints: ["Ask about budget and recommend"], hintsHindi: ["बजट पूछें और सिफारिश करें"] },
      { prompt: "My budget is around 15,000 rupees.", promptHindi: "मेरा बजट लगभग 15,000 रुपये है।", expectedResponses: ["good options", "this phone", "features", "battery", "camera"], hints: ["Show phones in that range"], hintsHindi: ["उस रेंज में फोन दिखाएं"] },
      { prompt: "Does it come with warranty?", promptHindi: "क्या इसके साथ वारंटी आती है?", expectedResponses: ["yes", "warranty", "year", "months", "service"], hints: ["Explain warranty details"], hintsHindi: ["वारंटी विवरण बताएं"] }
    ]
  },
 
 // ==================== RESTAURANT & FOOD (11-25) ====================
  {
    id: 11,
    title: "Taking Food Order",
    titleHindi: "खाने का ऑर्डर लेना",
    yourRole: "Waiter",
    yourRoleHindi: "वेटर",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "You are taking order at a restaurant.",
    situationHindi: "आप रेस्तरां में ऑर्डर ले रहे हैं।",
    difficulty: "beginner",
    category: "Restaurant",
    exchanges: [
      { prompt: "Can I see the menu, please?", promptHindi: "क्या मैं मेन्यू देख सकता हूँ?", expectedResponses: ["yes", "here", "menu", "sir", "madam"], hints: ["Give them the menu"], hintsHindi: ["उन्हें मेन्यू दें"] },
      { prompt: "What do you recommend?", promptHindi: "आप क्या सिफारिश करेंगे?", expectedResponses: ["special", "recommend", "popular", "try", "best"], hints: ["Recommend a dish"], hintsHindi: ["एक व्यंजन की सिफारिश करें"] },
      { prompt: "I'll have the butter chicken with naan.", promptHindi: "मुझे बटर चिकन नान के साथ दीजिए।", expectedResponses: ["sure", "anything else", "drink", "order", "noted"], hints: ["Confirm and ask about drinks"], hintsHindi: ["पुष्टि करें और पेय के बारे में पूछें"] }
    ]
  },
  {
    id: 12,
    title: "Handling Complaint",
    titleHindi: "शिकायत संभालना",
    yourRole: "Restaurant Manager",
    yourRoleHindi: "रेस्तरां मैनेजर",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer is complaining about cold food.",
    situationHindi: "एक ग्राहक ठंडे खाने की शिकायत कर रहा है।",
    difficulty: "intermediate",
    category: "Restaurant",
    exchanges: [
      { prompt: "This food is cold. I've been waiting for 30 minutes!", promptHindi: "यह खाना ठंडा है। मैं 30 मिनट से इंतज़ार कर रहा हूँ!", expectedResponses: ["sorry", "apologize", "replace", "new", "immediately"], hints: ["Apologize sincerely"], hintsHindi: ["ईमानदारी से माफी मांगें"] },
      { prompt: "I want a fresh plate or a refund.", promptHindi: "मुझे ताज़ा प्लेट चाहिए या रिफंड।", expectedResponses: ["fresh", "new", "right away", "complimentary", "free"], hints: ["Offer fresh food or refund"], hintsHindi: ["ताज़ा खाना या रिफंड दें"] },
      { prompt: "Thank you for understanding.", promptHindi: "समझने के लिए धन्यवाद।", expectedResponses: ["welcome", "sorry again", "enjoy", "meal"], hints: ["Apologize again and wish well"], hintsHindi: ["फिर से माफी मांगें"] }
    ]
  },
  {
    id: 13,
    title: "Coffee Shop Order",
    titleHindi: "कॉफी शॉप ऑर्डर",
    yourRole: "Barista",
    yourRoleHindi: "बरिस्ता",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "Taking coffee order at a cafe.",
    situationHindi: "कैफे में कॉफी का ऑर्डर लेना।",
    difficulty: "beginner",
    category: "Restaurant",
    exchanges: [
      { prompt: "Hi! I'd like a cappuccino, please.", promptHindi: "नमस्ते! मुझे एक कैपुचीनो चाहिए।", expectedResponses: ["size", "small", "medium", "large", "sugar"], hints: ["Ask about size preference"], hintsHindi: ["साइज़ की पसंद पूछें"] },
      { prompt: "Medium size with less sugar.", promptHindi: "मीडियम साइज़ कम चीनी के साथ।", expectedResponses: ["sure", "name", "anything else", "total"], hints: ["Confirm and ask for name"], hintsHindi: ["पुष्टि करें और नाम पूछें"] },
      { prompt: "How long will it take?", promptHindi: "कितना समय लगेगा?", expectedResponses: ["minutes", "ready", "soon", "wait"], hints: ["Tell the waiting time"], hintsHindi: ["प्रतीक्षा समय बताएं"] }
    ]
  },
  {
    id: 14,
    title: "Food Delivery Call",
    titleHindi: "फूड डिलीवरी कॉल",
    yourRole: "Restaurant Staff",
    yourRoleHindi: "रेस्तरां स्टाफ",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "Taking a food delivery order over phone.",
    situationHindi: "फोन पर फूड डिलीवरी ऑर्डर लेना।",
    difficulty: "intermediate",
    category: "Restaurant",
    exchanges: [
      { prompt: "Hello, I want to place a delivery order.", promptHindi: "नमस्ते, मैं डिलीवरी ऑर्डर देना चाहता हूँ।", expectedResponses: ["yes", "order", "what would you like", "address"], hints: ["Ask what they want to order"], hintsHindi: ["पूछें क्या ऑर्डर करना है"] },
      { prompt: "I want 2 pizzas and 1 garlic bread.", promptHindi: "मुझे 2 पिज़्ज़ा और 1 गार्लिक ब्रेड चाहिए।", expectedResponses: ["size", "toppings", "address", "total"], hints: ["Ask about pizza size/toppings"], hintsHindi: ["पिज़्ज़ा साइज़/टॉपिंग पूछें"] },
      { prompt: "My address is 45 MG Road, near the park.", promptHindi: "मेरा पता 45 एमजी रोड, पार्क के पास है।", expectedResponses: ["delivery time", "minutes", "total", "payment"], hints: ["Confirm address and delivery time"], hintsHindi: ["पता और डिलीवरी समय की पुष्टि करें"] }
    ]
  },
  {
    id: 15,
    title: "Street Food Vendor",
    titleHindi: "स्ट्रीट फूड विक्रेता",
    yourRole: "Vendor",
    yourRoleHindi: "विक्रेता",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "Selling chaat at a street stall.",
    situationHindi: "स्ट्रीट स्टॉल पर चाट बेचना।",
    difficulty: "beginner",
    category: "Restaurant",
    exchanges: [
      { prompt: "How much for one plate of pani puri?", promptHindi: "एक प्लेट पानी पूरी कितने की है?", expectedResponses: ["rupees", "thirty", "forty", "price"], hints: ["Tell the price"], hintsHindi: ["कीमत बताएं"] },
      { prompt: "Make it less spicy please.", promptHindi: "कृपया कम तीखा बनाइए।", expectedResponses: ["okay", "sure", "no problem", "less spicy"], hints: ["Confirm less spicy"], hintsHindi: ["कम तीखा की पुष्टि करें"] },
      { prompt: "This is delicious! Give me one more plate.", promptHindi: "यह स्वादिष्ट है! एक और प्लेट दीजिए।", expectedResponses: ["thank you", "sure", "coming", "same"], hints: ["Thank and confirm"], hintsHindi: ["धन्यवाद दें और पुष्टि करें"] }
    ]
  },
  // ==================== HEALTHCARE (16-30) ====================
  {
    id: 16,
    title: "Doctor Consultation",
    titleHindi: "डॉक्टर परामर्श",
    yourRole: "Doctor",
    yourRoleHindi: "डॉक्टर",
    partnerRole: "Patient",
    partnerRoleHindi: "मरीज़",
    situation: "A patient comes with fever and cold.",
    situationHindi: "एक मरीज़ बुखार और सर्दी लेकर आया है।",
    difficulty: "intermediate",
    category: "Healthcare",
    exchanges: [
      { prompt: "Doctor, I've had fever for 3 days and my throat hurts.", promptHindi: "डॉक्टर, मुझे 3 दिनों से बुखार है और गला दर्द कर रहा है।", expectedResponses: ["let me check", "temperature", "symptoms", "other", "cough"], hints: ["Ask about other symptoms"], hintsHindi: ["अन्य लक्षणों के बारे में पूछें"] },
      { prompt: "I also have body ache and headache.", promptHindi: "मुझे शरीर में दर्द और सिरदर्द भी है।", expectedResponses: ["viral", "infection", "medicine", "rest", "fluids"], hints: ["Diagnose and prescribe"], hintsHindi: ["निदान करें और दवा लिखें"] },
      { prompt: "How many days should I take the medicine?", promptHindi: "मुझे कितने दिन दवा लेनी चाहिए?", expectedResponses: ["days", "week", "complete", "course", "better"], hints: ["Explain medicine duration"], hintsHindi: ["दवा की अवधि बताएं"] }
    ]
  },
  {
    id: 17,
    title: "Pharmacy Counter",
    titleHindi: "फार्मेसी काउंटर",
    yourRole: "Pharmacist",
    yourRoleHindi: "फार्मासिस्ट",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer needs medicine.",
    situationHindi: "एक ग्राहक को दवा चाहिए।",
    difficulty: "beginner",
    category: "Healthcare",
    exchanges: [
      { prompt: "I have a prescription from Dr. Sharma.", promptHindi: "मेरे पास डॉ. शर्मा का प्रिस्क्रिप्शन है।", expectedResponses: ["let me see", "check", "available", "medicines"], hints: ["Check the prescription"], hintsHindi: ["प्रिस्क्रिप्शन देखें"] },
      { prompt: "Do you have all these medicines?", promptHindi: "क्या आपके पास ये सभी दवाएं हैं?", expectedResponses: ["yes", "available", "one", "substitute"], hints: ["Confirm availability"], hintsHindi: ["उपलब्धता की पुष्टि करें"] },
      { prompt: "How should I take these?", promptHindi: "मुझे ये कैसे लेनी चाहिए?", expectedResponses: ["after food", "before", "morning", "night", "times"], hints: ["Explain dosage"], hintsHindi: ["खुराक बताएं"] }
    ]
  },
  {
    id: 18,
    title: "Hospital Reception",
    titleHindi: "अस्पताल रिसेप्शन",
    yourRole: "Receptionist",
    yourRoleHindi: "रिसेप्शनिस्ट",
    partnerRole: "Visitor",
    partnerRoleHindi: "आगंतुक",
    situation: "Someone is asking about a patient.",
    situationHindi: "कोई मरीज़ के बारे में पूछ रहा है।",
    difficulty: "intermediate",
    category: "Healthcare",
    exchanges: [
      { prompt: "I'm looking for my father. He was admitted yesterday.", promptHindi: "मैं अपने पिता को ढूंढ रहा हूँ। उन्हें कल भर्ती किया गया था।", expectedResponses: ["name", "patient name", "ward", "room"], hints: ["Ask for patient name"], hintsHindi: ["मरीज़ का नाम पूछें"] },
      { prompt: "His name is Ramesh Kumar. He had a heart problem.", promptHindi: "उनका नाम रमेश कुमार है। उन्हें दिल की समस्या थी।", expectedResponses: ["room", "ward", "floor", "cardiology"], hints: ["Give room/ward information"], hintsHindi: ["कमरा/वार्ड की जानकारी दें"] },
      { prompt: "What are the visiting hours?", promptHindi: "मिलने का समय क्या है?", expectedResponses: ["visiting hours", "morning", "evening", "time"], hints: ["Tell visiting hours"], hintsHindi: ["मिलने का समय बताएं"] }
    ]
  },
  {
    id: 19,
    title: "Dental Clinic",
    titleHindi: "दंत चिकित्सालय",
    yourRole: "Dentist",
    yourRoleHindi: "दंत चिकित्सक",
    partnerRole: "Patient",
    partnerRoleHindi: "मरीज़",
    situation: "A patient has tooth pain.",
    situationHindi: "एक मरीज़ को दांत में दर्द है।",
    difficulty: "intermediate",
    category: "Healthcare",
    exchanges: [
      { prompt: "Doctor, I have severe pain in my back tooth.", promptHindi: "डॉक्टर, मेरे पिछले दांत में बहुत दर्द है।", expectedResponses: ["let me see", "open", "mouth", "check", "x-ray"], hints: ["Ask to examine"], hintsHindi: ["जांच करने को कहें"] },
      { prompt: "It hurts when I eat something cold or hot.", promptHindi: "जब मैं कुछ ठंडा या गर्म खाता हूँ तो दर्द होता है।", expectedResponses: ["cavity", "filling", "root canal", "treatment"], hints: ["Explain the problem"], hintsHindi: ["समस्या बताएं"] },
      { prompt: "Will the treatment be painful?", promptHindi: "क्या इलाज में दर्द होगा?", expectedResponses: ["anesthesia", "numb", "pain free", "comfortable"], hints: ["Reassure about pain"], hintsHindi: ["दर्द के बारे में आश्वस्त करें"] }
    ]
  },
  {
    id: 20,
    title: "Eye Clinic",
    titleHindi: "आँखों का क्लिनिक",
    yourRole: "Optometrist",
    yourRoleHindi: "ऑप्टोमेट्रिस्ट",
    partnerRole: "Patient",
    partnerRoleHindi: "मरीज़",
    situation: "A patient needs eye checkup.",
    situationHindi: "एक मरीज़ को आँखों की जांच चाहिए।",
    difficulty: "intermediate",
    category: "Healthcare",
    exchanges: [
      { prompt: "I'm having trouble reading small text.", promptHindi: "मुझे छोटे अक्षर पढ़ने में परेशानी हो रही है।", expectedResponses: ["test", "check", "vision", "chart", "read"], hints: ["Start eye examination"], hintsHindi: ["आँखों की जांच शुरू करें"] },
      { prompt: "Do I need glasses?", promptHindi: "क्या मुझे चश्मा चाहिए?", expectedResponses: ["yes", "glasses", "reading", "prescription", "power"], hints: ["Explain if glasses needed"], hintsHindi: ["बताएं कि चश्मा चाहिए या नहीं"] },
      { prompt: "How often should I get my eyes checked?", promptHindi: "मुझे कितनी बार आँखों की जांच करानी चाहिए?", expectedResponses: ["yearly", "annually", "regular", "checkup"], hints: ["Recommend checkup frequency"], hintsHindi: ["जांच की आवृत्ति बताएं"] }
    ]
  },
  // ==================== TRAVEL & TRANSPORTATION (21-40) ====================
  {
    id: 21,
    title: "Train Ticket Booking",
    titleHindi: "ट्रेन टिकट बुकिंग",
    yourRole: "Ticket Clerk",
    yourRoleHindi: "टिकट क्लर्क",
    partnerRole: "Passenger",
    partnerRoleHindi: "यात्री",
    situation: "A passenger wants to book train tickets.",
    situationHindi: "एक यात्री ट्रेन टिकट बुक करना चाहता है।",
    difficulty: "intermediate",
    category: "Travel",
    exchanges: [
      { prompt: "I want two tickets to Delhi for tomorrow.", promptHindi: "मुझे कल के लिए दिल्ली के दो टिकट चाहिए।", expectedResponses: ["which train", "class", "sleeper", "AC", "time"], hints: ["Ask about preferred class"], hintsHindi: ["पसंदीदा क्लास पूछें"] },
      { prompt: "I prefer AC 3-tier. What's the fare?", promptHindi: "मुझे AC 3-tier पसंद है। किराया क्या है?", expectedResponses: ["rupees", "fare", "cost", "price", "per person"], hints: ["Tell the ticket price"], hintsHindi: ["टिकट की कीमत बताएं"] },
      { prompt: "Can I get window seats?", promptHindi: "क्या मुझे खिड़की वाली सीटें मिल सकती हैं?", expectedResponses: ["yes", "available", "check", "window", "seat"], hints: ["Check seat availability"], hintsHindi: ["सीट उपलब्धता जांचें"] }
    ]
  },
  {
    id: 22,
    title: "Airport Check-in",
    titleHindi: "एयरपोर्ट चेक-इन",
    yourRole: "Airline Staff",
    yourRoleHindi: "एयरलाइन स्टाफ",
    partnerRole: "Passenger",
    partnerRoleHindi: "यात्री",
    situation: "A passenger is checking in for a flight.",
    situationHindi: "एक यात्री फ्लाइट के लिए चेक-इन कर रहा है।",
    difficulty: "intermediate",
    category: "Travel",
    exchanges: [
      { prompt: "I'm here to check in for the Mumbai flight.", promptHindi: "मैं मुंबई फ्लाइट के लिए चेक-इन करने आया हूँ।", expectedResponses: ["passport", "ticket", "booking", "ID", "confirmation"], hints: ["Ask for documents"], hintsHindi: ["दस्तावेज़ मांगें"] },
      { prompt: "I have two bags to check in.", promptHindi: "मेरे पास चेक-इन के लिए दो बैग हैं।", expectedResponses: ["weight", "kg", "limit", "excess", "baggage"], hints: ["Explain baggage rules"], hintsHindi: ["सामान के नियम बताएं"] },
      { prompt: "Can I get an aisle seat?", promptHindi: "क्या मुझे गलियारे वाली सीट मिल सकती है?", expectedResponses: ["yes", "available", "aisle", "seat", "assigned"], hints: ["Assign the seat"], hintsHindi: ["सीट आवंटित करें"] }
    ]
  },
  {
    id: 23,
    title: "Hotel Reception",
    titleHindi: "होटल रिसेप्शन",
    yourRole: "Receptionist",
    yourRoleHindi: "रिसेप्शनिस्ट",
    partnerRole: "Guest",
    partnerRoleHindi: "मेहमान",
    situation: "A guest is checking into a hotel.",
    situationHindi: "एक मेहमान होटल में चेक-इन कर रहा है।",
    difficulty: "beginner",
    category: "Travel",
    exchanges: [
      { prompt: "I have a reservation under the name Sharma.", promptHindi: "मेरा शर्मा नाम से आरक्षण है।", expectedResponses: ["yes", "found", "reservation", "room", "nights"], hints: ["Confirm the reservation"], hintsHindi: ["आरक्षण की पुष्टि करें"] },
      { prompt: "Is breakfast included?", promptHindi: "क्या नाश्ता शामिल है?", expectedResponses: ["yes", "included", "breakfast", "complimentary", "buffet"], hints: ["Explain breakfast details"], hintsHindi: ["नाश्ते का विवरण बताएं"] },
      { prompt: "What time is checkout?", promptHindi: "चेकआउट का समय क्या है?", expectedResponses: ["checkout", "time", "noon", "12", "AM", "PM"], hints: ["Tell checkout time"], hintsHindi: ["चेकआउट का समय बताएं"] }
    ]
  },
  {
    id: 24,
    title: "Auto Rickshaw Ride",
    titleHindi: "ऑटो रिक्शा की सवारी",
    yourRole: "Auto Driver",
    yourRoleHindi: "ऑटो ड्राइवर",
    partnerRole: "Passenger",
    partnerRoleHindi: "यात्री",
    situation: "A passenger needs an auto ride.",
    situationHindi: "एक यात्री को ऑटो की सवारी चाहिए।",
    difficulty: "beginner",
    category: "Travel",
    exchanges: [
      { prompt: "Will you go to City Mall?", promptHindi: "क्या आप सिटी मॉल जाएंगे?", expectedResponses: ["yes", "sure", "okay", "sit", "come"], hints: ["Accept or decline the ride"], hintsHindi: ["सवारी स्वीकार या अस्वीकार करें"] },
      { prompt: "How much will it cost?", promptHindi: "कितना लगेगा?", expectedResponses: ["rupees", "fare", "meter", "fixed", "price"], hints: ["Quote the fare"], hintsHindi: ["किराया बताएं"] },
      { prompt: "Please go by the main road, it's faster.", promptHindi: "कृपया मुख्य सड़क से जाइए, यह तेज़ है।", expectedResponses: ["okay", "sure", "main road", "faster", "traffic"], hints: ["Respond to route suggestion"], hintsHindi: ["रास्ते के सुझाव पर जवाब दें"] }
    ]
  },
  {
    id: 25,
    title: "Bus Conductor",
    titleHindi: "बस कंडक्टर",
    yourRole: "Conductor",
    yourRoleHindi: "कंडक्टर",
    partnerRole: "Passenger",
    partnerRoleHindi: "यात्री",
    situation: "Collecting bus fare from passengers.",
    situationHindi: "यात्रियों से बस का किराया लेना।",
    difficulty: "beginner",
    category: "Travel",
    exchanges: [
      { prompt: "One ticket to Central Station, please.", promptHindi: "सेंट्रल स्टेशन का एक टिकट, कृपया।", expectedResponses: ["rupees", "fare", "ticket", "here", "change"], hints: ["Give the ticket and fare"], hintsHindi: ["टिकट और किराया दें"] },
      { prompt: "Does this bus stop at the hospital?", promptHindi: "क्या यह बस अस्पताल पर रुकती है?", expectedResponses: ["yes", "no", "stop", "next", "after"], hints: ["Confirm the stop"], hintsHindi: ["स्टॉप की पुष्टि करें"] },
      { prompt: "Please tell me when my stop comes.", promptHindi: "कृपया मुझे बताइए जब मेरा स्टॉप आए।", expectedResponses: ["okay", "sure", "tell", "remind", "stop"], hints: ["Agree to remind"], hintsHindi: ["याद दिलाने के लिए सहमत हों"] }
    ]
  },
  // ==================== BANKING & FINANCE (26-35) ====================
  {
    id: 26,
    title: "Bank Account Opening",
    titleHindi: "बैंक खाता खोलना",
    yourRole: "Bank Officer",
    yourRoleHindi: "बैंक अधिकारी",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer wants to open a bank account.",
    situationHindi: "एक ग्राहक बैंक खाता खोलना चाहता है।",
    difficulty: "intermediate",
    category: "Finance",
    exchanges: [
      { prompt: "I want to open a savings account.", promptHindi: "मैं एक बचत खाता खोलना चाहता हूँ।", expectedResponses: ["documents", "ID", "proof", "address", "form"], hints: ["Ask for required documents"], hintsHindi: ["आवश्यक दस्तावेज़ मांगें"] },
      { prompt: "What is the minimum balance?", promptHindi: "न्यूनतम बैलेंस क्या है?", expectedResponses: ["rupees", "minimum", "balance", "maintain", "required"], hints: ["Explain minimum balance"], hintsHindi: ["न्यूनतम बैलेंस बताएं"] },
      { prompt: "Do I get a debit card?", promptHindi: "क्या मुझे डेबिट कार्ड मिलेगा?", expectedResponses: ["yes", "debit card", "ATM", "days", "delivered"], hints: ["Explain debit card process"], hintsHindi: ["डेबिट कार्ड प्रक्रिया बताएं"] }
    ]
  },
  {
    id: 27,
    title: "ATM Assistance",
    titleHindi: "ATM सहायता",
    yourRole: "Bank Guard",
    yourRoleHindi: "बैंक गार्ड",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "Helping a customer use the ATM.",
    situationHindi: "ग्राहक को ATM इस्तेमाल करने में मदद करना।",
    difficulty: "beginner",
    category: "Finance",
    exchanges: [
      { prompt: "I don't know how to use this ATM.", promptHindi: "मुझे नहीं पता कि इस ATM का उपयोग कैसे करें।", expectedResponses: ["insert", "card", "help", "show", "first"], hints: ["Offer to help"], hintsHindi: ["मदद की पेशकश करें"] },
      { prompt: "The machine ate my card!", promptHindi: "मशीन ने मेरा कार्ड खा लिया!", expectedResponses: ["don't worry", "bank", "tomorrow", "retrieve", "help"], hints: ["Calm them and explain process"], hintsHindi: ["शांत करें और प्रक्रिया बताएं"] },
      { prompt: "Is there a withdrawal limit?", promptHindi: "क्या निकासी की सीमा है?", expectedResponses: ["yes", "limit", "per day", "rupees", "maximum"], hints: ["Explain withdrawal limits"], hintsHindi: ["निकासी सीमा बताएं"] }
    ]
  },
  {
    id: 28,
    title: "Loan Inquiry",
    titleHindi: "लोन पूछताछ",
    yourRole: "Loan Officer",
    yourRoleHindi: "लोन अधिकारी",
    partnerRole: "Customer",
    partnerRoleHindi: "ग्राहक",
    situation: "A customer inquiring about home loan.",
    situationHindi: "एक ग्राहक होम लोन के बारे में पूछताछ कर रहा है।",
    difficulty: "advanced",
    category: "Finance",
    exchanges: [
      { prompt: "I want to apply for a home loan.", promptHindi: "मैं होम लोन के लिए आवेदन करना चाहता हूँ।", expectedResponses: ["amount", "property", "income", "documents", "eligible"], hints: ["Ask about loan amount needed"], hintsHindi: ["आवश्यक लोन राशि पूछें"] },
      { prompt: "What is the interest rate?", promptHindi: "ब्याज दर क्या है?", expectedResponses: ["percent", "rate", "interest", "floating", "fixed"], hints: ["Explain interest rates"], hintsHindi: ["ब्याज दरें बताएं"] },
      { prompt: "How long is the loan tenure?", promptHindi: "लोन की अवधि कितनी है?", expectedResponses: ["years", "tenure", "maximum", "EMI", "repayment"], hints: ["Explain loan tenure options"], hintsHindi: ["लोन अवधि विकल्प बताएं"] }
    ]
  },
  // ==================== EDUCATION (29-40) ====================
  {
    id: 29,
    title: "School Admission",
    titleHindi: "स्कूल प्रवेश",
    yourRole: "School Admin",
    yourRoleHindi: "स्कूल प्रशासक",
    partnerRole: "Parent",
    partnerRoleHindi: "अभिभावक",
    situation: "A parent inquiring about school admission.",
    situationHindi: "एक अभिभावक स्कूल प्रवेश के बारे में पूछताछ कर रहा है।",
    difficulty: "intermediate",
    category: "Education",
    exchanges: [
      { prompt: "I want to admit my child to class 1.", promptHindi: "मैं अपने बच्चे को कक्षा 1 में दाखिला दिलाना चाहता हूँ।", expectedResponses: ["age", "birth certificate", "documents", "form", "admission"], hints: ["Ask about child's age"], hintsHindi: ["बच्चे की उम्र पूछें"] },
      { prompt: "What are the school fees?", promptHindi: "स्कूल की फीस क्या है?", expectedResponses: ["fees", "rupees", "quarterly", "annual", "includes"], hints: ["Explain fee structure"], hintsHindi: ["फीस संरचना बताएं"] },
      { prompt: "Is there a school bus facility?", promptHindi: "क्या स्कूल बस की सुविधा है?", expectedResponses: ["yes", "bus", "route", "pickup", "drop"], hints: ["Explain bus facility"], hintsHindi: ["बस सुविधा बताएं"] }
    ]
  },
  {
    id: 30,
    title: "Tuition Teacher",
    titleHindi: "ट्यूशन टीचर",
    yourRole: "Teacher",
    yourRoleHindi: "शिक्षक",
    partnerRole: "Student",
    partnerRoleHindi: "छात्र",
    situation: "Teaching a student during tuition.",
    situationHindi: "ट्यूशन के दौरान छात्र को पढ़ाना।",
    difficulty: "beginner",
    category: "Education",
    exchanges: [
      { prompt: "I don't understand this math problem.", promptHindi: "मुझे यह गणित का सवाल समझ नहीं आ रहा।", expectedResponses: ["let me explain", "first", "step", "understand", "show"], hints: ["Offer to explain"], hintsHindi: ["समझाने की पेशकश करें"] },
      { prompt: "Can you give me more practice questions?", promptHindi: "क्या आप मुझे और अभ्यास के सवाल दे सकते हैं?", expectedResponses: ["yes", "practice", "homework", "questions", "solve"], hints: ["Provide practice work"], hintsHindi: ["अभ्यास कार्य दें"] },
      { prompt: "When is the next class?", promptHindi: "अगली क्लास कब है?", expectedResponses: ["tomorrow", "day", "time", "same", "next"], hints: ["Tell next class schedule"], hintsHindi: ["अगली क्लास का समय बताएं"] }
    ]
  },

  // ==================== SOCIAL SITUATIONS (31-50) ====================
  {
    id: 31,
    title: "Birthday Party",
    titleHindi: "जन्मदिन पार्टी",
    yourRole: "Host",
    yourRoleHindi: "मेज़बान",
    partnerRole: "Guest",
    partnerRoleHindi: "मेहमान",
    situation: "Welcoming guests at a birthday party.",
    situationHindi: "जन्मदिन पार्टी में मेहमानों का स्वागत करना।",
    difficulty: "beginner",
    category: "Social",
    exchanges: [
      { prompt: "Happy birthday! Here's a gift for you.", promptHindi: "जन्मदिन मुबारक! यह आपके लिए उपहार है।", expectedResponses: ["thank you", "welcome", "come in", "glad", "happy"], hints: ["Thank them warmly"], hintsHindi: ["गर्मजोशी से धन्यवाद दें"] },
      { prompt: "The decorations look beautiful!", promptHindi: "सजावट बहुत सुंदर लग रही है!", expectedResponses: ["thank you", "glad", "like", "worked hard", "appreciate"], hints: ["Accept the compliment"], hintsHindi: ["तारीफ स्वीकार करें"] },
      { prompt: "When will the cake cutting be?", promptHindi: "केक कटिंग कब होगी?", expectedResponses: ["soon", "minutes", "after", "everyone", "arrives"], hints: ["Tell the time"], hintsHindi: ["समय बताएं"] }
    ]
  },
  {
    id: 32,
    title: "Wedding Reception",
    titleHindi: "शादी का रिसेप्शन",
    yourRole: "Family Member",
    yourRoleHindi: "परिवार का सदस्य",
    partnerRole: "Guest",
    partnerRoleHindi: "मेहमान",
    situation: "Greeting guests at a wedding.",
    situationHindi: "शादी में मेहमानों का अभिवादन करना।",
    difficulty: "intermediate",
    category: "Social",
    exchanges: [
      { prompt: "Congratulations! The bride looks beautiful.", promptHindi: "बधाई हो! दुल्हन बहुत सुंदर लग रही है।", expectedResponses: ["thank you", "blessings", "happy", "glad", "came"], hints: ["Thank and welcome"], hintsHindi: ["धन्यवाद और स्वागत करें"] },
      { prompt: "Where should I put the gift?", promptHindi: "मैं उपहार कहाँ रखूं?", expectedResponses: ["table", "there", "gift area", "show", "this way"], hints: ["Direct to gift area"], hintsHindi: ["उपहार क्षेत्र की ओर निर्देशित करें"] },
      { prompt: "The food is delicious!", promptHindi: "खाना स्वादिष्ट है!", expectedResponses: ["thank you", "glad", "enjoy", "more", "please"], hints: ["Thank and offer more"], hintsHindi: ["धन्यवाद दें और और पेश करें"] }
    ]
  },
  {
    id: 33,
    title: "Neighbor Introduction",
    titleHindi: "पड़ोसी परिचय",
    yourRole: "New Neighbor",
    yourRoleHindi: "नया पड़ोसी",
    partnerRole: "Existing Neighbor",
    partnerRoleHindi: "पुराना पड़ोसी",
    situation: "Meeting new neighbors after moving.",
    situationHindi: "शिफ्ट होने के बाद नए पड़ोसियों से मिलना।",
    difficulty: "beginner",
    category: "Social",
    exchanges: [
      { prompt: "Hello! I'm your new neighbor. We just moved in.", promptHindi: "नमस्ते! मैं आपका नया पड़ोसी हूँ। हम अभी शिफ्ट हुए हैं।", expectedResponses: ["welcome", "nice to meet", "hello", "neighborhood", "help"], hints: ["Welcome them warmly"], hintsHindi: ["गर्मजोशी से स्वागत करें"] },
      { prompt: "Where is the nearest grocery store?", promptHindi: "सबसे नज़दीकी किराना स्टोर कहाँ है?", expectedResponses: ["near", "walking", "minutes", "direction", "show"], hints: ["Give directions"], hintsHindi: ["दिशा-निर्देश दें"] },
      { prompt: "Thank you for being so helpful!", promptHindi: "इतनी मदद के लिए धन्यवाद!", expectedResponses: ["welcome", "anytime", "need", "help", "neighbor"], hints: ["Offer future help"], hintsHindi: ["भविष्य में मदद की पेशकश करें"] }
    ]
  },
  {
    id: 34,
    title: "Apologizing",
    titleHindi: "माफी मांगना",
    yourRole: "Person B",
    yourRoleHindi: "व्यक्ति B",
    partnerRole: "Person A",
    partnerRoleHindi: "व्यक्ति A",
    situation: "Someone is apologizing for a mistake.",
    situationHindi: "कोई गलती के लिए माफी मांग रहा है।",
    difficulty: "beginner",
    category: "Social",
    exchanges: [
      { prompt: "I'm really sorry for being late.", promptHindi: "देर से आने के लिए मुझे सच में खेद है।", expectedResponses: ["okay", "no problem", "happens", "fine", "don't worry"], hints: ["Accept the apology"], hintsHindi: ["माफी स्वीकार करें"] },
      { prompt: "It won't happen again, I promise.", promptHindi: "यह फिर नहीं होगा, मैं वादा करता हूँ।", expectedResponses: ["okay", "trust", "fine", "understand", "good"], hints: ["Acknowledge their promise"], hintsHindi: ["उनके वादे को स्वीकार करें"] },
      { prompt: "Can I make it up to you?", promptHindi: "क्या मैं इसकी भरपाई कर सकता हूँ?", expectedResponses: ["no need", "okay", "fine", "don't worry", "forget"], hints: ["Respond graciously"], hintsHindi: ["विनम्रता से जवाब दें"] }
    ]
  },
  {
    id: 35,
    title: "Giving Directions",
    titleHindi: "रास्ता बताना",
    yourRole: "Local Person",
    yourRoleHindi: "स्थानीय व्यक्ति",
    partnerRole: "Stranger",
    partnerRoleHindi: "अजनबी",
    situation: "Helping someone find their way.",
    situationHindi: "किसी को रास्ता खोजने में मदद करना।",
    difficulty: "beginner",
    category: "Daily Life",
    exchanges: [
      { prompt: "Excuse me, how do I get to the post office?", promptHindi: "माफ़ कीजिए, मैं डाकघर कैसे पहुँचूं?", expectedResponses: ["straight", "turn", "left", "right", "walk"], hints: ["Give clear directions"], hintsHindi: ["स्पष्ट दिशा-निर्देश दें"] },
      { prompt: "Is it far from here?", promptHindi: "क्या यह यहाँ से दूर है?", expectedResponses: ["minutes", "walking", "near", "far", "distance"], hints: ["Tell the distance"], hintsHindi: ["दूरी बताएं"] },
      { prompt: "Thank you so much for your help!", promptHindi: "आपकी मदद के लिए बहुत-बहुत धन्यवाद!", expectedResponses: ["welcome", "no problem", "pleasure", "good luck"], hints: ["Respond politely"], hintsHindi: ["विनम्रता से जवाब दें"] }
    ]
  },
  // ==================== PROFESSIONAL (36-50) ====================
  {
    id: 36,
    title: "Job Interview",
    titleHindi: "नौकरी का इंटरव्यू",
    yourRole: "Interviewer",
    yourRoleHindi: "साक्षात्कारकर्ता",
    partnerRole: "Candidate",
    partnerRoleHindi: "उम्मीदवार",
    situation: "Conducting a job interview.",
    situationHindi: "नौकरी का इंटरव्यू लेना।",
    difficulty: "advanced",
    category: "Professional",
    exchanges: [
      { prompt: "Tell me about yourself.", promptHindi: "अपने बारे में बताइए।", expectedResponses: ["name", "experience", "education", "skills", "background"], hints: ["Listen and ask follow-up"], hintsHindi: ["सुनें और फॉलो-अप पूछें"] },
      { prompt: "Why do you want this job?", promptHindi: "आप यह नौकरी क्यों चाहते हैं?", expectedResponses: ["interested", "growth", "company", "opportunity", "skills"], hints: ["Evaluate their motivation"], hintsHindi: ["उनकी प्रेरणा का मूल्यांकन करें"] },
      { prompt: "Do you have any questions for us?", promptHindi: "क्या आपके पास हमारे लिए कोई सवाल है?", expectedResponses: ["salary", "role", "team", "growth", "benefits"], hints: ["Answer their questions"], hintsHindi: ["उनके सवालों का जवाब दें"] }
    ]
  },
  {
    id: 37,
    title: "Office Meeting",
    titleHindi: "ऑफिस मीटिंग",
    yourRole: "Team Leader",
    yourRoleHindi: "टीम लीडर",
    partnerRole: "Team Member",
    partnerRoleHindi: "टीम सदस्य",
    situation: "Discussing project progress.",
    situationHindi: "प्रोजेक्ट की प्रगति पर चर्चा करना।",
    difficulty: "intermediate",
    category: "Professional",
    exchanges: [
      { prompt: "What's the status of your task?", promptHindi: "आपके कार्य की स्थिति क्या है?", expectedResponses: ["completed", "progress", "working", "done", "pending"], hints: ["Ask for details"], hintsHindi: ["विवरण पूछें"] },
      { prompt: "I'm facing some issues with the code.", promptHindi: "मुझे कोड में कुछ समस्याएं आ रही हैं।", expectedResponses: ["help", "explain", "what", "issue", "solve"], hints: ["Offer assistance"], hintsHindi: ["सहायता की पेशकश करें"] },
      { prompt: "When can you complete it?", promptHindi: "आप इसे कब पूरा कर सकते हैं?", expectedResponses: ["tomorrow", "days", "deadline", "complete", "finish"], hints: ["Set expectations"], hintsHindi: ["अपेक्षाएं निर्धारित करें"] }
    ]
  },
  {
    id: 38,
    title: "Client Call",
    titleHindi: "क्लाइंट कॉल",
    yourRole: "Sales Person",
    yourRoleHindi: "सेल्स पर्सन",
    partnerRole: "Client",
    partnerRoleHindi: "क्लाइंट",
    situation: "Discussing product with a client.",
    situationHindi: "क्लाइंट के साथ उत्पाद पर चर्चा करना।",
    difficulty: "advanced",
    category: "Professional",
    exchanges: [
      { prompt: "I'm interested in your software solution.", promptHindi: "मुझे आपके सॉफ्टवेयर समाधान में रुचि है।", expectedResponses: ["great", "tell", "features", "demo", "show"], hints: ["Explain the product"], hintsHindi: ["उत्पाद के बारे में बताएं"] },
      { prompt: "What's the pricing?", promptHindi: "कीमत क्या है?", expectedResponses: ["plans", "pricing", "monthly", "annual", "discount"], hints: ["Explain pricing options"], hintsHindi: ["मूल्य निर्धारण विकल्प बताएं"] },
      { prompt: "Can we schedule a demo?", promptHindi: "क्या हम एक डेमो शेड्यूल कर सकते हैं?", expectedResponses: ["yes", "available", "time", "schedule", "convenient"], hints: ["Arrange the demo"], hintsHindi: ["डेमो की व्यवस्था करें"] }
    ]
  },
  {
    id: 39,
    title: "Asking for Leave",
    titleHindi: "छुट्टी मांगना",
    yourRole: "Manager",
    yourRoleHindi: "मैनेजर",
    partnerRole: "Employee",
    partnerRoleHindi: "कर्मचारी",
    situation: "An employee requesting leave.",
    situationHindi: "एक कर्मचारी छुट्टी का अनुरोध कर रहा है।",
    difficulty: "intermediate",
    category: "Professional",
    exchanges: [
      { prompt: "I need to take leave next week for a family function.", promptHindi: "मुझे अगले हफ्ते पारिवारिक समारोह के लिए छुट्टी चाहिए।", expectedResponses: ["how many", "days", "when", "dates", "reason"], hints: ["Ask for details"], hintsHindi: ["विवरण पूछें"] },
      { prompt: "I'll complete my pending work before leaving.", promptHindi: "मैं जाने से पहले अपना बाकी काम पूरा कर दूंगा।", expectedResponses: ["good", "okay", "approved", "make sure", "handover"], hints: ["Approve with conditions"], hintsHindi: ["शर्तों के साथ मंजूरी दें"] },
      { prompt: "Thank you for understanding.", promptHindi: "समझने के लिए धन्यवाद।", expectedResponses: ["welcome", "enjoy", "take care", "see you"], hints: ["Wish them well"], hintsHindi: ["शुभकामनाएं दें"] }
    ]
  },
  {
    id: 40,
    title: "Technical Support",
    titleHindi: "तकनीकी सहायता",
    yourRole: "IT Support",
    yourRoleHindi: "IT सपोर्ट",
    partnerRole: "User",
    partnerRoleHindi: "उपयोगकर्ता",
    situation: "Helping with computer issues.",
    situationHindi: "कंप्यूटर समस्याओं में मदद करना।",
    difficulty: "intermediate",
    category: "Professional",
    exchanges: [
      { prompt: "My computer is running very slow.", promptHindi: "मेरा कंप्यूटर बहुत धीमा चल रहा है।", expectedResponses: ["restart", "check", "programs", "memory", "virus"], hints: ["Suggest basic troubleshooting"], hintsHindi: ["बुनियादी समस्या निवारण सुझाएं"] },
      { prompt: "I tried restarting but it didn't help.", promptHindi: "मैंने रीस्टार्ट करने की कोशिश की लेकिन मदद नहीं मिली।", expectedResponses: ["check", "scan", "come", "look", "remote"], hints: ["Offer to check personally"], hintsHindi: ["व्यक्तिगत रूप से जांचने की पेशकश करें"] },
      { prompt: "How long will it take to fix?", promptHindi: "ठीक करने में कितना समय लगेगा?", expectedResponses: ["minutes", "hour", "depends", "check", "soon"], hints: ["Give time estimate"], hintsHindi: ["समय का अनुमान दें"] }
    ]
  },
];

// Utility functions
export const getScenariosByDifficulty = (difficulty: string): RolePlayScenario[] => {
  if (difficulty === "all") return rolePlayScenarios;
  return rolePlayScenarios.filter(scenario => scenario.difficulty === difficulty);
};

export const getScenariosByCategory = (category: string): RolePlayScenario[] => {
  if (category === "all") return rolePlayScenarios;
  return rolePlayScenarios.filter(scenario => scenario.category === category);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(rolePlayScenarios.map(scenario => scenario.category)));
};

export const getRandomScenario = (difficulty?: string, category?: string): RolePlayScenario => {
  let filtered = rolePlayScenarios;
  if (difficulty && difficulty !== "all") {
    filtered = filtered.filter(s => s.difficulty === difficulty);
  }
  if (category && category !== "all") {
    filtered = filtered.filter(s => s.category === category);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export default rolePlayScenarios;
