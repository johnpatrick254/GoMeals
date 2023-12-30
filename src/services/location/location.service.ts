import { mocksCities } from "../../utils/mock/index"

export const locationRequest= (location:string="37.7829132,-122.4188995")=>{
    
    return new Promise((res,rej)=>{
     const mockLocations = (mocksCities as any)[location]
        if(!mockLocations)rej('Location not found')
        res(mockLocations)
    })
}