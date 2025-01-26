import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

interface StepProgressProps {
  activeStep: number;
  steps: Array<{
    label: string;
    completed: boolean;
  }>;
}

const StepProgress: React.FC<StepProgressProps> = ({ activeStep, steps }) => {
  return (
    <Box sx={{ overflowX: "auto", py: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          minWidth: { xs: "max-content", sm: "100%" },
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={step.completed}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  color: step.completed ? "#4CAF50" : "white",
                  marginTop: 1,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepProgress;
