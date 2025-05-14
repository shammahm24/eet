"use strict"
import * as React from 'react';
import { useBooking } from "@/context/BookingContext";
import { useState, useRef, useCallback  } from "react";
import { useRouter } from "next/navigation";
import {LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

export default function BookingForm() {
    const { setBooking } = useBooking();
    const router = useRouter();
    const autocompleteStartRef = useRef<google.maps.places.Autocomplete | null>(null);
    const autocompleteEndRef = useRef<google.maps.places.Autocomplete | null>(null);

    const [formData, setFormData] = useState({
        start_loc: "",
        end_loc: "",
        time: "",
        date: "",
        car_type: "",
      });

      const handlePlaceSelect = useCallback(
        (autocompleteRef: React.MutableRefObject<google.maps.places.Autocomplete | null>, field: "start_loc" | "end_loc") => {
            if (autocompleteRef.current) {
                const place = autocompleteRef.current.getPlace();
                if (place && place.formatted_address) {
                    setFormData((prev) => ({
                        ...prev,
                        [field]: place.formatted_address,
                    }));
                }
            }
        },
        []
    );

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        /*if (name === "dateTime") {
          const [date, time] = value.split("T"); // Extract date and time separately
          setFormData((prev) => ({
            ...prev,
            dateTime: value,
            date,
            time,
          }));
        } else*/ {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBooking(formData);
        console.log("Submitted Data:", formData);
        router.push("/booking-progress");
      };

      const getMinDate = () => {
        const now = new Date();
        now.setDate(now.getDate() + 1);
        return now.toISOString().slice(0, 10); // Keep only YYYY-MM-DDTHH:MM
      };

    return(
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries} onLoad={() => console.log("Google Maps API Loaded")}>
        <div>
            <form className="max-w-md mx-auto -z-10" onSubmit={handleSubmit}>
                <h1 className="text-white text-2xl font-bold mb-8">Start Booking</h1>
                <div className="grid md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <Autocomplete 
                            onLoad={(autocomplete) => {
                                autocompleteStartRef.current = autocomplete;
                                console.log("Start location autocomplete loaded");
                                }} onPlaceChanged={() => handlePlaceSelect(autocompleteStartRef, "start_loc")}>
                        <input
                            value={formData.start_loc}
                            onChange={handleChange}
                            type="text" name="start_loc"
                            id="start_loc"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" " required />
                        </Autocomplete>
                        <label htmlFor="floating_pick_up" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pick up</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Autocomplete 
                            onLoad={(autocomplete) => {
                                autocompleteEndRef.current = autocomplete;
                                console.log("End location autocomplete loaded");
                            }} onPlaceChanged={() => handlePlaceSelect(autocompleteEndRef, "end_loc")}>
                        <input
                            value={formData.end_loc}
                            onChange={handleChange}
                            type="text" 
                            name="end_loc" 
                            id="end_loc" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required />
                        </Autocomplete>
                        <label htmlFor="floating_drop_off" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Drop off</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formData.date}
                            onChange={handleChange}
                            type="date"
                            min={getMinDate()}
                            name="date"
                            id="floating_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white peer-focus:text-white peer-focus:dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required></input>
                        <label htmlFor="floating_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formData.time}
                            onChange={handleChange}
                            type="time"
                            name="time"
                            id="floating_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white peer-focus:text-white peer-focus:dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required></input>
                        <label htmlFor="floating_time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-gray-500 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-300 dark:focus:ring-white dark:hover:text-black">Get Quote</button>
            </form>

        </div>
        </LoadScript>
    );
}
  //  */}
