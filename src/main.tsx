// @ts-ignore
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Opencase from "./pages/CaseOpen";
import CaseView from "./pages/CaseView";
import BookingPage from "./pages/BookingPage";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import { UserProvider } from "./context/UserContext";
import History from "./pages/HistoryPage";
import Admin from "./pages/admin/Admin_Request";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<App />} />
        <Route path="/admin/request" element={<Admin />} />
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/case-open" element={<Opencase />} />
        <Route path="/case" element={<CaseView />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookingC" element={<ConfirmBookingPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/account" element={<Account />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </UserProvider>
  </Router>
);
