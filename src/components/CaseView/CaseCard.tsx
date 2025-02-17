import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { Grow } from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { CaseCardProps } from "../../types/case-view";
import "../../styles/global.css";

export const CaseCard = ({ caseItem }: CaseCardProps) => {
  const navigate = useNavigate();
  const { setIsBookingFlow, setSelectedCaseId } = useBooking();

  const handleBooking = () => {
    setIsBookingFlow(true);
    setSelectedCaseId(caseItem.cid);
    navigate("/calendar");
  };

  return (
    <Grow in timeout={500}>
      <Card
        sx={{
          borderRadius: 2,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <SubjectIcon color="primary" />
            <Typography variant="h6" color="primary">
              {Array.isArray(caseItem.topic)
                ? caseItem.topic.join(", ")
                : caseItem.topic}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: "text.secondary",
              pl: 4,
            }}
          >
            {caseItem.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                วันที่สร้าง:{" "}
                {new Date(caseItem.created_at).toLocaleDateString("th-TH")}
              </Typography>
            </Box>

            {caseItem.mind_code && (
              <Button
                variant="contained"
                onClick={handleBooking}
                startIcon={<EventAvailableIcon />}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--primary-color-dark)",
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  boxShadow: 2,
                  transition: "all 0.2s",
                }}
              >
                จองคิว
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};
