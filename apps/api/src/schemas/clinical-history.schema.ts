import { Schema, model, Document } from 'mongoose';

const PMHSchema = new Schema({ condition: String, diagnosedYear: Number, status: String }, { _id: false });
const PSHSchema = new Schema({ procedure: String, year: Number, hospital: String }, { _id: false });
const DrugSchema = new Schema({ name: String, dosage: String, frequency: String, duration: String, prescribedBy: String }, { _id: false });
const AllergySchema = new Schema({ substance: String, reaction: String, severity: String }, { _id: false });
const FamilySchema = new Schema({ relation: String, condition: String }, { _id: false });

export interface IClinicalHistory extends Document {
  patientId: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  chiefComplaint?: string;
  hpi?: any;
  pastMedicalHistory?: any[];
  pastSurgicalHistory?: any[];
  drugHistory?: any[];
  allergies?: any[];
  familyHistory?: any[];
  personalHistory?: any;
  reviewOfSystems?: any;
  painLocations?: any[];
  completenessScore?: number;
  sourceReferences?: any[];
  status: string;
}

const ClinicalHistorySchema = new Schema<IClinicalHistory>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  chiefComplaint: String,
  hpi: {
    site: String, onset: String, character: String, radiation: String,
    associatedSymptoms: [String], timing: String, exacerbatingFactors: [String],
    relievingFactors: [String], severity: Number
  },
  pastMedicalHistory: [PMHSchema],
  pastSurgicalHistory: [PSHSchema],
  drugHistory: [DrugSchema],
  allergies: [AllergySchema],
  familyHistory: [FamilySchema],
  personalHistory: { diet: String, lifestyle: String, sleepHours: Number, smokingStatus: String, alcoholStatus: String, occupation: String },
  reviewOfSystems: { type: Schema.Types.Mixed },
  painLocations: [{ _id: false, region: String, severity: Number, type: String }],
  completenessScore: { type: Number, default: 0 },
  sourceReferences: [String],
  status: { type: String, enum: ['DRAFT','COMPLETE'], default: 'DRAFT' },
}, { timestamps: true });

export const ClinicalHistoryModel = model<IClinicalHistory>('ClinicalHistory', ClinicalHistorySchema);
