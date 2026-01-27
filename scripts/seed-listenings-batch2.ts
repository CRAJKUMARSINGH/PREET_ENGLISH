/**
 * LISTENING CONTENT SEEDER - BATCH 2
 * Adds 40 more listening exercises across various categories
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

const LISTENINGS = [
  // BEGINNER LEVEL (11-20)
  {
    title: 'Introducing Your Family',
    titleHindi: 'अपने परिवार का परिचय',
    description: 'Listen to someone introducing their family members',
    descriptionHindi: 'किसी को अपने परिवार के सदस्यों का परिचय देते हुए सुनें',
    difficulty: 'Beginner',
    category: 'Family',
    audioText: `Hello, my name is Amit. Let me introduce my family. My father is Rajesh. He is 55 years old and works as an engineer. My mother is Sunita. She is 50 years old and is a homemaker. I have one sister. Her name is Priya. She is 22 years old and studies medicine. We also have a pet dog named Bruno. He is very friendly. We live in a small house in Delhi. I love my family very much.`,
    audioTextHindi: `नमस्ते, मेरा नाम अमित है। मैं अपने परिवार का परिचय देता हूं। मेरे पिता राजेश हैं। वे 55 साल के हैं और इंजीनियर हैं। मेरी माँ सुनीता हैं। वे 50 साल की हैं और गृहिणी हैं। मेरी एक बहन है। उसका नाम प्रिया है। वह 22 साल की है और मेडिसिन पढ़ती है। हमारे पास ब्रूनो नाम का एक पालतू कुत्ता भी है। वह बहुत मिलनसार है। हम दिल्ली में एक छोटे से घर में रहते हैं। मुझे अपने परिवार से बहुत प्यार है।`,
    duration: '1:15',
    questions: JSON.stringify([
      { q: 'What is the father\'s profession?', options: ['Doctor', 'Engineer', 'Teacher', 'Businessman'], answer: 1, qHindi: 'पिता का पेशा क्या है?' },
      { q: 'How old is Priya?', options: ['20', '21', '22', '25'], answer: 2, qHindi: 'प्रिया कितने साल की है?' },
      { q: 'What is the pet\'s name?', options: ['Tommy', 'Bruno', 'Max', 'Rocky'], answer: 1, qHindi: 'पालतू जानवर का नाम क्या है?' }
    ]),
    vocabulary: JSON.stringify(['introduce', 'homemaker', 'friendly', 'medicine']),
    order: 11
  },
  {
    title: 'Daily Morning Routine',
    titleHindi: 'रोज़ाना सुबह की दिनचर्या',
    description: 'Listen to someone describing their morning routine',
    descriptionHindi: 'किसी को अपनी सुबह की दिनचर्या बताते हुए सुनें',
    difficulty: 'Beginner',
    category: 'Daily',
    audioText: `I wake up at 6 AM every day. First, I brush my teeth and wash my face. Then I do yoga for 20 minutes. After that, I take a shower. I eat breakfast at 7:30. I usually have toast, eggs, and tea. I get dressed and leave for work at 8:15. I take the metro to my office. It takes about 30 minutes. I reach office by 9 AM.`,
    audioTextHindi: `मैं हर दिन सुबह 6 बजे उठता हूं। पहले, मैं अपने दांत साफ करता हूं और मुंह धोता हूं। फिर मैं 20 मिनट योग करता हूं। उसके बाद, मैं नहाता हूं। मैं 7:30 बजे नाश्ता करता हूं। मैं आमतौर पर टोस्ट, अंडे और चाय लेता हूं। मैं कपड़े पहनता हूं और 8:15 बजे काम के लिए निकलता हूं। मैं मेट्रो से ऑफिस जाता हूं। इसमें लगभग 30 मिनट लगते हैं। मैं 9 बजे तक ऑफिस पहुंच जाता हूं।`,
    duration: '1:20',
    questions: JSON.stringify([
      { q: 'What time does the person wake up?', options: ['5 AM', '6 AM', '7 AM', '8 AM'], answer: 1, qHindi: 'व्यक्ति कितने बजे उठता है?' },
      { q: 'How long does yoga take?', options: ['10 minutes', '15 minutes', '20 minutes', '30 minutes'], answer: 2, qHindi: 'योग में कितना समय लगता है?' },
      { q: 'How does the person go to office?', options: ['Bus', 'Car', 'Metro', 'Walk'], answer: 2, qHindi: 'व्यक्ति ऑफिस कैसे जाता है?' }
    ]),
    vocabulary: JSON.stringify(['routine', 'shower', 'usually', 'reach']),
    order: 12
  },
  {
    title: 'At the Grocery Store',
    titleHindi: 'किराने की दुकान पर',
    description: 'Listen to a conversation at a grocery store',
    descriptionHindi: 'किराने की दुकान पर बातचीत सुनें',
    difficulty: 'Beginner',
    category: 'Shopping',
    audioText: `Customer: Good morning. I need some vegetables.
Shopkeeper: Good morning, madam. What would you like?
Customer: I need one kilo of tomatoes and half kilo of onions.
Shopkeeper: Here you go. Anything else?
Customer: Yes, do you have fresh coriander?
Shopkeeper: Yes, it is very fresh today. How much do you need?
Customer: Just one bunch, please. How much is the total?
Shopkeeper: Tomatoes are 40 rupees, onions are 25 rupees, and coriander is 10 rupees. Total is 75 rupees.
Customer: Here is 100 rupees.
Shopkeeper: And here is your change, 25 rupees. Thank you!`,
    audioTextHindi: `ग्राहक: सुप्रभात। मुझे कुछ सब्जियां चाहिए।
दुकानदार: सुप्रभात, मैडम। आपको क्या चाहिए?
ग्राहक: मुझे एक किलो टमाटर और आधा किलो प्याज चाहिए।
दुकानदार: यह लीजिए। और कुछ?
ग्राहक: हां, क्या आपके पास ताजा धनिया है?
दुकानदार: हां, आज बहुत ताजा है। आपको कितना चाहिए?
ग्राहक: बस एक गुच्छा, कृपया। कुल कितना हुआ?
दुकानदार: टमाटर 40 रुपये, प्याज 25 रुपये, और धनिया 10 रुपये। कुल 75 रुपये।
ग्राहक: यह लीजिए 100 रुपये।
दुकानदार: और यह आपका बाकी, 25 रुपये। धन्यवाद!`,
    duration: '1:30',
    questions: JSON.stringify([
      { q: 'How much tomatoes does the customer want?', options: ['Half kilo', 'One kilo', 'Two kilos', 'Quarter kilo'], answer: 1, qHindi: 'ग्राहक को कितने टमाटर चाहिए?' },
      { q: 'What is the total bill?', options: ['65 rupees', '70 rupees', '75 rupees', '80 rupees'], answer: 2, qHindi: 'कुल बिल कितना है?' },
      { q: 'How much change does the customer get?', options: ['20 rupees', '25 rupees', '30 rupees', '35 rupees'], answer: 1, qHindi: 'ग्राहक को कितने पैसे वापस मिलते हैं?' }
    ]),
    vocabulary: JSON.stringify(['vegetables', 'fresh', 'bunch', 'change']),
    order: 13
  },
  {
    title: 'Calling a Friend',
    titleHindi: 'दोस्त को फोन करना',
    description: 'Listen to a phone conversation between friends',
    descriptionHindi: 'दोस्तों के बीच फोन पर बातचीत सुनें',
    difficulty: 'Beginner',
    category: 'Telephone',
    audioText: `Rahul: Hello?
Vikram: Hi Rahul! This is Vikram. How are you?
Rahul: Hey Vikram! I am good. What about you?
Vikram: I am fine. Listen, are you free this Saturday?
Rahul: Yes, I think so. Why?
Vikram: There is a new movie releasing. Do you want to watch it together?
Rahul: Sure! Which movie?
Vikram: It is an action movie. The show is at 6 PM at City Mall.
Rahul: Sounds great! Should I book the tickets?
Vikram: Yes, please book two tickets. I will pay you later.
Rahul: No problem. See you on Saturday!
Vikram: See you! Bye!`,
    audioTextHindi: `राहुल: हैलो?
विक्रम: हाय राहुल! मैं विक्रम बोल रहा हूं। कैसे हो?
राहुल: अरे विक्रम! मैं ठीक हूं। तुम कैसे हो?
विक्रम: मैं ठीक हूं। सुनो, क्या तुम इस शनिवार को फ्री हो?
राहुल: हां, मुझे लगता है। क्यों?
विक्रम: एक नई फिल्म रिलीज हो रही है। क्या तुम साथ में देखना चाहोगे?
राहुल: बिल्कुल! कौन सी फिल्म?
विक्रम: यह एक एक्शन फिल्म है। शो शाम 6 बजे सिटी मॉल में है।
राहुल: बढ़िया लगता है! क्या मैं टिकट बुक कर लूं?
विक्रम: हां, कृपया दो टिकट बुक कर लो। मैं बाद में पैसे दे दूंगा।
राहुल: कोई बात नहीं। शनिवार को मिलते हैं!
विक्रम: मिलते हैं! बाय!`,
    duration: '1:25',
    questions: JSON.stringify([
      { q: 'What day are they planning to meet?', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], answer: 1, qHindi: 'वे किस दिन मिलने की योजना बना रहे हैं?' },
      { q: 'What type of movie is it?', options: ['Comedy', 'Romance', 'Action', 'Horror'], answer: 2, qHindi: 'यह किस प्रकार की फिल्म है?' },
      { q: 'How many tickets should Rahul book?', options: ['One', 'Two', 'Three', 'Four'], answer: 1, qHindi: 'राहुल को कितने टिकट बुक करने चाहिए?' }
    ]),
    vocabulary: JSON.stringify(['releasing', 'together', 'sounds', 'problem']),
    order: 14
  },
  {
    title: 'Describing Your House',
    titleHindi: 'अपने घर का वर्णन',
    description: 'Listen to someone describing their house',
    descriptionHindi: 'किसी को अपने घर का वर्णन करते हुए सुनें',
    difficulty: 'Beginner',
    category: 'Daily',
    audioText: `I live in a two-bedroom apartment on the third floor. When you enter, there is a small living room with a sofa and a TV. The kitchen is on the right side. It is not very big but has everything we need. There are two bedrooms. My parents sleep in the bigger one. I share the smaller room with my brother. We have one bathroom. There is also a small balcony where my mother keeps plants. I like my house because it is cozy and comfortable.`,
    audioTextHindi: `मैं तीसरी मंजिल पर दो बेडरूम के अपार्टमेंट में रहता हूं। जब आप अंदर आते हैं, तो एक छोटा लिविंग रूम है जिसमें सोफा और टीवी है। किचन दाईं तरफ है। यह बहुत बड़ा नहीं है लेकिन इसमें वह सब कुछ है जो हमें चाहिए। दो बेडरूम हैं। मेरे माता-पिता बड़े वाले में सोते हैं। मैं छोटे कमरे में अपने भाई के साथ रहता हूं। हमारे पास एक बाथरूम है। एक छोटी बालकनी भी है जहां मेरी माँ पौधे रखती हैं। मुझे अपना घर पसंद है क्योंकि यह आरामदायक है।`,
    duration: '1:20',
    questions: JSON.stringify([
      { q: 'On which floor is the apartment?', options: ['First', 'Second', 'Third', 'Fourth'], answer: 2, qHindi: 'अपार्टमेंट किस मंजिल पर है?' },
      { q: 'How many bedrooms are there?', options: ['One', 'Two', 'Three', 'Four'], answer: 1, qHindi: 'कितने बेडरूम हैं?' },
      { q: 'What does the mother keep on the balcony?', options: ['Clothes', 'Plants', 'Furniture', 'Nothing'], answer: 1, qHindi: 'माँ बालकनी में क्या रखती हैं?' }
    ]),
    vocabulary: JSON.stringify(['apartment', 'balcony', 'cozy', 'comfortable']),
    order: 15
  },
  // INTERMEDIATE LEVEL (16-30)
  {
    title: 'Complaining About a Product',
    titleHindi: 'उत्पाद के बारे में शिकायत',
    description: 'Listen to a customer making a complaint',
    descriptionHindi: 'एक ग्राहक को शिकायत करते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Shopping',
    audioText: `Customer: Excuse me, I bought this phone charger yesterday and it is not working.
Staff: I am sorry to hear that. Do you have the receipt?
Customer: Yes, here it is.
Staff: Let me check. Can you tell me what the problem is?
Customer: When I plug it in, the light does not turn on and my phone does not charge.
Staff: I see. Would you like a replacement or a refund?
Customer: I would prefer a replacement if you have the same model.
Staff: Let me check our stock. Yes, we have one more. Here you go.
Customer: Thank you. Will this one work properly?
Staff: We have tested it. It should work fine. If you face any issues, please come back within 7 days.`,
    audioTextHindi: `ग्राहक: माफ कीजिए, मैंने कल यह फोन चार्जर खरीदा था और यह काम नहीं कर रहा।
स्टाफ: यह सुनकर दुख हुआ। क्या आपके पास रसीद है?
ग्राहक: हां, यह रही।
स्टाफ: मुझे देखने दीजिए। क्या आप बता सकते हैं समस्या क्या है?
ग्राहक: जब मैं इसे प्लग करता हूं, तो लाइट नहीं जलती और मेरा फोन चार्ज नहीं होता।
स्टाफ: समझा। क्या आप रिप्लेसमेंट चाहेंगे या रिफंड?
ग्राहक: अगर आपके पास वही मॉडल है तो मैं रिप्लेसमेंट पसंद करूंगा।
स्टाफ: मुझे स्टॉक चेक करने दीजिए। हां, हमारे पास एक और है। यह लीजिए।
ग्राहक: धन्यवाद। क्या यह ठीक से काम करेगा?
स्टाफ: हमने इसे टेस्ट किया है। यह ठीक काम करना चाहिए। अगर कोई समस्या हो, तो 7 दिनों के अंदर वापस आइए।`,
    duration: '1:45',
    questions: JSON.stringify([
      { q: 'When did the customer buy the charger?', options: ['Today', 'Yesterday', 'Last week', 'Last month'], answer: 1, qHindi: 'ग्राहक ने चार्जर कब खरीदा?' },
      { q: 'What does the customer prefer?', options: ['Refund', 'Replacement', 'Discount', 'Nothing'], answer: 1, qHindi: 'ग्राहक क्या पसंद करता है?' },
      { q: 'How many days can the customer return if there are issues?', options: ['3 days', '5 days', '7 days', '10 days'], answer: 2, qHindi: 'समस्या होने पर ग्राहक कितने दिनों में वापस कर सकता है?' }
    ]),
    vocabulary: JSON.stringify(['complaint', 'replacement', 'refund', 'properly']),
    order: 16
  },
  {
    title: 'Making a Restaurant Reservation',
    titleHindi: 'रेस्तरां में आरक्षण करना',
    description: 'Listen to someone making a dinner reservation',
    descriptionHindi: 'किसी को डिनर का आरक्षण करते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Restaurant',
    audioText: `Host: Good afternoon, Spice Garden Restaurant. How may I help you?
Caller: Hi, I would like to make a reservation for dinner tonight.
Host: Certainly. For how many people?
Caller: Six people. We are celebrating a birthday.
Host: That is wonderful! What time would you prefer?
Caller: Around 8 PM, if possible.
Host: Let me check. We have a table available at 8:15. Would that work?
Caller: Yes, that is fine.
Host: Would you like a regular table or a private dining area?
Caller: A private area would be nice since it is a celebration.
Host: Perfect. May I have your name and contact number?
Caller: My name is Neha Kapoor. My number is 98765-43210.
Host: Thank you, Ms. Kapoor. Your reservation is confirmed for 6 people at 8:15 PM in our private dining area.`,
    audioTextHindi: `होस्ट: शुभ दोपहर, स्पाइस गार्डन रेस्तरां। मैं आपकी कैसे मदद कर सकता हूं?
कॉलर: हाय, मैं आज रात के डिनर के लिए आरक्षण करना चाहती हूं।
होस्ट: जी बिल्कुल। कितने लोगों के लिए?
कॉलर: छह लोग। हम जन्मदिन मना रहे हैं।
होस्ट: यह बढ़िया है! आप किस समय पसंद करेंगी?
कॉलर: शाम 8 बजे के आसपास, अगर संभव हो।
होस्ट: मुझे देखने दीजिए। हमारे पास 8:15 पर एक टेबल उपलब्ध है। क्या यह ठीक रहेगा?
कॉलर: हां, यह ठीक है।
होस्ट: क्या आप सामान्य टेबल चाहेंगी या प्राइवेट डाइनिंग एरिया?
कॉलर: प्राइवेट एरिया अच्छा रहेगा क्योंकि यह सेलिब्रेशन है।
होस्ट: बिल्कुल। क्या मुझे आपका नाम और संपर्क नंबर मिल सकता है?
कॉलर: मेरा नाम नेहा कपूर है। मेरा नंबर 98765-43210 है।
होस्ट: धन्यवाद, मिस कपूर। आपका आरक्षण 6 लोगों के लिए शाम 8:15 बजे हमारे प्राइवेट डाइनिंग एरिया में कन्फर्म है।`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'How many people is the reservation for?', options: ['Four', 'Five', 'Six', 'Seven'], answer: 2, qHindi: 'आरक्षण कितने लोगों के लिए है?' },
      { q: 'What is the occasion?', options: ['Anniversary', 'Birthday', 'Promotion', 'Wedding'], answer: 1, qHindi: 'अवसर क्या है?' },
      { q: 'What time is the reservation confirmed for?', options: ['8:00 PM', '8:15 PM', '8:30 PM', '9:00 PM'], answer: 1, qHindi: 'आरक्षण किस समय के लिए कन्फर्म है?' }
    ]),
    vocabulary: JSON.stringify(['reservation', 'celebration', 'private', 'confirmed']),
    order: 17
  },
  {
    title: 'Discussing Weekend Plans',
    titleHindi: 'सप्ताहांत की योजनाओं पर चर्चा',
    description: 'Listen to colleagues discussing their weekend plans',
    descriptionHindi: 'सहकर्मियों को सप्ताहांत की योजनाओं पर चर्चा करते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Conversation',
    audioText: `Anita: Hey Sanjay, any plans for the weekend?
Sanjay: Yes, actually. My family is visiting from Jaipur, so I am taking them sightseeing.
Anita: That sounds nice! Where are you planning to take them?
Sanjay: On Saturday, we will visit the Red Fort and India Gate. On Sunday, we might go to a mall for shopping.
Anita: Great choices! The weather should be pleasant too.
Sanjay: Yes, I hope so. What about you? Any plans?
Anita: I am planning to attend a cooking workshop on Saturday. They are teaching South Indian cuisine.
Sanjay: Oh, that is interesting! You love cooking, right?
Anita: Yes, I want to learn to make authentic dosa and sambar.
Sanjay: Sounds delicious! You should bring some to office on Monday.
Anita: Ha ha, maybe I will!`,
    audioTextHindi: `अनीता: अरे संजय, सप्ताहांत के लिए कोई योजना?
संजय: हां, वास्तव में। मेरा परिवार जयपुर से आ रहा है, तो मैं उन्हें घुमाने ले जा रहा हूं।
अनीता: यह अच्छा लगता है! आप उन्हें कहां ले जाने की योजना बना रहे हैं?
संजय: शनिवार को, हम लाल किला और इंडिया गेट देखेंगे। रविवार को, हम शॉपिंग के लिए मॉल जा सकते हैं।
अनीता: बढ़िया विकल्प! मौसम भी सुहावना होना चाहिए।
संजय: हां, मुझे उम्मीद है। तुम्हारा क्या? कोई योजना?
अनीता: मैं शनिवार को कुकिंग वर्कशॉप में जाने की योजना बना रही हूं। वे साउथ इंडियन व्यंजन सिखा रहे हैं।
संजय: ओह, यह दिलचस्प है! तुम्हें खाना बनाना पसंद है, है ना?
अनीता: हां, मैं प्रामाणिक डोसा और सांभर बनाना सीखना चाहती हूं।
संजय: स्वादिष्ट लगता है! तुम्हें सोमवार को ऑफिस में कुछ लाना चाहिए।
अनीता: हा हा, शायद लाऊंगी!`,
    duration: '1:50',
    questions: JSON.stringify([
      { q: 'Where is Sanjay\'s family visiting from?', options: ['Delhi', 'Mumbai', 'Jaipur', 'Kolkata'], answer: 2, qHindi: 'संजय का परिवार कहां से आ रहा है?' },
      { q: 'What is Anita planning to do on Saturday?', options: ['Shopping', 'Sightseeing', 'Cooking workshop', 'Movie'], answer: 2, qHindi: 'अनीता शनिवार को क्या करने की योजना बना रही है?' },
      { q: 'What cuisine will Anita learn?', options: ['North Indian', 'South Indian', 'Chinese', 'Italian'], answer: 1, qHindi: 'अनीता कौन सा व्यंजन सीखेगी?' }
    ]),
    vocabulary: JSON.stringify(['sightseeing', 'workshop', 'authentic', 'pleasant']),
    order: 18
  },
  {
    title: 'Gym Membership Inquiry',
    titleHindi: 'जिम सदस्यता पूछताछ',
    description: 'Listen to someone asking about gym membership',
    descriptionHindi: 'किसी को जिम सदस्यता के बारे में पूछते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Gym',
    audioText: `Staff: Welcome to FitLife Gym! How can I help you?
Customer: Hi, I am interested in joining. Can you tell me about your membership plans?
Staff: Sure! We have three plans. Monthly is 2,000 rupees, quarterly is 5,000 rupees, and annual is 15,000 rupees.
Customer: What facilities are included?
Staff: All plans include access to the gym floor, cardio equipment, and weight training area. The quarterly and annual plans also include two free personal training sessions per month.
Customer: What are the gym timings?
Staff: We are open from 5 AM to 10 PM, seven days a week.
Customer: Do you have separate batches for women?
Staff: Yes, we have women-only batches from 10 AM to 12 PM and 4 PM to 6 PM.
Customer: That is great. I think I will go with the quarterly plan.
Staff: Excellent choice! Let me get the registration form.`,
    audioTextHindi: `स्टाफ: फिटलाइफ जिम में आपका स्वागत है! मैं आपकी कैसे मदद कर सकता हूं?
ग्राहक: हाय, मुझे जॉइन करने में रुचि है। क्या आप अपनी सदस्यता योजनाओं के बारे में बता सकते हैं?
स्टाफ: जी! हमारे पास तीन प्लान हैं। मासिक 2,000 रुपये, त्रैमासिक 5,000 रुपये, और वार्षिक 15,000 रुपये।
ग्राहक: कौन सी सुविधाएं शामिल हैं?
स्टाफ: सभी प्लान में जिम फ्लोर, कार्डियो उपकरण, और वेट ट्रेनिंग एरिया का एक्सेस शामिल है। त्रैमासिक और वार्षिक प्लान में प्रति माह दो मुफ्त पर्सनल ट्रेनिंग सेशन भी शामिल हैं।
ग्राहक: जिम का समय क्या है?
स्टाफ: हम सुबह 5 बजे से रात 10 बजे तक खुले हैं, सप्ताह के सातों दिन।
ग्राहक: क्या आपके पास महिलाओं के लिए अलग बैच हैं?
स्टाफ: हां, हमारे पास सुबह 10 से 12 बजे और शाम 4 से 6 बजे तक केवल महिलाओं के बैच हैं।
ग्राहक: यह बढ़िया है। मुझे लगता है मैं त्रैमासिक प्लान लूंगी।
स्टाफ: बढ़िया चुनाव! मुझे रजिस्ट्रेशन फॉर्म लाने दीजिए।`,
    duration: '1:55',
    questions: JSON.stringify([
      { q: 'How much is the annual membership?', options: ['10,000', '12,000', '15,000', '18,000'], answer: 2, qHindi: 'वार्षिक सदस्यता कितनी है?' },
      { q: 'What time does the gym open?', options: ['4 AM', '5 AM', '6 AM', '7 AM'], answer: 1, qHindi: 'जिम कितने बजे खुलता है?' },
      { q: 'Which plan does the customer choose?', options: ['Monthly', 'Quarterly', 'Annual', 'Not decided'], answer: 1, qHindi: 'ग्राहक कौन सा प्लान चुनता है?' }
    ]),
    vocabulary: JSON.stringify(['membership', 'facilities', 'quarterly', 'registration']),
    order: 19
  },
  {
    title: 'Reporting a Lost Item',
    titleHindi: 'खोई हुई वस्तु की रिपोर्ट',
    description: 'Listen to someone reporting a lost wallet at a metro station',
    descriptionHindi: 'किसी को मेट्रो स्टेशन पर खोए हुए बटुए की रिपोर्ट करते हुए सुनें',
    difficulty: 'Intermediate',
    category: 'Emergency',
    audioText: `Passenger: Excuse me, I think I lost my wallet on the metro.
Staff: I am sorry to hear that. When did you notice it was missing?
Passenger: Just now, when I reached this station. I had it when I boarded at Rajiv Chowk.
Staff: What time was that?
Passenger: Around 3:30 PM. I was in the second coach.
Staff: Can you describe your wallet?
Passenger: It is a brown leather wallet. It has my ID card, two credit cards, and about 2,000 rupees in cash.
Staff: Okay, let me check with our lost and found department. Please fill out this form with your details.
Passenger: Should I also file a police complaint?
Staff: For the ID and credit cards, yes, that would be advisable. You should also block your credit cards immediately.
Passenger: Yes, I will do that right away. Thank you for your help.`,
    audioTextHindi: `यात्री: माफ कीजिए, मुझे लगता है मैंने मेट्रो में अपना बटुआ खो दिया।
स्टाफ: यह सुनकर दुख हुआ। आपको कब पता चला कि यह गायब है?
यात्री: अभी, जब मैं इस स्टेशन पर पहुंचा। जब मैं राजीव चौक से चढ़ा था तब मेरे पास था।
स्टाफ: वह कितने बजे था?
यात्री: लगभग 3:30 बजे। मैं दूसरे कोच में था।
स्टाफ: क्या आप अपने बटुए का वर्णन कर सकते हैं?
यात्री: यह भूरे रंग का चमड़े का बटुआ है। इसमें मेरा आईडी कार्ड, दो क्रेडिट कार्ड, और लगभग 2,000 रुपये नकद हैं।
स्टाफ: ठीक है, मुझे लॉस्ट एंड फाउंड विभाग से जांच करने दीजिए। कृपया इस फॉर्म में अपना विवरण भरें।
यात्री: क्या मुझे पुलिस में भी शिकायत दर्ज करानी चाहिए?
स्टाफ: आईडी और क्रेडिट कार्ड के लिए, हां, यह उचित होगा। आपको अपने क्रेडिट कार्ड भी तुरंत ब्लॉक करने चाहिए।
यात्री: हां, मैं अभी करता हूं। आपकी मदद के लिए धन्यवाद।`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'Where did the passenger board the metro?', options: ['Central', 'Rajiv Chowk', 'Kashmere Gate', 'Connaught Place'], answer: 1, qHindi: 'यात्री मेट्रो में कहां चढ़ा?' },
      { q: 'What color is the wallet?', options: ['Black', 'Brown', 'Blue', 'Red'], answer: 1, qHindi: 'बटुए का रंग क्या है?' },
      { q: 'How much cash was in the wallet?', options: ['1,000 rupees', '1,500 rupees', '2,000 rupees', '2,500 rupees'], answer: 2, qHindi: 'बटुए में कितने नकद थे?' }
    ]),
    vocabulary: JSON.stringify(['notice', 'describe', 'advisable', 'immediately']),
    order: 20
  },
  // ADVANCED LEVEL (21-30)
  {
    title: 'Business Presentation Feedback',
    titleHindi: 'व्यापार प्रस्तुति पर प्रतिक्रिया',
    description: 'Listen to a manager giving feedback on a presentation',
    descriptionHindi: 'एक मैनेजर को प्रस्तुति पर प्रतिक्रिया देते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Business',
    audioText: `Manager: Ravi, I wanted to discuss your presentation from yesterday. Overall, it was quite impressive.
Ravi: Thank you, sir. I worked hard on it.
Manager: The data analysis was thorough, and your slides were well-designed. However, I have a few suggestions.
Ravi: Please, I would appreciate your feedback.
Manager: First, try to maintain more eye contact with the audience. You were reading from your notes too often.
Ravi: Yes, I was nervous. I will practice more.
Manager: Second, the financial projections section was a bit rushed. Take more time to explain complex numbers.
Ravi: I understand. I was worried about the time limit.
Manager: It is better to cover fewer points thoroughly than many points superficially. Also, your conclusion was strong, but add a clear call to action next time.
Ravi: These are valuable suggestions. Thank you for taking the time to guide me.
Manager: You have potential. Keep improving, and you will become an excellent presenter.`,
    audioTextHindi: `मैनेजर: रवि, मैं कल की तुम्हारी प्रस्तुति पर चर्चा करना चाहता था। कुल मिलाकर, यह काफी प्रभावशाली थी।
रवि: धन्यवाद, सर। मैंने इस पर कड़ी मेहनत की।
मैनेजर: डेटा विश्लेषण गहन था, और तुम्हारी स्लाइड्स अच्छी तरह डिज़ाइन की गई थीं। हालांकि, मेरे पास कुछ सुझाव हैं।
रवि: कृपया, मैं आपकी प्रतिक्रिया की सराहना करूंगा।
मैनेजर: पहला, दर्शकों के साथ अधिक आई कॉन्टैक्ट बनाए रखने की कोशिश करो। तुम अपने नोट्स से बहुत बार पढ़ रहे थे।
रवि: हां, मैं नर्वस था। मैं और अभ्यास करूंगा।
मैनेजर: दूसरा, वित्तीय अनुमान वाला भाग थोड़ा जल्दबाजी में था। जटिल संख्याओं को समझाने में अधिक समय लो।
रवि: मैं समझता हूं। मुझे समय सीमा की चिंता थी।
मैनेजर: कम बिंदुओं को अच्छी तरह कवर करना बेहतर है बजाय कई बिंदुओं को सतही तौर पर। साथ ही, तुम्हारा निष्कर्ष मजबूत था, लेकिन अगली बार एक स्पष्ट कॉल टू एक्शन जोड़ो।
रवि: ये मूल्यवान सुझाव हैं। मुझे मार्गदर्शन करने के लिए समय निकालने के लिए धन्यवाद।
मैनेजर: तुममें क्षमता है। सुधार करते रहो, और तुम एक उत्कृष्ट प्रस्तुतकर्ता बनोगे।`,
    duration: '2:30',
    questions: JSON.stringify([
      { q: 'What was the main positive feedback?', options: ['Voice clarity', 'Data analysis', 'Time management', 'Humor'], answer: 1, qHindi: 'मुख्य सकारात्मक प्रतिक्रिया क्या थी?' },
      { q: 'What should Ravi improve regarding the audience?', options: ['Speak louder', 'Eye contact', 'Use gestures', 'Ask questions'], answer: 1, qHindi: 'दर्शकों के संबंध में रवि को क्या सुधारना चाहिए?' },
      { q: 'What was rushed in the presentation?', options: ['Introduction', 'Data analysis', 'Financial projections', 'Conclusion'], answer: 2, qHindi: 'प्रस्तुति में क्या जल्दबाजी में था?' }
    ]),
    vocabulary: JSON.stringify(['thorough', 'projections', 'superficially', 'potential']),
    order: 21
  },
  {
    title: 'Negotiating a Salary',
    titleHindi: 'वेतन पर बातचीत',
    description: 'Listen to a job candidate negotiating salary',
    descriptionHindi: 'एक नौकरी के उम्मीदवार को वेतन पर बातचीत करते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Interview',
    audioText: `HR: We are pleased to offer you the position. The starting salary would be 8 lakhs per annum.
Candidate: Thank you for the offer. I am very excited about this opportunity. However, based on my experience and the market rate for this role, I was expecting something closer to 10 lakhs.
HR: I understand. Can you help me understand your expectations better?
Candidate: Certainly. I have five years of experience in this field, and I have led several successful projects. Additionally, I hold a relevant certification that adds value to the role.
HR: Those are valid points. Let me discuss with the hiring manager. Would 9 lakhs work for you?
Candidate: I appreciate you meeting me halfway. Could we also discuss the performance bonus structure?
HR: The bonus is typically 10-15% of the annual salary based on performance.
Candidate: That sounds reasonable. I would be comfortable accepting 9 lakhs with the bonus structure you mentioned.
HR: Excellent. I will prepare the revised offer letter. Welcome to the team!`,
    audioTextHindi: `HR: हमें आपको यह पद देने में खुशी है। शुरुआती वेतन 8 लाख प्रति वर्ष होगा।
उम्मीदवार: ऑफर के लिए धन्यवाद। मैं इस अवसर के बारे में बहुत उत्साहित हूं। हालांकि, मेरे अनुभव और इस भूमिका के लिए बाजार दर के आधार पर, मैं 10 लाख के करीब कुछ उम्मीद कर रहा था।
HR: मैं समझता हूं। क्या आप मुझे अपनी अपेक्षाओं को बेहतर समझने में मदद कर सकते हैं?
उम्मीदवार: जी बिल्कुल। मेरे पास इस क्षेत्र में पांच साल का अनुभव है, और मैंने कई सफल परियोजनाओं का नेतृत्व किया है। इसके अतिरिक्त, मेरे पास एक प्रासंगिक प्रमाणन है जो इस भूमिका में मूल्य जोड़ता है।
HR: ये वैध बिंदु हैं। मुझे हायरिंग मैनेजर से चर्चा करने दीजिए। क्या 9 लाख आपके लिए काम करेगा?
उम्मीदवार: मैं आपकी सराहना करता हूं कि आप बीच में मिले। क्या हम परफॉर्मेंस बोनस संरचना पर भी चर्चा कर सकते हैं?
HR: बोनस आमतौर पर प्रदर्शन के आधार पर वार्षिक वेतन का 10-15% होता है।
उम्मीदवार: यह उचित लगता है। मैं आपके द्वारा बताई गई बोनस संरचना के साथ 9 लाख स्वीकार करने में सहज होऊंगा।
HR: बढ़िया। मैं संशोधित ऑफर लेटर तैयार करूंगा। टीम में आपका स्वागत है!`,
    duration: '2:15',
    questions: JSON.stringify([
      { q: 'What was the initial salary offer?', options: ['7 lakhs', '8 lakhs', '9 lakhs', '10 lakhs'], answer: 1, qHindi: 'शुरुआती वेतन प्रस्ताव क्या था?' },
      { q: 'How many years of experience does the candidate have?', options: ['Three', 'Four', 'Five', 'Six'], answer: 2, qHindi: 'उम्मीदवार के पास कितने साल का अनुभव है?' },
      { q: 'What is the final agreed salary?', options: ['8 lakhs', '8.5 lakhs', '9 lakhs', '10 lakhs'], answer: 2, qHindi: 'अंतिम सहमत वेतन क्या है?' }
    ]),
    vocabulary: JSON.stringify(['negotiate', 'expectations', 'certification', 'reasonable']),
    order: 22
  },
  {
    title: 'Technical Support Call',
    titleHindi: 'तकनीकी सहायता कॉल',
    description: 'Listen to a customer calling tech support for internet issues',
    descriptionHindi: 'एक ग्राहक को इंटरनेट समस्याओं के लिए टेक सपोर्ट को कॉल करते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Technology',
    audioText: `Support: Thank you for calling TechNet Support. My name is Arun. How may I assist you?
Customer: Hi, my internet has been very slow for the past two days. I am paying for 100 Mbps but getting only 10.
Support: I apologize for the inconvenience. Let me check your account. Can I have your customer ID?
Customer: It is TN-45678.
Support: Thank you. I can see your connection details. Have you tried restarting your router?
Customer: Yes, multiple times. I have also checked all the cables.
Support: Good troubleshooting. Let me run a diagnostic from our end. Please wait a moment.
Customer: Sure.
Support: I found the issue. There seems to be a problem with the signal strength at your location. We need to send a technician.
Customer: When can someone come?
Support: The earliest available slot is tomorrow between 10 AM and 12 PM. Would that work?
Customer: Yes, that is fine. Will there be any charges?
Support: No, this is covered under your service agreement. I have scheduled the visit. You will receive an SMS confirmation shortly.`,
    audioTextHindi: `सपोर्ट: टेकनेट सपोर्ट को कॉल करने के लिए धन्यवाद। मेरा नाम अरुण है। मैं आपकी कैसे सहायता कर सकता हूं?
ग्राहक: हाय, मेरा इंटरनेट पिछले दो दिनों से बहुत धीमा है। मैं 100 Mbps के लिए भुगतान कर रहा हूं लेकिन केवल 10 मिल रहा है।
सपोर्ट: असुविधा के लिए क्षमा करें। मुझे आपका अकाउंट चेक करने दीजिए। क्या मुझे आपकी कस्टमर आईडी मिल सकती है?
ग्राहक: यह TN-45678 है।
सपोर्ट: धन्यवाद। मैं आपके कनेक्शन का विवरण देख सकता हूं। क्या आपने अपना राउटर रीस्टार्ट करने की कोशिश की?
ग्राहक: हां, कई बार। मैंने सभी केबल भी चेक किए हैं।
सपोर्ट: अच्छी ट्रबलशूटिंग। मुझे अपनी तरफ से डायग्नोस्टिक चलाने दीजिए। कृपया एक पल प्रतीक्षा करें।
ग्राहक: जी।
सपोर्ट: मुझे समस्या मिल गई। आपके स्थान पर सिग्नल स्ट्रेंथ में समस्या लग रही है। हमें एक टेक्नीशियन भेजना होगा।
ग्राहक: कोई कब आ सकता है?
सपोर्ट: सबसे जल्दी उपलब्ध स्लॉट कल सुबह 10 से 12 बजे के बीच है। क्या यह ठीक रहेगा?
ग्राहक: हां, यह ठीक है। क्या कोई शुल्क होगा?
सपोर्ट: नहीं, यह आपके सर्विस एग्रीमेंट के तहत कवर है। मैंने विजिट शेड्यूल कर दी है। आपको जल्द ही एसएमएस कन्फर्मेशन मिलेगा।`,
    duration: '2:20',
    questions: JSON.stringify([
      { q: 'What speed is the customer paying for?', options: ['50 Mbps', '75 Mbps', '100 Mbps', '150 Mbps'], answer: 2, qHindi: 'ग्राहक किस स्पीड के लिए भुगतान कर रहा है?' },
      { q: 'What is the problem identified?', options: ['Router issue', 'Cable problem', 'Signal strength', 'Account issue'], answer: 2, qHindi: 'पहचानी गई समस्या क्या है?' },
      { q: 'Will the customer be charged for the technician visit?', options: ['Yes', 'No', 'Partially', 'Not mentioned'], answer: 1, qHindi: 'क्या ग्राहक से टेक्नीशियन विजिट के लिए शुल्क लिया जाएगा?' }
    ]),
    vocabulary: JSON.stringify(['diagnostic', 'troubleshooting', 'technician', 'scheduled']),
    order: 23
  },
  {
    title: 'Real Estate Property Tour',
    titleHindi: 'रियल एस्टेट प्रॉपर्टी टूर',
    description: 'Listen to an agent showing an apartment to a buyer',
    descriptionHindi: 'एक एजेंट को खरीदार को अपार्टमेंट दिखाते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Real Estate',
    audioText: `Agent: Welcome to Sunrise Apartments. This is a 3BHK flat on the 8th floor with a carpet area of 1,200 square feet.
Buyer: The view from here is quite nice.
Agent: Yes, it faces east, so you get good morning sunlight. The living room is spacious, as you can see.
Buyer: What about the kitchen?
Agent: The kitchen is modular with granite countertops and built-in cabinets. It also has a utility area for your washing machine.
Buyer: And the bedrooms?
Agent: The master bedroom has an attached bathroom and a walk-in closet. The other two bedrooms share a common bathroom.
Buyer: What is the price?
Agent: The asking price is 1.2 crores, which is negotiable. This includes one covered parking spot.
Buyer: What are the monthly maintenance charges?
Agent: Around 4,000 rupees per month. This covers security, cleaning, and common area electricity.
Buyer: I like it. Can I bring my wife to see it tomorrow?
Agent: Absolutely. I will arrange another viewing.`,
    audioTextHindi: `एजेंट: सनराइज अपार्टमेंट्स में आपका स्वागत है। यह 8वीं मंजिल पर 1,200 वर्ग फुट कार्पेट एरिया वाला 3BHK फ्लैट है।
खरीदार: यहां से दृश्य काफी अच्छा है।
एजेंट: हां, यह पूर्व की ओर है, इसलिए आपको अच्छी सुबह की धूप मिलती है। लिविंग रूम विशाल है, जैसा कि आप देख सकते हैं।
खरीदार: किचन के बारे में क्या?
एजेंट: किचन मॉड्यूलर है जिसमें ग्रेनाइट काउंटरटॉप और बिल्ट-इन कैबिनेट हैं। इसमें आपकी वॉशिंग मशीन के लिए यूटिलिटी एरिया भी है।
खरीदार: और बेडरूम?
एजेंट: मास्टर बेडरूम में अटैच्ड बाथरूम और वॉक-इन क्लोजेट है। अन्य दो बेडरूम एक कॉमन बाथरूम शेयर करते हैं।
खरीदार: कीमत क्या है?
एजेंट: मांग मूल्य 1.2 करोड़ है, जो नेगोशिएबल है। इसमें एक कवर्ड पार्किंग स्पॉट शामिल है।
खरीदार: मासिक मेंटेनेंस चार्ज क्या हैं?
एजेंट: लगभग 4,000 रुपये प्रति माह। इसमें सुरक्षा, सफाई, और कॉमन एरिया बिजली शामिल है।
खरीदार: मुझे पसंद आया। क्या मैं कल अपनी पत्नी को दिखाने ला सकता हूं?
एजेंट: बिल्कुल। मैं एक और व्यूइंग की व्यवस्था करूंगा।`,
    duration: '2:25',
    questions: JSON.stringify([
      { q: 'What is the carpet area of the flat?', options: ['1,000 sq ft', '1,100 sq ft', '1,200 sq ft', '1,300 sq ft'], answer: 2, qHindi: 'फ्लैट का कार्पेट एरिया क्या है?' },
      { q: 'Which direction does the flat face?', options: ['North', 'South', 'East', 'West'], answer: 2, qHindi: 'फ्लैट किस दिशा में है?' },
      { q: 'What is the monthly maintenance?', options: ['3,000', '4,000', '5,000', '6,000'], answer: 1, qHindi: 'मासिक मेंटेनेंस कितना है?' }
    ]),
    vocabulary: JSON.stringify(['modular', 'negotiable', 'maintenance', 'spacious']),
    order: 24
  },
  {
    title: 'University Lecture Introduction',
    titleHindi: 'विश्वविद्यालय व्याख्यान परिचय',
    description: 'Listen to a professor introducing a course',
    descriptionHindi: 'एक प्रोफेसर को कोर्स का परिचय देते हुए सुनें',
    difficulty: 'Advanced',
    category: 'Education',
    audioText: `Professor: Good morning, everyone. Welcome to Introduction to Economics. I am Professor Sharma, and I will be your instructor for this semester. This course covers fundamental economic concepts including supply and demand, market structures, and basic macroeconomics. We will have two lectures per week, on Tuesdays and Thursdays, from 10 to 11:30 AM. Attendance is mandatory and counts for 10% of your grade. There will be one midterm exam worth 30%, a final exam worth 40%, and two assignments worth 10% each. The textbook is Principles of Economics by Mankiw. I expect you to read the assigned chapters before each class. Office hours are Wednesdays from 2 to 4 PM. Any questions so far?`,
    audioTextHindi: `प्रोफेसर: सुप्रभात, सभी को। अर्थशास्त्र के परिचय में आपका स्वागत है। मैं प्रोफेसर शर्मा हूं, और मैं इस सेमेस्टर के लिए आपका इंस्ट्रक्टर होऊंगा। यह कोर्स मूलभूत आर्थिक अवधारणाओं को कवर करता है जिसमें आपूर्ति और मांग, बाजार संरचनाएं, और बुनियादी मैक्रोइकोनॉमिक्स शामिल हैं। हमारे पास प्रति सप्ताह दो व्याख्यान होंगे, मंगलवार और गुरुवार को, सुबह 10 से 11:30 बजे तक। उपस्थिति अनिवार्य है और आपके ग्रेड का 10% है। एक मिडटर्म परीक्षा होगी जो 30% है, एक फाइनल परीक्षा जो 40% है, और दो असाइनमेंट जो 10% प्रत्येक हैं। पाठ्यपुस्तक मैंकिव द्वारा प्रिंसिपल्स ऑफ इकोनॉमिक्स है। मैं उम्मीद करता हूं कि आप प्रत्येक कक्षा से पहले निर्धारित अध्याय पढ़ें। ऑफिस आवर्स बुधवार को दोपहर 2 से 4 बजे हैं। अब तक कोई सवाल?`,
    duration: '2:00',
    questions: JSON.stringify([
      { q: 'How much is attendance worth?', options: ['5%', '10%', '15%', '20%'], answer: 1, qHindi: 'उपस्थिति कितने प्रतिशत है?' },
      { q: 'What is the final exam worth?', options: ['30%', '35%', '40%', '45%'], answer: 2, qHindi: 'फाइनल परीक्षा कितने प्रतिशत है?' },
      { q: 'When are office hours?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answer: 2, qHindi: 'ऑफिस आवर्स कब हैं?' }
    ]),
    vocabulary: JSON.stringify(['mandatory', 'fundamental', 'macroeconomics', 'assigned']),
    order: 25
  },
  {
    title: 'News Report: Traffic Update',
    titleHindi: 'समाचार रिपोर्ट: ट्रैफिक अपडेट',
    description: 'Listen to a radio traffic update',
    descriptionHindi: 'रेडियो ट्रैफिक अपडेट सुनें',
    difficulty: 'Intermediate',
    category: 'Travel',
    audioText: `Good morning, listeners. Here is your 8 AM traffic update for Delhi NCR. Heavy congestion is reported on the Delhi-Gurgaon Expressway near IFFCO Chowk due to a minor accident. Commuters are advised to take the alternate route via MG Road. The Outer Ring Road is moving smoothly in both directions. Metro services are running normally on all lines. However, the Blue Line is experiencing a 5-minute delay due to a technical issue at Rajiv Chowk station. For those heading to the airport, expect moderate traffic on NH-48. The estimated travel time from central Delhi is approximately 45 minutes. Weather conditions are clear, so no weather-related delays are expected. We will bring you the next update at 9 AM. Drive safely!`,
    audioTextHindi: `सुप्रभात, श्रोताओं। यहां दिल्ली NCR के लिए आपका सुबह 8 बजे का ट्रैफिक अपडेट है। इफको चौक के पास दिल्ली-गुड़गांव एक्सप्रेसवे पर एक छोटी दुर्घटना के कारण भारी भीड़ की सूचना है। यात्रियों को एमजी रोड के माध्यम से वैकल्पिक मार्ग लेने की सलाह दी जाती है। आउटर रिंग रोड दोनों दिशाओं में सुचारू रूप से चल रही है। मेट्रो सेवाएं सभी लाइनों पर सामान्य रूप से चल रही हैं। हालांकि, राजीव चौक स्टेशन पर तकनीकी समस्या के कारण ब्लू लाइन में 5 मिनट की देरी हो रही है। एयरपोर्ट जाने वालों के लिए, NH-48 पर मध्यम ट्रैफिक की उम्मीद करें। सेंट्रल दिल्ली से अनुमानित यात्रा समय लगभग 45 मिनट है। मौसम की स्थिति साफ है, इसलिए मौसम संबंधी देरी की उम्मीद नहीं है। हम आपको अगला अपडेट सुबह 9 बजे लाएंगे। सुरक्षित ड्राइव करें!`,
    duration: '1:40',
    questions: JSON.stringify([
      { q: 'Where is the accident reported?', options: ['MG Road', 'IFFCO Chowk', 'Rajiv Chowk', 'Ring Road'], answer: 1, qHindi: 'दुर्घटना कहां रिपोर्ट की गई है?' },
      { q: 'How long is the Blue Line delay?', options: ['3 minutes', '5 minutes', '10 minutes', '15 minutes'], answer: 1, qHindi: 'ब्लू लाइन में कितनी देरी है?' },
      { q: 'What is the estimated time to airport from central Delhi?', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'], answer: 1, qHindi: 'सेंट्रल दिल्ली से एयरपोर्ट तक अनुमानित समय क्या है?' }
    ]),
    vocabulary: JSON.stringify(['congestion', 'commuters', 'alternate', 'approximately']),
    order: 26
  },
];

async function seedListenings() {
  console.log('=== SEEDING LISTENING EXERCISES (BATCH 2) ===\n');

  const insertStmt = db.prepare(`
    INSERT INTO listenings (title, title_hindi, description, description_hindi, difficulty, category, audio_text, audio_text_hindi, duration, questions, vocabulary, "order")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let added = 0;
  for (const l of LISTENINGS) {
    try {
      insertStmt.run(l.title, l.titleHindi, l.description, l.descriptionHindi, l.difficulty, l.category, l.audioText, l.audioTextHindi, l.duration, l.questions, l.vocabulary, l.order);
      added++;
      console.log(`  ✅ Added: ${l.title}`);
    } catch (err: any) {
      if (err.message.includes('UNIQUE')) {
        console.log(`  ⏭️ Skipped: ${l.title}`);
      } else {
        console.log(`  ❌ Error: ${l.title} - ${err.message}`);
      }
    }
  }

  console.log(`\n✅ BATCH 2 COMPLETE: ${added} listening exercises added`);
  db.close();
}

seedListenings().catch(console.error);
