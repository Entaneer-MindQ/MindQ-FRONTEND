import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { post } from "../services/api";
import { UserProfile, CMUBasicInfo } from "../types";
import { ApiResponse } from "../types/api";

export const useUserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cookies] = useCookies(["auth_token"]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = (await post("/api/user/profile", {
          token: cookies["auth_token"],
        })) as ApiResponse;

        if (response.status === 200 && response.data?.cmuBasicInfo) {
          const basicInfo: CMUBasicInfo = response.data.cmuBasicInfo;
          setUserProfile({
            personalID: basicInfo.student_id,
            email: basicInfo.cmuitaccount,
            faculty: basicInfo.organization_name_TH,
            major: basicInfo.organization_name_EN,
            degree: basicInfo.organization_code,
            role: basicInfo.itaccounttype_EN,
            name: `${basicInfo.firstname_TH} ${basicInfo.lastname_TH}`,
            name_EN: basicInfo.cmuitaccount_name,
          });
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [cookies["auth_token"], navigate]);

  return { userProfile, loading, error };
};
