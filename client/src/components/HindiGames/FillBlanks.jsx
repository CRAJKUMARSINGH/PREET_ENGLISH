import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenLine, CheckCircle, XCircle, RotateCcw, ChevronRight, Volume2 } from "lucide-react";
var questions = [
    // Articles
    {
        id: 1,
        sentence: "I saw ___ elephant at the zoo.",
        sentenceHindi: "मैंने चिड़ियाघर में ___ हाथी देखा।",
        blank: "an",
        options: ["a", "an", "the", "no article"],
        correctAnswer: "an",
        explanation: "Use 'an' before vowel sounds. Elephant starts with 'e' sound.",
        explanationHindi: "'an' का उपयोग स्वर ध्वनि से पहले होता है। Elephant 'e' ध्वनि से शुरू होता है।",
        category: "Articles"
    },
    {
        id: 2,
        sentence: "___ sun rises in the east.",
        sentenceHindi: "___ सूरज पूर्व में उगता है।",
        blank: "The",
        options: ["A", "An", "The", "No article"],
        correctAnswer: "The",
        explanation: "Use 'The' for unique things like sun, moon, earth.",
        explanationHindi: "'The' का उपयोग अद्वितीय चीज़ों जैसे सूरज, चाँद, पृथ्वी के लिए होता है।",
        category: "Articles"
    },
    {
        id: 3,
        sentence: "She is ___ honest girl.",
        sentenceHindi: "वह ___ ईमानदार लड़की है।",
        blank: "an",
        options: ["a", "an", "the", "no article"],
        correctAnswer: "an",
        explanation: "'Honest' starts with a vowel sound (silent 'h'), so use 'an'.",
        explanationHindi: "'Honest' स्वर ध्वनि से शुरू होता है (मूक 'h'), इसलिए 'an' का उपयोग करें।",
        category: "Articles"
    },
    // Prepositions
    {
        id: 4,
        sentence: "The book is ___ the table.",
        sentenceHindi: "किताब मेज़ ___ है।",
        blank: "on",
        options: ["in", "on", "at", "under"],
        correctAnswer: "on",
        explanation: "Use 'on' for surfaces.",
        explanationHindi: "सतहों के लिए 'on' का उपयोग करें।",
        category: "Prepositions"
    },
    {
        id: 5,
        sentence: "I live ___ Delhi.",
        sentenceHindi: "मैं दिल्ली ___ रहता हूँ।",
        blank: "in",
        options: ["in", "on", "at", "to"],
        correctAnswer: "in",
        explanation: "Use 'in' for cities, countries, and large areas.",
        explanationHindi: "शहरों, देशों और बड़े क्षेत्रों के लिए 'in' का उपयोग करें।",
        category: "Prepositions"
    },
    {
        id: 6,
        sentence: "The cat is ___ the box.",
        sentenceHindi: "बिल्ली बॉक्स ___ है।",
        blank: "in",
        options: ["in", "on", "at", "by"],
        correctAnswer: "in",
        explanation: "Use 'in' for enclosed spaces.",
        explanationHindi: "बंद जगहों के लिए 'in' का उपयोग करें।",
        category: "Prepositions"
    },
    // Tenses
    {
        id: 7,
        sentence: "She ___ to school every day.",
        sentenceHindi: "वह हर दिन स्कूल ___ है।",
        blank: "goes",
        options: ["go", "goes", "went", "going"],
        correctAnswer: "goes",
        explanation: "Use 'goes' for third person singular in simple present.",
        explanationHindi: "सामान्य वर्तमान में तीसरे व्यक्ति एकवचन के लिए 'goes' का उपयोग करें।",
        category: "Tenses"
    },
    {
        id: 8,
        sentence: "I ___ my homework yesterday.",
        sentenceHindi: "मैंने कल अपना होमवर्क ___ ।",
        blank: "did",
        options: ["do", "does", "did", "done"],
        correctAnswer: "did",
        explanation: "Use 'did' for simple past tense.",
        explanationHindi: "सामान्य भूतकाल के लिए 'did' का उपयोग करें।",
        category: "Tenses"
    },
    {
        id: 9,
        sentence: "They ___ playing cricket now.",
        sentenceHindi: "वे अभी क्रिकेट ___ हैं।",
        blank: "are",
        options: ["is", "are", "was", "were"],
        correctAnswer: "are",
        explanation: "Use 'are' with 'they' in present continuous.",
        explanationHindi: "वर्तमान निरंतर में 'they' के साथ 'are' का उपयोग करें।",
        category: "Tenses"
    },
    // Pronouns
    {
        id: 10,
        sentence: "This book is ___. (belonging to me)",
        sentenceHindi: "यह किताब ___ है। (मेरी)",
        blank: "mine",
        options: ["my", "mine", "me", "I"],
        correctAnswer: "mine",
        explanation: "'Mine' is a possessive pronoun used without a noun.",
        explanationHindi: "'Mine' एक स्वामित्व सर्वनाम है जो संज्ञा के बिना उपयोग होता है।",
        category: "Pronouns"
    },
    {
        id: 11,
        sentence: "___ is my best friend.",
        sentenceHindi: "___ मेरा सबसे अच्छा दोस्त है।",
        blank: "He",
        options: ["He", "Him", "His", "Her"],
        correctAnswer: "He",
        explanation: "'He' is used as subject of the sentence.",
        explanationHindi: "'He' वाक्य के कर्ता के रूप में उपयोग होता है।",
        category: "Pronouns"
    },
    {
        id: 12,
        sentence: "I gave the book to ___.",
        sentenceHindi: "मैंने किताब ___ को दी।",
        blank: "her",
        options: ["she", "her", "hers", "herself"],
        correctAnswer: "her",
        explanation: "'Her' is used as object of the sentence.",
        explanationHindi: "'Her' वाक्य के कर्म के रूप में उपयोग होता है।",
        category: "Pronouns"
    },
];
export function FillBlanks() {
    var _a = useState(0), currentIndex = _a[0], setCurrentIndex = _a[1];
    var _b = useState(null), selectedAnswer = _b[0], setSelectedAnswer = _b[1];
    var _c = useState(false), showResult = _c[0], setShowResult = _c[1];
    var _d = useState(0), score = _d[0], setScore = _d[1];
    var _e = useState(0), answered = _e[0], setAnswered = _e[1];
    var _f = useState("All"), category = _f[0], setCategory = _f[1];
    var categories = ["All", "Articles", "Prepositions", "Tenses", "Pronouns"];
    var filteredQuestions = category === "All"
        ? questions
        : questions.filter(function (q) { return q.category === category; });
    var currentQuestion = filteredQuestions[currentIndex % filteredQuestions.length];
    var handleAnswer = function (answer) {
        if (showResult)
            return;
        setSelectedAnswer(answer);
    };
    var checkAnswer = function () {
        if (!selectedAnswer)
            return;
        setShowResult(true);
        setAnswered(answered + 1);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };
    var nextQuestion = function () {
        setCurrentIndex((currentIndex + 1) % filteredQuestions.length);
        setSelectedAnswer(null);
        setShowResult(false);
    };
    var resetGame = function () {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswered(0);
    };
    var speakSentence = function () {
        var fullSentence = currentQuestion.sentence.replace("___", currentQuestion.correctAnswer);
        var utterance = new SpeechSynthesisUtterance(fullSentence);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    };
    return (<Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <PenLine className="h-6 w-6"/>
          रिक्त स्थान भरें (Fill in the Blanks)
        </CardTitle>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          सही शब्द चुनकर वाक्य पूरा करें
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Stats & Category */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge variant="outline">स्कोर: {score}/{answered}</Badge>
            <Badge variant="outline">{currentIndex + 1}/{filteredQuestions.length}</Badge>
          </div>
          <select value={category} onChange={function (e) { setCategory(e.target.value); resetGame(); }} className="px-3 py-1 border rounded-lg bg-background text-sm">
            {categories.map(function (cat) { return (<option key={cat} value={cat}>{cat === "All" ? "सभी" : cat}</option>); })}
          </select>
        </div>

        {/* Question */}
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border space-y-3">
          <div className="flex items-center justify-between">
            <Badge>{currentQuestion.category}</Badge>
            <Button variant="ghost" size="sm" onClick={speakSentence}>
              <Volume2 className="h-4 w-4"/>
            </Button>
          </div>
          <p className="text-xl font-medium">
            {currentQuestion.sentence.split("___").map(function (part, i, arr) { return (<span key={i}>
                {part}
                {i < arr.length - 1 && (<span className="inline-block min-w-[80px] mx-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border-b-2 border-blue-500 text-center">
                    {showResult ? currentQuestion.correctAnswer : selectedAnswer || "?"}
                  </span>)}
              </span>); })}
          </p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">
            {currentQuestion.sentenceHindi}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map(function (option) { return (<button key={option} onClick={function () { return handleAnswer(option); }} disabled={showResult} className={"p-3 rounded-xl border-2 font-medium transition-all ".concat(showResult
                ? option === currentQuestion.correctAnswer
                    ? "bg-green-100 border-green-500 text-green-700"
                    : option === selectedAnswer
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "bg-slate-50 border-slate-200"
                : selectedAnswer === option
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400")}>
              {option}
            </button>); })}
        </div>

        {/* Result */}
        {showResult && (<div className={"p-4 rounded-xl border-2 ".concat(selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                : "bg-red-50 dark:bg-red-900/20 border-red-300")}>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === currentQuestion.correctAnswer ? (<>
                  <CheckCircle className="h-5 w-5 text-green-600"/>
                  <span className="font-bold text-green-700">🎉 सही! Correct!</span>
                </>) : (<>
                  <XCircle className="h-5 w-5 text-red-600"/>
                  <span className="font-bold text-red-700">गलत! सही उत्तर: {currentQuestion.correctAnswer}</span>
                </>)}
            </div>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            <p className="text-sm text-orange-600 dark:text-orange-400 font-hindi mt-1">{currentQuestion.explanationHindi}</p>
          </div>)}

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (<Button onClick={checkAnswer} disabled={!selectedAnswer} className="w-full bg-blue-600">
              जांचें (Check)
            </Button>) : (<>
              <Button variant="outline" onClick={resetGame} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2"/> फिर से
              </Button>
              <Button onClick={nextQuestion} className="flex-1 bg-blue-600">
                अगला <ChevronRight className="h-4 w-4 ml-1"/>
              </Button>
            </>)}
        </div>
      </CardContent>
    </Card>);
}
