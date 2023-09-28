import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import useScreenIsBig from '../../hooks/useScreenSizeQuery';
import { assertIsNode } from '../../utils/assertions';
import Cart from '../Cart';
import MenuButton from './MenuButton';
import Menu from './Menu';
import { CartItem, CartAction } from '../../types';
import './SiteHeader.css';

type SiteHeaderProps = {
    // clearFilter: () => void,
    cart: CartItem[],
    dispatch: React.Dispatch<CartAction>,
    viewingCartPage: boolean,
    cartIsVisible: boolean,
    setCartIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// Note: The mouseOverCart state is redundant. But, because the cart visibility is tied to a timeout 
// after a user adds an item, this added state prevents the cart from vanishing if the user is mousing 
// over it in that scenario.
const SiteHeader = (props: SiteHeaderProps) => {
    const { cart, dispatch, viewingCartPage, cartIsVisible, setCartIsVisible } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [artistsOpen, setArtistsOpen] = useState(false);
    const [mouseIsOverCart, setMouseIsOverCart] = useState(false);
    const { screenIsBig } = useScreenIsBig(550); // True is screen width exceeds 550px

    const menu = useRef<HTMLDivElement>(null);
    const menuButton = useRef<HTMLButtonElement>(null);

    const cartQty = cart.reduce((prev, currVal) => prev + currVal.qty, 0);

    // Only display header cart if not viewing cart page AND if screen width is over 550px
    const displayCart = (cartIsVisible || mouseIsOverCart) && (!viewingCartPage && screenIsBig);

    // Event listener to close menu if user clicks outside of it.
    useEffect(() => {
        function closeMenu(e: MouseEvent) {
            assertIsNode(e.target);

            // If user clicks menu, do not update state. 
            // Also do nothing if burger menu / 'X' button is clicked.
            // In that case, state will be set by the button's click handler.
            const clickedMenu = menu.current?.contains(e.target);
            const clickedMenuButton = menuButton.current?.contains(e.target);
            if(clickedMenu || clickedMenuButton) return;

            setMenuOpen(false);
            setCategoriesOpen(false);
            setArtistsOpen(false);
        }

        document.body.addEventListener('mousedown', closeMenu);
        return () => document.body.removeEventListener('mousedown', closeMenu);
    }, [setMenuOpen]);

    const updateCartVisibility = (currentState: boolean) => { 
        setCartIsVisible(currentState);
        setMouseIsOverCart(currentState);
    }

    const renderCart = () => {
        return (
            <div className="site-header-cart">
                <Cart 
                    cart={cart}
                    dispatch={dispatch} 
                    cartStyle='small' 
                    buttonOption='cart' 
                    updateCartVisibility={updateCartVisibility}
                />
            </div>
        )
    }

    return (
        <header className="site-header">
            <div className="site-header-main">
                <MenuButton menuButton={menuButton} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <Link to="/" className="site-header-logo">Infinite Bliss</Link>
                <Menu 
                    menu={menu}
                    menuOpen={menuOpen} 
                    setMenuOpen={setMenuOpen} 
                    categoriesOpen={categoriesOpen}
                    setCategoriesOpen={setCategoriesOpen}
                    artistsOpen={artistsOpen}
                    setArtistsOpen={setArtistsOpen} 
                />
                <div 
                    className="site-header-cart-wrapper" 
                    onMouseEnter={() => updateCartVisibility(true)}
                    onMouseLeave={() => updateCartVisibility(false)}
                >
                    <Link to="/cart" className="site-header-cart-link">
                        <span className="material-symbols-outlined site-header-bag">shopping_bag</span>
                        <span className="site-header-cart-qty">{cartQty}</span>
                    </Link>
                    {displayCart && renderCart()}
                </div>
            </div>
        </header>
    )
}

export default SiteHeader;