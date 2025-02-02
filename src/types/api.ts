import ResponseData from "./response";
export interface ApiResponse {
  status: number;
  data: {
    cmuBasicInfo: ResponseData;
  };
}
