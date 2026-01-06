import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  animated?: boolean;
  glow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 'md',
  strokeWidth,
  color = 'primary',
  showPercentage = true,
  animated = true,
  glow = false,
  className,
  children,
}) => {
  const sizeConfig = {
    sm: { diameter: 60, defaultStroke: 4, textSize: 'text-xs' },
    md: { diameter: 80, defaultStroke: 6, textSize: 'text-sm' },
    lg: { diameter: 120, defaultStroke: 8, textSize: 'text-lg' },
    xl: { diameter: 160, defaultStroke: 10, textSize: 'text-xl' },
  };
  
  const config = sizeConfig[size];
  const stroke = strokeWidth || config.defaultStroke;
  const radius = (config.diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    error: 'text-error-500',
  };
  
  const glowFilter = glow ? 'drop-shadow-lg' : '';
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        className={cn('transform -rotate-90', glowFilter)}
      >
        {/* Background circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          className="text-neutral-200 dark:text-neutral-700"
        />
        
        {/* Progress circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            colorClasses[color],
            animated && 'transition-all duration-1000 ease-out'
          )}
          style={{
            filter: glow ? `drop-shadow(0 0 8px currentColor)` : undefined,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center',
        config.textSize,
        'font-semibold',
        colorClasses[color]
      )}>
        {children || (showPercentage && `${Math.round(progress)}%`)}
      </div>
    </div>
  );
};

export default ProgressRing;