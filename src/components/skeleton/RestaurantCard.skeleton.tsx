
import SkeletonLoading from 'react-native-skeleton-loading'
import { View } from "react-native";
import { RestaurantCard } from "../RestaurantInfo";
export const RestaurantCardSkeleton: React.FC = ()=> {
  return <>
    <RestaurantCard>
      <SkeletonLoading background={"#adadad"} highlight={"#ffffff"} >
      <View style={{ justifyContent: "space-between", rowGap: 10 }}>
        <View style={{ height: 180, backgroundColor: "#adadad", borderRadius: 10 }} />
        <View style={{ height: 28, width: 90, backgroundColor: "#adadad", borderRadius: 10 }} />
        <View style={{ height: 28, borderRadius: 10, justifyContent: "space-between", flexDirection: "row" }} >
          <View style={{ height: 23, width: 70, backgroundColor: "#adadad", borderRadius: 10 }} />
            <View style={{ height: 17, width: 70, borderRadius: 10 ,justifyContent: "space-between", flexDirection: "row" }} >

                 <View style={{ height: 17, width: 30, backgroundColor: "#adadad", borderRadius: 10 }} />
                 <View style={{ height: 17, width: 30, backgroundColor: "#adadad", borderRadius: 10 }} />
             </View>
        </View>
        <View style={{ height: 17, width: 130, backgroundColor: "#adadad", borderRadius: 10 }} />
      </View>
      </SkeletonLoading>
   </RestaurantCard>

  </>

}