'use client';

import React, { ButtonHTMLAttributes, useState } from 'react';

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function RippleButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  ...props
}: RippleButtonProps) {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 400);

    if (onClick) {
      onClick(e);
    }
  };

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20',
    secondary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost: 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg font-medium',
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-xl transition-colors duration-200
        font-medium inline-flex items-center justify-center
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {isRippling && (
        <span
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)',
            width: '150%',
            aspectRatio: '1/1'
          }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </button>
  );
}
