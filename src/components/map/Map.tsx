import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components';
import { RestaurantInfo } from '../../services/restaurants/restaurant.context';

const MapCard = styled(MapView)`
border-radius :20px;
width: 100%;
height: 100%;
`
type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}
export const Map: React.FC<{ restaurants: RestaurantInfo[], region: Region, setMapLoaded: () => void }> = ({ setMapLoaded, restaurants, region }) => {
    return <MapCard
        onMapReady={() => setMapLoaded()}
        region={region}

    >
        {restaurants.map(rest => <Marker
            title={rest.name}
            key={rest.name}
            coordinate={{
                longitude: rest.geometry.location.lng,
                latitude: rest.geometry.location.lat
            }}

        />)}
    </MapCard>
}