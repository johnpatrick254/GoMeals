import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, StatusBar as StatusBarReact, SafeAreaView } from 'react-native';
import RestaurantScreen from './src/screens/RestaurantScreen';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme/theme';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import TabNavigator from './src/components/TabNavigator';
import { restaurantRequests } from './src/services/restaurants/restaurant.service';
import { useContext, useEffect, useState } from 'react';
import { RestaurantInfo, RestaurantProvider, restaurantContext } from './src/services/restaurants/restaurant.context';


export default function App() {

  const [oswaldReady] = useFonts({ 'Oswald_400Regular': Oswald_400Regular });
  const [latoReady] = useFonts({ 'Lato_400Regular': Lato_400Regular });
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<any>(null)
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const fetchedRestaurants = await restaurantRequests().then(data=>{
          setTimeout(()=>setIsLoading(false),1500)
          return data;
        });
        setRestaurants(fetchedRestaurants.results);        
      } catch (e) {
        console.log(e);
        setIsLoading(false)
        setIsError(e)
        
      };
    }
    fetchRestaurants()
  }, [])
  

  if (!oswaldReady || !latoReady ) return null;

  const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color:${(props: any) => props.theme.colors.bg.primary};
    alignItems: 'center';
    justifyContent: 'center';
   ${StatusBarReact.currentHeight && `padding-top:${StatusBarReact.currentHeight}px;`} 
  `
  return <>
    <RestaurantProvider value={{isLoading,isError,restaurants}}>
      <ThemeProvider theme={theme}>
        <SafeArea >
          <TabNavigator />
        </SafeArea>
      </ThemeProvider>
      <StatusBar style="auto" />
    </RestaurantProvider>

  </>;
}
