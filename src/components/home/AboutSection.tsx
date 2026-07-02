'use client';

import React from 'react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { GlassCard } from '../ui/GlassCard';

export function AboutSection() {
  const stats = [
    { label: 'Happy Customers', value: 5000, suffix: '+' },
    { label: 'Services Completed', value: 15000, suffix: '+' },
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Google Rating', value: 4.9, suffix: '/5' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual side */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-blue-600 rounded-[2rem] transform -rotate-3 scale-[0.98] opacity-10 dark:opacity-20"></div>
            <GlassCard className="relative p-8 rounded-[2rem] border-0 bg-gray-50 dark:bg-gray-900/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-40 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-4xl shadow-inner">
                    🏛️
                  </div>
                  <div className="h-32 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-4xl shadow-inner">
                    📜
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl shadow-inner">
                    💳
                  </div>
                  <div className="h-40 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-4xl shadow-inner">
                    ✈️
                  </div>
                </div>
              </div>
              
              {/* Experience badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black p-4 rounded-full shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center h-28 w-28 text-center z-10">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Years Exp.</div>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Text content side */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Simplifying Complex Government Services For You
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              At <strong className="text-gray-900 dark:text-white">APPLY PANNU BRO</strong>, we understand that dealing with government applications, certificates, and registrations can be time-consuming and confusing. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Our mission is to bridge this gap by providing professional, transparent, and quick services. Whether you need a PAN card, passport, or business registration, our expert team handles everything from start to finish.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
