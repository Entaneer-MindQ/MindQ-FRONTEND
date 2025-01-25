import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Typography,
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CaseOpenIcon from "@mui/icons-material/AddBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { post } from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [cookies, _] = useCookies(["auth_token"]);

  // Add responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Sending cookies:", cookies);

      try {
        const response = await post("/api/user/profile", {
          token: cookies["auth_token"],
        });

        if (response.status === 200 && response.data?.cmuBasicInfo) {
          const basicInfo = response.data.cmuBasicInfo;
          const name = basicInfo.firstname_TH.concat(
            " ",
            basicInfo.lastname_TH
          );
          setUserProfile({
            personalID: basicInfo.student_id,
            email: basicInfo.cmuitaccount,
            faculty: basicInfo.organization_name_TH,
            major: basicInfo.organization_name_EN,
            degree: basicInfo.organization_code,
            role: basicInfo.itaccounttype_EN,
            name: name,
            name_EN: basicInfo.cmuitaccount_name,
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error details:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [cookies["auth_token"], navigate]);

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
            fullWidth={isMobile}
            sx={{
              backgroundColor: "#943131",
              "&:hover": { backgroundColor: "#7a2929" },
              mb: 2,
              maxWidth: isMobile ? "100%" : "300px",
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
            fullWidth={isMobile}
            sx={{
              backgroundColor: "#4267B2",
              "&:hover": { backgroundColor: "#365899" },
              mb: 2,
              maxWidth: isMobile ? "100%" : "300px",
            }}
          >
            EntaneerMindFriend CMU
          </Button>
          <Box
            component="img"
            src="src/utils/facebook_Photo.png"
            alt="Example 1"
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "1000px",
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
    <Container
      className="w-full text-center"
      sx={{
        mt: { xs: 2, sm: 3, md: 5 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 },
          bgcolor: "#943131",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
          ยินดีต้อนรับ
        </Typography>
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          {userProfile.name}
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            color: "#943131",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <AccountBoxIcon sx={{ mr: 1 }} />
          ขั้นตอนการใช้งาน
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              color: "#943131",
              mb: 2,
              borderBottom: "2px solid #943131",
              pb: 1,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            ส่วนที่ 1: การดำเนินการเพื่อให้ได้รับสิทธิ์
          </Typography>
          <Stepper
            orientation="vertical"
            sx={{
              "& .MuiStepLabel-root": {
                py: { xs: 1, sm: 1.5, md: 2 },
              },
              "& .MuiStepLabel-labelContainer": {
                mx: { xs: 1, sm: 2 },
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
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    color="primary"
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    color="text.secondary"
                  >
                    {step.description}
                  </Typography>
                  {step.content}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              color: "#943131",
              mb: 2,
              borderBottom: "2px solid #943131",
              pb: 1,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            ส่วนที่ 2: การจองคิวหลังจากได้รับการอนุมัติสิทธิ์
          </Typography>
          <Stepper
            orientation="vertical"
            sx={{
              "& .MuiStepLabel-root": {
                py: { xs: 1, sm: 1.5, md: 2 },
              },
              "& .MuiStepLabel-labelContainer": {
                mx: { xs: 1, sm: 2 },
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
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    color="primary"
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    color="text.secondary"
                  >
                    {step.description}
                  </Typography>
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
