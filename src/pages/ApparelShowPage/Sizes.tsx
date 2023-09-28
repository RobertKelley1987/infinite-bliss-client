import { Size } from '../../types';
import './Sizes.css';

export type SizesProps = {
    selectedSize: Size | '',
    setSelectedSize: React.Dispatch<React.SetStateAction<Size>>
}

const ALL_SIZES: Size[] = ['Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'];

const Sizes = ({ selectedSize, setSelectedSize }: SizesProps) => {

    const renderClassNames = (size: Size) => {
        return size === selectedSize ? "sizes-button sizes-button-selected" : "sizes-button";
    } 

    return (
        <div className="sizes-wrapper">
            <h3 className="sizes-heading">Size</h3>
            <ul className="sizes">
                {ALL_SIZES.map(size => {
                    return (
                        <li key={size} className={renderClassNames(size)} onClick={() => setSelectedSize(size)}>
                            {size}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Sizes;