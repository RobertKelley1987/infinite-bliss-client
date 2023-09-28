import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useItem from '../../hooks/useItem';
import { configBackLinkText } from '../../utils';
import ShowPage from '../ShowPage';
import Sizes from './Sizes';
import ClothingData from '../../components/ClothingData';
import { CartAction, Size, Apparel, ApparelProduct } from '../../types';

type ApparelShowPageProps = {
    dispatch: React.Dispatch<CartAction>,
    setCartIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ApparelShowPage = ({ dispatch, setCartIsVisible }: ApparelShowPageProps) => {
    const { item, errorMessage, isLoading } = useItem<Apparel>('Apparel');
    const [selectedSize, setSelectedSize] = useState<Size>('Small');
    const { collectionName } = useParams();
    const location = useLocation();

    const addToCart = (product: Apparel, qty: number) => {
        const newItem = { product, qty, size: selectedSize, link: location.pathname }
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    }

    const renderShowPage = () => {
        if(isLoading) {
            return <p className="plain-text">Loading...</p>
        } else if(errorMessage) {
            return <p className="plain-text">{errorMessage}</p>
        } else {
            return <ShowPage<Apparel, ApparelProduct> 
                addToCart={addToCart}
                sizes={<Sizes selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>}
                product={item}
                backLinkText={configBackLinkText('Apparel', collectionName)}
                setCartIsVisible={setCartIsVisible}
                descText={<ClothingData item={item} />}
            />
        }
    }

    return renderShowPage();
}

export default ApparelShowPage;