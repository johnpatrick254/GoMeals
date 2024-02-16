import React, { createContext, useState } from "react"
import { RestaurantInfo } from "../../utils/types/restaurant.type"
import AsyncStorage from '@react-native-async-storage/async-storage'

type restaurantData = Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours">
export const FavoriteContext = createContext<{ favorites: restaurantData[], addFavorites: (restaurant: restaurantData) => void, removeFavorites: (id: string) => void }>({ favorites: [], addFavorites: (restaurant: restaurantData) => null, removeFavorites: (name: string) => null })

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let savedFavorites: restaurantData[] = []

    const fetchFav = async () => {
        const storedFav = await AsyncStorage.getItem('favorites');
        if (storedFav) {
            savedFavorites = JSON.parse(storedFav) as restaurantData[]
        }
    }
    fetchFav();
    const [favorites, setFavorites] = useState<restaurantData[]>(savedFavorites)
    const addFavorites = (restaurant: restaurantData) => {
        setFavorites(prev => [...prev, restaurant]);
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    const removeFavorites = (name: string) => {
        setFavorites(prev => prev.filter(rest => rest.name != name));
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    return <FavoriteContext.Provider value={{ favorites, addFavorites, removeFavorites }}>
        {children}
    </FavoriteContext.Provider>
}