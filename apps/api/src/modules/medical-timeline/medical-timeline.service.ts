import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MedicalTimelineService {
  constructor(
    @InjectModel('MedicalTimeline') private timelineModel: Model<any>,
    @InjectModel('ClinicalHistory') private historyModel: Model<any>,
    @InjectModel('DocumentExtraction') private extractionModel: Model<any>,
    @InjectModel('Document') private documentModel: Model<any>
  ) {}

  async getTimeline(patientId: string) {
    let timeline = await this.timelineModel.findOne({ patientId }).exec();
    if (!timeline) timeline = await this.rebuildTimeline(patientId);
    return timeline;
  }

  async rebuildTimeline(patientId: string) {
    const events: any[] = [];
    
    // Add visits
    const histories = await this.historyModel.find({ patientId }).exec();
    histories.forEach(h => {
      events.push({
        date: h.createdAt,
        type: 'VISIT',
        description: h.chiefComplaint || 'Clinical Visit',
        source: 'ClinicalHistory',
        metadata: { sessionId: h.sessionId }
      });
    });

    // Add extractions
    const docs = await this.documentModel.find({ patientId }).exec();
    const docIds = docs.map(d => d._id);
    const extractions = await this.extractionModel.find({ documentId: { $in: docIds } }).exec();
    
    extractions.forEach(ext => {
      const doc = docs.find(d => d._id.toString() === ext.documentId.toString());
      ext.entities.forEach((entity: any) => {
        if (entity.type === 'MEDICATION' || entity.type === 'DIAGNOSIS') {
          events.push({
            date: doc?.uploadDate || ext.extractedAt,
            type: entity.type,
            description: entity.value,
            documentId: ext.documentId,
            source: 'OCR',
            metadata: { confidence: entity.confidence }
          });
        }
      });
    });

    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let timeline = await this.timelineModel.findOne({ patientId });
    if (timeline) {
      timeline.events = events;
      await timeline.save();
    } else {
      timeline = await this.timelineModel.create({ patientId, events });
    }
    return timeline;
  }
}
