import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Alert,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SubjectIcon from "@mui/icons-material/Subject";
import CategoryIcon from "@mui/icons-material/Category";

// Sample booking data for testing
const sampleBookingData = {
  month: "December/2024",
  date: 6,
  dayOfWeek: "Friday",
  categories: ["การเรียน", "ความเครียด", "ความสัมพันธ์"],
  timeSlot: "13.00",
  details:
    "ปัญหาความเครียดเกี่ยวกับการเรียนและความสัมพันธ์กับเพื่อนร่วมชั้น ต้องการคำปรึกษาเพื่อจัดการความเครียดและปรับปรุงความสัมพันธ์ให้ดีขึ้น",
};

const ConfirmBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Use location.state if available, otherwise use sample data
  const bookingData = location.state || sampleBookingData;

  const handleConfirm = async () => {
    try {
      // Here you would typically make an API call to confirm the booking
      // await post('/api/confirm-booking', bookingData);
      alert("จองคิวสำเร็จ");
      navigate("/case");
    } catch (error) {
      console.error("Booking confirmation failed:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  const getEndTime = (startTime: string) => {
    const hour = parseInt(startTime.split(".")[0]);
    return `${hour + 1}.00`;
  };

  // Rest of the component remains the same...
  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Paper sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 4, color: "#8B4513" }}>
          ยืนยันการนัดหมาย
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "#666",
              }}
            >
              <CalendarTodayIcon sx={{ mr: 2 }} />
              <Typography>
                {bookingData.date} {bookingData.dayOfWeek} {bookingData.month}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "#666",
              }}
            >
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography>
                {bookingData.timeSlot} - {getEndTime(bookingData.timeSlot)} น.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                color: "#666",
              }}
            >
              <CategoryIcon sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "#333" }}>
                  หมวดหมู่การปรึกษา
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {bookingData.categories.map((category: string) => (
                    <Box
                      key={category}
                      sx={{
                        bgcolor: "#f5f5f5",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      {category}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                color: "#666",
              }}
            >
              <SubjectIcon sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "#333" }}>
                  รายละเอียด
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#f5f5f5",
                    p: 2,
                    borderRadius: 1,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {bookingData.details}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  color: "#666",
                  borderColor: "#666",
                  "&:hover": {
                    borderColor: "#333",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                ย้อนกลับ
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{
                  backgroundColor: "#8B4513",
                  "&:hover": {
                    backgroundColor: "#6B3410",
                  },
                }}
              >
                ยืนยันการนัดหมาย
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ConfirmBookingPage;
