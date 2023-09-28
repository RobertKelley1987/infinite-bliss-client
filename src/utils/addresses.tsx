import { MailingAddress, MailingAddressForm } from "../types";

const DEFAULT_MAILING_ADDRESS: MailingAddress = {
    firstName: '',
    lastName: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    state: '',
    zip: ''
}

const ADDRESS_STR_LIB = {
    firstName: 'first name',
    lastName: 'last name',
    streetLine1: 'street address',
    streetLine2: 'unit, apt, suite etc...',
    city: 'city',
    state: 'state',
    zip: 'zip code'
}

const VOWELS = 'AEIOUaeiou';

// Create a grammatically correct error message for a required empty input
const missingValueMessage = (name: string) => {
    // Add 'a' or 'an' before name provided
    return VOWELS.includes(name[0]) ? `Enter an ${name}` : `Enter a ${name}` 
}

// Function to validate a mailing address object.
// Each member of the address represents a form input value and its related error message.
// This function validates each input value and attaches error messages as needed.
export const validateAddress = (address: MailingAddressForm) => {
    const addressWithErrors: MailingAddressForm = { ...address }
    let hasErrors = false;

    // Test each line in address
    let key: keyof typeof address;
    for(key in addressWithErrors) {
        // Reset any existing error messages
        addressWithErrors[key].error = '';

        // Test if required value is missing
        if(!addressWithErrors[key].value && key !== 'streetLine2') {
            // Update this address input's error message
            let fullPropName = ADDRESS_STR_LIB[key];
            addressWithErrors[key] = {
                value: '',
                error: missingValueMessage(fullPropName)
            }

            // Update errors flag
            hasErrors = true;
        }
    }

    return { addressWithErrors, hasErrors };
}

// Converts data from a MailingAddressForm type used for input tracking to 
// a simpler MailingAddress type for db save.
export const getAddressValues = (addressForm: MailingAddressForm) => {
    const address: MailingAddress = DEFAULT_MAILING_ADDRESS;
    address.firstName = addressForm.firstName.value;
    address.lastName = addressForm.lastName.value;
    address.streetLine1 = addressForm.streetLine1.value;
    address.streetLine2 = addressForm.streetLine2.value;
    address.city = addressForm.city.value;
    address.state = addressForm.state.value;
    address.zip = addressForm.zip.value;
    return address;
}

export const clearAddressErrors = (addressForm: MailingAddressForm) => {
    addressForm.firstName.error = '';
    addressForm.lastName.error= '';
    addressForm.streetLine1.error = '';
    addressForm.streetLine2.error = '';
    addressForm.city.error = '';
    addressForm.state.error = '';
    addressForm.zip.error = '';
    return { ...addressForm };
}