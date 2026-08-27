import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicalAnswersController } from './clinical-answers.controller';
import { ClinicalAnswersService } from './clinical-answers.service';
import { ClinicalAnswerModel } from '../../schemas/clinical-answer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ClinicalAnswer', schema: ClinicalAnswerModel.schema }])],
  controllers: [ClinicalAnswersController],
  providers: [ClinicalAnswersService],
  exports: [ClinicalAnswersService],
})
export class ClinicalAnswersModule {}
