import { isANumber } from '../../utils';
import { MailingAddressInput } from '../../types';

type ZipInputProps = {
    zip: MailingAddressInput<string>,
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ZipInput = ({ zip, setValue }: ZipInputProps) => {
    const validateZip = (zip: string) => {
        const newChar = zip[zip.length - 1];
        return isANumber.test(newChar) || zip === '';
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(validateZip(e.target.value)) {
            setValue(e);
        }
    }

    return (
        <input 
            className={zip.error ? "form-input form-input-error" : "form-input"}
            id="zip"
            name="zip" 
            value={zip.value} 
            onChange={handleChange}
            placeholder="12345" 
            type="text"
            maxLength={5}
        />
    );
}

export default ZipInput;