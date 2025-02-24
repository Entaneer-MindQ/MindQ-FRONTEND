import React from "react";
import CalendarDay from "./CalendarDay";
import { CalendarGridProps } from "../../../types/calendar";
// import { useCookies } from "react-cookie";
// import { post } from "../../../services/api";

//ของไลก้า
// interface Queued_user {
//   status: number;
//   data: Array<{
//     qid: number;
//     mind_code: string;
//     // name: string;
//     // tel_num: number;
//     date: string;
//     slot: string;
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
//ของไลก้าเว้ย

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  isDateAvailable,
  isHoliday,
  onDateSelect,
  isPastDate,
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
        <CalendarDay
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
