import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11));

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

  const monthsEN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
  const daysEN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getAvailableDates = () => {
    const availableDates = [4, 6, 13, 20, 23, 24, 26, 27, 30];
    return availableDates;
  };

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

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (dayNumber: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayNumber
    );
    const dayOfWeek = daysEN[selectedDate.getDay()];
    const monthYear = `${
      monthsEN[currentDate.getMonth()]
    }/${currentDate.getFullYear()}`;

    navigate("/booking", {
      state: {
        month: monthYear,
        date: dayNumber,
        dayOfWeek: dayOfWeek,
        categories: [],
        timeSlot: "",
        details: "",
      },
    });
  };

  const generateCalendarDays = () => {
    const availableDates = getAvailableDates();
    const calendarDays = [];
    const totalDays = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isAvailable = availableDates.includes(dayNumber);

      calendarDays.push(
        <div key={i} className="border border-gray-200 p-2 min-h-16 relative">
          {isCurrentMonth && (
            <>
              <span className="text-black">{dayNumber}</span>
              {isAvailable && (
                <div className="absolute bottom-1 left-1 right-1">
                  <button
                    onClick={() => handleDateClick(dayNumber)}
                    className="w-full bg-white text-black border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    ว่าง
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <select
          className="bg-white border border-gray-300 rounded p-2"
          value={`${
            months[currentDate.getMonth()]
          }/${currentDate.getFullYear()}`}
        >
          <option>{`${
            months[currentDate.getMonth()]
          }/${currentDate.getFullYear()}`}</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="bg-white border border-gray-300 rounded p-2 hover:bg-gray-50"
          >
            ←
          </button>
          <button className="bg-white border border-gray-300 rounded p-2 hover:bg-gray-50">
            ↻
          </button>
          <button
            onClick={handleNextMonth}
            className="bg-white border border-gray-300 rounded p-2 hover:bg-gray-50"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px border border-gray-200">
        {days.map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-center font-bold text-black"
          >
            {day}
          </div>
        ))}
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
