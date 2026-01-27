import { Card, CardContent } from "@/components/ui/card";
import { XCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
export function MistakeCorrection(_a) {
    var mistake = _a.mistake, correction = _a.correction, explanation = _a.explanation, hindiExplanation = _a.hindiExplanation, className = _a.className;
    return (<Card className={cn("overflow-hidden border-none bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-200 dark:ring-slate-800", className)}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-green-500"/>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-5 w-5"/>
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            Common Mistake
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                            Don't say this!
                        </h3>
                    </div>
                </div>

                <div className="grid gap-4">
                    {/* The Mistake */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5"/>
                        <div>
                            <p className="font-medium text-red-900 dark:text-red-200 line-through decoration-red-500/50 decoration-2">
                                {mistake}
                            </p>
                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest mt-1 block">
                                Incorrect
                            </span>
                        </div>
                    </div>

                    {/* The Correction */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 shadow-sm">
                        <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5"/>
                        <div>
                            <p className="font-bold text-green-900 dark:text-green-200 text-lg">
                                {correction}
                            </p>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest mt-1 block">
                                Correct
                            </span>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="mt-2 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-2">
                        <p className="text-slate-600 dark:text-slate-400">
                            {explanation}
                        </p>
                        {hindiExplanation && (<p className="text-sm font-hindi text-slate-500 dark:text-slate-500 italic">
                                {hindiExplanation}
                            </p>)}
                    </div>
                </div>
            </CardContent>
        </Card>);
}
