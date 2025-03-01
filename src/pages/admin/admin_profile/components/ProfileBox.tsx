import React, { useEffect, useState } from "react";
import { post } from "../../../../services/api";
import { useCookies } from "react-cookie";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ApiResponse {
  status: number;
  data: {
    name_EN: string;
    name_TH: string;
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
      // console.log(response.data);
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        background:
          "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
        color: "white",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            bgcolor: "white",
            color: "#943131",
            mb: 2,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: { xs: 50, sm: 60 } }} />
        </Avatar>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ wordBreak: "break-word" }}
        >
          {data?.name_TH}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 1.5, wordBreak: "break-word" }}>
          <strong>CMU IT Account:</strong> {data?.email}
        </Typography>
        <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
          <strong>ตำแหน่ง: นักจิตวิทยาประจำคณะ</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileBox;
