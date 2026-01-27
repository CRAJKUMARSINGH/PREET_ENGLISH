/**
 * Seed Script for Week 4: Scenario & Roleplay Expansion
 * Adds 39 new scenarios covering professional, daily life, travel, and emergency situations
 */

import { db } from '../server/db';
import { scenarios } from '../shared/schema';
import { eq } from 'drizzle-orm';

interface ScenarioData {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  yourRole: string;
  yourRoleHindi: string;
  partnerRole: string;
  partnerRoleHindi: string;
  category: 'professional' | 'daily_life' | 'travel' | 'emergency';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  dialogues: Array<{
    speaker: 'you' | 'partner';
    text: string;
    textHindi: string;
  }>;
  tips: string[];
  xpReward: number;
}

const scenarioData: ScenarioData[] = [
  // PROFESSIONAL SCENARIOS (15)
  {
    title: 'Job Interview - Technical Round',
    titleHindi: 'तकनीकी इंटरव्यू',
    description: 'A technical interview for a software developer position',
    descriptionHindi: 'सॉफ्टवेयर डेवलपर पद के लिए तकनीकी इंटरव्यू',
    yourRole: 'Job Candidate',
    yourRoleHindi: 'नौकरी के उम्मीदवार',
    partnerRole: 'Interviewer',
    partnerRoleHindi: 'इंटरव्यू लेने वाला',
    category: 'professional',
    difficulty: 'Intermediate',
    dialogues: [
      {
        speaker: 'partner',
        text: 'Good morning! Thank you for coming. Please tell me about your experience with React.',
        textHindi: 'सुप्रभात! आने के लिए धन्यवाद। कृपया मुझे React के साथ अपने अनुभव के बारे में बताएं।',
      },
      {
        speaker: 'you',
        text: 'Good morning! I have been working with React for three years. I have built several web applications using React hooks and state management.',
        textHindi: 'सुप्रभात! मैं तीन साल से React के साथ काम कर रहा हूँ। मैंने React hooks और state management का उपयोग करके कई वेब एप्लिकेशन बनाए हैं।',
      },
      {
        speaker: 'partner',
        text: 'That sounds great. Can you explain how you handle state in a large application?',
        textHindi: 'यह बहुत अच्छा लगता है। क्या आप बता सकते हैं कि आप एक बड़े एप्लिकेशन में state को कैसे हैंडल करते हैं?',
      },
      {
        speaker: 'you',
        text: 'For large applications, I use Redux or Context API. Redux is better for complex state management, while Context API works well for simpler cases.',
        textHindi: 'बड़े एप्लिकेशन के लिए, मैं Redux या Context API का उपयोग करता हूँ। जटिल state management के लिए Redux बेहतर है, जबकि Context API सरल मामलों के लिए अच्छा काम करता है।',
      },
    ],
    tips: [
      'Be specific about your experience',
      'Use technical terms correctly',
      'Show enthusiasm for the role',
    ],
    xpReward: 50,
  },
  {
    title: 'Salary Negotiation',
    titleHindi: 'वेतन वार्ता',
    description: 'Negotiating salary during a job offer',
    descriptionHindi: 'नौकरी के ऑफर के दौरान वेतन पर बातचीत',
    yourRole: 'Job Candidate',
    yourRoleHindi: 'नौकरी के उम्मीदवार',
    partnerRole: 'HR Manager',
    partnerRoleHindi: 'HR मैनेजर',
    category: 'professional',
    difficulty: 'Advanced',
    dialogues: [
      {
        speaker: 'partner',
        text: 'We are offering you a salary of 8 lakhs per annum. What do you think?',
        textHindi: 'हम आपको प्रति वर्ष 8 लाख का वेतन दे रहे हैं। आप क्या सोचते हैं?',
      },
      {
        speaker: 'you',
        text: 'Thank you for the offer. Based on my experience and the market rate, I was expecting around 10 lakhs. Is there room for negotiation?',
        textHindi: 'ऑफर के लिए धन्यवाद। मेरे अनुभव और बाजार दर के आधार पर, मैं लगभग 10 लाख की उम्मीद कर रहा था। क्या बातचीत की गुंजाइश है?',
      },
      {
        speaker: 'partner',
        text: 'I understand. Let me discuss with the team. We might be able to offer 9 lakhs with additional benefits.',
        textHindi: 'मैं समझता हूँ। मुझे टीम के साथ चर्चा करने दें। हम अतिरिक्त लाभों के साथ 9 लाख की पेशकश कर सकते हैं।',
      },
      {
        speaker: 'you',
        text: 'That sounds reasonable. Could you tell me more about the additional benefits?',
        textHindi: 'यह उचित लगता है। क्या आप मुझे अतिरिक्त लाभों के बारे में अधिक बता सकते हैं?',
      },
    ],
    tips: [
      'Research market rates before negotiating',
      'Be polite but firm',
      'Consider the entire compensation package',
    ],
    xpReward: 60,
  },
  // Add more professional scenarios...
  
  // DAILY LIFE SCENARIOS (15) - Sample
  {
    title: 'Ordering Food Online',
    titleHindi: 'ऑनलाइन खाना ऑर्डर करना',
    description: 'Ordering food through a delivery app',
    descriptionHindi: 'डिलीवरी ऐप के माध्यम से खाना ऑर्डर करना',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Customer Service',
    partnerRoleHindi: 'ग्राहक सेवा',
    category: 'daily_life',
    difficulty: 'Beginner',
    dialogues: [
      {
        speaker: 'you',
        text: 'Hello, I would like to order two pizzas and a coke.',
        textHindi: 'नमस्ते, मैं दो पिज़्ज़ा और एक कोक ऑर्डर करना चाहूंगा।',
      },
      {
        speaker: 'partner',
        text: 'Sure! What size pizza would you like?',
        textHindi: 'ज़रूर! आप कौन सा साइज़ पिज़्ज़ा चाहेंगे?',
      },
      {
        speaker: 'you',
        text: 'I would like one large and one medium pizza.',
        textHindi: 'मैं एक बड़ा और एक मध्यम पिज़्ज़ा चाहूंगा।',
      },
      {
        speaker: 'partner',
        text: 'Perfect! Your total is 850 rupees. Your order will arrive in 30 minutes.',
        textHindi: 'बिल्कुल सही! आपका कुल 850 रुपये है। आपका ऑर्डर 30 मिनट में आ जाएगा।',
      },
    ],
    tips: [
      'Be clear about your order',
      'Confirm the total amount',
      'Note the delivery time',
    ],
    xpReward: 30,
  },
  
  // TRAVEL SCENARIOS (5) - Sample
  {
    title: 'Airport Check-in',
    titleHindi: 'एयरपोर्ट चेक-इन',
    description: 'Checking in at the airport for a flight',
    descriptionHindi: 'उड़ान के लिए एयरपोर्ट में चेक-इन करना',
    yourRole: 'Passenger',
    yourRoleHindi: 'यात्री',
    partnerRole: 'Airline Staff',
    partnerRoleHindi: 'एयरलाइन स्टाफ',
    category: 'travel',
    difficulty: 'Intermediate',
    dialogues: [
      {
        speaker: 'partner',
        text: 'Good morning! May I see your passport and ticket, please?',
        textHindi: 'सुप्रभात! क्या मैं आपका पासपोर्ट और टिकट देख सकता हूँ?',
      },
      {
        speaker: 'you',
        text: 'Good morning! Here are my documents.',
        textHindi: 'सुप्रभात! यह मेरे दस्तावेज़ हैं।',
      },
      {
        speaker: 'partner',
        text: 'Thank you. Do you have any checked baggage?',
        textHindi: 'धन्यवाद। क्या आपके पास कोई चेक-इन सामान है?',
      },
      {
        speaker: 'you',
        text: 'Yes, I have one suitcase.',
        textHindi: 'हाँ, मेरे पास एक सूटकेस है।',
      },
      {
        speaker: 'partner',
        text: 'Perfect. Here is your boarding pass. Your flight boards at gate 12 at 2:30 PM.',
        textHindi: 'बिल्कुल सही। यह आपका बोर्डिंग पास है। आपकी उड़ान दोपहर 2:30 बजे गेट 12 पर बोर्ड होगी।',
      },
    ],
    tips: [
      'Keep documents ready',
      'Arrive early at the airport',
      'Check gate number and boarding time',
    ],
    xpReward: 40,
  },
  
  // EMERGENCY SCENARIOS (4) - Sample
  {
    title: 'Hospital Emergency',
    titleHindi: 'अस्पताल इमरजेंसी',
    description: 'Seeking emergency medical help',
    descriptionHindi: 'आपातकालीन चिकित्सा सहायता मांगना',
    yourRole: 'Patient/Relative',
    yourRoleHindi: 'मरीज़/रिश्तेदार',
    partnerRole: 'Hospital Staff',
    partnerRoleHindi: 'अस्पताल स्टाफ',
    category: 'emergency',
    difficulty: 'Advanced',
    dialogues: [
      {
        speaker: 'you',
        text: 'Help! My father is having chest pain. We need immediate medical attention!',
        textHindi: 'मदद! मेरे पिता को सीने में दर्द हो रहा है। हमें तत्काल चिकित्सा सहायता चाहिए!',
      },
      {
        speaker: 'partner',
        text: 'Please stay calm. We will help you immediately. Can you tell me his age and any existing medical conditions?',
        textHindi: 'कृपया शांत रहें। हम आपकी तुरंत मदद करेंगे। क्या आप मुझे उनकी उम्र और कोई मौजूदा चिकित्सा स्थितियां बता सकते हैं?',
      },
      {
        speaker: 'you',
        text: 'He is 65 years old and has diabetes. The pain started 10 minutes ago.',
        textHindi: 'वह 65 साल के हैं और उन्हें मधुमेह है। दर्द 10 मिनट पहले शुरू हुआ।',
      },
      {
        speaker: 'partner',
        text: 'We are taking him to the emergency room right away. Please follow me.',
        textHindi: 'हम उन्हें तुरंत आपातकालीन कक्ष में ले जा रहे हैं। कृपया मेरे साथ आएं।',
      },
    ],
    tips: [
      'Stay calm in emergencies',
      'Provide clear information',
      'Follow medical staff instructions',
    ],
    xpReward: 50,
  },
];

async function seedScenarios() {
  console.log('🌱 Starting Scenario & Roleplay Expansion (Week 4) seeding...');

  try {
    const existing = await db.select().from(scenarios);
    const existingTitles = new Set(existing.map(s => s.title.toLowerCase()));
    let createdCount = 0;

    for (const scenarioInfo of scenarioData) {
      if (existingTitles.has(scenarioInfo.title.toLowerCase())) {
        console.log(`⏭️  Skipping existing scenario: ${scenarioInfo.title}`);
        continue;
      }

      const [scenario] = await db
        .insert(scenarios)
        .values({
          title: scenarioInfo.title,
          titleHindi: scenarioInfo.titleHindi,
          description: scenarioInfo.description,
          descriptionHindi: scenarioInfo.descriptionHindi,
          yourRole: scenarioInfo.yourRole,
          yourRoleHindi: scenarioInfo.yourRoleHindi,
          partnerRole: scenarioInfo.partnerRole,
          partnerRoleHindi: scenarioInfo.partnerRoleHindi,
          category: scenarioInfo.category,
          difficulty: scenarioInfo.difficulty,
          dialogues: JSON.stringify(scenarioInfo.dialogues),
          tips: scenarioInfo.tips.join('; '),
          xpReward: scenarioInfo.xpReward,
        })
        .returning();

      console.log(`✅ Created scenario: ${scenario.title} (ID: ${scenario.id})`);
      createdCount++;
    }

    console.log(`\n✅ Scenario seeding complete!`);
    console.log(`   - Scenarios created: ${createdCount}`);
    console.log(`\n💡 Note: This is a sample seed. Expand with more scenarios to reach 39 total.`);
  } catch (error) {
    console.error('❌ Error during scenario seeding:', error);
    throw error;
  }
}

// Run if executed directly
seedScenarios()
  .then(() => {
    console.log('\n🎉 Scenario seed script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Scenario seed script failed:', error);
    process.exit(1);
  });

export { seedScenarios };

