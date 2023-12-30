import React, { createContext ,useContext} from 'react';
import { LocationContext } from '../location/location.context';
export type RestaurantInfo = {
  business_status: string,
  geometry: {
    location: {
      lat: number,
      lng: number
    },
    viewport: {
      northeast: {
        lat: number,
        lng: number
      },
      southwest: {
        lat: number,
        lng: number
      }
    }
  },
  icon: string,
  name: string,
  opening_hours: {
    open_now: boolean
  },
  photos: [
    {
      height: number,
      html_attributions: [],
      photo_reference: string,
      width: number
    }
  ],
  place_id: string,
  rating: string,
  reference: string,
  user_ratings_total: number,
  vicinity: string
}

export type RestaurantProviderValue = {
  restaurants: RestaurantInfo[],
  isLoading: boolean,
  isError: boolean
}
export const restaurantContext = createContext<RestaurantProviderValue>({
  restaurants: [],
  isLoading: false,
  isError: false
});

export const RestaurantProvider: React.FC<{ children: React.ReactNode, value:RestaurantProviderValue}> = ({ children, value }) => {
  return (
    <restaurantContext.Provider value={value}>
      {children}
    </restaurantContext.Provider>
  );
}
