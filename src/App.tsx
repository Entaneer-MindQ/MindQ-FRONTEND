import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-10 flex gap-4 justify-center">
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: "16px 32px",
            fontSize: "1.25rem",
            minWidth: "150px",
            backgroundColor: "#784af4",
            "&:focus": {
              outline: "none",
            },
          }}
          onClick={() => navigate("/patient-form")}
        >
          กรอกแบบประวัติผู้ป่วย
        </Button>
      </div>
    </>
  );
};

export default App;
