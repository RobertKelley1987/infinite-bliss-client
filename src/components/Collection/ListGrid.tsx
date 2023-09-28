import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '../Grid';
import ItemList from '../ItemList';
import PageNumbers from './PageNumbers';
import { Item } from '../../types';

type ListGridProps<T> = {
    pages: T[][],
    pageNum: number,
    srcPg?: string
}

function ListGrid<T extends Item<K>, K extends string>({ pages, pageNum, srcPg }: ListGridProps<T>) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className="list-grid">
            <Grid>
                <ItemList<T, K> items={pages[pageNum - 1]} srcPg={srcPg} />
            </Grid>
            <PageNumbers pages={pages} currentPage={pageNum} currentPath={location.pathname}/>            
        </div>
    );
}

export default ListGrid;