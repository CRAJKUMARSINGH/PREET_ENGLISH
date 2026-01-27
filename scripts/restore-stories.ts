
import { db } from "../server/db";
import { stories } from "../shared/schema";

const storiesToSeed = [
    {
        title: "The Helpful Neighbor",
        titleHindi: "मददगार पड़ोसी",
        description: "A heartwarming story about community and kindness",
        descriptionHindi: "समुदाय और दयालुता के बारे में एक दिल छू लेने वाली कहानी",
        content: `Ravi moved to a new city for his job. He didn't know anyone there. His neighbor, Mrs. Sharma, noticed him struggling with heavy boxes.

"Do you need help?" she asked with a warm smile.

"Yes, please! That would be very kind," Ravi replied gratefully.

Mrs. Sharma helped him carry the boxes. She also brought him homemade chai and samosas.

"Welcome to our building," she said. "If you need anything, just knock on my door."

Ravi felt happy. He learned that kindness makes any place feel like home.`,
        contentHindi: `रवि अपनी नौकरी के लिए एक नए शहर में आया। वहां वह किसी को नहीं जानता था। उसकी पड़ोसन, श्रीमती शर्मा, ने देखा कि वह भारी बक्सों से जूझ रहा है।

"क्या आपको मदद चाहिए?" उन्होंने गर्मजोशी से मुस्कुराते हुए पूछा।

"हां, कृपया! यह बहुत दयालु होगा," रवि ने आभारी होकर जवाब दिया।

श्रीमती शर्मा ने उसे बक्से उठाने में मदद की। उन्होंने उसे घर की बनी चाय और समोसे भी लाकर दिए।

"हमारी बिल्डिंग में आपका स्वागत है," उन्होंने कहा। "अगर आपको कुछ भी चाहिए, बस मेरे दरवाजे पर दस्तक दें।"

रवि खुश हुआ। उसने सीखा कि दयालुता किसी भी जगह को घर जैसा बना देती है।`,
        difficulty: "Beginner",
        category: "Daily Life",
        order: 1,
        xpReward: 30,
        vocabulary: JSON.stringify([
            { word: "neighbor", hindi: "पड़ोसी", meaning: "a person living next door" },
            { word: "struggling", hindi: "जूझना", meaning: "having difficulty" },
            { word: "grateful", hindi: "आभारी", meaning: "feeling thankful" },
            { word: "kindness", hindi: "दयालुता", meaning: "being friendly and generous" }
        ])
    },
    {
        title: "The Job Interview",
        titleHindi: "नौकरी का इंटरव्यू",
        description: "Priya prepares for her first job interview",
        descriptionHindi: "प्रिया अपने पहले जॉब इंटरव्यू की तैयारी करती है",
        content: `Priya was nervous. Today was her first job interview at a software company.

She woke up early and dressed professionally. She reviewed her resume one more time.

"Good morning, I'm here for the interview," she told the receptionist.

"Please have a seat. Mr. Kumar will see you shortly," the receptionist replied.

During the interview, Mr. Kumar asked, "Tell me about yourself."

Priya took a deep breath. "I recently graduated with a degree in Computer Science. I'm passionate about coding and problem-solving."

Mr. Kumar smiled. "That's exactly what we're looking for. Welcome to the team!"

Priya couldn't believe it. Her preparation had paid off.`,
        contentHindi: `प्रिया घबराई हुई थी। आज एक सॉफ्टवेयर कंपनी में उसका पहला जॉब इंटरव्यू था।

वह जल्दी उठी और प्रोफेशनल कपड़े पहने। उसने एक बार फिर अपना रिज्यूमे देखा।

"गुड मॉर्निंग, मैं इंटरव्यू के लिए आई हूं," उसने रिसेप्शनिस्ट को बताया।

"कृपया बैठिए। श्री कुमार आपसे जल्द मिलेंगे," रिसेप्शनिस्ट ने जवाब दिया।

इंटरव्यू के दौरान, श्री कुमार ने पूछा, "अपने बारे में बताइए।"

प्रिया ने गहरी सांस ली। "मैंने हाल ही में कंप्यूटर साइंस में डिग्री ली है। मुझे कोडिंग और समस्या-समाधान का शौक है।"

श्री कुमार मुस्कुराए। "यही तो हम ढूंढ रहे हैं। टीम में आपका स्वागत है!"

प्रिया को विश्वास नहीं हुआ। उसकी तैयारी काम आ गई।`,
        difficulty: "Intermediate",
        category: "Career",
        order: 2,
        xpReward: 40,
        vocabulary: JSON.stringify([
            { word: "interview", hindi: "इंटरव्यू", meaning: "a formal meeting for a job" },
            { word: "professionally", hindi: "पेशेवर तरीके से", meaning: "in a business-like manner" },
            { word: "passionate", hindi: "जुनूनी", meaning: "having strong feelings about something" },
            { word: "preparation", hindi: "तैयारी", meaning: "getting ready for something" }
        ])
    },
    {
        title: "A Day at the Market",
        titleHindi: "बाज़ार में एक दिन",
        description: "Learn everyday shopping vocabulary through Amit's market visit",
        descriptionHindi: "अमित की बाज़ार यात्रा के माध्यम से रोज़मर्रा की खरीदारी शब्दावली सीखें",
        content: `Every Sunday, Amit goes to the local market with his mother.

"How much are these tomatoes?" his mother asked the vendor.

"Fifty rupees per kilogram, madam," the vendor replied.

"That's too expensive. Can you give a discount?" she bargained.

"Okay, forty rupees for you," the vendor agreed.

Amit helped carry the bags. They bought vegetables, fruits, and spices.

"Mom, can we get some mangoes?" Amit requested.

"Of course! They look fresh today," his mother said.

Shopping at the market was always an adventure for Amit.`,
        contentHindi: `हर रविवार, अमित अपनी माँ के साथ स्थानीय बाज़ार जाता है।

"ये टमाटर कितने के हैं?" उसकी माँ ने दुकानदार से पूछा।

"पचास रुपये किलो, मैडम," दुकानदार ने जवाब दिया।

"यह बहुत महंगा है। क्या आप छूट दे सकते हैं?" उन्होंने मोलभाव किया।

"ठीक है, आपके लिए चालीस रुपये," दुकानदार मान गया।

अमित ने थैले उठाने में मदद की। उन्होंने सब्जियां, फल और मसाले खरीदे।

"माँ, क्या हम कुछ आम ले सकते हैं?" अमित ने अनुरोध किया।

"बिल्कुल! आज ये ताज़े दिख रहे हैं," उसकी माँ ने कहा।

बाज़ार में खरीदारी अमित के लिए हमेशा एक रोमांच था।`,
        difficulty: "Beginner",
        category: "Daily Life",
        order: 3,
        xpReward: 30,
        vocabulary: JSON.stringify([
            { word: "vendor", hindi: "दुकानदार", meaning: "a person who sells things" },
            { word: "discount", hindi: "छूट", meaning: "a reduction in price" },
            { word: "bargain", hindi: "मोलभाव करना", meaning: "to negotiate the price" },
            { word: "fresh", hindi: "ताज़ा", meaning: "recently made or obtained" }
        ])
    },
    {
        title: "The Train Journey",
        titleHindi: "ट्रेन की यात्रा",
        description: "Experience an Indian train journey with the Gupta family",
        descriptionHindi: "गुप्ता परिवार के साथ भारतीय ट्रेन यात्रा का अनुभव करें",
        content: `The Gupta family was traveling from Delhi to Mumbai by train.

"Excuse me, is this seat 24?" Mr. Gupta asked a fellow passenger.

"Yes, this is the right compartment," the passenger confirmed.

The train started moving. Little Ananya looked out the window excitedly.

"Papa, look at the fields! They're so green!" she exclaimed.

A vendor walked through the coach. "Chai, coffee, samosa!" he called out.

"Two cups of chai, please," Mrs. Gupta ordered.

The journey was long but enjoyable. They played cards, ate snacks, and watched the beautiful countryside pass by.

"I love train journeys," Ananya said sleepily as night fell.`,
        contentHindi: `गुप्ता परिवार दिल्ली से मुंबई ट्रेन से जा रहा था।

"माफ कीजिए, क्या यह सीट 24 है?" श्री गुप्ता ने एक सहयात्री से पूछा।

"हां, यह सही डिब्बा है," यात्री ने पुष्टि की।

ट्रेन चलने लगी। छोटी अनन्या ने उत्साह से खिड़की से बाहर देखा।

"पापा, खेत देखो! कितने हरे हैं!" उसने कहा।

एक विक्रेता कोच से गुज़रा। "चाय, कॉफी, समोसा!" उसने आवाज़ लगाई।

"दो कप चाय, प्लीज़," श्रीमती गुप्ता ने ऑर्डर किया।

यात्रा लंबी थी लेकिन मज़ेदार। उन्होंने ताश खेला, नाश्ता किया, और सुंदर ग्रामीण इलाके को गुज़रते देखा।

"मुझे ट्रेन यात्राएं बहुत पसंद हैं," अनन्या ने रात होते ही नींद भरी आवाज़ में कहा।`,
        difficulty: "Intermediate",
        category: "Travel",
        order: 4,
        xpReward: 40,
        vocabulary: JSON.stringify([
            { word: "compartment", hindi: "डिब्बा", meaning: "a section of a train" },
            { word: "passenger", hindi: "यात्री", meaning: "a person traveling" },
            { word: "exclaimed", hindi: "चिल्लाया", meaning: "said something suddenly with emotion" },
            { word: "countryside", hindi: "ग्रामीण इलाका", meaning: "rural areas outside cities" }
        ])
    },
    {
        title: "Learning to Cook",
        titleHindi: "खाना बनाना सीखना",
        description: "Rahul learns to make his first dish",
        descriptionHindi: "राहुल अपना पहला व्यंजन बनाना सीखता है",
        content: `Rahul wanted to surprise his mother on her birthday. He decided to cook dinner.

"Grandma, can you teach me to make dal?" he asked.

"Of course, beta! First, wash the lentils properly," Grandma instructed.

Rahul followed each step carefully. He added turmeric, salt, and cumin seeds.

"Now let it simmer for twenty minutes," Grandma said.

The kitchen smelled wonderful. Rahul felt proud of himself.

When his mother came home, she was surprised. "You made this yourself?"

"Yes, Mom! Happy birthday!" Rahul said with a big smile.

His mother hugged him. "This is the best gift ever."`,
        contentHindi: `राहुल अपनी माँ को उनके जन्मदिन पर सरप्राइज़ देना चाहता था। उसने डिनर बनाने का फैसला किया।

"दादी, क्या आप मुझे दाल बनाना सिखा सकती हैं?" उसने पूछा।

"बिल्कुल, बेटा! पहले, दाल को अच्छे से धो लो," दादी ने निर्देश दिया।

राहुल ने हर कदम ध्यान से फॉलो किया। उसने हल्दी, नमक और जीरा डाला।

"अब इसे बीस मिनट धीमी आंच पर पकने दो," दादी ने कहा।

रसोई में अच्छी खुशबू आ रही थी। राहुल को खुद पर गर्व महसूस हुआ।

जब उसकी माँ घर आईं, वे हैरान रह गईं। "तुमने खुद बनाया?"

"हां, माँ! जन्मदिन मुबारक!" राहुल ने बड़ी मुस्कान के साथ कहा।

"उसकी माँ ने उसे गले लगाया। "यह अब तक का सबसे अच्छा तोहफा है।"`,
        difficulty: "Beginner",
        category: "Daily Life",
        order: 5,
        xpReward: 35,
        vocabulary: JSON.stringify([
            { word: "surprise", hindi: "सरप्राइज़", meaning: "an unexpected event" },
            { word: "lentils", hindi: "दाल", meaning: "small dried beans" },
            { word: "simmer", hindi: "धीमी आंच पर पकाना", meaning: "cook gently below boiling" },
            { word: "proud", hindi: "गर्वित", meaning: "feeling pleased about achievements" }
        ])
    }
];

async function seedStories() {
    console.log("🌱 Seeding stories...");

    for (const story of storiesToSeed) {
        try {
            await db.insert(stories).values(story);
            console.log(`✅ Added: ${story.title}`);
        } catch (error: any) {
            if (error.message?.includes("UNIQUE constraint")) {
                console.log(`⏭️ Skipped (exists): ${story.title}`);
            } else {
                console.error(`❌ Error adding ${story.title}:`, error.message);
            }
        }
    }

    console.log("\\n✨ Stories seeding complete!");
}

seedStories().catch(console.error);
