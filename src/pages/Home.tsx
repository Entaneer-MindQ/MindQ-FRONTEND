import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import CaseOpenIcon from "@mui/icons-material/AddBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Home = () => {
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const mockUserData = {
      cmuitaccount_name: "watunyoo_phana",
      cmuitaccount: "watunyoo_phana@cmu.ac.th",
      student_id: "650610804",
      firstname_TH: "วทัญญู",
      firstname_EN: "WATUNYOO",
      lastname_TH: "พนาไพศาลสกุล",
      lastname_EN: "PHANAPAISARNSAKUL",
      organization_name_TH: "คณะวิศวกรรมศาสตร์",
      itaccounttype_TH: "นักศึกษาปัจจุบัน",
    };
    setUserProfile(mockUserData);
  }, []);

  const steps = [
    {
      label: "เปิดเคส",
      description: "เริ่มต้นด้วยการเปิดเคสของคุณ",
      icon: <CaseOpenIcon />,
      content: (
        <Box sx={{ width: "100%", mt: 2 }}>
          <img
            src="src\utils\image 3 (1).png"
            alt="Example 1"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      ),
    },
    {
      label: "เข้า Facebook",
      description: "ติดตาม Facebook Page เพื่อรับสิทธิ์ในการจองคิว",
      icon: <FacebookIcon />,
      content: (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            href="https://www.facebook.com/EntaneerMindFriendCMU/"
            target="_blank"
            sx={{
              backgroundColor: "#4267B2",
              "&:hover": {
                backgroundColor: "#365899",
              },
            }}
          >
            EntaneerMindFriend CMU
          </Button>
        </Box>
      ),
    },
    {
      label: "รอการยืนยัน",
      description: "รอการตรวจสอบและยืนยันสิทธิ์",
      icon: <CheckCircleIcon />,
    },
  ];

  if (!userProfile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, ml: "100px" }}>
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          bgcolor: "#943131",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          ยินดีต้อนรับ
        </Typography>
        <Typography variant="h6">
          {userProfile.firstname_TH} {userProfile.lastname_TH}
        </Typography>
      </Paper>

      {/* Steps Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#943131",
            mb: 3,
          }}
        >
          <AccountBoxIcon sx={{ mr: 1 }} />
          ขั้นตอนการใช้งาน
        </Typography>

        <Stepper
          orientation="vertical"
          sx={{
            "& .MuiStepLabel-root": {
              py: 2,
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index} active={true}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      color: "#943131",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {step.icon}
                  </Box>
                )}
              >
                <Typography variant="h6" color="primary">
                  {step.label}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
                {step.content}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Profile Card */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "#943131",
            color: "white",
            p: 2,
          }}
        >
          <Typography variant="h6" align="center">
            ข้อมูลนักศึกษา
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  ชื่อ-นามสกุล
                </Typography>
                <Typography variant="body1">
                  {userProfile.firstname_TH} {userProfile.lastname_TH}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name-Surname
                </Typography>
                <Typography variant="body1">
                  {userProfile.firstname_EN} {userProfile.lastname_EN}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  รหัสนักศึกษา
                </Typography>
                <Typography variant="body1">
                  {userProfile.student_id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  คณะ
                </Typography>
                <Typography variant="body1">
                  {userProfile.organization_name_TH}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  CMU IT Account
                </Typography>
                <Typography variant="body1">
                  {userProfile.cmuitaccount}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  สถานะ
                </Typography>
                <Typography variant="body1">
                  {userProfile.itaccounttype_TH}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
