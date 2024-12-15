// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import PersonalInfo from "./Patient-Form/personalInfoForm";
import AddressInfo from "./Patient-Form/AddressInfoForm";
import App from "./App";
import { PatientProvider } from "./context/patientContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Case from "./pages/CaseOpen";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <PatientProvider>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/non" element={<App />} />
        <Route path="/case-open" element={<Case />} />
        <Route path="/patient-form" element={<PersonalInfo />} />
        <Route path="/patient-form/2" element={<AddressInfo />} />
      </Routes>
    </PatientProvider>
  </Router>
);
