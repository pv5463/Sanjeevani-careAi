import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PatientsService {
  constructor(@InjectModel('Patient') private patientModel: Model<any>) {}

  async create(createPatientDto: any) {
    if (createPatientDto.contact?.mobile) {
      const existing = await this.patientModel.findOne({ 'contact.mobile': createPatientDto.contact.mobile });
      if (existing) throw new BadRequestException('Patient with this mobile number already exists');
    }
    return this.patientModel.create(createPatientDto);
  }

  async findAll(query: any) {
    const { name, abhaId, mobile, hospitalId, page = 1, limit = 10 } = query;
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (abhaId) filter.abhaId = abhaId;
    if (mobile) filter['contact.mobile'] = mobile;
    if (hospitalId) filter.hospitalId = hospitalId;
    const data = await this.patientModel.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
    const total = await this.patientModel.countDocuments(filter);
    return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
  }

  async findOne(id: string) { return this.patientModel.findById(id).exec(); }
  async update(id: string, updatePatientDto: any) { return this.patientModel.findByIdAndUpdate(id, updatePatientDto, { new: true }).exec(); }
  async getTimeline(id: string) { return { message: 'Timeline feature via MedicalTimelineModule' }; }
  async getLatestSession(id: string) { return { message: 'Session lookup via SessionsModule' }; }
}
