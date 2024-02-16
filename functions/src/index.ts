
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { geocodeRequest } from "./geocode";
import { defineString } from 'firebase-functions/params';
import { placesRequest } from "./places";
import { paymentRequest } from "./payments";
import { setGlobalOptions } from "firebase-functions/v2/options";

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 })

// Define some parameters
const apiKey = defineString('API_KEY');
const stripeSecret = defineString('STRIPE_SECRET');

// Start writing functions
export const geocode = onRequest(async (req, res) => {

    logger.info(await geocodeRequest(req, res, apiKey.value()))
})
export const places = onRequest(async (req, res) => {

    logger.info(await placesRequest(req, res, apiKey.value()))
})
export const payments = onRequest(async (req, res) => {
    logger.info(await paymentRequest(req, res, stripeSecret.value()))
})
