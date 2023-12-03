import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, StatusBar as StatusBarReact, SafeAreaView } from 'react-native';
import RestaurantScreen from './src/screens/RestaurantScreen';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme/theme';
import {useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import TabNavigator from './src/components/TabNavigator';


export default function App() {

  const [oswaldReady] = useFonts({'Oswald_400Regular':Oswald_400Regular});
  const [latoReady] = useFonts({'Lato_400Regular':Lato_400Regular});
  

  if (!oswaldReady || !latoReady) return null;

  const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color:${(props: any) => props.theme.colors.bg.primary};
    alignItems: 'center';
    justifyContent: 'center';
   ${StatusBarReact.currentHeight && `padding-top:${StatusBarReact.currentHeight}px;`} 
  `
  return <>
    <ThemeProvider theme={theme}>
      <SafeArea >
        <TabNavigator/>
      </SafeArea>
    </ThemeProvider>
    <StatusBar style="auto" />

  </>;
}
