'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWhatsAppUrl } from '@/lib/utils';

export function WhatsAppSticky() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Admin routes don't show the sticky buttons
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = generateWhatsAppUrl('918525041700', 'Hello Apply Pannu Bro,\nI need some help.');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a 
            href="tel:8525041700"
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Call Us"
          >
            <Phone className="w-5 h-5 fill-current" />
          </motion.a>
          
          <motion.a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/40 hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Chat on WhatsApp"
          >
            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
            <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with us
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
