import React from "react";
import { Box, Button, ButtonProps } from "@mui/material";

interface StepButtonProps extends ButtonProps {
  icon: React.ReactNode;
  isMobile: boolean;
  backgroundColor: string;
  hoverColor: string;
  target?: string;
  href?: string;
}

const StepButton: React.FC<StepButtonProps> = ({
  icon,
  children,
  isMobile,
  backgroundColor,
  hoverColor,
  target,
  href,
  ...props
}) => (
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

export default StepButton;
