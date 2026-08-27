import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { StorageService } from './storage.service';
import { DocumentModel } from '../../schemas/document.schema';
import { DocumentExtractionModel } from '../../schemas/document-extraction.schema';
import { OcrModule } from '../ocr/ocr.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Document', schema: DocumentModel.schema },
      { name: 'DocumentExtraction', schema: DocumentExtractionModel.schema }
    ]),
    OcrModule
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, StorageService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
