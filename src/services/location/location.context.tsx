import React, { createContext, useEffect, useContext, useState } from "react";
import { locationRequest } from "./location.service";
import { RestaurantInfo } from "../../utils/types/restaurant.type";
import { restaurantRequests } from "../restaurants/restaurant.service";

export type ViewPort = {
    northeast: {
        lat: number,
        lng: number
    },
    southwest: {
        lat: number,
        lng: number
    },
    location: {
        lat: number,
        lng: number
    }
};
const initialViewPort = {
    location: {
        lat: 37.7829132,
        lng: -122.4188995
    },
    northeast: {
        lat: 37.78423678029149,
        lng: -122.4176706197085
    },
    southwest: {
        lat: 37.78153881970849,
        lng: -122.4203685802915
    }

}

export const LocationContext = createContext<{ restaurants: RestaurantInfo[], viewPort: ViewPort, location: string, isLoading: boolean, setLoading: (status: boolean) => void, setKeyWord: (kw: string) => void, keyword: string, error: any }>({ location: "37.7829132,-122.4188995", setLoading: (status) => null, keyword: "San Francisco", isLoading: false, error: null, setKeyWord: (kw) => null, viewPort: initialViewPort, restaurants: [] })

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [keyword, setKeyWord] = useState('San Francisco');
    const [location, setLocation] = useState<string>("37.7829132,-122.4188995");
    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
    const [error, setError] = useState(false);
    const [viewPort, setViewPort] = useState<ViewPort>({
        northeast: {
            lat: 37.78423678029149,
            lng: -122.4176706197085
        },
        southwest: {
            lat: 37.78153881970849,
            lng: -122.4203685802915
        },
        location: {
            lat: 37.7829132,
            lng: -122.418899
        }
    })
    const onSearch = (kw: string) => {
        const keyWord = kw.trim().toLowerCase()
        setIsLoading(true);

        restaurantRequests(keyWord).then(data => {
            locationRequest(data).then((data: any) => {
                setRestaurants(data)
                const lat = data[0].geometry.location.lat;
                const long = data[0].geometry.location.lng;
                setViewPort({ ...data[0].geometry.viewport, location: { ...data[0].geometry.location } });
                setIsLoading(false)
                setLocation(`${lat} ${long}`)
                return data;
            }).catch(e => {
                console.log("LOCATION ERROR:", e, " FOR:", kw)
                setIsLoading(false)
                setError(e)
            })

        }).catch(e => console.log(e))
        
    }
    const setLoading = (status: boolean) => setIsLoading(status)
    const setSearchWord = (kw: string) => setKeyWord(kw.trim().toLowerCase())

    useEffect(() => {
        onSearch(keyword)

    }, [keyword])
    return <LocationContext.Provider value={{ location, keyword, isLoading, error, setLoading, setKeyWord: setSearchWord, viewPort, restaurants }}>
        {children}
    </LocationContext.Provider>
}