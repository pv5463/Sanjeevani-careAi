import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageService } from './storage.service';
import { OcrService } from '../ocr/ocr.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('Document') private documentModel: Model<any>,
    @InjectModel('DocumentExtraction') private extractionModel: Model<any>,
    private storageService: StorageService,
    private ocrService: OcrService
  ) {}

  async upload(file: Express.Multer.File, patientId: string) {
    const { path, signedUrl } = await this.storageService.uploadFile(file.buffer, patientId, file.originalname, file.mimetype);
    const doc = await this.documentModel.create({
      patientId,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      supabasePath: path,
      signedUrl
    });
    return doc;
  }

  async findByPatient(patientId: string) {
    return this.documentModel.find({ patientId }).sort({ uploadDate: -1 }).exec();
  }

  async refreshSignedUrl(id: string) {
    const doc = await this.documentModel.findById(id);
    if (!doc) throw new NotFoundException('Document not found');
    const signedUrl = await this.storageService.getSignedUrl(doc.supabasePath);
    doc.signedUrl = signedUrl;
    return doc.save();
  }

  async remove(id: string) {
    const doc = await this.documentModel.findById(id);
    if (doc) {
      await this.storageService.deleteFile(doc.supabasePath);
      await this.documentModel.findByIdAndDelete(id);
      await this.extractionModel.deleteMany({ documentId: id });
    }
    return { success: true };
  }

  async triggerOcr(id: string) {
    // In real app, we fetch buffer from storage here. We'll mock it for now
    const buffer = Buffer.from('');
    return this.ocrService.processDocumentBuffer(buffer, id);
  }

  async getExtraction(id: string) {
    return this.extractionModel.findOne({ documentId: id }).exec();
  }

  async verifyEntity(docId: string, entityId: string, data: any) {
    const extraction = await this.extractionModel.findOne({ documentId: docId });
    if (!extraction) throw new NotFoundException('Extraction not found');
    const entity = extraction.entities.id(entityId);
    if (entity) {
      entity.verificationStatus = data.status;
      entity.verifiedBy = data.userId;
      entity.verifiedAt = new Date();
      await extraction.save();
    }
    return extraction;
  }
}
