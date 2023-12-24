import {createStackNavigator,TransitionPresets} from "@react-navigation/stack"
import {RestaurantScreen} from "../../screens/RestaurantScreen";
import MapScreen from "../../screens/Mapscreen";
import { RestaurantDetailScreen } from "../../screens/RestaurantDetailScreen";

const RestaurantStack =createStackNavigator();


export const RestaurantNavigator:React.FC=()=>{
    return <RestaurantStack.Navigator
            screenOptions={{...TransitionPresets.ModalPresentationIOS}}
    >
        <RestaurantStack.Screen 
        component={RestaurantScreen}
        name='List'
        options={{ headerShown: false}}
        />
        <RestaurantStack.Screen 
        component={RestaurantDetailScreen}
        name='Details'
        options={{ headerShown: false}}
        />
    </RestaurantStack.Navigator>
}