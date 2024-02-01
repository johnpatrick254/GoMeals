import { onRequest } from "firebase-functions/v2/https"

export const places = onRequest((req, res) => {
    
    res.send('hello')
    console.log('helo')
    })