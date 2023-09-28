import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../services/products';
import { ALL_ARTISTS, ARTIST_PAGE_LOOKUP } from '../../constants';
import { convertToFilterOptions } from '../../utils';
import { httpFormat } from '../../utils/formatting';
import { assertIsArtist } from '../../utils/assertions';
import Collection from '../../components/Collection';
import ArtistBanner from './ArtistBanner';
import ListFilter from '../../components/ListFilter';
import BackLink from '../../components/BackLink';
import { Category, Product, ProductType, ProductFilterOption, Artist } from '../../types';
import './ArtistPage.css';

function ArtistPage() {
    const { collectionName } = useParams();
    const [collection, setCollection] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductFilterOption<Category>[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const artist = collectionName ? ARTIST_PAGE_LOOKUP[collectionName] : '';
    
    useEffect(() => {
        if(!collectionName) {
            setErrorMessage('Collection not found.');
            return;
        }

        const getCollection = async (artist: Artist) => {
            const { data: { collection, categories, error } } = await products.findByArtist(artist)
            if(error) {
                setErrorMessage(error);
            } else {
                setCollection(collection);
                const filterOptions = convertToFilterOptions<Category>(categories);
                setCategories(filterOptions);
            }
        }

        setLoading(true);
        if(ALL_ARTISTS.includes(artist)) {
            assertIsArtist(artist);
            getCollection(artist);
            setErrorMessage('');
        } else {
            setErrorMessage('Collection not found.');
        }
        setLoading(false);

        return () => setErrorMessage('');
    }, [collectionName]);

    const selectedOptions = categories.filter(category => category.selected);
    const selectedNames = selectedOptions.map(option => option.name);
    const filteredCollection = collection.filter(item => selectedNames.includes(item.category));

    const filter = <ListFilter<Category> productTypes={categories} setProductTypes={setCategories} />

    const renderCollection = () => {
        let element;

        if(loading) {
            element = <p>Loading...</p>;
        } else if(errorMessage || !collectionName || !collection.length) {
            element = <p className="artist-page-error-message">{errorMessage}</p>;
        } else {
            assertIsArtist(artist);
            element = <Collection<Product, ProductType> 
                items={selectedNames.length > 0 ? filteredCollection : collection} 
                collection={artist}
                backLink={<BackLink text={artist} />}
                filter={categories.length > 1 ? filter : undefined} 
                banner={<ArtistBanner artist={artist} />}
            />
        }

        return element;
    }

    return renderCollection();
}

export default ArtistPage;