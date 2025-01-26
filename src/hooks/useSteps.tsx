import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { StepItem } from "../types";
import CaseOpenIcon from "@mui/icons-material/AddBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StepButton from "../components/HomeCard/StepButton";

const useSteps = (isMobile: boolean) => {
  const navigate = useNavigate();

  const handleCaseOpen = () => {
    navigate("/case-open");
  };

  const approvalSteps: StepItem[] = [
    {
      label: "เปิดเคส",
      description: "เริ่มต้นด้วยการเปิดเคสของคุณ",
      icon: <CaseOpenIcon />,
      content: (
        <StepButton
          icon={<CaseOpenIcon />}
          onClick={handleCaseOpen}
          isMobile={isMobile}
          backgroundColor="#943131"
          hoverColor="#7a2929"
        >
          เริ่มต้นเปิดเคส
        </StepButton>
      ),
    },
    {
      label: "เข้า Facebook",
      description: "ทักแชท Facebook Page เพื่อรับสิทธิ์ในการจองคิว",
      icon: <FacebookIcon />,
      content: (
        <>
          <StepButton
            icon={<FacebookIcon />}
            href="https://www.facebook.com/EntaneerMindFriendCMU/"
            target="_blank"
            isMobile={isMobile}
            backgroundColor="#4267B2"
            hoverColor="#365899"
          >
            EntaneerMindFriend CMU
          </StepButton>
          <Box
            component="img"
            src="src/utils/facebook_Photo.png"
            alt="Facebook Page"
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "1000px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </>
      ),
    },
    {
      label: "รอการยืนยัน",
      description: "รอการตรวจสอบและยืนยันสิทธิ์",
      icon: <CheckCircleIcon />,
    },
  ];

  const bookingSteps: StepItem[] = [
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

  const getStepStatus = (stepIndex: number) => {
    return {
      completed: stepIndex < 1,
      active: stepIndex === 1,
      disabled: stepIndex > 1,
    };
  };

  return {
    approvalSteps,
    bookingSteps,
    getStepStatus,
  };
};

export default useSteps;
