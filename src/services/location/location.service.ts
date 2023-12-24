import { mocksCities } from "../../utils/mock/index"

export const locationRequest= (location:string='San Francisco')=>{
    
    return new Promise((res,rej)=>{
     const mockLocations = (mocksCities as any)[location]
        if(!mockLocations)rej('Location not found')
        res(mockLocations)
    })
}