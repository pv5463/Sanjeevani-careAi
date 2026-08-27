import { Schema, model, Document } from 'mongoose';
export interface IClinicalAnswer extends Document {
  sessionId: Schema.Types.ObjectId;
  questionId: string;
  patientId: Schema.Types.ObjectId;
  answer: string;
  normalizedAnswer?: string;
  inputType: string;
  timestamp: Date;
  confidence: number;
  isConfirmed: boolean;
}
const ClinicalAnswerSchema = new Schema<IClinicalAnswer>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  questionId: { type: String, required: true },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  answer: { type: String, required: true },
  normalizedAnswer: String,
  inputType: { type: String, enum: ['VOICE','TOUCH','BOTH'], required: true },
  timestamp: { type: Date, default: Date.now },
  confidence: { type: Number, default: 1 },
  isConfirmed: { type: Boolean, default: true },
}, { timestamps: true });
export const ClinicalAnswerModel = model<IClinicalAnswer>('ClinicalAnswer', ClinicalAnswerSchema);
