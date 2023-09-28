import { useState, useEffect } from 'react';
import useScreenSizeQuery from '../../hooks/useScreenSizeQuery';
import { formatMoney } from '../../utils/formatting';
import { cartTotal } from '../../utils/cart';
import MenuChevron from '../../components/MenuChevron';
import OrderSummary from '../../components/OrderSummary';
import { CartItem } from '../../types';
import './OrderSummaryDropdown.css';

type OrderSummaryDropdownProps = {
    cart: CartItem[],
    shippingCost: number
}

const OrderSummaryDropdown = ({ cart, shippingCost }: OrderSummaryDropdownProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const { screenIsBig } = useScreenSizeQuery(1000);
    const cartValue = cartTotal(cart);
    const orderTotal = cartValue + shippingCost;


    useEffect(() => {
        setIsOpen(screenIsBig);
    }, [screenIsBig]);

    const headingTotal = <span className="order-summary-dropdown-heading-total">${formatMoney(orderTotal)}</span>;

    return (
        <div className="order-summary-dropdown">
            <div className="order-summary-dropdown-header" onClick={() => setIsOpen(prev => !prev)}>
                <div className="order-summary-dropdown-heading-wrapper">
                    <h2 className="order-summary-dropdown-heading">Order Summary</h2>
                    {!screenIsBig && <MenuChevron flipped={isOpen}/>}
                </div>
                {!screenIsBig && headingTotal}
            </div>
            {isOpen && <OrderSummary cart={cart} shippingCost={shippingCost} />}
        </div>
    );
}

export default OrderSummaryDropdown;