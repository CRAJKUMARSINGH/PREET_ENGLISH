import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: Array<{
    name: string;
    emoji: string;
    count: number;
  }>;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="category-filter flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        onClick={() => onSelectCategory(null)}
        className="flex items-center gap-2"
      >
        🏠 All Topics
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={selectedCategory === category.name ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category.name)}
          className="flex items-center gap-2"
        >
          {category.emoji} {category.name}
          <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full ml-1">
            {category.count}
          </span>
        </Button>
      ))}
    </div>
  );
};
