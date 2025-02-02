import React from "react";
import { TextField, Box } from "@mui/material";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  isValid: boolean;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
  value,
  onChange,
  error,
  isValid,
}) => (
  <Box sx={{ mb: 3 }}>
    <TextField
      fullWidth
      multiline
      rows={4}
      label="รายละเอียด"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={error ? "กรุณากรอกรายละเอียด" : ""}
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

export default DescriptionField;
