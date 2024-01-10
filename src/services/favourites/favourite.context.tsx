import React, { createContext, useState } from "react"
import { RestaurantInfo } from "../../utils/types/restaurant.type"

const FavoriteContext = createContext<{ favorites: RestaurantInfo[], addFavorites: (restaurant: RestaurantInfo) => void, removeFavorites: (id: string) => void }>({ favorites: [], addFavorites: (restaurant: RestaurantInfo) => null, removeFavorites: (placeId: string) => null })

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<RestaurantInfo[]>([])
    const addFavorites = (restaurant: RestaurantInfo) => {
        setFavorites(prev => [...prev, restaurant])
    }
    const removeFavorites = (placeId: string) => {
        setFavorites(prev => prev.filter(rest => rest.place_id != placeId))
    }
    return <FavoriteContext.Provider value={{ favorites, addFavorites, removeFavorites }}>
        {children}
    </FavoriteContext.Provider>
}