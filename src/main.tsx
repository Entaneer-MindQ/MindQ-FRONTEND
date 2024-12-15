// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
// import PersonalInfo from "./Patient-Form/personalInfoForm";
// import AddressInfo from "./Patient-Form/AddressInfoForm";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Case from "./pages/CaseOpen";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/non" element={<App />} />
        <Route path="/case-open" element={<Case />} />
        <Route path="/" element={<CMUcallback />} />
        {/* <Route path="/patient-form" element={<PersonalInfo />} />
        <Route path="/patient-form/2" element={<AddressInfo />} /> */}
      </Routes>
    </UserProvider>
  </Router>
);
