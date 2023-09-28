import { Fragment } from 'react';
import StateSelector from './StateSelector';
import ZipInput from './ZipInput';
import { MailingAddressForm } from '../../types';
import './AddressForm.css';

type AddressFormProps = {
    address: MailingAddressForm,
    setAddress: React.Dispatch<React.SetStateAction<MailingAddressForm>>
}

const AddressForm = ({ address, setAddress }: AddressFormProps) => {    
    const setValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddress(prev => {
            return { ...prev, [e.target.name]: { value: e.target.value } }
        });
    }

    return (
        <Fragment>
            <div className="address-form-name-wrapper">
                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="first-name">First Name</label>
                    <input 
                        placeholder="First Name"
                        id="first-name" 
                        name="firstName" 
                        value={address.firstName.value} 
                        onChange={setValue}
                        type="text"
                        className={address.firstName.error ? "form-input form-input-error" : "form-input"} 
                    />
                    {address.firstName.error && <span className="form-error">{address.firstName.error}</span>} 
                </div>

                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="last-name">Last Name</label>
                    <input 
                        placeholder="Last Name"
                        id="last-name" 
                        name="lastName" 
                        value={address.lastName.value} 
                        onChange={setValue}
                        type="text"
                        className={address.lastName.error ? "form-input form-input-error" : "form-input"}
                    />
                    {address.lastName.error && <span className="form-error">{address.lastName.error}</span>}
                </div>
            </div>

            <div className="form-input-wrapper">
                <label className="form-label" htmlFor="address-line-1">Address - Line 1</label>
                <input 
                    placeholder='Street Address' 
                    id="address-line-1"
                    value={address.streetLine1.value} 
                    name="streetLine1"
                    onChange={setValue}
                    type="text"
                    className={address.streetLine1.error ? "form-input form-input-error" : "form-input"}
                />
                {address.streetLine1.error && <span className="form-error">{address.streetLine1.error}</span>}
            </div>

            <div className="form-input-wrapper">
                <label className="form-label" htmlFor="address-line-2">Address - Line 2</label>
                <input 
                    placeholder='Apt, suite etc. (optional)'
                    id="address-line-2"
                    name="streetLine2" 
                    value={address.streetLine2.value} 
                    onChange={setValue}
                    type="text"
                    className="form-input"
                />
            </div>                    

            <div className="address-form-location-wrapper">
                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="city">City</label>
                    <input 
                        placeholder="City" 
                        id="city"
                        name="city"
                        value={address.city.value} 
                        onChange={setValue}
                        type="text"
                        className={address.city.error ? "form-input form-input-error" : "form-input"}
                    />
                    {address.city.error && <span className="form-error">{address.city.error}</span>}
                </div>

                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="state">State</label>
                    <StateSelector state={address.state} setValue={setValue} />
                    {address.state.error && <span className="form-error">{address.state.error}</span>}
                </div>

                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="zip">Zip Code</label>
                    <ZipInput zip={address.zip} setValue={setValue} />
                    {address.zip.error && <span className="form-error">{address.zip.error}</span>}
                </div>
            </div>
        </Fragment>
    )
}

export default AddressForm;