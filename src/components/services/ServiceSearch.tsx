'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface ServiceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceSearch({ value, onChange }: ServiceSearchProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md"
        placeholder="Search for services, certificates, jobs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Decorative gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl opacity-0 hover:opacity-10 transition duration-300 blur z-[-1]"></div>
    </div>
  );
}
