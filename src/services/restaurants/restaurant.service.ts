import axios from "axios"
import { RestaurantInfo } from "../../utils/types/restaurant.type";

export const restaurantRequests = async (city: string): Promise<string> => {
   try {
      const apiUrl = ` https://geocode-l5kow75jdq-uc.a.run.app?city=${city}`;
      const results = (await axios.get(apiUrl)).data
      // console.log("LOCATION COORDS:", results)
      return results;
   } catch (error: any) {
      console.log("LOCATION COORDS ERROR:", error)
      throw new Error(`${error.message}`)
   };
}

