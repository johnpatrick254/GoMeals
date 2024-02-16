import axios from "axios";
import { createToken,  } from '@stripe/stripe-react-native';
import { CreateParams } from "@stripe/stripe-react-native/lib/typescript/src/types/Token";

export const fetchPaymentParams = async (amount: number) => {
    try {
        const apiUrl = `https://payments-l5kow75jdq-uc.a.run.app?amount=${amount}`;

        const results = (await axios.get(apiUrl)).data as {
            paymentIntent: string,
            ephemeralKey: string,
            customer: string,
        }

        return results;
    } catch (error: any) {
        console.log("CLIENT SECRET ERROR:", error)
        throw new Error(`${error.message}`)
    };
}

export const cardTokenRequest = async (card: CreateParams) => await createToken(card)