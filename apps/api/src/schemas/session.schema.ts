import { Schema, model, Document } from 'mongoose';
export interface ISession extends Document {
  patientId?: Schema.Types.ObjectId;
  deviceId: string;
  status: string;
  language: string;
  startedAt: Date;
  completedAt?: Date;
  lastActivityAt: Date;
  currentStep: string;
  completedSteps: string[];
  ipAddress?: string;
}
const SessionSchema = new Schema<ISession>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
  deviceId: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE','COMPLETED','EXPIRED','ABANDONED'], default: 'ACTIVE' },
  language: { type: String, default: 'en' },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  lastActivityAt: { type: Date, default: Date.now, expires: 3600 },
  currentStep: { type: String, default: 'identity' },
  completedSteps: [String],
  ipAddress: String,
}, { timestamps: true });
SessionSchema.index({ patientId: 1 });
export const SessionModel = model<ISession>('Session', SessionSchema);
