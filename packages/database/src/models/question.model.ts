import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const followUpRuleSchema = new Schema({
  condition: { type: String, required: true },
  nextQuestionId: { type: String, required: true }
}, { _id: false });

const questionSchema = new Schema({
  questionId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  text: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  inputType: { type: String, enum: ['VOICE', 'TOUCH', 'BOTH'], required: true },
  followUpRules: { type: [followUpRuleSchema], default: [] },
  priority: { type: Number, default: 0 },
  required: { type: Boolean, default: false },
  validation: { type: String },
  isActive: { type: Boolean, default: true },
  departmentIds: { type: [Schema.Types.ObjectId], ref: 'Department', default: [] }
}, { timestamps: true });

export type QuestionType = InferSchemaType<typeof questionSchema>;
export type QuestionDocument = HydratedDocument<QuestionType>;

export const QuestionModel = mongoose.models.Question || mongoose.model('Question', questionSchema);
