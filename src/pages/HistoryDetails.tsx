import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

const HistoryDetails: React.FC = () => {
  // ตัวอย่างข้อมูล
  const appointments = [
    {
      topic: "การเงิน",
      description:
        "efsdjfdoisjfldsdlifjsldfjisjdfjisjofijlsdjfisjdoifjsiodfjiosdf",
      date: "Friday, 6th December 2024",
      time: "10.00 - 11.00",
      status: "จองคิวแล้ว",
      statusColor: "green",
    },
    {
      topic: "การเงิน",
      description: "qlwjfldfmgpowjdskgowiherowsjgowjtoewrtjowejroi",
      date: "Monday, 10th January 2024",
      time: "13.00 - 14.00",
      status: "ยกเลิกคิว",
      statusColor: "red",
      reason: "ติดเรียน",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ส่วนข้อมูลผู้ใช้ */}
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d1c5c5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Name: ธีระพันธ์ พันธุ์วรรณะสิน
          </Typography>
          <Typography>เลขประจำตัวคนไข้: 2024/001</Typography>
          <Typography>CMU IT Account: theeraphan_p@cmu.ac.th</Typography>
          <Typography>ตำแหน่ง: นักศึกษา</Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: "bold",
          }}
        >
          จองคิวเพิ่ม
        </Button>
      </Paper>

      {/* ส่วน Appointment History */}
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
            marginBottom: "10px",
          }}
        >
          Appointment History
        </Typography>

        {/* แสดงข้อมูลนัดหมาย */}
        {appointments.map((appointment, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              padding: "15px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Typography>
              <strong>Topic:</strong> {appointment.topic}
            </Typography>
            <Typography>
              <strong>Description:</strong> {appointment.description}
            </Typography>
            <Typography>
              <strong>Date:</strong> {appointment.date}
            </Typography>
            <Typography>
              <strong>Time:</strong> {appointment.time}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: appointment.statusColor,
              }}
            >
              <strong>Status:</strong> {appointment.status}
            </Typography>
            {appointment.reason && (
              <Typography sx={{ fontStyle: "italic" }}>
                <strong>เหตุผล:</strong> {appointment.reason}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default HistoryDetails;
