import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { post } from "../services/api";
import { CaseData, ApiResponse } from "../types/case-view";

export const useCases = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["auth_token"]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = cookies["auth_token"];
        console.log("Sending token:", token);

        const response = (await post("/api/getCase", {
          token: token,
        })) as ApiResponse;

        console.log("API Response:", response);

        if (response.data) {
          setCases([response.data]);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      }
    };

    fetchCases();
  }, [cookies]);

  return { cases, loading, error };
};
