// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserProfile, ApiResponse } from "../types/nav";
import { post } from "../services/api";

export const useAuth = () => {
  const [cookies, removeCookie] = useCookies(["auth_token"]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mind_code, setMind_code] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    console.log("Sending cookies:", cookies);

    try {
      setError(null);
      const response = (await post("/api/user/profile", {
        token: cookies["auth_token"],
      })) as ApiResponse;

      if (response.status === 200 && response.data?.userData.cmuBasicInfo && response.data?.mind_code) {
        const basicInfo = response.data.userData.cmuBasicInfo;
        const mind_code = response.data.mind_code;
        const name = basicInfo.firstname_TH.concat(" ", basicInfo.lastname_TH);
        setMind_code(mind_code);
        setUserProfile({
          personalID: basicInfo.student_id,
          email: basicInfo.cmuitaccount,
          faculty: basicInfo.organization_name_TH,
          major: basicInfo.organization_name_EN,
          degree: basicInfo.organization_code,
          role: basicInfo.itaccounttype_TH,
          name: name,
          name_EN: basicInfo.cmuitaccount_name,
        });

        console.log("Updated userProfile:", response.data);
        setIsLogin(true);
      } else if (response.status === 404) {
        console.log("No user profile found");
        setIsLogin(false);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error details:", {
        message: (error as any).message,
        response: (error as any).response?.data,
        status: (error as any).response?.status,
      });
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLogin(false);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    if (cookies["auth_token"]) {
      fetchUserProfile();
    } else {
      setIsLogin(false);
      setUserProfile(null);
    }
  }, [cookies["auth_token"]]);

  const logout = () => {
    removeCookie("auth_token", { path: "/" });
    setIsLogin(false);
    setUserProfile(null);
    setError(null);
  };

  return {
    userProfile,
    isLogin,
    error,
    mind_code,
    logout,
    fetchUserProfile,
  };
};
