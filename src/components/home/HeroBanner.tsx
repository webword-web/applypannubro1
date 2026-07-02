'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { RippleButton } from '../ui/RippleButton';
import { generateWhatsAppUrl } from '@/lib/utils';
import Link from 'next/link';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
}

export function HeroBanner({ 
  title = "Your Trusted Digital Service Partner",
  subtitle = "Get all your government services, certificates, and applications done quickly and hassle-free." 
}: HeroBannerProps) {
  const whatsappUrl = generateWhatsAppUrl('918525041700', 'Hello Apply Pannu Bro,\nI would like to know about your services.');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-black dark:to-gray-900 z-0"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            One Stop Solution For All Your Needs
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight mb-6"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#services" className="w-full sm:w-auto">
              <RippleButton size="lg" fullWidth className="group">
                Explore Services
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
            </Link>
            
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <RippleButton variant="outline" size="lg" fullWidth className="bg-white dark:bg-transparent">
                <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
                Chat on WhatsApp
              </RippleButton>
            </a>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">⚡</div>
              Fast Processing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">🔒</div>
              Secure Data
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">💼</div>
              Expert Team
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
