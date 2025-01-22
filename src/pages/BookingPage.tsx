// BookingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface BookingFormData {
  month: string;
  date: number;
  dayOfWeek: string;
  categories: string[];
  timeSlot: string;
  details: string;
}

const BookingPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  // log เพื่อตรวจสอบข้อมูลที่ได้รับ
  console.log("Received state:", state);

  const [formData, setFormData] = useState<BookingFormData>(
    state || {
      month: "December/2024",
      date: 6,
      dayOfWeek: "Friday",
      categories: [],
      timeSlot: "",
      details: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, boolean>>({
    categories: false,
    timeSlot: false,
    details: false,
  });

  const categories = [
    "การเรียน",
    "ความสัมพันธ์",
    "ความเครียด",
    "ความรัก",
    "การงาน",
    "โรคทางจิตวิทยา",
    "ครอบครัว",
    "การเงิน",
    "อื่น ๆ",
  ];

  const timeSlots = [
    { time: "9.00", available: true },
    { time: "10.00", available: false },
    { time: "11.00", available: false },
    { time: "13.00", available: true },
    { time: "14.00", available: false },
    { time: "15.00", available: true },
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

  const handleTimeSlotSelect = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot: time,
    }));
    setErrors((prev) => ({ ...prev, timeSlot: false }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      categories: formData.categories.length === 0,
      timeSlot: formData.timeSlot === "",
      details: formData.details.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/bookingC", { state: formData });
    }
  };

  return (
    <Box sx={{ p: 3, ml: "80px" }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5">จองคิวปรึกษา</Typography>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Months/Years<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField value={formData.month} disabled fullWidth />
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Date<span style={{ color: "red" }}>*</span>
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField value={formData.date} disabled sx={{ width: "100px" }} />
            <TextField
              value={formData.dayOfWeek}
              disabled
              sx={{ width: "200px" }}
            />
          </Box>
        </Box>

        <FormControl
          component="fieldset"
          error={errors.categories}
          sx={{ mb: 3, width: "100%" }}
        >
          <FormLabel component="legend">
            Category/หมวดหมู่ขอคำปรึกษา (เลือกได้หลายหมวดหมู่)
            <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <FormGroup>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            เลือก Timeslot (ระยะเวลาให้คำปรึกษา 1 ชั่วโมง)
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={
                  formData.timeSlot === slot.time ? "contained" : "outlined"
                }
                disabled={!slot.available}
                onClick={() => handleTimeSlotSelect(slot.time)}
                sx={{
                  backgroundColor:
                    formData.timeSlot === slot.time ? "#8B4513" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      formData.timeSlot === slot.time
                        ? "#6B3410"
                        : "rgba(139, 69, 19, 0.1)",
                  },
                }}
              >
                {slot.time}
              </Button>
            ))}
          </Box>
          {errors.timeSlot && (
            <Typography color="error" variant="caption">
              กรุณาเลือกเวลา
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            รายละเอียด<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Text Here..."
            value={formData.details}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, details: e.target.value }));
              setErrors((prev) => ({ ...prev, details: false }));
            }}
            error={errors.details}
            helperText={errors.details ? "กรุณากรอกรายละเอียด" : ""}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "#9E9E9E",
              "&:hover": {
                backgroundColor: "#757575",
              },
            }}
          >
            ย้อนกลับ
          </Button>
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
            ยืนยันการจอง
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingPage;

// Rest of ConfirmBookingPage.tsx remains the same
