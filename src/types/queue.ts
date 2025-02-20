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

export interface QueueApiResponse {
  status: number;
  data: ResponseData;
}

export interface ResponseData {
  mind_data: MindData;
  user_data: UserData;
  current_queue: QueueItem[];
  cancel_queue: QueueItem[];
  complete_queue: QueueItem[];
  case_data: CaseData;
}

export interface MindData {
  mind_code: string;
  personalID: string;
  facebook: string;
  email: string;
  phone: string;
  nickname: string;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  name: string;
  mind_code: string;
  email: string;
  status: string;
  nickname: string;
}

export interface QueueItem {
  qid: number;
  case_id: number;
  mind_code: string;
  date: string;
  slot: number;
  cancel_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface CaseData {
  cid: number;
  mind_code: string;
  topic: string[];
  description: string;
  phy_id: number;
  created_at: string;
  updated_at: string;
}