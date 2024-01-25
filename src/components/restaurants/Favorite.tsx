import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { RestaurantInfo } from '../../utils/types/restaurant.type'
import { FavoriteContext } from '../../services/favourites/favourite.context'
import { View } from 'react-native';
const FavoriteButton = styled(TouchableOpacity)`
    border-color:#20232a;
`
const Container = styled(View)`
position:absolute;
z-index:1000000000000;
top:25px;
right:20px;
`
export const Favorite: React.FC<{ rest:Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours"> }> = ({ rest }) => {
    const { favorites, addFavorites, removeFavorites } = useContext(FavoriteContext);
    const isFavorite = favorites.some(restaurant => restaurant.name == rest.name);
    const [starred, setStarred] = useState(isFavorite)
    const handleSelection = () => {
        if (!starred) {
            addFavorites(rest);
        } else {
            removeFavorites(rest.name);
        };
    }
    useEffect(() => {
        setStarred(favorites.some(restaurant => restaurant.name == rest.name));
    }, [favorites])
    return <Container>
        <FavoriteButton
            onPress={handleSelection}
        >
            <AntDesign
                name={starred ? "heart" : "hearto"}
                size={26}
                color={starred ? "red" : "white"}
            />
        </FavoriteButton>
    </Container>
}
