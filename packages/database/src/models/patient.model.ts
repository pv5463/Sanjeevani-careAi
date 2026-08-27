import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const patientSchema = new Schema({
  hospitalId: { type: String, required: true, index: true },
  abhaId: { type: String, sparse: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'], required: true },
  preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
  contact: {
    mobile: { type: String, required: true, index: true },
    emergency: { type: String }
  }
}, { timestamps: true });

export type PatientType = InferSchemaType<typeof patientSchema>;
export type PatientDocument = HydratedDocument<PatientType>;

export const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
