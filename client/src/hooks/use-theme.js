// Dark mode theme hook
import { useState, useEffect, useCallback } from 'react';
export function useTheme() {
    var _a = useState(function () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    }), theme = _a[0], setThemeState = _a[1];
    var _b = useState('light'), resolvedTheme = _b[0], setResolvedTheme = _b[1];
    useEffect(function () {
        var root = window.document.documentElement;
        var applyTheme = function (newTheme) {
            root.classList.remove('light', 'dark');
            root.classList.add(newTheme);
            setResolvedTheme(newTheme);
        };
        if (theme === 'system') {
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            // Listen for system theme changes
            var mediaQuery_1 = window.matchMedia('(prefers-color-scheme: dark)');
            var handler_1 = function (e) { return applyTheme(e.matches ? 'dark' : 'light'); };
            mediaQuery_1.addEventListener('change', handler_1);
            return function () { return mediaQuery_1.removeEventListener('change', handler_1); };
        }
        else {
            applyTheme(theme);
        }
    }, [theme]);
    var setTheme = useCallback(function (newTheme) {
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
    }, []);
    var toggleTheme = useCallback(function () {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    }, [resolvedTheme, setTheme]);
    return { theme: theme, resolvedTheme: resolvedTheme, setTheme: setTheme, toggleTheme: toggleTheme };
}
