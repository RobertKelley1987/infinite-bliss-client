import { api } from './api';
import { httpFormat } from '../utils/formatting';
import { Artist, Category } from '../types';

const products = {
    findCollection: async (category: Category, collection: string) => {
        const categorySlug = category.toLowerCase();
        return await api.get(`/${categorySlug}/${collection}`);
    },
    findOne: async (category: Category, itemId: string) => {
        const categorySlug = category.toLowerCase();
        return await api.get(`/${categorySlug}/products/${itemId}`);
    },
    findByCategory: async (category: Category) => {
        const categorySlug = category.toLowerCase();
        return await api.get(`/${categorySlug}`);
    },
    findByArtist: async (artist: Artist) => {
        const artistSlug = httpFormat(artist);
        return await api.get(`/artists/${artistSlug}`);
    }
}

export default products;