import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../services/products';
import { Category } from '../types';

type ItemState<T> = { item: T | null, errorMessage: string, isLoading: boolean }

function useItem<T> (category: Category): ItemState<T>  {
    const [item, setItem] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { itemId } = useParams();

    useEffect(() => {
        const findItem = async () => {
            if(!itemId) return;
            const { data: { item, error } } = await Product.findOne(category, itemId);
            error ? setErrorMessage('Server error: Please try again later.') : setItem(item);
            setIsLoading(false);
        }

        setIsLoading(true);
        findItem();
    }, [itemId, setItem, category]);

    return { item, errorMessage, isLoading }
}


export default useItem;