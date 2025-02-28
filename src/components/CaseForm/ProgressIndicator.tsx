// src/components/CaseForm/ProgressIndicator.tsx
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { StepStatus } from "../../types/case";

interface ProgressIndicatorProps {
  stepStatus: StepStatus;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  stepStatus,
}) => {
  // คำนวณความคืบหน้าจากทั้ง 4 ขั้นตอน
  const completedSteps = Object.values(stepStatus).filter(Boolean).length;
  const totalSteps = Object.values(stepStatus).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // กำหนดลำดับของขั้นตอนและชื่อที่แสดง
  const orderedSteps = [
    { key: "contact", label: "ชื่อ และเบอร์โทรศัพท์" },
    { key: "facebook", label: "กรอกข้อมูล Facebook" },
    { key: "categories", label: "เลือกหมวดหมู่" },
    { key: "details", label: "ระบุรายละเอียด" },
  ];

  return (
    <Box
      sx={{
        mt: 3,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.9)",
        boxShadow: 1,
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
        ความคืบหน้าการกรอกข้อมูล: {progressPercentage.toFixed(0)}%
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        sx={{
          height: 8,
          borderRadius: 2,
          mb: 2,
          backgroundColor: "rgba(0,0,0,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor:
              progressPercentage === 100 ? "#4CAF50" : "var(--primary-color)",
          },
        }}
      />

      {/* แสดงตัวบ่งชี้ขั้นตอนเรียงตามลำดับการกรอกข้อมูล */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {orderedSteps.map(({ key, label }) => {
          const completed = stepStatus[key as keyof StepStatus];

          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                p: 1,
                borderRadius: 1,
                bgcolor: completed
                  ? "rgba(76, 175, 80, 0.1)"
                  : "rgba(244, 67, 54, 0.1)",
                border: `1px solid ${
                  completed
                    ? "rgba(76, 175, 80, 0.3)"
                    : "rgba(244, 67, 54, 0.3)"
                }`,
              }}
            >
              {completed ? (
                <CheckCircleIcon fontSize="small" sx={{ color: "#4CAF50" }} />
              ) : (
                <ErrorOutlineIcon fontSize="small" sx={{ color: "#F44336" }} />
              )}
              <Typography variant="body2">{label}</Typography>
            </Box>
          );
        })}
      </Box>

      {progressPercentage === 100 && (
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#4CAF50",
            mt: 1,
            fontWeight: "bold",
          }}
        >
          ข้อมูลครบถ้วน พร้อมส่ง!
        </Typography>
      )}
    </Box>
  );
};

export default ProgressIndicator;
