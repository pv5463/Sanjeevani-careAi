import { Schema, model, Document } from 'mongoose';
export interface IAuditLog extends Document {
  userId?: string;
  userRole?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  deviceId?: string;
  timestamp: Date;
}
const AuditLogSchema = new Schema<IAuditLog>({
  userId: String,
  userRole: String,
  action: { type: String, required: true },
  resource: String,
  resourceId: String,
  details: Schema.Types.Mixed,
  ipAddress: String,
  deviceId: String,
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });
AuditLogSchema.index({ userId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });
AuditLogSchema.index({ resourceId: 1, timestamp: -1 });
export const AuditLogModel = model<IAuditLog>('AuditLog', AuditLogSchema);
