export interface CaseData {
  facebookURL: string;
  topic: string[];
  description: string;
  role: "Student" | "Employee";
  nickname: string; // Added
  phone: string; // Added
}

export interface StepStatus {
  facebook: boolean;
  categories: boolean;
  details: boolean;
  contact: boolean; // Added
}

export interface FormErrors {
  facebookURL: boolean;
  topic: boolean;
  description: boolean;
  role: boolean;
  nickname: boolean; // Added
  phone: boolean; // Added
}
