import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { CalendarDayProps } from "../../../types/calendar";
// import { useCookies } from "react-cookie";
// import { post } from "../../../services/api";
import { CalendarDay } from "../../../types/calendar";

interface Queued_user {
  status: number;
  data: Array<{
    qid: number;
    mind_code: string;
    // name: string;
    // tel_num: number;
    date: string;
    slot: string;
  }>;
}

interface CalendarDayProps {
  day: CalendarDay;
  isDateAvailable: boolean;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: boolean; // เพิ่ม prop นี้
  MindCode: string;
}

const formatThaiMonth = (date: Date): string => {
  const thaiMonths = [
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
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${month} ${year}`;
};

// Popup Component (Using React Portal)
const InfoPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  else
    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-lg font-semibold text-[#4d83a9]">
            Case 2024/xxx
          </h2>
          <p className="mt-2 text-[#2c3e50]">ชื่อเล่น: xxx</p>
          <p className="mt-2 text-[#2c3e50]">เวลาที่นัด: xx:xx-xx:xx</p>
          <p className="mt-2 text-[#2c3e50]">เบอร์ติดต่อ: xxx-xxxx-xxx</p>
          <button
            onClick={onClose}
            className="mt-4 bg-[#ff6961] text-white px-4 py-2 rounded hover:bg-[#ffb6c1]"
          >
            Close
          </button>
        </div>
      </div>,
      document.body // Moves the popup outside of the calendar structure
    );
};

const CalendarDayComp: React.FC<CalendarDayProps> = ({
  day,
  onDateSelect,
  isDateAvailable,
  isPastDate,
  MindCode,
}) => {
  // const [cookies] = useCookies(["auth_token"]);
  const [queuedUsers, setQueuedUsers] = useState<Queued_user["data"] | null>(
    null
  );
  const { dayNumber, isCurrentMonth, isToday, holiday } = day;
  const [isPopupOpen, setPopupOpen] = useState(false);

  const hasCasesOnDate = (): boolean => {
    return (
      queuedUsers?.some((caseData) => {
        const caseDate = new Date(caseData.slot);
        return caseDate.getDate() === dayNumber;
      }) || false
    );
  };

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

        {holiday && !isPastDate && (
          <div className="flex-1 relative group mt-1 min-h-[20px]">
            <div className="p-1 bg-[var(--accent-color)] bg-opacity-20 rounded-md">
              <p className="text-[10px] sm:text-xs text-[var(--text-color)] line-clamp-2 break-words">
                {holiday.description}
              </p>
            </div>
          </div>
        )}

        {/* {hasCasesOnDate() && !isPastDate && ( */}
        {(
          <p
            className="text-[#4d83a9] underline cursor-pointer mt-1 text-xs"
            onClick={() => setPopupOpen(true)}
          >
            {MindCode}
          </p>
        )}

        {isDateAvailable && !isPastDate && !holiday && (
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
      <InfoPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

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
//       console.log("test");
//       if (!response || response.status !== 200) {
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

// Main CalendarDay Component
// export const CalendarDay: React.FC<CalendarDayProps> = ({
//   day,
//   isDateAvailable,
//   onDateSelect,
//   isPastDate, // รับ prop
// }) => {
//   const { dayNumber, isCurrentMonth, isToday, holiday } = day;

//   // Modal State for Info Popup
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   if (!isCurrentMonth) {
//     return (
//       <div className="h-full p-1 relative border rounded-lg bg-gray-50 border-gray-100" />
//     );
//   }

//   return (
//     <div
//       className={`
//         h-full p-1.5 relative border rounded-lg transition-all duration-200
//         ${
//           (!isDateAvailable && !holiday) || isPastDate
//             ? "bg-gray-100"
//             : "bg-white hover:shadow-md"
//         }
//         ${isToday ? "border-[var(--error-color)] border-2" : "border-gray-200"}
//       `}
//     >
//       <div className="h-full relative flex flex-col">
//         {/* Date number */}
//         <div className="flex-none">
//           <span
//             className={`
//               inline-flex items-center justify-center
//               w-6 h-6 sm:w-7 sm:h-7
//               text-xs sm:text-sm
//               rounded-full
//               ${
//                 isPastDate
//                   ? "text-gray-400"
//                   : holiday
//                   ? "bg-[var(--accent-color)] text-[var(--text-color)]"
//                   : isDateAvailable
//                   ? "text-gray-900"
//                   : "text-gray-400"
//               }
//               ${
//                 isToday
//                   ? "font-bold bg-white text-[var(--error-color)] border-2 border-[var(--error-color)]"
//                   : ""
//               }
//             `}
//           >
//             {dayNumber}
//           </span>
//         </div>

//         {/* Holiday info */}
//         {holiday && !isPastDate && (
//           <div className="flex-1 relative group mt-1 min-h-[20px]">
//             <div className="p-1 bg-[var(--accent-color)] bg-opacity-20 rounded-md">
//               <p className="text-[10px] sm:text-xs text-[var(--text-color)] line-clamp-2 break-words">
//                 {holiday.description}
//               </p>
//             </div>
//             {/* Tooltip */}
//             <div className="hidden group-hover:block absolute z-50 left-0 top-full mt-1 w-48 p-2 bg-white border rounded-lg shadow-lg">
//               <div className="space-y-1">
//                 <p className="text-xs sm:text-sm font-medium text-[var(--text-color)]">
//                   {holiday.description}
//                 </p>
//                 {holiday.lunardate && (
//                   <p className="text-[10px] sm:text-xs text-gray-600">
//                     จันทรคติ: {holiday.lunardate}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Not available indicator */}
//         {!isDateAvailable && !holiday && !isPastDate && (
//           <div className="flex-1 relative mt-1 min-h-[20px]">
//             <div className="p-1 bg-gray-100 rounded-md">
//               <p className="text-[10px] sm:text-xs text-gray-500 text-center"></p>
//             </div>
//           </div>
//         )}

//         {/*Clickable Text for Additional Info */}
//         {isDateAvailable && !isPastDate && !holiday && (
//           <p
//             className="text-[#4d83a9] underline cursor-pointer mt-1 text-xs"
//             onClick={() => setPopupOpen(true)}
//           >
//             Case 2024/xxx
//           </p>
//         )}
//       </div>

//       {/* Available button */}
//       {isDateAvailable && !isPastDate && !holiday && (
//         <div className="absolute bottom-1 left-1 right-1">
//           <button
//             className="w-full py-1 rounded-md text-[10px] sm:text-xs font-medium
//                 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white shadow-sm hover:shadow
//                 transition-colors duration-200"
//             onClick={() => onDateSelect(dayNumber)}
//           >
//             ว่าง
//           </button>
//         </div>
//       )}

//       {/* Separate Info Popup Component (Now in a portal) */}
//       <InfoPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
//     </div>
//   );
// };

//ตอนนี้หาวิธีที่จะทำให้ Check เงื่อนไขในการโผล่เคสโดยพื้นฐาน 1)วันหยุดไม่โชว์เคส(เสาร์-อาทิตย์, วันสำคัญต่างๆ) 2)เช็คว่ามีผู้ใช้บริการลงทะเบียนไว้หรือไม่

export default CalendarDayComp;
