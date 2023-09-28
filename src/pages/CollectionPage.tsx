import useCollection from '../hooks/useCollection';
import { configBackLinkText } from '../utils';
import { CATEGORY_PAGE_LOOKUP } from '../constants';
import Collection from '../components/Collection';
import ListFilter from '../components/ListFilter';
import BackLink from '../components/BackLink';
import { Item, Category } from '../types';

type CollectionPageProps = {
    category: Category,
    collections: string[]
}

function CollectionPage<T extends Item<K>, K extends string>(props: CollectionPageProps) {
    const { collections, category } = props;
    const { 
        collection, 
        errorMessage, 
        loading,
        filterOptions, 
        setFilterOptions 
    } = useCollection<T, K>(collections, category);

    const selectedOptions = filterOptions.filter(option => option.selected);
    const selectedNames = selectedOptions.map(option => option.name);
    const filteredItems = collection.items.filter(item => selectedNames.includes(item.productType));
    const items = selectedNames.length > 0 ? filteredItems : collection.items;

    const renderCollection = () => {
        let element;

        if(loading) {
            element = <p>Loading...</p>;
        } else if(errorMessage || !collection.items.length) {
            element = <p className="plain-text">{errorMessage}</p>;
        } else {
            const filter = <ListFilter<K> productTypes={filterOptions} setProductTypes={setFilterOptions} />
            element = (
                <Collection<T, K> 
                    items={items} 
                    backLink={<BackLink text={configBackLinkText(category, collection.name)} />}
                    collection={CATEGORY_PAGE_LOOKUP[collection.name]}
                    filter={filterOptions.length > 1 ? filter : undefined} 
                />
            );
        }

        return element;
    }

    return renderCollection();
}

export default CollectionPage;