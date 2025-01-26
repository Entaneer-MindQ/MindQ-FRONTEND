export interface CaseData {
  cid: number;
  personalID: string;
  name: string;
  topic: string[];
  description: string;
  role: string;
  facebook: string;
  email: string;
  created_at: string;
  updated_at: string;
  mind_code?: string;
}

export interface ApiResponse {
  message: string;
  data: CaseData;
}

export interface CaseCardProps {
  caseItem: CaseData;
  onBooking: () => void;
}

export interface CaseStatsProps {
  totalCases: number;
}
