import ResponseData from "./response";
export interface ApiResponse {
  status: number;
  data: {
    userData : {
      cmuBasicInfo: ResponseData;
    }
    mind_code: string;
  };
}
