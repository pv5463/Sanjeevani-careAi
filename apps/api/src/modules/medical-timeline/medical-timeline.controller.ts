import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { MedicalTimelineService } from './medical-timeline.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('medical-timeline')
export class MedicalTimelineController {
  constructor(private readonly timelineService: MedicalTimelineService) {}

  @Get('patient/:patientId')
  getTimeline(@Param('patientId') patientId: string) {
    return this.timelineService.getTimeline(patientId);
  }

  @Post('patient/:patientId/rebuild')
  rebuildTimeline(@Param('patientId') patientId: string) {
    return this.timelineService.rebuildTimeline(patientId);
  }
}
