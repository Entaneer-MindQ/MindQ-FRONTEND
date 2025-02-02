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

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export interface ApiResponse {
  status: number;
  data: {
    cmuBasicInfo: ResponseData;
  };
}
