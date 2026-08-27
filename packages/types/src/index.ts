export type UserRole = 'PATIENT' | 'DOCTOR' | 'NURSE' | 'ADMIN' | 'SYSTEM_ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  hospitalId?: string;
  name: string;
  department?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
export type LanguageCode = 'en' | 'hi';

export interface Patient {
  id: string;
  abhaId?: string;
  hospitalId: string;
  name: string;
  dob: Date;
  gender: Gender;
  contact: {
    mobile: string;
    emergency?: string;
  };
  preferredLanguage: LanguageCode;
  createdAt: Date;
  updatedAt: Date;
}

export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'ABANDONED';

export interface Session {
  id: string;
  patientId: string;
  deviceId: string;
  status: SessionStatus;
  language: LanguageCode;
  startedAt: Date;
  completedAt?: Date;
  lastActivityAt: Date;
  currentStep: string;
  completedSteps: string[];
  ipAddress?: string;
}

export type ConsentStatus = 'GRANTED' | 'DECLINED' | 'WITHDRAWN';

export interface Consent {
  id: string;
  patientId: string;
  sessionId: string;
  version: string;
  status: ConsentStatus;
  timestamp: Date;
  language: LanguageCode;
  purpose: string;
  source: string;
  deviceId?: string;
  ipAddress?: string;
  withdrawnAt?: Date;
}

export enum BodyRegion {
  HEAD = 'HEAD',
  NECK = 'NECK',
  CHEST = 'CHEST',
  ABDOMEN = 'ABDOMEN',
  BACK = 'BACK',
  SHOULDER = 'SHOULDER',
  ARM = 'ARM',
  ELBOW = 'ELBOW',
  WRIST = 'WRIST',
  HAND = 'HAND',
  HIP = 'HIP',
  THIGH = 'THIGH',
  KNEE = 'KNEE',
  LEG = 'LEG',
  ANKLE = 'ANKLE',
  FOOT = 'FOOT'
}

export interface PainLocation {
  region: BodyRegion;
  laterality: 'LEFT' | 'RIGHT' | 'BOTH' | 'NA';
  severity: number; // 0-10
  character: string;
  radiation?: string;
  onset?: string;
  duration?: string;
}

export interface HPI {
  site?: string;
  onset?: string;
  character?: string;
  radiation?: string;
  associatedSymptoms: string[];
  timing?: string;
  exacerbatingFactors: string[];
  relievingFactors: string[];
  severity?: number;
}

export interface SourceReference {
  type: 'VOICE_ANSWER' | 'DOCUMENT' | 'PREVIOUS_RECORD';
  label: string;
  documentId?: string;
  questionId?: string;
  timestamp: Date;
}

export interface ClinicalHistory {
  id: string;
  patientId: string;
  sessionId: string;
  chiefComplaint: string;
  hpi: HPI;
  pastMedicalHistory: string[];
  pastSurgicalHistory: string[];
  drugHistory: string[];
  allergies: string[];
  familyHistory: string[];
  personalHistory: string[];
  reviewOfSystems: string[];
  painLocations: PainLocation[];
  completenessScore: number;
  sourceReferences: SourceReference[];
  status: 'DRAFT' | 'READY' | 'DOCTOR_VERIFIED';
}

export enum QuestionCategory {
  CHIEF_COMPLAINT = 'CHIEF_COMPLAINT',
  HPI = 'HPI',
  PAST_MEDICAL = 'PAST_MEDICAL',
  PAST_SURGICAL = 'PAST_SURGICAL',
  DRUG_HISTORY = 'DRUG_HISTORY',
  ALLERGY = 'ALLERGY',
  FAMILY = 'FAMILY',
  PERSONAL = 'PERSONAL',
  LIFESTYLE = 'LIFESTYLE',
  REVIEW_OF_SYSTEMS = 'REVIEW_OF_SYSTEMS',
  PAIN = 'PAIN',
  AYUSH = 'AYUSH'
}

export interface FollowUpRule {
  condition: string;
  nextQuestionId: string;
}

export interface Question {
  questionId: string;
  category: QuestionCategory;
  text: {
    en: string;
    hi: string;
  };
  inputType: 'VOICE' | 'TOUCH' | 'BOTH';
  followUpRules: FollowUpRule[];
  priority: number;
  required: boolean;
  validation?: string;
  isActive: boolean;
  departmentIds?: string[];
}

export interface ClinicalAnswer {
  id: string;
  sessionId: string;
  questionId: string;
  patientId: string;
  answer: string;
  normalizedAnswer: string;
  inputType: 'VOICE' | 'TOUCH';
  timestamp: Date;
  confidence: number;
  isConfirmed: boolean;
}

export type DocumentType = 'PRESCRIPTION' | 'LAB_REPORT' | 'DISCHARGE_SUMMARY' | 'MEDICAL_CERTIFICATE' | 'INVESTIGATION_REPORT' | 'SURGICAL_RECORD';
export type VerificationStatus = 'UNVERIFIED' | 'PATIENT_VERIFIED' | 'DOCTOR_VERIFIED';

export interface Document {
  id: string;
  patientId: string;
  type: DocumentType;
  supabasePath: string;
  signedUrl?: string;
  mimeType: string;
  uploadDate: Date;
  ocrStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  extractionStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  verificationStatus: VerificationStatus;
}

export type EntityType = 'DIAGNOSIS' | 'MEDICATION' | 'DOSAGE' | 'FREQUENCY' | 'DURATION' | 'INVESTIGATION' | 'RESULT' | 'PROCEDURE' | 'SURGERY' | 'HOSPITAL' | 'DATE' | 'DOCTOR' | 'DEPARTMENT';

export interface ExtractedEntity {
  type: EntityType;
  value: string;
  confidence: number;
  boundingBox?: any;
  verificationStatus: VerificationStatus;
}

export interface DocumentExtraction {
  id: string;
  documentId: string;
  entities: ExtractedEntity[];
  overallConfidence: number;
  verificationStatus: VerificationStatus;
  extractedAt: Date;
  verifiedBy?: string;
  verifiedAt?: Date;
}

export type TimelineEventType = 'DIAGNOSIS' | 'MEDICATION' | 'INVESTIGATION' | 'PROCEDURE' | 'SURGERY' | 'VISIT' | 'HOSPITALIZATION';

export interface TimelineEvent {
  date: Date;
  type: TimelineEventType;
  description: string;
  documentId?: string;
  source: string;
}

export interface MedicalTimeline {
  id: string;
  patientId: string;
  events: TimelineEvent[];
}

export type AlertType = 'RED_FLAG' | 'MISSING_INFO' | 'CONTRADICTION' | 'SYSTEM';
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Alert {
  id: string;
  patientId: string;
  alertType: AlertType;
  severity: AlertSeverity;
  reason: string;
  ruleId?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  timestamp: Date;
}

export interface SummarySection {
  sectionType: string;
  content: string;
  aiGenerated: boolean;
  verified: boolean;
  sourceReferences: SourceReference[];
}

export interface DoctorEdit {
  field: string;
  originalValue: string;
  editedValue: string;
  editedBy: string;
  editedAt: Date;
}

export interface Summary {
  id: string;
  patientId: string;
  clinicalHistoryId: string;
  sections: SummarySection[];
  redFlags: Alert[];
  missingInformation: string[];
  confidenceMetadata: Record<string, any>;
  status: 'DRAFT' | 'READY' | 'DOCTOR_VERIFIED';
  doctorEdits: DoctorEdit[];
  verifiedBy?: string;
  verifiedAt?: Date;
}

export type AYUSHDepartment = 'AYURVEDA' | 'YOGA_NATUROPATHY' | 'UNANI' | 'SIDDHA' | 'HOMOEOPATHY';

export interface AYUSHAssessment {
  id: string;
  patientId: string;
  sessionId: string;
  department: AYUSHDepartment;
  prakriti?: string;
  vikriti?: string;
  sara?: string;
  samhanana?: string;
  pramana?: string;
  satmya?: string;
  sattva?: string;
  aharaShakti?: string;
  vyayamaShakti?: string;
  vaya?: string;
  customFields: Record<string, string>;
}

export enum AuditAction {
  USER_LOGIN = 'USER_LOGIN',
  RECORD_CREATED = 'RECORD_CREATED',
  RECORD_UPDATED = 'RECORD_UPDATED',
  RECORD_DELETED = 'RECORD_DELETED',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  SUMMARY_VERIFIED = 'SUMMARY_VERIFIED',
  CONSENT_GRANTED = 'CONSENT_GRANTED',
  CONSENT_WITHDRAWN = 'CONSENT_WITHDRAWN'
}

export interface AuditLog {
  id: string;
  userId: string;
  userRole: UserRole;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  deviceId?: string;
  timestamp: Date;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: string;
}

export interface RedFlagRule {
  ruleId: string;
  name: string;
  conditions: RuleCondition[];
  severity: AlertSeverity;
  message: {
    en: string;
    hi: string;
  };
  actions: string[];
  isActive: boolean;
  priority: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  pagination?: PaginationMeta;
}
