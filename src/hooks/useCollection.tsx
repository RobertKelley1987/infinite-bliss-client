import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../services/products';
import { convertToFilterOptions } from '../utils';
import { Category, Item, ProductFilterOption } from '../types';

function useCollection<T extends Item<K>, K>(collections: string[], category: Category) {
    const { collectionName = '' } = useParams();
    const [collection, setCollection] = useState<T[]>([]);
    const [filterOptions, setFilterOptions] = useState<ProductFilterOption<K>[]>([])
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(!collectionName) {
            return setErrorMessage('Collection not found.');
        }

        const configFilterOptions = (productTypes: K[]) => {
            const filterOptions = convertToFilterOptions<K>(productTypes);
            const defaultFilterOption = category === 'Music' && collectionName === 'new' ? 'LP' : null;
            const defaultOptionIndex = filterOptions.findIndex(option => option.name === defaultFilterOption);
            if(defaultOptionIndex !== -1) {
                filterOptions[defaultOptionIndex].selected = true;
            }
            setFilterOptions(filterOptions);
        }

        const getItems = async () => {
            const { data: { collection, collectionTypes, error } } = await products.findCollection(category, collectionName);
            if(error) {
                setErrorMessage(error);
            } else {
                setCollection(collection);
                configFilterOptions(collectionTypes);
            }
        }

        setLoading(true);
        const pageExists = collections.indexOf(collectionName) !== -1;
        if(pageExists) {
            getItems();
            setErrorMessage('');
        } else {
            setErrorMessage('Collection not found.');
        }
        setLoading(false);

        return () => setErrorMessage('');
    }, [collectionName, category, collections]);

    return { 
        collection: { 
            name: collectionName,
            items: collection,  
        },
        filterOptions,
        setFilterOptions, 
        errorMessage, 
        loading 
    }
}

export default useCollection;