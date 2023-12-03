import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RestaurantScreen from '../screens/RestaurantScreen';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../utils/theme/theme';
import MapScreen from '../screens/Mapscreen';
import SettingScreen from '../screens/SettingScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer  >
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor:theme.colors.bg.primary
                },
            }}>
                <Tab.Screen name="Restaurants" component={RestaurantScreen} options={{ headerShown: false,tabBarIcon:()=><Ionicons name="fast-food-outline" size={22} color="orange" />}} />
                <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false,tabBarIcon:()=><FontAwesome5 name="map-marked-alt" size={24} color="orange" /> }} />
                <Tab.Screen name="Settings" component={SettingScreen} options={{ headerShown: false,tabBarIcon:()=><Feather name="settings" size={24} color="orange" /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

