import { Schema, model, Document } from 'mongoose';
export interface IDocument extends Document {
  patientId: Schema.Types.ObjectId;
  type: string;
  supabasePath: string;
  signedUrl?: string;
  mimeType: string;
  uploadDate: Date;
  ocrStatus: string;
  extractionStatus: string;
  verificationStatus: string;
  size: number;
  originalName: string;
}
const DocumentSchema = new Schema<IDocument>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  type: { type: String, enum: ['DISCHARGE_SUMMARY','LAB_REPORT','PRESCRIPTION','SURGICAL_RECORD','OTHER'], default: 'OTHER' },
  supabasePath: { type: String, required: true },
  signedUrl: String,
  mimeType: String,
  uploadDate: { type: Date, default: Date.now },
  ocrStatus: { type: String, enum: ['PENDING','PROCESSING','COMPLETED','FAILED'], default: 'PENDING' },
  extractionStatus: { type: String, enum: ['PENDING','COMPLETED','FAILED'], default: 'PENDING' },
  verificationStatus: { type: String, enum: ['UNVERIFIED','PATIENT_VERIFIED','DOCTOR_VERIFIED'], default: 'UNVERIFIED' },
  size: Number,
  originalName: String,
}, { timestamps: true });
export const DocumentModel = model<IDocument>('Document', DocumentSchema);
