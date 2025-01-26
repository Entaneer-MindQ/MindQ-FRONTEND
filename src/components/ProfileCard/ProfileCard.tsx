import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "../../types/user";

interface ProfileCardProps {
  userProfile: UserProfile | null;
  isMobile: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, isMobile }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        background: "linear-gradient(135deg, #943131 0%, #B22222 100%)",
        color: "white",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            bgcolor: "white",
            color: "#943131",
            mb: 2,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: { xs: 50, sm: 60 } }} />
        </Avatar>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          align="center"
          gutterBottom
          sx={{ wordBreak: "break-word" }}
        >
          {userProfile?.name}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 1.5, wordBreak: "break-word" }}>
          <strong>CMU IT Account:</strong> {userProfile?.email}
        </Typography>
        <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
          <strong>สถานะ:</strong> {userProfile?.role}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileCard;
