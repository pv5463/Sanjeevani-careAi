import { Schema, model, Document } from 'mongoose';
export interface IQuestion extends Document {
  questionId: string;
  category: string;
  text: { en: string; hi: string };
  inputType: string;
  followUpRules: any[];
  priority: number;
  required: boolean;
  validation: any;
  isActive: boolean;
  departmentIds: string[];
}
const QuestionSchema = new Schema<IQuestion>({
  questionId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  text: { en: String, hi: String },
  inputType: { type: String, enum: ['VOICE','TOUCH','BOTH'], default: 'BOTH' },
  followUpRules: [{ condition: String, nextQuestionId: String, operator: String }],
  priority: { type: Number, default: 0 },
  required: { type: Boolean, default: false },
  validation: { min: Number, max: Number, options: [String] },
  isActive: { type: Boolean, default: true },
  departmentIds: [String],
}, { timestamps: true });
export const QuestionModel = model<IQuestion>('Question', QuestionSchema);
