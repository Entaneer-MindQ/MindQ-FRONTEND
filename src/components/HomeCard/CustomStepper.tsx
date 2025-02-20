import React from "react";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { CustomStepperProps } from "../../types";

export const CustomStepper: React.FC<CustomStepperProps> = ({
  steps,
  title,
  isMobile,
}) => {
  return (
    <Box sx={{ mb: 4, position: "relative", zIndex: 1 }}>
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        sx={{
          color: "var(--primary-color)",
          mb: 2,
          borderBottom: "2px solid var(--primary-color)",
          pb: 1,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {title}
      </Typography>
      <Stepper
        orientation="vertical"
        sx={{
          "& .MuiStepLabel-root": {
            py: { xs: 1, sm: 1.5, md: 2 },
          },
          "& .MuiStepLabel-labelContainer": {
            mx: { xs: 1, sm: 2 },
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    color: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {step.icon}
                </Box>
              )}
            >
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                color="primary"
              >
                {step.label}
              </Typography>
              <Typography
                variant={isMobile ? "body2" : "body1"}
                color="text.secondary"
              >
                {step.description}
              </Typography>
              {step.content}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
