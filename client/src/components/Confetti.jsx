// Confetti animation component
import { useEffect, useState } from 'react';
var COLORS = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
    '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA',
    '#FF9F43', '#EE5A24', '#0652DD', '#9980FA'
];
export function Confetti(_a) {
    var isActive = _a.isActive, _b = _a.duration, duration = _b === void 0 ? 3000 : _b;
    var _c = useState([]), pieces = _c[0], setPieces = _c[1];
    useEffect(function () {
        if (isActive) {
            var newPieces = Array.from({ length: 50 }, function (_, i) { return ({
                id: i,
                x: Math.random() * 100,
                y: -10 - Math.random() * 20,
                rotation: Math.random() * 360,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 8 + Math.random() * 8,
                delay: Math.random() * 0.5,
            }); });
            setPieces(newPieces);
            var timer_1 = setTimeout(function () {
                setPieces([]);
            }, duration);
            return function () { return clearTimeout(timer_1); };
        }
    }, [isActive, duration]);
    if (!isActive || pieces.length === 0)
        return null;
    return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(function (piece) { return (<div key={piece.id} className="absolute animate-confetti-fall" style={{
                left: "".concat(piece.x, "%"),
                top: "".concat(piece.y, "%"),
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: "rotate(".concat(piece.rotation, "deg)"),
                animationDelay: "".concat(piece.delay, "s"),
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
            }}/>); })}
    </div>);
}
