import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showText?: boolean;
  showPercentage?: boolean;
  glow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 'md',
  color = 'primary',
  showText = true,
  showPercentage = true,
  glow = false,
  className,
  children
}) => {
  const sizes = {
    sm: { ring: 'w-12 h-12', stroke: 2, radius: 20 },
    md: { ring: 'w-16 h-16', stroke: 3, radius: 26 },
    lg: { ring: 'w-20 h-20', stroke: 4, radius: 32 }
  };

  const colors = {
    primary: 'stroke-[#1CE783]',
    secondary: 'stroke-blue-500',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500'
  };

  const { ring, stroke, radius } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg className={cn(ring, glow && 'drop-shadow-lg')} viewBox="0 0 64 64">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-in-out', colors[color], glow && 'filter drop-shadow-sm')}
          transform="rotate(-90 32 32)"
        />
      </svg>
      {(showText || showPercentage) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;