import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientModel } from '../../schemas/patient.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Patient', schema: PatientModel.schema }])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
