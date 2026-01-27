import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, BookOpen, Mic, Trophy, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";
import { SaraswatiMascot } from "./SaraswatiMascot";
export function WelcomeTutorial() {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useState(0), step = _b[0], setStep = _b[1];
    useEffect(function () {
        // Check if user has seen tutorial
        var hasSeen = localStorage.getItem("pre_english_onboarding_completed");
        if (!hasSeen) {
            setTimeout(function () { return setIsOpen(true); }, 1000); // Delay for dramatic entrance
        }
    }, []);
    var handleComplete = function () {
        setIsOpen(false);
        localStorage.setItem("pre_english_onboarding_completed", "true");
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };
    var steps = [
        {
            title: "Namaste! Welcome to Preet English",
            desc: "The only English app designed specifically for Hindi speakers. Let's show you around!",
            icon: <span className="text-4xl">🙏</span>,
            mascotMood: "happy",
            color: "bg-orange-500"
        },
        {
            title: "Your Daily Lessons",
            desc: "Start here! Each lesson is tailored to your level. Complete one every day to build your streak.",
            icon: <BookOpen className="w-10 h-10 text-white"/>,
            mascotMood: "teaching",
            color: "bg-blue-500"
        },
        {
            title: "Practice Speaking",
            desc: "Tap the microphone to practice pronunciation. Our AI will give you instant feedback.",
            icon: <Mic className="w-10 h-10 text-white"/>,
            mascotMood: "encouraging",
            color: "bg-green-500"
        },
        {
            title: "Earn Rewards",
            desc: "Climb the leaderboard and earn certificates as you master new skills!",
            icon: <Trophy className="w-10 h-10 text-white"/>,
            mascotMood: "happy",
            color: "bg-yellow-500"
        }
    ];
    var currentStep = steps[step];
    return (<AnimatePresence>
            {isOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20">
                        {/* Background Gradient */}
                        <div className={"absolute top-0 inset-x-0 h-32 ".concat(currentStep.color, " transition-colors duration-500")}/>

                        <div className="relative pt-8 px-8 pb-8">
                            {/* Icon Bubble */}
                            <div className="flex justify-center mb-6">
                                <motion.div key={step} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={"w-20 h-20 rounded-full ".concat(currentStep.color, " shadow-lg border-4 border-white dark:border-slate-800 flex items-center justify-center transition-colors duration-500")}>
                                    {currentStep.icon}
                                </motion.div>
                            </div>

                            {/* Close Button */}
                            <button onClick={handleComplete} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors">
                                <X className="w-5 h-5"/>
                            </button>

                            <div className="text-center space-y-4 min-h-[160px]">
                                <motion.h2 key={step + "title"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black text-slate-900 dark:text-white">
                                    {currentStep.title}
                                </motion.h2>

                                <motion.p key={step + "desc"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                    {currentStep.desc}
                                </motion.p>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-2 mb-8 mt-4">
                                {steps.map(function (_, i) { return (<div key={i} className={"w-2.5 h-2.5 rounded-full transition-colors duration-300 ".concat(i === step ? currentStep.color : "bg-slate-200 dark:bg-slate-700")}/>); })}
                            </div>

                            {/* Action Button */}
                            <Button onClick={function () {
                if (step < steps.length - 1) {
                    setStep(step + 1);
                }
                else {
                    handleComplete();
                }
            }} className={"w-full py-6 text-lg font-bold rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all bg-slate-900 text-white hover:bg-slate-800"}>
                                {step < steps.length - 1 ? (<span className="flex items-center gap-2">Next <ArrowRight className="w-5 h-5"/></span>) : (<span className="flex items-center gap-2">Get Started <Sparkles className="w-5 h-5"/></span>)}
                            </Button>
                        </div>

                        {/* Mascot Peek */}
                        <div className="absolute -bottom-10 -left-10 opacity-20 pointer-events-none transform rotate-12">
                            <SaraswatiMascot size="lg" mood={currentStep.mascotMood} message=""/>
                        </div>
                    </motion.div>
                </div>)}
        </AnimatePresence>);
}
