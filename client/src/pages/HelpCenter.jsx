import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, HelpCircle, Mail, Phone, Book, Info } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
var FAQ_DATA = [
    {
        question: "How does the Daily Review work? • डेली रिव्यू कैसे काम करता है?",
        answer: "Our app uses Spaced Repetition (SRS). We show you words just as you're about to forget them. Rating your confidence (Again, Hard, Good, Easy) helps the system schedule the next review. / हमारा ऐप स्पैस्ड रिपीटीशन (SRS) का उपयोग करता है। हम आपको शब्द ठीक उसी समय दिखाते हैं जब आप उन्हें भूलने वाले होते हैं।"
    },
    {
        question: "How can I earn XP and level up? • मैं XP कैसे कमा सकता हूँ?",
        answer: "You earn XP by completing lessons, passing quizzes, finishing stories, and meeting your daily goals. High XP helps you climb the weekly leaderboard! / आप पाठ पूरे करके, क्विज़ पास करके, कहानियाँ खत्म करके और अपने दैनिक लक्ष्य पूरे करके XP कमाते हैं।"
    },
    {
        question: "Can I use the app offline? • क्या मैं ऐप को ऑफलाइन उपयोग कर सकता हूँ?",
        answer: "Currently, you need an internet connection to sync your progress and access the AI features. We are working on an offline mode for lessons! / वर्तमान में, आपकी प्रगति को सिंक करने और AI सुविधाओं तक पहुँचने के लिए आपको इंटरनेट कनेक्शन की आवश्यकता है।"
    },
    {
        question: "What is the 'Arya' AI Tutor? • 'आर्या' AI ट्यूटर क्या है?",
        answer: "Arya is your personal English speaking companion. You can practice real-life conversations, ask for grammar help, or just chat in English to improve your fluency. / आर्या आपकी व्यक्तिगत अंग्रेजी बोलने वाली साथी है। आप वास्तविक जीवन की बातचीत का अभ्यास कर सकते हैं।"
    }
];
export default function HelpCenter() {
    var _a = useState(""), searchTerm = _a[0], setSearchTerm = _a[1];
    var toast = useToast().toast;
    var filteredFaqs = FAQ_DATA.filter(function (faq) {
        return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var handleContactSubmit = function (e) {
        e.preventDefault();
        toast({
            title: "Support Request Sent",
            description: "We've received your message and will get back to you soon! ✨",
        });
        e.target.reset();
    };
    return (<Layout>
            <div className="max-w-5xl mx-auto space-y-12 pb-20">
                <header className="text-center space-y-4">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                            How can we help? • हम आपकी क्या मदद कर सकते हैं?
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-4">
                            Find answers to common questions or reach out to our support team.
                        </p>
                    </motion.div>

                    <div className="relative max-w-xl mx-auto mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
                        <Input type="text" placeholder="Search help articles... मदद के लिए लेख खोजें..." className="pl-12 h-14 rounded-2xl border-slate-200 shadow-lg focus:ring-primary text-lg" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }}/>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="h-6 w-6 text-primary"/>
                                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                            </div>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {filteredFaqs.map(function (faq, index) { return (<AccordionItem key={index} value={"item-".concat(index)} className="border rounded-2xl px-6 bg-slate-50/50">
                                        <AccordionTrigger className="text-left font-bold text-slate-800 hover:no-underline py-4">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 leading-relaxed text-lg pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>); })}
                                {filteredFaqs.length === 0 && (<div className="text-center py-12 text-slate-400 italic">
                                        No matching questions found. Try different keywords!
                                    </div>)}
                            </Accordion>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="rounded-[2rem] border-none shadow-md bg-indigo-50/50">
                                <CardHeader>
                                    <Book className="h-8 w-8 text-indigo-600 mb-2"/>
                                    <CardTitle>User Guide</CardTitle>
                                    <CardDescription>Comprehensive guide on all app features.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="ghost" className="p-0 text-indigo-600 font-bold underline h-auto">Read Guide →</Button>
                                </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-none shadow-md bg-amber-50/50">
                                <CardHeader>
                                    <Info className="h-8 w-8 text-amber-600 mb-2"/>
                                    <CardTitle>Grammar Tips</CardTitle>
                                    <CardDescription>Daily English grammar lessons and cheatsheets.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="ghost" className="p-0 text-amber-600 font-bold underline h-auto">Explore Tips →</Button>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-primary to-indigo-700 text-white overflow-hidden">
                            <CardHeader className="pb-4">
                                <MessageCircle className="h-10 w-10 mb-4"/>
                                <CardTitle className="text-2xl font-bold">Still need help?</CardTitle>
                                <CardDescription className="text-indigo-100">
                                    Talk to our support team directly. We usually respond within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <Input placeholder="Your Email" className="bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl h-12" required/>
                                    <textarea placeholder="How can we help?" className="w-full bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl h-32 p-4 focus:outline-none focus:ring-2 focus:ring-white/30" required/>
                                    <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold h-12 rounded-xl">
                                        Send Message • संदेश भेजें
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-6">
                            <h3 className="font-bold text-lg">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail className="h-5 w-5 text-primary"/>
                                    <span>support@preetenglish.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="h-5 w-5 text-primary"/>
                                    <span>+91 98XXX XXXXX</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </Layout>);
}
