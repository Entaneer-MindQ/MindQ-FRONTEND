import React, { useState } from "react";
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

const CaseOpen: React.FC = () => {
  const [formData, setFormData] = useState<CaseData>({
    url: "",
    categories: [],
    details: "",
  });

  const [errors, setErrors] = useState({
    url: false,
    categories: false,
    details: false,
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
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
    setErrors((prev) => ({ ...prev, categories: false }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      url: formData.url.trim() === "",
      categories: formData.categories.length === 0,
      details: formData.details.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("YOUR_API_ENDPOINT/case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit case");

      // Clear form after successful submission
      setFormData({
        url: "",
        categories: [],
        details: "",
      });

      // You might want to show a success message or redirect
      alert("เคสถูกสร้างเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("เกิดข้อผิดพลาดในการสร้างเคส กรุณาลองใหม่อีกครั้ง");
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
            label="Facebook URL"
            value={formData.url}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, url: e.target.value }));
              setErrors((prev) => ({ ...prev, url: false }));
            }}
            error={errors.url}
            helperText={errors.url ? "กรุณากรอก URL" : ""}
          />
        </Box>

        <FormControl
          component="fieldset"
          error={errors.categories}
          sx={{ mb: 3 }}
        >
          <FormLabel component="legend">
            Category/หมวดหมู่ของคำปรึกษา (เลือกได้หลายหมวดหมู่)*
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
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </Box>
          </FormGroup>
          {errors.categories && (
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
            value={formData.details}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, details: e.target.value }));
              setErrors((prev) => ({ ...prev, details: false }));
            }}
            error={errors.details}
            helperText={errors.details ? "กรุณากรอกรายละเอียด" : ""}
          />
        </Box>

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
