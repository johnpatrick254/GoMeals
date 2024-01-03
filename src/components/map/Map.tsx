import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components';
import { RestaurantInfo } from '../../utils/types/restaurant.type';
import { Image, View } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RestMiniCard } from '../restaurants/MiniCard';

const MapCard = styled(MapView)`
border-radius :20px;
width: 100%;
height: 100%;
`
const InfoCard = styled(View)`
padding:10px;
`
type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}
export const Map: React.FC<{ restaurants: RestaurantInfo[], region: Region, setMapLoaded: () => void, navigation: NavigationProp<any, any> }> = ({ setMapLoaded, restaurants, region, navigation }) => {
    console.log(restaurants[0].name)
    return <MapCard
        onMapReady={() => setMapLoaded()}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}

    >
        {restaurants.map((rest, i) => <Marker
            title={rest.name}
            key={rest.name}
            coordinate={{
                longitude: rest.geometry.location.lng,
                latitude: rest.geometry.location.lat
            }}

        ><Callout
            onPress={() => {
                navigation.navigate('Details', [rest.name, rest.icon, rest.photos, rest.vicinity, rest.rating, rest.opening_hours])
            }}
            key={i}
        >

                <RestMiniCard
                    rest={rest}
                    key={i}
                />

            </Callout>



        </Marker>)}
    </MapCard>
}