import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { CustomStepperProps } from "../../types/index";

export const CustomStepper = ({
  steps,
  title,
  isMobile,
}: CustomStepperProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        sx={{
          color: "#943131",
          mb: 2,
          borderBottom: "2px solid #943131",
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
                    color: "#943131",
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
