import React from 'react';
import { Button } from '@/components/ui/button';
export var CategoryFilter = function (_a) {
    var categories = _a.categories, selectedCategory = _a.selectedCategory, onSelectCategory = _a.onSelectCategory;
    return (<div className="category-filter flex flex-wrap gap-2">
      <Button variant={selectedCategory === null ? 'default' : 'outline'} onClick={function () { return onSelectCategory(null); }} className="flex items-center gap-2">
        🏠 All Topics
      </Button>
      
      {categories.map(function (category) { return (<Button key={category.name} variant={selectedCategory === category.name ? 'default' : 'outline'} onClick={function () { return onSelectCategory(category.name); }} className="flex items-center gap-2">
          {category.emoji} {category.name}
          <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full ml-1">
            {category.count}
          </span>
        </Button>); })}
    </div>);
};
