/**
 * SCENARIOS SEEDER
 * Adds 25 roleplay scenarios for speaking practice
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

const SCENARIOS = [
  {
    title: 'Job Interview - Software Developer',
    titleHindi: 'नौकरी का इंटरव्यू - सॉफ्टवेयर डेवलपर',
    description: 'Practice answering common interview questions for a tech job',
    descriptionHindi: 'टेक जॉब के लिए सामान्य इंटरव्यू प्रश्नों का उत्तर देने का अभ्यास करें',
    yourRole: 'Job Candidate',
    yourRoleHindi: 'नौकरी का उम्मीदवार',
    partnerRole: 'HR Manager',
    partnerRoleHindi: 'एचआर मैनेजर',
    category: 'Interview',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'HR', text: 'Good morning! Please have a seat. Tell me about yourself.', textHindi: 'सुप्रभात! कृपया बैठिए। अपने बारे में बताइए।' },
      { speaker: 'You', text: '[Introduce yourself, education, and experience]', textHindi: '[अपना परिचय, शिक्षा और अनुभव बताएं]' },
      { speaker: 'HR', text: 'Why do you want to work at our company?', textHindi: 'आप हमारी कंपनी में क्यों काम करना चाहते हैं?' },
      { speaker: 'You', text: '[Explain your interest in the company]', textHindi: '[कंपनी में अपनी रुचि बताएं]' },
      { speaker: 'HR', text: 'What is your biggest strength?', textHindi: 'आपकी सबसे बड़ी ताकत क्या है?' },
      { speaker: 'You', text: '[Share a relevant strength with an example]', textHindi: '[एक उदाहरण के साथ प्रासंगिक ताकत साझा करें]' }
    ]),
    tips: 'Maintain eye contact, speak clearly, and give specific examples from your experience.',
    xpReward: 50
  },
  {
    title: 'Restaurant - Ordering Food',
    titleHindi: 'रेस्तरां - खाना ऑर्डर करना',
    description: 'Order a meal at a restaurant and handle special requests',
    descriptionHindi: 'रेस्तरां में खाना ऑर्डर करें और विशेष अनुरोध संभालें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Waiter',
    partnerRoleHindi: 'वेटर',
    category: 'Restaurant',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'Waiter', text: 'Good evening! Welcome to our restaurant. Table for how many?', textHindi: 'शुभ संध्या! हमारे रेस्तरां में आपका स्वागत है। कितने लोगों के लिए टेबल?' },
      { speaker: 'You', text: '[Tell the number of people]', textHindi: '[लोगों की संख्या बताएं]' },
      { speaker: 'Waiter', text: 'Here is your menu. Can I get you something to drink?', textHindi: 'यह आपका मेन्यू है। क्या मैं आपके लिए कुछ पीने को ला सकता हूं?' },
      { speaker: 'You', text: '[Order drinks]', textHindi: '[पेय ऑर्डर करें]' },
      { speaker: 'Waiter', text: 'Are you ready to order your food?', textHindi: 'क्या आप खाना ऑर्डर करने के लिए तैयार हैं?' },
      { speaker: 'You', text: '[Order your meal, mention any allergies or preferences]', textHindi: '[अपना भोजन ऑर्डर करें, किसी भी एलर्जी या पसंद का उल्लेख करें]' }
    ]),
    tips: 'Be polite, use "please" and "thank you". Ask about ingredients if you have dietary restrictions.',
    xpReward: 30
  },
  {
    title: 'Doctor Visit - Describing Symptoms',
    titleHindi: 'डॉक्टर से मिलना - लक्षण बताना',
    description: 'Explain your health problems to a doctor',
    descriptionHindi: 'डॉक्टर को अपनी स्वास्थ्य समस्याएं बताएं',
    yourRole: 'Patient',
    yourRoleHindi: 'मरीज',
    partnerRole: 'Doctor',
    partnerRoleHindi: 'डॉक्टर',
    category: 'Doctor',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Doctor', text: 'Good morning. What brings you here today?', textHindi: 'सुप्रभात। आज आप यहां क्यों आए हैं?' },
      { speaker: 'You', text: '[Describe your main problem]', textHindi: '[अपनी मुख्य समस्या बताएं]' },
      { speaker: 'Doctor', text: 'How long have you been experiencing these symptoms?', textHindi: 'आप कब से इन लक्षणों का अनुभव कर रहे हैं?' },
      { speaker: 'You', text: '[Tell the duration]', textHindi: '[अवधि बताएं]' },
      { speaker: 'Doctor', text: 'Are you taking any medications currently?', textHindi: 'क्या आप वर्तमान में कोई दवा ले रहे हैं?' },
      { speaker: 'You', text: '[List any medications or say none]', textHindi: '[कोई दवाई बताएं या कहें कि नहीं]' }
    ]),
    tips: 'Be specific about when symptoms started, their severity, and what makes them better or worse.',
    xpReward: 40
  },
  {
    title: 'Hotel Check-in',
    titleHindi: 'होटल चेक-इन',
    description: 'Check into a hotel and ask about amenities',
    descriptionHindi: 'होटल में चेक-इन करें और सुविधाओं के बारे में पूछें',
    yourRole: 'Guest',
    yourRoleHindi: 'मेहमान',
    partnerRole: 'Receptionist',
    partnerRoleHindi: 'रिसेप्शनिस्ट',
    category: 'Hotel',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'Receptionist', text: 'Good afternoon! Welcome to Grand Hotel. How may I help you?', textHindi: 'शुभ दोपहर! ग्रैंड होटल में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Say you have a reservation]', textHindi: '[कहें कि आपका आरक्षण है]' },
      { speaker: 'Receptionist', text: 'May I have your name please?', textHindi: 'क्या मुझे आपका नाम मिल सकता है?' },
      { speaker: 'You', text: '[Give your name]', textHindi: '[अपना नाम दें]' },
      { speaker: 'Receptionist', text: 'Your room is on the 5th floor. Would you like help with your luggage?', textHindi: 'आपका कमरा 5वीं मंजिल पर है। क्या आप अपने सामान में मदद चाहेंगे?' },
      { speaker: 'You', text: '[Respond and ask about breakfast timing]', textHindi: '[जवाब दें और नाश्ते के समय के बारे में पूछें]' }
    ]),
    tips: 'Confirm your booking details and ask about WiFi, breakfast, and checkout time.',
    xpReward: 30
  },
  {
    title: 'Shopping - Returning a Product',
    titleHindi: 'खरीदारी - उत्पाद वापस करना',
    description: 'Return a defective product and request a refund',
    descriptionHindi: 'खराब उत्पाद वापस करें और रिफंड का अनुरोध करें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Store Manager',
    partnerRoleHindi: 'स्टोर मैनेजर',
    category: 'Shopping',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Manager', text: 'Hello, how can I help you today?', textHindi: 'नमस्ते, आज मैं आपकी कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Explain you want to return a product]', textHindi: '[बताएं कि आप एक उत्पाद वापस करना चाहते हैं]' },
      { speaker: 'Manager', text: 'What seems to be the problem with it?', textHindi: 'इसमें क्या समस्या है?' },
      { speaker: 'You', text: '[Describe the defect]', textHindi: '[दोष का वर्णन करें]' },
      { speaker: 'Manager', text: 'Do you have the receipt?', textHindi: 'क्या आपके पास रसीद है?' },
      { speaker: 'You', text: '[Show receipt and ask for refund or exchange]', textHindi: '[रसीद दिखाएं और रिफंड या एक्सचेंज मांगें]' }
    ]),
    tips: 'Stay calm and polite. Have your receipt ready and clearly explain the problem.',
    xpReward: 40
  },
  {
    title: 'Bank - Opening an Account',
    titleHindi: 'बैंक - खाता खोलना',
    description: 'Open a new savings account at a bank',
    descriptionHindi: 'बैंक में नया बचत खाता खोलें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Bank Officer',
    partnerRoleHindi: 'बैंक अधिकारी',
    category: 'Bank',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Officer', text: 'Good morning! How may I assist you?', textHindi: 'सुप्रभात! मैं आपकी कैसे सहायता कर सकता हूं?' },
      { speaker: 'You', text: '[Say you want to open a savings account]', textHindi: '[कहें कि आप बचत खाता खोलना चाहते हैं]' },
      { speaker: 'Officer', text: 'Do you have your ID proof and address proof?', textHindi: 'क्या आपके पास पहचान प्रमाण और पता प्रमाण है?' },
      { speaker: 'You', text: '[Confirm and show documents]', textHindi: '[पुष्टि करें और दस्तावेज दिखाएं]' },
      { speaker: 'Officer', text: 'What is the initial deposit amount?', textHindi: 'प्रारंभिक जमा राशि क्या है?' },
      { speaker: 'You', text: '[State the amount and ask about interest rates]', textHindi: '[राशि बताएं और ब्याज दरों के बारे में पूछें]' }
    ]),
    tips: 'Bring all required documents. Ask about minimum balance, ATM card, and online banking.',
    xpReward: 40
  },
  {
    title: 'Airport - Check-in Counter',
    titleHindi: 'हवाई अड्डा - चेक-इन काउंटर',
    description: 'Check in for your flight and handle luggage',
    descriptionHindi: 'अपनी फ्लाइट के लिए चेक-इन करें और सामान संभालें',
    yourRole: 'Passenger',
    yourRoleHindi: 'यात्री',
    partnerRole: 'Airline Staff',
    partnerRoleHindi: 'एयरलाइन स्टाफ',
    category: 'Airport',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Staff', text: 'Good morning! May I see your passport and booking confirmation?', textHindi: 'सुप्रभात! क्या मैं आपका पासपोर्ट और बुकिंग कन्फर्मेशन देख सकता हूं?' },
      { speaker: 'You', text: '[Hand over documents]', textHindi: '[दस्तावेज दें]' },
      { speaker: 'Staff', text: 'How many bags are you checking in?', textHindi: 'आप कितने बैग चेक-इन कर रहे हैं?' },
      { speaker: 'You', text: '[Tell the number of bags]', textHindi: '[बैग की संख्या बताएं]' },
      { speaker: 'Staff', text: 'Would you prefer a window or aisle seat?', textHindi: 'क्या आप विंडो या आइल सीट पसंद करेंगे?' },
      { speaker: 'You', text: '[State your preference]', textHindi: '[अपनी पसंद बताएं]' }
    ]),
    tips: 'Arrive early, have documents ready, and know the baggage weight limits.',
    xpReward: 40
  },
  {
    title: 'Asking for Directions',
    titleHindi: 'रास्ता पूछना',
    description: 'Ask a stranger for directions to a location',
    descriptionHindi: 'किसी अजनबी से किसी स्थान का रास्ता पूछें',
    yourRole: 'Tourist',
    yourRoleHindi: 'पर्यटक',
    partnerRole: 'Local Person',
    partnerRoleHindi: 'स्थानीय व्यक्ति',
    category: 'Travel',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Politely get attention and ask for directions]', textHindi: '[विनम्रता से ध्यान आकर्षित करें और रास्ता पूछें]' },
      { speaker: 'Local', text: 'Sure! Go straight for about 200 meters, then turn left.', textHindi: 'जी! लगभग 200 मीटर सीधे जाइए, फिर बाएं मुड़िए।' },
      { speaker: 'You', text: '[Confirm the directions]', textHindi: '[दिशाओं की पुष्टि करें]' },
      { speaker: 'Local', text: 'Yes, you will see a big mall on your right. It is just behind that.', textHindi: 'हां, आपको दाईं ओर एक बड़ा मॉल दिखेगा। यह उसके ठीक पीछे है।' },
      { speaker: 'You', text: '[Ask how long it will take]', textHindi: '[पूछें कि कितना समय लगेगा]' },
      { speaker: 'Local', text: 'About 10 minutes walking.', textHindi: 'पैदल लगभग 10 मिनट।' }
    ]),
    tips: 'Start with "Excuse me" and repeat directions to confirm you understood correctly.',
    xpReward: 25
  },
  {
    title: 'Phone Call - Making an Appointment',
    titleHindi: 'फोन कॉल - अपॉइंटमेंट लेना',
    description: 'Call to schedule an appointment',
    descriptionHindi: 'अपॉइंटमेंट शेड्यूल करने के लिए कॉल करें',
    yourRole: 'Caller',
    yourRoleHindi: 'कॉलर',
    partnerRole: 'Receptionist',
    partnerRoleHindi: 'रिसेप्शनिस्ट',
    category: 'Telephone',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'Receptionist', text: 'Hello, City Dental Clinic. How may I help you?', textHindi: 'हैलो, सिटी डेंटल क्लिनिक। मैं आपकी कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Say you want to book an appointment]', textHindi: '[कहें कि आप अपॉइंटमेंट बुक करना चाहते हैं]' },
      { speaker: 'Receptionist', text: 'Sure. When would you like to come?', textHindi: 'जी। आप कब आना चाहेंगे?' },
      { speaker: 'You', text: '[Suggest a date and time]', textHindi: '[तारीख और समय सुझाएं]' },
      { speaker: 'Receptionist', text: 'Let me check. We have a slot at 3 PM. Does that work?', textHindi: 'मुझे देखने दीजिए। हमारे पास 3 बजे का स्लॉट है। क्या यह ठीक रहेगा?' },
      { speaker: 'You', text: '[Confirm or suggest alternative]', textHindi: '[पुष्टि करें या विकल्प सुझाएं]' }
    ]),
    tips: 'Speak clearly on the phone. Have your calendar ready and note down the appointment details.',
    xpReward: 30
  },
  {
    title: 'Office - Asking for Leave',
    titleHindi: 'ऑफिस - छुट्टी मांगना',
    description: 'Request time off from your manager',
    descriptionHindi: 'अपने मैनेजर से छुट्टी का अनुरोध करें',
    yourRole: 'Employee',
    yourRoleHindi: 'कर्मचारी',
    partnerRole: 'Manager',
    partnerRoleHindi: 'मैनेजर',
    category: 'Business',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Politely ask if the manager has a moment]', textHindi: '[विनम्रता से पूछें कि क्या मैनेजर के पास समय है]' },
      { speaker: 'Manager', text: 'Yes, come in. What is it?', textHindi: 'हां, अंदर आओ। क्या बात है?' },
      { speaker: 'You', text: '[Explain you need leave and the dates]', textHindi: '[बताएं कि आपको छुट्टी चाहिए और तारीखें]' },
      { speaker: 'Manager', text: 'What is the reason for the leave?', textHindi: 'छुट्टी का कारण क्या है?' },
      { speaker: 'You', text: '[Give the reason]', textHindi: '[कारण बताएं]' },
      { speaker: 'Manager', text: 'Who will handle your work while you are away?', textHindi: 'जब आप नहीं होंगे तो आपका काम कौन संभालेगा?' },
      { speaker: 'You', text: '[Explain your handover plan]', textHindi: '[अपनी हैंडओवर योजना बताएं]' }
    ]),
    tips: 'Request leave in advance, have a backup plan, and offer to complete urgent tasks before leaving.',
    xpReward: 40
  },
  {
    title: 'Negotiating Price',
    titleHindi: 'कीमत पर बातचीत',
    description: 'Bargain for a better price at a market',
    descriptionHindi: 'बाजार में बेहतर कीमत के लिए मोलभाव करें',
    yourRole: 'Buyer',
    yourRoleHindi: 'खरीदार',
    partnerRole: 'Seller',
    partnerRoleHindi: 'विक्रेता',
    category: 'Shopping',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Ask the price of an item]', textHindi: '[किसी वस्तु की कीमत पूछें]' },
      { speaker: 'Seller', text: 'This is 500 rupees. Very good quality!', textHindi: 'यह 500 रुपये है। बहुत अच्छी क्वालिटी!' },
      { speaker: 'You', text: '[Say it is too expensive and offer a lower price]', textHindi: '[कहें कि यह बहुत महंगा है और कम कीमत पेश करें]' },
      { speaker: 'Seller', text: 'That is too low! I can give you for 450.', textHindi: 'यह बहुत कम है! मैं आपको 450 में दे सकता हूं।' },
      { speaker: 'You', text: '[Counter offer or accept]', textHindi: '[काउंटर ऑफर करें या स्वीकार करें]' },
      { speaker: 'Seller', text: 'Okay, final price 400. Deal?', textHindi: 'ठीक है, फाइनल प्राइस 400। डील?' }
    ]),
    tips: 'Be friendly but firm. Start lower than your target price. Be willing to walk away.',
    xpReward: 35
  },
  {
    title: 'Complaining About Service',
    titleHindi: 'सेवा के बारे में शिकायत',
    description: 'Complain about poor service at a restaurant',
    descriptionHindi: 'रेस्तरां में खराब सेवा के बारे में शिकायत करें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Restaurant Manager',
    partnerRoleHindi: 'रेस्तरां मैनेजर',
    category: 'Restaurant',
    difficulty: 'Advanced',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Politely ask to speak to the manager]', textHindi: '[विनम्रता से मैनेजर से बात करने के लिए कहें]' },
      { speaker: 'Manager', text: 'Yes, I am the manager. How can I help?', textHindi: 'हां, मैं मैनेजर हूं। मैं कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Explain the problem with your order]', textHindi: '[अपने ऑर्डर में समस्या बताएं]' },
      { speaker: 'Manager', text: 'I am very sorry about that. What would you like us to do?', textHindi: 'इसके लिए मुझे बहुत खेद है। आप चाहते हैं कि हम क्या करें?' },
      { speaker: 'You', text: '[Request a solution - replacement, discount, or refund]', textHindi: '[समाधान का अनुरोध करें - रिप्लेसमेंट, छूट, या रिफंड]' },
      { speaker: 'Manager', text: 'Absolutely. We will remake your order and give you a 20% discount.', textHindi: 'बिल्कुल। हम आपका ऑर्डर फिर से बनाएंगे और आपको 20% छूट देंगे।' }
    ]),
    tips: 'Stay calm and polite. Focus on the problem, not blame. Suggest a reasonable solution.',
    xpReward: 45
  },
  {
    title: 'Meeting New Colleagues',
    titleHindi: 'नए सहकर्मियों से मिलना',
    description: 'Introduce yourself to new team members',
    descriptionHindi: 'नई टीम के सदस्यों से अपना परिचय दें',
    yourRole: 'New Employee',
    yourRoleHindi: 'नया कर्मचारी',
    partnerRole: 'Team Member',
    partnerRoleHindi: 'टीम सदस्य',
    category: 'Business',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'Colleague', text: 'Hi! You must be the new team member. I am Rahul.', textHindi: 'हाय! आप नए टीम मेंबर होंगे। मैं राहुल हूं।' },
      { speaker: 'You', text: '[Introduce yourself]', textHindi: '[अपना परिचय दें]' },
      { speaker: 'Colleague', text: 'Nice to meet you! Which department are you joining?', textHindi: 'आपसे मिलकर अच्छा लगा! आप किस विभाग में शामिल हो रहे हैं?' },
      { speaker: 'You', text: '[Tell your department and role]', textHindi: '[अपना विभाग और भूमिका बताएं]' },
      { speaker: 'Colleague', text: 'Great! If you need any help, feel free to ask.', textHindi: 'बढ़िया! अगर आपको कोई मदद चाहिए, तो बेझिझक पूछें।' },
      { speaker: 'You', text: '[Thank them and ask about the team]', textHindi: '[उन्हें धन्यवाद दें और टीम के बारे में पूछें]' }
    ]),
    tips: 'Smile, make eye contact, and show genuine interest in your colleagues.',
    xpReward: 25
  },
  {
    title: 'Pharmacy - Buying Medicine',
    titleHindi: 'फार्मेसी - दवा खरीदना',
    description: 'Buy medicine at a pharmacy with a prescription',
    descriptionHindi: 'प्रिस्क्रिप्शन के साथ फार्मेसी में दवा खरीदें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Pharmacist',
    partnerRoleHindi: 'फार्मासिस्ट',
    category: 'Pharmacy',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'Pharmacist', text: 'Hello! How can I help you?', textHindi: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Show prescription and ask for medicine]', textHindi: '[प्रिस्क्रिप्शन दिखाएं और दवा मांगें]' },
      { speaker: 'Pharmacist', text: 'Let me check if we have this in stock.', textHindi: 'मुझे देखने दीजिए कि यह स्टॉक में है या नहीं।' },
      { speaker: 'You', text: '[Ask about dosage instructions]', textHindi: '[खुराक के निर्देशों के बारे में पूछें]' },
      { speaker: 'Pharmacist', text: 'Take one tablet twice daily after meals. Any allergies I should know about?', textHindi: 'भोजन के बाद दिन में दो बार एक गोली लें। कोई एलर्जी जो मुझे पता होनी चाहिए?' },
      { speaker: 'You', text: '[Answer and ask about side effects]', textHindi: '[जवाब दें और साइड इफेक्ट्स के बारे में पूछें]' }
    ]),
    tips: 'Always mention any allergies. Ask about food interactions and storage instructions.',
    xpReward: 30
  },
  {
    title: 'Landlord Discussion - Rent Issues',
    titleHindi: 'मकान मालिक से चर्चा - किराये की समस्या',
    description: 'Discuss a maintenance issue with your landlord',
    descriptionHindi: 'अपने मकान मालिक के साथ रखरखाव की समस्या पर चर्चा करें',
    yourRole: 'Tenant',
    yourRoleHindi: 'किरायेदार',
    partnerRole: 'Landlord',
    partnerRoleHindi: 'मकान मालिक',
    category: 'Real Estate',
    difficulty: 'Advanced',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Greet and explain you have a problem to discuss]', textHindi: '[अभिवादन करें और बताएं कि आपको एक समस्या पर चर्चा करनी है]' },
      { speaker: 'Landlord', text: 'Yes, what is the issue?', textHindi: 'हां, क्या समस्या है?' },
      { speaker: 'You', text: '[Describe the maintenance problem - leaking pipe, broken AC, etc.]', textHindi: '[रखरखाव की समस्या बताएं - पाइप लीक, AC खराब, आदि]' },
      { speaker: 'Landlord', text: 'When did this start happening?', textHindi: 'यह कब से हो रहा है?' },
      { speaker: 'You', text: '[Give timeline and impact on daily life]', textHindi: '[समयरेखा और दैनिक जीवन पर प्रभाव बताएं]' },
      { speaker: 'Landlord', text: 'I will send someone to fix it. Is tomorrow morning okay?', textHindi: 'मैं किसी को ठीक करने के लिए भेजूंगा। क्या कल सुबह ठीक है?' }
    ]),
    tips: 'Document the problem with photos. Be specific about when it started and how it affects you.',
    xpReward: 45
  },
  {
    title: 'Gym - Personal Training Session',
    titleHindi: 'जिम - पर्सनल ट्रेनिंग सेशन',
    description: 'Discuss fitness goals with a personal trainer',
    descriptionHindi: 'पर्सनल ट्रेनर के साथ फिटनेस लक्ष्यों पर चर्चा करें',
    yourRole: 'Gym Member',
    yourRoleHindi: 'जिम सदस्य',
    partnerRole: 'Personal Trainer',
    partnerRoleHindi: 'पर्सनल ट्रेनर',
    category: 'Gym',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Trainer', text: 'Hi! I am your trainer today. What are your fitness goals?', textHindi: 'हाय! मैं आज आपका ट्रेनर हूं। आपके फिटनेस लक्ष्य क्या हैं?' },
      { speaker: 'You', text: '[Describe your fitness goals]', textHindi: '[अपने फिटनेस लक्ष्य बताएं]' },
      { speaker: 'Trainer', text: 'How often do you exercise currently?', textHindi: 'आप वर्तमान में कितनी बार व्यायाम करते हैं?' },
      { speaker: 'You', text: '[Tell your current routine]', textHindi: '[अपनी वर्तमान दिनचर्या बताएं]' },
      { speaker: 'Trainer', text: 'Any injuries or health conditions I should know about?', textHindi: 'कोई चोट या स्वास्थ्य स्थिति जो मुझे पता होनी चाहिए?' },
      { speaker: 'You', text: '[Mention any limitations]', textHindi: '[कोई सीमाएं बताएं]' }
    ]),
    tips: 'Be honest about your fitness level. Mention any past injuries or health concerns.',
    xpReward: 35
  },
  {
    title: 'Parent-Teacher Meeting',
    titleHindi: 'अभिभावक-शिक्षक बैठक',
    description: 'Discuss your child\'s progress with their teacher',
    descriptionHindi: 'अपने बच्चे की प्रगति के बारे में उनके शिक्षक से चर्चा करें',
    yourRole: 'Parent',
    yourRoleHindi: 'अभिभावक',
    partnerRole: 'Teacher',
    partnerRoleHindi: 'शिक्षक',
    category: 'Education',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Teacher', text: 'Good evening! Thank you for coming. Please have a seat.', textHindi: 'शुभ संध्या! आने के लिए धन्यवाद। कृपया बैठिए।' },
      { speaker: 'You', text: '[Greet and ask about your child\'s performance]', textHindi: '[अभिवादन करें और अपने बच्चे के प्रदर्शन के बारे में पूछें]' },
      { speaker: 'Teacher', text: 'Your child is doing well in most subjects, but needs improvement in Math.', textHindi: 'आपका बच्चा अधिकांश विषयों में अच्छा कर रहा है, लेकिन गणित में सुधार की जरूरत है।' },
      { speaker: 'You', text: '[Ask for specific areas of concern]', textHindi: '[चिंता के विशिष्ट क्षेत्रों के बारे में पूछें]' },
      { speaker: 'Teacher', text: 'The main issue is with word problems. Extra practice at home would help.', textHindi: 'मुख्य समस्या शब्द समस्याओं के साथ है। घर पर अतिरिक्त अभ्यास मदद करेगा।' },
      { speaker: 'You', text: '[Ask for suggestions on how to help]', textHindi: '[मदद करने के तरीके पर सुझाव मांगें]' }
    ]),
    tips: 'Listen actively, take notes, and ask specific questions about how to support your child.',
    xpReward: 40
  },
  {
    title: 'Customer Service - Internet Problem',
    titleHindi: 'कस्टमर सर्विस - इंटरनेट समस्या',
    description: 'Call customer service to fix internet issues',
    descriptionHindi: 'इंटरनेट समस्याओं को ठीक करने के लिए कस्टमर सर्विस को कॉल करें',
    yourRole: 'Customer',
    yourRoleHindi: 'ग्राहक',
    partnerRole: 'Support Agent',
    partnerRoleHindi: 'सपोर्ट एजेंट',
    category: 'Technology',
    difficulty: 'Intermediate',
    dialogues: JSON.stringify([
      { speaker: 'Agent', text: 'Thank you for calling TechNet. How may I help you?', textHindi: 'टेकनेट को कॉल करने के लिए धन्यवाद। मैं आपकी कैसे मदद कर सकता हूं?' },
      { speaker: 'You', text: '[Explain your internet problem]', textHindi: '[अपनी इंटरनेट समस्या बताएं]' },
      { speaker: 'Agent', text: 'I understand. Can I have your account number?', textHindi: 'मैं समझता हूं। क्या मुझे आपका अकाउंट नंबर मिल सकता है?' },
      { speaker: 'You', text: '[Provide account details]', textHindi: '[अकाउंट विवरण दें]' },
      { speaker: 'Agent', text: 'Have you tried restarting your router?', textHindi: 'क्या आपने अपना राउटर रीस्टार्ट करने की कोशिश की?' },
      { speaker: 'You', text: '[Describe what you have already tried]', textHindi: '[बताएं कि आपने पहले से क्या कोशिश की है]' }
    ]),
    tips: 'Have your account details ready. Note down any reference numbers given.',
    xpReward: 35
  },
  {
    title: 'Wedding Invitation',
    titleHindi: 'शादी का निमंत्रण',
    description: 'Invite a colleague to your wedding',
    descriptionHindi: 'अपने सहकर्मी को अपनी शादी में आमंत्रित करें',
    yourRole: 'Host',
    yourRoleHindi: 'मेजबान',
    partnerRole: 'Colleague',
    partnerRoleHindi: 'सहकर्मी',
    category: 'Social',
    difficulty: 'Beginner',
    dialogues: JSON.stringify([
      { speaker: 'You', text: '[Get their attention and share good news]', textHindi: '[उनका ध्यान आकर्षित करें और अच्छी खबर साझा करें]' },
      { speaker: 'Colleague', text: 'Oh wow! Congratulations! When is the wedding?', textHindi: 'अरे वाह! बधाई हो! शादी कब है?' },
      { speaker: 'You', text: '[Give date, time, and venue]', textHindi: '[तारीख, समय और स्थान बताएं]' },
      { speaker: 'Colleague', text: 'That sounds wonderful! I would love to come.', textHindi: 'यह बहुत अच्छा लगता है! मुझे आना अच्छा लगेगा।' },
      { speaker: 'You', text: '[Give more details and express happiness]', textHindi: '[अधिक विवरण दें और खुशी व्यक्त करें]' },
      { speaker: 'Colleague', text: 'Should I bring anything? What is the dress code?', textHindi: 'क्या मुझे कुछ लाना चाहिए? ड्रेस कोड क्या है?' }
    ]),
    tips: 'Be warm and personal. Provide all necessary details clearly.',
    xpReward: 25
  },
];

async function seedScenarios() {
  console.log('=== SEEDING SCENARIOS ===\n');

  const insertStmt = db.prepare(`
    INSERT INTO scenarios (title, title_hindi, description, description_hindi, your_role, your_role_hindi, partner_role, partner_role_hindi, category, difficulty, dialogues, tips, xp_reward)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let added = 0;
  for (const s of SCENARIOS) {
    try {
      insertStmt.run(
        s.title, s.titleHindi, s.description, s.descriptionHindi,
        s.yourRole, s.yourRoleHindi, s.partnerRole, s.partnerRoleHindi,
        s.category, s.difficulty, s.dialogues, s.tips, s.xpReward
      );
      added++;
      console.log(`  ✅ Added: ${s.title}`);
    } catch (err: any) {
      if (err.message.includes('UNIQUE')) {
        console.log(`  ⏭️ Skipped: ${s.title}`);
      } else {
        console.log(`  ❌ Error: ${s.title} - ${err.message}`);
      }
    }
  }

  console.log(`\n✅ COMPLETE: ${added} scenarios added`);
  db.close();
}

seedScenarios().catch(console.error);
