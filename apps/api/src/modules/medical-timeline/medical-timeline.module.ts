import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalTimelineController } from './medical-timeline.controller';
import { MedicalTimelineService } from './medical-timeline.service';
import { MedicalTimelineModel } from '../../schemas/medical-timeline.schema';
import { ClinicalHistoryModel } from '../../schemas/clinical-history.schema';
import { DocumentExtractionModel } from '../../schemas/document-extraction.schema';
import { DocumentModel } from '../../schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MedicalTimeline', schema: MedicalTimelineModel.schema },
      { name: 'ClinicalHistory', schema: ClinicalHistoryModel.schema },
      { name: 'DocumentExtraction', schema: DocumentExtractionModel.schema },
      { name: 'Document', schema: DocumentModel.schema }
    ])
  ],
  controllers: [MedicalTimelineController],
  providers: [MedicalTimelineService],
  exports: [MedicalTimelineService],
})
export class MedicalTimelineModule {}
