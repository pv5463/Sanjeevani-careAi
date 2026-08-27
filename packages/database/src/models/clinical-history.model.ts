import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const painLocationSchema = new Schema({
  region: { type: String, required: true },
  laterality: { type: String, enum: ['LEFT', 'RIGHT', 'BOTH', 'NA'], required: true },
  severity: { type: Number, min: 0, max: 10, required: true },
  character: { type: String, required: true },
  radiation: { type: String },
  onset: { type: String },
  duration: { type: String }
}, { _id: false });

const hpiSchema = new Schema({
  site: { type: String },
  onset: { type: String },
  character: { type: String },
  radiation: { type: String },
  associatedSymptoms: { type: [String], default: [] },
  timing: { type: String },
  exacerbatingFactors: { type: [String], default: [] },
  relievingFactors: { type: [String], default: [] },
  severity: { type: Number }
}, { _id: false });

const sourceReferenceSchema = new Schema({
  type: { type: String, enum: ['VOICE_ANSWER', 'DOCUMENT', 'PREVIOUS_RECORD'], required: true },
  label: { type: String, required: true },
  documentId: { type: Schema.Types.ObjectId, ref: 'Document' },
  questionId: { type: String },
  timestamp: { type: Date, required: true }
}, { _id: false });

const clinicalHistorySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  chiefComplaint: { type: String, required: true },
  hpi: { type: hpiSchema, default: () => ({}) },
  pastMedicalHistory: { type: [String], default: [] },
  pastSurgicalHistory: { type: [String], default: [] },
  drugHistory: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  familyHistory: { type: [String], default: [] },
  personalHistory: { type: [String], default: [] },
  reviewOfSystems: { type: [String], default: [] },
  painLocations: { type: [painLocationSchema], default: [] },
  completenessScore: { type: Number, default: 0 },
  sourceReferences: { type: [sourceReferenceSchema], default: [] },
  status: { type: String, enum: ['DRAFT', 'READY', 'DOCTOR_VERIFIED'], default: 'DRAFT' }
}, { timestamps: true });

export type ClinicalHistoryType = InferSchemaType<typeof clinicalHistorySchema>;
export type ClinicalHistoryDocument = HydratedDocument<ClinicalHistoryType>;

export const ClinicalHistoryModel = mongoose.models.ClinicalHistory || mongoose.model('ClinicalHistory', clinicalHistorySchema);
