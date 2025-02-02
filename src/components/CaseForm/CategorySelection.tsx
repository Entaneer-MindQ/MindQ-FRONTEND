import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface CategorySelectionProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (category: string) => void;
  error: boolean;
  isValid: boolean;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  selectedCategories,
  onChange,
  error,
  isValid,
}) => (
  <FormControl component="fieldset" error={error} sx={{ mb: 3, width: "100%" }}>
    <FormLabel
      component="legend"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
        color: isValid ? "#4CAF50" : "rgba(0, 0, 0, 0.6)",
      }}
    >
      <InfoIcon color={isValid ? "success" : "primary"} />
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
              bgcolor: selectedCategories.includes(category)
                ? "#f5e6e6"
                : "white",
              border: 1,
              borderColor: selectedCategories.includes(category)
                ? isValid
                  ? "#4CAF50"
                  : "#943131"
                : "grey.300",
              "&:hover": {
                bgcolor: "#f5e6e6",
                borderColor: isValid ? "#4CAF50" : "#943131",
              },
              transition: "all 0.2s ease-in-out",
            }}
            onClick={() => onChange(category)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  sx={{
                    color: isValid ? "#4CAF50" : "#943131",
                    "&.Mui-checked": {
                      color: isValid ? "#4CAF50" : "#943131",
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
    {error && (
      <Typography color="error" variant="caption" sx={{ mt: 1 }}>
        กรุณาเลือกอย่างน้อย 1 หมวดหมู่
      </Typography>
    )}
  </FormControl>
);

export default CategorySelection;
