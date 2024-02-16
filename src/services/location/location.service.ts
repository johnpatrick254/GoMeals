import axios from "axios"
import { RestaurantInfo } from "../../utils/types/restaurant.type";
export const locationRequest = async (location: string) => {
    try {
        const apiUrl = ` https://places-l5kow75jdq-uc.a.run.app?coords=${location}`;
        const results = (await axios.get(apiUrl)).data.results as RestaurantInfo []
        console.log("LOCATION REQUEST :", results)
        return results
    } catch (error: any) {
        console.log("LOCATION REQUEST ERROR:", error)
        throw new Error(`${error.message}`)
    }
}