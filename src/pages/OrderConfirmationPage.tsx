import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import AddressTextBlock from '../components/AddressTextBlock';
import { Order } from '../types';
import './OrderConfirmationPage.css';

type OrderConfirmationPageProps = {
    order: Order | null
    setConfirmedOrder: React.Dispatch<React.SetStateAction<Order | null>>
}

const OrderConfirmationPage = ({ order, setConfirmedOrder }: OrderConfirmationPageProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Do not show page if order was not completed
        if(!order) {
            navigate('/');
        }

        // When user navigates away, clear confirmed order state
        return () => setConfirmedOrder(null);
    }, [navigate, order, setConfirmedOrder]);

    const renderOrderConfirmation = (order: Order) => {
        return (
            <main className="order-confirmation-page">
                <h1 className="order-confirmation-page-heading-1">Your Order Is Complete!</h1>
                <div className="order-confirmation-page-grid"> 
                    <section className="order-confirmation-page-text">
                        <span>ORDER NUMBER: {order.id}</span>
                        <div className="order-confirmation-page-text-block">
                            <h2 className="order-confirmation-page-heading-2">Contact</h2>
                            <span>Email: {order.contact.email}</span>
                            <span>Phone: {order.contact.phone}</span>
                        </div>
                        <div className="order-confirmation-page-text-block">
                            <h2 className="order-confirmation-page-heading-2">Billing Address</h2>
                            <AddressTextBlock address={order.billingAddress}/>
                        </div>
                        <div className="order-confirmation-page-text-block">
                            <h2 className="order-confirmation-page-heading-2">Shipping Address</h2>
                            <AddressTextBlock address={order.shippingAddress}/>
                        </div>
                    </section>
                    <section className="order-confirmation-page-cart">
                        <h2 className="order-confirmation-page-heading-2 order-confirmation-page-summary-heading">Order Summary</h2>
                        {<OrderSummary cart={order.cart} shippingCost={order.shippingMethod.cost} />}
                    </section>
                </div>
            </main>
        )
    }

    return order ? renderOrderConfirmation(order) : null;
}

export default OrderConfirmationPage;