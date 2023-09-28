import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import useScreenSizeQuery from '../hooks/useScreenSizeQuery';
import MenuChevron from '../components/MenuChevron';
import { ProductFilterOption } from '../types';
import './ListFilter.css';

type ListFilterProps<T> = {
    productTypes: ProductFilterOption<T>[]
    setProductTypes: React.Dispatch<React.SetStateAction<ProductFilterOption<T>[]>> 
}

function ListFilter<T extends string> ({ productTypes, setProductTypes }: ListFilterProps<T>) {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { screenIsBig } = useScreenSizeQuery(800);

    useEffect(() => {
        setIsOpen(screenIsBig);
    }, [screenIsBig])

    const handleChange = (clickedType: T) => {
        const typeIndex = productTypes.findIndex(productType => productType.name === clickedType);
        productTypes[typeIndex].selected = !productTypes[typeIndex].selected;
        setProductTypes([...productTypes]);
        navigate(`${location.pathname}?page=1`);
    }

    const toggleFilterIsOpen = () => !screenIsBig && setIsOpen(prev => !prev);

    const renderSelections = () => productTypes.map(productType => {
        const { name, selected } = productType;

        return (
            <label key={name} className="checkbox-label" htmlFor={name}>
                <input 
                    className="checkbox"  
                    id={name} 
                    type="checkbox"
                    onChange={() => handleChange(name)}
                    onKeyDown={e => e.key === 'Enter' && handleChange(name)}
                    checked={selected} 
                />
                <span>{name}</span>
            </label>
        )
    });
    
    return (
        <div className="list-filter">
            <div 
                tabIndex={!screenIsBig ? 0 : undefined}
                className="list-filter-heading-wrapper"
                onKeyDown={e => e.key === 'Enter' && toggleFilterIsOpen()} 
                onClick={toggleFilterIsOpen}
            >
                <h2 className="list-filter-heading">Product Type</h2>
                {!screenIsBig && <MenuChevron flipped={isOpen}/>}
            </div>
            {isOpen && renderSelections()}            
        </div>
    );
}

export default ListFilter;