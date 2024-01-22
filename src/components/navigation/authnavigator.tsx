import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { RestaurantScreen } from "../../screens/RestaurantScreen";
import MapScreen from "../../screens/Mapscreen";
import { RestaurantDetailScreen } from "../../screens/RestaurantDetailScreen";
import { SignInScreen } from "../../screens/SignScreen";
import { SignUpScreen } from "../../screens/RegisterScreen";
import { AuthLanding } from "../account/authlanding";

const AuthStack = createStackNavigator();


export const AuthNavigator: React.FC = () => {
    return <AuthStack.Navigator
    >
        <AuthStack.Screen
            component={AuthLanding}
            name='Landing'
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            component={SignUpScreen}
            name='SignUp'
            options={{ headerShown: false }}
        />
        <AuthStack.Screen
            component={SignInScreen}
            name='SignIn'
            options={{ headerShown: false }}
        />

    </AuthStack.Navigator>
}