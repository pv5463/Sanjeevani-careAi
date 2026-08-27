import { Schema, model, Document } from 'mongoose';
export interface IRedFlagRule extends Document {
  ruleId: string;
  name: string;
  conditions: any[];
  severity: string;
  message: { en: string; hi: string };
  actions: string[];
  isActive: boolean;
  priority: number;
}
const RedFlagRuleSchema = new Schema<IRedFlagRule>({
  ruleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  conditions: [{ field: String, operator: String, value: String }],
  severity: { type: String, enum: ['CRITICAL','HIGH','MEDIUM','LOW'], required: true },
  message: { en: String, hi: String },
  actions: [String],
  isActive: { type: Boolean, default: true },
  priority: { type: Number, default: 0 },
}, { timestamps: true });
export const RedFlagRuleModel = model<IRedFlagRule>('RedFlagRule', RedFlagRuleSchema);
