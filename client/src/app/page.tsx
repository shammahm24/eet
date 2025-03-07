"use client"
//import Image from "next/image";
import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div className="grid grid-rows-8 items-center justify-items-center min-h-screen p-8 pl-0 pr-0 pb-20 gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <div className="row-span-2 row-start-1">
        <BookingForm/>
      </div>
      <div className="bg-slate-500 row-span-6 row-start-3 w-full h-full">
        <h1>page bottom</h1>
      </div>
    </div>
  );
}

{/*
        <main className="flex flex-col gap-8 row-start-2 justify-center sm:items-start grid-row">
        <div className="row-span-2">
          <BookingForm/>
        </div>
        <div className="bg-slate-300 row-span-3">
          <h1>dd</h1>
        </div>
      </main>
  */}