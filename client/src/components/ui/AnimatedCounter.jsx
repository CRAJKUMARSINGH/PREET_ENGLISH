import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
var AnimatedCounter = function (_a) {
    var value = _a.value, _b = _a.duration, duration = _b === void 0 ? 1000 : _b, _c = _a.prefix, prefix = _c === void 0 ? '' : _c, _d = _a.suffix, suffix = _d === void 0 ? '' : _d, className = _a.className, _e = _a.decimals, decimals = _e === void 0 ? 0 : _e, _f = _a.separator, separator = _f === void 0 ? ',' : _f;
    var _g = useState(0), displayValue = _g[0], setDisplayValue = _g[1];
    useEffect(function () {
        var startTime;
        var animationFrame;
        var animate = function (timestamp) {
            if (!startTime)
                startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Easing function for smooth animation
            var easeOutQuart = 1 - Math.pow(1 - progress, 4);
            var currentValue = easeOutQuart * value;
            setDisplayValue(currentValue);
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return function () {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [value, duration]);
    var formatNumber = function (num) {
        var fixed = num.toFixed(decimals);
        var parts = fixed.split('.');
        // Add thousand separators
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
    };
    return (<span className={cn('tabular-nums', className)}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>);
};
export default AnimatedCounter;
