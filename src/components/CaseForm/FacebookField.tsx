import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface FacebookFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  isValid: boolean;
}

const FacebookField: React.FC<FacebookFieldProps> = ({
  value,
  onChange,
  error,
  isValid,
}) => (
  <Box sx={{ mb: 3 }}>
    <TextField
      fullWidth
      label="Facebook URL"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={error ? "กรุณากรอก URL Facebook ที่ถูกต้อง" : ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FacebookIcon color={isValid ? "success" : "primary"} />
          </InputAdornment>
        ),
        endAdornment: isValid && (
          <InputAdornment position="end">
            <CheckCircleIcon color="success" />
          </InputAdornment>
        ),
      }}
      placeholder="https://facebook.com/your.profile"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: isValid ? "#4CAF50" : "#943131",
          },
        },
      }}
    />
  </Box>
);

export default FacebookField;
