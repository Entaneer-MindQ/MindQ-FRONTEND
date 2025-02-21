import React from "react";
import { CalendarNavigationProps } from "../../types/calendar";
import "../../styles/global.css";
export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentDate,
  availableMonths,
  onPreviousMonth,
  onNextMonth,
  onRefresh,
  loading,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="h-10 w-10 rounded-lg 
    bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)]
    hover:bg-[var(--hover-color)] disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    flex items-center justify-center"
        onClick={onPreviousMonth}
        disabled={
          currentDate.getFullYear() < availableMonths[0].date.getFullYear() ||
          (currentDate.getFullYear() ===
            availableMonths[0].date.getFullYear() &&
            currentDate.getMonth() <= availableMonths[0].date.getMonth())
        }
        aria-label="Previous month"
      >
        <span className="text-xl">←</span>
      </button>
      <button
        className="h-10 w-10 rounded-lg 
          bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)]
          hover:bg-[var(--hover-color)] disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          flex items-center justify-center"
        onClick={onRefresh}
        disabled={loading}
        aria-label="Refresh calendar"
      >
        {loading ? (
          <div
            className="animate-spin rounded-full h-5 w-5 
            border-2 border-[var(--primary-color)] border-t-transparent"
          />
        ) : (
          <span className="text-xl">↻</span>
        )}
      </button>
      <button
        className="h-10 w-10 rounded-lg 
          bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)]
          hover:[var(--hover-color)] disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          flex items-center justify-center"
        onClick={onNextMonth}
        disabled={
          currentDate >= availableMonths[availableMonths.length - 1].date
        }
        aria-label="Next month"
      >
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};
