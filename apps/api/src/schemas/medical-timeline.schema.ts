import { Schema, model, Document } from 'mongoose';
export interface IMedicalTimeline extends Document {
  patientId: Schema.Types.ObjectId;
  events: any[];
}
const MedicalTimelineSchema = new Schema<IMedicalTimeline>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  events: [{
    date: Date,
    type: { type: String, enum: ['VISIT','DOCUMENT','DIAGNOSIS','PROCEDURE','MEDICATION'] },
    description: String,
    documentId: { type: Schema.Types.ObjectId, ref: 'Document' },
    source: String,
    metadata: Schema.Types.Mixed
  }],
}, { timestamps: true });
export const MedicalTimelineModel = model<IMedicalTimeline>('MedicalTimeline', MedicalTimelineSchema);
