import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { Grow } from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { CaseCardProps } from "../../types/case-view";
import { useState, useEffect } from "react";
import "../../styles/global.css";

export const CaseCard = ({ caseItem }: CaseCardProps) => {
  // ตัวแปรพื้นฐาน
  const navigate = useNavigate();
  const { setIsBookingFlow, setSelectedCaseId } = useBooking();

  const [expanded, setExpanded] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const {setMindCode} = useBooking();


  // ตรวจสอบความยาวข้อความเมื่อข้อมูลเปลี่ยนแปลง
  useEffect(() => {
    // ถ้ามีคำอธิบาย และความยาวเกิน 100 ตัวอักษร ถือว่าเป็นข้อความยาว
    if (caseItem.description && caseItem.description.length > 100) {
      setIsLongText(true);
    } else {
      setIsLongText(false);
    }
  }, [caseItem.description]);

  // ฟังก์ชันสลับการแสดงผลข้อความ
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // ฟังก์ชันไปยังหน้าจองคิว
  const handleBooking = () => {
    setIsBookingFlow(true);
    setSelectedCaseId(caseItem.cid);
    setMindCode(caseItem.mind_code? caseItem.mind_code: "");
    navigate("/calendar");
  };

  // ฟังก์ชันแสดงข้อความที่เหมาะสม
  const getDescription = () => {
    // ถ้าไม่มีคำอธิบาย
    if (!caseItem.description) {
      return "ไม่มีรายละเอียด";
    }

    // ถ้าเป็นข้อความยาวและยังไม่ขยาย
    if (isLongText && !expanded) {
      return `${caseItem.description.substring(0, 100)}...`;
    }

    // กรณีอื่นๆ แสดงข้อความเต็ม
    return caseItem.description;
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
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* ส่วนหัวข้อ */}
          <Box
            sx={{
              p: 2,
              pb: 1.5,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              backgroundColor: "rgba(var(--primary-color-rgb), 0.05)",
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <SubjectIcon color="primary" sx={{ fontSize: 22 }} />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                {Array.isArray(caseItem.topic)
                  ? caseItem.topic.join(", ")
                  : caseItem.topic}
              </Typography>
            </Box>
          </Box>

          {/* ส่วนรายละเอียด */}
          <Box sx={{ p: 2, pb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                wordBreak: "break-word",
              }}
            >
              <span style={{ fontWeight: 500 }}>รายละเอียด : </span>
              {getDescription()}

              {/* ปุ่มอ่านเพิ่มเติม แสดงเฉพาะเมื่อเป็นข้อความยาว */}
              {isLongText && (
                <span
                  onClick={toggleExpanded}
                  style={{
                    marginLeft: "4px",
                    cursor: "pointer",
                    color: "#757575",
                    fontWeight: 400,
                    fontSize: "0.9em",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#1976d2")} // เปลี่ยนเป็นสีเทาเมื่อ hover
                  onMouseOut={(e) => (e.currentTarget.style.color = "#757575")} // เปลี่ยนกลับเป็นสีน้ำเงินเมื่อไม่ hover
                >
                  {expanded ? " แสดงน้อยลง" : " อ่านเพิ่มเติม"}
                </span>
              )}
            </Typography>
          </Box>

          {/* ส่วนท้าย */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              pt: 1,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              backgroundColor: "rgba(0,0,0,0.02)",
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthIcon
                sx={{ fontSize: 18, color: "text.secondary" }}
              />
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
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--hover-color)",
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    color: "var(--hover-text-color)",
                  },
                  borderRadius: 8,
                  px: 2,
                  py: 0.75,
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
