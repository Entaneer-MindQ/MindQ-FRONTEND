// useAccountData.ts
import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { post } from "../services/api";
import type { UserProfile } from "../types/user";
import type { Queue, ApiResponse, ApiResponse2 } from "../types/queue";

const emptyQueue: Queue = {
  mind_code: "",
  date: "",
  slot: "",
  qid: "",
  case_id: "",
  description: "",
  topic: [],
};

const useAccountData = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [queue, setQueue] = useState<Queue>(emptyQueue);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    console.log("Starting refreshData...");
    setIsLoading(true);
    try {
      // Fetch user profile
      const response = (await post("/api/user/profile", {
        token: cookies["auth_token"],
      })) as ApiResponse;

      if (response.status === 200 && response.data?.userData.cmuBasicInfo) {
        const basicInfo = response.data.userData.cmuBasicInfo;
        setUserProfile({
          personalID: basicInfo.student_id,
          email: basicInfo.cmuitaccount,
          faculty: basicInfo.organization_name_TH,
          major: basicInfo.organization_name_EN,
          degree: basicInfo.organization_code,
          mind_code: "", // Add appropriate value for mind_code
          role: basicInfo.itaccounttype_TH,
          name: basicInfo.firstname_TH.concat(" ", basicInfo.lastname_TH),
          name_EN: basicInfo.cmuitaccount_name,
        });
      }

      // Fetch current queue
      const queueResponse = (await post("/api/getCurrentQueue", {
        token: cookies["auth_token"],
      })) as ApiResponse2;

      if (queueResponse.status === 200) {
        if (queueResponse.data) {
          setQueue(queueResponse.data);
        } else {
          // Reset queue when there's no active appointment
          setQueue(emptyQueue);
        }
      } else {
        // Reset queue on error or no active appointment
        setQueue(emptyQueue);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Reset queue on error
      setQueue(emptyQueue);
    } finally {
      setIsLoading(false);
    }
  }, [cookies["auth_token"]]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { userProfile, queue, refreshData: fetchData, isLoading };
};

export default useAccountData;
