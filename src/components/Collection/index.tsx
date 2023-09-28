import { useState, useEffect, Fragment } from 'react';
import usePageNum from '../../hooks/usePageNum';
import { paginate } from '../../utils';
import { configSortFn } from '../../utils/sorting';
import StorePath from "../StorePath"; 
import SortSelector from './SortSelector';
import ListGrid from './ListGrid';
import { Item, SortOption } from "../../types";
import './Collection.css';

type CollectionProps<T> = {
    items: T[],
    collection: string,
    backLink: React.ReactNode,
    filter?: React.ReactNode, // Sidebar filter
    banner?: React.ReactNode, // Artist banner
}

function Collection<T extends Item<K>, K extends string>(props: CollectionProps<T>) {
    const { items, collection, filter, banner, backLink } = props;
    const { pageNum } = usePageNum();
    const [sortOption, setSortOption] = useState<SortOption>('Date - New to Old');

    // Sort by user selected sort option
    const sortFn = configSortFn(sortOption);
    items.sort(sortFn<T, K>);

    // Paginate results
    const pages = paginate(items);

    useEffect(() => {
        setSortOption('Date - New to Old');
    }, []);

    const renderCollection = () => {
        return (
            <Fragment>
                {banner}
                <div className="collection">
                    <StorePath 
                        collection={collection}
                        backLink={backLink}
                        tail={<span className="store-path-item">{`Page ${pageNum} of ${pages.length}`}</span>}
                    />
                    <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
                    <div className="collection-list">
                        {filter}
                        <ListGrid pages={pages} pageNum={pageNum} srcPg={collection} />
                    </div>
                </div>
            </Fragment>
        );
    }

    return items ? renderCollection() : null;
}

export default Collection;