import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConsentService {
  constructor(@InjectModel('Consent') private consentModel: Model<any>) {}

  async create(createConsentDto: any) {
    return this.consentModel.create(createConsentDto);
  }

  async findByPatient(patientId: string) {
    return this.consentModel.find({ patientId }).sort({ timestamp: -1 }).exec();
  }

  async withdraw(id: string) {
    const consent = await this.consentModel.findById(id);
    if (!consent) throw new NotFoundException('Consent not found');
    consent.status = 'WITHDRAWN';
    consent.withdrawnAt = new Date();
    return consent.save();
  }
}
