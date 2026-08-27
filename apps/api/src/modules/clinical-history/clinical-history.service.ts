import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicalHistoryService {
  constructor(@InjectModel('ClinicalHistory') private historyModel: Model<any>) {}

  async create(createHistoryDto: any) {
    return this.historyModel.create(createHistoryDto);
  }

  async findOne(id: string) {
    const history = await this.historyModel.findById(id).exec();
    if (!history) throw new NotFoundException('Clinical history not found');
    return history;
  }

  async update(id: string, updateHistoryDto: any) {
    return this.historyModel.findByIdAndUpdate(id, updateHistoryDto, { new: true }).exec();
  }

  async findLatestByPatient(patientId: string) {
    return this.historyModel.findOne({ patientId }).sort({ createdAt: -1 }).exec();
  }

  async calculateAndSaveCompleteness(id: string) {
    const history = await this.findOne(id);
    const result = this.calculateCompleteness(history);
    history.completenessScore = result.score;
    await history.save();
    return result;
  }

  calculateCompleteness(history: any): { score: number; completed: string[]; missing: string[] } {
    const fields = [
      { key: 'chiefComplaint', label: 'Chief Complaint', weight: 20 },
      { key: 'hpi.onset', label: 'Onset', weight: 10 },
      { key: 'hpi.severity', label: 'Severity', weight: 8 },
      { key: 'hpi.character', label: 'Character', weight: 7 },
      { key: 'pastMedicalHistory', label: 'Past Medical History', weight: 10 },
      { key: 'drugHistory', label: 'Drug History', weight: 10 },
      { key: 'allergies', label: 'Allergy History', weight: 10 },
      { key: 'familyHistory', label: 'Family History', weight: 8 },
      { key: 'personalHistory', label: 'Personal History', weight: 7 },
      { key: 'reviewOfSystems', label: 'Review of Systems', weight: 10 },
    ];
    let score = 0;
    const completed: string[] = [];
    const missing: string[] = [];

    const getNestedValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

    fields.forEach(field => {
      const val = getNestedValue(history, field.key);
      if (val && (Array.isArray(val) ? val.length > 0 : Object.keys(val).length > 0)) {
        score += field.weight;
        completed.push(field.label);
      } else {
        missing.push(field.label);
      }
    });

    return { score, completed, missing };
  }
}
