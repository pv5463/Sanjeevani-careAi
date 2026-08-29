import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ConsentModule } from './modules/consent/consent.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ClinicalHistoryModule } from './modules/clinical-history/clinical-history.module';
import { ClinicalAnswersModule } from './modules/clinical-answers/clinical-answers.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { MedicalTimelineModule } from './modules/medical-timeline/medical-timeline.module';
// import { AlertsModule } from './modules/alerts/alerts.module';
// import { SummariesModule } from './modules/summaries/summaries.module';
// import { DoctorsModule } from './modules/doctors/doctors.module';
// import { DepartmentsModule } from './modules/departments/departments.module';
// import { AyushModule } from './modules/ayush/ayush.module';
// import { AuditModule } from './modules/audit/audit.module';
// import { AdminModule } from './modules/admin/admin.module';
// import { FhirModule } from './modules/fhir/fhir.module';
import { EventsModule } from './gateways/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AuthModule,
    PatientsModule,
    SessionsModule,
    ConsentModule,
    QuestionsModule,
    ClinicalHistoryModule,
    ClinicalAnswersModule,
    DocumentsModule,
    OcrModule,
    MedicalTimelineModule,
    // AlertsModule,
    // SummariesModule,
    // DoctorsModule,
    // DepartmentsModule,
    // AyushModule,
    // AuditModule,
    // AdminModule,
    // FhirModule,
    EventsModule,
  ],
})
export class AppModule {}
