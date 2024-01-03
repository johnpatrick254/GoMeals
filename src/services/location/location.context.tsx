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
        let cords;
        switch (keyWord) {
            case ('san francisco'):
                cords = "37.7829132,-122.4188995"
                break;
            case 'antwerp':
                cords = "51.219448,4.402464"
                break;
            case 'toronto':
                cords = "43.653225,-79.383186"
                break;
            case 'chicago':
                cords = "41.878113,-87.629799"
                break;
            default:
                cords = "37.7829132,-122.4188995"
                console.log("keyword not found:", keyWord)
                break;
        }
        restaurantRequests(cords).then(data => {

            setRestaurants(data.results)

        }).catch(e => console.log(e))
        locationRequest(cords).then((data: any) => {
            const lat = data.results[0].geometry.location.lat;
            const long = data.results[0].geometry.location.lng;
            setViewPort({ ...data.results[0].geometry.viewport, location: { ...data.results[0].geometry.location } });
            setTimeout(() => setIsLoading(false), 1500);
            setLocation(`${lat} ${long}`)
            console.log(viewPort)
            return data;
        }).catch(e => {
            console.log("LOCATION ERROR:", e, " FOR:", kw)
            setTimeout(() => setIsLoading(false), 1500);
            setError(e)
        })
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