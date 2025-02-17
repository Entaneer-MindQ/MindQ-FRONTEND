import React, { useState } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AppointmentCard from "../components/AppointmentCard/AppointmentCard";
import CancellationDialog from "../components/CancellationDialog/CancellationDialog";
import useAccountData from "../hooks/useAccountData";
import "../styles/global.css";

// Account.tsx
const Account: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const { userProfile, queue, refreshData } = useAccountData();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3 },
        mt: { xs: "56px", sm: "64px", md: "80px" },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard userProfile={userProfile} isMobile={isMobile} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 2, sm: 3 },
                flexWrap: "wrap",
              }}
            >
              <EventNoteIcon sx={{ mr: 1, color: "var(--primary-color)" }} />
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                color="var(--primary-color)"
              >
                นัดหมายปัจจุบัน
              </Typography>
            </Box>

            <AppointmentCard
              queue={queue}
              isMobile={isMobile}
              onCancelClick={handleOpenDialog}
            />
          </Paper>
        </Grid>
      </Grid>

      <CancellationDialog
        open={openDialog}
        qid={queue.qid}
        onClose={handleCloseDialog}
        onSuccess={() => {
          refreshData();
          handleCloseDialog();
        }}
      />
    </Container>
  );
};

export default Account;
