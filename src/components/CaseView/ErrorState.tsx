import { Container, Alert } from "@mui/material";

interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Container maxWidth="md" sx={{ py: 4, ml: "100px" }}>
      <Alert
        severity="error"
        sx={{
          borderRadius: 2,
          "& .MuiAlert-icon": {
            fontSize: "2rem",
          },
        }}
      >
        {message}
      </Alert>
    </Container>
  );
};
