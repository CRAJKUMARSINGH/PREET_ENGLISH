var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Sparkles, Wand2, RefreshCw, Volume2, ChevronRight, CheckCircle, Languages, Brain, Heart, Loader2, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
// Story difficulty levels
var difficultyLevels = [
    { id: "beginner", label: "Beginner", hindiLabel: "शुरुआती", color: "bg-green-500" },
    { id: "intermediate", label: "Intermediate", hindiLabel: "मध्यम", color: "bg-blue-500" },
    { id: "advanced", label: "Advanced", hindiLabel: "उन्नत", color: "bg-purple-500" },
];
// Story topics
var storyTopics = [
    { id: "daily-life", label: "Daily Life", hindiLabel: "दैनिक जीवन", icon: "🏠" },
    { id: "travel", label: "Travel", hindiLabel: "यात्रा", icon: "✈️" },
    { id: "business", label: "Business", hindiLabel: "व्यापार", icon: "💼" },
    { id: "friendship", label: "Friendship", hindiLabel: "दोस्ती", icon: "🤝" },
    { id: "adventure", label: "Adventure", hindiLabel: "साहसिक", icon: "🏔️" },
    { id: "culture", label: "Indian Culture", hindiLabel: "भारतीय संस्कृति", icon: "🪔" },
];
// Sample generated story (will be replaced by AI)
var sampleStory = {
    title: "The Morning Chai",
    hindiTitle: "सुबह की चाय",
    paragraphs: [
        {
            english: "Ravi woke up early in the morning. The sun was just rising over the city.",
            hindi: "रवि सुबह जल्दी उठा। सूरज शहर के ऊपर उग रहा था।",
        },
        {
            english: "He walked to the kitchen and started making chai. The aroma of cardamom filled the air.",
            hindi: "वह रसोई में गया और चाय बनाने लगा। इलायची की खुशबू हवा में फैल गई।",
        },
        {
            english: "His mother joined him. 'Good morning, beta,' she said with a warm smile.",
            hindi: "उसकी माँ उसके साथ आ गईं। 'सुप्रभात, बेटा,' उन्होंने गर्मजोशी से मुस्कुराते हुए कहा।",
        },
        {
            english: "They sat together on the balcony, sipping chai and watching the world wake up.",
            hindi: "वे बालकनी में साथ बैठ गए, चाय पीते हुए और दुनिया को जागते देखते हुए।",
        },
    ],
    vocabulary: [
        { word: "aroma", meaning: "सुगंध", example: "The aroma of spices filled the kitchen." },
        { word: "balcony", meaning: "बालकनी", example: "We enjoyed the view from the balcony." },
        { word: "sipping", meaning: "चुस्की लेना", example: "She was sipping her tea slowly." },
    ],
    quiz: [
        {
            question: "What did Ravi make in the kitchen?",
            hindiQuestion: "रवि ने रसोई में क्या बनाया?",
            options: ["Coffee", "Chai", "Juice", "Water"],
            correct: 1,
        },
        {
            question: "What spice's aroma filled the air?",
            hindiQuestion: "किस मसाले की खुशबू हवा में फैली?",
            options: ["Cinnamon", "Ginger", "Cardamom", "Cloves"],
            correct: 2,
        },
    ],
};
export default function StoryGenerator() {
    var _this = this;
    var _a = useState(null), selectedTopic = _a[0], setSelectedTopic = _a[1];
    var _b = useState("beginner"), selectedDifficulty = _b[0], setSelectedDifficulty = _b[1];
    var _c = useState(""), customPrompt = _c[0], setCustomPrompt = _c[1];
    var _d = useState(false), isGenerating = _d[0], setIsGenerating = _d[1];
    var _e = useState(null), generatedStory = _e[0], setGeneratedStory = _e[1];
    var _f = useState(0), currentParagraph = _f[0], setCurrentParagraph = _f[1];
    var _g = useState(true), showHindi = _g[0], setShowHindi = _g[1];
    var _h = useState(false), quizStarted = _h[0], setQuizStarted = _h[1];
    var _j = useState([]), quizAnswers = _j[0], setQuizAnswers = _j[1];
    var _k = useState(false), quizComplete = _k[0], setQuizComplete = _k[1];
    var _l = useState(false), isPlaying = _l[0], setIsPlaying = _l[1];
    var playAudio = function (text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
            utterance.onend = function () { return setIsPlaying(false); };
        }
    };
    var storyMutation = useMutation({
        mutationFn: function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, apiRequest("POST", "/api/ai/generate-story", params).then(function (res) { return res.json(); })];
            });
        }); },
        onSuccess: function (data) {
            setGeneratedStory(data);
            setCurrentParagraph(0);
            setQuizStarted(false);
            setQuizAnswers([]);
            setQuizComplete(false);
            setIsGenerating(false);
        },
        onError: function () {
            setIsGenerating(false);
            // Handle error toast if needed
        }
    });
    var handleGenerate = function () {
        if (!selectedTopic)
            return;
        setIsGenerating(true);
        storyMutation.mutate({
            topic: selectedTopic,
            difficulty: selectedDifficulty,
            customPrompt: customPrompt
        });
    };
    var handleQuizAnswer = function (questionIndex, answerIndex) {
        var newAnswers = __spreadArray([], quizAnswers, true);
        newAnswers[questionIndex] = answerIndex;
        setQuizAnswers(newAnswers);
        if (newAnswers.length === (generatedStory === null || generatedStory === void 0 ? void 0 : generatedStory.quiz.length) &&
            newAnswers.every(function (a) { return a !== undefined; })) {
            setQuizComplete(true);
        }
    };
    var getQuizScore = function () {
        if (!generatedStory)
            return 0;
        return quizAnswers.filter(function (a, i) { return a === generatedStory.quiz[i].correct; }).length;
    };
    return (<Layout>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                        <Wand2 className="h-5 w-5 text-purple-500"/>
                        <span className="text-sm font-bold text-purple-600">AI-Powered • 2024 Innovation</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        AI Story Generator
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        कहानी जनरेटर • Create personalized bilingual stories for immersive learning
                    </p>
                </div>

                {!generatedStory ? (
        /* Story Configuration */
        <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500"/>
                                Create Your Story
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Topic Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Choose a Topic (विषय चुनें)</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {storyTopics.map(function (topic) { return (<Button key={topic.id} variant={selectedTopic === topic.id ? "default" : "outline"} className={cn("h-auto py-4 flex-col gap-1", selectedTopic === topic.id && "ring-2 ring-purple-500")} onClick={function () { return setSelectedTopic(topic.id); }}>
                                            <span className="text-2xl">{topic.icon}</span>
                                            <span className="font-medium">{topic.label}</span>
                                            <span className="text-xs text-muted-foreground">{topic.hindiLabel}</span>
                                        </Button>); })}
                                </div>
                            </div>

                            {/* Difficulty Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Difficulty Level (कठिनाई स्तर)</label>
                                <div className="flex gap-3">
                                    {difficultyLevels.map(function (level) { return (<Button key={level.id} variant={selectedDifficulty === level.id ? "default" : "outline"} className={cn("flex-1", selectedDifficulty === level.id && level.color)} onClick={function () { return setSelectedDifficulty(level.id); }}>
                                            <span>{level.label}</span>
                                            <span className="text-xs ml-1 opacity-70">({level.hindiLabel})</span>
                                        </Button>); })}
                                </div>
                            </div>

                            {/* Custom Prompt */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Custom Prompt (Optional)</label>
                                <Input placeholder="E.g., A story about a student learning to cook..." value={customPrompt} onChange={function (e) { return setCustomPrompt(e.target.value); }} className="h-12"/>
                            </div>

                            {/* Generate Button */}
                            <Button onClick={handleGenerate} disabled={!selectedTopic || isGenerating} className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                {isGenerating ? (<>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                        Generating Story...
                                    </>) : (<>
                                        <Wand2 className="mr-2 h-5 w-5"/>
                                        Generate My Story ✨
                                    </>)}
                            </Button>
                        </CardContent>
                    </Card>) : (
        /* Generated Story View */
        <div className="space-y-6">
                        {/* Story Header */}
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge className="mb-2 bg-purple-500">{selectedDifficulty}</Badge>
                                        <h2 className="text-2xl font-bold">{generatedStory.title}</h2>
                                        <p className="text-lg text-muted-foreground">{generatedStory.hindiTitle}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={function () { return setGeneratedStory(null); }}>
                                        <RefreshCw className="h-4 w-4 mr-1"/>
                                        New Story
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {!quizStarted ? (<>
                                {/* Reading Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Reading Progress</span>
                                        <span>{currentParagraph + 1} / {generatedStory.paragraphs.length}</span>
                                    </div>
                                    <Progress value={((currentParagraph + 1) / generatedStory.paragraphs.length) * 100}/>
                                </div>

                                {/* Story Content */}
                                <Card>
                                    <CardContent className="p-8 space-y-6">
                                        {/* Current Paragraph */}
                                        <div className="space-y-4 cursor-pointer group" onClick={function () { return playAudio(generatedStory.paragraphs[currentParagraph].english); }}>
                                            <p className="text-xl leading-relaxed font-medium group-hover:text-primary transition-colors">
                                                {generatedStory.paragraphs[currentParagraph].english}
                                                <Volume2 className={cn("inline ml-2 h-5 w-5 transition-opacity", isPlaying ? "opacity-100 text-primary animate-pulse" : "opacity-30 group-hover:opacity-100")}/>
                                            </p>
                                            {showHindi && (<p className="text-lg text-purple-600 dark:text-purple-400 leading-relaxed border-l-4 border-purple-300 pl-4">
                                                    {generatedStory.paragraphs[currentParagraph].hindi}
                                                </p>)}
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <Button variant="outline" onClick={function () { return setShowHindi(!showHindi); }}>
                                                <Languages className="h-4 w-4 mr-2"/>
                                                {showHindi ? "Hide Hindi" : "Show Hindi"}
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button variant="outline" disabled={currentParagraph === 0} onClick={function () { return setCurrentParagraph(currentParagraph - 1); }}>
                                                    Previous
                                                </Button>
                                                {currentParagraph < generatedStory.paragraphs.length - 1 ? (<Button onClick={function () { return setCurrentParagraph(currentParagraph + 1); }}>
                                                        Next <ChevronRight className="h-4 w-4 ml-1"/>
                                                    </Button>) : (<Button className="bg-green-500 hover:bg-green-600" onClick={function () { return setQuizStarted(true); }}>
                                                        <Brain className="h-4 w-4 mr-2"/>
                                                        Take Quiz
                                                    </Button>)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Vocabulary */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-blue-500"/>
                                            Key Vocabulary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3">
                                            {generatedStory.vocabulary.map(function (word, i) { return (<div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                                    <div>
                                                        <span className="font-bold text-blue-600">{word.word}</span>
                                                        <span className="mx-2">-</span>
                                                        <span className="text-muted-foreground">{word.meaning}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Volume2 className="h-4 w-4"/>
                                                    </Button>
                                                </div>); })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>) : (
            /* Quiz Section */
            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-green-500"/>
                                        Comprehension Quiz
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {generatedStory.quiz.map(function (q, qIndex) { return (<div key={qIndex} className="space-y-3">
                                            <div>
                                                <p className="font-medium">{qIndex + 1}. {q.question}</p>
                                                <p className="text-sm text-muted-foreground">{q.hindiQuestion}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {q.options.map(function (option, oIndex) { return (<Button key={oIndex} variant={quizAnswers[qIndex] === oIndex ? "default" : "outline"} className={cn(quizComplete && oIndex === q.correct && "bg-green-500 hover:bg-green-500", quizComplete && quizAnswers[qIndex] === oIndex && oIndex !== q.correct && "bg-red-500 hover:bg-red-500")} onClick={function () { return !quizComplete && handleQuizAnswer(qIndex, oIndex); }} disabled={quizComplete}>
                                                        {option}
                                                    </Button>); })}
                                            </div>
                                        </div>); })}

                                    {quizComplete && (<div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center">
                                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3"/>
                                            <h3 className="text-xl font-bold mb-2">
                                                Quiz Complete! 🎉
                                            </h3>
                                            <p className="text-lg">
                                                You scored <span className="font-bold text-green-600">{getQuizScore()}</span> out of {generatedStory.quiz.length}
                                            </p>
                                            <div className="flex gap-3 justify-center mt-4">
                                                <Button variant="outline" onClick={function () { return setGeneratedStory(null); }}>
                                                    New Story
                                                </Button>
                                                <Button onClick={function () {
                        setQuizStarted(false);
                        setCurrentParagraph(0);
                        setQuizAnswers([]);
                        setQuizComplete(false);
                    }}>
                                                    Read Again
                                                </Button>
                                            </div>
                                        </div>)}
                                </CardContent>
                            </Card>)}
                    </div>)}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                        <p className="text-sm font-medium">
                            Inspired by Beelinguapp 2024 • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                    </div>
                </footer>
            </div>
        </Layout>);
}
