import React, { createContext, useState } from "react"
import { RestaurantInfo } from "../../utils/types/restaurant.type"

type restaurantData =Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours">
export const FavoriteContext = createContext<{ favorites: restaurantData[], addFavorites: (restaurant: restaurantData) => void, removeFavorites: (id: string) => void }>({ favorites: [], addFavorites: (restaurant: restaurantData) => null, removeFavorites: (name: string) => null })

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<restaurantData[]>([])
    const addFavorites = (restaurant: restaurantData) => {
        setFavorites(prev => [...prev, restaurant])
    }
    const removeFavorites = (name: string) => {
        setFavorites(prev => prev.filter(rest => rest.name != name))
    }
    return <FavoriteContext.Provider value={{ favorites, addFavorites, removeFavorites }}>
        {children}
    </FavoriteContext.Provider>
}