/**
 * ADD SPEAKING EXERCISES TO LESSONS
 * Adds speaking practice exercises to lessons based on category
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

// Speaking exercise templates by category
const SPEAKING_TEMPLATES: Record<string, object[]> = {
  'Greetings': [
    { type: 'repeat', prompt: 'Say: Good morning! How are you today?', promptHindi: 'बोलें: Good morning! How are you today?', expectedText: 'Good morning! How are you today?', difficulty: 'easy' },
    { type: 'respond', prompt: 'Someone says "Hello, nice to meet you." How do you respond?', promptHindi: 'कोई कहता है "Hello, nice to meet you." आप कैसे जवाब देंगे?', expectedText: 'Nice to meet you too', difficulty: 'easy' },
    { type: 'roleplay', prompt: 'Introduce yourself to a new colleague', promptHindi: 'एक नए सहकर्मी से अपना परिचय दें', expectedText: '', difficulty: 'medium' }
  ],
  'Restaurant': [
    { type: 'repeat', prompt: 'Say: I would like to order the chicken curry, please.', promptHindi: 'बोलें: I would like to order the chicken curry, please.', expectedText: 'I would like to order the chicken curry, please.', difficulty: 'easy' },
    { type: 'respond', prompt: 'The waiter asks "Would you like anything to drink?" What do you say?', promptHindi: 'वेटर पूछता है "Would you like anything to drink?" आप क्या कहेंगे?', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Order food for yourself and a friend at a restaurant', promptHindi: 'रेस्तरां में अपने और एक दोस्त के लिए खाना ऑर्डर करें', expectedText: '', difficulty: 'hard' }
  ],
  'Shopping': [
    { type: 'repeat', prompt: 'Say: How much does this cost?', promptHindi: 'बोलें: How much does this cost?', expectedText: 'How much does this cost?', difficulty: 'easy' },
    { type: 'respond', prompt: 'The shopkeeper says the price is too high. How do you bargain?', promptHindi: 'दुकानदार कहता है कीमत बहुत ज्यादा है। आप कैसे मोलभाव करेंगे?', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Return a defective product and ask for a refund', promptHindi: 'एक खराब उत्पाद वापस करें और रिफंड मांगें', expectedText: '', difficulty: 'hard' }
  ],
  'Travel': [
    { type: 'repeat', prompt: 'Say: Excuse me, where is the nearest metro station?', promptHindi: 'बोलें: Excuse me, where is the nearest metro station?', expectedText: 'Excuse me, where is the nearest metro station?', difficulty: 'easy' },
    { type: 'respond', prompt: 'Someone gives you directions. How do you thank them?', promptHindi: 'कोई आपको रास्ता बताता है। आप उन्हें कैसे धन्यवाद देंगे?', expectedText: '', difficulty: 'easy' },
    { type: 'roleplay', prompt: 'Ask for directions to the airport', promptHindi: 'हवाई अड्डे का रास्ता पूछें', expectedText: '', difficulty: 'medium' }
  ],
  'Doctor': [
    { type: 'repeat', prompt: 'Say: I have been feeling unwell for three days.', promptHindi: 'बोलें: I have been feeling unwell for three days.', expectedText: 'I have been feeling unwell for three days.', difficulty: 'easy' },
    { type: 'respond', prompt: 'The doctor asks about your symptoms. Describe a headache and fever.', promptHindi: 'डॉक्टर आपके लक्षणों के बारे में पूछता है। सिरदर्द और बुखार का वर्णन करें।', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Book an appointment with a doctor over the phone', promptHindi: 'फोन पर डॉक्टर से अपॉइंटमेंट बुक करें', expectedText: '', difficulty: 'hard' }
  ],
  'Interview': [
    { type: 'repeat', prompt: 'Say: I am excited about this opportunity to join your team.', promptHindi: 'बोलें: I am excited about this opportunity to join your team.', expectedText: 'I am excited about this opportunity to join your team.', difficulty: 'easy' },
    { type: 'respond', prompt: 'The interviewer asks "Tell me about yourself." Give a brief introduction.', promptHindi: 'साक्षात्कारकर्ता पूछता है "Tell me about yourself." एक संक्षिप्त परिचय दें।', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Answer the question: What is your biggest weakness?', promptHindi: 'सवाल का जवाब दें: आपकी सबसे बड़ी कमजोरी क्या है?', expectedText: '', difficulty: 'hard' }
  ],
  'Hotel': [
    { type: 'repeat', prompt: 'Say: I have a reservation under the name Sharma.', promptHindi: 'बोलें: I have a reservation under the name Sharma.', expectedText: 'I have a reservation under the name Sharma.', difficulty: 'easy' },
    { type: 'respond', prompt: 'The receptionist asks how many nights. Say two nights.', promptHindi: 'रिसेप्शनिस्ट पूछता है कितनी रातें। दो रातें कहें।', expectedText: '', difficulty: 'easy' },
    { type: 'roleplay', prompt: 'Complain about a problem with your hotel room', promptHindi: 'अपने होटल के कमरे में समस्या के बारे में शिकायत करें', expectedText: '', difficulty: 'hard' }
  ],
  'Business': [
    { type: 'repeat', prompt: 'Say: Let us schedule a meeting for next Monday.', promptHindi: 'बोलें: Let us schedule a meeting for next Monday.', expectedText: 'Let us schedule a meeting for next Monday.', difficulty: 'easy' },
    { type: 'respond', prompt: 'Your colleague asks for your opinion on a project. Give feedback.', promptHindi: 'आपका सहकर्मी एक प्रोजेक्ट पर आपकी राय मांगता है। फीडबैक दें।', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Present a project update to your team', promptHindi: 'अपनी टीम को प्रोजेक्ट अपडेट प्रस्तुत करें', expectedText: '', difficulty: 'hard' }
  ],
  'Telephone': [
    { type: 'repeat', prompt: 'Say: Hello, may I speak to Mr. Kumar please?', promptHindi: 'बोलें: Hello, may I speak to Mr. Kumar please?', expectedText: 'Hello, may I speak to Mr. Kumar please?', difficulty: 'easy' },
    { type: 'respond', prompt: 'The person is not available. Leave a message.', promptHindi: 'व्यक्ति उपलब्ध नहीं है। एक संदेश छोड़ें।', expectedText: '', difficulty: 'medium' },
    { type: 'roleplay', prompt: 'Call customer service to report a problem', promptHindi: 'समस्या की रिपोर्ट करने के लिए कस्टमर सर्विस को कॉल करें', expectedText: '', difficulty: 'hard' }
  ],
  'DEFAULT': [
    { type: 'repeat', prompt: 'Say: Could you please help me with this?', promptHindi: 'बोलें: Could you please help me with this?', expectedText: 'Could you please help me with this?', difficulty: 'easy' },
    { type: 'respond', prompt: 'Someone thanks you for your help. How do you respond?', promptHindi: 'कोई आपकी मदद के लिए धन्यवाद देता है। आप कैसे जवाब देंगे?', expectedText: '', difficulty: 'easy' },
    { type: 'roleplay', prompt: 'Practice introducing yourself in English', promptHindi: 'अंग्रेजी में अपना परिचय देने का अभ्यास करें', expectedText: '', difficulty: 'medium' }
  ]
};

function getExercisesForCategory(category: string): object[] {
  if (SPEAKING_TEMPLATES[category]) {
    return SPEAKING_TEMPLATES[category];
  }
  for (const key of Object.keys(SPEAKING_TEMPLATES)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return SPEAKING_TEMPLATES[key];
    }
  }
  return SPEAKING_TEMPLATES['DEFAULT'];
}

async function addSpeakingExercises() {
  console.log('=== ADDING SPEAKING EXERCISES TO LESSONS ===\n');

  // Get lessons without speaking exercises (limit to 500 for this batch)
  const lessons = db.prepare(`
    SELECT id, title, category 
    FROM lessons 
    WHERE speaking_exercises IS NULL OR speaking_exercises = ''
    LIMIT 10000
  `).all() as Array<{ id: number; title: string; category: string }>;

  console.log(`Found ${lessons.length} lessons without speaking exercises\n`);

  const updateStmt = db.prepare(`
    UPDATE lessons SET speaking_exercises = ? WHERE id = ?
  `);

  let updated = 0;
  for (const lesson of lessons) {
    const exercises = getExercisesForCategory(lesson.category);
    const exercisesJson = JSON.stringify(exercises);
    
    updateStmt.run(exercisesJson, lesson.id);
    updated++;
    
    if (updated % 100 === 0) {
      console.log(`  Processed ${updated} lessons...`);
    }
  }

  console.log(`\n✅ COMPLETE: ${updated} lessons updated with speaking exercises`);
  db.close();
}

addSpeakingExercises().catch(console.error);
