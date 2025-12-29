import { useState } from "react";
import { Volume2, BookOpen, Star, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabularyWord {
  english: string;
  hindi: string;
  emoji: string;
  pronunciation: string;
  example?: string;
}

interface VocabularyCategory {
  id: string;
  title: string;
  hindiTitle: string;
  emoji: string;
  words: VocabularyWord[];
}

const vocabularyData: VocabularyCategory[] = [
  {
    id: "daily_routine",
    title: "Daily Routine",
    hindiTitle: "दैनिक दिनचर्या",
    emoji: "⏰",
    words: [
      { english: "wake up", hindi: "उठना", emoji: "⏰", pronunciation: "uth-na", example: "I wake up at 6 AM." },
      { english: "brush teeth", hindi: "दांत साफ करना", emoji: "🪥", pronunciation: "daant saaf karna", example: "I brush my teeth twice a day." },
      { english: "take shower", hindi: "नहाना", emoji: "🚿", pronunciation: "nahana", example: "I take a shower every morning." },
      { english: "have breakfast", hindi: "नाश्ता करना", emoji: "🍳", pronunciation: "nashta karna", example: "I have breakfast at 8 AM." },
      { english: "go to work", hindi: "काम पर जाना", emoji: "💼", pronunciation: "kaam par jaana", example: "I go to work by bus." },
      { english: "come back home", hindi: "घर वापस आना", emoji: "🏠", pronunciation: "ghar waapas aana", example: "I come back home at 6 PM." },
      { english: "have dinner", hindi: "रात का खाना", emoji: "🍽️", pronunciation: "raat ka khana", example: "We have dinner together." },
      { english: "go to sleep", hindi: "सोना", emoji: "😴", pronunciation: "sona", example: "I go to sleep at 10 PM." }
    ]
  },
  {
    id: "family",
    title: "Family Members",
    hindiTitle: "परिवार के सदस्य",
    emoji: "👨‍👩‍👧‍👦",
    words: [
      { english: "father", hindi: "पिता", emoji: "👨", pronunciation: "pita", example: "My father is a teacher." },
      { english: "mother", hindi: "माता/मां", emoji: "👩", pronunciation: "maata/maan", example: "My mother cooks delicious food." },
      { english: "brother", hindi: "भाई", emoji: "👦", pronunciation: "bhai", example: "I have one brother." },
      { english: "sister", hindi: "बहन", emoji: "👧", pronunciation: "behen", example: "My sister is younger than me." },
      { english: "grandfather", hindi: "दादा/नाना", emoji: "👴", pronunciation: "daada/naana", example: "My grandfather tells great stories." },
      { english: "grandmother", hindi: "दादी/नानी", emoji: "👵", pronunciation: "daadi/naani", example: "My grandmother makes the best chai." },
      { english: "uncle", hindi: "चाचा/मामा", emoji: "👨", pronunciation: "chacha/mama", example: "My uncle lives in Delhi." },
      { english: "aunt", hindi: "चाची/मामी", emoji: "👩", pronunciation: "chachi/mami", example: "My aunt is very kind." }
    ]
  },
  {
    id: "shopping",
    title: "Shopping",
    hindiTitle: "खरीदारी",
    emoji: "🛍️",
    words: [
      { english: "How much?", hindi: "कितने का है?", emoji: "💰", pronunciation: "kitne ka hai?", example: "How much is this shirt?" },
      { english: "discount", hindi: "छूट", emoji: "🏷️", pronunciation: "chhoot", example: "Is there any discount?" },
      { english: "bill", hindi: "बिल", emoji: "🧾", pronunciation: "bill", example: "Can I have the bill please?" },
      { english: "cash", hindi: "नकद", emoji: "💵", pronunciation: "nakad", example: "I will pay by cash." },
      { english: "card", hindi: "कार्ड", emoji: "💳", pronunciation: "card", example: "Do you accept card?" },
      { english: "size", hindi: "साइज़", emoji: "📏", pronunciation: "size", example: "What size do you need?" },
      { english: "try on", hindi: "पहन कर देखना", emoji: "👕", pronunciation: "pahan kar dekhna", example: "Can I try this on?" },
      { english: "exchange", hindi: "बदलना", emoji: "🔄", pronunciation: "badalna", example: "Can I exchange this?" }
    ]
  },
  {
    id: "restaurant",
    title: "Restaurant",
    hindiTitle: "रेस्टोरेंट",
    emoji: "🍽️",
    words: [
      { english: "menu", hindi: "मेन्यू", emoji: "📋", pronunciation: "menu", example: "Can I see the menu?" },
      { english: "order", hindi: "ऑर्डर", emoji: "📝", pronunciation: "order", example: "I would like to order." },
      { english: "waiter", hindi: "वेटर", emoji: "🧑‍🍳", pronunciation: "waiter", example: "Excuse me, waiter!" },
      { english: "spicy", hindi: "तीखा", emoji: "🌶️", pronunciation: "teekha", example: "Not too spicy please." },
      { english: "sweet", hindi: "मीठा", emoji: "🍬", pronunciation: "meetha", example: "I want something sweet." },
      { english: "water", hindi: "पानी", emoji: "💧", pronunciation: "paani", example: "Can I have some water?" },
      { english: "bill please", hindi: "बिल दीजिए", emoji: "🧾", pronunciation: "bill dijiye", example: "Bill please!" },
      { english: "delicious", hindi: "स्वादिष्ट", emoji: "😋", pronunciation: "swaadisht", example: "The food was delicious!" }
    ]
  },
  {
    id: "travel",
    title: "Travel & Transport",
    hindiTitle: "यात्रा और परिवहन",
    emoji: "✈️",
    words: [
      { english: "ticket", hindi: "टिकट", emoji: "🎫", pronunciation: "ticket", example: "One ticket to Mumbai please." },
      { english: "platform", hindi: "प्लेटफॉर्म", emoji: "🚉", pronunciation: "platform", example: "Which platform?" },
      { english: "airport", hindi: "हवाई अड्डा", emoji: "✈️", pronunciation: "hawai adda", example: "Take me to the airport." },
      { english: "luggage", hindi: "सामान", emoji: "🧳", pronunciation: "saamaan", example: "Where is my luggage?" },
      { english: "passport", hindi: "पासपोर्ट", emoji: "🛂", pronunciation: "passport", example: "Here is my passport." },
      { english: "boarding pass", hindi: "बोर्डिंग पास", emoji: "🎟️", pronunciation: "boarding pass", example: "Show your boarding pass." },
      { english: "delay", hindi: "देरी", emoji: "⏰", pronunciation: "deri", example: "The flight is delayed." },
      { english: "arrival", hindi: "आगमन", emoji: "🛬", pronunciation: "aagman", example: "What is the arrival time?" }
    ]
  },
  {
    id: "health",
    title: "Health & Emergency",
    hindiTitle: "स्वास्थ्य और आपातकाल",
    emoji: "🏥",
    words: [
      { english: "doctor", hindi: "डॉक्टर", emoji: "👨‍⚕️", pronunciation: "doctor", example: "I need to see a doctor." },
      { english: "medicine", hindi: "दवाई", emoji: "💊", pronunciation: "dawai", example: "Take this medicine twice a day." },
      { english: "fever", hindi: "बुखार", emoji: "🤒", pronunciation: "bukhaar", example: "I have a fever." },
      { english: "headache", hindi: "सिरदर्द", emoji: "🤕", pronunciation: "sirdard", example: "I have a headache." },
      { english: "hospital", hindi: "अस्पताल", emoji: "🏥", pronunciation: "aspataal", example: "Where is the nearest hospital?" },
      { english: "emergency", hindi: "आपातकाल", emoji: "🚨", pronunciation: "aapaatkaal", example: "This is an emergency!" },
      { english: "ambulance", hindi: "एम्बुलेंस", emoji: "🚑", pronunciation: "ambulance", example: "Call an ambulance!" },
      { english: "pharmacy", hindi: "दवाखाना", emoji: "💊", pronunciation: "dawakhaana", example: "Is there a pharmacy nearby?" }
    ]
  }
];

export function VocabularyBuilder() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("daily_routine");
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleLearned = (wordId: string) => {
    const newLearned = new Set(learnedWords);
    if (newLearned.has(wordId)) {
      newLearned.delete(wordId);
    } else {
      newLearned.add(wordId);
    }
    setLearnedWords(newLearned);
  };

  const totalWords = vocabularyData.reduce((acc, cat) => acc + cat.words.length, 0);
  const learnedCount = learnedWords.size;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Vocabulary Builder</h2>
            <p className="text-blue-100">शब्दावली निर्माता</p>
          </div>
        </div>
        
        {/* Progress */}
        <div className="bg-white/20 rounded-xl p-3">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{learnedCount} / {totalWords} words</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(learnedCount / totalWords) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {vocabularyData.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.hindiTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{category.words.length} words</span>
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Words List */}
            {expandedCategory === category.id && (
              <div className="px-4 pb-4 space-y-2">
                {category.words.map((word, index) => {
                  const wordId = `${category.id}-${index}`;
                  const isLearned = learnedWords.has(wordId);
                  
                  return (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-xl border transition-all",
                        isLearned 
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{word.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 dark:text-white">{word.english}</span>
                              <button 
                                onClick={() => speakWord(word.english)}
                                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                              >
                                <Volume2 className="w-4 h-4 text-blue-500" />
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground">{word.hindi}</p>
                            <p className="text-xs text-slate-400 italic">({word.pronunciation})</p>
                            {word.example && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 bg-white dark:bg-slate-900 px-2 py-1 rounded">
                                "{word.example}"
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleLearned(wordId)}
                          className={cn(
                            "p-2 rounded-full transition-all",
                            isLearned 
                              ? "bg-green-500 text-white" 
                              : "bg-slate-200 dark:bg-slate-700 text-slate-400 hover:bg-yellow-100 hover:text-yellow-500"
                          )}
                        >
                          <Star className={cn("w-4 h-4", isLearned && "fill-current")} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
