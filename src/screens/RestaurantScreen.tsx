import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper';
import {RestaurantInfoCard, RestaurantInfoProps} from '../components/RestaurantInfo';
import styled from 'styled-components';
import { bedIcon } from '../../assets/bed';
import { theme } from '../utils/theme/theme';
const MainSearchBar = styled(Searchbar)`
background-color:${(props:any)=>props.theme.colors.bg.primary};
`
export default function RestaurantScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const restaurantData: RestaurantInfoProps[] =[
    { 
    name : 'Comrades',
    icon:bedIcon,
    photo : ['https://lafiestachicago.com/site/wp-content/themes/theme-hollow/img/slide/1.jpg'],
    address : '5050 Yale St',
    rating : 5,
    isOpenNow : true,
    isClosedTemp:false,
    cousine:'Mexican',
    },
    { 
    name : 'Alfa',
    icon:bedIcon,
    photo : ['https://lafiestachicago.com/site/wp-content/themes/theme-hollow/img/slide/1.jpg'],
    address : '5050 Yale St',
    rating : 5,
    isOpenNow : true,
    isClosedTemp:false,
    cousine:'Mexican',
    },
    { 
    name : 'Gyms',
    icon:bedIcon,
    photo : ['https://lafiestachicago.com/site/wp-content/themes/theme-hollow/img/slide/1.jpg'],
    address : '5050 Yale St',
    rating : 5,
    isOpenNow : true,
    isClosedTemp:false,
    cousine:'Mexican',
    },
    { 
    name : 'Shabiiki',
    icon:bedIcon,
    photo : ['https://lafiestachicago.com/site/wp-content/themes/theme-hollow/img/slide/1.jpg'],
    address : '5050 Yale St',
    rating : 5,
    isOpenNow : true,
    isClosedTemp:false,
    cousine:'Mexican',
    },
  ]

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
    
    <FlatList
    data={restaurantData}
    renderItem = {(item)=><RestaurantInfoCard
                            name = {item.item.name}
                            icon={item.item.icon}
                            photo ={ item.item.photo}
                            address = {item.item.address}
                            rating = {item.item.rating}
                            isOpenNow = {item.item.isOpenNow}
                            isClosedTemp={item.item.isClosedTemp}
                            cousine={item.item.cousine}
                          /> 
     }
    contentContainerStyle={{padding:4}}
    keyExtractor={item=>item.name}
    />
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