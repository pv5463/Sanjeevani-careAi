import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);

  constructor(
    @InjectModel('Document') private documentModel: Model<any>,
    @InjectModel('DocumentExtraction') private extractionModel: Model<any>,
  ) {}

  async processDocumentBuffer(buffer: Buffer, documentId: string): Promise<any> {
    const preprocessed = await sharp(buffer)
      .resize({ width: 2000, withoutEnlargement: true })
      .grayscale()
      .normalize()
      .sharpen()
      .toBuffer();

    const worker = await createWorker(['eng', 'hin']);
    let result;
    try {
      const { data } = await worker.recognize(preprocessed);
      result = { text: data.text, confidence: data.confidence };
    } finally {
      await worker.terminate();
    }

    const docType = this.classifyDocument(result.text);
    const entities = this.extractMedicalEntities(result.text, docType);

    const extraction = await this.extractionModel.create({
      documentId,
      entities,
      overallConfidence: result.confidence / 100,
      verificationStatus: 'UNVERIFIED',
      extractedAt: new Date(),
      extractedText: result.text,
    });

    await this.documentModel.findByIdAndUpdate(documentId, {
      ocrStatus: 'COMPLETED',
      extractionStatus: 'COMPLETED',
    });

    return extraction;
  }

  classifyDocument(text: string): string {
    const t = text.toLowerCase();
    if (t.includes('discharge') || t.includes('hospital')) return 'DISCHARGE_SUMMARY';
    if (t.includes('lab') || t.includes('result') || t.includes('report') || t.includes('test')) return 'LAB_REPORT';
    if (t.includes('rx') || t.includes('prescription') || t.includes('tablet') || t.includes('mg') || t.includes('capsule')) return 'PRESCRIPTION';
    if (t.includes('surgery') || t.includes('operative') || t.includes('procedure')) return 'SURGICAL_RECORD';
    return 'PRESCRIPTION';
  }

  extractMedicalEntities(text: string, docType: string): any[] {
    const entities: any[] = [];
    const medPatterns = [
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|IU|units?))\b/g,
      /(Tab|Cap|Inj|Syp|Oint)\.?\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+\s*(?:mg|mcg|g|ml))/gi,
    ];
    for (const pattern of medPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({ type: 'MEDICATION', value: match[0].trim(), confidence: 0.78, verificationStatus: 'UNVERIFIED' });
      }
    }
    const diagPatterns = [
      /(?:diagnosis|diagnosed with|impression|assessment)\s*:?\s*([^\n.]+)/gi,
      /(?:condition|disease|disorder)\s*:?\s*([^\n.]+)/gi,
    ];
    for (const pattern of diagPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({ type: 'DIAGNOSIS', value: match[1].trim().substring(0, 100), confidence: 0.72, verificationStatus: 'UNVERIFIED' });
      }
    }
    const datePattern = /\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/g;
    let dateMatch;
    while ((dateMatch = datePattern.exec(text)) !== null) {
      entities.push({ type: 'DATE', value: dateMatch[1], confidence: 0.95, verificationStatus: 'UNVERIFIED' });
    }
    const labPattern = /(Hemoglobin|HbA1c|Glucose|Creatinine|Cholesterol|BP|Blood Pressure|TSH|T3|T4|WBC|RBC|Platelets)\s*:?\s*([\d.]+\s*(?:mg\/dL|mmol\/L|g\/dL|%|IU\/L|mIU\/L|\/cumm|mmHg)?)/gi;
    let labMatch;
    while ((labMatch = labPattern.exec(text)) !== null) {
      const confidence = 0.85;
      entities.push({ type: 'RESULT', value: `${labMatch[1].trim()}: ${labMatch[2].trim()}`, confidence, verificationStatus: confidence < 0.8 ? 'NEEDS_VERIFICATION' : 'UNVERIFIED' });
    }
    return entities.slice(0, 20);
  }
}
