import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingState = () => {
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
};
