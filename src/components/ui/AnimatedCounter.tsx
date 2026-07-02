'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Ease out expo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end); // Ensure we end exactly at the target
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="font-bold tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}
