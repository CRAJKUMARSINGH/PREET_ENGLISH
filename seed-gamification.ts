// Seed Gamification Data - Achievements & Scenarios
import { db } from "./server/db.js";
import { achievements, scenarios } from "./shared/schema.js";

const achievementsData = [
  // Streak Achievements
  { name: 'First Step', nameHindi: 'पहला कदम', description: 'Complete your first lesson', descriptionHindi: 'अपना पहला पाठ पूरा करें', icon: '🎯', xpReward: 10, requirement: JSON.stringify({ type: 'lessons_completed', value: 1 }), category: 'lessons' },
  { name: '3-Day Streak', nameHindi: '3 दिन की स्ट्रीक', description: 'Learn for 3 days in a row', descriptionHindi: 'लगातार 3 दिन सीखें', icon: '🔥', xpReward: 30, requirement: JSON.stringify({ type: 'streak', value: 3 }), category: 'streak' },
  { name: 'Week Warrior', nameHindi: 'सप्ताह योद्धा', description: '7-day learning streak', descriptionHindi: '7 दिन की लर्निंग स्ट्रीक', icon: '⚡', xpReward: 70, requirement: JSON.stringify({ type: 'streak', value: 7 }), category: 'streak' },
  { name: 'Fortnight Fighter', nameHindi: 'पखवाड़ा फाइटर', description: '14-day learning streak', descriptionHindi: '14 दिन की स्ट्रीक', icon: '💪', xpReward: 150, requirement: JSON.stringify({ type: 'streak', value: 14 }), category: 'streak' },
  { name: 'Monthly Master', nameHindi: 'मासिक मास्टर', description: '30-day learning streak', descriptionHindi: '30 दिन की स्ट्रीक', icon: '👑', xpReward: 300, requirement: JSON.stringify({ type: 'streak', value: 30 }), category: 'streak' },
  
  // Lesson Achievements
  { name: 'Getting Started', nameHindi: 'शुरुआत', description: 'Complete 5 lessons', descriptionHindi: '5 पाठ पूरे करें', icon: '📚', xpReward: 25, requirement: JSON.stringify({ type: 'lessons_completed', value: 5 }), category: 'lessons' },
  { name: 'Dedicated Learner', nameHindi: 'समर्पित शिक्षार्थी', description: 'Complete 25 lessons', descriptionHindi: '25 पाठ पूरे करें', icon: '🌟', xpReward: 100, requirement: JSON.stringify({ type: 'lessons_completed', value: 25 }), category: 'lessons' },
  { name: 'Knowledge Seeker', nameHindi: 'ज्ञान साधक', description: 'Complete 50 lessons', descriptionHindi: '50 पाठ पूरे करें', icon: '🎓', xpReward: 200, requirement: JSON.stringify({ type: 'lessons_completed', value: 50 }), category: 'lessons' },
  { name: 'Century Club', nameHindi: 'शतक क्लब', description: 'Complete 100 lessons', descriptionHindi: '100 पाठ पूरे करें', icon: '💯', xpReward: 500, requirement: JSON.stringify({ type: 'lessons_completed', value: 100 }), category: 'lessons' },
  { name: 'Lesson Legend', nameHindi: 'पाठ लीजेंड', description: 'Complete 250 lessons', descriptionHindi: '250 पाठ पूरे करें', icon: '🏆', xpReward: 1000, requirement: JSON.stringify({ type: 'lessons_completed', value: 250 }), category: 'lessons' },
];

const moreAchievements = [
  // Quiz Achievements
  { name: 'Quiz Starter', nameHindi: 'क्विज़ स्टार्टर', description: 'Pass your first quiz', descriptionHindi: 'पहली क्विज़ पास करें', icon: '✅', xpReward: 20, requirement: JSON.stringify({ type: 'quizzes_passed', value: 1 }), category: 'quiz' },
  { name: 'Quiz Pro', nameHindi: 'क्विज़ प्रो', description: 'Pass 10 quizzes', descriptionHindi: '10 क्विज़ पास करें', icon: '🧠', xpReward: 150, requirement: JSON.stringify({ type: 'quizzes_passed', value: 10 }), category: 'quiz' },
  { name: 'Perfect Score', nameHindi: 'परफेक्ट स्कोर', description: 'Get 100% on any quiz', descriptionHindi: 'किसी क्विज़ में 100% लाएं', icon: '💎', xpReward: 100, requirement: JSON.stringify({ type: 'perfect_quiz', value: 1 }), category: 'quiz' },
  
  // XP Achievements
  { name: 'XP Collector', nameHindi: 'XP कलेक्टर', description: 'Earn 500 XP', descriptionHindi: '500 XP कमाएं', icon: '⭐', xpReward: 50, requirement: JSON.stringify({ type: 'xp_earned', value: 500 }), category: 'xp' },
  { name: 'XP Hunter', nameHindi: 'XP हंटर', description: 'Earn 2000 XP', descriptionHindi: '2000 XP कमाएं', icon: '🌠', xpReward: 200, requirement: JSON.stringify({ type: 'xp_earned', value: 2000 }), category: 'xp' },
  { name: 'XP Master', nameHindi: 'XP मास्टर', description: 'Earn 5000 XP', descriptionHindi: '5000 XP कमाएं', icon: '🚀', xpReward: 500, requirement: JSON.stringify({ type: 'xp_earned', value: 5000 }), category: 'xp' },
  
  // Level Achievements
  { name: 'Level 5', nameHindi: 'लेवल 5', description: 'Reach Level 5', descriptionHindi: 'लेवल 5 पर पहुंचें', icon: '🔷', xpReward: 100, requirement: JSON.stringify({ type: 'level', value: 5 }), category: 'level' },
  { name: 'Level 10', nameHindi: 'लेवल 10', description: 'Reach Level 10', descriptionHindi: 'लेवल 10 पर पहुंचें', icon: '🔶', xpReward: 250, requirement: JSON.stringify({ type: 'level', value: 10 }), category: 'level' },
  { name: 'Level 25', nameHindi: 'लेवल 25', description: 'Reach Level 25', descriptionHindi: 'लेवल 25 पर पहुंचें', icon: '💠', xpReward: 500, requirement: JSON.stringify({ type: 'level', value: 25 }), category: 'level' },
  
  // Category Achievements
  { name: 'Grammar Guru', nameHindi: 'ग्रामर गुरु', description: 'Complete all Grammar lessons', descriptionHindi: 'सभी ग्रामर पाठ पूरे करें', icon: '📝', xpReward: 300, requirement: JSON.stringify({ type: 'category_complete', value: 'Grammar' }), category: 'category' },
  { name: 'Business Boss', nameHindi: 'बिजनेस बॉस', description: 'Complete all Business lessons', descriptionHindi: 'सभी बिजनेस पाठ पूरे करें', icon: '💼', xpReward: 300, requirement: JSON.stringify({ type: 'category_complete', value: 'Business' }), category: 'category' },
  { name: 'Idiom Expert', nameHindi: 'मुहावरा विशेषज्ञ', description: 'Complete all Idiom lessons', descriptionHindi: 'सभी मुहावरे पाठ पूरे करें', icon: '🎭', xpReward: 300, requirement: JSON.stringify({ type: 'category_complete', value: 'Idioms' }), category: 'category' },
];

const scenariosData = [
  // Job Interview Scenarios
  {
    title: 'Job Interview - Introduction',
    titleHindi: 'नौकरी इंटरव्यू - परिचय',
    description: 'Practice introducing yourself in a job interview',
    descriptionHindi: 'नौकरी इंटरव्यू में अपना परिचय देने का अभ्यास करें',
    category: 'job_interview',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { role: 'interviewer', text: 'Good morning! Please have a seat. Tell me about yourself.', textHindi: 'सुप्रभात! कृपया बैठिए। अपने बारे में बताइए।' },
      { role: 'you', text: 'Good morning! Thank you. My name is [Name] and I have 3 years of experience in...', textHindi: 'सुप्रभात! धन्यवाद। मेरा नाम [नाम] है और मुझे 3 साल का अनुभव है...' },
      { role: 'interviewer', text: 'Why do you want to work for our company?', textHindi: 'आप हमारी कंपनी में क्यों काम करना चाहते हैं?' },
      { role: 'you', text: 'I admire your company\'s innovation and growth. I believe my skills align well with...', textHindi: 'मैं आपकी कंपनी की नवीनता और विकास की प्रशंसा करता हूं। मुझे लगता है मेरे कौशल...' },
    ]),
    tips: JSON.stringify(['आत्मविश्वास से बोलें', 'आंखों में आंखें डालकर बात करें', 'अपनी उपलब्धियों पर ध्यान दें']),
    xpReward: 40
  },
  {
    title: 'Job Interview - Strengths & Weaknesses',
    titleHindi: 'नौकरी इंटरव्यू - ताकत और कमजोरियां',
    description: 'Practice discussing your strengths and weaknesses',
    descriptionHindi: 'अपनी ताकत और कमजोरियों पर चर्चा का अभ्यास करें',
    category: 'job_interview',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { role: 'interviewer', text: 'What are your greatest strengths?', textHindi: 'आपकी सबसे बड़ी ताकत क्या है?' },
      { role: 'you', text: 'I\'m highly organized and detail-oriented. I also work well under pressure.', textHindi: 'मैं बहुत व्यवस्थित और विस्तार-उन्मुख हूं। मैं दबाव में भी अच्छा काम करता हूं।' },
      { role: 'interviewer', text: 'And what about your weaknesses?', textHindi: 'और आपकी कमजोरियां क्या हैं?' },
      { role: 'you', text: 'I sometimes focus too much on details, but I\'m learning to balance...', textHindi: 'मैं कभी-कभी विवरणों पर बहुत ध्यान देता हूं, लेकिन मैं संतुलन सीख रहा हूं...' },
    ]),
    tips: JSON.stringify(['कमजोरी को सकारात्मक तरीके से बताएं', 'सुधार की बात करें', 'ईमानदार रहें']),
    xpReward: 50
  },
];

const moreScenarios = [
  // Doctor Visit
  {
    title: 'Doctor Visit - Describing Symptoms',
    titleHindi: 'डॉक्टर से मिलना - लक्षण बताना',
    description: 'Practice describing your health symptoms to a doctor',
    descriptionHindi: 'डॉक्टर को अपने स्वास्थ्य लक्षण बताने का अभ्यास करें',
    category: 'doctor_visit',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { role: 'doctor', text: 'Hello, what brings you in today?', textHindi: 'नमस्ते, आज आप यहां क्यों आए हैं?' },
      { role: 'you', text: 'I\'ve been having a headache and fever for two days.', textHindi: 'मुझे दो दिनों से सिरदर्द और बुखार है।' },
      { role: 'doctor', text: 'I see. Do you have any other symptoms?', textHindi: 'समझा। क्या आपको कोई और लक्षण हैं?' },
      { role: 'you', text: 'Yes, I also have a sore throat and body aches.', textHindi: 'हां, मुझे गले में खराश और शरीर में दर्द भी है।' },
    ]),
    tips: JSON.stringify(['लक्षण स्पष्ट रूप से बताएं', 'कब से है यह बताएं', 'दवाई एलर्जी बताएं']),
    xpReward: 35
  },
  // Restaurant
  {
    title: 'Restaurant - Ordering Food',
    titleHindi: 'रेस्टोरेंट - खाना ऑर्डर करना',
    description: 'Practice ordering food at a restaurant',
    descriptionHindi: 'रेस्टोरेंट में खाना ऑर्डर करने का अभ्यास करें',
    category: 'restaurant',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { role: 'waiter', text: 'Good evening! Are you ready to order?', textHindi: 'शुभ संध्या! क्या आप ऑर्डर देने के लिए तैयार हैं?' },
      { role: 'you', text: 'Yes, I\'d like the grilled chicken with vegetables, please.', textHindi: 'हां, मुझे ग्रिल्ड चिकन सब्जियों के साथ चाहिए।' },
      { role: 'waiter', text: 'Would you like anything to drink?', textHindi: 'क्या आप कुछ पीना चाहेंगे?' },
      { role: 'you', text: 'Just water, please. And can I see the dessert menu?', textHindi: 'बस पानी। और क्या मैं डेज़र्ट मेन्यू देख सकता हूं?' },
    ]),
    tips: JSON.stringify(['"I would like" या "I\'d like" का प्रयोग करें', '"Please" कहना न भूलें', 'स्पष्ट बोलें']),
    xpReward: 30
  },
  // Bank
  {
    title: 'Bank - Opening an Account',
    titleHindi: 'बैंक - खाता खोलना',
    description: 'Practice opening a bank account',
    descriptionHindi: 'बैंक खाता खोलने का अभ्यास करें',
    category: 'bank',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { role: 'banker', text: 'Good morning! How can I help you today?', textHindi: 'सुप्रभात! आज मैं आपकी कैसे मदद कर सकता हूं?' },
      { role: 'you', text: 'I\'d like to open a savings account, please.', textHindi: 'मैं एक बचत खाता खोलना चाहता हूं।' },
      { role: 'banker', text: 'Sure. Do you have your ID and address proof?', textHindi: 'ज़रूर। क्या आपके पास आईडी और पता प्रमाण है?' },
      { role: 'you', text: 'Yes, here\'s my passport and utility bill.', textHindi: 'हां, यह रहा मेरा पासपोर्ट और बिजली का बिल।' },
    ]),
    tips: JSON.stringify(['सभी दस्तावेज़ साथ लाएं', 'न्यूनतम बैलेंस पूछें', 'ब्याज दर पूछें']),
    xpReward: 40
  },
  // Shopping
  {
    title: 'Shopping - Asking for Help',
    titleHindi: 'शॉपिंग - मदद मांगना',
    description: 'Practice asking for help while shopping',
    descriptionHindi: 'शॉपिंग करते समय मदद मांगने का अभ्यास करें',
    category: 'shopping',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { role: 'staff', text: 'Hi! Can I help you find something?', textHindi: 'नमस्ते! क्या मैं कुछ खोजने में मदद कर सकता हूं?' },
      { role: 'you', text: 'Yes, I\'m looking for a blue shirt in size medium.', textHindi: 'हां, मैं मीडियम साइज़ में नीली शर्ट ढूंढ रहा हूं।' },
      { role: 'staff', text: 'Let me check. Would you like to try it on?', textHindi: 'मैं देखता हूं। क्या आप इसे पहनकर देखना चाहेंगे?' },
      { role: 'you', text: 'Yes, please. Where is the fitting room?', textHindi: 'हां। ट्रायल रूम कहां है?' },
    ]),
    tips: JSON.stringify(['साइज़ और रंग स्पष्ट बताएं', 'कीमत पूछें', 'रिटर्न पॉलिसी पूछें']),
    xpReward: 30
  },
];

async function seedGamification() {
  console.log('🎮 Seeding Gamification Data...\n');
  
  // Insert Achievements
  const allAchievements = [...achievementsData, ...moreAchievements];
  console.log(`📊 Adding ${allAchievements.length} achievements...`);
  
  for (const achievement of allAchievements) {
    await db.insert(achievements).values(achievement);
  }
  console.log('✅ Achievements added!');
  
  // Insert Scenarios
  const allScenarios = [...scenariosData, ...moreScenarios];
  console.log(`📊 Adding ${allScenarios.length} scenarios...`);
  
  for (const scenario of allScenarios) {
    await db.insert(scenarios).values(scenario);
  }
  console.log('✅ Scenarios added!');
  
  console.log('\n' + '='.repeat(60));
  console.log('🎮 GAMIFICATION DATA SEEDED!');
  console.log('='.repeat(60));
  console.log(`📊 Achievements: ${allAchievements.length}`);
  console.log(`📊 Scenarios: ${allScenarios.length}`);
  console.log('='.repeat(60));
  console.log('\n🎯 Features Added (Sivi-inspired):');
  console.log('   • Daily Streak System');
  console.log('   • XP Points & Levels');
  console.log('   • Achievements/Badges');
  console.log('   • Leaderboard');
  console.log('   • Daily Goals');
  console.log('   • Scenario-Based Practice');
  console.log('   • Progress Analytics');
}

seedGamification()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
