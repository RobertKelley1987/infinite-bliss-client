import { Fragment } from "react";
import ListItem from './ListItem';
import { Item } from "../types";

type ItemListProps<T> = {
    items: T[],
    srcPg?: string
}

function ItemList<T extends Item<K>, K extends string>({ items, srcPg }: ItemListProps<T>) {
    return (
        <Fragment>
            {items.map(item => <ListItem<T, K> key={item.id} item={item} srcPg={srcPg}/>)}
        </Fragment>
    )
}

export default ItemList;