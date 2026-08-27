import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OcrService } from './ocr.service';
import { DocumentModel } from '../../schemas/document.schema';
import { DocumentExtractionModel } from '../../schemas/document-extraction.schema';
import { OcrController } from './ocr.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Document', schema: DocumentModel.schema },
      { name: 'DocumentExtraction', schema: DocumentExtractionModel.schema }
    ])
  ],
  controllers: [OcrController],
  providers: [OcrService],
  exports: [OcrService]
})
export class OcrModule {}
