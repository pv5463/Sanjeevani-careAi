import { Schema, model, Document } from 'mongoose';
export interface ISystemSetting extends Document {
  key: string;
  value: any;
  description?: string;
  updatedBy?: string;
}
const SystemSettingSchema = new Schema<ISystemSetting>({
  key: { type: String, required: true, unique: true },
  value: Schema.Types.Mixed,
  description: String,
  updatedBy: String,
}, { timestamps: true });
export const SystemSettingModel = model<ISystemSetting>('SystemSetting', SystemSettingSchema);
