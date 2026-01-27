/**
 * STORIES SEEDER - BATCH 2
 * Adds 20 engaging bilingual stories for Hindi speakers
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || '').replace('file:', '');
const db = new Database(dbPath);

const STORIES = [
  {
    title: 'The Honest Shopkeeper',
    titleHindi: 'ईमानदार दुकानदार',
    description: 'A story about honesty and its rewards',
    descriptionHindi: 'ईमानदारी और उसके पुरस्कारों की कहानी',
    content: `Ramesh owned a small grocery shop in a busy market. One day, an old woman came to buy vegetables. She paid 500 rupees for items worth only 200 rupees. Ramesh noticed the mistake immediately.

"Aunty, you have given me extra money," he said, returning 300 rupees.

The old woman smiled. "Thank you, son. Many shopkeepers would have kept the money."

The next week, the old woman returned with her son, who was a successful businessman. "My mother told me about your honesty," he said. "I want to supply goods to your shop at wholesale prices."

Within a year, Ramesh's small shop became the most popular store in the market. His honesty had brought him more success than any dishonest shortcut ever could.

Moral: Honesty is always the best policy.`,
    contentHindi: `रमेश एक व्यस्त बाजार में एक छोटी किराने की दुकान का मालिक था। एक दिन, एक बूढ़ी महिला सब्जियां खरीदने आई। उसने केवल 200 रुपये की चीजों के लिए 500 रुपये दिए। रमेश ने तुरंत गलती देखी।

"आंटी, आपने मुझे अतिरिक्त पैसे दिए हैं," उसने 300 रुपये वापस करते हुए कहा।

बूढ़ी महिला मुस्कुराई। "धन्यवाद, बेटा। कई दुकानदार पैसे रख लेते।"

अगले हफ्ते, बूढ़ी महिला अपने बेटे के साथ लौटी, जो एक सफल व्यापारी था। "मेरी माँ ने मुझे आपकी ईमानदारी के बारे में बताया," उसने कहा। "मैं आपकी दुकान को थोक मूल्य पर सामान देना चाहता हूं।"

एक साल के भीतर, रमेश की छोटी दुकान बाजार की सबसे लोकप्रिय दुकान बन गई। उसकी ईमानदारी ने उसे किसी भी बेईमान शॉर्टकट से अधिक सफलता दिलाई।

नैतिक शिक्षा: ईमानदारी हमेशा सबसे अच्छी नीति है।`,
    difficulty: 'Beginner',
    category: 'Moral',
    vocabulary: JSON.stringify(['honest', 'mistake', 'wholesale', 'shortcut', 'policy']),
    xpReward: 40,
    order: 6
  },
  {
    title: 'The Interview',
    titleHindi: 'इंटरव्यू',
    description: 'A young graduate faces her first job interview',
    descriptionHindi: 'एक युवा स्नातक अपने पहले जॉब इंटरव्यू का सामना करती है',
    content: `Priya woke up early on the day of her first job interview. She had prepared for weeks, practicing answers in front of the mirror.

At the office, she waited nervously with other candidates. When her name was called, her heart was beating fast.

"Tell me about yourself," the interviewer asked.

Priya took a deep breath. "I am a recent graduate in Computer Science. During college, I completed two internships and led a team project that won first prize."

The interviewer nodded. "What is your biggest weakness?"

Priya paused. She had prepared for this. "I sometimes focus too much on details. But I am learning to balance perfection with efficiency."

Two days later, Priya received a call. She got the job! Her preparation and honest answers had impressed the company.

She learned that confidence comes from preparation, and honesty is valued more than perfect answers.`,
    contentHindi: `प्रिया अपने पहले जॉब इंटरव्यू के दिन जल्दी उठी। उसने हफ्तों तक तैयारी की थी, आईने के सामने जवाबों का अभ्यास किया था।

ऑफिस में, वह अन्य उम्मीदवारों के साथ घबराहट में इंतजार कर रही थी। जब उसका नाम पुकारा गया, उसका दिल तेजी से धड़क रहा था।

"अपने बारे में बताइए," साक्षात्कारकर्ता ने पूछा।

प्रिया ने गहरी सांस ली। "मैं कंप्यूटर साइंस में हाल की स्नातक हूं। कॉलेज के दौरान, मैंने दो इंटर्नशिप पूरी कीं और एक टीम प्रोजेक्ट का नेतृत्व किया जिसने प्रथम पुरस्कार जीता।"

साक्षात्कारकर्ता ने सिर हिलाया। "आपकी सबसे बड़ी कमजोरी क्या है?"

प्रिया रुकी। उसने इसके लिए तैयारी की थी। "मैं कभी-कभी विवरणों पर बहुत अधिक ध्यान देती हूं। लेकिन मैं पूर्णता और दक्षता के बीच संतुलन बनाना सीख रही हूं।"

दो दिन बाद, प्रिया को फोन आया। उसे नौकरी मिल गई! उसकी तैयारी और ईमानदार जवाबों ने कंपनी को प्रभावित किया था।

उसने सीखा कि आत्मविश्वास तैयारी से आता है, और ईमानदारी को परफेक्ट जवाबों से अधिक महत्व दिया जाता है।`,
    difficulty: 'Intermediate',
    category: 'Career',
    vocabulary: JSON.stringify(['interview', 'candidate', 'weakness', 'efficiency', 'confidence']),
    xpReward: 50,
    order: 7
  },
  {
    title: 'The Lost Tourist',
    titleHindi: 'खोया हुआ पर्यटक',
    description: 'A foreign tourist gets help from a kind stranger',
    descriptionHindi: 'एक विदेशी पर्यटक को एक दयालु अजनबी से मदद मिलती है',
    content: `Michael was visiting India for the first time. He was walking through the streets of Old Delhi when he realized he was completely lost. His phone battery had died, and he could not find his hotel.

He approached a young man named Arjun. "Excuse me, can you help me? I am lost."

Arjun smiled warmly. "Of course! Where are you trying to go?"

"The Grand Hotel near Chandni Chowk," Michael said.

"That is quite far from here. Come, I will take you there," Arjun offered.

As they walked, Arjun showed Michael the famous landmarks. He explained the history of the Red Fort and recommended the best street food.

When they reached the hotel, Michael tried to give Arjun money. But Arjun refused. "In India, guests are like God. Helping you was my pleasure."

Michael was touched. He had found not just his hotel, but also a new friend and a beautiful memory of Indian hospitality.`,
    contentHindi: `माइकल पहली बार भारत आया था। वह पुरानी दिल्ली की गलियों में घूम रहा था जब उसे एहसास हुआ कि वह पूरी तरह खो गया है। उसके फोन की बैटरी खत्म हो गई थी, और वह अपना होटल नहीं ढूंढ पा रहा था।

उसने अर्जुन नाम के एक युवक से संपर्क किया। "माफ कीजिए, क्या आप मेरी मदद कर सकते हैं? मैं खो गया हूं।"

अर्जुन गर्मजोशी से मुस्कुराया। "बिल्कुल! आप कहां जाने की कोशिश कर रहे हैं?"

"चांदनी चौक के पास ग्रैंड होटल," माइकल ने कहा।

"वह यहां से काफी दूर है। आइए, मैं आपको वहां ले जाता हूं," अर्जुन ने प्रस्ताव दिया।

जब वे चल रहे थे, अर्जुन ने माइकल को प्रसिद्ध स्थल दिखाए। उसने लाल किले का इतिहास समझाया और सबसे अच्छे स्ट्रीट फूड की सिफारिश की।

जब वे होटल पहुंचे, माइकल ने अर्जुन को पैसे देने की कोशिश की। लेकिन अर्जुन ने मना कर दिया। "भारत में, अतिथि देवो भव। आपकी मदद करना मेरी खुशी थी।"

माइकल भावुक हो गया। उसे न केवल अपना होटल मिला, बल्कि एक नया दोस्त और भारतीय आतिथ्य की एक सुंदर याद भी।`,
    difficulty: 'Intermediate',
    category: 'Travel',
    vocabulary: JSON.stringify(['tourist', 'landmarks', 'hospitality', 'approached', 'refused']),
    xpReward: 50,
    order: 8
  },
  {
    title: 'The Power of Teamwork',
    titleHindi: 'टीमवर्क की शक्ति',
    description: 'A team learns to work together to win a competition',
    descriptionHindi: 'एक टीम प्रतियोगिता जीतने के लिए साथ काम करना सीखती है',
    content: `The marketing team at TechCorp was struggling. They had to create a campaign in just one week, but everyone had different ideas.

Sneha wanted a social media campaign. Raj preferred traditional advertising. Meera suggested influencer marketing. They argued for two days without progress.

Finally, their manager Vikram called a meeting. "Instead of fighting, why not combine your ideas?"

The team was surprised. They had never thought of that.

They created a campaign that used social media, TV ads, and influencers together. Each person contributed their expertise. Sneha handled social media, Raj managed TV spots, and Meera coordinated with influencers.

The campaign was a huge success. Sales increased by 40%, and the team won the company's Best Campaign Award.

They learned that different perspectives are not obstacles but opportunities. When people work together, they can achieve more than they ever could alone.`,
    contentHindi: `टेककॉर्प की मार्केटिंग टीम संघर्ष कर रही थी। उन्हें सिर्फ एक हफ्ते में एक कैंपेन बनाना था, लेकिन सबके अलग-अलग विचार थे।

स्नेहा सोशल मीडिया कैंपेन चाहती थी। राज पारंपरिक विज्ञापन पसंद करता था। मीरा ने इन्फ्लुएंसर मार्केटिंग का सुझाव दिया। वे दो दिन बिना किसी प्रगति के बहस करते रहे।

आखिरकार, उनके मैनेजर विक्रम ने एक मीटिंग बुलाई। "लड़ने के बजाय, अपने विचारों को क्यों नहीं जोड़ते?"

टीम हैरान थी। उन्होंने कभी इसके बारे में नहीं सोचा था।

उन्होंने एक कैंपेन बनाया जिसमें सोशल मीडिया, टीवी विज्ञापन, और इन्फ्लुएंसर एक साथ थे। हर व्यक्ति ने अपनी विशेषज्ञता का योगदान दिया। स्नेहा ने सोशल मीडिया संभाला, राज ने टीवी स्पॉट्स मैनेज किए, और मीरा ने इन्फ्लुएंसर्स के साथ समन्वय किया।

कैंपेन बहुत सफल रहा। बिक्री में 40% की वृद्धि हुई, और टीम ने कंपनी का बेस्ट कैंपेन अवार्ड जीता।

उन्होंने सीखा कि अलग-अलग दृष्टिकोण बाधाएं नहीं बल्कि अवसर हैं। जब लोग साथ मिलकर काम करते हैं, तो वे अकेले से कहीं अधिक हासिल कर सकते हैं।`,
    difficulty: 'Intermediate',
    category: 'Business',
    vocabulary: JSON.stringify(['teamwork', 'campaign', 'expertise', 'perspectives', 'obstacles']),
    xpReward: 50,
    order: 9
  },
  {
    title: 'The Clever Farmer',
    titleHindi: 'चतुर किसान',
    description: 'A farmer uses wisdom to solve a difficult problem',
    descriptionHindi: 'एक किसान एक कठिन समस्या को हल करने के लिए बुद्धि का उपयोग करता है',
    content: `In a small village, there lived a farmer named Gopal. One year, there was very little rain, and his crops were dying.

The village well had water, but it belonged to a greedy landlord who charged high prices. Most farmers could not afford it.

Gopal thought carefully. He noticed that the landlord's field was next to his. Every morning, the landlord's servants watered his crops, and some water flowed into Gopal's field.

Instead of complaining, Gopal dug small channels to collect this extra water. He also planted crops that needed less water.

By the end of the season, Gopal's field was green while others had failed. The landlord was impressed and asked his secret.

"I did not fight the problem," Gopal said. "I found a way to work with what I had."

The landlord, feeling ashamed, reduced his water prices for all farmers.

Moral: Wisdom and creativity can solve problems that strength cannot.`,
    contentHindi: `एक छोटे से गांव में गोपाल नाम का एक किसान रहता था। एक साल, बहुत कम बारिश हुई, और उसकी फसलें मर रही थीं।

गांव के कुएं में पानी था, लेकिन वह एक लालची जमींदार का था जो ऊंची कीमत वसूलता था। अधिकांश किसान इसे वहन नहीं कर सकते थे।

गोपाल ने ध्यान से सोचा। उसने देखा कि जमींदार का खेत उसके बगल में था। हर सुबह, जमींदार के नौकर उसकी फसलों को पानी देते थे, और कुछ पानी गोपाल के खेत में बह जाता था।

शिकायत करने के बजाय, गोपाल ने इस अतिरिक्त पानी को इकट्ठा करने के लिए छोटी नालियां खोदीं। उसने ऐसी फसलें भी लगाईं जिन्हें कम पानी की जरूरत थी।

मौसम के अंत तक, गोपाल का खेत हरा था जबकि दूसरे असफल हो गए थे। जमींदार प्रभावित हुआ और उसका रहस्य पूछा।

"मैंने समस्या से नहीं लड़ा," गोपाल ने कहा। "मैंने जो था उसके साथ काम करने का तरीका खोजा।"

जमींदार, शर्मिंदा महसूस करते हुए, सभी किसानों के लिए अपनी पानी की कीमतें कम कर दीं।

नैतिक शिक्षा: बुद्धि और रचनात्मकता उन समस्याओं को हल कर सकती है जो ताकत नहीं कर सकती।`,
    difficulty: 'Beginner',
    category: 'Moral',
    vocabulary: JSON.stringify(['wisdom', 'greedy', 'channels', 'creativity', 'ashamed']),
    xpReward: 40,
    order: 10
  },
  {
    title: 'The New Employee',
    titleHindi: 'नया कर्मचारी',
    description: 'A fresh graduate navigates her first week at work',
    descriptionHindi: 'एक नई स्नातक अपने काम के पहले सप्ताह में नेविगेट करती है',
    content: `Ananya joined MegaTech as a software developer. On her first day, she felt overwhelmed. The office was huge, and everyone seemed so busy and experienced.

Her manager, Suresh, introduced her to the team. "Don't worry about knowing everything," he said. "Ask questions. That's how you learn."

During her first week, Ananya made several mistakes. She sent an email to the wrong person. She forgot to save her code before the computer crashed. She was late to a meeting because she got lost in the building.

Each time, she felt embarrassed. But her colleagues were understanding. "We all made these mistakes when we started," said Kavita, a senior developer.

By the end of the month, Ananya had learned the systems, made friends, and completed her first project. She realized that everyone starts somewhere, and mistakes are just steps toward learning.

Her advice to new employees: Be patient with yourself, ask for help, and remember that every expert was once a beginner.`,
    contentHindi: `अनन्या मेगाटेक में सॉफ्टवेयर डेवलपर के रूप में शामिल हुई। अपने पहले दिन, वह अभिभूत महसूस कर रही थी। ऑफिस बहुत बड़ा था, और हर कोई इतना व्यस्त और अनुभवी लग रहा था।

उसके मैनेजर, सुरेश ने उसे टीम से मिलवाया। "सब कुछ जानने की चिंता मत करो," उसने कहा। "सवाल पूछो। इसी तरह तुम सीखोगी।"

अपने पहले सप्ताह में, अनन्या ने कई गलतियां कीं। उसने गलत व्यक्ति को ईमेल भेज दिया। कंप्यूटर क्रैश होने से पहले वह अपना कोड सेव करना भूल गई। वह एक मीटिंग में देर से पहुंची क्योंकि वह बिल्डिंग में खो गई थी।

हर बार, उसे शर्मिंदगी महसूस हुई। लेकिन उसके सहकर्मी समझदार थे। "जब हमने शुरू किया था तब हम सबने ये गलतियां कीं," कविता ने कहा, जो एक सीनियर डेवलपर थी।

महीने के अंत तक, अनन्या ने सिस्टम सीख लिए, दोस्त बना लिए, और अपना पहला प्रोजेक्ट पूरा कर लिया। उसे एहसास हुआ कि हर कोई कहीं से शुरू करता है, और गलतियां सीखने की ओर कदम हैं।

नए कर्मचारियों के लिए उसकी सलाह: अपने साथ धैर्य रखो, मदद मांगो, और याद रखो कि हर विशेषज्ञ कभी शुरुआती था।`,
    difficulty: 'Intermediate',
    category: 'Career',
    vocabulary: JSON.stringify(['overwhelmed', 'embarrassed', 'colleagues', 'patient', 'beginner']),
    xpReward: 50,
    order: 11
  },
  {
    title: 'The Surprise Birthday Party',
    titleHindi: 'सरप्राइज बर्थडे पार्टी',
    description: 'Friends plan a surprise party with unexpected results',
    descriptionHindi: 'दोस्त अप्रत्याशित परिणामों के साथ एक सरप्राइज पार्टी की योजना बनाते हैं',
    content: `Rohit's birthday was coming, and his friends wanted to throw him a surprise party. They planned everything secretly for two weeks.

Neha was in charge of the cake. Amit handled decorations. Pooja invited all their friends. They decided to have the party at Rohit's apartment while he was at work.

On the big day, everything went wrong. The cake arrived late. The balloons kept popping. And worst of all, Rohit came home early because he was feeling sick!

When Rohit opened the door, he saw his friends hiding behind furniture, half-decorated walls, and a cake that had not arrived yet.

"Surprise?" Neha said weakly.

Rohit burst out laughing. "This is the best birthday ever!" he said. "Not because it's perfect, but because you all tried so hard for me."

They ordered pizza, decorated together, and when the cake finally arrived, they had the best party ever.

Sometimes the best memories come from imperfect moments shared with people who care.`,
    contentHindi: `रोहित का जन्मदिन आने वाला था, और उसके दोस्त उसे सरप्राइज पार्टी देना चाहते थे। उन्होंने दो हफ्ते तक गुप्त रूप से सब कुछ प्लान किया।

नेहा केक की जिम्मेदारी में थी। अमित ने सजावट संभाली। पूजा ने सभी दोस्तों को आमंत्रित किया। उन्होंने रोहित के अपार्टमेंट में पार्टी करने का फैसला किया जब वह काम पर होगा।

बड़े दिन, सब कुछ गलत हो गया। केक देर से आया। गुब्बारे फूटते रहे। और सबसे बुरा, रोहित जल्दी घर आ गया क्योंकि उसकी तबीयत खराब थी!

जब रोहित ने दरवाजा खोला, उसने अपने दोस्तों को फर्नीचर के पीछे छिपे, आधी सजी दीवारें, और एक केक जो अभी तक नहीं आया था, देखा।

"सरप्राइज?" नेहा ने कमजोर आवाज में कहा।

रोहित जोर से हंस पड़ा। "यह अब तक का सबसे अच्छा जन्मदिन है!" उसने कहा। "इसलिए नहीं कि यह परफेक्ट है, बल्कि इसलिए कि तुम सबने मेरे लिए इतनी मेहनत की।"

उन्होंने पिज्जा ऑर्डर किया, साथ में सजावट की, और जब केक आखिरकार आया, उन्होंने अब तक की सबसे अच्छी पार्टी की।

कभी-कभी सबसे अच्छी यादें उन अपूर्ण पलों से आती हैं जो उन लोगों के साथ साझा किए जाते हैं जो परवाह करते हैं।`,
    difficulty: 'Beginner',
    category: 'Friendship',
    vocabulary: JSON.stringify(['surprise', 'decorations', 'secretly', 'imperfect', 'memories']),
    xpReward: 40,
    order: 12
  },
  {
    title: 'Learning to Drive',
    titleHindi: 'गाड़ी चलाना सीखना',
    description: 'A young woman overcomes her fear of driving',
    descriptionHindi: 'एक युवा महिला गाड़ी चलाने के अपने डर पर काबू पाती है',
    content: `Meera was 28 years old and still did not know how to drive. All her friends drove cars, but she was too scared to learn.

"What if I hit someone? What if I crash?" she worried.

Her father finally convinced her to try. "I will teach you myself," he said. "We will start in an empty parking lot."

The first lesson was terrible. Meera pressed the accelerator instead of the brake and almost hit a wall. She cried and wanted to give up.

"Everyone makes mistakes when learning," her father said gently. "The important thing is to keep trying."

Slowly, over many weeks, Meera improved. She learned to control the car, to check mirrors, and to stay calm in traffic.

Three months later, she passed her driving test on the first attempt. When she drove her father to the market for the first time, he had tears in his eyes.

"I am so proud of you," he said. "You faced your fear and won."

Meera learned that courage is not the absence of fear, but acting despite it.`,
    contentHindi: `मीरा 28 साल की थी और अभी भी गाड़ी चलाना नहीं जानती थी। उसके सभी दोस्त कार चलाते थे, लेकिन वह सीखने से बहुत डरती थी।

"अगर मैंने किसी को टक्कर मार दी तो? अगर मैं क्रैश हो गई तो?" वह चिंतित थी।

उसके पिता ने आखिरकार उसे कोशिश करने के लिए मना लिया। "मैं खुद तुम्हें सिखाऊंगा," उन्होंने कहा। "हम एक खाली पार्किंग लॉट में शुरू करेंगे।"

पहला पाठ भयानक था। मीरा ने ब्रेक की जगह एक्सीलरेटर दबा दिया और लगभग दीवार से टकरा गई। वह रोई और हार मानना चाहती थी।

"सीखते समय हर कोई गलतियां करता है," उसके पिता ने धीरे से कहा। "महत्वपूर्ण बात यह है कि कोशिश करते रहो।"

धीरे-धीरे, कई हफ्तों में, मीरा में सुधार हुआ। उसने कार को नियंत्रित करना, मिरर चेक करना, और ट्रैफिक में शांत रहना सीखा।

तीन महीने बाद, उसने पहली बार में ही अपना ड्राइविंग टेस्ट पास कर लिया। जब उसने पहली बार अपने पिता को बाजार ले गई, उनकी आंखों में आंसू थे।

"मुझे तुम पर बहुत गर्व है," उन्होंने कहा। "तुमने अपने डर का सामना किया और जीत गई।"

मीरा ने सीखा कि साहस डर की अनुपस्थिति नहीं है, बल्कि उसके बावजूद कार्य करना है।`,
    difficulty: 'Intermediate',
    category: 'Personal Growth',
    vocabulary: JSON.stringify(['scared', 'accelerator', 'courage', 'absence', 'convinced']),
    xpReward: 50,
    order: 13
  },
  {
    title: 'The Coffee Shop Conversation',
    titleHindi: 'कॉफी शॉप की बातचीत',
    description: 'Two strangers become friends over coffee',
    descriptionHindi: 'दो अजनबी कॉफी पर दोस्त बन जाते हैं',
    content: `Aditya was working on his laptop at a busy coffee shop when a woman asked, "Excuse me, is this seat taken?"

"No, please sit," he said.

Her name was Riya, and she was also working remotely. They started talking about their jobs, their favorite books, and their dreams.

"I want to start my own business someday," Riya said. "But I am scared to leave my stable job."

"I felt the same way," Aditya replied. "I quit my job last year to become a freelance designer. It was scary, but I have never been happier."

They exchanged phone numbers and met again the following week. Riya asked Aditya for advice about starting her business. He introduced her to potential clients.

Six months later, Riya launched her marketing agency. At her office opening, she thanked Aditya. "That random conversation changed my life."

Sometimes the most important connections happen when we least expect them. A simple "hello" can lead to lifelong friendships and new opportunities.`,
    contentHindi: `आदित्य एक व्यस्त कॉफी शॉप में अपने लैपटॉप पर काम कर रहा था जब एक महिला ने पूछा, "माफ कीजिए, क्या यह सीट खाली है?"

"हां, कृपया बैठिए," उसने कहा।

उसका नाम रिया था, और वह भी रिमोटली काम कर रही थी। उन्होंने अपनी नौकरियों, अपनी पसंदीदा किताबों, और अपने सपनों के बारे में बात करना शुरू किया।

"मैं किसी दिन अपना खुद का बिजनेस शुरू करना चाहती हूं," रिया ने कहा। "लेकिन मैं अपनी स्थिर नौकरी छोड़ने से डरती हूं।"

"मुझे भी ऐसा ही लगता था," आदित्य ने जवाब दिया। "मैंने पिछले साल फ्रीलांस डिजाइनर बनने के लिए अपनी नौकरी छोड़ दी। यह डरावना था, लेकिन मैं कभी इतना खुश नहीं था।"

उन्होंने फोन नंबर एक्सचेंज किए और अगले हफ्ते फिर मिले। रिया ने आदित्य से अपना बिजनेस शुरू करने के बारे में सलाह मांगी। उसने उसे संभावित क्लाइंट्स से मिलवाया।

छह महीने बाद, रिया ने अपनी मार्केटिंग एजेंसी लॉन्च की। अपने ऑफिस के उद्घाटन पर, उसने आदित्य को धन्यवाद दिया। "उस अचानक बातचीत ने मेरी जिंदगी बदल दी।"

कभी-कभी सबसे महत्वपूर्ण कनेक्शन तब होते हैं जब हम कम से कम उम्मीद करते हैं। एक साधारण "हैलो" आजीवन दोस्ती और नए अवसरों की ओर ले जा सकता है।`,
    difficulty: 'Intermediate',
    category: 'Friendship',
    vocabulary: JSON.stringify(['remotely', 'freelance', 'potential', 'connections', 'opportunities']),
    xpReward: 50,
    order: 14
  },
  {
    title: 'The Village Doctor',
    titleHindi: 'गांव का डॉक्टर',
    description: 'A doctor chooses to serve his village instead of the city',
    descriptionHindi: 'एक डॉक्टर शहर के बजाय अपने गांव की सेवा करने का चुनाव करता है',
    content: `Dr. Vikram had offers from the best hospitals in Mumbai. But he chose to return to his small village in Bihar.

"Why would you waste your talent there?" his friends asked.

"Because that is where I am needed most," he replied.

The village had no proper medical facility. People had to travel 50 kilometers for basic treatment. Many died on the way.

Dr. Vikram opened a small clinic. He charged very little and often treated poor patients for free. He trained local youth as health workers.

Within five years, the village's health improved dramatically. Infant mortality dropped. Diseases that once killed many were now easily treated.

One day, a government official visited. He was so impressed that he helped build a proper hospital in the village.

"You could have been rich in the city," someone said to Dr. Vikram.

He smiled. "I am rich. I have the love of my people and the satisfaction of making a real difference."

True success is not measured by money, but by the lives we touch.`,
    contentHindi: `डॉ. विक्रम के पास मुंबई के सबसे अच्छे अस्पतालों से ऑफर थे। लेकिन उन्होंने बिहार के अपने छोटे से गांव लौटने का फैसला किया।

"आप वहां अपनी प्रतिभा क्यों बर्बाद करेंगे?" उनके दोस्तों ने पूछा।

"क्योंकि वहीं मेरी सबसे ज्यादा जरूरत है," उन्होंने जवाब दिया।

गांव में कोई उचित चिकित्सा सुविधा नहीं थी। लोगों को बुनियादी इलाज के लिए 50 किलोमीटर यात्रा करनी पड़ती थी। कई रास्ते में ही मर जाते थे।

डॉ. विक्रम ने एक छोटा क्लिनिक खोला। उन्होंने बहुत कम शुल्क लिया और अक्सर गरीब मरीजों का मुफ्त इलाज किया। उन्होंने स्थानीय युवाओं को स्वास्थ्य कार्यकर्ताओं के रूप में प्रशिक्षित किया।

पांच साल के भीतर, गांव का स्वास्थ्य नाटकीय रूप से सुधर गया। शिशु मृत्यु दर गिर गई। जो बीमारियां कभी कई लोगों को मारती थीं, अब आसानी से इलाज योग्य थीं।

एक दिन, एक सरकारी अधिकारी ने दौरा किया। वह इतना प्रभावित हुआ कि उसने गांव में एक उचित अस्पताल बनाने में मदद की।

"आप शहर में अमीर हो सकते थे," किसी ने डॉ. विक्रम से कहा।

वह मुस्कुराए। "मैं अमीर हूं। मेरे पास मेरे लोगों का प्यार है और वास्तविक अंतर लाने की संतुष्टि है।"

सच्ची सफलता पैसे से नहीं, बल्कि उन जिंदगियों से मापी जाती है जिन्हें हम छूते हैं।`,
    difficulty: 'Advanced',
    category: 'Inspiration',
    vocabulary: JSON.stringify(['facility', 'mortality', 'dramatically', 'satisfaction', 'measured']),
    xpReward: 60,
    order: 15
  },
  {
    title: 'The Online Shopping Mistake',
    titleHindi: 'ऑनलाइन शॉपिंग की गलती',
    description: 'A funny story about ordering the wrong size online',
    descriptionHindi: 'ऑनलाइन गलत साइज ऑर्डर करने की एक मजेदार कहानी',
    content: `Priya wanted to buy a dress for her sister's wedding. She found a beautiful red dress online at a great discount.

"Size M should be perfect," she thought and quickly placed the order.

When the package arrived, Priya was excited. But when she tried on the dress, something was very wrong. It was huge! She could fit two of herself inside it.

She checked the order details. She had accidentally ordered size "M" for Men, not Medium!

Priya called customer service. The representative tried not to laugh as she explained the situation.

"Ma'am, we can arrange a return. But may I suggest checking the size chart next time?"

Priya was embarrassed but also found it funny. She shared the story with her family, and everyone laughed.

Her sister said, "At least now you have a funny story to tell at my wedding!"

The lesson: Always read the details carefully when shopping online. And when you make mistakes, learn to laugh at yourself.`,
    contentHindi: `प्रिया अपनी बहन की शादी के लिए एक ड्रेस खरीदना चाहती थी। उसे ऑनलाइन एक सुंदर लाल ड्रेस बड़ी छूट पर मिली।

"साइज M परफेक्ट होना चाहिए," उसने सोचा और जल्दी से ऑर्डर कर दिया।

जब पैकेज आया, प्रिया उत्साहित थी। लेकिन जब उसने ड्रेस पहनी, कुछ बहुत गलत था। यह बहुत बड़ी थी! वह इसमें अपने जैसी दो फिट कर सकती थी।

उसने ऑर्डर डिटेल्स चेक किए। उसने गलती से "M" साइज Men के लिए ऑर्डर कर दिया था, Medium नहीं!

प्रिया ने कस्टमर सर्विस को फोन किया। प्रतिनिधि ने हंसी रोकने की कोशिश की जब उसने स्थिति समझाई।

"मैडम, हम रिटर्न की व्यवस्था कर सकते हैं। लेकिन क्या मैं सुझाव दे सकता हूं कि अगली बार साइज चार्ट जरूर देखें?"

प्रिया शर्मिंदा थी लेकिन उसे यह मजेदार भी लगा। उसने यह कहानी अपने परिवार के साथ साझा की, और सभी हंसे।

उसकी बहन ने कहा, "कम से कम अब तुम्हारे पास मेरी शादी में सुनाने के लिए एक मजेदार कहानी है!"

सबक: ऑनलाइन शॉपिंग करते समय हमेशा विवरण ध्यान से पढ़ें। और जब आप गलतियां करें, तो खुद पर हंसना सीखें।`,
    difficulty: 'Beginner',
    category: 'Humor',
    vocabulary: JSON.stringify(['discount', 'accidentally', 'representative', 'embarrassed', 'details']),
    xpReward: 40,
    order: 16
  },
  {
    title: 'The Startup Dream',
    titleHindi: 'स्टार्टअप का सपना',
    description: 'Two friends build a successful tech startup',
    descriptionHindi: 'दो दोस्त एक सफल टेक स्टार्टअप बनाते हैं',
    content: `Karan and Nikhil were college roommates who shared a dream: to build their own company.

After graduation, they both got good jobs at big companies. But the dream never died.

One night, over chai, Karan said, "I have an idea for an app that helps small shopkeepers manage their inventory."

Nikhil's eyes lit up. "That is brilliant! My uncle struggles with exactly this problem."

They started working nights and weekends. Karan handled the coding while Nikhil talked to shopkeepers to understand their needs.

After six months, they had a working app. They quit their jobs and launched the startup.

The first year was hard. They had no money and few customers. Many times they wanted to give up.

But slowly, word spread. Shopkeepers loved the simple app. Investors noticed. Within three years, their app had 100,000 users.

"Remember when we almost quit?" Nikhil asked.

Karan smiled. "The best things in life require patience and persistence."

Their story proves that with passion, hard work, and a good partner, dreams can become reality.`,
    contentHindi: `करण और निखिल कॉलेज रूममेट थे जो एक सपना साझा करते थे: अपनी खुद की कंपनी बनाना।

ग्रेजुएशन के बाद, दोनों को बड़ी कंपनियों में अच्छी नौकरियां मिलीं। लेकिन सपना कभी नहीं मरा।

एक रात, चाय पर, करण ने कहा, "मेरे पास एक ऐप का आइडिया है जो छोटे दुकानदारों को अपनी इन्वेंटरी मैनेज करने में मदद करता है।"

निखिल की आंखें चमक उठीं। "यह शानदार है! मेरे चाचा को बिल्कुल इसी समस्या से जूझना पड़ता है।"

उन्होंने रातों और वीकेंड पर काम करना शुरू किया। करण ने कोडिंग संभाली जबकि निखिल ने दुकानदारों से बात की उनकी जरूरतों को समझने के लिए।

छह महीने बाद, उनके पास एक काम करने वाला ऐप था। उन्होंने अपनी नौकरियां छोड़ दीं और स्टार्टअप लॉन्च किया।

पहला साल कठिन था। उनके पास पैसे नहीं थे और कम ग्राहक थे। कई बार वे हार मानना चाहते थे।

लेकिन धीरे-धीरे, बात फैली। दुकानदारों को सरल ऐप पसंद आया। निवेशकों ने नोटिस किया। तीन साल के भीतर, उनके ऐप के 100,000 यूजर्स थे।

"याद है जब हम लगभग छोड़ने वाले थे?" निखिल ने पूछा।

करण मुस्कुराया। "जीवन में सबसे अच्छी चीजों के लिए धैर्य और दृढ़ता की जरूरत होती है।"

उनकी कहानी साबित करती है कि जुनून, कड़ी मेहनत, और एक अच्छे साथी के साथ, सपने हकीकत बन सकते हैं।`,
    difficulty: 'Advanced',
    category: 'Business',
    vocabulary: JSON.stringify(['startup', 'inventory', 'investors', 'persistence', 'passion']),
    xpReward: 60,
    order: 17
  },
  {
    title: 'The Grandmother\'s Recipe',
    titleHindi: 'दादी की रेसिपी',
    description: 'A family recipe brings generations together',
    descriptionHindi: 'एक पारिवारिक रेसिपी पीढ़ियों को एक साथ लाती है',
    content: `Every Diwali, Grandma made her special gulab jamuns. They were soft, sweet, and melted in your mouth. No one else could make them the same way.

When Grandma passed away, the family felt her absence most during festivals. "I wish we had her recipe," Anita said sadly.

One day, while cleaning Grandma's old trunk, Anita found a worn notebook. Inside were handwritten recipes, including the famous gulab jamuns!

But the recipe was incomplete. It said "add the secret ingredient" without explaining what it was.

Anita called her mother, aunts, and cousins. Together, they tried to remember. "She always hummed while cooking," one aunt recalled. "And she added something at the end..."

After many failed attempts, Anita's daughter Sia suggested, "Maybe the secret ingredient is love?"

They laughed, but then Anita understood. Grandma always made gulab jamuns with the whole family around her, talking and laughing.

That Diwali, the entire family gathered in the kitchen. They made gulab jamuns together, sharing stories about Grandma.

The sweets were not perfect, but they tasted like home. The real secret ingredient was family.`,
    contentHindi: `हर दिवाली पर, दादी अपने खास गुलाब जामुन बनाती थीं। वे नरम, मीठे, और मुंह में घुल जाते थे। कोई और उन्हें उसी तरह नहीं बना सकता था।

जब दादी गुजर गईं, परिवार को त्योहारों के दौरान उनकी अनुपस्थिति सबसे ज्यादा महसूस हुई। "काश हमारे पास उनकी रेसिपी होती," अनीता ने दुखी होकर कहा।

एक दिन, दादी के पुराने संदूक की सफाई करते हुए, अनीता को एक पुरानी नोटबुक मिली। अंदर हाथ से लिखी रेसिपी थीं, जिसमें प्रसिद्ध गुलाब जामुन भी थे!

लेकिन रेसिपी अधूरी थी। इसमें लिखा था "गुप्त सामग्री डालें" बिना यह बताए कि वह क्या थी।

अनीता ने अपनी माँ, चाचियों, और चचेरे भाई-बहनों को फोन किया। साथ मिलकर, उन्होंने याद करने की कोशिश की। "वह खाना बनाते समय हमेशा गुनगुनाती थीं," एक चाची ने याद किया। "और वह अंत में कुछ डालती थीं..."

कई असफल प्रयासों के बाद, अनीता की बेटी सिया ने सुझाव दिया, "शायद गुप्त सामग्री प्यार है?"

वे हंसे, लेकिन फिर अनीता समझ गई। दादी हमेशा पूरे परिवार के साथ गुलाब जामुन बनाती थीं, बातें करते और हंसते हुए।

उस दिवाली, पूरा परिवार रसोई में इकट्ठा हुआ। उन्होंने साथ मिलकर गुलाब जामुन बनाए, दादी के बारे में कहानियां साझा करते हुए।

मिठाइयां परफेक्ट नहीं थीं, लेकिन उनका स्वाद घर जैसा था। असली गुप्त सामग्री परिवार थी।`,
    difficulty: 'Intermediate',
    category: 'Family',
    vocabulary: JSON.stringify(['recipe', 'ingredient', 'generations', 'absence', 'gathered']),
    xpReward: 50,
    order: 18
  },
  {
    title: 'The Marathon Runner',
    titleHindi: 'मैराथन धावक',
    description: 'An overweight man transforms his life through running',
    descriptionHindi: 'एक मोटा आदमी दौड़ के माध्यम से अपना जीवन बदलता है',
    content: `At 35, Sunil weighed 110 kilograms. He could not climb stairs without getting breathless. His doctor warned him: "Change your lifestyle or face serious health problems."

Sunil decided to start running. On his first day, he could only run for 30 seconds before stopping. People in the park stared at him. He felt embarrassed.

But he did not give up. Every morning, he ran a little more. 30 seconds became one minute. One minute became five. Five became ten.

He changed his diet, cutting out junk food and sugary drinks. He joined a running group where he found support and friendship.

After one year, Sunil had lost 30 kilograms. He could run 10 kilometers without stopping. But he wanted more.

He registered for the Mumbai Marathon. His family thought he was crazy. "You could not even run for a minute last year!"

On race day, Sunil ran 42 kilometers in 5 hours. When he crossed the finish line, tears streamed down his face.

"I did not just finish a marathon," he said. "I proved that it is never too late to change your life."`,
    contentHindi: `35 साल की उम्र में, सुनील का वजन 110 किलोग्राम था। वह बिना सांस फूले सीढ़ियां नहीं चढ़ सकता था। उसके डॉक्टर ने चेतावनी दी: "अपनी जीवनशैली बदलो या गंभीर स्वास्थ्य समस्याओं का सामना करो।"

सुनील ने दौड़ना शुरू करने का फैसला किया। अपने पहले दिन, वह रुकने से पहले केवल 30 सेकंड दौड़ सका। पार्क में लोग उसे घूरते थे। उसे शर्मिंदगी महसूस हुई।

लेकिन उसने हार नहीं मानी। हर सुबह, वह थोड़ा और दौड़ता। 30 सेकंड एक मिनट बन गए। एक मिनट पांच बन गया। पांच दस बन गए।

उसने अपना आहार बदला, जंक फूड और मीठे पेय छोड़ दिए। वह एक रनिंग ग्रुप में शामिल हुआ जहां उसे सहारा और दोस्ती मिली।

एक साल बाद, सुनील ने 30 किलोग्राम वजन कम कर लिया था। वह बिना रुके 10 किलोमीटर दौड़ सकता था। लेकिन वह और चाहता था।

उसने मुंबई मैराथन के लिए रजिस्टर किया। उसके परिवार ने सोचा वह पागल है। "तुम पिछले साल एक मिनट भी नहीं दौड़ सकते थे!"

रेस के दिन, सुनील ने 5 घंटे में 42 किलोमीटर दौड़े। जब उसने फिनिश लाइन पार की, उसके चेहरे पर आंसू बह रहे थे।

"मैंने सिर्फ मैराथन पूरी नहीं की," उसने कहा। "मैंने साबित किया कि अपना जीवन बदलने में कभी देर नहीं होती।"`,
    difficulty: 'Intermediate',
    category: 'Health',
    vocabulary: JSON.stringify(['marathon', 'lifestyle', 'breathless', 'registered', 'transform']),
    xpReward: 50,
    order: 19
  },
  {
    title: 'The Helpful Neighbor',
    titleHindi: 'मददगार पड़ोसी',
    description: 'A small act of kindness creates a chain reaction',
    descriptionHindi: 'दयालुता का एक छोटा सा कार्य एक श्रृंखला प्रतिक्रिया बनाता है',
    content: `Mrs. Sharma was 75 years old and lived alone. Her children were in America, and she rarely had visitors.

One rainy evening, her young neighbor Rahul noticed her struggling to carry groceries. "Aunty, let me help you," he said, taking the heavy bags.

From that day, Rahul started checking on Mrs. Sharma regularly. He helped her with small tasks, fixed things around her house, and sometimes just sat and talked with her.

Mrs. Sharma was touched. "You remind me of my son," she said. "How can I repay you?"

"Just be happy, Aunty. That is enough."

Inspired by Rahul, Mrs. Sharma started teaching English to children in the neighborhood for free. She had been a teacher before retiring.

Those children grew up and helped others in their own ways. One became a doctor who treated poor patients for free. Another started a charity for elderly people living alone.

Years later, at Mrs. Sharma's 85th birthday, the neighborhood gathered to celebrate. "You started all this," Rahul said.

She smiled. "No, you did. One small act of kindness can change the world."`,
    contentHindi: `श्रीमती शर्मा 75 साल की थीं और अकेली रहती थीं। उनके बच्चे अमेरिका में थे, और उनके पास शायद ही कभी मेहमान आते थे।

एक बरसात की शाम, उनके युवा पड़ोसी राहुल ने देखा कि वह किराने का सामान उठाने में संघर्ष कर रही हैं। "आंटी, मुझे मदद करने दीजिए," उसने भारी बैग लेते हुए कहा।

उस दिन से, राहुल नियमित रूप से श्रीमती शर्मा की खबर लेने लगा। उसने छोटे-छोटे कामों में उनकी मदद की, उनके घर में चीजें ठीक कीं, और कभी-कभी बस बैठकर उनसे बातें करता।

श्रीमती शर्मा भावुक हो गईं। "तुम मुझे मेरे बेटे की याद दिलाते हो," उन्होंने कहा। "मैं तुम्हें कैसे चुका सकती हूं?"

"बस खुश रहिए, आंटी। यही काफी है।"

राहुल से प्रेरित होकर, श्रीमती शर्मा ने पड़ोस के बच्चों को मुफ्त में अंग्रेजी पढ़ाना शुरू किया। वह रिटायर होने से पहले शिक्षिका थीं।

वे बच्चे बड़े हुए और अपने तरीके से दूसरों की मदद की। एक डॉक्टर बना जिसने गरीब मरीजों का मुफ्त इलाज किया। दूसरे ने अकेले रहने वाले बुजुर्गों के लिए एक चैरिटी शुरू की।

सालों बाद, श्रीमती शर्मा के 85वें जन्मदिन पर, पड़ोस जश्न मनाने के लिए इकट्ठा हुआ। "आपने यह सब शुरू किया," राहुल ने कहा।

वह मुस्कुराईं। "नहीं, तुमने किया। दयालुता का एक छोटा सा कार्य दुनिया बदल सकता है।"`,
    difficulty: 'Beginner',
    category: 'Kindness',
    vocabulary: JSON.stringify(['neighbor', 'kindness', 'inspired', 'charity', 'celebrate']),
    xpReward: 40,
    order: 20
  }
];

async function seedStories() {
  console.log('=== SEEDING STORIES (BATCH 2) ===\n');

  const insertStmt = db.prepare(`
    INSERT INTO stories (title, title_hindi, description, description_hindi, content, content_hindi, difficulty, category, vocabulary, xp_reward, "order")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let added = 0;
  for (const s of STORIES) {
    try {
      insertStmt.run(s.title, s.titleHindi, s.description, s.descriptionHindi, s.content, s.contentHindi, s.difficulty, s.category, s.vocabulary, s.xpReward, s.order);
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

  console.log(`\n✅ BATCH 2 COMPLETE: ${added} stories added`);
  db.close();
}

seedStories().catch(console.error);
