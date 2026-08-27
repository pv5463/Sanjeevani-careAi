import { Schema, model, Document } from 'mongoose';
export interface IPatient extends Document {
  hospitalId: string;
  abhaId?: string;
  name: string;
  dateOfBirth?: Date;
  age?: number;
  gender: string;
  preferredLanguage: string;
  contact: {
    mobile: string;
    emergency?: { name: string; phone: string };
  };
  isDemo: boolean;
}
const PatientSchema = new Schema<IPatient>({
  hospitalId: { type: String, required: true, default: 'DEFAULT' },
  abhaId: { type: String, sparse: true },
  name: { type: String, required: true },
  dateOfBirth: Date,
  age: Number,
  gender: { type: String, enum: ['MALE','FEMALE','OTHER'], required: true },
  preferredLanguage: { type: String, default: 'en' },
  contact: {
    mobile: { type: String, required: true },
    emergency: { name: String, phone: String },
  },
  isDemo: { type: Boolean, default: false },
}, { timestamps: true });
PatientSchema.index({ mobile: 1 });
PatientSchema.index({ hospitalId: 1 });
export const PatientModel = model<IPatient>('Patient', PatientSchema);
