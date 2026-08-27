import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ClinicalAnswersService } from './clinical-answers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('clinical-answers')
export class ClinicalAnswersController {
  constructor(private readonly answersService: ClinicalAnswersService) {}

  @Public()
  @Post()
  create(@Body() createAnswerDto: any) {
    return this.answersService.create(createAnswerDto);
  }

  @Get('session/:sessionId')
  findBySession(@Param('sessionId') sessionId: string) {
    return this.answersService.findBySession(sessionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: any) {
    return this.answersService.update(id, updateAnswerDto);
  }
}
