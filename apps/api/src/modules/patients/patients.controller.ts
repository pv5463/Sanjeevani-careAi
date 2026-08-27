import { Controller, Get, Post, Body, Put, Param, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() body: any) { return this.patientsService.create(body); }

  @Get()
  findAll(@Query() query: any) { return this.patientsService.findAll(query); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.patientsService.findOne(id); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.patientsService.update(id, body); }

  @Get(':id/timeline')
  getTimeline(@Param('id') id: string) { return this.patientsService.getTimeline(id); }

  @Get(':id/latest-session')
  getLatestSession(@Param('id') id: string) { return this.patientsService.getLatestSession(id); }
}
