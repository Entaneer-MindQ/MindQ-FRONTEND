import React, { useState, useEffect } from "react";
import { post } from "../services/api.ts";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  StepIcon,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface CaseData {
  facebookURL: string;
  topic: string[];
  description: string;
  role: "Student" | "Employee";
  approve: boolean;
}

interface FormErrors {
  facebookURL: boolean;
  topic: boolean;
  description: boolean;
  role: boolean;
}

interface StepStatus {
  facebook: boolean;
  categories: boolean;
  details: boolean;
}

const CaseOpen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CaseData>({
    facebookURL: "",
    topic: [],
    description: "",
    role: "Student",
    approve: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    facebookURL: false,
    topic: false,
    description: false,
    role: false,
  });

  const [stepStatus, setStepStatus] = useState<StepStatus>({
    facebook: false,
    categories: false,
    details: false,
  });

  const [activeStep, setActiveStep] = useState(0);

  const categories = [
    "ความสัมพันธ์",
    "ความเครียด",
    "การงาน",
    "โรคทางจิตวิทยา",
    "การเงิน",
    "อื่น ๆ",
  ];

  // ตรวจสอบความถูกต้องของ Facebook URL
  const isValidFacebookURL = (url: string): boolean => {
    return url.includes("facebook.com/") && url.length > 13;
  };

  // อัปเดตสถานะของขั้นตอนต่างๆ
  useEffect(() => {
    setStepStatus({
      facebook: isValidFacebookURL(formData.facebookURL),
      categories: formData.topic.length > 0,
      details: formData.description.trim().length > 0,
    });
  }, [formData]);

  // อัปเดต activeStep ตามสถานะการกรอกข้อมูล
  useEffect(() => {
    if (stepStatus.facebook && stepStatus.categories && stepStatus.details) {
      setActiveStep(3);
    } else if (stepStatus.facebook && stepStatus.categories) {
      setActiveStep(2);
    } else if (stepStatus.facebook) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [stepStatus]);

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      topic: prev.topic.includes(category)
        ? prev.topic.filter((c) => c !== category)
        : [...prev.topic, category],
    }));
    setErrors((prev) => ({ ...prev, topic: false }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      facebookURL: !isValidFacebookURL(formData.facebookURL),
      topic: formData.topic.length === 0,
      description: formData.description.trim() === "",
      role: false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await post<{ message: string }>(
        "/api/createCase",
        formData
      );
      localStorage.setItem("facebookURL", formData.facebookURL);
      alert("เคสถูกสร้างเรียบร้อยแล้ว");
      navigate("/case");
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const steps = [
    {
      label: "กรอกข้อมูล Facebook",
      completed: stepStatus.facebook,
    },
    {
      label: "เลือกหมวดหมู่",
      completed: stepStatus.categories,
    },
    {
      label: "ระบุรายละเอียด",
      completed: stepStatus.details,
    },
  ];

  // Custom StepIcon component
  const CustomStepIcon = (props: any) => {
    const { completed } = props;
    return completed ? (
      <CheckCircleIcon sx={{ color: "#4CAF50" }} />
    ) : (
      <StepIcon {...props} />
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, ml: "100px" }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ bgcolor: "#943131", color: "white", p: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <HelpOutlineIcon />
            สร้างเคสใหม่
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
            {steps.map((step, index) => (
              <Step key={index} completed={step.completed}>
                <StepLabel
                  StepIconComponent={CustomStepIcon}
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: step.completed ? "#4CAF50" : "white",
                      marginTop: 1,
                    },
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Facebook URL Field */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Facebook URL"
              value={formData.facebookURL}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  facebookURL: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, facebookURL: false }));
              }}
              error={errors.facebookURL}
              helperText={
                errors.facebookURL ? "กรุณากรอก URL Facebook ที่ถูกต้อง" : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon
                      color={stepStatus.facebook ? "success" : "primary"}
                    />
                  </InputAdornment>
                ),
                endAdornment: stepStatus.facebook && (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ),
              }}
              placeholder="https://facebook.com/your.profile"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: stepStatus.facebook ? "#4CAF50" : "#943131",
                  },
                },
              }}
            />
          </Box>

          {/* Categories */}
          <FormControl
            component="fieldset"
            error={errors.topic}
            sx={{ mb: 4, width: "100%" }}
          >
            <FormLabel
              component="legend"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: stepStatus.categories ? "#4CAF50" : "rgba(0, 0, 0, 0.6)",
              }}
            >
              <InfoIcon color={stepStatus.categories ? "success" : "primary"} />
              หมวดหมู่ของคำปรึกษา (เลือกได้หลายหมวดหมู่)*
            </FormLabel>
            <FormGroup>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {categories.map((category) => (
                  <Paper
                    key={category}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      bgcolor: formData.topic.includes(category)
                        ? "#f5e6e6"
                        : "white",
                      border: 1,
                      borderColor: formData.topic.includes(category)
                        ? stepStatus.categories
                          ? "#4CAF50"
                          : "#943131"
                        : "grey.300",
                      "&:hover": {
                        bgcolor: "#f5e6e6",
                        borderColor: stepStatus.categories
                          ? "#4CAF50"
                          : "#943131",
                      },
                    }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.topic.includes(category)}
                          sx={{
                            color: stepStatus.categories
                              ? "#4CAF50"
                              : "#943131",
                            "&.Mui-checked": {
                              color: stepStatus.categories
                                ? "#4CAF50"
                                : "#943131",
                            },
                          }}
                        />
                      }
                      label={category}
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Paper>
                ))}
              </Box>
            </FormGroup>
            {errors.topic && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                กรุณาเลือกอย่างน้อย 1 หมวดหมู่
              </Typography>
            )}
          </FormControl>

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="รายละเอียด"
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, description: false }));
              }}
              error={errors.description}
              helperText={errors.description ? "กรุณากรอกรายละเอียด" : ""}
              InputProps={{
                endAdornment: stepStatus.details && (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: stepStatus.details ? "#4CAF50" : "#943131",
                  },
                },
              }}
            />
          </Box>

          {/* Role Selection */}
          <FormControl component="fieldset" sx={{ mb: 4, width: "100%" }}>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              สถานะ
            </FormLabel>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Paper
                elevation={formData.role === "Student" ? 3 : 1}
                sx={{
                  flex: 1,
                  p: 2,
                  cursor: "pointer",
                  bgcolor: formData.role === "Student" ? "#f5e6e6" : "white",
                  "&:hover": { bgcolor: "#f5e6e6" },
                }}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, role: "Student" }))
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.role === "Student"}
                      sx={{
                        color: "#943131",
                        "&.Mui-checked": { color: "#943131" },
                      }}
                    />
                  }
                  label="นักศึกษา"
                  sx={{ width: "100%", m: 0 }}
                />
              </Paper>

              <Paper
                elevation={formData.role === "Employee" ? 3 : 1}
                sx={{
                  flex: 1,
                  p: 2,
                  cursor: "pointer",
                  bgcolor: formData.role === "Employee" ? "#f5e6e6" : "white",
                  "&:hover": { bgcolor: "#f5e6e6" },
                }}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, role: "Employee" }))
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.role === "Employee"}
                      sx={{
                        color: "#943131",
                        "&.Mui-checked": { color: "#943131" },
                      }}
                    />
                  }
                  label="บุคลากร"
                  sx={{ width: "100%", m: 0 }}
                />
              </Paper>
            </Box>
          </FormControl>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
              disabled={
                !stepStatus.facebook ||
                !stepStatus.categories ||
                !stepStatus.details
              }
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

      {/* Progress Indicator */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: 1,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
          ความคืบหน้าการกรอกข้อมูล:{" "}
          {(
            (Object.values(stepStatus).filter(Boolean).length / 3) *
            100
          ).toFixed(0)}
          %
          {stepStatus.facebook &&
            stepStatus.categories &&
            stepStatus.details && (
              <CheckCircleIcon
                sx={{ ml: 1, color: "#4CAF50", verticalAlign: "middle" }}
              />
            )}
        </Typography>
      </Box>
    </Container>
  );
};

export default CaseOpen;
