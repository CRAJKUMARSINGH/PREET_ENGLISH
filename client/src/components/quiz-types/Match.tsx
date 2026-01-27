
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MatchProps {
    pairs: Record<string, string>; // { "Hot": "Cold", "Day": "Night" }
    options: string[]; // ["Hot", "Day", "Cold", "Night"] (Shuffled list of all items)
    onAnswer: (answer: string) => void; // Sends JSON string of user pairs
    disabled?: boolean;
}

export function Match({ pairs, options, onAnswer, disabled }: MatchProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<Record<string, string>>({}); // { "Hot": "Cold" }

    // Tanner Linsley style: Use useMemo for derived data that depends on props
    const leftItems = useMemo(() => Object.keys(pairs), [pairs]);
    const [shuffledRightItems] = useState(() => {
        // Only shuffle once on mount to prevent UI jank during interactions
        return Object.values(pairs).sort(() => Math.random() - 0.5);
    });
    // Use shuffled items if pairs haven't changed, otherwise use current values
    const rightItems = useMemo(() => {
        const currentValues = Object.values(pairs);
        // If same length and all values exist, use the shuffled version
        if (shuffledRightItems.length === currentValues.length &&
            shuffledRightItems.every(v => currentValues.includes(v))) {
            return shuffledRightItems;
        }
        // Otherwise return new shuffled values (pairs changed)
        return currentValues.sort(() => Math.random() - 0.5);
    }, [pairs, shuffledRightItems]);

    useEffect(() => {
        onAnswer(JSON.stringify(matched));
    }, [matched, onAnswer]);

    const handleItemClick = (item: string, side: 'left' | 'right') => {
        if (disabled) return;

        // If matches already contain this item, do nothing
        if (Object.keys(matched).includes(item) || Object.values(matched).includes(item)) return;

        if (!selected) {
            setSelected(item);
        } else {
            // If trying to match with same side or same item
            if (selected === item) {
                setSelected(null);
                return;
            }

            // Form a pair
            // We always store Key -> Value direction for checking
            let key = selected;
            let val = item;

            // Check if 'selected' was actually a value side? 
            // Current logic: just verify if (key, val) exists in 'pairs' or (val, key) exists
            // For visual UI, we just link them. Validation happens on submit.
            // But strict matching (Left -> Right) is easier.

            if (leftItems.includes(selected) && rightItems.includes(item)) {
                setMatched(prev => ({ ...prev, [selected]: item }));
            } else if (rightItems.includes(selected) && leftItems.includes(item)) {
                setMatched(prev => ({ ...prev, [item]: selected }));
            }

            setSelected(null);
        }
    };

    const isMatched = (item: string) => {
        return Object.keys(matched).includes(item) || Object.values(matched).includes(item);
    };

    return (
        <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-3">
                {leftItems.map(item => (
                    <Button
                        key={item}
                        variant={isMatched(item) ? "default" : (selected === item ? "secondary" : "outline")}
                        className={cn("w-full h-16 text-lg justify-start px-4", isMatched(item) && "opacity-50")}
                        onClick={() => handleItemClick(item, 'left')}
                        disabled={disabled || isMatched(item)}
                    >
                        {item}
                        {matched[item] && (
                            <span className="ml-auto text-xs opacity-70">➔ {matched[item]}</span>
                        )}
                    </Button>
                ))}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
                {rightItems.map(item => (
                    <Button
                        key={item}
                        variant={isMatched(item) ? "default" : (selected === item ? "secondary" : "outline")}
                        className={cn("w-full h-16 text-lg justify-end px-4", isMatched(item) && "opacity-50")}
                        onClick={() => handleItemClick(item, 'right')}
                        disabled={disabled || isMatched(item)}
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
}
