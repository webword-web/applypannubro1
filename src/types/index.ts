export type ServiceStatus = 'Active' | 'Coming Soon' | 'Unavailable' | 'Popular' | 'New';

export type ServiceCategory =
  | 'Government'
  | 'Certificate'
  | 'Education'
  | 'Jobs'
  | 'Identity'
  | 'Travel'
  | 'Banking'
  | 'Payments'
  | 'Utility'
  | 'Business'
  | 'Registration'
  | 'Tax'
  | 'Recharge'
  | 'Booking'
  | 'Insurance'
  | 'Others';

export interface FAQ {
  question: string;
  answer: string;
}

export interface IService {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  status: ServiceStatus;
  icon: string;
  image: string;
  documents: string[];
  eligibility: string;
  processingTime: string;
  governmentFee: string;
  serviceCharge: string;
  benefits: string[];
  faq: FAQ[];
  whatsappTemplate: string;
  displayOrder: number;
  isEnabled: boolean;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdmin {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt?: string;
}

export interface IEnquiry {
  _id?: string;
  customerName: string;
  phone: string;
  service: string;
  serviceSlug: string;
  message: string;
  date: string;
  time: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed' | 'Resolved';
  createdAt?: string;
}

export interface ISiteSettings {
  _id?: string;
  businessName: string;
  tagline: string;
  heroBannerTitle: string;
  heroBannerSubtitle: string;
  heroBannerImage: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapEmbed: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  logo: string;
  themeColor: string;
  footerText: string;
}

export interface DashboardStats {
  totalServices: number;
  activeServices: number;
  comingSoon: number;
  popularServices: number;
  newServices: number;
  totalEnquiries: number;
  recentEnquiries: IEnquiry[];
}
