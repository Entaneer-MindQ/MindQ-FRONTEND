import React from "react";
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

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const {
    currentDate,
    setCurrentDate,
    loading,
    months,
    getAvailableMonths,
    fetchHolidays,
    isPastDate,
    isHoliday,
    getAvailableDates,
  } = useCalendar();

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
  const today = new Date();

  const isCurrentMonth = (date: Date) => {
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    if (newDate >= availableMonths[0].date) {
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

  const isDateAvailable = (day: number): boolean => {
    const availableDates = getAvailableDates();
    return availableDates.includes(day) && !isPastDate(day) && !isHoliday(day);
  };

  const handleDateSelect = (dayNumber: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayNumber
    );

    const bookingState: BookingState = {
      date: dayNumber,
      month: `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
      dayOfWeek: days[selectedDate.getDay()],
      categories: ["การเรียน", "ความเครียด", "ความสัมพันธ์"],
      timeSlot: "13.00",
      details: "",
    };

    navigate("/booking", { state: bookingState });
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[98%] md:max-w-[90%] lg:max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-red-900 text-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold">
                ปฏิทินการจองคิว
              </span>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="p-3 sm:p-4 md:p-6">
            {/* Controls - Stack vertically on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
              <MonthSelector
                currentDate={currentDate}
                availableMonths={availableMonths}
                onMonthChange={handleMonthChange}
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

            {/* Calendar Body */}
            <div className="space-y-2 sm:space-y-3">
              <CalendarHeader days={days} isMobile={isMobile || isTablet} />

              <CalendarGrid
                currentDate={currentDate}
                isDateAvailable={isDateAvailable}
                isHoliday={isHoliday}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
