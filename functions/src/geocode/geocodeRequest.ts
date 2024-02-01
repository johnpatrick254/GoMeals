import { parse } from "url"
import { mocksCities } from "./mock"
export const geocodeRequest = (req: any, res: any) => {
    const query = parse(req.url, true).query.city
    let cords;
    switch (query) {
        case ('san francisco'):
            cords = "37.7829132,-122.4188995"
            break;
        case 'antwerp':
            cords = "51.219448,4.402464"
            break;
        case 'toronto':
            cords = "43.653225,-79.383186"
            break;
        case 'chicago':
            cords = "41.878113,-87.629799"
            break;
        default:
            cords = "37.7829132,-122.4188995"
            console.log("keyword not found:", cords)
            break;
    }
    const mockLocations = (mocksCities as any)[(cords as any)]
    res.send(mockLocations)
    return query;
}