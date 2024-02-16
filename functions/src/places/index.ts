import { parse } from "url"

import axios from "axios"
export const placesRequest = async (req: any, res: any, API_KEY: string) => {
    const coordinates = parse(req.url, true).query.coords as string

    let restConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=10000&type=restaurant&key=${API_KEY}`,
        headers: {}
    };
    let restaurants = await axios.request(restConfig)
        .then((response: { data: any; }) => {
            return response.data;
        })
        .catch((error: any) => {
            console.log(error);
        });

    res.send(restaurants);

}