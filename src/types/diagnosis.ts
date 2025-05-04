
export interface DiagnosisResult {
  id: string;
  imageUrl: string;
  date: string;
  conditions: {
    name: string;
    probability: number;
    description: string;
    nextSteps: string[];
    treatments?: string[];
    severity?: string;
  }[];
  symptoms: Record<string, any>;
  patientInfo?: {
    age?: number;
    gender?: string;
    skinType?: string;
    medicalHistory?: string[];
  };
  analysisDetails?: {
    areaAffected?: string;
    duration?: string;
    characteristics?: string[];
  };
}
