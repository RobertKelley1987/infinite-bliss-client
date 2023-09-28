import { Link } from 'react-router-dom'; 
import { MAX_ORDER_QTY } from '../constants';
import { formatMoney } from '../utils/formatting';
import Qty from './Qty';
import { CartItem, CartAction } from '../types';
import './CartProduct.css';

const STYLES = {
    'small': {
        product: 'cart-product cart-product-small',
        name: 'cart-product-name cart-product-name-small',
        closeButton: 'cart-product-close-button cart-product-close-button-small',
        price: 'cart-product-price-small',
        total: 'cart-product-total-small',
        textWrapper: 'cart-product-text cart-product-text-small'
    },
    'large': {
        product: 'cart-product',
        name: 'cart-product-name',
        closeButton: 'cart-product-close-button',
        price: 'cart-product-price',
        total: 'cart-product-total',
        textWrapper: 'cart-product-text'
    }
}

type CartProductProps = {
    item: CartItem,
    dispatch: React.Dispatch<CartAction>,
    cartStyle: 'small' | 'large',
    updateCartVisibility?: (currentState: boolean) => void
}

const CartProduct = ({ item, dispatch, cartStyle, updateCartVisibility }: CartProductProps) => {
    const subTotal = item.product.price * item.qty;
    let productDesc = `${item.product.artist} "${item.product.desc}" ${item.product.productType}`;

    const increment = () => {
        item.qty < MAX_ORDER_QTY && ++item.qty;
        dispatch({ type: 'UPDATE_QTY', payload: item })
    }

    const decrement = () => {
        if(item.qty === 1) {
            dispatch({ type: 'REMOVE_ITEM', payload: item })
        } else {
            --item.qty;
            dispatch({ type: 'UPDATE_QTY', payload: item })
        }
    }

    const handleClick = () => updateCartVisibility && updateCartVisibility(false);

    // If this is the small dropdown cart, append clothing size to product desc
    const renderProductDesc = () => {
        if(cartStyle === 'small' && item.size) {
            productDesc += `  - ${item.size}`;
        }
        return productDesc;
    }

    const renderItemSize = () => {
        if(item.size && cartStyle !== 'small') {
            return <span className="cart-product-size">Size: {item.size.toUpperCase()}</span>;
        }
    }

    const renderSubtotal = () => {
        if(cartStyle !== 'small') {
            return (
                <span className={STYLES[cartStyle].total}>
                    <span className="cart-product-total-label">Total: </span>
                    ${formatMoney(subTotal)}
                </span>
            )                     
        }
    }

    return (
        <div className={STYLES[cartStyle].product}>
            <Link to={item.link} onClick={handleClick}>
                <img 
                    className="cart-product-img" 
                    src={`/imgs/${item.product.imgs[0]}.jpg`}
                    alt={productDesc}
                />
            </Link>
                <div className={STYLES[cartStyle].textWrapper}>
                    <div className="cart-product-name-wrapper">
                        <Link to={item.link} onClick={handleClick} className="cart-product-name-link">
                            <h2 className={STYLES[cartStyle].name}>{renderProductDesc()}</h2>
                        </Link>
                        <button 
                            className={STYLES[cartStyle].closeButton} 
                            data-text="Remove"
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                        >
                            <span className="material-symbols-outlined cart-product-close-icon">close</span>
                        </button>
                    </div>
                    {renderItemSize()}
                    <span className={STYLES[cartStyle].price}>${item.product.price}</span>
                    <div>
                        <Qty size='small' qty={item.qty} inc={increment} dec={decrement} />
                    </div>
                    {renderSubtotal()}
                </div>
        </div>
    );
}

export default CartProduct;