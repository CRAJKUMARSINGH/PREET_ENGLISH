import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, BookOpen, Mic, Bot, Sparkles, Zap, MessageSquare, ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { HolographicDashboard } from "@/components/advanced/HolographicDashboard";
var labFeatures = [
    {
        title: "Saraswati Video Call",
        hindiTitle: "वीडियो कॉल अभ्यास",
        description: "Practice face-to-face English with our advanced AI avatar, Saraswati.",
        icon: <Video className="h-6 w-6"/>,
        link: "/labs/video-call",
        color: "bg-orange-500",
        tag: "BETA",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "Parallel Story Reader",
        hindiTitle: "द्विभाषी पाठक",
        description: "Read English stories with side-by-side Hindi translations and audio.",
        icon: <BookOpen className="h-6 w-6"/>,
        link: "/labs/reader",
        color: "bg-blue-500",
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "Native Speaker Videos",
        hindiTitle: "देशी वक्ता वीडियो",
        description: "Learn authentic pronunciation from real locals around the world.",
        icon: <Play className="h-6 w-6"/>,
        link: "/labs/videos",
        color: "bg-red-500",
        tag: "HOT",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "AI Story Generator",
        hindiTitle: "कहानी निर्माता",
        description: "Create custom English stories based on your interests instantly.",
        icon: <Zap className="h-6 w-6"/>,
        link: "/labs/stories",
        color: "bg-purple-500",
        tag: "AI",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "Vocabulary SRS",
        hindiTitle: "शब्दावली पुनरावृत्ति",
        description: "Scientific flashcard system to ensure you never forget a word.",
        icon: <Bot className="h-6 w-6"/>,
        link: "/labs/srs",
        color: "bg-green-500",
        tag: "SMART",
    },
    {
        title: "AI Voicerooms",
        hindiTitle: "वॉयस रूम",
        description: "Group conversation practice in voice-only social rooms.",
        icon: <Mic className="h-6 w-6"/>,
        link: "/labs/voicerooms",
        color: "bg-indigo-500",
        tag: "SOCIAL",
    }
];
export default function ExperimentalLabs() {
    return (<Layout>
            <div className="max-w-7xl mx-auto space-y-12 py-8">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 text-white border border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"/>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"/>

                    <div className="relative z-10 max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                            <Sparkles className="h-3 w-3"/>
                            Innovation Hub
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-none">
                            Preet English <span className="text-primary">Labs.</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-light leading-relaxed">
                            Welcome to the future of language learning. These experimental features use cutting-edge AI to make your English journey faster, deeper, and more fun.
                        </p>
                    </div>
                </div>

                {/* Holographic Dashboard */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <HolographicDashboard />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {labFeatures.map(function (feature, idx) { return (<Link key={idx} href={feature.link}>
                            <Card className="group cursor-pointer overflow-hidden border-none bg-card hover:bg-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ring-1 ring-border/50">
                                {feature.image && (<div className="h-48 overflow-hidden relative">
                                        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                        <div className="absolute top-4 right-4">
                                            <Badge className={cn("font-black text-[10px] tracking-widest", feature.color)}>
                                                {feature.tag}
                                            </Badge>
                                        </div>
                                    </div>)}
                                <CardContent className="p-8 space-y-4">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12", feature.color)}>
                                        {feature.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                                        <p className="text-sm font-hindi text-primary font-bold">{feature.hindiTitle}</p>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all underline underline-offset-4 decoration-primary/20">
                                        Try it now <ArrowRight className="h-4 w-4"/>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>); })}
                </div>

                {/* Feedback Section */}
                <div className="rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10 p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-primary"/>
                    </div>
                    <h2 className="text-3xl font-bold">Have an idea for a feature?</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        Preet English is built for you. If you have a suggestion for a new way to learn, let us know!
                    </p>
                    <Button size="lg" className="rounded-2xl px-10 py-7 text-lg font-bold shadow-xl shadow-primary/10 hover:shadow-primary/30">
                        Share Feedback
                    </Button>
                </div>
            </div>
        </Layout>);
}
