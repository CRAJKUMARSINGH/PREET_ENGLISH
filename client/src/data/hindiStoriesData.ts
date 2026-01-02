export interface Story {
  id: number;
  title: string;
  titleHindi: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  paragraphs: {
    english: string;
    hindi: string;
    vocabulary: { word: string; meaning: string; hindiMeaning: string }[];
  }[];
  moral: string;
  moralHindi: string;
}

export const stories: Story[] = [
  // BEGINNER STORIES (1-35)
  {
    id: 1,
    title: "The Honest Woodcutter",
    titleHindi: "ईमानदार लकड़हारा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A poor woodcutter lived near a forest. One day, his axe fell into the river. He started crying.",
        hindi: "एक गरीब लकड़हारा जंगल के पास रहता था। एक दिन, उसकी कुल्हाड़ी नदी में गिर गई। वह रोने लगा।",
        vocabulary: [
          { word: "woodcutter", meaning: "one who cuts wood", hindiMeaning: "लकड़हारा" },
          { word: "axe", meaning: "tool for cutting", hindiMeaning: "कुल्हाड़ी" }
        ]
      },
      {
        english: "A fairy appeared and brought golden and silver axes. The woodcutter refused them. He only took his iron axe.",
        hindi: "एक परी प्रकट हुई और सोने-चांदी की कुल्हाड़ियाँ लाई। लकड़हारे ने मना कर दिया। उसने केवल अपनी लोहे की कुल्हाड़ी ली।",
        vocabulary: [
          { word: "fairy", meaning: "magical being", hindiMeaning: "परी" },
          { word: "refused", meaning: "said no", hindiMeaning: "मना किया" }
        ]
      }
    ],
    moral: "Honesty is the best policy.",
    moralHindi: "ईमानदारी सबसे अच्छी नीति है।"
  },
  {
    id: 2,
    title: "The Thirsty Crow",
    titleHindi: "प्यासा कौआ",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A crow was very thirsty. He found a pot with little water at the bottom. His beak could not reach it.",
        hindi: "एक कौआ बहुत प्यासा था। उसे एक घड़ा मिला जिसमें तल में थोड़ा पानी था। उसकी चोंच वहाँ तक नहीं पहुँच सकी।",
        vocabulary: [
          { word: "thirsty", meaning: "wanting water", hindiMeaning: "प्यासा" },
          { word: "beak", meaning: "bird's mouth", hindiMeaning: "चोंच" }
        ]
      },
      {
        english: "The clever crow dropped pebbles into the pot. The water rose up. He drank and flew away happily.",
        hindi: "चतुर कौए ने घड़े में कंकड़ डाले। पानी ऊपर आ गया। उसने पानी पिया और खुशी से उड़ गया।",
        vocabulary: [
          { word: "clever", meaning: "smart", hindiMeaning: "चतुर" },
          { word: "pebbles", meaning: "small stones", hindiMeaning: "कंकड़" }
        ]
      }
    ],
    moral: "Where there is a will, there is a way.",
    moralHindi: "जहाँ चाह, वहाँ राह।"
  },
 
 {
    id: 3,
    title: "The Greedy Dog",
    titleHindi: "लालची कुत्ता",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A dog found a piece of meat. He was crossing a bridge over a river. He saw his reflection in the water.",
        hindi: "एक कुत्ते को मांस का टुकड़ा मिला। वह नदी के पुल से गुजर रहा था। उसने पानी में अपनी परछाई देखी।",
        vocabulary: [
          { word: "greedy", meaning: "wanting more", hindiMeaning: "लालची" },
          { word: "reflection", meaning: "image in water", hindiMeaning: "परछाई" }
        ]
      },
      {
        english: "He thought it was another dog with meat. He barked to get that meat too. His own meat fell into the river.",
        hindi: "उसने सोचा कि यह मांस वाला दूसरा कुत्ता है। उसने वह मांस पाने के लिए भौंका। उसका अपना मांस नदी में गिर गया।",
        vocabulary: [
          { word: "barked", meaning: "dog's sound", hindiMeaning: "भौंका" },
          { word: "fell", meaning: "dropped down", hindiMeaning: "गिर गया" }
        ]
      }
    ],
    moral: "Greed leads to loss.",
    moralHindi: "लालच बुरी बला है।"
  },
  {
    id: 4,
    title: "The Fox and Grapes",
    titleHindi: "लोमड़ी और अंगूर",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A hungry fox saw grapes hanging high on a vine. He jumped many times but could not reach them.",
        hindi: "एक भूखी लोमड़ी ने बेल पर ऊँचे लटके अंगूर देखे। वह कई बार कूदी लेकिन उन तक नहीं पहुँच सकी।",
        vocabulary: [
          { word: "fox", meaning: "wild animal", hindiMeaning: "लोमड़ी" },
          { word: "grapes", meaning: "fruit", hindiMeaning: "अंगूर" }
        ]
      },
      {
        english: "Finally, she gave up and walked away. She said, 'Those grapes are sour anyway.'",
        hindi: "अंत में, उसने हार मान ली और चली गई। उसने कहा, 'वे अंगूर खट्टे हैं।'",
        vocabulary: [
          { word: "sour", meaning: "not sweet", hindiMeaning: "खट्टे" },
          { word: "gave up", meaning: "stopped trying", hindiMeaning: "हार मान ली" }
        ]
      }
    ],
    moral: "It is easy to despise what you cannot have.",
    moralHindi: "जो नहीं मिलता उसे बुरा कहना आसान है।"
  },
  {
    id: 5,
    title: "The Ant and the Grasshopper",
    titleHindi: "चींटी और टिड्डा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "In summer, an ant worked hard collecting food. A grasshopper sang and danced all day. He laughed at the ant.",
        hindi: "गर्मियों में, एक चींटी खाना इकट्ठा करने में मेहनत करती थी। एक टिड्डा दिन भर गाता और नाचता था। वह चींटी पर हँसता था।",
        vocabulary: [
          { word: "ant", meaning: "small insect", hindiMeaning: "चींटी" },
          { word: "grasshopper", meaning: "jumping insect", hindiMeaning: "टिड्डा" }
        ]
      },
      {
        english: "Winter came. The ant had plenty of food. The grasshopper had nothing and was hungry.",
        hindi: "सर्दी आई। चींटी के पास बहुत खाना था। टिड्डे के पास कुछ नहीं था और वह भूखा था।",
        vocabulary: [
          { word: "winter", meaning: "cold season", hindiMeaning: "सर्दी" },
          { word: "plenty", meaning: "a lot", hindiMeaning: "बहुत" }
        ]
      }
    ],
    moral: "Work today for a better tomorrow.",
    moralHindi: "आज की मेहनत कल का सुख है।"
  },
 
 {
    id: 6,
    title: "The Lion and the Mouse",
    titleHindi: "शेर और चूहा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A lion caught a small mouse. The mouse begged for mercy. The lion let him go.",
        hindi: "एक शेर ने एक छोटे चूहे को पकड़ा। चूहे ने दया की भीख माँगी। शेर ने उसे जाने दिया।",
        vocabulary: [
          { word: "lion", meaning: "king of jungle", hindiMeaning: "शेर" },
          { word: "mercy", meaning: "kindness", hindiMeaning: "दया" }
        ]
      },
      {
        english: "Later, the lion was trapped in a net. The mouse came and cut the net with his teeth. The lion was free.",
        hindi: "बाद में, शेर एक जाल में फँस गया। चूहा आया और अपने दाँतों से जाल काट दिया। शेर आज़ाद हो गया।",
        vocabulary: [
          { word: "trapped", meaning: "caught", hindiMeaning: "फँसा हुआ" },
          { word: "net", meaning: "rope trap", hindiMeaning: "जाल" }
        ]
      }
    ],
    moral: "A friend in need is a friend indeed.",
    moralHindi: "मुसीबत में काम आने वाला ही सच्चा मित्र है।"
  },
  {
    id: 7,
    title: "The Tortoise and the Hare",
    titleHindi: "कछुआ और खरगोश",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A hare made fun of a slow tortoise. The tortoise challenged him to a race. The hare agreed.",
        hindi: "एक खरगोश ने धीमे कछुए का मज़ाक उड़ाया। कछुए ने उसे दौड़ की चुनौती दी। खरगोश मान गया।",
        vocabulary: [
          { word: "tortoise", meaning: "slow animal with shell", hindiMeaning: "कछुआ" },
          { word: "hare", meaning: "fast rabbit", hindiMeaning: "खरगोश" }
        ]
      },
      {
        english: "The hare ran fast and then slept under a tree. The tortoise kept walking slowly. He won the race.",
        hindi: "खरगोश तेज़ दौड़ा और फिर पेड़ के नीचे सो गया। कछुआ धीरे-धीरे चलता रहा। उसने दौड़ जीत ली।",
        vocabulary: [
          { word: "race", meaning: "competition", hindiMeaning: "दौड़" },
          { word: "slowly", meaning: "not fast", hindiMeaning: "धीरे-धीरे" }
        ]
      }
    ],
    moral: "Slow and steady wins the race.",
    moralHindi: "धीरे-धीरे और लगातार चलने वाला जीतता है।"
  },
  {
    id: 8,
    title: "The Boy Who Cried Wolf",
    titleHindi: "भेड़िया-भेड़िया चिल्लाने वाला लड़का",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A shepherd boy got bored watching sheep. He cried 'Wolf! Wolf!' for fun. Villagers came running but found no wolf.",
        hindi: "एक चरवाहा लड़का भेड़ें देखते-देखते बोर हो गया। उसने मज़े के लिए 'भेड़िया! भेड़िया!' चिल्लाया। गाँव वाले दौड़े आए लेकिन कोई भेड़िया नहीं था।",
        vocabulary: [
          { word: "shepherd", meaning: "sheep keeper", hindiMeaning: "चरवाहा" },
          { word: "wolf", meaning: "wild dog", hindiMeaning: "भेड़िया" }
        ]
      },
      {
        english: "He did this many times. One day, a real wolf came. He cried for help but nobody believed him.",
        hindi: "उसने यह कई बार किया। एक दिन, सच में भेड़िया आया। उसने मदद के लिए पुकारा लेकिन किसी ने विश्वास नहीं किया।",
        vocabulary: [
          { word: "believed", meaning: "trusted", hindiMeaning: "विश्वास किया" },
          { word: "real", meaning: "true", hindiMeaning: "असली" }
        ]
      }
    ],
    moral: "Nobody believes a liar even when he speaks the truth.",
    moralHindi: "झूठे पर कोई विश्वास नहीं करता, सच बोलने पर भी।"
  },
  {
    id: 9,
    title: "The Golden Egg",
    titleHindi: "सोने का अंडा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer had a hen that laid one golden egg every day. He became rich slowly.",
        hindi: "एक किसान के पास एक मुर्गी थी जो रोज़ एक सोने का अंडा देती थी। वह धीरे-धीरे अमीर हो गया।",
        vocabulary: [
          { word: "hen", meaning: "female chicken", hindiMeaning: "मुर्गी" },
          { word: "golden", meaning: "made of gold", hindiMeaning: "सोने का" }
        ]
      },
      {
        english: "He became greedy and killed the hen to get all eggs at once. But there were no eggs inside.",
        hindi: "वह लालची हो गया और एक साथ सारे अंडे पाने के लिए मुर्गी को मार दिया। लेकिन अंदर कोई अंडे नहीं थे।",
        vocabulary: [
          { word: "greedy", meaning: "wanting more", hindiMeaning: "लालची" },
          { word: "killed", meaning: "ended life", hindiMeaning: "मार दिया" }
        ]
      }
    ],
    moral: "Greed destroys the source of good.",
    moralHindi: "लालच अच्छाई के स्रोत को नष्ट कर देता है।"
  },
  {
    id: 10,
    title: "The Monkey and the Crocodile",
    titleHindi: "बंदर और मगरमच्छ",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A monkey lived on a tree by the river. He became friends with a crocodile. He gave fruits to the crocodile daily.",
        hindi: "एक बंदर नदी किनारे पेड़ पर रहता था। वह एक मगरमच्छ का दोस्त बन गया। वह रोज़ मगरमच्छ को फल देता था।",
        vocabulary: [
          { word: "monkey", meaning: "animal that climbs", hindiMeaning: "बंदर" },
          { word: "crocodile", meaning: "water reptile", hindiMeaning: "मगरमच्छ" }
        ]
      },
      {
        english: "The crocodile's wife wanted the monkey's heart. The clever monkey tricked the crocodile and escaped.",
        hindi: "मगरमच्छ की पत्नी बंदर का दिल चाहती थी। चतुर बंदर ने मगरमच्छ को धोखा दिया और बच गया।",
        vocabulary: [
          { word: "tricked", meaning: "fooled", hindiMeaning: "धोखा दिया" },
          { word: "escaped", meaning: "ran away", hindiMeaning: "बच गया" }
        ]
      }
    ],
    moral: "Quick thinking can save you from danger.",
    moralHindi: "तेज़ सोच आपको खतरे से बचा सकती है।"
  },
  {

    id: 11,
    title: "The Elephant and the Tailor",
    titleHindi: "हाथी और दर्जी",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "An elephant passed by a tailor's shop daily. The tailor gave him bananas. They became friends.",
        hindi: "एक हाथी रोज़ दर्जी की दुकान से गुज़रता था। दर्जी उसे केले देता था। वे दोस्त बन गए।",
        vocabulary: [
          { word: "elephant", meaning: "big animal", hindiMeaning: "हाथी" },
          { word: "tailor", meaning: "one who sews clothes", hindiMeaning: "दर्जी" }
        ]
      },
      {
        english: "One day, the tailor was angry and pricked the elephant's trunk. The elephant came back with muddy water and sprayed it on the shop.",
        hindi: "एक दिन, दर्जी गुस्से में था और उसने हाथी की सूंड में सुई चुभो दी। हाथी गंदे पानी के साथ वापस आया और दुकान पर छिड़क दिया।",
        vocabulary: [
          { word: "pricked", meaning: "poked with needle", hindiMeaning: "चुभोया" },
          { word: "trunk", meaning: "elephant's nose", hindiMeaning: "सूंड" }
        ]
      }
    ],
    moral: "Tit for tat. As you sow, so shall you reap.",
    moralHindi: "जैसे को तैसा। जैसा बोओगे वैसा काटोगे।"
  },
  {
    id: 12,
    title: "The Cap Seller and Monkeys",
    titleHindi: "टोपी वाला और बंदर",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A cap seller was tired and slept under a tree. Monkeys took all his caps and wore them.",
        hindi: "एक टोपी वाला थका हुआ था और पेड़ के नीचे सो गया। बंदरों ने उसकी सारी टोपियाँ ले लीं और पहन लीं।",
        vocabulary: [
          { word: "cap", meaning: "hat", hindiMeaning: "टोपी" },
          { word: "seller", meaning: "one who sells", hindiMeaning: "बेचने वाला" }
        ]
      },
      {
        english: "He threw his own cap down. The monkeys copied him and threw their caps too. He collected all caps and left.",
        hindi: "उसने अपनी टोपी नीचे फेंक दी। बंदरों ने उसकी नकल की और अपनी टोपियाँ भी फेंक दीं। उसने सारी टोपियाँ इकट्ठी कीं और चला गया।",
        vocabulary: [
          { word: "copied", meaning: "imitated", hindiMeaning: "नकल की" },
          { word: "collected", meaning: "gathered", hindiMeaning: "इकट्ठा किया" }
        ]
      }
    ],
    moral: "Wisdom is better than strength.",
    moralHindi: "बुद्धि बल से बेहतर है।"
  },
  {
    id: 13,
    title: "The Farmer and His Sons",
    titleHindi: "किसान और उसके बेटे",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "An old farmer had three sons who always fought. He was worried about their future.",
        hindi: "एक बूढ़े किसान के तीन बेटे थे जो हमेशा लड़ते थे। वह उनके भविष्य को लेकर चिंतित था।",
        vocabulary: [
          { word: "farmer", meaning: "one who farms", hindiMeaning: "किसान" },
          { word: "fought", meaning: "quarreled", hindiMeaning: "लड़ते थे" }
        ]
      },
      {
        english: "He gave them a bundle of sticks. Together they could not break it. Separately, each stick broke easily.",
        hindi: "उसने उन्हें लकड़ियों का गट्ठर दिया। साथ में वे इसे नहीं तोड़ सके। अलग-अलग, हर लकड़ी आसानी से टूट गई।",
        vocabulary: [
          { word: "bundle", meaning: "group tied together", hindiMeaning: "गट्ठर" },
          { word: "separately", meaning: "one by one", hindiMeaning: "अलग-अलग" }
        ]
      }
    ],
    moral: "Unity is strength.",
    moralHindi: "एकता में शक्ति है।"
  },
  {
    id: 14,
    title: "The Milkmaid's Dream",
    titleHindi: "दूधवाली का सपना",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A milkmaid was carrying milk to sell. She dreamed of buying hens, then cows, then a big house.",
        hindi: "एक दूधवाली दूध बेचने ले जा रही थी। उसने मुर्गियाँ खरीदने का सपना देखा, फिर गाय, फिर बड़ा घर।",
        vocabulary: [
          { word: "milkmaid", meaning: "girl who sells milk", hindiMeaning: "दूधवाली" },
          { word: "dreamed", meaning: "imagined", hindiMeaning: "सपना देखा" }
        ]
      },
      {
        english: "Lost in dreams, she tossed her head proudly. The pot fell and all milk spilled.",
        hindi: "सपनों में खोई, उसने गर्व से सिर हिलाया। बर्तन गिर गया और सारा दूध बह गया।",
        vocabulary: [
          { word: "tossed", meaning: "moved quickly", hindiMeaning: "हिलाया" },
          { word: "spilled", meaning: "fell out", hindiMeaning: "बह गया" }
        ]
      }
    ],
    moral: "Don't count your chickens before they hatch.",
    moralHindi: "अंडे फूटने से पहले चूज़े मत गिनो।"
  },
  {
    id: 15,
    title: "The Two Frogs",
    titleHindi: "दो मेंढक",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Two frogs fell into a pot of cream. One gave up and drowned. The other kept kicking.",
        hindi: "दो मेंढक मलाई के बर्तन में गिर गए। एक ने हार मान ली और डूब गया। दूसरा लात मारता रहा।",
        vocabulary: [
          { word: "frogs", meaning: "jumping animals", hindiMeaning: "मेंढक" },
          { word: "cream", meaning: "thick milk", hindiMeaning: "मलाई" }
        ]
      },
      {
        english: "His kicking turned the cream into butter. He jumped out safely.",
        hindi: "उसकी लातों ने मलाई को मक्खन में बदल दिया। वह सुरक्षित बाहर कूद गया।",
        vocabulary: [
          { word: "butter", meaning: "solid cream", hindiMeaning: "मक्खन" },
          { word: "safely", meaning: "without harm", hindiMeaning: "सुरक्षित" }
        ]
      }
    ],
    moral: "Never give up.",
    moralHindi: "कभी हार मत मानो।"
  },
  {

    id: 16,
    title: "The Clever Fox",
    titleHindi: "चालाक लोमड़ी",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A crow had a piece of cheese. A clever fox wanted it. He praised the crow's beautiful voice.",
        hindi: "एक कौए के पास पनीर का टुकड़ा था। एक चालाक लोमड़ी उसे चाहती थी। उसने कौए की सुंदर आवाज़ की तारीफ की।",
        vocabulary: [
          { word: "cheese", meaning: "dairy food", hindiMeaning: "पनीर" },
          { word: "praised", meaning: "said good things", hindiMeaning: "तारीफ की" }
        ]
      },
      {
        english: "The crow opened his mouth to sing. The cheese fell down. The fox ate it and ran away.",
        hindi: "कौए ने गाने के लिए मुँह खोला। पनीर नीचे गिर गया। लोमड़ी ने उसे खाया और भाग गई।",
        vocabulary: [
          { word: "opened", meaning: "made wide", hindiMeaning: "खोला" },
          { word: "sang", meaning: "made music", hindiMeaning: "गाया" }
        ]
      }
    ],
    moral: "Beware of flatterers.",
    moralHindi: "चापलूसों से सावधान रहो।"
  },
  {
    id: 17,
    title: "The Kind Prince",
    titleHindi: "दयालु राजकुमार",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A prince saw a poor old woman in the rain. He gave her his umbrella and got wet himself.",
        hindi: "एक राजकुमार ने बारिश में एक गरीब बूढ़ी औरत देखी। उसने उसे अपना छाता दे दिया और खुद भीग गया।",
        vocabulary: [
          { word: "prince", meaning: "king's son", hindiMeaning: "राजकुमार" },
          { word: "umbrella", meaning: "rain cover", hindiMeaning: "छाता" }
        ]
      },
      {
        english: "The old woman was actually a fairy. She blessed the prince with happiness forever.",
        hindi: "बूढ़ी औरत असल में एक परी थी। उसने राजकुमार को हमेशा खुश रहने का आशीर्वाद दिया।",
        vocabulary: [
          { word: "blessed", meaning: "gave good wishes", hindiMeaning: "आशीर्वाद दिया" },
          { word: "happiness", meaning: "joy", hindiMeaning: "खुशी" }
        ]
      }
    ],
    moral: "Kindness is always rewarded.",
    moralHindi: "दया का फल हमेशा मिलता है।"
  },
  {
    id: 18,
    title: "The Wise Owl",
    titleHindi: "बुद्धिमान उल्लू",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Birds were fighting about who was the best. They went to the wise owl for judgment.",
        hindi: "पक्षी इस बारे में लड़ रहे थे कि सबसे अच्छा कौन है। वे फैसले के लिए बुद्धिमान उल्लू के पास गए।",
        vocabulary: [
          { word: "owl", meaning: "night bird", hindiMeaning: "उल्लू" },
          { word: "judgment", meaning: "decision", hindiMeaning: "फैसला" }
        ]
      },
      {
        english: "The owl said each bird is special in its own way. The peacock is beautiful, the eagle is strong, the nightingale sings well.",
        hindi: "उल्लू ने कहा हर पक्षी अपने तरीके से खास है। मोर सुंदर है, बाज़ मजबूत है, बुलबुल अच्छा गाती है।",
        vocabulary: [
          { word: "special", meaning: "unique", hindiMeaning: "खास" },
          { word: "peacock", meaning: "colorful bird", hindiMeaning: "मोर" }
        ]
      }
    ],
    moral: "Everyone has their own unique talent.",
    moralHindi: "हर किसी की अपनी खास प्रतिभा होती है।"
  },
  {
    id: 19,
    title: "The Sun and the Wind",
    titleHindi: "सूरज और हवा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "The sun and wind argued about who was stronger. They saw a man wearing a coat.",
        hindi: "सूरज और हवा में बहस हुई कि कौन ज़्यादा ताकतवर है। उन्होंने एक आदमी को कोट पहने देखा।",
        vocabulary: [
          { word: "argued", meaning: "disagreed", hindiMeaning: "बहस की" },
          { word: "coat", meaning: "outer clothing", hindiMeaning: "कोट" }
        ]
      },
      {
        english: "The wind blew hard but the man held his coat tighter. The sun shone warmly and the man took off his coat.",
        hindi: "हवा ज़ोर से चली लेकिन आदमी ने कोट और कसकर पकड़ लिया। सूरज ने गर्मी दी और आदमी ने कोट उतार दिया।",
        vocabulary: [
          { word: "blew", meaning: "wind moved", hindiMeaning: "चली" },
          { word: "warmly", meaning: "with heat", hindiMeaning: "गर्मी से" }
        ]
      }
    ],
    moral: "Gentleness is more powerful than force.",
    moralHindi: "कोमलता बल से अधिक शक्तिशाली है।"
  },
  {
    id: 20,
    title: "The Honest Farmer",
    titleHindi: "ईमानदार किसान",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer found a bag of gold coins in his field. He returned it to the rich man who lost it.",
        hindi: "एक किसान को अपने खेत में सोने के सिक्कों की थैली मिली। उसने इसे उस अमीर आदमी को लौटा दिया जिसने इसे खोया था।",
        vocabulary: [
          { word: "coins", meaning: "money pieces", hindiMeaning: "सिक्के" },
          { word: "returned", meaning: "gave back", hindiMeaning: "लौटाया" }
        ]
      },
      {
        english: "The rich man was so happy that he gave the farmer half the gold as a reward.",
        hindi: "अमीर आदमी इतना खुश हुआ कि उसने किसान को इनाम में आधा सोना दे दिया।",
        vocabulary: [
          { word: "reward", meaning: "prize", hindiMeaning: "इनाम" },
          { word: "half", meaning: "50%", hindiMeaning: "आधा" }
        ]
      }
    ],
    moral: "Honesty brings its own reward.",
    moralHindi: "ईमानदारी का फल मिलता है।"
  },
 
 {
    id: 21,
    title: "The Magic Pot",
    titleHindi: "जादुई बर्तन",
    level: "beginner",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A poor girl found a magic pot. It cooked porridge when she said 'Cook, pot, cook!'",
        hindi: "एक गरीब लड़की को जादुई बर्तन मिला। जब वह कहती 'पकाओ, बर्तन, पकाओ!' तो वह दलिया बनाता था।",
        vocabulary: [
          { word: "magic", meaning: "supernatural", hindiMeaning: "जादुई" },
          { word: "porridge", meaning: "soft food", hindiMeaning: "दलिया" }
        ]
      },
      {
        english: "Her mother forgot the stop words. The pot kept cooking until the whole village was full of porridge!",
        hindi: "उसकी माँ रुकने के शब्द भूल गई। बर्तन पकाता रहा जब तक पूरा गाँव दलिया से भर नहीं गया!",
        vocabulary: [
          { word: "forgot", meaning: "did not remember", hindiMeaning: "भूल गई" },
          { word: "village", meaning: "small town", hindiMeaning: "गाँव" }
        ]
      }
    ],
    moral: "Learn things completely before using them.",
    moralHindi: "चीज़ों को इस्तेमाल करने से पहले पूरी तरह सीखो।"
  },
  {
    id: 22,
    title: "The Brave Little Bird",
    titleHindi: "बहादुर छोटी चिड़िया",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A forest caught fire. All animals ran away. A small bird kept bringing water drops in her beak.",
        hindi: "जंगल में आग लग गई। सभी जानवर भाग गए। एक छोटी चिड़िया अपनी चोंच में पानी की बूँदें लाती रही।",
        vocabulary: [
          { word: "fire", meaning: "flames", hindiMeaning: "आग" },
          { word: "drops", meaning: "small amounts", hindiMeaning: "बूँदें" }
        ]
      },
      {
        english: "Others laughed at her. She said, 'I am doing my part.' The gods were pleased and sent rain.",
        hindi: "दूसरों ने उस पर हँसा। उसने कहा, 'मैं अपना काम कर रही हूँ।' देवता प्रसन्न हुए और बारिश भेजी।",
        vocabulary: [
          { word: "laughed", meaning: "made fun", hindiMeaning: "हँसा" },
          { word: "pleased", meaning: "happy", hindiMeaning: "प्रसन्न" }
        ]
      }
    ],
    moral: "Every small effort counts.",
    moralHindi: "हर छोटा प्रयास मायने रखता है।"
  },
  {
    id: 23,
    title: "The Selfish Giant",
    titleHindi: "स्वार्थी दानव",
    level: "beginner",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A giant had a beautiful garden. He built a wall to keep children out. Spring never came to his garden.",
        hindi: "एक दानव के पास सुंदर बगीचा था। उसने बच्चों को बाहर रखने के लिए दीवार बनाई। उसके बगीचे में बसंत कभी नहीं आया।",
        vocabulary: [
          { word: "giant", meaning: "very big person", hindiMeaning: "दानव" },
          { word: "spring", meaning: "flower season", hindiMeaning: "बसंत" }
        ]
      },
      {
        english: "He broke the wall and let children play. Flowers bloomed and birds sang again.",
        hindi: "उसने दीवार तोड़ दी और बच्चों को खेलने दिया। फूल खिले और पक्षी फिर से गाने लगे।",
        vocabulary: [
          { word: "bloomed", meaning: "flowers opened", hindiMeaning: "खिले" },
          { word: "broke", meaning: "destroyed", hindiMeaning: "तोड़ दी" }
        ]
      }
    ],
    moral: "Sharing brings happiness.",
    moralHindi: "बाँटने से खुशी मिलती है।"
  },
  {
    id: 24,
    title: "The Three Fish",
    titleHindi: "तीन मछलियाँ",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Three fish lived in a pond. One was wise, one was clever, and one was lazy. Fishermen came to catch them.",
        hindi: "तीन मछलियाँ एक तालाब में रहती थीं। एक बुद्धिमान थी, एक चतुर थी, और एक आलसी थी। मछुआरे उन्हें पकड़ने आए।",
        vocabulary: [
          { word: "pond", meaning: "small lake", hindiMeaning: "तालाब" },
          { word: "fishermen", meaning: "fish catchers", hindiMeaning: "मछुआरे" }
        ]
      },
      {
        english: "The wise fish left early. The clever fish pretended to be dead. The lazy fish was caught.",
        hindi: "बुद्धिमान मछली जल्दी चली गई। चतुर मछली ने मरने का नाटक किया। आलसी मछली पकड़ी गई।",
        vocabulary: [
          { word: "pretended", meaning: "acted like", hindiMeaning: "नाटक किया" },
          { word: "caught", meaning: "captured", hindiMeaning: "पकड़ी गई" }
        ]
      }
    ],
    moral: "Act before it's too late.",
    moralHindi: "देर होने से पहले काम करो।"
  },
  {
    id: 25,
    title: "The Grateful Crane",
    titleHindi: "कृतज्ञ सारस",
    level: "beginner",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A poor man saved an injured crane. That night, a beautiful woman came to his house and wove silk cloth.",
        hindi: "एक गरीब आदमी ने घायल सारस को बचाया। उस रात, एक सुंदर औरत उसके घर आई और रेशमी कपड़ा बुना।",
        vocabulary: [
          { word: "crane", meaning: "tall bird", hindiMeaning: "सारस" },
          { word: "wove", meaning: "made cloth", hindiMeaning: "बुना" }
        ]
      },
      {
        english: "She was the crane in human form. She repaid his kindness with beautiful silk.",
        hindi: "वह मानव रूप में सारस थी। उसने उसकी दया का बदला सुंदर रेशम से चुकाया।",
        vocabulary: [
          { word: "human", meaning: "person", hindiMeaning: "मानव" },
          { word: "repaid", meaning: "gave back", hindiMeaning: "बदला चुकाया" }
        ]
      }
    ],
    moral: "Kindness is never wasted.",
    moralHindi: "दया कभी व्यर्थ नहीं जाती।"
  },
  {

    id: 26,
    title: "The Donkey in Lion's Skin",
    titleHindi: "शेर की खाल में गधा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A donkey found a lion's skin. He wore it and scared all the animals in the forest.",
        hindi: "एक गधे को शेर की खाल मिली। उसने इसे पहना और जंगल के सभी जानवरों को डरा दिया।",
        vocabulary: [
          { word: "donkey", meaning: "animal like horse", hindiMeaning: "गधा" },
          { word: "skin", meaning: "outer covering", hindiMeaning: "खाल" }
        ]
      },
      {
        english: "But when he brayed, everyone knew he was just a donkey. They chased him away.",
        hindi: "लेकिन जब उसने रेंका, सबको पता चल गया कि वह सिर्फ गधा है। उन्होंने उसे भगा दिया।",
        vocabulary: [
          { word: "brayed", meaning: "donkey's sound", hindiMeaning: "रेंका" },
          { word: "chased", meaning: "ran after", hindiMeaning: "भगाया" }
        ]
      }
    ],
    moral: "You cannot hide your true nature.",
    moralHindi: "तुम अपना असली स्वभाव नहीं छुपा सकते।"
  },
  {
    id: 27,
    title: "The Peacock's Complaint",
    titleHindi: "मोर की शिकायत",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A peacock complained to the goddess that he had a ugly voice. He wanted to sing like the nightingale.",
        hindi: "एक मोर ने देवी से शिकायत की कि उसकी आवाज़ बदसूरत है। वह बुलबुल की तरह गाना चाहता था।",
        vocabulary: [
          { word: "complained", meaning: "expressed unhappiness", hindiMeaning: "शिकायत की" },
          { word: "nightingale", meaning: "singing bird", hindiMeaning: "बुलबुल" }
        ]
      },
      {
        english: "The goddess said, 'You have beautiful feathers. Be happy with what you have.'",
        hindi: "देवी ने कहा, 'तुम्हारे पास सुंदर पंख हैं। जो है उसमें खुश रहो।'",
        vocabulary: [
          { word: "feathers", meaning: "bird's covering", hindiMeaning: "पंख" },
          { word: "beautiful", meaning: "pretty", hindiMeaning: "सुंदर" }
        ]
      }
    ],
    moral: "Be content with what you have.",
    moralHindi: "जो है उसमें संतुष्ट रहो।"
  },
  {
    id: 28,
    title: "The Clever Rabbit",
    titleHindi: "चतुर खरगोश",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A lion ate one animal every day. A clever rabbit's turn came. He had a plan.",
        hindi: "एक शेर रोज़ एक जानवर खाता था। एक चतुर खरगोश की बारी आई। उसके पास एक योजना थी।",
        vocabulary: [
          { word: "rabbit", meaning: "small animal", hindiMeaning: "खरगोश" },
          { word: "plan", meaning: "idea", hindiMeaning: "योजना" }
        ]
      },
      {
        english: "He showed the lion his reflection in a well. The lion jumped in to fight and drowned.",
        hindi: "उसने शेर को कुएं में उसकी परछाई दिखाई। शेर लड़ने के लिए कूदा और डूब गया।",
        vocabulary: [
          { word: "well", meaning: "water hole", hindiMeaning: "कुआं" },
          { word: "drowned", meaning: "died in water", hindiMeaning: "डूब गया" }
        ]
      }
    ],
    moral: "Brain is mightier than brawn.",
    moralHindi: "बुद्धि बल से बड़ी है।"
  },
  {
    id: 29,
    title: "The Talking Cave",
    titleHindi: "बोलने वाली गुफा",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A lion found a cave. He thought an animal lived inside. He called out, 'Hello!'",
        hindi: "एक शेर को गुफा मिली। उसने सोचा कोई जानवर अंदर रहता है। उसने पुकारा, 'हैलो!'",
        vocabulary: [
          { word: "cave", meaning: "hole in rock", hindiMeaning: "गुफा" },
          { word: "called", meaning: "shouted", hindiMeaning: "पुकारा" }
        ]
      },
      {
        english: "A clever fox inside replied in a loud voice. The lion thought a big animal lived there and ran away.",
        hindi: "अंदर एक चतुर लोमड़ी ने ज़ोर से जवाब दिया। शेर ने सोचा कोई बड़ा जानवर वहाँ रहता है और भाग गया।",
        vocabulary: [
          { word: "replied", meaning: "answered", hindiMeaning: "जवाब दिया" },
          { word: "loud", meaning: "high volume", hindiMeaning: "ज़ोर से" }
        ]
      }
    ],
    moral: "Quick thinking saves lives.",
    moralHindi: "तेज़ सोच जान बचाती है।"
  },
  {
    id: 30,
    title: "The Proud Rose",
    titleHindi: "घमंडी गुलाब",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A beautiful rose was proud of her beauty. She made fun of the ugly cactus next to her.",
        hindi: "एक सुंदर गुलाब को अपनी सुंदरता पर घमंड था। उसने अपने बगल के बदसूरत कैक्टस का मज़ाक उड़ाया।",
        vocabulary: [
          { word: "proud", meaning: "thinking highly of self", hindiMeaning: "घमंडी" },
          { word: "cactus", meaning: "desert plant", hindiMeaning: "कैक्टस" }
        ]
      },
      {
        english: "Summer came and there was no water. The cactus shared its water with the rose and saved her.",
        hindi: "गर्मी आई और पानी नहीं था। कैक्टस ने गुलाब के साथ अपना पानी बाँटा और उसे बचाया।",
        vocabulary: [
          { word: "shared", meaning: "gave part of", hindiMeaning: "बाँटा" },
          { word: "saved", meaning: "rescued", hindiMeaning: "बचाया" }
        ]
      }
    ],
    moral: "Never judge others by their looks.",
    moralHindi: "कभी दूसरों को उनकी शक्ल से मत आँको।"
  },
  {
  
  id: 31,
    title: "The Blind Men and the Elephant",
    titleHindi: "अंधे आदमी और हाथी",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Six blind men touched an elephant. Each touched a different part. Each described the elephant differently.",
        hindi: "छह अंधे आदमियों ने हाथी को छुआ। हर एक ने अलग हिस्सा छुआ। हर एक ने हाथी को अलग तरह से बताया।",
        vocabulary: [
          { word: "blind", meaning: "cannot see", hindiMeaning: "अंधा" },
          { word: "touched", meaning: "felt with hands", hindiMeaning: "छुआ" }
        ]
      },
      {
        english: "One said it's like a wall, another said like a rope. They were all partly right.",
        hindi: "एक ने कहा यह दीवार जैसा है, दूसरे ने कहा रस्सी जैसा। वे सब आंशिक रूप से सही थे।",
        vocabulary: [
          { word: "wall", meaning: "side of building", hindiMeaning: "दीवार" },
          { word: "rope", meaning: "thick string", hindiMeaning: "रस्सी" }
        ]
      }
    ],
    moral: "Don't judge the whole by a part.",
    moralHindi: "एक हिस्से से पूरे का अंदाज़ा मत लगाओ।"
  },
  {
    id: 32,
    title: "The Bell and the Cat",
    titleHindi: "घंटी और बिल्ली",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Mice were afraid of a cat. They decided to put a bell on the cat's neck.",
        hindi: "चूहे एक बिल्ली से डरते थे। उन्होंने बिल्ली के गले में घंटी बाँधने का फैसला किया।",
        vocabulary: [
          { word: "mice", meaning: "small animals", hindiMeaning: "चूहे" },
          { word: "bell", meaning: "ringing object", hindiMeaning: "घंटी" }
        ]
      },
      {
        english: "But no mouse was brave enough to do it. Ideas are easy, doing is hard.",
        hindi: "लेकिन कोई चूहा इतना बहादुर नहीं था कि यह करे। विचार आसान हैं, करना कठिन है।",
        vocabulary: [
          { word: "brave", meaning: "courageous", hindiMeaning: "बहादुर" },
          { word: "ideas", meaning: "thoughts", hindiMeaning: "विचार" }
        ]
      }
    ],
    moral: "Easier said than done.",
    moralHindi: "कहना आसान है, करना मुश्किल।"
  },
  {
    id: 33,
    title: "The Stork and the Fox",
    titleHindi: "सारस और लोमड़ी",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A fox invited a stork for dinner. He served soup in a flat plate. The stork could not eat with her long beak.",
        hindi: "एक लोमड़ी ने सारस को खाने पर बुलाया। उसने चपटी थाली में सूप परोसा। सारस अपनी लंबी चोंच से नहीं खा सकी।",
        vocabulary: [
          { word: "stork", meaning: "long-beaked bird", hindiMeaning: "सारस" },
          { word: "flat", meaning: "not deep", hindiMeaning: "चपटी" }
        ]
      },
      {
        english: "The stork invited the fox back. She served food in a tall jar. The fox could not eat.",
        hindi: "सारस ने लोमड़ी को वापस बुलाया। उसने लंबे जार में खाना परोसा। लोमड़ी नहीं खा सकी।",
        vocabulary: [
          { word: "jar", meaning: "tall container", hindiMeaning: "जार" },
          { word: "served", meaning: "gave food", hindiMeaning: "परोसा" }
        ]
      }
    ],
    moral: "Treat others as you want to be treated.",
    moralHindi: "दूसरों के साथ वैसा व्यवहार करो जैसा तुम चाहते हो।"
  },
  {
    id: 34,
    title: "The Dog and His Shadow",
    titleHindi: "कुत्ता और उसकी परछाई",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A dog was carrying a bone across a bridge. He saw his shadow in the water below.",
        hindi: "एक कुत्ता पुल पर हड्डी ले जा रहा था। उसने नीचे पानी में अपनी परछाई देखी।",
        vocabulary: [
          { word: "bone", meaning: "hard part of body", hindiMeaning: "हड्डी" },
          { word: "shadow", meaning: "dark image", hindiMeaning: "परछाई" }
        ]
      },
      {
        english: "He thought it was another dog with a bigger bone. He barked and lost his own bone in the water.",
        hindi: "उसने सोचा यह बड़ी हड्डी वाला दूसरा कुत्ता है। उसने भौंका और अपनी हड्डी पानी में खो दी।",
        vocabulary: [
          { word: "bigger", meaning: "larger", hindiMeaning: "बड़ी" },
          { word: "lost", meaning: "no longer had", hindiMeaning: "खो दी" }
        ]
      }
    ],
    moral: "Be happy with what you have.",
    moralHindi: "जो है उसमें खुश रहो।"
  },
  {
    id: 35,
    title: "The Woodpecker and the Tree",
    titleHindi: "कठफोड़वा और पेड़",
    level: "beginner",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A woodpecker made holes in a tree to find insects. The tree complained about the pain.",
        hindi: "एक कठफोड़वा कीड़े खोजने के लिए पेड़ में छेद करता था। पेड़ ने दर्द की शिकायत की।",
        vocabulary: [
          { word: "woodpecker", meaning: "bird that pecks wood", hindiMeaning: "कठफोड़वा" },
          { word: "insects", meaning: "small bugs", hindiMeaning: "कीड़े" }
        ]
      },
      {
        english: "The woodpecker said, 'I am removing the insects that are killing you.' The tree understood and thanked him.",
        hindi: "कठफोड़वे ने कहा, 'मैं उन कीड़ों को निकाल रहा हूँ जो तुम्हें मार रहे हैं।' पेड़ समझ गया और उसने धन्यवाद दिया।",
        vocabulary: [
          { word: "removing", meaning: "taking out", hindiMeaning: "निकाल रहा" },
          { word: "understood", meaning: "realized", hindiMeaning: "समझ गया" }
        ]
      }
    ],
    moral: "Sometimes pain leads to healing.",
    moralHindi: "कभी-कभी दर्द से इलाज होता है।"
  },
  // INTERMEDIATE STORIES (36-70)
  {
    id: 36,
    title: "The King's New Clothes",
    titleHindi: "राजा के नए कपड़े",
    level: "intermediate",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "Two clever tailors told the king they would make magical clothes. Only wise people could see them, they said.",
        hindi: "दो चालाक दर्जियों ने राजा से कहा कि वे जादुई कपड़े बनाएंगे। उन्होंने कहा कि केवल बुद्धिमान लोग ही उन्हें देख सकते हैं।",
        vocabulary: [
          { word: "tailors", meaning: "cloth makers", hindiMeaning: "दर्जी" },
          { word: "magical", meaning: "having magic", hindiMeaning: "जादुई" }
        ]
      },
      {
        english: "The king wore nothing but pretended to see the clothes. Everyone praised them. A child shouted, 'The king has no clothes!'",
        hindi: "राजा ने कुछ नहीं पहना लेकिन कपड़े देखने का नाटक किया। सबने तारीफ की। एक बच्चे ने चिल्लाया, 'राजा के कपड़े नहीं हैं!'",
        vocabulary: [
          { word: "pretended", meaning: "acted falsely", hindiMeaning: "नाटक किया" },
          { word: "shouted", meaning: "said loudly", hindiMeaning: "चिल्लाया" }
        ]
      }
    ],
    moral: "Truth comes from innocent hearts.",
    moralHindi: "सच्चाई मासूम दिलों से आती है।"
  },
  {
    id: 37,
    title: "The Merchant and the Donkey",
    titleHindi: "व्यापारी और गधा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A merchant loaded salt on his donkey. The donkey fell in a river and the salt dissolved. The load became lighter.",
        hindi: "एक व्यापारी ने अपने गधे पर नमक लादा। गधा नदी में गिर गया और नमक घुल गया। बोझ हल्का हो गया।",
        vocabulary: [
          { word: "merchant", meaning: "trader", hindiMeaning: "व्यापारी" },
          { word: "dissolved", meaning: "melted in water", hindiMeaning: "घुल गया" }
        ]
      },
      {
        english: "The donkey did this trick daily. The merchant loaded cotton instead. When wet, cotton became very heavy!",
        hindi: "गधा रोज़ यह चाल करता था। व्यापारी ने बदले में रूई लादी। गीली होने पर, रूई बहुत भारी हो गई!",
        vocabulary: [
          { word: "trick", meaning: "clever act", hindiMeaning: "चाल" },
          { word: "cotton", meaning: "soft fiber", hindiMeaning: "रूई" }
        ]
      }
    ],
    moral: "The same trick doesn't work twice.",
    moralHindi: "एक ही चाल दो बार काम नहीं करती।"
  },
  {
    id: 38,
    title: "The Wise Judge",
    titleHindi: "बुद्धिमान न्यायाधीश",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Two women claimed the same baby. They went to a wise judge. He said he would cut the baby in half.",
        hindi: "दो औरतों ने एक ही बच्चे पर दावा किया। वे एक बुद्धिमान न्यायाधीश के पास गईं। उसने कहा वह बच्चे को आधा काट देगा।",
        vocabulary: [
          { word: "claimed", meaning: "said it was theirs", hindiMeaning: "दावा किया" },
          { word: "judge", meaning: "one who decides", hindiMeaning: "न्यायाधीश" }
        ]
      },
      {
        english: "One woman agreed. The other cried and said give the baby to her. The judge knew the crying woman was the real mother.",
        hindi: "एक औरत मान गई। दूसरी रोई और कहा बच्चा उसे दे दो। न्यायाधीश समझ गया कि रोने वाली औरत असली माँ है।",
        vocabulary: [
          { word: "agreed", meaning: "said yes", hindiMeaning: "मान गई" },
          { word: "real", meaning: "true", hindiMeaning: "असली" }
        ]
      }
    ],
    moral: "True love is selfless.",
    moralHindi: "सच्चा प्यार निस्वार्थ होता है।"
  },
  {
    id: 39,
    title: "The Four Friends",
    titleHindi: "चार दोस्त",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A deer, crow, mouse, and tortoise were friends. One day, the deer was caught in a hunter's net.",
        hindi: "एक हिरण, कौआ, चूहा और कछुआ दोस्त थे। एक दिन, हिरण शिकारी के जाल में फँस गया।",
        vocabulary: [
          { word: "deer", meaning: "forest animal", hindiMeaning: "हिरण" },
          { word: "hunter", meaning: "one who hunts", hindiMeaning: "शिकारी" }
        ]
      },
      {
        english: "The crow spotted him, the mouse cut the net, and the tortoise distracted the hunter. Together they saved their friend.",
        hindi: "कौए ने उसे देखा, चूहे ने जाल काटा, और कछुए ने शिकारी का ध्यान भटकाया। साथ मिलकर उन्होंने अपने दोस्त को बचाया।",
        vocabulary: [
          { word: "spotted", meaning: "saw", hindiMeaning: "देखा" },
          { word: "distracted", meaning: "diverted attention", hindiMeaning: "ध्यान भटकाया" }
        ]
      }
    ],
    moral: "True friends help in times of need.",
    moralHindi: "सच्चे दोस्त मुसीबत में मदद करते हैं।"
  },
  {
    id: 40,
    title: "The Miser and His Gold",
    titleHindi: "कंजूस और उसका सोना",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A miser buried his gold in the garden. Every day he dug it up just to look at it. He never spent any.",
        hindi: "एक कंजूस ने अपना सोना बगीचे में गाड़ दिया। हर दिन वह इसे सिर्फ देखने के लिए खोदता था। उसने कभी खर्च नहीं किया।",
        vocabulary: [
          { word: "miser", meaning: "one who hoards money", hindiMeaning: "कंजूस" },
          { word: "buried", meaning: "put underground", hindiMeaning: "गाड़ दिया" }
        ]
      },
      {
        english: "A thief saw him and stole the gold. A neighbor said, 'Put a stone there. It's the same since you never used the gold.'",
        hindi: "एक चोर ने उसे देखा और सोना चुरा लिया। एक पड़ोसी ने कहा, 'वहाँ पत्थर रख दो। यह वही है क्योंकि तुमने कभी सोना इस्तेमाल नहीं किया।'",
        vocabulary: [
          { word: "thief", meaning: "one who steals", hindiMeaning: "चोर" },
          { word: "neighbor", meaning: "one who lives nearby", hindiMeaning: "पड़ोसी" }
        ]
      }
    ],
    moral: "Wealth unused is wealth wasted.",
    moralHindi: "बिना इस्तेमाल का धन बेकार है।"
  },
  {
    id
: 41,
    title: "The Clever Minister",
    titleHindi: "चतुर मंत्री",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king asked his minister to bring him something that makes sad people happy and happy people sad.",
        hindi: "एक राजा ने अपने मंत्री से कहा कि उसे कुछ ऐसा लाओ जो दुखी लोगों को खुश करे और खुश लोगों को दुखी।",
        vocabulary: [
          { word: "minister", meaning: "king's advisor", hindiMeaning: "मंत्री" },
          { word: "sad", meaning: "unhappy", hindiMeaning: "दुखी" }
        ]
      },
      {
        english: "The minister brought a ring with words: 'This too shall pass.' The king was impressed by his wisdom.",
        hindi: "मंत्री एक अंगूठी लाया जिस पर लिखा था: 'यह भी बीत जाएगा।' राजा उसकी बुद्धि से प्रभावित हुआ।",
        vocabulary: [
          { word: "ring", meaning: "finger jewelry", hindiMeaning: "अंगूठी" },
          { word: "impressed", meaning: "amazed", hindiMeaning: "प्रभावित" }
        ]
      }
    ],
    moral: "Nothing in life is permanent.",
    moralHindi: "जीवन में कुछ भी स्थायी नहीं है।"
  },
  {
    id: 42,
    title: "The Brahmin and the Goat",
    titleHindi: "ब्राह्मण और बकरी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A brahmin was carrying a goat. Three thieves wanted to steal it. Each told him it was a dog, not a goat.",
        hindi: "एक ब्राह्मण बकरी ले जा रहा था। तीन चोर इसे चुराना चाहते थे। हर एक ने उसे बताया कि यह कुत्ता है, बकरी नहीं।",
        vocabulary: [
          { word: "brahmin", meaning: "priest", hindiMeaning: "ब्राह्मण" },
          { word: "goat", meaning: "farm animal", hindiMeaning: "बकरी" }
        ]
      },
      {
        english: "The brahmin believed them and left the goat. The thieves took it. He was fooled by repeated lies.",
        hindi: "ब्राह्मण ने उन पर विश्वास किया और बकरी छोड़ दी। चोरों ने इसे ले लिया। वह बार-बार के झूठ से बेवकूफ बना।",
        vocabulary: [
          { word: "believed", meaning: "trusted", hindiMeaning: "विश्वास किया" },
          { word: "fooled", meaning: "tricked", hindiMeaning: "बेवकूफ बनाया" }
        ]
      }
    ],
    moral: "Trust your own judgment.",
    moralHindi: "अपने फैसले पर भरोसा करो।"
  },
  {
    id: 43,
    title: "The Potter's Donkey",
    titleHindi: "कुम्हार का गधा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A potter's donkey worked hard all day carrying pots. At night, he dreamed of being a horse.",
        hindi: "एक कुम्हार का गधा दिन भर बर्तन ढोने में मेहनत करता था। रात को, वह घोड़ा बनने का सपना देखता था।",
        vocabulary: [
          { word: "potter", meaning: "pot maker", hindiMeaning: "कुम्हार" },
          { word: "dreamed", meaning: "imagined while sleeping", hindiMeaning: "सपना देखा" }
        ]
      },
      {
        english: "One day he saw a horse being whipped by its master. He realized his life was better and stopped complaining.",
        hindi: "एक दिन उसने एक घोड़े को अपने मालिक द्वारा कोड़े खाते देखा। उसे एहसास हुआ कि उसकी ज़िंदगी बेहतर है और उसने शिकायत करना बंद कर दिया।",
        vocabulary: [
          { word: "whipped", meaning: "hit with whip", hindiMeaning: "कोड़े मारे" },
          { word: "realized", meaning: "understood", hindiMeaning: "एहसास हुआ" }
        ]
      }
    ],
    moral: "The grass is not always greener on the other side.",
    moralHindi: "दूसरी तरफ की घास हमेशा हरी नहीं होती।"
  },
  {
    id: 44,
    title: "The Clever Daughter",
    titleHindi: "चतुर बेटी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king gave a farmer an impossible task. His clever daughter solved it with wit. The king was amazed.",
        hindi: "एक राजा ने किसान को असंभव काम दिया। उसकी चतुर बेटी ने इसे बुद्धि से हल किया। राजा हैरान रह गया।",
        vocabulary: [
          { word: "impossible", meaning: "cannot be done", hindiMeaning: "असंभव" },
          { word: "wit", meaning: "cleverness", hindiMeaning: "बुद्धि" }
        ]
      },
      {
        english: "The king married her. She became queen and helped him rule wisely for many years.",
        hindi: "राजा ने उससे शादी कर ली। वह रानी बन गई और कई सालों तक उसे बुद्धिमानी से राज करने में मदद की।",
        vocabulary: [
          { word: "married", meaning: "wed", hindiMeaning: "शादी की" },
          { word: "wisely", meaning: "with wisdom", hindiMeaning: "बुद्धिमानी से" }
        ]
      }
    ],
    moral: "Intelligence is more valuable than wealth.",
    moralHindi: "बुद्धि धन से अधिक मूल्यवान है।"
  },
  {
    id: 45,
    title: "The Loyal Dog",
    titleHindi: "वफादार कुत्ता",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A man left his baby with his loyal dog. When he returned, he saw blood on the dog's mouth and killed it.",
        hindi: "एक आदमी ने अपने बच्चे को अपने वफादार कुत्ते के साथ छोड़ा। जब वह लौटा, उसने कुत्ते के मुँह पर खून देखा और उसे मार दिया।",
        vocabulary: [
          { word: "loyal", meaning: "faithful", hindiMeaning: "वफादार" },
          { word: "blood", meaning: "red body fluid", hindiMeaning: "खून" }
        ]
      },
      {
        english: "Then he saw a dead snake near the baby. The dog had saved his child. He cried with regret.",
        hindi: "फिर उसने बच्चे के पास एक मरा हुआ साँप देखा। कुत्ते ने उसके बच्चे को बचाया था। वह पछतावे से रोया।",
        vocabulary: [
          { word: "snake", meaning: "reptile", hindiMeaning: "साँप" },
          { word: "regret", meaning: "feeling sorry", hindiMeaning: "पछतावा" }
        ]
      }
    ],
    moral: "Don't act in haste.",
    moralHindi: "जल्दबाज़ी में काम मत करो।"
  },
  {
   
 id: 46,
    title: "The Fisherman's Flute",
    titleHindi: "मछुआरे की बाँसुरी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A fisherman played beautiful music on his flute. He thought fish would come to hear it. But no fish came.",
        hindi: "एक मछुआरा अपनी बाँसुरी पर सुंदर संगीत बजाता था। उसने सोचा मछलियाँ इसे सुनने आएंगी। लेकिन कोई मछली नहीं आई।",
        vocabulary: [
          { word: "flute", meaning: "musical instrument", hindiMeaning: "बाँसुरी" },
          { word: "music", meaning: "pleasant sounds", hindiMeaning: "संगीत" }
        ]
      },
      {
        english: "He threw his net and caught many fish. He said, 'Now you dance when I didn't play!'",
        hindi: "उसने अपना जाल फेंका और बहुत मछलियाँ पकड़ीं। उसने कहा, 'अब तुम नाचती हो जब मैंने नहीं बजाया!'",
        vocabulary: [
          { word: "net", meaning: "catching tool", hindiMeaning: "जाल" },
          { word: "dance", meaning: "move rhythmically", hindiMeaning: "नाचना" }
        ]
      }
    ],
    moral: "Use the right tool for the right job.",
    moralHindi: "सही काम के लिए सही औज़ार इस्तेमाल करो।"
  },
  {
    id: 47,
    title: "The Clever Jackal",
    titleHindi: "चालाक गीदड़",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A jackal fell into a dye pot and turned blue. He told other animals he was sent by God to be their king.",
        hindi: "एक गीदड़ रंग के बर्तन में गिर गया और नीला हो गया। उसने दूसरे जानवरों को बताया कि भगवान ने उसे उनका राजा बनने भेजा है।",
        vocabulary: [
          { word: "jackal", meaning: "wild dog", hindiMeaning: "गीदड़" },
          { word: "dye", meaning: "color liquid", hindiMeaning: "रंग" }
        ]
      },
      {
        english: "One night, jackals howled. He howled too and his true identity was revealed. The animals chased him away.",
        hindi: "एक रात, गीदड़ों ने हुआँ-हुआँ की। उसने भी की और उसकी असली पहचान सामने आ गई। जानवरों ने उसे भगा दिया।",
        vocabulary: [
          { word: "howled", meaning: "made loud cry", hindiMeaning: "हुआँ-हुआँ की" },
          { word: "identity", meaning: "who someone is", hindiMeaning: "पहचान" }
        ]
      }
    ],
    moral: "You cannot hide your true self forever.",
    moralHindi: "तुम अपना असली रूप हमेशा नहीं छुपा सकते।"
  },
  {
    id: 48,
    title: "The Grateful Elephant",
    titleHindi: "कृतज्ञ हाथी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A boy removed a thorn from an elephant's foot. Years later, the boy became a soldier and was captured.",
        hindi: "एक लड़के ने हाथी के पैर से काँटा निकाला। सालों बाद, लड़का सैनिक बन गया और पकड़ा गया।",
        vocabulary: [
          { word: "thorn", meaning: "sharp point", hindiMeaning: "काँटा" },
          { word: "soldier", meaning: "army person", hindiMeaning: "सैनिक" }
        ]
      },
      {
        english: "He was thrown to an elephant in the arena. The elephant recognized him and refused to hurt him.",
        hindi: "उसे अखाड़े में हाथी के सामने फेंका गया। हाथी ने उसे पहचान लिया और उसे चोट पहुँचाने से मना कर दिया।",
        vocabulary: [
          { word: "arena", meaning: "fighting ground", hindiMeaning: "अखाड़ा" },
          { word: "recognized", meaning: "knew who he was", hindiMeaning: "पहचान लिया" }
        ]
      }
    ],
    moral: "Kindness is never forgotten.",
    moralHindi: "दया कभी नहीं भुलाई जाती।"
  },
  {
    id: 49,
    title: "The Two Goats",
    titleHindi: "दो बकरियाँ",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Two goats met on a narrow bridge. Neither wanted to step back. They pushed each other.",
        hindi: "दो बकरियाँ एक संकरे पुल पर मिलीं। कोई भी पीछे हटना नहीं चाहती थी। उन्होंने एक-दूसरे को धक्का दिया।",
        vocabulary: [
          { word: "narrow", meaning: "not wide", hindiMeaning: "संकरा" },
          { word: "pushed", meaning: "shoved", hindiMeaning: "धक्का दिया" }
        ]
      },
      {
        english: "Both fell into the river below. If one had stepped back, both would have crossed safely.",
        hindi: "दोनों नीचे नदी में गिर गईं। अगर एक पीछे हट जाती, तो दोनों सुरक्षित पार हो जातीं।",
        vocabulary: [
          { word: "fell", meaning: "dropped down", hindiMeaning: "गिर गईं" },
          { word: "safely", meaning: "without harm", hindiMeaning: "सुरक्षित" }
        ]
      }
    ],
    moral: "Stubbornness leads to destruction.",
    moralHindi: "ज़िद विनाश की ओर ले जाती है।"
  },
  {
    id: 50,
    title: "The Farmer's Well",
    titleHindi: "किसान का कुआँ",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer sold his well to a neighbor. The next day, the neighbor came to draw water. The farmer said, 'I sold the well, not the water.'",
        hindi: "एक किसान ने अपना कुआँ पड़ोसी को बेच दिया। अगले दिन, पड़ोसी पानी लेने आया। किसान ने कहा, 'मैंने कुआँ बेचा, पानी नहीं।'",
        vocabulary: [
          { word: "sold", meaning: "gave for money", hindiMeaning: "बेचा" },
          { word: "draw", meaning: "take out", hindiMeaning: "निकालना" }
        ]
      },
      {
        english: "The neighbor went to the king. The king said, 'If the water is yours, pay rent for keeping it in his well!'",
        hindi: "पड़ोसी राजा के पास गया। राजा ने कहा, 'अगर पानी तुम्हारा है, तो उसके कुएं में रखने का किराया दो!'",
        vocabulary: [
          { word: "king", meaning: "ruler", hindiMeaning: "राजा" },
          { word: "rent", meaning: "payment for use", hindiMeaning: "किराया" }
        ]
      }
    ],
    moral: "Cheaters never prosper.",
    moralHindi: "धोखेबाज़ कभी सफल नहीं होते।"
  },
  
{
    id: 51,
    title: "The Wise Parrot",
    titleHindi: "बुद्धिमान तोता",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king had a wise parrot. Thieves came one night. The parrot shouted 'Thieves! Thieves!' and woke everyone.",
        hindi: "एक राजा के पास बुद्धिमान तोता था। एक रात चोर आए। तोते ने 'चोर! चोर!' चिल्लाया और सबको जगा दिया।",
        vocabulary: [
          { word: "parrot", meaning: "talking bird", hindiMeaning: "तोता" },
          { word: "thieves", meaning: "robbers", hindiMeaning: "चोर" }
        ]
      },
      {
        english: "The thieves were caught. The king rewarded the parrot with a golden cage and the best fruits.",
        hindi: "चोर पकड़े गए। राजा ने तोते को सोने का पिंजरा और सबसे अच्छे फल देकर पुरस्कृत किया।",
        vocabulary: [
          { word: "caught", meaning: "captured", hindiMeaning: "पकड़े गए" },
          { word: "rewarded", meaning: "gave prize", hindiMeaning: "पुरस्कृत किया" }
        ]
      }
    ],
    moral: "Alertness saves from danger.",
    moralHindi: "सतर्कता खतरे से बचाती है।"
  },
  {
    id: 52,
    title: "The Lazy Farmer",
    titleHindi: "आलसी किसान",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A lazy farmer found a magic lamp. He wished for crops without working. The genie said, 'I can give you seeds, but you must plant them.'",
        hindi: "एक आलसी किसान को जादुई दीपक मिला। उसने बिना काम किए फसल की इच्छा की। जिन्न ने कहा, 'मैं तुम्हें बीज दे सकता हूँ, लेकिन तुम्हें उन्हें बोना होगा।'",
        vocabulary: [
          { word: "lazy", meaning: "not wanting to work", hindiMeaning: "आलसी" },
          { word: "genie", meaning: "magical being", hindiMeaning: "जिन्न" }
        ]
      },
      {
        english: "The farmer learned that there is no shortcut to success. He started working hard and became prosperous.",
        hindi: "किसान ने सीखा कि सफलता का कोई शॉर्टकट नहीं है। उसने मेहनत करना शुरू किया और समृद्ध हो गया।",
        vocabulary: [
          { word: "shortcut", meaning: "easy way", hindiMeaning: "शॉर्टकट" },
          { word: "prosperous", meaning: "successful", hindiMeaning: "समृद्ध" }
        ]
      }
    ],
    moral: "There is no substitute for hard work.",
    moralHindi: "मेहनत का कोई विकल्प नहीं है।"
  },
  {
    id: 53,
    title: "The Singing Donkey",
    titleHindi: "गाने वाला गधा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A donkey heard a nightingale sing. He wanted to sing too. He opened his mouth and brayed loudly.",
        hindi: "एक गधे ने बुलबुल को गाते सुना। वह भी गाना चाहता था। उसने मुँह खोला और ज़ोर से रेंका।",
        vocabulary: [
          { word: "nightingale", meaning: "singing bird", hindiMeaning: "बुलबुल" },
          { word: "brayed", meaning: "donkey's sound", hindiMeaning: "रेंका" }
        ]
      },
      {
        english: "Everyone ran away from the terrible noise. The donkey learned that not everyone can do everything.",
        hindi: "भयानक शोर से सब भाग गए। गधे ने सीखा कि हर कोई सब कुछ नहीं कर सकता।",
        vocabulary: [
          { word: "terrible", meaning: "very bad", hindiMeaning: "भयानक" },
          { word: "noise", meaning: "loud sound", hindiMeaning: "शोर" }
        ]
      }
    ],
    moral: "Know your strengths and weaknesses.",
    moralHindi: "अपनी ताकत और कमज़ोरियाँ जानो।"
  },
  {
    id: 54,
    title: "The Clever Crow",
    titleHindi: "चतुर कौआ",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A crow wanted to drink from a narrow-necked bottle. He couldn't reach the water with his beak.",
        hindi: "एक कौआ संकरी गर्दन वाली बोतल से पानी पीना चाहता था। वह अपनी चोंच से पानी तक नहीं पहुँच सका।",
        vocabulary: [
          { word: "narrow-necked", meaning: "thin opening", hindiMeaning: "संकरी गर्दन वाली" },
          { word: "bottle", meaning: "container", hindiMeaning: "बोतल" }
        ]
      },
      {
        english: "He found a straw and used it to drink. Sometimes new problems need new solutions.",
        hindi: "उसे एक तिनका मिला और उसने इसका इस्तेमाल पीने के लिए किया। कभी-कभी नई समस्याओं को नए समाधान चाहिए।",
        vocabulary: [
          { word: "straw", meaning: "thin tube", hindiMeaning: "तिनका" },
          { word: "solutions", meaning: "answers", hindiMeaning: "समाधान" }
        ]
      }
    ],
    moral: "Think creatively to solve problems.",
    moralHindi: "समस्याओं को हल करने के लिए रचनात्मक सोचो।"
  },
  {
    id: 55,
    title: "The Honest Barber",
    titleHindi: "ईमानदार नाई",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A barber found a bag of gold while cutting a rich man's hair. He returned it immediately.",
        hindi: "एक नाई को एक अमीर आदमी के बाल काटते समय सोने की थैली मिली। उसने इसे तुरंत लौटा दिया।",
        vocabulary: [
          { word: "barber", meaning: "hair cutter", hindiMeaning: "नाई" },
          { word: "immediately", meaning: "at once", hindiMeaning: "तुरंत" }
        ]
      },
      {
        english: "The rich man was testing him. He gave the barber a shop of his own as a reward for his honesty.",
        hindi: "अमीर आदमी उसकी परीक्षा ले रहा था। उसने नाई को उसकी ईमानदारी के इनाम में अपनी दुकान दी।",
        vocabulary: [
          { word: "testing", meaning: "checking", hindiMeaning: "परीक्षा ले रहा" },
          { word: "honesty", meaning: "truthfulness", hindiMeaning: "ईमानदारी" }
        ]
      }
    ],
    moral: "Honesty is always rewarded.",
    moralHindi: "ईमानदारी का फल हमेशा मिलता है।"
  },
  {
 
   id: 56,
    title: "The Monkey King",
    titleHindi: "बंदरों का राजा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A monkey king led his tribe across a river using his body as a bridge. He saved everyone but hurt himself badly.",
        hindi: "एक बंदर राजा ने अपने शरीर को पुल बनाकर अपने समूह को नदी पार कराया। उसने सबको बचाया लेकिन खुद बुरी तरह घायल हो गया।",
        vocabulary: [
          { word: "tribe", meaning: "group", hindiMeaning: "समूह" },
          { word: "bridge", meaning: "crossing structure", hindiMeaning: "पुल" }
        ]
      },
      {
        english: "A human king saw this and learned about true leadership. A leader sacrifices for his people.",
        hindi: "एक मानव राजा ने यह देखा और सच्चे नेतृत्व के बारे में सीखा। एक नेता अपने लोगों के लिए बलिदान करता है।",
        vocabulary: [
          { word: "leadership", meaning: "leading others", hindiMeaning: "नेतृत्व" },
          { word: "sacrifices", meaning: "gives up", hindiMeaning: "बलिदान करता है" }
        ]
      }
    ],
    moral: "A true leader serves his people.",
    moralHindi: "सच्चा नेता अपने लोगों की सेवा करता है।"
  },
  {
    id: 57,
    title: "The Wise Old Man",
    titleHindi: "बुद्धिमान बूढ़ा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A young man asked an old man, 'How do I become wise?' The old man said, 'By making mistakes and learning from them.'",
        hindi: "एक युवक ने बूढ़े से पूछा, 'मैं बुद्धिमान कैसे बनूँ?' बूढ़े ने कहा, 'गलतियाँ करके और उनसे सीखकर।'",
        vocabulary: [
          { word: "wise", meaning: "having wisdom", hindiMeaning: "बुद्धिमान" },
          { word: "mistakes", meaning: "errors", hindiMeaning: "गलतियाँ" }
        ]
      },
      {
        english: "The young man asked, 'How do I make mistakes?' The old man smiled, 'By trying to become wise too quickly.'",
        hindi: "युवक ने पूछा, 'मैं गलतियाँ कैसे करूँ?' बूढ़ा मुस्कुराया, 'बहुत जल्दी बुद्धिमान बनने की कोशिश करके।'",
        vocabulary: [
          { word: "smiled", meaning: "showed happiness", hindiMeaning: "मुस्कुराया" },
          { word: "quickly", meaning: "fast", hindiMeaning: "जल्दी" }
        ]
      }
    ],
    moral: "Wisdom comes with experience.",
    moralHindi: "बुद्धि अनुभव से आती है।"
  },
  {
    id: 58,
    title: "The Helpful Ants",
    titleHindi: "मददगार चींटियाँ",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A dove saw an ant drowning in a stream. She dropped a leaf and the ant climbed on it to safety.",
        hindi: "एक कबूतर ने एक चींटी को धारा में डूबते देखा। उसने एक पत्ता गिराया और चींटी सुरक्षित उस पर चढ़ गई।",
        vocabulary: [
          { word: "dove", meaning: "peaceful bird", hindiMeaning: "कबूतर" },
          { word: "drowning", meaning: "dying in water", hindiMeaning: "डूबते" }
        ]
      },
      {
        english: "Later, a hunter aimed at the dove. The ant bit his foot. The hunter missed and the dove flew away.",
        hindi: "बाद में, एक शिकारी ने कबूतर पर निशाना लगाया। चींटी ने उसके पैर में काटा। शिकारी चूक गया और कबूतर उड़ गया।",
        vocabulary: [
          { word: "aimed", meaning: "pointed at", hindiMeaning: "निशाना लगाया" },
          { word: "bit", meaning: "used teeth", hindiMeaning: "काटा" }
        ]
      }
    ],
    moral: "One good turn deserves another.",
    moralHindi: "एक अच्छाई दूसरी अच्छाई की हकदार है।"
  },
  {
    id: 59,
    title: "The Proud Tree",
    titleHindi: "घमंडी पेड़",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A tall oak tree made fun of the small reeds by the river. 'You bend with every wind,' he laughed.",
        hindi: "एक लंबे बलूत के पेड़ ने नदी किनारे छोटे सरकंडों का मज़ाक उड़ाया। 'तुम हर हवा से झुक जाते हो,' वह हँसा।",
        vocabulary: [
          { word: "oak", meaning: "strong tree", hindiMeaning: "बलूत" },
          { word: "reeds", meaning: "thin plants", hindiMeaning: "सरकंडे" }
        ]
      },
      {
        english: "A storm came. The oak stood firm but broke. The reeds bent and survived. Flexibility is strength.",
        hindi: "तूफान आया। बलूत अड़ा रहा लेकिन टूट गया। सरकंडे झुके और बच गए। लचीलापन ताकत है।",
        vocabulary: [
          { word: "storm", meaning: "strong wind", hindiMeaning: "तूफान" },
          { word: "flexibility", meaning: "ability to bend", hindiMeaning: "लचीलापन" }
        ]
      }
    ],
    moral: "Flexibility is better than rigidity.",
    moralHindi: "लचीलापन कठोरता से बेहतर है।"
  },
  {
    id: 60,
    title: "The Magic Mirror",
    titleHindi: "जादुई आईना",
    level: "intermediate",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A queen had a magic mirror that showed the truth. She asked who was the fairest. It always said she was.",
        hindi: "एक रानी के पास जादुई आईना था जो सच दिखाता था। उसने पूछा सबसे सुंदर कौन है। यह हमेशा कहता था वह है।",
        vocabulary: [
          { word: "mirror", meaning: "reflecting glass", hindiMeaning: "आईना" },
          { word: "fairest", meaning: "most beautiful", hindiMeaning: "सबसे सुंदर" }
        ]
      },
      {
        english: "One day it said her daughter was fairer. The queen learned that beauty fades but kindness lasts forever.",
        hindi: "एक दिन इसने कहा उसकी बेटी ज़्यादा सुंदर है। रानी ने सीखा कि सुंदरता फीकी पड़ती है लेकिन दया हमेशा रहती है।",
        vocabulary: [
          { word: "fades", meaning: "becomes less", hindiMeaning: "फीकी पड़ती है" },
          { word: "kindness", meaning: "being nice", hindiMeaning: "दया" }
        ]
      }
    ],
    moral: "Inner beauty matters more than outer beauty.",
    moralHindi: "आंतरिक सुंदरता बाहरी सुंदरता से ज़्यादा मायने रखती है।"
  },
  {
 
   id: 61,
    title: "The Cobbler's Dream",
    titleHindi: "मोची का सपना",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A poor cobbler was always happy singing while working. A rich neighbor couldn't sleep because of his singing.",
        hindi: "एक गरीब मोची काम करते हुए हमेशा खुशी से गाता था। एक अमीर पड़ोसी उसके गाने की वजह से सो नहीं पाता था।",
        vocabulary: [
          { word: "cobbler", meaning: "shoe maker", hindiMeaning: "मोची" },
          { word: "singing", meaning: "making music", hindiMeaning: "गाना" }
        ]
      },
      {
        english: "The rich man gave him gold. The cobbler stopped singing, worried about thieves. He returned the gold and got his happiness back.",
        hindi: "अमीर आदमी ने उसे सोना दिया। मोची ने गाना बंद कर दिया, चोरों की चिंता में। उसने सोना लौटा दिया और अपनी खुशी वापस पा ली।",
        vocabulary: [
          { word: "worried", meaning: "anxious", hindiMeaning: "चिंतित" },
          { word: "returned", meaning: "gave back", hindiMeaning: "लौटा दिया" }
        ]
      }
    ],
    moral: "Money cannot buy happiness.",
    moralHindi: "पैसे से खुशी नहीं खरीदी जा सकती।"
  },
  {
    id: 62,
    title: "The Clever Shepherd",
    titleHindi: "चतुर चरवाहा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king asked a shepherd three difficult questions. If he answered correctly, he would become a minister.",
        hindi: "एक राजा ने चरवाहे से तीन कठिन सवाल पूछे। अगर वह सही जवाब देता, तो वह मंत्री बन जाता।",
        vocabulary: [
          { word: "shepherd", meaning: "sheep keeper", hindiMeaning: "चरवाहा" },
          { word: "difficult", meaning: "hard", hindiMeaning: "कठिन" }
        ]
      },
      {
        english: "The shepherd answered all three with simple wisdom. The king made him his chief advisor.",
        hindi: "चरवाहे ने तीनों का सरल बुद्धि से जवाब दिया। राजा ने उसे अपना मुख्य सलाहकार बना दिया।",
        vocabulary: [
          { word: "wisdom", meaning: "knowledge", hindiMeaning: "बुद्धि" },
          { word: "advisor", meaning: "one who gives advice", hindiMeaning: "सलाहकार" }
        ]
      }
    ],
    moral: "Simple wisdom is the best wisdom.",
    moralHindi: "सरल बुद्धि सबसे अच्छी बुद्धि है।"
  },
  {
    id: 63,
    title: "The Brave Mouse",
    titleHindi: "बहादुर चूहा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A mouse wanted to marry the most powerful being. He asked the sun, who said clouds were more powerful.",
        hindi: "एक चूहा सबसे शक्तिशाली से शादी करना चाहता था। उसने सूरज से पूछा, जिसने कहा बादल ज़्यादा शक्तिशाली हैं।",
        vocabulary: [
          { word: "powerful", meaning: "strong", hindiMeaning: "शक्तिशाली" },
          { word: "clouds", meaning: "sky formations", hindiMeaning: "बादल" }
        ]
      },
      {
        english: "Clouds said wind was stronger. Wind said walls were stronger. Walls said mice were strongest because they made holes!",
        hindi: "बादलों ने कहा हवा ज़्यादा मजबूत है। हवा ने कहा दीवारें ज़्यादा मजबूत हैं। दीवारों ने कहा चूहे सबसे मजबूत हैं क्योंकि वे छेद करते हैं!",
        vocabulary: [
          { word: "wind", meaning: "moving air", hindiMeaning: "हवा" },
          { word: "walls", meaning: "building sides", hindiMeaning: "दीवारें" }
        ]
      }
    ],
    moral: "Everyone has their own strength.",
    moralHindi: "हर किसी की अपनी ताकत होती है।"
  },
  {
    id: 64,
    title: "The Talking Fish",
    titleHindi: "बोलने वाली मछली",
    level: "intermediate",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A fisherman caught a golden fish. The fish begged for freedom and promised to grant wishes.",
        hindi: "एक मछुआरे ने सुनहरी मछली पकड़ी। मछली ने आज़ादी की भीख माँगी और इच्छाएँ पूरी करने का वादा किया।",
        vocabulary: [
          { word: "golden", meaning: "gold colored", hindiMeaning: "सुनहरी" },
          { word: "freedom", meaning: "liberty", hindiMeaning: "आज़ादी" }
        ]
      },
      {
        english: "His wife kept asking for more. Finally, she wanted to be God. They lost everything and became poor again.",
        hindi: "उसकी पत्नी और माँगती रही। अंत में, वह भगवान बनना चाहती थी। उन्होंने सब कुछ खो दिया और फिर से गरीब हो गए।",
        vocabulary: [
          { word: "asking", meaning: "requesting", hindiMeaning: "माँगना" },
          { word: "lost", meaning: "no longer had", hindiMeaning: "खो दिया" }
        ]
      }
    ],
    moral: "Be content with what you have.",
    moralHindi: "जो है उसमें संतुष्ट रहो।"
  },
  {
    id: 65,
    title: "The Clever Weaver",
    titleHindi: "चतुर जुलाहा",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A weaver made a beautiful cloth for the king. The king's minister was jealous and told lies about the weaver.",
        hindi: "एक जुलाहे ने राजा के लिए सुंदर कपड़ा बनाया। राजा का मंत्री जलता था और जुलाहे के बारे में झूठ बोला।",
        vocabulary: [
          { word: "weaver", meaning: "cloth maker", hindiMeaning: "जुलाहा" },
          { word: "jealous", meaning: "envious", hindiMeaning: "जलता था" }
        ]
      },
      {
        english: "The weaver proved his innocence with his work. The king punished the minister and rewarded the weaver.",
        hindi: "जुलाहे ने अपने काम से अपनी बेगुनाही साबित की। राजा ने मंत्री को सज़ा दी और जुलाहे को इनाम दिया।",
        vocabulary: [
          { word: "innocence", meaning: "not guilty", hindiMeaning: "बेगुनाही" },
          { word: "punished", meaning: "gave penalty", hindiMeaning: "सज़ा दी" }
        ]
      }
    ],
    moral: "Truth always wins.",
    moralHindi: "सच्चाई हमेशा जीतती है।"
  },
  {

    id: 66,
    title: "The Patient Farmer",
    titleHindi: "धैर्यवान किसान",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer planted seeds and waited patiently. His neighbor kept digging them up to check if they were growing.",
        hindi: "एक किसान ने बीज बोए और धैर्य से इंतज़ार किया। उसका पड़ोसी यह देखने के लिए उन्हें खोदता रहा कि वे बढ़ रहे हैं या नहीं।",
        vocabulary: [
          { word: "patient", meaning: "waiting calmly", hindiMeaning: "धैर्यवान" },
          { word: "digging", meaning: "making holes", hindiMeaning: "खोदना" }
        ]
      },
      {
        english: "The patient farmer had a great harvest. The impatient neighbor had nothing. Good things take time.",
        hindi: "धैर्यवान किसान की बढ़िया फसल हुई। अधीर पड़ोसी के पास कुछ नहीं था। अच्छी चीज़ों में समय लगता है।",
        vocabulary: [
          { word: "harvest", meaning: "crop collection", hindiMeaning: "फसल" },
          { word: "impatient", meaning: "not patient", hindiMeaning: "अधीर" }
        ]
      }
    ],
    moral: "Patience brings rewards.",
    moralHindi: "धैर्य का फल मीठा होता है।"
  },
  {
    id: 67,
    title: "The Wise Elephant",
    titleHindi: "बुद्धिमान हाथी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "An elephant was tied with a thin rope. He could easily break it but didn't try. He believed he couldn't.",
        hindi: "एक हाथी पतली रस्सी से बंधा था। वह आसानी से इसे तोड़ सकता था लेकिन कोशिश नहीं की। उसे विश्वास था कि वह नहीं कर सकता।",
        vocabulary: [
          { word: "tied", meaning: "bound", hindiMeaning: "बंधा" },
          { word: "rope", meaning: "thick string", hindiMeaning: "रस्सी" }
        ]
      },
      {
        english: "As a baby, he couldn't break it. He never tried again. Our beliefs can limit us more than reality.",
        hindi: "बच्चे के रूप में, वह इसे नहीं तोड़ सका। उसने फिर कभी कोशिश नहीं की। हमारे विश्वास हमें वास्तविकता से ज़्यादा सीमित कर सकते हैं।",
        vocabulary: [
          { word: "beliefs", meaning: "what we think is true", hindiMeaning: "विश्वास" },
          { word: "limit", meaning: "restrict", hindiMeaning: "सीमित करना" }
        ]
      }
    ],
    moral: "Don't let past failures limit your future.",
    moralHindi: "पिछली असफलताओं को अपना भविष्य सीमित मत करने दो।"
  },
  {
    id: 68,
    title: "The Grateful Lion",
    titleHindi: "कृतज्ञ शेर",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A slave escaped and hid in a cave. A lion came in with a wounded paw. The slave removed the thorn.",
        hindi: "एक गुलाम भागा और गुफा में छिप गया। एक शेर घायल पंजे के साथ अंदर आया। गुलाम ने काँटा निकाला।",
        vocabulary: [
          { word: "slave", meaning: "servant", hindiMeaning: "गुलाम" },
          { word: "wounded", meaning: "hurt", hindiMeaning: "घायल" }
        ]
      },
      {
        english: "Years later, the slave was thrown to lions in an arena. The same lion recognized him and protected him.",
        hindi: "सालों बाद, गुलाम को अखाड़े में शेरों के सामने फेंका गया। उसी शेर ने उसे पहचाना और उसकी रक्षा की।",
        vocabulary: [
          { word: "arena", meaning: "fighting ground", hindiMeaning: "अखाड़ा" },
          { word: "protected", meaning: "kept safe", hindiMeaning: "रक्षा की" }
        ]
      }
    ],
    moral: "Kindness is never forgotten.",
    moralHindi: "दया कभी नहीं भुलाई जाती।"
  },
  {
    id: 69,
    title: "The Clever Servant",
    titleHindi: "चतुर नौकर",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A master told his servant to buy the best thing in the market. The servant bought a tongue.",
        hindi: "एक मालिक ने अपने नौकर से बाज़ार में सबसे अच्छी चीज़ खरीदने को कहा। नौकर ने जीभ खरीदी।",
        vocabulary: [
          { word: "servant", meaning: "helper", hindiMeaning: "नौकर" },
          { word: "tongue", meaning: "mouth organ", hindiMeaning: "जीभ" }
        ]
      },
      {
        english: "Then he asked for the worst thing. The servant bought another tongue. 'The tongue can be best or worst,' he explained.",
        hindi: "फिर उसने सबसे बुरी चीज़ माँगी। नौकर ने एक और जीभ खरीदी। 'जीभ सबसे अच्छी या बुरी हो सकती है,' उसने समझाया।",
        vocabulary: [
          { word: "worst", meaning: "most bad", hindiMeaning: "सबसे बुरी" },
          { word: "explained", meaning: "made clear", hindiMeaning: "समझाया" }
        ]
      }
    ],
    moral: "Words can heal or hurt.",
    moralHindi: "शब्द ठीक भी कर सकते हैं और चोट भी पहुँचा सकते हैं।"
  },
  {
    id: 70,
    title: "The Honest Merchant",
    titleHindi: "ईमानदार व्यापारी",
    level: "intermediate",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A merchant found extra gold coins in a bag he bought. He returned them to the seller.",
        hindi: "एक व्यापारी को खरीदी थैली में अतिरिक्त सोने के सिक्के मिले। उसने उन्हें विक्रेता को लौटा दिया।",
        vocabulary: [
          { word: "extra", meaning: "additional", hindiMeaning: "अतिरिक्त" },
          { word: "seller", meaning: "one who sells", hindiMeaning: "विक्रेता" }
        ]
      },
      {
        english: "The seller was so impressed that he made the merchant his business partner. Honesty opened new doors.",
        hindi: "विक्रेता इतना प्रभावित हुआ कि उसने व्यापारी को अपना व्यापार साझेदार बना लिया। ईमानदारी ने नए दरवाज़े खोले।",
        vocabulary: [
          { word: "impressed", meaning: "amazed", hindiMeaning: "प्रभावित" },
          { word: "partner", meaning: "co-worker", hindiMeaning: "साझेदार" }
        ]
      }
    ],
    moral: "Honesty opens doors to success.",
    moralHindi: "ईमानदारी सफलता के दरवाज़े खोलती है।"
  },
  // ADVANCED STORIES (71-100)
  {
    id: 71,
    title: "The Philosopher's Stone",
    titleHindi: "पारस पत्थर",
    level: "advanced",
    category: "Fairy Tales",
    paragraphs: [
      {
        english: "A man searched for the philosopher's stone that could turn iron into gold. He checked thousands of stones by the sea.",
        hindi: "एक आदमी पारस पत्थर की खोज में था जो लोहे को सोने में बदल सकता था। उसने समुद्र किनारे हज़ारों पत्थर जाँचे।",
        vocabulary: [
          { word: "philosopher", meaning: "thinker", hindiMeaning: "दार्शनिक" },
          { word: "searched", meaning: "looked for", hindiMeaning: "खोजा" }
        ]
      },
      {
        english: "He developed a habit of throwing stones into the sea. When he found the real stone, he threw it away by habit!",
        hindi: "उसे पत्थर समुद्र में फेंकने की आदत हो गई। जब उसे असली पत्थर मिला, उसने आदत से इसे फेंक दिया!",
        vocabulary: [
          { word: "habit", meaning: "regular practice", hindiMeaning: "आदत" },
          { word: "developed", meaning: "formed", hindiMeaning: "विकसित की" }
        ]
      }
    ],
    moral: "Bad habits can ruin good opportunities.",
    moralHindi: "बुरी आदतें अच्छे अवसर बर्बाद कर सकती हैं।"
  },
  {
    id: 72,
    title: "The King and the Spider",
    titleHindi: "राजा और मकड़ी",
    level: "advanced",
    category: "Historical",
    paragraphs: [
      {
        english: "A defeated king hid in a cave. He watched a spider try to climb a wall. It fell six times but succeeded on the seventh.",
        hindi: "एक हारा हुआ राजा गुफा में छिपा था। उसने एक मकड़ी को दीवार पर चढ़ने की कोशिश करते देखा। वह छह बार गिरी लेकिन सातवीं बार सफल हुई।",
        vocabulary: [
          { word: "defeated", meaning: "lost", hindiMeaning: "हारा हुआ" },
          { word: "spider", meaning: "eight-legged creature", hindiMeaning: "मकड़ी" }
        ]
      },
      {
        english: "Inspired by the spider, the king gathered his army again. He fought and won his kingdom back.",
        hindi: "मकड़ी से प्रेरित होकर, राजा ने फिर से अपनी सेना इकट्ठी की। उसने लड़ाई लड़ी और अपना राज्य वापस जीता।",
        vocabulary: [
          { word: "inspired", meaning: "motivated", hindiMeaning: "प्रेरित" },
          { word: "kingdom", meaning: "king's land", hindiMeaning: "राज्य" }
        ]
      }
    ],
    moral: "Try, try again until you succeed.",
    moralHindi: "कोशिश करते रहो जब तक सफल न हो जाओ।"
  },
  {
    id: 73,
    title: "The Bamboo and the Fern",
    titleHindi: "बाँस और फर्न",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A man planted bamboo and fern seeds together. The fern grew quickly. The bamboo showed nothing for four years.",
        hindi: "एक आदमी ने बाँस और फर्न के बीज साथ लगाए। फर्न जल्दी उगा। बाँस ने चार साल तक कुछ नहीं दिखाया।",
        vocabulary: [
          { word: "bamboo", meaning: "tall grass plant", hindiMeaning: "बाँस" },
          { word: "fern", meaning: "leafy plant", hindiMeaning: "फर्न" }
        ]
      },
      {
        english: "In the fifth year, the bamboo shot up 80 feet! It was building roots underground. Success takes time to build.",
        hindi: "पाँचवें साल में, बाँस 80 फीट ऊँचा हो गया! वह ज़मीन के नीचे जड़ें बना रहा था। सफलता बनने में समय लगता है।",
        vocabulary: [
          { word: "roots", meaning: "underground parts", hindiMeaning: "जड़ें" },
          { word: "underground", meaning: "below ground", hindiMeaning: "ज़मीन के नीचे" }
        ]
      }
    ],
    moral: "Success requires patience and strong foundations.",
    moralHindi: "सफलता के लिए धैर्य और मजबूत नींव चाहिए।"
  },
  {
    id: 74,
    title: "The Cracked Pot",
    titleHindi: "फटा हुआ घड़ा",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A water bearer had two pots. One was cracked and leaked water. The cracked pot felt ashamed and useless.",
        hindi: "एक पानी ढोने वाले के पास दो घड़े थे। एक फटा हुआ था और पानी टपकता था। फटा घड़ा शर्मिंदा और बेकार महसूस करता था।",
        vocabulary: [
          { word: "cracked", meaning: "broken", hindiMeaning: "फटा हुआ" },
          { word: "ashamed", meaning: "embarrassed", hindiMeaning: "शर्मिंदा" }
        ]
      },
      {
        english: "The bearer showed him flowers growing along his path. 'I planted seeds there. Your water made them bloom.'",
        hindi: "ढोने वाले ने उसे अपने रास्ते में उगे फूल दिखाए। 'मैंने वहाँ बीज बोए थे। तुम्हारे पानी ने उन्हें खिलाया।'",
        vocabulary: [
          { word: "bloom", meaning: "flower", hindiMeaning: "खिलना" },
          { word: "path", meaning: "way", hindiMeaning: "रास्ता" }
        ]
      }
    ],
    moral: "Our flaws can become our strengths.",
    moralHindi: "हमारी कमियाँ हमारी ताकत बन सकती हैं।"
  },
  {
    id: 75,
    title: "The Two Wolves",
    titleHindi: "दो भेड़िये",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A grandfather told his grandson about two wolves fighting inside everyone. One is evil - anger, greed, jealousy. One is good - love, peace, kindness.",
        hindi: "एक दादा ने अपने पोते को हर किसी के अंदर लड़ने वाले दो भेड़ियों के बारे में बताया। एक बुरा है - गुस्सा, लालच, ईर्ष्या। एक अच्छा है - प्यार, शांति, दया।",
        vocabulary: [
          { word: "evil", meaning: "bad", hindiMeaning: "बुरा" },
          { word: "jealousy", meaning: "envy", hindiMeaning: "ईर्ष्या" }
        ]
      },
      {
        english: "The grandson asked, 'Which wolf wins?' The grandfather replied, 'The one you feed.'",
        hindi: "पोते ने पूछा, 'कौन सा भेड़िया जीतता है?' दादा ने जवाब दिया, 'जिसे तुम खिलाते हो।'",
        vocabulary: [
          { word: "wins", meaning: "succeeds", hindiMeaning: "जीतता है" },
          { word: "feed", meaning: "give food", hindiMeaning: "खिलाना" }
        ]
      }
    ],
    moral: "We become what we nurture within ourselves.",
    moralHindi: "हम वही बनते हैं जो हम अपने अंदर पालते हैं।"
  },
  {

    id: 76,
    title: "The Starfish Story",
    titleHindi: "तारामछली की कहानी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Thousands of starfish were stranded on a beach. A boy was throwing them back into the sea one by one.",
        hindi: "हज़ारों तारामछलियाँ समुद्र तट पर फँसी थीं। एक लड़का उन्हें एक-एक करके समुद्र में वापस फेंक रहा था।",
        vocabulary: [
          { word: "starfish", meaning: "sea creature", hindiMeaning: "तारामछली" },
          { word: "stranded", meaning: "stuck", hindiMeaning: "फँसी" }
        ]
      },
      {
        english: "A man said, 'You can't save them all. It doesn't matter.' The boy threw another and said, 'It matters to this one.'",
        hindi: "एक आदमी ने कहा, 'तुम सबको नहीं बचा सकते। इससे फर्क नहीं पड़ता।' लड़के ने एक और फेंकी और कहा, 'इसे फर्क पड़ता है।'",
        vocabulary: [
          { word: "save", meaning: "rescue", hindiMeaning: "बचाना" },
          { word: "matters", meaning: "is important", hindiMeaning: "फर्क पड़ता है" }
        ]
      }
    ],
    moral: "Every small act of kindness matters.",
    moralHindi: "दया का हर छोटा काम मायने रखता है।"
  },
  {
    id: 77,
    title: "The Pencil's Story",
    titleHindi: "पेंसिल की कहानी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A grandmother gave her grandson a pencil. She said, 'This pencil has five qualities you should have.'",
        hindi: "एक दादी ने अपने पोते को पेंसिल दी। उसने कहा, 'इस पेंसिल में पाँच गुण हैं जो तुम्हारे पास होने चाहिए।'",
        vocabulary: [
          { word: "pencil", meaning: "writing tool", hindiMeaning: "पेंसिल" },
          { word: "qualities", meaning: "characteristics", hindiMeaning: "गुण" }
        ]
      },
      {
        english: "You can do great things. You can correct mistakes. What's inside matters most. You leave a mark. You need sharpening through challenges.",
        hindi: "तुम महान काम कर सकते हो। तुम गलतियाँ सुधार सकते हो। अंदर क्या है वह सबसे ज़्यादा मायने रखता है। तुम निशान छोड़ते हो। तुम्हें चुनौतियों से तेज़ होना है।",
        vocabulary: [
          { word: "correct", meaning: "fix", hindiMeaning: "सुधारना" },
          { word: "challenges", meaning: "difficulties", hindiMeaning: "चुनौतियाँ" }
        ]
      }
    ],
    moral: "Life's challenges shape us into better people.",
    moralHindi: "जीवन की चुनौतियाँ हमें बेहतर इंसान बनाती हैं।"
  },
  {
    id: 78,
    title: "The Butterfly's Struggle",
    titleHindi: "तितली का संघर्ष",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A man saw a butterfly struggling to emerge from its cocoon. He cut the cocoon to help it.",
        hindi: "एक आदमी ने एक तितली को अपने कोकून से निकलने के लिए संघर्ष करते देखा। उसने मदद के लिए कोकून काट दिया।",
        vocabulary: [
          { word: "butterfly", meaning: "flying insect", hindiMeaning: "तितली" },
          { word: "cocoon", meaning: "protective covering", hindiMeaning: "कोकून" }
        ]
      },
      {
        english: "The butterfly came out easily but couldn't fly. The struggle was necessary to strengthen its wings.",
        hindi: "तितली आसानी से बाहर आ गई लेकिन उड़ नहीं सकी। संघर्ष उसके पंखों को मजबूत करने के लिए ज़रूरी था।",
        vocabulary: [
          { word: "struggle", meaning: "fight", hindiMeaning: "संघर्ष" },
          { word: "strengthen", meaning: "make strong", hindiMeaning: "मजबूत करना" }
        ]
      }
    ],
    moral: "Struggles make us stronger.",
    moralHindi: "संघर्ष हमें मजबूत बनाते हैं।"
  },
  {
    id: 79,
    title: "The Jar of Life",
    titleHindi: "जीवन का जार",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A professor filled a jar with big rocks and asked if it was full. Students said yes. He added pebbles that filled the gaps.",
        hindi: "एक प्रोफेसर ने जार को बड़े पत्थरों से भरा और पूछा क्या यह भरा है। छात्रों ने हाँ कहा। उसने कंकड़ डाले जो खाली जगह भर गए।",
        vocabulary: [
          { word: "professor", meaning: "teacher", hindiMeaning: "प्रोफेसर" },
          { word: "gaps", meaning: "empty spaces", hindiMeaning: "खाली जगह" }
        ]
      },
      {
        english: "Then he added sand, then water. 'Big rocks are important things. If you fill with sand first, there's no room for rocks.'",
        hindi: "फिर उसने रेत डाली, फिर पानी। 'बड़े पत्थर महत्वपूर्ण चीज़ें हैं। अगर पहले रेत से भरोगे, तो पत्थरों के लिए जगह नहीं होगी।'",
        vocabulary: [
          { word: "sand", meaning: "tiny particles", hindiMeaning: "रेत" },
          { word: "important", meaning: "significant", hindiMeaning: "महत्वपूर्ण" }
        ]
      }
    ],
    moral: "Prioritize what's important in life.",
    moralHindi: "जीवन में जो महत्वपूर्ण है उसे प्राथमिकता दो।"
  },
  {
    id: 80,
    title: "The Obstacle in the Path",
    titleHindi: "रास्ते में बाधा",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king placed a boulder on a road and hid to watch. Many people walked around it, complaining about the king.",
        hindi: "एक राजा ने सड़क पर एक बड़ा पत्थर रखा और देखने के लिए छिप गया। बहुत लोग इसके आसपास से गुज़रे, राजा की शिकायत करते हुए।",
        vocabulary: [
          { word: "boulder", meaning: "large rock", hindiMeaning: "बड़ा पत्थर" },
          { word: "complaining", meaning: "expressing unhappiness", hindiMeaning: "शिकायत करना" }
        ]
      },
      {
        english: "A peasant moved the boulder and found a bag of gold underneath. The king said, 'Obstacles are opportunities in disguise.'",
        hindi: "एक किसान ने पत्थर हटाया और नीचे सोने की थैली पाई। राजा ने कहा, 'बाधाएँ छिपे हुए अवसर हैं।'",
        vocabulary: [
          { word: "peasant", meaning: "farmer", hindiMeaning: "किसान" },
          { word: "disguise", meaning: "hidden form", hindiMeaning: "छिपा हुआ" }
        ]
      }
    ],
    moral: "Every obstacle is an opportunity.",
    moralHindi: "हर बाधा एक अवसर है।"
  },
  
{
    id: 81,
    title: "The Carrot, Egg, and Coffee",
    titleHindi: "गाजर, अंडा और कॉफी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A daughter complained about life's hardships. Her mother boiled a carrot, an egg, and coffee beans in separate pots.",
        hindi: "एक बेटी ने जीवन की कठिनाइयों की शिकायत की। उसकी माँ ने अलग-अलग बर्तनों में गाजर, अंडा और कॉफी बीन्स उबाले।",
        vocabulary: [
          { word: "hardships", meaning: "difficulties", hindiMeaning: "कठिनाइयाँ" },
          { word: "boiled", meaning: "heated in water", hindiMeaning: "उबाला" }
        ]
      },
      {
        english: "The carrot became soft, the egg became hard, but the coffee changed the water. 'Which will you be when facing adversity?'",
        hindi: "गाजर नरम हो गई, अंडा कठोर हो गया, लेकिन कॉफी ने पानी बदल दिया। 'मुसीबत का सामना करते समय तुम कौन बनोगी?'",
        vocabulary: [
          { word: "adversity", meaning: "hardship", hindiMeaning: "मुसीबत" },
          { word: "facing", meaning: "dealing with", hindiMeaning: "सामना करना" }
        ]
      }
    ],
    moral: "Choose to transform challenges, not be defeated by them.",
    moralHindi: "चुनौतियों को बदलने का चुनाव करो, उनसे हारने का नहीं।"
  },
  {
    id: 82,
    title: "The Wise Teacher",
    titleHindi: "बुद्धिमान शिक्षक",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "Students asked their teacher why he was always happy. He held up a glass of water and asked how heavy it was.",
        hindi: "छात्रों ने अपने शिक्षक से पूछा कि वह हमेशा खुश क्यों रहते हैं। उन्होंने पानी का गिलास उठाया और पूछा यह कितना भारी है।",
        vocabulary: [
          { word: "teacher", meaning: "instructor", hindiMeaning: "शिक्षक" },
          { word: "heavy", meaning: "having weight", hindiMeaning: "भारी" }
        ]
      },
      {
        english: "'It depends how long I hold it. A minute is fine, an hour hurts, a day is unbearable. Put down your worries before they become too heavy.'",
        hindi: "'यह इस पर निर्भर करता है कि मैं इसे कितनी देर पकड़ता हूँ। एक मिनट ठीक है, एक घंटा दर्द देता है, एक दिन असहनीय है। अपनी चिंताओं को उतार दो इससे पहले कि वे बहुत भारी हो जाएँ।'",
        vocabulary: [
          { word: "unbearable", meaning: "too much to handle", hindiMeaning: "असहनीय" },
          { word: "worries", meaning: "concerns", hindiMeaning: "चिंताएँ" }
        ]
      }
    ],
    moral: "Don't carry your burdens too long.",
    moralHindi: "अपने बोझ को बहुत देर तक मत ढोओ।"
  },
  {
    id: 83,
    title: "The Blind Girl",
    titleHindi: "अंधी लड़की",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A blind girl hated herself. She loved her boyfriend who was always there for her. She said she would marry him if she could see.",
        hindi: "एक अंधी लड़की खुद से नफरत करती थी। वह अपने प्रेमी से प्यार करती थी जो हमेशा उसके साथ था। उसने कहा अगर वह देख सकती तो उससे शादी करती।",
        vocabulary: [
          { word: "blind", meaning: "cannot see", hindiMeaning: "अंधी" },
          { word: "boyfriend", meaning: "male partner", hindiMeaning: "प्रेमी" }
        ]
      },
      {
        english: "She received eye transplants and could see. She discovered her boyfriend was also blind. He had given her his eyes.",
        hindi: "उसे आँखों का प्रत्यारोपण मिला और वह देख सकती थी। उसने पाया कि उसका प्रेमी भी अंधा था। उसने उसे अपनी आँखें दी थीं।",
        vocabulary: [
          { word: "transplants", meaning: "organ transfer", hindiMeaning: "प्रत्यारोपण" },
          { word: "discovered", meaning: "found out", hindiMeaning: "पता चला" }
        ]
      }
    ],
    moral: "True love is selfless sacrifice.",
    moralHindi: "सच्चा प्यार निस्वार्थ बलिदान है।"
  },
  {
    id: 84,
    title: "The Elephant Rope",
    titleHindi: "हाथी की रस्सी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A man saw elephants held by only a small rope. He asked the trainer why they didn't break free.",
        hindi: "एक आदमी ने देखा कि हाथी केवल छोटी रस्सी से बंधे थे। उसने प्रशिक्षक से पूछा कि वे आज़ाद क्यों नहीं होते।",
        vocabulary: [
          { word: "trainer", meaning: "one who trains", hindiMeaning: "प्रशिक्षक" },
          { word: "break free", meaning: "escape", hindiMeaning: "आज़ाद होना" }
        ]
      },
      {
        english: "'When young, the rope held them. They believe it still can.' Many people are held back by beliefs from their past.",
        hindi: "'जब छोटे थे, रस्सी उन्हें रोकती थी। वे मानते हैं कि अब भी रोक सकती है।' बहुत लोग अपने अतीत के विश्वासों से रुके रहते हैं।",
        vocabulary: [
          { word: "beliefs", meaning: "things believed", hindiMeaning: "विश्वास" },
          { word: "held back", meaning: "stopped", hindiMeaning: "रोके रहना" }
        ]
      }
    ],
    moral: "Don't let past limitations define your future.",
    moralHindi: "अतीत की सीमाओं को अपना भविष्य तय मत करने दो।"
  },
  {
    id: 85,
    title: "The Wooden Bowl",
    titleHindi: "लकड़ी का कटोरा",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "An old man lived with his son's family. His hands shook, so they gave him a wooden bowl to eat from alone.",
        hindi: "एक बूढ़ा आदमी अपने बेटे के परिवार के साथ रहता था। उसके हाथ काँपते थे, इसलिए उन्होंने उसे अकेले खाने के लिए लकड़ी का कटोरा दिया।",
        vocabulary: [
          { word: "shook", meaning: "trembled", hindiMeaning: "काँपते थे" },
          { word: "wooden", meaning: "made of wood", hindiMeaning: "लकड़ी का" }
        ]
      },
      {
        english: "One day, they saw their son making a wooden bowl. 'For you when you're old,' he said. They brought grandfather back to the table.",
        hindi: "एक दिन, उन्होंने अपने बेटे को लकड़ी का कटोरा बनाते देखा। 'तुम्हारे लिए जब तुम बूढ़े हो जाओगे,' उसने कहा। उन्होंने दादाजी को वापस मेज़ पर बुलाया।",
        vocabulary: [
          { word: "making", meaning: "creating", hindiMeaning: "बनाना" },
          { word: "grandfather", meaning: "father's father", hindiMeaning: "दादाजी" }
        ]
      }
    ],
    moral: "Children learn from what they see.",
    moralHindi: "बच्चे वही सीखते हैं जो देखते हैं।"
  },

  {
    id: 86,
    title: "The Farmer's Luck",
    titleHindi: "किसान की किस्मत",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer's horse ran away. Neighbors said, 'Bad luck!' He replied, 'Maybe.' The horse returned with wild horses. 'Good luck!' 'Maybe.'",
        hindi: "एक किसान का घोड़ा भाग गया। पड़ोसियों ने कहा, 'बुरी किस्मत!' उसने जवाब दिया, 'शायद।' घोड़ा जंगली घोड़ों के साथ लौटा। 'अच्छी किस्मत!' 'शायद।'",
        vocabulary: [
          { word: "luck", meaning: "fortune", hindiMeaning: "किस्मत" },
          { word: "wild", meaning: "untamed", hindiMeaning: "जंगली" }
        ]
      },
      {
        english: "His son broke his leg taming them. 'Bad luck!' 'Maybe.' The army came but didn't take his injured son. 'Good luck!' 'Maybe.'",
        hindi: "उसके बेटे ने उन्हें सिखाते हुए पैर तोड़ लिया। 'बुरी किस्मत!' 'शायद।' सेना आई लेकिन उसके घायल बेटे को नहीं ले गई। 'अच्छी किस्मत!' 'शायद।'",
        vocabulary: [
          { word: "taming", meaning: "training", hindiMeaning: "सिखाना" },
          { word: "injured", meaning: "hurt", hindiMeaning: "घायल" }
        ]
      }
    ],
    moral: "We never know what's truly good or bad.",
    moralHindi: "हम कभी नहीं जानते कि क्या सच में अच्छा या बुरा है।"
  },
  {
    id: 87,
    title: "The Giving Tree",
    titleHindi: "देने वाला पेड़",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A tree loved a boy. As he grew, she gave him apples to sell, branches for a house, and her trunk for a boat.",
        hindi: "एक पेड़ एक लड़के से प्यार करता था। जैसे-जैसे वह बड़ा हुआ, उसने उसे बेचने के लिए सेब दिए, घर के लिए शाखाएँ, और नाव के लिए अपना तना।",
        vocabulary: [
          { word: "branches", meaning: "tree arms", hindiMeaning: "शाखाएँ" },
          { word: "trunk", meaning: "tree body", hindiMeaning: "तना" }
        ]
      },
      {
        english: "When old, he returned. She had only a stump left. 'I just need a place to rest,' he said. She was happy to give that too.",
        hindi: "जब बूढ़ा हुआ, वह लौटा। उसके पास केवल ठूँठ बचा था। 'मुझे बस आराम करने की जगह चाहिए,' उसने कहा। वह यह देकर भी खुश थी।",
        vocabulary: [
          { word: "stump", meaning: "remaining trunk", hindiMeaning: "ठूँठ" },
          { word: "rest", meaning: "relax", hindiMeaning: "आराम" }
        ]
      }
    ],
    moral: "True love gives without expecting anything in return.",
    moralHindi: "सच्चा प्यार बदले में कुछ उम्मीद किए बिना देता है।"
  },
  {
    id: 88,
    title: "The Appointment in Samarra",
    titleHindi: "समर्रा में मुलाकात",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A servant saw Death in the market and fled to Samarra to escape. His master asked Death why she had frightened his servant.",
        hindi: "एक नौकर ने बाज़ार में मृत्यु को देखा और बचने के लिए समर्रा भाग गया। उसके मालिक ने मृत्यु से पूछा कि उसने उसके नौकर को क्यों डराया।",
        vocabulary: [
          { word: "Death", meaning: "end of life", hindiMeaning: "मृत्यु" },
          { word: "fled", meaning: "ran away", hindiMeaning: "भाग गया" }
        ]
      },
      {
        english: "Death said, 'I was surprised to see him here. I have an appointment with him tonight in Samarra.'",
        hindi: "मृत्यु ने कहा, 'मुझे उसे यहाँ देखकर आश्चर्य हुआ। आज रात समर्रा में उससे मेरी मुलाकात है।'",
        vocabulary: [
          { word: "surprised", meaning: "shocked", hindiMeaning: "आश्चर्य" },
          { word: "appointment", meaning: "meeting", hindiMeaning: "मुलाकात" }
        ]
      }
    ],
    moral: "We cannot escape our destiny.",
    moralHindi: "हम अपनी नियति से नहीं बच सकते।"
  },
  {
    id: 89,
    title: "The Stonecutter",
    titleHindi: "पत्थर तोड़ने वाला",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A stonecutter wished to be a rich man, then the sun, then a cloud, then the wind, then a mountain. Each time his wish was granted.",
        hindi: "एक पत्थर तोड़ने वाले ने अमीर बनने की इच्छा की, फिर सूरज, फिर बादल, फिर हवा, फिर पहाड़। हर बार उसकी इच्छा पूरी हुई।",
        vocabulary: [
          { word: "stonecutter", meaning: "one who cuts stone", hindiMeaning: "पत्थर तोड़ने वाला" },
          { word: "granted", meaning: "given", hindiMeaning: "पूरी हुई" }
        ]
      },
      {
        english: "As a mountain, he felt a stonecutter chipping away at him. He wished to be a stonecutter again. Be content with who you are.",
        hindi: "पहाड़ के रूप में, उसने महसूस किया कि एक पत्थर तोड़ने वाला उसे तोड़ रहा है। उसने फिर से पत्थर तोड़ने वाला बनने की इच्छा की। जो हो उसमें संतुष्ट रहो।",
        vocabulary: [
          { word: "chipping", meaning: "breaking pieces", hindiMeaning: "तोड़ना" },
          { word: "content", meaning: "satisfied", hindiMeaning: "संतुष्ट" }
        ]
      }
    ],
    moral: "Be happy with who you are.",
    moralHindi: "जो हो उसमें खुश रहो।"
  },
  {
    id: 90,
    title: "The Wise Farmer",
    titleHindi: "बुद्धिमान किसान",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer won a prize for the best corn. He shared his seeds with neighbors. People asked why he helped competitors.",
        hindi: "एक किसान ने सबसे अच्छी मक्का के लिए पुरस्कार जीता। उसने अपने बीज पड़ोसियों के साथ बाँटे। लोगों ने पूछा कि वह प्रतिस्पर्धियों की मदद क्यों करता है।",
        vocabulary: [
          { word: "prize", meaning: "award", hindiMeaning: "पुरस्कार" },
          { word: "competitors", meaning: "rivals", hindiMeaning: "प्रतिस्पर्धी" }
        ]
      },
      {
        english: "He said, 'Wind carries pollen between fields. If my neighbors grow bad corn, it affects mine. We rise together.'",
        hindi: "उसने कहा, 'हवा खेतों के बीच पराग ले जाती है। अगर मेरे पड़ोसी खराब मक्का उगाते हैं, तो यह मेरी को प्रभावित करता है। हम साथ उठते हैं।'",
        vocabulary: [
          { word: "pollen", meaning: "flower dust", hindiMeaning: "पराग" },
          { word: "affects", meaning: "influences", hindiMeaning: "प्रभावित करता है" }
        ]
      }
    ],
    moral: "Helping others helps ourselves.",
    moralHindi: "दूसरों की मदद करना खुद की मदद करना है।"
  },

  {
    id: 91,
    title: "The Empty Boat",
    titleHindi: "खाली नाव",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A man was rowing when another boat hit his. He was angry until he saw the boat was empty. His anger vanished instantly.",
        hindi: "एक आदमी नाव चला रहा था जब दूसरी नाव ने टक्कर मारी। वह गुस्सा था जब तक उसने देखा कि नाव खाली थी। उसका गुस्सा तुरंत गायब हो गया।",
        vocabulary: [
          { word: "rowing", meaning: "moving boat", hindiMeaning: "नाव चलाना" },
          { word: "vanished", meaning: "disappeared", hindiMeaning: "गायब हो गया" }
        ]
      },
      {
        english: "A wise man said, 'If you can empty your own boat, no one can oppose you.' Don't let ego control your reactions.",
        hindi: "एक बुद्धिमान व्यक्ति ने कहा, 'अगर तुम अपनी नाव खाली कर सको, तो कोई तुम्हारा विरोध नहीं कर सकता।' अहंकार को अपनी प्रतिक्रियाओं को नियंत्रित मत करने दो।",
        vocabulary: [
          { word: "ego", meaning: "self-importance", hindiMeaning: "अहंकार" },
          { word: "reactions", meaning: "responses", hindiMeaning: "प्रतिक्रियाएँ" }
        ]
      }
    ],
    moral: "Let go of ego to find peace.",
    moralHindi: "शांति पाने के लिए अहंकार छोड़ो।"
  },
  {
    id: 92,
    title: "The Parable of the Talents",
    titleHindi: "प्रतिभाओं की कहानी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A master gave three servants talents (money). Two invested and doubled theirs. One buried his out of fear.",
        hindi: "एक मालिक ने तीन नौकरों को प्रतिभाएँ (पैसे) दीं। दो ने निवेश किया और अपना दोगुना किया। एक ने डर से अपना गाड़ दिया।",
        vocabulary: [
          { word: "talents", meaning: "abilities/money", hindiMeaning: "प्रतिभाएँ" },
          { word: "invested", meaning: "put to use", hindiMeaning: "निवेश किया" }
        ]
      },
      {
        english: "The master praised the first two and took away from the third. Use your gifts or lose them.",
        hindi: "मालिक ने पहले दो की तारीफ की और तीसरे से ले लिया। अपनी प्रतिभाओं का उपयोग करो या उन्हें खो दो।",
        vocabulary: [
          { word: "praised", meaning: "complimented", hindiMeaning: "तारीफ की" },
          { word: "gifts", meaning: "abilities", hindiMeaning: "प्रतिभाएँ" }
        ]
      }
    ],
    moral: "Use your talents or lose them.",
    moralHindi: "अपनी प्रतिभाओं का उपयोग करो या उन्हें खो दो।"
  },
  {
    id: 93,
    title: "The Wise King's Test",
    titleHindi: "बुद्धिमान राजा की परीक्षा",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king wanted to choose his successor. He gave each candidate a seed and said whoever grew the best plant would be king.",
        hindi: "एक राजा अपना उत्तराधिकारी चुनना चाहता था। उसने हर उम्मीदवार को एक बीज दिया और कहा जो सबसे अच्छा पौधा उगाएगा वह राजा बनेगा।",
        vocabulary: [
          { word: "successor", meaning: "next ruler", hindiMeaning: "उत्तराधिकारी" },
          { word: "candidate", meaning: "applicant", hindiMeaning: "उम्मीदवार" }
        ]
      },
      {
        english: "One boy came with an empty pot. The king chose him. The seeds were boiled and couldn't grow. Only he was honest.",
        hindi: "एक लड़का खाली गमले के साथ आया। राजा ने उसे चुना। बीज उबाले हुए थे और उग नहीं सकते थे। केवल वह ईमानदार था।",
        vocabulary: [
          { word: "empty", meaning: "nothing inside", hindiMeaning: "खाली" },
          { word: "honest", meaning: "truthful", hindiMeaning: "ईमानदार" }
        ]
      }
    ],
    moral: "Honesty is the greatest virtue.",
    moralHindi: "ईमानदारी सबसे बड़ा गुण है।"
  },
  {
    id: 94,
    title: "The Fisherman's Wisdom",
    titleHindi: "मछुआरे की बुद्धि",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A businessman saw a fisherman relaxing after catching enough fish. He suggested the fisherman work harder to build a business empire.",
        hindi: "एक व्यापारी ने एक मछुआरे को पर्याप्त मछली पकड़ने के बाद आराम करते देखा। उसने सुझाव दिया कि मछुआरा व्यापार साम्राज्य बनाने के लिए और मेहनत करे।",
        vocabulary: [
          { word: "businessman", meaning: "trader", hindiMeaning: "व्यापारी" },
          { word: "empire", meaning: "large business", hindiMeaning: "साम्राज्य" }
        ]
      },
      {
        english: "'Then what?' asked the fisherman. 'Then you can relax!' 'But I'm already relaxing,' smiled the fisherman.",
        hindi: "'फिर क्या?' मछुआरे ने पूछा। 'फिर तुम आराम कर सकते हो!' 'लेकिन मैं पहले से आराम कर रहा हूँ,' मछुआरा मुस्कुराया।",
        vocabulary: [
          { word: "relax", meaning: "rest", hindiMeaning: "आराम करना" },
          { word: "smiled", meaning: "showed happiness", hindiMeaning: "मुस्कुराया" }
        ]
      }
    ],
    moral: "Happiness is not in the destination but in the journey.",
    moralHindi: "खुशी मंज़िल में नहीं बल्कि सफर में है।"
  },
  {
    id: 95,
    title: "The Monk and the Scorpion",
    titleHindi: "साधु और बिच्छू",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A monk saw a scorpion drowning. He tried to save it but got stung. He tried again and got stung again.",
        hindi: "एक साधु ने एक बिच्छू को डूबते देखा। उसने बचाने की कोशिश की लेकिन डंक लग गया। उसने फिर कोशिश की और फिर डंक लगा।",
        vocabulary: [
          { word: "monk", meaning: "religious person", hindiMeaning: "साधु" },
          { word: "scorpion", meaning: "stinging creature", hindiMeaning: "बिच्छू" }
        ]
      },
      {
        english: "Someone asked why he kept trying. He said, 'It's the scorpion's nature to sting. It's my nature to save.'",
        hindi: "किसी ने पूछा वह क्यों कोशिश करता रहा। उसने कहा, 'बिच्छू का स्वभाव डंक मारना है। मेरा स्वभाव बचाना है।'",
        vocabulary: [
          { word: "nature", meaning: "character", hindiMeaning: "स्वभाव" },
          { word: "save", meaning: "rescue", hindiMeaning: "बचाना" }
        ]
      }
    ],
    moral: "Don't change your good nature because of others.",
    moralHindi: "दूसरों की वजह से अपना अच्छा स्वभाव मत बदलो।"
  },
 
 {
    id: 96,
    title: "The Wise Woman's Stone",
    titleHindi: "बुद्धिमान महिला का पत्थर",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A wise woman found a precious stone. A hungry traveler asked for food. She gave him the stone instead.",
        hindi: "एक बुद्धिमान महिला को कीमती पत्थर मिला। एक भूखे यात्री ने खाना माँगा। उसने उसे बदले में पत्थर दे दिया।",
        vocabulary: [
          { word: "precious", meaning: "valuable", hindiMeaning: "कीमती" },
          { word: "traveler", meaning: "one who travels", hindiMeaning: "यात्री" }
        ]
      },
      {
        english: "He returned the next day. 'Give me something more precious - the wisdom that let you give this away.'",
        hindi: "वह अगले दिन लौटा। 'मुझे कुछ और कीमती दो - वह बुद्धि जिसने तुम्हें यह देने दिया।'",
        vocabulary: [
          { word: "returned", meaning: "came back", hindiMeaning: "लौटा" },
          { word: "wisdom", meaning: "knowledge", hindiMeaning: "बुद्धि" }
        ]
      }
    ],
    moral: "Wisdom is more valuable than wealth.",
    moralHindi: "बुद्धि धन से अधिक मूल्यवान है।"
  },
  {
    id: 97,
    title: "The Farmer and the Stork",
    titleHindi: "किसान और सारस",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A farmer set traps for cranes eating his crops. He caught a stork among them. The stork begged for mercy.",
        hindi: "एक किसान ने अपनी फसल खाने वाले सारसों के लिए जाल बिछाया। उसने उनमें एक सारस पकड़ा। सारस ने दया की भीख माँगी।",
        vocabulary: [
          { word: "traps", meaning: "catching devices", hindiMeaning: "जाल" },
          { word: "cranes", meaning: "tall birds", hindiMeaning: "सारस" }
        ]
      },
      {
        english: "'I'm not a crane, I'm a stork!' The farmer said, 'You were with bad company. You share their fate.'",
        hindi: "'मैं सारस नहीं हूँ, मैं बगुला हूँ!' किसान ने कहा, 'तुम बुरी संगत में थे। तुम उनकी किस्मत साझा करते हो।'",
        vocabulary: [
          { word: "company", meaning: "companions", hindiMeaning: "संगत" },
          { word: "fate", meaning: "destiny", hindiMeaning: "किस्मत" }
        ]
      }
    ],
    moral: "You are judged by the company you keep.",
    moralHindi: "तुम्हें तुम्हारी संगत से आँका जाता है।"
  },
  {
    id: 98,
    title: "The Clever Merchant",
    titleHindi: "चतुर व्यापारी",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A merchant's ship sank. He lost everything. Instead of crying, he started selling the story of his loss.",
        hindi: "एक व्यापारी का जहाज़ डूब गया। उसने सब कुछ खो दिया। रोने के बजाय, उसने अपने नुकसान की कहानी बेचना शुरू किया।",
        vocabulary: [
          { word: "sank", meaning: "went underwater", hindiMeaning: "डूब गया" },
          { word: "loss", meaning: "what was lost", hindiMeaning: "नुकसान" }
        ]
      },
      {
        english: "People paid to hear his tale. He became rich again. He turned his tragedy into opportunity.",
        hindi: "लोगों ने उसकी कहानी सुनने के लिए पैसे दिए। वह फिर से अमीर हो गया। उसने अपनी त्रासदी को अवसर में बदल दिया।",
        vocabulary: [
          { word: "tragedy", meaning: "sad event", hindiMeaning: "त्रासदी" },
          { word: "opportunity", meaning: "chance", hindiMeaning: "अवसर" }
        ]
      }
    ],
    moral: "Every setback can become a comeback.",
    moralHindi: "हर असफलता वापसी बन सकती है।"
  },
  {
    id: 99,
    title: "The King's Painting",
    titleHindi: "राजा की पेंटिंग",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A king with one eye and one leg asked artists to paint him. Most showed his disabilities. He rejected them all.",
        hindi: "एक आँख और एक पैर वाले राजा ने कलाकारों से अपनी तस्वीर बनाने को कहा। ज़्यादातर ने उसकी अक्षमताएँ दिखाईं। उसने सबको अस्वीकार कर दिया।",
        vocabulary: [
          { word: "disabilities", meaning: "physical limitations", hindiMeaning: "अक्षमताएँ" },
          { word: "rejected", meaning: "refused", hindiMeaning: "अस्वीकार किया" }
        ]
      },
      {
        english: "One artist painted him hunting, one eye closed to aim, one leg bent on horseback. The king loved it.",
        hindi: "एक कलाकार ने उसे शिकार करते हुए चित्रित किया, निशाना लगाने के लिए एक आँख बंद, घोड़े पर एक पैर मुड़ा हुआ। राजा को यह पसंद आया।",
        vocabulary: [
          { word: "hunting", meaning: "chasing animals", hindiMeaning: "शिकार" },
          { word: "aim", meaning: "target", hindiMeaning: "निशाना" }
        ]
      }
    ],
    moral: "Focus on strengths, not weaknesses.",
    moralHindi: "कमज़ोरियों पर नहीं, ताकतों पर ध्यान दो।"
  },
  {
    id: 100,
    title: "The Last Lesson",
    titleHindi: "आखिरी सबक",
    level: "advanced",
    category: "Moral Stories",
    paragraphs: [
      {
        english: "A dying teacher asked his students what they had learned. Each shared a lesson. He smiled and said, 'You learned to learn. That's enough.'",
        hindi: "एक मरते हुए शिक्षक ने अपने छात्रों से पूछा कि उन्होंने क्या सीखा। हर एक ने एक सबक साझा किया। वह मुस्कुराया और बोला, 'तुमने सीखना सीखा। यह काफी है।'",
        vocabulary: [
          { word: "dying", meaning: "near death", hindiMeaning: "मरते हुए" },
          { word: "lesson", meaning: "teaching", hindiMeaning: "सबक" }
        ]
      },
      {
        english: "The greatest gift is not knowledge but the love of learning. Keep learning throughout your life.",
        hindi: "सबसे बड़ा उपहार ज्ञान नहीं बल्कि सीखने का प्यार है। जीवन भर सीखते रहो।",
        vocabulary: [
          { word: "gift", meaning: "present", hindiMeaning: "उपहार" },
          { word: "throughout", meaning: "all through", hindiMeaning: "पूरे" }
        ]
      }
    ],
    moral: "Never stop learning.",
    moralHindi: "सीखना कभी बंद मत करो।"
  }
];

export const storyCategories = [
  "All Stories",
  "Moral Stories",
  "Fairy Tales",
  "Historical"
];

export const getStoriesByLevel = (level: Story["level"]) => 
  stories.filter(s => s.level === level);

export const getStoriesByCategory = (category: string) => 
  category === "All Stories" ? stories : stories.filter(s => s.category === category);
