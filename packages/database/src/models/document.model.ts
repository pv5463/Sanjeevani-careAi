import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const documentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  type: { type: String, enum: ['PRESCRIPTION', 'LAB_REPORT', 'DISCHARGE_SUMMARY', 'MEDICAL_CERTIFICATE', 'INVESTIGATION_REPORT', 'SURGICAL_RECORD'], required: true },
  supabasePath: { type: String, required: true },
  signedUrl: { type: String },
  mimeType: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  ocrStatus: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  extractionStatus: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  verificationStatus: { type: String, enum: ['UNVERIFIED', 'PATIENT_VERIFIED', 'DOCTOR_VERIFIED'], default: 'UNVERIFIED' }
}, { timestamps: true });

export type DocumentType = InferSchemaType<typeof documentSchema>;
export type DocumentDocument = HydratedDocument<DocumentType>;

export const DocumentModel = mongoose.models.Document || mongoose.model('Document', documentSchema);
