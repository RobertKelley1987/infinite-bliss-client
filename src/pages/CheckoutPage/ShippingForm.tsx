import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import ShippingMethodForm from './ShippingMethodForm';
import { validateAddress } from '../../utils/addresses';
import { DEFAULT_ADDRESS_FORM } from '../../constants';
import { ShippingMethod, MailingAddressForm, CheckoutPhase } from '../../types';

type ShippingFormProps = {
    shippingMethod: ShippingMethod,
    setShippingMethod: React.Dispatch<React.SetStateAction<ShippingMethod>>,
    shippingAddress: MailingAddressForm,
    setShippingAddress: React.Dispatch<React.SetStateAction<MailingAddressForm>>,
    billingAddress: MailingAddressForm,
    setCheckoutPhase: React.Dispatch<React.SetStateAction<CheckoutPhase>>
}

const ShippingForm = (props: ShippingFormProps) => {
    const { 
        shippingMethod, 
        setShippingMethod, 
        shippingAddress, 
        setShippingAddress, 
        billingAddress,
        setCheckoutPhase 
    } = props;
    const navigate = useNavigate();
    const [sameAddress, setSameAddress] = useState(true);

    useEffect(() => {
        const updatedAddress = sameAddress ? billingAddress : DEFAULT_ADDRESS_FORM;
        setShippingAddress(updatedAddress);
    }, [sameAddress, billingAddress, setShippingAddress]);

    useEffect(() => {
        setCheckoutPhase('shipping');
        return () => setCheckoutPhase('none');
    }, [setCheckoutPhase]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { addressWithErrors, hasErrors } = validateAddress(shippingAddress);
        setShippingAddress(addressWithErrors);
        if(hasErrors) {
            return;
        } else {
            navigate('/checkout/payment');
        }
    }

    const renderShippingAddressForm = () => {
        return <AddressForm address={shippingAddress} setAddress={setShippingAddress} />
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-section">
                <h2 className="form-heading">Shipping Address</h2>
                <label className="checkbox-label" htmlFor="same-address-checkbox">
                    <input 
                        className="checkbox"  
                        id="same-address-checkbox" 
                        type="checkbox"
                        onChange={() => setSameAddress(prev => !prev)}
                        checked={sameAddress} 
                    />
                    <span>Use billing address as shipping address</span>
                </label>
                {!sameAddress && renderShippingAddressForm()}
            </div>
            <ShippingMethodForm shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} />
            <button type="submit" className="button">Continue</button>
        </form>
    );
}

export default ShippingForm;