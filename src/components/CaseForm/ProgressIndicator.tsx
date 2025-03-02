import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { StepStatus } from "../../types/case";

interface ProgressIndicatorProps {
  stepStatus: StepStatus;
  sx?: Record<string, any>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  stepStatus,
  sx = {},
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

  // Based on background context, determine proper text colors for contrast
  const isOnDarkBackground = sx?.isOnDarkBackground ?? true;

  return (
    <Box
      sx={{
        mt: 3,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: isOnDarkBackground
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.9)",
        boxShadow: 1,
        maxWidth: "100%",
        mx: "auto",
        ...sx,
      }}
    >
      <Typography
        variant="body1"
        fontWeight="600"
        sx={{
          mb: 1,
          color: isOnDarkBackground ? "#000000" : "inherit",
        }}
      >
        ความคืบหน้าการกรอกข้อมูล: {progressPercentage.toFixed(0)}%
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        sx={{
          height: 8,
          borderRadius: 2,
          mb: 2,
          backgroundColor: "rgba(0,0,0,0.15)",
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
                  ? "rgba(76, 175, 80, 0.15)"
                  : "rgba(244, 67, 54, 0.15)",
                border: `1px solid ${
                  completed
                    ? "rgba(76, 175, 80, 0.5)"
                    : "rgba(244, 67, 54, 0.5)"
                }`,
              }}
            >
              {completed ? (
                <CheckCircleIcon fontSize="small" sx={{ color: "#097209" }} />
              ) : (
                <ErrorOutlineIcon fontSize="small" sx={{ color: "#d32f2f" }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  fontWeight: "500",
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {progressPercentage === 100 && (
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#097209",
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
