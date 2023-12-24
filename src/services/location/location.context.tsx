import React, { createContext, useEffect, useState } from "react";
import { locationRequest } from "./location.service";


export const LocationContext = createContext<{ location: string  , isLoading: boolean, setLoading:(status:boolean)=>void,keyword: string, error: any, search: (kw: string) => void }>({ location: "37.7829132,-122.4188995",setLoading:(status)=>null,keyword: "San Francisco", isLoading: false, error: null, search: (kw) => null })

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [keyword, setKeyWord] = useState('San Francisco');
    const [location, setLocation] = useState<string>("37.7829132,-122.4188995");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const onSearch = (kw: string) => {
        setIsLoading(true);
        setKeyWord(kw.trim())
        locationRequest(kw).then((data: any) => {
            const lat =data.results[0].location.lat
            const long =data.results[0].location.lng
            setTimeout(()=>setIsLoading(false),1500);
            
            setLocation(`${lat} ${long}`)
            console.log(`${lat} ${long}`)
            return data;
        }).catch(e => {
            console.log("LOCATION ERROR:",e," FOR:",kw)
            setTimeout(()=>setIsLoading(false),1500);
            setError(e)
        })
    }
   const setLoading = (status:boolean)=>setIsLoading(status)
    return <LocationContext.Provider value={{ location, keyword, isLoading, error,setLoading, search: onSearch }}>
        {children}
    </LocationContext.Provider>
}