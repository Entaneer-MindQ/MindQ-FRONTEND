import { Paper, Box, Typography, Fade } from "@mui/material";
import { CaseStatsProps } from "../../types/case-view";

export const CaseStats = ({ totalCases }: CaseStatsProps) => {
  return (
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
            {totalCases}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            เคสทั้งหมด
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};
