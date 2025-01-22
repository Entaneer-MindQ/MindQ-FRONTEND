import { useEffect, useState} from "react";
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
} from "@mui/material";
import CaseOpenIcon from "@mui/icons-material/AddBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { post } from "../services/api";
import UserProfile from "../types/user";

interface ApiResponse {
  status:number,
  data: [UserProfile]
}

const Home = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile|null>(null);
  const [cookies, _] = useCookies(['auth_token']);

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
          console.error("User not found");
          navigate("/login");
        } else if (response.status === 401) {
          console.error("Unauthorized access");
          navigate("/login");
        } else if (response.status === 302) {
            console.error("Redirecting to login");
            navigate("/login");
        } else {
          console.error("Unknown error");
          navigate("/login");
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
          {userProfile.name}
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
