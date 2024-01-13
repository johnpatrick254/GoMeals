import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { RestaurantInfo } from '../../utils/types/restaurant.type'
import { FavoriteContext } from '../../services/favourites/favourite.context'
import { NavigationProp } from "@react-navigation/native";
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RestMiniCard } from './MiniCard';
import { Title } from './RestaurantInfo';

const Container = styled(View)`
padding-left:10px;
background-color:${(props: any) => props.theme.colors.bg.primary};
border-radius:16px
`
export const FavoriteBar: React.FC<{ rest: RestaurantInfo[] | Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours">[], navigation: NavigationProp<any, any> }> = ({ rest, navigation }) => {
    return <Container>
        <Title>Favorites</Title>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal >
            {
                rest.map(fav => <TouchableOpacity
                    key={fav.name}
                    onPress={() => navigation.navigate('Details', [fav.name, fav.icon, fav.photos, fav.vicinity, fav.rating, fav.opening_hours])}
                    style={{marginRight:5}}
                >
                    <RestMiniCard
                        key={fav.name}
                        rest={fav}
                    />
                </TouchableOpacity>

                )
            }
        </ScrollView>
    </Container>
}
