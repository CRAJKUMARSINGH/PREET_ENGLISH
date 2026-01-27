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
var ModernInput = function (_a) {
    var label = _a.label, error = _a.error, success = _a.success, icon = _a.icon, _b = _a.iconPosition, iconPosition = _b === void 0 ? 'left' : _b, _c = _a.variant, variant = _c === void 0 ? 'default' : _c, className = _a.className, id = _a.id, props = __rest(_a, ["label", "error", "success", "icon", "iconPosition", "variant", "className", "id"]);
    var inputId = id || "input-".concat(Math.random().toString(36).substr(2, 9));
    var baseClasses = 'w-full px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    var variantClasses = {
        default: 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-primary-500 focus:border-primary-500',
        glass: 'glass backdrop-blur-md rounded-lg focus:ring-primary-500 focus:border-primary-500',
        minimal: 'bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 rounded-none focus:ring-0 focus:border-primary-500',
    };
    var stateClasses = error
        ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
        : success
            ? 'border-success-500 focus:ring-success-500 focus:border-success-500'
            : '';
    var iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
    return (<div className="space-y-1">
      {label && (<label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>)}
      
      <div className="relative">
        {icon && (<div className={cn('absolute inset-y-0 flex items-center pointer-events-none text-neutral-400', iconPosition === 'left' ? 'left-3' : 'right-3')}>
            {icon}
          </div>)}
        
        <input id={inputId} className={cn(baseClasses, variantClasses[variant], stateClasses, iconClasses, className)} {...props}/>
      </div>
      
      {error && (<p className="text-sm text-error-600 dark:text-error-400 animate-slide-in-up">
          {error}
        </p>)}
      
      {success && (<p className="text-sm text-success-600 dark:text-success-400 animate-slide-in-up">
          {success}
        </p>)}
    </div>);
};
export default ModernInput;
