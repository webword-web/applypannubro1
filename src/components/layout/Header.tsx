'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, UserCircle } from 'lucide-react';
import { RippleButton } from '../ui/RippleButton';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Admin routes don't show the public header
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Services', href: '/#services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              AB
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                APPLY PANNU <span className="text-orange-500">BRO</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">Digital Service Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-3">
              <a href="tel:8525041700" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors">
                <Phone className="w-4 h-4 text-orange-500" />
                852 504 1700
              </a>
              <Link href="/admin/login">
                <RippleButton variant="outline" size="sm" className="rounded-full px-4">
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden lg:inline">Admin Login</span>
                </RippleButton>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-t dark:border-white/10 shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 font-medium text-gray-700 dark:text-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />
              
              <div className="flex flex-col gap-3 pb-2">
                <a href="tel:8525041700" className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-bold">
                  <Phone className="w-5 h-5" />
                  Call: 852 504 1700
                </a>
                <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <RippleButton variant="outline" fullWidth>
                    <UserCircle className="w-5 h-5" />
                    Admin Login
                  </RippleButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
