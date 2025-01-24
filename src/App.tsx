import React from "react";
import { Button, Box } from "@mui/material";
import { useAppController } from "./App_controller";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleCMULogin } = useAppController();
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    if (token) {
      // Redirect to home if token exists
      navigate('/home');
    }
  }, [navigate]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#b0a4a4",
            color: "#fff",
            fontSize: "1rem",
            padding: "12px 24px",
            "&:hover": {
              backgroundColor: "#a09595",
            },
          }}
          onClick={handleCMULogin}
        >
          login as student
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7a2929",
            color: "#fff",
            fontSize: "1rem",
            padding: "12px 24px",
            "&:hover": {
              backgroundColor: "#7a2929",
            },
          }}
          onClick={handleCMULogin}
        >
          login as employee
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
