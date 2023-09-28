import { ITEMS_PER_PAGE, ARTIST_PAGE_LOOKUP, CATEGORY_PAGE_LOOKUP, ALL_ARTISTS } from '../constants';
import { httpFormat } from './formatting';
import { ProductFilterOption } from '../types';

// Add conditional utility class names to existing list, 
// ex: add "menu-hidden" to "menu" to get "menu menu-hidden"
export const classNames = (test: boolean, className: string, addedClassName: string) => {
    return test ? `${className} ${addedClassName}` : className;
}

// Function to convert an array of data into an array of smaller arrays of pages
export function paginate<T>(items: T[]): T[][] {
    const pages = [];
    let page = [];
    for(let i = 0; i < items.length; i++) {
        // Add item to page
        page.push(items[i]);
        // Test if page has 24 items
        if(page.length === ITEMS_PER_PAGE) {
            // Add page to pages arr and reset page var
            pages.push(page);
            page = [];
        // Test for final page and add final page
        } else if(i === items.length - 1) {
            pages.push(page);
        }
    }

    return pages;
}

// RegEx for digits
export const isANumber = new RegExp(/[0-9]/);

// Returns true if first letter in band name is between min and max letters provided.
// Example: isBetween('Aerosmith', 'a', 'f') returns true.
export const nameIsBetween = (name: string, min: string, max: string) => {
    // If band name starts with 'The', ex: 'The Body', use first letter of next word 
    // for comparison
    const indexOfFirstLetter = name.indexOf('The') === 0 ? 4 : 0;
    const firstLetter = name[indexOfFirstLetter].toLowerCase();
    return firstLetter >= min.toLowerCase() && firstLetter <= max.toLowerCase();
}

// Converts filter options from an array of strings to an array of objects with a selected state
// attached.
export function convertToFilterOptions<T>(collectionTypes: T[]): ProductFilterOption<T>[] {
    return collectionTypes.map(collectionType => {
        return { name: collectionType, selected: false }
    });
}

// Helper to create back link text for header path links in most pages.
// Ex: Page for new music called 'new' returns 'New Music' for back link text
const allArtistSlugs = ALL_ARTISTS.map(artist => httpFormat(artist));
export const configBackLinkText = (category: string, page?: string) => {
    if(!page) return '';

    // Config if artist page
    if(allArtistSlugs.includes(page)) {
        return ARTIST_PAGE_LOOKUP[page];
    }

    // Config if category page
    if(page === 'new' || page === 'featured') {
        const pageCapitalized = page[0].toUpperCase() + page.substring(1, page.length);
        return `${pageCapitalized} ${category}`; 
    } else {
        return CATEGORY_PAGE_LOOKUP[page];
    }
}
