import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CheckoutHeader from './CheckoutHeader';
import OrderSummaryDropdown from './OrderSummaryDropdown';
import { CartItem, CheckoutPhase } from '../../types';
import './CheckoutPage.css';

type CheckoutPageProps = {
    cart: CartItem[],
    setCheckingOut: React.Dispatch<React.SetStateAction<boolean>>,
    shippingCost: number,
    checkoutPhase: CheckoutPhase
}

const CheckoutPage = ({ cart, setCheckingOut, shippingCost, checkoutPhase }: CheckoutPageProps) => {
    const navigate = useNavigate();

    // Tracking checking out state to hide header and footer when this page is showing
    useEffect(() => {
        setCheckingOut(true);

        return () => setCheckingOut(false);
    }, [setCheckingOut]);

    // When page loads, redirect to home if user has zero cart items.
    useEffect(() => {
        if(!cart.length) {
            navigate('/');
        }
    }, [cart.length, navigate]);

    // Scroll to top of page when it loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="checkout-page-wrapper">
            <main className="checkout-page">
                <CheckoutHeader checkoutPhase={checkoutPhase} />
                <section className="checkout-page-form-section">
                    <Outlet />
                </section>

                <section className="checkout-page-summary-section">
                    <OrderSummaryDropdown cart={cart} shippingCost={shippingCost} />
                </section>
            </main>
        </div>
    )
}

export default CheckoutPage;