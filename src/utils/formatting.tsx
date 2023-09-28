// Format a number to two decimal places for display
export const formatMoney = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

// Function to convert a string into an http-friendly format for string comparisons
export const httpFormat = (text: string) => text.replaceAll(' ', '-').toLowerCase();

// De-formats http slug. Ex: 'the-band-name' should return as 'The Band Name'
export const decodeHttpSlug = (slug?: string) => {
    if(!slug) return 

    let result = '';

    // Exceptions for 'CD' and 'T-Shirt', otherwise remove hyphens and capitalize
    if(slug === 't-shirts') {
        result ='T-Shirts';
    } else if(slug === 'cd') {
        result = 'CD';
    } else {
        result = slug.split('-').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
    }

    return  result;
}
