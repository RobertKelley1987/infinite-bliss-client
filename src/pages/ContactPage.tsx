import { useEffect } from 'react';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <h1 className="heading-1">Contact</h1>
            <p>Out team is here to assist you with any order related questions. Please reach out to us if you need assistance</p>

            <p>Customer service representatives are on site Monday through Friday from 9 AM to 5PM EST. You should receive a response within 24 hours.</p>

            <div className="address">
                <span className="terms-and-conditions-page-co-name">Infinite Bliss</span>
                <span>123 Fake Street</span>
                <span>Somerville, MA 02143</span>
                <span>(800) 555-1234</span>
                <span>info@infinitebliss.com</span>
            </div>
        </div>
    )
}

export default ContactPage;