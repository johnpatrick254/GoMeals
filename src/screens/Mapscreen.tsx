import React, { useContext } from 'react'
import MapView from 'react-native-maps';
import { View, StyleSheet } from 'react-native'
import { LocationContext } from '../services/location/location.context'
import { theme } from '../utils/theme/theme'
import { MainSearchBar } from '../components/restaurants/MainSearchBar'
import { MapSkeleton } from '../components/skeleton/Map.skeleton';
import { Map } from '../components/map/Map';

export default function MapScreen() {
  const { location, search, keyword } = useContext(LocationContext)
  const [searchQuery, setSearchQuery] = React.useState(keyword);
  const [mapLoaded, setMapLoaded] = React.useState(true);
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  return <View style={styles.container}>
    <View style={styles.search}>
      <MainSearchBar
        placeholder="Enter Location"
        onChangeText={onChangeSearch}
        onSubmitEditing={() => search(searchQuery)}
        value={searchQuery}
        elevation={1}
      />
    </View >
    {mapLoaded
      ?
      <Map
        setMapLoaded={() => setMapLoaded(true)}
      />
      :
      <MapSkeleton />

    }
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
    gap: 5
  },
  search: {
  },
  text: {
    fontSize: 25,
  }
})
