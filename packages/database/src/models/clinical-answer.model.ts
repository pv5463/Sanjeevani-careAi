import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const clinicalAnswerSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true, index: true },
  questionId: { type: String, required: true },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  answer: { type: String, required: true },
  normalizedAnswer: { type: String, required: true },
  inputType: { type: String, enum: ['VOICE', 'TOUCH'], required: true },
  timestamp: { type: Date, required: true },
  confidence: { type: Number, required: true },
  isConfirmed: { type: Boolean, default: false }
}, { timestamps: true });

export type ClinicalAnswerType = InferSchemaType<typeof clinicalAnswerSchema>;
export type ClinicalAnswerDocument = HydratedDocument<ClinicalAnswerType>;

export const ClinicalAnswerModel = mongoose.models.ClinicalAnswer || mongoose.model('ClinicalAnswer', clinicalAnswerSchema);
