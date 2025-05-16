'use client'
import React, { useState } from "react";
import CarCard from "../../components/CarCard";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import { useBooking } from "@/context/BookingContext";


interface VehicleType {
    type: string;
    price: number;
    seats: number;
    luggage: number;
    image: string;
}

export default function BookingProgress(){
    const [vehicleTypes, setVehicleTypes] = useState<Record<string, VehicleType>>({});
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    
    const {booking, setBooking} = useBooking();

    const router = useRouter();

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            if (!booking || !booking.miles) {
                console.error("Booking data or distance is missing");
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_EET_API_URL}/api/vehicles/price?distance=${booking.miles}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicle types");
                }
                const data = await response.json();

                // Transform the data into the required format
                const transformedData: Record<string, VehicleType> = {};
                data.vehicles.forEach((vehicle: any, index: number) => {
                    transformedData[`type${index + 1}`] = {
                        type: vehicle.vehicleType,
                        price: vehicle.recalculatedPrice,
                        seats: vehicle.seats,
                        luggage: vehicle.luggage,
                        image: vehicle.image,
                    };
                });

                console.log("Fetched vehicle types:", transformedData);
                setVehicleTypes(transformedData);
            } catch (error) {
                console.error("Error fetching vehicle types:", error);
            }
        };

        if (booking && booking.miles) {
            fetchVehicleTypes();
        }
    }, [booking]);

    const handleNavigation = () => {
        setBooking({
            start_loc: booking? booking.start_loc : "null",
            end_loc: booking? booking.end_loc : "null",
            time: booking? booking.time : "null",
            date: booking? booking.date : "null",
            car_type: selectedCar? vehicleTypes[selectedCar].type : "null",
            miles: booking? booking.miles : 0
        })
        //router.push("/page2", { state: { name: "John", age: 25 } });
      };

    const handleSelect = (key: string) => {
        setSelectedCar(key);
    };

    useEffect(() => {
        // Check if context data (formData) is available
        if (!booking || Object.keys(booking).length === 0) {
          router.push("/"); // Redirect to home page
        }
      }, [booking, router]);

    return(
        <div className="flex h-full flex-col w-full items-center pt-11 justify-center bg-black">
            <div className="flex w-full flex-col items-center justify-center pb-8">
                <div className="flex flex-row w-full h-full items-center justify-center">
                    <h1 className="">{booking?.start_loc} </h1>
                    <FaArrowRight/>
                    <h1>{booking?.end_loc}</h1>
                </div>
                <span className="text-slate-400 text-xs">{booking?.date} at {booking?.time}</span>
                <span className="text-slate-400 text-xs">{booking?.miles} miles</span>
            </div>
            <div className="flex flex-col w-full items-center justify-center">
                <h2 className="text-white text-xl font-bold mb-4">Vehicle Selection</h2>
                
                <div className="grid grid-cols-1 items-center justify-center gap-4 lg:w-4/12 md:w-8/12 sm:w-6/12">
                    {Object.entries(vehicleTypes).map(([key, vehicle]) => (
                        <div
                            key={key}
                            className={`p-4 border rounded-lg cursor-pointer h-1/12 hover:bg-gray-300 ${
                                selectedCar === key ? "bg-blue-100" : "bg-white"
                            }`}
                            onClick={() => handleSelect(key)}
                        >
                            <CarCard
                                type={vehicle.type}
                                price={vehicle.price}
                                seats={vehicle.seats}
                                luggage={vehicle.luggage}
                                image={vehicle.image}
                            />
                            <input
                                type="radio"
                                name="vehicle"
                                value={key}
                                checked={selectedCar === key}
                                onChange={() => handleSelect(key)}
                                className="absolute opacity-0" // Hide radio button but make it interactive
                            />
                        </div>
                    ))}
                </div>
                {selectedCar && (
                    <div className="flex flex-col items-center mt-4 text-white">
                        <div className="flex-initial w-full flex flex-col justify-between text-slate-400 text-sm">
                            <h3>{vehicleTypes[selectedCar].type}</h3>
                            <p>
                                Fee: ${vehicleTypes[selectedCar].price}
                            </p>
                        </div>
                        <Link className="flex flex-col items-center w-full" href={{pathname : "booking-progress/ride-details"}}
                        onClick={handleNavigation}>
                            <div className="flex flex-row w-full p-2 m-3 items-center justify-between text-black bg-slate-200 rounded-full">
                            
                                <h1 className="font-bold">Go</h1>
                                <FaArrowAltCircleRight/>
                            
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
