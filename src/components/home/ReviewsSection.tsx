'use client';

import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Star } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      name: 'Karthik R.',
      service: 'PAN Card Apply',
      rating: 5,
      date: '2 weeks ago',
      text: 'Excellent service! Got my PAN card within a week without any hassle. The team was very responsive on WhatsApp and guided me through the entire process.',
      initials: 'KR',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Priya M.',
      service: 'Passport Renewal',
      rating: 5,
      date: '1 month ago',
      text: 'I was worried about my passport renewal, but Apply Pannu Bro made it so easy. They booked the appointment and arranged all documents perfectly.',
      initials: 'PM',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Suresh Kumar',
      service: 'GST Registration',
      rating: 5,
      date: '2 months ago',
      text: 'Best place for business registrations. Got my GST and MSME done quickly. Very professional and transparent pricing.',
      initials: 'SK',
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900 dark:text-white">4.9/5 Average Rating</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Loved By Thousands
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Don't just take our word for it. Read what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <GlassCard key={index} className="p-6 h-full flex flex-col bg-white dark:bg-black/50 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.color}`}>
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                </div>
                {/* Google logo placeholder */}
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10">
                  <span className="font-bold text-blue-500 text-lg leading-none">G</span>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                "{review.text}"
              </p>
              
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                  Service: {review.service}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
