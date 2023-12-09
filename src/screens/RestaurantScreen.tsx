import React, { useContext, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper';
import {RestaurantInfoCard} from '../components/RestaurantInfo';
import styled from 'styled-components';
import { theme } from '../utils/theme/theme';
import { restaurantContext } from '../services/restaurants/restaurant.context';
import { RestaurantCardSkeleton } from '../components/skeleton/RestaurantCard.skeleton';
const MainSearchBar = styled(Searchbar)`
background-color:${(props:any)=>props.theme.colors.bg.primary};
`
export default function RestaurantScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const {restaurants,isLoading,isError} = useContext(restaurantContext)
  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <MainSearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          elevation={1}
        />
      </View>
    
   {isLoading ? 
   
   <>
   <RestaurantCardSkeleton key={1}/>
   <RestaurantCardSkeleton key={2}/>
   <RestaurantCardSkeleton key={3}/>
   </>
   
   :
   <FlatList
    data={restaurants}
    renderItem = {(item)=><RestaurantInfoCard
      name={item.item.name}
      icon={item.item.icon}
      photos={item.item.photos}
      vicinity={item.item.vicinity}
      rating={item.item.rating}
      opening_hours={item.item.opening_hours}
      /> 
     }
    contentContainerStyle={{padding:4}}
    keyExtractor={item=>item.name}
    />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.bg.primary,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
    gap:15
  },
  search: {
  },
  text: {
    fontSize: 25,
  }
})