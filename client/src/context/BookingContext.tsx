'use client';
import { createContext, useContext, useState, ReactNode } from "react";

type BookingContextType = {
    booking : {
        start_loc: string;
        end_loc: string;
        time: string;
        date: string;
        car_type: string;
    } | null;
    setBooking : (booking : {
        start_loc: string;
        end_loc: string;
        time: string;
        date: string;
        car_type: string;}) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [booking, setBooking] = useState<{
        start_loc: string;
        end_loc: string;
        time: string;
        date: string;
        car_type: string;} | null>(null);
  
    return (
      <BookingContext.Provider value={{ booking, setBooking }}>
        {children}
      </BookingContext.Provider>
    );
  };
  
  export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
