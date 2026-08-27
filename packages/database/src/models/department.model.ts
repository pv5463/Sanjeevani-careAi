import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const departmentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['ALLOPATHY', 'AYUSH'], required: true },
  isActive: { type: Boolean, default: true },
  code: { type: String, required: true, unique: true },
  description: { type: String }
}, { timestamps: true });

export type DepartmentType = InferSchemaType<typeof departmentSchema>;
export type DepartmentDocument = HydratedDocument<DepartmentType>;

export const DepartmentModel = mongoose.models.Department || mongoose.model('Department', departmentSchema);
