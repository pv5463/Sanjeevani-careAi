import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const sessionSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  deviceId: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'EXPIRED', 'ABANDONED'], required: true },
  language: { type: String, enum: ['en', 'hi'], required: true },
  startedAt: { type: Date, required: true },
  completedAt: { type: Date },
  lastActivityAt: { type: Date, required: true },
  currentStep: { type: String, required: true },
  completedSteps: { type: [String], default: [] },
  ipAddress: { type: String }
}, { timestamps: true });

sessionSchema.index({ lastActivityAt: 1 }, { expireAfterSeconds: 3600 });

export type SessionType = InferSchemaType<typeof sessionSchema>;
export type SessionDocument = HydratedDocument<SessionType>;

export const SessionModel = mongoose.models.Session || mongoose.model('Session', sessionSchema);
