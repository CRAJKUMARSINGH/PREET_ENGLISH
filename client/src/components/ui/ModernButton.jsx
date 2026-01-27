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
var ModernButton = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, _d = _a.isLoading, isLoading = _d === void 0 ? false : _d, icon = _a.icon, _e = _a.iconPosition, iconPosition = _e === void 0 ? 'left' : _e, _f = _a.glow, glow = _f === void 0 ? false : _f, className = _a.className, children = _a.children, disabled = _a.disabled, props = __rest(_a, ["variant", "size", "isLoading", "icon", "iconPosition", "glow", "className", "children", "disabled"]);
    var baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    var variantClasses = {
        primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 focus:ring-primary-500',
        secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30 focus:ring-secondary-500',
        outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 focus:ring-primary-500',
        ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 focus:ring-primary-500',
        glass: 'glass backdrop-blur-md text-primary-700 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-glass hover:shadow-glass-lg focus:ring-primary-500',
        error: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 focus:ring-red-500',
    };
    var sizeClasses = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5',
        xl: 'px-8 py-4 text-xl gap-3',
    };
    var glowClasses = glow ? 'animate-glow' : '';
    return (<button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], glowClasses, isLoading && 'cursor-wait', className)} disabled={disabled || isLoading} {...props}>
      {isLoading ? (<>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"/>
          Loading...
        </>) : (<>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>)}
    </button>);
};
export default ModernButton;
