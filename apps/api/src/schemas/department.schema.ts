import { Schema, model, Document } from 'mongoose';
export interface IDepartment extends Document {
  name: string;
  type: string;
  isActive: boolean;
  code: string;
  description?: string;
}
const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  type: { type: String, enum: ['ALLOPATHY','AYUSH'], required: true },
  isActive: { type: Boolean, default: true },
  code: { type: String, required: true, unique: true },
  description: String,
}, { timestamps: true });
export const DepartmentModel = model<IDepartment>('Department', DepartmentSchema);
