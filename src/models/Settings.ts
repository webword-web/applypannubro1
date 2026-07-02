import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsDoc extends Document {
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

const SettingsSchema = new Schema<ISettingsDoc>(
  {
    businessName: { type: String, default: 'APPLY PANNU BRO' },
    tagline: { type: String, default: 'One Stop Solution For All Your Needs' },
    heroBannerTitle: { type: String, default: 'Your Trusted Digital Service Partner' },
    heroBannerSubtitle: {
      type: String,
      default: 'Get all your government services, certificates, and applications done quickly and hassle-free.',
    },
    heroBannerImage: { type: String, default: '' },
    aboutTitle: { type: String, default: 'About APPLY PANNU BRO' },
    aboutDescription: {
      type: String,
      default:
        'We are your one-stop solution for all government services, certificates, and digital applications. Our team of experts ensures quick processing with transparent pricing. From PAN cards to passport applications, we handle everything professionally so you can focus on what matters most.',
    },
    aboutImage: { type: String, default: '' },
    contactNumber: { type: String, default: '8525041700' },
    whatsappNumber: { type: String, default: '918525041700' },
    email: { type: String, default: 'applypannubro@gmail.com' },
    address: { type: String, default: 'Tamil Nadu, India' },
    workingHours: { type: String, default: 'Mon - Sat: 9:00 AM - 7:00 PM' },
    googleMapEmbed: { type: String, default: '' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    logo: { type: String, default: '' },
    themeColor: { type: String, default: '#1a56db' },
    footerText: { type: String, default: '© 2024 APPLY PANNU BRO. All rights reserved.' },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettingsDoc>('Settings', SettingsSchema);
