import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { LocationContext } from '../services/location/location.context'
import { theme } from '../utils/theme/theme'
import { MainSearchBar } from '../components/restaurants/MainSearchBar'
import { MapSkeleton } from '../components/skeleton/Map.skeleton';
import { Map } from '../components/map/Map';
import { NavigationProp } from "@react-navigation/native";

const MapScreen:React.FC<{navigation: NavigationProp<any, any>}>=({navigation}) =>{
  const { setKeyWord,keyword, isLoading,viewPort,restaurants} = useContext(LocationContext);
  const [searchQuery, setSearchQuery] = React.useState(keyword);
  const [mapLoaded, setMapLoaded] = React.useState(true);
  const [latDelta, setLatDelta] = React.useState(0);
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    setSearchQuery(keyword);
  }, [keyword]);

  useEffect(() => {
    if (viewPort) {
      const northEastLat = viewPort.northeast.lat;
      const southWestLat = viewPort.southwest.lat;
      const deltaLat = northEastLat - southWestLat;
      setLatDelta(deltaLat);
    }
  }, [viewPort])

  return <View style={styles.container}>
    <View style={styles.search}>
      <MainSearchBar
        placeholder="Enter Location"
        onChangeText={onChangeSearch}
        onSubmitEditing={() => setKeyWord(searchQuery)}
        value={searchQuery}
        elevation={1}
        icon='map'
      />
    </View >
    {mapLoaded && !isLoading
      ?
      <Map
        setMapLoaded={() => setMapLoaded(true)}
        restaurants={restaurants}
        navigation={navigation}
       region={
        {
          latitude:viewPort.location.lat,
          longitude:viewPort.location.lng,
          longitudeDelta:0.02,
          latitudeDelta:latDelta
        }
       }

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
    gap: 5,
    position: 'relative'
  },
  search: {
    paddingRight: 10,
    paddingLeft: 10,
    position: 'absolute',
    top: 50,
    zIndex: 20,
    width: '100%'
  },
  text: {
    fontSize: 25,
  }
})
export default MapScreen;