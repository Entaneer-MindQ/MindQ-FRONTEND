import { useNavigate } from "react-router-dom";
import { Container, Paper, Box, Typography, Alert, Fade } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useCases } from "../hooks/useCases";
import { CaseCard } from "../components/CaseView/CaseCard";
//import { CaseStats } from "../components/CaseView/CaseStats";
import { LoadingState } from "../components/CaseView/LoadingState";
import { ErrorState } from "../components/CaseView/ErrorState";
import "../styles/global.css";

const CaseView = () => {
  const { cases, loading, error } = useCases();
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/calendar");
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--primary-color)",
              color: "white",
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <HistoryIcon sx={{ fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              ข้อมูลเคสของคุณ
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            {cases.length === 0 ? (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 2,
                  fontSize: "1rem",
                  py: 2,
                  "& .MuiAlert-icon": {
                    fontSize: "2rem",
                  },
                }}
              >
                ไม่พบข้อมูล กรุณาสร้างเคสใหม่เพื่อเริ่มการปรึกษา
              </Alert>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {cases.map((caseItem) => (
                  <CaseCard
                    key={caseItem.cid}
                    caseItem={caseItem}
                    onBooking={handleBooking}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Fade>

      {/* {cases.length > 0 && <CaseStats totalCases={cases.length} />} */}
    </Container>
  );
};

export default CaseView;
