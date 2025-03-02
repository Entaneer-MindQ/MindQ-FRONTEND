import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCalendar } from "../hooks/useCalendar";
import { CalendarNavigation } from "../components/Calendar/CalendarNavigation";
import { MonthSelector } from "../components/Calendar/MonthSelector";
import { CalendarHeader } from "../components/Calendar/CalendarHeader";
import { CalendarGrid } from "../components/Calendar/CalendarGrid";
import { LoadingState } from "../components/Calendar/LoadingState";
import { BookingState } from "../types/calendar";
import { useBooking } from "../context/BookingContext";
import PsychologistSelector from "../components/Calendar/PsychologistSelector";

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { isBookingFlow, selectedCaseId } = useBooking();

  const { mindCode } = useBooking();
  const [selectedPsychologist, setSelectedPsychologist] = useState<number>(1);
  const initialLoadRef = useRef<boolean>(false);
  const psychologistChangeRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isBookingFlow || selectedCaseId === null) {
      navigate("/case");
    }
  }, [isBookingFlow, selectedCaseId, navigate]);

  const {
    currentDate,
    setCurrentDate,
    loading,
    months,
    getAvailableMonths,
    fetchHolidays,
    isHoliday,
    getAvailableDates,
    fetchNotAvailableTimesByPhyId,
    isPastDate,
    getAvailableSlotsForDay,
  } = useCalendar(selectedPsychologist);

  // ทำการเรียก API เฉพาะเมื่อ:
  // 1. โหลดครั้งแรก (initialLoadRef.current === false)
  // 2. มีการเปลี่ยนนักจิตวิทยา (psychologistChangeRef.current === true)
  useEffect(() => {
    if (!initialLoadRef.current || psychologistChangeRef.current) {
      if (selectedPsychologist !== null) {
        fetchNotAvailableTimesByPhyId();
        initialLoadRef.current = true;
        psychologistChangeRef.current = false;
      }
    }
  }, [selectedPsychologist, fetchNotAvailableTimesByPhyId]);

  const days = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  const availableMonths = getAvailableMonths();

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    // Reset the day to 1 to avoid end-of-month issues
    newDate.setDate(1);

    // Compare only year and month, ignoring the day
    const earliestDate = new Date(availableMonths[0].date);
    earliestDate.setDate(1);

    if (
      newDate.getFullYear() > earliestDate.getFullYear() ||
      (newDate.getFullYear() === earliestDate.getFullYear() &&
        newDate.getMonth() >= earliestDate.getMonth())
    ) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    if (newDate <= availableMonths[availableMonths.length - 1].date) {
      setCurrentDate(newDate);
    }
  };

  const handleMonthChange = (value: string) => {
    const selectedMonth = availableMonths.find(
      (month) => month.label === value
    );
    if (selectedMonth) {
      setCurrentDate(selectedMonth.date);
    }
  };

  const handlePsychologistChange = (psychologistId: number) => {
    if (psychologistId !== selectedPsychologist) {
      psychologistChangeRef.current = true;
      setSelectedPsychologist(psychologistId);
    }
  };

  const isDateAvailable = (day: number): boolean => {
    const availableDates = getAvailableDates();
    return availableDates.includes(day);
  };

  const handleDateSelect = (dayNumber: number) => {
    // Get available slots for the selected day
    const availableSlots = getAvailableSlotsForDay(dayNumber);

    const bookingState: BookingState = {
      date: dayNumber,
      month: `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
      details: "",
      mind_code: mindCode || "",
      selectedPsychologist: selectedPsychologist, // Add the selectedPsychologist to the state
      availableSlots: availableSlots, // Add available slots to the state
    };

    navigate("/booking", { state: bookingState });
  };

  if (loading && (!initialLoadRef.current || psychologistChangeRef.current)) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[98%] md:max-w-[90%] lg:max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[var(--primary-color)] text-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold">
                ปฏิทินการจองคิว
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
              <MonthSelector
                currentDate={currentDate}
                availableMonths={availableMonths}
                onMonthChange={handleMonthChange}
              />
              <PsychologistSelector
                selectedPsychologist={selectedPsychologist}
                onPsychologistChange={handlePsychologistChange}
              />
              <CalendarNavigation
                currentDate={currentDate}
                availableMonths={availableMonths}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onRefresh={fetchHolidays}
                loading={loading}
              />
            </div>
            <div className="space-y-2 sm:space-y-3">
              <CalendarHeader days={days} isMobile={isMobile || isTablet} />
              <CalendarGrid
                currentDate={currentDate}
                isDateAvailable={isDateAvailable}
                isHoliday={isHoliday}
                onDateSelect={handleDateSelect}
                isPastDate={isPastDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
