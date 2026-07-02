'use client';

import React from 'react';
import { IService } from '@/types';
import { ServiceCard } from '../services/ServiceCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PopularServicesProps {
  services: IService[];
}

export function PopularServices({ services }: PopularServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Popular Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Our most frequently requested services. Quick, reliable, and hassle-free processing.
            </p>
          </div>
          <Link href="#services" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
            View All Services
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
