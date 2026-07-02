import React from 'react';
import { STATUS_COLORS } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || {
    bg: 'bg-gray-500/15',
    text: 'text-gray-500',
    border: 'border-gray-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      {status === 'Active' && <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-500 rounded-full animate-pulse" />}
      {status}
    </span>
  );
}
