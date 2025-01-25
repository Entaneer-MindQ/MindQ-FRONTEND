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
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import PrivateRoute from "./routes/privateRoute";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import { UserProvider } from "./context/UserContext";
import History from "./pages/HistoryPage";
import Admin from "./pages/admin/admin_request/Page";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/case-open" element={<Opencase />} />
          <Route path="/case" element={<CaseView />} />
          <Route path="/booking/" element={<ConfirmBookingPage cid={0} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/account" element={<Account />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin-request" element={<Admin />} />
        </Route>
      </Routes>
    </UserProvider>
  </Router>
);
