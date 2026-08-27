import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const ayushAssessmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  department: { type: String, enum: ['AYURVEDA', 'YOGA_NATUROPATHY', 'UNANI', 'SIDDHA', 'HOMOEOPATHY'], required: true },
  prakriti: { type: String },
  vikriti: { type: String },
  sara: { type: String },
  samhanana: { type: String },
  pramana: { type: String },
  satmya: { type: String },
  sattva: { type: String },
  aharaShakti: { type: String },
  vyayamaShakti: { type: String },
  vaya: { type: String },
  customFields: { type: Map, of: String, default: {} }
}, { timestamps: true });

export type AYUSHAssessmentType = InferSchemaType<typeof ayushAssessmentSchema>;
export type AYUSHAssessmentDocument = HydratedDocument<AYUSHAssessmentType>;

export const AYUSHAssessmentModel = mongoose.models.AYUSHAssessment || mongoose.model('AYUSHAssessment', ayushAssessmentSchema);
