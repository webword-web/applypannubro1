import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceDoc extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  status: string;
  icon: string;
  image: string;
  documents: string[];
  eligibility: string;
  processingTime: string;
  governmentFee: string;
  serviceCharge: string;
  benefits: string[];
  faq: { question: string; answer: string }[];
  whatsappTemplate: string;
  displayOrder: number;
  isEnabled: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Government', 'Certificate', 'Education', 'Jobs', 'Identity',
        'Travel', 'Banking', 'Payments', 'Utility', 'Business',
        'Registration', 'Tax', 'Recharge', 'Booking', 'Insurance', 'Others',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Coming Soon', 'Unavailable', 'Popular', 'New'],
      default: 'Active',
    },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    documents: [{ type: String }],
    eligibility: { type: String, default: '' },
    processingTime: { type: String, default: '' },
    governmentFee: { type: String, default: '' },
    serviceCharge: { type: String, default: '' },
    benefits: [{ type: String }],
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    whatsappTemplate: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isEnabled: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ status: 1 });
ServiceSchema.index({ displayOrder: 1 });

export default mongoose.models.Service || mongoose.model<IServiceDoc>('Service', ServiceSchema);
