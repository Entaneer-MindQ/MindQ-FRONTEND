// User Profile Types
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

// Response Data Type from API
export interface ResponseData {
  student_id: string;
  cmuitaccount: string;
  organization_name_TH: string;
  organization_name_EN: string;
  organization_code: string;
  itaccounttype_TH: string;
  firstname_TH: string;
  lastname_TH: string;
  cmuitaccount_name: string;
}

// Navigation Item Type
export interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

// API Response Types
export interface ApiResponse {
  status: number;
  message?: string;
  data?: {
    userData : {
      cmuBasicInfo : ResponseData,
    }
    mind_code : string
  };
}

// API Error Response
export interface ApiError {
  message: string;
  response?: {
    data: any;
    status: number;
  };
}
