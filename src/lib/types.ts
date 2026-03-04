export interface WhyAnswer {
  id: string;
  whyNumber: number;
  answer: string;
  evaluationLevel: string | null;
  evaluationScore: number | null;
  evaluationMaxScore: number | null;
  evaluationFeedback: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  analysisId: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string | null;
  priority: "ALTA" | "MEDIA" | "BAJA";
  status: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADO";
  responsible: string | null;
  dueDate: string | null;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
  analysisId: string;
}

export interface Analysis {
  id: string;
  problemTitle: string;
  problemDescription: string;
  rootCause: string | null;
  status: "DRAFT" | "IN_PROGRESS" | "COMPLETED";
  bloomLevel: number | null;
  bloomLabel: string | null;
  planningQuality: number | null;
  viabilityScore: number | null;
  createdAt: string;
  updatedAt: string;
  whyAnswers: WhyAnswer[];
  actionItems: ActionItem[];
}

export interface Evaluation {
  level: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface CreateAnalysisInput {
  problemTitle: string;
  problemDescription: string;
}

export interface UpdateAnalysisInput {
  problemTitle?: string;
  problemDescription?: string;
  rootCause?: string;
  status?: string;
  bloomLevel?: number;
  bloomLabel?: string;
  planningQuality?: number;
  viabilityScore?: number;
  whyAnswers?: {
    whyNumber: number;
    answer: string;
    evaluationLevel?: string;
    evaluationScore?: number;
    evaluationMaxScore?: number;
    evaluationFeedback?: string;
    isCompleted?: boolean;
  }[];
}

export interface CreateActionInput {
  title: string;
  description?: string;
  priority?: "ALTA" | "MEDIA" | "BAJA";
  responsible?: string;
  dueDate?: string;
}
