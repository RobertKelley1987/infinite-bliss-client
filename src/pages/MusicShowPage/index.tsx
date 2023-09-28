import { useLocation, useParams } from 'react-router-dom';
import useItem from '../../hooks/useItem';
import { configBackLinkText } from '../../utils';
import ShowPage from '../ShowPage';
import AlbumText from './AlbumText';
import { Album, CartAction, MusicProduct } from '../../types';

type MusicShowPageProps = {
    dispatch: React.Dispatch<CartAction>,
    setCartIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MusicShowPage = ({ dispatch, setCartIsVisible }: MusicShowPageProps) => {
    const { item, errorMessage, isLoading } = useItem<Album>('Music');
    const { collectionName } = useParams();
    const location = useLocation();

    const addToCart = (product: Album, qty: number) => {
        const newItem = { product, qty, link: location.pathname }
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    }

    const renderShowPage = () => {
        if(isLoading) {
            return <p className="plain-text">Loading...</p>
        } else if(errorMessage) {
            return <p className="plain-text">{errorMessage}</p>
        } else {
            return <ShowPage<Album, MusicProduct> 
                descText={<AlbumText album={item}/>}
                product={item}
                backLinkText={configBackLinkText('Music', collectionName)}
                addToCart={addToCart}
                setCartIsVisible={setCartIsVisible}
            />
        }
    }

    return renderShowPage()
}

export default MusicShowPage;