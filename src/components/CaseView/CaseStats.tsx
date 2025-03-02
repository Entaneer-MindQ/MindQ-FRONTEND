import { Paper, Box, Typography, Fade } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CaseStatsProps } from "../../types/case-view";

export const CaseStats = ({ totalCases }: CaseStatsProps) => {
  return (
    <Fade in timeout={1200}>
      <Paper
        elevation={2}
        sx={{
          mt: 3,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          overflow: "hidden",
          border: "1px solid rgba(var(--primary-color-rgb), 0.15)",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(var(--primary-color-rgb), 0.05)",
            borderBottom: "1px solid rgba(var(--primary-color-rgb), 0.1)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            สรุปข้อมูล
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              py: 1,
            }}
          >
            <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
              {totalCases}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              เคสทั้งหมด
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};
