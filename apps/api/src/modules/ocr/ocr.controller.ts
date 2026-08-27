import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process/:documentId')
  async process(@Param('documentId') documentId: string) {
    // In a real scenario, fetch the document buffer from storage
    const buffer = Buffer.from('');
    return this.ocrService.processDocumentBuffer(buffer, documentId);
  }

  @Get('status/:documentId')
  async getStatus(@Param('documentId') documentId: string) {
    return { status: 'COMPLETED' }; // Mock status
  }
}
