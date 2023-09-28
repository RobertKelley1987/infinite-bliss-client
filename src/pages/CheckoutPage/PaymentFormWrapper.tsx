import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useClientSecret from './useClientSecret';
import { stripeFonts, stripeStyles } from './stripeStyles';
import PaymentForm from './PaymentForm';
import { CheckoutPhase, Order, PendingOrder } from '../../types';
import './PaymentFormWrapper.css';

type PaymentFormWrapperProps = {
    order: PendingOrder
    setCheckoutPhase: React.Dispatch<React.SetStateAction<CheckoutPhase>>,
    setConfirmedOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    resetCustomerData: () => void
}

const stripe = loadStripe('pk_test_51H2228AezT8y8XpmM6CCcLHEDtUl2QtPrNuOu2zL7ZLc6tD6nw782RJVD9RDqZ3BO00PkPKXUhA7WWWV3QiWc3tP00gWzkKhI9');

const PaymentFormWrapper = (props: PaymentFormWrapperProps) => {
    const { setCheckoutPhase, setConfirmedOrder, resetCustomerData, order } = props;
    const [errorMessage, setErrorMessage] = useState('');
    const { clientSecret } = useClientSecret(order.cart);

    useEffect(() => {
        setCheckoutPhase('payment');

        return () => setCheckoutPhase('none');
    }, [setCheckoutPhase]);

    const options = { clientSecret: clientSecret, appearance: stripeStyles, fonts: stripeFonts }

    const renderForm = () => {
        return (
                <div className="payment-form-wrapper">
                    {errorMessage && <span className="payment-form-wrapper-error">{errorMessage}</span>}
                    <h2 className="payment-form-wrapper-heading">Payment</h2>
                    <Elements stripe={stripe} options={options}>
                        <PaymentForm 
                            order={order}
                            setErrorMessage={setErrorMessage} 
                            setConfirmedOrder={setConfirmedOrder} 
                            resetCustomerData={resetCustomerData}
                        />
                    </Elements>
                </div>
        )
    }

    return clientSecret ? renderForm() : <span className="payment-form-wrapper-loading">Loading...</span>;
}

export default PaymentFormWrapper;