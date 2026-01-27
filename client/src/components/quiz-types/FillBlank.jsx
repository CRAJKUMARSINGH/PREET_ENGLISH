import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function FillBlank(_a) {
    var question = _a.question, options = _a.options, onAnswer = _a.onAnswer, selectedAnswer = _a.selectedAnswer, disabled = _a.disabled;
    // Split question by "_____"
    var parts = question.split("_____");
    return (<div className="space-y-6">
            {/* Sentence Display */}
            <div className="text-xl font-medium leading-relaxed p-4 bg-muted/30 rounded-lg">
                {parts.map(function (part, i) { return (<span key={i}>
                        {part}
                        {i < parts.length - 1 && (<span className={cn("inline-block px-3 py-1 mx-1 min-w-[3rem] border-b-2 text-center transition-colors", selectedAnswer ? "border-primary text-primary font-bold" : "border-muted-foreground/50 text-muted-foreground")}>
                                {selectedAnswer || "_____"}
                            </span>)}
                    </span>); })}
            </div>

            {/* Word Bank */}
            <div className="flex flex-wrap gap-3 justify-center">
                {options.map(function (option) { return (<Button key={option} variant={selectedAnswer === option ? "default" : "outline"} onClick={function () { return onAnswer(option); }} disabled={disabled} className={cn("text-lg px-6 py-6 h-auto", selectedAnswer === option && "ring-2 ring-offset-2 ring-primary")}>
                        {option}
                    </Button>); })}
            </div>
        </div>);
}
