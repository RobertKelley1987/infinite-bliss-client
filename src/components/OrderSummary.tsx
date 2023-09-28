import CheckoutItem from './CheckoutItem';
import { formatMoney } from '../utils/formatting';
import { cartTotal } from '../utils/cart';
import { CartItem } from '../types';
import './OrderSummary.css';

type OrderSummaryProps = {
    cart: CartItem[];
    shippingCost: number
}

const OrderSummary = ({ cart, shippingCost }: OrderSummaryProps) => {
    const cartValue = cartTotal(cart);
    const orderTotal = cartValue + shippingCost;

    return (
        <div className="order-summary">
            <div className="order-summary-items">
                {cart.map(item => <CheckoutItem key={item.product.id} item={item}/>)}
            </div>

            <div className="order-summary-numbers">
                <span className="order-summary-subtotal">
                    <span>Subtotal</span> 
                    ${formatMoney(cartValue)}
                </span>
                <span className="order-summary-shipping-cost">
                    <span>Shipping</span> 
                    ${formatMoney(shippingCost)}
                </span>
                <span className="order-summary-total-value">
                    <span className="order-summary-total-label">Total</span> 
                    ${formatMoney(orderTotal)}
                </span>
            </div>
        </div>
    );
}

export default OrderSummary;