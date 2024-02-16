import { parse } from "url"
import axios from 'axios';
export const geocodeRequest = async (req: any, res: any, API_KEY: string) => {
    const query = parse(req.url, true).query.city as string;
    let geoConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${query.toLowerCase()}&key=${API_KEY}`,
        headers: {}
    };

    const coordinates: any = await axios.request(geoConfig)
        .then((response: { data: any; }) => {
            if (response.data.status == 'ZERO_RESULTS') {
                return '';
            } else {
                return `${response.data.results[0]?.geometry?.location.lat},${response.data.results[0]?.geometry?.location.lng}`;
            };

        })
        .catch((error: any) => {
            console.log(error);
            return '';
        });

    console.log(query, ':', coordinates);

    res.send(coordinates);

}