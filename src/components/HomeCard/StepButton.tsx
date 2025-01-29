//fixing the button overload

import React from "react";
import { Button } from "@mui/material";

interface StepButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  isMobile: boolean;
  backgroundColor: string;
  hoverColor: string;
  children: React.ReactNode;
}

export const StepButton: React.FC<StepButtonProps> = ({
  icon,
  onClick,
  href,
  target,
  isMobile,
  backgroundColor,
  hoverColor,
  children,
}) => {
  // Create a base props object without href and target
  const buttonProps = {
    variant: "contained" as const,
    startIcon: icon,
    onClick,
    sx: {
      position: "relative",
      zIndex: 1,
      mt: 2,
      backgroundColor: backgroundColor,
      "&:hover": {
        backgroundColor: hoverColor,
      },
      width: isMobile ? "100%" : "auto",
      textTransform: "none",
    },
  };

  // Only add href and target if href is provided
  if (href) {
    return (
      <Button {...buttonProps} href={href} target={target}>
        {children}
      </Button>
    );
  }

  // Return button without href and target if href is not provided
  return <Button {...buttonProps}>{children}</Button>;
};

// import React from "react";
// import { Button } from "@mui/material";

// interface StepButtonProps {
//   icon: React.ReactNode;
//   onClick?: () => void;
//   href?: string;
//   target?: string;
//   isMobile: boolean;
//   backgroundColor: string;
//   hoverColor: string;
//   children: React.ReactNode;
// }

// export const StepButton: React.FC<StepButtonProps> = ({
//   icon,
//   onClick,
//   href,
//   target,
//   isMobile,
//   backgroundColor,
//   hoverColor,
//   children,
// }) => {
//   return (
//     <Button
//       variant="contained"
//       startIcon={icon}
//       onClick={onClick}
//       href={href}
//       target={target}
//       sx={{
//         position: "relative",
//         zIndex: 1,
//         mt: 2,
//         backgroundColor: backgroundColor,
//         "&:hover": {
//           backgroundColor: hoverColor,
//         },
//         width: isMobile ? "100%" : "auto",
//         textTransform: "none",
//       }}
//     >
//       {children}
//     </Button>
//   );
// };
