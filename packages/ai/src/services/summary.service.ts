export class SummaryService {
  async generatePhysicianSummary(clinicalHistory: any, documents: any[], patient: any) {
    return {
      id: "summary-123",
      patientId: patient.id,
      clinicalHistoryId: clinicalHistory.id,
      sections: [],
      redFlags: [],
      missingInformation: [],
      confidenceMetadata: {},
      status: "DRAFT",
      doctorEdits: []
    };
  }
}
