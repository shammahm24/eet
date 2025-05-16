import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            {children}
        </LoadScript>
    );
};

export default GoogleMapsProvider;