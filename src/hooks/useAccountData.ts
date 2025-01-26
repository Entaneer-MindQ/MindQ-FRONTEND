import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { post } from "../services/api";
import type UserProfile from "../types/user";
import type { Queue, ApiResponse, ApiResponse2 } from "../types/queue";

const useAccountData = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [queue, setQueue] = useState<Queue>({
    mind_code: "",
    date: "",
    slot: "",
    qid: "",
    case_id: "",
    description: "",
    topic: [],
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const queueResponse = (await post("/api/getCurrentQueue", {
          token: cookies["auth_token"],
        })) as ApiResponse2;

        if (queueResponse.status === 200 && queueResponse?.data) {
          setQueue(queueResponse.data);
        }

        const response = (await post("/api/user/profile", {
          token: cookies["auth_token"],
        })) as ApiResponse;

        if (response.status === 200 && response.data?.cmuBasicInfo) {
          const basicInfo = response.data.cmuBasicInfo;
          setUserProfile({
            personalID: basicInfo.student_id,
            email: basicInfo.cmuitaccount,
            faculty: basicInfo.organization_name_TH,
            major: basicInfo.organization_name_EN,
            degree: basicInfo.organization_code,
            role: basicInfo.itaccounttype_TH,
            name: basicInfo.firstname_TH.concat(" ", basicInfo.lastname_TH),
            name_EN: basicInfo.cmuitaccount_name,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserProfile();
  }, [cookies["auth_token"]]);

  return { userProfile, queue };
};

export default useAccountData;
