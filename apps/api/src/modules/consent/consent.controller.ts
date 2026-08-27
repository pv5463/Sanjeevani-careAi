import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('consent')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Public()
  @Post()
  create(@Body() createConsentDto: any) {
    return this.consentService.create(createConsentDto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.consentService.findByPatient(patientId);
  }

  @Post(':id/withdraw')
  withdraw(@Param('id') id: string) {
    return this.consentService.withdraw(id);
  }
}
