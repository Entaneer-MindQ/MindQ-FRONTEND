import React from "react";
import { CalendarDayProps } from "../../types/calendar";
import "../../styles/global.css";

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isDateAvailable,
  onDateSelect,
  isPastDate, // รับ prop
}) => {
  const { dayNumber, isCurrentMonth, isToday, holiday } = day;

  if (!isCurrentMonth) {
    return (
      <div className="h-full p-1 relative border rounded-lg bg-gray-50 border-gray-100" />
    );
  }

  return (
    <div
      className={`
        h-full p-1.5 relative border rounded-lg transition-all duration-200
        ${
          (!isDateAvailable && !holiday) || isPastDate
            ? "bg-gray-100"
            : "bg-white hover:shadow-md"
        }
        ${isToday ? "border-[var(--error-color)] border-2" : "border-gray-200"}
      `}
    >
      <div className="h-full relative flex flex-col">
        {/* Date number */}
        <div className="flex-none">
          <span
            className={`
              inline-flex items-center justify-center
              w-6 h-6 sm:w-7 sm:h-7
              text-xs sm:text-sm
              rounded-full
              ${
                isPastDate
                  ? "text-gray-400"
                  : holiday
                  ? "bg-[var(--accent-color)] text-[var(--text-color)]"
                  : isDateAvailable
                  ? "text-gray-900"
                  : "text-gray-400"
              }
              ${
                isToday
                  ? "font-bold bg-white text-[var(--error-color)] border-2 border-[var(--error-color)]"
                  : ""
              }
            `}
          >
            {dayNumber}
          </span>
        </div>

        {/* Holiday info */}
        {holiday && !isPastDate && (
          <div className="flex-1 relative group mt-1 min-h-[20px]">
            <div className="p-1 bg-[var(--accent-color)] bg-opacity-20 rounded-md">
              <p className="text-[10px] sm:text-xs text-[var(--text-color)] line-clamp-2 break-words">
                {holiday.description}
              </p>
            </div>
            {/* Tooltip */}
            <div
              className="hidden group-hover:block absolute z-50 left-0 top-full mt-1
                          w-48 p-2 bg-white border rounded-lg shadow-lg"
            >
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-[var(--text-color)]">
                  {holiday.description}
                </p>
                {holiday.lunardate && (
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    จันทรคติ: {holiday.lunardate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Not available indicator */}
        {!isDateAvailable && !holiday && !isPastDate && (
          <div className="flex-1 relative mt-1 min-h-[20px]">
            <div className="p-1 bg-gray-100 rounded-md">
              <p className="text-[10px] sm:text-xs text-gray-500 text-center"></p>
            </div>
          </div>
        )}

        {/* Available button */}
        {isDateAvailable && !isPastDate && (
          <div className="absolute bottom-1 left-1 right-1">
            <button
              className="w-full py-1 rounded-md text-[10px] sm:text-xs font-medium 
                bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white shadow-sm hover:shadow
                transition-colors duration-200"
              onClick={() => onDateSelect(dayNumber)}
            >
              ว่าง
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
