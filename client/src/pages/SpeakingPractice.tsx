import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SpeakingTopicCard } from "@/components/SpeakingTopicCard";
import { Mic, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Speaking topics data - Think in Hindi, Speak in English approach
const speakingTopics = [
  // Easy Topics
  {
    id: 1,
    title: "Daily Routine",
    hindiTitle: "दिनचर्या के बारे में बात करें",
    difficulty: "Easy" as const,
    emoji: "⏰",
    category: "Daily Life",
    hindiThoughts: [
      "सुबह कितने बजे उठते हो?",
      "नाश्ते में क्या खाते हो?",
      "काम/पढ़ाई कब करते हो?",
      "शाम को क्या करते हो?"
    ],
    sentenceFrames: [
      "I usually wake up at ____.",
      "After that, I ____.",
      "In the afternoon, I ____.",
      "In the evening, I like to ____."
    ],
    modelAnswer: "I usually wake up at 6 AM. After that, I take a shower and have breakfast. In the afternoon, I work at my office. In the evening, I like to spend time with my family.",
    freePrompt: "30 सेकंड के लिए अपनी दिनचर्या के बारे में बोलें।",
    confidenceTip: "Simple sentences बोलना बिल्कुल सही है। Grammar की चिंता मत करो!"
  },
  {
    id: 2,
    title: "Food and Cooking",
    hindiTitle: "खाना और कुकिंग",
    difficulty: "Easy" as const,
    emoji: "🍳",
    category: "Daily Life",
    hindiThoughts: [
      "आपका पसंदीदा खाना क्या है?",
      "यह क्यों पसंद है?",
      "कौन बनाता है?",
      "कब खाते हो?"
    ],
    sentenceFrames: [
      "My favorite food is ____.",
      "I like it because ____.",
      "It is usually prepared by ____.",
      "I eat it when ____."
    ],
    modelAnswer: "My favorite food is dal and rice. I like it because it is simple and healthy. It is usually prepared by my mother. I eat it almost every day for lunch.",
    freePrompt: "अपने पसंदीदा खाने के बारे में 30 सेकंड बोलें।",
    confidenceTip: "Feelings के साथ बोलना important है। Perfect grammar नहीं!"
  },
  {
    id: 3,
    title: "Family and Relationships",
    hindiTitle: "परिवार और रिश्ते",
    difficulty: "Easy" as const,
    emoji: "👨‍👩‍👧‍👦",
    category: "Personal",
    hindiThoughts: [
      "आपके परिवार में कौन-कौन है?",
      "आप किसके सबसे करीब हैं?",
      "परिवार के साथ क्या करते हैं?",
      "परिवार क्यों important है?"
    ],
    sentenceFrames: [
      "I have a ____ family.",
      "I am closest to my ____.",
      "We usually ____ together.",
      "Family is important because ____."
    ],
    modelAnswer: "I have a small family with four members. I am closest to my mother. We usually have dinner together every evening. Family is important because they support me in difficult times.",
    freePrompt: "अपने परिवार के बारे में 30 सेकंड बोलें।",
    confidenceTip: "अपने परिवार के बारे में प्यार से बोलो। यही सबसे natural लगता है।"
  },
  {
    id: 4,
    title: "Festivals and Celebrations",
    hindiTitle: "त्योहार और उत्सव",
    difficulty: "Easy" as const,
    emoji: "🎉",
    category: "Culture",
    hindiThoughts: [
      "आपका पसंदीदा त्योहार कौन सा है?",
      "इसे कैसे मनाते हैं?",
      "क्या खास करते हैं?",
      "यह क्यों पसंद है?"
    ],
    sentenceFrames: [
      "My favorite festival is ____.",
      "We celebrate it by ____.",
      "On this day, we ____.",
      "I love this festival because ____."
    ],
    modelAnswer: "My favorite festival is Diwali. We celebrate it by lighting lamps and bursting crackers. On this day, we wear new clothes and eat sweets. I love this festival because the whole family comes together.",
    freePrompt: "अपने पसंदीदा त्योहार के बारे में 30 सेकंड बोलें।",
    confidenceTip: "त्योहारों की खुशी अपनी आवाज में लाओ!"
  },
  // Medium Topics
  {
    id: 5,
    title: "Time Management",
    hindiTitle: "समय का सदुपयोग",
    difficulty: "Medium" as const,
    emoji: "⏳",
    category: "Professional",
    hindiThoughts: [
      "Time management क्यों जरूरी है?",
      "अगर time waste हो तो क्या होता है?",
      "आप कैसे manage करते हो?",
      "क्या tips दोगे?"
    ],
    sentenceFrames: [
      "Time management is important because ____.",
      "If we waste time, ____.",
      "I try to manage my time by ____.",
      "My advice would be to ____."
    ],
    modelAnswer: "Time management is important because it helps us achieve our goals. If we waste time, we feel stressed and fall behind. I try to manage my time by making a daily schedule. My advice would be to prioritize important tasks first.",
    freePrompt: "Time management पर 60 सेकंड बोलें।",
    confidenceTip: "Reason + Example देना काफी होता है।"
  },
  {
    id: 6,
    title: "Future Technology",
    hindiTitle: "भविष्य की तकनीक",
    difficulty: "Medium" as const,
    emoji: "🤖",
    category: "Technology",
    hindiThoughts: [
      "Technology कैसे बदल रही है?",
      "Future में क्या देखेंगे?",
      "इसका लोगों पर क्या असर होगा?",
      "आपकी राय क्या है?"
    ],
    sentenceFrames: [
      "Technology is changing very fast.",
      "In the future, we may see ____.",
      "This will affect people by ____.",
      "I believe technology will ____."
    ],
    modelAnswer: "Technology is changing very fast. In the future, we may see more AI and automation in daily life. This will affect people by making work easier but also replacing some jobs. I believe technology will help us solve many problems.",
    freePrompt: "Future technology पर 60 सेकंड बोलें।",
    confidenceTip: "Perfect prediction नहीं, opinion important है।"
  },
  {
    id: 7,
    title: "Online Learning",
    hindiTitle: "ऑनलाइन पढ़ाई",
    difficulty: "Medium" as const,
    emoji: "💻",
    category: "Education",
    hindiThoughts: [
      "Online learning के फायदे क्या हैं?",
      "नुकसान क्या हैं?",
      "आपका experience कैसा रहा?",
      "Future में कैसा होगा?"
    ],
    sentenceFrames: [
      "Online learning has many advantages like ____.",
      "However, there are some disadvantages such as ____.",
      "In my experience, ____.",
      "I think in the future, ____."
    ],
    modelAnswer: "Online learning has many advantages like flexibility and access to global resources. However, there are some disadvantages such as lack of personal interaction. In my experience, it requires more self-discipline. I think in the future, it will become more common.",
    freePrompt: "Online learning के बारे में 60 सेकंड बोलें।",
    confidenceTip: "Pros और Cons दोनों बताना balanced answer है।"
  },
  // Hard Topics
  {
    id: 8,
    title: "Environmental Issues",
    hindiTitle: "पर्यावरण की समस्याएं",
    difficulty: "Hard" as const,
    emoji: "🌍",
    category: "Global Issues",
    hindiThoughts: [
      "Main problem क्या है?",
      "इसका reason क्या है?",
      "Society पर क्या असर है?",
      "Solution क्या हो सकता है?"
    ],
    sentenceFrames: [
      "Environmental issues are increasing because ____.",
      "The main causes are ____.",
      "This problem affects society by ____.",
      "In the long run, we must ____."
    ],
    modelAnswer: "Environmental issues are increasing because of industrialization and population growth. The main causes are pollution, deforestation, and excessive use of plastic. This problem affects society by causing health issues and climate change. In the long run, we must adopt sustainable practices and use renewable energy.",
    freePrompt: "किसी एक environmental issue पर 90 सेकंड बोलें।",
    confidenceTip: "Slow बोलना strength है। Clear thinking दिखाओ।"
  },
  {
    id: 9,
    title: "Gender Equality",
    hindiTitle: "लैंगिक समानता",
    difficulty: "Hard" as const,
    emoji: "⚖️",
    category: "Social Issues",
    hindiThoughts: [
      "Gender equality क्या है?",
      "यह क्यों important है?",
      "India में situation कैसी है?",
      "क्या बदलाव चाहिए?"
    ],
    sentenceFrames: [
      "Gender equality means ____.",
      "It is important because ____.",
      "In India, we can see that ____.",
      "To improve this, we need to ____."
    ],
    modelAnswer: "Gender equality means giving equal opportunities to all genders. It is important because everyone deserves respect and equal rights. In India, we can see that women are making progress but still face many challenges. To improve this, we need to change mindsets and provide better education.",
    freePrompt: "Gender equality पर 90 सेकंड बोलें।",
    confidenceTip: "अपनी राय confident तरीके से रखो।"
  },
  // Interview Topics
  {
    id: 10,
    title: "Tell Me About Yourself",
    hindiTitle: "अपना परिचय दें",
    difficulty: "Hard" as const,
    emoji: "👋",
    category: "Interview",
    hindiThoughts: [
      "आपका नाम और background क्या है?",
      "Education/Experience क्या है?",
      "आपकी strengths क्या हैं?",
      "Future goal क्या है?"
    ],
    sentenceFrames: [
      "My name is ____ and I am from ____.",
      "I have completed ____ in ____.",
      "I have ____ years of experience in ____.",
      "My goal is to ____."
    ],
    modelAnswer: "My name is Raj and I am from Delhi. I have completed my graduation in Computer Science. I have 2 years of experience in software development. My goal is to become a senior developer and contribute to innovative projects.",
    freePrompt: "Interview style में अपना परिचय दें (60 सेकंड)।",
    confidenceTip: "Confidence = Clarity + Calm voice। Slow बोलो।"
  },
  {
    id: 11,
    title: "Why Should We Hire You?",
    hindiTitle: "हम आपको क्यों hire करें?",
    difficulty: "Hard" as const,
    emoji: "💼",
    category: "Interview",
    hindiThoughts: [
      "आपकी main strengths क्या हैं?",
      "आप company को क्या दे सकते हो?",
      "आप दूसरों से अलग कैसे हो?",
      "आपका passion क्या है?"
    ],
    sentenceFrames: [
      "I believe I am a good fit because ____.",
      "My key strengths are ____.",
      "I can contribute to your company by ____.",
      "What sets me apart is ____."
    ],
    modelAnswer: "I believe I am a good fit because I have the required skills and enthusiasm. My key strengths are problem-solving and teamwork. I can contribute to your company by bringing fresh ideas and dedication. What sets me apart is my willingness to learn and adapt quickly.",
    freePrompt: "इस interview question का जवाब दें (60 सेकंड)।",
    confidenceTip: "Humble रहो लेकिन confident भी। अपनी value बताओ।"
  },
  {
    id: 12,
    title: "Career Goals",
    hindiTitle: "करियर की योजनाएं",
    difficulty: "Medium" as const,
    emoji: "🎯",
    category: "Interview",
    hindiThoughts: [
      "5 साल में खुद को कहां देखते हो?",
      "यह goal क्यों है?",
      "इसे achieve करने के लिए क्या करोगे?",
      "यह company इसमें कैसे help करेगी?"
    ],
    sentenceFrames: [
      "In five years, I see myself ____.",
      "This goal is important to me because ____.",
      "To achieve this, I plan to ____.",
      "This company can help me by ____."
    ],
    modelAnswer: "In five years, I see myself in a leadership position. This goal is important to me because I want to make a bigger impact. To achieve this, I plan to continuously learn and take on challenging projects. This company can help me by providing growth opportunities.",
    freePrompt: "अपने career goals के बारे में बोलें (60 सेकंड)।",
    confidenceTip: "Realistic goals बताओ। Company से connect करो।"
  },
  // Indian Culture Topics (from 2grok.md)
  {
    id: 13,
    title: "Bollywood Movies and Stars",
    hindiTitle: "बॉलीवुड फिल्में और सितारे",
    difficulty: "Easy" as const,
    emoji: "🎬",
    category: "Indian Culture",
    hindiThoughts: [
      "आपकी पसंदीदा फिल्म कौन सी है?",
      "आपका पसंदीदा actor/actress कौन है?",
      "वह फिल्म क्यों पसंद है?",
      "Bollywood का क्या impact है?"
    ],
    sentenceFrames: [
      "My favorite Bollywood movie is ____.",
      "I like ____ because ____.",
      "The story is about ____.",
      "Bollywood movies are popular because ____."
    ],
    modelAnswer: "My favorite Bollywood movie is 3 Idiots. I like Aamir Khan because he chooses meaningful roles. The story is about friendship and following your passion. Bollywood movies are popular because they have great music and emotional stories.",
    freePrompt: "अपनी पसंदीदा Bollywood फिल्म के बारे में 30 सेकंड बोलें।",
    confidenceTip: "अपनी पसंद के बारे में freely बोलो!"
  },
  {
    id: 14,
    title: "Cricket and Sports in India",
    hindiTitle: "क्रिकेट और भारतीय खेल",
    difficulty: "Easy" as const,
    emoji: "🏏",
    category: "Indian Culture",
    hindiThoughts: [
      "आपका पसंदीदा खेल कौन सा है?",
      "पसंदीदा खिलाड़ी कौन है?",
      "India में cricket इतना popular क्यों है?",
      "आखिरी match कब देखा?"
    ],
    sentenceFrames: [
      "My favorite sport is ____.",
      "I admire ____ because ____.",
      "Cricket is popular in India because ____.",
      "I last watched a match when ____."
    ],
    modelAnswer: "My favorite sport is cricket. I admire Virat Kohli because of his dedication and passion. Cricket is popular in India because it brings people together and creates excitement. I last watched a match during the World Cup.",
    freePrompt: "Cricket या अपने पसंदीदा खेल के बारे में 30 सेकंड बोलें।",
    confidenceTip: "Sports के बारे में बात करना easy है - बस enjoy करो!"
  },
  {
    id: 15,
    title: "Indian Festivals - Diwali & Holi",
    hindiTitle: "भारतीय त्योहार - दिवाली और होली",
    difficulty: "Easy" as const,
    emoji: "🪔",
    category: "Indian Culture",
    hindiThoughts: [
      "दिवाली/होली कैसे मनाते हो?",
      "क्या special करते हो?",
      "परिवार के साथ कैसे celebrate करते हो?",
      "इन त्योहारों का क्या महत्व है?"
    ],
    sentenceFrames: [
      "Diwali is the festival of ____.",
      "We celebrate by ____.",
      "The best part is ____.",
      "These festivals are important because ____."
    ],
    modelAnswer: "Diwali is the festival of lights. We celebrate by lighting diyas, bursting crackers, and eating sweets. The best part is when the whole family comes together. These festivals are important because they strengthen our bonds and keep our traditions alive.",
    freePrompt: "दिवाली या होली के बारे में 30 सेकंड बोलें।",
    confidenceTip: "त्योहारों की खुशी अपनी आवाज में लाओ!"
  },
  {
    id: 16,
    title: "Indian Food and Regional Cuisines",
    hindiTitle: "भारतीय खाना और क्षेत्रीय व्यंजन",
    difficulty: "Easy" as const,
    emoji: "🍛",
    category: "Indian Culture",
    hindiThoughts: [
      "आपके region का famous खाना क्या है?",
      "घर पर क्या बनता है?",
      "Street food पसंद है?",
      "Indian food special क्यों है?"
    ],
    sentenceFrames: [
      "In my region, ____ is very famous.",
      "At home, we usually eat ____.",
      "My favorite street food is ____.",
      "Indian food is special because ____."
    ],
    modelAnswer: "In my region, Rajasthani dal baati is very famous. At home, we usually eat roti, sabzi, and dal. My favorite street food is pani puri. Indian food is special because of its variety of spices and flavors.",
    freePrompt: "अपने region के खाने के बारे में 30 सेकंड बोलें।",
    confidenceTip: "खाने के बारे में बात करना सबको पसंद है!"
  },
  {
    id: 17,
    title: "Social Media: Pros and Cons",
    hindiTitle: "सोशल मीडिया: फायदे और नुकसान",
    difficulty: "Medium" as const,
    emoji: "📱",
    category: "Technology",
    hindiThoughts: [
      "Social media के फायदे क्या हैं?",
      "नुकसान क्या हैं?",
      "आप कितना use करते हो?",
      "क्या सावधानी रखनी चाहिए?"
    ],
    sentenceFrames: [
      "Social media helps us by ____.",
      "However, it can also ____.",
      "I use social media for ____.",
      "We should be careful about ____."
    ],
    modelAnswer: "Social media helps us by connecting with friends and staying updated. However, it can also waste our time and affect mental health. I use social media for learning and entertainment. We should be careful about privacy and screen time.",
    freePrompt: "Social media के बारे में अपनी राय 60 सेकंड में बताएं।",
    confidenceTip: "Balanced view रखो - दोनों sides बताओ।"
  },
  {
    id: 18,
    title: "UPSC Interview Practice",
    hindiTitle: "UPSC साक्षात्कार अभ्यास",
    difficulty: "Hard" as const,
    emoji: "🇮🇳",
    category: "Interview",
    hindiThoughts: [
      "Civil services में क्यों जाना चाहते हो?",
      "देश के लिए क्या करना चाहते हो?",
      "आपकी preparation कैसी है?",
      "Current affairs पर क्या views हैं?"
    ],
    sentenceFrames: [
      "I want to join civil services because ____.",
      "I believe I can contribute by ____.",
      "The biggest challenge facing India is ____.",
      "As an administrator, I would focus on ____."
    ],
    modelAnswer: "I want to join civil services because I want to serve the nation at the grassroots level. I believe I can contribute by implementing policies effectively. The biggest challenge facing India is unemployment and education quality. As an administrator, I would focus on transparent governance.",
    freePrompt: "UPSC interview style में जवाब दें (90 सेकंड)।",
    confidenceTip: "Confident रहो, देश के बारे में passion दिखाओ।"
  },
  {
    id: 19,
    title: "Digital Banking in India",
    hindiTitle: "भारत में डिजिटल बैंकिंग",
    difficulty: "Medium" as const,
    emoji: "🏧",
    category: "Banking & Finance",
    hindiThoughts: [
      "UPI क्या है और कैसे use करते हो?",
      "Digital banking के फायदे क्या हैं?",
      "क्या risks हैं?",
      "India में कैसे बदलाव आया है?"
    ],
    sentenceFrames: [
      "Digital banking means ____.",
      "I use apps like ____ for ____.",
      "The advantages are ____.",
      "We should be careful about ____."
    ],
    modelAnswer: "Digital banking means doing banking through mobile apps and internet. I use apps like Google Pay and PhonePe for daily payments. The advantages are convenience and instant transfers. We should be careful about sharing OTP and checking transaction details.",
    freePrompt: "Digital banking के बारे में 60 सेकंड बोलें।",
    confidenceTip: "Real examples दो - अपना experience बताओ।"
  },
  {
    id: 20,
    title: "Indian Independence Movement",
    hindiTitle: "भारतीय स्वतंत्रता आंदोलन",
    difficulty: "Hard" as const,
    emoji: "🕊️",
    category: "History",
    hindiThoughts: [
      "कौन से leaders याद हैं?",
      "कौन सी movements important थीं?",
      "आज़ादी का क्या महत्व है?",
      "हमें क्या सीखना चाहिए?"
    ],
    sentenceFrames: [
      "The Indian independence movement was led by ____.",
      "Important movements include ____.",
      "Freedom is important because ____.",
      "We should remember that ____."
    ],
    modelAnswer: "The Indian independence movement was led by great leaders like Gandhi, Nehru, and Subhash Chandra Bose. Important movements include the Salt March and Quit India Movement. Freedom is important because it gave us the right to govern ourselves. We should remember the sacrifices made by our freedom fighters.",
    freePrompt: "स्वतंत्रता आंदोलन के बारे में 90 सेकंड बोलें।",
    confidenceTip: "इतिहास को respect के साथ बोलो।"
  },
  // Practical Daily Life Topics (from 3depseek.md)
  {
    id: 21,
    title: "Emergency and Health Vocabulary",
    hindiTitle: "आपातकालीन और स्वास्थ्य शब्दावली",
    difficulty: "Easy" as const,
    emoji: "🚑",
    category: "Health",
    hindiThoughts: [
      "Doctor को कैसे बताओगे क्या problem है?",
      "Emergency में क्या बोलोगे?",
      "Medicine के बारे में कैसे पूछोगे?",
      "Hospital में क्या बोलना है?"
    ],
    sentenceFrames: [
      "I am not feeling well. I have ____.",
      "I need to see a doctor because ____.",
      "Can you please help me? It's an emergency.",
      "How often should I take this medicine?"
    ],
    modelAnswer: "I am not feeling well. I have a headache and fever. I need to see a doctor because I have been sick for two days. Can you please help me? It's an emergency. How often should I take this medicine?",
    freePrompt: "Doctor से बात करने का अभ्यास करें (30 सेकंड)।",
    confidenceTip: "Health के बारे में clearly बोलना जरूरी है।"
  },
  {
    id: 22,
    title: "Returning or Exchanging an Item",
    hindiTitle: "सामान वापस करना या बदलना",
    difficulty: "Easy" as const,
    emoji: "🛍️",
    category: "Shopping",
    hindiThoughts: [
      "क्या problem है item में?",
      "Receipt है या नहीं?",
      "क्या चाहते हो - refund या exchange?",
      "Politely कैसे बोलोगे?"
    ],
    sentenceFrames: [
      "I would like to return this ____.",
      "The problem is that ____.",
      "I have the receipt. Can I get a ____?",
      "Could you please help me with the exchange?"
    ],
    modelAnswer: "I would like to return this shirt. The problem is that the size doesn't fit me. I have the receipt. Can I get a refund or exchange? Could you please help me with the exchange?",
    freePrompt: "Shop में item return करने का अभ्यास करें (30 सेकंड)।",
    confidenceTip: "Polite रहो लेकिन clear भी। अपनी बात रखो।"
  },
  {
    id: 23,
    title: "Airport and Travel Vocabulary",
    hindiTitle: "एयरपोर्ट और यात्रा शब्दावली",
    difficulty: "Medium" as const,
    emoji: "✈️",
    category: "Travel",
    hindiThoughts: [
      "Check-in कैसे करोगे?",
      "Security पर क्या बोलोगे?",
      "Flight delay हो तो क्या पूछोगे?",
      "Baggage के बारे में कैसे पूछोगे?"
    ],
    sentenceFrames: [
      "I would like to check in for flight ____.",
      "Where is the boarding gate for ____?",
      "My flight is delayed. When is the next update?",
      "I cannot find my luggage. Can you help me?"
    ],
    modelAnswer: "I would like to check in for flight AI-302 to Mumbai. Where is the boarding gate for this flight? My flight is delayed. When is the next update? I cannot find my luggage. Can you help me?",
    freePrompt: "Airport पर बातचीत का अभ्यास करें (60 सेकंड)।",
    confidenceTip: "Travel vocabulary याद रखो - बहुत काम आती है।"
  },
  {
    id: 24,
    title: "Favorite Place to Relax",
    hindiTitle: "आराम करने की पसंदीदा जगह",
    difficulty: "Easy" as const,
    emoji: "🏖️",
    category: "Personal",
    hindiThoughts: [
      "कहां जाकर relax करते हो?",
      "वहां क्या करते हो?",
      "क्यों पसंद है वह जगह?",
      "कितनी बार जाते हो?"
    ],
    sentenceFrames: [
      "My favorite place to relax is ____.",
      "I go there to ____.",
      "I like it because ____.",
      "I visit this place ____."
    ],
    modelAnswer: "My favorite place to relax is a small park near my house. I go there to take a walk and enjoy nature. I like it because it is peaceful and away from noise. I visit this place every evening after work.",
    freePrompt: "अपनी पसंदीदा आराम की जगह के बारे में 30 सेकंड बोलें।",
    confidenceTip: "Personal topics पर बोलना easy है - enjoy करो!"
  },
  {
    id: 25,
    title: "Expressing Inner Emotions",
    hindiTitle: "अपनी भावनाओं को व्यक्त करना",
    difficulty: "Easy" as const,
    emoji: "💔",
    category: "Personal",
    hindiThoughts: [
      "आज कैसा feel कर रहे हो?",
      "खुश/उदास क्यों हो?",
      "किसी से share करना है?",
      "क्या help चाहिए?"
    ],
    sentenceFrames: [
      "Today I am feeling ____.",
      "I feel this way because ____.",
      "I want to share that ____.",
      "It would help me if ____."
    ],
    modelAnswer: "Today I am feeling a bit stressed. I feel this way because I have a lot of work to complete. I want to share that I need some support. It would help me if someone could listen to me.",
    freePrompt: "अपनी feelings के बारे में 30 सेकंड बोलें।",
    confidenceTip: "Emotions express करना strength है, weakness नहीं।"
  }
];

export default function SpeakingPractice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(speakingTopics.map(t => t.category)));
  
  const filteredTopics = speakingTopics.filter(topic => {
    const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.hindiTitle.includes(searchQuery);
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Speaking Practice</h1>
            <p className="text-muted-foreground">🧠 हिंदी में सोचो → 🗣️ English में बोलो</p>
          </div>
        </div>

        {/* Method Explanation */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">🎯 3-Step Speaking Method:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-200 dark:bg-amber-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-amber-800 dark:text-amber-200">1</span>
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-200">🧠 Think</p>
                <p className="text-sm text-amber-700 dark:text-amber-400">हिंदी में सोचें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-200 dark:bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-blue-800 dark:text-blue-200">2</span>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-200">🧩 Frame</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">English frames use करें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-purple-800 dark:text-purple-200">3</span>
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">🎤 Speak</p>
                <p className="text-sm text-purple-700 dark:text-purple-400">बिना डर के बोलें</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Topic खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={cn(
                "px-4 py-2 rounded-xl font-medium transition-all",
                selectedDifficulty === diff
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
            >
              {diff === 'all' ? 'सभी' : diff === 'Easy' ? '😊 आसान' : diff === 'Medium' ? '🙂 मध्यम' : '🧠 कठिन'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            selectedCategory === 'all'
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          सभी Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              selectedCategory === cat
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <SpeakingTopicCard key={topic.id} {...topic} />
        ))}

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p className="text-muted-foreground">कोई topic नहीं मिला</p>
          </div>
        )}
      </div>

      {/* Credits Footer */}
      <footer className="mt-12 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </Layout>
  );
}
