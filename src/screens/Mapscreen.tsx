import React, { useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { LocationContext } from '../services/location/location.context'
import { theme } from '../utils/theme/theme'
import { MainSearchBar } from '../components/restaurants/MainSearchBar'

export default function MapScreen() {
  const { location,search,keyword} = useContext(LocationContext)
  const [searchQuery, setSearchQuery] = React.useState(keyword);
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  return <View style={styles.container}>
    <View style={styles.search}>
      <MainSearchBar
        placeholder="Enter Location"
        onChangeText={onChangeSearch}
        onSubmitEditing={()=>search(searchQuery)}
        value={searchQuery}
        elevation={1}
      />
    </View>
  </View>

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
