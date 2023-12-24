import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StatusBar as StatusBarReact, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme/theme';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import Navigator from './src/components/navigation/Navigator';
import { restaurantRequests } from './src/services/restaurants/restaurant.service';
import { useContext, useEffect, useState } from 'react';
import { RestaurantInfo, RestaurantProvider, restaurantContext } from './src/services/restaurants/restaurant.context';
import { LocationContext, LocationProvider } from './src/services/location/location.context';


export default function App() {

  const [oswaldReady] = useFonts({ 'Oswald_400Regular': Oswald_400Regular });
  const [latoReady] = useFonts({ 'Lato_400Regular': Lato_400Regular });
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isError, setIsError] = useState<any>(null)
  const { keyword, location, isLoading, setLoading } = useContext(LocationContext)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const fetchedRestaurants = await restaurantRequests(location).then(data => {
          console.log("searched", keyword);
          setTimeout(() => setLoading(false), 1500)
          return data;
        });
        setRestaurants(fetchedRestaurants.results);
      } catch (e) {
        console.log("searched", keyword);
        // console.log(e);
        // setLoading(false)
        setIsError(e)

      };
    }
    fetchRestaurants()
  }, [keyword])


  if (!oswaldReady || !latoReady) return null;

  const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color:${(props: any) => props.theme.colors.bg.primary};
    alignItems: 'center';
    justifyContent: 'center';
   ${StatusBarReact.currentHeight && `padding-top:${StatusBarReact.currentHeight}px;`} 
  `
  return <>
    <LocationProvider>
      <RestaurantProvider value={{ isLoading, isError, restaurants }}>
        <ThemeProvider theme={theme}>
          <SafeArea >
            <Navigator />
          </SafeArea>
        </ThemeProvider>
        <StatusBar style="auto" />
      </RestaurantProvider>
    </LocationProvider>

  </>;
}
