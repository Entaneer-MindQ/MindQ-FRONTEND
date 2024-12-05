// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import PersonalInfo from "./Patient-Form/personalInfoForm";
import AddressInfo from "./Patient-Form/AddressInfoForm";
import App from "./App";
import { PatientProvider } from "./context/patientContext";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
    <PatientProvider>
      <Routes>
        <Route path="/patient-form" element={<PersonalInfo />} />
        <Route path="/patient-form/2" element={<AddressInfo />} />
      </Routes>
    </PatientProvider>
  </Router>
);
