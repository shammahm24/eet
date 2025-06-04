'use client'
import { useRouter} from 'next/navigation';
import { useEffect} from "react";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { FaArrowDown } from "react-icons/fa";

export default function Payment(){
    const {booking} = useBooking();
    const router = useRouter();
    const [isValid, setIsValid] = useState(false);

    const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = document.getElementById("details-form") as HTMLFormElement;
        const form2 = document.getElementById("details-form-terms") as HTMLFormElement;
        
        if(isValid){
            console.log("Form is valid");
        }
        if (form.checkValidity() && form2.checkValidity()) {
            // Combine form data with booking details (like car type) to send to the API
            const payload = {
                ...formData, // Form data
                carType: booking?.car_type, // Additional booking details
                startLoc: booking?.start_loc, // Booking start location
                endLoc: booking?.end_loc, // Booking end location
                date: booking?.date, // Booking date
                time: booking?.time, // Booking time
                miles: booking?.miles, // Booking miles
                fee: booking?.fee, // Booking fee
            };

            try {
                // Send the combined data to your API endpoint
                const response = await fetch(`${process.env.NEXT_PUBLIC_EET_API_URL}/api/bookings/`, { //`${process.env.NEXT_PUBLIC_EET_API_URL}/api/vehicles/price?distance=${booking.miles}`
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    // Navigate to the next page after successful submission
                    router.push("/payment");
                } else {
                    // Handle error if submission fails
                    console.error("Failed to submit data");
                }
            } catch (error) {
                console.error("An error occurred while submitting:", error);
            }
        } else {
            // Trigger the browser's native form validation (this will show the "required" warnings)
            form.reportValidity();
            form2.reportValidity();
        }
    };

    useEffect(() => {
        // Check if context data (formData) is available
        if (!booking || Object.keys(booking).length === 0) {
          router.push("/"); // Redirect to home page
        }
        const form = document.getElementById("details-form") as HTMLFormElement;

        const checkFormValidity = () => setIsValid(form.checkValidity());

        form.addEventListener("input", checkFormValidity);
  
        return () => form.removeEventListener("input", checkFormValidity);
    }, [booking, router]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const { name, value } = e.target;
          
            setFormData((prev) => ({
            ...prev,
            [name]: value,
            }));
          };

    return(//flex min-w-full h-full text-slate-400 text-sm flex-col p-8 items-start justify-start
        <div className="grid min-h-screen lg:grid-cols-2  justify-center p-8 pl-0 pr-0 pb-20 gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col  min-w-full h-[45vh] p-8 items-center justify-start ">
                <form id="details-form" className="w-full mx-auto  p-4 h-[45vh] items-start  ">
                    <div className="grid md:grid-cols-7 md:gap-6">
                        <div className="relative  w-full mb-5 md:col-span-3 md:col-start-1 group">
                            <input type="text" 
                                name="firstName" 
                                id="first_name" 
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white -z-10 dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        </div>
                        <div className="relative  w-full mb-5 group md:col-span-3 md:col-start-5">
                            <input type="text" 
                                name="lastName" 
                                id="last_name" 
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-7 md:gap-6">
                        <div className="relative z-0 w-full mb-5 md:col-span-3 md:col-start-1 group">
                            <input type="text" 
                                name="email" 
                                id="email" 
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group md:col-span-3 md:col-start-5">
                            <input type="text" 
                                name="phone" 
                                id="phone" 
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ride Notes</label>
                        <textarea id="message" 
                            rows={4} 
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer" placeholder="Additional notes here..."></textarea>
                    </div>

                </form>

                <form id="details-form-terms" className="w-full mx-auto  p-4 h-[45vh] items-start   ">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            onChange={handleChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400">
                            I agree to the{" "}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline"
                            >
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="checkbox"
                            name="liability"
                            id="liability"
                            onChange={handleChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="liability" className="text-sm text-gray-500 dark:text-gray-400">
                            I agree to the{" "}
                            <a
                                href="/liability"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline"
                            >
                                Liability Waiver
                            </a>
                        </label>
                    </div>
                </form>

            </div>

            <div className="flex min-w-full h-full text-slate-400 text-sm flex-col p-8 items-start justify-start ">
                <div className="flex flex-col mb-8 min-w-full h-[40vh] p-4 items-center justify-between  border-2 rounded-xl m-l-3 border-slate-500">
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <span className="col-start-1 col-span-3">{booking?.start_loc}</span>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <FaArrowDown className="col-start-2 text-slate-700 "/>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <FaArrowDown className="col-start-2 text-slate-400"/>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <FaArrowDown className="col-start-2 text-white "/>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <span className="col-start-1 col-span-3">{booking?.end_loc}</span>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <span className="col-start- col-span-31">{booking?.date}</span>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <span className="col-start-1 col-span-3">{booking?.time}</span>
                    </div>
                </div>

                <div className="flex flex-col mb-8 min-w-full p-4 items-center justify-center  border-2 rounded-xl m-l-3 border-slate-500">
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <h1 className="col-start-1">Car Type</h1>
                        <span className="lg:col-start-2 col-start-3">{booking?.car_type}</span>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <h1 className="col-start-1">Distance</h1>
                        <span className="lg:col-start-2 col-start-3">{booking?.miles} miles</span>
                    </div>
                    <div className="grid grid-cols-3 min-w-full justify-between items-center">
                        <h1 className="col-start-1">Ride Fee</h1>
                        <span className="lg:col-start-2 col-start-3">US${booking?.fee}</span>
                    </div>
                    <div className="grid grid-cols-3 text-white min-w-full justify-between items-center">
                        <h1 className="font-bold col-start-1">Total Fee <span className="text-slate-500 text-xs">{"\(Tax Included\)"}</span> </h1>
                        <span className="font-bold lg:col-start-2 col-start-3">US${booking?.fee}</span>
                    </div>

                <button type="submit" onClick={handleSubmit} className="w-4/6 p-2 m-3 items-center justify-between text-black bg-slate-200 rounded-full">Go to Payment</button>
                </div>
            </div>
        </div>
    )
}