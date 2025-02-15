interface UserProfile {
  personalID: string;
  email: string;
  faculty: string;
  major: string;
  degree: string;
  mind_code: string;
  role: string;
  name: string;
  name_EN: string;
}

interface UserData {
  name: string;
  mind_code: string;
  email: string;
  status: string;
  nickname: string;
}

interface MindData {
  nickname : string;
  email : string;
  phone: string;
}
export type { UserProfile, UserData, MindData };
