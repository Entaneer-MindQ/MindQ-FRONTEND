import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";

interface ContactInfoFieldProps {
  nickname: string;
  phone: string;
  onChange: (field: "nickname" | "phone", value: string) => void;
  error: {
    nickname: boolean;
    phone: boolean;
  };
  isValid: boolean;
}

const ContactInfoField: React.FC<ContactInfoFieldProps> = ({
  nickname,
  phone,
  onChange,
  error,
  isValid,
}) => {
  const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(0[689]{1})\d{8}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: error.nickname || error.phone ? "error.main" : "text.primary",
          mb: 2,
        }}
      >
        <ContactMailIcon />
        ข้อมูลการติดต่อ
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="ชื่อเล่น"
          value={nickname}
          onChange={(e) => onChange("nickname", e.target.value)}
          error={error.nickname}
          helperText={error.nickname ? "กรุณากรอกชื่อเล่น" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="เบอร์โทรศัพท์"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          error={error.phone}
          helperText={
            error.phone
              ? "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)"
              : ""
          }
          inputProps={{
            maxLength: 10,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
            },
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: isValid ? "success.main" : "text.secondary",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {isValid ? "✓ ข้อมูลครบถ้วน" : "* กรุณากรอกข้อมูลให้ครบถ้วน"}
      </Typography>
    </Box>
  );
};

export default ContactInfoField;
