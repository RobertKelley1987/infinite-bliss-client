import { Link } from 'react-router-dom';
import ConditionalLink from '../../components/ConditionalLink';
import { CheckoutPhase } from '../../types';
import './CheckoutHeader.css';

type CheckoutHeaderProps = {
    checkoutPhase: CheckoutPhase
}

const LINK_STATES = {
    "none": {
        info: false,
        shipping: false
    },
    "info": {
        info: false,
        shipping: false
    },
    "shipping": {
        info: true,
        shipping: false
    },
    "payment": {
        info: true,
        shipping: true
    }
}

const CheckoutHeader = ({ checkoutPhase }: CheckoutHeaderProps) => {
    const linkStates = LINK_STATES[checkoutPhase];

    return (
        <header className="checkout-header">
            <Link to="/" className="checkout-header-logo">Infinite Bliss</Link>
            <nav className="checkout-header-nav">
                {/* Always allow cart access via this link */}
                <Link className="checkout-header-link" to='/cart'>Cart</Link>
                <span className="material-symbols-outlined">chevron_right</span>
                <ConditionalLink
                    isLink={linkStates.info} 
                    className="checkout-header-link" 
                    to='/checkout/info'
                >
                    Info
                </ConditionalLink>
                <span className="material-symbols-outlined">chevron_right</span>
                <ConditionalLink
                    isLink={linkStates.shipping} 
                    className="checkout-header-link" 
                    to='/checkout/shipping'
                >
                    Shipping
                </ConditionalLink>
                <span className="material-symbols-outlined">chevron_right</span>
                {/* Never a link. Only accessible via shipping form submission. */}
                <span className="checkout-header-link">Payment</span>
            </nav>
        </header>
    )
}

export default CheckoutHeader;