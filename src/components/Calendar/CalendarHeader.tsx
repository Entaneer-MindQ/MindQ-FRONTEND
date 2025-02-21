import React from "react";
import { CalendarHeaderProps } from "../../types/calendar";
import "../../styles/global.css";

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  days,
  isMobile,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => (
        <div
          key={day}
          className="h-8 sm:h-10 flex items-center justify-center 
            bg-[var(--primary-color)] text-white rounded-md"
        >
          <span className="text-[11px] sm:text-sm font-medium">
            {/* แสดงตัวอักษรแรก 2 ตัวบน mobile แทนการแสดงตัวเดียว */}
            {isMobile ? day.slice(0, 2) : day}
          </span>
        </div>
      ))}
    </div>
  );
};
