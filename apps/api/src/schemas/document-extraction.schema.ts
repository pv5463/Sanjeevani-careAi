import { Schema, model, Document } from 'mongoose';
export interface IDocumentExtraction extends Document {
  documentId: Schema.Types.ObjectId;
  entities: any[];
  overallConfidence: number;
  verificationStatus: string;
  extractedAt: Date;
  extractedText: string;
}
const DocumentExtractionSchema = new Schema<IDocumentExtraction>({
  documentId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
  entities: [{
    type: { type: String }, value: String, confidence: Number,
    boundingBox: { x: Number, y: Number, w: Number, h: Number },
    verificationStatus: String, verifiedBy: String, verifiedAt: Date
  }],
  overallConfidence: Number,
  verificationStatus: String,
  extractedAt: { type: Date, default: Date.now },
  extractedText: String,
}, { timestamps: true });
export const DocumentExtractionModel = model<IDocumentExtraction>('DocumentExtraction', DocumentExtractionSchema);
