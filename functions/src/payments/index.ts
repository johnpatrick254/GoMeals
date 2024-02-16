import { parse } from "url"
export const paymentRequest = async (req: any, res: any, STRIPE_SECRET: string) => {
    const stripe = require('stripe')(STRIPE_SECRET);
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2023-10-16' }
    );
    const amount = parse(req.url, true).query.amount
    const paymentIntent = await stripe.paymentIntents.create({
        amount: `${+amount! * 100}` ?? 50,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    const clientSecret = paymentIntent.client_secret;
    res.send({
        paymentIntent: clientSecret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
    });

}