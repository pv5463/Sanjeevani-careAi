import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Public()
  @Post()
  create(@Body() createSessionDto: any) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: any) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.sessionsService.complete(id);
  }

  @Post(':id/terminate')
  terminate(@Param('id') id: string) {
    return this.sessionsService.terminate(id);
  }

  @Get(':id/answers')
  getAnswers(@Param('id') id: string) {
    return this.sessionsService.getAnswers(id);
  }
}
