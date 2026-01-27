
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RearrangeProps {
    options: string[]; // ["is", "name", "My", "Ravi"]
    onAnswer: (answer: string) => void;
    disabled?: boolean;
}

export function Rearrange({ options, onAnswer, disabled }: RearrangeProps) {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);

    // Reset when options change (new question)
    useEffect(() => {
        setSelectedWords([]);
    }, [options]);

    useEffect(() => {
        onAnswer(selectedWords.join(" "));
    }, [selectedWords, onAnswer]);

    const handleWordClick = (word: string) => {
        setSelectedWords([...selectedWords, word]);
    };

    const handleReset = () => {
        setSelectedWords([]);
    };

    const isWordSelected = (word: string, index: number) => {
        // Logic to check if this specific instance of the word is selected
        // Simple frequency count approach for duplicates handling
        const countInSelected = selectedWords.filter(w => w === word).length;
        const countBeforeHere = options.slice(0, index).filter(w => w === word).length;
        return countInSelected > countBeforeHere;
    };

    return (
        <div className="space-y-6">
            {/* Formed Sentence */}
            <div className="min-h-[4rem] p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {selectedWords.length > 0 ? (
                        selectedWords.map((word, i) => (
                            <span key={i} className="px-2 py-1 bg-background border rounded shadow-sm text-lg animate-in fade-in zoom-in">
                                {word}
                            </span>
                        ))
                    ) : (
                        <span className="text-muted-foreground italic">Tap words below to form a sentence...</span>
                    )}
                </div>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleReset}
                    disabled={disabled || selectedWords.length === 0}
                    title="Reset"
                >
                    <RefreshCcw className="w-4 h-4" />
                </Button>
            </div>

            {/* Word Options */}
            <div className="flex flex-wrap gap-2 justify-center">
                {options.map((word, index) => {
                    const selected = isWordSelected(word, index);
                    return (
                        <Button
                            key={`${word}-${index}`}
                            variant="outline"
                            onClick={() => handleWordClick(word)}
                            disabled={disabled || selected}
                            className={cn(
                                "text-lg transition-all",
                                selected ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            )}
                        >
                            {word}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
