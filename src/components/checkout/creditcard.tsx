import React from "react"
import { CardField, createToken, useStripe } from '@stripe/stripe-react-native';
import { cardTokenRequest } from "../../services/checkout/checkoutservice"


export const CreditCardInput: React.FC<{ name: string, onSuccess: (info: any) => void, onError: () => void }> = ({ name,onError,onSuccess }) => {
    const onChange = async (formData: { [x: string]: any; complete: any; }) => {
        const { complete, ...values } = formData;
        const card = {
            validNumber: values.validNumber,
            validCVC: values.validCVC,
            expiryYear: values.expiryYear,
            expiryMonth: values.expiryMonth,
            brand: values.brand,
            last4: values.last4,
            postalCode: values.postalCode,
        }
        const IsInComplete = Object.values(complete).includes("false");
        if (!IsInComplete) {
            try {
                const info = await cardTokenRequest({type:"Card",...card});
                onSuccess(info);
            } catch (e) {
                onError();
            }

        }
    }
    
    return <>

        <CardField
            postalCodeEnabled={true}
            placeholders={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',

            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={onChange}
            onFocus={(focusedField) => {
                // console.log('focusField', focusedField);
            }}
        />
    </>
}

