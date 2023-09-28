import { useLocation, useParams } from 'react-router-dom';
import useItem from '../hooks/useItem';
import ShowPage from './ShowPage';
import ClothingData from '../components/ClothingData';
import { Accessory, CartAction, AccessoryProduct } from '../types';
import { configBackLinkText } from '../utils';

type AccessoryShowPageProps = {
    dispatch: React.Dispatch<CartAction>,
    setCartIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AccessoryShowPage = ({ dispatch, setCartIsVisible }: AccessoryShowPageProps) => {
    const { item, errorMessage, isLoading } = useItem<Accessory>('Accessories');
    const { collectionName } = useParams();
    const location = useLocation();

    const addToCart = (product: Accessory, qty: number) => {
        const newItem = { product, qty, link: location.pathname }
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    }

    const isHat = (item: Accessory | null) => item?.productType === 'Cap' || item?.productType === 'Beanie';

    const descText = isHat(item) ? <ClothingData item={item} /> : <p>{item?.accessoryDesc}</p>; 
    
    const renderShowPage = () => {
        if(isLoading) {
            return <p className="plain-text">Loading...</p>
        } else if(errorMessage) {
            return <p className="plain-text">{errorMessage}</p>
        } else {
            return <ShowPage<Accessory, AccessoryProduct> 
                product={item}
                addToCart={addToCart}
                backLinkText={configBackLinkText('Accessories', collectionName)}
                setCartIsVisible={setCartIsVisible}
                descText={descText}
            />
        }
    }

    return renderShowPage();
}

export default AccessoryShowPage;