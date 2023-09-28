import { useEffect } from'react';
import './PaymentPage.css';

const PaymentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <h1 className="payment-page-heading-1 heading-1">Payment</h1>
            <h2 className="heading-2">Accepted Payment Options</h2>
            <ul className="payment-page-list list-with-discs">
                <li>Debit Card</li>
                <li>Credit Card</li>
            </ul>
            
            <h2 className="heading-2">Further Details</h2>
            <p>If payment is made using a credit card, your credit card account is debited in conjunction with the conclusion of the contract.</p>
        </div>
    );
}

export default PaymentPage;