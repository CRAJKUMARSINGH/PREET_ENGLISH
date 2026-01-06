import { useState } from "react";
import { Volume2, Mic, RotateCcw, ChevronRight, Eye, EyeOff, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationLine {
  id: string;
  speaker: "A" | "B";
  english: string;
  hindi: string;
  emoji: string;
}

interface ConversationTopic {
  id: string;
  title: string;
  hindiTitle: string;
  emoji: string;
  difficulty: "Easy" | "Medium" | "Hard";
  conversation: ConversationLine[];
}

const conversationTopics: ConversationTopic[] = [
  {
    id: "daily_routine",
    title: "Daily Routine",
    hindiTitle: "दैनिक दिनचर्या",
    emoji: "⏰",
    difficulty: "Easy",
    conversation: [
      { id: "1", speaker: "A", english: "What time do you wake up?", hindi: "आप कितने बजे उठते हैं?", emoji: "🕕" },
      { id: "2", speaker: "B", english: "I wake up at 6 AM every day.", hindi: "मैं हर रोज सुबह 6 बजे उठता हूं।", emoji: "⏰" },
      { id: "3", speaker: "A", english: "What's your morning routine?", hindi: "आपकी सुबह की दिनचर्या क्या है?", emoji: "🌅" },
      { id: "4", speaker: "B", english: "First, I brush my teeth, then take a shower, and have breakfast.", hindi: "पहले मैं दांत साफ करता हूं, फिर नहाता हूं, और नाश्ता करता हूं।", emoji: "🪥" },
      { id: "5", speaker: "A", english: "What do you have for breakfast?", hindi: "आप नाश्ते में क्या खाते हैं?", emoji: "🍳" },
      { id: "6", speaker: "B", english: "I usually have toast with eggs and a cup of tea.", hindi: "मैं आमतौर पर अंडे के साथ टोस्ट और एक कप चाय लेता हूं।", emoji: "☕" }
    ]
  },
  {
    id: "restaurant",
    title: "At the Restaurant",
    hindiTitle: "रेस्टोरेंट में",
    emoji: "🍽️",
    difficulty: "Easy",
    conversation: [
      { id: "1", speaker: "A", english: "Good evening! Table for two, please.", hindi: "शुभ संध्या! दो लोगों के लिए टेबल चाहिए।", emoji: "👋" },
      { id: "2", speaker: "B", english: "Of course! Please follow me.", hindi: "जी बिल्कुल! कृपया मेरे पीछे आइए।", emoji: "🚶" },
      { id: "3", speaker: "A", english: "Can I see the menu, please?", hindi: "क्या मैं मेन्यू देख सकता हूं?", emoji: "📋" },
      { id: "4", speaker: "B", english: "Here you go. Today's special is butter chicken.", hindi: "यह लीजिए। आज का स्पेशल बटर चिकन है।", emoji: "🍗" },
      { id: "5", speaker: "A", english: "I'll have the butter chicken with naan.", hindi: "मुझे बटर चिकन नान के साथ दीजिए।", emoji: "🫓" },
      { id: "6", speaker: "B", english: "Excellent choice! Anything to drink?", hindi: "बहुत अच्छा चुनाव! कुछ पीने के लिए?", emoji: "🥤" }
    ]
  },
  {
    id: "shopping",
    title: "Shopping for Clothes",
    hindiTitle: "कपड़ों की खरीदारी",
    emoji: "🛍️",
    difficulty: "Easy",
    conversation: [
      { id: "1", speaker: "A", english: "Excuse me, do you have this shirt in medium size?", hindi: "माफ कीजिए, क्या यह शर्ट मीडियम साइज में है?", emoji: "👕" },
      { id: "2", speaker: "B", english: "Let me check. Yes, we have it in blue and white.", hindi: "मैं देखता हूं। हां, यह नीले और सफेद रंग में है।", emoji: "🔵" },
      { id: "3", speaker: "A", english: "Can I try the blue one?", hindi: "क्या मैं नीला वाला ट्राई कर सकता हूं?", emoji: "👔" },
      { id: "4", speaker: "B", english: "Sure! The trial room is on your right.", hindi: "जी बिल्कुल! ट्रायल रूम आपके दाईं तरफ है।", emoji: "🚪" },
      { id: "5", speaker: "A", english: "How much does it cost?", hindi: "इसकी कीमत क्या है?", emoji: "💰" },
      { id: "6", speaker: "B", english: "It's 999 rupees. We have a 20% discount today.", hindi: "यह 999 रुपये का है। आज 20% छूट है।", emoji: "🏷️" }
    ]
  },
  {
    id: "job_interview",
    title: "Job Interview",
    hindiTitle: "नौकरी का इंटरव्यू",
    emoji: "💼",
    difficulty: "Medium",
    conversation: [
      { id: "1", speaker: "A", english: "Good morning! Please have a seat.", hindi: "सुप्रभात! कृपया बैठिए।", emoji: "🪑" },
      { id: "2", speaker: "B", english: "Thank you. Good morning, sir.", hindi: "धन्यवाद। सुप्रभात, सर।", emoji: "🙏" },
      { id: "3", speaker: "A", english: "Tell me about yourself.", hindi: "अपने बारे में बताइए।", emoji: "🗣️" },
      { id: "4", speaker: "B", english: "I'm a software engineer with 3 years of experience.", hindi: "मैं 3 साल के अनुभव वाला सॉफ्टवेयर इंजीनियर हूं।", emoji: "💻" },
      { id: "5", speaker: "A", english: "Why do you want to join our company?", hindi: "आप हमारी कंपनी में क्यों आना चाहते हैं?", emoji: "🏢" },
      { id: "6", speaker: "B", english: "I admire your company's innovative work culture.", hindi: "मुझे आपकी कंपनी की नवीन कार्य संस्कृति पसंद है।", emoji: "⭐" }
    ]
  },
  {
    id: "doctor_visit",
    title: "At the Doctor's",
    hindiTitle: "डॉक्टर के पास",
    emoji: "🏥",
    difficulty: "Medium",
    conversation: [
      { id: "1", speaker: "A", english: "Good morning, doctor.", hindi: "सुप्रभात, डॉक्टर साहब।", emoji: "👨‍⚕️" },
      { id: "2", speaker: "B", english: "Good morning! What seems to be the problem?", hindi: "सुप्रभात! क्या तकलीफ है?", emoji: "🩺" },
      { id: "3", speaker: "A", english: "I have a headache and fever since yesterday.", hindi: "कल से मुझे सिरदर्द और बुखार है।", emoji: "🤒" },
      { id: "4", speaker: "B", english: "Let me check your temperature.", hindi: "मैं आपका तापमान देखता हूं।", emoji: "🌡️" },
      { id: "5", speaker: "A", english: "Should I take any medicine?", hindi: "क्या मुझे कोई दवाई लेनी चाहिए?", emoji: "💊" },
      { id: "6", speaker: "B", english: "Yes, take this medicine twice a day after meals.", hindi: "हां, यह दवाई दिन में दो बार खाने के बाद लें।", emoji: "💊" }
    ]
  },
  {
    id: "airport",
    title: "At the Airport",
    hindiTitle: "एयरपोर्ट पर",
    emoji: "✈️",
    difficulty: "Medium",
    conversation: [
      { id: "1", speaker: "A", english: "I'd like to check in for my flight to Mumbai.", hindi: "मुझे मुंबई की फ्लाइट के लिए चेक-इन करना है।", emoji: "🎫" },
      { id: "2", speaker: "B", english: "May I see your passport and ticket, please?", hindi: "कृपया अपना पासपोर्ट और टिकट दिखाइए।", emoji: "🛂" },
      { id: "3", speaker: "A", english: "Here you go. Can I get a window seat?", hindi: "यह लीजिए। क्या मुझे खिड़की वाली सीट मिल सकती है?", emoji: "🪟" },
      { id: "4", speaker: "B", english: "Yes, seat 12A is available. Any checked baggage?", hindi: "हां, सीट 12A उपलब्ध है। कोई चेक्ड बैगेज?", emoji: "🧳" },
      { id: "5", speaker: "A", english: "Just one suitcase.", hindi: "बस एक सूटकेस।", emoji: "🧳" },
      { id: "6", speaker: "B", english: "Your boarding gate is B7. Boarding starts at 2 PM.", hindi: "आपका बोर्डिंग गेट B7 है। बोर्डिंग 2 बजे शुरू होगी।", emoji: "🚪" }
    ]
  }
];

export function ConversationPractice() {
  const [selectedTopic, setSelectedTopic] = useState<ConversationTopic | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showHindi, setShowHindi] = useState<Set<string>>(new Set());
  const [showAllHindi, setShowAllHindi] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleHindi = (lineId: string) => {
    const newSet = new Set(showHindi);
    if (newSet.has(lineId)) {
      newSet.delete(lineId);
    } else {
      newSet.add(lineId);
    }
    setShowHindi(newSet);
  };

  const resetConversation = () => {
    setCurrentLineIndex(0);
    setShowHindi(new Set());
    setShowAllHindi(false);
  };

  const nextLine = () => {
    if (selectedTopic && currentLineIndex < selectedTopic.conversation.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Mic className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Conversation Practice</h2>
              <p className="text-purple-100">बातचीत का अभ्यास - Real-life dialogues</p>
            </div>
          </div>
          <p className="text-sm text-purple-100 mt-2">
            💡 टैप करके हिंदी अनुवाद देखें। बोलने के लिए स्पीकर आइकन दबाएं।
          </p>
        </div>

        {/* Topic Selection */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
            🎯 Select a conversation topic:
          </h3>
          {conversationTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                resetConversation();
              }}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.emoji}</span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{topic.title}</h4>
                  <p className="text-sm text-muted-foreground">{topic.hindiTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  topic.difficulty === "Easy" && "bg-green-100 text-green-700",
                  topic.difficulty === "Medium" && "bg-yellow-100 text-yellow-700",
                  topic.difficulty === "Hard" && "bg-red-100 text-red-700"
                )}>
                  {topic.difficulty === "Easy" ? "😊" : topic.difficulty === "Medium" ? "🙂" : "🧠"} {topic.difficulty}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedTopic(null)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ←
            </button>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {selectedTopic.emoji} {selectedTopic.title}
              </h2>
              <p className="text-purple-100 text-sm">{selectedTopic.hindiTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllHindi(!showAllHindi)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={showAllHindi ? "Hide all Hindi" : "Show all Hindi"}
            >
              {showAllHindi ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              onClick={resetConversation}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{currentLineIndex + 1} / {selectedTopic.conversation.length}</span>
          </div>
          <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${((currentLineIndex + 1) / selectedTopic.conversation.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {selectedTopic.conversation.slice(0, currentLineIndex + 1).map((line) => (
          <div
            key={line.id}
            className={cn(
              "flex",
              line.speaker === "A" ? "justify-start" : "justify-end"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] px-4 py-3 rounded-2xl cursor-pointer transition-all",
                line.speaker === "A"
                  ? "bg-slate-100 dark:bg-slate-800 rounded-bl-sm"
                  : "bg-blue-500 text-white rounded-br-sm"
              )}
              onClick={() => toggleHindi(line.id)}
            >
              {/* Speaker & Audio */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span>{line.emoji}</span>
                  <span className="text-xs font-medium opacity-70">
                    {line.speaker === "A" ? "Person A" : "Person B"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(line.english);
                  }}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    line.speaker === "A" 
                      ? "hover:bg-slate-200 dark:hover:bg-slate-700" 
                      : "hover:bg-blue-600"
                  )}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* English Text */}
              <p className="text-base leading-relaxed">{line.english}</p>

              {/* Hindi Translation */}
              {(showAllHindi || showHindi.has(line.id)) && (
                <p className={cn(
                  "text-sm mt-2 pt-2 border-t",
                  line.speaker === "A" 
                    ? "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400" 
                    : "border-blue-400 text-blue-100"
                )}>
                  {line.hindi}
                </p>
              )}

              {/* Hint */}
              <p className="text-xs mt-1 opacity-50">
                {(showAllHindi || showHindi.has(line.id)) ? "टैप करें छिपाने के लिए" : "टैप करें हिंदी देखने के लिए"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentLineIndex(Math.max(0, currentLineIndex - 1))}
            disabled={currentLineIndex === 0}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← पिछला
          </button>
          
          {currentLineIndex < selectedTopic.conversation.length - 1 ? (
            <button
              onClick={nextLine}
              className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              अगला →
            </button>
          ) : (
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-6 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              ✅ पूरा हुआ!
            </button>
          )}
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          <p className="text-xs">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  );
}
