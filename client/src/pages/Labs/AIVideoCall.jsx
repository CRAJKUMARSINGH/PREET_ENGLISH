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
import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageCircle, Sparkles, Heart, Star, Send, User, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
// Saraswati's responses
var saraswatiResponses = [
    {
        trigger: "hello",
        response: "Namaste! 🙏 I'm Saraswati, your AI English teacher. How can I help you practice today?",
        hindiMeaning: "नमस्ते! मैं सरस्वती हूं, आपकी AI अंग्रेज़ी शिक्षिका। आज मैं आपकी कैसे मदद कर सकती हूं?",
    },
    {
        trigger: "practice",
        response: "Great! Let's practice some conversation. Tell me about your day. What did you do this morning?",
        hindiMeaning: "बहुत अच्छा! आइए कुछ बातचीत का अभ्यास करें। अपने दिन के बारे में बताएं। आज सुबह आपने क्या किया?",
    },
    {
        trigger: "help",
        response: "I'm here to help you improve your English speaking skills. You can ask me questions, practice conversations, or learn new vocabulary. Just speak naturally!",
        hindiMeaning: "मैं आपकी अंग्रेज़ी बोलने की क्षमता सुधारने में मदद करने के लिए यहां हूं। आप मुझसे सवाल पूछ सकते हैं, बातचीत का अभ्यास कर सकते हैं, या नई शब्दावली सीख सकते हैं।",
    },
];
// Conversation scenarios
var scenarios = [
    { id: "casual", label: "Casual Chat", icon: "💬", difficulty: "Easy" },
    { id: "interview", label: "Job Interview", icon: "💼", difficulty: "Medium" },
    { id: "travel", label: "Travel Help", icon: "✈️", difficulty: "Easy" },
    { id: "business", label: "Business Call", icon: "📊", difficulty: "Hard" },
];
export default function AIVideoCall() {
    var _this = this;
    var _a = useState(false), isCallActive = _a[0], setIsCallActive = _a[1];
    var _b = useState(false), isMuted = _b[0], setIsMuted = _b[1];
    var _c = useState(true), isVideoOn = _c[0], setIsVideoOn = _c[1];
    var _d = useState(scenarios[0]), selectedScenario = _d[0], setSelectedScenario = _d[1];
    var _e = useState([]), messages = _e[0], setMessages = _e[1];
    var _f = useState(""), inputText = _f[0], setInputText = _f[1];
    var _g = useState(false), isTyping = _g[0], setIsTyping = _g[1];
    var _h = useState("happy"), currentEmotion = _h[0], setCurrentEmotion = _h[1];
    var messagesEndRef = useRef(null);
    var getEmotionEmoji = function (emotion) {
        switch (emotion === null || emotion === void 0 ? void 0 : emotion.toLowerCase()) {
            case "surprised": return "😲";
            case "thinking": return "🤔";
            case "encouraging": return "✨";
            case "listening": return "👂";
            default: return "🙏";
        }
    };
    // Auto-scroll to latest message
    useEffect(function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    var startCall = function () {
        setIsCallActive(true);
        // Add welcome message from Saraswati
        addSaraswatiMessage("Namaste! 🙏 Welcome to the video call. I'm Saraswati, your AI English practice partner. Let's practice together!", "नमस्ते! 🙏 वीडियो कॉल में स्वागत है। मैं सरस्वती हूं, आपकी AI अंग्रेज़ी अभ्यास साथी। आइए साथ मिलकर अभ्यास करें!");
    };
    var endCall = function () {
        setIsCallActive(false);
        setMessages([]);
    };
    var addSaraswatiMessage = function (text, hindiMeaning) {
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
            {
                id: Date.now(),
                sender: "saraswati",
                text: text,
                hindiMeaning: hindiMeaning,
                timestamp: new Date(),
            },
        ], false); });
    };
    var mutation = useMutation({
        mutationFn: function (message) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiRequest("POST", "/api/ai/video-chat", {
                            message: message,
                            history: messages.map(function (m) { return m.text; }),
                            scenario: selectedScenario.label,
                            level: selectedScenario.difficulty
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function (data) {
            setIsTyping(false);
            setCurrentEmotion(data.emotion || "happy");
            addSaraswatiMessage(data.text, data.hindiMeaning);
        },
        onError: function () {
            setIsTyping(false);
            addSaraswatiMessage("I'm having trouble connecting to the server. Please try again.", "सर्वर से कनेक्ट करने में समस्या हो रही है। कृपया पुनः प्रयास करें।");
        }
    });
    var handleSendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userInput;
        return __generator(this, function (_a) {
            if (!inputText.trim())
                return [2 /*return*/];
            // Add user message
            setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
                {
                    id: Date.now(),
                    sender: "user",
                    text: inputText,
                    timestamp: new Date(),
                },
            ], false); });
            userInput = inputText;
            setInputText("");
            // Simulate Saraswati "typing" / thinking
            setIsTyping(true);
            // Call Real AI
            mutation.mutate(userInput);
            return [2 /*return*/];
        });
    }); };
    return (<Layout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                        <Video className="h-5 w-5 text-indigo-500"/>
                        <span className="text-sm font-bold text-indigo-600">AI Video Call • Duolingo 2024 Style</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Video Call with Saraswati
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        सरस्वती के साथ वीडियो कॉल • Practice speaking with your AI English tutor
                    </p>
                </div>

                {!isCallActive ? (
        /* Pre-call Setup */
        <div className="grid md:grid-cols-2 gap-6">
                        {/* Scenario Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose a Scenario</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {scenarios.map(function (scenario) { return (<Button key={scenario.id} variant={selectedScenario.id === scenario.id ? "default" : "outline"} className="w-full justify-start h-auto py-4" onClick={function () { return setSelectedScenario(scenario); }}>
                                        <span className="text-2xl mr-3">{scenario.icon}</span>
                                        <div className="text-left">
                                            <p className="font-medium">{scenario.label}</p>
                                            <p className="text-xs opacity-70">Difficulty: {scenario.difficulty}</p>
                                        </div>
                                    </Button>); })}
                            </CardContent>
                        </Card>

                        {/* Call Preview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ready to Call?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex flex-col items-center justify-center">
                                    <div className="relative animate-in scale-in duration-500">
                                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-7xl md:text-8xl shadow-[0_0_50px_rgba(245,158,11,0.3)] border-4 border-white/20">
                                            {getEmotionEmoji(currentEmotion)}
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-500 rounded-full text-white text-sm font-bold shadow-lg flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"/>
                                            {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
                                        </div>
                                    </div>
                                    <p className="font-bold text-xl mt-8">Saraswati</p>
                                    <p className="text-muted-foreground">AI English Tutor</p>
                                    <Badge className="mt-2 bg-green-500">Online</Badge>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Sparkles className="h-4 w-4 text-amber-500"/>
                                        <span>Real-time conversation practice</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MessageCircle className="h-4 w-4 text-blue-500"/>
                                        <span>Instant Hindi translations</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-yellow-500"/>
                                        <span>No judgment, just practice!</span>
                                    </div>
                                </div>

                                <Button onClick={startCall} className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                                    <Phone className="mr-2 h-5 w-5"/>
                                    Start Video Call
                                </Button>
                            </CardContent>
                        </Card>
                    </div>) : (
        /* Active Call - IMMERSIVE MODE */
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
                        <div className="w-full max-w-6xl h-[90vh] grid lg:grid-cols-3 gap-6">
                            {/* Video Area */}
                            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
                                <Card className="overflow-hidden flex-1 bg-slate-900 border-none relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
                                        {/* Saraswati Avatar */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center transform transition-all duration-500 hover:scale-105">
                                                <div className={cn("w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-8xl shadow-2xl relative", isTyping && "animate-pulse ring-4 ring-amber-300/50")}>
                                                    🙏
                                                    {isTyping && (<span className="absolute -top-2 -right-2 flex h-8 w-8">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-8 w-8 bg-green-500"></span>
                                                        </span>)}
                                                </div>
                                                <p className="text-white text-3xl font-bold mt-6 mb-2">Saraswati</p>
                                                {isTyping ? (<p className="text-green-400 text-lg animate-pulse font-medium">Speaking...</p>) : (<p className="text-slate-400 text-lg font-medium">Listening...</p>)}
                                            </div>
                                        </div>

                                        {/* User Video (small) */}
                                        <div className="absolute bottom-6 right-6 w-48 h-36 bg-slate-800 rounded-xl border-2 border-white/20 flex items-center justify-center shadow-2xl overflow-hidden group hover:border-white/40 transition-colors">
                                            {isVideoOn ? (<User className="h-12 w-12 text-white/50"/>) : (<VideoOff className="h-12 w-12 text-red-400"/>)}
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white">You</div>
                                        </div>

                                        {/* Call Duration */}
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-red-600/90 rounded-full text-white text-sm font-bold flex items-center gap-2 animate-pulse">
                                            <div className="w-2 h-2 bg-white rounded-full"/>
                                            LIVE
                                        </div>
                                    </div>
                                </Card>

                                {/* Call Controls */}
                                <Card className="p-4 bg-slate-900/50 border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-6">
                                        <Button variant="outline" size="icon" className={cn("rounded-full h-14 w-14 border-2 transition-all hover:scale-110", !isMuted ? "bg-white/10 text-white border-white/20" : "bg-red-500/20 text-red-500 border-red-500")} onClick={function () { return setIsMuted(!isMuted); }} aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}>
                                            {isMuted ? <MicOff className="h-6 w-6"/> : <Mic className="h-6 w-6"/>}
                                        </Button>
                                        <Button size="icon" className="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/50 transition-all hover:scale-110" onClick={endCall} aria-label="End Call">
                                            <PhoneOff className="h-8 w-8"/>
                                        </Button>
                                        <Button variant="outline" size="icon" className={cn("rounded-full h-14 w-14 border-2 transition-all hover:scale-110", isVideoOn ? "bg-white/10 text-white border-white/20" : "bg-red-500/20 text-red-500 border-red-500")} onClick={function () { return setIsVideoOn(!isVideoOn); }} aria-label={isVideoOn ? "Turn Off Camera" : "Turn On Camera"}>
                                            {isVideoOn ? <Video className="h-6 w-6"/> : <VideoOff className="h-6 w-6"/>}
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Chat Panel - Integrated style */}
                            <Card className="flex flex-col h-full bg-slate-900/95 border-white/10">
                                <CardHeader className="border-b border-white/10">
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <MessageCircle className="h-5 w-5 text-blue-400"/>
                                        Conversation Transcript
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map(function (msg) { return (<div key={msg.id} className={cn("flex gap-3", msg.sender === "user" && "flex-row-reverse")}>
                                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg", msg.sender === "saraswati" ? "bg-amber-500" : "bg-blue-600")}>
                                                {msg.sender === "saraswati" ? "🙏" : <User className="h-4 w-4"/>}
                                            </div>
                                            <div className={cn("p-3 rounded-2xl max-w-[85%] shadow-md", msg.sender === "saraswati"
                    ? "bg-slate-800 text-slate-100 rounded-tl-none border border-white/5"
                    : "bg-blue-600 text-white rounded-tr-none")}>
                                                <p>{msg.text}</p>
                                                {msg.hindiMeaning && (<p className="text-xs mt-2 opacity-70 border-t border-white/10 pt-2 font-hindi text-amber-200/90">
                                                        {msg.hindiMeaning}
                                                    </p>)}
                                            </div>
                                        </div>); })}
                                    {isTyping && (<div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                                🙏
                                            </div>
                                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                                <div className="flex gap-1.5">
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"/>
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"/>
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"/>
                                                </div>
                                            </div>
                                        </div>)}
                                    <div ref={messagesEndRef}/>
                                </CardContent>
                                <div className="p-4 border-t border-white/10 bg-slate-900">
                                    <form onSubmit={function (e) {
                e.preventDefault();
                handleSendMessage();
            }} className="flex gap-2">
                                        <Input value={inputText} onChange={function (e) { return setInputText(e.target.value); }} placeholder="Type to speak..." className="flex-1 bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500" autoFocus/>
                                        <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                                            <Send className="h-4 w-4"/>
                                        </Button>
                                    </form>
                                    <p className="text-[10px] text-center mt-2 text-slate-500">Using AI Voice Simulation</p>
                                </div>
                            </Card>
                        </div>
                    </div>)}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                        <p className="text-sm font-medium">
                            Inspired by Duolingo "Video Call with Lily" 2024 • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                    </div>
                </footer>
            </div>
        </Layout>);
}
