var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Volume2, BookOpen, Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
var dailyWords = [
    {
        id: 1, word: "Perseverance", hindi: "दृढ़ता", pronunciation: "pur-suh-VEER-uhns",
        partOfSpeech: "Noun", meaning: "Continued effort despite difficulties",
        meaningHindi: "कठिनाइयों के बावजूद निरंतर प्रयास",
        example: "Her perseverance helped her succeed.", exampleHindi: "उसकी दृढ़ता ने उसे सफल होने में मदद की।",
        synonyms: ["determination", "persistence"], antonyms: ["laziness", "giving up"]
    },
    {
        id: 2, word: "Gratitude", hindi: "कृतज्ञता", pronunciation: "GRAT-i-tood",
        partOfSpeech: "Noun", meaning: "The quality of being thankful",
        meaningHindi: "आभारी होने का गुण",
        example: "Express gratitude to your parents.", exampleHindi: "अपने माता-पिता के प्रति कृतज्ञता व्यक्त करें।",
        synonyms: ["thankfulness", "appreciation"], antonyms: ["ingratitude", "ungratefulness"]
    },
    {
        id: 3, word: "Compassion", hindi: "करुणा", pronunciation: "kuhm-PASH-uhn",
        partOfSpeech: "Noun", meaning: "Sympathy and concern for others' suffering",
        meaningHindi: "दूसरों के दुख के प्रति सहानुभूति और चिंता",
        example: "Show compassion to the needy.", exampleHindi: "जरूरतमंदों के प्रति करुणा दिखाएं।",
        synonyms: ["kindness", "empathy"], antonyms: ["cruelty", "indifference"]
    },
    {
        id: 4, word: "Integrity", hindi: "ईमानदारी", pronunciation: "in-TEG-ri-tee",
        partOfSpeech: "Noun", meaning: "The quality of being honest and having strong moral principles",
        meaningHindi: "ईमानदार होने और मजबूत नैतिक सिद्धांतों का गुण",
        example: "He is known for his integrity.", exampleHindi: "वह अपनी ईमानदारी के लिए जाने जाते हैं।",
        synonyms: ["honesty", "uprightness"], antonyms: ["dishonesty", "corruption"]
    },
    {
        id: 5, word: "Resilience", hindi: "लचीलापन", pronunciation: "ri-ZIL-yuhns",
        partOfSpeech: "Noun", meaning: "The ability to recover quickly from difficulties",
        meaningHindi: "कठिनाइयों से जल्दी उबरने की क्षमता",
        example: "Children show great resilience.", exampleHindi: "बच्चे बड़ा लचीलापन दिखाते हैं।",
        synonyms: ["toughness", "flexibility"], antonyms: ["fragility", "weakness"]
    },
    {
        id: 6, word: "Diligent", hindi: "मेहनती", pronunciation: "DIL-i-juhnt",
        partOfSpeech: "Adjective", meaning: "Having or showing care in one's work",
        meaningHindi: "अपने काम में सावधानी दिखाना",
        example: "She is a diligent student.", exampleHindi: "वह एक मेहनती छात्रा है।",
        synonyms: ["hardworking", "industrious"], antonyms: ["lazy", "careless"]
    },
    {
        id: 7, word: "Humble", hindi: "विनम्र", pronunciation: "HUHM-buhl",
        partOfSpeech: "Adjective", meaning: "Having a modest view of one's importance",
        meaningHindi: "अपने महत्व के बारे में विनम्र दृष्टिकोण रखना",
        example: "Despite his success, he remains humble.", exampleHindi: "अपनी सफलता के बावजूद, वह विनम्र रहते हैं।",
        synonyms: ["modest", "unassuming"], antonyms: ["proud", "arrogant"]
    },
    {
        id: 8, word: "Eloquent", hindi: "वाक्पटु", pronunciation: "EL-uh-kwuhnt",
        partOfSpeech: "Adjective", meaning: "Fluent or persuasive in speaking or writing",
        meaningHindi: "बोलने या लिखने में धाराप्रवाह या प्रेरक",
        example: "She gave an eloquent speech.", exampleHindi: "उसने एक वाक्पटु भाषण दिया।",
        synonyms: ["articulate", "expressive"], antonyms: ["inarticulate", "tongue-tied"]
    },
    {
        id: 9, word: "Benevolent", hindi: "परोपकारी", pronunciation: "buh-NEV-uh-luhnt",
        partOfSpeech: "Adjective", meaning: "Well-meaning and kindly",
        meaningHindi: "अच्छे इरादे वाला और दयालु",
        example: "The benevolent king helped the poor.", exampleHindi: "परोपकारी राजा ने गरीबों की मदद की।",
        synonyms: ["kind", "charitable"], antonyms: ["malevolent", "cruel"]
    },
    {
        id: 10, word: "Prudent", hindi: "विवेकी", pronunciation: "PROO-dnt",
        partOfSpeech: "Adjective", meaning: "Acting with care and thought for the future",
        meaningHindi: "भविष्य के लिए सावधानी और विचार के साथ कार्य करना",
        example: "It's prudent to save money.", exampleHindi: "पैसे बचाना विवेकपूर्ण है।",
        synonyms: ["wise", "sensible"], antonyms: ["reckless", "foolish"]
    },
    {
        id: 11, word: "Endeavor", hindi: "प्रयास", pronunciation: "en-DEV-er",
        partOfSpeech: "Verb/Noun", meaning: "To try hard to do or achieve something",
        meaningHindi: "कुछ करने या हासिल करने की कड़ी कोशिश करना",
        example: "We must endeavor to improve.", exampleHindi: "हमें सुधार करने का प्रयास करना चाहिए।",
        synonyms: ["attempt", "strive"], antonyms: ["neglect", "ignore"]
    },
    {
        id: 12, word: "Flourish", hindi: "फलना-फूलना", pronunciation: "FLUR-ish",
        partOfSpeech: "Verb", meaning: "To grow or develop in a healthy way",
        meaningHindi: "स्वस्थ तरीके से बढ़ना या विकसित होना",
        example: "Plants flourish in sunlight.", exampleHindi: "पौधे धूप में फलते-फूलते हैं।",
        synonyms: ["thrive", "prosper"], antonyms: ["decline", "wither"]
    },
    {
        id: 13, word: "Cherish", hindi: "संजोना", pronunciation: "CHER-ish",
        partOfSpeech: "Verb", meaning: "To protect and care for lovingly",
        meaningHindi: "प्यार से रक्षा करना और देखभाल करना",
        example: "Cherish your family moments.", exampleHindi: "अपने परिवार के पलों को संजोएं।",
        synonyms: ["treasure", "value"], antonyms: ["neglect", "abandon"]
    },
    {
        id: 14, word: "Embrace", hindi: "गले लगाना/स्वीकार करना", pronunciation: "em-BRAYS",
        partOfSpeech: "Verb", meaning: "To accept willingly or hold closely",
        meaningHindi: "स्वेच्छा से स्वीकार करना या करीब से पकड़ना",
        example: "Embrace new opportunities.", exampleHindi: "नए अवसरों को स्वीकार करें।",
        synonyms: ["accept", "welcome"], antonyms: ["reject", "refuse"]
    },
    {
        id: 15, word: "Nurture", hindi: "पोषण करना", pronunciation: "NUR-cher",
        partOfSpeech: "Verb", meaning: "To care for and encourage growth",
        meaningHindi: "देखभाल करना और विकास को प्रोत्साहित करना",
        example: "Parents nurture their children.", exampleHindi: "माता-पिता अपने बच्चों का पोषण करते हैं।",
        synonyms: ["nourish", "cultivate"], antonyms: ["neglect", "ignore"]
    },
];
export function DailyWordCard() {
    var _a = useState(0), currentIndex = _a[0], setCurrentIndex = _a[1];
    var _b = useState([]), favorites = _b[0], setFavorites = _b[1];
    var _c = useState([]), learned = _c[0], setLearned = _c[1];
    var currentWord = dailyWords[currentIndex];
    var speakWord = function () {
        var utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var speakExample = function () {
        var utterance = new SpeechSynthesisUtterance(currentWord.example);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    var toggleFavorite = function () {
        if (favorites.includes(currentWord.id)) {
            setFavorites(favorites.filter(function (id) { return id !== currentWord.id; }));
        }
        else {
            setFavorites(__spreadArray(__spreadArray([], favorites, true), [currentWord.id], false));
        }
    };
    var markLearned = function () {
        if (!learned.includes(currentWord.id)) {
            setLearned(__spreadArray(__spreadArray([], learned, true), [currentWord.id], false));
        }
    };
    var nextWord = function () {
        setCurrentIndex((currentIndex + 1) % dailyWords.length);
    };
    var prevWord = function () {
        setCurrentIndex((currentIndex - 1 + dailyWords.length) % dailyWords.length);
    };
    return (<Card className="border-2 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <Calendar className="h-6 w-6"/>
            आज का शब्द (Word of the Day)
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentIndex + 1}/{dailyWords.length}</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-700">
              {learned.length} सीखे
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Word Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
              {currentWord.word}
            </h2>
            <Button variant="ghost" size="sm" onClick={speakWord}>
              <Volume2 className="h-5 w-5"/>
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleFavorite} className={favorites.includes(currentWord.id) ? "text-red-500" : ""}>
              <Heart className={"h-5 w-5 ".concat(favorites.includes(currentWord.id) ? "fill-red-500" : "")}/>
            </Button>
          </div>
          <p className="text-2xl text-orange-600 dark:text-orange-400 font-hindi">
            {currentWord.hindi}
          </p>
          <p className="text-sm text-muted-foreground italic">
            /{currentWord.pronunciation}/
          </p>
          <Badge>{currentWord.partOfSpeech}</Badge>
        </div>

        {/* Meaning */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border space-y-2">
          <h3 className="font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen className="h-4 w-4"/> Meaning / अर्थ
          </h3>
          <p className="text-lg">{currentWord.meaning}</p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">{currentWord.meaningHindi}</p>
        </div>

        {/* Example */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-indigo-600">Example / उदाहरण</h3>
            <Button variant="ghost" size="sm" onClick={speakExample}>
              <Volume2 className="h-4 w-4"/>
            </Button>
          </div>
          <p className="text-lg italic">"{currentWord.example}"</p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">"{currentWord.exampleHindi}"</p>
        </div>

        {/* Synonyms & Antonyms */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-bold text-green-700 text-sm mb-2">Synonyms / समानार्थी</h4>
            <div className="flex flex-wrap gap-1">
              {currentWord.synonyms.map(function (syn, i) { return (<Badge key={i} variant="secondary" className="bg-green-100 text-green-700">{syn}</Badge>); })}
            </div>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-bold text-red-700 text-sm mb-2">Antonyms / विलोम</h4>
            <div className="flex flex-wrap gap-1">
              {currentWord.antonyms.map(function (ant, i) { return (<Badge key={i} variant="secondary" className="bg-red-100 text-red-700">{ant}</Badge>); })}
            </div>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={prevWord}>
            <ChevronLeft className="h-4 w-4 mr-1"/> पिछला
          </Button>
          <Button onClick={markLearned} disabled={learned.includes(currentWord.id)} className={learned.includes(currentWord.id) ? "bg-green-600" : "bg-indigo-600"}>
            {learned.includes(currentWord.id) ? (<><Star className="h-4 w-4 mr-1 fill-white"/> सीख लिया!</>) : (<><Star className="h-4 w-4 mr-1"/> सीख लिया</>)}
          </Button>
          <Button variant="outline" onClick={nextWord}>
            अगला <ChevronRight className="h-4 w-4 ml-1"/>
          </Button>
        </div>
      </CardContent>
    </Card>);
}
