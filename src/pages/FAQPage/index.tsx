import { useEffect } from 'react';
import FAQ from './FAQ';
import { QAndA } from './FAQPage.types';
import './FAQPage.css';

const faqs: QAndA[] = [
    { 
        question: 'Do you have a physical store?',
        answer: 'No, we are an online store only.'
    },
    {
        question: 'Do you ship outside the United States?',
        answer: 'No, we currently only ship orders within the United States.'
    },
    {
        question: 'Can I pick up my order from your office?',
        answer: 'No, we do not have a pickup process at this time.'
    },
    {
        question: 'Can I return my item for a refund?',
        answer: 'We can refund your purchase if we receieve the item within 30 days' +
        ' of your original purchase. Items must be free of damage, and apparel items' +
        ' must be clean and unworn. Please send all returns to Infinite Bliss Returns Office,' +
        ' 123 Fake Street, Somerville, MA 02143'
    },
    {
        question: 'How long does it take for my order to arrive after purchase?',
        answer: 'Orders take two business days to process and ship. Once your order is' +
        ' shipped, it should arrive within five to seven business days. Faster shipping' +
        ' can also be selected at checkout for  an additional fee.'
    },
    {
        question: 'Can I split my order into multiple shipments?',
        answer: 'No, all orders are shipped together in one package, except under extreme' +
        ' or unusual circumstances'
    },
    {
        question: 'How can I track my package?',
        answer: 'Shipping details, including your tracking number, are provided via email once' +
        ' your order has shipped. If you do not receive an email, make sure the email is not in' +
        ' your spam folder.'
    }
];

const FAQPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="faq-page">
            <h1 className="heading-1">FAQs</h1>
            <div className="faq-page-faqs">
                {faqs.map(faq => <FAQ faq={faq} />)}
            </div>
        </main>
    )
}

export default FAQPage;