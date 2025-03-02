import React from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
          fontWeight: 600,
        }}
      >
        <ContactMailIcon
          color={
            isValid
              ? "success"
              : error.nickname || error.phone
              ? "error"
              : "primary"
          }
        />
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
                borderColor:
                  nickname.trim().length > 0
                    ? "#4CAF50"
                    : "var(--primary-color)",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color:
                nickname.trim().length > 0 ? "#4CAF50" : "var(--primary-color)",
            },
            "& .MuiFormHelperText-root": {
              fontWeight: error.nickname ? 500 : 400,
              fontSize: "0.75rem",
            },
          }}
          InputProps={{
            sx: {
              bgcolor: "rgba(255, 255, 255, 0.95)",
            },
            endAdornment: nickname.trim().length > 0 && (
              <InputAdornment position="end">
                <CheckCircleIcon color="success" />
              </InputAdornment>
            ),
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
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: /^(0[689]{1})\d{8}$/.test(phone)
                  ? "#4CAF50"
                  : "var(--primary-color)",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: /^(0[689]{1})\d{8}$/.test(phone)
                ? "#4CAF50"
                : "var(--primary-color)",
            },
            "& .MuiFormHelperText-root": {
              fontWeight: error.phone ? 500 : 400,
              fontSize: "0.75rem",
            },
          }}
          InputProps={{
            sx: {
              bgcolor: "rgba(255, 255, 255, 0.95)",
            },
            endAdornment: /^(0[689]{1})\d{8}$/.test(phone) && (
              <InputAdornment position="end">
                <CheckCircleIcon color="success" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: isValid
            ? "#097209"
            : (nickname.trim() || phone.trim()) && !isValid
            ? "#d32f2f"
            : "text.secondary",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          fontWeight: 500,
          ml: 0.5,
        }}
      >
        {isValid ? (
          <>
            <CheckCircleIcon fontSize="small" sx={{ color: "#097209" }} />
            ข้อมูลครบถ้วน
          </>
        ) : (nickname.trim() || phone.trim()) && !isValid ? (
          <>
            <ErrorOutlineIcon fontSize="small" sx={{ color: "#d32f2f" }} />
            กรุณากรอกข้อมูลให้ครบถ้วน
          </>
        ) : (
          <>* กรุณากรอกชื่อเล่นและเบอร์โทรศัพท์</>
        )}
      </Typography>
    </Box>
  );
};

export default ContactInfoField;
