import { SHIPPING_METHODS } from '../../constants';
import { ShippingMethod } from '../../types';
import './ShippingMethodForm.css';

type ShippingMethodFormProps = {
    shippingMethod: ShippingMethod,
    setShippingMethod: React.Dispatch<React.SetStateAction<ShippingMethod>>
}

const ShippingMethodForm = ({ shippingMethod, setShippingMethod }: ShippingMethodFormProps) => {
    return (
        <div className="form-section">
            <h2 className="form-heading">Shipping Method</h2>
            <fieldset className="shipping-method-form-fieldset">
                <legend className="hidden">Shipping Options</legend>
                {SHIPPING_METHODS.map(method => {
                    return (
                        <label 
                            key={method.name} 
                            htmlFor={method.name} 
                            className="shipping-method-form-label"
                        >
                            <div className="shipping-method-form-radio">
                                <input 
                                    onChange={() => setShippingMethod(method)}
                                    value={method.name} 
                                    checked={shippingMethod.name === method.name}
                                    id={method.name} 
                                    name="shipping-method" 
                                    type="radio"
                                />
                                {method.name}: {method.days} business days
                            </div>
                            <span>${method.cost}</span>
                        </label>  
                    )
                })}
            </fieldset>
        </div>
    )
}

export default ShippingMethodForm;