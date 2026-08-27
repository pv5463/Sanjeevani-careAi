import { Controller, Get, Post, Body, Put, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Public()
  @Get('next')
  getNext(@Query('sessionId') sessionId: string, @Query('chiefComplaint') cc: string, @Query('answeredIds') ids: string) {
    return this.questionsService.getNextQuestion(sessionId, cc, ids ? ids.split(',') : []);
  }

  @Public()
  @Get('bank')
  getBank() { return this.questionsService.getBank(); }

  @Get()
  findAll() { return this.questionsService.findAll(); }

  @Post()
  create(@Body() body: any) { return this.questionsService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.questionsService.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.questionsService.remove(id); }
}
