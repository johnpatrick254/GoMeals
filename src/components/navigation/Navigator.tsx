import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../utils/theme/theme';
import MapScreen from '../../screens/Mapscreen';
import { RestaurantNavigator } from './restaurant.navigator';
import { AuthContext } from '../../services/auth/auth.context';
import { AuthNavigator } from './authnavigator';
import { SettingsNavigator } from './settingsnaviagtor';
import {CheckoutScreen} from '../../screens/CheckoutScreen';


const Tab = createBottomTabNavigator();

export default function Navigator() {
    const { isAuthenticated } = React.useContext(AuthContext)

    return (
        <NavigationContainer  >
            {
                isAuthenticated
                    ?
                    <Tab.Navigator screenOptions={{
                        tabBarStyle: {
                            borderTopWidth: 0,
                            elevation: 0,
                            shadowOpacity: 0,
                            backgroundColor: theme.colors.bg.primary
                        },
                    }}>
                        <Tab.Screen name="Restaurants" component={RestaurantNavigator} options={{ headerShown: false, tabBarIcon: ({ focused }) => <Ionicons name="fast-food-outline" size={22} color={focused ? "orange" : "black"} /> }} />
                        <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => <FontAwesome5 name="map-marked-alt" size={22} color={focused ? "orange" : "black"} /> }} />
                        <Tab.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: true, tabBarIcon: ({ focused }) => <Ionicons name="md-cart" size={22} color={focused ? "orange" : "black"} /> }} />
                        <Tab.Screen name="Setting" component={SettingsNavigator} options={{ headerShown: false, tabBarIcon: ({ focused }) => <Feather name="settings" size={22} color={focused ? "orange" : "black"} /> }} />
                    </Tab.Navigator>
                    :
                    <AuthNavigator />
            }
        </NavigationContainer>
    );
}

