import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['PATIENT', 'DOCTOR', 'NURSE', 'ADMIN', 'SYSTEM_ADMIN'], required: true },
  hospitalId: { type: String },
  name: { type: String, required: true },
  department: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  refreshTokenHash: { type: String, select: false },
}, { timestamps: true });

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserType>;

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
