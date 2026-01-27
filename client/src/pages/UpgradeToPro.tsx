import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Shield, Headphones, Award } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";

export default function UpgradeToPro() {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        trackEvent("pro_upgrade_click", { source: "direct_nav" });
    }, [trackEvent]);

    const features = [
        { icon: <Crown className="h-6 w-6 text-yellow-500" />, title: "Unlimited AI Tutoring", desc: "Speak with Arya for as long as you want without limits." },
        { icon: <Shield className="h-6 w-6 text-blue-500" />, title: "Official Certification", desc: "Get downloadable PDF certificates signed by Preet English." },
        { icon: <Headphones className="h-6 w-6 text-purple-500" />, title: "HD Audio Voices", desc: "Access premium, natural-sounding neural voices for TTS." },
        { icon: <Zap className="h-6 w-6 text-orange-500" />, title: "No Ads & Faster Loading", desc: "Clean, lightning-fast experience with zero interruptions." },
        { icon: <Award className="h-6 w-6 text-green-500" />, title: "Advanced Modules", desc: "Exclusive access to Business English and IELTS prep." },
    ];

    return (
        <Layout>
            <SEO
                title="Upgrade to Pro"
                description="Unlock the full potential of Preet English with Pro features. Unlimited AI tutoring, official certificates, and more."
            />
            <div className="max-w-5xl mx-auto py-10 px-4">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4">
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 px-4 py-1 text-sm font-bold animate-bounce">
                        LIMITED TIME OFFER
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-accent pb-2">
                        Master English 3x Faster
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join 10,000+ learners who have unlocked their full potential with Preet English Pro.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Free Tier */}
                    <Card className="rounded-3xl border-2 border-slate-100 shadow-sm opacity-80">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Free</CardTitle>
                            <p className="text-muted-foreground">Basic learning for everyone</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-4xl font-black">₹0 <span className="text-lg font-normal text-muted-foreground">/forever</span></div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-green-500" /> 1625+ Lessons</li>
                                <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-green-500" /> Community Access</li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground line-through"><Check className="h-4 w-4" /> Unlimited AI Tutoring</li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground line-through"><Check className="h-4 w-4" /> PDF Certificates</li>
                            </ul>
                            <Button variant="outline" className="w-full rounded-2xl h-12" disabled>Current Plan</Button>
                        </CardContent>
                    </Card>

                    {/* Pro Tier */}
                    <Card className="rounded-3xl border-4 border-primary shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-all">
                        <div className="absolute top-0 right-0 bg-primary text-white px-8 py-2 rotate-45 translate-x-8 -translate-y-2 font-bold text-sm shadow-lg">
                            BEST VALUE
                        </div>
                        <CardHeader className="bg-primary/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="h-6 w-6 text-primary" />
                                <CardTitle className="text-2xl font-bold text-primary">Pro</CardTitle>
                            </div>
                            <p className="text-slate-600">The complete mastery package</p>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8">
                            <div className="text-5xl font-black text-slate-900">₹149 <span className="text-lg font-normal text-muted-foreground">/month</span></div>
                            <ul className="space-y-4">
                                {features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1">{f.icon}</div>
                                        <div>
                                            <p className="font-bold text-sm">{f.title}</p>
                                            <p className="text-xs text-muted-foreground">{f.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/30"
                                onClick={() => trackEvent("pro_upgrade_click", { tier: "monthly" })}
                            >
                                Go Pro Now ✨
                            </Button>
                            <p className="text-center text-xs text-muted-foreground">7-day free trial • Cancel anytime</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Social Proof */}
                <div className="bg-slate-50 rounded-3xl p-10 text-center border border-dashed border-slate-300">
                    <h3 className="text-2xl font-bold mb-6">Trusted by Learners Globally 🌍</h3>
                    <div className="flex justify-center gap-12 flex-wrap grayscale opacity-50">
                        <div className="font-display font-black text-2xl">Udemy</div>
                        <div className="font-display font-black text-2xl">Medium</div>
                        <div className="font-display font-black text-2xl">Duolingo</div>
                        <div className="font-display font-black text-2xl">Coursera</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
