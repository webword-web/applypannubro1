import { IService } from '@/types';
import { CATEGORY_ICONS } from '@/lib/utils';
import { StatusBadge } from '../ui/StatusBadge';
import { GlassCard } from '../ui/GlassCard';
import { RippleButton } from '../ui/RippleButton';
import Link from 'next/link';

interface ServiceCardProps {
  service: IService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const icon = service.icon || CATEGORY_ICONS[service.category] || '📄';

  return (
    <GlassCard hoverEffect className="flex flex-col h-full overflow-hidden group">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl shadow-sm border border-blue-100 dark:border-blue-800/30 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <StatusBadge status={service.status} />
        </div>
        
        <div className="inline-block px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md text-xs text-gray-600 dark:text-gray-400 font-medium mb-3 w-max">
          {service.category}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {service.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
          {service.shortDescription || service.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Govt Fee</span>
            <span className="font-semibold text-gray-900 dark:text-white">{service.governmentFee}</span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400">Time</span>
            <span className="font-semibold text-gray-900 dark:text-white">{service.processingTime}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <Link href={`/services/${service.slug}`} className="block w-full">
          <RippleButton variant="outline" fullWidth className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
            View Details
            <svg 
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </RippleButton>
        </Link>
      </div>
    </GlassCard>
  );
}
