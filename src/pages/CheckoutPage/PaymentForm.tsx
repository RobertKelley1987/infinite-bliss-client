import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { StripeError } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Order, PendingOrder } from '../../types';
import './PaymentForm.css';

type PaymentFormProps = { 
    order: PendingOrder
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setConfirmedOrder: React.Dispatch<React.SetStateAction<Order | null>>,
    resetCustomerData: () => void
};

const CARD_DECLINE_MESSAGES = {
    "generic_decline": "Card declined.",
    "insufficient_funds": "Card declined. This account has insufficient funds.",
    "lost_card": "Card declined. This card was reported lost.",
    "stolen_card": "Card declined. This card was reported stolen.",
    "card_velocity_exceeded": "Card declined. The velocity limit for this card has been exceeded.",
    "expired_card": "Card declined. This card is expired.",
    "incorrect_cvc": "The CVC provided is incorrect",
    "processing_error": "Processing error. Please try again later.",
    "incorrect_number": "The card number provided is incorrect",
}

type CardDeclineMessage = keyof typeof CARD_DECLINE_MESSAGES;

function assertIsCardDeclineMessage(message: string): asserts message is CardDeclineMessage {
    if(!message || !(message in CARD_DECLINE_MESSAGES)) {
        throw new Error('This message is not of type CardDeclineMessage');
    }
}

const PaymentForm = (props: PaymentFormProps) => {
    const { order, setErrorMessage, setConfirmedOrder, resetCustomerData } = props
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formComplete, setFormComplete] = useState(false);

    const handlePaymentError = (error: StripeError) => {
        const { code, decline_code } = error;
        const messageKey = decline_code ? decline_code : code;
        if(messageKey) {
            assertIsCardDeclineMessage(messageKey);
            const errorMessage = CARD_DECLINE_MESSAGES[messageKey]; 
            setErrorMessage(errorMessage);
        } else {
            setErrorMessage('There was an error processing your payment.')
        }
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage('');

        if(!stripe || !elements) {
            setErrorMessage('Payment server error.');
            return
        }

        const result = await stripe.confirmPayment({ 
            elements, 
            redirect: 'if_required'
        });

        if(result.error) {
            handlePaymentError(result.error);
        } else {
            const { data } = await api.post('/orders', { order });
            if(data.error) {
                navigate('/order-error');
            } else {
                resetCustomerData();
                setConfirmedOrder(data.order);
                navigate('/order-success')
            }
        }

        setSubmitting(false);
    }
 
    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <PaymentElement onChange={e => setFormComplete(e.complete)}/>
            <button 
                type="submit" 
                disabled={!stripe || !formComplete || submitting} 
                className="button payment-form-button"
            >
                {submitting ? 'Processing...' : 'Submit'}
            </button>
        </form>
    );
}

export default PaymentForm;