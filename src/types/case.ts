export interface CaseData {
  facebookURL: string;
  topic: string[];
  description: string;
  role: "Student" | "Employee";
}

export interface StepStatus {
  facebook: boolean;
  categories: boolean;
  details: boolean;
}

export interface FormErrors {
  facebookURL: boolean;
  topic: boolean;
  description: boolean;
  role: boolean;
}
