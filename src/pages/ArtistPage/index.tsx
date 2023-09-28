import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { ALL_ARTISTS, ARTIST_PAGE_LOOKUP } from '../../constants';
import { convertToFilterOptions } from '../../utils';
import { httpFormat } from '../../utils/formatting';
import { assertIsArtist } from '../../utils/assertions';
import Collection from '../../components/Collection';
import ArtistBanner from './ArtistBanner';
import ListFilter from '../../components/ListFilter';
import BackLink from '../../components/BackLink';
import { Category, Product, ProductType, ProductFilterOption } from '../../types';
import './ArtistPage.css';

const artistCollections = ALL_ARTISTS.map(artist => httpFormat(artist));

function ArtistPage() {
    const { collectionName } = useParams();
    const [collection, setCollection] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductFilterOption<Category>[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(!collectionName) {
            setErrorMessage('Collection not found.');
            return;
        }

        const getCollection = async () => {
            const { data: { collection, categories, error } } = await axios.get(`/artists/${collectionName}`);
            if(error) {
                setErrorMessage(error);
            } else {
                setCollection(collection);
                const filterOptions = convertToFilterOptions<Category>(categories);
                setCategories(filterOptions);
            }
        }

        setLoading(true);
        if(artistCollections.includes(collectionName)) {
            getCollection();
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
            const artistName = ARTIST_PAGE_LOOKUP[collectionName];
            assertIsArtist(artistName);
            element = <Collection<Product, ProductType> 
                items={selectedNames.length > 0 ? filteredCollection : collection} 
                collection={artistName}
                backLink={<BackLink text={artistName} />}
                filter={categories.length > 1 ? filter : undefined} 
                banner={<ArtistBanner artist={artistName} />}
            />
        }

        return element;
    }

    return renderCollection();
}

export default ArtistPage;