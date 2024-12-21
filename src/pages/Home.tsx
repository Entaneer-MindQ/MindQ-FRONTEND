import React from "react";
import { useNavigate } from "react-router-dom";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Home = () => {
  const navigate = useNavigate();
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

  const handleCaseOpen = () => {
    navigate("/case-open");
  };

  const approvalSteps = [
    {
      label: "เปิดเคส",
      description: "เริ่มต้นด้วยการเปิดเคสของคุณ",
      icon: <CaseOpenIcon />,
      content: (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<CaseOpenIcon />}
            onClick={handleCaseOpen}
            sx={{
              backgroundColor: "#943131",
              "&:hover": {
                backgroundColor: "#7a2929",
              },
              mb: 2,
            }}
          >
            เริ่มต้นเปิดเคส
          </Button>
        </Box>
      ),
    },
    {
      label: "เข้า Facebook",
      description: "ทักแชท Facebook Page เพื่อรับสิทธิ์ในการจองคิว",
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
              mb: 2,
            }}
          >
            EntaneerMindFriend CMU
          </Button>
          <img
            src="src\utils\facebook_Photo.png"
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
      label: "รอการยืนยัน",
      description: "รอการตรวจสอบและยืนยันสิทธิ์",
      icon: <CheckCircleIcon />,
    },
  ];

  const bookingSteps = [
    {
      label: "เลือกวันเวลาที่ต้องการ",
      description: "เลือกช่วงเวลาที่สะดวกในการรับคำปรึกษา",
      icon: <CalendarMonthIcon />,
    },
    {
      label: "ยืนยันการจอง",
      description: "ตรวจสอบและยืนยันการจองของคุณ",
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
      {/* Rest of the component remains the same */}
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

        {/* ส่วนที่ 1: การขอสิทธิ์ */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#943131",
              mb: 2,
              borderBottom: "2px solid #943131",
              pb: 1,
            }}
          >
            ส่วนที่ 1: การดำเนินการเพื่อให้ได้รับสิทธิ์
          </Typography>
          <Stepper
            orientation="vertical"
            sx={{
              "& .MuiStepLabel-root": {
                py: 2,
              },
            }}
          >
            {approvalSteps.map((step, index) => (
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
        </Box>

        {/* ส่วนที่ 2: การจองคิว */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#943131",
              mb: 2,
              borderBottom: "2px solid #943131",
              pb: 1,
            }}
          >
            ส่วนที่ 2: การจองคิวหลังจากได้รับการอนุมัติสิทธิ์
          </Typography>
          <Stepper
            orientation="vertical"
            sx={{
              "& .MuiStepLabel-root": {
                py: 2,
              },
            }}
          >
            {bookingSteps.map((step, index) => (
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
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
