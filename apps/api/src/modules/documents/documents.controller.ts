import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile, Body, Patch, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body('patientId') patientId: string) {
    return this.documentsService.upload(file, patientId);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.documentsService.findByPatient(patientId);
  }

  @Get(':id')
  refreshUrl(@Param('id') id: string) {
    return this.documentsService.refreshSignedUrl(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }

  @Post(':id/ocr')
  triggerOcr(@Param('id') id: string) {
    return this.documentsService.triggerOcr(id);
  }

  @Get(':id/extraction')
  getExtraction(@Param('id') id: string) {
    return this.documentsService.getExtraction(id);
  }

  @Patch(':id/extraction/:entityId/verify')
  verifyEntity(@Param('id') id: string, @Param('entityId') entityId: string, @Body() data: any) {
    return this.documentsService.verifyEntity(id, entityId, data);
  }
}
