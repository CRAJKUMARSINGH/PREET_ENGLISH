var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { cn } from '../../lib/utils';
var ModernCard = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.hover, hover = _c === void 0 ? true : _c, _d = _a.glow, glow = _d === void 0 ? false : _d, className = _a.className, children = _a.children, props = __rest(_a, ["variant", "hover", "glow", "className", "children"]);
    var baseClasses = 'rounded-xl transition-all duration-300';
    var variantClasses = {
        default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md',
        glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50',
        elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl',
        gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border border-primary-200 dark:border-primary-800 shadow-lg',
    };
    var hoverClasses = hover ? {
        default: 'hover:shadow-lg hover:scale-[1.02]',
        glass: 'hover:shadow-glass-lg hover:bg-white/90 dark:hover:bg-neutral-900/90',
        elevated: 'hover:shadow-2xl hover:-translate-y-1',
        gradient: 'hover:shadow-xl hover:scale-[1.02]',
    }[variant] : '';
    var glowClasses = glow ? 'animate-glow' : '';
    return (<div className={cn(baseClasses, variantClasses[variant], hoverClasses, glowClasses, className)} {...props}>
      {children}
    </div>);
};
export default ModernCard;
