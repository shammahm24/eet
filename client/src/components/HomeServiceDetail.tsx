"use client"

export default function HomeServiceDetail({children}){
    return(
        <div className="grid w-full h-full items-center justify-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {children}
        </div>
    );
}