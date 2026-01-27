import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Brain } from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";
export function Flashcard(_a) {
    var word = _a.word, onRate = _a.onRate;
    var _b = useState(false), isFlipped = _b[0], setIsFlipped = _b[1];
    var speak = useSpeech().speak;
    var handleFlip = function () { return setIsFlipped(!isFlipped); };
    var handleRate = function (quality) {
        setIsFlipped(false);
        onRate(quality);
    };
    return (<div className="w-full max-w-md mx-auto h-[400px] perspective-1000">
            <motion.div className="relative w-full h-full text-center transition-all duration-500 preserve-3d cursor-pointer" initial={false} animate={{ rotateY: isFlipped ? 180 : 0 }} onClick={handleFlip}>
                {/* Front Side */}
                <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 border-2 border-primary/20 shadow-xl overflow-hidden bg-gradient-to-br from-white to-amber-50">
                    <div className="absolute top-0 right-0 p-4">
                        <Brain className="h-6 w-6 text-primary/20"/>
                    </div>

                    <h2 className="text-5xl font-bold text-slate-800 mb-4 font-display">
                        {word.word}
                    </h2>
                    <p className="text-xl text-primary font-medium mb-6">
                        {word.pronunciation}
                    </p>

                    <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20" onClick={function (e) {
            e.stopPropagation();
            speak({ text: word.word, lang: "en-US" });
        }}>
                        <Volume2 className="h-6 w-6 text-primary"/>
                    </Button>

                    <p className="mt-8 text-sm text-muted-foreground animate-pulse">
                        Tap to flip • पलटने के लिए टैप करें
                    </p>
                </Card>

                {/* Back Side */}
                <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 border-2 border-amber-500/20 shadow-xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 rotate-y-180">
                    <div className="w-full space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-1">
                                Meaning • अर्थ
                            </p>
                            <h3 className="text-2xl font-bold text-slate-800">
                                {word.hindiTranslation}
                            </h3>
                            <p className="text-lg text-slate-600 mt-1">
                                {word.definition}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-amber-200">
                            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">
                                Example • उदाहरण
                            </p>
                            <p className="text-lg italic text-slate-700 leading-relaxed">
                                "{word.example}"
                            </p>
                        </div>
                    </div>

                    <p className="mt-8 text-sm text-amber-600/60 font-medium">
                        How well did you know this? • आप इसे कितनी अच्छी तरह जानते थे?
                    </p>
                </Card>
            </motion.div>

            {/* Rating Controls - only visible when flipped */}
            <AnimatePresence>
                {isFlipped && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex justify-between gap-2 mt-6">
                        <Button variant="outline" className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 h-12 flex flex-col" onClick={function () { return handleRate(0); }}>
                            <span className="text-xs uppercase font-bold">Again</span>
                            <span className="text-[10px]">फिर से</span>
                        </Button>
                        <Button variant="outline" className="flex-1 bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700 h-12 flex flex-col" onClick={function () { return handleRate(3); }}>
                            <span className="text-xs uppercase font-bold">Hard</span>
                            <span className="text-[10px]">कठिन</span>
                        </Button>
                        <Button variant="outline" className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 h-12 flex flex-col" onClick={function () { return handleRate(4); }}>
                            <span className="text-xs uppercase font-bold">Good</span>
                            <span className="text-[10px]">अच्छा</span>
                        </Button>
                        <Button variant="outline" className="flex-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 h-12 flex flex-col" onClick={function () { return handleRate(5); }}>
                            <span className="text-xs uppercase font-bold">Easy</span>
                            <span className="text-[10px]">आसान</span>
                        </Button>
                    </motion.div>)}
            </AnimatePresence>
        </div>);
}
