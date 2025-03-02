import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CalendarDay } from "../../../types/calendar";
import { useNavigate } from "react-router-dom";

interface CalendarDayProps {
  day: CalendarDay;
  isDateAvailable: boolean;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: boolean;
  mindData: { mind_code: string; slot: string }[];
}

const slotTimes: Record<string, string> = {
  "1": "9:00 - 10:00",
  "2": "10:00 - 11:00",
  "3": "11:00 - 12:00",
  "4": "13:00 - 14:00",
  "5": "14:00 - 15:00",
  "6": "15:00 - 16:00",
};

const slotColors: Record<string, string> = {
  "1": "bg-blue-300 hover:bg-blue-400 text-blue-900",
  "2": "bg-green-300 hover:bg-green-400 text-green-900",
  "3": "bg-yellow-300 hover:bg-yellow-400 text-yellow-900",
  "4": "bg-orange-300 hover:bg-orange-400 text-orange-900",
  "5": "bg-pink-300 hover:bg-pink-400 text-pink-900",
  "6": "bg-purple-300 hover:bg-purple-400 text-purple-900",
};

const BookingPopup: React.FC<{ isOpen: boolean; onClose: () => void; mindData: { mind_code: string; slot: string }[] }> = ({ isOpen, onClose, mindData }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md relative animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 w-5 h-5 p-1 rounded-full text-gray-700 hover:bg-gray-300 transition flex items-center justify-center text-xs"
        >
          ✖
        </button>

        <h2 className="text-center text-lg font-semibold mb-4 text-gray-800">📅 รายการจอง</h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {mindData.map((item, index) => (
            <button
              key={index}
              className= {`flex-1 min-h-[40px] p-2 rounded-lg cursor-pointer text-sm font-medium ${slotColors[item.slot]} text-center flex items-center justify-center hover:shadow-lg transition duration-200`}
              onClick={() => navigate( `/history/${item.mind_code}`)} //alert(`รายละเอียดของ ${item.mind_code}`)}
            >
              {item.mind_code} ({slotTimes[item.slot]})
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

const CalendarDayComp: React.FC<CalendarDayProps> = ({ day, onDateSelect, isDateAvailable, isPastDate, mindData }) => {
  const { dayNumber, isCurrentMonth, isToday, holiday } = day;
  const [isPopupOpen, setPopupOpen] = useState(false);

  if (!isCurrentMonth) {
    return <div className="h-full p-1 relative border rounded-lg bg-gray-50 border-gray-100" />;
  }

  return (
    <div
      id={`calendar-day-${dayNumber}`}
      className="h-full p-1 relative border rounded-lg transition-all duration-200 flex flex-col bg-white hover:shadow-md"
    >
      <div className="flex-none">
        <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 text-[10px] sm:text-xs rounded-full text-gray-900">
          {dayNumber}
        </span>
      </div>

      {holiday && !isPastDate && (
        <div className="flex-none mt-0.5">
          <div className="p-0.5 bg-[var(--accent-color)] bg-opacity-20 rounded-md">
            <p className="text-[9px] sm:text-[10px] text-[var(--text-color)] line-clamp-2 break-words">
              {holiday.description}
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center items-center">
        {mindData.length > 0 && (
          <p
        className="bg-green-200 text-green-600 text-xs font-medium cursor-pointer hover:bg-green-300 hover:text-green-700 transition duration-150 p-1 rounded"
        onClick={() => setPopupOpen(true)}
          >
        👤 {mindData.length}
          </p>
        )}
      </div>

      <BookingPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} mindData={mindData} />
    </div>
  );
};

export default CalendarDayComp;
