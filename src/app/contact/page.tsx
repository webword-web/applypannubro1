import { Metadata } from 'next';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { generateWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us | APPLY PANNU BRO',
  description: 'Get in touch with Apply Pannu Bro for all your digital service needs.',
};

export default async function ContactPage() {
  await connectDB();
  const settings = await Settings.findOne().lean();

  const phone = settings?.contactNumber || '8525041700';
  const whatsapp = settings?.whatsappNumber || '918525041700';
  const email = settings?.email || 'applypannubro@gmail.com';
  const address = settings?.address || 'Tamil Nadu, India';
  const workingHours = settings?.workingHours || 'Mon - Sat: 9:00 AM - 7:00 PM';
  
  const whatsappUrl = generateWhatsAppUrl(whatsapp, 'Hello Apply Pannu Bro,\nI need some help.');

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900/30 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Have a question or need assistance with a service? Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <GlassCard className="p-8 border-0 bg-white dark:bg-black/40 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>
              
              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number</h3>
                    <a href={`tel:${phone}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">WhatsApp</h3>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</h3>
                    <a href={`mailto:${email}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-orange-600 transition-colors break-all">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Office Address</h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Working Hours</h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {workingHours}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <RippleButton size="lg" fullWidth className="bg-green-500 hover:bg-green-600 border-0 shadow-lg shadow-green-500/30 text-white">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp Now
                  </RippleButton>
                </a>
              </div>
            </GlassCard>
          </div>
          
          {/* Map / Quick Contact */}
          <div className="space-y-6">
            <GlassCard className="p-2 border-0 bg-white dark:bg-black/40 h-[400px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden relative shadow-lg">
              {settings?.googleMapEmbed ? (
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden" 
                  dangerouslySetInnerHTML={{ __html: settings.googleMapEmbed }}
                />
              ) : (
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-col text-gray-500">
                  <MapPin className="w-12 h-12 mb-4 text-gray-400" />
                  <p>Map Location</p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How fast do you process applications?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Processing time varies depending on the specific service and government department. We track everything and ensure the fastest possible processing.</p>
            </GlassCard>
            <GlassCard className="p-6 border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Are my documents secure?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Yes, absolutely. We maintain strict confidentiality. Your documents are used only for the purpose of the application and are kept completely secure.</p>
            </GlassCard>
            <GlassCard className="p-6 border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How do I track my status?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">You can directly message us on WhatsApp anytime to know the live status of your application. We also send proactive updates.</p>
            </GlassCard>
            <GlassCard className="p-6 border border-gray-100 dark:border-white/10 bg-white dark:bg-black/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What if my application gets rejected?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">We pre-screen all documents to minimize rejection chances. In the rare case it happens, we guide you on how to fix the issue and reapply.</p>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}
