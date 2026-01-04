import React from 'react';
import { cn } from '../../lib/utils';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'glass' | 'minimal';
}

const ModernInput: React.FC<ModernInputProps> = ({
  label,
  error,
  success,
  icon,
  iconPosition = 'left',
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'w-full px-3 py-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-primary-500 focus:border-primary-500',
    glass: 'glass backdrop-blur-md rounded-lg focus:ring-primary-500 focus:border-primary-500',
    minimal: 'bg-transparent border-b-2 border-neutral-300 dark:border-neutral-700 rounded-none focus:ring-0 focus:border-primary-500',
  };
  
  const stateClasses = error 
    ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
    : success 
    ? 'border-success-500 focus:ring-success-500 focus:border-success-500'
    : '';
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  
  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={cn(
            'absolute inset-y-0 flex items-center pointer-events-none text-neutral-400',
            iconPosition === 'left' ? 'left-3' : 'right-3'
          )}>
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            baseClasses,
            variantClasses[variant],
            stateClasses,
            iconClasses,
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error-600 dark:text-error-400 animate-slide-in-up">
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-success-600 dark:text-success-400 animate-slide-in-up">
          {success}
        </p>
      )}
    </div>
  );
};

export default ModernInput;