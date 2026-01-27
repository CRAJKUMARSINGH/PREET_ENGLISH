import React from 'react';
import { cn } from '../../lib/utils';
var ProgressRing = function (_a) {
    var progress = _a.progress, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.color, color = _c === void 0 ? 'primary' : _c, _d = _a.showText, showText = _d === void 0 ? true : _d, _e = _a.showPercentage, showPercentage = _e === void 0 ? true : _e, _f = _a.glow, glow = _f === void 0 ? false : _f, className = _a.className, children = _a.children;
    var sizes = {
        sm: { ring: 'w-12 h-12', stroke: 2, radius: 20 },
        md: { ring: 'w-16 h-16', stroke: 3, radius: 26 },
        lg: { ring: 'w-20 h-20', stroke: 4, radius: 32 }
    };
    var colors = {
        primary: 'stroke-[#1CE783]',
        secondary: 'stroke-blue-500',
        success: 'stroke-green-500',
        warning: 'stroke-yellow-500',
        error: 'stroke-red-500'
    };
    var _g = sizes[size], ring = _g.ring, stroke = _g.stroke, radius = _g.radius;
    var circumference = 2 * Math.PI * radius;
    var strokeDasharray = circumference;
    var strokeDashoffset = circumference - (progress / 100) * circumference;
    return (<div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg className={cn(ring, glow && 'drop-shadow-lg')} viewBox="0 0 64 64">
        {/* Background circle */}
        <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-gray-200 dark:text-gray-700"/>
        {/* Progress circle */}
        <circle cx="32" cy="32" r={radius} fill="none" strokeWidth={stroke} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={cn('transition-all duration-300 ease-in-out', colors[color], glow && 'filter drop-shadow-sm')} transform="rotate(-90 32 32)"/>
      </svg>
      {(showText || showPercentage) && (<div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>)}
      {children && (<div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>)}
    </div>);
};
export default ProgressRing;
