var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function Match(_a) {
    var pairs = _a.pairs, options = _a.options, onAnswer = _a.onAnswer, disabled = _a.disabled;
    var _b = useState(null), selected = _b[0], setSelected = _b[1];
    var _c = useState({}), matched = _c[0], setMatched = _c[1]; // { "Hot": "Cold" }
    // Tanner Linsley style: Use useMemo for derived data that depends on props
    var leftItems = useMemo(function () { return Object.keys(pairs); }, [pairs]);
    var shuffledRightItems = useState(function () {
        // Only shuffle once on mount to prevent UI jank during interactions
        return Object.values(pairs).sort(function () { return Math.random() - 0.5; });
    })[0];
    // Use shuffled items if pairs haven't changed, otherwise use current values
    var rightItems = useMemo(function () {
        var currentValues = Object.values(pairs);
        // If same length and all values exist, use the shuffled version
        if (shuffledRightItems.length === currentValues.length &&
            shuffledRightItems.every(function (v) { return currentValues.includes(v); })) {
            return shuffledRightItems;
        }
        // Otherwise return new shuffled values (pairs changed)
        return currentValues.sort(function () { return Math.random() - 0.5; });
    }, [pairs, shuffledRightItems]);
    useEffect(function () {
        onAnswer(JSON.stringify(matched));
    }, [matched, onAnswer]);
    var handleItemClick = function (item, side) {
        if (disabled)
            return;
        // If matches already contain this item, do nothing
        if (Object.keys(matched).includes(item) || Object.values(matched).includes(item))
            return;
        if (!selected) {
            setSelected(item);
        }
        else {
            // If trying to match with same side or same item
            if (selected === item) {
                setSelected(null);
                return;
            }
            // Form a pair
            // We always store Key -> Value direction for checking
            var key = selected;
            var val = item;
            // Check if 'selected' was actually a value side? 
            // Current logic: just verify if (key, val) exists in 'pairs' or (val, key) exists
            // For visual UI, we just link them. Validation happens on submit.
            // But strict matching (Left -> Right) is easier.
            if (leftItems.includes(selected) && rightItems.includes(item)) {
                setMatched(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[selected] = item, _a)));
                });
            }
            else if (rightItems.includes(selected) && leftItems.includes(item)) {
                setMatched(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[item] = selected, _a)));
                });
            }
            setSelected(null);
        }
    };
    var isMatched = function (item) {
        return Object.keys(matched).includes(item) || Object.values(matched).includes(item);
    };
    return (<div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-3">
                {leftItems.map(function (item) { return (<Button key={item} variant={isMatched(item) ? "default" : (selected === item ? "secondary" : "outline")} className={cn("w-full h-16 text-lg justify-start px-4", isMatched(item) && "opacity-50")} onClick={function () { return handleItemClick(item, 'left'); }} disabled={disabled || isMatched(item)}>
                        {item}
                        {matched[item] && (<span className="ml-auto text-xs opacity-70">➔ {matched[item]}</span>)}
                    </Button>); })}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
                {rightItems.map(function (item) { return (<Button key={item} variant={isMatched(item) ? "default" : (selected === item ? "secondary" : "outline")} className={cn("w-full h-16 text-lg justify-end px-4", isMatched(item) && "opacity-50")} onClick={function () { return handleItemClick(item, 'right'); }} disabled={disabled || isMatched(item)}>
                        {item}
                    </Button>); })}
            </div>
        </div>);
}
