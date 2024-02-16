import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { RestaurantInfo } from "../../utils/types/restaurant.type";



export const checkoutContext = createContext<{ sum: number, addCard: (item: any, rest: RestaurantInfo | null) => void, clearCart: () => void, restaurant: RestaurantInfo | null, cart: any }>({
    restaurant: null,
    cart: [{price:0},{price:0}],
    clearCart: () => null,
    addCard: (item, rest) => null,
    sum: 0,
})

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cart, setCart] = useState<any>([{price:0},{price:0}])
    const [restaurant, setRestaurant] = useState<RestaurantInfo | null>(null)

    const add = (item: any, rest: RestaurantInfo | null) => {
        setRestaurant(rest);
        if (!restaurant || restaurant.name !== rest!.name) {
            setCart([item]);
        } else {
            setCart([...cart, item]);

        }
    }
    const sum = cart.length > 0 ? (cart.length == 1 ? cart[0].price:cart.reduce((a, b) => a.price + b.price) ): 1;

    const clear = () => {
        setCart([]);
        setRestaurant(null)
    }
    return <checkoutContext.Provider value={{ addCard: add, clearCart: clear, restaurant, cart, sum }}>
        {
            children
        }
    </checkoutContext.Provider >
}