import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const Home = () => {
  const [userProfile, setUserProfile] = React.useState(null);

  // Simulate fetching user data
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

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Box sx={{ bgcolor: "grey.200", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          1.เปิดเคส
        </Typography>
        <Box sx={{ bgcolor: "white", borderRadius: 1, p: 2, mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <img
              src="src\utils\image 3 (1).png"
              alt="Example 1"
              style={{ width: "100%", height: "auto", marginBottom: "10px" }}
            />
            {/* <img
              src="src\utils\image 4.png"
              alt="Example 2"
              style={{ width: "100%", height: "auto" }}
            /> */}
          </Box>
        </Box>
        <Typography variant="h6">
          2.เข้าFacebook: https://www.facebook.com/EntaneerMindFriendCMU/
          เพื่อให้ได้รับสิทธิ์ในการจองคิว
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 600, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            ข้อมูลนักศึกษา
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              ชื่อ-นามสกุล
            </Typography>
            <Typography variant="body1">
              {userProfile.firstname_TH} {userProfile.lastname_TH}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Name-Surname
            </Typography>
            <Typography variant="body1">
              {userProfile.firstname_EN} {userProfile.lastname_EN}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              รหัสนักศึกษา
            </Typography>
            <Typography variant="body1">{userProfile.student_id}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              คณะ
            </Typography>
            <Typography variant="body1">
              {userProfile.organization_name_TH}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              CMU IT Account
            </Typography>
            <Typography variant="body1">{userProfile.cmuitaccount}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              สถานะ
            </Typography>
            <Typography variant="body1">
              {userProfile.itaccounttype_TH}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
