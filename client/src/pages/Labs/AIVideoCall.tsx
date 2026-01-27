import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    MessageCircle,
    Sparkles,
    Volume2,
    Heart,
    Star,
    Send,
    Bot,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Saraswati's responses
const saraswatiResponses = [
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
const scenarios = [
    { id: "casual", label: "Casual Chat", icon: "💬", difficulty: "Easy" },
    { id: "interview", label: "Job Interview", icon: "💼", difficulty: "Medium" },
    { id: "travel", label: "Travel Help", icon: "✈️", difficulty: "Easy" },
    { id: "business", label: "Business Call", icon: "📊", difficulty: "Hard" },
];

interface Message {
    id: number;
    sender: "user" | "saraswati";
    text: string;
    hindiMeaning?: string;
    timestamp: Date;
}

export default function AIVideoCall() {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentEmotion, setCurrentEmotion] = useState<string>("happy");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getEmotionEmoji = (emotion: string) => {
        switch (emotion?.toLowerCase()) {
            case "surprised": return "😲";
            case "thinking": return "🤔";
            case "encouraging": return "✨";
            case "listening": return "👂";
            default: return "🙏";
        }
    };

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const startCall = () => {
        setIsCallActive(true);
        // Add welcome message from Saraswati
        addSaraswatiMessage(
            "Namaste! 🙏 Welcome to the video call. I'm Saraswati, your AI English practice partner. Let's practice together!",
            "नमस्ते! 🙏 वीडियो कॉल में स्वागत है। मैं सरस्वती हूं, आपकी AI अंग्रेज़ी अभ्यास साथी। आइए साथ मिलकर अभ्यास करें!"
        );
    };

    const endCall = () => {
        setIsCallActive(false);
        setMessages([]);
    };

    const addSaraswatiMessage = (text: string, hindiMeaning: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: "saraswati",
                text,
                hindiMeaning,
                timestamp: new Date(),
            },
        ]);
    };

    const mutation = useMutation({
        mutationFn: async (message: string) => {
            const res = await apiRequest("POST", "/api/ai/video-chat", {
                message,
                history: messages.map(m => m.text),
                scenario: selectedScenario.label,
                level: selectedScenario.difficulty
            });
            return res.json();
        },
        onSuccess: (data: { text: string; hindiMeaning: string; emotion: string }) => {
            setIsTyping(false);
            setCurrentEmotion(data.emotion || "happy");
            addSaraswatiMessage(data.text, data.hindiMeaning);
        },
        onError: () => {
            setIsTyping(false);
            addSaraswatiMessage(
                "I'm having trouble connecting to the server. Please try again.",
                "सर्वर से कनेक्ट करने में समस्या हो रही है। कृपया पुनः प्रयास करें।"
            );
        }
    });

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: "user",
                text: inputText,
                timestamp: new Date(),
            },
        ]);

        const userInput = inputText;
        setInputText("");

        // Simulate Saraswati "typing" / thinking
        setIsTyping(true);

        // Call Real AI
        mutation.mutate(userInput);
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                        <Video className="h-5 w-5 text-indigo-500" />
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
                                {scenarios.map((scenario) => (
                                    <Button
                                        key={scenario.id}
                                        variant={selectedScenario.id === scenario.id ? "default" : "outline"}
                                        className="w-full justify-start h-auto py-4"
                                        onClick={() => setSelectedScenario(scenario)}
                                    >
                                        <span className="text-2xl mr-3">{scenario.icon}</span>
                                        <div className="text-left">
                                            <p className="font-medium">{scenario.label}</p>
                                            <p className="text-xs opacity-70">Difficulty: {scenario.difficulty}</p>
                                        </div>
                                    </Button>
                                ))}
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
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
                                        </div>
                                    </div>
                                    <p className="font-bold text-xl mt-8">Saraswati</p>
                                    <p className="text-muted-foreground">AI English Tutor</p>
                                    <Badge className="mt-2 bg-green-500">Online</Badge>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Sparkles className="h-4 w-4 text-amber-500" />
                                        <span>Real-time conversation practice</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MessageCircle className="h-4 w-4 text-blue-500" />
                                        <span>Instant Hindi translations</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>No judgment, just practice!</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={startCall}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                >
                                    <Phone className="mr-2 h-5 w-5" />
                                    Start Video Call
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
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
                                                <div className={cn(
                                                    "w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-8xl shadow-2xl relative",
                                                    isTyping && "animate-pulse ring-4 ring-amber-300/50"
                                                )}>
                                                    🙏
                                                    {isTyping && (
                                                        <span className="absolute -top-2 -right-2 flex h-8 w-8">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-8 w-8 bg-green-500"></span>
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white text-3xl font-bold mt-6 mb-2">Saraswati</p>
                                                {isTyping ? (
                                                    <p className="text-green-400 text-lg animate-pulse font-medium">Speaking...</p>
                                                ) : (
                                                    <p className="text-slate-400 text-lg font-medium">Listening...</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* User Video (small) */}
                                        <div className="absolute bottom-6 right-6 w-48 h-36 bg-slate-800 rounded-xl border-2 border-white/20 flex items-center justify-center shadow-2xl overflow-hidden group hover:border-white/40 transition-colors">
                                            {isVideoOn ? (
                                                <User className="h-12 w-12 text-white/50" />
                                            ) : (
                                                <VideoOff className="h-12 w-12 text-red-400" />
                                            )}
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white">You</div>
                                        </div>

                                        {/* Call Duration */}
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-red-600/90 rounded-full text-white text-sm font-bold flex items-center gap-2 animate-pulse">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                            LIVE
                                        </div>
                                    </div>
                                </Card>

                                {/* Call Controls */}
                                <Card className="p-4 bg-slate-900/50 border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-6">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className={cn("rounded-full h-14 w-14 border-2 transition-all hover:scale-110", !isMuted ? "bg-white/10 text-white border-white/20" : "bg-red-500/20 text-red-500 border-red-500")}
                                            onClick={() => setIsMuted(!isMuted)}
                                            aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                                        >
                                            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/50 transition-all hover:scale-110"
                                            onClick={endCall}
                                            aria-label="End Call"
                                        >
                                            <PhoneOff className="h-8 w-8" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className={cn("rounded-full h-14 w-14 border-2 transition-all hover:scale-110", isVideoOn ? "bg-white/10 text-white border-white/20" : "bg-red-500/20 text-red-500 border-red-500")}
                                            onClick={() => setIsVideoOn(!isVideoOn)}
                                            aria-label={isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
                                        >
                                            {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Chat Panel - Integrated style */}
                            <Card className="flex flex-col h-full bg-slate-900/95 border-white/10">
                                <CardHeader className="border-b border-white/10">
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <MessageCircle className="h-5 w-5 text-blue-400" />
                                        Conversation Transcript
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex gap-3",
                                                msg.sender === "user" && "flex-row-reverse"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg",
                                                msg.sender === "saraswati" ? "bg-amber-500" : "bg-blue-600"
                                            )}>
                                                {msg.sender === "saraswati" ? "🙏" : <User className="h-4 w-4" />}
                                            </div>
                                            <div className={cn(
                                                "p-3 rounded-2xl max-w-[85%] shadow-md",
                                                msg.sender === "saraswati"
                                                    ? "bg-slate-800 text-slate-100 rounded-tl-none border border-white/5"
                                                    : "bg-blue-600 text-white rounded-tr-none"
                                            )}>
                                                <p>{msg.text}</p>
                                                {msg.hindiMeaning && (
                                                    <p className="text-xs mt-2 opacity-70 border-t border-white/10 pt-2 font-hindi text-amber-200/90">
                                                        {msg.hindiMeaning}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                                🙏
                                            </div>
                                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                                <div className="flex gap-1.5">
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </CardContent>
                                <div className="p-4 border-t border-white/10 bg-slate-900">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }}
                                        className="flex gap-2"
                                    >
                                        <Input
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="Type to speak..."
                                            className="flex-1 bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
                                            autoFocus
                                        />
                                        <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                    <p className="text-[10px] text-center mt-2 text-slate-500">Using AI Voice Simulation</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <p className="text-sm font-medium">
                            Inspired by Duolingo "Video Call with Lily" 2024 • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
