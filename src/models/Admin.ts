import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
}

const AdminSchema = new Schema<IAdminDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  },
  { timestamps: true }
);

AdminSchema.index({ email: 1 });

export default mongoose.models.Admin || mongoose.model<IAdminDoc>('Admin', AdminSchema);
