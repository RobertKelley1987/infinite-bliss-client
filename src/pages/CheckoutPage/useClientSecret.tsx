import { useState, useEffect } from 'react';
import { api } from  '../../services/api';
import { CartItem } from "../../types";

const useClientSecret = (cart: CartItem[]) => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            const { data } = await api.post('/payment-intents', { cart });
            setClientSecret(data.clientSecret);
        }

        if(cart && cart.length > 0) {
            createPaymentIntent();
        }
    }, [cart]);

    return { clientSecret }
}

export default useClientSecret;