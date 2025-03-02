import { useState, useEffect, useCallback, useRef } from "react";
import { useCookies } from "react-cookie";
import { Holiday, CalendarResponse, AvailableMonth } from "../types/calendar";
import { post } from "../services/api";

interface NotAvailableTime {
  NVTID: number;
  Phy_ID: number;
  start_date: string;
  end_date: string;
  Slot: number[];
  reason: string;
  created_at: string;
  updated_at: string;
}

interface NotAvailableTimeResponse {
  status: number;
  data: NotAvailableTime[];
}

interface DayAvailability {
  day: number;
  unavailableSlots: number[];
}

export const useCalendar = (selectedPsychologist: number) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([]);
  const [cookies] = useCookies(["auth_token"]);
  const authToken = cookies["auth_token"];

  // Add refs to track initial loads and prevent unnecessary API calls
  const holidaysLoadedRef = useRef<boolean>(false);
  const prevMonthRef = useRef<number>(currentDate.getMonth());
  const prevPsychologistRef = useRef<number>(selectedPsychologist);

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

  const totalSlots = 6; // Total number of available slots per day

  const parseDateString = useCallback((dateStr: string): number => {
    const parts = dateStr.split(" ");
    return parseInt(parts[0], 10);
  }, []);

  // ใช้ useCallback เพื่อป้องกันการสร้างฟังก์ชันใหม่ทุกครั้งที่ component render
  const fetchNotAvailableTimesByPhyId = useCallback(async () => {
    if (!selectedPsychologist || !authToken) return;
    try {
      setLoading(true);
      const response = (await post("/api/getNotAvailableTimesbyPhyId", {
        token: authToken,
        phyId: selectedPsychologist,
      })) as NotAvailableTimeResponse;
      console.log("response", response);
      if (response.status === 200 && response.data) {
        const availabilityMap: DayAvailability[] = [];

        response.data.forEach((item) => {
          const startDay = parseDateString(item.start_date);
          const endDay = parseDateString(item.end_date);
          const startMonthStr = item.start_date.split(" ")[1];
          const endMonthStr = item.end_date.split(" ")[1];

          const startMonthIndex = months.findIndex((m) =>
            startMonthStr.includes(m)
          );
          const endMonthIndex = months.findIndex((m) =>
            endMonthStr.includes(m)
          );
          const currentMonthIndex = currentDate.getMonth();

          if (
            startMonthIndex === currentMonthIndex ||
            endMonthIndex === currentMonthIndex
          ) {
            for (let i = startDay; i <= endDay; i++) {
              const existingDay = availabilityMap.find((d) => d.day === i);
              if (existingDay) {
                // Merge unavailable slots with existing day
                existingDay.unavailableSlots = [
                  ...new Set([...existingDay.unavailableSlots, ...item.Slot]),
                ];
              } else {
                // Add new day with unavailable slots
                availabilityMap.push({
                  day: i,
                  unavailableSlots: item.Slot,
                });
              }
            }
          }
        });

        setDayAvailability(availabilityMap);
      }
    } catch (error) {
      console.error("Failed to fetch not available times:", error);
    } finally {
      setLoading(false);
    }
  }, [
    authToken,
    currentDate.getMonth(),
    months,
    parseDateString,
    selectedPsychologist,
  ]);

  const getAvailableMonths = useCallback((): AvailableMonth[] => {
    const currentMonth = new Date();
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(currentMonth);
      date.setMonth(currentMonth.getMonth() + i);
      return {
        date,
        label: `${months[date.getMonth()]} ${date.getFullYear()}`,
      };
    });
  }, [months]);

  const fetchHolidays = useCallback(async () => {
    // ป้องกันการโหลดซ้ำโดยไม่จำเป็น
    if (holidaysLoadedRef.current) {
      return;
    }

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
      holidaysLoadedRef.current = true;
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      // เช็คว่าเดือนหรือนักจิตวิทยาเปลี่ยนหรือไม่
      const monthChanged = prevMonthRef.current !== currentDate.getMonth();
      const psychologistChanged =
        prevPsychologistRef.current !== selectedPsychologist;

      // ถ้ายังไม่เคยโหลดข้อมูลวันหยุด หรือเดือนเปลี่ยน ให้โหลดข้อมูลวันหยุดใหม่
      if (!holidaysLoadedRef.current || monthChanged) {
        await fetchHolidays();
      }

      // ถ้าเดือนหรือนักจิตวิทยาเปลี่ยน ให้โหลดข้อมูลการจองใหม่
      if (monthChanged || psychologistChanged) {
        await fetchNotAvailableTimesByPhyId();

        // อัพเดทค่าอ้างอิง
        prevMonthRef.current = currentDate.getMonth();
        prevPsychologistRef.current = selectedPsychologist;
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    currentDate.getMonth(),
    selectedPsychologist,
    fetchHolidays,
    fetchNotAvailableTimesByPhyId,
  ]);

  const isPastDate = useCallback(
    (day: number): boolean => {
      const checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return checkDate < today;
    },
    [currentDate]
  );

  const isHoliday = useCallback(
    (day: number): Holiday | undefined => {
      const dateStr = `${currentDate.getFullYear()}${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}${String(day).padStart(2, "0")}`;
      return holidays.find((holiday) => holiday.date === dateStr);
    },
    [currentDate, holidays]
  );

  const getAvailableDates = useCallback((): number[] => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return allDays.filter((day) => {
      // ตรวจสอบวันที่ผ่านมาแล้ว
      if (isPastDate(day)) {
        return false;
      }

      // ตรวจสอบวันหยุด
      const holiday = isHoliday(day);
      if (holiday) {
        if (isPastDate(day)) {
          return false;
        }
        return true;
      }

      // ตรวจสอบข้อมูลการจอง
      const dayInfo = dayAvailability.find((d) => d.day === day);
      if (!dayInfo) {
        return true; // ไม่มีข้อมูลการจอง = ว่างทั้งวัน
      }

      // เช็คว่าเป็น Slot ว่างเปล่าหรือไม่
      if (dayInfo.unavailableSlots.length === 0) {
        return false; // Slot = [] หมายถึงไม่ว่างทั้งวัน
      }

      // เช็คว่ามี Slot ว่างเหลืออยู่หรือไม่
      return dayInfo.unavailableSlots.length < totalSlots;
    });
  }, [currentDate, dayAvailability, isPastDate, isHoliday]);

  const getAvailableSlotsForDay = useCallback(
    (day: number): number[] => {
      const dayInfo = dayAvailability.find((d) => d.day === day);
      if (!dayInfo) {
        return Array.from({ length: totalSlots }, (_, i) => i + 1); // All slots available
      }
      return Array.from({ length: totalSlots }, (_, i) => i + 1).filter(
        (slot) => !dayInfo.unavailableSlots.includes(slot)
      );
    },
    [dayAvailability]
  );

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
    getAvailableSlotsForDay,
    dayAvailability,
    fetchNotAvailableTimesByPhyId,
  };
};
