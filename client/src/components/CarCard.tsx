'use client'
import React from 'react';
import Image from 'next/image'
import { FaUserFriends, FaSuitcase } from 'react-icons/fa';

interface CarCardProps {
    type : string,
    price : number,
    seats : number,
    luggage : number,
    image : string
}

export default function CarCard(cardProps : CarCardProps){
    return(
        <div className="grid grid-cols-12 w-fit h-fit items-center justify-center border-r-10 text-gray-800">
            <div className="col-start-1 col-span-4">
                <Image 
                    src={cardProps.image} 
                    alt="car image"
                    width = {500}
                    height = {500}
                    className = "object-fit"
                />
            </div>

            <div className="col-start-6 col-span-8">
                <div className="grid w-full grid-cols-2 justify-between">
                    <h1 className="font-bold">{cardProps.type}</h1>
                    <h1>US${cardProps.price}</h1>
                </div>

                <div className="grid w-full grid-cols-2 justify-between">
                    <div className="flex flex-row space-x-4">
                        <FaUserFriends/>
                        <span>{cardProps.seats}</span>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <FaSuitcase/>
                        <span>{cardProps.luggage}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}