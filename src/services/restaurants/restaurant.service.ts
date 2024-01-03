
import { mocksCities } from "../../utils/mock";
import { RestaurantInfo } from "../../utils/types/restaurant.type";

export const restaurantRequests =(location:string="37.7749295,-122.4194155"):Promise<{results:RestaurantInfo[]}>=>{
 return new Promise((res,rej)=>{
    const mock = (mocksCities as any)[location]
    if(!mock) rej("Location no found");
    res((mock as {results:RestaurantInfo[]}));
 })
}
