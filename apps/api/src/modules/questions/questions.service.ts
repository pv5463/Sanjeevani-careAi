import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel('Question') private questionModel: Model<any>) {}

  async getNextQuestion(sessionId: string, chiefComplaint: string, answeredQuestionIds: string[]): Promise<any> {
    const relevantCategories = this.mapComplaintToCategories(chiefComplaint);
    const nextQuestion = await this.questionModel
      .findOne({
        questionId: { $nin: answeredQuestionIds },
        category: { $in: relevantCategories },
        isActive: true,
        required: true,
      })
      .sort({ priority: 1 })
      .lean();
    if (nextQuestion) return nextQuestion;
    return this.questionModel
      .findOne({ questionId: { $nin: answeredQuestionIds }, isActive: true })
      .sort({ priority: 1 })
      .lean();
  }

  mapComplaintToCategories(complaint: string): string[] {
    if (!complaint) return ['PAST_MEDICAL', 'DRUG_HISTORY', 'ALLERGY', 'FAMILY', 'PERSONAL'];
    const c = complaint.toLowerCase();
    const cats = ['CHIEF_COMPLAINT', 'HPI'];
    if (c.includes('chest') || c.includes('heart') || c.includes('seena')) cats.push('PAIN', 'REVIEW_OF_SYSTEMS');
    if (c.includes('cough') || c.includes('breath') || c.includes('khansi')) cats.push('REVIEW_OF_SYSTEMS');
    if (c.includes('pain') || c.includes('dard')) cats.push('PAIN', 'HPI');
    cats.push('PAST_MEDICAL', 'DRUG_HISTORY', 'ALLERGY', 'FAMILY', 'PERSONAL');
    return [...new Set(cats)];
  }

  async getBank() { return this.questionModel.find({ isActive: true }); }
  async findAll() { return this.questionModel.find(); }
  async create(data: any) { return this.questionModel.create(data); }
  async update(id: string, data: any) { return this.questionModel.findByIdAndUpdate(id, data, { new: true }); }
  async remove(id: string) { return this.questionModel.findByIdAndUpdate(id, { isActive: false }); }
}
