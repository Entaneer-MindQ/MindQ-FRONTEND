// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import InfoForm from "./Patient-Form/infoForm"; // Correct component naming convention (capitalize)
import PatientForm2 from "./Patient-Form/patientForm2"; // Correct component naming convention (capitalize)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<InfoForm />} />
      <Route path="/2" element={<PatientForm2 />} />
    </Routes>
  </Router>
);
