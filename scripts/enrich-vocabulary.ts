/**
 * VOCABULARY ENRICHMENT SCRIPT
 * 
 * Adds 5-10 more vocabulary words to lessons that currently have < 8 words.
 * Uses contextual word generation based on lesson category and content.
 * 
 * Run: npx tsx scripts/enrich-vocabulary.ts
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

// Category-specific vocabulary banks with Hindi translations
const VOCAB_BANKS: Record<string, Array<{
  word: string;
  definition: string;
  example: string;
  hindiTranslation: string;
  hindiPronunciation: string;
  exampleHindi: string;
}>> = {
  'Greetings': [
    { word: 'acknowledge', definition: 'to accept or recognize something', example: 'Please acknowledge my greeting.', hindiTranslation: 'स्वीकार करना', hindiPronunciation: 'sveekar karna', exampleHindi: 'कृपया मेरे अभिवादन को स्वीकार करें।' },
    { word: 'cordial', definition: 'warm and friendly', example: 'She gave me a cordial welcome.', hindiTranslation: 'सौहार्दपूर्ण', hindiPronunciation: 'sauhardpurn', exampleHindi: 'उसने मुझे सौहार्दपूर्ण स्वागत किया।' },
    { word: 'acquaintance', definition: 'a person you know but not well', example: 'He is just an acquaintance, not a close friend.', hindiTranslation: 'परिचित', hindiPronunciation: 'parichit', exampleHindi: 'वह सिर्फ एक परिचित है, करीबी दोस्त नहीं।' },
    { word: 'embrace', definition: 'to hold someone closely in your arms', example: 'They embraced each other warmly.', hindiTranslation: 'गले लगाना', hindiPronunciation: 'gale lagana', exampleHindi: 'उन्होंने एक दूसरे को गर्मजोशी से गले लगाया।' },
    { word: 'gesture', definition: 'a movement of hands or body to express something', example: 'A wave is a friendly gesture.', hindiTranslation: 'इशारा', hindiPronunciation: 'ishara', exampleHindi: 'हाथ हिलाना एक दोस्ताना इशारा है।' },
    { word: 'polite', definition: 'showing good manners and respect', example: 'Always be polite when greeting elders.', hindiTranslation: 'विनम्र', hindiPronunciation: 'vinamra', exampleHindi: 'बड़ों का अभिवादन करते समय हमेशा विनम्र रहें।' },
    { word: 'formal', definition: 'following official or traditional rules', example: 'Use formal greetings in business meetings.', hindiTranslation: 'औपचारिक', hindiPronunciation: 'aupcharik', exampleHindi: 'व्यापारिक बैठकों में औपचारिक अभिवादन का उपयोग करें।' },
    { word: 'casual', definition: 'relaxed and informal', example: 'Hey is a casual greeting among friends.', hindiTranslation: 'अनौपचारिक', hindiPronunciation: 'anaupcharik', exampleHindi: 'हे दोस्तों के बीच एक अनौपचारिक अभिवादन है।' },
  ],
  'Business': [
    { word: 'negotiate', definition: 'to discuss to reach an agreement', example: 'We need to negotiate the contract terms.', hindiTranslation: 'बातचीत करना', hindiPronunciation: 'baatcheet karna', exampleHindi: 'हमें अनुबंध की शर्तों पर बातचीत करनी होगी।' },
    { word: 'deadline', definition: 'the latest time by which something must be done', example: 'The project deadline is next Friday.', hindiTranslation: 'समय सीमा', hindiPronunciation: 'samay seema', exampleHindi: 'परियोजना की समय सीमा अगले शुक्रवार है।' },
    { word: 'collaborate', definition: 'to work together with others', example: 'Our teams will collaborate on this project.', hindiTranslation: 'सहयोग करना', hindiPronunciation: 'sahyog karna', exampleHindi: 'हमारी टीमें इस परियोजना पर सहयोग करेंगी।' },
    { word: 'stakeholder', definition: 'a person with interest in a business', example: 'We must inform all stakeholders about the change.', hindiTranslation: 'हितधारक', hindiPronunciation: 'hitdharak', exampleHindi: 'हमें सभी हितधारकों को बदलाव के बारे में सूचित करना होगा।' },
    { word: 'revenue', definition: 'income from business activities', example: 'Our revenue increased by 20% this quarter.', hindiTranslation: 'राजस्व', hindiPronunciation: 'rajasva', exampleHindi: 'इस तिमाही में हमारा राजस्व 20% बढ़ा।' },
    { word: 'strategy', definition: 'a plan to achieve a goal', example: 'We need a new marketing strategy.', hindiTranslation: 'रणनीति', hindiPronunciation: 'ranneeti', exampleHindi: 'हमें एक नई मार्केटिंग रणनीति की जरूरत है।' },
    { word: 'implement', definition: 'to put a plan into action', example: 'We will implement the changes next month.', hindiTranslation: 'लागू करना', hindiPronunciation: 'laagu karna', exampleHindi: 'हम अगले महीने बदलाव लागू करेंगे।' },
    { word: 'proposal', definition: 'a formal suggestion or plan', example: 'Please review my business proposal.', hindiTranslation: 'प्रस्ताव', hindiPronunciation: 'prastaav', exampleHindi: 'कृपया मेरे व्यापार प्रस्ताव की समीक्षा करें।' },
    { word: 'efficiency', definition: 'doing something well without wasting time', example: 'We must improve our efficiency.', hindiTranslation: 'दक्षता', hindiPronunciation: 'dakshata', exampleHindi: 'हमें अपनी दक्षता में सुधार करना होगा।' },
    { word: 'objective', definition: 'a goal or aim', example: 'Our main objective is customer satisfaction.', hindiTranslation: 'उद्देश्य', hindiPronunciation: 'uddeshya', exampleHindi: 'हमारा मुख्य उद्देश्य ग्राहक संतुष्टि है।' },
  ],
  'Shopping': [
    { word: 'discount', definition: 'a reduction in price', example: 'Is there any discount on this item?', hindiTranslation: 'छूट', hindiPronunciation: 'chhoot', exampleHindi: 'क्या इस वस्तु पर कोई छूट है?' },
    { word: 'receipt', definition: 'a paper showing what you bought', example: 'Please keep your receipt for returns.', hindiTranslation: 'रसीद', hindiPronunciation: 'raseed', exampleHindi: 'कृपया वापसी के लिए अपनी रसीद रखें।' },
    { word: 'bargain', definition: 'to negotiate a lower price', example: 'Can I bargain for a better price?', hindiTranslation: 'मोलभाव करना', hindiPronunciation: 'molbhaav karna', exampleHindi: 'क्या मैं बेहतर कीमत के लिए मोलभाव कर सकता हूं?' },
    { word: 'refund', definition: 'money returned for a purchase', example: 'I would like a refund for this defective product.', hindiTranslation: 'वापसी', hindiPronunciation: 'vaapsi', exampleHindi: 'मुझे इस खराब उत्पाद के लिए वापसी चाहिए।' },
    { word: 'warranty', definition: 'a guarantee for product repair', example: 'This phone has a one-year warranty.', hindiTranslation: 'वारंटी', hindiPronunciation: 'warranty', exampleHindi: 'इस फोन पर एक साल की वारंटी है।' },
    { word: 'aisle', definition: 'a passage between shelves in a store', example: 'The milk is in aisle three.', hindiTranslation: 'गलियारा', hindiPronunciation: 'galiyara', exampleHindi: 'दूध गलियारे तीन में है।' },
    { word: 'cashier', definition: 'a person who handles payments', example: 'Please pay at the cashier counter.', hindiTranslation: 'कैशियर', hindiPronunciation: 'cashier', exampleHindi: 'कृपया कैशियर काउंटर पर भुगतान करें।' },
    { word: 'exchange', definition: 'to replace one item with another', example: 'Can I exchange this for a larger size?', hindiTranslation: 'बदलना', hindiPronunciation: 'badalna', exampleHindi: 'क्या मैं इसे बड़े साइज से बदल सकता हूं?' },
  ],
  'Restaurant': [
    { word: 'reservation', definition: 'booking a table in advance', example: 'I have a reservation for two at 7 PM.', hindiTranslation: 'आरक्षण', hindiPronunciation: 'aarakshan', exampleHindi: 'मेरा शाम 7 बजे दो लोगों के लिए आरक्षण है।' },
    { word: 'appetizer', definition: 'a small dish before the main meal', example: 'Would you like to start with an appetizer?', hindiTranslation: 'स्टार्टर', hindiPronunciation: 'starter', exampleHindi: 'क्या आप स्टार्टर से शुरू करना चाहेंगे?' },
    { word: 'beverage', definition: 'a drink', example: 'What beverage would you like?', hindiTranslation: 'पेय पदार्थ', hindiPronunciation: 'pey padaarth', exampleHindi: 'आप कौन सा पेय पदार्थ लेंगे?' },
    { word: 'cuisine', definition: 'a style of cooking', example: 'This restaurant serves Italian cuisine.', hindiTranslation: 'व्यंजन', hindiPronunciation: 'vyanjan', exampleHindi: 'यह रेस्तरां इतालवी व्यंजन परोसता है।' },
    { word: 'portion', definition: 'the amount of food served', example: 'The portions here are very generous.', hindiTranslation: 'हिस्सा', hindiPronunciation: 'hissa', exampleHindi: 'यहां के हिस्से बहुत बड़े हैं।' },
    { word: 'tip', definition: 'extra money given for good service', example: 'Should I leave a tip for the waiter?', hindiTranslation: 'टिप', hindiPronunciation: 'tip', exampleHindi: 'क्या मुझे वेटर को टिप देनी चाहिए?' },
    { word: 'bill', definition: 'the total amount to pay', example: 'Can I have the bill, please?', hindiTranslation: 'बिल', hindiPronunciation: 'bill', exampleHindi: 'क्या मुझे बिल मिल सकता है?' },
    { word: 'complimentary', definition: 'given free of charge', example: 'The bread is complimentary.', hindiTranslation: 'मुफ्त', hindiPronunciation: 'muft', exampleHindi: 'रोटी मुफ्त है।' },
  ],
  'Travel': [
    { word: 'itinerary', definition: 'a planned route or journey', example: 'Here is our travel itinerary.', hindiTranslation: 'यात्रा कार्यक्रम', hindiPronunciation: 'yatra karyakram', exampleHindi: 'यह हमारा यात्रा कार्यक्रम है।' },
    { word: 'destination', definition: 'the place you are going to', example: 'Our destination is Mumbai.', hindiTranslation: 'गंतव्य', hindiPronunciation: 'gantavya', exampleHindi: 'हमारा गंतव्य मुंबई है।' },
    { word: 'boarding', definition: 'getting on a plane or train', example: 'Boarding begins at gate 5.', hindiTranslation: 'बोर्डिंग', hindiPronunciation: 'boarding', exampleHindi: 'बोर्डिंग गेट 5 से शुरू होती है।' },
    { word: 'luggage', definition: 'bags and suitcases for travel', example: 'Please collect your luggage at belt 3.', hindiTranslation: 'सामान', hindiPronunciation: 'saamaan', exampleHindi: 'कृपया अपना सामान बेल्ट 3 से लें।' },
    { word: 'passport', definition: 'official document for international travel', example: 'Do not forget your passport.', hindiTranslation: 'पासपोर्ट', hindiPronunciation: 'passport', exampleHindi: 'अपना पासपोर्ट मत भूलिए।' },
    { word: 'customs', definition: 'the place where bags are checked at borders', example: 'We need to go through customs.', hindiTranslation: 'सीमा शुल्क', hindiPronunciation: 'seema shulk', exampleHindi: 'हमें सीमा शुल्क से गुजरना होगा।' },
    { word: 'departure', definition: 'the act of leaving', example: 'The departure time is 10 AM.', hindiTranslation: 'प्रस्थान', hindiPronunciation: 'prasthaan', exampleHindi: 'प्रस्थान का समय सुबह 10 बजे है।' },
    { word: 'arrival', definition: 'the act of reaching a place', example: 'Expected arrival is at 3 PM.', hindiTranslation: 'आगमन', hindiPronunciation: 'aagaman', exampleHindi: 'अपेक्षित आगमन दोपहर 3 बजे है।' },
  ],
  'Doctor': [
    { word: 'symptom', definition: 'a sign of illness', example: 'What symptoms are you experiencing?', hindiTranslation: 'लक्षण', hindiPronunciation: 'lakshan', exampleHindi: 'आपको क्या लक्षण हो रहे हैं?' },
    { word: 'prescription', definition: 'a doctor\'s written order for medicine', example: 'Here is your prescription.', hindiTranslation: 'नुस्खा', hindiPronunciation: 'nuskha', exampleHindi: 'यह आपका नुस्खा है।' },
    { word: 'diagnosis', definition: 'identifying an illness', example: 'The diagnosis is a mild infection.', hindiTranslation: 'निदान', hindiPronunciation: 'nidaan', exampleHindi: 'निदान हल्का संक्रमण है।' },
    { word: 'appointment', definition: 'a scheduled meeting with a doctor', example: 'I have an appointment at 4 PM.', hindiTranslation: 'अपॉइंटमेंट', hindiPronunciation: 'appointment', exampleHindi: 'मेरी शाम 4 बजे अपॉइंटमेंट है।' },
    { word: 'fever', definition: 'high body temperature', example: 'I have had a fever since yesterday.', hindiTranslation: 'बुखार', hindiPronunciation: 'bukhaar', exampleHindi: 'मुझे कल से बुखार है।' },
    { word: 'allergy', definition: 'a bad reaction to something', example: 'I have an allergy to peanuts.', hindiTranslation: 'एलर्जी', hindiPronunciation: 'allergy', exampleHindi: 'मुझे मूंगफली से एलर्जी है।' },
    { word: 'dosage', definition: 'the amount of medicine to take', example: 'Take the correct dosage twice daily.', hindiTranslation: 'खुराक', hindiPronunciation: 'khuraak', exampleHindi: 'दिन में दो बार सही खुराक लें।' },
    { word: 'checkup', definition: 'a medical examination', example: 'I am here for my annual checkup.', hindiTranslation: 'जांच', hindiPronunciation: 'jaanch', exampleHindi: 'मैं अपनी वार्षिक जांच के लिए आया हूं।' },
  ],
  'DEFAULT': [
    { word: 'understand', definition: 'to know the meaning of something', example: 'Do you understand this sentence?', hindiTranslation: 'समझना', hindiPronunciation: 'samajhna', exampleHindi: 'क्या आप इस वाक्य को समझते हैं?' },
    { word: 'explain', definition: 'to make something clear', example: 'Can you explain this to me?', hindiTranslation: 'समझाना', hindiPronunciation: 'samjhaana', exampleHindi: 'क्या आप मुझे यह समझा सकते हैं?' },
    { word: 'practice', definition: 'to do something repeatedly to improve', example: 'Practice makes perfect.', hindiTranslation: 'अभ्यास', hindiPronunciation: 'abhyaas', exampleHindi: 'अभ्यास से ही सिद्धि मिलती है।' },
    { word: 'improve', definition: 'to make something better', example: 'I want to improve my English.', hindiTranslation: 'सुधारना', hindiPronunciation: 'sudhaarna', exampleHindi: 'मैं अपनी अंग्रेजी सुधारना चाहता हूं।' },
    { word: 'communicate', definition: 'to share information with others', example: 'It is important to communicate clearly.', hindiTranslation: 'संवाद करना', hindiPronunciation: 'samvaad karna', exampleHindi: 'स्पष्ट रूप से संवाद करना महत्वपूर्ण है।' },
    { word: 'confident', definition: 'feeling sure about yourself', example: 'Be confident when you speak.', hindiTranslation: 'आत्मविश्वासी', hindiPronunciation: 'aatmvishwasi', exampleHindi: 'बोलते समय आत्मविश्वासी रहें।' },
    { word: 'fluent', definition: 'able to speak smoothly', example: 'She is fluent in three languages.', hindiTranslation: 'धाराप्रवाह', hindiPronunciation: 'dhaarapravaah', exampleHindi: 'वह तीन भाषाओं में धाराप्रवाह है।' },
    { word: 'vocabulary', definition: 'all the words a person knows', example: 'Reading helps build vocabulary.', hindiTranslation: 'शब्दावली', hindiPronunciation: 'shabdaavali', exampleHindi: 'पढ़ने से शब्दावली बढ़ती है।' },
  ],
};

function getVocabForCategory(category: string): typeof VOCAB_BANKS['DEFAULT'] {
  // Try exact match first
  if (VOCAB_BANKS[category]) {
    return VOCAB_BANKS[category];
  }
  
  // Try partial match
  for (const key of Object.keys(VOCAB_BANKS)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(category.toLowerCase())) {
      return VOCAB_BANKS[key];
    }
  }
  
  return VOCAB_BANKS['DEFAULT'];
}

async function enrichVocabulary() {
  console.log('=== VOCABULARY ENRICHMENT ===\n');

  // Get lessons with < 8 vocab words
  const lessonsToEnrich = db.prepare(`
    SELECT l.id, l.title, l.category, COUNT(v.id) as vocab_count
    FROM lessons l
    LEFT JOIN vocabulary v ON l.id = v.lesson_id
    GROUP BY l.id
    HAVING vocab_count < 8
    ORDER BY vocab_count ASC
    LIMIT 5000
  `).all() as Array<{ id: number; title: string; category: string; vocab_count: number }>;

  console.log(`Found ${lessonsToEnrich.length} lessons needing enrichment\n`);

  const insertStmt = db.prepare(`
    INSERT INTO vocabulary (lesson_id, word, definition, example, hindi_translation, hindi_pronunciation, example_hindi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Check if word already exists for lesson
  const checkStmt = db.prepare(`
    SELECT id FROM vocabulary WHERE lesson_id = ? AND word = ?
  `);

  let totalAdded = 0;
  let lessonsUpdated = 0;

  for (const lesson of lessonsToEnrich) {
    const vocabBank = getVocabForCategory(lesson.category);
    const wordsNeeded = 8 - lesson.vocab_count;
    let addedForLesson = 0;

    // Shuffle vocab bank to get variety
    const shuffled = [...vocabBank].sort(() => Math.random() - 0.5);

    for (const vocab of shuffled) {
      if (addedForLesson >= wordsNeeded) break;

      // Check if word already exists
      const existing = checkStmt.get(lesson.id, vocab.word);
      if (existing) continue;

      try {
        insertStmt.run(
          lesson.id,
          vocab.word,
          vocab.definition,
          vocab.example,
          vocab.hindiTranslation,
          vocab.hindiPronunciation,
          vocab.exampleHindi
        );
        addedForLesson++;
        totalAdded++;
      } catch (err) {
        // Skip duplicates
      }
    }

    if (addedForLesson > 0) {
      lessonsUpdated++;
      if (lessonsUpdated % 100 === 0) {
        console.log(`  Processed ${lessonsUpdated} lessons...`);
      }
    }
  }

  console.log(`\n✅ ENRICHMENT COMPLETE`);
  console.log(`  Lessons updated: ${lessonsUpdated}`);
  console.log(`  Vocabulary words added: ${totalAdded}`);

  db.close();
}

enrichVocabulary().catch(console.error);
