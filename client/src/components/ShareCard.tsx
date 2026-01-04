import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Award, Flame, Star, Quote } from "lucide-react";

interface ShareCardProps {
    username: string;
    achievement: string;
    type: 'STREAK' | 'BADGE' | 'LEVEL_UP';
    value: string; // e.g., "7 Days", "Grammar Guru", "Level 5"
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ username, achievement, type, value }, ref) => {
    return (
        <div ref={ref} className="w-[400px] h-[600px] bg-gradient-to-br from-[#064e3b] to-[#047857] p-8 text-white relative overflow-hidden flex flex-col items-center justify-between shadow-2xl">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-[-50px] right-[-50px] w-60 h-60 rounded-full bg-yellow-400 blur-3xl" />
            </div>

            <div className="relative z-10 w-full text-center space-y-8 flex-1 flex flex-col justify-center">
                {/* Logo/Brand */}
                <div className="flex items-center justify-center gap-2 opacity-80">
                    <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-lg">P</span>
                    </div>
                    <span className="font-bold tracking-widest text-sm uppercase">Preet English</span>
                </div>

                {/* Main Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-30 animate-pulse"></div>
                    {type === 'STREAK' && <Flame className="h-32 w-32 text-orange-400 mx-auto drop-shadow-lg" />}
                    {type === 'BADGE' && <Award className="h-32 w-32 text-yellow-400 mx-auto drop-shadow-lg" />}
                    {type === 'LEVEL_UP' && <Star className="h-32 w-32 text-purple-400 mx-auto drop-shadow-lg" />}
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h2 className="text-xl font-medium text-white/90 uppercase tracking-widest">{achievement}</h2>
                    <h1 className="text-5xl font-black text-white drop-shadow-md font-display">{value}</h1>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 mt-6 relative">
                        <Quote className="h-6 w-6 text-white/40 absolute -top-3 -left-2 fill-white/40" />
                        <p className="text-lg italic font-medium">"I'm mastering English every day!"</p>
                        <p className="text-sm mt-2 font-bold text-green-300">- {username}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 w-full text-center pt-8 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest opacity-60">Join me on</p>
                <p className="font-bold">preetenglish.com</p>
            </div>
        </div>
    );
});

ShareCard.displayName = "ShareCard";
