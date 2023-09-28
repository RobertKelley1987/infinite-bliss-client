import { useState, useEffect } from 'react';
import ImgCarousel from './ImgCarousel';
import Qty from '../../components/Qty';
import StorePath from '../../components/StorePath';
import BackLink from '../../components/BackLink';
import { MAX_ORDER_QTY } from '../../constants';
import { Item } from '../../types';
import './ShowPage.css';

type ShowPageProps<T> = {
    addToCart: (product: T, qty: number) => void
    product: T | null,
    backLinkText: string,
    sizes?: React.ReactNode,
    descText?: React.ReactNode,
    setCartIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function ShowPage<T extends Item<K>, K extends string>(props: ShowPageProps<T>) {
    const { addToCart, sizes, backLinkText, descText, product, setCartIsVisible } = props
    const [qty, setQty] = useState(1);
    const [confirmItemAdded, setConfirmItemAdded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if(confirmItemAdded) {
            timeoutId = setTimeout(() => {
                setConfirmItemAdded(false);
                setCartIsVisible(false);
            }, 2000);
        }

        return () => clearTimeout(timeoutId);
    }, [confirmItemAdded, setCartIsVisible])

    if(!product) return <p>Error - Product Not Found.</p>;

    const handleClick = () => {
        addToCart(product, qty);
        setConfirmItemAdded(true);
        setCartIsVisible(true);
    }

    const increment = () => qty < MAX_ORDER_QTY && setQty(prev => ++prev);
    const decrement = () => qty > 1 && setQty(prev => --prev); // Do nothing if qty is 1 

    return (
        <div className="show-page">
            <StorePath 
                backLink={<BackLink text={backLinkText} />}
                tail={
                    <span className="plain-text">
                        {`${product.artist} "${product.desc}" ${product.productType}`}
                    </span>
                } 
            />
            <div className="show-page-product-grid">
                <ImgCarousel<T, K> product={product} />
                <div className="show-page-text-wrapper">
                    <h2 className="show-page-heading">{`${product.artist} "${product.desc}" ${product.productType}`}</h2>
                    <span className="show-page-price">${product.price}</span>
                    {sizes}
                    <Qty size="large" qty={qty} inc={increment} dec={decrement} displayHeading={true} />
                    <button 
                        onClick={() => handleClick()} 
                        className="button show-page-cart-button"
                        disabled={confirmItemAdded}
                    >
                        {confirmItemAdded ? "ITEM ADDED!" : "ADD TO CART"}
                    </button>
                    {descText}
                </div>
            </div>
        </div>
    )
}

export default ShowPage;