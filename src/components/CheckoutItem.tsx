import { formatMoney } from '../utils/formatting';
import { CartItem } from '../types';
import './CheckoutItem.css';

type CheckoutItemProps = {
    item: CartItem
}

const CheckoutItem = ({ item }: CheckoutItemProps) => {
    const itemDesc = `${item.product.artist.toUpperCase()} "${item.product.desc}" ${item.product.productType}`;
    const itemTotal = item.product.price * item.qty;
    
    return (
        <div className="checkout-item">
            <img 
                src={`/imgs/${item.product.imgs[0]}.jpg`} 
                className="checkout-item-img"
                alt={itemDesc}
            />
            <div className="checkout-item-text">
                <span>{itemDesc}</span>
                <span>QTY: {item.qty}</span>
            </div>
            <span className="checkout-item-price">${formatMoney(itemTotal)}</span>
        </div>                    
    )
}

export default CheckoutItem;