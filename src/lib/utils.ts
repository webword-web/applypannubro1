export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateWhatsAppMessage(serviceName: string, template?: string): string {
  if (template) {
    return template.replace('{service_name}', serviceName);
  }
  return `Hello Apply Pannu Bro,\nI would like to apply for *${serviceName}*.\nPlease guide me.`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export const SERVICE_CATEGORIES = [
  'Government',
  'Certificate',
  'Education',
  'Jobs',
  'Identity',
  'Travel',
  'Banking',
  'Payments',
  'Utility',
  'Business',
  'Registration',
  'Tax',
  'Recharge',
  'Booking',
  'Insurance',
  'Others',
] as const;

export const STATUS_OPTIONS = [
  'Active',
  'Coming Soon',
  'Unavailable',
  'Popular',
  'New',
] as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Active': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Coming Soon': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Unavailable': { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
  'Popular': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
  'New': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
};

export const CATEGORY_ICONS: Record<string, string> = {
  Government: '🏛️',
  Certificate: '📜',
  Education: '🎓',
  Jobs: '💼',
  Identity: '🪪',
  Travel: '✈️',
  Banking: '🏦',
  Payments: '💳',
  Utility: '⚡',
  Business: '🏢',
  Registration: '📋',
  Tax: '📊',
  Recharge: '📱',
  Booking: '🎫',
  Insurance: '🛡️',
  Others: '📦',
};
