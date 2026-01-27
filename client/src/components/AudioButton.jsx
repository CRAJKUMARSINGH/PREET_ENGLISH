import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { audioService } from '@/lib/audioService';
import { cn } from '@/lib/utils';
export function AudioButton(_a) {
    var text = _a.text, _b = _a.language, language = _b === void 0 ? 'en' : _b, _c = _a.rate, rate = _c === void 0 ? 0.9 : _c, _d = _a.size, size = _d === void 0 ? 'sm' : _d, _e = _a.variant, variant = _e === void 0 ? 'ghost' : _e, className = _a.className, _f = _a.showText, showText = _f === void 0 ? false : _f;
    var _g = useState(false), isPlaying = _g[0], setIsPlaying = _g[1];
    var handleClick = function () {
        if (isPlaying) {
            audioService.stop();
            setIsPlaying(false);
        }
        else {
            setIsPlaying(true);
            if (language === 'en') {
                audioService.speakEnglish(text, rate);
            }
            else {
                audioService.speakHindi(text, rate);
            }
            // Reset after speech ends (estimate based on text length)
            var estimatedDuration = (text.length / 10) * 1000; // ~10 chars per second
            setTimeout(function () {
                setIsPlaying(false);
            }, estimatedDuration);
        }
    };
    var sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12'
    };
    var iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };
    return (<Button variant={variant} size="icon" onClick={handleClick} className={cn(sizeClasses[size], 'transition-all hover:scale-110', isPlaying && 'text-primary animate-pulse', className)} title={isPlaying ? 'Stop' : 'Listen'}>
      {isPlaying ? (<VolumeX className={iconSizes[size]}/>) : (<Volume2 className={iconSizes[size]}/>)}
      {showText && (<span className="ml-2">
          {isPlaying ? 'Stop' : 'Listen'}
        </span>)}
    </Button>);
}
