import { Paper, Typography } from "@mui/material";
import { WelcomeBannerProps } from "../../types";
import "../../styles/global.css";

export const WelcomeBanner = ({ name, isMobile }: WelcomeBannerProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        mb: { xs: 2, sm: 3, md: 4 },
        bgcolor: "var(--primary-color)",
        color: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
        ยินดีต้อนรับ
      </Typography>
      <Typography variant={isMobile ? "subtitle1" : "h6"}>{name}</Typography>
    </Paper>
  );
};
