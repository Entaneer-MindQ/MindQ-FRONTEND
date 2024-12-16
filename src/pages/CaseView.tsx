import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get, post } from "../services/api";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";

interface CaseData {
  topic: string;
  description: string;
  status: string;
  approve: boolean;
}

interface ApiResponse {
  status: number;
  data: CaseData[];
  message?: string;
}

const CaseView = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const personalID = localStorage.getItem("personalID");
        if (!personalID) {
          setError("No personal ID found. Please fill out the form first.");
          setLoading(false);
          return;
        }

        const response = await post<ApiResponse>("/api/getcases", {
          personalID: parseInt(personalID),
        });

        if (response.status === 200 && response.data) {
          setCases(response.data);
          console.log(cases);
        } else if (response.status === 404) {
          setError(response.message || "No cases found");
        }
      } catch (err) {
        setError("Failed to load cases. Please try again later.");
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleBooking = () => {
    navigate("/calendar"); // Navigate to booking page
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, ml: "80px" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          ประวัติการปรึกษา
        </Typography>
        {cases.length === 0 ? (
          <Alert severity="info">ไม่พบประวัติการปรึกษา</Alert>
        ) : (
          cases.map((caseItem, index) => (
            <Card key={index} sx={{ mb: 2, backgroundColor: "#f5f5f5" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  หัวข้อ: {caseItem.topic}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  รายละเอียด: {caseItem.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        caseItem.approve === true
                          ? "success.main"
                          : "text.secondary",
                    }}
                  >
                    สถานะ:{" "}
                    {caseItem.approve === true ? "อนุมัติแล้ว" : "รอการอนุมัติ"}
                  </Typography>
                  {caseItem.approve === true && (
                    <Button
                      variant="contained"
                      onClick={handleBooking}
                      sx={{
                        backgroundColor: "#8B4513",
                        "&:hover": {
                          backgroundColor: "#6B3410",
                        },
                      }}
                    >
                      จองคิว
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default CaseView;
