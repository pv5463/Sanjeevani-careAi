import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const extractedEntitySchema = new Schema({
  type: { type: String, enum: ['DIAGNOSIS', 'MEDICATION', 'DOSAGE', 'FREQUENCY', 'DURATION', 'INVESTIGATION', 'RESULT', 'PROCEDURE', 'SURGERY', 'HOSPITAL', 'DATE', 'DOCTOR', 'DEPARTMENT'], required: true },
  value: { type: String, required: true },
  confidence: { type: Number, required: true },
  boundingBox: { type: Schema.Types.Mixed },
  verificationStatus: { type: String, enum: ['UNVERIFIED', 'PATIENT_VERIFIED', 'DOCTOR_VERIFIED'], default: 'UNVERIFIED' }
}, { _id: false });

const documentExtractionSchema = new Schema({
  documentId: { type: Schema.Types.ObjectId, ref: 'Document', required: true, unique: true },
  entities: { type: [extractedEntitySchema], default: [] },
  overallConfidence: { type: Number, required: true },
  verificationStatus: { type: String, enum: ['UNVERIFIED', 'PATIENT_VERIFIED', 'DOCTOR_VERIFIED'], default: 'UNVERIFIED' },
  extractedAt: { type: Date, required: true },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date }
}, { timestamps: true });

export type DocumentExtractionType = InferSchemaType<typeof documentExtractionSchema>;
export type DocumentExtractionDocument = HydratedDocument<DocumentExtractionType>;

export const DocumentExtractionModel = mongoose.models.DocumentExtraction || mongoose.model('DocumentExtraction', documentExtractionSchema);
