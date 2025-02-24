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
import Account from "./pages/Account";
import PrivateRoute from "./routes/privateRoute";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import { UserProvider } from "./context/UserContext";
import History from "./pages/HistoryPage";
import Admin_Request from "./pages/admin/admin_request/Page";
import Admin_AllQueue from "./pages/admin/admin_queue/page";
import Admin_QueueDetails from "./pages/admin/admin_queue_detail/page";
import { ProtectedCalendarRoute } from "../src/routes/ProtectedCalendarRoute";
import { BookingProvider } from "./context/BookingContext";
import AdminNotAvailablePage from "./pages/admin/admin_notavailable/page";
import Admin_History_page from "./pages/admin/admin_history/page";
import Admin_appointment from "./pages/admin/admin_apppointment/page";
import AdminCalendar from "./pages/admin/admin_calendar/page";


const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <UserProvider>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<App />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/case-open" element={<Opencase />} />
            <Route path="/case" element={<CaseView />} />
            <Route path="/booking/" element={<ConfirmBookingPage cid={0} />} />
            <Route path="/calendar" element={<ProtectedCalendarRoute />} />
            <Route path="/account" element={<Account />} />
            <Route path="/history/:mindCode" element={<History />} />
            <Route path="/admin-request" element={<Admin_Request />} />
            <Route
              path="/admin-notavailable"
              element={<AdminNotAvailablePage />}
            />
            <Route path="/admin-calendar" element={<AdminCalendar />} />
            <Route path="/admin-queue">
              <Route index element={<Admin_AllQueue />} />
              <Route path="details" element={<Admin_QueueDetails />} />
              {/* <Route path="/appointment" element={<Admin_appointment />} /> */}
            </Route>
            <Route path="/appointment" element={<Admin_appointment />} /> {/* wait for delete */}
            <Route path="/admin-history" element={<Admin_History_page />} />
          </Route>
        </Routes>
      </BookingProvider>
    </UserProvider>
  </Router>
);
