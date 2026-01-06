// Hindi Dialogues Data - 200+ Dialogue Scenarios for Hindi Mother Tongue English Learning
// Prepared by: Mrs. Premlata Jain, AAO, PWD Udaipur

export interface DialogueLine {
  speaker: string;
  speakerHindi: string;
  english: string;
  hindi: string;
  pronunciation: string;
}

export interface Dialogue {
  id: number;
  title: string;
  titleHindi: string;
  scenario: string;
  scenarioHindi: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  lines: DialogueLine[];
}

export const dialogues: Dialogue[] = [
  // ==================== DAILY LIFE (1-25) ====================
  {
    id: 1,
    title: "Morning Greetings",
    titleHindi: "सुबह का अभिवादन",
    scenario: "Greeting family members in the morning",
    scenarioHindi: "सुबह परिवार के सदस्यों का अभिवादन",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", english: "Good morning, Mom!", hindi: "सुप्रभात, माँ!", pronunciation: "Good MOR-ning, Mom!" },
      { speaker: "Mother", speakerHindi: "माँ", english: "Good morning, dear! Did you sleep well?", hindi: "सुप्रभात, बेटा! अच्छी नींद आई?", pronunciation: "Good MOR-ning, deer! Did yoo sleep wel?" },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Yes, I slept very well. What's for breakfast?", hindi: "हाँ, बहुत अच्छी नींद आई। नाश्ते में क्या है?", pronunciation: "Yes, I slept VER-ee wel. Wots for BREK-fust?" },
      { speaker: "Mother", speakerHindi: "माँ", english: "I made your favorite - parathas with curd.", hindi: "मैंने तुम्हारा पसंदीदा बनाया - दही के साथ पराठे।", pronunciation: "I mayd yor FAY-vrit - pa-RA-thas with kurd." }
    ]
  },
  {
    id: 2,
    title: "Getting Ready for School",
    titleHindi: "स्कूल के लिए तैयार होना",
    scenario: "Parent helping child get ready for school",
    scenarioHindi: "माता-पिता बच्चे को स्कूल के लिए तैयार कर रहे हैं",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Father", speakerHindi: "पिता", english: "Hurry up! The school bus will come in 10 minutes.", hindi: "जल्दी करो! स्कूल बस 10 मिनट में आ जाएगी।", pronunciation: "HUR-ee up! Thuh skool bus wil kum in ten MIN-its." },
      { speaker: "Child", speakerHindi: "बच्चा", english: "I am almost ready. Where is my water bottle?", hindi: "मैं लगभग तैयार हूँ। मेरी पानी की बोतल कहाँ है?", pronunciation: "I am OL-mohst RED-ee. Wair iz my WAW-ter BOT-ul?" },
      { speaker: "Father", speakerHindi: "पिता", english: "It's on the dining table. Don't forget your lunch box.", hindi: "यह डाइनिंग टेबल पर है। अपना लंच बॉक्स मत भूलना।", pronunciation: "Its on thuh DY-ning TAY-bul. Dont for-GET yor lunch boks." },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Thank you, Papa. I have packed everything.", hindi: "धन्यवाद, पापा। मैंने सब कुछ पैक कर लिया है।", pronunciation: "Thank yoo, PA-pa. I hav pakt EV-ree-thing." }
    ]
  },
  {

    id: 3,
    title: "At the Breakfast Table",
    titleHindi: "नाश्ते की मेज पर",
    scenario: "Family having breakfast together",
    scenarioHindi: "परिवार एक साथ नाश्ता कर रहा है",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", english: "Would you like some more tea?", hindi: "क्या आप और चाय लेंगे?", pronunciation: "Wood yoo like sum mor tee?" },
      { speaker: "Father", speakerHindi: "पिता", english: "Yes, please. The tea is very good today.", hindi: "हाँ, कृपया। आज चाय बहुत अच्छी है।", pronunciation: "Yes, pleez. Thuh tee iz VER-ee good too-DAY." },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Can I have some juice instead?", hindi: "क्या मुझे इसके बजाय जूस मिल सकता है?", pronunciation: "Kan I hav sum joos in-STED?" },
      { speaker: "Mother", speakerHindi: "माँ", english: "Of course! Orange or apple juice?", hindi: "बिल्कुल! संतरे का या सेब का जूस?", pronunciation: "Ov kors! OR-inj or AP-ul joos?" }
    ]
  },
  {
    id: 4,
    title: "Evening Walk",
    titleHindi: "शाम की सैर",
    scenario: "Neighbors meeting during evening walk",
    scenarioHindi: "शाम की सैर के दौरान पड़ोसियों से मिलना",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Good evening! Nice weather today, isn't it?", hindi: "शुभ संध्या! आज मौसम अच्छा है, है ना?", pronunciation: "Good EE-vning! Nice WE-ther too-DAY, IZ-nt it?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Yes, it's perfect for a walk. How are you?", hindi: "हाँ, सैर के लिए एकदम सही है। आप कैसे हैं?", pronunciation: "Yes, its PER-fekt for uh wok. How ar yoo?" },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "I am fine, thank you. How is your family?", hindi: "मैं ठीक हूँ, धन्यवाद। आपका परिवार कैसा है?", pronunciation: "I am fine, thank yoo. How iz yor FAM-i-lee?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Everyone is doing well. My son got a new job.", hindi: "सब ठीक हैं। मेरे बेटे को नई नौकरी मिली।", pronunciation: "EV-ree-wun iz DOO-ing wel. My sun got uh noo job." }
    ]
  },
  {
    id: 5,
    title: "Watching TV Together",
    titleHindi: "साथ में टीवी देखना",
    scenario: "Family watching television",
    scenarioHindi: "परिवार टेलीविजन देख रहा है",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Son", speakerHindi: "बेटा", english: "Can we watch the cricket match?", hindi: "क्या हम क्रिकेट मैच देख सकते हैं?", pronunciation: "Kan wee woch thuh KRIK-et mach?" },
      { speaker: "Father", speakerHindi: "पिता", english: "Sure! India is playing today. What's the score?", hindi: "ज़रूर! आज भारत खेल रहा है। स्कोर क्या है?", pronunciation: "Shoor! IN-dee-uh iz PLAY-ing too-DAY. Wots thuh skor?" },
      { speaker: "Son", speakerHindi: "बेटा", english: "India has scored 150 runs in 20 overs.", hindi: "भारत ने 20 ओवर में 150 रन बनाए हैं।", pronunciation: "IN-dee-uh haz skord wun-FIF-tee runs in TWEN-tee OH-vers." },
      { speaker: "Mother", speakerHindi: "माँ", english: "I'll bring some snacks for everyone.", hindi: "मैं सबके लिए कुछ नाश्ता लाती हूँ।", pronunciation: "Il bring sum snaks for EV-ree-wun." }
    ]
  },
  {

    id: 6,
    title: "Helping with Homework",
    titleHindi: "होमवर्क में मदद",
    scenario: "Parent helping child with homework",
    scenarioHindi: "माता-पिता बच्चे के होमवर्क में मदद कर रहे हैं",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Child", speakerHindi: "बच्चा", english: "Dad, can you help me with my math homework?", hindi: "पापा, क्या आप मेरे गणित के होमवर्क में मदद कर सकते हैं?", pronunciation: "Dad, kan yoo help mee with my math HOHM-werk?" },
      { speaker: "Father", speakerHindi: "पिता", english: "Of course! What problem are you stuck on?", hindi: "बिल्कुल! किस सवाल में अटके हो?", pronunciation: "Ov kors! Wot PROB-lem ar yoo stuk on?" },
      { speaker: "Child", speakerHindi: "बच्चा", english: "I don't understand how to solve this equation.", hindi: "मुझे समझ नहीं आ रहा कि इस समीकरण को कैसे हल करें।", pronunciation: "I dont un-der-STAND how too solv this ee-KWAY-zhun." },
      { speaker: "Father", speakerHindi: "पिता", english: "Let me show you step by step. First, we need to...", hindi: "मुझे तुम्हें कदम दर कदम दिखाने दो। पहले, हमें...", pronunciation: "Let mee shoh yoo step by step. Ferst, wee need too..." }
    ]
  },
  {
    id: 7,
    title: "Going to Bed",
    titleHindi: "सोने जाना",
    scenario: "Bedtime routine conversation",
    scenarioHindi: "सोने से पहले की बातचीत",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", english: "It's 10 o'clock. Time to go to bed.", hindi: "10 बज गए हैं। सोने का समय हो गया।", pronunciation: "Its ten oh-KLOK. Time too goh too bed." },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Can I read for 10 more minutes, please?", hindi: "क्या मैं 10 मिनट और पढ़ सकता हूँ, कृपया?", pronunciation: "Kan I reed for ten mor MIN-its, pleez?" },
      { speaker: "Mother", speakerHindi: "माँ", english: "Okay, but only 10 minutes. You have school tomorrow.", hindi: "ठीक है, लेकिन सिर्फ 10 मिनट। कल स्कूल है।", pronunciation: "Oh-KAY, but OHN-lee ten MIN-its. Yoo hav skool too-MOR-oh." },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Good night, Mom. I love you.", hindi: "शुभ रात्रि, माँ। मैं आपसे प्यार करता हूँ।", pronunciation: "Good nite, Mom. I luv yoo." }
    ]
  },
  {
    id: 8,
    title: "Weekend Plans",
    titleHindi: "सप्ताहांत की योजना",
    scenario: "Family discussing weekend plans",
    scenarioHindi: "परिवार सप्ताहांत की योजना पर चर्चा कर रहा है",
    difficulty: "beginner",
    category: "Daily Life",
    lines: [
      { speaker: "Father", speakerHindi: "पिता", english: "What should we do this weekend?", hindi: "इस सप्ताहांत हमें क्या करना चाहिए?", pronunciation: "Wot shood wee doo this WEEK-end?" },
      { speaker: "Mother", speakerHindi: "माँ", english: "How about going to the park?", hindi: "पार्क जाने के बारे में क्या ख्याल है?", pronunciation: "How uh-BOWT GOH-ing too thuh park?" },
      { speaker: "Child", speakerHindi: "बच्चा", english: "Yes! Can we also have a picnic?", hindi: "हाँ! क्या हम पिकनिक भी कर सकते हैं?", pronunciation: "Yes! Kan wee OL-soh hav uh PIK-nik?" },
      { speaker: "Father", speakerHindi: "पिता", english: "That's a great idea! Let's pack some food.", hindi: "यह बहुत अच्छा विचार है! चलो कुछ खाना पैक करते हैं।", pronunciation: "Thats uh grayt i-DEE-uh! Lets pak sum food." }
    ]
  },

  // ==================== RESTAURANT & FOOD (9-25) ====================
  {
    id: 9,
    title: "Ordering at Restaurant",
    titleHindi: "रेस्तरां में ऑर्डर करना",
    scenario: "Ordering food at a restaurant",
    scenarioHindi: "रेस्तरां में खाना ऑर्डर करना",
    difficulty: "beginner",
    category: "Restaurant",
    lines: [
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Good evening! Welcome to our restaurant.", hindi: "शुभ संध्या! हमारे रेस्तरां में आपका स्वागत है।", pronunciation: "Good EE-vning! WEL-kum too our RES-tuh-rahnt." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Thank you. Can I see the menu, please?", hindi: "धन्यवाद। क्या मैं मेन्यू देख सकता हूँ?", pronunciation: "Thank yoo. Kan I see thuh MEN-yoo, pleez?" },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Of course! Here is the menu. Would you like something to drink?", hindi: "बिल्कुल! यह रहा मेन्यू। क्या आप कुछ पीना चाहेंगे?", pronunciation: "Ov kors! Heer iz thuh MEN-yoo. Wood yoo like SUM-thing too drink?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Yes, I would like a glass of water, please.", hindi: "हाँ, मुझे एक गिलास पानी चाहिए।", pronunciation: "Yes, I wood like uh glas ov WAW-ter, pleez." }
    ]
  },
  {
    id: 10,
    title: "Asking for Recommendations",
    titleHindi: "सिफारिश मांगना",
    scenario: "Asking waiter for food recommendations",
    scenarioHindi: "वेटर से खाने की सिफारिश मांगना",
    difficulty: "intermediate",
    category: "Restaurant",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "What do you recommend from the menu?", hindi: "आप मेन्यू से क्या सिफारिश करेंगे?", pronunciation: "Wot doo yoo rek-uh-MEND from thuh MEN-yoo?" },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Our butter chicken is very popular. It's our specialty.", hindi: "हमारा बटर चिकन बहुत लोकप्रिय है। यह हमारी विशेषता है।", pronunciation: "Our BU-ter CHIK-en iz VER-ee POP-yoo-lar. Its our SPESH-ul-tee." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Is it very spicy? I prefer mild food.", hindi: "क्या यह बहुत तीखा है? मुझे हल्का खाना पसंद है।", pronunciation: "Iz it VER-ee SPY-see? I pree-FER mild food." },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "We can make it less spicy for you. No problem.", hindi: "हम इसे आपके लिए कम तीखा बना सकते हैं। कोई समस्या नहीं।", pronunciation: "Wee kan mayk it les SPY-see for yoo. Noh PROB-lem." }
    ]
  },
  {
    id: 11,
    title: "Complaining About Food",
    titleHindi: "खाने के बारे में शिकायत",
    scenario: "Politely complaining about food quality",
    scenarioHindi: "खाने की गुणवत्ता के बारे में विनम्रता से शिकायत करना",
    difficulty: "intermediate",
    category: "Restaurant",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Excuse me, this soup is cold. Could you heat it up?", hindi: "माफ़ कीजिए, यह सूप ठंडा है। क्या आप इसे गर्म कर सकते हैं?", pronunciation: "Eks-KYOOZ mee, this soop iz kohld. Kood yoo heet it up?" },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "I'm so sorry about that. I'll get you a fresh one right away.", hindi: "इसके लिए मुझे बहुत खेद है। मैं आपके लिए तुरंत ताज़ा लाता हूँ।", pronunciation: "Im soh SOR-ee uh-BOWT that. Il get yoo uh fresh wun rite uh-WAY." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Thank you. I appreciate your quick response.", hindi: "धन्यवाद। मैं आपकी त्वरित प्रतिक्रिया की सराहना करता हूँ।", pronunciation: "Thank yoo. I uh-PREE-shee-ayt yor kwik ree-SPONS." },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Here is your fresh soup. Please enjoy your meal.", hindi: "यह रहा आपका ताज़ा सूप। कृपया अपने भोजन का आनंद लें।", pronunciation: "Heer iz yor fresh soop. Pleez en-JOY yor meel." }
    ]
  },
  {
    id: 12,
    title: "Asking for the Bill",
    titleHindi: "बिल मांगना",
    scenario: "Requesting the bill at a restaurant",
    scenarioHindi: "रेस्तरां में बिल मांगना",
    difficulty: "beginner",
    category: "Restaurant",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Excuse me, can we have the bill, please?", hindi: "माफ़ कीजिए, क्या हमें बिल मिल सकता है?", pronunciation: "Eks-KYOOZ mee, kan wee hav thuh bil, pleez?" },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Of course. How was your meal?", hindi: "बिल्कुल। आपका भोजन कैसा रहा?", pronunciation: "Ov kors. How woz yor meel?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "It was delicious! We really enjoyed it.", hindi: "यह स्वादिष्ट था! हमने वाकई इसका आनंद लिया।", pronunciation: "It woz dee-LISH-us! Wee REE-lee en-JOYD it." },
      { speaker: "Waiter", speakerHindi: "वेटर", english: "Thank you! Here is your bill. You can pay at the counter.", hindi: "धन्यवाद! यह रहा आपका बिल। आप काउंटर पर भुगतान कर सकते हैं।", pronunciation: "Thank yoo! Heer iz yor bil. Yoo kan pay at thuh KOWN-ter." }
    ]
  },
  {
    
id: 13,
    title: "Street Food Vendor",
    titleHindi: "स्ट्रीट फूड विक्रेता",
    scenario: "Buying food from a street vendor",
    scenarioHindi: "स्ट्रीट वेंडर से खाना खरीदना",
    difficulty: "beginner",
    category: "Restaurant",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How much for one plate of chaat?", hindi: "एक प्लेट चाट कितने की है?", pronunciation: "How much for wun playt ov chaat?" },
      { speaker: "Vendor", speakerHindi: "विक्रेता", english: "Thirty rupees for one plate, sir.", hindi: "एक प्लेट तीस रुपये, साहब।", pronunciation: "THUR-tee roo-PEEZ for wun playt, ser." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Please make it less spicy. And add extra curd.", hindi: "कृपया कम तीखा बनाइए। और अतिरिक्त दही डालिए।", pronunciation: "Pleez mayk it les SPY-see. And ad EKS-truh kurd." },
      { speaker: "Vendor", speakerHindi: "विक्रेता", english: "Sure! Your chaat will be ready in two minutes.", hindi: "ज़रूर! आपकी चाट दो मिनट में तैयार हो जाएगी।", pronunciation: "Shoor! Yor chaat wil bee RED-ee in too MIN-its." }
    ]
  },
  {
    id: 14,
    title: "Coffee Shop Order",
    titleHindi: "कॉफी शॉप में ऑर्डर",
    scenario: "Ordering at a coffee shop",
    scenarioHindi: "कॉफी शॉप में ऑर्डर करना",
    difficulty: "beginner",
    category: "Restaurant",
    lines: [
      { speaker: "Barista", speakerHindi: "बरिस्ता", english: "Hi! What can I get for you today?", hindi: "नमस्ते! आज आपके लिए क्या लाऊं?", pronunciation: "Hi! Wot kan I get for yoo too-DAY?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I'd like a cappuccino, please. Medium size.", hindi: "मुझे एक कैपुचीनो चाहिए। मीडियम साइज़।", pronunciation: "Id like uh kap-oo-CHEE-noh, pleez. MEE-dee-um size." },
      { speaker: "Barista", speakerHindi: "बरिस्ता", english: "Would you like any sugar or extra milk?", hindi: "क्या आप चीनी या अतिरिक्त दूध लेंगे?", pronunciation: "Wood yoo like EN-ee SHOO-gar or EKS-truh milk?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "No sugar, but extra milk would be nice.", hindi: "चीनी नहीं, लेकिन अतिरिक्त दूध अच्छा रहेगा।", pronunciation: "Noh SHOO-gar, but EKS-truh milk wood bee nice." }
    ]
  },
  // ==================== SHOPPING (15-35) ====================
  {
    id: 15,
    title: "Clothes Shopping",
    titleHindi: "कपड़ों की खरीदारी",
    scenario: "Buying clothes at a store",
    scenarioHindi: "दुकान पर कपड़े खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Hello! How can I help you today?", hindi: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?", pronunciation: "Heh-LOH! How kan I help yoo too-DAY?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I am looking for a formal shirt.", hindi: "मैं एक फॉर्मल शर्ट ढूंढ रहा हूँ।", pronunciation: "I am LOOK-ing for uh FOR-mul shert." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "What size do you need?", hindi: "आपको कौन सा साइज़ चाहिए?", pronunciation: "Wot size doo yoo need?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need a medium size. Do you have it in blue?", hindi: "मुझे मीडियम साइज़ चाहिए। क्या यह नीले रंग में है?", pronunciation: "I need uh MEE-dee-um size. Doo yoo hav it in bloo?" }
    ]
  },
  {
    id: 16,
    title: "Trying on Clothes",
    titleHindi: "कपड़े पहनकर देखना",
    scenario: "Trying clothes in a trial room",
    scenarioHindi: "ट्रायल रूम में कपड़े पहनकर देखना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Where is the trial room?", hindi: "ट्रायल रूम कहाँ है?", pronunciation: "Wair iz thuh TRY-ul room?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "It's at the back, on your right.", hindi: "यह पीछे है, आपके दाईं ओर।", pronunciation: "Its at thuh bak, on yor rite." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "This shirt is too tight. Do you have a larger size?", hindi: "यह शर्ट बहुत टाइट है। क्या आपके पास बड़ा साइज़ है?", pronunciation: "This shert iz too tite. Doo yoo hav uh LAR-jer size?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Let me check. Yes, we have it in large.", hindi: "मुझे देखने दीजिए। हाँ, हमारे पास लार्ज में है।", pronunciation: "Let mee chek. Yes, wee hav it in larj." }
    ]
  },
  {
    id: 17,
    title: "Bargaining",
    titleHindi: "मोलभाव करना",
    scenario: "Negotiating price at a market",
    scenarioHindi: "बाज़ार में कीमत पर मोलभाव करना",
    difficulty: "intermediate",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How much does this bag cost?", hindi: "इस बैग की कीमत क्या है?", pronunciation: "How much duz this bag kost?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "This bag is 800 rupees.", hindi: "यह बैग 800 रुपये का है।", pronunciation: "This bag iz ayt HUN-dred roo-PEEZ." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "That's too expensive. Can you give it for 500?", hindi: "यह बहुत महंगा है। क्या आप 500 में दे सकते हैं?", pronunciation: "Thats too eks-PEN-siv. Kan yoo giv it for five HUN-dred?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "I can give you a discount. Final price is 650.", hindi: "मैं आपको छूट दे सकता हूँ। अंतिम कीमत 650 है।", pronunciation: "I kan giv yoo uh DIS-kownt. FY-nul price iz siks-FIF-tee." }
    ]
  },
  
{
    id: 18,
    title: "Grocery Shopping",
    titleHindi: "किराने की खरीदारी",
    scenario: "Buying groceries at a store",
    scenarioHindi: "दुकान पर किराना खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need one kilogram of rice and half kilogram of dal.", hindi: "मुझे एक किलो चावल और आधा किलो दाल चाहिए।", pronunciation: "I need wun KIL-oh-gram ov rice and haf KIL-oh-gram ov daal." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Which type of rice do you want? Basmati or regular?", hindi: "आपको कौन सा चावल चाहिए? बासमती या साधारण?", pronunciation: "Wich type ov rice doo yoo wont? Bas-MA-tee or REG-yoo-lar?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Basmati rice, please. And do you have fresh vegetables?", hindi: "बासमती चावल, कृपया। और क्या आपके पास ताज़ी सब्ज़ियाँ हैं?", pronunciation: "Bas-MA-tee rice, pleez. And doo yoo hav fresh VEJ-tuh-bulz?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Yes, we have fresh tomatoes, onions, and potatoes.", hindi: "हाँ, हमारे पास ताज़े टमाटर, प्याज़ और आलू हैं।", pronunciation: "Yes, wee hav fresh tuh-MAY-tohz, UN-yunz, and puh-TAY-tohz." }
    ]
  },
  {
    id: 19,
    title: "Electronics Store",
    titleHindi: "इलेक्ट्रॉनिक्स स्टोर",
    scenario: "Buying a mobile phone",
    scenarioHindi: "मोबाइल फोन खरीदना",
    difficulty: "intermediate",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to buy a new smartphone. What do you recommend?", hindi: "मैं एक नया स्मार्टफोन खरीदना चाहता हूँ। आप क्या सिफारिश करेंगे?", pronunciation: "I wont too by uh noo SMART-fohn. Wot doo yoo rek-uh-MEND?" },
      { speaker: "Salesperson", speakerHindi: "विक्रेता", english: "What is your budget? We have phones from 10,000 to 50,000.", hindi: "आपका बजट क्या है? हमारे पास 10,000 से 50,000 तक के फोन हैं।", pronunciation: "Wot iz yor BUJ-et? Wee hav fohnz from ten THOW-zund too FIF-tee THOW-zund." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "My budget is around 20,000. I need good camera quality.", hindi: "मेरा बजट लगभग 20,000 है। मुझे अच्छी कैमरा क्वालिटी चाहिए।", pronunciation: "My BUJ-et iz uh-ROWND TWEN-tee THOW-zund. I need good KAM-ruh KWOL-i-tee." },
      { speaker: "Salesperson", speakerHindi: "विक्रेता", english: "This model has a 48MP camera and is within your budget.", hindi: "इस मॉडल में 48MP कैमरा है और यह आपके बजट में है।", pronunciation: "This MOD-ul haz uh FOR-tee-ayt MP KAM-ruh and iz with-IN yor BUJ-et." }
    ]
  },
  {
    id: 20,
    title: "Jewelry Store",
    titleHindi: "ज्वेलरी स्टोर",
    scenario: "Buying gold jewelry",
    scenarioHindi: "सोने के गहने खरीदना",
    difficulty: "intermediate",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I am looking for a gold necklace for my wife.", hindi: "मैं अपनी पत्नी के लिए सोने का हार ढूंढ रहा हूँ।", pronunciation: "I am LOOK-ing for uh gohld NEK-lus for my wife." },
      { speaker: "Jeweler", speakerHindi: "जौहरी", english: "We have many designs. What is your preferred weight?", hindi: "हमारे पास कई डिज़ाइन हैं। आपका पसंदीदा वज़न क्या है?", pronunciation: "Wee hav MEN-ee dee-ZINZ. Wot iz yor pree-FERD wayt?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Something around 15 to 20 grams. What is today's gold rate?", hindi: "लगभग 15 से 20 ग्राम। आज सोने का भाव क्या है?", pronunciation: "SUM-thing uh-ROWND fif-TEEN too TWEN-tee gramz. Wot iz too-DAYZ gohld rayt?" },
      { speaker: "Jeweler", speakerHindi: "जौहरी", english: "Today's rate is 5,500 per gram. Let me show you some designs.", hindi: "आज का भाव 5,500 प्रति ग्राम है। मुझे आपको कुछ डिज़ाइन दिखाने दीजिए।", pronunciation: "Too-DAYZ rayt iz five THOW-zund five HUN-dred per gram. Let mee shoh yoo sum dee-ZINZ." }
    ]
  },
  // ==================== HEALTHCARE (21-40) ====================
  {
    id: 21,
    title: "Doctor's Appointment",
    titleHindi: "डॉक्टर की अपॉइंटमेंट",
    scenario: "Visiting a doctor for checkup",
    scenarioHindi: "जांच के लिए डॉक्टर से मिलना",
    difficulty: "intermediate",
    category: "Healthcare",
    lines: [
      { speaker: "Receptionist", speakerHindi: "रिसेप्शनिस्ट", english: "Good morning! Do you have an appointment?", hindi: "सुप्रभात! क्या आपकी अपॉइंटमेंट है?", pronunciation: "Good MOR-ning! Doo yoo hav an uh-POINT-ment?" },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "Yes, I have an appointment at 10 AM with Dr. Sharma.", hindi: "हाँ, मेरी डॉ. शर्मा के साथ सुबह 10 बजे अपॉइंटमेंट है।", pronunciation: "Yes, I hav an uh-POINT-ment at ten AY-EM with DOK-ter SHAR-mah." },
      { speaker: "Receptionist", speakerHindi: "रिसेप्शनिस्ट", english: "Please have a seat. The doctor will see you shortly.", hindi: "कृपया बैठिए। डॉक्टर जल्द ही आपसे मिलेंगे।", pronunciation: "Pleez hav uh seet. Thuh DOK-ter wil see yoo SHORT-lee." },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "Thank you. How long will I have to wait?", hindi: "धन्यवाद। मुझे कितनी देर इंतज़ार करना होगा?", pronunciation: "Thank yoo. How long wil I hav too wayt?" }
    ]
  },
  {
 
   id: 22,
    title: "Describing Symptoms",
    titleHindi: "लक्षण बताना",
    scenario: "Telling doctor about health problems",
    scenarioHindi: "डॉक्टर को स्वास्थ्य समस्याओं के बारे में बताना",
    difficulty: "intermediate",
    category: "Healthcare",
    lines: [
      { speaker: "Doctor", speakerHindi: "डॉक्टर", english: "Hello! What brings you here today?", hindi: "नमस्ते! आज आप यहाँ क्यों आए हैं?", pronunciation: "Heh-LOH! Wot brings yoo heer too-DAY?" },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "I have been having headaches for the past week.", hindi: "पिछले एक हफ्ते से मुझे सिरदर्द हो रहा है।", pronunciation: "I hav been HAV-ing HED-ayks for thuh past week." },
      { speaker: "Doctor", speakerHindi: "डॉक्टर", english: "Do you have any other symptoms like fever or nausea?", hindi: "क्या आपको बुखार या मतली जैसे कोई अन्य लक्षण हैं?", pronunciation: "Doo yoo hav EN-ee UH-ther SIMP-tumz like FEE-ver or NAW-zee-uh?" },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "Yes, I also feel dizzy sometimes and have trouble sleeping.", hindi: "हाँ, मुझे कभी-कभी चक्कर भी आते हैं और सोने में परेशानी होती है।", pronunciation: "Yes, I OL-soh feel DIZ-ee sum-times and hav TRUB-ul SLEEP-ing." }
    ]
  },
  {
    id: 23,
    title: "At the Pharmacy",
    titleHindi: "फार्मेसी में",
    scenario: "Buying medicine at a pharmacy",
    scenarioHindi: "फार्मेसी में दवा खरीदना",
    difficulty: "beginner",
    category: "Healthcare",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I have a prescription from Dr. Gupta.", hindi: "मेरे पास डॉ. गुप्ता का प्रिस्क्रिप्शन है।", pronunciation: "I hav uh pree-SKRIP-shun from DOK-ter GUP-tah." },
      { speaker: "Pharmacist", speakerHindi: "फार्मासिस्ट", english: "Let me check. These medicines will cost 450 rupees.", hindi: "मुझे देखने दीजिए। इन दवाओं की कीमत 450 रुपये होगी।", pronunciation: "Let mee chek. Theez MED-i-sinz wil kost for-FIF-tee roo-PEEZ." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How should I take these medicines?", hindi: "मुझे ये दवाएं कैसे लेनी चाहिए?", pronunciation: "How shood I tayk theez MED-i-sinz?" },
      { speaker: "Pharmacist", speakerHindi: "फार्मासिस्ट", english: "Take one tablet after breakfast and one after dinner.", hindi: "नाश्ते के बाद एक गोली और रात के खाने के बाद एक गोली लें।", pronunciation: "Tayk wun TAB-let AF-ter BREK-fust and wun AF-ter DIN-er." }
    ]
  },
  {
    id: 24,
    title: "Emergency Room",
    titleHindi: "इमरजेंसी रूम",
    scenario: "Seeking emergency medical help",
    scenarioHindi: "आपातकालीन चिकित्सा सहायता लेना",
    difficulty: "advanced",
    category: "Healthcare",
    lines: [
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "Please help! My father has chest pain.", hindi: "कृपया मदद करें! मेरे पिता को सीने में दर्द है।", pronunciation: "Pleez help! My FAH-ther haz chest payn." },
      { speaker: "Nurse", speakerHindi: "नर्स", english: "Don't worry. We'll take care of him. How long has he had the pain?", hindi: "चिंता मत करो। हम उनका ध्यान रखेंगे। उन्हें कितनी देर से दर्द है?", pronunciation: "Dont WUR-ee. Weel tayk kair ov him. How long haz hee had thuh payn?" },
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "About 30 minutes. He also feels short of breath.", hindi: "लगभग 30 मिनट। उन्हें सांस लेने में भी तकलीफ हो रही है।", pronunciation: "Uh-BOWT THUR-tee MIN-its. Hee OL-soh feelz short ov breth." },
      { speaker: "Nurse", speakerHindi: "नर्स", english: "The doctor is coming right away. Please fill out this form.", hindi: "डॉक्टर अभी आ रहे हैं। कृपया यह फॉर्म भरें।", pronunciation: "Thuh DOK-ter iz KUM-ing rite uh-WAY. Pleez fil owt this form." }
    ]
  },
  {
    id: 25,
    title: "Dental Checkup",
    titleHindi: "दांतों की जांच",
    scenario: "Visiting a dentist",
    scenarioHindi: "दंत चिकित्सक से मिलना",
    difficulty: "intermediate",
    category: "Healthcare",
    lines: [
      { speaker: "Dentist", speakerHindi: "दंत चिकित्सक", english: "Please open your mouth wide. Let me examine your teeth.", hindi: "कृपया अपना मुंह चौड़ा खोलें। मुझे आपके दांतों की जांच करने दीजिए।", pronunciation: "Pleez OH-pen yor mowth wide. Let mee eg-ZAM-in yor teeth." },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "I have pain in my back tooth when I eat something cold.", hindi: "जब मैं कुछ ठंडा खाता हूँ तो मेरे पिछले दांत में दर्द होता है।", pronunciation: "I hav payn in my bak tooth wen I eet SUM-thing kohld." },
      { speaker: "Dentist", speakerHindi: "दंत चिकित्सक", english: "I see a cavity here. We need to fill it.", hindi: "मुझे यहाँ एक कैविटी दिख रही है। हमें इसे भरना होगा।", pronunciation: "I see uh KAV-i-tee heer. Wee need too fil it." },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "Will it be painful? I'm a bit nervous.", hindi: "क्या इसमें दर्द होगा? मैं थोड़ा घबराया हुआ हूँ।", pronunciation: "Wil it bee PAYN-ful? Im uh bit NER-vus." }
    ]
  },
  // ==================== TRAVEL & TRANSPORTATION (26-50) ====================
  {
    id: 26,
    title: "Booking a Train Ticket",
    titleHindi: "ट्रेन टिकट बुक करना",
    scenario: "Booking train tickets at the counter",
    scenarioHindi: "काउंटर पर ट्रेन टिकट बुक करना",
    difficulty: "intermediate",
    category: "Travel",
    lines: [
      { speaker: "Passenger", speakerHindi: "यात्री", english: "I need two tickets to Delhi for tomorrow.", hindi: "मुझे कल के लिए दिल्ली के दो टिकट चाहिए।", pronunciation: "I need too TIK-ets too DEL-ee for too-MOR-oh." },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "Which class do you prefer? AC or sleeper?", hindi: "आप कौन सी क्लास पसंद करेंगे? AC या स्लीपर?", pronunciation: "Wich klas doo yoo pree-FER? AY-SEE or SLEE-per?" },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "AC 3-tier, please. What time does the train depart?", hindi: "AC 3-टियर, कृपया। ट्रेन किस समय रवाना होती है?", pronunciation: "AY-SEE three-TEER, pleez. Wot time duz thuh trayn dee-PART?" },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "The train departs at 6:30 PM and arrives at 6:00 AM.", hindi: "ट्रेन शाम 6:30 बजे रवाना होती है और सुबह 6:00 बजे पहुंचती है।", pronunciation: "Thuh trayn dee-PARTS at siks-THUR-tee PEE-EM and uh-RIVZ at siks AY-EM." }
    ]
  },
  {
    id: 27,
    title: "At the Airport",
    titleHindi: "हवाई अड्डे पर",
    scenario: "Checking in at the airport",
    scenarioHindi: "हवाई अड्डे पर चेक-इन करना",
    difficulty: "intermediate",
    category: "Travel",
    lines: [
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Good morning! May I see your passport and ticket?", hindi: "सुप्रभात! क्या मैं आपका पासपोर्ट और टिकट देख सकता हूँ?", pronunciation: "Good MOR-ning! May I see yor PAS-port and TIK-et?" },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Here you go. I would like a window seat, please.", hindi: "यह लीजिए। मुझे खिड़की वाली सीट चाहिए, कृपया।", pronunciation: "Heer yoo goh. I wood like uh WIN-doh seet, pleez." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Do you have any checked baggage?", hindi: "क्या आपके पास कोई चेक्ड बैगेज है?", pronunciation: "Doo yoo hav EN-ee chekt BAG-ij?" },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Yes, I have one suitcase. Is it within the weight limit?", hindi: "हाँ, मेरे पास एक सूटकेस है। क्या यह वज़न सीमा में है?", pronunciation: "Yes, I hav wun SOOT-kays. Iz it with-IN thuh wayt LIM-it?" }
    ]
  },
  {
    id: 28,
    title: "Taking a Taxi",
    titleHindi: "टैक्सी लेना",
    scenario: "Hiring a taxi for travel",
    scenarioHindi: "यात्रा के लिए टैक्सी लेना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Can you take me to the railway station?", hindi: "क्या आप मुझे रेलवे स्टेशन ले जा सकते हैं?", pronunciation: "Kan yoo tayk mee too thuh RAYL-way STAY-shun?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Sure! It will cost 200 rupees.", hindi: "ज़रूर! इसकी कीमत 200 रुपये होगी।", pronunciation: "Shoor! It wil kost too HUN-dred roo-PEEZ." },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "That's fine. How long will it take?", hindi: "ठीक है। कितना समय लगेगा?", pronunciation: "Thats fine. How long wil it tayk?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "About 30 minutes, depending on traffic.", hindi: "लगभग 30 मिनट, ट्रैफिक पर निर्भर करता है।", pronunciation: "Uh-BOWT THUR-tee MIN-its, dee-PEN-ding on TRAF-ik." }
    ]
  },
  {
    id: 29,
    title: "Asking for Directions",
    titleHindi: "रास्ता पूछना",
    scenario: "Asking a stranger for directions",
    scenarioHindi: "किसी अजनबी से रास्ता पूछना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Tourist", speakerHindi: "पर्यटक", english: "Excuse me, can you help me find the museum?", hindi: "माफ़ कीजिए, क्या आप मुझे संग्रहालय खोजने में मदद कर सकते हैं?", pronunciation: "Eks-KYOOZ mee, kan yoo help mee find thuh myoo-ZEE-um?" },
      { speaker: "Local", speakerHindi: "स्थानीय", english: "Sure! Go straight and turn left at the traffic signal.", hindi: "ज़रूर! सीधे जाइए और ट्रैफिक सिग्नल पर बाएं मुड़िए।", pronunciation: "Shoor! Goh strayt and tern left at thuh TRAF-ik SIG-nul." },
      { speaker: "Tourist", speakerHindi: "पर्यटक", english: "How far is it from here?", hindi: "यहाँ से कितनी दूर है?", pronunciation: "How far iz it from heer?" },
      { speaker: "Local", speakerHindi: "स्थानीय", english: "It's about 10 minutes walk. You can't miss it.", hindi: "यह लगभग 10 मिनट की पैदल दूरी पर है। आप इसे मिस नहीं कर सकते।", pronunciation: "Its uh-BOWT ten MIN-its wok. Yoo kant mis it." }
    ]
  },
  {
    id: 30,
    title: "Hotel Check-in",
    titleHindi: "होटल चेक-इन",
    scenario: "Checking into a hotel",
    scenarioHindi: "होटल में चेक-इन करना",
    difficulty: "intermediate",
    category: "Travel",
    lines: [
      { speaker: "Guest", speakerHindi: "मेहमान", english: "Hello, I have a reservation under the name Sharma.", hindi: "नमस्ते, मेरा शर्मा नाम से आरक्षण है।", pronunciation: "Heh-LOH, I hav uh rez-er-VAY-shun UN-der thuh naym SHAR-mah." },
      { speaker: "Receptionist", speakerHindi: "रिसेप्शनिस्ट", english: "Yes, I found your booking. You have a deluxe room for 3 nights.", hindi: "हाँ, मुझे आपकी बुकिंग मिल गई। आपके पास 3 रातों के लिए डीलक्स रूम है।", pronunciation: "Yes, I fownd yor BOOK-ing. Yoo hav uh dee-LUKS room for three nites." },
      { speaker: "Guest", speakerHindi: "मेहमान", english: "Does the room have WiFi and breakfast included?", hindi: "क्या कमरे में वाईफाई और नाश्ता शामिल है?", pronunciation: "Duz thuh room hav WY-fy and BREK-fust in-KLOO-ded?" },
      { speaker: "Receptionist", speakerHindi: "रिसेप्शनिस्ट", english: "Yes, both are complimentary. Here is your room key.", hindi: "हाँ, दोनों मुफ्त हैं। यह रही आपकी कमरे की चाबी।", pronunciation: "Yes, bohth ar kom-pli-MEN-tuh-ree. Heer iz yor room kee." }
    ]
  },
  
{
    id: 31,
    title: "Bus Journey",
    titleHindi: "बस यात्रा",
    scenario: "Traveling by bus",
    scenarioHindi: "बस से यात्रा करना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Does this bus go to the city center?", hindi: "क्या यह बस सिटी सेंटर जाती है?", pronunciation: "Duz this bus goh too thuh SIT-ee SEN-ter?" },
      { speaker: "Conductor", speakerHindi: "कंडक्टर", english: "Yes, it does. The fare is 25 rupees.", hindi: "हाँ, जाती है। किराया 25 रुपये है।", pronunciation: "Yes, it duz. Thuh fair iz TWEN-tee-five roo-PEEZ." },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Please tell me when we reach the main market.", hindi: "कृपया मुझे बताइए जब हम मुख्य बाज़ार पहुंचें।", pronunciation: "Pleez tel mee wen wee reech thuh mayn MAR-ket." },
      { speaker: "Conductor", speakerHindi: "कंडक्टर", english: "Sure, I will let you know. It's about 20 minutes from here.", hindi: "ज़रूर, मैं आपको बता दूंगा। यहाँ से लगभग 20 मिनट है।", pronunciation: "Shoor, I wil let yoo noh. Its uh-BOWT TWEN-tee MIN-its from heer." }
    ]
  },
  {
    id: 32,
    title: "Auto Rickshaw Ride",
    titleHindi: "ऑटो रिक्शा की सवारी",
    scenario: "Taking an auto rickshaw",
    scenarioHindi: "ऑटो रिक्शा लेना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Auto! Will you go to Gandhi Nagar?", hindi: "ऑटो! गांधी नगर चलोगे?", pronunciation: "AW-toh! Wil yoo goh too GAN-dee NA-gar?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Yes, sit. It will be 80 rupees.", hindi: "हाँ, बैठो। 80 रुपये लगेंगे।", pronunciation: "Yes, sit. It wil bee AY-tee roo-PEEZ." },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "That's too much. I'll give you 50.", hindi: "यह बहुत ज़्यादा है। मैं 50 दूंगा।", pronunciation: "Thats too much. Il giv yoo FIF-tee." },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Okay, 60 rupees. Final price.", hindi: "ठीक है, 60 रुपये। अंतिम कीमत।", pronunciation: "Oh-KAY, SIK-stee roo-PEEZ. FY-nul price." }
    ]
  },
  // ==================== BANKING & FINANCE (33-45) ====================
  {
    id: 33,
    title: "Opening Bank Account",
    titleHindi: "बैंक खाता खोलना",
    scenario: "Opening a new bank account",
    scenarioHindi: "नया बैंक खाता खोलना",
    difficulty: "intermediate",
    category: "Banking",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I would like to open a savings account.", hindi: "मैं एक बचत खाता खोलना चाहता हूँ।", pronunciation: "I wood like too OH-pen uh SAY-vings uh-KOWNT." },
      { speaker: "Bank Officer", speakerHindi: "बैंक अधिकारी", english: "Sure! Do you have your ID proof and address proof?", hindi: "ज़रूर! क्या आपके पास आईडी प्रूफ और एड्रेस प्रूफ है?", pronunciation: "Shoor! Doo yoo hav yor I-D proof and AD-res proof?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Yes, I have my Aadhaar card and passport.", hindi: "हाँ, मेरे पास आधार कार्ड और पासपोर्ट है।", pronunciation: "Yes, I hav my AAD-har kard and PAS-port." },
      { speaker: "Bank Officer", speakerHindi: "बैंक अधिकारी", english: "Please fill out this application form.", hindi: "कृपया यह आवेदन फॉर्म भरें।", pronunciation: "Pleez fil owt this ap-li-KAY-shun form." }
    ]
  },
  {
    id: 34,
    title: "ATM Transaction",
    titleHindi: "ATM लेनदेन",
    scenario: "Withdrawing money from ATM",
    scenarioHindi: "ATM से पैसे निकालना",
    difficulty: "beginner",
    category: "Banking",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Excuse me, is this ATM working?", hindi: "माफ़ कीजिए, क्या यह ATM काम कर रहा है?", pronunciation: "Eks-KYOOZ mee, iz this AY-TEE-EM WER-king?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Yes, it is. But there's a long queue.", hindi: "हाँ, कर रहा है। लेकिन लंबी लाइन है।", pronunciation: "Yes, it iz. But thairz uh long kyoo." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Is there another ATM nearby?", hindi: "क्या पास में कोई और ATM है?", pronunciation: "Iz thair uh-NUH-ther AY-TEE-EM NEER-by?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Yes, there's one at the corner of this street.", hindi: "हाँ, इस सड़क के कोने पर एक है।", pronunciation: "Yes, thairz wun at thuh KOR-ner ov this street." }
    ]
  },
  {
    id: 35,
    title: "Loan Inquiry",
    titleHindi: "लोन पूछताछ",
    scenario: "Inquiring about a home loan",
    scenarioHindi: "होम लोन के बारे में पूछताछ",
    difficulty: "advanced",
    category: "Banking",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to know about your home loan options.", hindi: "मैं आपके होम लोन विकल्पों के बारे में जानना चाहता हूँ।", pronunciation: "I wont too noh uh-BOWT yor hohm lohn OP-shunz." },
      { speaker: "Bank Officer", speakerHindi: "बैंक अधिकारी", english: "Our current interest rate is 8.5% per annum.", hindi: "हमारी वर्तमान ब्याज दर 8.5% प्रति वर्ष है।", pronunciation: "Our KUR-ent IN-trest rayt iz ayt-point-five per-SENT per AN-um." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "What is the maximum loan amount I can get?", hindi: "मुझे अधिकतम कितना लोन मिल सकता है?", pronunciation: "Wot iz thuh MAK-si-mum lohn uh-MOWNT I kan get?" },
      { speaker: "Bank Officer", speakerHindi: "बैंक अधिकारी", english: "It depends on your income and property value. Usually up to 80%.", hindi: "यह आपकी आय और संपत्ति मूल्य पर निर्भर करता है। आमतौर पर 80% तक।", pronunciation: "It dee-PENDZ on yor IN-kum and PROP-er-tee VAL-yoo. YOO-zhoo-uh-lee up too AY-tee per-SENT." }
    ]
  },
  // ==================== PROFESSIONAL & OFFICE (36-60) ====================
  {
    id: 36,
    title: "Job Interview",
    titleHindi: "नौकरी का इंटरव्यू",
    scenario: "Attending a job interview",
    scenarioHindi: "नौकरी के इंटरव्यू में भाग लेना",
    difficulty: "advanced",
    category: "Professional",
    lines: [
      { speaker: "Interviewer", speakerHindi: "साक्षात्कारकर्ता", english: "Please tell me about yourself.", hindi: "कृपया अपने बारे में बताइए।", pronunciation: "Pleez tel mee uh-BOWT yor-SELF." },
      { speaker: "Candidate", speakerHindi: "उम्मीदवार", english: "I am a software engineer with five years of experience.", hindi: "मैं पांच साल के अनुभव वाला सॉफ्टवेयर इंजीनियर हूँ।", pronunciation: "I am uh SOFT-wair en-ji-NEER with five yeers ov ek-SPEER-ee-ens." },
      { speaker: "Interviewer", speakerHindi: "साक्षात्कारकर्ता", english: "What are your greatest strengths?", hindi: "आपकी सबसे बड़ी ताकत क्या है?", pronunciation: "Wot ar yor GRAY-test strengths?" },
      { speaker: "Candidate", speakerHindi: "उम्मीदवार", english: "I am a quick learner and work well in a team.", hindi: "मैं जल्दी सीखता हूँ और टीम में अच्छा काम करता हूँ।", pronunciation: "I am uh kwik LER-ner and werk wel in uh teem." }
    ]
  },
  {
    id: 37,
    title: "Office Meeting",
    titleHindi: "ऑफिस मीटिंग",
    scenario: "Participating in an office meeting",
    scenarioHindi: "ऑफिस मीटिंग में भाग लेना",
    difficulty: "intermediate",
    category: "Professional",
    lines: [
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "Let's start the meeting. First, let's review last week's progress.", hindi: "चलिए मीटिंग शुरू करते हैं। पहले, पिछले हफ्ते की प्रगति की समीक्षा करते हैं।", pronunciation: "Lets start thuh MEE-ting. Ferst, lets ree-VYOO last weeks PROG-res." },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "We completed the project ahead of schedule.", hindi: "हमने प्रोजेक्ट समय से पहले पूरा कर लिया।", pronunciation: "Wee kum-PLEE-ted thuh PROJ-ekt uh-HED ov SKED-yool." },
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "Excellent work! What are the next steps?", hindi: "बहुत बढ़िया काम! अगले कदम क्या हैं?", pronunciation: "EK-suh-lent werk! Wot ar thuh nekst steps?" },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "We need to start testing and fix any bugs.", hindi: "हमें टेस्टिंग शुरू करनी होगी और किसी भी बग को ठीक करना होगा।", pronunciation: "Wee need too start TEST-ing and fiks EN-ee bugz." }
    ]
  },
  {
    id: 38,
    title: "Asking for Leave",
    titleHindi: "छुट्टी मांगना",
    scenario: "Requesting leave from manager",
    scenarioHindi: "मैनेजर से छुट्टी मांगना",
    difficulty: "intermediate",
    category: "Professional",
    lines: [
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "Sir, I need to take leave next Monday.", hindi: "सर, मुझे अगले सोमवार को छुट्टी लेनी है।", pronunciation: "Ser, I need too tayk leev nekst MUN-day." },
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "What is the reason for the leave?", hindi: "छुट्टी का कारण क्या है?", pronunciation: "Wot iz thuh REE-zun for thuh leev?" },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "I have a family function to attend.", hindi: "मुझे एक पारिवारिक समारोह में जाना है।", pronunciation: "I hav uh FAM-i-lee FUNK-shun too uh-TEND." },
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "Okay, please submit your leave application.", hindi: "ठीक है, कृपया अपना छुट्टी आवेदन जमा करें।", pronunciation: "Oh-KAY, pleez sub-MIT yor leev ap-li-KAY-shun." }
    ]
  },
  {
    id: 39,
    title: "Salary Discussion",
    titleHindi: "वेतन चर्चा",
    scenario: "Discussing salary with HR",
    scenarioHindi: "HR के साथ वेतन पर चर्चा",
    difficulty: "advanced",
    category: "Professional",
    lines: [
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "I would like to discuss my salary increment.", hindi: "मैं अपनी वेतन वृद्धि पर चर्चा करना चाहता हूँ।", pronunciation: "I wood like too dis-KUS my SAL-uh-ree IN-kree-ment." },
      { speaker: "HR", speakerHindi: "HR", english: "Your performance has been excellent this year.", hindi: "इस साल आपका प्रदर्शन उत्कृष्ट रहा है।", pronunciation: "Yor per-FOR-muns haz been EK-suh-lent this yeer." },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "I believe I deserve a 20% raise based on my contributions.", hindi: "मुझे लगता है कि मेरे योगदान के आधार पर मैं 20% वृद्धि का हकदार हूँ।", pronunciation: "I bee-LEEV I dee-ZERV uh TWEN-tee per-SENT rayz bayst on my kon-tri-BYOO-shunz." },
      { speaker: "HR", speakerHindi: "HR", english: "Let me discuss this with management and get back to you.", hindi: "मुझे प्रबंधन से चर्चा करने दीजिए और मैं आपको बताऊंगा।", pronunciation: "Let mee dis-KUS this with MAN-ij-ment and get bak too yoo." }
    ]
  },
  {
    id: 40,
    title: "Client Meeting",
    titleHindi: "क्लाइंट मीटिंग",
    scenario: "Meeting with a client",
    scenarioHindi: "क्लाइंट से मिलना",
    difficulty: "advanced",
    category: "Professional",
    lines: [
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "Thank you for meeting with us today.", hindi: "आज हमसे मिलने के लिए धन्यवाद।", pronunciation: "Thank yoo for MEE-ting with us too-DAY." },
      { speaker: "Client", speakerHindi: "क्लाइंट", english: "My pleasure. I'm excited to hear about your proposal.", hindi: "मेरी खुशी। मैं आपके प्रस्ताव के बारे में सुनने के लिए उत्साहित हूँ।", pronunciation: "My PLEZH-er. Im ek-SY-ted too heer uh-BOWT yor pruh-POH-zul." },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "We have prepared a comprehensive solution for your needs.", hindi: "हमने आपकी ज़रूरतों के लिए एक व्यापक समाधान तैयार किया है।", pronunciation: "Wee hav pree-PAIRD uh kom-pree-HEN-siv suh-LOO-shun for yor needz." },
      { speaker: "Client", speakerHindi: "क्लाइंट", english: "That sounds promising. Please share the details.", hindi: "यह आशाजनक लगता है। कृपया विवरण साझा करें।", pronunciation: "That sowndz PROM-i-sing. Pleez shair thuh dee-TAYLZ." }
    ]
  },
  // ==================== EDUCATION (41-60) ====================
  {
    id: 41,
    title: "School Admission",
    titleHindi: "स्कूल में दाखिला",
    scenario: "Inquiring about school admission",
    scenarioHindi: "स्कूल में दाखिले के बारे में पूछताछ",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "I want to admit my child to your school.", hindi: "मैं अपने बच्चे का आपके स्कूल में दाखिला कराना चाहता हूँ।", pronunciation: "I wont too ad-MIT my child too yor skool." },
      { speaker: "Admin", speakerHindi: "प्रशासक", english: "Which class are you looking for?", hindi: "आप किस कक्षा के लिए देख रहे हैं?", pronunciation: "Wich klas ar yoo LOOK-ing for?" },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "Class 5. What is the admission process?", hindi: "कक्षा 5। दाखिले की प्रक्रिया क्या है?", pronunciation: "Klas five. Wot iz thuh ad-MISH-un PROS-es?" },
      { speaker: "Admin", speakerHindi: "प्रशासक", english: "You need to fill the form and submit documents. There's also an entrance test.", hindi: "आपको फॉर्म भरना होगा और दस्तावेज़ जमा करने होंगे। एक प्रवेश परीक्षा भी है।", pronunciation: "Yoo need too fil thuh form and sub-MIT DOK-yoo-ments. Thairz OL-soh an EN-trans test." }
    ]
  },
  {
    id: 42,
    title: "Parent-Teacher Meeting",
    titleHindi: "अभिभावक-शिक्षक बैठक",
    scenario: "Discussing child's progress with teacher",
    scenarioHindi: "शिक्षक के साथ बच्चे की प्रगति पर चर्चा",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "Your son is doing well in most subjects.", hindi: "आपका बेटा अधिकांश विषयों में अच्छा कर रहा है।", pronunciation: "Yor sun iz DOO-ing wel in mohst SUB-jekts." },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "How is his performance in mathematics?", hindi: "गणित में उसका प्रदर्शन कैसा है?", pronunciation: "How iz hiz per-FOR-muns in math-uh-MAT-iks?" },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "He needs to practice more. I suggest extra coaching.", hindi: "उसे और अभ्यास करने की ज़रूरत है। मैं अतिरिक्त कोचिंग का सुझाव देती हूँ।", pronunciation: "Hee needz too PRAK-tis mor. I suh-JEST EKS-truh KOHCH-ing." },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "Thank you for the feedback. We will work on it.", hindi: "प्रतिक्रिया के लिए धन्यवाद। हम इस पर काम करेंगे।", pronunciation: "Thank yoo for thuh FEED-bak. Wee wil werk on it." }
    ]
  },
  {
    id: 43,
    title: "Library Conversation",
    titleHindi: "पुस्तकालय में बातचीत",
    scenario: "Borrowing books from library",
    scenarioHindi: "पुस्तकालय से किताबें उधार लेना",
    difficulty: "beginner",
    category: "Education",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "I want to borrow this book. How long can I keep it?", hindi: "मैं यह किताब उधार लेना चाहता हूँ। मैं इसे कितने दिन रख सकता हूँ?", pronunciation: "I wont too BOR-oh this book. How long kan I keep it?" },
      { speaker: "Librarian", speakerHindi: "पुस्तकालयाध्यक्ष", english: "You can keep it for 14 days. Please show your library card.", hindi: "आप इसे 14 दिन रख सकते हैं। कृपया अपना लाइब्रेरी कार्ड दिखाएं।", pronunciation: "Yoo kan keep it for for-TEEN dayz. Pleez shoh yor LY-brer-ee kard." },
      { speaker: "Student", speakerHindi: "छात्र", english: "What happens if I return it late?", hindi: "अगर मैं इसे देर से लौटाऊं तो क्या होगा?", pronunciation: "Wot HAP-enz if I ree-TERN it layt?" },
      { speaker: "Librarian", speakerHindi: "पुस्तकालयाध्यक्ष", english: "There's a fine of 2 rupees per day for late returns.", hindi: "देर से लौटाने पर प्रति दिन 2 रुपये का जुर्माना है।", pronunciation: "Thairz uh fine ov too roo-PEEZ per day for layt ree-TERNZ." }
    ]
  },
  {
    id: 44,
    title: "College Admission",
    titleHindi: "कॉलेज में दाखिला",
    scenario: "Applying for college admission",
    scenarioHindi: "कॉलेज में दाखिले के लिए आवेदन",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "I want to apply for the B.Tech program.", hindi: "मैं B.Tech प्रोग्राम के लिए आवेदन करना चाहता हूँ।", pronunciation: "I wont too uh-PLY for thuh BEE-tek PROH-gram." },
      { speaker: "Counselor", speakerHindi: "काउंसलर", english: "What was your score in the entrance exam?", hindi: "प्रवेश परीक्षा में आपका स्कोर क्या था?", pronunciation: "Wot woz yor skor in thuh EN-trans eg-ZAM?" },
      { speaker: "Student", speakerHindi: "छात्र", english: "I scored 85 percentile. Am I eligible for Computer Science?", hindi: "मैंने 85 परसेंटाइल स्कोर किया। क्या मैं कंप्यूटर साइंस के लिए योग्य हूँ?", pronunciation: "I skord AY-tee-five per-sen-TYL. Am I EL-i-ji-bul for kum-PYOO-ter SY-ens?" },
      { speaker: "Counselor", speakerHindi: "काउंसलर", english: "Yes, you are eligible. Please submit your documents by Friday.", hindi: "हाँ, आप योग्य हैं। कृपया शुक्रवार तक अपने दस्तावेज़ जमा करें।", pronunciation: "Yes, yoo ar EL-i-ji-bul. Pleez sub-MIT yor DOK-yoo-ments by FRY-day." }
    ]
  },
  {
    id: 45,
    title: "Asking Teacher for Help",
    titleHindi: "शिक्षक से मदद मांगना",
    scenario: "Student asking teacher for clarification",
    scenarioHindi: "छात्र शिक्षक से स्पष्टीकरण मांग रहा है",
    difficulty: "beginner",
    category: "Education",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "Ma'am, I didn't understand this chapter. Can you explain again?", hindi: "मैम, मुझे यह अध्याय समझ नहीं आया। क्या आप फिर से समझा सकती हैं?", pronunciation: "Mam, I DID-nt un-der-STAND this CHAP-ter. Kan yoo eks-PLAYN uh-GEN?" },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "Of course! Which part is confusing you?", hindi: "बिल्कुल! कौन सा हिस्सा आपको भ्रमित कर रहा है?", pronunciation: "Ov kors! Wich part iz kun-FYOO-zing yoo?" },
      { speaker: "Student", speakerHindi: "छात्र", english: "I don't understand how to solve these equations.", hindi: "मुझे समझ नहीं आ रहा कि इन समीकरणों को कैसे हल करें।", pronunciation: "I dont un-der-STAND how too solv theez ee-KWAY-zhunz." },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "Let me show you step by step. Pay attention carefully.", hindi: "मुझे आपको कदम दर कदम दिखाने दीजिए। ध्यान से देखिए।", pronunciation: "Let mee shoh yoo step by step. Pay uh-TEN-shun KAIR-ful-ee." }
    ]
  },
  // ==================== SOCIAL SITUATIONS (46-70) ====================
  {
    id: 46,
    title: "Meeting New Neighbors",
    titleHindi: "नए पड़ोसियों से मिलना",
    scenario: "Introducing yourself to new neighbors",
    scenarioHindi: "नए पड़ोसियों से अपना परिचय देना",
    difficulty: "beginner",
    category: "Social",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Hello! I'm your new neighbor. I just moved in yesterday.", hindi: "नमस्ते! मैं आपका नया पड़ोसी हूँ। मैं कल ही यहाँ आया हूँ।", pronunciation: "Heh-LOH! Im yor noo NAY-ber. I just moovd in YES-ter-day." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Welcome to the neighborhood! I'm Sharma. Nice to meet you.", hindi: "मोहल्ले में आपका स्वागत है! मैं शर्मा हूँ। आपसे मिलकर खुशी हुई।", pronunciation: "WEL-kum too thuh NAY-ber-hood! Im SHAR-mah. Nice too meet yoo." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Nice to meet you too. Where is the nearest grocery store?", hindi: "आपसे मिलकर भी खुशी हुई। सबसे नज़दीकी किराना स्टोर कहाँ है?", pronunciation: "Nice too meet yoo too. Wair iz thuh NEER-est GROH-suh-ree stor?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "It's just two blocks away. I can show you if you want.", hindi: "यह बस दो ब्लॉक दूर है। अगर आप चाहें तो मैं दिखा सकता हूँ।", pronunciation: "Its just too bloks uh-WAY. I kan shoh yoo if yoo wont." }
    ]
  },
  {
    id: 47,
    title: "Birthday Party",
    titleHindi: "जन्मदिन की पार्टी",
    scenario: "Attending a birthday party",
    scenarioHindi: "जन्मदिन की पार्टी में जाना",
    difficulty: "beginner",
    category: "Social",
    lines: [
      { speaker: "Guest", speakerHindi: "मेहमान", english: "Happy birthday! This gift is for you.", hindi: "जन्मदिन मुबारक! यह उपहार आपके लिए है।", pronunciation: "HAP-ee BERTH-day! This gift iz for yoo." },
      { speaker: "Birthday Person", speakerHindi: "जन्मदिन वाला", english: "Thank you so much! You didn't have to bring anything.", hindi: "बहुत-बहुत धन्यवाद! आपको कुछ लाने की ज़रूरत नहीं थी।", pronunciation: "Thank yoo soh much! Yoo DID-nt hav too bring EN-ee-thing." },
      { speaker: "Guest", speakerHindi: "मेहमान", english: "It's my pleasure. The decorations look beautiful!", hindi: "यह मेरी खुशी है। सजावट बहुत सुंदर लग रही है!", pronunciation: "Its my PLEZH-er. Thuh dek-oh-RAY-shunz look BYOO-ti-ful!" },
      { speaker: "Birthday Person", speakerHindi: "जन्मदिन वाला", english: "Please have some cake and snacks. Enjoy the party!", hindi: "कृपया कुछ केक और स्नैक्स लीजिए। पार्टी का आनंद लीजिए!", pronunciation: "Pleez hav sum kayk and snaks. En-JOY thuh PAR-tee!" }
    ]
  },
  {
    id: 48,
    title: "Wedding Invitation",
    titleHindi: "शादी का निमंत्रण",
    scenario: "Inviting someone to a wedding",
    scenarioHindi: "किसी को शादी में बुलाना",
    difficulty: "intermediate",
    category: "Social",
    lines: [
      { speaker: "Host", speakerHindi: "मेज़बान", english: "I'm getting married next month. Please come to my wedding.", hindi: "अगले महीने मेरी शादी है। कृपया मेरी शादी में आइए।", pronunciation: "Im GET-ing MAR-eed nekst munth. Pleez kum too my WED-ing." },
      { speaker: "Guest", speakerHindi: "मेहमान", english: "Congratulations! I would love to attend. When is the date?", hindi: "बधाई हो! मुझे आने में खुशी होगी। तारीख कब है?", pronunciation: "Kun-grat-yoo-LAY-shunz! I wood luv too uh-TEND. Wen iz thuh dayt?" },
      { speaker: "Host", speakerHindi: "मेज़बान", english: "It's on the 15th of next month. Here's the invitation card.", hindi: "यह अगले महीने की 15 तारीख को है। यह रहा निमंत्रण पत्र।", pronunciation: "Its on thuh fif-TEENTH ov nekst munth. Heerz thuh in-vi-TAY-shun kard." },
      { speaker: "Guest", speakerHindi: "मेहमान", english: "Thank you! I will definitely be there with my family.", hindi: "धन्यवाद! मैं अपने परिवार के साथ ज़रूर आऊंगा।", pronunciation: "Thank yoo! I wil DEF-i-nit-lee bee thair with my FAM-i-lee." }
    ]
  },
  {
    id: 49,
    title: "Apologizing",
    titleHindi: "माफी मांगना",
    scenario: "Apologizing for a mistake",
    scenarioHindi: "गलती के लिए माफी मांगना",
    difficulty: "beginner",
    category: "Social",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "I'm really sorry for being late. Traffic was terrible.", hindi: "देर से आने के लिए मुझे सच में खेद है। ट्रैफिक बहुत खराब था।", pronunciation: "Im REE-lee SOR-ee for BEE-ing layt. TRAF-ik woz TER-i-bul." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "It's okay. These things happen. Don't worry about it.", hindi: "कोई बात नहीं। ऐसा होता है। इसकी चिंता मत करो।", pronunciation: "Its oh-KAY. Theez things HAP-en. Dont WUR-ee uh-BOWT it." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Thank you for understanding. It won't happen again.", hindi: "समझने के लिए धन्यवाद। यह फिर नहीं होगा।", pronunciation: "Thank yoo for un-der-STAN-ding. It wohnt HAP-en uh-GEN." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "No problem. Let's start our meeting now.", hindi: "कोई समस्या नहीं। चलिए अब हमारी मीटिंग शुरू करते हैं।", pronunciation: "Noh PROB-lem. Lets start our MEE-ting now." }
    ]
  },
  {
    id: 50,
    title: "Giving Compliments",
    titleHindi: "तारीफ करना",
    scenario: "Complimenting someone",
    scenarioHindi: "किसी की तारीफ करना",
    difficulty: "beginner",
    category: "Social",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "You look very nice today! I love your dress.", hindi: "आज आप बहुत अच्छी लग रही हैं! मुझे आपकी ड्रेस बहुत पसंद है।", pronunciation: "Yoo look VER-ee nice too-DAY! I luv yor dres." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Thank you so much! That's very kind of you.", hindi: "बहुत-बहुत धन्यवाद! आप बहुत दयालु हैं।", pronunciation: "Thank yoo soh much! Thats VER-ee kind ov yoo." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Where did you buy it? It suits you perfectly.", hindi: "आपने इसे कहाँ से खरीदा? यह आप पर बिल्कुल सही लग रही है।", pronunciation: "Wair did yoo by it? It soots yoo PER-fekt-lee." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "I bought it from the new mall. They have great collection.", hindi: "मैंने इसे नए मॉल से खरीदा। उनके पास बहुत अच्छा कलेक्शन है।", pronunciation: "I bot it from thuh noo mol. They hav grayt kuh-LEK-shun." }
    ]
  },
  // ==================== EMERGENCY & HELP (51-65) ====================
  {
    id: 51,
    title: "Calling Police",
    titleHindi: "पुलिस को फोन करना",
    scenario: "Reporting an incident to police",
    scenarioHindi: "पुलिस को घटना की रिपोर्ट करना",
    difficulty: "intermediate",
    category: "Emergency",
    lines: [
      { speaker: "Caller", speakerHindi: "कॉलर", english: "Hello, I want to report a theft. My wallet was stolen.", hindi: "नमस्ते, मैं चोरी की रिपोर्ट करना चाहता हूँ। मेरा बटुआ चोरी हो गया।", pronunciation: "Heh-LOH, I wont too ree-PORT uh theft. My WOL-et woz STOH-len." },
      { speaker: "Police", speakerHindi: "पुलिस", english: "Where did this happen? Please give me the details.", hindi: "यह कहाँ हुआ? कृपया मुझे विवरण दें।", pronunciation: "Wair did this HAP-en? Pleez giv mee thuh dee-TAYLZ." },
      { speaker: "Caller", speakerHindi: "कॉलर", english: "It happened at the bus station about an hour ago.", hindi: "यह लगभग एक घंटे पहले बस स्टेशन पर हुआ।", pronunciation: "It HAP-end at thuh bus STAY-shun uh-BOWT an owr uh-GOH." },
      { speaker: "Police", speakerHindi: "पुलिस", english: "Please come to the police station to file an FIR.", hindi: "कृपया FIR दर्ज करने के लिए पुलिस स्टेशन आइए।", pronunciation: "Pleez kum too thuh puh-LEES STAY-shun too file an EF-I-AR." }
    ]
  },
  {
    id: 52,
    title: "Fire Emergency",
    titleHindi: "आग की आपातकाल",
    scenario: "Reporting a fire emergency",
    scenarioHindi: "आग की आपातकालीन स्थिति की रिपोर्ट करना",
    difficulty: "intermediate",
    category: "Emergency",
    lines: [
      { speaker: "Caller", speakerHindi: "कॉलर", english: "There's a fire in my building! Please send help immediately!", hindi: "मेरी बिल्डिंग में आग लगी है! कृपया तुरंत मदद भेजें!", pronunciation: "Thairz uh fire in my BIL-ding! Pleez send help i-MEE-dee-ut-lee!" },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "Stay calm. What is your address?", hindi: "शांत रहें। आपका पता क्या है?", pronunciation: "Stay kahm. Wot iz yor AD-res?" },
      { speaker: "Caller", speakerHindi: "कॉलर", english: "123 Gandhi Road, near the main market.", hindi: "123 गांधी रोड, मुख्य बाज़ार के पास।", pronunciation: "Wun-too-three GAN-dee rohd, neer thuh mayn MAR-ket." },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "Fire brigade is on the way. Please evacuate the building.", hindi: "फायर ब्रिगेड रास्ते में है। कृपया बिल्डिंग खाली करें।", pronunciation: "Fire bri-GAYD iz on thuh way. Pleez ee-VAK-yoo-ayt thuh BIL-ding." }
    ]
  },
  {
    id: 53,
    title: "Lost and Found",
    titleHindi: "खोया और पाया",
    scenario: "Reporting a lost item",
    scenarioHindi: "खोई हुई वस्तु की रिपोर्ट करना",
    difficulty: "beginner",
    category: "Emergency",
    lines: [
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "Excuse me, I lost my bag somewhere in this mall.", hindi: "माफ़ कीजिए, मैंने इस मॉल में कहीं अपना बैग खो दिया।", pronunciation: "Eks-KYOOZ mee, I lost my bag SUM-wair in this mol." },
      { speaker: "Security", speakerHindi: "सुरक्षा", english: "What does your bag look like? What color is it?", hindi: "आपका बैग कैसा दिखता है? किस रंग का है?", pronunciation: "Wot duz yor bag look like? Wot KUL-er iz it?" },
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "It's a black leather bag with a red strap.", hindi: "यह लाल पट्टी वाला काला चमड़े का बैग है।", pronunciation: "Its uh blak LETH-er bag with uh red strap." },
      { speaker: "Security", speakerHindi: "सुरक्षा", english: "Let me check the lost and found. Please wait here.", hindi: "मुझे खोया-पाया में देखने दीजिए। कृपया यहाँ रुकिए।", pronunciation: "Let mee chek thuh lost and fownd. Pleez wayt heer." }
    ]
  },
  {
    id: 54,
    title: "Asking for Help",
    titleHindi: "मदद मांगना",
    scenario: "Asking a stranger for help",
    scenarioHindi: "किसी अजनबी से मदद मांगना",
    difficulty: "beginner",
    category: "Emergency",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Excuse me, can you help me? I'm lost.", hindi: "माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं? मैं खो गया हूँ।", pronunciation: "Eks-KYOOZ mee, kan yoo help mee? Im lost." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Of course! Where do you need to go?", hindi: "बिल्कुल! आपको कहाँ जाना है?", pronunciation: "Ov kors! Wair doo yoo need too goh?" },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "I'm looking for the central bus station.", hindi: "मैं सेंट्रल बस स्टेशन ढूंढ रहा हूँ।", pronunciation: "Im LOOK-ing for thuh SEN-trul bus STAY-shun." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "It's about 1 kilometer from here. I can walk you there.", hindi: "यह यहाँ से लगभग 1 किलोमीटर दूर है। मैं आपको वहाँ ले जा सकता हूँ।", pronunciation: "Its uh-BOWT wun KIL-oh-mee-ter from heer. I kan wok yoo thair." }
    ]
  },
  {
    id: 55,
    title: "Car Breakdown",
    titleHindi: "कार खराब होना",
    scenario: "Dealing with car breakdown",
    scenarioHindi: "कार खराब होने पर",
    difficulty: "intermediate",
    category: "Emergency",
    lines: [
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "My car has broken down. Can you help me?", hindi: "मेरी कार खराब हो गई है। क्या आप मेरी मदद कर सकते हैं?", pronunciation: "My kar haz BROH-ken down. Kan yoo help mee?" },
      { speaker: "Helper", speakerHindi: "मददगार", english: "What seems to be the problem?", hindi: "समस्या क्या लग रही है?", pronunciation: "Wot seemz too bee thuh PROB-lem?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "The engine won't start. I think the battery is dead.", hindi: "इंजन स्टार्ट नहीं हो रहा। मुझे लगता है बैटरी खत्म हो गई है।", pronunciation: "Thuh EN-jin wohnt start. I think thuh BAT-uh-ree iz ded." },
      { speaker: "Helper", speakerHindi: "मददगार", english: "There's a mechanic shop nearby. I'll call them for you.", hindi: "पास में एक मैकेनिक की दुकान है। मैं आपके लिए उन्हें बुलाता हूँ।", pronunciation: "Thairz uh muh-KAN-ik shop NEER-by. Il kol them for yoo." }
    ]
  },
  // ==================== GOVERNMENT OFFICES (56-70) ====================
  {
    id: 56,
    title: "Passport Office",
    titleHindi: "पासपोर्ट कार्यालय",
    scenario: "Applying for passport",
    scenarioHindi: "पासपोर्ट के लिए आवेदन करना",
    difficulty: "intermediate",
    category: "Government",
    lines: [
      { speaker: "Applicant", speakerHindi: "आवेदक", english: "I want to apply for a new passport.", hindi: "मैं नए पासपोर्ट के लिए आवेदन करना चाहता हूँ।", pronunciation: "I wont too uh-PLY for uh noo PAS-port." },
      { speaker: "Officer", speakerHindi: "अधिकारी", english: "Have you filled the online application form?", hindi: "क्या आपने ऑनलाइन आवेदन फॉर्म भरा है?", pronunciation: "Hav yoo fild thuh ON-line ap-li-KAY-shun form?" },
      { speaker: "Applicant", speakerHindi: "आवेदक", english: "Yes, I have. Here are my documents.", hindi: "हाँ, भरा है। यह रहे मेरे दस्तावेज़।", pronunciation: "Yes, I hav. Heer ar my DOK-yoo-ments." },
      { speaker: "Officer", speakerHindi: "अधिकारी", english: "Your documents are complete. Please wait for verification.", hindi: "आपके दस्तावेज़ पूरे हैं। कृपया सत्यापन के लिए प्रतीक्षा करें।", pronunciation: "Yor DOK-yoo-ments ar kum-PLEET. Pleez wayt for ver-i-fi-KAY-shun." }
    ]
  },
  {
    id: 57,
    title: "Aadhaar Card Center",
    titleHindi: "आधार कार्ड केंद्र",
    scenario: "Updating Aadhaar card",
    scenarioHindi: "आधार कार्ड अपडेट करना",
    difficulty: "intermediate",
    category: "Government",
    lines: [
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "I need to update my address on my Aadhaar card.", hindi: "मुझे अपने आधार कार्ड पर पता अपडेट करना है।", pronunciation: "I need too up-DAYT my AD-res on my AAD-har kard." },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "Do you have address proof? Like electricity bill or bank statement?", hindi: "क्या आपके पास पते का प्रमाण है? जैसे बिजली का बिल या बैंक स्टेटमेंट?", pronunciation: "Doo yoo hav AD-res proof? Like ee-lek-TRIS-i-tee bil or bank STAYT-ment?" },
      { speaker: "Person", speakerHindi: "व्यक्ति", english: "Yes, I have my electricity bill. Here it is.", hindi: "हाँ, मेरे पास बिजली का बिल है। यह रहा।", pronunciation: "Yes, I hav my ee-lek-TRIS-i-tee bil. Heer it iz." },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "Please provide your biometrics. The update will be done in 90 days.", hindi: "कृपया अपना बायोमेट्रिक दें। अपडेट 90 दिनों में हो जाएगा।", pronunciation: "Pleez pruh-VIDE yor by-oh-MET-riks. Thuh up-DAYT wil bee dun in NY-nee-tee dayz." }
    ]
  },
  {
    id: 58,
    title: "Post Office",
    titleHindi: "डाकघर",
    scenario: "Sending a parcel",
    scenarioHindi: "पार्सल भेजना",
    difficulty: "beginner",
    category: "Government",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to send this parcel to Mumbai.", hindi: "मैं यह पार्सल मुंबई भेजना चाहता हूँ।", pronunciation: "I wont too send this PAR-sul too Mum-BY." },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "Let me weigh it. It's 2 kilograms. That will be 150 rupees.", hindi: "मुझे इसे तौलने दीजिए। यह 2 किलोग्राम है। इसकी कीमत 150 रुपये होगी।", pronunciation: "Let mee way it. Its too KIL-oh-gramz. That wil bee wun-FIF-tee roo-PEEZ." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How many days will it take to reach?", hindi: "पहुंचने में कितने दिन लगेंगे?", pronunciation: "How MEN-ee dayz wil it tayk too reech?" },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "Regular post takes 5-7 days. Speed post takes 2-3 days.", hindi: "साधारण डाक में 5-7 दिन लगते हैं। स्पीड पोस्ट में 2-3 दिन।", pronunciation: "REG-yoo-lar pohst tayks five-too-SEV-en dayz. Speed pohst tayks too-too-three dayz." }
    ]
  },
  {
    id: 59,
    title: "Electricity Office",
    titleHindi: "बिजली कार्यालय",
    scenario: "Paying electricity bill",
    scenarioHindi: "बिजली का बिल भरना",
    difficulty: "beginner",
    category: "Government",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to pay my electricity bill.", hindi: "मैं अपना बिजली का बिल भरना चाहता हूँ।", pronunciation: "I wont too pay my ee-lek-TRIS-i-tee bil." },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "Please give me your consumer number.", hindi: "कृपया अपना उपभोक्ता नंबर दीजिए।", pronunciation: "Pleez giv mee yor kun-SOO-mer NUM-ber." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Here it is. What is the total amount due?", hindi: "यह रहा। कुल कितनी राशि बकाया है?", pronunciation: "Heer it iz. Wot iz thuh TOH-tul uh-MOWNT doo?" },
      { speaker: "Clerk", speakerHindi: "क्लर्क", english: "Your bill is 2,500 rupees. You can pay by cash or card.", hindi: "आपका बिल 2,500 रुपये है। आप नकद या कार्ड से भुगतान कर सकते हैं।", pronunciation: "Yor bil iz too-THOW-zund-five-HUN-dred roo-PEEZ. Yoo kan pay by kash or kard." }
    ]
  },
  {
    id: 60,
    title: "RTO Office",
    titleHindi: "RTO कार्यालय",
    scenario: "Applying for driving license",
    scenarioHindi: "ड्राइविंग लाइसेंस के लिए आवेदन",
    difficulty: "intermediate",
    category: "Government",
    lines: [
      { speaker: "Applicant", speakerHindi: "आवेदक", english: "I want to apply for a driving license.", hindi: "मैं ड्राइविंग लाइसेंस के लिए आवेदन करना चाहता हूँ।", pronunciation: "I wont too uh-PLY for uh DRY-ving LY-sens." },
      { speaker: "Officer", speakerHindi: "अधिकारी", english: "Do you have a learner's license?", hindi: "क्या आपके पास लर्नर लाइसेंस है?", pronunciation: "Doo yoo hav uh LER-nerz LY-sens?" },
      { speaker: "Applicant", speakerHindi: "आवेदक", english: "Yes, I got it 6 months ago. Here are my documents.", hindi: "हाँ, मुझे 6 महीने पहले मिला था। यह रहे मेरे दस्तावेज़।", pronunciation: "Yes, I got it siks munths uh-GOH. Heer ar my DOK-yoo-ments." },
      { speaker: "Officer", speakerHindi: "अधिकारी", english: "Good. You need to pass the driving test. It's scheduled for tomorrow.", hindi: "अच्छा। आपको ड्राइविंग टेस्ट पास करना होगा। यह कल के लिए निर्धारित है।", pronunciation: "Good. Yoo need too pas thuh DRY-ving test. Its SKED-yoold for too-MOR-oh." }
    ]
  },
  // ==================== TECHNOLOGY & SERVICES (61-80) ====================
  {
    id: 61,
    title: "Mobile Recharge",
    titleHindi: "मोबाइल रिचार्ज",
    scenario: "Recharging mobile phone",
    scenarioHindi: "मोबाइल फोन रिचार्ज करना",
    difficulty: "beginner",
    category: "Technology",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to recharge my mobile. 299 rupees plan.", hindi: "मैं अपना मोबाइल रिचार्ज करना चाहता हूँ। 299 रुपये का प्लान।", pronunciation: "I wont too ree-CHARJ my MOH-bile. Too-NY-nee-nine roo-PEEZ plan." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Which network? Jio, Airtel, or Vi?", hindi: "कौन सा नेटवर्क? जियो, एयरटेल, या Vi?", pronunciation: "Wich NET-werk? JEE-oh, AIR-tel, or VEE?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Airtel. Here's my number.", hindi: "एयरटेल। यह रहा मेरा नंबर।", pronunciation: "AIR-tel. Heerz my NUM-ber." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Done! You'll get a confirmation message shortly.", hindi: "हो गया! आपको जल्द ही कन्फर्मेशन मैसेज मिलेगा।", pronunciation: "Dun! Yool get uh kon-fer-MAY-shun MES-ij SHORT-lee." }
    ]
  },
  {
    id: 62,
    title: "Internet Problem",
    titleHindi: "इंटरनेट समस्या",
    scenario: "Complaining about internet service",
    scenarioHindi: "इंटरनेट सेवा के बारे में शिकायत",
    difficulty: "intermediate",
    category: "Technology",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "My internet has not been working for two days.", hindi: "मेरा इंटरनेट दो दिनों से काम नहीं कर रहा है।", pronunciation: "My IN-ter-net haz not been WER-king for too dayz." },
      { speaker: "Support", speakerHindi: "सपोर्ट", english: "I'm sorry to hear that. Let me check your connection status.", hindi: "यह सुनकर दुख हुआ। मुझे आपकी कनेक्शन स्थिति जांचने दीजिए।", pronunciation: "Im SOR-ee too heer that. Let mee chek yor kuh-NEK-shun STAY-tus." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I've already restarted the router multiple times.", hindi: "मैंने पहले ही राउटर को कई बार रीस्टार्ट किया है।", pronunciation: "Iv ol-RED-ee ree-STAR-ted thuh ROW-ter MUL-ti-pul times." },
      { speaker: "Support", speakerHindi: "सपोर्ट", english: "I'll send a technician tomorrow between 10 AM and 12 PM.", hindi: "मैं कल सुबह 10 से 12 बजे के बीच एक तकनीशियन भेजूंगा।", pronunciation: "Il send uh tek-NISH-un too-MOR-oh bee-TWEEN ten AY-EM and twelv PEE-EM." }
    ]
  },
  {
    id: 63,
    title: "Computer Repair",
    titleHindi: "कंप्यूटर मरम्मत",
    scenario: "Getting computer repaired",
    scenarioHindi: "कंप्यूटर की मरम्मत कराना",
    difficulty: "intermediate",
    category: "Technology",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "My laptop is running very slow. Can you check it?", hindi: "मेरा लैपटॉप बहुत धीमा चल रहा है। क्या आप इसे देख सकते हैं?", pronunciation: "My LAP-top iz RUN-ing VER-ee sloh. Kan yoo chek it?" },
      { speaker: "Technician", speakerHindi: "तकनीशियन", english: "Let me run a diagnostic. It might be a virus or low memory.", hindi: "मुझे डायग्नोस्टिक चलाने दीजिए। यह वायरस या कम मेमोरी हो सकती है।", pronunciation: "Let mee run uh dy-ag-NOS-tik. It mite bee uh VY-rus or loh MEM-uh-ree." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How much will the repair cost?", hindi: "मरम्मत में कितना खर्च आएगा?", pronunciation: "How much wil thuh ree-PAIR kost?" },
      { speaker: "Technician", speakerHindi: "तकनीशियन", english: "Diagnosis is free. Repair will cost between 500 to 1500 rupees.", hindi: "डायग्नोसिस मुफ्त है। मरम्मत में 500 से 1500 रुपये लगेंगे।", pronunciation: "Dy-ag-NOH-sis iz free. Ree-PAIR wil kost bee-TWEEN five-HUN-dred too fif-TEEN-HUN-dred roo-PEEZ." }
    ]
  },
  {
    id: 64,
    title: "Online Shopping Help",
    titleHindi: "ऑनलाइन शॉपिंग मदद",
    scenario: "Asking for help with online shopping",
    scenarioHindi: "ऑनलाइन शॉपिंग में मदद मांगना",
    difficulty: "beginner",
    category: "Technology",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Can you help me order something online?", hindi: "क्या आप मुझे ऑनलाइन कुछ ऑर्डर करने में मदद कर सकते हैं?", pronunciation: "Kan yoo help mee OR-der SUM-thing ON-line?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Sure! What do you want to buy?", hindi: "ज़रूर! आप क्या खरीदना चाहते हैं?", pronunciation: "Shoor! Wot doo yoo wont too by?" },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "I want to buy a book. How do I search for it?", hindi: "मैं एक किताब खरीदना चाहता हूँ। मैं इसे कैसे खोजूं?", pronunciation: "I wont too by uh book. How doo I serch for it?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Type the book name in the search bar and click search.", hindi: "सर्च बार में किताब का नाम टाइप करें और सर्च पर क्लिक करें।", pronunciation: "Type thuh book naym in thuh serch bar and klik serch." }
    ]
  },
  {
    id: 65,
    title: "Cable TV Problem",
    titleHindi: "केबल टीवी समस्या",
    scenario: "Reporting cable TV issue",
    scenarioHindi: "केबल टीवी की समस्या बताना",
    difficulty: "beginner",
    category: "Technology",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "My cable TV is not working. The screen is blank.", hindi: "मेरा केबल टीवी काम नहीं कर रहा। स्क्रीन खाली है।", pronunciation: "My KAY-bul TEE-VEE iz not WER-king. Thuh skreen iz blank." },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "Have you checked if the set-top box is on?", hindi: "क्या आपने देखा कि सेट-टॉप बॉक्स चालू है?", pronunciation: "Hav yoo chekt if thuh set-top boks iz on?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Yes, the light is on but no channels are showing.", hindi: "हाँ, लाइट जल रही है लेकिन कोई चैनल नहीं दिख रहा।", pronunciation: "Yes, thuh lite iz on but noh CHAN-ulz ar SHOH-ing." },
      { speaker: "Operator", speakerHindi: "ऑपरेटर", english: "I'll refresh your connection. Please restart the box in 5 minutes.", hindi: "मैं आपका कनेक्शन रिफ्रेश करता हूँ। कृपया 5 मिनट में बॉक्स रीस्टार्ट करें।", pronunciation: "Il ree-FRESH yor kuh-NEK-shun. Pleez ree-START thuh boks in five MIN-its." }
    ]
  },
  // ==================== WEATHER & SEASONS (66-75) ====================
  {
    id: 66,
    title: "Discussing Weather",
    titleHindi: "मौसम पर चर्चा",
    scenario: "Talking about the weather",
    scenarioHindi: "मौसम के बारे में बात करना",
    difficulty: "beginner",
    category: "Weather",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "It's very hot today, isn't it?", hindi: "आज बहुत गर्मी है, है ना?", pronunciation: "Its VER-ee hot too-DAY, IZ-nt it?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Yes, the temperature is 42 degrees! I can't go outside.", hindi: "हाँ, तापमान 42 डिग्री है! मैं बाहर नहीं जा सकता।", pronunciation: "Yes, thuh TEM-pruh-chur iz FOR-tee-too dee-GREEZ! I kant goh owt-SIDE." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "The weather forecast says it might rain tomorrow.", hindi: "मौसम का पूर्वानुमान कहता है कि कल बारिश हो सकती है।", pronunciation: "Thuh WE-ther FOR-kast sez it mite rayn too-MOR-oh." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "That would be a relief! We really need some rain.", hindi: "यह राहत होगी! हमें वाकई कुछ बारिश की ज़रूरत है।", pronunciation: "That wood bee uh ree-LEEF! Wee REE-lee need sum rayn." }
    ]
  },
  {
    id: 67,
    title: "Rainy Day",
    titleHindi: "बारिश का दिन",
    scenario: "Conversation during rain",
    scenarioHindi: "बारिश के दौरान बातचीत",
    difficulty: "beginner",
    category: "Weather",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Oh no! It's raining heavily. I forgot my umbrella.", hindi: "अरे नहीं! बहुत तेज़ बारिश हो रही है। मैं अपना छाता भूल गया।", pronunciation: "Oh noh! Its RAY-ning HEV-i-lee. I for-GOT my um-BREL-uh." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Don't worry. You can share mine.", hindi: "चिंता मत करो। तुम मेरा साझा कर सकते हो।", pronunciation: "Dont WUR-ee. Yoo kan shair mine." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "Thank you so much! The roads will be flooded.", hindi: "बहुत-बहुत धन्यवाद! सड़कें जलमग्न हो जाएंगी।", pronunciation: "Thank yoo soh much! Thuh rohdz wil bee FLUD-ed." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Let's wait here until the rain stops.", hindi: "चलो यहाँ रुकते हैं जब तक बारिश बंद नहीं हो जाती।", pronunciation: "Lets wayt heer un-TIL thuh rayn stops." }
    ]
  },
  {
    id: 68,
    title: "Winter Morning",
    titleHindi: "सर्दी की सुबह",
    scenario: "Talking about cold weather",
    scenarioHindi: "ठंडे मौसम के बारे में बात करना",
    difficulty: "beginner",
    category: "Weather",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "It's freezing cold today! I can see my breath.", hindi: "आज बहुत ठंड है! मैं अपनी सांस देख सकता हूँ।", pronunciation: "Its FREE-zing kohld too-DAY! I kan see my breth." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Yes, the temperature dropped to 5 degrees last night.", hindi: "हाँ, कल रात तापमान 5 डिग्री तक गिर गया।", pronunciation: "Yes, thuh TEM-pruh-chur dropt too five dee-GREEZ last nite." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "I should have worn a warmer jacket.", hindi: "मुझे गर्म जैकेट पहननी चाहिए थी।", pronunciation: "I shood hav worn uh WOR-mer JAK-et." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "Let's go inside and have some hot tea.", hindi: "चलो अंदर चलते हैं और गर्म चाय पीते हैं।", pronunciation: "Lets goh in-SIDE and hav sum hot tee." }
    ]
  },
  // ==================== HOBBIES & INTERESTS (69-85) ====================
  {
    id: 69,
    title: "Discussing Hobbies",
    titleHindi: "शौक पर चर्चा",
    scenario: "Talking about hobbies",
    scenarioHindi: "शौक के बारे में बात करना",
    difficulty: "beginner",
    category: "Hobbies",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "What do you like to do in your free time?", hindi: "आप अपने खाली समय में क्या करना पसंद करते हैं?", pronunciation: "Wot doo yoo like too doo in yor free time?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "I love reading books and playing cricket.", hindi: "मुझे किताबें पढ़ना और क्रिकेट खेलना पसंद है।", pronunciation: "I luv REE-ding books and PLAY-ing KRIK-et." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "That's nice! I enjoy painting and listening to music.", hindi: "यह अच्छा है! मुझे पेंटिंग करना और संगीत सुनना पसंद है।", pronunciation: "Thats nice! I en-JOY PAYN-ting and LIS-ning too MYOO-zik." },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "We should do something together sometime.", hindi: "हमें कभी साथ में कुछ करना चाहिए।", pronunciation: "Wee shood doo SUM-thing too-GE-ther sum-time." }
    ]
  },
  {
    id: 70,
    title: "At the Gym",
    titleHindi: "जिम में",
    scenario: "Conversation at the gym",
    scenarioHindi: "जिम में बातचीत",
    difficulty: "intermediate",
    category: "Hobbies",
    lines: [
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "How long have you been working out here?", hindi: "आप यहाँ कितने समय से व्यायाम कर रहे हैं?", pronunciation: "How long hav yoo been WER-king owt heer?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "About 6 months. I've lost 10 kilograms.", hindi: "लगभग 6 महीने। मैंने 10 किलो वज़न कम किया है।", pronunciation: "Uh-BOWT siks munths. Iv lost ten KIL-oh-gramz." },
      { speaker: "Person A", speakerHindi: "व्यक्ति A", english: "That's impressive! What's your workout routine?", hindi: "यह प्रभावशाली है! आपकी व्यायाम दिनचर्या क्या है?", pronunciation: "Thats im-PRES-iv! Wots yor WERK-owt roo-TEEN?" },
      { speaker: "Person B", speakerHindi: "व्यक्ति B", english: "I do cardio in the morning and weights in the evening.", hindi: "मैं सुबह कार्डियो करता हूँ और शाम को वेट्स।", pronunciation: "I doo KAR-dee-oh in thuh MOR-ning and wayts in thuh EE-vning." }
    ]
  },
  
// ==================== MORE DAILY SITUATIONS (71-100) ====================
  {
    id: 71,
    title: "At the Salon",
    titleHindi: "सैलून में",
    scenario: "Getting a haircut",
    scenarioHindi: "बाल कटवाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want a haircut, please.", hindi: "मुझे बाल कटवाने हैं, कृपया।", pronunciation: "I wont uh HAIR-kut, pleez." },
      { speaker: "Barber", speakerHindi: "नाई", english: "How would you like it? Short or medium?", hindi: "आप कैसे चाहेंगे? छोटे या मध्यम?", pronunciation: "How wood yoo like it? Short or MEE-dee-um?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Medium length. Just trim the sides.", hindi: "मध्यम लंबाई। बस साइड से थोड़ा काट दीजिए।", pronunciation: "MEE-dee-um length. Just trim thuh sides." },
      { speaker: "Barber", speakerHindi: "नाई", english: "Would you like a shampoo as well?", hindi: "क्या आप शैम्पू भी करवाना चाहेंगे?", pronunciation: "Wood yoo like uh sham-POO az wel?" }
    ]
  },
  {
    id: 72,
    title: "Booking Movie Tickets",
    titleHindi: "मूवी टिकट बुक करना",
    scenario: "Booking tickets at cinema",
    scenarioHindi: "सिनेमा में टिकट बुक करना",
    difficulty: "beginner",
    category: "Entertainment",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Two tickets for the 7 PM show, please.", hindi: "शाम 7 बजे के शो के लिए दो टिकट, कृपया।", pronunciation: "Too TIK-ets for thuh SEV-en PEE-EM shoh, pleez." },
      { speaker: "Cashier", speakerHindi: "कैशियर", english: "Which seats would you prefer? Front, middle, or back?", hindi: "आप कौन सी सीटें पसंद करेंगे? आगे, बीच में, या पीछे?", pronunciation: "Wich seets wood yoo pree-FER? Frunt, MID-ul, or bak?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Middle row, please. How much is the total?", hindi: "बीच की पंक्ति, कृपया। कुल कितना हुआ?", pronunciation: "MID-ul roh, pleez. How much iz thuh TOH-tul?" },
      { speaker: "Cashier", speakerHindi: "कैशियर", english: "That will be 500 rupees. Enjoy the movie!", hindi: "यह 500 रुपये होगा। फिल्म का आनंद लीजिए!", pronunciation: "That wil bee five-HUN-dred roo-PEEZ. En-JOY thuh MOO-vee!" }
    ]
  },
  {
    id: 73,
    title: "At the Petrol Pump",
    titleHindi: "पेट्रोल पंप पर",
    scenario: "Getting fuel for vehicle",
    scenarioHindi: "वाहन के लिए ईंधन लेना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Please fill petrol worth 1000 rupees.", hindi: "कृपया 1000 रुपये का पेट्रोल भरवाइए।", pronunciation: "Pleez fil PET-rol werth wun-THOW-zund roo-PEEZ." },
      { speaker: "Attendant", speakerHindi: "अटेंडेंट", english: "Sure. Should I check the air pressure in your tires?", hindi: "ज़रूर। क्या मैं आपके टायरों में हवा का दबाव जांचूं?", pronunciation: "Shoor. Shood I chek thuh air PRESH-er in yor TIRE-z?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Yes, please. And clean the windshield too.", hindi: "हाँ, कृपया। और विंडशील्ड भी साफ कर दीजिए।", pronunciation: "Yes, pleez. And kleen thuh WIND-sheeld too." },
      { speaker: "Attendant", speakerHindi: "अटेंडेंट", english: "Done! Your total is 1000 rupees.", hindi: "हो गया! आपका कुल 1000 रुपये है।", pronunciation: "Dun! Yor TOH-tul iz wun-THOW-zund roo-PEEZ." }
    ]
  },
  {
    id: 74,
    title: "Laundry Service",
    titleHindi: "लॉन्ड्री सेवा",
    scenario: "Giving clothes for laundry",
    scenarioHindi: "कपड़े धुलाई के लिए देना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I have some clothes for dry cleaning.", hindi: "मेरे पास ड्राई क्लीनिंग के लिए कुछ कपड़े हैं।", pronunciation: "I hav sum klohthz for dry KLEE-ning." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Let me count them. That's 5 shirts and 2 pants.", hindi: "मुझे गिनने दीजिए। यह 5 शर्ट और 2 पैंट हैं।", pronunciation: "Let mee kownt them. Thats five sherts and too pants." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "When will they be ready?", hindi: "ये कब तैयार होंगे?", pronunciation: "Wen wil they bee RED-ee?" },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "You can collect them day after tomorrow.", hindi: "आप इन्हें परसों ले सकते हैं।", pronunciation: "Yoo kan kuh-LEKT them day AF-ter too-MOR-oh." }
    ]
  },
  {
    id: 75,
    title: "Ordering Food Delivery",
    titleHindi: "फूड डिलीवरी ऑर्डर करना",
    scenario: "Ordering food over phone",
    scenarioHindi: "फोन पर खाना ऑर्डर करना",
    difficulty: "beginner",
    category: "Food",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Hello, I want to place an order for delivery.", hindi: "नमस्ते, मैं डिलीवरी के लिए ऑर्डर देना चाहता हूँ।", pronunciation: "Heh-LOH, I wont too plays an OR-der for dee-LIV-uh-ree." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Sure! What would you like to order?", hindi: "ज़रूर! आप क्या ऑर्डर करना चाहेंगे?", pronunciation: "Shoor! Wot wood yoo like too OR-der?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "One butter chicken and two naan, please.", hindi: "एक बटर चिकन और दो नान, कृपया।", pronunciation: "Wun BU-ter CHIK-en and too naan, pleez." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Your order will be delivered in 45 minutes.", hindi: "आपका ऑर्डर 45 मिनट में डिलीवर हो जाएगा।", pronunciation: "Yor OR-der wil bee dee-LIV-erd in FOR-tee-five MIN-its." }
    ]
  },
  {
    id: 76,
    title: "At the Temple",
    titleHindi: "मंदिर में",
    scenario: "Visiting a temple",
    scenarioHindi: "मंदिर जाना",
    difficulty: "beginner",
    category: "Religion",
    lines: [
      { speaker: "Visitor", speakerHindi: "दर्शनार्थी", english: "What time does the temple open?", hindi: "मंदिर किस समय खुलता है?", pronunciation: "Wot time duz thuh TEM-pul OH-pen?" },
      { speaker: "Priest", speakerHindi: "पुजारी", english: "The temple opens at 6 AM and closes at 9 PM.", hindi: "मंदिर सुबह 6 बजे खुलता है और रात 9 बजे बंद होता है।", pronunciation: "Thuh TEM-pul OH-penz at siks AY-EM and KLOH-zez at nine PEE-EM." },
      { speaker: "Visitor", speakerHindi: "दर्शनार्थी", english: "Where can I buy flowers for offering?", hindi: "मैं चढ़ावे के लिए फूल कहाँ से खरीद सकता हूँ?", pronunciation: "Wair kan I by FLOW-erz for OF-er-ing?" },
      { speaker: "Priest", speakerHindi: "पुजारी", english: "There are shops outside the main gate.", hindi: "मुख्य द्वार के बाहर दुकानें हैं।", pronunciation: "Thair ar shops owt-SIDE thuh mayn gayt." }
    ]
  },
  {
    id: 77,
    title: "Renting a House",
    titleHindi: "घर किराए पर लेना",
    scenario: "Inquiring about rental property",
    scenarioHindi: "किराए की संपत्ति के बारे में पूछताछ",
    difficulty: "intermediate",
    category: "Housing",
    lines: [
      { speaker: "Tenant", speakerHindi: "किरायेदार", english: "I'm looking for a 2BHK flat for rent.", hindi: "मैं किराए के लिए 2BHK फ्लैट ढूंढ रहा हूँ।", pronunciation: "Im LOOK-ing for uh too-BEE-AYCH-KAY flat for rent." },
      { speaker: "Landlord", speakerHindi: "मकान मालिक", english: "I have one available. The rent is 15,000 per month.", hindi: "मेरे पास एक उपलब्ध है। किराया 15,000 प्रति माह है।", pronunciation: "I hav wun uh-VAY-luh-bul. Thuh rent iz fif-TEEN-THOW-zund per munth." },
      { speaker: "Tenant", speakerHindi: "किरायेदार", english: "Does it include maintenance charges?", hindi: "क्या इसमें मेंटेनेंस चार्ज शामिल है?", pronunciation: "Duz it in-KLOOD MAYN-tuh-nuns CHAR-jez?" },
      { speaker: "Landlord", speakerHindi: "मकान मालिक", english: "No, maintenance is 2,000 extra. Would you like to see the flat?", hindi: "नहीं, मेंटेनेंस 2,000 अलग है। क्या आप फ्लैट देखना चाहेंगे?", pronunciation: "Noh, MAYN-tuh-nuns iz too-THOW-zund EKS-truh. Wood yoo like too see thuh flat?" }
    ]
  },
  {
    id: 78,
    title: "Plumber Visit",
    titleHindi: "प्लंबर की विज़िट",
    scenario: "Calling a plumber for repairs",
    scenarioHindi: "मरम्मत के लिए प्लंबर को बुलाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Homeowner", speakerHindi: "घर मालिक", english: "There's a leak in my bathroom pipe.", hindi: "मेरे बाथरूम के पाइप में रिसाव है।", pronunciation: "Thairz uh leek in my BATH-room pipe." },
      { speaker: "Plumber", speakerHindi: "प्लंबर", english: "Let me check. Yes, the pipe is damaged.", hindi: "मुझे देखने दीजिए। हाँ, पाइप खराब है।", pronunciation: "Let mee chek. Yes, thuh pipe iz DAM-ijd." },
      { speaker: "Homeowner", speakerHindi: "घर मालिक", english: "Can you fix it today? How much will it cost?", hindi: "क्या आप इसे आज ठीक कर सकते हैं? कितना खर्च आएगा?", pronunciation: "Kan yoo fiks it too-DAY? How much wil it kost?" },
      { speaker: "Plumber", speakerHindi: "प्लंबर", english: "Yes, I can fix it. It will cost around 500 rupees.", hindi: "हाँ, मैं इसे ठीक कर सकता हूँ। इसमें लगभग 500 रुपये लगेंगे।", pronunciation: "Yes, I kan fiks it. It wil kost uh-ROWND five-HUN-dred roo-PEEZ." }
    ]
  },
  {
    id: 79,
    title: "Electrician Visit",
    titleHindi: "इलेक्ट्रीशियन की विज़िट",
    scenario: "Calling an electrician",
    scenarioHindi: "इलेक्ट्रीशियन को बुलाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Homeowner", speakerHindi: "घर मालिक", english: "The fan in my bedroom is not working.", hindi: "मेरे बेडरूम का पंखा काम नहीं कर रहा।", pronunciation: "Thuh fan in my BED-room iz not WER-king." },
      { speaker: "Electrician", speakerHindi: "इलेक्ट्रीशियन", english: "Let me check the wiring. The capacitor might be faulty.", hindi: "मुझे वायरिंग देखने दीजिए। कैपेसिटर खराब हो सकता है।", pronunciation: "Let mee chek thuh WY-ring. Thuh kuh-PAS-i-ter mite bee FOL-tee." },
      { speaker: "Homeowner", speakerHindi: "घर मालिक", english: "Do you have a spare capacitor?", hindi: "क्या आपके पास अतिरिक्त कैपेसिटर है?", pronunciation: "Doo yoo hav uh spair kuh-PAS-i-ter?" },
      { speaker: "Electrician", speakerHindi: "इलेक्ट्रीशियन", english: "Yes, I have one. I'll replace it right away.", hindi: "हाँ, मेरे पास है। मैं इसे अभी बदल देता हूँ।", pronunciation: "Yes, I hav wun. Il ree-PLAYS it rite uh-WAY." }
    ]
  },
  {
    id: 80,
    title: "Vegetable Market",
    titleHindi: "सब्ज़ी मंडी",
    scenario: "Buying vegetables at market",
    scenarioHindi: "मंडी में सब्ज़ियाँ खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How much are the tomatoes?", hindi: "टमाटर कितने के हैं?", pronunciation: "How much ar thuh tuh-MAY-tohz?" },
      { speaker: "Vendor", speakerHindi: "विक्रेता", english: "40 rupees per kilogram. Very fresh today.", hindi: "40 रुपये प्रति किलो। आज बहुत ताज़े हैं।", pronunciation: "FOR-tee roo-PEEZ per KIL-oh-gram. VER-ee fresh too-DAY." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Give me half kilogram. And one kilogram of onions.", hindi: "आधा किलो दे दीजिए। और एक किलो प्याज़।", pronunciation: "Giv mee haf KIL-oh-gram. And wun KIL-oh-gram ov UN-yunz." },
      { speaker: "Vendor", speakerHindi: "विक्रेता", english: "That will be 50 rupees total.", hindi: "कुल 50 रुपये होंगे।", pronunciation: "That wil bee FIF-tee roo-PEEZ TOH-tul." }
    ]
  },
  // ==================== MORE PROFESSIONAL (81-100) ====================
  {
    id: 81,
    title: "Presentation at Work",
    titleHindi: "काम पर प्रेजेंटेशन",
    scenario: "Giving a presentation",
    scenarioHindi: "प्रेजेंटेशन देना",
    difficulty: "advanced",
    category: "Professional",
    lines: [
      { speaker: "Presenter", speakerHindi: "प्रस्तुतकर्ता", english: "Good morning everyone. Today I'll present our quarterly results.", hindi: "सभी को सुप्रभात। आज मैं हमारे तिमाही परिणाम प्रस्तुत करूंगा।", pronunciation: "Good MOR-ning EV-ree-wun. Too-DAY il pree-ZENT our KWOR-ter-lee ree-ZULTS." },
      { speaker: "Audience", speakerHindi: "दर्शक", english: "Could you explain the sales figures in more detail?", hindi: "क्या आप बिक्री के आंकड़ों को और विस्तार से समझा सकते हैं?", pronunciation: "Kood yoo eks-PLAYN thuh saylz FIG-yerz in mor dee-TAYL?" },
      { speaker: "Presenter", speakerHindi: "प्रस्तुतकर्ता", english: "Of course. As you can see on this slide, sales increased by 15%.", hindi: "बिल्कुल। जैसा कि आप इस स्लाइड पर देख सकते हैं, बिक्री में 15% की वृद्धि हुई।", pronunciation: "Ov kors. Az yoo kan see on this slide, saylz in-KREEST by fif-TEEN per-SENT." },
      { speaker: "Audience", speakerHindi: "दर्शक", english: "That's impressive. What's the target for next quarter?", hindi: "यह प्रभावशाली है। अगली तिमाही का लक्ष्य क्या है?", pronunciation: "Thats im-PRES-iv. Wots thuh TAR-get for nekst KWOR-ter?" }
    ]
  },
  {
    id: 82,
    title: "Team Discussion",
    titleHindi: "टीम चर्चा",
    scenario: "Discussing project with team",
    scenarioHindi: "टीम के साथ प्रोजेक्ट पर चर्चा",
    difficulty: "intermediate",
    category: "Professional",
    lines: [
      { speaker: "Team Lead", speakerHindi: "टीम लीड", english: "Let's discuss the project timeline. Are we on track?", hindi: "चलिए प्रोजेक्ट टाइमलाइन पर चर्चा करते हैं। क्या हम सही रास्ते पर हैं?", pronunciation: "Lets dis-KUS thuh PROJ-ekt TIME-line. Ar wee on trak?" },
      { speaker: "Team Member", speakerHindi: "टीम सदस्य", english: "We're slightly behind schedule due to some technical issues.", hindi: "कुछ तकनीकी समस्याओं के कारण हम थोड़ा पीछे हैं।", pronunciation: "Weer SLITE-lee bee-HIND SKED-yool doo too sum TEK-ni-kul ISH-ooz." },
      { speaker: "Team Lead", speakerHindi: "टीम लीड", english: "What do we need to get back on track?", hindi: "वापस सही रास्ते पर आने के लिए हमें क्या चाहिए?", pronunciation: "Wot doo wee need too get bak on trak?" },
      { speaker: "Team Member", speakerHindi: "टीम सदस्य", english: "We need two more developers for the next two weeks.", hindi: "हमें अगले दो हफ्तों के लिए दो और डेवलपर्स चाहिए।", pronunciation: "Wee need too mor dee-VEL-uh-perz for thuh nekst too weeks." }
    ]
  },
  {
    id: 83,
    title: "Phone Conference",
    titleHindi: "फोन कॉन्फ्रेंस",
    scenario: "Participating in conference call",
    scenarioHindi: "कॉन्फ्रेंस कॉल में भाग लेना",
    difficulty: "intermediate",
    category: "Professional",
    lines: [
      { speaker: "Host", speakerHindi: "होस्ट", english: "Can everyone hear me clearly?", hindi: "क्या सभी मुझे स्पष्ट सुन पा रहे हैं?", pronunciation: "Kan EV-ree-wun heer mee KLEER-lee?" },
      { speaker: "Participant", speakerHindi: "प्रतिभागी", english: "Yes, we can hear you. Please go ahead.", hindi: "हाँ, हम आपको सुन सकते हैं। कृपया आगे बढ़ें।", pronunciation: "Yes, wee kan heer yoo. Pleez goh uh-HED." },
      { speaker: "Host", speakerHindi: "होस्ट", english: "Let me share my screen. Can you see the presentation?", hindi: "मुझे अपनी स्क्रीन शेयर करने दीजिए। क्या आप प्रेजेंटेशन देख सकते हैं?", pronunciation: "Let mee shair my skreen. Kan yoo see thuh prez-en-TAY-shun?" },
      { speaker: "Participant", speakerHindi: "प्रतिभागी", english: "Yes, we can see it now. The slides look good.", hindi: "हाँ, अब हम देख सकते हैं। स्लाइड्स अच्छी लग रही हैं।", pronunciation: "Yes, wee kan see it now. Thuh slides look good." }
    ]
  },
  {
    id: 84,
    title: "Email Discussion",
    titleHindi: "ईमेल चर्चा",
    scenario: "Discussing email communication",
    scenarioHindi: "ईमेल संचार पर चर्चा",
    difficulty: "intermediate",
    category: "Professional",
    lines: [
      { speaker: "Colleague A", speakerHindi: "सहकर्मी A", english: "Did you receive my email about the meeting?", hindi: "क्या आपको मीटिंग के बारे में मेरा ईमेल मिला?", pronunciation: "Did yoo ree-SEEV my EE-mayl uh-BOWT thuh MEE-ting?" },
      { speaker: "Colleague B", speakerHindi: "सहकर्मी B", english: "Yes, I did. I'll reply by end of day.", hindi: "हाँ, मिला। मैं दिन के अंत तक जवाब दूंगा।", pronunciation: "Yes, I did. Il ree-PLY by end ov day." },
      { speaker: "Colleague A", speakerHindi: "सहकर्मी A", english: "Please also CC the manager in your reply.", hindi: "कृपया अपने जवाब में मैनेजर को भी CC करें।", pronunciation: "Pleez OL-soh SEE-SEE thuh MAN-ij-er in yor ree-PLY." },
      { speaker: "Colleague B", speakerHindi: "सहकर्मी B", english: "Sure, I'll include everyone in the thread.", hindi: "ज़रूर, मैं थ्रेड में सभी को शामिल करूंगा।", pronunciation: "Shoor, il in-KLOOD EV-ree-wun in thuh thred." }
    ]
  },
  {
    id: 85,
    title: "Resignation Discussion",
    titleHindi: "इस्तीफे की चर्चा",
    scenario: "Discussing resignation with manager",
    scenarioHindi: "मैनेजर के साथ इस्तीफे पर चर्चा",
    difficulty: "advanced",
    category: "Professional",
    lines: [
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "Sir, I need to discuss something important with you.", hindi: "सर, मुझे आपसे कुछ महत्वपूर्ण बात करनी है।", pronunciation: "Ser, I need too dis-KUS SUM-thing im-POR-tunt with yoo." },
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "Of course. What's on your mind?", hindi: "बिल्कुल। आपके मन में क्या है?", pronunciation: "Ov kors. Wots on yor mind?" },
      { speaker: "Employee", speakerHindi: "कर्मचारी", english: "I've decided to resign. I got a better opportunity.", hindi: "मैंने इस्तीफा देने का फैसला किया है। मुझे बेहतर अवसर मिला है।", pronunciation: "Iv dee-SY-ded too ree-ZINE. I got uh BET-er op-er-TOO-ni-tee." },
      { speaker: "Manager", speakerHindi: "मैनेजर", english: "I'm sorry to hear that. Please serve the notice period.", hindi: "यह सुनकर दुख हुआ। कृपया नोटिस पीरियड पूरा करें।", pronunciation: "Im SOR-ee too heer that. Pleez serv thuh NOH-tis PEER-ee-ud." }
    ]
  },
  // ==================== FAMILY & RELATIONSHIPS (86-110) ====================
  {
    id: 86,
    title: "Family Dinner",
    titleHindi: "पारिवारिक रात्रिभोज",
    scenario: "Family having dinner together",
    scenarioHindi: "परिवार एक साथ रात का खाना खा रहा है",
    difficulty: "beginner",
    category: "Family",
    lines: [
      { speaker: "Mother", speakerHindi: "माँ", english: "How was everyone's day today?", hindi: "आज सबका दिन कैसा रहा?", pronunciation: "How woz EV-ree-wunz day too-DAY?" },
      { speaker: "Father", speakerHindi: "पिता", english: "It was busy but productive. I finished a big project.", hindi: "व्यस्त था लेकिन उत्पादक। मैंने एक बड़ा प्रोजेक्ट पूरा किया।", pronunciation: "It woz BIZ-ee but pruh-DUK-tiv. I FIN-isht uh big PROJ-ekt." },
      { speaker: "Son", speakerHindi: "बेटा", english: "I got good marks in my math test!", hindi: "मुझे गणित की परीक्षा में अच्छे अंक मिले!", pronunciation: "I got good marks in my math test!" },
      { speaker: "Mother", speakerHindi: "माँ", english: "That's wonderful! I'm so proud of you.", hindi: "यह बहुत अच्छा है! मुझे तुम पर बहुत गर्व है।", pronunciation: "Thats WUN-der-ful! Im soh prowd ov yoo." }
    ]
  },
  {
    id: 87,
    title: "Visiting Grandparents",
    titleHindi: "दादा-दादी से मिलना",
    scenario: "Visiting grandparents' house",
    scenarioHindi: "दादा-दादी के घर जाना",
    difficulty: "beginner",
    category: "Family",
    lines: [
      { speaker: "Grandchild", speakerHindi: "पोता/पोती", english: "Grandma, I missed you so much!", hindi: "दादी, मैंने आपको बहुत याद किया!", pronunciation: "GRAND-mah, I mist yoo soh much!" },
      { speaker: "Grandmother", speakerHindi: "दादी", english: "I missed you too, my dear. Come, I made your favorite sweets.", hindi: "मैंने भी तुम्हें याद किया, मेरे प्यारे। आओ, मैंने तुम्हारी पसंदीदा मिठाई बनाई है।", pronunciation: "I mist yoo too, my deer. Kum, I mayd yor FAY-vrit sweets." },
      { speaker: "Grandchild", speakerHindi: "पोता/पोती", english: "Thank you, Grandma! Where is Grandpa?", hindi: "धन्यवाद, दादी! दादाजी कहाँ हैं?", pronunciation: "Thank yoo, GRAND-mah! Wair iz GRAND-pah?" },
      { speaker: "Grandmother", speakerHindi: "दादी", english: "He's in the garden. Go and surprise him!", hindi: "वे बगीचे में हैं। जाओ और उन्हें सरप्राइज़ करो!", pronunciation: "Heez in thuh GAR-den. Goh and ser-PRIZE him!" }
    ]
  },
  {
    id: 88,
    title: "Sibling Conversation",
    titleHindi: "भाई-बहन की बातचीत",
    scenario: "Siblings talking to each other",
    scenarioHindi: "भाई-बहन एक दूसरे से बात कर रहे हैं",
    difficulty: "beginner",
    category: "Family",
    lines: [
      { speaker: "Brother", speakerHindi: "भाई", english: "Can I borrow your laptop for an hour?", hindi: "क्या मैं एक घंटे के लिए तुम्हारा लैपटॉप ले सकता हूँ?", pronunciation: "Kan I BOR-oh yor LAP-top for an owr?" },
      { speaker: "Sister", speakerHindi: "बहन", english: "Why? What happened to yours?", hindi: "क्यों? तुम्हारे को क्या हुआ?", pronunciation: "Why? Wot HAP-end too yorz?" },
      { speaker: "Brother", speakerHindi: "भाई", english: "It's being repaired. I need to submit my assignment.", hindi: "वह मरम्मत में है। मुझे अपना असाइनमेंट जमा करना है।", pronunciation: "Its BEE-ing ree-PAIRD. I need too sub-MIT my uh-SINE-ment." },
      { speaker: "Sister", speakerHindi: "बहन", english: "Okay, but return it by 8 PM. I have work too.", hindi: "ठीक है, लेकिन 8 बजे तक लौटा देना। मेरा भी काम है।", pronunciation: "Oh-KAY, but ree-TERN it by ayt PEE-EM. I hav werk too." }
    ]
  },
  {
    id: 89,
    title: "Planning Family Trip",
    titleHindi: "पारिवारिक यात्रा की योजना",
    scenario: "Family planning a vacation",
    scenarioHindi: "परिवार छुट्टी की योजना बना रहा है",
    difficulty: "intermediate",
    category: "Family",
    lines: [
      { speaker: "Father", speakerHindi: "पिता", english: "Where should we go for our summer vacation?", hindi: "हमें गर्मी की छुट्टियों में कहाँ जाना चाहिए?", pronunciation: "Wair shood wee goh for our SUM-er vay-KAY-shun?" },
      { speaker: "Mother", speakerHindi: "माँ", english: "How about going to the mountains? It will be cool there.", hindi: "पहाड़ों पर जाने के बारे में क्या ख्याल है? वहाँ ठंडक होगी।", pronunciation: "How uh-BOWT GOH-ing too thuh MOWN-tunz? It wil bee kool thair." },
      { speaker: "Daughter", speakerHindi: "बेटी", english: "I want to go to the beach! I love swimming.", hindi: "मैं समुद्र तट पर जाना चाहती हूँ! मुझे तैरना पसंद है।", pronunciation: "I wont too goh too thuh beech! I luv SWIM-ing." },
      { speaker: "Father", speakerHindi: "पिता", english: "Let's vote on it. We'll go where majority wants.", hindi: "चलो वोट करते हैं। जहाँ बहुमत चाहेगा वहाँ जाएंगे।", pronunciation: "Lets voht on it. Weel goh wair muh-JOR-i-tee wonts." }
    ]
  },
  {
    id: 90,
    title: "Anniversary Celebration",
    titleHindi: "सालगिरह का जश्न",
    scenario: "Celebrating wedding anniversary",
    scenarioHindi: "शादी की सालगिरह मनाना",
    difficulty: "intermediate",
    category: "Family",
    lines: [
      { speaker: "Husband", speakerHindi: "पति", english: "Happy anniversary, dear! 20 years together.", hindi: "सालगिरह मुबारक, प्रिये! साथ में 20 साल।", pronunciation: "HAP-ee an-i-VER-suh-ree, deer! TWEN-tee yeers too-GE-ther." },
      { speaker: "Wife", speakerHindi: "पत्नी", english: "Thank you! These have been the best years of my life.", hindi: "धन्यवाद! ये मेरे जीवन के सबसे अच्छे साल रहे हैं।", pronunciation: "Thank yoo! Theez hav been thuh best yeers ov my life." },
      { speaker: "Husband", speakerHindi: "पति", english: "I've booked a table at your favorite restaurant.", hindi: "मैंने तुम्हारे पसंदीदा रेस्तरां में टेबल बुक की है।", pronunciation: "Iv bookt uh TAY-bul at yor FAY-vrit RES-tuh-rahnt." },
      { speaker: "Wife", speakerHindi: "पत्नी", english: "That's so thoughtful! I love you.", hindi: "यह बहुत विचारशील है! मैं तुमसे प्यार करती हूँ।", pronunciation: "Thats soh THOT-ful! I luv yoo." }
    ]
  },
  // ==================== MORE SCENARIOS (91-120) ====================
  {
    id: 91,
    title: "At the Tailor",
    titleHindi: "दर्जी के पास",
    scenario: "Getting clothes stitched",
    scenarioHindi: "कपड़े सिलवाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to get this fabric stitched into a shirt.", hindi: "मैं इस कपड़े से शर्ट सिलवाना चाहता हूँ।", pronunciation: "I wont too get this FAB-rik sticht IN-too uh shert." },
      { speaker: "Tailor", speakerHindi: "दर्जी", english: "Let me take your measurements. Please stand straight.", hindi: "मुझे आपका माप लेने दीजिए। कृपया सीधे खड़े हों।", pronunciation: "Let mee tayk yor MEZH-er-ments. Pleez stand strayt." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "When will it be ready?", hindi: "यह कब तैयार होगी?", pronunciation: "Wen wil it bee RED-ee?" },
      { speaker: "Tailor", speakerHindi: "दर्जी", english: "It will be ready in 5 days. The stitching charge is 400 rupees.", hindi: "यह 5 दिनों में तैयार हो जाएगी। सिलाई का चार्ज 400 रुपये है।", pronunciation: "It wil bee RED-ee in five dayz. Thuh STICH-ing charj iz for-HUN-dred roo-PEEZ." }
    ]
  },
  {
    id: 92,
    title: "Photography Studio",
    titleHindi: "फोटोग्राफी स्टूडियो",
    scenario: "Getting photos taken",
    scenarioHindi: "फोटो खिंचवाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need passport size photos for my visa application.", hindi: "मुझे वीज़ा आवेदन के लिए पासपोर्ट साइज़ फोटो चाहिए।", pronunciation: "I need PAS-port size FOH-tohz for my VEE-zuh ap-li-KAY-shun." },
      { speaker: "Photographer", speakerHindi: "फोटोग्राफर", english: "Sure. Please sit here. Look at the camera.", hindi: "ज़रूर। कृपया यहाँ बैठिए। कैमरे की ओर देखिए।", pronunciation: "Shoor. Pleez sit heer. Look at thuh KAM-ruh." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How many photos will I get?", hindi: "मुझे कितनी फोटो मिलेंगी?", pronunciation: "How MEN-ee FOH-tohz wil I get?" },
      { speaker: "Photographer", speakerHindi: "फोटोग्राफर", english: "You'll get 8 photos. They'll be ready in 30 minutes.", hindi: "आपको 8 फोटो मिलेंगी। ये 30 मिनट में तैयार हो जाएंगी।", pronunciation: "Yool get ayt FOH-tohz. Theyl bee RED-ee in THUR-tee MIN-its." }
    ]
  },
  {
    id: 93,
    title: "Courier Service",
    titleHindi: "कूरियर सेवा",
    scenario: "Sending a courier",
    scenarioHindi: "कूरियर भेजना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to send this package to Bangalore.", hindi: "मैं यह पैकेज बैंगलोर भेजना चाहता हूँ।", pronunciation: "I wont too send this PAK-ij too BANG-uh-lor." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Let me weigh it. It's 1.5 kg. That will be 200 rupees.", hindi: "मुझे इसे तौलने दीजिए। यह 1.5 किलो है। इसकी कीमत 200 रुपये होगी।", pronunciation: "Let mee way it. Its wun-point-five KG. That wil bee too-HUN-dred roo-PEEZ." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How many days will it take to reach?", hindi: "पहुंचने में कितने दिन लगेंगे?", pronunciation: "How MEN-ee dayz wil it tayk too reech?" },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Standard delivery takes 3-4 days. Express takes 1-2 days.", hindi: "स्टैंडर्ड डिलीवरी में 3-4 दिन लगते हैं। एक्सप्रेस में 1-2 दिन।", pronunciation: "STAN-derd dee-LIV-uh-ree tayks three-too-for dayz. Eks-PRES tayks wun-too-too dayz." }
    ]
  },
  {
    id: 94,
    title: "Eye Checkup",
    titleHindi: "आँखों की जांच",
    scenario: "Getting eyes tested",
    scenarioHindi: "आँखों की जांच कराना",
    difficulty: "intermediate",
    category: "Healthcare",
    lines: [
      { speaker: "Patient", speakerHindi: "मरीज़", english: "I'm having trouble reading small text.", hindi: "मुझे छोटे अक्षर पढ़ने में परेशानी हो रही है।", pronunciation: "Im HAV-ing TRUB-ul REE-ding smol tekst." },
      { speaker: "Doctor", speakerHindi: "डॉक्टर", english: "Let me check your vision. Please read the letters on the chart.", hindi: "मुझे आपकी दृष्टि जांचने दीजिए। कृपया चार्ट पर अक्षर पढ़िए।", pronunciation: "Let mee chek yor VIZH-un. Pleez reed thuh LET-erz on thuh chart." },
      { speaker: "Patient", speakerHindi: "मरीज़", english: "I can't see the last two lines clearly.", hindi: "मुझे आखिरी दो लाइनें स्पष्ट नहीं दिख रहीं।", pronunciation: "I kant see thuh last too lines KLEER-lee." },
      { speaker: "Doctor", speakerHindi: "डॉक्टर", english: "You need reading glasses. I'll write a prescription.", hindi: "आपको पढ़ने का चश्मा चाहिए। मैं प्रिस्क्रिप्शन लिख देता हूँ।", pronunciation: "Yoo need REE-ding GLAS-ez. Il rite uh pree-SKRIP-shun." }
    ]
  },
  {
    id: 95,
    title: "Insurance Claim",
    titleHindi: "बीमा दावा",
    scenario: "Filing an insurance claim",
    scenarioHindi: "बीमा दावा दायर करना",
    difficulty: "advanced",
    category: "Finance",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to file a claim for my car accident.", hindi: "मैं अपनी कार दुर्घटना के लिए दावा दायर करना चाहता हूँ।", pronunciation: "I wont too file uh klaym for my kar AK-si-dent." },
      { speaker: "Agent", speakerHindi: "एजेंट", english: "I'm sorry to hear that. Do you have the FIR copy?", hindi: "यह सुनकर दुख हुआ। क्या आपके पास FIR की कॉपी है?", pronunciation: "Im SOR-ee too heer that. Doo yoo hav thuh EF-I-AR KOP-ee?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Yes, I have all the documents. How long will the process take?", hindi: "हाँ, मेरे पास सभी दस्तावेज़ हैं। प्रक्रिया में कितना समय लगेगा?", pronunciation: "Yes, I hav ol thuh DOK-yoo-ments. How long wil thuh PROS-es tayk?" },
      { speaker: "Agent", speakerHindi: "एजेंट", english: "Usually 15-20 working days after document verification.", hindi: "आमतौर पर दस्तावेज़ सत्यापन के बाद 15-20 कार्य दिवस।", pronunciation: "YOO-zhoo-uh-lee fif-TEEN-too-TWEN-tee WER-king dayz AF-ter DOK-yoo-ment ver-i-fi-KAY-shun." }
    ]
  },
  {
    id: 96,
    title: "Gym Membership",
    titleHindi: "जिम सदस्यता",
    scenario: "Joining a gym",
    scenarioHindi: "जिम ज्वाइन करना",
    difficulty: "intermediate",
    category: "Health",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to join your gym. What are the membership plans?", hindi: "मैं आपके जिम में शामिल होना चाहता हूँ। सदस्यता योजनाएं क्या हैं?", pronunciation: "I wont too join yor jim. Wot ar thuh MEM-ber-ship planz?" },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "We have monthly, quarterly, and annual plans.", hindi: "हमारे पास मासिक, त्रैमासिक और वार्षिक योजनाएं हैं।", pronunciation: "Wee hav MUNTH-lee, KWOR-ter-lee, and AN-yoo-ul planz." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "What's included in the annual plan?", hindi: "वार्षिक योजना में क्या शामिल है?", pronunciation: "Wots in-KLOO-ded in thuh AN-yoo-ul plan?" },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Full gym access, personal trainer sessions, and diet consultation.", hindi: "पूर्ण जिम एक्सेस, पर्सनल ट्रेनर सेशन, और डाइट परामर्श।", pronunciation: "Fool jim AK-ses, PER-suh-nul TRAY-ner SESH-unz, and DY-et kon-sul-TAY-shun." }
    ]
  },
  // ==================== ADDITIONAL SCENARIOS (97-130) ====================
  {
    id: 97,
    title: "Booking a Cab",
    titleHindi: "कैब बुक करना",
    scenario: "Booking a cab through app",
    scenarioHindi: "ऐप के माध्यम से कैब बुक करना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Hello, I booked a cab. Are you my driver?", hindi: "नमस्ते, मैंने कैब बुक की थी। क्या आप मेरे ड्राइवर हैं?", pronunciation: "Heh-LOH, I bookt uh kab. Ar yoo my DRY-ver?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Yes, I am. Your destination is the airport, right?", hindi: "हाँ, मैं हूँ। आपकी मंज़िल एयरपोर्ट है, है ना?", pronunciation: "Yes, I am. Yor des-ti-NAY-shun iz thuh AIR-port, rite?" },
      { speaker: "Passenger", speakerHindi: "यात्री", english: "Yes. How long will it take to reach?", hindi: "हाँ। पहुंचने में कितना समय लगेगा?", pronunciation: "Yes. How long wil it tayk too reech?" },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "About 45 minutes if there's no traffic.", hindi: "अगर ट्रैफिक नहीं है तो लगभग 45 मिनट।", pronunciation: "Uh-BOWT FOR-tee-five MIN-its if thairz noh TRAF-ik." }
    ]
  },
  {
    id: 98,
    title: "Parking Lot",
    titleHindi: "पार्किंग लॉट",
    scenario: "Parking a vehicle",
    scenarioHindi: "वाहन पार्क करना",
    difficulty: "beginner",
    category: "Travel",
    lines: [
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "Is there parking space available?", hindi: "क्या पार्किंग की जगह उपलब्ध है?", pronunciation: "Iz thair PAR-king spays uh-VAY-luh-bul?" },
      { speaker: "Attendant", speakerHindi: "अटेंडेंट", english: "Yes, there's space on the second floor.", hindi: "हाँ, दूसरी मंज़िल पर जगह है।", pronunciation: "Yes, thairz spays on thuh SEK-und flor." },
      { speaker: "Driver", speakerHindi: "ड्राइवर", english: "What's the parking charge per hour?", hindi: "प्रति घंटे पार्किंग चार्ज क्या है?", pronunciation: "Wots thuh PAR-king charj per owr?" },
      { speaker: "Attendant", speakerHindi: "अटेंडेंट", english: "It's 30 rupees for the first hour, then 20 rupees per hour.", hindi: "पहले घंटे के लिए 30 रुपये, फिर 20 रुपये प्रति घंटा।", pronunciation: "Its THUR-tee roo-PEEZ for thuh ferst owr, then TWEN-tee roo-PEEZ per owr." }
    ]
  },
  {
    id: 99,
    title: "Newspaper Subscription",
    titleHindi: "अखबार सदस्यता",
    scenario: "Subscribing to newspaper",
    scenarioHindi: "अखबार की सदस्यता लेना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to subscribe to your newspaper.", hindi: "मैं आपके अखबार की सदस्यता लेना चाहता हूँ।", pronunciation: "I wont too sub-SKRIBE too yor NOOZ-pay-per." },
      { speaker: "Agent", speakerHindi: "एजेंट", english: "Which newspaper would you like? Hindi or English?", hindi: "आप कौन सा अखबार चाहेंगे? हिंदी या अंग्रेजी?", pronunciation: "Wich NOOZ-pay-per wood yoo like? HIN-dee or ING-lish?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Both, please. What's the monthly charge?", hindi: "दोनों, कृपया। मासिक शुल्क क्या है?", pronunciation: "Bohth, pleez. Wots thuh MUNTH-lee charj?" },
      { speaker: "Agent", speakerHindi: "एजेंट", english: "It's 350 rupees per month for both newspapers.", hindi: "दोनों अखबारों के लिए 350 रुपये प्रति माह।", pronunciation: "Its three-FIF-tee roo-PEEZ per munth for bohth NOOZ-pay-perz." }
    ]
  },
  {
    id: 100,
    title: "Water Delivery",
    titleHindi: "पानी की डिलीवरी",
    scenario: "Ordering water cans",
    scenarioHindi: "पानी के कैन ऑर्डर करना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need two water cans delivered today.", hindi: "मुझे आज दो पानी के कैन डिलीवर चाहिए।", pronunciation: "I need too WAW-ter kanz dee-LIV-erd too-DAY." },
      { speaker: "Delivery Person", speakerHindi: "डिलीवरी व्यक्ति", english: "Sure. What's your address?", hindi: "ज़रूर। आपका पता क्या है?", pronunciation: "Shoor. Wots yor AD-res?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Flat 302, Green Apartments, MG Road.", hindi: "फ्लैट 302, ग्रीन अपार्टमेंट्स, एमजी रोड।", pronunciation: "Flat three-oh-too, Green uh-PART-ments, EM-JEE rohd." },
      { speaker: "Delivery Person", speakerHindi: "डिलीवरी व्यक्ति", english: "I'll deliver within 2 hours. Total is 100 rupees.", hindi: "मैं 2 घंटे के अंदर डिलीवर कर दूंगा। कुल 100 रुपये।", pronunciation: "Il dee-LIV-er with-IN too owrz. TOH-tul iz wun-HUN-dred roo-PEEZ." }
    ]
  },
  {
    id: 101,
    title: "Milk Delivery",
    titleHindi: "दूध की डिलीवरी",
    scenario: "Ordering milk delivery",
    scenarioHindi: "दूध की डिलीवरी ऑर्डर करना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I want to start daily milk delivery.", hindi: "मैं रोज़ाना दूध की डिलीवरी शुरू करना चाहता हूँ।", pronunciation: "I wont too start DAY-lee milk dee-LIV-uh-ree." },
      { speaker: "Milkman", speakerHindi: "दूधवाला", english: "How many liters do you need daily?", hindi: "आपको रोज़ कितने लीटर चाहिए?", pronunciation: "How MEN-ee LEE-terz doo yoo need DAY-lee?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "One liter in the morning. What time do you deliver?", hindi: "सुबह एक लीटर। आप किस समय डिलीवर करते हैं?", pronunciation: "Wun LEE-ter in thuh MOR-ning. Wot time doo yoo dee-LIV-er?" },
      { speaker: "Milkman", speakerHindi: "दूधवाला", english: "I deliver between 6 and 7 AM every day.", hindi: "मैं हर दिन सुबह 6 से 7 बजे के बीच डिलीवर करता हूँ।", pronunciation: "I dee-LIV-er bee-TWEEN siks and SEV-en AY-EM EV-ree day." }
    ]
  },
  {
    id: 102,
    title: "Tuition Classes",
    titleHindi: "ट्यूशन क्लासेस",
    scenario: "Enrolling for tuition",
    scenarioHindi: "ट्यूशन के लिए नामांकन",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "I want to enroll my son for math tuition.", hindi: "मैं अपने बेटे का गणित ट्यूशन के लिए नामांकन कराना चाहता हूँ।", pronunciation: "I wont too en-ROHL my sun for math TOO-shun." },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "Which class is he in? What are his weak areas?", hindi: "वह किस कक्षा में है? उसके कमज़ोर क्षेत्र क्या हैं?", pronunciation: "Wich klas iz hee in? Wot ar hiz week AIR-ee-uz?" },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "He's in class 10. He struggles with algebra.", hindi: "वह कक्षा 10 में है। उसे बीजगणित में परेशानी होती है।", pronunciation: "Heez in klas ten. Hee STRUG-ulz with AL-juh-bruh." },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "I have a batch at 5 PM. The fee is 2000 per month.", hindi: "मेरे पास शाम 5 बजे का बैच है। फीस 2000 प्रति माह है।", pronunciation: "I hav uh bach at five PEE-EM. Thuh fee iz too-THOW-zund per munth." }
    ]
  },
  
// ==================== FINAL SCENARIOS (103-130) ====================
  {
    id: 103,
    title: "Music Class",
    titleHindi: "संगीत कक्षा",
    scenario: "Joining music lessons",
    scenarioHindi: "संगीत की कक्षाओं में शामिल होना",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "I want to learn to play the guitar.", hindi: "मैं गिटार बजाना सीखना चाहता हूँ।", pronunciation: "I wont too lern too play thuh gi-TAR." },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "Have you played any instrument before?", hindi: "क्या आपने पहले कोई वाद्य यंत्र बजाया है?", pronunciation: "Hav yoo playd EN-ee IN-stroo-ment bee-FOR?" },
      { speaker: "Student", speakerHindi: "छात्र", english: "No, I'm a complete beginner.", hindi: "नहीं, मैं बिल्कुल शुरुआती हूँ।", pronunciation: "Noh, Im uh kum-PLEET bee-GIN-er." },
      { speaker: "Teacher", speakerHindi: "शिक्षक", english: "No problem. We'll start with the basics. Classes are twice a week.", hindi: "कोई बात नहीं। हम बुनियादी बातों से शुरू करेंगे। कक्षाएं सप्ताह में दो बार हैं।", pronunciation: "Noh PROB-lem. Weel start with thuh BAY-siks. KLAS-ez ar twice uh week." }
    ]
  },
  {
    id: 104,
    title: "Dance Class",
    titleHindi: "डांस क्लास",
    scenario: "Joining dance lessons",
    scenarioHindi: "डांस की कक्षाओं में शामिल होना",
    difficulty: "intermediate",
    category: "Education",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "What types of dance do you teach here?", hindi: "आप यहाँ किस प्रकार के नृत्य सिखाते हैं?", pronunciation: "Wot types ov dans doo yoo teech heer?" },
      { speaker: "Instructor", speakerHindi: "प्रशिक्षक", english: "We teach classical, Bollywood, and hip-hop.", hindi: "हम शास्त्रीय, बॉलीवुड और हिप-हॉप सिखाते हैं।", pronunciation: "Wee teech KLAS-i-kul, BOL-ee-wood, and hip-hop." },
      { speaker: "Student", speakerHindi: "छात्र", english: "I'm interested in Bollywood dance. When are the classes?", hindi: "मुझे बॉलीवुड डांस में रुचि है। कक्षाएं कब होती हैं?", pronunciation: "Im IN-tres-ted in BOL-ee-wood dans. Wen ar thuh KLAS-ez?" },
      { speaker: "Instructor", speakerHindi: "प्रशिक्षक", english: "Bollywood classes are on Monday, Wednesday, and Friday evenings.", hindi: "बॉलीवुड कक्षाएं सोमवार, बुधवार और शुक्रवार शाम को होती हैं।", pronunciation: "BOL-ee-wood KLAS-ez ar on MUN-day, WENZ-day, and FRY-day EE-vningz." }
    ]
  },
  {
    id: 105,
    title: "Swimming Pool",
    titleHindi: "स्विमिंग पूल",
    scenario: "Joining swimming classes",
    scenarioHindi: "तैराकी कक्षाओं में शामिल होना",
    difficulty: "intermediate",
    category: "Sports",
    lines: [
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "I want to enroll my daughter for swimming lessons.", hindi: "मैं अपनी बेटी का तैराकी कक्षाओं में नामांकन कराना चाहता हूँ।", pronunciation: "I wont too en-ROHL my DOT-er for SWIM-ing LES-unz." },
      { speaker: "Coach", speakerHindi: "कोच", english: "How old is she? Does she know basic swimming?", hindi: "वह कितने साल की है? क्या उसे बुनियादी तैराकी आती है?", pronunciation: "How ohld iz shee? Duz shee noh BAY-sik SWIM-ing?" },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "She's 8 years old. She's afraid of water.", hindi: "वह 8 साल की है। उसे पानी से डर लगता है।", pronunciation: "Sheez ayt yeers ohld. Sheez uh-FRAYD ov WAW-ter." },
      { speaker: "Coach", speakerHindi: "कोच", english: "Don't worry. We have special classes for beginners.", hindi: "चिंता मत करो। हमारे पास शुरुआती लोगों के लिए विशेष कक्षाएं हैं।", pronunciation: "Dont WUR-ee. Wee hav SPESH-ul KLAS-ez for bee-GIN-erz." }
    ]
  },
  {
    id: 106,
    title: "Cricket Coaching",
    titleHindi: "क्रिकेट कोचिंग",
    scenario: "Joining cricket academy",
    scenarioHindi: "क्रिकेट अकादमी में शामिल होना",
    difficulty: "intermediate",
    category: "Sports",
    lines: [
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "My son wants to become a professional cricketer.", hindi: "मेरा बेटा पेशेवर क्रिकेटर बनना चाहता है।", pronunciation: "My sun wonts too bee-KUM uh pruh-FESH-uh-nul KRIK-et-er." },
      { speaker: "Coach", speakerHindi: "कोच", english: "That's great! How old is he? What position does he play?", hindi: "यह बहुत अच्छा है! वह कितने साल का है? वह किस पोजीशन पर खेलता है?", pronunciation: "Thats grayt! How ohld iz hee? Wot puh-ZISH-un duz hee play?" },
      { speaker: "Parent", speakerHindi: "अभिभावक", english: "He's 12 years old. He's a fast bowler.", hindi: "वह 12 साल का है। वह तेज़ गेंदबाज़ है।", pronunciation: "Heez twelv yeers ohld. Heez uh fast BOH-ler." },
      { speaker: "Coach", speakerHindi: "कोच", english: "Excellent! We have morning and evening batches. Training is 6 days a week.", hindi: "बहुत बढ़िया! हमारे पास सुबह और शाम के बैच हैं। प्रशिक्षण सप्ताह में 6 दिन है।", pronunciation: "EK-suh-lent! Wee hav MOR-ning and EE-vning BACH-ez. TRAY-ning iz siks dayz uh week." }
    ]
  },
  {
    id: 107,
    title: "Yoga Class",
    titleHindi: "योग कक्षा",
    scenario: "Joining yoga sessions",
    scenarioHindi: "योग सत्रों में शामिल होना",
    difficulty: "beginner",
    category: "Health",
    lines: [
      { speaker: "Student", speakerHindi: "छात्र", english: "I want to join yoga classes for stress relief.", hindi: "मैं तनाव से राहत के लिए योग कक्षाओं में शामिल होना चाहता हूँ।", pronunciation: "I wont too join YOH-guh KLAS-ez for stres ree-LEEF." },
      { speaker: "Instructor", speakerHindi: "प्रशिक्षक", english: "That's a great decision. Do you have any health issues?", hindi: "यह बहुत अच्छा निर्णय है। क्या आपको कोई स्वास्थ्य समस्या है?", pronunciation: "Thats uh grayt dee-SIZH-un. Doo yoo hav EN-ee helth ISH-ooz?" },
      { speaker: "Student", speakerHindi: "छात्र", english: "I have mild back pain. Is yoga safe for me?", hindi: "मुझे हल्का पीठ दर्द है। क्या योग मेरे लिए सुरक्षित है?", pronunciation: "I hav mild bak payn. Iz YOH-guh sayf for mee?" },
      { speaker: "Instructor", speakerHindi: "प्रशिक्षक", english: "Yes, yoga can actually help with back pain. We'll modify poses for you.", hindi: "हाँ, योग वास्तव में पीठ दर्द में मदद कर सकता है। हम आपके लिए आसन संशोधित करेंगे।", pronunciation: "Yes, YOH-guh kan AK-choo-uh-lee help with bak payn. Weel MOD-i-fy POH-zez for yoo." }
    ]
  },
  {
    id: 108,
    title: "Art Exhibition",
    titleHindi: "कला प्रदर्शनी",
    scenario: "Visiting an art exhibition",
    scenarioHindi: "कला प्रदर्शनी देखना",
    difficulty: "intermediate",
    category: "Culture",
    lines: [
      { speaker: "Visitor", speakerHindi: "दर्शक", english: "This painting is beautiful! Who is the artist?", hindi: "यह पेंटिंग सुंदर है! कलाकार कौन है?", pronunciation: "This PAYN-ting iz BYOO-ti-ful! Hoo iz thuh AR-tist?" },
      { speaker: "Guide", speakerHindi: "गाइड", english: "This is by a local artist named Sharma. It's called 'Sunrise'.", hindi: "यह शर्मा नाम के एक स्थानीय कलाकार की है। इसे 'सूर्योदय' कहते हैं।", pronunciation: "This iz by uh LOH-kul AR-tist naymd SHAR-mah. Its kold 'SUN-rise'." },
      { speaker: "Visitor", speakerHindi: "दर्शक", english: "Is this painting for sale?", hindi: "क्या यह पेंटिंग बिक्री के लिए है?", pronunciation: "Iz this PAYN-ting for sayl?" },
      { speaker: "Guide", speakerHindi: "गाइड", english: "Yes, it is. The price is 25,000 rupees.", hindi: "हाँ, है। कीमत 25,000 रुपये है।", pronunciation: "Yes, it iz. Thuh price iz TWEN-tee-five THOW-zund roo-PEEZ." }
    ]
  },
 
 // ==================== FINAL SET (109-130) ====================
  {
    id: 109,
    title: "Book Store",
    titleHindi: "किताब की दुकान",
    scenario: "Buying books at a bookstore",
    scenarioHindi: "किताब की दुकान पर किताबें खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Do you have any books on Indian history?", hindi: "क्या आपके पास भारतीय इतिहास पर कोई किताबें हैं?", pronunciation: "Doo yoo hav EN-ee books on IN-dee-un HIS-tuh-ree?" },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "Yes, we have a whole section. Follow me.", hindi: "हाँ, हमारे पास पूरा सेक्शन है। मेरे पीछे आइए।", pronunciation: "Yes, wee hav uh hohl SEK-shun. FOL-oh mee." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I'm looking for something about the Mughal period.", hindi: "मैं मुगल काल के बारे में कुछ ढूंढ रहा हूँ।", pronunciation: "Im LOOK-ing for SUM-thing uh-BOWT thuh MOO-gul PEER-ee-ud." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "This book is very popular. It's written by a famous historian.", hindi: "यह किताब बहुत लोकप्रिय है। यह एक प्रसिद्ध इतिहासकार द्वारा लिखी गई है।", pronunciation: "This book iz VER-ee POP-yoo-lar. Its RIT-en by uh FAY-mus his-TOR-ee-un." }
    ]
  },
  {
    id: 110,
    title: "Flower Shop",
    titleHindi: "फूलों की दुकान",
    scenario: "Buying flowers",
    scenarioHindi: "फूल खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need a bouquet for my wife's birthday.", hindi: "मुझे अपनी पत्नी के जन्मदिन के लिए एक गुलदस्ता चाहिए।", pronunciation: "I need uh boo-KAY for my wifes BERTH-day." },
      { speaker: "Florist", speakerHindi: "फूलवाला", english: "What flowers does she like? Roses, lilies, or mixed?", hindi: "उन्हें कौन से फूल पसंद हैं? गुलाब, लिली, या मिश्रित?", pronunciation: "Wot FLOW-erz duz shee like? ROH-zez, LIL-eez, or mikst?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "She loves red roses. Can you make a nice arrangement?", hindi: "उन्हें लाल गुलाब पसंद हैं। क्या आप एक अच्छी व्यवस्था बना सकते हैं?", pronunciation: "Shee luvz red ROH-zez. Kan yoo mayk uh nice uh-RAYNJ-ment?" },
      { speaker: "Florist", speakerHindi: "फूलवाला", english: "Of course! I'll add some baby's breath too. It will look beautiful.", hindi: "बिल्कुल! मैं कुछ बेबीज़ ब्रेथ भी डालूंगा। यह सुंदर लगेगा।", pronunciation: "Ov kors! Il ad sum BAY-beez breth too. It wil look BYOO-ti-ful." }
    ]
  },
  {
    id: 111,
    title: "Gift Shop",
    titleHindi: "गिफ्ट शॉप",
    scenario: "Buying a gift",
    scenarioHindi: "उपहार खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I'm looking for a gift for my friend's wedding.", hindi: "मैं अपने दोस्त की शादी के लिए उपहार ढूंढ रहा हूँ।", pronunciation: "Im LOOK-ing for uh gift for my frendz WED-ing." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "What's your budget? We have many options.", hindi: "आपका बजट क्या है? हमारे पास कई विकल्प हैं।", pronunciation: "Wots yor BUJ-et? Wee hav MEN-ee OP-shunz." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Around 2000 to 3000 rupees. Something useful for the home.", hindi: "लगभग 2000 से 3000 रुपये। घर के लिए कुछ उपयोगी।", pronunciation: "Uh-ROWND too-THOW-zund too three-THOW-zund roo-PEEZ. SUM-thing YOOS-ful for thuh hohm." },
      { speaker: "Shopkeeper", speakerHindi: "दुकानदार", english: "How about this dinner set? It's very elegant.", hindi: "इस डिनर सेट के बारे में क्या ख्याल है? यह बहुत सुंदर है।", pronunciation: "How uh-BOWT this DIN-er set? Its VER-ee EL-uh-gunt." }
    ]
  },
  {
    id: 112,
    title: "Shoe Store",
    titleHindi: "जूते की दुकान",
    scenario: "Buying shoes",
    scenarioHindi: "जूते खरीदना",
    difficulty: "beginner",
    category: "Shopping",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need formal shoes for office.", hindi: "मुझे ऑफिस के लिए फॉर्मल जूते चाहिए।", pronunciation: "I need FOR-mul shooz for OF-is." },
      { speaker: "Salesperson", speakerHindi: "विक्रेता", english: "What size do you wear?", hindi: "आप कौन सा साइज़ पहनते हैं?", pronunciation: "Wot size doo yoo wair?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Size 9. Do you have black leather shoes?", hindi: "साइज़ 9। क्या आपके पास काले चमड़े के जूते हैं?", pronunciation: "Size nine. Doo yoo hav blak LETH-er shooz?" },
      { speaker: "Salesperson", speakerHindi: "विक्रेता", english: "Yes, try these. They're very comfortable.", hindi: "हाँ, ये पहनकर देखिए। ये बहुत आरामदायक हैं।", pronunciation: "Yes, try theez. Thair VER-ee KUM-fer-tuh-bul." }
    ]
  },
  {
    id: 113,
    title: "Watch Repair",
    titleHindi: "घड़ी की मरम्मत",
    scenario: "Getting watch repaired",
    scenarioHindi: "घड़ी की मरम्मत कराना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "My watch has stopped working. Can you fix it?", hindi: "मेरी घड़ी काम करना बंद कर दी है। क्या आप इसे ठीक कर सकते हैं?", pronunciation: "My woch haz stopt WER-king. Kan yoo fiks it?" },
      { speaker: "Watchmaker", speakerHindi: "घड़ीसाज़", english: "Let me check. The battery might be dead.", hindi: "मुझे देखने दीजिए। बैटरी खत्म हो सकती है।", pronunciation: "Let mee chek. Thuh BAT-uh-ree mite bee ded." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How much will a new battery cost?", hindi: "नई बैटरी की कीमत कितनी होगी?", pronunciation: "How much wil uh noo BAT-uh-ree kost?" },
      { speaker: "Watchmaker", speakerHindi: "घड़ीसाज़", english: "It's 150 rupees including fitting. Ready in 10 minutes.", hindi: "फिटिंग सहित 150 रुपये। 10 मिनट में तैयार।", pronunciation: "Its wun-FIF-tee roo-PEEZ in-KLOO-ding FIT-ing. RED-ee in ten MIN-its." }
    ]
  },
  {
    id: 114,
    title: "Key Maker",
    titleHindi: "चाबी बनाने वाला",
    scenario: "Getting duplicate keys made",
    scenarioHindi: "डुप्लीकेट चाबी बनवाना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need a duplicate key for my house.", hindi: "मुझे अपने घर की डुप्लीकेट चाबी चाहिए।", pronunciation: "I need uh DOO-pli-kit kee for my hows." },
      { speaker: "Key Maker", speakerHindi: "चाबी वाला", english: "Let me see the original key. This is a simple lock.", hindi: "मुझे असली चाबी दिखाइए। यह साधारण ताला है।", pronunciation: "Let mee see thuh uh-RIJ-i-nul kee. This iz uh SIM-pul lok." },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "How long will it take?", hindi: "कितना समय लगेगा?", pronunciation: "How long wil it tayk?" },
      { speaker: "Key Maker", speakerHindi: "चाबी वाला", english: "Just 5 minutes. It will cost 50 rupees.", hindi: "बस 5 मिनट। इसकी कीमत 50 रुपये होगी।", pronunciation: "Just five MIN-its. It wil kost FIF-tee roo-PEEZ." }
    ]
  },
  {
    id: 115,
    title: "Printing Shop",
    titleHindi: "प्रिंटिंग शॉप",
    scenario: "Getting documents printed",
    scenarioHindi: "दस्तावेज़ प्रिंट कराना",
    difficulty: "beginner",
    category: "Services",
    lines: [
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "I need to print 10 copies of this document.", hindi: "मुझे इस दस्तावेज़ की 10 कॉपी प्रिंट करानी हैं।", pronunciation: "I need too print ten KOP-eez ov this DOK-yoo-ment." },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "Black and white or color?", hindi: "ब्लैक एंड व्हाइट या कलर?", pronunciation: "Blak and white or KUL-er?" },
      { speaker: "Customer", speakerHindi: "ग्राहक", english: "Black and white is fine. How much per page?", hindi: "ब्लैक एंड व्हाइट ठीक है। प्रति पेज कितना?", pronunciation: "Blak and white iz fine. How much per payj?" },
      { speaker: "Staff", speakerHindi: "स्टाफ", english: "2 rupees per page. Your total is 20 rupees.", hindi: "2 रुपये प्रति पेज। आपका कुल 20 रुपये है।", pronunciation: "Too roo-PEEZ per payj. Yor TOH-tul iz TWEN-tee roo-PEEZ." }
    ]
  },
];

export default dialogues;