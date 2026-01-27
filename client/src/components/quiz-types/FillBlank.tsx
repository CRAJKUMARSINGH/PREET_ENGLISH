
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FillBlankProps {
    question: string; // "The sun _____ in the east."
    options: string[]; // ["rises", "sets", "sleeps"]
    onAnswer: (answer: string) => void;
    selectedAnswer: string | null;
    disabled?: boolean;
}

export function FillBlank({ question, options, onAnswer, selectedAnswer, disabled }: FillBlankProps) {
    // Split question by "_____"
    const parts = question.split("_____");

    return (
        <div className="space-y-6">
            {/* Sentence Display */}
            <div className="text-xl font-medium leading-relaxed p-4 bg-muted/30 rounded-lg">
                {parts.map((part, i) => (
                    <span key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <span className={cn(
                                "inline-block px-3 py-1 mx-1 min-w-[3rem] border-b-2 text-center transition-colors",
                                selectedAnswer ? "border-primary text-primary font-bold" : "border-muted-foreground/50 text-muted-foreground"
                            )}>
                                {selectedAnswer || "_____"}
                            </span>
                        )}
                    </span>
                ))}
            </div>

            {/* Word Bank */}
            <div className="flex flex-wrap gap-3 justify-center">
                {options.map((option) => (
                    <Button
                        key={option}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        onClick={() => onAnswer(option)}
                        disabled={disabled}
                        className={cn(
                            "text-lg px-6 py-6 h-auto",
                            selectedAnswer === option && "ring-2 ring-offset-2 ring-primary"
                        )}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
}
