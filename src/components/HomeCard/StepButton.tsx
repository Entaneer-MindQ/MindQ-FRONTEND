import React from "react";
import { Box, Button } from "@mui/material";
import { StepButtonProps } from "../../types/index";

export const StepButton = ({
  icon,
  children,
  isMobile,
  backgroundColor,
  hoverColor,
  target,
  href,
  ...props
}: StepButtonProps) => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Button
        variant="contained"
        startIcon={icon}
        fullWidth={isMobile}
        href={href}
        target={target}
        sx={{
          backgroundColor,
          "&:hover": { backgroundColor: hoverColor },
          mb: 2,
          maxWidth: isMobile ? "100%" : "300px",
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  );
};
