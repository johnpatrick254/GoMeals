import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../../screens/SettingScreen";
import { FavoriteScreen } from "../../screens/FavouritesScreen";
import CameraScreen from "../../screens/CameraScreen";

const SettingsStack = createStackNavigator();


export const SettingsNavigator: React.FC = () => {
    return <SettingsStack.Navigator
    >
        <SettingsStack.Screen
            component={SettingScreen}
            name='Settings'
            options={{ headerShown: true }}
        />
        <SettingsStack.Screen
            component={FavoriteScreen}
            name='Favourites'
            options={{ headerShown: true }}
        />
        <SettingsStack.Screen
            component={CameraScreen}
            name='camera'
            options={{ headerShown: true }}
        />

    </SettingsStack.Navigator>
}