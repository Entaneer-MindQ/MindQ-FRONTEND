import React, { createContext, useState, useContext, ReactNode } from "react";

interface BookingContextType {
  isBookingFlow: boolean;
  setIsBookingFlow: (value: boolean) => void;
  selectedCaseId: number | null;
  setSelectedCaseId: (id: number | null) => void;
  mindCode: string | null;
  setMindCode: (code: string | null) => void;
}

const BookingContext = createContext<BookingContextType>({
  isBookingFlow: false,
  setIsBookingFlow: () => {},
  selectedCaseId: null,
  setSelectedCaseId: () => {},
  mindCode: null,
  setMindCode: () => {},

});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isBookingFlow, setIsBookingFlow] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [mindCode, setMindCode] = useState<string | null>(null);

  return (
    <BookingContext.Provider
      value={{
        isBookingFlow,
        setIsBookingFlow,
        selectedCaseId,
        setSelectedCaseId,
        mindCode,
        setMindCode,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
