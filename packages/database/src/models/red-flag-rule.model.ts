import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const ruleConditionSchema = new Schema({
  field: { type: String, required: true },
  operator: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const redFlagRuleSchema = new Schema({
  ruleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  conditions: { type: [ruleConditionSchema], required: true },
  severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  message: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  actions: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  priority: { type: Number, default: 0 }
}, { timestamps: true });

export type RedFlagRuleType = InferSchemaType<typeof redFlagRuleSchema>;
export type RedFlagRuleDocument = HydratedDocument<RedFlagRuleType>;

export const RedFlagRuleModel = mongoose.models.RedFlagRule || mongoose.model('RedFlagRule', redFlagRuleSchema);
