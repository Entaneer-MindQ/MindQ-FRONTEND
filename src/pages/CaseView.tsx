import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Button,
  Container,
  Fade,
  Grow,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SubjectIcon from "@mui/icons-material/Subject";
import { useCookies } from "react-cookie";

interface CaseData {
  cid: number;
  personalID: string;
  name: string;
  topic: string[];
  description: string;
  role: string;
  facebook: string;
  email: string;
  created_at: string;
  updated_at: string;
  mind_code?: string; // เพิ่ม mind_code เป็น optional
}

interface ApiResponse {
  message: string;
  data: CaseData;
}

const CaseView = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["auth_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = cookies["auth_token"];
        console.log("Sending token:", token);

        const response = await post("/api/getCase", {
          token: token,
        });

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

  const handleBooking = () => {
    navigate("/calendar");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#943131" }} />
        <Typography variant="h6" color="textSecondary">
          กำลังโหลดข้อมูล...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4, ml: "100px" }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            "& .MuiAlert-icon": {
              fontSize: "2rem",
            },
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, ml: "100px" }}>
      <Fade in timeout={800}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#943131",
              color: "white",
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <HistoryIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5">ประวัติการปรึกษา</Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            {cases.length === 0 ? (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 2,
                  fontSize: "1rem",
                  "& .MuiAlert-icon": {
                    fontSize: "2rem",
                  },
                }}
              >
                ไม่พบประวัติการปรึกษา
              </Alert>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cases.map((caseItem, index) => (
                  <Grow in timeout={500 * (index + 1)} key={caseItem.cid}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <SubjectIcon color="primary" />
                          <Typography variant="h6" color="primary">
                            {Array.isArray(caseItem.topic)
                              ? caseItem.topic.join(", ")
                              : caseItem.topic}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            color: "text.secondary",
                            pl: 4,
                          }}
                        >
                          {caseItem.description}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              วันที่สร้าง:{" "}
                              {new Date(caseItem.created_at).toLocaleDateString(
                                "th-TH"
                              )}
                            </Typography>
                          </Box>

                          {/* แสดงปุ่มจองคิวเฉพาะเมื่อ mind_code มีค่า */}
                          {caseItem.mind_code && (
                            <Button
                              variant="contained"
                              onClick={handleBooking}
                              startIcon={<EventAvailableIcon />}
                              sx={{
                                backgroundColor: "#943131",
                                "&:hover": {
                                  backgroundColor: "#7a2828",
                                  transform: "translateY(-2px)",
                                  boxShadow: 4,
                                },
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                boxShadow: 2,
                                transition: "all 0.2s",
                              }}
                            >
                              จองคิว
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Fade>

      {/* Case Statistics */}
      {cases.length > 0 && (
        <Fade in timeout={1200}>
          <Paper
            elevation={2}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                {cases.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                เคสทั้งหมด
              </Typography>
            </Box>
          </Paper>
        </Fade>
      )}
    </Container>
  );
};

export default CaseView;
