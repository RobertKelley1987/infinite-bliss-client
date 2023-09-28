import { CartItem } from '../types';

export const cartTotal = (cart: CartItem[]) => {
    return cart.reduce((prevVal, currVal) => currVal.product.price * currVal.qty + prevVal, 0);
}