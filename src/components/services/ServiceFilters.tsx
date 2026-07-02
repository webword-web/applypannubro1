'use client';

import React, { useRef } from 'react';
import { SERVICE_CATEGORIES, CATEGORY_ICONS } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceFiltersProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ServiceFilters({ activeCategory, onSelectCategory }: ServiceFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Scrollable Container */}
      <div className="relative">
        {/* Fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-3 pb-4 pt-1 px-1 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => onSelectCategory('All')}
            className={`
              flex-shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${activeCategory === 'All' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                : 'bg-white dark:bg-black/40 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600'}
            `}
          >
            🌟 All Services
          </button>
          
          {SERVICE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                flex-shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                  : 'bg-white dark:bg-black/40 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600'}
              `}
            >
              <span>{CATEGORY_ICONS[category] || '📄'}</span>
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
