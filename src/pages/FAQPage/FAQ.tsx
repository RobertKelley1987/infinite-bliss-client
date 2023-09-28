import { useState } from 'react';
import { QAndA } from './FAQPage.types';
import './FAQ.css';

type FAQProps = {
    faq: QAndA
}

const FAQ = ({ faq }: FAQProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const plusSign = <span className="faq-symbol material-symbols-outlined">add</span>;
    const minusSign = <span className="faq-symbol material-symbols-outlined">remove</span>

    return (
        <div>
            <h2 onClick={() => setIsOpen(prev => !prev)} className="faq-question">
                {isOpen ? minusSign : plusSign}
                {faq.question}
            </h2>
            {isOpen && <p className="faq-answer">{faq.answer}</p>}
        </div>
    );
}

export default FAQ;