import { Schema, model, Document } from 'mongoose';
export interface IAlert extends Document {
  patientId: Schema.Types.ObjectId;
  alertType: string;
  severity: string;
  reason: string;
  ruleId: string;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  timestamp: Date;
  isActive: boolean;
}
const AlertSchema = new Schema<IAlert>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  alertType: { type: String, enum: ['RED_FLAG','MISSING_INFO','CONTRADICTION','SYSTEM'], required: true },
  severity: { type: String, enum: ['CRITICAL','HIGH','MEDIUM','LOW'], required: true },
  reason: { type: String, required: true },
  ruleId: String,
  acknowledgedBy: String,
  acknowledgedAt: Date,
  timestamp: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const AlertModel = model<IAlert>('Alert', AlertSchema);
