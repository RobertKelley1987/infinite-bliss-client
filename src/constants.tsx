import { 
    MailingAddressForm, 
    MailingAddressInput, 
    State, 
    ShippingMethod,
    Artist, 
} from "./types";

export const ALL_ARTISTS: string[] = [
    'Agriculture', 'Bell Witch', 'Blood Incantation', 'The Body', 'Chat Pile', 'Cloud Rat', 
    'Deafheaven', 'Devil Master', 'Divide and Dissolve', 'Emma Ruth Rundle', 'Full of Hell', 
    'Knoll', 'Nails', 'Oathbreaker', 'Portrayal of Guilt', 'Primitive Man', 'Ragana', 'Soft Kill', 
    'Spectral Wound', 'Touche Amore', 'Undeath'
];

export const APPAREL_PAGES = ['New', 'Featured', 'T-Shirts', 'Longsleeves', 'Hoodies'];
export const MUSIC_PAGES = ['New', 'Featured', 'Vinyl', 'CDs', 'Tapes'];
export const ACCESSORY_PAGES = ['New', 'Hats', 'Patches', 'Pins', 'Bags'];

export const CATEGORY_PAGE_LOOKUP: { [key: string]: string } = {
    't-shirts': 'T-Shirts',
    'longsleeves': 'Longsleeves',
    'hoodies': 'Hoodies',
    'bags': 'Bags',
    'patches': 'Patches',
    'hats': 'Hats',
    'pins': 'Pins',
    'vinyl': 'Vinyl',
    'cds': 'CDs',
    'tapes': 'Tapes',
    'featured': 'Featured',
    'new': 'New'
}

export const ARTIST_PAGE_LOOKUP: { [key: string]: Artist } = {
    'agriculture': 'Agriculture',
    'bell-witch': 'Bell Witch',
    'blood-incantation': 'Blood Incantation',
    'the-body': 'The Body',
    'chat-pile': 'Chat Pile',
    'cloud-rat': 'Cloud Rat',
    'deafheaven': 'Deafheaven',
    'devil-master':  'Devil Master',
    'divide-and-dissolve': 'Divide and Dissolve',
    'emma-ruth-rundle': 'Emma Ruth Rundle',
    'full-of-hell': 'Full of Hell',
    'knoll': 'Knoll',
    'nails': 'Nails',
    'oathbreaker': 'Oathbreaker',
    'portrayal-of-guilt': 'Portrayal of Guilt',
    'primitive-man': 'Primitive Man',
    'ragana': 'Ragana',
    'soft-kill': 'Soft Kill',
    'spectral-wound': 'Spectral Wound',
    'touche-amore': 'Touche Amore',
    'undeath': 'Undeath'
}

export const ITEMS_PER_PAGE = 24;

export const MAX_ORDER_QTY = 10;

export const US_STATES: State[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];

export const EMPTY_TEXT_INPUT: MailingAddressInput<string> = {
    value: '',
    error: ''
}

export const EMPTY_STATE_SELECTOR: MailingAddressInput<State> = {
    value: '',
    error: ''
}

export const DEFAULT_ADDRESS_FORM: MailingAddressForm = {
    firstName: EMPTY_TEXT_INPUT,
    lastName: EMPTY_TEXT_INPUT,
    streetLine1: EMPTY_TEXT_INPUT,
    streetLine2: EMPTY_TEXT_INPUT,
    city: EMPTY_TEXT_INPUT,
    state: EMPTY_STATE_SELECTOR,
    zip: EMPTY_TEXT_INPUT
}

export const SHIPPING_METHODS: ShippingMethod[] = [
    { name: 'Standard', days: '5 - 7', cost: 9.99 },
    { name: 'Express', days: '1 - 2' ,cost: 19.99 }
];

