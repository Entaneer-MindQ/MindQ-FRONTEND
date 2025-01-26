import { Container, Paper, Typography, Box } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WelcomeBanner from "../components/HomeCard/WelcomeBanner";
import CustomStepper from "../components/HomeCard/CustomStepper";
import { useUserProfile } from "../hooks/useUserProfile";
import { useResponsive } from "../hooks/useResponsive";
import useSteps from "../hooks/useSteps";

const Home: React.FC = () => {
  const { userProfile, loading } = useUserProfile();
  const { isMobile } = useResponsive();
  const { approvalSteps, bookingSteps } = useSteps(isMobile);

  if (loading || !userProfile) {
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
      sx={{ mt: { xs: 2, sm: 3, md: 5 }, px: { xs: 2, sm: 3, md: 4 } }}
    >
      <WelcomeBanner name={userProfile.name} isMobile={isMobile} />

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

        <CustomStepper
          steps={approvalSteps}
          title="ส่วนที่ 1: การดำเนินการเพื่อให้ได้รับสิทธิ์"
          isMobile={isMobile}
        />

        <CustomStepper
          steps={bookingSteps}
          title="ส่วนที่ 2: การจองคิวหลังจากได้รับการอนุมัติสิทธิ์"
          isMobile={isMobile}
        />
      </Paper>
    </Container>
  );
};

export default Home;
