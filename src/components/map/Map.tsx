import MapView from 'react-native-maps';
import styled from 'styled-components';

const MapCard= styled(MapView)`
border-radius :20px;
width: 100%;
height: 100%;
`
export const Map:React.FC<{setMapLoaded:()=>void}> =({setMapLoaded})=>{
    return <MapCard
           onMapReady={() => setMapLoaded()}
    />
}