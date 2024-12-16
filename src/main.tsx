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
import Opencase from "./pages/CaseOpen";
import CaseView from "./pages/CaseView";
import BookingPage from "./pages/BookingPage";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import Calendar from "./pages/Calendar";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <PatientProvider>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/non" element={<App />} />
        <Route path="/case-open" element={<Opencase />} />
        <Route path="/patient-form" element={<PersonalInfo />} />
        <Route path="/patient-form/2" element={<AddressInfo />} />
        <Route path="/case" element={<CaseView />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookingC" element={<ConfirmBookingPage />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </PatientProvider>
  </Router>
);
