import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Users, Radio, Sparkles, Trophy, Brain, MessageCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for active rooms
const activeRooms = [
    { id: 1, name: "Daily Conversation Practice", participants: 7, topic: "Shopping at the Mall", level: "Beginner", host: "Saraswati AI", isLive: true },
    { id: 2, name: "Business English Hour", participants: 4, topic: "Job Interview Prep", level: "Intermediate", host: "Preet AI", isLive: true },
    { id: 3, name: "Pronunciation Workshop", participants: 12, topic: "Common Sounds for Hindi Speakers", level: "All Levels", host: "Arya AI", isLive: true },
];

export default function Voicerooms() {
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isInRoom, setIsInRoom] = useState(false);

    const handleJoinRoom = (roomId: number) => {
        setSelectedRoom(roomId);
        setIsInRoom(true);
    };

    const handleLeaveRoom = () => {
        setSelectedRoom(null);
        setIsInRoom(false);
        setIsMicOn(false);
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent flex items-center justify-center gap-3">
                        <Radio className="h-10 w-10 text-primary animate-pulse" />
                        AI Voicerooms
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Practice speaking English in real-time group sessions
                    </p>
                    <p className="text-primary font-hindi">
                        एआई से सीधे बात करें और अपनी अंग्रेजी बोलने की क्षमता बढ़ाएं!
                    </p>
                </div>

                {!isInRoom ? (
                    /* Room Selection View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeRooms.map((room) => (
                            <Card
                                key={room.id}
                                className={cn(
                                    "cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:scale-[1.02]",
                                    "border-2 border-white/10 bg-gradient-to-br from-background to-primary/5"
                                )}
                                onClick={() => handleJoinRoom(room.id)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-500">
                                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                                            LIVE
                                        </Badge>
                                        <Badge variant="secondary">{room.level}</Badge>
                                    </div>
                                    <CardTitle className="text-xl mt-2">{room.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">Hosted by {room.host}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <MessageCircle className="h-4 w-4 text-primary" />
                                            <span className="font-medium">Topic:</span>
                                            <span className="text-muted-foreground">{room.topic}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="h-4 w-4 text-primary" />
                                            <span>{room.participants} learners active</span>
                                        </div>
                                        <Button className="w-full mt-4 rounded-xl font-bold" size="lg">
                                            Join Room
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Active Room View */
                    <Card className="border-2 border-primary/30 bg-gradient-to-br from-background via-primary/5 to-background">
                        <CardHeader className="border-b border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-500 mb-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                                        LIVE SESSION
                                    </Badge>
                                    <CardTitle className="text-2xl">{activeRooms.find(r => r.id === selectedRoom)?.name}</CardTitle>
                                    <p className="text-muted-foreground mt-1">Topic: {activeRooms.find(r => r.id === selectedRoom)?.topic}</p>
                                </div>
                                <Button variant="destructive" onClick={handleLeaveRoom} className="rounded-xl">
                                    Leave Room
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Participants */}
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        Active Participants
                                    </h3>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                        {/* AI Host */}
                                        <div className="flex flex-col items-center p-4 bg-primary/10 rounded-xl border border-primary/30">
                                            <Avatar className="h-16 w-16 border-2 border-primary">
                                                <AvatarFallback className="bg-primary text-primary-foreground"><Brain className="h-8 w-8" /></AvatarFallback>
                                            </Avatar>
                                            <span className="font-bold mt-2 text-sm">Saraswati AI</span>
                                            <Badge className="mt-1 text-xs bg-primary/20 text-primary">Host</Badge>
                                            <div className="mt-2 flex items-center gap-1 text-xs text-green-500">
                                                <Mic className="h-3 w-3" /> Speaking
                                            </div>
                                        </div>
                                        {/* Simulated Participants */}
                                        {["You", "Rahul", "Priya", "Amit"].map((name, i) => (
                                            <div key={i} className="flex flex-col items-center p-4 bg-secondary/30 rounded-xl border border-white/10">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarFallback>{name[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold mt-2 text-sm">{name}</span>
                                                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                                    {name === "You" && isMicOn ? <Mic className="h-3 w-3 text-green-500" /> : <MicOff className="h-3 w-3" />}
                                                    {name === "You" && isMicOn ? "Mic On" : "Muted"}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Controls & Feedback */}
                                <div className="space-y-4">
                                    <Card className="bg-secondary/50 border-white/10">
                                        <CardContent className="p-4 text-center space-y-4">
                                            <h3 className="font-bold">Your Microphone</h3>
                                            <Button
                                                size="lg"
                                                variant={isMicOn ? "default" : "outline"}
                                                className={cn("w-24 h-24 rounded-full", isMicOn && "bg-primary animate-pulse")}
                                                onClick={() => setIsMicOn(!isMicOn)}
                                            >
                                                {isMicOn ? <Mic className="h-10 w-10" /> : <MicOff className="h-10 w-10" />}
                                            </Button>
                                            <p className="text-xs text-muted-foreground">{isMicOn ? "Tap to mute" : "Tap to speak"}</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/30">
                                        <CardContent className="p-4 text-center">
                                            <Trophy className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                                            <h3 className="font-bold text-amber-600">Session Tip</h3>
                                            <p className="text-sm text-muted-foreground">Listen more than you speak. When you do speak, the AI will give you feedback!</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
}
