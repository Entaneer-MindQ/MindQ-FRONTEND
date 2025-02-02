import React from "react";
import { Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Calendar from "../pages/Calendar";

export const ProtectedCalendarRoute: React.FC = () => {
  const { isBookingFlow, selectedCaseId } = useBooking();

  if (!isBookingFlow || selectedCaseId === null) {
    return <Navigate to="/case" replace />;
  }

  return <Calendar />;
};
