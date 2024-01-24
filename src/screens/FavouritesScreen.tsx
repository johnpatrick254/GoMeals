import React, { useContext, useEffect } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import { RestaurantInfoCard } from '../components/restaurants/RestaurantInfo';
import { theme } from '../utils/theme/theme';
import { NavigationProp } from "@react-navigation/native";
import { StatusBar as StatusBarReact, SafeAreaView } from 'react-native';
import { FavoriteContext } from '../services/favourites/favourite.context';
import { styled } from 'styled-components';
import { Text } from 'react-native-paper';
const Container = styled(View)`
display:flex;
align-items:center;
gap:16px;
padding:${props => props.theme.space[3]}
`
export const FavoriteScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
    const { favorites } = useContext(FavoriteContext)

    return (
        <SafeAreaView style={styles.container}>
            {!favorites.length ?
                <Container>
                    <Text style={{color:'black'}}>
                        You have no favorites yet 🙂
                    </Text>
                </Container>

                :
                <FlatList
                    data={favorites}
                    renderItem={(item) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', [item.item.name, item.item.icon, item.item.photos, item.item.vicinity, item.item.rating, item.item.opening_hours])}>
                            <RestaurantInfoCard
                                name={item.item.name}
                                icon={item.item.icon}
                                photos={item.item.photos}
                                vicinity={item.item.vicinity}
                                rating={item.item.rating}
                                opening_hours={item.item.opening_hours}
                            />
                        </TouchableOpacity>

                    }
                    contentContainerStyle={{ padding: 4 }}
                    keyExtractor={item => item.name}
                />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg.primary,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        alignSelf: "stretch",
        paddingLeft: 10,
        paddingRight: 10,
        gap: 15,
        paddingTop: StatusBarReact.currentHeight ? StatusBarReact.currentHeight : 1

    },
    search: {
    },
    text: {
        fontSize: 25,
    }
})