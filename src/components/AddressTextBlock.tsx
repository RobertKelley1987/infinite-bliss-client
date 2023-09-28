import { Fragment } from 'react';
import { MailingAddress } from "../types";

type AddressTextBlockProps = {
    address: MailingAddress
}

const AddressTextBlock = ({ address }: AddressTextBlockProps) => {
    return (
        <Fragment>
            <span>{address.firstName} {address.lastName}</span>
            <span>{address.streetLine1}</span>
            <span>{address.streetLine2}</span>
            <span>{address.city}, {address.state} {address.zip}</span>
        </Fragment>
    )
}

export default AddressTextBlock;