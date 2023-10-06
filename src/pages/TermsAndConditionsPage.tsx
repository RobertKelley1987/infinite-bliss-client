import { useEffect } from 'react';
import './TermsAndConditionsPage.css';

const TermsAndConditionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page-container">
            <h1 className="heading-1">Terms and Conditions</h1>

            <p>This is a fake e-commerce website, built solely as a web development portfolio project. THIS IS NOT A REAL STORE. 
            The page below contains some boilerplate terms and conditions I found in a terms and conditions generator.</p> 
            
            <p>These terms and conditions govern the use of infinitebliss.com. This site is owned and operated by Robert Kelley.
            By using this site, you indicate that you have read and understand these terms and conditions and agree to abide by them at all times.</p>

            <h2 className="heading-2">Intellectual Property</h2>
            <p>All content published and made available on our site is the property of Robert Kelley and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable 
            files and anything that contributes to the composition of our site.</p>

            <h2 className="heading-2">Accounts</h2>
            <p>When you create an account on our site, you agree to the following:</p>

            <p>You are solely responsible for your account and the security and privacy of your account, including passwords or sensitive information attached to that account; and
            All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes.
            We reserve the right to suspend or terminate your account if you are using our site illegally or if you violate these terms and conditions.</p>

            <h2 className="heading-2">Sale of Goods</h2>
            <p>These terms and conditions govern the sale of goods available on our site.</p>

            <p>The following goods are available on our site:</p>
            <ul className="list-with-discs">
                <li>Music - vinyl, CDs and tapes</li>
                <li>Clothing - artist t-shirts, longsleeves and hoodies</li>
                <li>Miscellaneous accessories - artist patches, pins, etc...</li>
            </ul>
        
            <p>These terms and conditions apply to all the goods that are displayed on our site at the time you access it. This includes all products listed as being out of stock. 
            All information, descriptions, or images that we provide about our goods are as accurate as possible. However, we are not legally bound by such information, descriptions, 
            or images as we cannot guarantee the accuracy of all goods we provide. You agree to purchase goods from our site at your own risk.</p>

            <p>We reserve the right to modify, reject or cancel your order whenever it becomes necessary. If we cancel your order and have already processed your payment, we will 
            give you a refund equal to the amount you paid. You agree that it is your responsibility to monitor your payment instrument to verify receipt of any refund.</p>

            <h2 className="heading-2">Payments</h2>
            <p>We accept the following payment methods on our site:</p>
            <ul className="list-with-discs">
                <li>Credit Card</li>
                <li>Debit Card</li>
            </ul>
        
            <p>When you provide us with your payment information, you authorize our use of and access to the payment instrument you have chosen to use. By providing us with your 
            payment information, you authorize us to charge the amount due to this payment instrument.</p>

            <p>If we believe your payment has violated any law or these terms and conditions, we reserve the right to cancel or reverse your transaction.</p>

            <h2 className="heading-2">Shipping and Delivery</h2>
            <p>When you purchase goods from our site, the goods will be delivered through one of the following methods:</p>

            <ul>
                <li>Standard delivery by mail. Delivery takes 5 - 7 business days.</li>
            </ul>

            <p>Delivery will take place as soon as reasonably possible, depending on the delivery method selected. Delivery times may vary due to unforseen circumstances. 
            Please note that delivery times do not include weekends and statutory holidays.</p>

            <p>You will be required to pay delivery charges in addition to the price for the goods you purchase.</p>

            <p>You are required to provide us with a complete and accurate delivery address, including the name of the recipient. We are not liable for the delivery of 
            your goods to the wrong address or wrong person as a result of you providing us with inaccurate or incomplete information.</p>

            <h2 className="heading-2">Consumer Protection Law</h2>
            <p>Where any consumer protection legislation in your jurisdiction applies and cannot be excluded, these terms and conditions will not limit your legal rights and 
                remedies under that legislation. These terms and conditions will be read subject to the mandatory provisions of that legislation. If there is a conflict between 
                these terms and conditions and that legislation, the mandatory provisions of the legislation will apply.</p>

            <h2 className="heading-2">Limitation of Liability</h2>
            <p>Robert Kelley and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities 
            and expenses including legal fees from your use of the site.</p>

            <h2 className="heading-2">Indemnity</h2>
            <p>Except where prohibited by law, by using this site you indemnify and hold harmless Robert Kelley and our directors, officers, agents, employees, subsidiaries, and 
            affiliates from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of our site or your violation of these 
            terms and conditions.</p>

            <h2 className="heading-2">Applicable Law</h2>
            <p>These terms and conditions are governed by the laws of the Commonwealth of Massachusetts.</p>

            <h2 className="heading-2">Dispute Resolution</h2>
            <p>Subject to any exceptions specified in these terms and conditions, if you and Robert Kelley are unable to resolve any dispute through informal discussion, then you 
            and Robert Kelley agree to submit the issue first before a non-binding mediator and to an arbitrator in the event that mediation fails. The decision of the arbitrator 
            will be final and binding. Any mediator or arbitrator must be a neutral party acceptable to both you and Robert Kelley. The costs of any mediation or arbitration will 
            be shared equally between you and Robert Kelley.</p>

            <p>Notwithstanding any other provision in these terms and conditions, you and Robert Kelley agree that you both retain the right to bring an action in small claims court 
            and to bring an action for injunctive relief or intellectual property infringement.</p>

            <h2 className="heading-2">Severability</h2>
            <p>If at any time any of the provisions set forth in these terms and conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed 
            void and will be removed from these terms and conditions. All other provisions will not be affected by the removal and the rest of these terms and conditions will still be 
            considered valid.</p>

            <h2 className="heading-2">Changes</h2>
            <p>These terms and conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our site and 
            the way we expect users to behave on our site. We will notify users by email of changes to these terms and conditions or post a notice on our site.</p>

            <h2 className="heading-2">Contact Details</h2>
            <p>Please contact us if you have any questions or concerns.</p>

            <div className="address">
                <span className="terms-and-conditions-page-co-name">Infinite Bliss</span>
                <span>123 Fake Street</span>
                <span>Somerville, MA 02143</span>
                <span>(800) 555-1234</span>
                <span>info@infinitebliss.com</span>
            </div>
        </main>
    )
}

export default TermsAndConditionsPage;