
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || 'preet_english.db').replace('file:', '');
const db = new Database(dbPath);

const LESSONS_TO_ENRICH = [
    // Lesson 5873: Introduce Yourself
    {
        id: 5873,
        title: "Introduce Yourself",
        hindiTitle: "अपना परिचय दें",
        description: "Learn how to present yourself professionally in interviews and new social settings.",
        hindiDescription: "इंटरव्यू और नई सामाजिक परिस्थितियों में खुद को प्रोफेशनल तरीके से पेश करना सीखें।",
        content: {
            blocks: [
                {
                    type: "text",
                    title: "First Impression | पहला प्रभाव",
                    hindiTitle: "पहला प्रभाव",
                    content: "When heading into an interview, your introduction is everything. It's not just about your name, but also about your background and confidence.",
                    hindiContent: "इंटरव्यू में जाते समय, आपका परिचय (introduction) ही सब कुछ होता है। यह सिर्फ आपके नाम के बारे में नहीं है, बल्कि आपकी पृष्ठभूमि और आत्मविश्वास के बारे में भी है।"
                },
                {
                    type: "vocabulary",
                    words: [
                        { word: "Introduce", definition: "Make someone known by name", translation: "परिचय देना", example: "Let me introduce myself.", exampleHindi: "मुझे अपना परिचय देने दें।", pronunciation: "इन-ट्रो-ड्यूस" },
                        { word: "Experience", definition: "Skill gained from doing", translation: "अनुभव", example: "I have two years of experience.", exampleHindi: "मेरे पास दो साल का अनुभव है।", pronunciation: "एक्स-पी-रिएन्स" },
                        { word: "Education", definition: "A system of learning", translation: "शिक्षा", example: "Education is the key to success.", exampleHindi: "शिक्षा सफलता की कुंजी है।", pronunciation: "ए-जु-के-शन" },
                        { word: "Skills", definition: "Ability to do something well", translation: "कौशल/हुनर", example: "Computer skills are very important.", exampleHindi: "कंप्यूटर का हुनर बहुत महत्वपूर्ण है।", pronunciation: "स्कि-ल्स" },
                        { word: "Strengths", definition: "A good or beneficial quality", translation: "ताकत/मजबूत पक्ष", example: "My strength is my hard work.", exampleHindi: "मेरी कड़ी मेहनत मेरी ताकत है।", pronunciation: "स्ट्रेंग्-थ्स" },
                        { word: "Weakness", definition: "A quality or feature regarded as a disadvantage", translation: "कमजोरी", example: "Don't focus on your weakness.", exampleHindi: "अपनी कमजोरी पर ध्यान न दें।", pronunciation: "वीक-नेस" },
                        { word: "Team", definition: "A group of people working together", translation: "टीम", example: "I am a good team player.", exampleHindi: "मैं टीम में अच्छा काम करता हूँ।", pronunciation: "टी-म" },
                        { word: "Goal", definition: "Something that you are trying to achieve", translation: "लक्ष्य", example: "My goal is to learn English in 3 months.", exampleHindi: "मेरा लक्ष्य 3 महीने में इंग्लिश सीखना है।", pronunciation: "गो-ल" },
                        { word: "Graduate", definition: "Completed a degree", translation: "स्नातक", example: "I am a B.A. graduate.", exampleHindi: "मैं बी.ए. स्नातक हूँ।", pronunciation: "ग्रे-जु-एट" },
                        { word: "Position", definition: "A job or post", translation: "पद", example: "This position is perfect for me.", exampleHindi: "यह पद मेरे लिए एकदम सही है।", pronunciation: "पो-जि-शन" },
                        { word: "Confident", definition: "Feeling or showing self-assurance", translation: "आत्मविश्वासी", example: "Be confident during the interview.", exampleHindi: "इंटरव्यू के दौरान आत्मविश्वासी रहें।", pronunciation: "कॉन-फि-डेन्ट" },
                        { word: "Project", definition: "A piece of planned work", translation: "प्रोजेक्ट", example: "I am working on a new project.", exampleHindi: "मैं एक नए प्रोजेक्ट पर काम कर रहा हूँ।", pronunciation: "प्रो-जे-क्ट" }
                    ]
                },
                {
                    type: "text",
                    title: "Simple Introduction | साधारण परिचय",
                    hindiTitle: "साधारण परिचय",
                    content: "**Interviewer**: Hello! Please introduce yourself.\n**Candidate**: Hello Sir! My name is Rahul. I am from Udaipur. I am a Commerce graduate. I have one year of experience in accounting.\n**Interviewer**: Why do you want this job?\n**Candidate**: I want to grow my career in a good company like yours.",
                    hindiContent: "**इंटरव्यूअर**: नमस्ते! कृपया अपना परिचय दें।\n**उम्मीदवार**: नमस्ते सर! मेरा नाम राहुल है। मैं उदयपुर से हूँ। मैंने कॉमर्स में ग्रेजुएशन किया है। मेरे पास अकाउंटिंग (accounting) में एक साल का अनुभव है।\n**इंटरव्यूअर**: आप यह नौकरी क्यों चाहते हैं?\n**उम्मीदवार**: मैं आपकी जैसी अच्छी कंपनी में अपना करियर आगे बढ़ाना चाहता हूँ।"
                },
                {
                    type: "cultural_note",
                    title: "Usage Tip: 'I am from...'",
                    hindiTitle: "उपयोग सुझाव: 'I am from...'",
                    content: "Instead of saying 'I stay in [City]', use 'I am from [City]' during introductions. 'I am from' sounds more professional and refers to your background.",
                    hindiContent: "परिचय के दौरान 'I stay in [City]' कहने के बजाय, 'I am from [City]' का उपयोग करें। 'I am from' अधिक प्रोफेशनल (professional) लगता है और आपकी पृष्ठभूमि के बारे में बताता है।",
                    noteType: "tip"
                },
                {
                    type: "quiz",
                    question: "Which of these is a professional way to start an introduction?",
                    questionHindi: "परिचय शुरू करने का प्रोफेशनल तरीका कौन सा है?",
                    options: ["Hello, my name is...", "Hey, I am...", "What's up, I'm...", "Me is..."],
                    answer: 0,
                    explanation: "'Hello, my name is...' is the most polite and professional way to introduce yourself."
                },
                {
                    type: "quiz",
                    question: "If you have finished your college degree, you are a ____.",
                    questionHindi: "यदि आपने अपनी कॉलेज की डिग्री पूरी कर ली है, तो आप एक ____ हैं।",
                    options: ["Student", "Graduate", "Teacher", "Worker"],
                    answer: 1,
                    explanation: "A person who has completed their degree is called a 'Graduate'."
                },
                {
                    type: "quiz",
                    question: "What does 'Experience' mean in a job context?",
                    questionHindi: "नौकरी के संदर्भ में 'Experience' का क्या अर्थ है?",
                    options: ["आपका नाम", "आपकी उम्र", "आपका पिछला काम और हुनर", "आपका भविष्य"],
                    answer: 2,
                    explanation: "'Experience' refers to the skills and knowledge you gained from previous jobs."
                },
                {
                    type: "quiz",
                    question: "Correct the sentence: 'Me is from Bihar.'",
                    questionHindi: "वाक्य सही करें: 'Me is from Bihar.'",
                    options: ["I am from Bihar", "I is from Bihar", "Me are from Bihar", "Bihar from me"],
                    answer: 0,
                    explanation: "'I' is the correct subject pronoun, and 'am' is the matching helping verb."
                },
                {
                    type: "cultural_note",
                    title: "Common Indian Mistake: 'Myself Rahul'",
                    hindiTitle: "सामान्य भारतीय गलती: 'Myself Rahul'",
                    content: "Never start an introduction with 'Myself [Name]'. It is grammatically incorrect. Always use 'I am [Name]' or 'My name is [Name]'.",
                    hindiContent: "कभी भी 'Myself [Name]' के साथ परिचय शुरू न करें। यह व्याकरण (grammar) की दृष्टि से गलत है। हमेशा 'I am [Name]' या 'My name is [Name]' का उपयोग करें।",
                    noteType: "grammar"
                },
                {
                    type: "speaking",
                    phrase: "Hello, my name is Rahul.",
                    hindiPhrase: "नमस्ते, मेरा नाम राहुल है."
                },
                {
                    type: "speaking",
                    phrase: "I am from Rajasthan.",
                    hindiPhrase: "मैं राजस्थान से हूँ."
                }
            ]
        }
    },
    // Lesson 5874: Where is the hospital?
    {
        id: 5874,
        title: "Where is the hospital?",
        hindiTitle: "अस्पताल कहाँ है?",
        description: "Learn how to ask for directions and navigate a new city with confidence.",
        hindiDescription: "रास्ता पूछना और नए शहर में आत्मविश्वास के साथ घूमना सीखें।",
        content: {
            blocks: [
                {
                    type: "text",
                    title: "Asking the Way | रास्ता पूछना",
                    hindiTitle: "रास्ता पूछना",
                    content: "Finding your way in a new city can be stressful. Learning a few simple English phrases can help you reach your destination without any trouble.",
                    hindiContent: "नए शहर में रास्ता ढूँढना तनावपूर्ण हो सकता है। इंग्लिश के कुछ आसान वाक्यांश सीखने से आप बिना किसी परेशानी के अपनी मंज़िल तक पहुँच सकते हैं।"
                },
                {
                    type: "vocabulary",
                    words: [
                        { word: "Direction", definition: "Path along which someone moves", translation: "दिशा/रास्ता", example: "Which direction is the market?", exampleHindi: "बाज़ार किस दिशा में है?", pronunciation: "डि-रे-क्शन" },
                        { word: "Hospital", definition: "Place for medical treatment", translation: "अस्पताल", example: "The hospital is nearby.", exampleHindi: "अस्पताल पास ही है।", pronunciation: "हॉस्-पि-टल" },
                        { word: "Market", definition: "Place for buying and selling", translation: "बाज़ार", example: "The market is very crowded.", exampleHindi: "बाज़ार में बहुत भीड़ है।", pronunciation: "मा-र्केट" },
                        { word: "Straight", definition: "Without a curve or bend", translation: "सीधा", example: "Go straight for two miles.", exampleHindi: "दो मील सीधा जाएं।", pronunciation: "स्ट्रे-ट" },
                        { word: "Left", definition: "Opposite of right", translation: "बायाँ", example: "Turn left at the next corner.", exampleHindi: "अगले कोने से बाएँ मुड़ें।", pronunciation: "लेफ्-ट" },
                        { word: "Right", definition: "Opposite of left", translation: "दायाँ", example: "Take a right turn now.", exampleHindi: "अब दाएँ मुड़ें।", pronunciation: "रा-इट" },
                        { word: "Near", definition: "Close to", translation: "पास", example: "Is the bank near here?", exampleHindi: "क्या बैंक यहाँ पास में है?", pronunciation: "नि-यर" },
                        { word: "Far", definition: "At a distance", translation: "दूर", example: "My school is very far.", exampleHindi: "मेरा स्कूल बहुत दूर है।", pronunciation: "फा-र" },
                        { word: "Address", definition: "Detail of where someone lives", translation: "पता", example: "Please write your address.", exampleHindi: "कृपया अपना पता लिखें।", pronunciation: "अ-ड्रेस" },
                        { word: "Map", definition: "Diagram of an area", translation: "मैप/नक्शा", example: "Look at the map.", exampleHindi: "मैप पर देखिए।", pronunciation: "मै-प" },
                        { word: "Corner", definition: "Where two roads meet", translation: "कोना", example: "The shop is on the corner.", exampleHindi: "दुकान कोने पर है।", pronunciation: "कॉ-र्नर" },
                        { word: "Road", definition: "Wide way for vehicles", translation: "सड़क", example: "This road is very wide.", exampleHindi: "यह सड़क बहुत चौड़ी है।", pronunciation: "रो-ड" }
                    ]
                },
                {
                    type: "text",
                    title: "Navigation Dialogue | रास्ते की बातचीत",
                    hindiTitle: "रास्ते की बातचीत",
                    content: "**Amit**: Excuse me! Is there a hospital nearby?\n**Stranger**: Yes, go straight and turn left at the signal.\n**Amit**: Is it far from here?\n**Stranger**: No, it is just a 5-minute walk.\n**Amit**: Thank you so much for your help!",
                    hindiContent: "**अमित**: सुनिए! क्या यहाँ कोई पास में अस्पताल है?\n**अजनबी**: हाँ, सीधा जाएं और सिग्नल से बाएँ मुड़ें।\n**अमित**: क्या यह यहाँ से दूर है?\n**अजनबी**: नहीं, यह सिर्फ 5 मिनट पैदल की दूरी पर है।\n**अमित**: आपकी मदद के लिए बहुत-बहुत शुक्रिया!"
                },
                {
                    type: "cultural_note",
                    title: "Usage Tip: 'Excuse me!'",
                    hindiTitle: "उपयोग सुझाव: 'Excuse me!'",
                    content: "Always start your question with 'Excuse me!' when asking a stranger for help. It is the polite way to get someone's attention in English.",
                    hindiContent: "किसी अजनबी से मदद माँगते समय हमेशा 'Excuse me!' से शुरुआत करें। इंग्लिश में किसी का ध्यान अपनी ओर खींचने का यह सबसे विनम्र तरीका है।",
                    noteType: "tip"
                },
                {
                    type: "quiz",
                    question: "What is the polite way to get a stranger's attention?",
                    questionHindi: "अजनबी का ध्यान खींचने का विनम्र तरीका क्या है?",
                    options: ["Hey you!", "Excuse me!", "Listen!", "Stop!"],
                    answer: 1,
                    explanation: "'Excuse me!' is the standard polite phrase used to approach someone you don't know."
                },
                {
                    type: "quiz",
                    question: "If you need to go to the LEFT, which direction is it?",
                    questionHindi: "यदि आपको बाएँ जाना है, तो वह कौन सी दिशा है?",
                    options: ["Right", "Straight", "Left", "Backwards"],
                    answer: 2,
                    explanation: "'Left' means 'बायाँ' in Hindi."
                },
                {
                    type: "quiz",
                    question: "What does 'Nearby' mean?",
                    questionHindi: "'Nearby' का क्या अर्थ है?",
                    options: ["बहुत दूर", "पास ही", "बिल्कुल नहीं", "पता नहीं"],
                    answer: 1,
                    explanation: "'Nearby' means something is close or at a short distance."
                },
                {
                    type: "quiz",
                    question: "Which word means 'Road'?",
                    questionHindi: "कौन सा शब्द 'सड़क' का अर्थ देता है?",
                    options: ["Corner", "Map", "Street", "Hospital"],
                    answer: 2,
                    explanation: "'Street' or 'Road' are common words for a public way in a city."
                },
                {
                    type: "cultural_note",
                    title: "Common Indian Mistake: 'Which side?'",
                    hindiTitle: "सामान्य भारतीय गलती: 'Which side?'",
                    content: "Many Indians ask 'Which side is the bank?'. While understandable, it's more natural to ask 'Where is the bank?' or 'Which direction is the bank?'.",
                    hindiContent: "कई भारतीय पूछते हैं 'Which side is the bank?'. हालांकि यह समझ में आता है, लेकिन 'Where is the bank?' या 'Which direction is the bank?' पूछना अधिक स्वाभाविक है।",
                    noteType: "tip"
                },
                {
                    type: "speaking",
                    phrase: "Is there a hospital nearby?",
                    hindiPhrase: "क्या यहाँ पास में कोई अस्पताल है?"
                },
                {
                    type: "speaking",
                    phrase: "Go straight and turn left.",
                    hindiPhrase: "सीधा जाएं और बाएँ मुड़ें।"
                }
            ]
        }
    },
    // Lesson 5875: How much is this?
    {
        id: 5875,
        title: "How much is this?",
        hindiTitle: "यह कितने का है?",
        description: "Learn how to handle shopping trips and negotiate prices in English with natural ease.",
        hindiDescription: "इंग्लिश में खरीदारी और मोल-भाव को स्वाभाविक रूप से संभालना सीखें।",
        content: {
            blocks: [
                {
                    type: "text",
                    title: "Market Talk | बाज़ार की बातें",
                    hindiTitle: "बाज़ार की बातें",
                    content: "Shopping is not just about buying things; it's about communicating your needs and getting the best value for your money. Let's learn how to shop like a pro in English!",
                    hindiContent: "खरीदारी सिर्फ चीज़ें खरीदने के बारे में नहीं है; यह अपनी ज़रूरतों को बताने और अपने पैसों का सही मूल्य पाने के बारे में है। चलिए सीखते हैं कि इंग्लिश में एक प्रो की तरह खरीदारी कैसे करें!"
                },
                {
                    type: "vocabulary",
                    words: [
                        { word: "Price", definition: "Amount of money for which something is sold", translation: "दाम/कीमत", example: "What is the price?", exampleHindi: "कीमत क्या है?", pronunciation: "प्रा-इस" },
                        { word: "Cost", definition: "Requirement of payment", translation: "लागत/दाम", example: "It costs ten dollars.", exampleHindi: "इसकी कीमत दस डॉलर है।", pronunciation: "कॉस्-ट" },
                        { word: "Cheap", definition: "Low in price", translation: "सस्ता", example: "This market is very cheap.", exampleHindi: "यह बाज़ार बहुत सस्ता है।", pronunciation: "ची-प" },
                        { word: "Expensive", definition: "Costing a lot of money", translation: "महँगा", example: "Gold is very expensive.", exampleHindi: "सोना बहुत महँगा है।", pronunciation: "एक्स-पेन्-सिव" },
                        { word: "Discount", definition: "A deduction from the usual price", translation: "छूट", example: "Can I get a discount?", exampleHindi: "क्या मुझे छूट मिल सकती है?", pronunciation: "डिस्-का-उन्ट" },
                        { word: "Bargain", definition: "Negotiate the price", translation: "मोल-भाव करना", example: "I like to bargain for a good price.", exampleHindi: "मुझे अच्छे दाम के लिए मोल-भाव करना पसंद है।", pronunciation: "बा-र्गेन" },
                        { word: "Buy", definition: "To obtain in exchange for payment", translation: "खरीदना", example: "I want to buy these shoes.", exampleHindi: "मैं ये जूते खरीदना चाहता हूँ।", pronunciation: "बा-य" },
                        { word: "Quality", definition: "Standard of something", translation: "गुणवत्ता", example: "Check the quality before buying.", exampleHindi: "खरीदने से पहले क्वालिटी चेक करें।", pronunciation: "क्वा-लिटी" },
                        { word: "Change", definition: "Lower denomination of money", translation: "खुले पैसे", example: "Do you have change for 100?", exampleHindi: "क्या आपके पास 100 के खुले पैसे हैं?", pronunciation: "चेन्-ज" },
                        { word: "Receipt", definition: "Proof of purchase", translation: "रसीद", example: "Keep your receipt safe.", exampleHindi: "अपनी रसीद सुरक्षित रखें।", pronunciation: "र-सीट" },
                        { word: "Size", definition: "Dimensions of something", translation: "साइज/आकार", example: "This size is too small.", exampleHindi: "यह साइज बहुत छोटा है।", pronunciation: "सा-इज़" },
                        { word: "Color", definition: "Appearance of something", translation: "रंग", example: "I like the blue color.", exampleHindi: "मुझे नीला रंग पसंद है।", pronunciation: "क-लर" }
                    ]
                },
                {
                    type: "text",
                    title: "Negotiation | मोल-भाव",
                    hindiTitle: "मोल-भाव",
                    content: "**Sita**: How much is this dress?\n**Shopkeeper**: It is 1000 rupees.\n**Sita**: That is very expensive! Can you give a discount?\n**Shopkeeper**: Okay, for you, I can do 800 rupees.\n**Sita**: That sounds fair. I will buy it.",
                    hindiContent: "**सीता**: यह ड्रेस कितने की है?\n**दुकानदार**: यह 1000 रुपये की है।\n**सीता**: यह तो बहुत महँगी है! क्या आप कुछ छूट दे सकते हैं?\n**दुकानदार**: ठीक है, आपके लिए, मैं इसे 800 रुपये में दे दूँगा।\n**सीता**: यह सही लग रहा है। मैं इसे खरीद लूँगी।"
                },
                {
                    type: "cultural_note",
                    title: "Cultural Tip: Haggling",
                    hindiTitle: "सांस्कृतिक सुझाव: मोल-भाव (Haggling)",
                    content: "In many Western countries, prices in stores are fixed. But in local markets, especially in India, 'Haggling' or 'Bargaining' is expected and social. Use phrases like 'Is that your best price?' to start.",
                    hindiContent: "कई पश्चिमी देशों में, दुकानों में दाम तय (fixed) होते हैं। लेकिन स्थानीय बाजारों में, खासकर भारत में, 'मोल-भाव' (haggling) की उम्मीद की जाती है। शुरुआत करने के लिए 'Is that your best price?' जैसे वाक्यांशों का उपयोग करें।",
                    noteType: "tip"
                },
                {
                    type: "quiz",
                    question: "What do you call something that costs very little money?",
                    questionHindi: "जिसका दाम बहुत कम हो, उसे आप क्या कहते हैं?",
                    options: ["Expensive", "Cheap", "Quality", "Receipt"],
                    answer: 1,
                    explanation: "'Cheap' means at low price."
                },
                {
                    type: "quiz",
                    question: "Which phrase is used to ask for a lower price?",
                    questionHindi: "कम दाम माँगने के लिए किस वाक्यांश का उपयोग किया जाता है?",
                    options: ["How much is it?", "Can I get a discount?", "I will buy it", "Where is the shop?"],
                    answer: 1,
                    explanation: "'Can I get a discount?' is the standard way to politely ask for a reduction in price."
                },
                {
                    type: "quiz",
                    question: "If a dress is too much money, it is ____.",
                    questionHindi: "यदि कोई ड्रेस बहुत अधिक पैसों की है, तो वह ____ है।",
                    options: ["Cheap", "Expensive", "Small", "Blue"],
                    answer: 1,
                    explanation: "'Expensive' means costing a lot of money."
                },
                {
                    type: "quiz",
                    question: "What is 'Change' in a shop?",
                    questionHindi: "दुकान में 'Change' का क्या मतलब है?",
                    options: ["नए कपड़े", "खुले पैसे (छोटे नोट)", "दुकान बदलना", "रसीद"],
                    answer: 1,
                    explanation: "In a financial context, 'Change' refers to money returned after a payment or coins of lower value."
                },
                {
                    type: "cultural_note",
                    title: "Common Indian Mistake: 'Fixed rate?'",
                    hindiTitle: "सामान्य भारतीय गलती: 'Fixed rate?'",
                    content: "Many Indians ask 'Is it fixed rate?'. A more natural way to ask is 'Is the price fixed?' or 'Are your prices negotiable?'.",
                    hindiContent: "कई भारतीय पूछते हैं 'Is it fixed rate?'. पूछने का अधिक स्वाभाविक तरीका है 'Is the price fixed?' या 'Are your prices negotiable?'.",
                    noteType: "grammar"
                },
                {
                    type: "speaking",
                    phrase: "How much is this?",
                    hindiPhrase: "यह कितने का है?"
                },
                {
                    type: "speaking",
                    phrase: "Can you give me a discount?",
                    hindiPhrase: "क्या आप मुझे कुछ छूट दे सकते हैं?"
                }
            ]
        }
    }
];

async function enrichLessons() {
    console.log('=== ENRICHING LESSONS 5873, 5874, 5875 ===\n');

    const updateLessonStmt = db.prepare(`
    UPDATE lessons 
    SET title = ?, hindi_title = ?, description = ?, hindi_description = ?, content = ?
    WHERE id = ?
  `);

    const deleteVocabStmt = db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?');

    const insertVocabStmt = db.prepare(`
    INSERT INTO vocabulary (lesson_id, word, definition, example, hindi_translation, hindi_pronunciation, example_hindi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    let successCount = 0;

    for (const lesson of LESSONS_TO_ENRICH) {
        try {
            console.log(`Processing Lesson ${lesson.id}: ${lesson.title}...`);

            // 1. Update Lesson
            const result = updateLessonStmt.run(
                lesson.title,
                lesson.hindiTitle,
                lesson.description,
                lesson.hindiDescription,
                JSON.stringify(lesson.content),
                lesson.id
            );

            if (result.changes === 0) {
                console.warn(`⚠️ Lesson ${lesson.id} not found in database. Inserting as new...`);
                // Optional: Insert if not exists, but for enrichment usually we expect it to exist.
                // Let's insert it if it doesn't exist for robustness.
                const insertLessonStmt = db.prepare(`
            INSERT INTO lessons (id, title, hindi_title, description, hindi_description, content, category, difficulty, "order")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
                // Defaulting category/difficulty since we don't have them in the specific enrich object, 
                // but looking at context they are likely "Daily Life" / "Beginner".
                insertLessonStmt.run(
                    lesson.id,
                    lesson.title,
                    lesson.hindiTitle,
                    lesson.description,
                    lesson.hindiDescription,
                    JSON.stringify(lesson.content),
                    "Daily Life", // Default
                    "Beginner",   // Default
                    100           // Default order, will be fixed by other scripts if needed
                );
                console.log(`✅ Created new lesson ${lesson.id}`);
            }

            // 2. Update Vocabulary
            deleteVocabStmt.run(lesson.id);

            const vocabBlock = lesson.content.blocks.find((b: any) => b.type === 'vocabulary');
            if (vocabBlock && vocabBlock.words) {
                for (const w of vocabBlock.words) {
                    insertVocabStmt.run(
                        lesson.id,
                        w.word,
                        w.definition,
                        w.example,
                        w.translation,
                        w.pronunciation,
                        w.exampleHindi
                    );
                }
                console.log(`   Updated ${vocabBlock.words.length} vocabulary words.`);
            }

            console.log(`✅ Successfully enriched Lesson ${lesson.id}`);
            successCount++;
        } catch (err: any) {
            console.error(`❌ Failed to enrich lesson ${lesson.id}:`, err.message);
        }
    }

    console.log(`\n=== ENRICHMENT COMPLETE: ${successCount}/${LESSONS_TO_ENRICH.length} lessons processed ===`);
    db.close();
}

enrichLessons().catch(console.error);
