'use client'
import { useRouter} from 'next/navigation';
import { useEffect} from "react";
import { useBooking } from "@/context/BookingContext";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

export default function RideDetails(){
    const {booking} = useBooking();
    const router = useRouter();

    const handleNavigation = () => {
        
        //router.push("/page2", { state: { name: "John", age: 25 } });
      };

      useEffect(() => {
        // Check if context data (formData) is available
        if (!booking || Object.keys(booking).length === 0) {
          router.push("/"); // Redirect to home page
        }
      }, [booking, router]);

    return(
        <div className="grid min-h-screen lg:grid-cols-2 items-center justify-center p-8 pl-0 pr-0 pb-20 gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col h-full min-w-full items-center justify-center">
                <form className="max-w-md mx-auto">
                    <div className="grid md:grid-cols-7 md:gap-6">
                        <div className="relative z-0 w-full mb-5 md:col-span-3 md:col-start-1 group">
                            <input type="text" name="floating_pick_up" id="floating_pick_up" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="floating_pick_up" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group md:col-span-3 md:col-start-5">
                            <input type="text" name="floating_drop_off" id="floating_drop_off" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="floating_drop_off" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-7 md:gap-6">
                        <div className="relative z-0 w-full mb-5 md:col-span-3 md:col-start-1 group">
                            <input type="text" name="floating_pick_up" id="floating_pick_up" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="floating_pick_up" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group md:col-span-3 md:col-start-5">
                            <input type="text" name="floating_drop_off" id="floating_drop_off" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="floating_drop_off" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ride Notes</label>
                        <textarea id="message" rows={4} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder="Additional notes here..."></textarea>
                    </div>

                </form>

            </div>

            <div className="flex min-w-full flex-col items-center justify-center border-solid border-2 m-l-3 border-slate-500">
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Start</h1>
                    <span className="col-start-3">{booking?.start_loc}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">End</h1>
                    <span className="col-start-3">{booking?.end_loc}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Date</h1>
                    <span className="col-start-3">{booking?.date}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Time</h1>
                    <span className="col-start-3">{booking?.time}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Car Type</h1>
                    <span className="col-start-3">{booking?.car_type}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Distance</h1>
                    <span className="col-start-3">300 miles</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Ride Fee</h1>
                    <span className="col-start-3">US$</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="col-start-2">Tax</h1>
                    <span className="col-start-3">{booking?.car_type}</span>
                </div>
                <div className="grid grid-cols-3 min-w-full justify-between items-center">
                    <h1 className="font-bold col-start-2">Total Fee</h1>
                    <span className="font-bold col-start-3">US$</span>
                </div>

                <div className="grid grid-cols-3 min-w-full pt-6 justify-between items-center">
                    <Link className="flex flex-col col-start-3 items-start w-full" href={{pathname : "booking-progress/ride-details"}}
                        onClick={handleNavigation}>
                            <div className="flex flex-row w-3/6 p-2 m-3 items-center justify-between text-black bg-slate-200 rounded-full">
                            
                                <h1 className="font-bold">Payment</h1>
                                <FaArrowAltCircleRight/>
                            
                            </div>
                    </Link>
                </div>

                
                
            </div>
        </div>
    )
}