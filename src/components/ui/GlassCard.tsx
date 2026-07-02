'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`
        bg-white/80 dark:bg-black/40 
        backdrop-blur-md 
        border border-gray-200/50 dark:border-white/10 
        rounded-2xl 
        shadow-sm dark:shadow-none
        ${className}
      `}
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
