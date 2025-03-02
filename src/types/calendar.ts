export interface Holiday {
  date: string;
  description: string;
  lunardate: string;
}

export interface CalendarResponse {
  VCALENDAR: [
    {
      VEVENT: Array<{
        "DTSTART;VALUE=DATE": string;
        SUMMARY: string;
        DESCRIPTION: string;
      }>;
    }
  ];
}

export interface AvailableMonth {
  date: Date;
  label: string;
}

export interface CalendarDay {
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  holiday?: Holiday;
}

export interface CalendarNavigationProps {
  currentDate: Date;
  availableMonths: AvailableMonth[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export interface MonthSelectorProps {
  currentDate: Date;
  availableMonths: AvailableMonth[];
  onMonthChange: (value: string) => void;
}

export interface CalendarHeaderProps {
  days: string[];
  isMobile: boolean;
}

export interface CalendarDayProps {
  day: CalendarDay;
  isDateAvailable: boolean;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: boolean; // เพิ่ม prop นี้
}

export interface CalendarGridProps {
  currentDate: Date;
  isDateAvailable: (day: number) => boolean;
  isHoliday: (day: number) => Holiday | undefined;
  onDateSelect: (dayNumber: number) => void;
  isPastDate: (day: number) => boolean; // เพิ่ม prop นี้
}

export interface BookingState {
  date: number;
  month: string;
  dayOfWeek: string;
  categories: string[];
  timeSlot: string;
  details: string;
  mind_code: string;
}
