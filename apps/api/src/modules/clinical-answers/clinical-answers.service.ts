import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicalAnswersService {
  constructor(@InjectModel('ClinicalAnswer') private answerModel: Model<any>) {}

  async create(createAnswerDto: any) {
    return this.answerModel.create(createAnswerDto);
  }

  async findBySession(sessionId: string) {
    return this.answerModel.find({ sessionId }).sort({ timestamp: 1 }).exec();
  }

  async update(id: string, updateAnswerDto: any) {
    return this.answerModel.findByIdAndUpdate(id, updateAnswerDto, { new: true }).exec();
  }
}
