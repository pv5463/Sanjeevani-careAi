import { z } from 'zod';

export const GenderSchema = z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']);
export const LanguageCodeSchema = z.enum(['en', 'hi']);

export const PatientSchema = z.object({
  hospitalId: z.string(),
  abhaId: z.string().optional(),
  name: z.string().min(2),
  dob: z.date(),
  gender: GenderSchema,
  contact: z.object({
    mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    emergency: z.string().optional(),
  }),
  preferredLanguage: LanguageCodeSchema,
});

export const ConsentSchema = z.object({
  patientId: z.string(),
  sessionId: z.string(),
  version: z.string(),
  status: z.enum(['GRANTED', 'DECLINED', 'WITHDRAWN']),
  timestamp: z.date(),
  language: LanguageCodeSchema,
  purpose: z.string(),
  source: z.string(),
  deviceId: z.string().optional(),
  ipAddress: z.string().optional(),
});

export const BodyRegionSchema = z.enum([
  'HEAD', 'NECK', 'CHEST', 'ABDOMEN', 'BACK', 'SHOULDER', 'ARM', 'ELBOW', 
  'WRIST', 'HAND', 'HIP', 'THIGH', 'KNEE', 'LEG', 'ANKLE', 'FOOT'
]);

export const PainLocationSchema = z.object({
  region: BodyRegionSchema,
  laterality: z.enum(['LEFT', 'RIGHT', 'BOTH', 'NA']),
  severity: z.number().min(0).max(10),
  character: z.string(),
  radiation: z.string().optional(),
  onset: z.string().optional(),
  duration: z.string().optional(),
});

export const HPISchema = z.object({
  site: z.string().optional(),
  onset: z.string().optional(),
  character: z.string().optional(),
  radiation: z.string().optional(),
  associatedSymptoms: z.array(z.string()),
  timing: z.string().optional(),
  exacerbatingFactors: z.array(z.string()),
  relievingFactors: z.array(z.string()),
  severity: z.number().optional(),
});

export const SourceReferenceSchema = z.object({
  type: z.enum(['VOICE_ANSWER', 'DOCUMENT', 'PREVIOUS_RECORD']),
  label: z.string(),
  documentId: z.string().optional(),
  questionId: z.string().optional(),
  timestamp: z.date(),
});

export const ClinicalHistorySchema = z.object({
  patientId: z.string(),
  sessionId: z.string(),
  chiefComplaint: z.string(),
  hpi: HPISchema,
  pastMedicalHistory: z.array(z.string()),
  pastSurgicalHistory: z.array(z.string()),
  drugHistory: z.array(z.string()),
  allergies: z.array(z.string()),
  familyHistory: z.array(z.string()),
  personalHistory: z.array(z.string()),
  reviewOfSystems: z.array(z.string()),
  painLocations: z.array(PainLocationSchema),
  completenessScore: z.number(),
  sourceReferences: z.array(SourceReferenceSchema),
  status: z.enum(['DRAFT', 'READY', 'DOCTOR_VERIFIED']),
});

export const ClinicalAnswerSchema = z.object({
  sessionId: z.string(),
  questionId: z.string(),
  patientId: z.string(),
  answer: z.string(),
  normalizedAnswer: z.string(),
  inputType: z.enum(['VOICE', 'TOUCH']),
  timestamp: z.date(),
  confidence: z.number(),
  isConfirmed: z.boolean(),
});

export const AlertSchema = z.object({
  patientId: z.string(),
  alertType: z.enum(['RED_FLAG', 'MISSING_INFO', 'CONTRADICTION', 'SYSTEM']),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  reason: z.string(),
  ruleId: z.string().optional(),
  timestamp: z.date(),
});

export const SummarySectionSchema = z.object({
  sectionType: z.string(),
  content: z.string(),
  aiGenerated: z.boolean(),
  verified: z.boolean(),
  sourceReferences: z.array(SourceReferenceSchema),
});

export const SummarySchema = z.object({
  patientId: z.string(),
  clinicalHistoryId: z.string(),
  sections: z.array(SummarySectionSchema),
  redFlags: z.array(AlertSchema),
  missingInformation: z.array(z.string()),
  status: z.enum(['DRAFT', 'READY', 'DOCTOR_VERIFIED']),
});

export const AYUSHAssessmentSchema = z.object({
  patientId: z.string(),
  sessionId: z.string(),
  department: z.enum(['AYURVEDA', 'YOGA_NATUROPATHY', 'UNANI', 'SIDDHA', 'HOMOEOPATHY']),
  prakriti: z.string().optional(),
  vikriti: z.string().optional(),
  customFields: z.record(z.string()),
});

export const DocumentSchema = z.object({
  patientId: z.string(),
  type: z.enum(['PRESCRIPTION', 'LAB_REPORT', 'DISCHARGE_SUMMARY', 'MEDICAL_CERTIFICATE', 'INVESTIGATION_REPORT', 'SURGICAL_RECORD']),
  supabasePath: z.string(),
  mimeType: z.string(),
  uploadDate: z.date(),
  ocrStatus: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']),
  verificationStatus: z.enum(['UNVERIFIED', 'PATIENT_VERIFIED', 'DOCTOR_VERIFIED']),
});

export const AISummaryOutputSchema = z.object({
  chiefComplaint: z.string(),
  duration: z.string().optional(),
  severity: z.number().optional(),
  associatedSymptoms: z.array(z.string()),
  missingFields: z.array(z.string()),
  redFlags: z.array(z.string()),
});

export const RedFlagRuleSchema = z.object({
  ruleId: z.string(),
  name: z.string(),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  message: z.object({
    en: z.string(),
    hi: z.string(),
  }),
});

export const QuestionSchema = z.object({
  questionId: z.string(),
  category: z.string(),
  text: z.object({
    en: z.string(),
    hi: z.string(),
  }),
  inputType: z.enum(['VOICE', 'TOUCH', 'BOTH']),
  priority: z.number(),
  required: z.boolean(),
});

export const QuestionBankSchema = z.array(QuestionSchema);
