import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ClinicalHistoryService } from './clinical-history.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('clinical-history')
export class ClinicalHistoryController {
  constructor(private readonly historyService: ClinicalHistoryService) {}

  @Public()
  @Post()
  create(@Body() createHistoryDto: any) {
    return this.historyService.create(createHistoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: any) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.historyService.findLatestByPatient(patientId);
  }

  @Post(':id/completeness')
  calculateCompleteness(@Param('id') id: string) {
    return this.historyService.calculateAndSaveCompleteness(id);
  }
}
