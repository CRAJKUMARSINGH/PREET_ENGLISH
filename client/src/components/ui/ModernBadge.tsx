import React from 'react';
import { cn } from '../../lib/utils';

interface ModernBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'cultural';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const ModernBadge: React.FC<ModernBadgeProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  pulse = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
    cultural: 'bg-gradient-to-r from-cultural-saffron/20 to-cultural-lotus/20 text-cultural-saffron dark:text-cultural-lotus border border-cultural-saffron/30',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  const glowClasses = glow ? 'shadow-lg shadow-current/25' : '';
  const pulseClasses = pulse ? 'animate-pulse' : '';
  
  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        pulseClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default ModernBadge;