import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Link,
  Card,
  CardContent,
  Container,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useCookies } from "react-cookie";
import { post } from "../services/api";
import UserProfile from "../types/user";

interface ApiResponse {
  status:number,
  data: [UserProfile]
}

interface Appointment {
  topic: string;
  description: string;
  date: string;
  time: string;
  status: string;
}

const Account: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [cookies, _] = useCookies(['auth_token']);
  const [userProfile , setUserProfile] = useState<UserProfile|null>(null);

  useEffect(() => {
      const fetchUserProfile = async () => {
        // Log the token being sent
        console.log("Sending cookies:", cookies);
        
        try {
          const response = await post(
            "/api/user/profile",
            {
              token: cookies['auth_token'],
            },
          ) as ApiResponse;
          if (response.status === 200 && response.data) {
            setUserProfile({
              personalID: response.data[0].personalID,
              mind_code: response.data[0].mind_code,
              email: response.data[0].email,
              faculty: response.data[0].faculty,
              major: response.data[0].major,
              degree: response.data[0].degree,
              role: response.data[0].role,
              temp_status: response.data[0].temp_status,
              name: response.data[0].name,
              name_EN: response.data[0].name_EN,
            });
            console.log("Updated userProfile:", response.data);
          } else if (response.status === 404) {
            // setError(response.message || "No cases found");
            console.log("No user profile found");
          }
        } catch (error) {
          console.error("Error details:", {
            message: (error as any).message,
            response: (error as any).response?.data,
            status: (error as any).response?.status
          });
        }
      };
  
      // Call the fetch function
      fetchUserProfile();
      
    }, [cookies['auth_token']]); // Re-run if the cookie changes

  const currentAppointment: Appointment = {
    topic: "การเงิน",
    description:
      "efdsjqfoisjfldsdlifjlsdjfisjdfjisofijilsdfjisdjfoijsiodfijosdf",
    date: "Friday, 6th December 2024",
    time: "10.00 - 11.00",
    status: "จองตัวแล้ว",
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCancellationReason("");
  };

  const handleCancelAppointment = () => {
    console.log("Cancellation reason:", cancellationReason);
    // Add your cancellation logic here
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, ml: "100px", mr: 4 }}>
      {/* Back Button */}
      <Link
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            color: "#943131",
          },
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} />
        <Typography>ย้อนกลับ</Typography>
      </Link>

      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: "linear-gradient(135deg, #943131 0%, #B22222 100%)",
              color: "white",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "white",
                  color: "#943131",
                  mb: 2,
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h6" align="center" gutterBottom>
                {userProfile?.name}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                <strong>เลขประจำตัวคนไข้:</strong> {userProfile?.mind_code}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                <strong>CMU IT Account:</strong> {userProfile?.email}
              </Typography>
              <Typography variant="body1">
                <strong>ตำแหน่ง:</strong> {userProfile?.role}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Appointment Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <EventNoteIcon sx={{ mr: 1, color: "#943131" }} />
              <Typography variant="h5" component="h2" color="#943131">
                นัดหมายปัจจุบัน
              </Typography>
            </Box>

            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>หัวข้อ:</strong> {currentAppointment.topic}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{
                        mb: 2,
                        maxWidth: "100%",
                        wordWrap: "break-word",
                      }}
                    >
                      <strong>รายละเอียด:</strong>{" "}
                      {currentAppointment.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>วันที่:</strong> {currentAppointment.date}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>เวลา:</strong> {currentAppointment.time}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>สถานะ:</strong>{" "}
                      <Box
                        component="span"
                        sx={{
                          bgcolor: "#E8F5E9",
                          color: "#2E7D32",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.875rem",
                        }}
                      >
                        {currentAppointment.status}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "flex-start", sm: "flex-end" },
                      alignItems: "flex-start",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleOpenDialog}
                      sx={{
                        backgroundColor: "#943131",
                        "&:hover": {
                          backgroundColor: "#B22222",
                        },
                        borderRadius: 2,
                        px: 3,
                      }}
                    >
                      ยกเลิกนัด
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      {/* Cancellation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "#943131" }}>ยกเลิกการนัดหมาย</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            กรุณาระบุสาเหตุการยกเลิกนัด
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="ระบุสาเหตุการยกเลิกนัด"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#943131",
              "&:hover": {
                backgroundColor: "rgba(148, 49, 49, 0.04)",
              },
            }}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleCancelAppointment}
            variant="contained"
            sx={{
              backgroundColor: "#943131",
              "&:hover": {
                backgroundColor: "#B22222",
              },
            }}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Account;
