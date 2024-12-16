import React, { useState } from "react";
import { post } from "../services/api";
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
} from "@mui/material";

interface CaseData {
  personalID: string;
  topic: string[];
  description: string;
  role: "Student" | "Employee";
  approve: boolean;
}

interface FormErrors {
  personalID: boolean;
  topic: boolean;
  description: boolean;
  role: boolean;
}

const CaseOpen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CaseData>({
    personalID: "",
    topic: [],
    description: "",
    role: "Student", // default value
    approve: false, // default value
  });

  const [errors, setErrors] = useState<FormErrors>({
    personalID: false,
    topic: false,
    description: false,
    role: false,
  });

  const categories = [
    "ความสัมพันธ์",
    "ความเครียด",
    "การงาน",
    "โรคทางจิตวิทยา",
    "การเงิน",
    "อื่น ๆ",
  ];

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
      personalID: formData.personalID.trim() === "",
      topic: formData.topic.length === 0,
      description: formData.description.trim() === "",
      role: false, // role always has a default value
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
      localStorage.setItem("personalID", formData.personalID); // Store personalID for case view
      alert("เคสถูกสร้างเรียบร้อยแล้ว");
      navigate("/case"); // Navigate to case view
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          สร้างเคสใหม่
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="รหัสประจำตัว"
            value={formData.personalID}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, personalID: e.target.value }));
              setErrors((prev) => ({ ...prev, personalID: false }));
            }}
            error={errors.personalID}
            helperText={errors.personalID ? "กรุณากรอกรหัสประจำตัว" : ""}
          />
        </Box>

        <FormControl component="fieldset" error={errors.topic} sx={{ mb: 3 }}>
          <FormLabel component="legend">
            หมวดหมู่ของคำปรึกษา (เลือกได้หลายหมวดหมู่)*
          </FormLabel>
          <FormGroup>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
              }}
            >
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={formData.topic.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </Box>
          </FormGroup>
          {errors.topic && (
            <Typography color="error" variant="caption">
              กรุณาเลือกอย่างน้อย 1 หมวดหมู่
            </Typography>
          )}
        </FormControl>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="รายละเอียด"
            value={formData.description}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
              setErrors((prev) => ({ ...prev, description: false }));
            }}
            error={errors.description}
            helperText={errors.description ? "กรุณากรอกรายละเอียด" : ""}
          />
        </Box>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">สถานะ</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.role === "Student"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, role: "Student" }))
                  }
                />
              }
              label="นักศึกษา"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.role === "Employee"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, role: "Employee" }))
                  }
                />
              }
              label="บุคลากร"
            />
          </FormGroup>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#8B4513",
              "&:hover": {
                backgroundColor: "#6B3410",
              },
            }}
          >
            เปิดเคส
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CaseOpen;
