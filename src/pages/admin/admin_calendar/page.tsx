import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCalendar } from "../../../hooks/useCalendar";
import { CalendarNavigation } from "../../../components/Calendar/CalendarNavigation";
import { MonthSelector } from "../../../components/Calendar/MonthSelector";
import { CalendarHeader } from "../../../components/Calendar/CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { LoadingState } from "../../../components/Calendar/LoadingState";
import { BookingState } from "../../../types/calendar";
import { useBooking } from "../../../context/BookingContext";
// import { useCookies } from "react-cookie";
// import { post } from "../../../services/api";

// interface Queued_user {
//   NVTID: string;
//   server_status: number;
//   data: Array<{
//     mind_code: string;
//     name: string;
//     tel_num: number;
//     date: string;
//     time_slot: string;
//   }>;
// }

// const formatThaiMonth = (date: Date): string => {
//   const thaiMonths = [
//     "มกราคม",
//     "กุมภาพันธ์",
//     "มีนาคม",
//     "เมษายน",
//     "พฤษภาคม",
//     "มิถุนายน",
//     "กรกฎาคม",
//     "สิงหาคม",
//     "กันยายน",
//     "ตุลาคม",
//     "พฤศจิกายน",
//     "ธันวาคม",
//   ];
//   const month = thaiMonths[date.getMonth()];
//   const year = date.getFullYear() + 543;
//   return `${month} ${year}`;
// };

// const Queued_user: React.FC = () => {
//   const [cookies] = useCookies(["auth_token"]);
//   const currentDate = new Date();
//   const formattedMonth = formatThaiMonth(currentDate);

//   const [data, setData] = useState<Queued_user["data"] | null>(null);
//   const fetchData = async () => {
//     try {
//       const requestBody = {
//         token: cookies["auth_token"],
//         MonthRequest: formattedMonth,
//       };

//       const response = (await post(
//         "/api/viewAllQueueInMonth",
//         requestBody
//       )) as Queued_user;
//       console.log("Test : " + response);
//       if (!response || response.server_status !== 200) {
//         throw new Error("Failed to fetch data");
//       }

//       // Save fetched data
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [cookies]);
// };

const AdminCalendar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { isBookingFlow, selectedCaseId } = useBooking();
  const [selectedPsychologist, setSelectedPsychologist] = useState<number | 1>(
    1
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Double-check that we're in a valid booking flow
    console.log("isBookingFlow:", isBookingFlow);
    console.log("selectedCaseId:", selectedCaseId);
    // if (!isBookingFlow || selectedCaseId === null) {
    //   navigate("/case");
    // }
  }, [isBookingFlow, selectedCaseId, navigate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  } = useCalendar(selectedPsychologist);

  useEffect(() => {
    if (selectedPsychologist !== null) {
      fetchNotAvailableTimesByPhyId();
    }
  }, [selectedPsychologist]);

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
    console.log(availableMonths[availableMonths.length - 1]);
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
    return availableDates.includes(day);
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
              <div
                className="relative w-full sm:w-auto min-w-[200px]"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full h-10 px-4 text-left text-sm sm:text-base bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--hover-color)] focus:outline-none transition-colors duration-200 flex items-center justify-between"
                >
                  <span>
                    {selectedPsychologist
                      ? `นักจิตวิทยา ${selectedPsychologist}`
                      : "เลือกนักจิตวิทยา"}
                  </span>
                  <span className="text-lg">▾</span>
                </button>
                {showDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[var(--primary-color)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {[1, 2, 3, 4].map((id) => (
                      <button
                        key={id}
                        className="w-full h-10 px-4 text-left text-sm sm:text-base text-[var(--primary-color)] bg-white hover:bg-[var(--hover-color)] first:rounded-t-md last:rounded-b-md transition-colors duration-200 flex items-center"
                        onClick={() => {
                          setSelectedPsychologist(id);
                          setShowDropdown(false);
                        }}
                      >
                        นักจิตวิทยา {id}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

export default AdminCalendar;
