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
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/services/auth/auth.context';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNCfEO2K9sR_tjfxegQ_TUX2FcxVOAyvg",
  authDomain: "go-meals-1b235.firebaseapp.com",
  projectId: "go-meals-1b235",
  storageBucket: "go-meals-1b235.appspot.com",
  messagingSenderId: "131596693364",
  appId: "1:131596693364:web:55f6d42e76727e1faf0621"
};

if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

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
    <AuthProvider>
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
    </AuthProvider>
  </>;
}
