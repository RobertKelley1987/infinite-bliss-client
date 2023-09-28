import { SortOption, Item } from '../types';

// Sort from newest to oldest items
export function newToOld<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    const itemDate = new Date(item.dateAdded);
    const nextItemDate = new Date(nextItem.dateAdded);
    return nextItemDate.getTime() - itemDate.getTime();
}

// Sort from oldest to newest
export function oldToNew<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    const itemDate = new Date(item.dateAdded);
    const nextItemDate = new Date(nextItem.dateAdded);
    return itemDate.getTime() - nextItemDate.getTime();
}

// Sort alphabetically - a to z
export function aToZ<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    let result = 0;

    // Compare items using this string format: "<band name> '<product desc>' <product type>",
    // Ex: Aerosmith "Armageddon" T-Shirt
    const itemOneStr = `${item.artist} ${item.desc} ${item.productType}`;
    const itemTwoStr = `${nextItem.artist} ${nextItem.desc} ${nextItem.productType}`;

    if(itemOneStr > itemTwoStr) {
        result = 1;
    } else if(itemOneStr < itemTwoStr) {
        result = -1
    } 

    return result;
}

// Sort alphabetically - z to a
export function zToA<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    let result = 0;

    // Compare items using this string format: "<band name> '<product desc>' <product type>",
    // Ex: Aerosmith "Armageddon" T-Shirt
    const itemOneStr = `${item.artist} ${item.desc} ${item.productType}`;
    const itemTwoStr = `${nextItem.artist} ${nextItem.desc} ${nextItem.productType}`;

    if(itemOneStr < itemTwoStr) {
        result = 1;
    } else if(itemOneStr > itemTwoStr) {
        result = -1
    } 
    
    return result;
}

// Sort by price - high to low
export function highToLow<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    return nextItem.price - item.price;
}

// Sort by price - low to high
export function lowToHigh<T extends Item<K>, K extends string>(item: T, nextItem: T) {
    return item.price - nextItem.price;
}

// Reurns matching sorting function based on sort requested as arg
export const configSortFn = (sortOption: SortOption) => {
    let sortFn = null;

    switch(sortOption) {
        case 'Date - Old to New':
            sortFn = oldToNew;
            break;
        case 'Date - New to Old':
            sortFn = newToOld;
            break;
        case 'Alphabetically - A to Z':
            sortFn = aToZ;
            break;
        case 'Alphabetically - Z to A':
            sortFn = zToA;
            break;
        case 'Price - High to Low':
            sortFn = highToLow;
            break;
        case 'Price - Low to High':   
            sortFn = lowToHigh;
            break;
    }

    return sortFn;
}