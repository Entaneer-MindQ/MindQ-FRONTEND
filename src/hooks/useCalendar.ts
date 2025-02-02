import { useState, useEffect } from "react";
import { Holiday, CalendarResponse, AvailableMonth } from "../types/calendar";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const getAvailableMonths = (): AvailableMonth[] => {
    const currentMonth = new Date();
    return Array.from({ length: 9 }, (_, i) => {
      const date = new Date(currentMonth);
      date.setMonth(currentMonth.getMonth() + i - 4);
      return {
        date,
        label: `${months[date.getMonth()]} ${date.getFullYear()}`,
      };
    });
  };

  const fetchHolidays = async () => {
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

  const isHoliday = (day: number): Holiday | undefined => {
    const dateStr = `${currentDate.getFullYear()}${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    return holidays.find((holiday) => holiday.date === dateStr);
  };

  const getAvailableDates = (): number[] => {
    return [4, 5, 6, 13, 20, 23, 24, 26, 27, 30];
  };

  return {
    currentDate,
    setCurrentDate,
    holidays,
    loading,
    months,
    getAvailableMonths,
    fetchHolidays,
    isPastDate,
    isHoliday,
    getAvailableDates,
  };
};
