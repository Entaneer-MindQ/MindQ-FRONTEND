import React, { useMemo } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const YearSelector: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, index) => currentYear - index);
  }, []);

  return (
    <Box className="flex items-center gap-2">
      <Typography>Years</Typography>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-32"
        size="small"
      >
        {yearOptions.map((year) => (
          <MenuItem key={year} value={year.toString()}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default YearSelector;