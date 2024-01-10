import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/utils/theme/theme';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import Navigator from './src/components/navigation/Navigator';
import { LocationProvider } from './src/services/location/location.context';
import { FavoriteProvider } from './src/services/favourites/favourite.context';


export default function App() {

  const [oswaldReady] = useFonts({ 'Oswald_400Regular': Oswald_400Regular });
  const [latoReady] = useFonts({ 'Lato_400Regular': Lato_400Regular });
  if (!oswaldReady || !latoReady) return null;

  const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color:${(props: any) => props.theme.colors.bg.primary};
    alignItems: 'center';
    justifyContent: 'center';
    `
  return <>
    <LocationProvider>
      <FavoriteProvider>
        <ThemeProvider theme={theme}>
          <SafeArea >
            <Navigator />
          </SafeArea>
        </ThemeProvider>
        <StatusBar style="auto" />
      </FavoriteProvider>
    </LocationProvider>
  </>;
}
