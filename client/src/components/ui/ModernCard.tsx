import React from 'react';
import { cn } from '../../lib/utils';

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'gradient';
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const ModernCard: React.FC<ModernCardProps> = ({
  variant = 'default',
  hover = true,
  glow = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md',
    glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border border-primary-200 dark:border-primary-800 shadow-lg',
  };
  
  const hoverClasses = hover ? {
    default: 'hover:shadow-lg hover:scale-[1.02]',
    glass: 'hover:shadow-glass-lg hover:bg-white/90 dark:hover:bg-neutral-900/90',
    elevated: 'hover:shadow-2xl hover:-translate-y-1',
    gradient: 'hover:shadow-xl hover:scale-[1.02]',
  }[variant] : '';
  
  const glowClasses = glow ? 'animate-glow' : '';
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModernCard;