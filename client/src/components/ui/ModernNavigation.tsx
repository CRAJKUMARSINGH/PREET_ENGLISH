import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import ModernButton from './ModernButton';

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  disabled?: boolean;
}

interface ModernNavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  variant?: 'horizontal' | 'vertical' | 'pills' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({
  items,
  activeItem,
  variant = 'horizontal',
  size = 'md',
  className,
  onItemClick,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const baseClasses = 'flex transition-all duration-300';
  
  const variantClasses = {
    horizontal: 'flex-row space-x-1',
    vertical: 'flex-col space-y-1',
    pills: 'flex-row space-x-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl',
    glass: 'flex-row space-x-1 glass backdrop-blur-md p-2 rounded-xl',
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const itemBaseClasses = 'relative flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer';
  
  const getItemClasses = (item: NavigationItem, isActive: boolean, isHovered: boolean) => {
    if (item.disabled) {
      return 'text-neutral-400 cursor-not-allowed';
    }
    
    if (variant === 'pills') {
      return isActive
        ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
        : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400';
    }
    
    if (variant === 'glass') {
      return isActive
        ? 'bg-white/80 dark:bg-neutral-800/80 text-primary-600 dark:text-primary-400 shadow-md backdrop-blur-sm'
        : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-neutral-800/60 hover:text-primary-600 dark:hover:text-primary-400';
    }
    
    return isActive
      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400';
  };
  
  const handleItemClick = (item: NavigationItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    onItemClick?.(item);
  };
  
  return (
    <nav className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      {items.map((item) => {
        const isActive = activeItem === item.id;
        const isHovered = hoveredItem === item.id;
        
        return (
          <div
            key={item.id}
            className={cn(itemBaseClasses, getItemClasses(item, isActive, isHovered))}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item)}
          >
            {/* Active indicator */}
            {isActive && variant === 'horizontal' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary-500 rounded-full" />
            )}
            
            {isActive && variant === 'vertical' && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-8 bg-primary-500 rounded-full" />
            )}
            
            {/* Icon */}
            {item.icon && (
              <span className={cn(
                'flex-shrink-0 transition-transform duration-200',
                isHovered && 'scale-110'
              )}>
                {item.icon}
              </span>
            )}
            
            {/* Label */}
            <span className="font-medium">{item.label}</span>
            
            {/* Badge */}
            {item.badge && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-primary-500 text-white rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
            
            {/* Hover effect */}
            {isHovered && !isActive && (
              <div className="absolute inset-0 bg-primary-500/5 rounded-lg animate-fade-in" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default ModernNavigation;