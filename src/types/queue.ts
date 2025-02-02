export interface Queue {
  mind_code: string;
  date: string;
  slot: string;
  qid: string;
  case_id: string;
  description: string;
  topic: string[];
}

export interface ApiResponse {
  status: number;
  data: {
    cmuBasicInfo: responseData;
  };
}

export interface ApiResponse2 {
  status: number;
  data: Queue;
}
export interface responseData {
  cmuitaccount_name: string;
  cmuitaccount: string;
  student_id: string;
  firstname_TH: string;
  lastname_TH: string;
  organization_name_TH: string;
  organization_name_EN: string;
  organization_code: string;
  itaccounttype_EN: string;
  itaccounttype_TH: string;
}
