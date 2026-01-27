import { Link } from "wouter";
import * as Lucide from "lucide-react";
import { motion } from "framer-motion";
export default function Landing() {
    return (<div className="min-h-screen bg-background selection:bg-primary selection:text-white">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse"/>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse-glow"/>
            </div>

            {/* Navbar */}
            <nav className="border-b border-white/5 backdrop-blur-xl fixed w-full z-50 top-0 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">P</div>
                        <span className="text-2xl font-black tracking-tighter text-foreground font-display">PREET ENGLISH</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/auth" className="px-6 py-2.5 rounded-2xl bg-primary text-white font-extrabold hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 text-center lg:text-left relative z-10">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
                        <Lucide.Sparkles className="h-4 w-4"/>
                        <span>AI-Powered Learning Platform</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] text-foreground mb-8 tracking-tighter">
                        Speak English <br />
                        <span className="text-primary italic">Like a Pro.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                        Break the language barrier with Preet. Our fun, AI-driven lessons tailored for Hindi speakers will have you speaking confidently in no time.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                        <Link href="/auth" className="px-10 py-5 rounded-[2rem] bg-primary text-white font-black text-xl hover:shadow-[0_20px_40px_rgba(28,231,131,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                            Start FREE Learning
                            <Lucide.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                        <div className="flex -space-x-3 items-center justify-center">
                            {[1, 2, 3, 4].map(function (i) { return (<div key={i} className={"w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center overflow-hidden shadow-xl"}>
                                    <img src={"https://i.pravatar.cc/100?img=".concat(i + 10)} alt="user" className="w-full h-full object-cover"/>
                                </div>); })}
                            <div className="pl-6">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(function (s) { return <Lucide.Star key={s} className="w-4 h-4 fill-current"/>; })}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Loved by 10k+ Indians</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 2 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex-1 relative">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700"/>
                        <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl overflow-hidden aspect-[4/3]">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" alt="Students learning" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end backdrop-blur-md bg-white/10 p-6 rounded-3xl border border-white/20">
                                <div>
                                    <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Active Now</p>
                                    <p className="text-white text-2xl font-black">Practice Session</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary/90 text-white rounded-2xl font-bold border border-white/20 shadow-lg">
                                    <Lucide.Mic className="h-5 w-5"/>
                                    Live feedback
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Celebrity Endorsement Section */}
            <section className="py-10 bg-gradient-to-r from-primary/10 to-transparent border-y border-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    <div className="w-20 h-20 rounded-full border-2 border-primary p-1 bg-white/5">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" alt="Celebrity" className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all"/>
                    </div>
                    <div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-yellow-500">
                            {[1, 2, 3, 4, 5].map(function (i) { return <Lucide.Star key={i} className="w-4 h-4 fill-current"/>; })}
                        </div>
                        <p className="text-xl font-bold text-foreground italic">"The most effective way to learn English for Hindi speakers. Absolutely brilliant!"</p>
                        <p className="text-sm font-black uppercase tracking-widest text-primary mt-2">— Recommended by Top Icons</p>
                    </div>
                </div>
            </section>

            {/* Trust Stats */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {[
            { label: "Lessons", value: "200+" },
            { label: "Active Users", value: "10K+" },
            { label: "AI Practice", value: "24/7" },
            { label: "Success Rate", value: "98%" },
        ].map(function (stat, i) { return (<div key={i} className="space-y-2">
                            <p className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground">{stat.value}</p>
                            <p className="text-xs font-black uppercase tracking-widest text-primary">{stat.label}</p>
                        </div>); })}
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black tracking-tighter mb-6">Built for <span className="text-primary italic">Confident Speakers.</span></h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">Everything you need to master English, from grammar to fluent real-world conversations.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {[
            {
                icon: Lucide.GraduationCap,
                title: "Structured Curriculum",
                desc: "Expertly crafted lessons for all levels, from Absolute Beginner to Advanced Professional.",
                color: "from-blue-500/20 to-indigo-500/20",
                iconColor: "text-blue-500"
            },
            {
                icon: Lucide.Bot,
                title: "Personal AI Tutor",
                desc: "Arya helps you practice conversations 24/7 with real-time corrections and Hindi support.",
                color: "from-primary/20 to-emerald-500/20",
                iconColor: "text-primary"
            },
            {
                icon: Lucide.Trophy,
                title: "Gamified Learning",
                desc: "Stay motivated with daily streaks, XP rewards, and competitive weekly leaderboards.",
                color: "from-orange-500/20 to-red-500/20",
                iconColor: "text-orange-500"
            }
        ].map(function (feature, i) { return (<motion.div whileHover={{ y: -10 }} key={i} className={"bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all group overflow-hidden relative shadow-2xl"}>
                                <div className={"absolute inset-0 bg-gradient-to-br ".concat(feature.color, " opacity-0 group-hover:opacity-100 transition-opacity duration-700")}/>
                                <div className={"w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-md flex items-center justify-center mb-8 shadow-xl relative z-10 group-hover:scale-110 transition-transform"}>
                                    <feature.icon className={"w-8 h-8 ".concat(feature.iconColor)}/>
                                </div>
                                <h3 className="text-2xl font-black mb-4 relative z-10">{feature.title}</h3>
                                <p className="text-muted-foreground/80 leading-relaxed font-medium relative z-10">{feature.desc}</p>
                            </motion.div>); })}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-primary to-green-600 p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30 group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="relative z-10">
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 tracking-tighter leading-none">Ready to start your <br />journey today?</h2>
                        <Link href="/dashboard" className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-primary font-black text-2xl hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                            Go to Dashboard
                            <Lucide.ArrowRight className="w-8 h-8"/>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer Branding */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-black text-sm">P</div>
                        <span className="text-lg font-black tracking-tighter text-foreground font-display opacity-50 uppercase">PREET ENGLISH</span>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">© 2026 Preet • Designed for Excellence</p>
                    <div className="flex gap-8 text-xs font-black uppercase tracking-tighter text-muted-foreground">
                        <Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/legal/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <a href="mailto:support@preetenglish.com" className="hover:text-primary transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>);
}
