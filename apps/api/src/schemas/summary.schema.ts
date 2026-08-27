import { Schema, model, Document } from 'mongoose';
export interface ISummary extends Document {
  patientId: Schema.Types.ObjectId;
  clinicalHistoryId?: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  sections: any[];
  redFlags: Schema.Types.ObjectId[];
  missingInformation: string[];
  confidenceMetadata: any;
  status: string;
  doctorEdits: any[];
  verifiedBy?: string;
  verifiedAt?: Date;
}
const SummarySchema = new Schema<ISummary>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  clinicalHistoryId: { type: Schema.Types.ObjectId, ref: 'ClinicalHistory' },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  sections: [{
    sectionType: String, content: String, aiGenerated: Boolean, verified: Boolean,
    doctorEdited: Boolean, sourceReferences: [{ type: { type: String }, label: String, documentId: String, questionId: String }]
  }],
  redFlags: [{ type: Schema.Types.ObjectId, ref: 'Alert' }],
  missingInformation: [String],
  confidenceMetadata: { overall: Number, sections: Map },
  status: { type: String, enum: ['DRAFT','READY','DOCTOR_VERIFIED','REJECTED'], default: 'DRAFT' },
  doctorEdits: [{ field: String, originalValue: String, editedValue: String, editedBy: String, editedAt: Date }],
  verifiedBy: String,
  verifiedAt: Date,
}, { timestamps: true });
export const SummaryModel = model<ISummary>('Summary', SummarySchema);
