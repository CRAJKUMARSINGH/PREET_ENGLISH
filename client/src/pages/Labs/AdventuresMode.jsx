import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, MapPin, ChevronRight, Star, Trophy, Heart, Zap, Lock, CheckCircle, MessageCircle, ShoppingBag, Utensils, Plane, Briefcase, } from "lucide-react";
import { cn } from "@/lib/utils";
// Adventure storylines
var adventures = [
    {
        id: "market",
        title: "Market Day Adventure",
        hindiTitle: "बाज़ार का दिन",
        description: "Navigate a busy Indian market using English",
        icon: ShoppingBag,
        color: "from-orange-400 to-red-500",
        totalScenes: 5,
        xpReward: 100,
        difficulty: "Beginner",
        unlocked: true,
        completed: false,
    },
    {
        id: "restaurant",
        title: "Restaurant Experience",
        hindiTitle: "रेस्टोरेंट का अनुभव",
        description: "Order food and interact with staff in English",
        icon: Utensils,
        color: "from-green-400 to-emerald-500",
        totalScenes: 6,
        xpReward: 120,
        difficulty: "Beginner",
        unlocked: true,
        completed: false,
    },
    {
        id: "airport",
        title: "Airport Journey",
        hindiTitle: "हवाई अड्डे की यात्रा",
        description: "Navigate check-in, security, and boarding",
        icon: Plane,
        color: "from-blue-400 to-indigo-500",
        totalScenes: 8,
        xpReward: 150,
        difficulty: "Intermediate",
        unlocked: false,
        completed: false,
    },
    {
        id: "interview",
        title: "Job Interview Quest",
        hindiTitle: "जॉब इंटरव्यू क्वेस्ट",
        description: "Ace a job interview in English",
        icon: Briefcase,
        color: "from-purple-400 to-pink-500",
        totalScenes: 7,
        xpReward: 200,
        difficulty: "Advanced",
        unlocked: false,
        completed: false,
    },
];
// Sample scene for the active adventure
var sampleScenes = [
    {
        id: 1,
        title: "Entering the Market",
        background: "🏪",
        dialogue: "You enter a busy market. A shopkeeper greets you warmly.",
        npcDialogue: "Good morning! Welcome to my shop. How can I help you today?",
        npcDialogueHindi: "सुप्रभात! मेरी दुकान में स्वागत है। आज मैं आपकी कैसे मदद कर सकता हूं?",
        choices: [
            { text: "Good morning! I'm looking for vegetables.", correct: true, feedback: "Perfect! Polite and clear." },
            { text: "Give me vegetables.", correct: false, feedback: "Too direct. Try being more polite." },
            { text: "I don't know.", correct: false, feedback: "Be confident! You're here to shop." },
        ],
        xp: 20,
    },
    {
        id: 2,
        title: "Choosing Items",
        background: "🥕",
        dialogue: "The shopkeeper shows you fresh vegetables.",
        npcDialogue: "We have fresh tomatoes, onions, and potatoes. What would you like?",
        npcDialogueHindi: "हमारे पास ताज़े टमाटर, प्याज़ और आलू हैं। आप क्या लेना चाहेंगे?",
        choices: [
            { text: "I would like 1 kg of tomatoes, please.", correct: true, feedback: "Excellent! Specific and polite." },
            { text: "Tomatoes.", correct: false, feedback: "Add quantity and be polite." },
            { text: "How much are the tomatoes?", correct: true, feedback: "Good! Asking about price first." },
        ],
        xp: 25,
    },
    {
        id: 3,
        title: "Asking the Price",
        background: "💰",
        dialogue: "You need to know the total cost.",
        npcDialogue: "That will be 150 rupees for everything.",
        npcDialogueHindi: "सब कुछ के लिए 150 रुपये होंगे।",
        choices: [
            { text: "That's a bit expensive. Can you give a discount?", correct: true, feedback: "Great bargaining!" },
            { text: "Here is the money. Thank you!", correct: true, feedback: "Polite transaction!" },
            { text: "Too much!", correct: false, feedback: "Try a more polite approach." },
        ],
        xp: 30,
    },
];
export default function AdventuresMode() {
    var _a = useState(null), selectedAdventure = _a[0], setSelectedAdventure = _a[1];
    var _b = useState(0), currentSceneIndex = _b[0], setCurrentSceneIndex = _b[1];
    var _c = useState(null), selectedChoice = _c[0], setSelectedChoice = _c[1];
    var _d = useState(false), showFeedback = _d[0], setShowFeedback = _d[1];
    var _e = useState(0), earnedXP = _e[0], setEarnedXP = _e[1];
    var _f = useState(false), adventureComplete = _f[0], setAdventureComplete = _f[1];
    var currentScene = sampleScenes[currentSceneIndex];
    var handleChoiceSelect = function (index) {
        setSelectedChoice(index);
        setShowFeedback(true);
        if (currentScene.choices[index].correct) {
            setEarnedXP(earnedXP + currentScene.xp);
        }
    };
    var handleNextScene = function () {
        if (currentSceneIndex < sampleScenes.length - 1) {
            setCurrentSceneIndex(currentSceneIndex + 1);
            setSelectedChoice(null);
            setShowFeedback(false);
        }
        else {
            setAdventureComplete(true);
        }
    };
    var resetAdventure = function () {
        setSelectedAdventure(null);
        setCurrentSceneIndex(0);
        setSelectedChoice(null);
        setShowFeedback(false);
        setEarnedXP(0);
        setAdventureComplete(false);
    };
    return (<Layout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                        <Gamepad2 className="h-5 w-5 text-purple-500"/>
                        <span className="text-sm font-bold text-purple-600">Storyline Learning • Duolingo 2024 Style</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Adventures Mode
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        साहसिक कहानियां • Learn English through interactive storylines
                    </p>
                </div>

                {!selectedAdventure ? (
        /* Adventure Selection */
        <div className="grid md:grid-cols-2 gap-6">
                        {adventures.map(function (adventure) { return (<Card key={adventure.id} className={cn("cursor-pointer transition-all hover:shadow-xl relative overflow-hidden", !adventure.unlocked && "opacity-60")} onClick={function () { return adventure.unlocked && setSelectedAdventure(adventure); }}>
                                <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", adventure.color)}/>
                                <CardContent className="p-6 relative">
                                    <div className="flex items-start gap-4">
                                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg", adventure.color)}>
                                            <adventure.icon className="h-8 w-8"/>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg">{adventure.title}</h3>
                                                {!adventure.unlocked && <Lock className="h-4 w-4 text-muted-foreground"/>}
                                                {adventure.completed && <CheckCircle className="h-4 w-4 text-green-500"/>}
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{adventure.hindiTitle}</p>
                                            <p className="text-sm mb-3">{adventure.description}</p>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline">{adventure.difficulty}</Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="h-3 w-3"/>
                                                    {adventure.totalScenes} scenes
                                                </span>
                                                <span className="text-xs text-yellow-600 flex items-center gap-1">
                                                    <Zap className="h-3 w-3"/>
                                                    {adventure.xpReward} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>); })}
                    </div>) : adventureComplete ? (
        /* Adventure Complete */
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-12 text-center space-y-6">
                            <Trophy className="h-24 w-24 text-yellow-500 mx-auto"/>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Adventure Complete! 🎉</h2>
                                <p className="text-lg text-muted-foreground">
                                    You completed "{selectedAdventure.title}"
                                </p>
                                <p className="text-muted-foreground">
                                    आपने "{selectedAdventure.hindiTitle}" पूरी की!
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600">
                                <Zap className="h-8 w-8"/>
                                <span>+{earnedXP} XP Earned</span>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" onClick={resetAdventure}>
                                    Choose Another
                                </Button>
                                <Button onClick={function () {
                setCurrentSceneIndex(0);
                setSelectedChoice(null);
                setShowFeedback(false);
                setAdventureComplete(false);
                setEarnedXP(0);
            }}>
                                    Play Again
                                </Button>
                            </div>
                        </CardContent>
                    </Card>) : (
        /* Active Adventure */
        <div className="space-y-6">
                        {/* Progress Header */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="sm" onClick={resetAdventure}>
                                            ← Exit
                                        </Button>
                                        <span className="font-bold">{selectedAdventure.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-yellow-600">
                                        <Zap className="h-4 w-4"/>
                                        <span className="font-bold">{earnedXP} XP</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Progress value={((currentSceneIndex + 1) / sampleScenes.length) * 100} className="flex-1"/>
                                    <span className="text-sm text-muted-foreground">
                                        {currentSceneIndex + 1}/{sampleScenes.length}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Scene */}
                        <Card className="overflow-hidden">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center">
                                <div className="text-8xl mb-4">{currentScene.background}</div>
                                <h2 className="text-2xl font-bold text-white mb-2">{currentScene.title}</h2>
                                <p className="text-white/70">{currentScene.dialogue}</p>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                {/* NPC Dialogue */}
                                <div className="p-4 bg-secondary/50 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shrink-0">
                                            🧑‍💼
                                        </div>
                                        <div>
                                            <p className="font-medium text-lg">"{currentScene.npcDialogue}"</p>
                                            <p className="text-sm text-muted-foreground mt-1">{currentScene.npcDialogueHindi}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Choices */}
                                <div className="space-y-3">
                                    <p className="font-medium flex items-center gap-2">
                                        <MessageCircle className="h-4 w-4 text-blue-500"/>
                                        Choose your response:
                                    </p>
                                    {currentScene.choices.map(function (choice, index) { return (<Button key={index} variant={selectedChoice === index ? "default" : "outline"} className={cn("w-full justify-start text-left h-auto py-4 px-4", showFeedback && selectedChoice === index && (choice.correct ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"))} onClick={function () { return !showFeedback && handleChoiceSelect(index); }} disabled={showFeedback}>
                                            {choice.text}
                                        </Button>); })}
                                </div>

                                {/* Feedback */}
                                {showFeedback && selectedChoice !== null && (<div className={cn("p-4 rounded-xl", currentScene.choices[selectedChoice].correct
                    ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                    : "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800")}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {currentScene.choices[selectedChoice].correct ? (<CheckCircle className="h-5 w-5 text-green-600"/>) : (<Star className="h-5 w-5 text-red-600"/>)}
                                            <span className="font-bold">
                                                {currentScene.choices[selectedChoice].correct ? "Correct!" : "Not quite!"}
                                            </span>
                                            {currentScene.choices[selectedChoice].correct && (<span className="text-green-600 text-sm">+{currentScene.xp} XP</span>)}
                                        </div>
                                        <p className="text-sm">{currentScene.choices[selectedChoice].feedback}</p>
                                    </div>)}

                                {/* Next Button */}
                                {showFeedback && (<Button onClick={handleNextScene} className="w-full">
                                        {currentSceneIndex < sampleScenes.length - 1 ? "Continue" : "Complete Adventure"}
                                        <ChevronRight className="h-4 w-4 ml-2"/>
                                    </Button>)}
                            </CardContent>
                        </Card>
                    </div>)}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                        <p className="text-sm font-medium">
                            Inspired by Duolingo Adventures 2024 • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                    </div>
                </footer>
            </div>
        </Layout>);
}
