import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiryDoc extends Document {
  customerName: string;
  phone: string;
  service: string;
  serviceSlug: string;
  message: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiryDoc>(
  {
    customerName: { type: String, default: 'Website Visitor' },
    phone: { type: String, default: '' },
    service: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    message: { type: String, default: '' },
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Closed', 'Resolved'], default: 'New' },
  },
  { timestamps: true }
);

EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ status: 1 });

export default mongoose.models.Enquiry || mongoose.model<IEnquiryDoc>('Enquiry', EnquirySchema);
