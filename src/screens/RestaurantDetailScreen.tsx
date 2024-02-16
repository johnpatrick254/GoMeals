import styled from "styled-components"
import { RestaurantInfo } from "../utils/types/restaurant.type"
import { SafeAreaView } from "react-native-safe-area-context"
import { theme } from "../utils/theme/theme"
import { NavigationProp } from "@react-navigation/native";
import { RestaurantInfoCard } from "../components/restaurants/RestaurantInfo"
import { DetailsMenu } from "../components/restaurants/DetailsMenu"
import React, { useContext } from "react";
import { AuthButton } from '../components/account/account.styles';
import { checkoutContext } from "../services/checkout/checkoutcontext";
import { View } from "react-native";


const DetailsContainer = styled(SafeAreaView)`
flex: 1;
backgroundColor:${theme.colors.bg.primary};
flexDirection: "column";
justifyContent: "flex-start";
alignItems: "stretch";
alignSelf: "stretch";
paddingLeft: 10px;
paddingRight: 10px;
gap: 15px;
`
export const RestaurantDetailScreen: React.FC<{ navigation: NavigationProp<any, any>, route: any | { params: Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours">[] } }> = ({
  navigation, route
}) => {
  const [name, icon, photos, vicinity, rating, opening_hours] = route.params;

  return <DetailsContainer>
    <RestaurantInfoCard
      name={name}
      icon={icon}
      photos={photos}
      vicinity={vicinity}
      rating={rating}
      opening_hours={opening_hours}
    />
    <DetailsMenu
      rest={{
        name, icon, photos, vicinity, rating, opening_hours
      }}
      navigation={navigation}
    />



  </DetailsContainer>

}