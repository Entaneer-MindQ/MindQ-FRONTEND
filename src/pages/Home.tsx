import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const Home: React.FC = () => {
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(
    null
  );

  // Simulate fetching user data from OAuth
  React.useEffect(() => {
    const mockUserData: UserProfile = {
      cmuitaccount_name: "watunyoo_phana",
      cmuitaccount: "watunyoo_phana@cmu.ac.th",
      student_id: "650610804",
      prename_id: "OTH",
      prename_TH: "",
      prename_EN: "",
      firstname_TH: "วทัญญู",
      firstname_EN: "WATUNYOO",
      lastname_TH: "พนาไพศาลสกุล",
      lastname_EN: "PHANAPAISARNSAKUL",
      organization_code: "06",
      organization_name_TH: "คณะวิศวกรรมศาสตร์",
      organization_name_EN: "Faculty of Engineering",
      itaccounttype_id: "StdAcc",
      itaccounttype_TH: "นักศึกษาปัจจุบัน",
      itaccounttype_EN: "Student Account",
    };
    setUserProfile(mockUserData);
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            ข้อมูลนักศึกษา
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              ชื่อ-นามสกุล
            </Typography>
            <Typography variant="body1">
              {userProfile.firstname_TH} {userProfile.lastname_TH}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Name-Surname
            </Typography>
            <Typography variant="body1">
              {userProfile.firstname_EN} {userProfile.lastname_EN}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              รหัสนักศึกษา
            </Typography>
            <Typography variant="body1">{userProfile.student_id}</Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              คณะ
            </Typography>
            <Typography variant="body1">
              {userProfile.organization_name_TH}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              CMU IT Account
            </Typography>
            <Typography variant="body1">{userProfile.cmuitaccount}</Typography>
          </Box>

          <Box sx={{ my: 2 }}>
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
