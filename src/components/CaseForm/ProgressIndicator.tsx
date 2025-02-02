// src/components/CaseForm/ProgressIndicator.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StepStatus } from "../../types/case";

interface ProgressIndicatorProps {
  stepStatus: StepStatus;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  stepStatus,
}) => (
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
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        color: "#666",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      ความคืบหน้าการกรอกข้อมูล:{" "}
      {((Object.values(stepStatus).filter(Boolean).length / 3) * 100).toFixed(
        0
      )}
      %
      {stepStatus.facebook && stepStatus.categories && stepStatus.details && (
        <CheckCircleIcon sx={{ color: "#4CAF50", verticalAlign: "middle" }} />
      )}
    </Typography>
  </Box>
);

export default ProgressIndicator;
