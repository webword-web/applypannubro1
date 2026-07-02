'use client';

import React, { useState } from 'react';
import { IService } from '@/types';
import { StatusBadge } from '../ui/StatusBadge';
import { RippleButton } from '../ui/RippleButton';
import { generateWhatsAppUrl, generateWhatsAppMessage, CATEGORY_ICONS } from '@/lib/utils';
import { 
  ArrowLeft, FileText, CheckCircle2, Clock, 
  CreditCard, Wallet, Star, MessageCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { ServiceCard } from './ServiceCard';

interface ServiceDetailProps {
  service: IService;
  relatedServices: IService[];
}

export function ServiceDetail({ service, relatedServices }: ServiceDetailProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const icon = service.icon || CATEGORY_ICONS[service.category] || '📄';
  const whatsappMessage = generateWhatsAppMessage(service.name, service.whatsappTemplate);
  const whatsappUrl = generateWhatsAppUrl('918525041700', whatsappMessage);

  const handleApplyClick = async () => {
    setIsApplying(true);
    try {
      // Track the enquiry
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: service.name,
          serviceSlug: service.slug,
          message: 'Clicked Apply Now button'
        })
      });
    } catch (e) {
      console.error('Failed to track enquiry', e);
    } finally {
      setIsApplying(false);
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900/30 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb & Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/#services" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <div className="text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:text-blue-600">{service.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">{service.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <GlassCard className="p-8 border-0 bg-white dark:bg-black/40">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-4xl shadow-inner shrink-0">
                  {icon}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                      {service.category}
                    </span>
                    <StatusBadge status={service.status} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {service.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Documents Required */}
            {service.documents && service.documents.length > 0 && (
              <GlassCard className="p-8 border-0 bg-white dark:bg-black/40">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Documents Required
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{doc}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Eligibility */}
            {service.eligibility && (
              <GlassCard className="p-8 border-0 bg-white dark:bg-black/40">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900 dark:text-white">
                  <Star className="w-6 h-6 text-orange-500" />
                  Eligibility Criteria
                </h3>
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 text-gray-700 dark:text-gray-300 border border-orange-100 dark:border-orange-900/30">
                  {service.eligibility}
                </div>
              </GlassCard>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <GlassCard className="p-8 border-0 bg-white dark:bg-black/40">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                  <Star className="w-6 h-6 text-purple-600" />
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* FAQ */}
            {service.faq && service.faq.length > 0 && (
              <GlassCard className="p-8 border-0 bg-white dark:bg-black/40">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {service.faq.map((item, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-xl overflow-hidden transition-colors ${openFaq === index ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-black/20'}`}
                    >
                      <button
                        className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-gray-900 dark:text-white focus:outline-none"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      >
                        {item.question}
                        {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      
                      {openFaq === index && (
                        <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* Quick Summary & Action Card */}
            <div className="sticky top-24">
              <GlassCard className="p-6 border-2 border-blue-100 dark:border-blue-900/30 bg-white dark:bg-gray-900 shadow-xl shadow-blue-900/5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  Service Summary
                </h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Processing Time</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{service.processingTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Government Fee</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{service.governmentFee}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 shrink-0">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Service Charge</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{service.serviceCharge}</div>
                    </div>
                  </div>
                </div>

                {service.status !== 'Unavailable' ? (
                  <div className="space-y-3">
                    <RippleButton size="lg" fullWidth onClick={handleApplyClick} disabled={isApplying}>
                      {isApplying ? 'Processing...' : 'Apply Now'}
                    </RippleButton>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <RippleButton variant="outline" size="lg" fullWidth className="mt-3">
                        <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
                        Ask Question
                      </RippleButton>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-red-50 text-red-600 font-medium text-center border border-red-100">
                    Currently Unavailable
                  </div>
                )}
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By clicking apply, you will be redirected to WhatsApp to submit your details securely.
                </p>
              </GlassCard>
            </div>
            
          </div>
        </div>

        {/* Related Services */}
        {relatedServices && relatedServices.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService._id} service={relatedService} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
