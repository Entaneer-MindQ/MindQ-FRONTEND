import React from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface RoleSelectionProps {
  value: "Student" | "Employee";
  onChange: (value: "Student" | "Employee") => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ value, onChange }) => (
  <FormControl component="fieldset" sx={{ mb: 4, width: "100%" }}>
    <FormLabel component="legend" sx={{ mb: 2 }}>
      สถานะ
    </FormLabel>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {[
        { value: "Student", label: "นักศึกษา" },
        { value: "Employee", label: "บุคลากร" },
      ].map((role) => (
        <Paper
          key={role.value}
          elevation={value === role.value ? 3 : 1}
          sx={{
            flex: { xs: "1", sm: "1" },
            p: 2,
            cursor: "pointer",
            bgcolor: value === role.value ? "#f5e6e6" : "white",
            "&:hover": { bgcolor: "#f5e6e6" },
            transition: "all 0.2s ease-in-out",
          }}
          onClick={() => onChange(role.value as "Student" | "Employee")}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={value === role.value}
                sx={{
                  color: "#943131",
                  "&.Mui-checked": { color: "#943131" },
                }}
              />
            }
            label={role.label}
            sx={{ width: "100%", m: 0 }}
          />
        </Paper>
      ))}
    </Box>
  </FormControl>
);

export default RoleSelection;
