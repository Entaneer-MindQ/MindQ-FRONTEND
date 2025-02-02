import React from "react";
import { CalendarDayProps } from "../../types/calendar";

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isDateAvailable,
  onDateSelect,
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
        bg-white hover:shadow-md
        ${isToday ? "border-red-900 border-2" : "border-gray-200"}
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
              ${holiday ? "bg-red-100 text-red-900" : "text-gray-900"}
              ${
                isToday
                  ? "font-bold bg-white text-red-900 border-2 border-red-900"
                  : ""
              }
            `}
          >
            {dayNumber}
          </span>
        </div>

        {/* Holiday info */}
        {holiday && (
          <div className="flex-1 relative group mt-1 min-h-[20px]">
            <div className="p-1 bg-red-50 rounded-md">
              <p className="text-[10px] sm:text-xs text-red-900 line-clamp-2 break-words">
                {holiday.description}
              </p>
            </div>
            {/* Tooltip */}
            <div
              className="hidden group-hover:block absolute z-50 left-0 top-full mt-1
                          w-48 p-2 bg-white border rounded-lg shadow-lg"
            >
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-red-900">
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

        {/* Available button */}
        {isDateAvailable && (
          <div className="absolute bottom-1 left-1 right-1">
            <button
              className="w-full py-1 rounded-md text-[10px] sm:text-xs font-medium 
                bg-red-900 hover:bg-red-800 text-white shadow-sm hover:shadow
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
