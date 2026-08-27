import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionModel } from '../../schemas/question.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Question', schema: QuestionModel.schema }])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
