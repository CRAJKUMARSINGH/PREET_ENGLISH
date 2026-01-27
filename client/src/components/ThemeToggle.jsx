// Theme toggle button component
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
export function ThemeToggle() {
    var _a = useTheme(), theme = _a.theme, resolvedTheme = _a.resolvedTheme, setTheme = _a.setTheme;
    return (<div className="flex items-center gap-1 bg-secondary/50 dark:bg-slate-800 rounded-full p-1">
      <button onClick={function () { return setTheme('light'); }} className={cn("p-2 rounded-full transition-all duration-300", theme === 'light'
            ? "bg-white dark:bg-slate-700 shadow-sm text-amber-500"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")} title="Light Mode">
        <Sun className="h-4 w-4"/>
      </button>
      
      <button onClick={function () { return setTheme('dark'); }} className={cn("p-2 rounded-full transition-all duration-300", theme === 'dark'
            ? "bg-white dark:bg-slate-700 shadow-sm text-blue-500"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")} title="Dark Mode">
        <Moon className="h-4 w-4"/>
      </button>
      
      <button onClick={function () { return setTheme('system'); }} className={cn("p-2 rounded-full transition-all duration-300", theme === 'system'
            ? "bg-white dark:bg-slate-700 shadow-sm text-green-500"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")} title="System Default">
        <Monitor className="h-4 w-4"/>
      </button>
    </div>);
}
