import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const systemSettingSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  description: { type: String },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export type SystemSettingType = InferSchemaType<typeof systemSettingSchema>;
export type SystemSettingDocument = HydratedDocument<SystemSettingType>;

export const SystemSettingModel = mongoose.models.SystemSetting || mongoose.model('SystemSetting', systemSettingSchema);
