import React, { useState, useEffect } from "react";
import CalendarDayComp from "./CalendarDayComp";
import { Holiday } from "../../../types/calendar";

interface Data {
  qid: number;
  mind_code: string;
  date: string;
  slot: string;
}

interface CalendarGridProps {
  currentDate: Date;
  isDateAvailable: (day: number) => boolean;
  isHoliday: (day: number) => Holiday | undefined;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: (day: number) => boolean; // เพิ่ม prop นี้
  respond: Data[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  isDateAvailable,
  isHoliday,
  onDateSelect,
  isPastDate,
  respond,
}) => {
  const generateCalendarDays = () => {
    const calendarDays = [];
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

    const formatThaiDate = (date: Date): string => {
      return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };
    console.log(respond);
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const genObj = (mind_code: string, slot: string) => {
      return {mind_code, slot};
    }

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const mindCodes = respond?.filter((item) => item.date === formatThaiDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber))).map((item) => genObj(item.mind_code, item.slot));
      
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const holiday = isCurrentMonth ? isHoliday(dayNumber) : undefined;
      const isToday =
        isCurrentMonth &&
        today === dayNumber &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();

      calendarDays.push(
        <CalendarDayComp
          key={i}
          day={{
            dayNumber,
            isCurrentMonth,
            isToday,
            holiday,
          }}
          isDateAvailable={isCurrentMonth && isDateAvailable(dayNumber)}
          onDateSelect={onDateSelect}
          isPastDate={isCurrentMonth && isPastDate(dayNumber)} // แก้ไขตรงนี้
          mindData={mindCodes}
        />
      );
    }
    return calendarDays;
  };

  return (
    <div className="grid grid-cols-7 gap-1 [&>*]:aspect-square">
      {generateCalendarDays()}
    </div>
  );
};
