import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Admin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div>
        <div style={{ padding: "30px", fontSize: "30px" }}>Request Form</div>
        <Box
          component="section"
          sx={{
            p: 2,
            border: "2px solid black",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <div>Name: John Doe</div>
          <div>Status: </div>
          <div>Topic: </div>
          <div>Description: </div>
        </Box>
      </div>
    </Box>
  );
};

export default Admin;
