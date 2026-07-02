'use client';

import React from 'react';
import { RippleButton } from '../ui/RippleButton';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/utils';

export function CTASection() {
  const whatsappUrl = generateWhatsAppUrl('918525041700', 'Hello Apply Pannu Bro,\nI need some help.');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 bg-blue-600 z-0">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        {/* Modern decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready To Get Started?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Contact us on WhatsApp for quick processing of your applications. Our team is ready to assist you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <RippleButton size="lg" className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg shadow-green-500/30 w-full sm:w-auto text-lg font-semibold h-14 px-8">
                <MessageCircle className="w-6 h-6 mr-2" />
                Chat on WhatsApp
              </RippleButton>
            </a>
            <a href="tel:8525041700" className="w-full sm:w-auto">
              <RippleButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto text-lg h-14 px-8">
                Call Us Now
              </RippleButton>
            </a>
          </div>
          
          <p className="text-white/60 text-sm mt-8">
            Working Hours: Monday to Saturday, 9:00 AM - 7:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
