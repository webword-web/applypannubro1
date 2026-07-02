'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { IService } from '@/types';
import { ServiceCard } from './ServiceCard';
import { ServiceSearch } from './ServiceSearch';
import { ServiceFilters } from './ServiceFilters';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AllServicesProps {
  initialServices: IService[];
}

export function AllServices({ initialServices }: AllServicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredServices = useMemo(() => {
    if (!initialServices) return [];
    
    return initialServices.filter((service) => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        activeCategory === 'All' || 
        service.category === activeCategory;
        
      return matchesSearch && matchesCategory;
    });
  }, [initialServices, searchQuery, activeCategory]);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Explore All Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Browse through our comprehensive list of digital services, government applications, and certificates.
          </p>
        </div>

        {/* Search */}
        <ServiceSearch value={searchQuery} onChange={setSearchQuery} />
        
        {/* Category Filters */}
        <ServiceFilters 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        {/* Results */}
        {!isClient ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No services found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              We couldn't find any services matching "{searchQuery}" in {activeCategory} category.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 text-blue-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
