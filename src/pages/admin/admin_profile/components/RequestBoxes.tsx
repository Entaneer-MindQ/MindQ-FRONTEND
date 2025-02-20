import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { post } from "../../../../services/api";
import { useCookies } from "react-cookie";

interface ApiResponse {
  status: number;
  data: {
    name: string;
    email: string;
  };
}

const ProfileBox: React.FC = () => {
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [cookies] = useCookies(["auth_token"]);

  const fetchData = async () => {
    try {
      const response = (await post("/api/adminProfile", {
        token: cookies["auth_token"],
      })) as ApiResponse;

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div>{data?.email}</div>
    </Box>
  );
};

export default ProfileBox;
