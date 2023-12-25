
import SkeletonLoading from 'react-native-skeleton-loading'
import { View } from "react-native";
export const MapSkeleton: React.FC = () => {
    return <>
        <View style={{ flex: 1, backgroundColor: "#adadad", borderRadius: 10 }}>
            <SkeletonLoading background={"#adadad"} highlight={"#ffffff"} >
                <View style={{ height: "100%", backgroundColor: "#adadad", borderRadius: 10 }} />
            </SkeletonLoading>
        </View>
    </>
}