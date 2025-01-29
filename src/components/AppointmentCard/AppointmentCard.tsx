import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import type { Queue } from "../../types/queue";

interface AppointmentCardProps {
  queue: Queue;
  isMobile: boolean;
  onCancelClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  queue,
  isMobile,
  onCancelClick,
}) => {
  const hasAppointment = queue.qid !== " " && queue.qid !== "";

  const renderAppointmentDetails = () => {
    if (!hasAppointment) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            ยังไม่มีการจอง
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ wordBreak: "break-word" }}
          >
            <strong>หัวข้อ:</strong>{" "}
            {Array.isArray(queue.topic) ? queue.topic.join(", ") : queue.topic}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ mb: 2, wordBreak: "break-word" }}
          >
            <strong>รายละเอียด:</strong> {queue.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>วันที่:</strong> {queue.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>เวลา:</strong> {queue.slot}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <strong>สถานะ:</strong>
            <Box
              component="span"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.875rem",
                display: "inline-block",
              }}
            >
              จองแล้ว
            </Box>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            alignItems: { xs: "stretch", md: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            onClick={onCancelClick}
            fullWidth={isMobile}
            sx={{
              backgroundColor: "#943131",
              "&:hover": { backgroundColor: "#B22222" },
              borderRadius: 2,
              px: 3,
              mt: { xs: 2, md: 0 },
            }}
          >
            ยกเลิกนัด
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {renderAppointmentDetails()}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
