import React, { useState, useEffect } from "react";
import CalendarDayComp from "./CalendarDay";
import { Holiday } from "../../../types/calendar";
// import { useCookies } from "react-cookie";
// import { post } from "../../../services/api";

// ของไลก้า
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

// const [cookies] = useCookies(["auth_token"]);
// const [queuedUsers, setQueuedUsers] = useState<Queued_user["data"] | null>(
//     null
//   );

// const fetchData = async () => {
//       try {
//         const currentDate = new Date();
//         const formattedMonth = formatThaiMonth(currentDate);
//         const requestBody = {
//           token: cookies["auth_token"],
//           month: formattedMonth,
//         };

//         const response = (await post(
//           "/api/viewAllQueueInMonth",
//           requestBody
//         )) as Queued_user;
//         console.log(response.data);
//         console.log(response.status);

//         if (response && response.status === 200) {
//           setQueuedUsers(response.data);
//         } else {
//           throw new Error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       };
// }
//ของไลก้าเว้ย

interface Data {
  qid: number;
  mind_code: string;
  // name: string;
  // tel_num: number;
  date: string;
  slot: string;
}

interface CalendarGridProps {
  currentDate: Date;
  isDateAvailable: (day: number) => boolean;
  isHoliday: (day: number) => Holiday | undefined;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: (day: number) => boolean; // เพิ่ม prop นี้
  respond: Data[] | null;
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
    // Example Usage
    console.log("Araikordai");
    console.log(respond);
    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      // const MindCode = respond.filter((DateData) => Datedata.date == i - firstDayOfMonth + 1);
      
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const holiday = isCurrentMonth ? isHoliday(dayNumber) : undefined;
      const isToday =
        isCurrentMonth &&
        new Date().getDate() === dayNumber &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

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
          // MindCode={}
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
