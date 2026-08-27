import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
  email: string; passwordHash: string; role: string;
  hospitalId: string; name: string; department?: string;
  isActive: boolean; lastLogin?: Date; refreshTokenHash?: string;
}
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['PATIENT','DOCTOR','NURSE','ADMIN','SYSTEM_ADMIN'], required: true },
  hospitalId: { type: String, required: true, default: 'DEFAULT' },
  name: { type: String, required: true },
  department: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  refreshTokenHash: { type: String, select: false },
}, { timestamps: true });
UserSchema.index({ email: 1 });
UserSchema.index({ hospitalId: 1 });
export const UserModel = model<IUser>('User', UserSchema);
