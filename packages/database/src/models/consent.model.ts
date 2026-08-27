import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const consentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  version: { type: String, required: true },
  status: { type: String, enum: ['GRANTED', 'DECLINED', 'WITHDRAWN'], required: true },
  timestamp: { type: Date, required: true },
  language: { type: String, enum: ['en', 'hi'], required: true },
  purpose: { type: String, required: true },
  source: { type: String, required: true },
  deviceId: { type: String },
  ipAddress: { type: String },
  withdrawnAt: { type: Date }
}, { timestamps: true });

consentSchema.pre('save', function(next) {
  if (!this.isNew) {
    const modifiedPaths = this.modifiedPaths();
    // Only allow updating status and withdrawnAt
    if (modifiedPaths.some(p => p !== 'status' && p !== 'withdrawnAt')) {
      return next(new Error('Consent records are mostly immutable after creation'));
    }
  }
  next();
});

export type ConsentType = InferSchemaType<typeof consentSchema>;
export type ConsentDocument = HydratedDocument<ConsentType>;

export const ConsentModel = mongoose.models.Consent || mongoose.model('Consent', consentSchema);
