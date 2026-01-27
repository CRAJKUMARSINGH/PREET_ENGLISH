import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Eye, EyeOff, Newspaper, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
export default function BilingualReader() {
    var _a, _b;
    var _c = useState(0), currentSentence = _c[0], setCurrentSentence = _c[1];
    var _d = useState(false), isPlaying = _d[0], setIsPlaying = _d[1];
    var _e = useState(true), showHindi = _e[0], setShowHindi = _e[1];
    var _f = useState(0), selectedStoryIndex = _f[0], setSelectedStoryIndex = _f[1];
    var _g = useQuery({
        queryKey: ["/api/stories"],
    }), stories = _g.data, isLoading = _g.isLoading, error = _g.error;
    var currentStory = stories === null || stories === void 0 ? void 0 : stories[selectedStoryIndex];
    // Parse content if it's stored as JSON string, or handle structured text
    var sentences = currentStory
        ? typeof currentStory.content === 'string'
            ? JSON.parse(currentStory.content).sentences || []
            : []
        : [];
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
    var handleNext = function () {
        if (sentences && currentSentence < sentences.length - 1) {
            setCurrentSentence(currentSentence + 1);
        }
    };
    var handlePrev = function () {
        if (currentSentence > 0) {
            setCurrentSentence(currentSentence - 1);
        }
    };
    if (isLoading) {
        return (<Layout>
                <div className="max-w-4xl mx-auto space-y-6 p-6">
                    <Skeleton className="h-12 w-3/4 mx-auto"/>
                    <Skeleton className="h-[400px] w-full rounded-xl"/>
                </div>
            </Layout>);
    }
    if (error || !stories || stories.length === 0) {
        return (<Layout>
                <div className="max-w-4xl mx-auto p-6">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Could not load stories. Please try again later.
                        </AlertDescription>
                    </Alert>
                </div>
            </Layout>);
    }
    // Fallback if content parsing fails
    if (!sentences || sentences.length === 0) {
        return (<Layout>
                <div className="max-w-4xl mx-auto p-6">
                    <Alert>
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>No Content</AlertTitle>
                        <AlertDescription>
                            This story exists but has no readable content content.
                        </AlertDescription>
                    </Alert>
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-4">
                        {stories.map(function (s, i) { return (<Button key={s.id} variant={i === selectedStoryIndex ? "default" : "outline"} onClick={function () { return setSelectedStoryIndex(i); }}>
                                {s.title}
                            </Button>); })}
                    </div>
                </div>
            </Layout>);
    }
    return (<Layout>
            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center justify-center gap-3">
                        <Newspaper className="h-10 w-10 text-blue-500"/>
                        Bilingual News Waves
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Read stories side-by-side in English and Hindi
                    </p>
                    <p className="text-primary font-hindi">
                        अंग्रेजी और हिंदी में कहानियाँ साथ-साथ पढ़ें
                    </p>
                </div>

                {/* Story Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2 px-4 justify-center">
                    {stories.map(function (s, i) { return (<Button key={s.id} variant={i === selectedStoryIndex ? "default" : "outline"} onClick={function () { setSelectedStoryIndex(i); setCurrentSentence(0); }} className="whitespace-nowrap">
                            {s.title}
                        </Button>); })}
                </div>

                {/* Story Card */}
                <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-background via-purple-500/5 to-background shadow-xl">
                    <CardHeader className="border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <Badge variant="secondary" className="mb-2">{(currentStory === null || currentStory === void 0 ? void 0 : currentStory.category) || "Story"}</Badge>
                                <CardTitle className="text-2xl">{currentStory === null || currentStory === void 0 ? void 0 : currentStory.title}</CardTitle>
                                <p className="text-muted-foreground font-hindi">{currentStory === null || currentStory === void 0 ? void 0 : currentStory.titleHindi}</p>
                            </div>
                            <Button variant="outline" onClick={function () { return setShowHindi(!showHindi); }} className="rounded-full gap-2">
                                {showHindi ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                {showHindi ? "Hide Hindi" : "Show Hindi"}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 md:p-10">
                        {/* Karaoke-style sentence display */}
                        <div className="min-h-[200px] flex flex-col items-center justify-center text-center space-y-6 cursor-pointer" onClick={function () { var _a; return playAudio((_a = sentences[currentSentence]) === null || _a === void 0 ? void 0 : _a.english); }}>
                            <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed animate-in fade-in duration-500 hover:text-primary transition-colors">
                                {((_a = sentences[currentSentence]) === null || _a === void 0 ? void 0 : _a.english) || "..."}
                                <Volume2 className="inline ml-2 h-6 w-6 opacity-30 group-hover:opacity-100"/>
                            </p>
                            {showHindi && (<p className="text-xl md:text-2xl text-purple-500 font-hindi animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {((_b = sentences[currentSentence]) === null || _b === void 0 ? void 0 : _b.hindi) || "..."}
                                </p>)}
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-8 flex justify-center gap-2 flex-wrap">
                            {sentences.map(function (_, i) { return (<div key={i} className={cn("w-3 h-3 rounded-full transition-all duration-300 cursor-pointer", i === currentSentence ? "bg-purple-500 scale-125" : "bg-white/20 hover:bg-white/40")} onClick={function () { return setCurrentSentence(i); }}/>); })}
                        </div>

                        {/* Controls */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentSentence === 0} className="rounded-full">
                                Previous
                            </Button>
                            <Button size="lg" onClick={function () {
            var _a;
            if (isPlaying) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
            }
            else {
                playAudio((_a = sentences[currentSentence]) === null || _a === void 0 ? void 0 : _a.english);
            }
        }} className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                                {isPlaying ? <Pause className="h-8 w-8"/> : <Play className="h-8 w-8"/>}
                            </Button>
                            <Button variant="outline" size="lg" onClick={handleNext} disabled={currentSentence === sentences.length - 1} className="rounded-full">
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
                    <CardContent className="p-4 flex items-start gap-4">
                        <Sparkles className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold text-purple-600">💡 Learning Tip</h3>
                            <p className="text-sm text-muted-foreground">Tap any sentence to hear its pronunciation. Try reading the English first, then reveal the Hindi for context!</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>);
}
