import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../components/Cart';
import { CartItem, CartAction } from "../../types";
import './CartPage.css';

type CartPageProps = {
    cart: CartItem[],
    dispatch: React.Dispatch<CartAction>,
    setViewingCartPage: React.Dispatch<React.SetStateAction<boolean>>
}

const CartPage = ({ cart, dispatch, setViewingCartPage }: CartPageProps) => { 
    
    // Tracking cart page state so user cannot view header cart and this cart 
    // simultaneously. Also, scroll to top of page when it loads.
    useEffect(() => {
        window.scrollTo(0, 0);
        setViewingCartPage(true);

        return () => setViewingCartPage(false);
    }, [setViewingCartPage]);
    
    const emptyCartMessage = (
        <div className="cart-page-empty">
            <p className="cart-page-empty-message">There are no items in your cart.</p>
            <Link to="/" className="button">Continue Shopping</Link>
        </div>
    );
    
    const renderPage = () => {
        return (
            <main className="cart-page">
                <h1 className="cart-page-heading">Shopping Cart</h1>
                <Cart cart={cart} dispatch={dispatch} cartStyle='large' buttonOption='checkout' />
            </main>
        )
    }

    return cart.length ? renderPage() : emptyCartMessage;
}

export default CartPage;