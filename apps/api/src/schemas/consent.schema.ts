import { Schema, model, Document } from 'mongoose';
export interface IConsent extends Document {
  patientId: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  version: string;
  status: string;
  timestamp: Date;
  language: string;
  purpose: string;
  source: string;
  deviceId: string;
  ipAddress?: string;
  withdrawnAt?: Date;
}
const ConsentSchema = new Schema<IConsent>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  version: { type: String, required: true },
  status: { type: String, enum: ['GRANTED','DECLINED','WITHDRAWN'], required: true },
  timestamp: { type: Date, default: Date.now },
  language: String,
  purpose: String,
  source: String,
  deviceId: String,
  ipAddress: String,
  withdrawnAt: Date,
}, { timestamps: true });

ConsentSchema.pre('save', function(next) {
  if (!this.isNew && this.isModified() && !this.isModified('withdrawnAt') && !this.isModified('status')) {
    next(new Error('Consent record is immutable'));
  } else {
    next();
  }
});

export const ConsentModel = model<IConsent>('Consent', ConsentSchema);
