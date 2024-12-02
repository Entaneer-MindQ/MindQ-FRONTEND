// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import PersonalInfo from "./Patient-Form/personalInfoForm";
import CaseInfo from "./Patient-Form/caseInfoForm";
import App from "./App";
import { PatientProvider } from "./context/patientContext";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/patient-form/2" element={<CaseInfo />} />
    </Routes>
    <PatientProvider>
      <Routes>
        <Route path="/patient-form" element={<PersonalInfo />} />
      </Routes>
    </PatientProvider>
  </Router>
);
