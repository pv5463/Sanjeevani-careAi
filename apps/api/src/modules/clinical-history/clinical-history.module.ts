import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicalHistoryController } from './clinical-history.controller';
import { ClinicalHistoryService } from './clinical-history.service';
import { ClinicalHistoryModel } from '../../schemas/clinical-history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ClinicalHistory', schema: ClinicalHistoryModel.schema }])],
  controllers: [ClinicalHistoryController],
  providers: [ClinicalHistoryService],
  exports: [ClinicalHistoryService],
})
export class ClinicalHistoryModule {}
