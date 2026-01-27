import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle, Users, Globe, Mic, Heart, BookOpen, } from "lucide-react";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";
// Sample native speaker video data
var nativeSpeakerVideos = [
    {
        id: "1",
        title: "Ordering at a Restaurant",
        hindiTitle: "रेस्टोरेंट में ऑर्डर करना",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        speaker: {
            name: "Sarah Johnson",
            country: "USA 🇺🇸",
            accent: "American English",
        },
        difficulty: "Beginner",
        duration: "2:30",
        phrases: [
            { english: "I'd like to order, please.", hindi: "मैं ऑर्डर करना चाहूंगा।", timestamp: 5 },
            { english: "Could I have the menu?", hindi: "क्या मुझे मेन्यू मिल सकता है?", timestamp: 15 },
            { english: "What do you recommend?", hindi: "आप क्या सुझाव देंगे?", timestamp: 28 },
            { english: "I'll have the chicken curry.", hindi: "मुझे चिकन करी दीजिए।", timestamp: 42 },
            { english: "Could I get the bill, please?", hindi: "क्या मुझे बिल मिल सकता है?", timestamp: 58 },
        ],
        xpReward: 25,
    },
    {
        id: "2",
        title: "Bargaining in Delhi",
        hindiTitle: "दिल्ली में मोलभाव",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60",
        speaker: {
            name: "Priya Sharma",
            country: "India 🇮🇳",
            accent: "Indian English",
        },
        difficulty: "Intermediate",
        duration: "3:45",
        phrases: [
            { english: "How much is this for?", hindi: "यह कितने का है?", timestamp: 8 },
            { english: "That's too expensive!", hindi: "यह बहुत महंगा है!", timestamp: 25 },
            { english: "Can you give me a discount?", hindi: "क्या आप सही दाम लगाएंगे?", timestamp: 45 },
            { english: "I'll take two of these.", hindi: "मैं ऐसे दो लूंगा।", timestamp: 68 },
        ],
        xpReward: 50,
    },
    {
        id: "3",
        title: "Job Interview Basics",
        hindiTitle: "जॉब इंटरव्यू की मूल बातें",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60",
        speaker: {
            name: "James Smith",
            country: "UK 🇬🇧",
            accent: "British English",
        },
        difficulty: "Advanced",
        duration: "4:15",
        phrases: [
            { english: "Tell me about yourself.", hindi: "अपने बारे में बताइए।", timestamp: 8 },
            { english: "I have 5 years of experience.", hindi: "मुझे 5 साल का अनुभव है।", timestamp: 25 },
            { english: "I'm a quick learner.", hindi: "मैं जल्दी सीखने वाला हूं।", timestamp: 45 },
            { english: "What are your strengths?", hindi: "आपकी ताकतें क्या हैं?", timestamp: 68 },
        ],
        xpReward: 35,
    },
];
export default function NativeSpeakerVideos() {
    var _a = useState(nativeSpeakerVideos[0]), selectedVideo = _a[0], setSelectedVideo = _a[1];
    var _b = useState(0), currentPhraseIndex = _b[0], setCurrentPhraseIndex = _b[1];
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var _d = useState(false), isMuted = _d[0], setIsMuted = _d[1];
    var _e = useState(new Set()), completedPhrases = _e[0], setCompletedPhrases = _e[1];
    var _f = useState(true), showHindi = _f[0], setShowHindi = _f[1];
    var playAudio = function (text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };
    var handlePhraseComplete = function () {
        setCompletedPhrases(new Set(Array.from(completedPhrases).concat([currentPhraseIndex])));
        if (currentPhraseIndex < selectedVideo.phrases.length - 1) {
            setCurrentPhraseIndex(currentPhraseIndex + 1);
        }
    };
    var progress = (completedPhrases.size / selectedVideo.phrases.length) * 100;
    return (<Layout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
                        <Users className="h-5 w-5 text-orange-500"/>
                        <span className="text-sm font-bold text-orange-600">Learn with Native Speakers</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Native Speaker Videos
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        देशी वक्ता वीडियो • Learn authentic pronunciation from real English speakers
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Video List */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-500"/>
                            Available Videos
                        </h3>
                        {nativeSpeakerVideos.map(function (video) { return (<Card key={video.id} className={cn("cursor-pointer transition-all hover:shadow-lg", selectedVideo.id === video.id && "ring-2 ring-primary border-primary")} onClick={function () {
                setSelectedVideo(video);
                setCurrentPhraseIndex(0);
                setCompletedPhrases(new Set());
            }}>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                                            <img src={video.thumbnail} alt={"Thumbnail for ".concat(video.title, " video")} loading="lazy" width="80" height="48" className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{video.title}</h4>
                                            <p className="text-sm text-muted-foreground">{video.hindiTitle}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {video.difficulty}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{video.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>); })}
                    </div>

                    {/* Main Video Player */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Container */}
                        <Card className="overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative">
                                {/* Placeholder for video */}
                                <img src={selectedVideo.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Video thumbnail"/>
                                <div className="text-center space-y-4 relative z-10">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-white/20">
                                        {isPlaying ? (<div className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin"/>) : (<Play className="h-8 w-8 text-white fill-white ml-1"/>)}
                                    </div>
                                    <p className="text-white font-bold text-lg drop-shadow-md">
                                        {isPlaying ? "Connecting to stream..." : "Watch Video Lesson"}
                                    </p>
                                    <Button size="lg" className="rounded-full" onClick={function () {
            var newPlayingState = !isPlaying;
            setIsPlaying(newPlayingState);
            if (newPlayingState) {
                analytics.track('video_watched', {
                    videoId: selectedVideo.id,
                    title: selectedVideo.title,
                    speaker: selectedVideo.speaker.name
                });
            }
        }} aria-label={isPlaying ? "Pause Video" : "Play Video"}>
                                        {isPlaying ? (<Pause className="h-6 w-6"/>) : (<Play className="h-6 w-6 ml-1"/>)}
                                    </Button>
                                </div>

                                {/* Video Controls Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={function () { return setIsMuted(!isMuted); }}>
                                            {isMuted ? <VolumeX className="h-5 w-5"/> : <Volume2 className="h-5 w-5"/>}
                                        </Button>
                                        <Progress value={progress} className="flex-1"/>
                                        <span className="text-white text-sm">{selectedVideo.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-4">
                                {/* Speaker Info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                                            {selectedVideo.speaker.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{selectedVideo.speaker.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {selectedVideo.speaker.country} • {selectedVideo.speaker.accent}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className="bg-orange-500">
                                        +{selectedVideo.xpReward} XP
                                    </Badge>
                                </div>

                                <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                                <p className="text-lg text-muted-foreground">{selectedVideo.hindiTitle}</p>
                            </CardContent>
                        </Card>

                        {/* Phrase Practice */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-blue-500"/>
                                        Key Phrases ({currentPhraseIndex + 1}/{selectedVideo.phrases.length})
                                    </span>
                                    <Button variant="outline" size="sm" onClick={function () { return setShowHindi(!showHindi); }}>
                                        {showHindi ? "Hide Hindi" : "Show Hindi"}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Current Phrase */}
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 cursor-pointer group" onClick={function () { return playAudio(selectedVideo.phrases[currentPhraseIndex].english); }}>
                                    <p className="text-2xl font-bold text-center mb-4 group-hover:text-primary transition-colors">
                                        {selectedVideo.phrases[currentPhraseIndex].english}
                                    </p>
                                    {showHindi && (<p className="text-xl text-center text-blue-600 dark:text-blue-400">
                                            {selectedVideo.phrases[currentPhraseIndex].hindi}
                                        </p>)}
                                    <div className="flex justify-center gap-3 mt-4">
                                        <Button variant="outline" size="icon" className="group-hover:bg-primary group-hover:text-white transition-all">
                                            <Volume2 className="h-4 w-4"/>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={function (e) { e.stopPropagation(); /* Implement mic logic later if needed */ }}>
                                            <Mic className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between">
                                    <Button variant="outline" disabled={currentPhraseIndex === 0} onClick={function () { return setCurrentPhraseIndex(currentPhraseIndex - 1); }}>
                                        <ChevronLeft className="h-4 w-4 mr-1"/>
                                        Previous
                                    </Button>

                                    <div className="flex gap-1">
                                        {selectedVideo.phrases.map(function (_, i) { return (<div key={i} className={cn("w-3 h-3 rounded-full transition-colors", i === currentPhraseIndex
                ? "bg-primary"
                : completedPhrases.has(i)
                    ? "bg-green-500"
                    : "bg-secondary")}/>); })}
                                    </div>

                                    {currentPhraseIndex < selectedVideo.phrases.length - 1 ? (<Button onClick={handlePhraseComplete}>
                                            Next
                                            <ChevronRight className="h-4 w-4 ml-1"/>
                                        </Button>) : (<Button className="bg-green-500 hover:bg-green-600" onClick={handlePhraseComplete}>
                                            <CheckCircle className="h-4 w-4 mr-2"/>
                                            Complete
                                        </Button>)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                        <p className="text-sm font-medium">
                            Inspired by Memrise "Learn with Locals" • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                    </div>
                </footer>
            </div>
        </Layout>);
}
