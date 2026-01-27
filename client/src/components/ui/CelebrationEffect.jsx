import { useEffect } from 'react';
import confetti from 'canvas-confetti';
var CelebrationEffect = function (_a) {
    var trigger = _a.trigger, _b = _a.type, type = _b === void 0 ? 'confetti' : _b, _c = _a.intensity, intensity = _c === void 0 ? 'medium' : _c, _d = _a.duration, duration = _d === void 0 ? 1000 : _d, onComplete = _a.onComplete;
    useEffect(function () {
        if (trigger) {
            // Fire confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            // Call onComplete after animation
            var timer_1 = setTimeout(function () {
                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            }, duration);
            return function () { return clearTimeout(timer_1); };
        }
    }, [trigger, onComplete]);
    return null;
};
export default CelebrationEffect;
