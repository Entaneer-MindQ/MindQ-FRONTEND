import React, { useState, useRef, useEffect } from "react";
import { MonthSelectorProps } from "../../types/calendar";
import "../../styles/global.css";
export const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentDate,
  availableMonths,
  onMonthChange,
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSelect(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthSelect = (value: string) => {
    onMonthChange(value);
    setShowSelect(false);
  };

  // Find current month from availableMonths
  const getCurrentMonthLabel = () => {
    const currentMonth = availableMonths.find(
      (month) =>
        month.date.getMonth() === currentDate.getMonth() &&
        month.date.getFullYear() === currentDate.getFullYear()
    );
    return currentMonth?.label || "";
  };

  return (
    <div className="relative w-full sm:w-auto min-w-[200px]" ref={dropdownRef}>
      <button
        onClick={() => setShowSelect(!showSelect)}
        className="w-full h-10 px-4 
          text-left text-sm sm:text-base
          bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg 
          hover:bg-[var(--hover-color)] focus:outline-none
          transition-colors duration-200
          flex items-center justify-between"
      >
        <span>{getCurrentMonthLabel()}</span>
        <span className="text-lg">▾</span>
      </button>

      {showSelect && (
        <div
          className="absolute z-50 w-full mt-1 
          bg-white border-2 border-[var(--primary-color)] rounded-lg shadow-lg 
          max-h-60 overflow-y-auto"
        >
          {availableMonths.map((month, index) => (
            <button
              key={index}
              className="w-full h-10 px-4
                text-left text-sm sm:text-base text-[var(--primary-color)]
                bg-white hover:bg-[var(--hover-color)] first:rounded-t-md last:rounded-b-md
                transition-colors duration-200
                flex items-center"
              onClick={() => handleMonthSelect(month.label)}
            >
              {month.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
