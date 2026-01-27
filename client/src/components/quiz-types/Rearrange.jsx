var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
export function Rearrange(_a) {
    var options = _a.options, onAnswer = _a.onAnswer, disabled = _a.disabled;
    var _b = useState([]), selectedWords = _b[0], setSelectedWords = _b[1];
    // Reset when options change (new question)
    useEffect(function () {
        setSelectedWords([]);
    }, [options]);
    useEffect(function () {
        onAnswer(selectedWords.join(" "));
    }, [selectedWords, onAnswer]);
    var handleWordClick = function (word) {
        setSelectedWords(__spreadArray(__spreadArray([], selectedWords, true), [word], false));
    };
    var handleReset = function () {
        setSelectedWords([]);
    };
    var isWordSelected = function (word, index) {
        // Logic to check if this specific instance of the word is selected
        // Simple frequency count approach for duplicates handling
        var countInSelected = selectedWords.filter(function (w) { return w === word; }).length;
        var countBeforeHere = options.slice(0, index).filter(function (w) { return w === word; }).length;
        return countInSelected > countBeforeHere;
    };
    return (<div className="space-y-6">
            {/* Formed Sentence */}
            <div className="min-h-[4rem] p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {selectedWords.length > 0 ? (selectedWords.map(function (word, i) { return (<span key={i} className="px-2 py-1 bg-background border rounded shadow-sm text-lg animate-in fade-in zoom-in">
                                {word}
                            </span>); })) : (<span className="text-muted-foreground italic">Tap words below to form a sentence...</span>)}
                </div>
                <Button size="sm" variant="ghost" onClick={handleReset} disabled={disabled || selectedWords.length === 0} title="Reset">
                    <RefreshCcw className="w-4 h-4"/>
                </Button>
            </div>

            {/* Word Options */}
            <div className="flex flex-wrap gap-2 justify-center">
                {options.map(function (word, index) {
            var selected = isWordSelected(word, index);
            return (<Button key={"".concat(word, "-").concat(index)} variant="outline" onClick={function () { return handleWordClick(word); }} disabled={disabled || selected} className={cn("text-lg transition-all", selected ? "opacity-0 scale-95" : "opacity-100 scale-100")}>
                            {word}
                        </Button>);
        })}
            </div>
        </div>);
}
