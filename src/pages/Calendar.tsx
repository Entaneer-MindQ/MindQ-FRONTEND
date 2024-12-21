import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Holiday {
  date: string;
  description: string;
  lunardate: string;
}

interface CalendarResponse {
  VCALENDAR: [
    {
      VEVENT: Array<{
        "DTSTART;VALUE=DATE": string;
        SUMMARY: string;
        DESCRIPTION: string;
      }>;
    }
  ];
}

interface AvailableMonth {
  date: Date;
  label: string;
}

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const days = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  // Function to check if a date is in the past
  const isPastDate = (day: number): boolean => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  // Function to check if date is available for booking
  const isDateAvailable = (day: number): boolean => {
    const availableDates = getAvailableDates();
    const isAvailableDay = availableDates.includes(day);
    const notPastDate = !isPastDate(day);
    const notHoliday = !isHoliday(day);

    return isAvailableDay && notPastDate && notHoliday;
  };

  const getAvailableMonths = (): AvailableMonth[] => {
    const currentMonth = new Date();
    const monthsList: AvailableMonth[] = [];
    for (let i = -4; i <= 4; i++) {
      const date = new Date(currentMonth);
      date.setMonth(currentMonth.getMonth() + i);
      monthsList.push({
        date: date,
        label: `${months[date.getMonth()]} ${date.getFullYear()}`,
      });
    }
    return monthsList;
  };

  const availableMonths = getAvailableMonths();

  const handlePreviousMonth = (): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    if (newDate >= availableMonths[0].date) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = (): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    if (newDate <= availableMonths[availableMonths.length - 1].date) {
      setCurrentDate(newDate);
    }
  };

  const handleMonthChange = (value: string): void => {
    const selectedMonth = availableMonths.find(
      (month) => month.label === value
    );
    if (selectedMonth) {
      setCurrentDate(selectedMonth.date);
    }
    setShowSelect(false);
  };

  const fetchHolidays = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent(
            "https://www.myhora.com/calendar/ical/holiday.aspx?latest.json"
          )
      );
      const proxyResponse = await response.json();
      const data: CalendarResponse = JSON.parse(proxyResponse.contents);
      const events = data.VCALENDAR[0].VEVENT;
      const formattedHolidays = events.map((event) => ({
        date: event["DTSTART;VALUE=DATE"],
        description: event.SUMMARY,
        lunardate: event.DESCRIPTION,
      }));
      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const isHoliday = (day: number): Holiday | undefined => {
    const dateStr = `${currentDate.getFullYear()}${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    return holidays.find((holiday) => holiday.date === dateStr);
  };

  const getAvailableDates = (): number[] => {
    return [4, 5, 6, 13, 20, 23, 24, 26, 27, 30];
  };

  const generateCalendarDays = (): JSX.Element[] => {
    const calendarDays: JSX.Element[] = [];
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const totalDays = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const holiday = isCurrentMonth ? isHoliday(dayNumber) : undefined;
      const isToday =
        isCurrentMonth &&
        new Date().getDate() === dayNumber &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      calendarDays.push(
        <div
          key={i}
          className={`p-4 h-32 relative border rounded-lg transition-all duration-200
            ${isCurrentMonth ? "bg-white" : "bg-gray-100"}
            ${isToday ? "border-red-900 border-2" : "border-gray-200"}
            ${isCurrentMonth ? "hover:shadow-md" : ""}`}
        >
          {isCurrentMonth && (
            <div className="h-full relative">
              <span
                className={`inline-block w-8 h-8 leading-8 text-center rounded-full
                  ${holiday ? "bg-red-100 text-red-900" : "text-gray-900"}
                  ${
                    isToday
                      ? "font-bold bg-white text-red-900 border-2 border-red-900"
                      : ""
                  }`}
              >
                {dayNumber}
              </span>

              {holiday && (
                <div className="relative group mt-1">
                  <div className="p-1 bg-red-50 rounded-md">
                    <p className="text-xs text-red-900 line-clamp-2 cursor-help">
                      {holiday.description}
                    </p>
                  </div>
                  <div className="hidden group-hover:block absolute z-50 bottom-full left-0 w-48 p-2 bg-white border rounded-lg shadow-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-red-900">
                        {holiday.description}
                      </p>
                      {holiday.lunardate && (
                        <p className="text-xs text-gray-600">
                          จันทรคติ: {holiday.lunardate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isDateAvailable(dayNumber) && (
                <div className="absolute bottom-0 left-0 right-0">
                  <button
                    className="w-full px-4 py-1.5 rounded-md text-sm font-medium 
                      bg-red-900 hover:bg-red-800 text-white shadow-sm hover:shadow"
                    onClick={() => {
                      // Get day of week for the selected date
                      const selectedDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        dayNumber
                      );
                      const dayOfWeek = days[selectedDate.getDay()];

                      navigate("/bookingC", {
                        state: {
                          date: dayNumber,
                          month: `${
                            months[currentDate.getMonth()]
                          }/${currentDate.getFullYear()}`,
                          dayOfWeek: dayOfWeek,
                          // Default values that will be updated in the booking form
                          categories: [
                            "การเรียน",
                            "ความเครียด",
                            "ความสัมพันธ์",
                          ],
                          timeSlot: "13.00",
                          details: "",
                        },
                      });
                    }}
                  >
                    ว่าง
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return calendarDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-900 border-t-transparent"></div>
          <p className="mt-2 text-red-900">กำลังโหลดข้อมูลวันหยุด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 ml-24">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-900 text-white p-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">ปฏิทินการจองคิว</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <button
                onClick={() => setShowSelect(!showSelect)}
                className="w-52 px-4 py-2 text-left bg-white border border-red-900 text-red-900 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-900"
              >
                {`${
                  months[currentDate.getMonth()]
                } ${currentDate.getFullYear()}`}
              </button>

              {showSelect && (
                <div className="absolute z-50 w-52 mt-1 bg-white border border-red-900 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableMonths.map((month, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left text-red-900 bg-white hover:bg-red-50 first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => handleMonthChange(month.label)}
                    >
                      {month.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg bg-white text-red-900 border border-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePreviousMonth}
                disabled={currentDate <= availableMonths[0].date}
              >
                ←
              </button>
              <button
                className="p-2 rounded-lg bg-white text-red-900 border border-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={fetchHolidays}
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-900 border-t-transparent"></div>
                ) : (
                  "↻"
                )}
              </button>
              <button
                className="p-2 rounded-lg bg-white text-red-900 border border-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNextMonth}
                disabled={
                  currentDate >=
                  availableMonths[availableMonths.length - 1].date
                }
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {days.map((day) => (
              <div
                key={day}
                className="p-2 text-center bg-red-900 text-white rounded-lg shadow-sm"
              >
                <span className="text-sm font-medium">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4 mt-4">
            {generateCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
