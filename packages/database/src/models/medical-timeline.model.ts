import mongoose, { Schema, HydratedDocument, InferSchemaType } from 'mongoose';

const timelineEventSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ['DIAGNOSIS', 'MEDICATION', 'INVESTIGATION', 'PROCEDURE', 'SURGERY', 'VISIT', 'HOSPITALIZATION'], required: true },
  description: { type: String, required: true },
  documentId: { type: Schema.Types.ObjectId, ref: 'Document' },
  source: { type: String, required: true }
}, { _id: false });

const medicalTimelineSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, unique: true },
  events: { type: [timelineEventSchema], default: [] }
}, { timestamps: true });

export type MedicalTimelineType = InferSchemaType<typeof medicalTimelineSchema>;
export type MedicalTimelineDocument = HydratedDocument<MedicalTimelineType>;

export const MedicalTimelineModel = mongoose.models.MedicalTimeline || mongoose.model('MedicalTimeline', medicalTimelineSchema);
