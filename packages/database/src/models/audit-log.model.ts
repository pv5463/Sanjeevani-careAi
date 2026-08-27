import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userRole: { type: String, required: true },
  action: { type: String, enum: ['USER_LOGIN', 'RECORD_CREATED', 'RECORD_UPDATED', 'RECORD_DELETED', 'DOCUMENT_UPLOADED', 'SUMMARY_VERIFIED', 'CONSENT_GRANTED', 'CONSENT_WITHDRAWN'], required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
  deviceId: { type: String },
  timestamp: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

auditLogSchema.index({ userId: 1, action: 1, timestamp: 1 });

export type AuditLogType = InferSchemaType<typeof auditLogSchema>;
export type AuditLogDocument = HydratedDocument<AuditLogType>;

export const AuditLogModel = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
