import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const alertSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  alertType: { type: String, enum: ['RED_FLAG', 'MISSING_INFO', 'CONTRADICTION', 'SYSTEM'], required: true },
  severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true, index: true },
  reason: { type: String, required: true },
  ruleId: { type: String },
  acknowledgedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  acknowledgedAt: { type: Date },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

alertSchema.index({ patientId: 1, severity: 1, acknowledgedAt: 1 });

export type AlertType = InferSchemaType<typeof alertSchema>;
export type AlertDocument = HydratedDocument<AlertType>;

export const AlertModel = mongoose.models.Alert || mongoose.model('Alert', alertSchema);
