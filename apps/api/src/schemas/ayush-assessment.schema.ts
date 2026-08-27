import { Schema, model, Document } from 'mongoose';
export interface IAyushAssessment extends Document {
  patientId: Schema.Types.ObjectId;
  sessionId: Schema.Types.ObjectId;
  department: string;
  prakriti?: string; vikriti?: string; sara?: string;
  samhanana?: string; pramana?: string; satmya?: string;
  sattva?: string; aharaShakti?: string; vyayamaShakti?: string;
  vaya?: string; ahara?: string; vihara?: string; nidana?: string;
  customFields?: Map<string, any>;
}
const AyushAssessmentSchema = new Schema<IAyushAssessment>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  department: { type: String, enum: ['AYURVEDA','YOGA_NATUROPATHY','UNANI','SIDDHA','HOMOEOPATHY'], required: true },
  prakriti: String, vikriti: String, sara: String,
  samhanana: String, pramana: String, satmya: String,
  sattva: String, aharaShakti: String, vyayamaShakti: String,
  vaya: String, ahara: String, vihara: String, nidana: String,
  customFields: Map,
}, { timestamps: true });
export const AyushAssessmentModel = model<IAyushAssessment>('AyushAssessment', AyushAssessmentSchema);
