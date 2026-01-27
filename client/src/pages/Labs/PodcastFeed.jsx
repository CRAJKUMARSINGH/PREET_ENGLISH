import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Headphones, Clock, Heart, Download, Share2, ListMusic, Radio, } from "lucide-react";
import { cn } from "@/lib/utils";
// Podcast episodes data
var podcastEpisodes = [
    {
        id: "1",
        title: "Daily English Conversations",
        hindiTitle: "रोज़ाना अंग्रेज़ी बातचीत",
        description: "Learn essential phrases for everyday conversations",
        duration: "15:30",
        durationSeconds: 930,
        thumbnail: "🎙️",
        category: "Beginner",
        plays: 12500,
        isNew: true,
        topics: ["Greetings", "Shopping", "Restaurants"],
    },
    {
        id: "2",
        title: "Business English Essentials",
        hindiTitle: "व्यापारिक अंग्रेज़ी की मूल बातें",
        description: "Professional vocabulary for the workplace",
        duration: "22:45",
        durationSeconds: 1365,
        thumbnail: "💼",
        category: "Intermediate",
        plays: 8900,
        isNew: false,
        topics: ["Meetings", "Emails", "Presentations"],
    },
    {
        id: "3",
        title: "English Grammar Explained in Hindi",
        hindiTitle: "हिंदी में अंग्रेज़ी व्याकरण",
        description: "Complex grammar concepts made simple",
        duration: "18:20",
        durationSeconds: 1100,
        thumbnail: "📚",
        category: "All Levels",
        plays: 15200,
        isNew: true,
        topics: ["Tenses", "Articles", "Prepositions"],
    },
    {
        id: "4",
        title: "Vocabulary Building Power Hour",
        hindiTitle: "शब्दावली बनाने का पावर आवर",
        description: "50 new words with context and usage",
        duration: "25:00",
        durationSeconds: 1500,
        thumbnail: "🧠",
        category: "Intermediate",
        plays: 6700,
        isNew: false,
        topics: ["Academic", "IELTS", "TOEFL"],
    },
    {
        id: "5",
        title: "Pronunciation Practice Lab",
        hindiTitle: "उच्चारण अभ्यास लैब",
        description: "Master difficult English sounds",
        duration: "12:15",
        durationSeconds: 735,
        thumbnail: "🗣️",
        category: "Beginner",
        plays: 9800,
        isNew: false,
        topics: ["Vowels", "Consonants", "Stress"],
    },
];
export default function PodcastFeed() {
    var _a = useState(podcastEpisodes[0]), currentEpisode = _a[0], setCurrentEpisode = _a[1];
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = useState(false), isMuted = _c[0], setIsMuted = _c[1];
    var _d = useState(0), currentTime = _d[0], setCurrentTime = _d[1];
    var _e = useState([80]), volume = _e[0], setVolume = _e[1];
    var _f = useState(1), playbackSpeed = _f[0], setPlaybackSpeed = _f[1];
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        return "".concat(mins, ":").concat(secs.toString().padStart(2, "0"));
    };
    var progress = (currentTime / currentEpisode.durationSeconds) * 100;
    var handleSpeedChange = function () {
        var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        var currentIndex = speeds.indexOf(playbackSpeed);
        setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
    };
    return (<Layout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                        <Headphones className="h-5 w-5 text-green-500"/>
                        <span className="text-sm font-bold text-green-600">Audio Learning • Babbel Style</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Podcast Feed
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        पॉडकास्ट फ़ीड • Learn English on the go with audio lessons
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Episode List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <ListMusic className="h-5 w-5 text-green-500"/>
                                Episodes
                            </h3>
                            <Badge variant="secondary">{podcastEpisodes.length} episodes</Badge>
                        </div>

                        <div className="space-y-3">
                            {podcastEpisodes.map(function (episode) { return (<Card key={episode.id} className={cn("cursor-pointer transition-all hover:shadow-lg", currentEpisode.id === episode.id && "ring-2 ring-green-500 border-green-500")} onClick={function () {
                setCurrentEpisode(episode);
                setCurrentTime(0);
            }}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="text-4xl shrink-0">{episode.thumbnail}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-medium truncate">{episode.title}</h4>
                                                    {episode.isNew && (<Badge className="bg-green-500 shrink-0">NEW</Badge>)}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{episode.hindiTitle}</p>
                                                <p className="text-sm text-muted-foreground line-clamp-1">{episode.description}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {episode.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3"/>
                                                        {episode.duration}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {episode.plays.toLocaleString()} plays
                                                    </span>
                                                </div>
                                            </div>
                                            <Button size="icon" variant={currentEpisode.id === episode.id && isPlaying ? "default" : "outline"} className="shrink-0" onClick={function (e) {
                e.stopPropagation();
                if (currentEpisode.id === episode.id) {
                    setIsPlaying(!isPlaying);
                }
                else {
                    setCurrentEpisode(episode);
                    setCurrentTime(0);
                    setIsPlaying(true);
                }
            }}>
                                                {currentEpisode.id === episode.id && isPlaying ? (<Pause className="h-4 w-4"/>) : (<Play className="h-4 w-4"/>)}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>); })}
                        </div>
                    </div>

                    {/* Now Playing Panel */}
                    <div className="space-y-6">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Radio className="h-5 w-5 text-green-500 animate-pulse"/>
                                    Now Playing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Episode Info */}
                                <div className="text-center space-y-3">
                                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-5xl shadow-xl">
                                        {currentEpisode.thumbnail}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{currentEpisode.title}</h3>
                                        <p className="text-sm text-muted-foreground">{currentEpisode.hindiTitle}</p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="space-y-2">
                                    <Progress value={progress} className="h-2"/>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{currentEpisode.duration}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant="ghost" size="icon" onClick={function () { return setCurrentTime(Math.max(0, currentTime - 15)); }}>
                                        <SkipBack className="h-5 w-5"/>
                                    </Button>
                                    <Button size="lg" className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600" onClick={function () { return setIsPlaying(!isPlaying); }}>
                                        {isPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6 ml-1"/>}
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={function () { return setCurrentTime(Math.min(currentEpisode.durationSeconds, currentTime + 15)); }}>
                                        <SkipForward className="h-5 w-5"/>
                                    </Button>
                                </div>

                                {/* Speed & Volume */}
                                <div className="flex items-center justify-between">
                                    <Button variant="outline" size="sm" onClick={handleSpeedChange}>
                                        {playbackSpeed}x
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={function () { return setIsMuted(!isMuted); }}>
                                            {isMuted ? <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}
                                        </Button>
                                        <Slider value={isMuted ? [0] : volume} onValueChange={setVolume} max={100} step={1} className="w-20"/>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="h-4 w-4 mr-2"/>
                                        Share
                                    </Button>
                                </div>

                                {/* Topics */}
                                <div>
                                    <p className="text-sm font-medium mb-2">Topics Covered:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {currentEpisode.topics.map(function (topic) { return (<Badge key={topic} variant="secondary">
                                                {topic}
                                            </Badge>); })}
                                    </div>
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
                            Inspired by Babbel Podcasts • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
                    </div>
                </footer>
            </div>
        </Layout>);
}
