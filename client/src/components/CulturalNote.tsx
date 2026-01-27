import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Globe, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CulturalNoteProps {
    title: string;
    hindiTitle?: string;
    content: string;
    hindiContent?: string;
    type?: "etiquette" | "slang" | "context" | "fact";
    className?: string;
}

export function CulturalNote({
    title,
    hindiTitle,
    content,
    hindiContent,
    type = "context",
    className,
}: CulturalNoteProps) {
    const getIcon = () => {
        switch (type) {
            case "etiquette": return <Globe className="h-5 w-5 text-emerald-500" />;
            case "slang": return <Sparkles className="h-5 w-5 text-amber-500" />;
            default: return <Info className="h-5 w-5 text-primary" />;
        }
    };

    return (
        <Card className={cn(
            "overflow-hidden border-none bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-xl ring-1 ring-slate-200 dark:ring-slate-800",
            className
        )}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary via-emerald-500 to-amber-500" />
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-inner ring-1 ring-slate-100 dark:ring-slate-700">
                        {getIcon()}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    Native Nuance
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {title}
                            </h3>
                            {hindiTitle && (
                                <p className="text-sm font-hindi text-slate-500 dark:text-slate-400 mt-0.5">
                                    {hindiTitle}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {content}
                            </p>
                            {hindiContent && (
                                <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 relative group">
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-amber-500/30 rounded-full" />
                                    <p className="text-sm font-hindi text-amber-900/80 dark:text-amber-200/80 leading-relaxed italic">
                                        {hindiContent}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
