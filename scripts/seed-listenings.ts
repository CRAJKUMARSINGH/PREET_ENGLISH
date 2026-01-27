/**
 * LISTENING CONTENT SEEDER
 * Seeds the database with listening exercises for Hindi speakers
 * 
 * Run: npx tsx scripts/seed-listenings.ts
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

interface ListeningExercise {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  difficulty: string;
  category: string;
  audioText: string;
  audioTextHindi: string;
  duration: string;
  questions: string;
  vocabulary: string;
  order: number;
}

const LISTENINGS: ListeningExercise[] = [
  {
    title: 'Ordering Food at a Restaurant',
    titleHindi: 'रेस्तरां में खाना ऑर्डर करना',
    description: 'Listen to a conversation between a customer and waiter',
    descriptionHindi: 'ग्राहक और वेटर के बीच बातचीत सुनें',
    difficulty: 'Beginner',
    category: 'Restaurant',
    audioText: `Waiter: Good evening! Welcome to The Garden Restaurant. Table for how many?
Customer: Good evening. Table for two, please.
Waiter: Right this way. Here is your menu. Can I get you something to drink?
Customer: Yes, I will have a glass of water and my friend will have orange juice.
Waiter: Certainly. Are you ready to order or do you need a few minutes?
Customer: We need a few minutes, please.
Waiter: Take your time. I will be back shortly.`,
    audioTextHindi: `वेटर: शुभ संध्या! द गार्डन रेस्तरां में आपका स्वागत है। कितने लोगों के लिए टेबल?
ग्राहक: शुभ संध्या। दो लोगों के लिए टेबल, कृपया।
वेटर: इधर आइए। यह आपका मेन्यू है। क्या मैं आपके लिए कुछ पीने को ला सकता हूं?
ग्राहक: हां, मुझे एक गिलास पानी और मेरे दोस्त को संतरे का जूस।
वेटर: जी बिल्कुल। क्या आप ऑर्डर देने के लिए तैयार हैं या कुछ मिनट चाहिए?
ग्राहक: हमें कुछ मिनट चाहिए, कृपया।
वेटर: आराम से लीजिए। मैं जल्दी वापस आता हूं।`,
    duration: '1:30',
    questions: JSON.stringify([
      { q: 'How many people is the table for?', options: ['One', 'Two', 'Three', 'Four'], answer: 1, qHindi: 'टेबल कितने लोगों के लिए है?' },
      { q: 'What drink does the customer order for themselves?', options: ['Orange juice', 'Coffee', 'Water', 'Tea'], answer: 2, qHindi: 'ग्राहक अपने लिए क्या पेय ऑर्डर करता है?' },
      { q: 'Is the customer ready to order food?', options: ['Yes', 'No', 'Maybe', 'Not mentioned'], answer: 1, qHindi: 'क्या ग्राहक खाना ऑर्डर करने के लिए तैयार है?' }
    ]),
    vocabulary: JSON.stringify(['menu', 'order', 'certainly', 'shortly']),
    order: 1
  },
  {
    title: 'Asking for Directions',
    titleHindi: 'रास्ता पूछना',
    description: 'Listen to someone asking for directions to the train station',
    descriptionHindi: 'किसी को रेलवे स्टेशन का रास्ता पूछते हुए सुनें',
    difficulty: 'Beginner',
    category: 'Travel',
    audioText: `Tourist: Excuse me, could you help me? I am looking for the train station.
Local: Of course! Go straight on this road for about 200 meters.
Tourist: Okay, straight ahead.
Local: Yes, then turn left at the traffic signal. You will see a big shopping mall.
Tourist: Turn left at the signal, near the mall.
Local: Exactly. The train station is right behind the mall. You cannot miss it.
Tourist: Thank you so much! How long will it take to walk there?
Local: About 10 minutes. Have a nice day!`,
    audioTextHindi: `पर्यटक: माफ कीजिए, क्या आप मेरी मदद कर सकते हैं? मैं रेलवे स्टेशन ढूंढ रहा हूं।
स्थानीय: बिल्कुल! इस सड़क पर लगभग 200 मीटर सीधे जाइए।
पर्यटक: ठीक है, सीधे आगे।
स्थानीय: हां, फिर ट्रैफिक सिग्नल पर बाएं मुड़िए। आपको एक बड़ा शॉपिंग मॉल दिखेगा।
पर्यटक: सिग्नल पर बाएं, मॉल के पास।
स्थानीय: बिल्कुल सही। रेलवे स्टेशन मॉल के ठीक पीछे है। आप चूक नहीं सकते।
पर्यटक: बहुत-बहुत धन्यवाद! वहां पैदल जाने में कितना समय लगेगा?
स्थानीय: लगभग 10 मिनट। आपका दिन शुभ हो!`,
    duration: '1:45',
    questions: JSON.stringify([
      { q: 'What is the tourist looking for?', options: ['Bus station', 'Train station', 'Airport', 'Hotel'], answer: 1, qHindi: 'पर्यटक क्या ढूंढ रहा है?' },
      { q: 'Where should the tourist turn left?', options: ['At the mall', 'At the traffic signal', 'At the station', 'At the hotel'], answer: 1, qHindi: 'पर्यटक को कहां बाएं मुड़ना चाहिए?' },
      { q: 'How long will it take to walk?', options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'], answer: 1, qHindi: 'पैदल जाने में कितना समय लगेगा?' }
    ]),
    vocabulary: JSON.stringify(['directions', 'straight', 'traffic signal', 'behind']),
    order: 2
  },
  {
    title: 'Job Interview Introduction',
    titleHindi: 'नौकरी के इंटरव्यू में परिचय',
    description: 'Listen to a candidate introducing themselves in a job interview',
    descriptionHindi: 'एक उम्मीदवार को नौकरी के इंटरव्यू में अपना परिचय देते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Interview',
    audioText: `Interviewer: Good morning. Please have a seat. Can you tell me a little about yourself?
Candidate: Good morning, and thank you for this opportunity. My name is Priya Sharma. I completed my Bachelor's degree in Computer Science from Delhi University in 2022. For the past two years, I have been working as a software developer at Tech Solutions. In my current role, I handle frontend development using React and have also worked on several backend projects. I am passionate about creating user-friendly applications and I believe my skills would be a great fit for this position.
Interviewer: That sounds impressive. Why are you interested in joining our company?`,
    audioTextHindi: `साक्षात्कारकर्ता: सुप्रभात। कृपया बैठिए। क्या आप अपने बारे में कुछ बता सकते हैं?
उम्मीदवार: सुप्रभात, और इस अवसर के लिए धन्यवाद। मेरा नाम प्रिया शर्मा है। मैंने 2022 में दिल्ली विश्वविद्यालय से कंप्यूटर साइंस में स्नातक की डिग्री पूरी की। पिछले दो वर्षों से, मैं टेक सॉल्यूशंस में सॉफ्टवेयर डेवलपर के रूप में काम कर रही हूं। अपनी वर्तमान भूमिका में, मैं React का उपयोग करके फ्रंटएंड डेवलपमेंट संभालती हूं और कई बैकएंड प्रोजेक्ट्स पर भी काम किया है। मुझे यूजर-फ्रेंडली एप्लिकेशन बनाने का शौक है और मुझे विश्वास है कि मेरे कौशल इस पद के लिए उपयुक्त होंगे।
साक्षात्कारकर्ता: यह प्रभावशाली लगता है। आप हमारी कंपनी में शामिल होने में रुचि क्यों रखते हैं?`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'What degree did Priya complete?', options: ['MBA', 'Computer Science', 'Engineering', 'Commerce'], answer: 1, qHindi: 'प्रिया ने कौन सी डिग्री पूरी की?' },
      { q: 'How long has she been working at Tech Solutions?', options: ['One year', 'Two years', 'Three years', 'Six months'], answer: 1, qHindi: 'वह टेक सॉल्यूशंस में कितने समय से काम कर रही है?' },
      { q: 'What technology does she use for frontend?', options: ['Angular', 'Vue', 'React', 'jQuery'], answer: 2, qHindi: 'वह फ्रंटएंड के लिए कौन सी तकनीक का उपयोग करती है?' }
    ]),
    vocabulary: JSON.stringify(['opportunity', 'passionate', 'user-friendly', 'position']),
    order: 3
  },
  {
    title: 'Doctor Appointment',
    titleHindi: 'डॉक्टर की अपॉइंटमेंट',
    description: 'Listen to a patient describing symptoms to a doctor',
    descriptionHindi: 'एक मरीज को डॉक्टर को लक्षण बताते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Doctor',
    audioText: `Doctor: Good afternoon. What brings you here today?
Patient: Good afternoon, Doctor. I have been feeling unwell for the past three days.
Doctor: I see. Can you describe your symptoms?
Patient: I have a headache, mild fever, and my throat is sore. I also feel very tired.
Doctor: Have you taken any medicine?
Patient: Just some paracetamol for the fever.
Doctor: Okay, let me check your temperature and throat. Open your mouth, please. Hmm, your throat is a bit red. It looks like a viral infection. I will prescribe some medicine. Take rest and drink plenty of fluids.
Patient: How long will it take to recover?
Doctor: You should feel better in 4-5 days. If the fever persists, come back.`,
    audioTextHindi: `डॉक्टर: शुभ दोपहर। आज आप यहां क्यों आए हैं?
मरीज: शुभ दोपहर, डॉक्टर। मैं पिछले तीन दिनों से अस्वस्थ महसूस कर रहा हूं।
डॉक्टर: अच्छा। क्या आप अपने लक्षण बता सकते हैं?
मरीज: मुझे सिरदर्द है, हल्का बुखार है, और गला खराब है। मुझे बहुत थकान भी महसूस हो रही है।
डॉक्टर: क्या आपने कोई दवा ली है?
मरीज: बस बुखार के लिए कुछ पैरासिटामोल।
डॉक्टर: ठीक है, मुझे आपका तापमान और गला जांचने दीजिए। कृपया मुंह खोलिए। हम्म, आपका गला थोड़ा लाल है। यह वायरल इंफेक्शन जैसा लगता है। मैं कुछ दवाई लिख दूंगा। आराम करें और खूब पानी पिएं।
मरीज: ठीक होने में कितना समय लगेगा?
डॉक्टर: आपको 4-5 दिनों में बेहतर महसूस होना चाहिए। अगर बुखार बना रहे, तो वापस आइए।`,
    duration: '2:15',
    questions: JSON.stringify([
      { q: 'How long has the patient been unwell?', options: ['One day', 'Two days', 'Three days', 'One week'], answer: 2, qHindi: 'मरीज कितने दिनों से अस्वस्थ है?' },
      { q: 'What medicine did the patient take?', options: ['Aspirin', 'Paracetamol', 'Ibuprofen', 'Nothing'], answer: 1, qHindi: 'मरीज ने कौन सी दवा ली?' },
      { q: 'What does the doctor think is the problem?', options: ['Bacterial infection', 'Viral infection', 'Allergy', 'Cold'], answer: 1, qHindi: 'डॉक्टर को क्या लगता है समस्या क्या है?' }
    ]),
    vocabulary: JSON.stringify(['symptoms', 'prescribe', 'recover', 'persists']),
    order: 4
  },
  {
    title: 'Shopping for Clothes',
    titleHindi: 'कपड़ों की खरीदारी',
    description: 'Listen to a customer shopping for clothes at a store',
    descriptionHindi: 'एक ग्राहक को दुकान पर कपड़े खरीदते हुए सुनें',
    difficulty: 'Beginner',
    category: 'Shopping',
    audioText: `Customer: Excuse me, I am looking for a formal shirt.
Salesperson: Of course! What size do you need?
Customer: I usually wear medium.
Salesperson: Here are our formal shirts in medium. We have white, blue, and light pink.
Customer: I like the blue one. Can I try it on?
Salesperson: Sure, the trial room is on your right.
Customer: Thank you. (After trying) It fits well. How much is it?
Salesperson: It is 1,200 rupees. But we have a 20% discount today.
Customer: Great! So it will be 960 rupees?
Salesperson: Exactly. Would you like to pay by cash or card?
Customer: Card, please.`,
    audioTextHindi: `ग्राहक: माफ कीजिए, मैं एक फॉर्मल शर्ट ढूंढ रहा हूं।
सेल्सपर्सन: बिल्कुल! आपको कौन सा साइज चाहिए?
ग्राहक: मैं आमतौर पर मीडियम पहनता हूं।
सेल्सपर्सन: यहां मीडियम में हमारी फॉर्मल शर्ट्स हैं। हमारे पास सफेद, नीला और हल्का गुलाबी है।
ग्राहक: मुझे नीला पसंद है। क्या मैं इसे पहनकर देख सकता हूं?
सेल्सपर्सन: जी हां, ट्रायल रूम आपके दाईं ओर है।
ग्राहक: धन्यवाद। (पहनने के बाद) यह अच्छी फिट है। इसकी कीमत क्या है?
सेल्सपर्सन: यह 1,200 रुपये है। लेकिन आज हमारे पास 20% छूट है।
ग्राहक: बढ़िया! तो यह 960 रुपये होगा?
सेल्सपर्सन: बिल्कुल सही। आप कैश से भुगतान करेंगे या कार्ड से?
ग्राहक: कार्ड से, कृपया।`,
    duration: '1:45',
    questions: JSON.stringify([
      { q: 'What is the customer looking for?', options: ['Jeans', 'T-shirt', 'Formal shirt', 'Jacket'], answer: 2, qHindi: 'ग्राहक क्या ढूंढ रहा है?' },
      { q: 'What color does the customer choose?', options: ['White', 'Blue', 'Pink', 'Black'], answer: 1, qHindi: 'ग्राहक कौन सा रंग चुनता है?' },
      { q: 'What is the final price after discount?', options: ['1,200 rupees', '1,000 rupees', '960 rupees', '900 rupees'], answer: 2, qHindi: 'छूट के बाद अंतिम कीमत क्या है?' }
    ]),
    vocabulary: JSON.stringify(['formal', 'trial room', 'discount', 'payment']),
    order: 5
  },
  {
    title: 'Booking a Hotel Room',
    titleHindi: 'होटल का कमरा बुक करना',
    description: 'Listen to someone booking a hotel room over the phone',
    descriptionHindi: 'किसी को फोन पर होटल का कमरा बुक करते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Hotel',
    audioText: `Receptionist: Good morning, Grand Palace Hotel. How may I help you?
Guest: Good morning. I would like to book a room for next weekend.
Receptionist: Certainly. For how many nights?
Guest: Two nights, Friday and Saturday.
Receptionist: And how many guests?
Guest: Two adults and one child.
Receptionist: We have a deluxe room available with a king-size bed and an extra bed for the child. It is 4,500 rupees per night including breakfast.
Guest: Does it have a nice view?
Receptionist: Yes, it overlooks the garden. Would you like to proceed with the booking?
Guest: Yes, please. Can I pay at check-in?
Receptionist: Of course. May I have your name and phone number?`,
    audioTextHindi: `रिसेप्शनिस्ट: सुप्रभात, ग्रैंड पैलेस होटल। मैं आपकी कैसे मदद कर सकता हूं?
मेहमान: सुप्रभात। मैं अगले सप्ताहांत के लिए एक कमरा बुक करना चाहता हूं।
रिसेप्शनिस्ट: जी बिल्कुल। कितनी रातों के लिए?
मेहमान: दो रातें, शुक्रवार और शनिवार।
रिसेप्शनिस्ट: और कितने मेहमान?
मेहमान: दो वयस्क और एक बच्चा।
रिसेप्शनिस्ट: हमारे पास एक डीलक्स कमरा उपलब्ध है जिसमें किंग-साइज बेड और बच्चे के लिए एक अतिरिक्त बेड है। नाश्ते सहित यह 4,500 रुपये प्रति रात है।
मेहमान: क्या इसका अच्छा दृश्य है?
रिसेप्शनिस्ट: हां, यह बगीचे की ओर है। क्या आप बुकिंग के साथ आगे बढ़ना चाहेंगे?
मेहमान: हां, कृपया। क्या मैं चेक-इन पर भुगतान कर सकता हूं?
रिसेप्शनिस्ट: बिल्कुल। क्या मुझे आपका नाम और फोन नंबर मिल सकता है?`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'How many nights does the guest want to stay?', options: ['One', 'Two', 'Three', 'Four'], answer: 1, qHindi: 'मेहमान कितनी रातें रुकना चाहता है?' },
      { q: 'What is included in the room price?', options: ['Lunch', 'Dinner', 'Breakfast', 'All meals'], answer: 2, qHindi: 'कमरे की कीमत में क्या शामिल है?' },
      { q: 'What does the room overlook?', options: ['Pool', 'Garden', 'City', 'Mountain'], answer: 1, qHindi: 'कमरे से क्या दिखता है?' }
    ]),
    vocabulary: JSON.stringify(['deluxe', 'overlook', 'proceed', 'check-in']),
    order: 6
  },
  {
    title: 'At the Bank',
    titleHindi: 'बैंक में',
    description: 'Listen to a customer opening a savings account',
    descriptionHindi: 'एक ग्राहक को बचत खाता खोलते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Bank',
    audioText: `Bank Officer: Good morning. How can I assist you today?
Customer: Good morning. I want to open a savings account.
Bank Officer: Sure. Do you have your ID proof and address proof?
Customer: Yes, I have my Aadhaar card and a utility bill.
Bank Officer: Perfect. Please fill out this form. What is your occupation?
Customer: I am a teacher at a government school.
Bank Officer: Great. The minimum balance requirement is 1,000 rupees. Would you like a debit card as well?
Customer: Yes, please. Is there any annual fee?
Bank Officer: No, the debit card is free for the first year. You will receive it within 7 working days.
Customer: Thank you. Can I also set up mobile banking?
Bank Officer: Absolutely. I will help you with that after we complete the account opening.`,
    audioTextHindi: `बैंक अधिकारी: सुप्रभात। आज मैं आपकी कैसे सहायता कर सकता हूं?
ग्राहक: सुप्रभात। मैं एक बचत खाता खोलना चाहता हूं।
बैंक अधिकारी: जी बिल्कुल। क्या आपके पास पहचान प्रमाण और पता प्रमाण है?
ग्राहक: हां, मेरे पास आधार कार्ड और बिजली का बिल है।
बैंक अधिकारी: बहुत अच्छा। कृपया यह फॉर्म भरें। आपका व्यवसाय क्या है?
ग्राहक: मैं एक सरकारी स्कूल में शिक्षक हूं।
बैंक अधिकारी: बढ़िया। न्यूनतम बैलेंस की आवश्यकता 1,000 रुपये है। क्या आप डेबिट कार्ड भी चाहेंगे?
ग्राहक: हां, कृपया। क्या कोई वार्षिक शुल्क है?
बैंक अधिकारी: नहीं, पहले साल डेबिट कार्ड मुफ्त है। आपको यह 7 कार्य दिवसों में मिल जाएगा।
ग्राहक: धन्यवाद। क्या मैं मोबाइल बैंकिंग भी सेट कर सकता हूं?
बैंक अधिकारी: बिल्कुल। खाता खोलने के बाद मैं इसमें आपकी मदद करूंगा।`,
    duration: '2:15',
    questions: JSON.stringify([
      { q: 'What type of account does the customer want?', options: ['Current', 'Savings', 'Fixed deposit', 'Loan'], answer: 1, qHindi: 'ग्राहक किस प्रकार का खाता चाहता है?' },
      { q: 'What is the minimum balance requirement?', options: ['500 rupees', '1,000 rupees', '2,000 rupees', '5,000 rupees'], answer: 1, qHindi: 'न्यूनतम बैलेंस की आवश्यकता क्या है?' },
      { q: 'When will the debit card arrive?', options: ['Same day', '3 days', '7 working days', '15 days'], answer: 2, qHindi: 'डेबिट कार्ड कब आएगा?' }
    ]),
    vocabulary: JSON.stringify(['savings account', 'minimum balance', 'debit card', 'mobile banking']),
    order: 7
  },
  {
    title: 'Airport Announcement',
    titleHindi: 'हवाई अड्डे की घोषणा',
    description: 'Listen to announcements at an airport',
    descriptionHindi: 'हवाई अड्डे पर घोषणाएं सुनें',
    difficulty: 'Advanced',
    category: 'Airport',
    audioText: `Attention all passengers. This is a boarding announcement for Air India flight AI-302 to Mumbai. Boarding will begin shortly at Gate 14. We request all passengers to have their boarding passes and identification ready. Passengers requiring special assistance or traveling with small children may board first. Please ensure all electronic devices are switched off during takeoff and landing. We thank you for choosing Air India and wish you a pleasant journey. Final call for passengers Mr. Sharma and Ms. Gupta traveling to Mumbai on flight AI-302. Please proceed to Gate 14 immediately.`,
    audioTextHindi: `सभी यात्रियों का ध्यान दें। यह मुंबई जाने वाली एयर इंडिया फ्लाइट AI-302 के लिए बोर्डिंग की घोषणा है। बोर्डिंग जल्द ही गेट 14 पर शुरू होगी। हम सभी यात्रियों से अनुरोध करते हैं कि अपने बोर्डिंग पास और पहचान पत्र तैयार रखें। विशेष सहायता की आवश्यकता वाले यात्री या छोटे बच्चों के साथ यात्रा करने वाले पहले बोर्ड कर सकते हैं। कृपया सुनिश्चित करें कि टेकऑफ और लैंडिंग के दौरान सभी इलेक्ट्रॉनिक उपकरण बंद हों। एयर इंडिया चुनने के लिए धन्यवाद और आपकी यात्रा शुभ हो। फ्लाइट AI-302 से मुंबई जाने वाले श्री शर्मा और सुश्री गुप्ता के लिए अंतिम कॉल। कृपया तुरंत गेट 14 पर पहुंचें।`,
    duration: '1:30',
    questions: JSON.stringify([
      { q: 'What is the flight number?', options: ['AI-203', 'AI-302', 'AI-320', 'AI-230'], answer: 1, qHindi: 'फ्लाइट नंबर क्या है?' },
      { q: 'Which gate should passengers go to?', options: ['Gate 12', 'Gate 13', 'Gate 14', 'Gate 15'], answer: 2, qHindi: 'यात्रियों को किस गेट पर जाना चाहिए?' },
      { q: 'Who can board first?', options: ['Business class', 'People with children', 'Senior citizens', 'All passengers'], answer: 1, qHindi: 'पहले कौन बोर्ड कर सकता है?' }
    ]),
    vocabulary: JSON.stringify(['boarding', 'identification', 'assistance', 'proceed']),
    order: 8
  },
  {
    title: 'Weather Forecast',
    titleHindi: 'मौसम का पूर्वानुमान',
    description: 'Listen to a weather forecast for the week',
    descriptionHindi: 'सप्ताह के लिए मौसम का पूर्वानुमान सुनें',
    difficulty: 'Intermediate',
    category: 'Weather',
    audioText: `Good evening, and here is your weekly weather forecast for Delhi. Today we experienced a high of 32 degrees Celsius with partly cloudy skies. Tomorrow, expect similar conditions with temperatures ranging from 28 to 33 degrees. Wednesday and Thursday will see an increase in humidity as we approach the monsoon season. There is a 60% chance of rain on Friday, so do carry an umbrella if you are heading out. The weekend looks pleasant with temperatures dropping to around 29 degrees and clear skies. Air quality is expected to remain moderate throughout the week. Stay hydrated and avoid prolonged exposure to the afternoon sun.`,
    audioTextHindi: `शुभ संध्या, और यहां दिल्ली के लिए आपका साप्ताहिक मौसम पूर्वानुमान है। आज हमने आंशिक रूप से बादल छाए आसमान के साथ 32 डिग्री सेल्सियस का उच्च तापमान अनुभव किया। कल, 28 से 33 डिग्री के बीच तापमान के साथ समान स्थिति की उम्मीद करें। बुधवार और गुरुवार को मानसून के मौसम के करीब आने पर आर्द्रता में वृद्धि देखी जाएगी। शुक्रवार को बारिश की 60% संभावना है, इसलिए अगर आप बाहर जा रहे हैं तो छाता जरूर ले जाएं। सप्ताहांत सुहावना दिखता है जिसमें तापमान लगभग 29 डिग्री तक गिर जाएगा और आसमान साफ रहेगा। पूरे सप्ताह वायु गुणवत्ता मध्यम रहने की उम्मीद है। हाइड्रेटेड रहें और दोपहर की धूप में लंबे समय तक रहने से बचें।`,
    duration: '1:45',
    questions: JSON.stringify([
      { q: 'What was today\'s high temperature?', options: ['28°C', '30°C', '32°C', '35°C'], answer: 2, qHindi: 'आज का उच्च तापमान क्या था?' },
      { q: 'When is rain expected?', options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], answer: 2, qHindi: 'बारिश कब होने की उम्मीद है?' },
      { q: 'What should people carry on Friday?', options: ['Sunglasses', 'Umbrella', 'Jacket', 'Hat'], answer: 1, qHindi: 'शुक्रवार को लोगों को क्या ले जाना चाहिए?' }
    ]),
    vocabulary: JSON.stringify(['forecast', 'humidity', 'monsoon', 'hydrated']),
    order: 9
  },
  {
    title: 'Office Meeting',
    titleHindi: 'ऑफिस मीटिंग',
    description: 'Listen to a team discussing a project deadline',
    descriptionHindi: 'एक टीम को प्रोजेक्ट की समय सीमा पर चर्चा करते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Business',
    audioText: `Manager: Good morning, everyone. Let us discuss the status of the mobile app project. Rahul, can you give us an update?
Rahul: Sure. The development team has completed 80% of the features. We are currently working on the payment integration.
Manager: When do you expect to finish?
Rahul: We should be done by next Wednesday if there are no major issues.
Priya: I have a concern. The testing team needs at least one week to do proper quality assurance.
Manager: That is a valid point. So we are looking at two weeks before launch?
Rahul: Yes, that would be realistic.
Manager: Okay, let us set the launch date for the 25th. Priya, please coordinate with the marketing team for the announcement.
Priya: Will do. I will send out a timeline by end of day.`,
    audioTextHindi: `मैनेजर: सुप्रभात, सभी को। आइए मोबाइल ऐप प्रोजेक्ट की स्थिति पर चर्चा करें। राहुल, क्या आप हमें अपडेट दे सकते हैं?
राहुल: जी। डेवलपमेंट टीम ने 80% फीचर्स पूरे कर लिए हैं। हम वर्तमान में पेमेंट इंटीग्रेशन पर काम कर रहे हैं।
मैनेजर: आप कब तक पूरा करने की उम्मीद करते हैं?
राहुल: अगर कोई बड़ी समस्या नहीं हुई तो अगले बुधवार तक हो जाना चाहिए।
प्रिया: मुझे एक चिंता है। टेस्टिंग टीम को उचित क्वालिटी एश्योरेंस के लिए कम से कम एक सप्ताह चाहिए।
मैनेजर: यह एक वैध बिंदु है। तो हम लॉन्च से पहले दो सप्ताह देख रहे हैं?
राहुल: हां, यह यथार्थवादी होगा।
मैनेजर: ठीक है, आइए लॉन्च की तारीख 25 तारीख रखें। प्रिया, कृपया घोषणा के लिए मार्केटिंग टीम के साथ समन्वय करें।
प्रिया: जी करूंगी। मैं आज शाम तक टाइमलाइन भेज दूंगी।`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'What percentage of features is complete?', options: ['60%', '70%', '80%', '90%'], answer: 2, qHindi: 'कितने प्रतिशत फीचर्स पूरे हो गए हैं?' },
      { q: 'What is the team currently working on?', options: ['Design', 'Testing', 'Payment integration', 'Marketing'], answer: 2, qHindi: 'टीम वर्तमान में किस पर काम कर रही है?' },
      { q: 'What is the planned launch date?', options: ['15th', '20th', '25th', '30th'], answer: 2, qHindi: 'नियोजित लॉन्च तारीख क्या है?' }
    ]),
    vocabulary: JSON.stringify(['integration', 'quality assurance', 'realistic', 'coordinate']),
    order: 10
  }
];

async function seedListenings() {
  console.log('=== SEEDING LISTENING EXERCISES ===\n');

  const insertStmt = db.prepare(`
    INSERT INTO listenings (title, title_hindi, description, description_hindi, difficulty, category, audio_text, audio_text_hindi, duration, questions, vocabulary, "order")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let added = 0;
  for (const listening of LISTENINGS) {
    try {
      insertStmt.run(
        listening.title,
        listening.titleHindi,
        listening.description,
        listening.descriptionHindi,
        listening.difficulty,
        listening.category,
        listening.audioText,
        listening.audioTextHindi,
        listening.duration,
        listening.questions,
        listening.vocabulary,
        listening.order
      );
      added++;
      console.log(`  ✅ Added: ${listening.title}`);
    } catch (err: any) {
      if (err.message.includes('UNIQUE')) {
        console.log(`  ⏭️ Skipped (exists): ${listening.title}`);
      } else {
        console.log(`  ❌ Error: ${listening.title} - ${err.message}`);
      }
    }
  }

  console.log(`\n✅ SEEDING COMPLETE: ${added} listening exercises added`);
  db.close();
}

seedListenings().catch(console.error);
