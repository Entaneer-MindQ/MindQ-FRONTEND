import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import { post } from "../services/api";
import { ApiResponse } from "../types/api";

import FacebookField from "../components/CaseForm/FacebookField";
import CategorySelection from "../components/CaseForm/CategorySelection";
import DescriptionField from "../components/CaseForm/DescriptionField";
import RoleSelection from "../components/CaseForm/RoleSelection";
import StepProgress from "../components/CaseForm/StepProgress";
import ProgressIndicator from "../components/CaseForm/ProgressIndicator";
import { useCaseForm } from "../hooks/useCaseForm";
import ContactInfoField from "../components/CaseForm/ContactInfoField";
import "../styles/global.css";

const categories = [
  "ความสัมพันธ์",
  "ความเครียด",
  "การงาน",
  "โรคทางจิตวิทยา",
  "การเงิน",
  "อื่น ๆ",
];

const steps = [
  {
    label: "กรอกข้อมูล Facebook",
    completed: false,
  },
  {
    label: "เลือกหมวดหมู่",
    completed: false,
  },
  {
    label: "ระบุรายละเอียด",
    completed: false,
  },
];

const CaseOpen: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [cookies] = useCookies(["auth_token"]);
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    stepStatus,
    activeStep,
    validateForm,
  } = useCaseForm();

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = (await post("/api/insertCase", {
        token: cookies["auth_token"],
        ...formData,
      })) as ApiResponse;

      if (response.status === 200) {
        alert("เคสถูกสร้างเรียบร้อยแล้ว");
        navigate("/case");
      }
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
        mt: { xs: "56px", sm: "64px", md: "80px" },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mx: "auto",
          maxWidth: theme.breakpoints.values.lg,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "var(--primary-color)",
            color: "white",
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <HelpOutlineIcon />
            สร้างเคสใหม่
          </Typography>

          <StepProgress
            activeStep={activeStep}
            steps={steps.map((step, index) => ({
              ...step,
              completed: Object.values(stepStatus)[index],
            }))}
          />
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* เพิ่มคอมโพเนนต์สำหรับรับชื่อเล่นและเบอร์โทรศัพท์ */}
          <ContactInfoField
            nickname={formData.nickname}
            phone={formData.phone}
            onChange={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }));
              setErrors((prev) => ({ ...prev, [field]: false }));
            }}
            error={{
              nickname: errors.nickname,
              phone: errors.phone,
            }}
            isValid={stepStatus.contact}
          />

          <FacebookField
            value={formData.facebookURL}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, facebookURL: value }));
              setErrors((prev) => ({ ...prev, facebookURL: false }));
            }}
            error={errors.facebookURL}
            isValid={stepStatus.facebook}
          />

          <CategorySelection
            categories={categories}
            selectedCategories={formData.topic}
            onChange={(category) => {
              setFormData((prev) => ({
                ...prev,
                topic: prev.topic.includes(category)
                  ? prev.topic.filter((c) => c !== category)
                  : [...prev.topic, category],
              }));
              setErrors((prev) => ({ ...prev, topic: false }));
            }}
            error={errors.topic}
            isValid={stepStatus.categories}
          />

          <DescriptionField
            value={formData.description}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, description: value }));
              setErrors((prev) => ({ ...prev, description: false }));
            }}
            error={errors.description}
            isValid={stepStatus.details}
          />

          <RoleSelection
            value={formData.role}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, role: value }));
            }}
          />

          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
              disabled={
                !stepStatus.facebook ||
                !stepStatus.categories ||
                !stepStatus.details ||
                !stepStatus.contact
              }
              fullWidth={isMobile}
              sx={{
                backgroundColor:
                  stepStatus.facebook &&
                  stepStatus.categories &&
                  stepStatus.details
                    ? "#4CAF50"
                    : "#943131",
                "&:hover": {
                  backgroundColor:
                    stepStatus.facebook &&
                    stepStatus.categories &&
                    stepStatus.details
                      ? "#45a049"
                      : "#7a2828",
                },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                  color: "#9e9e9e",
                },
              }}
            >
              {stepStatus.facebook &&
              stepStatus.categories &&
              stepStatus.details
                ? "ส่งข้อมูล"
                : "กรุณากรอกข้อมูลให้ครบถ้วน"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <ProgressIndicator stepStatus={stepStatus} />
    </Container>
  );
};

export default CaseOpen;
