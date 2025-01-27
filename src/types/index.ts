import { ButtonProps } from "@mui/material";
export interface UserProfile {
  personalID: string;
  email: string;
  faculty: string;
  major: string;
  degree: string;
  role: string;
  name: string;
  name_EN: string;
}

export interface StepItem {
  label: string;
  description: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
}

export interface CMUBasicInfo {
  student_id: string;
  cmuitaccount: string;
  organization_name_TH: string;
  organization_name_EN: string;
  organization_code: string;
  itaccounttype_EN: string;
  firstname_TH: string;
  lastname_TH: string;
  cmuitaccount_name: string;
}

export interface CustomStepperProps {
  steps: StepItem[];
  title: string;
  isMobile: boolean;
}

export interface WelcomeBannerProps {
  name: string;
  isMobile: boolean;
}

export interface StepButtonProps extends ButtonProps {
  icon: React.ReactNode;
  isMobile: boolean;
  backgroundColor: string;
  hoverColor: string;
  target?: string;
  href?: string;
}
