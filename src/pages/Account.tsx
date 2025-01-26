import React, { useState } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AppointmentCard from "../components/AppointmentCard/AppointmentCard";
import CancellationDialog from "../components/CancellationDialog/CancellationDialog";
import useAccountData from "../hooks/useAccountData";

const Account: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const { userProfile, queue } = useAccountData();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCancellationReason("");
  };

  const handleCancelAppointment = () => {
    console.log("Cancellation reason:", cancellationReason);
    handleCloseDialog();
  };

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
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <ProfileCard userProfile={userProfile} isMobile={isMobile} />
        </Grid>

        {/* Appointment Section */}
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
              <EventNoteIcon sx={{ mr: 1, color: "#943131" }} />
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                color="#943131"
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
        reason={cancellationReason}
        onClose={handleCloseDialog}
        onConfirm={handleCancelAppointment}
        onReasonChange={setCancellationReason}
      />
    </Container>
  );
};

export default Account;
