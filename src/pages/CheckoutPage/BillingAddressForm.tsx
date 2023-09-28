import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from './PhoneInput';
import AddressForm from './AddressForm';
import { validateAddress } from '../../utils/addresses';
import { CheckoutPhase, MailingAddressForm, MailingAddressInput } from "../../types"; 

type BillingAddressFormProps = {
    email: MailingAddressInput<string>,
    setEmail: React.Dispatch<React.SetStateAction<MailingAddressInput<string>>>,
    phone: MailingAddressInput<string>,
    setPhone: React.Dispatch<React.SetStateAction<MailingAddressInput<string>>>,
    billingAddress: MailingAddressForm,
    setBillingAddress: React.Dispatch<React.SetStateAction<MailingAddressForm>>,
    setCheckoutPhase: React.Dispatch<React.SetStateAction<CheckoutPhase>>
}

const BillingAddressForm = (props: BillingAddressFormProps) => {
    const { email, setEmail, phone, setPhone, billingAddress, setBillingAddress, setCheckoutPhase } = props;
    const navigate = useNavigate();

    useEffect(() => {
        setCheckoutPhase('info');

        return () => setCheckoutPhase('none');
    }, [setCheckoutPhase]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validateForm()) return;
        navigate('/checkout/shipping');
    }

    const validateForm = () => {
        let readyToSubmit = true;

        // Validate contact info
        if(!email.value) {
            setEmail(prev => {
                return {...prev, error: 'Enter an valid email address'}
            });
            readyToSubmit = false;
        }

        if(!phone.value || phone.value.length < 14) {
            setPhone(prev => {
                return {...prev, error: 'Enter a valid phone number'}
            });
            readyToSubmit = false;
        }

        const { addressWithErrors, hasErrors } = validateAddress(billingAddress);
        if(hasErrors) {
            readyToSubmit = false;
        }

        setBillingAddress({...addressWithErrors});
        return readyToSubmit;
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-section">
                <h2 className="form-heading">Contact</h2>

                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                        id="email"
                        placeholder="email@domain.com" 
                        name="email"
                        value={email.value} 
                        onChange={e => setEmail({ value: e.target.value, error: '' })}
                        type="text"
                        className={email.error ? "form-input form-input-error" : "form-input"}
                    />
                    {email.error && <span className="form-error">{email.error}</span>}
                </div>

                <div className="form-input-wrapper">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <PhoneInput phone={phone} setPhone={setPhone}/>
                    {phone.error && <span className="form-error">{phone.error}</span>}
                </div>
            </div>

            <div className="form-section">
                <h2 className="form-heading">Billing Address</h2>
                <AddressForm address={billingAddress} setAddress={setBillingAddress} />
            </div>
            <button type="submit" className="button button-black">Continue</button>
        </form>
    )
}

export default BillingAddressForm;