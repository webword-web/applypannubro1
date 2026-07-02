'use client';

import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle2, Clock, ShieldCheck, Headphones, Smartphone, CreditCard } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      title: 'Expert Guidance',
      description: 'Our experienced team knows the exact requirements and procedures for all services, ensuring zero rejections.',
      icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30'
    },
    {
      title: 'Fast Processing',
      description: 'We prioritize your applications and track them continuously to ensure the fastest possible turnaround time.',
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30'
    },
    {
      title: '100% Secure',
      description: 'Your personal documents and data are handled with the highest level of security and complete confidentiality.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30'
    },
    {
      title: 'WhatsApp Support',
      description: 'Get instant updates and support directly on your WhatsApp. No need to download any apps or check emails.',
      icon: <Headphones className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30'
    },
    {
      title: 'Digital First',
      description: 'Complete most processes from the comfort of your home. Just send documents via WhatsApp or email.',
      icon: <Smartphone className="w-6 h-6 text-cyan-600" />,
      color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-800/30'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. We clearly state government fees and our service charges upfront.',
      icon: <CreditCard className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800/30'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We deliver peace of mind along with our services. Here is why thousands of customers trust us with their important documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} hoverEffect className="p-6 h-full border-0 shadow-sm bg-white dark:bg-black/50">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
