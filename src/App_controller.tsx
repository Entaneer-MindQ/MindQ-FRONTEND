// import { Dayjs } from "dayjs";
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import Check from "@mui/icons-material/Check";
// import StepConnector, {
//   stepConnectorClasses,
// } from "@mui/material/StepConnector";
// import { StepIconProps } from "@mui/material/StepIcon";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext";

export const useAppController = () => {
  const handleCMULogin = () => {
    const cmuAuthUrl = `https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=v3pP16kD01qVxynezRP2GBYW9jENxwWbN8M6BTcg&redirect_uri=http://localhost:3000/cmuOAuthCallback&scope=cmuitaccount.basicinfo&state=xyz`;
    window.location.href = cmuAuthUrl;
  };

  return {
    handleCMULogin,
  };
};
