import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Volume2, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface DailyPhrase {
  id: number;
  phrase: string;
  hindi: string;
  meaning: string;
  meaningHindi: string;
  usage: string;
  usageHindi: string;
  category: string;
}

const dailyPhrases: DailyPhrase[] = [
  // Greetings
  { id: 1, phrase: "How do you do?", hindi: "आप कैसे हैं?", meaning: "Formal greeting", meaningHindi: "औपचारिक अभिवादन", usage: "Used when meeting someone for the first time.", usageHindi: "पहली बार किसी से मिलने पर उपयोग होता है।", category: "Greetings" },
  { id: 2, phrase: "Nice to meet you", hindi: "आपसे मिलकर खुशी हुई", meaning: "Polite introduction", meaningHindi: "विनम्र परिचय", usage: "Said when introduced to someone new.", usageHindi: "किसी नए व्यक्ति से परिचय होने पर कहा जाता है।", category: "Greetings" },
  { id: 3, phrase: "Take care", hindi: "अपना ख्याल रखना", meaning: "Farewell expression", meaningHindi: "विदाई का भाव", usage: "Said when saying goodbye.", usageHindi: "अलविदा कहते समय कहा जाता है।", category: "Greetings" },
  // Daily Conversation
  { id: 4, phrase: "I beg your pardon", hindi: "क्षमा कीजिए", meaning: "Polite way to ask for repetition", meaningHindi: "दोहराने के लिए विनम्र तरीका", usage: "When you didn't hear something clearly.", usageHindi: "जब आपने कुछ स्पष्ट नहीं सुना।", category: "Conversation" },
  { id: 5, phrase: "Could you please...", hindi: "क्या आप कृपया...", meaning: "Polite request", meaningHindi: "विनम्र अनुरोध", usage: "When asking someone to do something.", usageHindi: "किसी से कुछ करने के लिए कहते समय।", category: "Conversation" },
  { id: 6, phrase: "I appreciate it", hindi: "मैं इसकी सराहना करता हूँ", meaning: "Expressing gratitude", meaningHindi: "आभार व्यक्त करना", usage: "When thanking someone for their help.", usageHindi: "किसी की मदद के लिए धन्यवाद देते समय।", category: "Conversation" },
  // Office/Work
  { id: 7, phrase: "I'll get back to you", hindi: "मैं आपको बाद में बताऊंगा", meaning: "Promise to respond later", meaningHindi: "बाद में जवाब देने का वादा", usage: "When you need time to respond.", usageHindi: "जब आपको जवाब देने के लिए समय चाहिए।", category: "Office" },
  { id: 8, phrase: "Let me know", hindi: "मुझे बताइए", meaning: "Request for information", meaningHindi: "जानकारी के लिए अनुरोध", usage: "Asking someone to inform you.", usageHindi: "किसी से आपको सूचित करने के लिए कहना।", category: "Office" },
  { id: 9, phrase: "As per your request", hindi: "आपके अनुरोध के अनुसार", meaning: "According to what was asked", meaningHindi: "जो माँगा गया था उसके अनुसार", usage: "In formal emails and letters.", usageHindi: "औपचारिक ईमेल और पत्रों में।", category: "Office" },
  // Idioms
  { id: 10, phrase: "Break a leg", hindi: "शुभकामनाएं", meaning: "Good luck", meaningHindi: "शुभकामनाएं", usage: "Wishing someone success before a performance.", usageHindi: "किसी प्रदर्शन से पहले सफलता की कामना।", category: "Idioms" },
  { id: 11, phrase: "Piece of cake", hindi: "बहुत आसान", meaning: "Very easy", meaningHindi: "बहुत आसान", usage: "When something is simple to do.", usageHindi: "जब कुछ करना आसान हो।", category: "Idioms" },
  { id: 12, phrase: "Hit the nail on the head", hindi: "बिल्कुल सही कहा", meaning: "Exactly right", meaningHindi: "बिल्कुल सही", usage: "When someone says something perfectly accurate.", usageHindi: "जब कोई बिल्कुल सही बात कहे।", category: "Idioms" },
  // Polite Expressions
  { id: 13, phrase: "Excuse me", hindi: "माफ कीजिए", meaning: "Polite interruption", meaningHindi: "विनम्र बाधा", usage: "To get attention or apologize for interrupting.", usageHindi: "ध्यान आकर्षित करने या बाधा के लिए माफी।", category: "Polite" },
  { id: 14, phrase: "I'm sorry to bother you", hindi: "परेशान करने के लिए माफी", meaning: "Apologizing for disturbance", meaningHindi: "परेशानी के लिए माफी", usage: "Before asking for help.", usageHindi: "मदद माँगने से पहले।", category: "Polite" },
  { id: 15, phrase: "Would you mind...", hindi: "क्या आपको आपत्ति होगी...", meaning: "Polite request", meaningHindi: "विनम्र अनुरोध", usage: "Very polite way to ask for something.", usageHindi: "कुछ माँगने का बहुत विनम्र तरीका।", category: "Polite" },
  // Shopping
  { id: 16, phrase: "How much does it cost?", hindi: "इसकी कीमत क्या है?", meaning: "Asking price", meaningHindi: "कीमत पूछना", usage: "When shopping.", usageHindi: "खरीदारी करते समय।", category: "Shopping" },
  { id: 17, phrase: "Can I try this on?", hindi: "क्या मैं इसे पहनकर देख सकता हूँ?", meaning: "Request to try clothes", meaningHindi: "कपड़े पहनने का अनुरोध", usage: "In clothing stores.", usageHindi: "कपड़ों की दुकान में।", category: "Shopping" },
  { id: 18, phrase: "Do you have this in a different size?", hindi: "क्या यह दूसरे साइज में है?", meaning: "Asking for size options", meaningHindi: "साइज विकल्प पूछना", usage: "When shopping for clothes.", usageHindi: "कपड़े खरीदते समय।", category: "Shopping" },
  // Travel
  { id: 19, phrase: "Where is the nearest...?", hindi: "सबसे नज़दीकी... कहाँ है?", meaning: "Asking for directions", meaningHindi: "दिशा पूछना", usage: "When looking for a place.", usageHindi: "कोई जगह ढूंढते समय।", category: "Travel" },
  { id: 20, phrase: "How do I get to...?", hindi: "मैं... कैसे पहुँचूं?", meaning: "Asking for directions", meaningHindi: "रास्ता पूछना", usage: "When you need directions.", usageHindi: "जब आपको रास्ता चाहिए।", category: "Travel" },
];

export function PhrasesOfDay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState("All");

  const categories = ["All", "Greetings", "Conversation", "Office", "Idioms", "Polite", "Shopping", "Travel"];
  
  const filteredPhrases = category === "All" 
    ? dailyPhrases 
    : dailyPhrases.filter(p => p.category === category);
  
  const currentPhrase = filteredPhrases[currentIndex % filteredPhrases.length];

  const speakPhrase = () => {
    const utterance = new SpeechSynthesisUtterance(currentPhrase.phrase);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const copyPhrase = () => {
    navigator.clipboard.writeText(currentPhrase.phrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextPhrase = () => {
    setCurrentIndex((currentIndex + 1) % filteredPhrases.length);
  };

  const prevPhrase = () => {
    setCurrentIndex((currentIndex - 1 + filteredPhrases.length) % filteredPhrases.length);
  };

  return (
    <Card className="border-2 border-teal-200 dark:border-teal-800">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
            <MessageCircle className="h-6 w-6" />
            दैनिक वाक्यांश (Daily Phrases)
          </CardTitle>
          <Badge variant="outline">{currentIndex + 1}/{filteredPhrases.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => { setCategory(cat); setCurrentIndex(0); }}
              className={category === cat ? "bg-teal-600" : ""}
            >
              {cat === "All" ? "सभी" : cat}
            </Button>
          ))}
        </div>

        {/* Phrase Display */}
        <div className="text-center space-y-4">
          <div className="p-6 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                "{currentPhrase.phrase}"
              </h2>
              <Button variant="ghost" size="sm" onClick={speakPhrase}>
                <Volume2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={copyPhrase}>
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-xl text-orange-600 dark:text-orange-400 font-hindi">
              "{currentPhrase.hindi}"
            </p>
            <Badge className="mt-2">{currentPhrase.category}</Badge>
          </div>
        </div>

        {/* Meaning */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border space-y-2">
          <h3 className="font-bold text-teal-600">Meaning / अर्थ</h3>
          <p>{currentPhrase.meaning}</p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">{currentPhrase.meaningHindi}</p>
        </div>

        {/* Usage */}
        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 space-y-2">
          <h3 className="font-bold text-cyan-600">Usage / उपयोग</h3>
          <p>{currentPhrase.usage}</p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">{currentPhrase.usageHindi}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={prevPhrase}>
            <ChevronLeft className="h-4 w-4 mr-1" /> पिछला
          </Button>
          <Button variant="outline" onClick={nextPhrase}>
            अगला <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}