import React, { useContext, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { RestaurantInfoCard } from '../components/restaurants/RestaurantInfo';
import { theme } from '../utils/theme/theme';
import { restaurantContext } from '../services/restaurants/restaurant.context';
import { NavigationProp } from "@react-navigation/native";
import { LocationContext } from '../services/location/location.context';
import { MainSearchBar } from '../components/restaurants/MainSearchBar';
import { RestaurantCardSkeleton } from '../components/skeleton/RestaurantCard.skeleton';
export const RestaurantScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const { restaurants } = useContext(restaurantContext)
  const { keyword, search, isLoading } = useContext(LocationContext)
  const [searchQuery, setSearchQuery] = React.useState(keyword);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    search(keyword);
  }, [keyword])
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <MainSearchBar
          placeholder={'San Francisco '}
          onChangeText={onChangeSearch}
          value={searchQuery}
          elevation={1}
          onSubmitEditing={() => search(searchQuery)}
        />
      </View>

      {isLoading ?

        <>
          <RestaurantCardSkeleton key={1} />
          <RestaurantCardSkeleton key={2} />
          <RestaurantCardSkeleton key={3} />
        </>

        :
        <FlatList
          data={restaurants}
          renderItem={(item) =>
            <TouchableOpacity onPress={() => navigation.navigate('Details',  [item.item.name,item.item.icon, item.item.photos,item.item.vicinity,item.item.rating,item.item.opening_hours])}>
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
          onEndReached={() => search(searchQuery)}
        />}
    </View>
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
    gap: 15
  },
  search: {
  },
  text: {
    fontSize: 25,
  }
})