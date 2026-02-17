import { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { audioService } from '@/lib/audioService';
import { cn } from '@/lib/utils';

interface AudioButtonProps {
  text: string;
  language?: 'en' | 'hi';
  rate?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showText?: boolean;
}

export function AudioButton({
  text,
  language = 'en',
  rate = 0.9,
  size = 'sm',
  variant = 'ghost',
  className,
  showText = false
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
    } else {
      const options = {
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      };

      if (language === 'en') {
        audioService.speak(text, 'en-US', rate, options);
      } else {
        audioService.speak(text, 'hi-IN', rate, options);
      }
    }
  };


  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleClick}
      className={cn(
        sizeClasses[size],
        'transition-all hover:scale-110',
        isPlaying && 'text-primary animate-pulse',
        className
      )}
      title={isPlaying ? 'Stop' : 'Listen'}
    >
      {isPlaying ? (
        <VolumeX className={iconSizes[size]} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
      {showText && (
        <span className="ml-2">
          {isPlaying ? 'Stop' : 'Listen'}
        </span>
      )}
    </Button>
  );
}
