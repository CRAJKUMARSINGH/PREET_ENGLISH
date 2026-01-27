import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, Volume2, Sparkles, BookOpen } from "lucide-react";
import { RatingDialog } from "@/components/RatingDialog";
import { Link, useParams, useLocation } from "wouter";
import { useState } from "react";
import { useSpeech } from "@/hooks/use-speech";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";
export default function StoryView() {
    var id = useParams().id;
    var _a = useLocation(), setLocation = _a[1];
    var toast = useToast().toast;
    var trackEvent = useAnalytics().trackEvent;
    var _b = useState(true), showHindi = _b[0], setShowHindi = _b[1];
    var _c = useState(false), showRating = _c[0], setShowRating = _c[1];
    var speak = useSpeech().speak;
    var _d = useQuery({
        queryKey: ["/api/stories/".concat(id)],
    }), story = _d.data, isLoading = _d.isLoading;
    useEffect(function () {
        if (story) {
            trackEvent("story_start", { storyId: story.id, title: story.title });
        }
    }, [story, trackEvent]);
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>);
    }
    if (!story)
        return <div>Story not found</div>;
    // Simple parser for parallel content if needed, 
    // but for now we'll assume content and contentHindi are full chunks.
    return (<Layout>
            <SEO title={(story === null || story === void 0 ? void 0 : story.title) || "Story"} description={(story === null || story === void 0 ? void 0 : story.description) || "Interactive Hindi-English stories."} ogType="article"/>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <Link href="/hindi-stories">
                        <Button variant="ghost" className="rounded-full w-fit">
                            <ArrowLeft className="h-4 w-4 mr-2"/> Back to Stories
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant={showHindi ? "default" : "outline"} className="rounded-full h-10 px-6 font-bold" onClick={function () { return setShowHindi(!showHindi); }}>
                            <Languages className="h-4 w-4 mr-2"/> {showHindi ? "Hide Hindi Translation" : "Show Hindi Translation"}
                        </Button>
                    </div>
                </div>

                <article className="space-y-12">
                    <header className="space-y-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            {story.title}
                        </h1>
                        <p className="text-2xl font-hindi text-primary font-medium">
                            {story.titleHindi}
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground pt-2">
                            <span className="bg-primary/5 px-3 py-1 rounded-full">{story.category}</span>
                            <span>•</span>
                            <span className="bg-amber-500/10 text-amber-700 px-3 py-1 rounded-full">{story.difficulty}</span>
                        </div>
                    </header>

                    <div className="relative group">
                        <img src={story.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200"} alt={story.title} className="w-full h-64 md:h-96 object-cover rounded-[2rem] shadow-2xl border-4 border-white dark:border-slate-800"/>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-8 rounded-b-[2rem]">
                            <p className="text-white text-lg font-medium leading-relaxed italic max-w-2xl mx-auto text-center">
                                "{story.description}"
                            </p>
                        </div>
                    </div>

                    <div className="space-y-12 leading-relaxed">
                        {/* Logic: Split content by paragraphs and show side-by-side or stacked */}
                        {story.content.split('\n\n').map(function (para, idx) {
            var _a;
            var hindiPara = (_a = story.contentHindi) === null || _a === void 0 ? void 0 : _a.split('\n\n')[idx];
            return (<div key={idx} className="group relative space-y-4 p-8 rounded-3xl hover:bg-white dark:hover:bg-slate-900 transition-colors border-2 border-transparent hover:border-primary/10 shadow-sm hover:shadow-xl">
                                    <div className="flex justify-between items-start gap-4">
                                        <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-200">
                                            {para}
                                        </p>
                                        <Button variant="ghost" size="icon" className="rounded-full shrink-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={function () { return speak({ text: para, lang: "en-US" }); }}>
                                            <Volume2 className="h-5 w-5 text-primary"/>
                                        </Button>
                                    </div>

                                    {showHindi && hindiPara && (<div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <p className="text-lg md:text-xl text-primary font-medium font-hindi leading-relaxed">
                                                {hindiPara}
                                            </p>
                                        </div>)}
                                </div>);
        })}
                    </div>

                    {/* Vocabulary Section */}
                    {story.vocabulary && (<section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary"/> Vocabulary from this Story
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {(typeof story.vocabulary === 'string' ? JSON.parse(story.vocabulary) : story.vocabulary).map(function (vocab, vIdx) { return (<div key={vIdx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-lg text-primary">{vocab.word}</p>
                                                <p className="text-slate-600 dark:text-slate-400">{vocab.meaning}</p>
                                                <p className="font-hindi text-primary/80 mt-1">{vocab.hindiMeaning}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" className="rounded-full bg-primary/5" onClick={function () { return speak({ text: vocab.word, lang: "en-US" }); }}>
                                                <Volume2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>); })}
                            </div>
                        </section>)}
                </article>

                <section className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6">
                    <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto shadow-md flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-primary animate-sparkle"/>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Story Completed!</h2>
                        <p className="text-lg text-muted-foreground font-hindi">शाबाश! आपने यह कहानी पूरी कर ली।</p>
                    </div>
                    <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={function () {
            setShowRating(true);
            toast({
                title: "Story Completed! 🎉",
                description: "You've finished this story and earned XP!",
            });
            trackEvent("story_complete", { storyId: story === null || story === void 0 ? void 0 : story.id, title: story === null || story === void 0 ? void 0 : story.title });
        }}>
                        Finish & Get XP
                    </Button>
                </section>

                <RatingDialog isOpen={showRating} onClose={function () { return setLocation("/hindi-stories"); }} contentType="STORY" contentId={Number(id)} contentTitle={story.title}/>
            </div>
        </Layout>);
}
