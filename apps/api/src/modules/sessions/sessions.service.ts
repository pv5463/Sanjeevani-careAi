import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(@InjectModel('Session') private sessionModel: Model<any>) {}

  async create(createSessionDto: any) {
    return this.sessionModel.create({ ...createSessionDto, startedAt: new Date(), lastActivityAt: new Date() });
  }

  async findOne(id: string) {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async update(id: string, updateSessionDto: any) {
    return this.sessionModel.findByIdAndUpdate(
      id,
      { ...updateSessionDto, lastActivityAt: new Date() },
      { new: true }
    ).exec();
  }

  async complete(id: string) {
    return this.sessionModel.findByIdAndUpdate(
      id,
      { status: 'COMPLETED', completedAt: new Date(), lastActivityAt: new Date() },
      { new: true }
    ).exec();
  }

  async terminate(id: string) {
    return this.sessionModel.findByIdAndUpdate(
      id,
      { status: 'ABANDONED', lastActivityAt: new Date() },
      { new: true }
    ).exec();
  }

  async getAnswers(id: string) {
    return []; // Handled by ClinicalAnswersModule typically, or joined here
  }

  async updateLastActivity(id: string) {
    return this.sessionModel.findByIdAndUpdate(id, { lastActivityAt: new Date() }).exec();
  }

  async checkExpiry(id: string) {
    const session = await this.findOne(id);
    const now = new Date();
    const diff = (now.getTime() - session.lastActivityAt.getTime()) / 1000;
    if (diff > 3600) {
      return this.sessionModel.findByIdAndUpdate(id, { status: 'EXPIRED' }, { new: true }).exec();
    }
    return session;
  }
}
