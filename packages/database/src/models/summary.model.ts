import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const sourceReferenceSchema = new Schema({
  type: { type: String, enum: ['VOICE_ANSWER', 'DOCUMENT', 'PREVIOUS_RECORD'], required: true },
  label: { type: String, required: true },
  documentId: { type: Schema.Types.ObjectId, ref: 'Document' },
  questionId: { type: String },
  timestamp: { type: Date, required: true }
}, { _id: false });

const summarySectionSchema = new Schema({
  sectionType: { type: String, required: true },
  content: { type: String, required: true },
  aiGenerated: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  sourceReferences: { type: [sourceReferenceSchema], default: [] }
}, { _id: false });

const doctorEditSchema = new Schema({
  field: { type: String, required: true },
  originalValue: { type: String, required: true },
  editedValue: { type: String, required: true },
  editedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  editedAt: { type: Date, required: true }
}, { _id: false });

const summarySchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  clinicalHistoryId: { type: Schema.Types.ObjectId, ref: 'ClinicalHistory', required: true },
  sections: { type: [summarySectionSchema], default: [] },
  redFlags: { type: [{ type: Schema.Types.ObjectId, ref: 'Alert' }], default: [] },
  missingInformation: { type: [String], default: [] },
  confidenceMetadata: { type: Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['DRAFT', 'READY', 'DOCTOR_VERIFIED'], default: 'DRAFT' },
  doctorEdits: { type: [doctorEditSchema], default: [] },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date }
}, { timestamps: true });

export type SummaryType = InferSchemaType<typeof summarySchema>;
export type SummaryDocument = HydratedDocument<SummaryType>;

export const SummaryModel = mongoose.models.Summary || mongoose.model('Summary', summarySchema);
